(function() {

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.chain(board.moves)
   .filter(function(move) {
       return move.actions == 1;
    })
   .each(function(move) {
       var pos = move.actions[0][1][0];
       _.each(design.allDirections(), function(dir) {
           var e = design.navigate(board.player, pos, dir);
           if (e !== null) {
               var piece = board.getPiece(e);
               if ((piece !== null) && (piece.player != board.player)) {
                   var p = design.navigate(board.player, e, dir);
                   if (p !== null) {
                       piece = board.getPiece(p);
                       if ((piece !== null) && (piece.player == board.player)) {
                           move.capturePiece(e);
                       }
                   }
               }
           }
       });
    });
  CheckInvariants(board);
}

})();
