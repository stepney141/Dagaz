(function() {

var MAXVALUE  = 1000000;

function UctAi(params) {
  this.params = params;
  if (_.isUndefined(this.params.AI_FRAME)) {
      this.params.AI_FRAME = 100;
  }
  if (_.isUndefined(this.params.UCT_COEFF)) {
      this.params.UCT_COEFF = Math.sqrt(2);
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

Dagaz.AI.heuristic = function(self, design, board, move) {
  return 0;
}

UctAi.prototype.heuristic = function(design, board, move) {
  if (_.isUndefined(this.params.heuristic)) {
      this.params.heuristic = Dagaz.AI.heuristic;
  }
  return this.params.heuristic(this, design, this.params, board, move);
}

UctAi.prototype.generate = function(ctx, board) {
  if (_.isUndefined(board.moves)) {
      board.moves = _.chain(Dagaz.AI.generate(ctx, board))
       .sortBy(function(move) {
           return -this.heuristic(ctx.design, board, move);
        }, this).value();
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

UctAi.prototype.setContext = function(ctx, board) {
  ctx.board     = board;
  ctx.timestamp = Date.now();
  ctx.result    = null;
  ctx.init      = 0;
  ctx.win       = 0;
  ctx.all       = 0;
  if (!_.isUndefined(ctx.childs)) {
      var childs = null;
      for (var i = 0; (i < ctx.childs.length) && (childs === null); i++) {
           var child = ctx.childs[i];
           if (!_.isUndefined(child.childs)) {
               for (var j = 0; (j < child.childs.length) && (childs === null); j++) {
                    var node = child.childs[j];
                    if (node.board.checkGoals(design) > 0) {
                        ctx.result = node.move;
                        break;
                    }
                    if ((node.board.zSign == board.zSign) && (node.board.player == board.player)) {
                        ctx.init  = node.init;
                        ctx.win   = node.win;
                        ctx.all   = node.all;
                        childs    = node.childs;
                    }
               }
           }
      }
      ctx.childs = childs;
  }
}

UctAi.prototype.getMove = function(ctx) {
  var design = Dagaz.Model.getDesign();
  this.generate(ctx, ctx.board);
  if (ctx.board.moves.length == 0) {
      return { done: true, ai: "nothing" };
  }
  if (ctx.board.moves.length == 1) {
      return { done: true, move: ctx.board.moves[0], ai: "once" };
  }
  if (_.isUndefined(ctx.childs)) {
      ctx.childs = _.map(ctx.board.moves), function(move) {
           var board = ctx.board.apply(move);
           if (board.checkGoals(design) > 0) {
               ctx.result = move;
           }
           return {
               move:  move,         // possible Move
               board: board,        // result Board
               init:  0,            // childs initialized (count)
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
      var node  = ctx;
      var stack = [ node ];
      while (node.childs && (Date.now() - ctx.timestamp < this.params.AI_FRAME)) {
          var child = null;
          if (node.init < node.childs.length) {
              child = node.childs[node.init];
              node.init++;
          }
          if (!child) {
              var mx = null;
              for (var i = 0; i < node.childs.length; i++) {
                   var value = this.uct(node.childs[i].win, node.childs[i].all, node.all);
                   if ((mx === null) || (value > mx)) {
                       mx = value;
                       child = node.childs[i];
                   }
              }
          }
          if (child) {
              node = child;
              stack.push(node);
          }
      }
      while (Date.now() - ctx.timestamp < this.params.AI_FRAME) {
          this.generate(ctx, node.board);
          if (node.board.moves.length == 0) {
              _.each(stack, function(n) {
                  if (!Dagaz.Model.stalemateDraw && (n.board.player != node.board.player)) {
                      n.win++;
                  }
                  n.all++;
              });
              break;
          }
          node.childs = _.map(node.board.moves), function(move) {
               return {
                   move:  move,
                   board: node.board.apply(move),
                   init:  0,
                   win:   0,
                   all:   0
               };
          });
          var ix = this.params.rand(0, node.childs.length - 1);
          node = node.childs[ix];
          var goal = node.board.checkGoals(design);
          if (goal != 0) {
              _.each(stack, function(n) {
                  if ((n.player == node.board.player) && (goal > 0)) n.win++;
                  if ((n.player != node.board.player) && (goal < 0)) n.win++;
                  n.all++;
              });
              break;
          }
      }
  }
  var mx = null;
  for (var i = 0; i < ctx.childs.length; i++) {
      if ((mx === null) || (ctx.childs[i].all > mx)) {
          mx = ctx.childs[i].all;
          ctx.result = ctx.childs[i].move;
      }
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
