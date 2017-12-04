(function() {

var DEF_TIMEOUT = 100;

var DIR_NAMES   = {
    "ArrowUp":    "n",
    "ArrowRight": "e",
    "ArrowDown":  "s",
    "ArrowLeft":  "w",
    "Up":         "n",
    "Right":      "e",
    "Down":       "s",
    "Left":       "w"
};

var queue = [];

var onkeyup = window.onkeyup;

var exec = function() {
  var app = Dagaz.Controller.app;
  if (app.list && (app.state == 1)) {
      var name = queue.shift();
      if (name) {
          var design = Dagaz.Model.design;
          var dir = design.getDirection(name);
          var moves = [];
          _.each(app.list.moves, function(m) {
              if ((m.actions.length > 0) && (m.actions[0][0] !== null) && (m.actions[0][1] !== null)) {
                  var pos = m.actions[0][0][0];
                  var target = design.navigate(1, pos, dir);
                  if ((target !== null) && (target == m.actions[0][1][0])) {
                      moves.push(m);
                  }
              }
          });
          if (moves.length == 1) {
              app.move  = moves[0];
              app.board = app.board.apply(app.move);
              app.state = 2; // STATE.WAIT
              app.move.applyAll(app.view);
              delete app.list;
          }
      }
  }
  if (queue.length > 0) {
      _.delay(function() {
         exec();
      }, DEF_TIMEOUT);
  }
}

window.onkeyup = function(event) {
  var name = DIR_NAMES[event.key];
  if (_.isUndefined(event.key)) {
      name = DIR_NAMES[event.keyIdentifier];
  }
  if (name) {
      queue.push(name);
      exec();
  }
  if (onkeyup) {
      onkeyup(event);
  }
}

})();
