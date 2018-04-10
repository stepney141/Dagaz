(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "renju-invariant") {
     checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  for (var pos = 0; pos < design.positions.length; pos++) {
       var piece = board.getPiece(pos);
       if (piece !== null) {
           var mx = 0;
           for (var ix = 0; ix < 4; ix++) {
                var vl = piece.getValue(ix);
                if (mx < vl) mx = vl;
           }
           if (mx >= 5) {
               if (piece.player == player) {
                   return 1;
               } else {
                   return -1;
               }
           }
       }
  }
  return checkGoals(design, board, player);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (board.player == 1) {
          _.each(move.actions, function(a) {
               if (a[2] !== null) {
                   var piece = a[2][0];
                   for (var ix = 0; ix < 4; ix++) {
                        if (+piece.getValue(ix) > 5) {
                            move.failed = true;
                        }
                   }
               }
          });
      }
  });
  CheckInvariants(board);
}

})();
