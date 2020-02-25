(function() {

Dagaz.AI.PROTO         = true;
Dagaz.AI.CAPTURES_ONLY = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "chess-proto") {
      checkVersion(design, name, value);
  }
}

var checkStep = function(design, board, piece, pos, dir) {
  var p = design.navigate(piece.player, pos, dir);
  if (p === null) return;
  var target = board.getPiece(p);
  if (!Dagaz.AI.CAPTURES_ONLY || (target === null)) return;
  if ((target !== null) && (target.player == piece.player)) return;
  var move = Dagaz.Model.createMove(0);
  move.movePiece(pos, p, piece);
  board.moves.push(move);
}

var checkJump = function(design, board, piece, pos, o, d) {
  var p = design.navigate(piece.player, pos, o);
  if (p === null) return;
  p = design.navigate(piece.player, p, d);
  if (p === null) return;
  var target = board.getPiece(p);
  if (!Dagaz.AI.CAPTURES_ONLY || (target === null)) return;
  if ((target !== null) && (target.player == piece.player)) return;
  var move = Dagaz.Model.createMove(0);
  move.movePiece(pos, p, piece);
  board.moves.push(move);
}

var checkPawnShift = function(design, board, piece, pos, dir) {
  var p = design.navigate(piece.player, pos, dir);
  if (p === null) return;
  var target = board.getPiece(p);
  if (target !== null) return;
  var move = Dagaz.Model.createMove(0);
  move.movePiece(pos, p, piece);
  board.moves.push(move);
}

var checkPawnStep = function(design, board, piece, pos, dir) {
  var p = design.navigate(piece.player, pos, dir);
  if (p === null) return;
  var target = board.getPiece(p);
  if (target === null) return;
  if (target.player == piece.player) return;
  var move = Dagaz.Model.createMove(0);
  move.movePiece(pos, p, piece);
  board.moves.push(move);
}

var checkSlide = function(design, board, piece, pos, dir) {
  var p = design.navigate(piece.player, pos, dir);
  while (p !== null) {
      var target = board.getPiece(p);
      if (target !== null) {
          if (target.player == piece.player) return;
      } else {
          if (Dagaz.AI.CAPTURES_ONLY) return;
      }
      var move = Dagaz.Model.createMove(0);
      move.movePiece(pos, p, piece);
      board.moves.push(move);
      if (target !== null) return;
      p = design.navigate(piece.player, p, dir);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var king   = design.getPieceType("King");  var pawn   = design.getPieceType("Pawn");
  var rook   = design.getPieceType("Rook");  var knight = design.getPieceType("Knight");
  var queen  = design.getPieceType("Queen"); var bishop = design.getPieceType("Bishop");
  var n  = design.getDirection("n");  var w  = design.getDirection("w");
  var s  = design.getDirection("s");  var e  = design.getDirection("e");
  var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
  var ne = design.getDirection("ne"); var se = design.getDirection("se");
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (piece.player != board.player) return;
      if (piece.type == king) {
          checkStep(design, board, piece, pos, n); checkStep(design, board, piece, pos, nw);
          checkStep(design, board, piece, pos, e); checkStep(design, board, piece, pos, ne);
          checkStep(design, board, piece, pos, s); checkStep(design, board, piece, pos, se);
          checkStep(design, board, piece, pos, w); checkStep(design, board, piece, pos, sw);
      }
      if (piece.type == pawn) {
          if (!Dagaz.AI.CAPTURES_ONLY) checkPawnShift(design, board, piece, pos, n);
          checkPawnStep(design, board, piece, pos, nw); checkPawnStep(design, board, piece, pos, ne);
      }
      if ((piece.type == rook) || (piece.type == queen)) {
          checkSlide(design, board, piece, pos, n); checkSlide(design, board, piece, pos, e);
          checkSlide(design, board, piece, pos, w); checkSlide(design, board, piece, pos, s);
      }
      if ((piece.type == bishop) || (piece.type == queen)) {
          checkSlide(design, board, piece, pos, nw); checkSlide(design, board, piece, pos, ne);
          checkSlide(design, board, piece, pos, se); checkSlide(design, board, piece, pos, sw);
      }
      if (piece.type == knight) {
          checkJump(design, board, piece, pos, n, nw); checkJump(design, board, piece, pos, n, ne);
          checkJump(design, board, piece, pos, s, sw); checkJump(design, board, piece, pos, s, se);
          checkJump(design, board, piece, pos, w, sw); checkJump(design, board, piece, pos, w, nw);
          checkJump(design, board, piece, pos, e, se); checkJump(design, board, piece, pos, e, ne);
      }
  });
  CheckInvariants(board);
}

})();
