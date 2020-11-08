(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "bolotoudou-goal") {
     checkVersion(design, name, value);
  }
}

var getEnemyPositions = function(design, board) {
  if (_.isUndefined(board.enemyPositions)) {
      var n = design.getDirection("n"); var w = design.getDirection("w");
      var s = design.getDirection("s"); var e = design.getDirection("e");
      board.enemyPositions = [];
      _.each(design.allPositions(), function(pos) {
          if (board.getPiece(pos) === null) {
              var player = design.nextPlayer(board.player);
              if (Dagaz.Model.isLine(design,   board, player, pos, n) ||
                  Dagaz.Model.isLine(design,   board, player, pos, w) ||
                  Dagaz.Model.isLine(design,   board, player, pos, s) ||
                  Dagaz.Model.isLine(design,   board, player, pos, e) ||
                  Dagaz.Model.isMiddle(design, board, player, pos, n) ||
                  Dagaz.Model.isMiddle(design, board, player, pos, w)) {
                  board.enemyPositions.push(pos);
              }
          }
      });
  }
  return board.enemyPositions;
}

var getFriendPositions = function(design, board) {
  if (_.isUndefined(board.friendPositions)) {
      var n = design.getDirection("n"); var w = design.getDirection("w");
      var s = design.getDirection("s"); var e = design.getDirection("e");
      board.friendPositions = [];
      _.each(design.allPositions(), function(pos) {
          if (board.getPiece(pos) === null) {
              var player = board.player;
              if (Dagaz.Model.isLine(design,   board, player, pos, n) ||
                  Dagaz.Model.isLine(design,   board, player, pos, w) ||
                  Dagaz.Model.isLine(design,   board, player, pos, s) ||
                  Dagaz.Model.isLine(design,   board, player, pos, e) ||
                  Dagaz.Model.isMiddle(design, board, player, pos, n) ||
                  Dagaz.Model.isMiddle(design, board, player, pos, w)) {
                  board.friendPositions.push(pos);
              }
          }
      });
  }
  return board.friendPositions;
}

var getDistance = function(design, board, empty) {
  if (_.isUndefined(board.friendDistance)) {
      board.friendDistance = [];
      var positions = [];
      _.each(getFriendPositions(design, board), function(pos) {
          positions.push(pos);
          board.friendDistance[pos] = 0;
      });
      for (var i = 0; i < positions.length; i++) {
          var pos = positions[i];
          _.each(design.allDirections(), function(dir) {
              var p = design.navigate(board.player, pos, dir);
              if ((p !== null) && (_.indexOf(positions, p) < 0)) {
                  if ((p == empty) || (board.getPiece(p) === null)) {
                      board.friendDistance[p] = board.friendDistance[pos] + 1;
                      positions.push(p);
                  }
              }
          });
      }
  }
  return board.friendDistance;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  var n = design.getDirection("n"); var w = design.getDirection("w");
  var s = design.getDirection("s"); var e = design.getDirection("e");
  if (move.isPass()) return r;
  if (move.isDropMove()) {
      var pos = move.actions[0][1][0];
      if (_.indexOf(getEnemyPositions(design, board), pos) >= 0) r += 10;
      _.each(design.allDirections(), function(dir) {
          var p = design.navigate(board.player, pos, dir);
          if (p !== null) {
              var piece = board.getPiece(p);
              if ((piece !== null) && (piece.player == board.player)) {
                  r += 50;
              }
              if (_.indexOf(getFriendPositions(design, board), p) >= 0) {
                  if (_.indexOf(getEnemyPositions(design, board), p) >= 0) {
                      r += 1000;
                  } else {
                      r += 100;
                  }
              }
          }
      });
  } else {
      if (move.isSimpleMove()) {
          var empty = move.actions[0][0][0];
          var pos   = move.actions[0][1][0];
          var dist  = getDistance(design, board, empty)[pos];
          if (dist !== null) {
              return 100 - dist;
          }
          _.each(design.allDirections(), function(dir) {
              var p = design.navigate(board.player, pos, dir);
              if ((p !== null) && (p != empty)) {
                  var piece = board.getPiece(p);
                  if ((piece !== null) && (piece.player == board.player)) {
                      r += 10;
                  }
              }
          });
      } else {
          var pos = move.actions[0][0][0];
          _.each(design.allDirections(), function(dir) {
              var p = design.navigate(board.player, pos, dir);
              if ((p !== null) && (_.indexOf(getEnemyPositions(design, board), p) >= 0)) {
                  r += 100;
              }
              var piece = board.getPiece(p);
              if ((piece !== null) && (piece.player != board.player)) {
                  r += 10;
              }
          });
      }
  }
  return r;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var enemies = 0;
  var friends = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if (piece.player != player) {
              enemies++;
          } else {
              friends++;
          }
      }
  });
  if ((enemies < 3) && (board.reserve[0][design.nextPlayer(player)] == 0)) {
      return 1;
  }
  if ((friends < 3) && (board.reserve[0][player] == 0)) {
      return -1;
  }
  return checkGoals(design, board, player);
}

})();
