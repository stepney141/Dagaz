(function() {

function SgfAi(design, parent, params) {
  this.design   = design;
  this.params   = params;
  this.parent   = parent;
}

var findBot = Dagaz.Model.findBot;

Dagaz.Model.findBot = function(design, type, parent, params) {
  if (type == "sgf") {
      return new SgfAi(design, parent, params);
  } else {
      if (!_.isUndefined(findBot)) {
          return findBot(design, type, parent, params);
      }
  }
}

var compareMove = Dagaz.Model.compareMove;

Dagaz.Model.compareMove = function(move, notation) {
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
   .value() == notation) return true;
  return compareMove(move, notation);
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

var getCtx = Dagaz.AI.getCtx;

Dagaz.AI.getCtx = function(board) {
  r = getCtx(board);
  r.frames = [];
  if (!_.isUndefined()) {
      r.frames.push({
          sgf: params.OPENING,
          pos: 0
      });
  }
  r.ix = 0;
  return r;
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

SgfAi.prototype.getMove = function() {
  var r = Dagaz.AI.prepare(ctx, this.design);
  if (r) {
      return r;
  } else {
      if (ctx.ix < ctx.frames.length) {
          var frame = ctx.frames[ctx.ix];
          delete ctx.ix;
          var moves = getMoves(frame.sgf, frame.pos);
          var r = Dagaz.getRandom(moves, ctx.restrict, this.params.MAX_ITERATIONS);
          var move = _.chain(ctx.board.moves)
           .filter(function(move) {
               return Dagaz.Model.compareMove(move, moves[r].notation);
            })
           .first()
           .value();
          if (!_.isUndefined(move)) {
              ctx.ix = this.frames.length;
              ctx.frames.push({
                  board: this.board,
                  sgf:   moves[r].sgf,
                  pos:   moves[r].pos
              });
              return { move: move, ai: "sgf" };
          }
      } else {
         if (parent !== null) {
             return parent.getMove();
         }
      }
  }
}

})();
