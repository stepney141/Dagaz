(function() {

function App(canvas) {
  this.canvas = canvas;
  this.view   = Dagaz.View.getView();
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
  this.view.draw(this.canvas);
  _.delay(function() {
     app.exec();
  }, 100);
}

App.prototype.init = function() {
  this.view.draw(this.canvas);
  this.view.movePiece(16, 32, null);
  this.view.commit();
}

app.init();
app.exec();

})();
