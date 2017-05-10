(function() {

var MAXVALUE  = 1000000;

function AtariGoAi(params, parent) {
  this.params = params;
  this.parent = parent;
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "atari-go") || (type == "opening")) {
      return new AtariGoAi(params, parent);
  } else {
      return findBot(type, params, parent);
  }
}

var eval = function(board, player) {
  var r = _.chain(board.pieces)
   .filter(function(piece) {
        return piece.player == board.player;
    })
   .map(function(piece) {
        return piece.getValue(0);
    })
   .min()
   .value();
  if (r <= 1) {
      return -MAXVALUE;
  } else {
      return r;
  }
}

Dagaz.AI.eval = function(design, params, board) {
  var player = board.player;
  return eval(board, player) - eval(board, design.nextPlayer(player));
}

AtariGoAi.prototype.setContext = function(ctx, board) {
  if (parent !== null) {
      parent.setContext(ctx, board);
  }
  ctx.board = board;
}

AtariGoAi.prototype.getMove = function(ctx) {
  if (ctx.board.zSign == 0) {
      var move = _.chain(Dagaz.AI.generate(ctx, ctx.board))
       .filter(function(move) {
            if (move.actions.length != 1) return false;
            var action = move.actions[0];
            if (action[0] !== null) return false;
            if (action[1] === null) return false;
            return action[1][0] == (ctx.design.positions.length - 1) / 2;
         })
       .first()
       .value();
      if (move) {
          return { move: move, ai: "opening" };
      }
  }
  if (parent !== null) {
      return parent.getMove(ctx);
  }
}

})();
