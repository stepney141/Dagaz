(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "sliding-puzzle") {
     checkVersion(design, name, value);
  }
}

var isEqual = function(a, b) {
  if ((a == 0) || (b == 0)) return false;
  return a == b;
}

var isEmpty = function(board, pos, value) {
  var piece = board.getPiece(pos);
  if (piece === null) return true;
  return isEqual(piece.getValue(0), value);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  _.chain(board.moves)
   .filter(function(move) {
       if (move.actions.length != 1) return false;
       var action = move.actions[0];
       if (!action[0]) return false;
       if (!action[1]) return false;
       if (action[0][0] == action[1][0]) return false;
       if (board.getPiece(action[0][0]) === null) return false;
       return true;
    })
   .each(function(move) {
       var design = board.game.design;
       var action = move.actions[0];
       var from   = action[0][0];
       var delta  = action[1][0] - from;
       var piece  = board.getPiece(from);
       var value  = piece.getValue(0);
       if (isEmpty(board, action[1][0], value)) {
       _.chain(_.range(design.positions.length))
        .filter(function(pos) {
            return pos != from;
         })
        .filter(function(pos) {
            if (board.getPiece(pos) === null) return false;
            return isEqual(board.getPiece(pos).getValue(0), value);
         })
        .each(function(pos) {
            var target = pos + delta;
            if ((Dagaz.find(design.positions[pos], delta) < 0) ||
                (target < 0) || 
                (target >= design.positions.length) ||
                !isEmpty(board, target, value)) {
                move.failed = true;
            } else {
                move.movePiece(pos, target, null, 1);
            }
         });
       } else {
            move.failed = true;
       }
    });
  CheckInvariants(board);
}

// Dagaz.View.showHint  = function(view)       {}
// Dagaz.View.showMarks = function(view, ctx)  {}

})();
