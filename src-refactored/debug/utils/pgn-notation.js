(function() {

var compareMove = Dagaz.Model.compareMove;

Dagaz.Model.compareMove = function(move, notation, board, design) {
  if ((notation == "O-O") && board) {
      if (board.player == 1) {
          return compareMove(move, "e1g1");
      } else {
          return compareMove(move, "e8g8");
      }
  }
  if ((notation == "O-O-O") && board) {
      if (board.player == 1) {
          return compareMove(move, "e1c1");
      } else {
          return compareMove(move, "e8c8");
      }
  }
  var m = /([RBNQKP]?)([a-h]?\d?)x?([a-h]\d)/.exec(notation);
  if (m) {
      var action = _.chain(move.actions)
       .filter(function(action) {
          return (action[0] !== null) && (action[1] !== null);
        })
       .first()
       .value();
      if (Dagaz.Model.stringToPos(m[3]) == action[1][0]) {
          if (m[2]) {
              var s = Dagaz.Model.posToString(action[0][0]);
              if (!s.startsWith(m[2])) return false;
          }
          if (m[1] && design) {
              var piece = board.getPiece(action[0][0]);
              if (piece === null) return false;
              if (m[1] == "N") {
                  if (design.getPieceType("Knight") != piece.type) return false;
              }
              if (m[1] == "B") {
                  if (design.getPieceType("Bishop") != piece.type) return false;
              }
              if (m[1] == "R") {
                  if (design.getPieceType("Rook") != piece.type) return false;
              }
              if (m[1] == "Q") {
                  if (design.getPieceType("Queen") != piece.type) return false;
              }
              if (m[1] == "K") {
                  if (design.getPieceType("King") != piece.type) return false;
              }
          }
          return true;
      }
  }
  return compareMove(move, notation, board, design);
}

})();
