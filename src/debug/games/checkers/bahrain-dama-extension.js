(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "bahrain-dama-extension") {
     checkVersion(design, name, value);
  }
}

var checkDir = function(board, player, pos, name) {
  var design = Dagaz.Model.design;
  var dir = design.getDirection(name);
  if (dir !== null) {
      var piece = board.getPiece(pos);
      var p = design.navigate(player, pos, dir);
      if ((p === null) || (piece === null)) {
          return false;
      }
      if (piece.type > 0) {
          var isEmpty = true;
          while (board.getPiece(p) === null) {
              p = design.navigate(player, p, dir);
              if ((p === null) || (piece === null)) {
                  return false;
              }
          }
      }
      piece = board.getPiece(p);
      if ((piece !== null) && (piece.player != player)) {
          p = design.navigate(player, p, dir);
          if ((p === null) || (piece === null)) {
              return false;
          }
          if (board.getPiece(p) === null) {
              return true;
          }
      }
  }
  return false;
}

var kish = function(board) {
  var design = Dagaz.Model.design;
  var len = design.positions.length;
  for (var p = 0; p < len; p++) {
       var piece = board.getPiece(p);
       if ((piece !== null) && (piece.player != board.player)) {
           if (checkDir(board, piece.player, p, "n") ||
               checkDir(board, piece.player, p, "w") ||
               checkDir(board, piece.player, p, "e")) {
               return true;
           }
           if (piece.type > 0) {
               if (checkDir(board, piece.player, p, "s")) {
                   return true;
               }
           }
       }
  }
  return false;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  if (kish(board)) {
      for (var i in board.moves) {
          var m = board.moves[i];
          var pos = null;
          for (var j in m.actions) {
               tp = m.actions[j][1];
               if (tp === null) {
                   pos = null;
                   break;
               } else {
                   pos = tp[0];
               }
          }
          if (pos !== null) {
              var b = board.apply(m);
              var piece = b.getPiece(pos);
              if (piece !== null) {
                  if (checkDir(b, board.player, pos, "n") ||
                      checkDir(b, board.player, pos, "w") ||
                      checkDir(b, board.player, pos, "e")) {
                      m.failed = true;
                      break;
                  }
                  if (piece.type > 0) {
                      if (checkDir(b, board.player, pos, "s")) {
                          m.failed = true;
                          break;
                      }
                  }
              }
          }
      }
  }
  CheckInvariants(board);
}

})();
