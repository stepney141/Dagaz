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
  var len = ctx.childs.length;
  if (ctx.childs.length == 0) {
      return { ai: "nothing" };
  }
  if (ctx.childs.length == 1) {
      return { move: ctx.childs[0].move, ai: "once" };
  }
  if (_.isUndefined(this.params.rand)) {
      this.params.rand = _.random;
  }
  var ix = this.params.rand(0, len - 1);
  return {
      move: ctx.childs[ix].move,
      ai:   "random"
  };
}

})();
