(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "epaminondas-invariant") {
      checkVersion(design, name, value);
  }
}

var sign = function(x) {
  if (x < 0) {
      return -1;
  } else if (x > 0) {
      return 1;
  } else {
      return 0;
  }
}

var countPieces = function(design, board, player, pos, dir) {
  var r = 0;
  while (pos !== null) {
      var piece = board.getPiece(pos);
      if ((piece === null) || (piece.player != player)) break;
      pos = design.navigate(player, pos, dir);
      r++;
  }
  return r;
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
              var s  = a[0][0];
              var d  = a[1][0];
              var dx = Dagaz.Model.getX(d) - Dagaz.Model.getX(s);
              var dy = Dagaz.Model.getY(d) - Dagaz.Model.getY(s);
              var delta = Math.max(Math.abs(dx), Math.abs(dy));
              if (delta > move.actions.length) {
                  move.failed = true;
                  return;
              }
              if ((t !== null) && (target == d)) {
                  t = null;
              }
              var piece = board.getPiece(d);
              if ((piece !== null) && (piece.player != board.player)) {
                  var dir = design.findDirection(s, s + Dagaz.Model.WIDTH * sign(dy) + sign(dx));
                  if (dir !== null) {
                      var cnt = countPieces(design, board, piece.player, d, dir);
                      if (cnt >= move.actions.length) {
                          move.failed = true;
                      }
                  }
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
