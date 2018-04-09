(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "virus-wars-extension") {
      checkVersion(design, name, value);
  }
}

var isAlive = function(design, board, group) {
  for (var i = 0; i < group.length; i++) {
       var f = false;
       _.each(design.allDirections(), function(dir) {
           var p = design.navigate(board.player, group[i], dir);
           if (p !== null) {
               var piece = board.getPiece(p);
               if ((piece !== null) && (piece.player == board.player)) {
                   if (piece.type == 0) {
                       f = true;
                       return;
                   }
                   if (_.indexOf(group, p) < 0) {
                       group.push(p);
                   }
               }
           }
       });
       if (f) return true;
  }
  return false;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if ((move.actions.length == 1) && (move.actions[0][0] === null) && (move.actions[0][1] !== null)) {
          var pos = move.actions[0][1][0];
          if (!isAlive(design, board, [ pos ])) {
              move.failed = true;
          }
      }
  });
  CheckInvariants(board);
}

})();
