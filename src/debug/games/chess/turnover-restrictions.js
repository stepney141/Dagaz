(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "turnover-restrictions") {
     checkVersion(design, name, value);
  }
}

var notEmpty = function(design, board, pos) {
  if (pos === null) return true;
  while (pos !== null) {
      if (board.getPiece(pos) !== null) return true;
      pos = design.navigate(board.player, pos, 8);
  }
  return false;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!move.isSimpleMove()) return;
      if ((move.mode == 0) || (move.mode == 4) || (move.mode == 5)) {
          var pos = design.navigate(board.player, move.actions[0][0][0], 8);
          if (pos !== null) {
              if (board.getPiece(pos) === null) {
                  if (move.mode == 5) {
                      move.failed = true;
                      return;
                  }
              } else {
                  pos = design.navigate(board.player, pos, 8);
                  if ((pos !== null) && (board.getPiece(pos) === null)) {
                       move.failed = true;
                       return;
                  }
              }
          }
      }
      if ((move.mode == 0) || (move.mode == 5)) {
          var pos = design.navigate(board.player, move.actions[0][0][0], 0);
          if (notEmpty(design, board, pos)) {
              move.failed = true;
              return;
          }
          if (pos == move.actions[0][1][0]) return;
          pos = design.navigate(board.player, pos, 0);
          if (notEmpty(design, board, pos)) {
              move.failed = true;
              return;
          }
      }
      if (move.mode == 4) {
          var pos = move.actions[0][1][0];
          if (!notEmpty(design, board, pos)) {
              move.failed = true;
              return;
          }
      }
      if ((move.mode == 1) || (move.mode == 3)) {
          var pos = design.navigate(board.player, move.actions[0][0][0], 8);
          if (pos !== null) {
              if (board.getPiece(pos) === null) {
                   move.failed = true;
                   return;
              }
              pos = design.navigate(board.player, pos, 8);
              if ((pos !== null) && (board.getPiece(pos) !== null)) {
                   move.failed = true;
                   return;
              }
          }
      }
      var pos = design.navigate(board.player, move.actions[0][0][0], 9);
      if ((pos !== null) && (board.getPiece(pos) !== null)) {
           move.failed = true;
      }
  });
  CheckInvariants(board);
}

})();
