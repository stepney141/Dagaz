(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "boku-extension") {
     checkVersion(design, name, value);
  }
}

var capture = function(design, board, move, pos, dir) {
  var p = design.navigate(board.player, pos, dir);
  if (p !== null) {
      move.actions.push([ [pos, p], null, null, 1]);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.chain(board.moves)
   .filter(function(move) {
       return move.actions.length > 0;
    })
   .each(function(move) {
       var pos  = move.actions[0][1][0];
       _.each(_.range(design.dirs.length), function(dir) {
           var p = design.navigate(board.player, pos, dir);
           if (p !== null) {
               var piece = board.getPiece(p);
               if ((piece !== null) && (piece.player != board.player) && (piece.getValue(dir) == 2)) {
                   move.addValue(piece.player, 1);
                   capture(design, board, move, p, dir);
               }
           }
       });
    });
  CheckInvariants(board);
}

})();
