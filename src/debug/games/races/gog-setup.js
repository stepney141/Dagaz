(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gog-setup") {
      checkVersion(design, name, value);
  }
}

var setup = function(design, board, type, positions) {
  if (positions.length == 0) return [];
  if (positions.length > 1) {
      var ix = _.random(0, positions.length - 1);
      board.setPiece(positions[ix], Dagaz.Model.createPiece(type, 2));
      return _.without(positions, positions[ix]);
  } else {
      board.setPiece(positions[0], Dagaz.Model.createPiece(type, 2));
      return [];
  }
}

Dagaz.Model.setup = function(board) {
  var design = Dagaz.Model.design;
  var positions = _.filter(design.allPositions(), function(pos) {
      return design.inZone(0, 2, pos);
  });
  for (var t = 0; t <= 14; t++) {
       var c = 1;
       if (t == 13) c = 2;
       if (t == 12) c = 6;
       for (var i = 0; i < c; i++) {
            positions = setup(design, board, t, positions);
       }
  }
}

})();
