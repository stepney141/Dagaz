(function() {

var STATE = {
    INIT: 0,
    IDLE: 1,
    WAIT: 2,
    BUZY: 3,
    EXEC: 4,
    DONE: 5
};

function App(canvas, params) {
  this.design = Dagaz.Model.getDesign();
  this.canvas = canvas;
  this.view   = Dagaz.View.getView();
  this.state  = STATE.INIT;
  if (params) {
      this.params = params;
  } else {
      this.params = [];
  }
  if (_.isUndefined(this.params.AI_WAIT)) {
      this.params.AI_WAIT = 3000;
  }
  if (_.isUndefined(this.params.WAIT_FRAME)) {
      this.params.WAIT_FRAME = 100;
  }
  if (_.isUndefined(this.params.SHOW_TARGETS)) {
      this.params.SHOW_TARGETS = true;
  }
}

Dagaz.Controller.createApp = function(canvas) {
  if (_.isUndefined(Dagaz.Controller.app)) {
      Dagaz.Controller.app = new App(canvas);
  }
  return Dagaz.Controller.app;
}

App.prototype.done = function() {
  this.state = STATE.IDLE;
}

App.prototype.setPosition = function(pos) {
  this.list.setPosition(pos);
  var moves = this.list.getMoves();
  if (moves.length == 1) {
      this.move = moves[0];
      this.state = STATE.EXEC;
      return;
  }
  if (this.list.getLevel() > 0) {
      if (this.params.SHOW_TARGETS) {
          var targets = this.list.getPositions();
          this.view.markPositions(Dagaz.View.markType.TARGET, targets);
      }
  }
  if (this.params.SHOW_ATTACKING) {
      var attacking = this.list.getAttacking();
      this.view.markPositions(Dagaz.View.markType.ATTACKING, attacking);
  }
}

App.prototype.mouseDown = function(view, pos) {
  if ((this.state == STATE.IDLE) && !_.isUndefined(this.list)) {
      this.setPosition(pos);
  }
}

App.prototype.mouseUp = function(view, pos) {
  if ((this.state == STATE.IDLE) && !_.isUndefined(this.list)) {
      this.setPosition(pos);
      this.view.markPositions(Dagaz.View.markType.TARGET, []);
  }
}

App.prototype.getAI = function() {
  if (_.isUndefined(this.ai)) {
      this.ai = null;
      if (this.design.isPuzzle()) {
          this.ai = Dagaz.AI.findBot("solver",  this.params, this.ai);
      } else {
          this.ai = Dagaz.AI.findBot("random",  this.params, this.ai);
          this.ai = Dagaz.AI.findBot("common",  this.params, this.ai);
          this.ai = Dagaz.AI.findBot("opening", this.params, this.ai);
      }
  }
  return this.ai;
}

App.prototype.getBoard = function() {
  if (_.isUndefined(this.board)) {
      this.board  = Dagaz.Model.getInitBoard();
      this.player = this.board.player;
  }
  return this.board;
}

App.prototype.getContext = function(player) {
  if ((player == this.player) && !this.design.isPuzzle()) return null;
  if (_.isUndefined(this.context)) {
      this.context = [];
  }
  if (_.isUndefined(this.context[player])) {
      this.context[player] = Dagaz.AI.createContext(this.design);
  }
  return this.context[player];
}

App.prototype.exec = function() {
  this.view.draw(this.canvas);
  if (this.state == STATE.IDLE) {
      var ctx = this.getContext(this.board.player);      
      var ai  = this.getAI();
      if ((ctx !== null) && (ai !== null)) {
         ai.setContext(ctx, this.board);
         this.state = STATE.BUZY;
         this.timestamp = Date.now();
      } else {
         if (_.isUndefined(this.list)) {
             this.list = Dagaz.Model.getMoveList(this.board);
             if (this.list.getMoves().length == 0) {
                 this.state = STATE.DONE;
                 return;
             }
         }
      }
  }
  if (this.state == STATE.BUZY) {
      var ctx = this.getContext(this.board.player);
      var result = this.getAI().getMove(ctx);
      if (!result.move) {
          this.state = STATE.DONE;
          return;
      }
      if (result.done || (Date.now() - this.timestamp >= this.params.AI_WAIT)) {
          this.move  = result.move;
          this.state = STATE.EXEC;
          return;
      }
  }
  if (this.state == STATE.EXEC) {
      if (!_.isUndefined(this.list)) {
          this.view.markPositions(Dagaz.View.markType.ATTACKING, []);
          delete this.list;
      }
      this.move.applyAll(this.view);
      this.board = this.board.apply(this.move);
      if (this.board.checkGoals(this.design) != 0) {
          this.state = STATE.DONE;
      } else {
          this.state = STATE.WAIT;
      }
  }
}

Dagaz.Model.InitGame();
var app = Dagaz.Controller.createApp(Canvas);

App.prototype.run = function() {
  var timestamp = Date.now();
  this.exec();
  var delta = Date.now() - timestamp;
  _.delay(function() {
     app.run();
  }, (delta > this.params.WAIT_FRAME) ? 0 : this.params.WAIT_FRAME - delta);
}

app.view.init(app.canvas, app);
app.run();

})();
