(function() {

var checkVersion = Model.Game.checkVersion;

Model.Game.checkVersion = function(design, name, value) {
  if (name != "pente-extension") {
     checkVersion(design, name, value);
  }
}

var capture = function(design, board, move, pos, dir) {
  var p = design.navigate(board.player, pos, dir);
  if (p !== null) {
      move.capturePiece(pos);
      move.capturePiece(p);
  }
}

var CheckInvariants = Model.Game.CheckInvariants;

Model.Game.CheckInvariants = function(board) {
  var design = Model.Game.design;
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
                   // TODO: Increment capturing count

                   capture(design, board, move, p, dir);
               }
           }
       });
    });
  CheckInvariants(board);
}

})();
