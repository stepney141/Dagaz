(function() {

var STATE = {
    INIT: 0,
    IDLE: 1,
    WAIT: 2,
    BUZY: 3,
    EXEC: 4,
    DONE: 5,
    STOP: 6
};

var isDrag = false;
var passForced = false;
var once = false;

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
  if (_.isUndefined(this.params.SHOW_ATTACKING)) {
      this.params.SHOW_ATTACKING = true;
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
      this.state = STATE.STOP;
  } else {
      if (this.doneMessage) {
          alert(this.doneMessage);
      }
  }
}

App.prototype.getStarts = function() {
  if (_.isUndefined(this.starts)) {
      if (_.isUndefined(this.list)) {
          this.starts = [];
      } else {
          this.starts = this.list.getStarts();
      }
  }
  return this.starts;
}

App.prototype.getStops = function() {
  if (_.isUndefined(this.stops)) {
      if (_.isUndefined(this.list)) {
          this.stops = [];
      } else {
          this.stops = this.list.getStops();
      }
  }
  return this.stops;
}

App.prototype.getTargets = function() {
  if (_.isUndefined(this.targets)) {
      if (_.isUndefined(this.list)) {
          this.targets = [];
      } else {
          this.targets = this.list.getTargets();
      }
  }
  return this.targets;
}

App.prototype.clearPositions = function() {
  delete this.starts;
  delete this.stops;
  delete this.targets;
}

App.prototype.setPosition = function(pos) {
  this.move = this.list.setPosition(pos);
  this.clearPositions();
  if (this.params.SHOW_TARGETS) {
      this.view.markPositions(Dagaz.View.markType.TARGET, this.getTargets());
  }
  if (this.params.SHOW_ATTACKING) {
      this.view.markPositions(Dagaz.View.markType.ATTACKING, this.list.getCaptures());
  }
  this.state = STATE.EXEC;
  Canvas.style.cursor = "default";
}

App.prototype.mouseLocate = function(view, pos) {
  if (this.currPos != pos) {
      if ((this.state == STATE.IDLE) && !_.isUndefined(this.list)) {
          if (isDrag) {
              if (_.intersection(this.getStops(), pos).length > 0) {
                  Canvas.style.cursor = "pointer";
              } else {
                  Canvas.style.cursor = "move";
              }
          } else {
              if (_.intersection(this.getStarts(), pos).length > 0) {
                  Canvas.style.cursor = "pointer";
              } else {
                  Canvas.style.cursor = "default";
              }
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
  this.currPos = pos;
}

App.prototype.mouseDown = function(view, pos) {
  this.view.markPositions(Dagaz.View.markType.GOAL, []);
  if ((this.state == STATE.IDLE) && !_.isUndefined(this.list)) {
      var positions = _.intersection(this.getTargets(), pos);
      if (positions.length == 0) {
          positions = _.intersection(this.getStops(), pos);
      }
      if (positions.length == 0) {
          positions = _.intersection(this.getStarts(), pos);
      }
      if (positions.length > 0) {
          Canvas.style.cursor = "move";
          this.setPosition(positions[0]);
          isDrag = true;
      }
  }
}

App.prototype.mouseUp = function(view, pos) {
  if ((this.state == STATE.IDLE) && !_.isUndefined(this.list)) {
      var positions = _.intersection(this.getTargets(), pos);
      if (positions.length > 0) {
          this.setPosition(positions[0]);
      }
  }
  this.view.markPositions(Dagaz.View.markType.TARGET, []);
  Canvas.style.cursor = "default";
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
  }
  return this.board;
}

App.prototype.getContext = function(player) {
  if ((player == 1) && !this.design.isPuzzle()) return null;
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
  if (this.state == STATE.STOP) {
      this.state = STATE.IDLE;
      return;
  }
  if (this.state == STATE.IDLE) {
      var ctx = this.getContext(this.getBoard().player);
      var ai  = this.getAI();
      if ((ctx !== null) && (ai !== null)) {
         ai.setContext(ctx, this.board);
         this.state = STATE.BUZY;
         Canvas.style.cursor = "wait";
         this.timestamp = Date.now();
         once = true;
      } else {
         if (_.isUndefined(this.list)) {
             var player = this.design.playerNames[this.board.player];
             console.log("Player: " + player);
             this.list = Dagaz.Model.getMoveList(this.board);
             if (this.list.isPassForced()) {
                  if (passForced) {
                      this.state = STATE.DONE;
                      Canvas.style.cursor = "default";
                      alert("Draw");
                  } else {
                      this.board = this.board.apply(Dagaz.Model.createMove());                 
                      this.state = STATE.IDLE;
                      delete this.list;
                      passForced = true;
                  }
                  return;
             }
             passForced = false;
             if (this.list.isEmpty()) {
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
      if (once) {
          console.log("Player: " + player);
          once = false;
      }
      if (result) {
          if (_.isUndefined(result.move)) {
              this.state = STATE.DONE;
              Canvas.style.cursor = "default";
              alert(player + " loss");
              return;
          }
          if (result.done || (Date.now() - this.timestamp >= this.params.AI_WAIT)) {
              this.board = this.board.apply(result.move);
              if (result.move.isPass()) {
                  if (passForced) {
                      this.state = STATE.DONE;
                      Canvas.style.cursor = "default";
                      alert("Draw");
                  } else {
                      this.state = STATE.IDLE;
                      delete this.list;
                      passForced = true;
                  }
              } else {
                  passForced = false;
              }
              this.move = result.move;
              this.state = STATE.EXEC;
          }
      }
  }
  if (this.state == STATE.EXEC) {
      this.state = STATE.IDLE;
      isDrag = false;
      if (!this.move.isPass()) {
          if (Dagaz.Model.showMoves) {
              console.log(this.move.toString());
          }
          this.move.applyAll(this.view);
          this.state = STATE.WAIT;
      }
      if (!_.isUndefined(this.list)) {
          if (this.list.isDone()) {
              var moves = this.list.getMoves();
              delete this.list;
              if (moves.length > 0) {
                  this.board = this.board.apply(moves[0]);
                  _.each(moves, function(m) {
                       console.log("Debug: " + m.toString());
                  });
              }
          }
      }
      if (this.board.parent !== null) {
          var g = this.board.checkGoals(this.design, this.board.parent.player);
          if (g != 0) {
              var player = this.design.playerNames[this.board.parent.player];
              this.state = STATE.DONE;
              Canvas.style.cursor = "default";
              if (g > 0) {
                  this.doneMessage = player + " win"
              } else {
                  this.doneMessage = player + " loss"
              }
          }
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
