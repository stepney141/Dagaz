(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "fox-extension") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.isDropMove()) {
          var pos = move.actions[0][1][0];
          var piece = board.getPiece(pos);
          if (piece !== null) {
              if (piece.type == 9) {
                  piece = piece.promote(10);
                  move.actions[0][2] = [ piece ];
                  move.sound = 1;
              } else {
                  move.failed = true;
              }
          } else {
              var cnt = 0;
              _.each(design.allDirections(), function(dir) {
                  var p = design.navigate(board.player, pos, dir);
                  while (p !== null) {
                      var piece = board.getPiece(p);
                      if ((piece !== null) && (piece.type >= 9)) cnt++;
                      p = design.navigate(board.player, p, dir);
                  }
              });
              move.actions[0][2] = [ Dagaz.Model.createPiece(cnt, 1) ];
          }
      }
  });
  CheckInvariants(board);
}

})();
