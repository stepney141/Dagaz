(function() {

Dagaz.Model.passForcedDraw = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "backgammon-extension") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.isSimpleMove()) {
          var pos = move.actions[0][0][0];
          var piece = board.getPiece(pos);
          if (piece !== null) {
              var v = +piece.getValue(0);
              if ((v !== null) && (v > 1)) {
                  piece = piece.setValue(0, v - 1);
                  move.dropPiece(pos, piece);
              }
          }
          pos = move.actions[0][1][0];
          var target = board.getPiece(pos);
          if (target !== null) {
              var v = +target.getValue(0);
              if ((v === null) || (v == 0)) {
                  v = 1;
              }
              if (target.player == board.player) {
                  target = target.setValue(0, v + 1);
                  move.actions[0][2] = [target];
              } else {
                  if (v > 1) {
                      move.failed = true;
                      return;
                  }
                  var p = design.navigate(board.player, 0, 1);
                  while (p !== null) {
                      if (board.getPiece(p) === null) {
                          move.movePiece(pos, p, target);
                          break;
                      }
                      p = design.navigate(board.player, p, 1);
                  }
                  piece = piece.setValue(0, 1);
                  move.actions[0][2] = [piece];
              }
          } else {
              piece = piece.setValue(0, 1);
              move.actions[0][2] = [piece];
          }
      }
  });
  CheckInvariants(board);
}

})();
