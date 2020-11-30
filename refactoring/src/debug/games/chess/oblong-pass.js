(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "oblong-pass") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var f = true;
  _.each(board.moves, function(move) {
      if (!_.isUndefined(move.failed)) return;
      if ((move.mode <= 1) || (move.mode >= 6)) return;
      f = false;
  });
  _.each(board.moves, function(move) {
      if (move.mode != 7) return;
      if (f) {
          move.failed = true;
      } else {
          board.ko.push(move.actions[0][0][0]);
      }
  });
  CheckInvariants(board);
}

})();
