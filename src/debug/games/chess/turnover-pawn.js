(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "turnover-pawn") {
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
          if (board.getPiece(pos) !== null) return;
          pos = design.navigate(board.player, pos,  8);
          if ((pos === null) || (board.getPiece(pos) !== null)) return;
          var p = design.navigate(board.player, pos,  8);
          if ((p === null) || (board.getPiece(p) === null)) return;
          piece = piece.promote(1).changeOwner(board.player);
          move.actions[0][1] = [pos];
          move.actions[0][2] = [piece];
          piece = board.getPiece(p).changeOwner(board.player);
          move.movePiece(p, p, piece);
      }
  });
  CheckInvariants(board);
}

})();
