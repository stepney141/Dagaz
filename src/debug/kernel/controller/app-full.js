(function() {

var STATE = {
    INIT: 0,
    IDLE: 1,
    EXEC: 2,
    WAIT: 3
};

Dagaz.Controller.WAIT_FRAME  = 100;

var mouseX          = 0;
var mouseY          = 0;
var mousePressed    = false;

function App() {
  this.state  = STATE.INIT;
  this.states = [];
}

Dagaz.Controller.newGame = function() {
  if (!_.isUndefined(Dagaz.Controller.clearGame)) {
      Dagaz.Controller.clearGame();
  }
  var str = window.location.toString();
  var result = str.match(/^([^?]+)/);
  if (result) {
      str = result[1];
  }
  window.location = str;
}

App.prototype.findMove = function(move) {
  if (_.isUndefined(this.board) || _.isUndefined(this.board.moves)) return move;
  for (var i =0; i < this.board.moves.length; i++) {
       if (this.board.moves[i].toString() == move.toString()) return this.board.moves[i];
  }
  return move;
}

var moveCallback = function(app, code, event, x, y, pos) {
  var p = Dagaz.Model.stringToPos(pos.name, app.design);
  if (!_.isUndefined(app.start) && (_.indexOf(app.start, p) >= 0)) {
      canvas.style.cursor = "pointer";
  } else {
      canvas.style.cursor = "default";
  }
}

var mouseMove = function(event) {
  var app = Dagaz.Controller.app;
  var canvasRect = canvas.getBoundingClientRect();
  mouseX = event.clientX - canvasRect.left;
  mouseY = event.clientY - canvasRect.top;
  if (!_.isUndefined(app.view)) {
      app.view.send(Dagaz.Controller.Event.MOUSE_MOVE, event, mouseX, mouseY, moveCallback);
  }
}

var mouseUp = function(event) {}

var mouseCallback = function(app, code, event, x, y, pos) {
  var p = Dagaz.Model.stringToPos(pos.name, app.design);
  if (_.isUndefined(app.list)) return true;
  app.move = app.findMove(app.list.setPosition(p));
  var targets = _.map(app.list.getTargets(), function(p) {
      return Dagaz.Model.posToString(p, app.design);
  });
  if (!_.isUndefined(app.view)) {
      app.view.send(Dagaz.Controller.Event.MARK_TARGETS, targets);
  }
  if (!app.move.isPass()) {
       app.state = STATE.EXEC;
  }
  return true;
}

var mouseDown = function(event) { 
  var app = Dagaz.Controller.app;
  if (!app.isReady()) return;
  if (!_.isUndefined(app.view)) {
      app.view.send(Dagaz.Controller.Event.MOUSE_LKM_DOWN, event, mouseX, mouseY, mouseCallback);
  }
}

App.prototype.isReady = function() {
  return this.state == STATE.IDLE;
}

var init = function(app) {
  app.design = Dagaz.Model.getDesign();
  Dagaz.Model.BuildDesign(app.design);
  app.view = Dagaz.View.getView(app.design);
  app.view.setController(Dagaz.Controller.app);
  Dagaz.View.configure(app.view);
  app.board = Dagaz.Model.getInitBoard();  
  Dagaz.Model.setup(app.board);
  app.view.setup(app.board);
  app.state = STATE.IDLE;
  return false;
}

var idle = function(app) {
  if (_.isUndefined(app.list)) {
      app.list  = Dagaz.Model.getMoveList(app.board);
      app.start = app.list.getStarts();
      if (!_.isUndefined(Dagaz.Model.getSetup)) {
          console.log("Setup: " + Dagaz.Model.getSetup(app.design, app.board));
      }
  }
  return false;
}

App.prototype.done = function() {
  var app = Dagaz.Controller.app;
  this.board = this.board.apply(this.move);
  if (Dagaz.Controller.turnChanged && !_.isUndefined(app.view)) {
      this.view.send(Dagaz.Controller.Event.TURN_CHANGED, this.board.turn);
  }
  delete this.move;
  this.state = STATE.IDLE;
}

var exec = function(app) {
  if (!_.isUndefined(app.move)) {
      app.view.apply(app.move);
      delete app.list;
      app.state = STATE.WAIT;
  }
  return false;
}

var wait = function(app) {
  return false;
}

Dagaz.Controller.app = new App();
Dagaz.Controller.app.states[STATE.INIT] = init;
Dagaz.Controller.app.states[STATE.IDLE] = idle;
Dagaz.Controller.app.states[STATE.EXEC] = exec;
Dagaz.Controller.app.states[STATE.WAIT] = wait;

canvas.onmousemove = mouseMove;
canvas.onmouseup   = mouseUp;
canvas.onmousedown = mouseDown;

App.prototype.exec = function() {
  if (!_.isUndefined(this.view) && this.view.isLoaded()) {
      this.view.draw();
  }
  if (_.isUndefined(this.states[this.state])) return false;
  return this.states[this.state](this);
}

App.prototype.run = function() {
  _.delay(function() {
     if (!Dagaz.Controller.app.exec()) {
         Dagaz.Controller.app.run();
     }
  }, Dagaz.Controller.WAIT_FRAME);
}

Dagaz.Controller.app.run();

})();
