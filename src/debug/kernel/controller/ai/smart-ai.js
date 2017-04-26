(function() {

Dagaz.Model.checkVersion(Dagaz.Model.getDesign(), "distinct-moves", "true");

function BruteforceAi(params) {
  this.params = params;
  if (_.isUndefined(this.params.AI_FRAME)) {
      this.params.AI_FRAME = 100;
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
  var r = getCache(ctx, board);
  if (r != null) {
      return r;
  }
  var ix = getKey(board);
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
  return ctx.cache[ix];
}

BruteforceAi.prototype.checkMoves = function(ctx, board, timestamp) {
  var design = Dagaz.Model.getDesign();
  if (board.checkGoals(design) != 0) return 1;
  if (isCached(board)) return -1;
  if (Date.now() - timestamp > this.params.AI_FRAME) return 0;
  var moves = cache(ctx, board);  
  var back  = [];
  while (moves.length > 1) {
      var m = moves.pop();
      var b = board.apply(m);
      var r = this.checkMoves(ctx, b, timestamp);
      if (r > 0) {
          while (moves.length > 1) moves.pop();
          moves.push(m);
          return r;
      }
      if (r == 0) back.push(m);
  }
  if (back.length == 0) {
      return -1;
  }
  while (back.length > 0) {
      var m = back.pop();
      moves.push(m);
  }
  return 0;
}

BruteforceAi.prototype.getMove = function(ctx) {
  var timestamp = Date.now();
  this.checkMoves(ctx, ctx.board, timestamp);
  var moves = cache(ctx, board);
  if (moves.length > 1) {
      return {
          done:  true,
          move:  moves.pop(),
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
