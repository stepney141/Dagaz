(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "drop-num") {
     checkVersion(design, name, value);
  }
}

var calcDrop = function(board) {
  var r = 1;
  while (board.parent !== null) {
      if (!_.isUndefined(board.move) && board.move.isDropMove()) r++;
      board = board.parent;
  }
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var cnt = calcDrop(board);
  _.each(board.moves, function(move) {
      if (!move.isDropMove()) return;
      var piece = move.actions[0][2][0];
      if (piece === null) return;
      move.actions[0][2] = [piece.setValue(0, cnt)];
  });
  CheckInvariants(board);
}

})();
