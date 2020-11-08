(function() {

Dagaz.AI.AI_FRAME     = 3000;
Dagaz.AI.MIN_DEEP     = 5;
Dagaz.AI.MAX_DEEP     = 20;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gorogoro-shogi-extension") {
      checkVersion(design, name, value);
  }
}

var checkKing = function(design, board, player, pos, dir, type, list) {
  if (_.indexOf(list, +type) < 0) return false;
  var p = design.navigate(player, pos, dir);
  if (p === null) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player == player) return false;
  return piece.type == 0;
}

var checkPos = function(design, board, player, pos, dir, type, list, acc) {
  if (_.indexOf(list, +type) < 0) return false;
  var p = design.navigate(player, pos, dir);
  if (p === null) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  acc.push(p);
}
 
var isBadPosition = function(design, board) {
  var attacked = []; var defended = [];
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if (piece.player == board.player) {
              checkPos(design, board, piece.player, pos, 1, piece.type, [0, 1, 2, 3, 4, 5], attacked);
              checkPos(design, board, piece.player, pos, 4, piece.type, [0, 4, 5], attacked);
              checkPos(design, board, piece.player, pos, 3, piece.type, [0, 4, 5], attacked);
              checkPos(design, board, piece.player, pos, 2, piece.type, [0, 4, 5], attacked);
              checkPos(design, board, piece.player, pos, 7, piece.type, [0, 2, 3, 4, 5], attacked);
              checkPos(design, board, piece.player, pos, 5, piece.type, [0, 2, 3, 4, 5], attacked);
              checkPos(design, board, piece.player, pos, 6, piece.type, [0, 3], attacked);
              checkPos(design, board, piece.player, pos, 8, piece.type, [0, 3], attacked);
          } else {
              checkPos(design, board, piece.player, pos, 1, piece.type, [0, 1, 2, 3, 4, 5], defended);
              checkPos(design, board, piece.player, pos, 4, piece.type, [0, 4, 5], defended);
              checkPos(design, board, piece.player, pos, 3, piece.type, [0, 4, 5], defended);
              checkPos(design, board, piece.player, pos, 2, piece.type, [0, 4, 5], defended);
              checkPos(design, board, piece.player, pos, 7, piece.type, [0, 2, 3, 4, 5], defended);
              checkPos(design, board, piece.player, pos, 5, piece.type, [0, 2, 3, 4, 5], defended);
              checkPos(design, board, piece.player, pos, 6, piece.type, [0, 3], defended);
              checkPos(design, board, piece.player, pos, 8, piece.type, [0, 3], defended);
          }
      }
  });
  return _.difference(defended, defended).length > 0;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  _.each(move.actions, function(a) {
      if ((a[0] !== null) && (a[1] !== null)) {
          var target = board.getPiece(a[1][0]);
          if (target !== null) {
              r += design.price[+target.type];
          }
          var piece = board.getPiece(a[0][0]);
          if ((piece !== null) && (piece.type != 0)) {
              if (checkKing(design, board, board.player, a[1][0], 1, piece.type, [1, 2, 3, 4, 5]) ||
                  checkKing(design, board, board.player, a[1][0], 4, piece.type, [2, 4, 5]) ||
                  checkKing(design, board, board.player, a[1][0], 3, piece.type, [2, 4, 5]) ||
                  checkKing(design, board, board.player, a[1][0], 2, piece.type, [2, 4, 5]) ||
                  checkKing(design, board, board.player, a[1][0], 7, piece.type, [2, 3, 4, 5]) ||
                  checkKing(design, board, board.player, a[1][0], 5, piece.type, [2, 3, 4, 5]) ||
                  checkKing(design, board, board.player, a[1][0], 6, piece.type, [3]) ||
                  checkKing(design, board, board.player, a[1][0], 8, piece.type, [3])) r += 100;
          }
          if (isBadPosition(design, board.apply(move))) {
              return -1;
          }
      }
  });
  return r;
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
  for (var p = 0; p < design.positions.length; p++) {
       var piece = board.getPiece(p);
       if ((piece !== null) && (piece.type == type) && (piece.player == player)) {
           return p;
       }
  }
  return null;
}

