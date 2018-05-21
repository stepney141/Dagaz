(function() {

var koMode = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "morris-extension") {
     if (value == "ko") koMode = true;
  } else {
     checkVersion(design, name, value);
  }
}

Dagaz.Model.isLine = function(design, board, player, pos, dir, empty) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return false;
  if ((empty !== null) && (p == empty)) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player != player) return false;
  var q = design.navigate(player, p, dir);
  if (q === null) return false;
  if ((empty !== null) && (q == empty)) return false;
  piece = board.getPiece(q);
  if (piece === null) return false;
  if (piece.player != player) return false;
  if (_.isUndefined(board.zPartial)) {
      board.zPartial = [];
  }
  var z = Dagaz.Model.getZobristHash();
  var v = 0;
  v = z.update(v, board.player, 0, pos);
  v = z.update(v, board.player, 0, p);
  v = z.update(v, board.player, 0, q);
  board.zPartial.push(v);
  return true;
}

Dagaz.Model.isMiddle = function(design, board, player, pos, dir, empty) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return false;
  if ((empty !== null) && (p == empty)) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player != player) return false;
  var q = design.navigate(0, pos, dir);
  if (q === null) return false;
  if ((empty !== null) && (q == empty)) return false;
  piece = board.getPiece(q);
  if (piece === null) return false;
  if (piece.player != player) return false;
  if (_.isUndefined(board.zPartial)) {
      board.zPartial = [];
  }
  var z = Dagaz.Model.getZobristHash();
  var v = 0;
  v = z.update(v, board.player, 0, pos);
  v = z.update(v, board.player, 0, p);
  v = z.update(v, board.player, 0, q);
  board.zPartial.push(v);
  return true;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design     = Dagaz.Model.design;
  var dirs       = [];
  board.zPartial = [];
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  dirs.push(design.getDirection("s")); dirs.push(design.getDirection("sw"));
  dirs.push(design.getDirection("w")); dirs.push(design.getDirection("nw"));
  _.each(board.moves, function(move) {
      var cnt   = 0;
      var empty = null;
      if ((move.actions.length > 0) && (move.actions[0][1] !== null)) {
          var pos = move.actions[0][1][0];
          if (move.actions[0][0] !== null) {
              empty = move.actions[0][0][0];
          }
          for (var i = 0; i < 8; i++) {
              if (Dagaz.Model.isLine(design, board, board.player, pos, dirs[i], empty)) {
                  cnt++;
              }
          }
          for (var i = 0; i < 4; i++) {
              if (Dagaz.Model.isMiddle(design, board, board.player, pos, dirs[i], empty)) {
                  cnt++;
              }
          }
      }
      move.mode = cnt;
      if (cnt > 0) {
          move.zPartial = board.zPartial;
          if (koMode) {
              var b = board;
              while (!_.isUndefined(b.move) && !_.isUndefined(b.parent) && (b.parent !== null)) {
                  if ((b.player != board.player) && (b.move.mode > 0)) {
                      if (_.intersection(b.move.zPartial, move.zPartial).length == move.zPartial.length) {
                          move.failed = true;
                      }
                      break;
                  }
                  b = b.parent;
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
