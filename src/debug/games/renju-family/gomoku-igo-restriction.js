(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gomoku-igo-restriction") {
     checkVersion(design, name, value);
  }
}

var isSurround = function(design, board, player, pos, dirs) {
  var dame = 0;
  var group = [pos];
  for (var i = 0; i < group.length; i++) {
       _.each(dirs, function(dir) {
            var p = design.navigate(player, group[i], dir);
            if (p === null) return;
            if (_.indexOf(group, p) >= 0) return;
            var piece = board.getPiece(p);
            if (piece === null) {
                dame++;
                return;
            }
            if (piece.player != player) return;
            group.push(p);
       });
  }
  return dame == 0;
}

var calcLine = function(design, board, player, pos, dir) {
  var r = 0;
  var p = design.navigate(player, pos, dir);
  while (p !== null) {
      var piece = board.getPiece(p);
      if (piece === null) return r;
      if (piece.player != player) return r;
      p = design.navigate(player, p, dir);
      r++;
  }
  return r;
}

var isLine = function(design, board, player, pos, d, o) {
  return calcLine(design, board, player, pos, d) + calcLine(design, board, player, pos, o) == 4;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!move.isDropMove()) return;
      var pos = move.actions[0][1][0];
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (!_.isUndefined(board.move) && board.move.isDropMove()) {
          if (board.move.actions[0][1][0] === pos) {
              move.failed = true;
              return;
          }
      }
      if (!isSurround(design, board, piece.player, pos, [1, 3, 4, 7]) &&
          !isSurround(design, board, piece.player, pos, [0, 2, 5, 6])) {
          move.failed = true;
          return;
      }
      if (isLine(design, board, piece.player, pos, 0, 6) ||
          isLine(design, board, piece.player, pos, 1, 7) ||
          isLine(design, board, piece.player, pos, 2, 5) ||
          isLine(design, board, piece.player, pos, 3, 4)) {
          move.failed = true;
      }
  });
  CheckInvariants(board);
}

})();
