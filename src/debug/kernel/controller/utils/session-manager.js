(function() {

var sessionManager = null;

function SessionManager(controller) {
  this.controller = controller;
  this.states = [];
}

Dagaz.Controller.getSessionManager = function(controller) {
  if (sessionManager === null) {
      sessionManager = new SessionManager(controller);
  }
  return sessionManager;
}

SessionManager.prototype.aiPresent = function() {
  return this.controller.getAI() !== null;
}

SessionManager.prototype.updateButtons = function() {
  if (!_.isUndefined(this.current) && !_.isUndefined(this.current.parent)) {
      backward.style.display = "inline";
  } else {
      backward.style.display = "none";
  }
  if (!_.isUndefined(this.current) && !_.isUndefined(this.current.current)) {
      forward.style.display = "inline";
  } else {
      forward.style.display = "none";
  }
}

SessionManager.prototype.addState = function(move, board) {
  var current = {
      move:   move,
      board:  board,
      states: []
  };
  if (!_.isUndefined(this.current)) {
      current.parent = this.current;
      for (var i = 0; i < this.current.states.length; i++) {
           if (this.current.states[i].move.toString() == move.toString()) {
               this.current.current = this.current.states[i];
               this.current = this.current.states[i];
               return;
           }
      }
      this.current.states.push(current);
      this.current.current = current;
  } else {
      this.states.push(current);
  }
  this.current = current;
}

Dagaz.Controller.addState = function(move, board) {  
  var sm = Dagaz.Controller.getSessionManager();
  sm.addState(move, board);
  sm.updateButtons();
}

SessionManager.prototype.forward = function(board) {
  if (_.isUndefined(this.current) || _.isUndefined(this.current.current)) return null;
  this.current = this.current.current;
  console.log("Forward");
  return this.current.board;
}

Dagaz.Controller.forward = function() {
  var sm = Dagaz.Controller.getSessionManager();
  if (_.isUndefined(sm.current) || _.isUndefined(sm.controller.setBoard) || !sm.controller.isReady()) return;
  var current = sm.current;
  var board   = sm.forward();
  if (board !== null) {
      while (sm.aiPresent() && (board.player != current.board.player)) {
         var b = sm.forward();
         if (b === null) {
             sm.current = current;
             return;
         }
         board = b;
      }
  }
  sm.controller.setBoard(board);
  sm.updateButtons();
}

SessionManager.prototype.backward = function() {
  if (_.isUndefined(this.current) || _.isUndefined(this.current.parent)) return null;
  this.current = this.current.parent;
  console.log("Backward");
  return this.current.board;
}

Dagaz.Controller.backward = function() {
  var sm = Dagaz.Controller.getSessionManager();
  if (_.isUndefined(sm.current) || _.isUndefined(sm.controller.setBoard) || !sm.controller.isReady()) return;
  var current = sm.current;
  var board   = sm.backward();
  if (board !== null) {
      while (sm.aiPresent() && (board.player != current.board.player)) {
         var b = sm.backward();
         if (b === null) {
             sm.current = current;
             return;
         }
         board = b;
      }
  }
  sm.controller.setBoard(board);
  sm.updateButtons();
}

})();
