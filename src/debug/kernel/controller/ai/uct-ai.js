(function() {

function UctAi(params) {
  this.params = params;
  if (_.isUndefined(this.params.AI_FRAME)) {
      this.params.AI_FRAME = 3000;
  }
  if (_.isUndefined(this.params.UCT_COEFF)) {
      this.params.UCT_COEFF = Math.sqrt(2);
  }
  if (_.isUndefined(this.params.UCT_WEIGHT)) {
      this.params.UCT_WEIGHT = 0.7;
  }
  if (_.isUndefined(this.params.MAX_DEEP)) {
      this.params.MAX_DEEP = 100;
  }
  if (_.isUndefined(this.params.rand)) {
      this.params.rand = _.random;
  }
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "common") || (type == "uct")) {
      return new UctAi(params);
  } else {
      return findBot(type, params, parent);
  }
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  for (var i = 0; i < move.actions.length; i++) {
       if ((move.actions[i][0] !== null) && (move.actions[i][1] !== null)) {
           var piece = board.getPiece(move.actions[i][1][0]);
           if (piece !== null) {
               r += 9;
           }
       }
  }
  return r;
}

UctAi.prototype.heuristic = function(design, board, move) {
  if (_.isUndefined(this.params.heuristic)) {
      this.params.heuristic = Dagaz.AI.heuristic;
  }
  return this.params.heuristic(this, design, board, move);
}

UctAi.prototype.generate = function(ctx, board) {
  if (board.moves.length == 0) {
      board.moves = Dagaz.AI.generate(ctx, board);
      if ((board.moves.length == 1) && board.moves[0].isPass()) {
           var moves = Dagaz.AI.generate(ctx, board.apply(board.moves[0]));
           if ((moves.length == 0) || ((moves.length == 1) && moves[0].isPass())) {
               board.moves = [];
           }
      }
  }
}

UctAi.prototype.uct = function(win, count, all) {
  if ((count > 0) && (all > 0)) {
      return Math.sqrt(Math.log(all) / count) * this.params.UCT_COEFF +
             win / count;
  } else {
      return MAXVALUE;
  }
}

var positions = function(list) {
  var r = "";
  _.each(list, function(pos) {
      if (r) {
          r = r + ",";
      }
      r = r + Dagaz.Model.posToString(pos);
  });
  return r;
}

var dump = function(design, board) {
  var w = [];
  var b = [];
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if (piece.player == 1) {
              b.push(pos);
          } else {
              w.push(pos);
          }
      }
  });
  return "Player: " + board.player + "; P1: " + positions(b) + "; P2: " + positions(w);
}

UctAi.prototype.simulate = function(ctx, board) {
  var deep = 0;
  while (Date.now() - ctx.timestamp < this.params.AI_FRAME) {
      if (deep > this.params.MAX_DEEP) break;
      var goal = board.checkGoals(ctx.design, ctx.board.player);
      if (goal != 0) {
          var r = false;
          if ((goal > 0) && (board.player != ctx.board.player)) r = true;
          if (r) {
              console.log("Goal: " + goal + "; Deep: " + deep + "; " + dump(ctx.design, board));
          }
          return r;
      }
      this.generate(ctx, board);
      if (board.moves.length == 0) {
          var r = (board.player != ctx.board.player) && !Dagaz.Model.stalemateDraw;
          if (r) {
              console.log("Player: " + board.player + "; Deep: " + deep + "; " + dump(ctx.design, board));
          }
          return r;
      }
      var votes  = 0;
      var childs = _.map(board.moves, function(move) {
          var r  = this.heuristic(ctx.design, board, move);
          if (r < 0) {
              r = 0;
          }
          votes += r;
          return r;
      }, this);
      var ix = 0;
      var v = this.params.rand(0, votes - 1);
      votes = 0; i = 0;
      while ((votes < v) && (i < childs.length)) {
          if (childs[i] > 0) {
              ix = i;
              votes += childs[i];
          }
          i++;
      }
      board = board.apply(board.moves[ix]);
      deep++;
  }
  return false;
}

UctAi.prototype.setContext = function(ctx, board) {
  ctx.board     = board;
  ctx.timestamp = Date.now();
  ctx.result    = null;
  ctx.init      = 0;
  ctx.win       = 0;
  ctx.all       = 0;
  delete ctx.childs;
}

UctAi.prototype.getMove = function(ctx) {
  this.generate(ctx, ctx.board);
  if (ctx.board.moves.length == 0) {
      return { done: true, ai: "nothing" };
  }
  if (ctx.board.moves.length == 1) {
      return { done: true, move: ctx.board.moves[0], ai: "once" };
  }
  if (_.isUndefined(ctx.childs)) {
      ctx.childs = _.map(ctx.board.moves, function(move) {
           var board = ctx.board.apply(move);
           if (board.checkGoals(ctx.design, ctx.board.player) > 0) {
               ctx.result = move;
           }
           return {
               move:  move,         // possible Move
               board: board,        // result Board
               win:   0,            // wins on current Node
               all:   0             // views on current Node
           };
      });
  }
  if (ctx.result) {
      return {
           done: true,
           move: ctx.result,
           time: Date.now() - ctx.timestamp,
           cnt:  ctx.all,
           ai:   "goal"
      };
  }
  while (Date.now() - ctx.timestamp < this.params.AI_FRAME) {
      var node = null;
      if (ctx.init < ctx.childs.length) {
          node = ctx.childs[ctx.init];
          ctx.init++;
      }
      if (node === null) {
          var mx = null;
          _.each(ctx.childs, function(child) {
              var value = this.uct(child.win, child.all, ctx.all);
              if ((mx === null) || (value > mx)) {
                   mx = value;
                   node = child;
              }
          }, this);
      }
      if (this.simulate(ctx, node.board)) {
          node.win++;
          ctx.win++;
      }
      node.all++;
      ctx.all++;
  }
  var mx = null;
  for (var i = 0; i < ctx.childs.length; i++) {
      var u = 0;
      if (ctx.childs[i].win > 0) {
          u = ctx.childs[i].win / ctx.childs[i].all;
      }
      var h = this.heuristic(ctx.design, ctx.board, ctx.childs[i].move);
      var w = this.params.UCT_WEIGHT * u + (1 - this.params.UCT_WEIGHT) * h;
      if ((mx === null) || (w > mx)) {
          mx = w;
          ctx.result = ctx.childs[i].move;
      }
      console.log("Weight: " + w + "; Win = " + ctx.childs[i].win + "; All = " + ctx.childs[i].all + "; Move = " + ctx.childs[i].move.toString());
  }
  if (ctx.result) {
      return {
           done: true,
           move: ctx.result,
           time: Date.now() - ctx.timestamp,
           cnt:  ctx.all,
           ai:   "uct"
      };
  } else {
      return { done: true, ai: "nothing" };
  }
}

})();
