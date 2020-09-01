(function() {

Dagaz.Controller.WAIT_FRAME = 100;

var mouseX          = 0;
var mouseY          = 0;
var mousePressed    = false;

function App() {
  this.state  = 0;
  this.states = [];
}

var mouseMove = function(event) {
  var canvasRect = canvas.getBoundingClientRect();
  mouseX = event.clientX - canvasRect.left;
  mouseY = event.clientY - canvasRect.top;
}

var mouseUp = function(event) { 
}

var mouseCallback = function(app, code, event, x, y, pos) {
  var p = Dagaz.Model.stringToPos(pos.name, app.design);
  if (_.isUndefined(app.list)) return true;
  app.move = app.list.setPosition(p);
  var targets = _.map(app.list.getTargets(), function(p) {
      return Dagaz.Model.posToString(p, app.design);
  });
  app.view.send(Dagaz.Controller.Event.MARK_TARGETS, targets);
  if (!app.move.isPass()) {
       app.state = 2;
  }
  return true;
}

var mouseDown = function(event) { 
  var app = Dagaz.Controller.app;
  if (!app.isReady()) return;
  app.view.send(Dagaz.Controller.Event.MOUSE_LKM_DOWN, event, mouseX, mouseY, mouseCallback);
}

App.prototype.isReady = function() {
  return this.state == 1;
}

var init = function(app) {
  var design = Dagaz.Model.getDesign();
  Dagaz.Model.BuildDesign(design);
  app.view = Dagaz.View.getView(design);
  app.view.setController(Dagaz.Controller.app);
  Dagaz.View.configure(app.view);
  app.board = Dagaz.Model.getInitBoard();
  app.view.setup(app.board);
  app.state = 1;
  return false;
}

var idle = function(app) {
  if (_.isUndefined(app.list)) {
      app.list = Dagaz.Model.getMoveList(app.board);
  }
  return false;
}

App.prototype.done = function() {
  this.board = this.board.apply(this.move);
  this.view.send(Dagaz.Controller.Event.TURN_CHANGED, this.board.turn);
  delete this.move;
  this.state = 1;
}

var exec = function(app) {
  if (!_.isUndefined(app.move)) {
      app.view.apply(app.move);
      delete app.list;
      app.state = 3;
  }
  return false;
}

var wait = function(app) {
  return false;
}

Dagaz.Controller.app = new App();
Dagaz.Controller.app.states[0] = init;
Dagaz.Controller.app.states[1] = idle;
Dagaz.Controller.app.states[2] = exec;
Dagaz.Controller.app.states[3] = wait;

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
