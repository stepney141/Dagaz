(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "fangqi-extension") {
     checkVersion(design, name, value);
  }
}

Dagaz.Model.calcForms = function(board, player, pos, empty) {
  var c = 0;
  var x = Dagaz.Model.getX(pos);
  var y = Dagaz.Model.getY(pos);
  for (var i = -1; i < 1; i++) {
       for (var j = -1; j < 1; j++) {
            var f = true;
            for (var k = 0; k < 2; k++) {
                 for (var t = 0; t < 2; t++) {
                      if ((x + i + k < 0) || (x + i + k >= Dagaz.Model.WIDTH) ||
                          (y + j + t < 0) || (y + j + t >= Dagaz.Model.HEIGHT)) {
                          f = false;
                          break;
                      }
                      var p = (y + j + t) * Dagaz.Model.WIDTH + x + i + k;
                      if (p == pos) continue;
                      if ((empty !== null) && (p == empty)) {
                          f = false;
                          break;
                      }
                      var piece = board.getPiece(p);
                      if ((piece === null) || (piece.player !== player)) {
                          f = false;
                          break;
                      }
                 }
            }
            if (f) c++;
       }
  }
  return c;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if ((move.actions.length > 0) && (move.actions[0][1] !== null)) {
          var empty = null;
          var pos = move.actions[0][1][0];
          if (move.actions[0][0] !== null) {
              empty = move.actions[0][0][0];
          }
          var x = Dagaz.Model.getX(pos);
          var y = Dagaz.Model.getY(pos);
          var c = Dagaz.Model.calcForms(board, board.player, pos, empty);
          if (move.isDropMove()) {
              var cnt = 0;
              _.each(design.allPositions(), function(p) {
                  if (board.getPiece(p) === null) cnt++;
              });
              if (cnt == 1) {
                  if (board.player == 1) {
                      c += Dagaz.Model.C1;
                      move.addValue(2, Dagaz.Model.C2);
                  } else {
                      c += Dagaz.Model.C2;
                      move.addValue(1, Dagaz.Model.C1);
                  }
              }
          }
          if (c > 0) {
              move.addValue(board.player, c);
          }
      }
  });
  CheckInvariants(board);
}

})();
