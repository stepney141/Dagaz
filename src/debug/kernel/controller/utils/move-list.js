(function() {

function MoveList(board) {
  this.board  = board;
  this.stack  = [ _.range(board.moves.length) ];
  this.level  = 0;
  this.stage  = 0;
  this.from   = null;
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

var getActions = function(move, level) {
  return _.filter(move.actions, function(action) {
      return action[3] === level;
  });
}

var isMove = function(action) {
  return (action[0] !== null) && (action[1] !== null);
}

var isDrop = function(action) {
  return (action[0] === null) && (action[1] !== null);
}

var isCapturing = function(action) {
  return (action[0] !== null) && (action[1] === null);
}

var getFrom = function(action) {
  return action[0];
}

var getTo = function(action) {
  return action[1];
}

var getPositions = function(move, level, stage) {
  var actions = getActions(move, level);
  if (stage < 2) {
      var r = _.chain(actions)
       .filter(isMove)
       .map(function(action) {
           return action[stage];
        })
       .value();
      if (r.length > 0) return r[0];
      if (stage === 1) return null;
      r = _.chain(actions)
       .filter(isDrop)
       .filter(function(action) {
           return action[1].length === 1;
        })
       .map(getTo)
       .value();
      if (r.length > 0) return r[0];
      r = _.chain(actions)
       .filter(isCapturing)
       .filter(function(action) {
           return action[0].length === 1;
        })
       .map(getFrom)
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
   .map(Dagaz.Model.posToString)
   .value();
}

var getCapturing = function(move, level, stage) {
  var actions = getActions(move, level);
  var n = _.chain(actions)
   .filter(isMove)
   .size()
   .value();
  if ((stage === 0) && (n > 0)) return null;
  return _.chain(actions)
   .filter(isCapturing)
   .map(getTo)
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
   .map(Dagaz.Model.posToString)
   .value();
}

var getPair = function(move, level, stage) {
  var actions = getActions(move, level);
  return _.chain(actions)
   .filter(isMove)
   .first()
   .map(function(action) {
        return action[stage];
    })
   .value();
}

MoveList.prototype.setPosition = function(name, view) {
  var move = Dagaz.Model.createMove();
  var pos = Dagaz.Model.stringToPos(name);
  var frame = _.filter(this.stack.peekBack(), function(ix) {
      return _.indexOf(
         getPositions(this.board.moves[ix], this.level, this.stage),
         pos) >= 0;
  }, this);
  if ((frame.length === 0) && (this.stage == 0) && (Dagaz.Model.smartTo === true)) {
      var src = _.filter(this.stack.peekBack(), function(ix) {
          return _.indexOf(
             getPositions(this.board.moves[ix], this.level, 1),
             pos) >= 0;
          }, this);
      if (src.length === 1) {
          frame = src;
          this.stage = 1;
          this.from  = getPair(this.board.moves[frame[0]], this.level, 0)[0];
      }
  }
  if (frame.length === 0) return null;
  this.stack.push(frame);
  if ((this.stage == 0) && (Dagaz.Model.smartFrom === true)) {
      var dst = _.chain(frame)
       .map(function(ix) {
           return this.board.moves[ix];  
        }, this)
       .map(function(move) {
           return getPair(move, this.level, 1);
        }, this)
       .compact()
       .flatten()
       .value();
       if (dst.length === 1) {
           this.stage = 1;
           this.from = pos;
           pos = dst[0];
       }
  }
  if (this.stage == 1) {
       var pieces = null;
       // TODO: Promotion

       move.movePiece(this.from, pos, pieces, 1);
       // TODO: Cascade moves
       // TODO: Capturing

       move.applyTo(view, 1);
  }
  if (this.stage > 1) {
       // TODO: Capturing
       // TODO: Drops

  }
  // TODO: Next Stage
  // TODO: Deferred Capturing

  return move.toString();
}

})();
