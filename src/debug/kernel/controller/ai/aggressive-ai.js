(function() {

function AggressiveAi(params, parent) {
  this.params = params;
  this.parent = parent;
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if (type == "common") {
      return new AggressiveAi(params, parent);
  } else {
      return findBot(type, params, parent);
  }
}

AggressiveAi.prototype.setContext = function(ctx, board) {
  if (this.parent) {
      this.parent.setContext(ctx, board);
  }
  ctx.board  = board;
}

AggressiveAi.prototype.getMove = function(ctx) {
  var design = Dagaz.Model.getDesign();
  var result = null;
  var captured = 0;
  _.each(Dagaz.AI.generate(ctx, ctx.board), function(move) {
      var board = ctx.board.apply(move);
      if (board.checkGoals(design, ctx.board.player) != 0) {
          result = move;
          captured = null;
      }
      if (captured !== null) {
          var c = _.chain(move.actions)
           .filter(function(action) {
                return (action[0] !== null) && (action[1] === null);
            })
           .size()
           .value();
          if (c > captured) {
              captured = c;
              result = move;
          }
      }
  });
  if (result) {
      return {
          done: true,
          move: result,
          ai:   "aggressive"
      };
  }
  if (this.parent) {
      return this.parent.getMove(ctx);
  }
}

})();
