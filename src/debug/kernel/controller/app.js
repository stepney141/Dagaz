(function() {

var STATE = {
    INIT: 0,
    IDLE: 1,
    WAIT: 2,
    BUZY: 3,
    DONE: 4
};

function App(canvas, params) {
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

App.prototype.mouseDown = function(view, pos) {
  if (this.state == STATE.IDLE) {
      if (!_.isUndefined(this.from) && (this.from != pos)) {
          this.movePiece(view, pos, null);
      } else {
          if (view.isEmpty(pos)) {
              delete this.from;
          } else {
              view.markPositions(Dagaz.View.markType.TARGET, [ pos ]);
              this.setFrom(pos);
          }
      }
  }
}

App.prototype.mouseUp = function(view, pos) {
  if (this.state == STATE.IDLE) {
      view.markPositions(Dagaz.View.markType.TARGET, []);
      if (!_.isUndefined(this.from) && (this.from != pos)) {
          this.movePiece(view, pos, null);
      }
  }
}

App.prototype.getBoard = function() {
  if (_.isUndefined(this.board)) {
      this.board  = Dagaz.Model.getInitBoard();
      this.player = this.board.player;
  }
  return this.board;
}

App.prototype.setFrom = function(pos) {
  this.from = pos;
}

App.prototype.movePiece = function(view, pos, piece) {
  this.state = STATE.WAIT;
  view.movePiece(this.from, pos, piece);
  view.commit();
  delete this.from;
}

App.prototype.exec = function() {
  this.view.draw(this.canvas);
  // DEBUG:


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
