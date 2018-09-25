(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "halma-invariant") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var f = null;
  _.each(board.moves, function(move) {
      var pos = null;
      _.each(move.actions, function(a) {
          if ((a[0] !== null) && (a[1] !== null) && design.inZone(0, board.player, a[1][0])) {
              pos = a[1][0];
          }
      });
      if (pos !== null) {
          if (f === null) {
              f = false;
              _.each(design.allPositions(), function(p) {
                  if (design.inZone(1, board.player, p)) {
                      var piece = board.getPiece(p);
                      if ((piece !== null) && (piece.player == board.player)) {
                          f = true;
                      }
                  }
              });
          }
          if (f) {
              move.failed = true;
          }
      }
  });
  CheckInvariants(board);
}

})();
