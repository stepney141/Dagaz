(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "damone-extension") {
     checkVersion(design, name, value);
  }
}

var isAttacked = function(design, board, pos, empty, dir, opposite) {
  var p = design.navigate(board.player, pos, dir);
  if ((p === null) || (p == empty)) return false;
  var piece = board.getPiece(p);
  if ((p === null) || (p.player == board.player)) return false;
  p = design.navigate(board.player, pos, opposite);
  if (p === null) return false;
  return (p == empty) || (board.getPiece(p) === null);
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  if ((move.actions.length == 1) && (move.actions[0][0] !== null) && (move.actions[0][1] !== null)) {
      var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
      var ne = design.getDirection("ne"); var se = design.getDirection("se");
      var sr = move.actions[0][0][0];
      var ds = move.actions[0][1][0];
      if (isAttacked(design, board, ds, sr, nw, se) ||
          isAttacked(design, board, ds, sr, ne, sw) ||
          isAttacked(design, board, ds, sr, sw, ne)) {
          return 3;
      }
  }
  return 1;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var enemies = 0;
  var friends = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type >= 3)) {
          if (piece.player != player) {
              enemies++;
          } else {
              friends++;
          }
      }
  });
  if (enemies == 0) {
      return 1;
  }
  if (friends == 0) {
      return -1;
  }
  return checkGoals(design, board, player);
}

})();
