(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "martian-extension") {
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
          if (piece === null) return;
          pos = move.actions[0][1][0];
          for (var player = 1; player <= 4; player++) {
               if ((piece.player != player) && design.inZone(0, player, pos)) {
                   move.actions[0][2] = [piece.changeOwner(player)];
               }
          }
      }
  });
  CheckInvariants(board);
}

})();
