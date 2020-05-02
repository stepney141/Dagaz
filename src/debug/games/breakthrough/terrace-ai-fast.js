(function() {

function Ai(parent) {
  this.parent = parent;
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if (type == "opening") {
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
}

Ai.prototype.getMove = function(ctx) {
  ctx.board.moves = _.filter(Dagaz.AI.generate(ctx, ctx.board), function(move) {
      if (move.isSimpleMove()) {
          var pos = move.actions[0][1][0];
          var piece = ctx.board.getPiece(pos);
          if ((piece !== null) && (piece.player == ctx.board.player)) return false;
      }
      return true;
  });
  return this.parent.getMove(ctx);
}

})();
