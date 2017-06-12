(function() {

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var up = design.getDirection("up");
  _.chain(board.moves)
   .filter(function(move) {
       return move.actions == 1;
    })
   .each(function(move) {
       var from = move.actions[0][0][0];
       var to   = move.actions[0][1][0];
       var dir  = design.findDirection(from, to);
       if (dir !== null) {
           var p = design.navigate(board.player, from, up);
           while (p !== null) {
               var piece = board.getPiece(p);
               if (piece !== null) {
                   var t = design.navigate(board.player, p, dir);
                   if (t !== null) {
                       move.movePiece(p, t, piece);
                   }
               }
               p = design.navigate(board.player, p, up);
           }
       }
    });
  CheckInvariants(board);
}

})();
