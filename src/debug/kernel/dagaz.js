var Dagaz  = {
  Model:      {},
  View:       {},
  AI:         {},
  Controller: {}
};

Dagaz.AI.findBot = function(type, params, parent) {
  return parent;
}

Dagaz.AI.createContext = function(design) {
  return {
     design: design
  };
}

Dagaz.AI.generate = function(ctx, board) {
  board.generate(ctx.design);
  return _.chain(board.moves)
   .map(function(move) {
       return move.determinate();
    })
   .flatten()
   .value();
}

Dagaz.AI.reject = function(ctx, move) {
  ctx.childs = _.filter(ctx.childs, function(child) {
      return child.move.toString() != move.toString();
  });
}
