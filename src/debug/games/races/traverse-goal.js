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

var findSolution = function(data, stack, value) {
  var level = stack.length;
  if (level >= data.item.length) {
      if (_.isUndefined(data.best) || (value < data.best)) {
          data.best = value;
          data.tags = [];
          for (var i = 0; i < stack.length; i++) {
               data.tags.push(data.item[i].goal[ stack[i] ].tag);
          }
      }
  } else {
      for (var i = 0; i < data.item[level].goal.length; i++) {
           var pos = data.item[level].goal[i].pos;
           if (_.indexOf(stack, pos) < 0) {
               stack.push(pos);
               findSolution(data, stack, value + data.item[level].goal[i].value);
               stack.pop();
           }
      }
  }
}

var getItem = function(data, pos) {
  var ix = _.indexOf(data.list, pos);
  if (ix < 0) {
      ix = data.list.length;
      data.list.push(pos);
      data.item[ix] = {
           pos: pos,
           goal: []
      }
  }
  return data.item[ix];
}

var getData = function(design, board, player) {
  if (_.isUndefined(board.data)) {
      board.data = {
          item: [],
          list: []
      };
      var tag = 0;
      var targets = getTargets(design, board, player);
      _.each(board.moves, function(move) {
           move.tag = tag;
           var m = getMove(move);
           if (m !== null) {
               var level = [];
               level[ m.end ] = 0;
               var piece = board.getPiece(m.start);
               var dirs  = getDirs(design, piece.type);
               var group = [ m.start, m.end ];
               for (var i = 1; i < group.length; i++) {
                   _.each(dirs, function(dir) {
                       var pos = design.navigate(player, group[i], dir);
                       if ((pos !== null) && (_.indexOf(group, pos) < 0)) {
                           if (_.indexOf(targets, pos) >= 0) {
                               var item = getItem(board.data, m.start);
                               var v = level[ group[i] ];
                               item.goal.push({
                                   tag: move.tag,
                                   pos: pos,
                                   value: v
                               });
                               if (_.isUndefined(item.value) || (item.value > v)) {
                                   item.value = v;
                               }
                           }
                           if (board.getPiece(pos) !== null) {
                               pos = design.navigate(player, pos, dir);
                               if ((pos !== null) && (_.indexOf(group, pos) < 0)) {
                                   if (_.indexOf(targets, pos) >= 0) {
                                       var item = getItem(board.data, m.start);
                                       var v = level[ group[i] ];
                                       item.goal.push({
                                           tag: move.tag,
                                           pos: pos,
                                           value: v
                                       });
                                       if (_.isUndefined(item.value) || (item.value > v)) {
                                           item.value = v;
                                       }
                                   }
                               }
                           }
                           if (board.getPiece(pos) === null) {
                               group.push(pos);
                               level[pos] = level[ group[i] ] + 1;
                           }
                       }
                   });
               }
           }
           tag++;
      });
      board.data.item = _.sortBy(board.data.item, function(item) {
           var r = 0;
           if (design.inZone(0, player, item.pos)) {
               r += 1000;
           }
           r += item.value;
           return r;
      });
      findSolution(board.data, [], 0);
  }
  return board.data;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  if (move.isDropMove()) return -1;
  var data = getData(design, board, board.player);
  if (data !== null) {
      if (!_.isUndefined(data.tags) && (_.indexOf(data.tags, move.tag) >= 0)) {
          r = 100 + move.actions.length;
      }
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
