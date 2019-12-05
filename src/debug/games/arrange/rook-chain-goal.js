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
