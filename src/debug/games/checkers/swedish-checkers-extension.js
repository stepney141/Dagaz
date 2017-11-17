(function() {

var strictMode = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "swedish-checkers-extension") {
     checkVersion(design, name, value);
  }
}

var isAttacked = function(design, board, pos, empty, dir, opposite) {
  var p = design.navigate(board.player, pos, dir);
  if ((p === null) || (p == empty)) return false;
  var piece = board.getPiece(p);
  if ((p === null) || (p.player == board.player)) return false;
  p = design.navigate(board.player, pos, opposite);
  if (p === null) return false;
  return (p == empty) || (board.getPiece(p) === null);
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  if ((move.actions.length == 1) && (move.actions[0][0] !== null) && (move.actions[0][1] !== null)) {
      var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
      var ne = design.getDirection("ne"); var se = design.getDirection("se");
      var sr = move.actions[0][0][0];
      var ds = move.actions[0][1][0];
      if (isAttacked(design, board, ds, sr, nw, se) ||
          isAttacked(design, board, ds, sr, ne, sw) ||
          isAttacked(design, board, ds, sr, se, nw) ||
          isAttacked(design, board, ds, sr, sw, ne)) {
          return 3;
      }
  }
  return 1;
}

var apply = Dagaz.AI.apply;

Dagaz.AI.apply = function(board, move) {
  var b = apply(board, move);
  if (board.player == 2) {
      b.player = 1;
  }
  if (board.player == 3) {
      b.player = 4;
  }
  return b;
}

Dagaz.AI.isFriend = function(player, opponent) {
  return Math.abs(player - opponent) % 2 == 0;
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  var isFR = false;
  var isER = false;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if (design.inZone(2, player, pos)) {
              if (Dagaz.AI.isFriend(player, piece.player)) {
                  isFR = true;
              } else {
                  isER = true;
              }
          } else {
              var v = design.price[piece.type];
              var bonus = 6;
              if (_.indexOf([101, 61, 88, 48, 111, 71, 98, 78, 27, 122, 37, 132, 147, 2, 157, 12], +pos) >= 0) {
                  bonus -= 3;
              }
              if (_.indexOf([141, 21, 128, 8, 151, 31, 138, 18], +pos) >= 0) {
                  bonus -= 4;
              }
              if (_.indexOf([107, 67, 42, 82, 117, 77, 52, 92, 143, 145, 153, 155], +pos) >= 0) {
                  bonus -= 2;
              }
              if (design.inZone(1, player, pos)) {
                  bonus += 4;
              }
              if ((piece.type == 1) && (_.indexOf([141, 122, 103, 84, 65, 46, 27, 8, 151, 132, 113, 94, 75, 56, 37, 18], +pos) >= 0)) {
                  bonus += 2;
              }
              v += bonus;
              if (!Dagaz.AI.isFriend(player, piece.player)) {
                  v = -v;
              }
              r += v;
          }
      }
  });
  if (isFR) {
      r += 10;
  }
  if (isER) {
      r -= 10;
  }
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var swt    = design.getDirection("swt");
  var sbt    = design.getDirection("sbt");
  var noMove = true;
  _.chain(board.moves)
   .filter(function(move) {
        return move.actions.length == 1;
    })
   .each(function(move) {
        var pos = move.actions[0][0][0];
        if (design.inZone(2, board.player, pos)) {
            var p = design.navigate(board.player, pos, sbt);
            if (p !== null) {
                var piece = board.getPiece(p);
                if ((piece !== null) && (piece.player == board.player)) {
                    move.failed = true;
                }
            }
        } else {
            noMove = false;
        }
    });
  _.chain(board.moves)
   .filter(function(move) {
        return move.actions.length > 1;
    })
   .each(function(move) {
        noMove = false;
        var captured = _.filter(move.actions, function(a) {
            return (a[0] !== null) && (a[1] === null);
        }).length;
        if (captured > 0) {
            var pn     = captured;
            var pos    = 1;
            var player = board.player + 2;
            if (player > 4) {
                player -= 4;
            }
            var piece  = Dagaz.Model.createPiece(0, player);
            while (captured > 0) {
                pos = design.navigate(board.player, pos, swt);
                if (pos === null) {
                    break;
                }
                if (board.getPiece(pos) === null) {
                    move.dropPiece(pos, piece, pn);
                    captured--;
                }
            }
        } else {
            move.failed = true;
        }
    });
  if (noMove) {
      board.moves = [];
  }
  CheckInvariants(board);
}

})();
