var Dagaz  = {
  Model:      {},
  View:       {},
  AI:         {},
  Controller: {}
};

Dagaz.AI.findBot = function(design, type, parent, params) {
  return parent;
}

Dagaz.AI.getCtx = function(board) {
  return { board: board.copy(), restrict: [] };
}

Dagaz.AI.nextCtx = function(ctx, board) {
  return Dagaz.AI.getCtx(board);
}

Dagaz.AI.prepare = function(ctx, design) {
  if (_.isUndefined(ctx.moves)) {
      ctx.board.generate(design);
      ctx.moves = _.chain(ctx.board.moves)
       .map(function(move) {
           return move.determinate();
        })
       .flatten()
       .value();
  }
  if (ctx.moves.length == 0) {
      return { ai: "nothing" };
  }
  if (ctx.moves.length == 1) {
      return { move: ctx.moves[0], ai: "once" };
  }
}
