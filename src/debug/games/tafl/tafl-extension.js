(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "tafl-extension") {
     checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  if (player == 1) {
      var kings = _.chain(design.allPositions())
       .filter(function(pos) {
           var piece = board.getPiece(pos);
           if (piece === null) return false;
           return (piece.type == 1);
        })
       .value();
      if (kings.length == 0) return 1;
  }
  return checkGoals(design, board, player);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.chain(board.moves)
   .filter(function(move) {
       return move.actions.length == 1;
    })
   .each(function(move) {
       var pos = move.actions[0][1][0];
       _.each(design.allDirections(), function(dir) {
           var e = design.navigate(board.player, pos, dir);
           if (e !== null) {
               var piece = board.getPiece(e);
               if ((piece !== null) && (piece.player != board.player)) {
                   var p = design.navigate(board.player, e, dir);
                   if (p !== null) {
                       piece = board.getPiece(p);
                       if (((piece !== null) && (piece.player == board.player)) || 
                          (design.inZone(0, board.player, p) && (piece === null))) {
                           move.capturePiece(e);
                       }
                   }
               }
           }
       });
    });
  CheckInvariants(board);
}

})();
