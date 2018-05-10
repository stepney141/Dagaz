(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "fangqi-invariant") {
     checkVersion(design, name, value);
  }
}

var isCapturing = function(move) {
  if (move.actions.length < 2) return false;
  if ((move.actions[0][0] === null) || (move.actions[0][1] !== null)) return false;
  if ((move.actions[1][0] === null) || (move.actions[1][1] === null)) return false;
  return (move.actions[0][0][0] == move.actions[1][0][0]) &&
         (move.actions[1][0][0] == move.actions[1][1][1]);
}

var calcAvail = function(design, board, player) {
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.player == player) && (Dagaz.Model.calcForms(board, player, pos, null) == 0)) r++;
  });
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var avail  = calcAvail(design, board, board.player);
  var req    = board.getValue(design.nextPlayer(board.player));
  if (req === null) req = 0;
  if ((req > 0) && (avail > 0) && !_.isUndefined(board.move) && isCapturing(board.move)) {
      board.moves = [ Dagaz.Model.createMove(1) ];
      CheckInvariants(board);
      return;
  }
  req = board.getValue(board.player);
  if (req === null) req = 0;
  if (req > 0) {
      var f = true;
      _.each(board.moves, function(move) {
          if (move.isDropMove()) {
              f = false;
              return;
          }
          if (isCapturing(move)) {
              var pos = move.actions[0][0][0];
              var piece = board.getPiece(pos);
              if (Dagaz.Model.calcForms(board, piece.player, pos, null) == 0) {
                  move.addValue(board.player, -1);
                  f = false;
              }
          }
      });
      if (f) {
          avail = board.getValue(design.nextPlayer(board.player));
          if ((avail !== null) && (avail > 0)) {
             var move = Dagaz.Model.createMove(1);
             move.addValue(board.player, -req);
             board.moves = [ move ];
             CheckInvariants(board);
             return;
          } 
          _.each(board.moves, function(move) {
             move.addValue(board.player, -req);
          });
      }
  } else {
      _.each(board.moves, function(move) {
          if (isCapturing(move)) move.failed = true;
      });
  }
  CheckInvariants(board);
}

})();
