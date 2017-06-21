(function() {

var restricted = false;
var enemyGoals = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "tafl-extension") {
      if (value == "restricted") {
          restricted = true;
      }
      if (value == "goals") {
          enemyGoals = true;
      }
  } else {
      checkVersion(design, name, value);
  }
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if (piece.player != player) {
             r--;
          } else {
             r++;
          }
      }
  });
  return r;
}

var isLast = function(design, board, pos, name) {
  var dir = design.getDirection(name);
  if (dir === null) return false;
  var parent = board.parent;
  if (!parent) return false;
  var e = design.navigate(board.player, pos, dir);
  if (e === null) return false;
  return parent.lastt == e;
}

var isEnemy = function(design, board, pos, name) {
  var dir = design.getDirection(name);
  if (dir === null) return false;
  var e = design.navigate(board.player, pos, dir);
  if (e === null) return false;
  if (enemyGoals && design.inZone(1, board.player, e)) return true;
  var piece = board.getPiece(e);
  if (piece === null) return design.inZone(0, board.player, e);
  return piece.player == board.player;
}

var isThrone = function(design, board, pos, name) {
  var dir = design.getDirection(name);
  if (dir === null) return false;
  var e = design.navigate(board.player, pos, dir);
  if (e === null) return false;
  return design.inZone(0, board.player, e);
}

var captured = function(design, board, pos) {
  if (pos == board.lastt) {
      pos = board.lastf;
  }
  if (design.inZone(0, board.player, pos) ||
      isThrone(design, board, pos, "n") || isThrone(design, board, pos, "s") ||
      isThrone(design, board, pos, "w") || isThrone(design, board, pos, "e")) {
      if (isEnemy(design, board, pos, "n") && isEnemy(design, board, pos, "s") &&
          isEnemy(design, board, pos, "w") && isEnemy(design, board, pos, "e")) {
          return true;
      } else {
          return false;
      }
  }
  if (isLast(design, board, pos, "n") || isLast(design, board, pos, "s")) {
      if (isEnemy(design, board, pos, "n") && isEnemy(design, board, pos, "s")) return true;
  }
  if (isLast(design, board, pos, "w") || isLast(design, board, pos, "e")) {
      if (isEnemy(design, board, pos, "w") && isEnemy(design, board, pos, "e")) return true;
  }
  return false;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  if ((design.playerNames[player] != "Black") && board.parent) {
      var kings = _.chain(design.allPositions())
       .filter(function(pos) {
           var piece = board.getPiece(pos);
           if (piece === null) return false;
           return (piece.type == 1);
        })
       .value();
      if (kings.length == 0) return -1;
      if (captured(design, board, kings[0])) return -1;
  }
  return checkGoals(design, board, player);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.chain(board.moves)
   .filter(function(move) {
       return move.actions.length == 1;
    })
   .each(function(move) {
       var pos = move.actions[0][1][0];
       _.each(design.allDirections(), function(dir) {
           var e = design.navigate(board.player, pos, dir);
           if (e !== null) {
               var piece = board.getPiece(e);
               if ((piece !== null) && (piece.player != board.player) && (piece.type == 0)) {
                   var p = design.navigate(board.player, e, dir);
                   if (p !== null) {
                       piece = board.getPiece(p);
                       if (((piece !== null) && (piece.player == board.player)) || 
                          (design.inZone(0, board.player, p) && (piece === null))) {
                           move.capturePiece(e);
                       }
                       if (design.inZone(1, board.player, p)) {
                           move.capturePiece(e);
                       }
                   }
               }
           }
       });
       if (restricted) {
           var from = move.actions[0][0][0];
           if (!design.inZone(2, board.player, from) && design.inZone(2, board.player, pos)) {
               move.failed = true;
           }
       }
    });
  CheckInvariants(board);
}

})();
