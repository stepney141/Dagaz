(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "ordo-extension") {
      checkVersion(design, name, value);
  }
}

var expand = function(design, board, player, group) {
  for (var i = 0; i < group.length; i++) {
      _.each(design.allDirections(), function(dir) {
           var p = design.navigate(player, group[i], dir);
           if ((p !== null) && (_.indexOf(group, p) < 0)) {
               var piece = board.getPiece(p);
               if ((piece !== null) && (piece.player == player)) {
                   group.push(p);
               }
           }
      });
  }
}

var isCoherence = function(design, board, player) {
  var r = true;
  var group = [];
  _.each(design.allPositions(), function(pos) {
      if (r) {
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.player == player)) {
              if (group.length == 0) {
                  group.push(pos);
                  expand(design, board, player, group);
              } else {
                  if (_.indexOf(group, pos) < 0) r = false;
              }
          }
      }
  });
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var b = board.apply(move);
      if (!isCoherence(design, b, board.player)) {
          move.failed = true;
      }
  });
  CheckInvariants(board);
}

})();
