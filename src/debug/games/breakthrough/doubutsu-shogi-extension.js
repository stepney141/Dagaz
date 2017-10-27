(function() {

Dagaz.AI.AI_FRAME      = 2000;
Dagaz.Model.showBlink  = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "doubutsu-shogi-extension") {
      checkVersion(design, name, value);
  }
}

var getLastPos = function(board) {
  var pos = null;
  if (board.move) {
      _.each(board.move.actions, function(a) {
          if ((a[0] !== null) && (a[1] !== null)) {
              pos = a[1][0];
          }
      });
  }
  return pos;
}

Dagaz.AI.getForcedMove = function(ctx, board, player) {
  var pos = getLastPos(board);
  board.moves = Dagaz.AI.generate(ctx, board);
  var moves = _.filter(function(m) {
      if ((m.actions.length != 1) || (m.actions[0][0] === null) || (m.actions[0][1] === null)) return false;
      return m.actions[0][1][0] == pos;
  });
  if (moves.length == 0) return null;
  return _.min(moves, function(m) {
       var piece = board.getPiece(m.actions[0][0][0]);
       if (piece === null) return MAXVALUE;
       return ctx.design.price[piece.type];
  });
}

/*Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 0;
  var pos = getLastPos(board);
  _.each(move.actions, function(a) {
      var piece = null;
      if ((a[0] !== null) && (a[1] !== null)) {
          piece = board.getPiece(a[1][0]);
          if ((piece !== null) && (piece.player !== board.player)) {
              r = design.price[piece.type];
              if (a[1][0] == pos) r += 10;
          }
      }
  });
  return r;
}*/

var checkDirection = function(design, board, player, pos, dir, types, from) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return 0;
  if (from) {
      if (p == from) return 0;
  }
  var piece = board.getPiece(p);
  if (piece == null) return 0;
  if (_.indexOf(types, piece.type) < 0) return 0;
  if (piece.player != player) {
      return 1;
  } else {
      return -1;
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  board.generate();
  if (board.moves.length == 0) {
      if (board.player != player) {
          return 1;
      } else {
          return -1;
      }
  }
  return checkGoals(design, board, player);
}

var findPiece = function(design, board, player, type) {
  var positions = design.allPositions();
  for (var i = 0; i < positions.length; i++) {
       var piece = board.getPiece(positions[i]);
       if ((piece !== null) && (piece.type == type) && (piece.player == player)) {
           return positions[i];
       }
  }
  return null;
}

Dagaz.AI.defendStatus = function(design, board, player, pos, except) {
  var kings  = 0;
  var result = 0;
  _.each([1, 2, 3, 4, 5, 6, 7, 8], function(dir) {
      var p = design.navigate(1, pos, dir);
      if ((p === null) || (p == except)) return;
      var piece = board.getPiece(p);
      if (piece === null) return;
      var delta = 1;
      if (piece.player != player) {
          delta = -delta;
      }
      if (piece.type == 0) {
          kings += delta;
      } else {
          if ((piece.type == 1) && (piece.player != player)) {
             if (dir == 1) result += delta;
          }
          if ((piece.type == 1) && (piece.player == player)) {
             if (dir == 2) result += delta;
          }
          if ((piece.type == 4) && (piece.player != player)) {
              if ((dir == 7) || (dir == 8)) result += delta;
          }
          if ((piece.type == 4) && (piece.player == player)) {
              if ((dir == 5) || (dir == 6)) result += delta;
          }
          if (dir < 5) {
              if ((piece.type == 3) || (piece.type == 4)) {
                  result += delta;
              }
          } else {
              if (piece.type == 2) {
                  result += delta;
              }
          }
      }
  });
  if (Math.abs(result) <= 1) {
      result += kings;
  }
  return result;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var king   = design.getPieceType("King");
  var za     = design.getPieceType("Za");
  var sang   = design.getPieceType("Sang");
  var jang   = design.getPieceType("Jang");
  var hu     = design.getPieceType("Hu");
  var n  = design.getDirection("n");  var w  = design.getDirection("w");
  var s  = design.getDirection("s");  var e  = design.getDirection("e");
  var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
  var ne = design.getDirection("ne"); var se = design.getDirection("se");
  _.each(board.moves, function(move) {
      var b = board.apply(move);
      var pos = findPiece(design, b, board.player, king);
      if (pos === null) {
          move.failed = true;
          return;
      }
      if ((checkDirection(design, b, board.player, pos, n,  [king, za, jang, hu]) > 0) ||
          (checkDirection(design, b, board.player, pos, s,  [king, jang, hu]) > 0) ||
          (checkDirection(design, b, board.player, pos, w,  [king, jang, hu]) > 0) ||
          (checkDirection(design, b, board.player, pos, e,  [king, jang, hu]) > 0) ||
          (checkDirection(design, b, board.player, pos, nw, [king, sang, hu]) > 0) ||
          (checkDirection(design, b, board.player, pos, ne, [king, sang, hu]) > 0) ||
          (checkDirection(design, b, board.player, pos, sw, [king, sang]) > 0) ||
          (checkDirection(design, b, board.player, pos, se, [king, sang]) > 0)) {
          move.failed = true;
          return;
      }
      if ((move.actions.length == 1) && (move.actions[0][0] !== null) && (move.actions[0][1] !== null)) {
          var from  = move.actions[0][0][0];
          var to    = move.actions[0][1][0];
          var piece = board.getPiece(from);
          if ((piece !== null) && (piece.type == za)) {
              var pos = design.navigate(board.player, from, n);
              if (pos != to) {
                  pos = design.navigate(board.player, to, n);
                  if (pos === null) {
                      move.failed = true;
                  }
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
