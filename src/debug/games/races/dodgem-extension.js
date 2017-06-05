(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "dodgem-extension") {
     checkVersion(design, name, value);
  }
}

Dagaz.Model.checkGoals = function(design, board, player) {
  var friends = 0;
  board.generate();
  if (board.moves.length == 0) {
      return -1;
  }
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.player == player)) {
          friends++;
      }
  });
  if (friends == 0) {
      return 1;
  } else {
      return 0;
  }
}

})();
