(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gess-extension") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var moves  = [];
  _.each(board.moves, function(move) {
      if ((move.actions.length > 1) && (move.actions[1][0] !== null) && (move.actions[1][1] !== null)) {
          var pos = move.actions[1][0][0] - Dagaz.Model.BOARD_SIZE;
          var target = move.actions[1][1][0] - Dagaz.Model.BOARD_SIZE;
          var dir = design.findDirection(pos, target);
          if (dir !== null) {
              var c = 2;
              var piece = board.getPiece(pos);
              if (piece !== null) {
                  c = 17;
                  move.movePiece(pos, target, piece);
              } else {
                  if (board.getPiece(target) !== null) {
                      move.capturePiece(target);
                  }
              }
              var init = [];
              _.each(design.allDirections(), function(d) {
                  var p = design.navigate(board.player, pos, d);
                  if (p !== null) {
                      init.push(p);
                  }
              });
              _.each(design.allDirections(), function(d) {
                  var p = design.navigate(board.player, pos, d);
                  if (p === null) return;
                  var q = design.navigate(board.player, p, dir);
                  if (q === null) return;
                  var piece = board.getPiece(p);
                  if (piece !== null) {
                      move.movePiece(p, q, piece);
                  } else {
                      if ((_.indexOf(init, q) < 0) && (board.getPiece(q) !== null)) {
                          move.capturePiece(q);
                      }
                  }
              });
              moves.push(move);
              for (;c > 0; c--) {
                  target = design.navigate(board.player, target, dir);
                  if (target === null) break;
                  var m = Dagaz.Model.createMove(move.mode);
                  var piece = Dagaz.Model.createPiece(1, board.player);
                  m.dropPiece(pos + Dagaz.Model.BOARD_SIZE, piece);
                  m.movePiece(pos + Dagaz.Model.BOARD_SIZE, target + Dagaz.Model.BOARD_SIZE, piece);
                  var piece = board.getPiece(pos);
                  if (piece !== null) {
                      m.movePiece(pos, target, piece);
                  } else {
                      if (board.getPiece(target) !== null) {
                          m.capturePiece(target);
                      }
                  }
                  var isBreaked = false;
                  if ((board.getPiece(target) !== null) && (_.indexOf(init, target) < 0)) {
                      isBreaked = true;
                  }
                  _.each(design.allDirections(), function(d) {
                      var p = design.navigate(board.player, pos, d);
                      if (p === null) return;
                      var q = design.navigate(board.player, target, d);
                      if (q === null) return;
                      if ((board.getPiece(q) !== null) && (_.indexOf(init, q) < 0)) {
                          isBreaked = true;
                      }
                      var piece = board.getPiece(p);
                      if (piece !== null) {
                          m.movePiece(p, q, piece);
                      } else {
                          if ((_.indexOf(init, q) < 0) && (board.getPiece(q) !== null)) {
                              m.capturePiece(q);
                          }
                      }
                  });
                  moves.push(m);
                  if (isBreaked) break;
              }
          }
      }
  });
  board.moves = moves;
  CheckInvariants(board);
}

})();
