(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "splut-extension") {
     checkVersion(design, name, value);
  }
}

var closure = Dagaz.Model.closure;

Dagaz.Model.closure = function(board, move, group) {
  if (move.isSimpleMove()) {
      var pos = move.actions[0][0][0];
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == 2)) {
          return group;
      }
  }
  return closure(board, move, group);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var moves = [];
  _.each(board.moves, function(move) {
      if (move.isSimpleMove()) {
          var pos   = move.actions[0][0][0];
          var piece = board.getPiece(pos);
          var dir   = design.findDirection(pos, move.actions[0][1][0]);
          if ((piece !== null) && (dir !== null)) {
              if (piece.type == 0) {
                  _.each(design.allPositions(), function(p) {
                       var stone = board.getPiece(p);
                       if ((stone !== null) && (stone.type == 3)) {
                           var q = design.navigate(board.player, p, dir);
                           if (q !== null) {
                               var enemy = board.getPiece(q);
                               if ((enemy === null) || (enemy.type == 0) || (enemy.type == 1)) {
                                   var m = Dagaz.Model.createMove(move.mode);
                                   m.actions.push(move.actions[0]);
                                   m.movePiece(p, q, stone);
                                   moves.push(m);
                               }
                           }
                       }
                  });
              }
              if (piece.type == 2) {
                  var p = design.navigate(0, pos, dir);
                  if (p !== null) {
                      var stone = board.getPiece(p);
                      if ((stone !== null) && (stone.type == 3)) {
                          var m = Dagaz.Model.createMove(move.mode);
                          m.actions.push(move.actions[0]);
                          m.movePiece(p, pos, stone);
                          moves.push(m);
                      }
                  }
              }
          }
      }
      moves.push(move);
  });
  board.moves = moves;
  CheckInvariants(board);
}

})();
