(function() {

var STATE = {
    INIT: 0,
    IDLE: 1,
    WAIT: 2,
    BUZY: 3,
    EXEC: 4,
    DONE: 5
};

var isDrag = false;

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
  if (this.state != STATE.DONE) {
      this.state = STATE.IDLE;
  } else {
      if (this.doneMessage) {
          alert(this.doneMessage);
      }
  }
}

App.prototype.setPosition = function(pos) {
  this.list.setPosition(pos);
  var moves = this.list.getMoves();
  if (this.list.canDone()  && (moves.length > 0)) {
      this.move = moves[0];
      this.state = STATE.EXEC;
      Canvas.style.cursor = "default";
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

App.prototype.mouseLocate = function(view, pos) {
  if (this.currPos != pos) {
      if ((this.state == STATE.IDLE) && !_.isUndefined(this.list) && !isDrag) {
          if (_.isUndefined(this.positions)) {
              this.positions = this.list.getPositions();
          }
          if (_.indexOf(this.positions, pos) >= 0) {
              Canvas.style.cursor = "pointer";
          } else {
              Canvas.style.cursor = "default";
          }
      }
      this.view.markPositions(Dagaz.View.markType.GOAL, []);
      if (!isDrag && !_.isUndefined(this.board)) {
          var piece = this.board.getPiece(pos);
          if (piece !== null) {
              var types = Dagaz.Model.getPieceTypes(piece, this.board);
              var positions = this.design.getGoalPositions(this.board.player, types);
              this.view.markPositions(Dagaz.View.markType.GOAL, positions);
          }
      }
  }
  currPos = pos;
}

App.prototype.mouseDown = function(view, pos) {
  if ((this.state == STATE.IDLE) && !_.isUndefined(this.list)) {
      if (this.list && this.positions && (_.indexOf(this.positions, pos) >= 0)) {
          Canvas.style.cursor = "move";
          this.setPosition(pos);
          isDrag = true;
      }
  }
  this.view.markPositions(Dagaz.View.markType.GOAL, []);
}

App.prototype.mouseUp = function(view, pos) {
  if ((this.state == STATE.IDLE) && !_.isUndefined(this.list)) {
      this.setPosition(pos);
      this.view.markPositions(Dagaz.View.markType.TARGET, []);
      Canvas.style.cursor = "default";
  }
  isDrag = false;
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
      var ctx = this.getContext(this.getBoard().player);      
      var ai  = this.getAI();
      if ((ctx !== null) && (ai !== null)) {
         ai.setContext(ctx, this.board);
         this.state = STATE.BUZY;
         Canvas.style.cursor = "wait";
         this.timestamp = Date.now();
      } else {
         if (_.isUndefined(this.list)) {
             var player = this.design.playerNames[this.board.player];
             this.list  = Dagaz.Model.getMoveList(this.board);
             if (!_.isUndefined(this.move)) {
                 this.list.setLastMove(this.move);
             }
             if (this.list.getMoves().length == 0) {
                 this.state = STATE.DONE;
                 Canvas.style.cursor = "default";
                 alert(player + " loss");
                 return;
             }
         }
      }
  }
  if (this.state == STATE.BUZY) {
      var ctx = this.getContext(this.board.player);
      var player = this.design.playerNames[this.board.player];
      var result = this.getAI().getMove(ctx);
      if (result) {
          if (_.isUndefined(result.move)) {
              this.state = STATE.DONE;
              Canvas.style.cursor = "default";
              alert(player + " loss");
              return;
          }
          if (result.done || (Date.now() - this.timestamp >= this.params.AI_WAIT)) {
              this.move  = result.move;
              this.state = STATE.EXEC;
          }
      } else {
          this.state = STATE.DONE;
          Canvas.style.cursor = "default";
          alert("Invalid AI move");
          return;
      }
  }
  if (this.state == STATE.EXEC) {
      if (!_.isUndefined(this.list)) {
          this.list.done();
          this.view.markPositions(Dagaz.View.markType.ATTACKING, []);
          delete this.list;
      }
      if (Dagaz.Model.showMoves) {
          console.log(this.move.toString());
      }
      this.move.applyAll(this.view);
      this.board = this.board.apply(this.move);
      if (!_.isUndefined(this.positions)) {
          delete this.positions;
      }
      if (this.board.checkGoals(this.design, this.board.parent.player) > 0) {
          var player = this.design.playerNames[this.board.parent.player];
          this.state = STATE.DONE;
          Canvas.style.cursor = "default";
          this.doneMessage = player + " win"
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
