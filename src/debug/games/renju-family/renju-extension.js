(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "renju-extension") {
     checkVersion(design, name, value);
  }
}

var getLine = function(design, board, player, pos, dir, ix) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return -1;
  var piece = board.getPiece(p);
  if (piece === null) return 0;
  if (piece.player != board.player) return -1;
  return +piece.getValue(ix);
}

var createLine = function(a, b) {
  if ((a < 0) && (b < 0)) return -1;
  if (a < 0) return -b - 1;
  if (b < 0) return -a - 1;
  return a + b + 1;
}

var updateLine = function(design, board, player, pos, ix, vl, dir, move) {
  var p = design.navigate(player, pos, dir);
  while (p !== null) {
      var piece = board.getPiece(p);
      if ((piece === null) || (piece.player != board.player)) break;
      piece = piece.setValue(ix, vl);
      move.movePiece(p, p, piece);
      p = design.navigate(player, p, dir);
  }
}

var closeLine = function(design, board, player, pos, ix, dir, move) {
  var p = design.navigate(player, pos, dir);
  while (p !== null) {
      var piece = board.getPiece(p);
      if ((piece === null) || (piece.player == board.player)) break;
      var vl = +piece.getValue(ix);
      if (vl > 0) vl = -vl;
      piece = piece.setValue(ix, vl);
      move.movePiece(p, p, piece);
      p = design.navigate(player, p, dir);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var dirs   = [];
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  _.each(board.moves, function(move) {
      if (_.isUndefined(move.failed) && move.isDropMove()) {
          var pos   = move.actions[0][1][0];
          var piece = move.actions[0][2][0];
          for (var ix = 0; ix < dirs.length; ix++) {
               var fw = getLine(design, board, board.player, pos, dirs[ix], ix);
               var bk = getLine(design, board, 0, pos, dirs[ix], ix);
               var vl = createLine(fw, bk);
               updateLine(design, board, board.player, pos, ix, vl, dirs[ix], move);
               updateLine(design, board, 0, pos, ix, vl, dirs[ix], move);
               if (fw < 0) closeLine(design, board, board.player, pos, ix, dirs[ix], move);
               if (bk < 0) closeLine(design, board, 0, pos, ix, dirs[ix], move);
               piece = piece.setValue(ix, vl);
          }
          move.actions[0][2] = [ piece ];
      }
  });
  CheckInvariants(board);
}

})();
