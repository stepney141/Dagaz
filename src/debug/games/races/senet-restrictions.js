(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "senet-restrictions") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.mode == 0) return;
      if (move.isSimpleMove()) {
          var pos = design.navigate(1, move.actions[0][0][0], 0);;
          var dst = move.actions[0][1][0];
          var f = false; var p = false; var e = true;
          while (pos !== null) {
              var piece = board.getPiece(pos);
              if (!f && (pos == dst)) {
                  pos = design.navigate(1, pos, 0);
                  if (pos !== null) {
                      piece = board.getPiece(pos);
                      if ((piece !== null) && (piece.player != board.player)) {
                           move.failed = true;
                      }
                  }
              }
              if (piece !== null) e = false;
              if ((piece !== null) && (piece.player != board.player)) {
                  if (f) {
                      p = true;
                  }
                  f = true;
              } else {
                  f = false;
              }
              if ((pos == dst) || (pos === null)) break;
              pos = design.navigate(1, pos, 0);
          }
          if (e) return;
          piece = board.getPiece(dst);
          if (p) {
              if (piece === null) {
                  move.failed = true;
                  return;
              }
              pos = design.navigate(1, dst, 0);
              if (pos === null) {
                  move.failed = true;
                  return;
              }
              piece = board.getPiece(pos);
              if ((piece === null) || (piece.player == board.player)) {
                  move.failed = true;
                  return;
              }
              pos = design.navigate(1, pos, 0);
              if (pos !== null) {
                  piece = board.getPiece(pos);
                  if ((piece !== null) && (piece.player != board.player)) {
                      move.failed = true;
                      return;
                  }
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
