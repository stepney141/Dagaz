(function() {

var checkVersion = Model.Game.checkVersion;

Model.Game.checkVersion = function(design, name, value) {
  if (name != "renju-extension") {
     checkVersion(design, name, value);
  }
}

var nvl = function(value, default) {
  if (!default) default = 0;
  if (value) {
      return value;
  } else {
      return default;
  }
}

var updateLine = function(move, board, pos, dir, player, value) {
  var design = Model.Game.design;
  pos = design.navigate(player, pos, dir);
  while (pos !== null) {
      var piece = board.getPiece(pos);
      if (piece === null) break;
      if (piece.player != board.player) break;
      piece = piece.setValue(dir, value);
      move.movePiece(pos, pos, piece);
      pos = design.navigate(player, pos, dir);
  }
}

var CheckInvariants = Model.Game.CheckInvariants;

Model.Game.CheckInvariants = function(board) {
  var design = Model.Game.design;
  _.chain(board.moves)
   .filter(function(move) {
       if (move.actions.length != 1) return false;
       return (move.actions[0] === null) && (move.actions[1] !== null) && (move.actions[2] !== null);
    })
   .each(function(move) {
       var pos  = move.actions[0][1][0];
       _.each(_.range(design.dirs.length), function(dir) {
           var p = design.navigate(board.player, pos, dir);
           if (p !== null) {
               var value = 1;
               var piece = board.getPiece(p);
               if ((piece !== null) && (piece.player == board.player)) {
                   value += nvl(piece.getValue(dir));
               }
               p = design.navigate(0, pos, dir);
               if (p !== null) {
                   var piece = board.getPiece(p);
                   if ((piece !== null) && (piece.player == board.player)) {
                       value += nvl(piece.getValue(dir));
                   }
               }
               move.actions[0][2][0] = move.actions[0][2][0].setPiece(dir, value);
               updateLine(move, board, pos, dir, board.player, value);
               updateLine(move, board, pos, dir, 0, value);
           }
       });
    });
  CheckInvariants(board);
}

})();
