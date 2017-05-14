(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "doubutsu-shogi-extension") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var fp = move.actions[0][0][0];
      var tp = move.actions[0][1][0];
      var piece = board.getPiece(fp);
      if (piece !== null) {
          if (piece.type == 0) {
              var b = board.apply(move);
              b.generate(design);
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
              if (!design.inZone(0, board.player, fp) && design.inZone(1, board.player, tp)) {
                  move.failed = true;
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
