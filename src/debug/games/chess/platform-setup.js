(function() {

var checkVersion = Dagaz.Model.checkVersion;
var percent = 15;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "platform-setup") {
      percent = +value;
  } else {
      checkVersion(design, name, value);
  }
}

Dagaz.Model.setup = function(board) {
  var design = Dagaz.Model.design;
  var pawn   = design.getPieceType("Pawn");
  var bomb   = design.getPieceType("Bomb");
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == pawn) && (_.random(0, 100) < percent)) {
          piece = piece.promote(bomb);
          board.setPiece(pos, piece);
      }
  });
}

})();
