(function() {

var strongMode = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "halma-restrictions") {
      if (value == "strong") strongMode = true;
  } else {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
//var players = design.allPlayers();
  var f = false;
  _.each(board.moves, function(move) {
      var src = null; var dst = null;
      _.each(move.actions, function(a) {
          if ((a[0] !== null) && (a[1] !== null)) {
               if (src === null) {
                   src = a[0][0];
               }
               dst = a[1][0];
          }
      });
      if ((src !== null) && (dst !== null)) {
          if (design.inZone(0, board.player, src) && !design.inZone(0, board.player, dst)) {
              move.failed = true;
              return;
          }
          if (!design.inZone(1, board.player, src) && design.inZone(1, board.player, dst)) {
              move.failed = true;
              return;
          }
/*        if (strongMode && (players.length > 2)) {
              _.each(players, function(player) {
                   if ((player != board.player) && design.inZone(0, player, dst)) {
                        move.failed = true;
                        return;
                   }
              });
          } */
          if (design.inZone(1, board.player, src) && !design.inZone(1, board.player, dst)) {
              f = true;
          }
      }
  });
  if (f && strongMode) {
      _.each(board.moves, function(move) {
          if ((move.actions.length > 0) && (move.actions[0][0] !== null) && (move.actions[0][1] !== null)) {
               var pos = move.actions[0][0][0];
               if (!design.inZone(1, board.player, pos)) {
                   move.failed = true;
               }
          }
      });
  }
  CheckInvariants(board);
}

})();
