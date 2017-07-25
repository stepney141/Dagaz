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

var saveMove = function(moves, move, pn) {
  var m = Dagaz.Model.createMove();
  _.chain(move.actions)
   .filter(function(action) {
        return action[3] < pn;
    })
   .each(function(action) {
        m.actions.push([ action[0], action[1], action[2], action[3] ]);
    });
  var notFound = true;
  _.each(moves, function(n) {
      if (n.toString() == m.toString()) {
          notFound = false;
      }
  });
  if (notFound) {
      moves.push(m);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var moves = [];
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
            .each(function(action) {
                 var p = board.getPiece(action[0][0]);
                 if ((p === null) || (p.type < piece.type)) {
                     if (action[3] > 1) {
                         saveMove(moves, move, action[3]);
                     }
                     move.failed = true;
                 }
             });
         }
    });
  _.each(moves, function(move) {
      board.moves.push(move);
  });
  CheckInvariants(board);
}

})();
