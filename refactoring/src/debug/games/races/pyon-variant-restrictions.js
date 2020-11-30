(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "pyon-variant-restrictions") {
     checkVersion(design, name, value);
  }
}

var checkZone = function(design, board, player, zone) {
  var a = 0; var b = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.player == player)) {
          if (design.inZone(zone, player, pos)) a++;
          if (design.inZone(zone + 1, player, pos)) b++;
      }
  });
  if (a > 3) return true;
  return (b > 3) && (a > 2);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var b = board.apply(move);
      if (checkZone(design, b, board.player, 1) ||
          checkZone(design, b, board.player, 3)) {
          move.failed = true;
      }
  });
  CheckInvariants(board);
}

})();
