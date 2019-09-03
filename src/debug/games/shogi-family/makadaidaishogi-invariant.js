(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "makadaidaishogi-invariant") {
      checkVersion(design, name, value);
  }
}

var checkStep = function(design, board, player, pos, dir) {
  // TODO:

}

var checkLeap = function(design, board, player, pos, dir) {
  // TODO:

}

var checkSlide = function(design, board, player, pos, dir, cnt) {
  // TODO:

}

var checkPiece = function(design, board, piece, pos) {
  if (_.indexOf([0, 2, 3, 5, 6, 7, 8, 12, 17, 26, 28], +piece.type) >= 0) checkStep(design, board, piece.player, pos, 7); // n
  if (_.indexOf([0, 3, 5, 6, 7, 8, 12, 17, 21, 28], +piece.type) >= 0) checkStep(design, board, piece.player, pos, 11); // s
  if (_.indexOf([3, 5, 10, 12, 17, 21, 23, 28], +piece.type) >= 0) checkStep(design, board, piece.player, pos, 1); // e
  if (_.indexOf([3, 5, 10, 12, 17, 21, 23, 28], +piece.type) >= 0) checkStep(design, board, piece.player, pos, 13); // w
  if (_.indexOf([3, 5, 9, 13, 24], +piece.type) >= 0) checkStep(design, board, piece.player, pos, 4); // nw
  if (_.indexOf([3, 5, 9, 13, 24], +piece.type) >= 0) checkStep(design, board, piece.player, pos, 14); // ne
  if (_.indexOf([9, 13, 26], +piece.type) >= 0) checkStep(design, board, piece.player, pos, 9); // se
  if (_.indexOf([9, 13, 26], +piece.type) >= 0) checkStep(design, board, piece.player, pos, 0); // sw
  if (_.indexOf([18], +piece.type) >= 0) checkStep(design, board, piece.player, pos, 5); // n2L
  if (_.indexOf([18], +piece.type) >= 0) checkStep(design, board, piece.player, pos, 8); // n2R

  if (_.indexOf([17], +piece.type) >= 0) checkLeap(design, board, piece.player, pos, 7, 7); // n, n
  if (_.indexOf([17], +piece.type) >= 0) checkLeap(design, board, piece.player, pos, 11, 11); // s, s

  if (_.indexOf([1, 4, 10, 13, 16, 27], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 7); // n
  if (_.indexOf([1, 4, 10, 13, 16], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 11); // s
  if (_.indexOf([4, 8, 9, 13, 16, 29], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 1); // e
  if (_.indexOf([4, 8, 9, 13, 16, 29], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 13); // w
  if (_.indexOf([6, 11, 12, 16, 29], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 4); // nw
  if (_.indexOf([7, 11, 12, 16, 29], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 14); // ne
  if (_.indexOf([6, 11, 12, 16, 27, 29], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 9); // se
  if (_.indexOf([7, 11, 12, 16, 27, 29], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 0); // sw

  if (_.indexOf([19], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 7, 2); // n
  if (_.indexOf([19], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 11, 2); // s
  if (_.indexOf([19], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 1, 2); // e
  if (_.indexOf([19], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 13, 2); // w
  if (_.indexOf([20, 22], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 4, 2); // nw
  if (_.indexOf([20, 22], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 14, 2); // ne
  if (_.indexOf([20, 22], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 9, 2); // se
  if (_.indexOf([20, 22], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 0, 2); // sw

  if (_.indexOf([24], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 7, 3); // n
  if (_.indexOf([24], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 11, 3); // s
  if (_.indexOf([24], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 1, 3); // e
  if (_.indexOf([24], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 13, 3); // w
  if (_.indexOf([21, 23], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 4, 3); // nw
  if (_.indexOf([21, 23], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 14, 3); // ne
  if (_.indexOf([23], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 9, 3); // se
  if (_.indexOf([23], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 0, 3); // sw

  if (_.indexOf([22], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 7, 5); // n
  if (_.indexOf([22], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 11, 5); // s
  if (_.indexOf([22], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 1, 5); // e
  if (_.indexOf([22], +piece.type) >= 0) checkSlide(design, board, piece.player, pos, 13, 5); // w

  // Capricorn = 14, Hook-Mover = 15, Lion-Dog = 25, Blind-Bear = 30
}

Dagaz.Model.getCover = function(design, board) {
  if (_.isUndefined(board.cover)) {
      board.cover = [];
      board.cover.attacked  = [];
      board.cover.defended  = [];
      board.cover.positions = [];
      for (var pos = 0; pos < design.positions.length; pos++) {
           var piece = board.getPiece(pos);
           if (piece !== null) {
               checkPiece(design, board, piece, pos);
           }
      }
  }
  return board.cover;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var cover  = Dagaz.Model.getCover(design, board);
  // TODO:

  CheckInvariants(board);
}

})();
