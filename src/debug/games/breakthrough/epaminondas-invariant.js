(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "epaminondas-invariant") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var target = null;
  _.each(design.allPositions(), function(pos) {
      if (design.inZone(0, board.player, pos)) {
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.player != board.player)) {
              target = pos;
          }
      }
  });
  _.each(board.moves, function(move) {
      var t = target;
      _.each(move.actions, function(a) {
          if (_.isUndefined(move.failed) && (a[0] !== null) && (a[1] !== null)) {
              var s = a[0][0];
              var d = a[1][0];
              var delta = Math.max(Math.abs(Dagaz.Model.getX(d) - Dagaz.Model.getX(s)), Math.abs(Dagaz.Model.getY(d) - Dagaz.Model.getY(s)));
              if (delta > move.actions.length) {
                  move.failed = true;
                  return;
              }
              if ((t !== null) && (target == d)) {
                  t = null;
              }
          }
      });
      if (t !== null) {
          move.failed = true;
      }
  });
  CheckInvariants(board);
}

})();
