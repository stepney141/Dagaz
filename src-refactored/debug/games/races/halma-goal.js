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

var getDistance = function(design, board) {
  if (_.isUndefined(board.distance)) {
      board.distance = [];
      var group = [];
      _.each(design.allPositions(), function(pos) {
           board.distance.push(0);
           if (design.inZone(2, board.player, pos)) {
               group.push(pos);
           }
      });
      for (var i = 0; i < group.length; i++) {
           for (var dir = 0; dir < Dagaz.AI.MAX_DIR; dir++) {
                var pos = design.navigate(board.player, group[i], dir);
                if ((pos !== null) && (_.indexOf(group, pos) < 0)) {
                    board.distance[pos] = board.distance[group[i]] + 1;
                    group.push(pos);
                }
           }
      }
  }
  return board.distance;
}

var getMove = function(move) {
  var r = null;
  for (var i = 0; i < move.actions.length; i++) {
      if ((move.actions[i][0] !== null) && (move.actions[i][1] !== null)) {
          if (r === null) {
              r = {
                  start: move.actions[i][0][0],
                  next:  move.actions[i][1][0]
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

var isRestricted = function(design, board, player) {
  var list = [];
  _.each(design.allPositions(), function(pos) {
        if (design.inZone(0, player, pos)) {
            var piece = board.getPiece(pos);
            if ((piece !== null) && (piece.player != player)) {
                list.push(pos);
            }
        }
  });
  if (list.length == 0) return false;
  var done = [];
  var r = true;
  for (var i = 0; i < list.length; i++) {
       if (_.indexOf(done, list[i]) < 0) {
           var group = [ list[i] ];
           for (var j = 0; j < group.length; j++) {
                for (var dir = 0; dir < Dagaz.AI.MAX_DIR; dir++) {
                    var p = design.navigate(player, group[j], dir);
                    if ((p !== null) && (_.indexOf(group, p) < 0)) {
                        if (!design.inZone(0, player, p)) {
                            r = false;
                            return;
                        }
                        var piece = board.getPiece(p);
                        if ((piece !== null) && (piece.player == player)) {
                             p = design.navigate(player, p, dir);
                             if ((p !== null) && (_.indexOf(group, p) < 0) && (board.getPiece(p) === null)) {
                                 group.push(p);
                             }
                        } else {
                            group.push(p);
                        }
                    }
                }
                if (!r) break;
           }
           done = _.union(done, group);
       }
  }
  return r;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var d = getDistance(design, board);
  var m = getMove(move);
  var r = 1;
  if (m !== null) {
      r = (d[m.start] - d[m.end]) * 100;
      if (notBest(design, board, r)) return -1;
      var b = board.apply(move);
      if (isRestricted(design, b, board.player)) return -1;
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
