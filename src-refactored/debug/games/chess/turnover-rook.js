(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "turnover-rook") {
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
      if ((piece !== null) && (piece.type == 2)) {
          pos = move.actions[0][1][0];
          if (board.getPiece(pos) !== null) return;
          pos = design.navigate(board.player, pos,  9);
          if ((pos === null) || (board.getPiece(pos) !== null)) return;
          var p = design.navigate(board.player, pos,  9);
          if ((p === null) || (board.getPiece(p) === null)) return;
          piece = board.getPiece(p).promote(1).changeOwner(board.player);
          move.dropPiece(pos, piece);
          move.capturePiece(p);
      }
  });
  CheckInvariants(board);
}

})();
