(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "cyclic-checkers-restrictions") {
      checkVersion(design, name, value);
  }
}

var isTarget = function(design, board, pos, dir, piece) {
  var p = design.navigate(1, pos, dir);
  if (piece.type == 1) {
      while (p !== null) {
          if (board.getPiece(p) !== null) break;
          p = design.navigate(1, p, dir);
      }
  }
  if (p === null) return false;
  var x = board.getPiece(p);
  if (x === null) return false;
  if (x.player == board.player) return false;
  p = design.navigate(1, p, dir);
  if (p === null) return false;
  return board.getPiece(p) === null;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var piece = null; var target = null;
      for (var i = 0; i < move.actions.length; i++) {         
           if (piece === null) {
               if ((move.actions[i][0] !== null) && (move.actions[i][1] !== null)) {
                    piece = board.getPiece(move.actions[i][0][0]);
                    if (piece === null) return;
               }
           }
           if (target !== null) {
               if ((move.actions[i][0] !== null) && (move.actions[i][1] !== null)) {
                    var pos = move.actions[i][0][0];
                    _.each([0, 1, 2, 3], function(dir) {
                        if (isTarget(design, board, pos, dir, piece)) move.failed = true;
                    });
               }
               target = null;
           }
           if ((move.actions[i][0] !== null) && (move.actions[i][1] === null)) {
               target = board.getPiece(move.actions[i][0][0]);
               if (target.player != board.player) {
                   target = null;
               }
           }
      }
  });
  CheckInvariants(board);
}

})();
