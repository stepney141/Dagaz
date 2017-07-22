(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "dablot-extension") {
      checkVersion(design, name, value);
  }
}

Dagaz.Model.checkGoals = function(design, board, player) {
  var kings = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.player != player) && (piece.type == 0)) {
          kings++;
      }
  });
  var enemies = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.player != player)) {
          enemies++;
      }
  });
  if ((kings == 0) || (enemies < 2))  {
      return 1;
  } else {
      return 0;
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  _.chain(board.moves)
   .filter(function(move) {
       return move.actions.length > 1;
    })
   .each(function(move) {
       var piece = null;
       _.chain(move.actions)
        .filter(function(action) {
             return action[3] == 1;
         })
        .filter(function(action) {
             return (action[0] !== null) && (action[1] !== null);
         })
        .each(function(action) {
             piece = board.getPiece(action[0][0]);
         });
         if ((piece !== null) && (piece.type > 0)) {
           _.chain(move.actions)
            .filter(function(action) {
                 return (action[0] !== null) && (action[1] === null);
             })
            .map(function(action) {
                 return action[0][0];
             })
            .each(function(pos) {
                 var p = board.getPiece(pos);
                 if ((p === null) || (p.type < piece.type)) {
                     move.failed = true;
                 }
             });
         }
    });
  CheckInvariants(board);
}

})();
