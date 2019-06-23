(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "turnover-pawns") {
     checkVersion(design, name, value);
  }
}

var isCastle = function(design, board, pos) {
  while (pos !== null) {
     if (board.getPiece(pos) === null) return false;
     pos = design.navigate(board.player, pos, 8);
  }
  return true;
}

var notKnight = function(design, board, pos) {
  pos = design.navigate(board.player, pos, 8);
  if (pos === null) return true;
  if (board.getPiece(pos) === null) return true;
  pos = design.navigate(board.player, pos, 8);
  if (pos === null) return true;
  return board.getPiece(pos) !== null;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!move.isSimpleMove()) return;
      if (isCastle(design, board, move.actions[0][0][0])) {
          move.sound = 15;
      } else if (move.mode == 1) {
          move.failed = true;
          return;
      }
      if ((move.mode == 3) && (notKnight(design, board, move.actions[0][0][0]))) {
          move.failed = true;
          return;
      }
      if ((move.mode == 0) || (move.mode == 1) || (move.mode == 3)) {
           var pos = move.actions[0][1][0];        
           var piece = board.getPiece(pos);
           if ((piece !== null) && (move.mode != 3)) {
               move.failed = true;
               return;
           }
           if ((move.mode != 3) && !notKnight(design, board, move.actions[0][0][0])) {
               move.failed = true;
               return;
           }
           pos = design.navigate(board.player, pos, 8);
           if (pos === null) {
               move.failed = true;
               return;
           }
           var f = true;
           piece = board.getPiece(pos);
           if (piece !== null) {
               if (piece.player != board.player) {
                   move.movePiece(pos, pos, piece.changeOwner(board.player));
               }
               f = false;
           }
           pos = design.navigate(board.player, pos, 8);
           if (pos === null) {
               move.failed = true;
               return;
           }
           piece = board.getPiece(pos);
           if (piece !== null) {
               if (f && (move.mode == 1)) {
                   move.failed = true;
                   return;
               }
               if (piece.player != board.player) {
                   move.movePiece(pos, pos, piece.changeOwner(board.player));
               }
           }
      }
      var noCapturing = true;
      if (move.mode == 2) {
           if (!notKnight(design, board, move.actions[0][0][0])) {
               move.failed = true;
               return;
           }
           var pos = move.actions[0][1][0];
           if (pos !== null) {
               var piece = board.getPiece(pos);
               if (piece !== null) {
                   if (piece.player == board.player) {
                       move.failed = true;
                       return;
                   }
                   noCapturing = false;
               }
               pos = design.navigate(board.player, pos, 8);
           }
           while (pos !== null) {
               var piece = board.getPiece(pos);
               if (piece !== null) {
                   if (piece.player == board.player) {
                       move.failed = true;
                       return;
                   } else {
                       move.capturePiece(pos);
                   }
                   noCapturing = false;
               }
               pos = design.navigate(board.player, pos, 8);
           }
          if (noCapturing) {
              move.failed = true;
          }
      }
  });
  CheckInvariants(board);
}

})();
