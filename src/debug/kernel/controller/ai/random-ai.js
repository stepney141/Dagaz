(function() {

function RandomAi(design, parent, params) {
  this.design   = design;
  this.params   = params;
  this.parent   = parent;
}

var findBot = Dagaz.AI.findBot;

Dagaz.Model.findBot = function(design, type, parent, params) {
  if (type == "random") {
      return new RandomAi(design, parent, params);
  } else {
      if (!_.isUndefined(createBot)) {
          return createBot(design, type, parent, params);
      }
  }
}

RandomAi.prototype.getMove = function(ctx) {
  var r = Dagaz.AI.prepare(ctx, this.design);
  if (r) {
      return r;
  } else {
      var ix = Dagaz.getRandom(ctx.moves, ctx.restrict, this.params.MAX_ITERATIONS);
      if (_.isUndefined(ix)) { ix = 0; }
      return { move: ctx.moves[ix], ai: "random" };
  }
}

})();
