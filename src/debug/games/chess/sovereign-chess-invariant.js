(function() {

var isInternal = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "sovereign-chess-invariant") {
     checkVersion(design, name, value);
  }
}

var findKing = function(design, board, player, positions) {
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (piece.player != player) return;
      if (piece.type != 5) return;
      positions.push(pos);
  });
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  if (!isInternal) {
      var player = board.getValue(board.player);
      if (player === null) {
          player = board.player;
      }
      _.each(board.moves, function(move) {
          var positions = [];
          // TODO: Check Castling
          var b = board.apply(move);
          // TODO: Optimize findKing
          findKing(design, b, player, positions);
          if (positions.length > 0) {
              isInternal = true;
              b.generate();
              isInternal = false;
              _.each(b.moves, function(m) {
                  if (!_.isUndefined(m.failed)) return;
                  if (_.indexOf(positions, m.actions[0][1][0]) >= 0) move.failed = true;
              });
          }
      });
  }
  CheckInvariants(board);
}

})();
