(function() {

function SgfAi(params, parent) {
  this.params   = params;
  this.parent   = parent;
}

var findBot = Dagaz.Model.findBot;

Dagaz.Model.findBot = function(type, params, parent) {
  if ((type == "sgf") || (type == "opening")) {
      return new SgfAi(params, parent);
  } else {
      return findBot(type, params, parent);
  }
}

var compareMove = Dagaz.Model.compareMove;

Dagaz.Model.compareMove = function(move, notation, board, design) {
  if (_.chain(move.actions)
   .filter(function(action) {
       return (action[1] !== null);
    })
   .first()
   .map(function(action) {
       var r = Dagaz.Model.posToString(action[1][0]);
       if (action[0] !== null) {
           r = Dagaz.Model.posToString(action[0][0]) + r;
       }
       return r;
    })
   .value() == notation) {
    return true;
  } else {
    return compareMove(move, notation, board, design);
  }
}

var getMoves = function(sgf, pos, r) {
  if (_.isUndefined(r)) {
      r = [];
  }
  if (pos >= sgf.length) return r;
  if (_.isArray(sgf[pos])) {
      for (var i = pos; i < sgf.length; i++) {
           getMoves(sgf[pos], 0, r);
      }
  } else {
      if (sgf[pos].arg.length > 0) {
         r.push({
            notation: sgf[pos].arg[0],
            sgf:      sgf,
            pos:      pos + 1
         });
      }
  }
  return r;
}

MaxMinAi.prototype.setContext = function(ctx, board) {
  if (this.parent !== null) {
      this.parent.setContext(ctx, board);
  }
  if (!_.isUndefined(ctx.childs)) {
      delete ctx.childs;
  }
  if (!_.isUndefined(params.OPENING)) {
      if (_.isUndefined(ctx.frames)) {
          ctx.frames = [];
          ctx.frames.push({
              board: board,
              sgf:   params.OPENING,
              pos:   0
          });
          ctx.ix = 0;
      } else {
          ctx.ix = _.chain(_.range(ctx.frames.length))
           .filter(function(ix) {
               return (board.player == ctx.frames[ix].board.player) &&
                      board.isEquals(ctx.frames[ix].board);
            })
           .first()
           .value();
          if (ctx.ix) {
              ctx.frames = ctx.frames.slice(0, ctx.ix + 1);
          } else {
              var frame = ctx.frames[ctx.ix];
              delete ctx.ix;
              var moves = getMoves(frame.sgf, frame.pos);
              var variant = _.chain(moves)
               .filter(function(move) {
                   return Dagaz.Model.compareMove(board.move, move.notation, board, ctx.design);
                }, this)
               .first()
               .value();
             if (variant) {
                 ctx.ix = ctx.frames.length;
                 ctx.frames.push({
                    board: board.parent,
                    sgf:   variant.sgf,
                    pos:   variant.pos
                 });
             }
          }
      }
  }
}

MaxMinAi.prototype.getMove = function(ctx) {
  if (_.isUndefined(ctx.childs)) {
      if (ctx.ix) {
          var frame  = ctx.frames[ctx.ix];
          var moves  = getMoves(frame.sgf, frame.pos);
          ctx.childs = _.chain(Dagaz.AI.generate(ctx, ctx.board))
           .map(function(move) {
               return {
                  move:  move
                  frame: _.chain(moves)
                          .filter(function(m) {
                              return Dagaz.Model.compareMove(move, m.notation, ctx.board, ctx.design);
                           })
                          .value();
               };
            })
           .filter(function(child) {
               return child.frame.length > 0;
            })
           .value();
      }
  }
  if (ctx.childs) {
      var len = ctx.childs.length;
      if (ctx.childs.length == 1) {
          return { done: true, move: ctx.childs[0].move, ai: "opening" };
      }
      if (_.isUndefined(this.params.rand)) {
          this.params.rand = _.random;
      }
      var n  = this.params.rand(0, len - 1);
      ctx.ix = this.frames.length;
      ctx.frames.push({
          board: ctx.board,
          sgf:   ctx.childs[r].frame[0].sgf,
          pos:   ctx.childs[r].frame[0].pos
      });
      return {
          done: true,
          move: ctx.childs[n].move,
          ai:   "opening"
      };
  }
  if (this.parent !== null) {
      delete ctx.childs;
      return this.parent.getMove(ctx);
  }
}


var nextCtx = Dagaz.AI.nextCtx;

Dagaz.AI.nextCtx = function(ctx, board) {
  var r = nextCtx(ctx, board);
  r.frames = [];
  for (var i = 0; i < ctx.frames.length; i++) {
      r.frames.push(ctx.frames[i]);
      if (board.isEquals(ctx.frames[i].board)) {
          r.ix = i;
          break;
      }
  }
  if (r.ix < ctx.frames.length) {
      var frame = ctx.frames[r.ix];
      delete r.ix;
      var moves = getMoves(frame.sgf, frame.pos);
      var variant = _.chain(moves)
       .filter(function(move) {
           return Dagaz.Model.compareMove(board.move, move.notation, board, this.design);
        }, this)
       .first()
       .value();
      if (!_.isUndefined(variant)) {
          r.ix = r.frames.length;
          r.frames.push({
              board: board.parent,
              sgf:   variant.sgf,
              pos:   variant.pos
          });
      }
  } else {
      delete r.ix;
  }
  return r;
}

})();
