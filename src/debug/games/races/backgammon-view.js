(function() {

var cache = [];
var zSign = 0;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "backgammon-view") {
      checkVersion(design, name, value);
  }
}

var getRank = function(design, board, pos) {
  var x = 0; var y = 0;
  var p = design.navigate(board.player, pos, 5);
  if (p === null) return null;
  while (p !== null) {
      if (board.getPiece(p) === null) y++;
      x++;
      p = design.navigate(board.player, p, 5);
  }
  return {
      size: 17 - y,
      pos:  16 - x
  };
}

Dagaz.View.deltaY = function(pos) {
  var design = Dagaz.Model.design;
  var board  = Dagaz.Controller.app.board;
  if (board.zSign != zSign) {
      cache = [];
      zSign = board.zSign;
  }
  if (_.isUndefined(cache[pos])) {
      var dy = 0;
      var r = getRank(design, board, pos);
      if (r !== null) {
          if (r.size > 5) {
              dy = 38 - ((2 * r.size) | 0);
          } else {
              dy = 32;
          }
          dy -= 10;
          if (!design.inZone(4, board.player, +pos)) {
              dy = -dy;
          }
          dy *= r.pos;
      }
      cache[pos] = dy;
  }
  return cache[pos];
}

})();
