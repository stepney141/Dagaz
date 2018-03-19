(function() {

var checkVersion = Dagaz.Model.checkVersion;
var cnt = 0;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "mancala-setup") {
      cnt = +value;
  } else {
      checkVersion(design, name, value);
  }
}

Dagaz.Model.setup = function(board) {
  var design = Dagaz.Model.design;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == 0)) {
          piece = piece.setValue(0, cnt);
          board.setPiece(pos, piece);
      }
  });
}

})();
