(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "chaturanga-goal") {
      checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var design = Dagaz.Model.design;
  var king   = design.getPieceType("Raja");
  var kings  = _.chain(design.allPositions())
   .filter(function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return false;
      return piece.type == king;
    })
   .map(function(pos) {
      var piece = board.getPiece(pos);
      return piece.player;
    })
   .value();
  if (_.indexOf(kings, player) < 0) return -1;
  if (kings.length < 2) return 1;
  return checkGoals(design, board, player);
}

})();
