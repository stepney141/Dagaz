(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "klondike-setup") {
     checkVersion(design, name, value);
  }
}

var createPieces = function(design) {
  var r = [];
  for (t = 0; t < 13; t++) {
      for (p = 1; p <= 4; p++) {
          r.push(Dagaz.Model.createPiece(t * 2, p));
      }
  }
  return r;
}

var addPiece = function(board, pos, f, avail) {
  var ix = 0;
  if (avail.length > 1) {
      ix = _.random(0, avail.length - 1);
  }
  var piece = avail[ix];
  if (f) piece = piece.promote(piece.type + 1);
  board.setPiece(pos, piece);
  var r = [];
  for (var i = 0; i < avail.length; i++) {
      if (i != ix) r.push(avail[i]);
  }
  return r;
}

Dagaz.Model.setup = function(board) {
  var design = Dagaz.Model.design;
  var avail  = createPieces(design);
  var o = 0;
  for (var y = 0; y < 7; y++, o++) {
       var f = true;
       for (var x = o; x < 7; x++) {
            var pos = y * 7 + x;
            avail = addPiece(board, pos, f, avail);
            f = false;
       }
  }
}

})();
