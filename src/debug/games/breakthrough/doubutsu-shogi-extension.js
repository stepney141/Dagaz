(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "doubutsu-shogi-extension") {
      checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var kings = _.chain(design.allPositions())
   .filter(function(pos) {
       var piece = board.getPiece(pos);
       if (piece === null) return false;
       return (piece.type == 0) && (piece.player != player);
    })
   .value();
  if (kings.length == 0) {
      return 1;
  } else {
      return checkGoals(design, board, player);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.chain(board.moves)
   .filter(function(move) {
      return move.actions.length == 1;
    })
   .each(function(move) {
      var fp = move.actions[0][0][0];
      var tp = move.actions[0][1][0];
      var piece = board.getPiece(fp);
      if ((piece !== null) && design.inZone(1, board.player, tp)) {
          if (piece.type == 0) {
              var b = board.apply(move);
              b.generateInternal(b, false);
              _.chain(b.moves)
               .map(function(m) {
                    return m.actions[0][1][0];
                })
               .filter(function(pos) {
                    return pos == tp;
                })
               .each(function(pos) {
                    move.failed = true;
                });
          }
          if (piece.type == 1) {
              if (!design.inZone(0, board.player, fp)) {
                  move.failed = true;
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
