(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "taacoca-goal") {
     checkVersion(design, name, value);
  }
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  _.each(move.actions, function(a) {
      var piece = board.getPiece(a[1][0]);
      if ((piece !== null) && (piece.player != board.player)) r++;
  });
  return r;
}

var calcDistance = function(design, board, player, distance) {
  distance[player] = [];
  var group = [];
  _.each(design.allPositions(), function(pos) {
      if (design.inZone(0, player, pos)) {
          distance[player][pos] = 0;
          group.push(pos);
      }
  });
  for (var i = 0; i < group.length; i++) {
       var d = distance[player][group[i]];
       _.each(design.allDirections(), function(dir) {
            var p = design.navigate(player, group[i], dir);
            if ((p !== null) && (_.indexOf(group, p) < 0)) {
                 distance[player][p] = d + 1;
                 var piece = board.getPiece(p);
                 if ((piece === null) || (piece.player != player)) {
                     group.push(p);
                 }
            }
       });
  }
}

var getDistance = function(design, board) {
  var r = [];
  calcDistance(design, board, 1, r);
  calcDistance(design, board, 2, r);
  return r;
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  var distance = getDistance(design, board);
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var v = 10;
          if (!_.isUndefined(distance[piece.player][pos])) {
              v -= distance[piece.player][pos];
          }
          v *= 10;
          if (piece.player != player) {
              v = -v;
          }
          r += v;
      }
  });
  return r;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var winner  = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if (design.inZone(0, piece.player, pos)) {
              winner = piece.player;
          }
      }
  });
  if (winner > 0) {
      if (player == winner) {
          return 1;
      } else {
          return -1;
      }
  }
  return checkGoals(design, board, player);
}

})();
