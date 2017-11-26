(function() {

var SIZE = 15;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "thud-extension") {
     checkVersion(design, name, value);
  }
}

var getX = function(pos) {
  return pos % SIZE;
}

var getY = function(pos) {
  return (pos / SIZE) | 0;
}

var badDistance = function(design, board, player, pos, dir, distance) {
  while (distance > 0) {
      pos = design.navigate(player, pos, dir);
      if (pos === null) return true;
      var piece = board.getPiece(pos);
      if (piece === null) return true;
      if (piece.player != player) return true;
      distance--;
  }
  return false;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(m) {
      if (m.isSimpleMove()) {
          var pos      = m.actions[0][0][0];
          var target   = m.actions[0][1][0];
          var x        = getX(target - pos);
          var y        = getY(target - pos);
          var distance = Math.max(Math.abs(x), Math.abs(y));
          var dir      = design.findDirection(pos + Math.sign(y) * SIZE + Math.sign(x), pos);
          var piece    = board.getPiece(pos);
          if ((piece !== null) && (dir !== null)) {
              if (piece.type == 0) {
                  if ((board.getPiece(target) !== null) && (distance > 1)) {
                      if (badDistance(design, board, board.player, pos, dir, distance - 1)) {
                          m.failed = true;
                      }
                  }
              } else {
                  if (distance > 1) {
                      if (badDistance(design, board, board.player, pos, dir, distance - 1)) {
                          m.failed = true;
                      }
                  }
                  _.each(design.allDirections(), function(d) {
                      var p = design.navigate(board.player, target, d);
                      if (p !== null) {
                          var piece = board.getPiece(p);
                          if ((piece !== null) && (piece.type == 0)) {
                              m.capturePiece(p);
                          }
                      }
                  });
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
