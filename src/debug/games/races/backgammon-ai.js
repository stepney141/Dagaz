(function() {

function Ai(parent) {
  this.parent = parent;
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "heuristic") || (type == "common") || (type == "1") || (type == "2")) {
      return new Ai(parent);
  } else {
      return findBot(type, params, parent);
  }
}

Ai.prototype.setContext = function(ctx, board) {
  if (this.parent) {
      this.parent.setContext(ctx, board);
  }
  ctx.board = board;
  ctx.timestamp = Date.now();
}

var getDices = function(design, board) {
  var r = [];
  var pos = design.navigate(board.player, Dagaz.Model.stringToPos("m1a"), 6);
  while (pos !== null) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          r.push(+piece.type);
          var v = piece.getValue(0);
          if ((v !== null) && (v > 1)) {
              r.push(+piece.type);
          }
      }
      pos = design.navigate(board.player, pos, 6);
  }
  return r;
}

var getPiece = function(design, board, player, pos) {
  var piece = board.getPiece(pos);
  if (piece === null) return 0;
  var r = 0;
  while (pos !== null) {
      if (board.getPiece(pos) === null) break;
      pos = design.navigate(player, pos, 5);
      r++;
  }
  if (piece.player != player) {
      r = -r;
  }
  return r;
}

var getSetup = function(design, board, player, setup, positions) {
  var r = null;
  var pos = Dagaz.Model.stringToPos("a1a");
  if (player > 1) {
      pos = Dagaz.Model.stringToPos("a2a");
  }
  for (var ix = 1; pos !== null; ix++) {
      positions.push(pos);
      var v = getPiece(design, board, player, pos);
      positions.push(v);
      if ((v > 0) && (r === null)) {
          r = ix;
      }
      pos = design.navigate(player, pos, 3);
  }
  return r;
}

var applyMove = function(from, to, setup) {
  if (setup[from] <= 0) return false;
  if (setup[to] < -1) return false;
  if (setup[to] < 0) {
      setup[to] = 0;
  }
  setup[to]++;
  setup[from]--;
  return true;
}

Ai.prototype.getMove = function(ctx) {
  ctx.board.moves = Dagaz.AI.generate(ctx, ctx.board);
  if (ctx.board.moves.length == 0) {
      return { done: true, ai: "nothing" };
  }
  if (ctx.board.moves.length > 1) {
      if (_.isUndefined(ctx.queue) || (ctx.queue.length == 0)) {
          ctx.queue = [];
          var dices = getDices(ctx.design, ctx.board);
          if (dices.length > 0) {
              var positions = [];
              var setup = [];
              var minpos = getSetup(ctx.design, ctx.board, ctx.board.player, setup, positions);
              var best = null;
              // TODO:

         }
      }
      if (ctx.queue.length > 0) {
          var pos = ctx.queue.shift();
          for (var i = 0; i < ctx.board.moves.length; i++) {
               if ((ctx.board.moves[i].actions.length > 0) && (ctx.board.moves[i].actions[0][0][0] == pos)) {
                    return {
                        done: true,
                        move: ctx.board.moves[i],
                        time: Date.now() - ctx.timestamp,
                        ai:  "heuristic"
                    };
               }
          }
      }
  }
  if (this.parent) {
      delete ctx.queue;
      return this.parent.getMove(ctx);
  }
}

})();
