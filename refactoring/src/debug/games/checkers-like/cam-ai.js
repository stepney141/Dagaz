(function() {

Dagaz.AI.AI_FRAME = 500;

var bonus = [
    0,    0,    0,   20,   10,    0,  -10,  -20,  -30,    0,    0,    0,
    0,    0,   30,   20,   10,    0,  -10,  -20,  -30,  -40,    0,    0,
    0,   40,   30,   20,   10,    0,  -10,  -20,  -30,  -40,  -50,    0,
 1000,   50,   40,   30,   20,   10,  -10,  -20,  -30,  -40,  -50, -100,
    0,   40,   30,   20,   10,    0,  -10,  -20,  -30,  -40,  -50,    0,
    0,    0,   30,   20,   10,    0,  -10,  -20,  -30,  -40,    0,    0,
    0,    0,    0,   20,   10,    0,  -10,  -20,  -30,    0,    0,    0
];

Dagaz.AI.getPrice = function(design, piece, pos) {
  if (pos > 90) return 0;
  var r = design.price[piece.type];
  if (piece.player == 1) {
      r += bonus[pos];
  } else {
      r += bonus[90 - pos];
  }
  return r;
}

Dagaz.AI.eval = function(design, params, board, player) {
  if (_.isUndefined(board.completeEval)) {
      board.completeEval = 0;
      _.each(design.allPositions(), function(pos) {
           var piece = board.getPiece(pos);
           if (piece === null) return;
           var v = Dagaz.AI.getPrice(design, piece, pos);
           if (piece.player == board.player) {
               board.completeEval += v;
           } else {
               board.completeEval -= v;
           }
      });
  }
  if (board.player == player) {
      return board.completeEval;
  } else {
      return -board.completeEval;
  }
}

})();
