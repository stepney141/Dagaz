(function() {

var MAXVALUE  = 1000000;

function MaxMinAi(params, parent) {
  this.params = params;
  this.parent = parent;
  if (_.isUndefined(this.params.NOISE_FACTOR)) {
      this.params.NOISE_FACTOR = 8;
  }
  if (_.isUndefined(this.params.MAX_DEEP)) {
      this.params.MAX_DEEP = 10;
  }
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "maxmin") || (type == "common")) {
      return new MaxMinAi(params, parent);
  } else {
      return findBot(type, params, parent);
  }
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var v = design.price[piece.type];
          if (piece.player != player) {
              v = -v;
          }
          r += v;
      }
  });
  return r;
}

Dagaz.AI.apply = function(board, move) {
  return board.apply(move);
}

MaxMinAi.prototype.eval = function(ctx, board, move, player) {
  var b = Dagaz.AI.apply(board, move);
  var t = move.getTarget();
  var deep = 0;
  while (deep++ < this.params.MAX_DEEP) {
      var goal = Dagaz.Model.checkGoals(ctx.design, b, player);
      if (goal != 0) {
          return MAXVALUE * goal;
      }
      b.moves = Dagaz.AI.generate(ctx, b);
      if (b.moves.length == 0) {
          if (Dagaz.AI.isFriend(player, b.player)) {
              return -MAXVALUE;
          } else {
              return MAXVALUE;
          }
      }
      var moves = _.filter(b.moves, function(m) {
          if (m.actions.length != 1) return false;
          if (m.actions[0][1] === null) return false;
          return m.actions[0][1][0] == t;
      });
      if (moves.length > 1) {
          var mn = _.chain(moves).map(function(m) {
              var pos = m.actions[0][0][0];
              var piece = b.getPiece(pos);
              if (piece === null) return MAXVALUE;
              return ctx.design.price[piece.type];
          }).min().value();
          moves = _.filter(moves, function(m) {
              var pos = m.actions[0][0][0];
              var piece = b.getPiece(pos);
              if (piece === null) return false;
              return ctx.design.price[piece.type] == mn;
          });
      }
      if (moves.length == 0) {
          moves = _.filter(b.moves, function(m) {
              return _.chain(m.actions).filter(function(a) {
                  return (a[0] !== null) && (a[1] === null);
              }).size().value() > 0;
          });
      }
      if (moves.length == 0) {
          break;
      } else {
          var ix = 0;
          if (moves.length > 1) {
              ix = _.random(0, moves.length - 1);
          }
          b = Dagaz.AI.apply(b, moves[ix]);
      }
  }
  return Dagaz.AI.eval(ctx.design, this.params, b, player);
}

MaxMinAi.prototype.setContext = function(ctx, board) {
  if (this.parent) {
      this.parent.setContext(ctx, board);
  }
  ctx.board     = board;
  ctx.timestamp = Date.now();
}

MaxMinAi.prototype.getMove = function(ctx) {
  ctx.board.moves = Dagaz.AI.generate(ctx, ctx.board);
  var result = null;
  var mx = 0;
  _.each(ctx.board.moves, function(m) {
      var eval = this.eval(ctx, ctx.board, m, ctx.board.player);
      console.log("AI: " + m.toString() + " [" + eval + "]");
      if ((result === null) || (eval >= mx)) {
          if ((eval > mx) || (_.random(0, 10) > this.params.NOISE_FACTOR)) {
              result = m;
          }
          mx = eval;
      }
  }, this);
  if (result !== null) {
      return {
           done: true,
           move: result,
           time: Date.now() - ctx.timestamp,
           ai:  "maxmin"
      };
  }
  if (this.parent) {
      return this.parent.getMove(ctx);
  }
}

})();
