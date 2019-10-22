(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "lines-drops") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = board.game.design;  
  _.each(board.moves, function(move) {
      if (move.mode != 4) return;
      var piece = move.actions[0][2][0];
      var notFound = true;
      for (var pos = 0; pos < 3; pos++) {
           var x = board.getPiece(pos);
           if ((x !== null) && (x.type == piece.type)) {
               move.capturePiece(pos);
               notFound = false;
               break;
           }
      }
      if (notFound) {
          move.failed = true;
      }
  });
  CheckInvariants(board);
}

})();
