(function() {

function RandomAi(params) {
  this.params = params;
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if (type == "random") {
      return new RandomAi(params);
  } else {
      return findBot(type, params, parent);
  }
}

RandomAi.prototype.setContext = function(ctx, board) {
  if (!_.isUndefined(ctx.childs)) {
      delete ctx.childs;
  }
  ctx.board  = board;
}

RandomAi.prototype.getMove = function(ctx) {
  if (_.isUndefined(ctx.childs)) {
      ctx.childs = _.chain(Dagaz.AI.generate(ctx, ctx.board))
       .map(function(move) {
           return {
              move: move
           };
        }, this)
       .value();
  }
  if (ctx.childs.length == 0) {      
      return { done: true, ai: "nothing" };
  }
  if (ctx.childs.length == 1) {
      return { done: true, move: ctx.childs[0].move, ai: "once" };
  }
  if (_.isUndefined(this.params.rand)) {
      this.params.rand = _.random;
  }
  var ix = this.params.rand(0, ctx.childs.length - 1);
  return {
      done: true,
      move: ctx.childs[ix].move,
      ai:   "random"
  };
}

})();
