(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "turnover-bishops") {
     checkVersion(design, name, value);
  }
}

var isQueen = function(design, board, pos) {
  pos = design.navigate(board.player, pos, 8);
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
      if ((move.mode == 5) && !isQueen(design, board, move.actions[0][0][0])) {
          move.failed = true;
          return;
      }
      if ((move.mode == 4) || (move.mode == 5)) {
          if (isQueen(design, board, move.actions[0][0][0])) {
              move.sound = 14;
          }
          var pos = move.actions[0][1][0];
          var piece = board.getPiece(pos);
          var e = true;
          if (piece !== null) {
              if (piece.player == board.player) {
                  move.failed = true;
                  return;
              }
              e = false;
          }
          _.each([8, 9], function(dir) {
              var p = design.navigate(board.player, pos, dir);
              if (p === null) return;
              var piece = board.getPiece(p);
              if (piece === null) return;
              if (piece.player == board.player) return;
              if (e) {
                  move.movePiece(p, p, piece.changeOwner(board.player));
              } else {
                  move.capturePiece(p);
              }
          });
      }
  });
  CheckInvariants(board);
}

})();
