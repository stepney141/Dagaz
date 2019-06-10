(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "turnover-promotion") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!move.isSimpleMove() || !_.isUndefined(move.failed)) return;
      var pos = move.actions[0][0][0];
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == 0)) {
           pos = move.actions[0][1][0];
           if (!design.inZone(0, board.player, pos)) return;
           if (board.getPiece(pos) !== null) {
               move.capturePiece(pos);
           }
           pos = design.navigate(board.player, pos, 8);
           if (pos === null) {
               move.failed = true;
               return;
           }
           piece = piece.promote(1);
           move.actions[0][1] = [pos];
           move.actions[0][2] = [piece];
           pos = design.navigate(board.player, pos, 8);
           if (pos === null) {
               move.failed = true;
               return;
           }
           piece = board.getPiece(pos);
           if (piece === null) {
               piece = Dagaz.Model.createPiece(2, board.player);
               move.dropPiece(pos, pos, piece);
           } else {
               if (piece.player == board.player) return;
               piece = piece.changeOwner(board.player);
               move.movePiece(pos, pos, piece);
           }
      }
  });
  CheckInvariants(board);
}

})();
