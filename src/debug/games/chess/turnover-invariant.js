(function() {

var positions = [135, 143, 151, 159, 167, 175, 183, 191, 134, 142, 150, 158, 166, 174, 182, 190, 133, 141, 149, 157, 165, 173, 181, 189, 132, 140, 148, 156, 164, 172, 180, 188, 131, 139, 147, 155, 163, 171, 179, 187, 130, 138, 146, 154, 162, 170, 178, 186, 129, 137, 145, 153, 161, 169, 177, 185, 128, 136, 144, 152, 160, 168, 176, 184];

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "turnover-invariant") {
      checkVersion(design, name, value);
  }
}

var notCastle = function(design, board, player, pos) {
  while (pos !== null) {
       var piece = board.getPiece(pos);
       if (piece === null) return true;
       if (piece.player != player) return true;
       pos = design.navigate(player, pos, 8);
  }
  return false;
}

var notEmpty = function(design, board, player, pos) {
  while (pos !== null) {
       if (board.getPiece(pos) !== null) return true;
       pos = design.navigate(player, pos, 8);
  }
  return false;
}

var checkPawn = function(design, board, player, pos, dir) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player == player) return false;
  p = design.navigate(player, p, 8);
  if (p === null) return false;
  if (board.getPiece(p) === null) return true;
  p = design.navigate(player, p, 8);
  if (p === null) return false;
  return board.getPiece(p) !== null;
}

var checkKnight = function(design, board, player, pos, o, d) {
  var p = design.navigate(player, pos, o);
  if (p === null) return false;
  p = design.navigate(player, p, d);
  if (p === null) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player == player) return false;
  p = design.navigate(player, p, 8);
  if (p === null) return false;
  if (board.getPiece(p) === null) return false;
  p = design.navigate(player, p, 8);
  if (p === null) return false;
  return board.getPiece(p) === null;
}

var checkRook = function(design, board, player, pos, dir) {
  var p = design.navigate(player, pos, dir);
  while (p !== null) {
      if (notEmpty(design, board, player, p)) {
          if (board.getPiece(p) !== null) return false;
          p = design.navigate(player, p, 8);
          if (p === null) return false;
          p = design.navigate(player, p, 8);
          if (p === null) return false;
          var piece = board.getPiece(p);
          if (piece === null) return false;
          return piece.player != player;
      }
      p = design.navigate(player, p, dir);
  }
  return false;
}

var checkBishop = function(design, board, player, pos, dir) {
  var p = design.navigate(player, pos, dir);
  while (p !== null) {
      if (notEmpty(design, board, player, p)) {
          if (board.getPiece(p) !== null) return false;
          p = design.navigate(player, p, 8);
          if (p === null) return false;
          var piece = board.getPiece(p);
          if (piece === null) return false;
          return piece.player != player;
      }
      p = design.navigate(player, p, dir);
  }
  return false;
}

var isAttacked = function(design, board, player, pos) {
  if (checkPawn(design, board, player, pos, 4)) return true;
  if (checkPawn(design, board, player, pos, 5)) return true;
  if (checkKnight(design, board, player, pos, 0, 4)) return true;
  if (checkKnight(design, board, player, pos, 0, 5)) return true;
  if (checkKnight(design, board, player, pos, 3, 6)) return true;
  if (checkKnight(design, board, player, pos, 3, 7)) return true;
  if (checkKnight(design, board, player, pos, 1, 5)) return true;
  if (checkKnight(design, board, player, pos, 1, 7)) return true;
  if (checkKnight(design, board, player, pos, 2, 4)) return true;
  if (checkKnight(design, board, player, pos, 2, 6)) return true;
  if (checkRook(design, board, player, pos, 0)) return true;
  if (checkRook(design, board, player, pos, 1)) return true;
  if (checkRook(design, board, player, pos, 2)) return true;
  if (checkRook(design, board, player, pos, 3)) return true;
  if (checkBishop(design, board, player, pos, 4)) return true;
  if (checkBishop(design, board, player, pos, 5)) return true;
  if (checkBishop(design, board, player, pos, 6)) return true;
  if (checkBishop(design, board, player, pos, 7)) return true;
  return false;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  board.generate(design);
  if (board.moves.length > 0) return checkGoals(design, board, player);
  var r = 0;
  _.each(positions, function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (notCastle(design, board, piece.player, pos)) return;
      if (isAttacked(design, board, piece.player, pos)) {
          if (piece.player != player) {
              return 1;
          } else {
              return -1;
          }
      }
  });
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;  
  _.each(board.moves, function(move) {
      var f = true;
      if (_.isUndefined(move.failed)) {
          var b = board.apply(move);
          _.each(positions, function(pos) {
                if (notCastle(design, b, board.player, pos)) return;
                if (isAttacked(design, b, board.player, pos)) {
                    move.failed = true;
                }
                f = false;
          });
      }
      if (f) {
          move.failed = true;
      }
  });
  CheckInvariants(board);
}

})();
