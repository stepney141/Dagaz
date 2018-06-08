(function() {

var large = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "banqi-setup") {
      if (value == "large") large = true;
  } else {
      checkVersion(design, name, value);
  }
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
  var avail  = design.allPositions();
  avail = addPiece(board, 0, 1, avail); if (large) avail = addPiece(board, 0, 1, avail);
  avail = addPiece(board, 0, 2, avail); if (large) avail = addPiece(board, 0, 2, avail);
  avail = addPiece(board, 1, 1, avail); if (large) avail = addPiece(board, 1, 1, avail);
  avail = addPiece(board, 1, 2, avail); if (large) avail = addPiece(board, 1, 2, avail);
  avail = addPiece(board, 1, 1, avail); if (large) avail = addPiece(board, 1, 1, avail);
  avail = addPiece(board, 1, 2, avail); if (large) avail = addPiece(board, 1, 2, avail);
  avail = addPiece(board, 2, 1, avail); if (large) avail = addPiece(board, 2, 1, avail);
  avail = addPiece(board, 2, 2, avail); if (large) avail = addPiece(board, 2, 2, avail);
  avail = addPiece(board, 2, 1, avail); if (large) avail = addPiece(board, 2, 1, avail);
  avail = addPiece(board, 2, 2, avail); if (large) avail = addPiece(board, 2, 2, avail);
  avail = addPiece(board, 3, 1, avail); if (large) avail = addPiece(board, 3, 1, avail);
  avail = addPiece(board, 3, 2, avail); if (large) avail = addPiece(board, 3, 2, avail);
  avail = addPiece(board, 3, 1, avail); if (large) avail = addPiece(board, 3, 1, avail);
  avail = addPiece(board, 3, 2, avail); if (large) avail = addPiece(board, 3, 2, avail);
  avail = addPiece(board, 4, 1, avail); if (large) avail = addPiece(board, 4, 1, avail);
  avail = addPiece(board, 4, 2, avail); if (large) avail = addPiece(board, 4, 2, avail);
  avail = addPiece(board, 4, 1, avail); if (large) avail = addPiece(board, 4, 1, avail);
  avail = addPiece(board, 4, 2, avail); if (large) avail = addPiece(board, 4, 2, avail);
  avail = addPiece(board, 5, 1, avail); if (large) avail = addPiece(board, 5, 1, avail);
  avail = addPiece(board, 5, 2, avail); if (large) avail = addPiece(board, 5, 2, avail);
  avail = addPiece(board, 5, 1, avail); if (large) avail = addPiece(board, 5, 1, avail);
  avail = addPiece(board, 5, 2, avail); if (large) avail = addPiece(board, 5, 2, avail);
  avail = addPiece(board, 6, 1, avail); if (large) avail = addPiece(board, 6, 1, avail);
  avail = addPiece(board, 6, 2, avail); if (large) avail = addPiece(board, 6, 2, avail);
  avail = addPiece(board, 6, 1, avail); if (large) avail = addPiece(board, 6, 1, avail);
  avail = addPiece(board, 6, 2, avail); if (large) avail = addPiece(board, 6, 2, avail);
  avail = addPiece(board, 6, 1, avail); if (large) avail = addPiece(board, 6, 1, avail);
  avail = addPiece(board, 6, 2, avail); if (large) avail = addPiece(board, 6, 2, avail);
  avail = addPiece(board, 6, 1, avail); if (large) avail = addPiece(board, 6, 1, avail);
  avail = addPiece(board, 6, 2, avail); if (large) avail = addPiece(board, 6, 2, avail);
  avail = addPiece(board, 6, 1, avail); if (large) avail = addPiece(board, 6, 1, avail);
  avail = addPiece(board, 6, 2, avail); if (large) avail = addPiece(board, 6, 2, avail);
}

})();
