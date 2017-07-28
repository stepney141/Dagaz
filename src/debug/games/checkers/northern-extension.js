(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "northern-extension") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.chain(board.moves)
   .filter(function(move) {
        return move.actions.length > 1;
    })
   .each(function(move) {
        var actions = [];
        _.each(move.actions, function(action) {
            var a = action;
            if ((action[0] !== null) && (action[1] === null)) {
                var pos = action[0][0];
                var piece = board.getPiece(pos);
                if ((piece !== null) && (piece.type == 1)) {
                     piece = piece.promote(0);
                     a = [ [ pos ], [ pos ], [ piece ], action[3] ];
                }
            }
            actions.push(a);
        });
        move.actions = actions;
    });
  CheckInvariants(board);
}

})();
