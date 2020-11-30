(function() {

var promote = [];

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "shogi-promotion") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var n = design.getDirection("n");
  if (promote.length == 0) {
      promote[ design.getPieceType("Silver") ] = design.getPieceType("SilverP");
      promote[ design.getPieceType("Knight") ] = design.getPieceType("KnightP");
      promote[ design.getPieceType("Lance") ]  = design.getPieceType("LanceP");
      promote[ design.getPieceType("Bishop") ] = design.getPieceType("BishopP");
      promote[ design.getPieceType("Rook") ]   = design.getPieceType("RookP");
      promote[ design.getPieceType("Pawn") ]   = design.getPieceType("PawnP");
  }
  _.each(board.moves, function(move) {
      if (move.isSimpleMove()) {
          var pos    = move.actions[0][0][0];
          var target = move.actions[0][1][0];
          if ((design.inZone(1, board.player, pos) || design.inZone(1, board.player, target)) && design.inZone(0, board.player, pos)) {
              var isForced = false;
              var piece = board.getPiece(pos);
              if ((piece !== null) && !_.isUndefined(promote[piece.type])) {
                   var promoted = piece.promote(promote[piece.type]);
                   if ((piece.type == design.getPieceType("Pawn")) || (piece.type == design.getPieceType("Lance"))) {
                       if (design.navigate(board.player, target, n) === null) isForced = true;
                   }
                   if (piece.type == design.getPieceType("Knight")) {
                       var p = design.navigate(board.player, target, n);
                       if ((p === null) || (design.navigate(board.player, p, n) === null)) isForced = true;
                   }
                   if (isForced) {
                       move.actions[0][2] = [ promoted ];
                   } else {
                       move.actions[0][2] = [ piece, promoted ];
                   }
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
