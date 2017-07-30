(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "senegalese-extension") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var pos = null;
      _.chain(move.actions)
       .filter(function(action) {
            return (action[0] !== null) && (action[1] !== null);
        })
       .each(function(action) {
            pos = action[1][0];
        });
      if ((pos !== null) && design.inZone(0, board.player, pos)) {
          move.capturePiece(pos);
      }
  });
  CheckInvariants(board);
}

})();
