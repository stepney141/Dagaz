(function() {

Dagaz.Model.checkVersion(Dagaz.Model.getDesign(), "distinct-moves", "true");

function BruteforceAi(params) {
  this.params = params;
  if (_.isUndefined(this.params.AI_FRAME)) {
      this.params.AI_FRAME = 500;
  }
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

var getKey = function(board) {
  return "" + board.zSign + " " + board.player;
}

var isCached = function(ctx, board) {
  if (_.isUndefined(ctx.cache)) {
      ctx.cache = [];
  }
  var ix = getKey(board);
  return !_.isUndefined(ctx.cache[ix]);
}

var cache = function(ctx, board) {
  var ix = getKey(board);
  if (isCached(ctx, board)) {
      return ctx.cache[ix];
  }
  ctx.cache[ix] = _.chain(Dagaz.AI.generate(ctx, board))
   .map(function(m) {
       var b = board.apply(m);
       var t = 1;
       if ((board.parent !== null) && (b.zSign == board.parent.zSign)) {
           t = 0;
       } else {
           if (isCached(ctx, b)) {
               t = 2;
           }
       }
       return {
           type:  t,
           move:  m
       }       
    })
   .filter(function(f) {
       return f.type < 2;
    })
   .sortBy(function(f) {
       return f.type;
    })
   .map(function(f) {
       return f.move;
    })
   .value();
  if (Dagaz.AI.heuristic && (ctx.cache[ix].length > 1)) {
      var move = ctx.cache[ix].shift();
      ctx.cache[ix] = _.sortBy(ctx.cache[ix], function(move) {
          return -Dagaz.AI.heuristic(board, move);
      });
      ctx.cache[ix].unshift(move);
  }
  return ctx.cache[ix];
}

var debug = function(moves) {
  var r = ""
  _.each(moves, function(move) {
      if (r) r = r + "; ";
      r = r + Dagaz.Model.moveToString(move);
  });
  return r;
}

var isDead = function(ctx, board, move) {
  var b = board.apply(move);
  var moves = cache(ctx, b);
  for (var i = 1; i < moves.length; i++) {
       if (!isDead(ctx, b, moves[i]) return false;
  }
  return true;
}

BruteforceAi.prototype.getMove = function(ctx) {
  var cnt = 0;
  var queue = [ ctx.board ];
  var timestamp = Date.now();
  while (Date.now() - timestamp < this.params.AI_FRAME) {
      var board = queue.shift();
      var moves = cache(ctx, board);
      for (var i = 1; i < moves.length; i++) {
           queue.push(board.apply(moves[i]));
      }
      cnt++;
  }
  console.log(cnt);
  var moves = cache(ctx, ctx.board);
  while (moves.length > 1) {
      var move = moves.pop();
      if (isDead(ctx, ctx.board, move)) continue;
      return {
          done:  true,
          move:  move,
          ai:    "bruteforce"
      };
  }
  if (moves.length > 0) {
      return {
          done:  true,
          move:  moves[0],
          ai:    "back"
      };
  }
  return { done: true, ai: "nothing" };
}

})();
