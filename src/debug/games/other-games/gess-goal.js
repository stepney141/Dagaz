(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gess-goal") {
     checkVersion(design, name, value);
  }
}

var checkRing = function(design, board, pos) {
  if (board.getPiece(pos) !== null) return null;
  var r = null;
  for (var dir = 0; dir < design.dirs.length; dir++) {
       var p = design.navigate(board.player, pos, dir);
       if (p === null) return null;
       var piece = board.getPiece(p);
       if (piece === null) return null;
       if ((r !== null) && (r != piece.player)) return null;
       r = piece.player;
  }
  return r;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var players = [];
  for (var pos = 0; pos < (design.positions.length / 2) | 0; pos++) {
      var p = checkRing(design, board, pos);
      if (p === null) continue;
      if ((players.length == 0) || (players[0] != p)) {
          players.push(p);
      }
  }
  if (players.length < 2) {
      var r = 0;
      if (players.length > 0) {
          if (players[0] == board.player) {
              r = 1;
          } else {
              r = -1;
          }
      }
      if (player == board.player) {
          return r;
      } else {
          return -r;
      }
  }
  return checkGoals(design, board, player);
}

})();
