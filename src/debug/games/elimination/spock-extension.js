(function() {

Dagaz.AI.AI_FRAME = 3000;
Dagaz.AI.isForced = Dagaz.AI.isChessForced;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "spock-extension") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var spock  = design.getPieceType("Spock");
  _.each(board.moves, function(m) {
      if ((m.actions.length == 1) && (m.actions[0][0] !== null) && (m.actions[0][1] !== null)) {
           var pos = m.actions[0][0][0];
           var piece = board.getPiece(pos);
           if ((piece !== null) && (piece.type == spock)) {
                var target = m.actions[0][1][0];
                var piece = board.getPiece(target);
                if (piece !== null) {
                    var type = piece.type + 1;
                    if (type >= 5) {
                        type = 0;
                    }
                    piece = Dagaz.Model.createPiece(type, board.player);
                    m.dropPiece(pos, piece);
                }
           }
      }
  });
  CheckInvariants(board);
}

})();
