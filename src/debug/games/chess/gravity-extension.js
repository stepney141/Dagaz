(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gravity-extension") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var pos = move.actions[0][0][0];
      var p = design.navigate(board.player, pos, 3);
      if (p == move.actions[0][1][0]) return;
      while (p !== null) {
          var piece = board.getPiece(p);
          if (p == move.actions[0][1][0]) {
              piece = board.getPiece(pos);
          }
          if (piece === null) break;
          move.movePiece(p, pos, piece, 2);
          pos = p;
          p = design.navigate(board.player, pos, 3);
      }
  });
  CheckInvariants(board);
}

})();
