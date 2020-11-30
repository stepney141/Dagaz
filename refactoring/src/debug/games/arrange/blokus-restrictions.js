(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "blokus-restrictions") {
     checkVersion(design, name, value);
  }
}

var getInitPositions = function(design, board) {
  var r = [];
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) {
          if (design.inZone(0, board.player, pos)) {
              r.push(pos);
              return;
          }
      } else {
          if (piece.player  board.player) {
              _.each([0, 2, 5, 6], function(dir) {
                   var p = design.navigate(board.player, pos, dir);
                   if (p !== null) {
                       var piece = board.getPiece(pos);
                       if (piece === null) {
                           r.push(p);
                       }
                   }
              });
          }
      }
  });
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var positions = getInitPositions(design, board);
  _.each(board.moves, function(move) {
      var failed = true;
      _.each(move.actions, function(a) {
          if ((a[0] === null) && (a[1] !== null)) {
               var pos = a[1][0];
               if (_.indexOf(positions, pos) >= 0) {
                   failed = false;
               }
               if (board.getPiece(pos) !== null) {
                   move.failed = true;
                   return;
               }
              _.each([1, 3, 4, 7], function(dir) {
                   var p = design.navigate(board.player, pos, dir);
                   if (p !== null) {
                       var piece = board.getPiece(p);
                       if ((piece !== null) && (piece.player == board.player)) {
                           move.failed = true;
                       }
                   }
              });
          }
      });
      if (failed) {
          move.failed = true;
      }
  });
  CheckInvariants(board);
}

})();
