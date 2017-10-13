(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gwangsanghui-invariant") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var c  = design.getPieceType("Cannon");
  var ec = design.getPieceType("EastCannon");
  var wc = design.getPieceType("WestCannon");
  if (board.parent === null) {
      _.each(board.moves, function(m) {
          if ((m.actions.length == 1) && (m.actions[0][0] !== null)) {
               var pos   = m.actions[0][0];
               var piece = board.getPiece(pos);
               if ((piece !== null) && ((piece.type == c) || (piece.type == ec) || (piece.type == wc))) {
                   m.failed = true;
               }
          }
      });
  }
  CheckInvariants(board);
}

})();
