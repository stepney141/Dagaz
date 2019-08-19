(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gravity-fall") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.actions.length != 2) return;
      var pos  = move.actions[1][0][0];
      var last = null;
      while (pos !== null) {
          if (board.getPiece(pos) !== null) break;
          last = pos;
          pos = design.navigate(board.player, pos, 4);
      }
      if (last !== null) {
          move.actions[1][1] = [last];
      }
  });
  CheckInvariants(board);
}

})();
