(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "rook-chain-goal") {
     checkVersion(design, name, value);
  }
}

var getGroups = function(design, board) {
  if (_.isUndefined(board.groups)) {
  board.groups = [];
  _.each(design.allPositions(), function(pos) {
     var piece = board.getPiece(pos);
     if (piece !== null) {
         for (var i = 0; i < board.groups.length; i++) {
              if (_.indexOf(board.groups[i].positions, pos) >= 0) return;
         }
         var x = {
              player: piece.player,
              positions: [pos],
              ends: [],
              bads: []
         };
         for (var i = 0; i < x.positions.length; i++) {
              var cnt = 0;
              _.each(design.allDirections(), function(dir) {
                  var p = design.navigate(x.player, x.positions[i], dir);
                  if (p !== null) {
                       var piece = board.getPiece(p);
                       if ((piece === null) || (piece.player != x.player)) return;
                       if (_.indexOf(x.positions, p) < 0) {
                           x.positions.push(p);
                       }
                       cnt++;
                  }
              });
              if (cnt > 2) x.bads.push(x.positions[i]);
              if (cnt < 2) x.ends.push(x.positions[i]);
         }
         board.groups.push(x);
     }
  });
  }
  return board.groups;
}

var backTrace = function(design, pos, level) {
  while (_.isUndefined(level[pos]) || (level[pos] > 0)) {
      var mn = null; var r = null;
      _.each(design.allDirections(), function(dir) {
           var p = design.navigate(1, pos, dir);
           if ((p === null) || _.isUndefined(level[p])) return;
           var l = level[p];
           if (!_.isUndefined(level[pos]) && (l >= level[pos])) return;
           if ((mn === null) || (l < mn)) {
                mn = l;
                r = p;
           }
      });
      if (r === null) return null;
      pos = r;
  }
  return pos;
}

var getEval = function(design, board, player) {
  var groups = _.filter(getGroups(design, board), function(g) {
      return (g.player == player) && (g.bads.length == 0) && (g.ends.length <= 2) && (g.ends.length > 0);
  });
  if (groups.length == 0) return 0;
  var r = 0;
  var node = groups.pop();
  while (groups.length > 0) {
      var g = []; var level = [];
      _.each(node.ends, function(p) {
          g.push(p);
          level[p] = 0;
      });
      for (var i = 0; i < g.length; i++) {
           var f = false;
           _.each(design.allDirections(), function(dir) {
                var p = design.navigate(player, g[i], dir);
                if ((p === null) || (_.indexOf(g, p) < 0)) return;
                var piece = board.getPiece(p);
                if ((piece !== null) && (piece.player == player)) {
                    var l = [];
                    for (var j = 0; j < groups.length; j++) {
                        if (!f) {
                            var ix = _.indexOf(groups[j].ends, p);
                            if (ix >= 0) {
                                r += level[g[i]] + 1;
                                if (node.ends.length > 1) {
                                    var q = backTrace(design, p, level);
                                    if (q !== null) {
                                        node.ends = _.without(node.ends, q);
                                    }
                                }
                                node.ends.push(p);
                                f = true;
                            }
                        }
                        l.push(groups[j]);
                    }
                    if (f) groups = l;
                    return;
                }
                g.push(p);
                level[p] = level[g[i]] + 1;
           });
           if (f) break;
      }
  }
  return 1000 - r;
}

Dagaz.AI.eval = function(ai, design, board, player) {
  return getEval(design, board, player) -
         getEval(design, board, design.nextPlayer(player));
}

var getArity = function(design, board, player, pos) {
  var r = 0;
  _.each(design.allDirections(), function(dir) {
      var p = design.navigate(player, pos, dir);
      if (p === null) return;
      var piece = board.getPiece(p);
      if (piece === null) return;
      if (piece.player != player) return;
      r++;
  });
  return r;
}

var getStat = function(design, board) {
  if (_.isUndefined(board.stat)) {
      board.stat = {
         one: [], two: [], cnt: 0
      };
      _.each(design.allPositions(), function(pos) {
          var n = getArity(design, board, board.player, pos);
          var piece = board.getPiece(pos);
          if (piece !== null) {
              if ((piece.player == board.player) && (n == 1)) board.stat.cnt++;
              return;
          }
          if (n == 1) board.stat.one.push(pos);
          if (n == 2) board.stat.two.push(pos);
     });
  }
  return board.stat;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var s = getStat(design, board);
  var pos = move.actions[0][1][0];
  var ix = _.indexOf(s.two, pos);
  if ((s.cnt <= 2) && (ix >= 0)) return -1;
  if ((ix < 0) && (_.indexOf(s.one, pos) < 0)) return 0;
  var r = 100;
  _.each(design.allDirections(), function(dir) {
      var p = design.navigate(board.player, pos, dir);
      while (p !== null) {
          var piece = board.getPiece(p);
          if (piece !== null) {
              if (piece.player == board.player) break;
              r -= 10;
          }
          p = design.navigate(board.player, p, dir);
      }
  });
  return r;
}

var checkGroups = function(groups, player) {
  var cnt = 0;
  for (var i = 0; i < groups.length; i++) {
       var x = groups[i];
       if (x.player == player) {
           if (x.bads.length > 0) return false;
           if (x.ends.length < 1) return false;
           if (x.ends.length > 2) return false;
           cnt++;
       }
  }
  return cnt == 1;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var groups = getGroups(design, board);
  if (checkGroups(groups, board.player)) {
      if (player == board.player) {
          return 1;
      } else {
          return -1;
      }
  }
  if (checkGroups(groups, design.nextPlayer(board.player))) {
      if (player == board.player) {
          return -1;
      } else {
          return 1;
      }
  }
  return checkGoals(design, board, player);
}

})();
