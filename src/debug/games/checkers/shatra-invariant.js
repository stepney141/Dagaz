(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "shatra-invariant") {
     checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var kings = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.player != player)) {
          if (piece.type == 1) {
              kings++;
          }
      }
  });
  if (kings == 0) {
      return 1;
  } else {
      return checkGoals(design, board, player);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var moves  = [];
  var isKing = false;
  _.each(board.moves, function(m) {
      if (m.actions.length > 1) {
          moves.push(m);
          var pos = null;
          _.each(m.actions, function(a) {
               if ((a[0] !== null) && (a[1] !== null) && (pos === null)) {
                   pos = a[0][0];
                   var piece = board.getPiece(pos);
                   if ((piece !== null) && (piece.type == 1)) {
                       isKing = true;
                   }
               }
          });
      }
  });
  if (isKing) {
      moves = [];
      _.each(board.moves, function(m) {
          if (m.actions.length > 0) {
              var piece = null;
              _.each(m.actions, function(a) {
                   if ((a[0] !== null) && (a[1] !== null) && (piece === null)) {
                       piece = board.getPiece(a[0][0]);
                   }
              });
              if ((piece !== null) && (piece.type == 1)) {
                  moves.push(m);
                  var n = _.chain(m.actions).map(function(a) { return a[3]; }).max().value();
                  for (var i = 1; i < n; i++) {
                      var move = Dagaz.Model.createMove();
                      _.each(m.actions, function (a) {
                          if (a[3] <= i) {
                              move.actions.push(a);
                          }
                      });
                      moves.push(move);
                  }
              }
          }
      });
  }
  if (moves.length > 0) {
      board.moves = moves;
  }
  CheckInvariants(board);
}

})();
