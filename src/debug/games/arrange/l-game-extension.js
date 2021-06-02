(function() {

var patterns = [
  [ 1, 2, 0,    // 1
    0, 3, 0,
    0, 4, 0 ],      
  [ 2, 1, 0,    // 2
    3, 0, 0,
    4, 0, 0 ],      
  [ 2, 3, 4,    // 3
    1, 0, 0,
    0, 0, 0 ],      
  [ 1, 0, 0,    // 4
    2, 3, 4,
    0, 0, 0 ],      
  [ 4, 0, 0,    // 5
    3, 0, 0,
    2, 1, 0 ],      
  [ 0, 4, 0,    // 6
    0, 3, 0,
    1, 2, 0 ],      
  [ 0, 0, 1,    // 7
    4, 3, 2,
    0, 0, 0 ],      
  [ 4, 3, 2,    // 8
    0, 0, 1,
    0, 0, 0 ]
];


var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "l-game-extension") {
      checkVersion(design, name, value);
  }
}

var addPattern = function(design, board, sx, sy, p, move) {
  for (var x = 0; x < 3; x++) {
       for (var y = 0; y < 3; y++) {
            if (patterns[p][y * 3 + x] == 0) continue;
            if ((x + sx >= 4) || (y + sy >= 4)) return false;
            var pos = (y * sy) * 4 + x + sx;
            var piece = board.getPiece(pos);
            if (piece !== null) {
                if ((piece.type == 0) || (piece.player != board.player)) return false;
            }
            piece = Dagaz.Model.createPiece(1, board.player).setValue(0, patterns[p][y * 3 + x]);
            move.dropPiece(pos, piece);
       }
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  if (_.indexOf(design.turns[board.turn].modes, 0) < 0) {
      var capturing = [];
      _.each(design.allPositions(), function(pos) {
          var piece = board.getPiece(pos);
          if (piece === null) return;
          if (piece.type == 0) return;
          if (piece.player != board.player) return;
          capturing.push(pos);
      });
      for (var p = 0; p <= patterns.length; p++) {
          for (var x = 0; x < 3; x++) {
               for (var y = 0; y < 3; y++) {
                    var move = Dagaz.Model.createMove(p + 1);
                    if (addPattern(design, board, x, y, p, move)) {
                        _.each(capturing, function(pos) {
                             move.capturePiece(pos);
                        });
                        board.moves.push(move);
                    }
               }
          }
      }
  }
  CheckInvariants(board);
}

})();
