(function() {

var isAdvanced = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "hi-que-extension") {
      isAdvanced = (value == "advanced");
  } else {
      checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var enemies = 0;
  var friends = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == 0)) {
          if (piece.player != player) {
              enemies++;
          } else {
              friends++;
          }
      }
  });
  if (enemies < 1) {
      return 1;
  }
  if (friends < 1) {
      return -1;
  }
  return checkGoals(design, board, player);
}

var checkTarget = function(design, board, pos, dir, move) {
  var p = design.navigate(board.player, pos, dir);
  if (p === null) return
  var piece = board.getPiece(p);
  if ((piece === null) || (piece.player == board.player)) return
  var q = design.navigate(board.player, p, dir);
  if (q === null) return;
  piece = board.getPiece(q);
  if ((piece === null) || (piece.player != board.player)) return;
  move.capturePiece(p);
}

var checkTargetEx = function(design, board, pos, exc, dir, ort, move) {
  var p = design.navigate(board.player, pos, dir);
  if (p === null) return
  var piece = board.getPiece(p);
  if ((piece === null) || (piece.player == board.player)) return
  var q = design.navigate(board.player, p, dir);
  if (q !== null) return;
  q = design.navigate(board.player, p, ort);
  if ((q === null) || (q == exc)) return;
  piece = board.getPiece(q);
  if ((piece === null) || (piece.player != board.player)) return;
  move.capturePiece(p);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
  var ne = design.getDirection("ne"); var se = design.getDirection("se");
  _.each(board.moves, function(move) {
      if (move.isSimpleMove()) {
          var exc = move.actions[0][0][0];
          var pos = move.actions[0][1][0];
          checkTarget(design, board, pos, nw, move);
          checkTarget(design, board, pos, sw, move);
          checkTarget(design, board, pos, se, move);
          checkTarget(design, board, pos, ne, move);
          if (isAdvanced) {
              checkTargetEx(design, board, pos, exc, nw, sw, move);
              checkTargetEx(design, board, pos, exc, ne, se, move);
              checkTargetEx(design, board, pos, exc, sw, nw, move);
              checkTargetEx(design, board, pos, exc, se, ne, move);
              checkTargetEx(design, board, pos, exc, nw, ne, move);
              checkTargetEx(design, board, pos, exc, ne, nw, move);
              checkTargetEx(design, board, pos, exc, sw, se, move);
              checkTargetEx(design, board, pos, exc, se, sw, move);
          }
      }
  });
  CheckInvariants(board);
}

})();
