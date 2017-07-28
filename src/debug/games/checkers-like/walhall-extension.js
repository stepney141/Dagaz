(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "walhall-extension") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.chain(board.moves)
   .filter(function(move) {
        if (move.actions.length != 1) return false;
        return (move.actions[0][0] !== null) && (move.actions[0][1] !== null);
    })
   .each(function(move) {
        var from  = move.actions[0][0][0];
        var to    = move.actions[0][1][0];
        var dir   = design.findDirection(from, to);
        var piece = board.getPiece(from);
        if ((dir !== null) && (piece !== null) && (piece.type <= 2)) {
             var pos = design.navigate(0, from, dir);
             while (pos !== null) {
                 var p = board.getPiece(pos);
                 if ((p === null) || (p.player == piece.player)) break;
                 move.capturePiece(pos);
                 pos = design.navigate(0, pos, dir);
             }
             pos = design.navigate(board.player, to, dir);
             while (pos !== null) {
                 var p = board.getPiece(pos);
                 if ((p === null) || (p.player == piece.player)) break;
                 move.capturePiece(pos);
                 pos = design.navigate(board.player, pos, dir);
             }
        }
    });
  CheckInvariants(board);
}

})();
