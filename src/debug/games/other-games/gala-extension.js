(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gala-extension") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var horsa  = design.getPieceType("Horsa");
  var korna  = design.getPieceType("Korna");
  _.each(board.moves, function(m) {
      if ((m.actions.length == 1) && (m.actions[0][0] !== null) && (m.actions[0][1] !== null)) {
          var piece = board.getPiece(m.actions[0][0][0]);
          if ((piece !== null) && ((piece.type == horsa) || (piece.type == korna))){
                if (design.inZone(0, board.player, m.actions[0][1][0])) {
                  m.failed = true;
                }
          }
      }
  });
  CheckInvariants(board);
}

})();
