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

board.generate(design);
var moves = _.filter(board.moves, function(move) {
  return move.toString() == "E2 - E4";
});

_.each(moves, function(move) {
  console.log(move.toString());
});

view.apply(moves[0]);

App.prototype.exec = function() {
  if (view.isLoaded()) {
      view.draw();
//    return true;
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
