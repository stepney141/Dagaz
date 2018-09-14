(function() {

var auto = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "fox-extension") {
      if (value == "auto") auto = true;
  } else {
      checkVersion(design, name, value);
  }
}

var isFox = function(type) {
  return type >= 9;
}

var isAliveFox = function(type) {
  return type == 9;
}

var countFoxes = function(design, board, pos, f) {
  var cnt = 0;
  _.each(design.allDirections(), function(dir) {
      var p = design.navigate(board.player, pos, dir);
      while (p !== null) {
          var piece = board.getPiece(p);
          if ((piece !== null) && f(piece.type)) cnt++;
          p = design.navigate(board.player, p, dir);
      }
  });
  return cnt;
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
                  move.dropPiece(pos, piece);
                  move.sound = 1;
              } else {
                  move.failed = true;
              }
          } else {
              var cnt = countFoxes(design, board, pos, isFox);
              move.dropPiece(pos, Dagaz.Model.createPiece(cnt, 1));
          }
          if (auto) {
              board.ko = [];
              _.each(design.allPositions(), function(pos) {
                   var piece = board.getPiece(pos);
                   if ((piece !== null) && (piece.type < 9)) {
                       var cnt = countFoxes(design, board, pos, isAliveFox);
                       if (cnt == 0) {
                           _.each(design.allDirections(), function(dir) {
                               var p = design.navigate(board.player, pos, dir);
                               while (p !== null) {
                                   if (board.getPiece(p) === null) board.ko.push(p);
                                   p = design.navigate(board.player, p, dir);
                               }
                           });
                       }
                   }
              });
          }
      }
  });
  CheckInvariants(board);
}

})();
