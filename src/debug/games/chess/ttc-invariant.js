(function() {

Dagaz.AI.inProgress = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "ttc-invariant") {
      checkVersion(design, name, value);
  }
}

Dagaz.Model.findPiece = function(design, board, player, types) {
  var r = [];
  var positions = design.allPositions();
  for (var i = 0; i < positions.length; i++) {
       var piece = board.getPiece(positions[i]);
       if ((piece !== null) && (_.indexOf(types, +piece.type) >= 0) && (piece.player == player)) {
           r.push(positions[i]);
       }
  }
  return r;
}

var checkDirection = function(design, board, player, pos, dir, leapers, riders) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return false;
  var piece = board.getPiece(p);
  if (piece !== null) {
      if (piece.player == player) return false;
      return (_.indexOf(leapers, +piece.type) >= 0) || (_.indexOf(riders, +piece.type) >= 0);
  }
  while (piece === null) {
      p = design.navigate(player, p, dir);
      if (p === null) return false;
      piece = board.getPiece(p);
  }
  if (piece.player == player) return false;
  return _.indexOf(riders, +piece.type) >= 0;
}

var checkLeap = function(design, board, player, pos, o, d, leapers) {
  var p = design.navigate(player, pos, o);
  if (p === null) return false;
  p = design.navigate(player, p, d);
  if (p === null) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  return (piece.player != player) && (_.indexOf(leapers, +piece.type) >= 0);
}

Dagaz.Model.checkPositions = function(design, board, player, positions) {
  var n  = design.getDirection("n");  var w  = design.getDirection("w");
  var s  = design.getDirection("s");  var e  = design.getDirection("e");
  var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
  var ne = design.getDirection("ne"); var se = design.getDirection("se");
  for (var i = 0; i < positions.length; i++) {
       var pos = positions[i];
       if (checkDirection(design, board, player, pos, n,  [5, 11], [1, 7, 4, 10])) return true;
       if (checkDirection(design, board, player, pos, s,  [5, 11], [1, 7, 4, 10])) return true;
       if (checkDirection(design, board, player, pos, w,  [5, 11], [1, 7, 4, 10])) return true;
       if (checkDirection(design, board, player, pos, e,  [5, 11], [1, 7, 4, 10])) return true;
       if (checkDirection(design, board, player, pos, nw, [5, 11, 0, 6], [3, 9, 4, 10])) return true;
       if (checkDirection(design, board, player, pos, ne, [5, 11, 0, 6], [3, 9, 4, 10])) return true;
       if (checkDirection(design, board, player, pos, sw, [5, 11], [3, 9, 4, 10])) return true;
       if (checkDirection(design, board, player, pos, se, [5, 11], [3, 9, 4, 10])) return true;
       if (checkLeap(design, board, player, pos, n, nw, [2, 8])) return true;
       if (checkLeap(design, board, player, pos, n, ne, [2, 8])) return true;
       if (checkLeap(design, board, player, pos, s, sw, [2, 8])) return true;
       if (checkLeap(design, board, player, pos, s, se, [2, 8])) return true;
       if (checkLeap(design, board, player, pos, w, nw, [2, 8])) return true;
       if (checkLeap(design, board, player, pos, w, sw, [2, 8])) return true;
       if (checkLeap(design, board, player, pos, e, ne, [2, 8])) return true;
       if (checkLeap(design, board, player, pos, e, se, [2, 8])) return true;
  }
  return false;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var b = board.apply(move);
      var list = Dagaz.Model.findPiece(design, b, board.player, [5, 11]);
      if (Dagaz.Model.checkPositions(design, b, board.player, list)) {
          move.failed = true;
          return;
      }
  });
  CheckInvariants(board);
}

})();
