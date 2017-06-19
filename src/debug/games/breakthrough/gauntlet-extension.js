(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gauntlet-extension") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var moves = _.filter(board.moves, function(move) {
      var actions = _.filter(move.actions, function(action) {
          return (action[0] !== null) && (action[1] === null);
      });
      return actions.length > 0;
  });
  if (moves.length > 0) {
      board.moves = moves;
  }
  CheckInvariants(board);
}

})();
