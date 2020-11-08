(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "sittuyin-setup") {
      checkVersion(design, name, value);
  }
}

var setup = function(design, board, player, zone, type) {
  var positions = _.filter(design.allPositions(), function(pos) {
      return design.inZone(zone, player, pos) && (board.getPiece(pos) === null);
  });
  var ix = _.random(0, positions.length - 1);
  board.setPiece(positions[ix], Dagaz.Model.createPiece(type, player));
}

Dagaz.Model.setup = function(board) {
  var design = Dagaz.Model.design;
  setup(design, board, 1, 2, 0); 
  setup(design, board, 2, 2, 0); 
  setup(design, board, 1, 2, 1); 
  setup(design, board, 2, 2, 1); 
  setup(design, board, 1, 1, 2); 
  setup(design, board, 1, 1, 2); 
  setup(design, board, 2, 1, 2); 
  setup(design, board, 2, 1, 2); 
  setup(design, board, 1, 2, 3); 
  setup(design, board, 1, 2, 3); 
  setup(design, board, 2, 2, 3); 
  setup(design, board, 2, 2, 3); 
  setup(design, board, 1, 2, 4); 
  setup(design, board, 1, 2, 4); 
  setup(design, board, 2, 2, 4); 
  setup(design, board, 2, 2, 4); 
}

})();
