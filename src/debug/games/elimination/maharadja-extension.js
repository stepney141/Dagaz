(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "maharadja-extension") {
     checkVersion(design, name, value);
  }
}

Dagaz.Model.checkGoals = function(design, board, player) {
  var design = Dagaz.Model.design;
  var king = design.getPieceType("King");
  if (king !== null) {
      if (_.chain(design.allPositions())
           .filter(function(pos) {
               var piece = board.getPiece(pos);
               if (piece === null) return false;
               return piece.type == king;
            })
           .size().value() == 0) return 1;
  }
  return 0;
}

})();
