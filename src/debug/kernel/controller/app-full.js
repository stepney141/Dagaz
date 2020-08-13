(function() {

Dagaz.Controller.WAIT_FRAME = 100;

function App() {}

Dagaz.Controller.app = new App();

var design = Dagaz.Model.getDesign();
Dagaz.Model.BuildDesign(design);

var view = Dagaz.View.getView(design);
view.setController(Dagaz.Controller.app);
Dagaz.View.configure(view);

var board = Dagaz.Model.getInitBoard();
view.setup(board);

App.prototype.exec = function() {
  if (view.isLoaded()) {
      view.draw();
      return true;
  }
  return false;
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
