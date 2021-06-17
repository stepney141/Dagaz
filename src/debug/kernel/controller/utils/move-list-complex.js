(function() {

function MoveList(board) {
  this.board = board;
  this.moves = board.moves;
  this.src   = null;
  this.dst   = null;
  this.mode  = board.getValue(board.player - 1);
  this.tile  = null;
}

Dagaz.Model.getMoveList = function(board) {
  board.generate();
  return new MoveList(board);
}

MoveList.prototype.isComplex = function() {
  return this.tile !== null;
}

MoveList.prototype.getMode = function(move) {
  if (_.isUndefined(move._mode)) {
      var b = this.board.apply(move);
      move._mode = b.getValue(this.board.player - 1);
  }
  return move._mode;
}

MoveList.prototype.getMoves = function() {
  if (_.isUndefined(this.list)) {
      this.list = _.filter(this.moves, function(move) {
         if (this.src === null) return true;
         var r = false;
         _.each(move.actions, function(a) {
            if (a[0] !== null) {
                if (a[0][0] == this.src) r = true;
                if (!this.isComplex() && (this.dst !== null)) {
                    if ((a[1] === null) || (a[1][0] != this.dst)) {
                        r = false;
                        return;
                    }
                }
            }
            if (this.isComplex() && (this.dst !== null)) {
                if ((this.mode !== null) && (this.getMode(move) != this.mode)) {
                    r = false;
                    return;
                }
                _.each(move.actions, function(a) {
                    if (a[0] !== null) return;
                    if (a[1] === null) return;
                    if (a[2] === null) return;
                    if (a[1][0] != this.dst) {
                        r = false;
                        return;
                    }
                    var piece = a[2][0];
                    var v = piece.getValue(0);
                    if (v === null) return;
                    if (v == this.tile) return;
                    r = false;
                }, this);
            }
         }, this);
         return r;
      }, this);
  }
  return this.list;
}

MoveList.prototype.getStarts = function() {
  if (_.isUndefined(this.starts)) {
      var r = [];
      _.each(this.moves, function(move) {
          _.each(move.actions, function(a) {
              if (a[0] === null) return;
              r.push(+a[0][0]);
          });
      });
      this.starts = _.uniq(r);
  }
  return this.starts;
}

MoveList.prototype.getStops = function() {
  if (_.isUndefined(this.stops)) {
      var r = [];
      _.each(this.getMoves(), function(move) {
          _.each(move.actions, function(a) {
             if (a[1] === null) return;
             if (this.isComplex()) {
                 if (a[0] !== null) return;
                 if (a[2] === null) return;
                 var piece = a[2][0];
                 var v = piece.getValue(0);
                 if (v === null) return;
                 if (v != this.tile) return;
             } else {
                 if (a[0] === null) return;
                 if (this.src !== null) {
                     if (a[0][0] != this.src) return;
                 }
             }
             r.push(+a[1][0]);
          }, this);
      }, this);
      this.stops = _.uniq(r);
  }
  return this.stops;
}

MoveList.prototype.setMode = function(mode) {
  this.mode = mode;
  delete this.list;
}

MoveList.prototype.setPosition = function(pos) {
  if (this.src !== null) {
      if (_.indexOf(this.getStops(), +pos) < 0) this.src = null;
  }
  if (this.src !== null) {
      this.dst = pos;
      delete this.list;
      if (this.getMoves().length > 0) return;
      this.mode = null;
      delete this.list;
      if (this.getMoves().length > 0) return;
      this.src = null;
      this.dst = null;
      delete this.stops;
      delete this.list;
  }
  if (this.src === null) {
      var piece = this.board.getPiece(pos);
      if (piece !== null) {
          this.tile = piece.getValue(0);
          this.src  = pos;
          this.mode = this.board.getValue(this.board.player - 1);
          delete this.stops;
          delete this.list;
      }
  }
}

})();