var checkDirection = function(design, board, player, pos, dir, types, from) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return false;
  if (from) {
      if (p == from) return false;
  }
  var piece = board.getPiece(p);
  if (piece == null) return false;
  if (_.indexOf(types, +piece.type) < 0) return false;
  return piece.player != player;
}

var isAttacked = function(design, board, player, pos) {
  var king   = design.getPieceType("Lion");
  var pawn   = design.getPieceType("Chick");
  var silver = design.getPieceType("Cat");
  var dog    = design.getPieceType("Dog");
  var hen    = design.getPieceType("ChickP");
  var gold   = design.getPieceType("CatP");
  var n  = design.getDirection("n");  var w  = design.getDirection("w");
  var s  = design.getDirection("s");  var e  = design.getDirection("e");
  var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
  var ne = design.getDirection("ne"); var se = design.getDirection("se");
  return checkDirection(design, board, player, pos, n,  [king, pawn, silver, gold, hen, dog]) ||
         checkDirection(design, board, player, pos, s,  [king, gold, hen, dog]) ||
         checkDirection(design, board, player, pos, w,  [king, gold, hen, dog]) ||
         checkDirection(design, board, player, pos, e,  [king, gold, hen, dog]) ||
         checkDirection(design, board, player, pos, nw, [king, silver, gold, hen, dog]) ||
         checkDirection(design, board, player, pos, ne, [king, silver, gold, hen, dog]) ||
         checkDirection(design, board, player, pos, sw, [king, silver]) ||
         checkDirection(design, board, player, pos, se, [king, silver]);
}

var checkMate = function(design, board, player, pos, n) {
  var king = design.getPieceType("Lion");
  var p = design.navigate(player, pos, n);
  if (p === null) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player == player) return false;
  if (piece.type != king) return false;
  var r = true;
  _.each([1, 2, 3, 4, 5, 6, 7, 8], function(dir) {
      if (r) {
          var q = design.navigate(piece.player, p, dir);
          if (q === null) return;
          var x = board.getPiece(q);
          if ((x !== null) && (x.player == piece.player)) return;
          if (!isAttacked(design, board, piece.player, q)) {
              r = false;
          }
      }
  });
  return r;
}

var checkPawn = function(design, board, player, pos, n, s) {
  var pawn = design.getPieceType("Chick");
  var p = design.navigate(player, pos, n);
  if (p === null) return true;
  while (p !== null) {
      var piece = board.getPiece(p);
      if (piece !== null) {
          if ((piece.player == player) && (piece.type == pawn)) return true;
      }
      p = design.navigate(player, p, n);
  }
  p = design.navigate(player, pos, s);
  while (p !== null) {
      var piece = board.getPiece(p);
      if (piece !== null) {
          if ((piece.player == player) && (piece.type == pawn)) return true;
      }
      p = design.navigate(player, p, s);
  }
  return false;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var pawn   = design.getPieceType("Chick");
  var king   = design.getPieceType("Lion");
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
      if (isAttacked(design, b, board.player, pos)) {
          move.failed = true;
          return;
      }
      if ((move.actions.length == 1) && (move.actions[0][0] !== null) && (move.actions[0][1] !== null)) {
          var from  = move.actions[0][0][0];
          var pos   = move.actions[0][1][0];
          var piece = b.getPiece(pos);        
          if ((piece !== null) && (piece.type == pawn) && !design.inZone(0, board.player, from)) {
              if (checkPawn(design, b, board.player, pos, n, s)) {
                  move.failed = true;
                  return;
              }
              if (checkMate(design, b, board.player, pos, n)) {
                  move.failed = true;
                  return;
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
