(function() {

function RandomAi(params, parent) {
  this.params = params;
  this.parent = parent;
  if (_.isUndefined(this.params.rand)) {
      this.params.rand = _.random;
  }
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if (type == "opening") {
      return new RandomAi(params, parent);
  } else {
      return findBot(type, params, parent);
  }
}

RandomAi.prototype.setContext = function(ctx, board) {
  ctx.board  = board;
}

RandomAi.prototype.getMove = function(ctx) {
  var moves = Dagaz.AI.generate(ctx, ctx.board);
  moves = _.filter(moves, function(move) {
      return move.actions.length > 1;
  });
  if (moves.length > 0) {      
      if (moves.length == 1) {
          return { done: true, move: moves[0], ai: "once" };
      }
      var ix = this.params.rand(0, moves.length - 1);
      return {
          done: true,
          move: moves[ix],
          ai:   "random"
      };
  }
  if (this.parent) {
      return this.parent.getMove(ctx);
  }
}

})();
