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
  var p = design.navigate(player, pos, dir);
  if (p === null) return 0;
  var piece = board.getPiece(p);
  if (piece === null) return 0;
  if (piece.player != board.player) return 0;
  return +piece.getValue(ix);
}

var createPiece = function(design, board, player, pos) {
  var dirs = [];
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  dirs.push(design.getDirection("s")); dirs.push(design.getDirection("sw"));
  dirs.push(design.getDirection("w")); dirs.push(design.getDirection("nw"));
  var r = Dagaz.Model.createPiece(0, player);
  for (var ix = 0; ix < 4; ix++) {
      var v = 1;
      v += getLine(design, board, player, pos, dirs[ix], ix);
      v += getLine(design, board, player, pos, dirs[ix + 4], ix);
      r = r.setValue(ix, v);
  }
  return r;
}

var getTarget = function(design, board, player, pos, dir, ix) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return null;
  var piece = board.getPiece(p);
  while (piece !== null) {
      if (piece.player != player) return null;
      p = design.navigate(player, p, dir);
      if (p === null) return null;
      piece = board.getPiece(p);
  }
  var s = createPiece(design, board, player, p);
  return {
      pos:   p,
      piece: s,
      value: s.getValue(ix)
  };
}

var isTriplet = function(design, board, player, pos, piece, ix) {
  var dirs  = [];
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  dirs.push(design.getDirection("s")); dirs.push(design.getDirection("sw"));
  dirs.push(design.getDirection("w")); dirs.push(design.getDirection("nw"));
  var a = getTarget(design, board, player, pos, dirs[ix], ix);
  var b = getTarget(design, board, player, pos, dirs[ix + 4], ix);
  if ((a === null) || (b === null)) return false;
  return (a.value == 5) && (b.value == 5);
}

var getRank = function(design, board, player, pos, ix) {
  var dirs  = [];
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  dirs.push(design.getDirection("s")); dirs.push(design.getDirection("sw"));
  dirs.push(design.getDirection("w")); dirs.push(design.getDirection("nw"));
  var a = getTarget(design, board, player, pos, dirs[ix], ix);
  if ((a !== null) && (a.value == 5)) return 4;
  var b = getTarget(design, board, player, pos, dirs[ix + 4], ix);
  if ((b !== null) && (b.value == 5)) return 4;
  if ((a !== null) && (a.value == 4) && isTriplet(design, board, player, b.pos, b.piece, ix)) return 3;
  if ((b !== null) && (b.value == 4) && isTriplet(design, board, player, b.pos, b.piece, ix)) return 3;
  return 0;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  if (board.player == 1) {
      _.each(board.moves, function(move) {          
          if (move.isPass()) return;
          var pos    = move.actions[0][1][0];
          var piece  = move.actions[0][2][0];
          var result = [];
          var next   = null;
          for (var ix = 0; ix < 4; ix++) {
               var v = +piece.getValue(ix);
               if (v > 5) {
                   addKo(board, move);
                   move.failed = true;
                   return;
               }
               if (v > 2) {
                   if (next === null) {
                       next = board.apply(move);
                   }
                   v = getRank(design, next, board.player, pos, ix);
                   if (v > 2) {
                       result.push[v];
                   }
               }
          }
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
