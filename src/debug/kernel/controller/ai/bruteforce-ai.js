(function() {

Dagaz.Model.checkVersion(Dagaz.Model.getDesign(), "distinct-moves", "true");

function BruteforceAi(params) {
  this.params = params;
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "bruteforce") || (type == "solver")) {
      return new BruteforceAi(params);
  } else {
      return findBot(type, params, parent);
  }
}

BruteforceAi.prototype.setContext = function(ctx, board) {
  ctx.board = board;
}

var getIx = function(board) {
  return "" + board.zSign + " " + board.player;
}

var cache = function(ctx, board) {
  if (_.isUndefined(ctx.cache)) {
      ctx.cache = [];
  }
  var ix = getIx(board);
  if (_.isUndefined(ctx.cache[ix])) {
      ctx.cache[ix] = Dagaz.AI.generate(ctx, board);
  }
  return ctx.cache[ix];
}

var getMove = function(ctx, board) {
  var moves = cache(ctx, board);
  var back  = null;
  var lowp  = [];
  while (moves.length > 0) {
      var m = moves.pop();
      var b = board.apply(m);
      if ((board.parent !== null) && (b.zSign == board.parent.zSign)) {
          back = m;
          continue;
      }
      var ix = getIx(b);
      if (!_.isUndefined(ctx.cache[ix])) {
          lowp.push(m);
          continue;
      }
      _.each(lowp, function(move) {
          moves.unshift(move);
      });
      if (back !== null) {
          moves.unshift(back);
      }
      return m;
  }
  if (lowp.length > 0) {
      var m = lowp.pop();
      if (back !== null) {
          moves.push(back);
      }
      _.each(lowp, function(move) {
          moves.push(move);
      });
      return m;
  }
  if (back !== null) {
      moves.unshift(back);
      return back;
  }
  return null;
}

BruteforceAi.prototype.getMove = function(ctx) {
  var move = getMove(ctx, ctx.board);
  if (move !== null) {
      return {
          done:  true,
          move:  move,
          ai:    "bruteforce"
      };
  }
  return { done: true, ai: "nothing" };
}

})();
