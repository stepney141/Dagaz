(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "archimedes-extension") {
     checkVersion(design, name, value);
  }
}

var isAttacked = function(design, board, pos, player, dir) {
  var p = design.navigate(player, pos, dir);
  while (p !== null) {
      var piece = board.getPiece(p);
      if (piece !== null) {
          return piece.player != player;
      }
      p = design.navigate(player, p, dir);
  }
  return false;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.chain(board.moves)
   .filter(function(move) {
       return move.actions.length == 1;
    })
   .each(function(move) {
       var c = [];
       var b = board.apply(move);
       _.each(_.range(design.positions.length), function(pos) {
           var piece = b.getPiece(pos);
           if (piece != null) {
               var cnt = 0;
               _.each(_.range(design.dirs.length), function(dir) {
                   if (isAttacked(design, b, pos, piece.player, dir)) {
                       cnt++;
                   }
               });
               if (cnt >= 3) {
                   c.push(pos);
               }
           }
       });
       var t = move.actions[0][1][0];
       if (_.indexOf(c, t) >= 0) {
           move.failed = true;
       } else {
           _.each(c, function(pos) {
                move.capturePiece(pos);
           });
       }
    });
  CheckInvariants(board);
}

})();
