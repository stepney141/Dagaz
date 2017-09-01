var Dagaz  = {
  Model:      {},
  View:       {},
  AI:         {},
  KPI:        {},
  Controller: {}
};

Dagaz.KPI.open  = function(scope, stage) {}
Dagaz.KPI.stage = function(stage, scope) {}
Dagaz.KPI.close = function(scope) {}
Dagaz.KPI.set   = function(scope, name, value) {}
Dagaz.KPI.dump  = function() {}

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
