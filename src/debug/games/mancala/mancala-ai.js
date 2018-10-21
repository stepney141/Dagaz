(function() {

var MAX_DEEP = 10;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "mancala-ai") {
      MAX_DEEP = +value;
  } else {
      checkVersion(design, name, value);
  }
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      if (design.inZone(1, player, pos)) {
          var piece = board.getPiece(pos);
          if (piece !== null) {
              var value = Math.abs(+piece.getValue(0));
              if (piece.player == player) {
                  r += value;
              } else {
                  r -= value;
              }
          }
      }
  });
  return r;
}

var findMove(design, board, player) {
  var src = null;
  _.each(design.allPositions(), function(pos) {
      if (!design.inZone(1, player, pos)) {
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.player == player) && (+piece.getValue(0) < 0)) {
              src = pos;
          }
      }
  });
  if (src === null) return null;
  var dst = design.navigate(player, src, 0);
  if (dst === null) return null;
  var move = Dagaz.Model.createMove(0);
  move.movePiece(src, dst, null);
  board.moves = [ move ];
  Dagaz.Model.CheckInvariants(board);
  if (board.moves.length == 0) return null;
  return board.moves[0];
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var b = board;
  if (board.moves.length > 1) {
      var stack = [ board.zSign ];
      while (move !== null) {
          if ((MAX_DEEP !== null) && (stack.length >= MAX_DEEP)) return -1;
          b = b.apply(move);
          b.player = board.player;
          if (_.indexOf(stack, b.zSign) >= 0) return -1;
          stack.push(b.zSign);
          move = findMove(design, b, board.player);
      }
      return Dagaz.AI.eval(design, ai.params, b, board.player);
  }
  return 1;
}

})();
