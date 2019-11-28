(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "senet-extension") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.mode == 0) return;
      if (move.isSimpleMove()) {
          var pos = move.actions[0][0][0];
          var piece = board.getPiece(move.actions[0][1][0]);
          if (piece !== null) {
              move.movePiece(move.actions[0][1][0], pos, piece);
          }
          pos = move.actions[0][1][0];
          if (pos == Dagaz.Model.stringToPos("k1")) {
              move.capturePiece(pos);
          }
      }
  });
  CheckInvariants(board);
}

})();
