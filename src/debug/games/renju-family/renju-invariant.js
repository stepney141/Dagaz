(function() {

var MAXVALUE      = 1000000;

var NEAR_FACTOR   = 1;
var FRIEND_FACTOR = 1;
var ENEMY_FACTOR  = 1;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "renju-invariant") {
      checkVersion(design, name, value);
  }
}

var getHalf = function(design, board, pos, dir, ix) {
  var q = design.navigate(board.player, pos, dir);
  if (q === null) return null;
  var p = 0;
  var v = 0;
  var c = true; 
  var piece  = board.getPiece(q);
  if (piece !== null) {
      p = piece.player;
      v = +piece.getValue(ix);
      while (q !== null) {
          piece = board.getPiece(q);
          if (piece === null) {
              c = false;
              break;
          }
          if (piece.player != p) break;
          q = design.navigate(board.player, q, dir);
      }
  }
  return {
     player: p,
     value:  v,
     closed: c
  };
}

Dagaz.AI.eval = function(design, params, board, player) {
  var dirs = []; var lines = [];
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  dirs.push(design.getDirection("s")); dirs.push(design.getDirection("sw"));
  dirs.push(design.getDirection("w")); dirs.push(design.getDirection("nw"));
  _.each(design.allPositions(), function(pos) {
      if (board.getPiece(pos) === null) {
          for (var ix = 0; ix < 4; ix++) {
               var fw = getHalf(design, board, pos, dirs[ix], ix);
               var bk = getHalf(design, board, pos, dirs[ix + 3], ix);
               if ((fw !== null) && (bk !== null) && (fw.player == bk.player) && (fw.player != 0)) {
                   lines.push({
                       player: fw.player,
                       value:  fw.value + bk.value,
                       closed: fw.closed || bk.closed
                   });
               }
               if ((fw !== null) && (fw.player != 0)) {
                   lines.push({
                       player: fw.player,
                       value:  fw.value,
                       closed: fw.closed
                   });
               }
               if ((bk !== null) && (bk.player != 0)) {
                   lines.push({
                       player: bk.player,
                       value:  bk.value,
                       closed: bk.closed
                   });
               }
          }
      }
  });
  var r = 0;
  _.each(lines, function(line) {
      if ((!line.closed && (line.value == 4)) || (line.value > 4)) {
          if (line.player != board.player) {
              r += MAXVALUE / 2;
          } else {
              r -= MAXVALUE;
          }
          return;
      }
      if (!line.closed && (line.value == 3)) {
          if (line.player != board.player) {
              r += 50;
          } else {
              r -= 100;
          }
      }
      if (line.closed) return;
      if (line.player != board.player) {
          r ++;
      } else {
          r --;
      }
  });
  if (board.player != player) {
      r = -r;
  }
  return r;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 0;
  var dirs   = [];
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  dirs.push(design.getDirection("s")); dirs.push(design.getDirection("sw"));
  dirs.push(design.getDirection("w")); dirs.push(design.getDirection("nw"));
  if ((move.actions.length > 0) && (move.actions[0][0] === null) && (move.actions[0][1] !== null)) {
      var pos = move.actions[0][1][0];
      _.each(design.allDirections(), function(dir) {
          var ix = _.indexOf(dirs, dir);
          if (ix > 3) ix -= 4;
          var p = design.navigate(board.player, pos, dir);
          if (p !== null) {
              var piece = board.getPiece(p);
              if (piece !== null) {
                  var v = +piece.getValue(ix);
                  if (v) {
                      if (v > 3) r += 1000;
                      v *= NEAR_FACTOR;
                      if (piece.player == board.player) {
                          v *= FRIEND_FACTOR;
                      } else {
                          v *= ENEMY_FACTOR;
                      }
                      r += v;
                  }
              } else {
                  p = design.navigate(board.player, p, dir);
                  var piece = board.getPiece(p);
                  if (piece !== null) {
                      var v = +piece.getValue(ix);
                      if (v) {
                          if (piece.player == board.player) {
                              v *= FRIEND_FACTOR;
                          } else {
                              v *= ENEMY_FACTOR;
                          }
                          r += v;
                      }
                  }
              }
          }
      });
  }
  if (r != 0) {
      return r;
  } else {
      return -1;
  }
}

var getValue = function(board, player, pos, ix) {
  if (pos === null) return 0;
  var piece = board.getPiece(pos);
  if ((piece === null) || (piece.player != player)) return 0;
  var r = +piece.getValue(ix);
  if (r === null) return 0;
  return r;
}

var getLine = function(design, board, player, pos, dir, ix) {
  var r = 1;
  var p = design.navigate(player, pos, dir);
  r += getValue(board, player, p, ix);
  if (p === null) return 0;
  var piece = board.getPiece(p);
  while (piece !== null) {
      p = design.navigate(player, p, dir);
      if (p === null) return 0;
      piece = board.getPiece(p);
  }
  if (r >= 3) return r;
  p = design.navigate(player, p, dir);
  if (p === null) return r;
  piece = board.getPiece(p);
  if ((piece === null) || (piece.player != player)) return r;
  var vl = +piece.getValue(ix);
  if (vl === null) return r;
  return r + vl;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  for (var pos = 0; pos < design.positions.length; pos++) {
       var piece = board.getPiece(pos);
       if (piece !== null) {
           var mx = 0;
           for (var ix = 0; ix < 4; ix++) {
                var vl = +piece.getValue(ix);
                if (mx < vl) mx = vl;
           }
           if (mx >= 5) {
               if (piece.player == player) {
                   return 1;
               } else {
                   return -1;
               }
           }
       }
  }
  return checkGoals(design, board, player);
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
          _.each(move.actions, function(a) {
               if (a[2] !== null) {
                   var piece = a[2][0];
                   for (var ix = 0; ix < 4; ix++) {
                        if (+piece.getValue(ix) > 5) {
                            move.failed = true;
                        }
                   }
               }
          });
          if (_.isUndefined(move.failed)) {
              var pos = move.actions[0][1][0];
              var cnt = 0;
              _.each(design.allDirections(), function(dir) {
                  var ix = _.indexOf(dirs, dir);
                  if (ix > 3) ix -= 4;
                  if (ix < 0) move.failed = true;
                  if (getLine(design, board, board.player, pos, dir, ix) >= 3) {
                      cnt++;
                  }
              });
              if (cnt >= 2) {
                  move.failed = true;
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
