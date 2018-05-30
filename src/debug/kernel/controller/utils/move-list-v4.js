(function() {

function MoveList(board) {
  this.board = board;
}

Dagaz.Model.getMoveList = function(board) {
  board.generate();
  return new MoveList(board);
}

MoveList.prototype.isPassForced = function() {
  return false;
}

MoveList.prototype.getMoves = function() {
  if (_.isUndefined(this.moves)) {
      this.moves = [];
      _.each(this.board.moves, function(move) {
           var r = true;
           if (!_.isUndefined(this.blink)) {
               _.each(move.actions, function(a) {
                   if ((a[0] !== null) && (a[1] !== null)) { 
                       if (_.indexOf(this.blink, a[0][0]) < 0) r = false;
                   }
               }, this);
               if (!_.isUndefined(this.position)) {
                   _.each(move.actions, function(a) {
                       if ((a[0] !== null) && (a[1] !== null) && (a[0][0] == this.position)) { 
                           if (this.board.getPiece(a[1][0]) !== null) r = true;
                       }
                   }, this);
               }
           }
           if (r) {
               this.moves.push(move);
           }
      }, this);
  }
  return this.moves;
}

MoveList.prototype.isEmpty = function() {
  return this.getMoves().length == 0;
}

MoveList.prototype.isDone = function() {
  return this.getMoves().length == 1;
}

MoveList.prototype.canPass = function() {
  return false;
}

MoveList.prototype.getTargets = function() {
  return [];
}

MoveList.prototype.getCaptures = function() {
  return [];
}

MoveList.prototype.getDrops = function() {
  return [];
}

MoveList.prototype.getDropPieces = function(pos) {
  return null;
}

MoveList.prototype.getStarts = function() {
  if (_.isUndefined(this.starts)) {
      this.starts = [];
      _.each(this.getMoves(), function(move) {
          _.each(move.actions, function(a) {
              if ((a[0] !== null) && (a[1] !== null)) {
                  this.starts.push(a[0][0]);
              }
          }, this);
      }, this);
  }
  return this.starts;
}

MoveList.prototype.getStops = function() {
  if (_.isUndefined(this.stops)) {
      var result = [];
      var except = [];
      if (!_.isUndefined(this.position)) {
          _.each(this.getMoves(), function(move) {
              _.each(move.actions, function(a) {
                  if ((a[0] !== null) && (a[1] !== null)) {
                      if (_.indexOf(result, a[1][0]) < 0) {
                          result.push(a[1][0]);
                      } else {
                          except.push(a[1][0]);
                      }
                  }
              });
          });
      }
      this.stops = _.difference(result, except);
  }
  return this.stops;
}

MoveList.prototype.setPosition = function(pos) {
  var result = null;
  if (_.indexOf(this.getStops(), pos) >= 0) {
      _.each(this.getMoves(), function(move) {
         _.each(move.actions, function(a) {
            if ((a[0] !== null) && (a[1] !== null) && (a[1][0] == pos)) {
                result = move;
            }
         });
      });
      if (result !== null) {
          this.moves  = [ result ];
          this.starts = [];
          delete this.position;
          delete this.blink;
          delete this.stops;
      }
  } else {
      var f = false;
      if (_.isUndefined(this.blink) || (_.indexOf(this.blink, pos) < 0)) {
          if (_.indexOf(this.getStarts(), pos) >= 0) f = true;
      }
      if (f) {
          if (_.isUndefined(this.blink)) {
              this.blink = [];
          }
          this.blink.push(pos);
          this.position = pos;
      } else {
          delete this.position;
          delete this.blink;
      }
      delete this.starts;
      delete this.stops;
  }
  if (result === null) {
      result = Dagaz.Model.createMove();
  }
  return result;
}

})();
