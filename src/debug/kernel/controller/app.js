(function() {

var TIME_FRAME = 100;

var STATE = {
    INIT: 0,
    IDLE: 1,
    WAIT: 2,
    BUZY: 3
};

function App(canvas) {
  this.canvas = canvas;
  this.view   = Dagaz.View.getView();
  this.state  = STATE.INIT;
}

Dagaz.Controller.createApp = function(canvas) {
  if (_.isUndefined(Dagaz.Controller.app)) {
      Dagaz.Controller.app = new App(canvas);
  }
  return Dagaz.Controller.app;
}

Dagaz.Model.InitGame();
var app = Dagaz.Controller.createApp(Canvas);

App.prototype.exec = function() {
  var timestamp = Date.now();
  this.view.draw(this.canvas);
  var delta = Date.now() - timestamp;
  _.delay(function() {
     app.exec();
  }, (delta > TIME_FRAME) ? 0 : TIME_FRAME - delta);
}

App.prototype.done = function() {
  this.state = STATE.IDLE;
}

App.prototype.mouseDown = function(view, pos) {
  if (this.state != STATE.INIT) {
      if (!_.isUndefined(this.from) && (this.from != pos)) {
          this.state = STATE.WAIT;
          view.movePiece(this.from, pos, null);
          view.commit();
          delete this.from;
      } else {
          if (view.isEmpty(pos)) {
              delete this.from;
          } else {
              view.markPositions(Dagaz.View.markType.TARGET, [ pos ]);
              this.from = pos;
          }
      }
  }
}

App.prototype.mouseUp = function(view, pos) {
  if (this.state != STATE.INIT) {
      view.markPositions(Dagaz.View.markType.TARGET, []);
      if (!_.isUndefined(this.from) && (this.from != pos)) {
          this.state = STATE.WAIT;
          view.movePiece(this.from, pos, null);
          view.commit();
          delete this.from;
      }
  }
}

app.view.init(app.canvas, app);
app.exec();

})();
