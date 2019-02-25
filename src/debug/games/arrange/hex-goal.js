(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "hex-goal") {
     checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var r = null;
  var group = [];
  _.each(design.allPositions(), function(pos) {
      if (design.inZone(0, player, pos)) {
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.player == player)) {
              group.push(pos);
          }
      }
  });
  for (var i = 0; i < group.length; i++) {
      _.each(design.allDirections(), function(dir) {
           var pos = design.navigate(player, group[i], dir);
           if ((pos !== null) && (_.indexOf(group, pos) < 0)) {
               var piece = board.getPiece(pos);
               if ((piece !== null) && (piece.player == player)) {
                    if (design.inZone(1, player, pos)) {
                        r = 1;
                    }
                    group.push(pos);
               }
           }
      });
  }
  if (r !== null) return r;
  return checkGoals(design, board, player);
}

})();
