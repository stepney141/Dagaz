(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "traverse-goal") {
     checkVersion(design, name, value);
  }
}

if (!_.isUndefined(Dagaz.Controller.addSound)) {
    Dagaz.Controller.addSound(0, "../../sounds/slide.ogg", true);
}

var getTargets = function(design, board, player) {
  if (_.isUndefined(board.targets)) {
      board.targets = [];
      _.each(design.allPositions(), function(pos) {
           if (design.inZone(0, player, pos)) {
               board.targets.push(pos);
           }
      });
  }
  return board.targets;
}

var getMove = function(move) {
  var r = null;
  for (var i = 0; i < move.actions.length; i++) {
      if ((move.actions[i][0] !== null) && (move.actions[i][1] !== null)) {
          if (r === null) {
              r = {
                  start: move.actions[i][0][0]
              };
          }
          r.end = move.actions[i][1][0];
      }
  }
  return r;
}

var getDirs = function(design, type) {
  if (type == 0) {
      return [5, 6, 1];
  }
  if (type == 1) {
      return [7, 3, 4, 1];
  }
  if (type == 2) {
      return [5, 6, 0, 2];
  }
  return design.allDirections();
}

var getChains = function(design, board, player) {
  var targets = getTargets(design, board, player);
  if (_.isUndefined(board.chains)) {
      board.chains = [];
      board.goals  = [];
      _.each(board.moves, function(move) {
           var m = getMove(move);
           if (m !== null) {
               var piece = board.getPiece(m.start);
               var dirs  = getDirs(design, piece.type);
               var group = [ m.end ];
               var level = [];
               level[ m.end ] = 0;
               if (_.isUndefined(board.goals[m.start])) {
                   board.goals[m.start] = [];
               }
               for (var i = 0; i < group.length; i++) {
                   _.each(dirs, function(dir) {
                       var pos = design.navigate(player, group[i], dir);
                       if ((pos !== null) && (_.indexOf(group, pos) < 0)) {
                           if (_.indexOf(targets, pos) >= 0) {
                               board.chains.push({
                                  move:  move,
                                  start: m.start,
                                  stop:  pos,
                                  level: level[ group[i] ],
                                  lowp:  design.inZone(0, player, m.start)
                               });
                               if (_.indexOf(board.goals[m.start], pos) < 0) {
                                  board.goals[m.start].push(pos);
                               }
                           }
                           if (board.getPiece(pos) !== null) {
                               pos = design.navigate(player, pos, dir);
                               if ((pos !== null) && (_.indexOf(group, pos) < 0)) {
                                   if (_.indexOf(targets, pos) >= 0) {
                                       board.chains.push({
                                           move:  move,
                                           start: m.start,
                                           stop:  pos,
                                           level: level[ group[i] ],
                                           lowp:  design.inZone(0, player, m.start)
                                       });
                                       if (_.indexOf(board.goals[m.start], pos) < 0) {
                                           board.goals[m.start].push(pos);
                                       }
                                   }
                                   if (board.getPiece(pos) === null) {
                                       group.push(pos);
                                       level[pos] = level[ group[i] ] + 1;
                                   }
                               }
                           } else {
                               group.push(pos);
                               level[pos] = level[ group[i] ] + 1;
                           }
                       }
                   });
               }
           }
      });
  }
  return board.chains;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  var m = getMove(move);
  if (m !== null) {
      var chains = getChains(design, board, board.player);
      // TODO:

  }
  return r;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var m = 2;
  var c = [0, 0, 0, 0];
  var p = [0, 0, 0, 0];
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if (!design.inZone(0, piece.player, pos)) {
              c[piece.player - 1]++;
          } else {
              p[piece.player - 1]++;
          }
          if (piece.player > m) {
              m = piece.player;
          }
      }
  });
  for (var i = 0; i < m; i++) {
      if ((c[i] == 0) && (p[i] != 0)) {
          if (i + 1 == player) {
              return 1;
          } else {
              return -1;
          }
      }
  }
  return checkGoals(design, board, player);
}

})();
