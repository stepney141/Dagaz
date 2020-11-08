(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "turnover-rooks") {
     checkVersion(design, name, value);
  }
}

var isQueen = function(design, board, pos) {
  pos = design.navigate(board.player, pos, 9);
  if (pos !== null) {
     if (board.getPiece(pos) === null) return false;
  }
  return true;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!move.isSimpleMove()) return;
      if (move.mode == 6) {
          if (isQueen(design, board, move.actions[0][0][0])) {
              move.sound = 13;
          }
          var pos = design.navigate(board.player, move.actions[0][0][0], 9);
          if ((pos !== null) && (board.getPiece(pos) !== null)) {
              move.failed = true;
              return;
          }
          pos = move.actions[0][1][0];
          var piece = board.getPiece(pos);
          var e = true;
          if (piece !== null) {
              if (piece.player == board.player) {
                  move.failed = true;
                  return;
              }
              e = false;
          }
          var f = true;
          var p = design.navigate(board.player, pos, 9);
          if (p !== null) {
              var piece = board.getPiece(p);
              if (piece !== null) {
                  f = false;
                  if (piece.player != board.player) {
                      if (e) {
                          move.movePiece(p, p, piece.changeOwner(board.player));
                      } else {
                          move.capturePiece(p);
                      }
                  }
              }
          }
          p = design.navigate(board.player, p, 9);
          if (p !== null) {
              var piece = board.getPiece(p);
              if (piece !== null) {
                  if (piece.player != board.player) {
                      if (e) {
                          move.movePiece(p, p, piece.changeOwner(board.player));
                      } else {
                          move.capturePiece(p);
                      }
                  } else if (f) {
                      move.failed = true;
                      return;
                  }
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
