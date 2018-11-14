(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "traverse-setup") {
      checkVersion(design, name, value);
  }
}

var getAvail = function(design, player) {
  var r = [];
  _.each(design.allPositions(), function(pos) {
      if (design.inZone(1, player, pos)) {
          r.push(pos);
      }
  });
  return r;
}

var addPiece = function(board, type, player, avail) {
  var ix = 0;
  if (avail.length > 1) {
      ix = _.random(0, avail.length - 1);
  }
  board.setPiece(avail[ix], Dagaz.Model.createPiece(type, player));
  return _.without(avail, avail[ix]);
}

Dagaz.Model.setup = function(board) {
  var design = Dagaz.Model.design;
  for (var player = 2; player <= 4; player++) {
       var avail = getAvail(design, player);
       avail = addPiece(board, 0, player, avail); avail = addPiece(board, 0, player, avail);
       avail = addPiece(board, 1, player, avail); avail = addPiece(board, 1, player, avail);
       avail = addPiece(board, 2, player, avail); avail = addPiece(board, 2, player, avail);
       avail = addPiece(board, 3, player, avail); avail = addPiece(board, 3, player, avail);
  }
}

})();
