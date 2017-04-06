(function() {

var MAXVALUE  = 1000000;

function MaxMinAi(parent, params) {
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

Dagaz.Model.findBot = function(type, parent, params) {
  if (type == "maxmin") {
      return new MaxMinAi(parent, params);
  } else {
      if (!_.isUndefined(findBot)) {
          return findBot(type, parent, params);
      }
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

MaxMinAi.prototype.eval = function(board, design, player) {
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

Dagaz.AI.heuristic = function(self, board, move) {
  var b = board.apply(move);
  var r = self.eval(b, board.player) - self.eval(board, board.player);
  if (self.isForced(b, move)) {
      r += MAXVALUE;
  }
  if (self.isDiscarded(b, move)) {
      r -= MAXVALUE;
  }
  return r;
}

MaxMinAi.prototype.heuristic = function(board, move) {
  if (_.isUndefined(this.params.heuristic)) {
      this.params.heuristic = Dagaz.AI.heuristic;
  }
  return this.params.heuristic(this, board, move);
}

MaxMinAi.prototype.arrangeMoves = function(frame, level) {
  frame.moves = _.chain(frame.moves)
   .filter(function(move) {
       return !this.isDiscarded(frame.board, move);
    }, this)
   .sortBy(function(move) {
       return -this.heuristic(frame.board, move);
    }, this)
   .map(function(move) {
       return {
          level: level,
          board: frame.board.apply(move),
          move:  move
       };
    })
   .value();
}

// TODO: Recursive changed flag
MaxMinAi.prototype.sortEvals = function(ctx, frame) {
  if (frame.changed) {
      var sign = (frame.board.player != ctx.board.player) : -1 : 1;
      frame.moves = _.chain(frame.moves)
       .each(function(child) {
           this.sortEvals(ctx, child);
        }, this)
       .filter(function(child) {
           return !_.isUndefined(child.eval);
        })
       .sortBy(function(child) {
           return -child.eval * sign;
        })
       .value();
      if (frame.moves.length > 0) {
          frame.eval = frame.moves[0].eval;
          if (_.isUndefined(frame.deep)) {
              frame.deep = frame.level;
          }
          if (frame.moves[0].deep > frame.deep) {
              frame.deep = frame.moves[0].deep;
          }
      } else {
          frame.eval = -MAXVALUE * sign;
      }
      frame.changed = false;
  }
}

MaxMinAi.prototype.calculate = function(ctx, frame) {
  if (_.isUndefined(frame.moves)) {
      frame.board.generate(ctx.design);
      frame.moves = _.chain(frame.board.moves)
       .map(function(move) {
           return move.determinate();
        })
       .flatten()
       .value();
      this.arrangeMoves(frame, frame.level + 1);
      frame.changed = true;
      ctx.cnt++;
  }
}

MaxMinAi.prototype.getFrame = function(ctx) {
  // TODO: Shedule

  return null;
}

var prepare = Dagaz.AI.prepare;

Dagaz.AI.prepare = function(ctx) {
  var r = prepare(ctx);
  if (r) return r;
  this.arrangeMoves(ctx, ctx.board, 1);
  ctx.cnt = 0;
}

MaxMinAi.prototype.getMove = function(ctx) {
  var timestamp = getTime();
  while (getTime() - timestamp < this.params.TIME_FRAME) {
      var frame = this.getFrame(ctx);
      if (frame === null) break;
      this.calculate(ctx, frame);
  }
  this.sortEvals(ctx, ctx);
  if (ctx.moves.length > 0) {
      return {
         move: ctx.moves[0].move,
         eval: ctx.moves[0].eval,
         deep: ctx.deep,
         time: getTime() - timestamp,
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
