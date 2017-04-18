(function() {

function SimpleMoveList(board) {
  this.board  = board;
}

Dagaz.Model.getMoveList = function(board) {
  board.generate();
  return new SimpleMoveList(board);
}

SimpleMoveList.prototype.getLevel = function() {
  if (_.isUndefined(this.moves)) {
      return 0;
  } else {
      return 1;
  }
}

SimpleMoveList.prototype.getMoves = function() {
  if (_.isUndefined(this.moves)) {
      return this.board.moves;
  } else {
      return this.moves;
  }
}

var isMove = function(action) {
  return (action[0] !== null) && (action[1] !== null);
}

var isCapturing = function(action) {
  return (action[0] !== null) && (action[1] === null);
}

SimpleMoveList.prototype.getPositions = function() {
  var moves = this.board.moves;
  if (!_.isUndefined(this.moves)) {
      moves = this.moves;
  }
  return _.chain(moves)
   .map(function(move) {
      return _.chain(move.actions)
       .filter(isMove)
       .slice(0, 1)
       .map(function(action) {
            if (_.isUndefined(this.moves)) {
                return +action[0];
            } else {
                return +action[1];
            }
        }, this)
       .value();
    }, this)
   .flatten()
   .compact()
   .uniq()
   .value();
}

SimpleMoveList.prototype.getAttacking = function() {
  var moves = this.board.moves;
  if (!_.isUndefined(this.moves)) {
      moves = this.moves;
  }
  return _.chain(moves)
     .map(function(move) {
          return _.chain(move.actions)
           .filter(isCapturing)
           .map(function(action) {
                return +action[0];
            })
           .value();
      })
     .flatten()
     .compact()
     .uniq()
     .value();
}

SimpleMoveList.prototype.canDone = function() {
  if (_.isUndefined(this.moves)) return false;
  return this.moves.length == 1;
}

SimpleMoveList.prototype.done = function(view) {
  delete this.moves;
}

SimpleMoveList.prototype.setPosition = function(pos) {
  var moves = [];
  if (!_.isUndefined(this.moves)) {
      moves = _.filter(this.moves, function(move) {
          return _.chain(move.actions)
           .filter(isMove)
           .slice(0, 1)
           .filter(function(action) {
               return action[1][0] == pos;
            })
           .size()
           .value() > 0;
      });
  }
  if (moves.length > 0) {
      this.moves = moves;
      return;
  }
  moves = _.filter(this.board.moves, function(move) {
      return _.chain(move.actions)
       .filter(isMove)
       .slice(0, 1)
       .filter(function(action) {
           return action[0][0] == pos;
        })
       .size()
       .value() > 0;
  });
  if (moves.length > 0) {
      this.moves = moves;
  }
}

})();
