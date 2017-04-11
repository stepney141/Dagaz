(function() {

var MAXVALUE  = 1000000;

function MaxMinAi(params, parent) {
  this.params = params;
  this.parent = parent;
  if (_.isUndefined(this.params.MIN_DEEP)) {
      this.params.MIN_DEEP = 2;
  }
  if (_.isUndefined(this.params.MAX_DEEP)) {
      this.params.MAX_DEEP = 5;
  }
  if (_.isUndefined(this.params.TIME_FRAME)) {
      this.params.TIME_FRAME = 300;
  }
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if (type == "maxmin") {
      return new MaxMinAi(params, parent);
  } else {
      return findBot(type, params, parent);
  }
}

Dagaz.AI.eval = function(design, params, board) {
  if (params.MOBILITY_WEIGHT) {
      board.generate(design);
      if (board.moves.length == 0) {
          return -MAXVALUE;
      }
  }
  var r = 0;
  if (params.MATERIAL_WEIGHT) {
      r += _.chain(board.pieces)
       .map(function(piece) {
           var r = design.price[piece.type];
           if (piece.player != board.player) {
               r = -r;
           }
           return r;
        })
       .compact()
       .reduce(function(acc, val) { 
           return acc + vale; 
        }, 0)
       .value() * params.MATERIAL_WEIGHT;
  }
  if (params.MOBILITY_WEIGHT) {
      r += board.moves.length * params.MOBILITY_WEIGHT;
      var b = board.copy();
      b.player = design.nextPlayer(b.player);
      b.generate(design);
      r -= b.moves.length * params.MOBILITY_WEIGHT;
  }
  return r;
}

MaxMinAi.prototype.eval = function(design, board, player) {
  if (_.isUndefined(this.params.eval)) {
      this.params.eval = Dagaz.AI.eval;
  }
  var r = this.params.eval(design, this.params, board);
  if (board.player != player) {
      r = -r;
  }
  return r;
}

Dagaz.AI.isForced = function(board, move) {
  return false;
}

MaxMinAi.prototype.isForced = function(board, move) {
  if (_.isUndefined(this.params.isForced)) {
      this.params.isForced = Dagaz.AI.isForced;
  }
  return this.params.isForced(board, move);
}

Dagaz.AI.isDiscarded = function(board, move) {
  return false;
}

MaxMinAi.prototype.isDiscarded = function(board, move) {
  if (_.isUndefined(this.params.isDiscarded)) {
      this.params.isDiscarded = Dagaz.AI.isDiscarded;
  }
  return this.params.isDiscarded(board, move);
}

Dagaz.AI.heuristic = function(self, design, params, board, move) {
  var b = board.apply(move);
  var r = self.eval(design, b, board.player) - self.eval(design, board, board.player);
  if (self.isForced(b, move)) {
      r += MAXVALUE;
  }
  if (self.isDiscarded(b, move)) {
      r -= MAXVALUE;
  }
  if (params.NOISE_FACTOR) {
      r += _.random(0, params.NOISE_FACTOR);
  }
  return r;
}

MaxMinAi.prototype.heuristic = function(design, board, move) {
  if (_.isUndefined(this.params.heuristic)) {
      this.params.heuristic = Dagaz.AI.heuristic;
  }
  return this.params.heuristic(this, design, this.params, board, move);
}

MaxMinAi.prototype.expand = function(ctx, frame) {
  if (frame.isLeaf) {
      frame.isLeaf = false;
      frame.childs = _.chain(Dagaz.AI.generate(ctx, frame.board))
       .filter(function(move) {
           return !this.isDiscarded(frame.board, move);
        }, this)
       .sortBy(function(move) {
           return -this.heuristic(ctx.design, frame.board, move);
        }, this)
       .map(function(move) {
           var board = frame.board.apply(move);
           return {
              isLeaf: true,
              level:  frame.level + 1,
              eval:   this.eval(ctx.design, this.params, board),
              board:  board,
              move:   move
           };
        }, this)
       .value();
      ctx.cnt++;
  }
}

MaxMinAi.prototype.getEval = function(ctx, frame) {
  if (frame.isLeaf) {
      if (frame.level > ctx.deep) {
          ctx.deep = frame.level;
      }
      return frame.eval;
  }
  var isChanged = false;
  _.each(frame.childs, function(child) {
      var value = this.getEval(ctx, child);
      if (value !== null) {
          if (frame.board.player != ctx.board.player) {
              if (frame.eval > child.eval) {
                  frame.eval = child.eval;
                  isChanged  = true;
              }
          } else {
              if (frame.eval < child.eval) {
                  frame.eval = child.eval;
                  isChanged  = true;
              }
          }
      }
  });
  if (isChanged) {
      frame.childs = _.chain(frame.childs)
       .sortBy(function(child) {
           if (frame.board.player != ctx.board.player) {
               return frame.eval;
           } else {
               return -frame.eval;
           }
        })
       .value();
      return frame.eval;
  } else {
      return null;
  }
}

MaxMinAi.prototype.shedule = function(frame) {
  if (frame.isLeaf) {
      if (frame.level >= this.params.MAX_DEEP) {
          return null;
      } else {
          return frame;
      }
  } else {
      var r = null;
      for (var i = 0; i < frame.childs.length; i++) {
           var child = this.shedule(frame.childs[i]);
           if (child !== null) {
               if (child.level < this.params.MIN_DEEP) {
                   return child;
               }
               if (r === null) {
                   r = child;
               }
           }
      }
      return r;
  }
}

MaxMinAi.prototype.setContext = function(ctx, board) {
  if (parent !== null) {
      parent.setContext(ctx, board);
  }
  if (!_.isUndefined(ctx.childs)) {
      delete ctx.childs;
  }
  ctx.board  = board;
  ctx.level  = 1;
  ctx.cnt    = 0;
  ctx.isLeaf = true;
}

MaxMinAi.prototype.getMove = function(ctx) {
  var timestamp = Date.now();
  while (Date.now() - timestamp < this.params.TIME_FRAME) {
      var frame = this.shedule(ctx);
      if (frame === null) break;
      this.expand(ctx, frame);
      if (ctx.childs.length == 0) {
          return { ai: "nothing" };
      }
      if (ctx.childs.length == 1) {
          return { move: ctx.childs[0].move, ai: "once" };
      }
  }
  this.getEval(ctx, ctx);
  if (ctx.moves.length > 0) {
      return {
         move: ctx.childs[0].move,
         eval: ctx.childs[0].eval,
         deep: ctx.deep,
         time: Date.now() - timestamp,
         cnt:  ctx.cnt,
         ai:   "maxmin"
      };
  } else {
      if (parent !== null) {
          return parent.getMove(ctx);
      }
  }
}

})();
