(function() {

function MoveList(board) {
  this.board  = board;
  this.stack  = [ _.range(board.moves.length) ];
  this.level  = 0;
  this.stage  = 0;
}

Dagaz.Model.getMoveList = function(board) {
  board.generate();
  return new MoveList(board);
}

MoveList.prototype.getMoves = function() {
  return _.chain(this.stack.peekBack())
   .map(function(ix) {
       return this.board.moves[ix];
    }, this)
   .value();
}

var getPositions = function(move, level, stage) {
  var actions = _.filter(move.actions, function(action) {
      return action[3] === level;
  });
  if (stage < 2) {
      var r = _.chain(actions)
       .filter(function(action) {
           return (action[0] !== null) && (action[1] !== null);
        })
       .map(function(action) {
           return action[stage];
        })
       .value();
      if (r.length > 0) return r[0];
      if (stage === 1) return null;
      r = _.chain(actions)
       .filter(function(action) {
           return (action[0] === null) && (action[1] !== null);
        })
       .filter(function(action) {
           return action[1].length === 1;
        })
       .map(function(action) {
           return action[1];
        })
       .value();
      if (r.length > 0) return r[0];
      r = _.chain(actions)
       .filter(function(action) {
           return (action[0] !== null) && (action[1] === null);
        })
       .filter(function(action) {
           return action[0].length === 1;
        })
       .map(function(action) {
           return action[0];
        })
       .value();
      if (r.length > 0) {
          return r[0];
      } else {
          return null;
      }
  }
  r = _.chain(actions)
   .filter(function(action) {
       return (action[0] === null) || (action[1] === null);
    })
   .map(function(action) {
       if (action[0] !== null) {
           return action[0];
       } else {
           return action[1];
       }
    })
   .value();
  if (stage - 2 < r.length) {
      return r[stage - 2];
  } else {
      return null;
  }
}

MoveList.prototype.getPositions = function() {
  return _.chain(this.stack.peekBack())
   .map(function(ix) {
       return getPositions(this.board.moves[ix], this.level, this.stage);
    }, this)
   .compact()
   .flatten()
   .uniq()
   .value();
}

var getCapturing = function(move, level, stage) {
  var actions = _.filter(move.actions, function(action) {
      return action[3] === level;
  });
  var n = _.chain(actions)
   .filter(function(action) {
      return (action[0] !== null) && (action[1] !== null);
    })
   .size()
   .value();
  if ((stage === 0) && (n > 0)) return null;
  return _.chain(actions)
   .filter(function(action) {
      return (action[0] !== null) && (action[1] === null);
    })
   .map(function(action) {
      return action[1];
    })
   .value();
}

MoveList.prototype.getCapturing = function() {
  return _.chain(this.stack.peekBack())
   .map(function(ix) {
       return getCapturing(this.board.moves[ix], this.level, this.stage);
    }, this)
   .compact()
   .flatten()
   .uniq()
   .filter(function(pos) {
       return this.board.getPiece(pos) !== null;
    }, this)
   .value();
}

})();
