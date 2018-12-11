(function() {

Dagaz.AI.discardVector = [0, 5, 5, 5];

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "yonin-shogi-goal") {
      checkVersion(design, name, value);
  }
}

var checkStep = function(design, board, player, pos, dir, cover) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return;
  cover[p].push(pos);
}

var checkSlide = function(design, board, player, pos, dir, cover) {
  var p = design.navigate(player, pos, dir);
  while (p !== null) {
      p = design.navigate(player, p, dir);
      if (p !== null) {
          cover[p].push(pos);
          if (board.getPiece(p) !== null) break;
      }
  }
}

var checkLeap = function(design, board, player, pos, o, d, cover) {
  var p = design.navigate(player, pos, o);
  if (p === null) return;
  p = design.navigate(player, p, d);
  if (p === null) return;
  cover[p].push(pos);
}

Dagaz.Model.GetCover = function(design, board) {
  if (_.isUndefined(board.cover)) {
      var n  = design.getDirection("n");  var w  = design.getDirection("w");
      var s  = design.getDirection("s");  var e  = design.getDirection("e");
      var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
      var ne = design.getDirection("ne"); var se = design.getDirection("se");
      board.cover = [];
      _.each(design.allPositions(), function(pos) {
           board.cover.push([]);
      });
      _.each(design.allPositions(), function(pos) {
           var piece = board.getPiece(pos);
           if (piece !== null) {
               if (_.indexOf([0, 1, 2, 4, 6, 7, 8, 9, 10, 11, 12, 13], piece.type) >= 0) {
                   checkStep(design, board, piece.player, pos, n, board.cover);
               }
               if (_.indexOf([0, 1, 6, 8, 9, 10, 11, 12, 13], piece.type) >= 0) {
                   checkStep(design, board, piece.player, pos, e, board.cover);
               }
               if (_.indexOf([0, 1, 6, 8, 9, 10, 11, 12, 13], piece.type) >= 0) {
                   checkStep(design, board, piece.player, pos, w, board.cover);
               }
               if (_.indexOf([0, 1, 6, 8, 9, 10, 11, 12, 13], piece.type) >= 0) {
                   checkStep(design, board, piece.player, pos, s, board.cover);
               }
               if (_.indexOf([0, 1, 2, 5, 8, 9, 10, 11, 12, 13], piece.type) >= 0) {
                   checkStep(design, board, piece.player, pos, nw, board.cover);
               }
               if (_.indexOf([0, 1, 2, 5, 8, 9, 10, 11, 12, 13], piece.type) >= 0) {
                   checkStep(design, board, piece.player, pos, ne, board.cover);
               }
               if (_.indexOf([0, 2, 5, 11, 12], piece.type) >= 0) {
                   checkStep(design, board, piece.player, pos, sw, board.cover);
               }
               if (_.indexOf([0, 2, 5, 11, 12], piece.type) >= 0) {
                   checkStep(design, board, piece.player, pos, se, board.cover);
               }
               if (_.indexOf([4, 6, 12], piece.type) >= 0) {
                   checkSlide(design, board, piece.player, pos, n, board.cover);
               }
               if (_.indexOf([6, 12], piece.type) >= 0) {
                   checkSlide(design, board, piece.player, pos, e, board.cover);
                   checkSlide(design, board, piece.player, pos, w, board.cover);
                   checkSlide(design, board, piece.player, pos, s, board.cover);
               }
               if (_.indexOf([5, 11], piece.type) >= 0) {
                   checkSlide(design, board, piece.player, pos, nw, board.cover);
                   checkSlide(design, board, piece.player, pos, ne, board.cover);
                   checkSlide(design, board, piece.player, pos, sw, board.cover);
                   checkSlide(design, board, piece.player, pos, se, board.cover);
               }
               if (piece.type == 3) {
                   checkLeap(design, board, piece.player, pos, n, nw, board.cover);
                   checkLeap(design, board, piece.player, pos, n, ne, board.cover);
               }
           }
      });
  }
  return board.cover;
}

var isLast = function(board, pos) {
  if (_.isUndefined(board.move)) return false;
  if (board.move.actions.length == 0) return false;
  if (board.move.actions[0][0] === null) return false;
  if (board.move.actions[0][1] === null) return false;
  return board.move.actions[0][1][0] == pos;
}

var isAttacked = function(board, pos, player) {
  var r = false;
  _.each(board.cover[pos], function(p) {
      if (r) return;
      var piece = board.getPiece(p);
      if ((piece !== null) && (piece.player != player)) r = true;
  });
  return r;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  if ((move.actions.length > 0) && (move.actions[0][0] !== null) && (move.actions[0][1] !== null)) {
      var pos = move.actions[0][1][0];
      var piece = board.getPiece(pos);
      if (piece !== null) {
          r = design.price[piece.type];
          if (_.isUndefined(board.cover) && isLast(board, pos)) {
              r *= 2;
          }
      }
      piece = board.getPiece(move.actions[0][0][0]);
      if (piece !== null) {
          if (!_.isUndefined(board.cover)) {
              if (isAttacked(board, pos, piece.player)) {
                  r -= design.price[piece.type];
              }
          } else {
              r -= (design.price[piece.type] / 2) | 0;
          }
      }
  }
  return r;
}

Dagaz.AI.getEval = function(design, board) {
  if (_.isUndefined(board.eval)) {
      board.eval = [0, 0, 0, 0];
      var kings  = [0, 0, 0, 0];
      _.each(design.allPositions(), function(pos) {
          var piece = board.getPiece(pos);
          if (piece !== null) {
              var v = design.price[piece.type];
              if (!design.inZone(0, board.player, pos)) {
                  v *= 2;
              }
              if (piece.type == 0) {
                  kings[piece.player - 1]++;
              }
              board.eval[piece.player - 1] += v;
          }
      });
      for (var p = 0; p < 4; p++) {
          if (kings[p] == 0) {
              board.eval[p] = 0;
          }
      }
  }
  return board.eval;
}

var getVal = function(current, player, val) {
  if (current == player) return val;
  return -val;
}

Dagaz.AI.eval = function(ai, design, board, player) {
  var r = 0;
  var eval = Dagaz.AI.getEval(design, board);
  for (var p = 0; p < 4; p++) {
      r += getVal(p + 1, player, eval[p]);
  }
  return r;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var kings  = 0;
  var noKing = true;
  var king = design.getPieceType("King");
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == king)) {
          if (piece.player == player) {
              kings++;
          }
          if (piece.player == 1) {
              noKing = false;
          }
      }
  });
  if (noKing || (kings == 4)) {
      return 1;
  }
  return checkGoals(design, board, player);
}

})();
