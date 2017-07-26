(function() {

var checkVersion = Dagaz.Model.checkVersion;
var row = 8;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "checkers-setup") {
      checkVersion(design, name, value);
  }
}

var getX = function(pos) {
  return pos % row;
}

var getY = function(pos) {
  return (pos / row) | 0;
}

var notValid = function(pos) {
  if (getY(pos) % 2 == 0) {
      return getX(pos) % 2 == 0;
  } else {
      return getX(pos) % 2 != 0;
  }
}

var isAttacked = function(a, positions) {
  var r = false;
  _.each(positions, function(b) {
      if (Math.abs(getX(a) - getX(b)) == Math.abs(getY(a) - getY(b))) {
          r = true;
      }
  });
  return r;
}

Dagaz.AI.isSafePosition = function(design, board, pos) {
  var piece = board.getPiece(pos);
  if (piece === null) return false;
  var r = true;
  _.each(design.allPositions(), function(p) {
      var enemy = board.getPiece(p);
      if ((enemy !== null) && (enemy.player != piece.player)) {
          if (Math.abs(getX(pos) - getX(p)) == Math.abs(getY(pos) - getY(p))) {
              r = false;
          }
      }
  });
  return r;
}

Dagaz.Model.setup = function(board) {
  var design = Dagaz.Model.design;
  var cnt = design.positions.length;
  row = Math.sqrt(cnt) | 0;
  var positions = [];
  for (var i = 0; i < 3; i++) {
       var pos = _.random(0, cnt - 1);
       while (notValid(pos) || (_.indexOf(positions, pos) >= 0)) {
           pos = _.random(0, cnt - 1);
       }
       board.setPiece(pos, Dagaz.Model.createPiece(1, 1));
       positions.push(pos);
  }
  positions.push(row - 1);
  var pos = _.random(0, cnt - 1);
  while (notValid(pos) || isAttacked(pos, positions)) {
      pos = _.random(0, cnt - 1);
  }
  board.setPiece(pos, Dagaz.Model.createPiece(1, 2));
}

})();
