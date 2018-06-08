(function() {

var chinese = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "banqi-invariant") {
      if (value == "chinese") chinese = true;
  } else {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = board.game.design;
  _.each(board.moves, function(move) {
      if ((move.actions.length > 0) && (move.actions[0][0] !== null) && (move.actions[0][1] !== null) && (move.actions[0][0][0] != move.actions[0][1][0])) {
           var pos = move.actions[0][0][0];
           var piece = board.getPiece(pos);
           if (piece === null) return;
           _.each(move.actions, function(a) {
               if ((a[0] !== null) && (a[1] !== null) && (a[0][0] != a[1][0])) {
                   var target = board.getPiece(a[1][0]);
                   if (target === null) return;
                   if (target.player == piece.player) {
                       move.failed = true;
                       return;
                   }
                   if (!chinese && (piece.type == 7) && (target.type == 13)) {
                       move.failed = true;
                       return;
                   }
                   if (target.type < piece.type) {
                       if ((piece.type == 13) && (target.type == 7)) return;
                       if (!chinese && (piece.type == 12) && (target.type >= 7)) return;
                       move.failed = true;
                       return;
                   }
               }
           });
      }
  });
  CheckInvariants(board);
}

})();
