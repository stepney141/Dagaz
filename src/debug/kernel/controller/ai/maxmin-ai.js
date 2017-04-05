(function() {

var MAXVALUE  = 1000000;

function AlphaBetaAi(design, parent, params) {
  this.design = design;
  this.params = params;
  this.parent = parent;
}

var findBot = Dagaz.AI.findBot;

Dagaz.Model.findBot = function(design, type, parent, params) {
  if (type == "maxmin") {
      return new AlphaBetaAi(design, parent, params);
  } else {
      if (!_.isUndefined(findBot)) {
          return findBot(design, type, parent, params);
      }
  }
}

Dagaz.AI.eval = function(board) {
  board.generate(this.design);
  if (board.moves.length == 0) {
      return -MAXVALUE;
  }
  var r = 0;
  if (this.params.MATERIAL_WEIGHT) {
      r += _.chain(board.pieces)
       .map(function(piece) {
           var r = this.design.price[piece.type];
           if (piece.player != board.player) {
               r = -r;
           }
           return r;
        }, this)
       .compact()
       .reduce(function(acc, val) { 
           return acc + vale; 
        }, 0)
       .value() * this.params.MATERIAL_WEIGHT;
  }
  if (this.params.MOBILITY_WEIGHT) {
      r += board.moves.length * this.params.MOBILITY_WEIGHT;
      if (this.params.OPPONENT_MOBILITY_WEIGHT) {
          var b = board.copy();
          b.player = design.nextPlayer(b.player);
          b.generate(this.design);
          r -= b.moves.length * this.params.OPPONENT_MOBILITY_WEIGHT;
      }
  }
  return r;
}

Dagaz.AI.heuristic = function(ctx, move) {
  if (_.isUndefined(ctx.eval)) {
      ctx.eval = Dagaz.AI.eval(ctx.board);
  }
  var name = move.toString();
  if (_.isUndefined(ctx.result[name])) {
      return MAXVALUE;
  }
  return -(ctx.eval + ctx.result[name].eval);
}

Dagaz.AI.isHot = function(board) {
  board.generate(this.design);
  return board.moves.length == 1;
}

var prepare = Dagaz.AI.prepare;

Dagaz.AI.prepare = function(ctx, design, sign) {
  var r = prepare(ctx, design);
  ctx.result = [];
  if (r) {
      return r;
  } else {
      if (!ctx.sign) {
          ctx.sign = 1;
      }
      _.each(ctx.moves, function(move) {
          var name  = move.toString();
          var board = ctx.board.apply(move);
          var eval  = Dagaz.AI.eval(board);
          ctx.result[name] = { 
              board:  board,
              eval:   eval 
          };
      });
  }
}

var nextCtx = Dagaz.AI.nextCtx;

Dagaz.AI.nextCtx = function(ctx, board) {
  // TODO:

  return r;
}

AlphaBetaAi.prototype.getMove = function(ctx) {
  var r = Dagaz.AI.prepare(ctx, this.design);
  if (r) {
      return r;
  } else {
      // TODO:

  }
}

})();
