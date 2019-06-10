(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "turnover-extension") {
     checkVersion(design, name, value);
  }
}

var capturePieces = function(design, board, player, pos, dir, move) {
  var p = design.navigate(player, pos,  dir);
  while (p !== null) {
      if (board.getPiece(p) !== null) {
          move.capturePiece(p);
      }
      p = design.navigate(player, p,  dir);
  }
}

var changePieces = function(design, board, player, pos, dir, move) {
  var p = design.navigate(player, pos,  dir);
  while (p !== null) {
      var piece = board.getPiece(p);
      if ((piece === null) || (piece.player == player)) break;
      piece = piece.changeOwner(player);
      move.movePiece(p, p, piece);
      p = design.navigate(player, p,  dir);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!move.isSimpleMove() || !_.isUndefined(move.failed)) return;
      var pos = move.actions[0][1][0];
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if (piece.player == board.player) {
              move.failed = true;
              return;
          }
          capturePieces(design, board, board.player, pos, 8, move);
          capturePieces(design, board, board.player, pos, 9, move);
      } else {
          changePieces(design, board, board.player, pos, 8, move);
          changePieces(design, board, board.player, pos, 9, move);
      }
  });
  CheckInvariants(board);
}

})();
