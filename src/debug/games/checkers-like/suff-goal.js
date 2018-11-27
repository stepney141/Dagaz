(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "suff-goal") {
      checkVersion(design, name, value);
  }
}

var allDirections = function() {
  return _.range(7);
}

var getTargets = function(design, board, player) {
  if (_.isUndefined(board.targets)) {
      board.targets = [];
      _.each(design.allPositions(), function(pos) {
          if (design.inZone(3, player, pos)) {
              if (board.getPiece(pos) !== null) {
                  _.each(allDirections(), function(dir) {
                      var p = design.navigate(player, pos, dir);
                      if ((p !== null) && design.inZone(3, player, p) && (board.getPiece(p) === null)) {
                           p = design.navigate(0, pos, dir);
                           if ((p !== null) && !design.inZone(3, player, p) && (board.getPiece(p) === null) && (_.indexOf(board.targets, p) < 0)) {
                                board.targets.push(p);
                           }
                      }
                  });
              } else {
                  board.targets.push(pos);
              }
          }
      });
  }
  return board.targets;
}

var distance = function(a, b) {
  return Math.abs(Dagaz.Model.getX(a) - Dagaz.Model.getX(b)) +
         Math.abs(Dagaz.Model.getY(a) - Dagaz.Model.getY(b));
}

var getDistance = function(design, board, player, pos) {
  var r = null;
  _.each(getTargets(design, board, player), function(goal) {
      var d = distance(goal, pos);
      if ((r === null) || (r > d)) {
          r = d;
      }
  });
  return r;
}

var capturedBonus = function(design, board, player, move) {
  var r = 0;
  _.each(move.actions, function(a) {
      if (a[0] !== null) {
          var piece = board.getPiece(a[0][0]);
          if ((piece !== null) && (piece.player != player)) {
              r += design.price[piece.type];
          }
      }
  });
  return r;
}

var isAttacker = function(player, piece, dir) {
  if (piece === null) return false;
  if (piece.player == player) return false;
  if (piece.type == 1) return true;
  return _.indexOf([0, 2, 5, 6], dir) >= 0;
}

var isAttacked = function(design, board, player, pos) {
  if (!design.inZone(0, player, pos)) return false;
  var r = false;
  var dirs = allDirections();
  _.each(dirs, function(dir) {
      if (!r) {
           var p = design.navigate(0, pos, dir);
           if ((p !== null) && (board.getPiece(p) === null)) {
                p = design.navigate(player, pos, dir);
                if (p !== null) {
                    var piece = board.getPiece(p);
                    if (piece !== null) {
                        if (isAttacker(player, piece, dir)) r = true;
                        return;
                    }
                    var group = [p];
                    for (var i = 0; i < group.length; i++) {
                        for (var j = 0; j < dirs.length; j++) {
                             var q = design.navigate(player, group[i], dirs[j]);
                             if ((q !== null) && (q != pos) && (board.getPiece(q) !== null)) {
                                  q = design.navigate(player, q, dirs[j]);
                                  if ((q !== null) && (_.indexOf(group, q) < 0)) {
                                       var piece = board.getPiece(q);
                                       if (piece !== null) {
                                           if (isAttacker(player, piece, dir)) r = true;
                                           return;
                                       }
                                       group.push(q);
                                  }
                             }
                        }
                    }
                }
           }
      }
  });
  return r;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  // TODO:

  return r;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var enemies = 0;
  var friends = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && design.inZone(3, piece.player, pos)) {
          if (piece.player == player) {
              friends++;
          } else {
              enemies++;
          }
      }
  });
  if (friends == 6) return 1;
  if (enemies == 6) return -1;
  return checkGoals(design, board, player);
}

})();
