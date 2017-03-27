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

App.prototype.tick = function() {
  this.view.draw(this.canvas);
}

App.prototype.exec = function() {
  this.tick();
  _.delay(this.exec, 100);
}

Dagaz.Model.InitGame();
Dagaz.Controller.createApp(Canvas).exec();

})();
