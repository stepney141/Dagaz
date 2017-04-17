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
  if (_.isUndefined(this.moves)) {
      return [];
  } else {
      return _.map(this.moves, function(move) {
          return _.chain(move.actions)
           .filter(isMove)
           .map(function(action) {
               return action[1][0];
            })
           .first()
           .value();
      });
  }
}

SimpleMoveList.prototype.getAttacking = function() {
  var moves = this.board.moves;
  if (!_.isUndefined(this.moves)) {
      moves = this.moves;
  }
  return _.chain(moves)
     .map(function(move) {
          return 
          _.chain(move.actions)
           .filter(isCapturing)
           .map(function(action) {
                return action[0];
            })
           .value();
      })
     .flatten()
     .compact()
     .value();
}

SimpleMoveList.prototype.setPosition = function(pos) {
  if (!_.isUndefined(this.moves)) {
      var moves = _.filter(this.moves, function(move) {
          return _.chain(move.actions)
           .filter(isMove)
           .filter(function(action) {
               return action[1][0] == pos;
            })
           .size()
           .value() > 0;
      });
      if (moves.length > 0) {
          this.moves = moves.slice(0, 1);
          return;
      }
  }
  var moves = _.filter(this.board.moves, function(move) {
      return _.chain(move.actions)
       .filter(isMove)
       .filter(function(action) {
           return action[0][0] == pos;
        })
       .size()
       .value() > 0;
  });
  if (moves) {
      this.moves = moves;
  }
}

})();
