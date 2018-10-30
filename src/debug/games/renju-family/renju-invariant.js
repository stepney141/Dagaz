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

var getRank = function(design, board, player, pos, dir, opposite) {
  var cnt = 1;
  var p = design.navigate(player, pos, opposite);
  while (p !== null) {
      var piece = board.getPiece(p);
      if ((piece === null) || (piece.player != player)) break;
      p = design.navigate(player, p, opposite);
      cnt++;
  }
  p = design.navigate(player, pos, dir);
  while (p !== null) {
      var piece = board.getPiece(p);
      if (piece === null) {
          p = design.navigate(player, p, dir);
          var sign = 1;
          while (p !== null) {
              piece = board.getPiece(p);
              if (piece === null) break;
              if (piece.player != player) return cnt * sign;
              p = design.navigate(player, p, dir);
              cnt++;
              sign = -1;
          }
          return cnt;
      }
      if (piece.player != player) return 0;
      p = design.navigate(player, p, dir);
      cnt++;
  }
  return 0;
}

var calcRank = function(x, y) {
  if ((x < 0) && (y < 0)) {
      if (x < y) {
          return x;
      } else {
          return y;
      }
  }
  if (Math.abs(x) > 3) return x;
  if (Math.abs(y) > 3) return y;
  if ((x <= 0) && (y <= 0)) return 0;
  if (Math.abs(x) > Math.abs(y)) {
      return x;
  } else {
      return y;
  }
}

var isTriplet = function(design, board, player, pos, dir, opposite) {
  p = design.navigate(player, pos, dir);
  while (p !== null) {
      if (board.getPiece(p) === null) {
          var x = getRank(design, board, player, p, dir, opposite);
          var y = getRank(design, board, player, p, opposite, dir);
          return calcRank(x, y) == 4;
      }
      p = design.navigate(player, p, dir);
  }
  return false;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var dirs   = [];
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  dirs.push(design.getDirection("s")); dirs.push(design.getDirection("sw"));
  dirs.push(design.getDirection("w")); dirs.push(design.getDirection("nw"));
  _.each(board.moves, function(move) {
      if (board.player == 1) {
          var pos   = move.actions[0][1][0];
          var piece = move.actions[0][2][0];
          var res   = [];
          for (var ix = 0; ix < 4; ix++) {
               var v = +piece.getValue(ix);
               if (v > 5) {
                   addKo(board, move);
                   move.failed = true;
                   return;
               }
               var x = getRank(design, board, board.player, pos, dirs[ix], dirs[ix + 4]);
               var y = getRank(design, board, board.player, pos, dirs[ix + 4], dirs[ix]);
               res.push(calcRank(x, y));
          }
          if (_.filter(res, function(x) { return Math.abs(x) >= 4; }).length >= 2) {
               addKo(board, move);
               move.failed = true;
               return;
          }
          if (_.filter(res, function(x) { return (x < -3) || (x >= 3); }).length >= 2) {
               var b = board.apply(move);
               var cnt = 0;
               for (var ix = 0; ix < 4; ix++) {
                   if (Math.abs(res[ix]) > 3) {
                       cnt++;
                       continue;
                   }
                   if (res[ix] == 3) {
                       if (isTriplet(design, b, board.player, pos, dirs[ix], dirs[ix + 4]) ||
                           isTriplet(design, b, board.player, pos, dirs[ix + 4], dirs[ix])) cnt++;
                   }
               }
               if (cnt >= 2) {
                   addKo(board, move);
                   move.failed = true;
                   return;
               }
          }
      }
  });
  CheckInvariants(board);
}

})();
