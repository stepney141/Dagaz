(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "renju-invariant") {
      checkVersion(design, name, value);
  }
}

var addKo = function(board, move) {
  if ((move.actions.length > 0) && (move.actions[0][1] !== null)) {
       pos = move.actions[0][1][0];
       if (_.isUndefined(board.ko)) {
           board.ko = [];
       }
       if (_.indexOf(board.ko, pos) < 0) {
           board.ko.push(pos);
       }
  }
}

var isFork = function(a) {
  if (a.length < 2) return false;
  if (a.length > 2) return true;
  if ((a[0] == 4) && (a[1] == 4)) return true;
  if ((a[0] == 3) && (a[1] == 3)) return true;
  return false;
}

var getLine = function(design, board, player, pos, dir, ix) {
  var r = 0;
  var p = design.navigate(player, pos, dir);
  if (p === null) return 0;
  var piece = board.getPiece(p);
  while (piece !== null) {
      if (piece.player != board.player) break;
      var v = +piece.getValue(ix);
      if (r < v) r = v;
      p = design.navigate(player, p, dir);
      if (p === null) break;
      piece = board.getPiece(p);
  }
  return r;
}

var createPiece = function(design, board, player, pos) {
  var dirs = [];
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  dirs.push(design.getDirection("s")); dirs.push(design.getDirection("sw"));
  dirs.push(design.getDirection("w")); dirs.push(design.getDirection("nw"));
  var r = Dagaz.Model.createPiece(0, player);
  for (var ix = 0; ix < 4; ix++) {
      var a = getLine(design, board, player, pos, dirs[ix], ix);
      var b = getLine(design, board, player, pos, dirs[ix + 4], ix);
      r = r.setValue(ix, a + b + 1);
  }
  return r;
}

var getRank = function(design, board, pos, dir, ix, forced) {
  var dirs  = [];
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  dirs.push(design.getDirection("s")); dirs.push(design.getDirection("sw"));
  dirs.push(design.getDirection("w")); dirs.push(design.getDirection("nw"));
  var p = design.navigate(board.player, pos, dir);
  if (p === null) return 0;
  var piece = board.getPiece(p);
  while (piece !== null) {
      if (piece.player != board.player) return 0;
      p = design.navigate(board.player, p, dir);
      if (p === null) return 0;
      piece = board.getPiece(p);
  }
  piece = createPiece(design, board, board.player, p);
  if (piece.getValue(ix) == 5) return 4;
  if (forced) {
      board.setPiece(p, piece);
      var a = getRank(design, board, p, dirs[ix], ix, false);
      var b = getRank(design, board, p, dirs[ix + 4], ix, false);
      board.setPiece(p, null);
      if ((a == 4) && (b == 4)) return 3;
  }
  return 0;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var dirs   = [];
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  dirs.push(design.getDirection("s")); dirs.push(design.getDirection("sw"));
  dirs.push(design.getDirection("w")); dirs.push(design.getDirection("nw"));
  if (board.player == 1) {
      _.each(board.moves, function(move) {          
          if (move.isPass()) return;
          var pos    = move.actions[0][1][0];
          var piece  = move.actions[0][2][0];
          var result = [];
          board.setPiece(pos, piece);
          for (var ix = 0; ix < 4; ix++) {
               var v = +piece.getValue(ix);
               if (v > 5) {
                   addKo(board, move);
                   move.failed = true;
                   return;
               }
               var a = getRank(design, board, pos, dirs[ix], ix, true);
               var b = getRank(design, board, pos, dirs[ix + 4], ix, true);
               if ((a == 4) && (b == 4)) {
                    if (v < 4) result.push(4);
                    result.push(4);
               }
               if (v < 3) {
                   if ((a == 3) && (b != 4)) result.push(3);
                   if ((a != 4) && (b == 3)) result.push(3);
               } else {
                   if ((a == 3) || (b == 3)) result.push(3);
               }
          }
          board.setPiece(pos, null);
          if (isFork(result)) {
              addKo(board, move);
              move.failed = true;
              return;
          }
      });
  }
  CheckInvariants(board);
}

})();
