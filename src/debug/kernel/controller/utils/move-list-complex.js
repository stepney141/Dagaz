(function() {

function MoveList(board) {
  this.board    = board;
  this.moves    = board.moves;
  this.level    = 0;
  this.position = null;
  this.mode     = board.getValue(board.player - 1);
  this.tile     = null;
}

MoveList.prototype.isComplex = function() {
  return this.tile !== null;
}

MoveList.prototype.setPosition = function(pos) {
  if (this.position === null) {

  } else {

  }
}

MoveList.prototype.getStarts = function() {
}

MoveList.prototype.getStops = function() {
}

})();
