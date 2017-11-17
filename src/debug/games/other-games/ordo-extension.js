(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "ordo-extension") {
      checkVersion(design, name, value);
  }
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  if ((move.actions.length == 1) && (move.actions[0][0] !== null) && (move.actions[0][1] !== null)) {
      if (board.getPiece(move.actions[0][1][0]) !== null) return 5;
  }
  return 1;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  for (var pos = 0; pos < design.positions.length; pos++) {
       var piece = board.getPiece(pos);
       if ((piece !== null) && design.inZone(0, piece.player, pos)) {
           if (piece.player == player) {
               return 1;
           } else {
               return -1;
           }
       }
  }
  return checkGoals(design, board, player);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(m) {
      if ((m.actions.length > 0) && (m.actions[0][0] !== null) && (m.actions[0][1] !== null)) {
          var b = board.apply(m);
          var g = [ m.actions[0][1][0] ];
          expand(design, board, g);
          for (var pos = 0; pos < design.positions.length; pos++) {
               var piece = b.getPiece(pos);
               if ((piece !== null) && (piece.player == board.player) && (_.indexOf(g, pos) < 0)) {
                   m.failed = false;
                   break;
               }
          }
      }
  });
  CheckInvariants(board);
}

})();
