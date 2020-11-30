(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "koom-valley-extension") {
      checkVersion(design, name, value);
  }
}

var neighborFound = function(design, board, pos) {
  var r = false;
  _.each(design.allDirections(), function(dir) {
      var p = design.navigate(board.player, pos, dir);
      if (p === null) return;
      var piece = board.getPiece(p);
      if (piece === null) return;
      if (piece.type != 1) return;
      if (piece.player == board.player) r = true;
  });
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  if (board.player == 1) {
      _.each(board.moves, function(move) {
          if (move.isSimpleMove()) {
              var pos = move.actions[0][0][0];
              var piece = board.getPiece(pos);
              if (piece === null) return;
              if (piece.type == 1) {
                  pos = move.actions[0][1][0];
                  _.each(design.allDirections(), function(dir) {
                       var e = design.navigate(board.player, pos, dir);
                       if (e === null) return;
                       var piece = board.getPiece(e);
                       if ((piece === null) || (piece.player == board.player)) return;
                       var f = design.navigate(board.player, e, dir);
                       if (f === null) return;
                       piece = board.getPiece(f);
                       if ((piece === null) || (piece.player != board.player)) return;
                       move.capturePiece(e);
                  });
              } else {
                  if (!neighborFound(design, board, pos)) {
                       move.failed = true;
                       return;
                  }
                  pos = move.actions[0][1][0];
                  if (!neighborFound(design, board, pos)) {
                       move.failed = true;
                  }
              }
          }
      });
  }
  CheckInvariants(board);
}

})();
