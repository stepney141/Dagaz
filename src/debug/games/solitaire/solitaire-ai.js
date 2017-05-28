(function() {

function SolitaireAi(params) {
  this.params = params;
  if (_.isUndefined(this.params.AI_FRAME)) {
      this.params.AI_FRAME = 100;
  }
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "solitaire") || (type == "solver")) {
      return new SolitaireAi(params);
  } else {
      return findBot(type, params, parent);
  }
}

SolitaireAi.prototype.setContext = function(ctx, board) {
  ctx.board = board;
}

var isEquals = function(a, b) {
  return (_.difference(a, b).length == 0) && (_.difference(b, a).length == 0);
}

var step = function(design, stack) {
  if (stack.length == 0) return false;
  var frame = stack.peekBack();
  while ((stack.length > 0) && (frame.dir >= design.positions.length)) {
      frame.dir = 0;
      frame.pos++;
      if (frame.pos >= frame.setup.length) {
          stack.pop();
          frame = stack.peekBack();
      }
  }
  if (stack.length == 0) return false;
  var t = frame.setup[frame.pos];
  var p = design.navigate(1, t, frame.dir);
  if (p === null) return false;
  if (_.indexOf(frame.setup, p) >= 0) return false;
  var f = design.navigate(1, p, frame.dir);
  if (f === null) return false;
  if (_.indexOf(frame.setup, f) >= 0) return false;
  frame.dir++;
  stack.push({
      setup: _.chain(frame.setup)
              .map(function(pos) {
                   if (pos == t) {
                       return f;
                   } else {
                       return pos;
                   }
               })
              .push(p)
              .value();
      pos:   0,
      dir:   0,
      from:  f,
      to:    t
  });
  return true;
}

SolitaireAi.prototype.getMove = function(ctx) {
  var timestamp = Date.now();
  var design = Dagaz.Model.getDesign();
  if (!ctx.goal) {
      ctx.goal = _.filter(design.allPositions(), function(pos) {
          return board.getPiece(pos) !== null;
      });
  }
  if (!ctx.stack) {
      ctx.stack = [];
      if (design.goals[1]) {
          ctx.stack.push({
              setup: design.goals[1][0].positions[0],
              pos:   0,
              dir:   0
          });
      }
  }
  while (!ctx.completed && (Date.now() - timestamp < this.params.AI_FRAME) && (ctx.stack.length > 0)) {
     if (step(design, ctx.stack)) {
         if (isEquals(stack.peekBack().setup, ctx.goal)) {
             ctx.completed = true;
             break;
         }
     }
  }
  if (!ctx.completed) return null;
  if (ctx.stack.length == 0) {
      return { done: true, ai: "nothing" };
  }
  var frame = ctx.stack.pop();
  var moves = _.filter(Dagaz.AI.generate(ctx, ctx.board), function(move) {
        return _.chain(move.actions)
         .filter(function(action) {
             return (action[0] !== null) && (action[1] !== null);
          })
         .filter(function(action) {
             return (action[0][0] == frame.from) && (action[1][0] == frame.to);
          })
          .size().value() > 0;
  });
  if (moves.length > 0) {
      return {
          done: true,
          move: moves[0],
          ai:   "solitaire"
      };
  } else {
      ctx.stack = [];
      return { done: true, ai: "nothing" };
  }
}

})();
