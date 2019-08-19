(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gravity-extension") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var pos = move.actions[0][0][0];
      var p = design.navigate(board.player, pos, 3);
      while (p !== null) {
          var piece = board.getPiece(p);
          if (piece === null) break;
          if (pos == move.actions[0][0][0]) {
              piece = board.getPiece(move.actions[0][0][0]);
          }
          move.movePiece(p, pos, piece, 2);
          pos = p;
          p = design.navigate(board.player, pos, 3);
      }
  });
  CheckInvariants(board);
}

})();
