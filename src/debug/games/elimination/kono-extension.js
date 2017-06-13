(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "kono-extension") {
     checkVersion(design, name, value);
  }
}

Dagaz.Model.checkGoals = function(design, board, player) {
  var enemies = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.player != player)) {
          enemies++;
      }
  });
  if (enemies < 2) {
      return 1;
  } else {
      return 0;
  }
}

})();
