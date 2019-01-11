(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "lion-extension") {
      checkVersion(design, name, value);
  }
}

var isLion = function(piece) {
  if (piece === null) return false;
  return (piece.type == 14) || (piece.type == 15);
}

var lionCaptured = function(board, move) {
  if (move.isSimpleMove()) {
      var pos = move.actions[0][0][0];
      var piece = board.getPiece(pos);
      if ((piece !== null) && !isLion(piece)) {
          pos = move.actions[0][1][0];
          piece = board.getPiece(pos);
          if ((piece !== null) && isLion(piece)) return pos;
      }
  }
  return null;
}

var badCapturing = function(board, move) {
  var pos = move.actions[0][1][0];
  var piece = board.getPiece(pos);
  if ((piece !== null) && (piece.type > 1)) return null;
  if ((move.actions.length > 1) && (move.actions[1][0] !== null) && (move.actions[1][1] !== null)) {
      pos = move.actions[1][1][0];
      piece = board.getPiece(pos);
      if (isLion(piece)) return pos;
  }
  return null;
}

var isAttacked = function(design, board, player, pos) {
  // TODO:

  return true;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if ((move.actions.length > 0) && (move.actions[0][0] !== null) && (move.actions[0][1] !== null)) {
          var pos = null;
          var piece = board.getPiece(move.actions[0][0][0]);
          if (piece !== null) {
              if (isLion(piece)) {
                  pos = badCapturing(board, move);
              } else {
                  pos = lionCaptured(board, move);
                  if ((board.parent !== null) && !_.isUndefined(board.move)) {
                      var prev = lionCaptured(board.parent, board.move);
                      if ((prev === null) || (prev == pos)) {
                          pos = null;
                      }
                  }
              }
          }
          if (pos !== null) {
              if (isAttacked(design, board.apply(move), board.player, pos)) {
                  move.failed = true;
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
