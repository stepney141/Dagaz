(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "rook-chain-goal") {
     checkVersion(design, name, value);
  }
}

var getGroups = function(design, board) {
  var r = [];
  _.each(design.allPositions(), function(pos) {
     var piece = board.getPiece(pos);
     if (piece !== null) {
         for (var i = 0; i < r.length; i++) {
              if (_.indexOf(r[i].positions, pos) >= 0) return;
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
         r.push(x);
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
