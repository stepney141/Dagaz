(function() {

var MAXVALUE = 100000;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "horn-chess-goal") {
      checkVersion(design, name, value);
  }
}

var eval = Dagaz.AI.eval;

Dagaz.AI.eval = function(design, params, board, player) {
  if (board.player == 1) {
      var n = 0;  
      for (var pos = 0; pos < design.positions.length - 3; pos++) {
           var piece = board.getPiece(pos);
           if (piece === null) {
               n = 0;
               continue;
           }
           if (piece.player == 1) {
               n++;
           } else {
               if (n == 2) {
                   if (board.player != player) {
                       return MAXVALUE;
                   } else {
                       return -MAXVALUE;
                   }
               }
               break;
           }
      }
  }
  return eval(design, params, board, player);
}

})();
