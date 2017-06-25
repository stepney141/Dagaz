(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "platform-bomb") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var down   = design.getDirection("down");
  var up     = design.getDirection("up");
  _.each(board.moves, function(move) {
     if ((move.actions.length == 1) && (move.actions[0][0] !== null) && (move.actions[0][1] === null)) {
         var pos = move.actions[0][0][0];
         var p = design.navigate(board.player, pos, down);
         while (p !== null) {
             if ((p != pos) && (board.getPiece(p) !== null) {
                 move.capturePiece(p);
             }
             p = design.navigate(board.player, p, up);
         }
     }
  });
  CheckInvariants(board);
}

})();
