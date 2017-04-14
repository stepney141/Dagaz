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

MoveList.prototype.getLevel = function() {
  return this.level;
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
      return action[3] == level;
  });
}

var isMove = function(action) {
  return (action[0] !== null) && (action[1] !== null);
}

var noMove = function(action) {
  return (action[0] === null) || (action[1] === null);
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

var getPiece = function(action) {
  return action[2];
}

var getPart = function(action) {
  return action[3];
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
      if (stage == 1) return null;
      r = _.chain(actions)
       .filter(isDrop)
       .filter(function(action) {
           return action[1].length == 1;
        })
       .map(getTo)
       .value();
      if (r.length > 0) return r[0];
      r = _.chain(actions)
       .filter(isCapturing)
       .filter(function(action) {
           return action[0].length == 1;
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
   .filter(noMove)
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

var getAttacking = function(move, level, stage) {
  var actions = getActions(move, level);
  var n = _.chain(actions)
   .filter(isMove)
   .size()
   .value();
  if ((stage == 0) && (n > 0)) return null;
  return _.chain(actions)
   .filter(isCapturing)
   .map(getTo)
   .value();
}

MoveList.prototype.getAttacking = function() {
  return _.chain(this.stack.peekBack())
   .map(function(ix) {
       return getAttacking(this.board.moves[ix], this.level, this.stage);
    }, this)
   .compact()
   .flatten()
   .uniq()
   .filter(function(pos) {
       return this.board.getPiece(pos) !== null;
    }, this)
   .value();
}

MoveList.prototype.canDone = function() {
  var frame = _.chain(this.stack.peekBack())
   .map(function(move) {
       return _.chain(move.actions)
        .map(getPart)
        .max()
        .value();
    })
   .filter(function(n) {
        return n <= this.level;
    }, this)
   .value();
  return frame.length > 0;
}

MoveList.prototype.done = function(view) {
  var frame = _.chain(this.stack.peekBack())
   .filter(function(move) {
       return _.chain(move.actions)
        .map(getPart)
        .max()
        .value() <= this.level;
    }, this)
   .value();
  if (frame.length == 1) {
      var move = frame[0];
      move.applyTo(view, -1);
  }
  if (frame.length > 0) {
      this.stack.push(frame);
      return frame;
  } else {
      return null;
  }
}

MoveList.prototype.canPass = function() {
  if (this.stage < 2) {
      return this.canDone();
  } else {
      var minStage = _.chain(this.stack.peekBack())
       .map(function(move) {
           var actions = getActions(move, this.level);
           return _.filter(actions, noMove);
        }, this)
       .map(_.size)
       .min()
       .value();
      return this.stage - 2 >= minStage;
  }
}

MoveList.prototype.pass = function(view) {
  if (this.stage < 2) {
      return this.done(view);
  } else {
      var frame = 
      _.chain(this.stack.peekBack())
       .filter(function(move) {
          return _.chain(getActions(move, this.level))
           .filter(noMove)
           .size()
           .value() <= this.stage - 2;
        }, this)
       .value();
      if (frame.length > 0) {
          this.stack.push(frame);
          return frame;
      } else {
          return null;
      }
  }
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

var determinate = function(list, pos) {
  if (pos === null) return list;
  if (_.indexOf(list, pos) >= 0) {
      return [ pos ];
  } else {
      return list;
  }
}

MoveList.prototype.setPosition = function(name, view) {
  var move = Dagaz.Model.createMove();
  var pos = Dagaz.Model.stringToPos(name);
  var frame = _.filter(this.stack.peekBack(), function(ix) {
      return _.indexOf(
         getPositions(this.board.moves[ix], this.level, this.stage),
         pos) >= 0;
  }, this);
  if ((frame.length == 0) && (this.stage == 0) && Dagaz.Model.smartTo) {
      var src = _.filter(this.stack.peekBack(), function(ix) {
          return _.indexOf(
             getPositions(this.board.moves[ix], this.level, 1),
             pos) >= 0;
          }, this);
      if (src.length == 1) {
          frame = src;
          this.stage = 1;
          this.from  = getPair(this.board.moves[frame[0]], this.level, 0)[0];
      }
  }
  if (frame.length == 0) return null;
  this.stack.push(frame);
  if ((this.stage == 0) && Dagaz.Model.smartFrom) {
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
       if (dst.length == 1) {
           this.stage = 1;
           this.from = pos;
           pos = dst[0];
       }
  }
  if (this.stage == 1) {
      // IMPORTANT: Non Determenistic Cascade moves and Alternative promotions
      //            not supported
      var actions = getActions(frame[0], this.level);
      _.chain(actions)
       .filter(isMove)
       .each(function(action) {
           var from = getFrom(action);
           var to = getTo(action);
           from = determinate(from, this.from);
           from = determinate(from, pos);
           to = determinate(to, this.from);
           to = determinate(to, pos);
           move.movePiece(from, to, getPiece(action));
        });
      var caps = _.chain(frame)
       .map(function(move) {
           var actions = getActions(move, this.level);
           var r = _.chain(actions)
            .filter(isCapturing)
            .map(getFrom)
            .value();
           if (r.length == 0) {
               return null;
           } else {
               return r;
           }
        }, this)
       .flatten()
       .uniq()
       .value();
      if (caps.length == 1) {
          var pos = caps[0];
          if (pos !== null) {
              move.capturePiece(pos);
          }
      }
      var drops = _.chain(frame)
       .map(function(move) {
           var actions = getActions(move, this.level);
           return _.chain(actions)
            .filter(isCapturing)
            .map(getFrom)
            .value();
        }, this)
       .flatten()
       .compact()
       .uniq()
       .value();
      if ((caps.length > 1) || (drops.length > 0)) {
           this.stage = 2;
      } else {
           this.stage = 0;
           this.level++;
      }
  }
  if (this.stage > 1) {
      var actions = _.chain(frame)
       .map(function(move) {
           var actions = getActions(move, this.level);
           return _.filter(actions, noMove);
        }, this)
       .value();
      _.chain(actions)
       .map(function(actions) {
           if (this.stage - 2 < actions.length) {
                actions[this.stage - 2];
           } else {
                return null;
           }
        }, this)
       .compact()
       .filter(function(action) {
           return (determinate(getFrom(action), pos).length == 1) ||
                  (determinate(getTo(action), pos).length == 1);
        })
       .first()
       .each(function(action) {
           move.actions.push([ getFrom(action), getTo(action), getPiece(action), 1 ]);
        });
       this.stage++;
       var maxStage = _.chain(actions)
        .map(_.size)
        .max()
        .value();
       if (this.stage - 2 >= maxStage) {
           this.stage = 0;
           this.level++;
       }
  }
  move.applyTo(view);
  return move.toString();
}

})();
