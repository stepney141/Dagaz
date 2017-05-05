(function() {

var checkVersion = Model.Game.checkVersion;
var strictMode = false;

Model.Game.checkVersion = function(design, name, value) {
  if (name == "jungle-extension") {
      if (value == "strict") {
          strictMode = true;
      }
  } else {
      checkVersion(design, name, value);
  }
}

var isGe = function(a, b) {
  if (a == 1) {
      return b == 8;
  }
  if (strictMode) {
      if ((a == 8) && (b == 1)) return false;
  }
  return a >= b;
}

var CheckInvariants = Model.Game.CheckInvariants;

Model.Game.CheckInvariants = function(board) {
  var design = Model.Game.design;
  board.moves = _.each(board.moves)
   .filter(function(move) {
       if (move.actions.length != 1) return false;
       return (move.actions[0][0] !== null) && (move.actions[0][1] !== null);
    })
   .filter(function(move) {
       var to = move.actions[0][1][0];
       var target = board.getPiece(to);
       if (target === null) return true;
       var from = move.actions[0][0][0];
       var piece = board.getPiece(from);
       if (isGe(piece.getValue(0), target.getValue(0))) return true;
       if (design.inZone(0, target.player, to)) return true;
       if (design.inZone(1, board.player, from) != design.inZone(1, board.player, to)) return true;
       return false;
    })
   .value();
  CheckInvariants(board);
}

})();
