(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "dablot-extension") {
      checkVersion(design, name, value);
  }
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var v = design.price[piece.type];
          var bonus = 8;
          if (design.inZone(0, player, pos)) {
              bonus -= 3;
          }
          if (design.inZone(1, player, pos)) {
              bonus -= 4;
          }
          if (design.inZone(2, player, pos)) {
              bonus -= 5;
          }
          v += bonus;
          if (!Dagaz.AI.isFriend(player, piece.player)) {
              v = -v;
          }
          r += v;
      }
  });
  return r;
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

var saveMove = function(moves, move, pn, board, piece) {
  var m = Dagaz.Model.createMove();
  var notFound = true;
  _.chain(move.actions)
   .filter(function(action) {
        return action[3] < pn;
    })
   .each(function(action) {
        if ((action[0] !== null) && (action[1] === null)) {
            var p = board.getPiece(action[0][0]);
            if ((p !== null) && (p.type < piece.type)) {
                notFound = false;
            }
        }
        m.actions.push([ action[0], action[1], action[2], action[3] ]);
    });
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
                         saveMove(moves, move, action[3], board, piece);
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
