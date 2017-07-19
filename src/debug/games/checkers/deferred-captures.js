(function() {

Dagaz.Model.deferredStrike = true;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "deferred-captures") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  _.chain(board.moves)
   .filter(function(move) {
        return move.actions.length > 0;
    })
   .each(function(move) {
        var mx = _.chain(move.actions)
         .map(function(action) {
              return action[3];
          }).max().value();
        _.chain(move.actions)
         .filter(function(action) {
              return (action[0] !== null) && (action[1] === null);
          })
         .each(function(action) {
              action[3] = mx;
          });
    });
  CheckInvariants(board);
}

})();
