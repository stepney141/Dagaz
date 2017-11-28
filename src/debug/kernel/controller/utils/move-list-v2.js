(function() {

function MoveList(board) {
  this.board    = board;
  this.moves    = board.moves;
  this.level    = 0;
  this.position = null;
  this.stops    = null;
}

Dagaz.Model.getMoveList = function(board) {
  Dagaz.KPI.open("model");
  board.generate();
  Dagaz.KPI.close("model");
  return new MoveList(board);
}

MoveList.prototype.isPassForced = function() {
  return (this.moves.length == 1) && this.moves[0].isPass();
}

MoveList.prototype.isEmpty = function() {
  return this.moves.length == 0;
}

var getMaxPart = function(move) {
  return _.chain(move.actions)
   .map(function(action) {
        return action[3];
    }).push(-1).max().value();
}

MoveList.prototype.getMoves = function() {
  Dagaz.KPI.open("get-moves", "all");
  var result = _.filter(this.moves, function(move) {
     return getMaxPart(move) < this.level + 1;
  }, this);
  Dagaz.KPI.close("get-moves");
  result = _.uniq(result, false, function(move) {
     return move.toString();
  });
  return result;
}

MoveList.prototype.isDone = function() {
  Dagaz.KPI.open("is-done", "all");
  var result = _.filter(this.moves, function(move) {
     return getMaxPart(move) >= this.level + 1;
  }, this).length == 0;
  Dagaz.KPI.close("is-done");
  return result;
}

MoveList.prototype.canPass = function() {
  Dagaz.KPI.open("can-pass", "all");
  var result = _.chain(this.moves).map(getMaxPart).min().value() <= this.level;
  Dagaz.KPI.close("can-pass");
  return result;
}

MoveList.prototype.getActions = function(move) {
  return _.filter(move.actions, function(action) {
     return action[3] == this.level + 1;
  }, this);
}

var isMove = function(action) {
  return (action[0] !== null) && (action[1] !== null);
}

var isNoMove = function(action) {
  return (action[0] === null) || (action[1] === null);
}

var isDrop = function(action) {
  return (action[0] === null) && (action[1] !== null);
}

var isCapturing = function(action) {
  return (action[0] !== null) && (action[1] === null);
}

MoveList.prototype.getTargets = function() {
  var result = [];
  Dagaz.KPI.open("get-targets", "init");
  if (this.position !== null) {
      _.each(this.moves, function(move) {
          var actions = _.filter(this.getActions(move), isMove);
          if ((actions.length > 0) && (_.indexOf(actions[0][0], this.position) >= 0)) {
              _.each(actions[0][1], function(pos) {
                   result.push(pos);
              });
          }
      }, this);
  }
  Dagaz.KPI.set("count", result.length, "get-targets");
  Dagaz.KPI.close("get-targets");
  Dagaz.KPI.open("get-targets", "uniq");
  result = _.uniq(result);
  Dagaz.KPI.set("count", result.length, "get-targets");
  Dagaz.KPI.close("get-targets");
  return result;
}

MoveList.prototype.getStarts = function() {
  var result = [];
  Dagaz.KPI.open("get-starts", "init");
  _.each(this.moves, function(move) {
      var actions = _.filter(this.getActions(move), isMove);
      if (actions.length > 0) {
          _.each(actions[0][0], function(pos) {
               result.push(pos);
          });
      }
  }, this);
  Dagaz.KPI.set("count", result.length, "get-starts");
  Dagaz.KPI.close("get-starts");
  Dagaz.KPI.open("get-starts", "uniq");
  result = _.uniq(_.union(result, this.getCaptures()));
  Dagaz.KPI.set("count", result.length, "get-starts");
  Dagaz.KPI.close("get-starts");
  return result;
}

MoveList.prototype.getStops = function() {
  if (this.stops !== null) {
      return this.stops;
  }
  var result = this.getTargets();
  Dagaz.KPI.open("get-stops", "init");
  Dagaz.KPI.set("moves", this.moves.length, "get-stops");
  _.each(this.moves, function(move) {
      var actions = _.filter(this.getActions(move), isMove);
      if ((actions.length == 0) || (actions[0][0].length > 1) || (actions[0][1].length > 1)) {
          _.chain(this.getActions(move))
           .filter(isNoMove)
           .each(function(action) {
                if (action[0] !== null) {
                    _.each(action[0], function(pos) {
                        result.push(pos);
                    });
                }
                if (action[1] !== null) {
                    _.each(action[1], function(pos) {
                        result.push(pos);
                    });
                }
            });
      }
  }, this);
  if (Dagaz.Model.smartFrom || Dagaz.Model.smartTo) {
      var positions = [];
      var canPass   = this.canPass();
      _.each(this.moves, function(move) {
            var actions = _.filter(this.getActions(move), isMove);
            if (!canPass && (actions.length > 0) && (actions[0][0].length == 1)) {
                positions.push(actions[0][0][0]);
            }
            if ((actions.length > 0) && (actions[0][1].length == 1)) {
                positions.push(actions[0][1][0]);
            }
      }, this);
      positions = _.countBy(positions, _.identity);
      _.each(_.keys(positions), function(pos) {
            if (positions[pos] == 1) {
                result.push(+pos);
            }
      });
  }
  Dagaz.KPI.set("count", result.length, "get-stops");
  Dagaz.KPI.close("get-stops");
  Dagaz.KPI.open("get-stops", "uniq");
  result = _.uniq(result);
  Dagaz.KPI.set("count", result.length, "get-stops");
  Dagaz.KPI.close("get-stops");
  this.stops = result;
  return result;
}

MoveList.prototype.getCaptures = function() {
  var result = [];
  Dagaz.KPI.open("get-captures", "init");
  _.each(this.moves, function(move) {
      var actions = _.filter(this.getActions(move), isMove);
      if (((actions.length > 0) && (_.indexOf(actions[0][0], this.position) >= 0)) ||
          ((actions.length == 0) && (this.position === null))) {
          _.chain(this.getActions(move))
           .filter(isCapturing)
           .each(function(action) {
                _.each(action[0], function(pos) {
                    result.push(pos);
                });
            });
      }
  }, this);
  Dagaz.KPI.set("count", result.length, "get-captures");
  Dagaz.KPI.close("get-captures");
  Dagaz.KPI.open("get-captures", "uniq");
  result = _.uniq(result);
  Dagaz.KPI.set("count", result.length, "get-captures");
  Dagaz.KPI.close("get-captures");
  return result;
}

MoveList.prototype.getDrops = function() {
  var result = [];
  _.each(this.moves, function(move) {
      var actions = _.filter(this.getActions(move), isMove);
      if (actions.length == 0) {
          _.chain(this.getActions(move))
           .filter(isDrop)
           .each(function(action) {
                _.each(action[1], function(pos) {
                    result.push(pos);
                });
            });
      }
  }, this);
  return _.map(_.uniq(result), function(pos) {
      var r = [];
      _.chain(this.getActions(move))
       .filter(isDrop)
       .each(function(action) {
           if ((_.indexOf(action[1], pos) >= 0) && (action[2] !== null)) {
                _.each(action[2], function(piece) {
                    r.push(piece);
                });
           }
        })
      return {
         position: pos,
         pieces:   r
      };
  }, this);
}

var isEq = function(x, y) {
  if (x === null) return y === null;
  if (y === null) return false;
  return _.intersection(x, y).length > 0;
}

MoveList.prototype.copyActions = function(move, actions, mode) {
  move.mode = mode;
  if (actions.length == 0) return;
  if (move.isPass()) {
      _.each(actions, function(action) {
          move.actions.push([ action[0], action[1], action[2], 1 ]);
      });
  } else {
      var result = [];
      _.each(actions, function(action) {
          _.each(move.actions, function(a) {
               if (isEq(action[0], a[0]) && isEq(action[1], a[1])) {
                   result.push([ action[0], action[1], action[2], 1 ]);
               }
          });
      });
      move.actions = result;
  }
}

MoveList.prototype.setPosition = function(pos) {
  var result = Dagaz.Model.createMove();
  Dagaz.KPI.open("set-position", "all");
  if (_.indexOf(this.getStops(), pos) >= 0) {
      var moves = _.filter(this.moves, function(move) {
          var actions = this.getActions(move);
          var m = _.filter(actions, isMove);
          if (m.length > 0) {
              if ((_.indexOf(m[0][0], this.position) >= 0) && (_.indexOf(m[0][1], pos) >= 0)) {
                  // Regular move
                  m[0][0] = [ this.position ];
                  m[0][1] = [ pos ];
                  this.copyActions(result, actions, move.mode);
                  return result;
              }
              if (Dagaz.Model.smartFrom && (this.position == null) && (_.indexOf(m[0][0], pos) >= 0)) {
                  // Smart from move
                  m[0][0] = [ pos ];
                  this.copyActions(result, actions, move.mode);
                  return result;
              }
              if (Dagaz.Model.smartTo && (this.position == null) && (_.indexOf(m[0][1], pos) >= 0)) {
                  // Smart from move
                  m[0][1] = [ pos ];
                  this.copyActions(result, actions, move.mode);
                  return result;
              }
          } else {
              var n = _.chain(actions)
               .filter(isNoMove)
               .filter(function(action) {
                   if (_.indexOf(action[0], pos) >= 0) {
                       // Capture move
                       action[0] = [ pos ];
                       return result;
                   }
                   if (_.indexOf(action[1], pos) >= 0) {
                       // Drop move
                       action[1] = [ pos ];
                       return result;
                   }
                   return result;
                }).value();
              if (n.length > 0) {
                  this.copyActions(result, actions, move.mode);
                  return result;
              }
          }
      }, this);
      if (moves.length != 0) {
          this.moves = moves;
          this.level++;
      }
      this.position = null;
  }
  if (_.indexOf(this.getStarts(), pos) >= 0) {
      if (this.position == pos) {
          this.position = null;
      } else {
          this.position = pos;
      }
  }
  Dagaz.KPI.close("set-position");
  this.stops = null;
  return result;
}

})();
