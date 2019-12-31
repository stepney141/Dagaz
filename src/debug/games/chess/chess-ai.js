(function() {

Dagaz.AI.inProgress = false;
Dagaz.AI.AI_FRAME   = 5000;

var MAX_VALUE = 2000000;

function Ai(parent) {
  this.parent = parent;
}

var AlphaBeta = function(ctx, board, move, level, alpha, beta) {
  // TODO:

}

Ai.prototype.setContext = function(ctx, board) {
  ctx.board = board;
  ctx.timestamp = Date.now();
}

Ai.prototype.getMove = function(ctx) {
  var moves = Dagaz.AI.generate(ctx, ctx.board);
  if (moves.length == 0) {
      return { done: true, ai: "nothing" };
  }
  if (moves.length == 1) {
      return {
           done: true,
           move: moves[0],
           time: Date.now() - ctx.timestamp,
           ai:  "once"
      };
  }
  if (!_.isUndefined(Dagaz.AI.heuristic)) {
      moves = _.chain(moves)
       .map(function(move) {
            return {
               move: move,
               weight: Dagaz.AI.heuristic(this, ctx.design, board, move)
            };
        }, this)
       .filter(function(node) {
           return node.weight >= 0;
        })
       .sortBy(function(node) {
           return -node.weight;
        })
       .map(function(node) {
           return node.move;
        }).value();
  }
  Dagaz.AI.inProgress = true;
  ctx.timestamp = Date.now();
  var best = null; var alpha = -MAX_VALUE; var beta = MAX_VALUE;
  for (var i = 0; i < moves.length; i++) {
       if ((best !== null) && (Date.now() - ctx.timestamp > Dagaz.AI.AI_FRAME)) break;
       var value = AlphaBeta(ctx, ctx.board, moves[i], 0, alpha, beta);
       if (value > alpha && value < beta) {
           alpha = value - 500;
           beta = value + 500;
           if (alpha < -MAX_VALUE) alpha = -MAX_VALUE;
           if (beta > MAX_VALUE) beta = MAX_VALUE;
       } else if (alpha != -MAX_VALUE) {
           alpha = -MAX_VALUE;
           beta = MAX_VALUE;
       }
       // TODO: best?

  }
  Dagaz.AI.inProgress = false;
  if (best !== null) {
      return {
           done: true,
           move: best,
           time: Date.now() - ctx.timestamp,
           ai:  "ab"
      };
  }
  if (this.parent) {
      return this.parent.getMove(ctx);
  }
}

})();
