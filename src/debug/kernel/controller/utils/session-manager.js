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
      undo.style.display = "inline";
  } else {
      undo.style.display = "none";
  }
  if (!_.isUndefined(this.current) && !_.isUndefined(this.current.current)) {
      redo.style.display = "inline";
  } else {
      redo.style.display = "none";
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

Dagaz.Controller.pushState = function(move, board) {
  var sm = Dagaz.Controller.getSessionManager();
  if (!_.isUndefined(sm.current) && _.isUndefined(sm.current.current)) {
      board.generate();
      sm.current.current = {
          parent: sm.current,
          move:   move,
          board:  board,
          states: []
      };
      sm.current.states.push(sm.current.current);
      sm.updateButtons();
  }
}

Dagaz.Controller.noRedo = function() {
  var sm = Dagaz.Controller.getSessionManager();
  return !_.isUndefined(sm.current) && _.isUndefined(sm.current.current);
}

var noMoves = function(board) {
  if (!_.isUndefined(Dagaz.Controller.skip)) {
      if (Dagaz.Controller.skip(board)) {
          return true;
      }
  }
  for (var ix = 0; ix < board.moves.length; ix++) {
       if (!board.moves[ix].isPass()) return false;
  }
  return true;
}

SessionManager.prototype.redo = function(board) {
  if (_.isUndefined(this.current) || _.isUndefined(this.current.current)) return null;
  this.current = this.current.current;
  console.log("redo");
  return this.current.board;
}

var isRandom = function(board) {
  var design = Dagaz.Model.getDesign();
  if (_.isUndefined(design.turns)) return false;
  if (_.isUndefined(design.turns[board.turn])) return false;
  return design.turns[board.turn].random;
}

Dagaz.Controller.redo = function() {
  var sm = Dagaz.Controller.getSessionManager();
  if (_.isUndefined(sm.current) || !sm.controller.isReady()) return;
  var current = sm.current;
  var board   = sm.redo();
  if (board === null) return;
  if (!_.isUndefined(sm.controller.setMove)) {
      sm.controller.setMove(board.move);
  } else {
      if (_.isUndefined(sm.controller.setBoard)) return;
      while ((sm.aiPresent() && (board.player != current.board.player) && sm.current.current) || noMoves(board) || isRandom(board)) {
         if (_.isUndefined(sm.current.current)) break;
         var b = sm.redo();
         if (b === null) {
             sm.current = current;
             return;
         }
         board = b;
      }
      if (!_.isUndefined(Dagaz.Controller.play)) {
          Dagaz.Controller.play(Dagaz.Sounds.page);
      }
      sm.controller.setBoard(board);
  }
  sm.updateButtons();
}

SessionManager.prototype.undo = function() {
  if (_.isUndefined(this.current) || _.isUndefined(this.current.parent)) return null;
  this.current = this.current.parent;
  console.log("undo");
  return this.current.board;
}

Dagaz.Controller.undo = function() {
  var sm = Dagaz.Controller.getSessionManager();
  if (_.isUndefined(sm.current) || _.isUndefined(sm.controller.setBoard) || !sm.controller.isReady()) return;
  var current = sm.current;
  var board   = sm.undo();
  if (board !== null) {
      while ((sm.aiPresent() && (board.player != current.board.player) && board.parent) || noMoves(board) || isRandom(board)) {
         var b = sm.undo();
         if (b === null) {
             sm.current = current;
             return;
         }
         board = b;
      }
  }
  if (!_.isUndefined(Dagaz.Controller.play)) {
      Dagaz.Controller.play(Dagaz.Sounds.page);
  }
  sm.controller.setBoard(board);
  sm.updateButtons();
}

})();
