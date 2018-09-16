(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "mine-restrictions") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  if (!_.isUndefined(board.ko)) {
      _.each(board.moves, function(move) {
          if ((move.actions.length > 0) && (move.actions[0][0] === null) && (move.actions[0][1] === null)) {
               var pos = move.actions[0][1][0];
               if (_.indexOf(board.ko, pos) >= 0) {
                   move.failed = true;
               }
          }
      });
  }
  CheckInvariants(board);
}

})();
