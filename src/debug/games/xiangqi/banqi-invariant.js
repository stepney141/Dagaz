(function() {

var chinese = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "banqi-invariant") {
      if (value == "chinese") chinese = true;
  } else {
      checkVersion(design, name, value);
  }
}

var getGoals = function(design, board) {
  var r = [];
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type >= 7)) {
          r.push(pos);
      }
  });
  return {
      positions: r
  };
}

var getTargets = function(design, board, goals) {
  var r = {
      positions: []
  };
  if (!chinese) {
      r.map = [];
      _.each(goals, function(pos) {
          _.each(design.allDirections(), function(dir) {
              var p = design.navigate(board.player, pos, dir);
              while (p !== null) {
                  if (board.getPiece(p) !== null) break;
                  p = design.navigate(board.player, p, dir);
              }
              p = design.navigate(board.player, p, dir);
              while (p !== null) {
                  var piece = board.getPiece(p);
                  if ((piece === null) || (piece.type == 12)) {
                      r.positions.push(p);
                      if (_.isUndefined(r.map[p])) {
                          r.map[p] = [];
                      }
                      r.map[p].push(pos);
                  }
                  if (piece !== null) break;
                  p = design.navigate(board.player, p, dir);
              }
          });
      });
  }
  return r;
}

var copy = function(list) {
  var r = [];
  _.each(list, function(x) {
      r.push(x);
  });
  return r;
}

var getTrace = function(design, src, dst, level) {
  var r = [];
  var pos = dst;
  while (pos !== null) {
      r.unshift(pos);
      var current = level[pos];
      if (current == 0) return r;
      var next = null;
      _.each(design.allDirections(), function(dir) {
          if (next === null) {
              var p = design.navigate(board.player, pos, dir);
              while (p !== null) {
                  if (_.isUndefined(level[p])) break;
                  if (level[p] < current) {
                      next = p;
                      break;
                  }
                  if (level[p] > current) break;
                  p = design.navigate(board.player, p, dir);
              }
          }
      });
      pos = next;
  }
  return null;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  if (_.isUndefined(board.chains)) {
      board.chains = [];
      var pieces   = getGoals(design, board);
      var targets  = getTargets(design, board, pieces);
      _.each(pieces, function(pos) {
          var goals = pieces; var f = true;
          if (!chinese && (piece.type == 12)) {
              goals = targets;
              f = false;
          }
          var group  = [ pos ];
          var level  = [];
          level[pos] = 0;
          for (var i = 0; i < group.length; i++) {
              if (_.indexOf(goals.positions, group[i]) >= 0) {
                  if (!f || (group[i] != pos))   {
                      if (_.isUndefined(board.chains[pos])) {
                          board.chains[pos] = [];
                      }
                      var t = getTrace(design, pos, group[i], level);
                      if (!f) {
                          if (!_.isUndefined(goals.map[ group[i] ])) {
                              _.each(goals.map[ group[i] ], function(q) {
                                  var c = copy(t);
                                  c.push(q);
                                  board.chains[pos].push({
                                      trace: c
                                  });
                              });
                          }
                      } else {
                          board.chains[pos].push({
                              trace: t
                          });
                      }
                  }
              }
              _.each(design.allDirections(), function(dir) {
                   p = design.navigate(board.player, group[i], dir);
                   while (p !== null) {
                        if (_.indexOf(group, p) >= 0) break;
                        group.push(p);
                        level[p] = level[ group[i] ] + 1;
                        if (f || (board.getPiece(p) !== null)) break;
                        p = design.navigate(board.player, p, dir);
                   }
              });
          }
      });
  }
  // TODO: Use Chains

  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = board.game.design;
  _.each(board.moves, function(move) {
      if ((move.actions.length > 0) && (move.actions[0][0] !== null) && (move.actions[0][1] !== null) && (move.actions[0][0][0] != move.actions[0][1][0])) {
           var pos = move.actions[0][0][0];
           var piece = board.getPiece(pos);
           if (piece === null) return;
           _.each(move.actions, function(a) {
               if ((a[0] !== null) && (a[1] !== null) && (a[0][0] != a[1][0])) {
                   var target = board.getPiece(a[1][0]);
                   if (target === null) return;
                   if (target.player == piece.player) {
                       move.failed = true;
                       return;
                   }
                   if (!chinese && (piece.type == 7) && (target.type == 13)) {
                       move.failed = true;
                       return;
                   }
                   if (target.type < piece.type) {
                       if ((piece.type == 13) && (target.type == 7)) return;
                       if (!chinese && (piece.type == 12) && (target.type >= 7)) return;
                       move.failed = true;
                       return;
                   }
               }
           });
      }
  });
  CheckInvariants(board);
}

})();
