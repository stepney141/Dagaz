(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "halma-goal") {
     checkVersion(design, name, value);
  }
}

if (!_.isUndefined(Dagaz.Controller.addSound)) {
    Dagaz.Controller.addSound(0, "../../sounds/slide.ogg", true);
}

var getTargets = function(design, board, player) {
  if (_.isUndefined(board.targets)) {
      board.targets = [];
      var pos = null;
      _.each(design.allPositions(), function(p) {
           if (design.inZone(2, player, p)) {
               pos = p;
           }
      });
      var nx = design.getDirection("nx");
      while (pos !== null) {
          board.targets.push(pos);
          pos = design.navigate(player, pos, nx);
      }
  }
  return board.targets;
}

var getDistance = function(a, b) {
  return Math.abs(Dagaz.Model.getX(a) - Dagaz.Model.getX(b)) +
         Math.abs(Dagaz.Model.getY(a) - Dagaz.Model.getY(b));
}

var getMove = function(move) {
  var r = null;
  for (var i = 0; i < move.actions.length; i++) {
      if ((move.actions[i][0] !== null) && (move.actions[i][1] !== null)) {
          if (r === null) {
              r = {
                  start: move.actions[i][0][0]
              };
          }
          r.end = move.actions[i][1][0];
      }
  }
  return r;
}

var notBest = function(design, board, val) {
  if (_.isUndefined(board.bestVal)) {
      board.bestVal = val;
      return false;
  }
  if (board.bestVal > val) return true;
  board.bestVal = val;
  return false;
}

var getEnemies = function(design, board, player) {
  if (_.isUndefined(board.enemies)) {
      board.enemies = [];
      _.each(design.allPositions(), function(pos) {
           if (design.inZone(0, player, pos)) {
               var piece = board.getPiece(pos);
               if ((piece !== null) && (piece.player != player)) {
                   board.enemies.push(pos);
               }
           }
      });
  }
  return board.enemies;
}

var isLocked = function(design, board, player, group) {
  var r = true;
  var nx = design.getDirection("nx");
  for (var i = 0; i < group.length; i++) {
       _.each(design.allDirections(), function(dir) {
           if (dir == nx) return;
           var pos = design.navigate(player, group[i], dir);
           if ((pos !== null) && (_.indexOf(group, pos) < 0)) {
               if (board.getPiece(pos) !== null) {
                   pos = design.navigate(player, pos, dir);
                   if ((pos !== null) && (_.indexOf(group, pos) < 0) && (board.getPiece(pos) === null)) {
                       if (!design.inZone(0, player, pos)) {
                           r = false;
                           return;
                       }
                       group.push(pos);
                   }
               } else {
                   if (!design.inZone(0, player, pos)) {
                       r = false;
                       return;
                   }
                   group.push(pos);
               }
           }
       });
       if (!r) return false;
  }
  return true;
}

var isRestricted = function(design, board, player, enemies) {
  for (var i = 0; i < enemies.length; i++) {       
       if (isLocked(design, board, player, [ enemies[i] ])) return true;
  }
  return false;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  var m = getMove(move);
  var targets = getTargets(design, board, board.player);
  if ((m !== null) && (targets.length > 0)) {
      var s = _.indexOf(targets, m.start);
      var e = _.indexOf(targets, m.end);
      if ((s >= 0) && (e >= 0) && (e < s)) r = 1000;
      if ((s < 0) && (e >= 0)) r = 100;
      if ((s < 0) && (e < 0)) {
           r = 100 - getDistance(m.end, targets[0]);
      }
      if (notBest(design, board, r)) return -1;
      var b = board.apply(move);
      var enemies = getEnemies(design, board, board.player);
      if (isRestricted(design, b, board.player, enemies)) return -1;
  }
  return r;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var m = 2;
  var c = [0, 0, 0, 0];
  var p = [0, 0, 0, 0];
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if (!design.inZone(0, piece.player, pos)) {
              c[piece.player - 1]++;
          } else {
              p[piece.player - 1]++;
          }
          if (piece.player > m) {
              m = piece.player;
          }
      }
  });
  for (var i = 0; i < m; i++) {
      if ((c[i] == 0) && (p[i] != 0)) {
          if (i + 1 == player) {
              return 1;
          } else {
              return -1;
          }
      }
  }
  return checkGoals(design, board, player);
}

})();
