(function() {

var checkVersion = Model.Game.checkVersion;

Model.Game.checkVersion = function(design, name, value) {
  if (name != "pente-restrictions") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Model.Game.CheckInvariants;

Model.Game.CheckInvariants = function(board) {
  var design = Model.Game.design;
  var design = Model.Game.design;
  var cnt = _.chain(board.pieces)
   .compact()
   .size()
   .value();
  if (cnt == 0) {
      _.chain(board.moves)
       .filter(function(move) {
           return move.actions.length > 0;
        })
       .each(function(move) {
           var pos = move.actions[0][1][0];
           if (!design.inZone(0, board.player, pos)) {
               move.failed = true;
           }
        });
  }
  if (cnt == 2) {
      _.chain(board.moves)
       .filter(function(move) {
           return move.actions.length > 0;
        })
       .each(function(move) {
           var pos = move.actions[0][1][0];
           if (design.inZone(1, board.player, pos)) {
               move.failed = true;
           }
        });
  }
  CheckInvariants(board);
}

})();
