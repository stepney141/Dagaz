(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "renju-restrictions") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var cnt = _.chain(board.pieces).compact().size().value();
  if (cnt < 3) {
      _.chain(board.moves)
       .filter(function(move) {
           return move.actions.length > 0;
        })
       .each(function(move) {
           var pos = move.actions[0][1][0];
           if (!design.inZone(cnt, board.player, pos)) {
               move.failed = true;
           }
        });
  } else {
      if (board.player == 1) {
      _.chain(board.moves)
       .filter(function(move) {
           return move.actions.length > 0;
        })
       .each(function(move) {
           var b = board.apply(move);
           var p = move.actions[0][1][0];
           var piece = b.getPiece(p);
           if (piece !== null) {
               var cnt = 0;
               _.each(_.range(design.dirs.length), function(dir) {
                   value = piece.getValue(dir);
                   if ((value >= 3) && (value <= 4)) cnt++;
                   if (value > 5) move.failed = true;
               });
               if (cnt > 1) {
                   move.failed = true;
               }
           }
        });
      }
  }
  CheckInvariants(board);
}

})();
