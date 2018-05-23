(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "xinjiang-extension") {
     checkVersion(design, name, value);
  }
}

var isFilled = function(board, player, pos, empty) {
  if ((empty !== null) && (pos == empty)) return false;
  var piece = board.getPiece(pos);
  if (piece === null) return false;
  return piece.player == player;
}

var isVector = function(design, board, player, pos, empty, dir) {
  var r = 0;
  while (isFilled(board, player, pos, empty)) {
      r++;
      pos = design.navigate(player, pos, dir);
      if (pos === null) break;
  }
  return r == 7;
}

var isLine = function(design, board, player, pos, empty, dir, zPart) {
  var z = Dagaz.Model.getZobristHash();
  if (!isFilled(board, player, pos, empty)) return false;
  var v = z.update(0, player, 0, pos);
  var p = design.navigate(player, pos, dir);
  while (p !== null) {
      var piece = board.getPiece(p);
      if (piece === null) return false;
      if (piece.player != player) return false;
      v = z.update(v, player, 0, p);
      p = design.navigate(player, p, dir);
  }
  p = design.navigate(0, pos, dir);
  while (p !== null) {
      var piece = board.getPiece(p);
      if (piece === null) return false;
      if (piece.player != player) return false;
      v = z.update(v, player, 0, p);
      p = design.navigate(0, p, dir);
  }
  if (!_.isUndefined(zPart)) {
      zPart.push(v);
  }
  return true;
}

var incForm = Dagaz.Model.incForm;

Dagaz.Model.incForm = function(board, player, pos, empty, dx, dy, zPart) {
  var design = Dagaz.Model.design;
  var n = design.getDirection("n"); var e = design.getDirection("e");
  var r = incForm(board, player, pos, empty, dx, dy, zPart);
  if (isVector(design, board, player, pos, empty, n)) r++;
  if (isVector(design, board, player, pos, empty, e)) r++;
  return r;
}

var calcForms = Dagaz.Model.calcForms;

Dagaz.Model.calcForms = function(board, player, pos, empty, zPart) {
  var design = Dagaz.Model.design;
  var n = design.getDirection("n"); var e = design.getDirection("e");
  var r = calcForms(board, player, pos, empty, zPart);
  if (isLine(design, board, player, pos, empty, n)) r += 3;
  if (isLine(design, board, player, pos, empty, e)) r += 3;
  return r;
}

})();
