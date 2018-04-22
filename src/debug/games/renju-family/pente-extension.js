(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "pente-extension") {
     checkVersion(design, name, value);
  }
}

var getPiece = function(board, pos) {
  if (pos === null) return null;
  return board.getPiece(pos);
}

var getLine = function(design, board, p, dir, captured) {
  var r = 1;
  var p = design.navigate(board.player, pos, dir);
  while (p !== null) {
      if (_.indexOf(captured, p) >= 0) break;
      var piece = board.getPiece(p);
      if (piece === null) break;
      if (piece.player == board.player) break;
      p = design.navigate(board.player, p, dir);
      r++;
  }
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var dirs = [];
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  dirs.push(design.getDirection("s")); dirs.push(design.getDirection("sw"));
  dirs.push(design.getDirection("w")); dirs.push(design.getDirection("nw"));
  _.each(board.moves, function(move) {
      var captured = [];
      if ((move.actions.length > 0) && (move.actions[0][0] === null) && (move.actions[0][1] !== null)) {
          var pos = move.actions[0][1][0];
          _.each(design.allDirections(), function(dir) {
              var ix = _.indexOf(dirs, dir);
              if (ix > 3) ix -= 4;
              var p = design.navigate(board.player, pos, dir);
              var piece = getPiece(board, p);
              if ((piece !== null) && (piece.player != board.player)) {
                  var v = +piece.getValue(ix);
                  if ((v !== null) && (v == 2)) {
                      var q = design.navigate(board.player, p, dir);
                      piece = getPiece(board, q);
                      if ((piece !== null) && (piece.player != board.player)) {
                          var r = design.navigate(board.player, q, dir);
                          piece = getPiece(board, r);
                          if ((piece !== null) && (piece.player == board.player)) {
                              captured.push(p);
                              captured.push(q);
                          }
                      }
                  }
              }
          });
      }
      var positions = [];
      var pieces = [];
      _.each(captured, function(p) {
          _.each(design.allDirections(), function(dir) {
              var ix = _.indexOf(dirs, dir);
              if (ix > 3) ix -= 4;
              var p = design.navigate(board.player, pos, dir);
              if ((p !== null) && (_.indexOf(captured, p) < 0)) {
                  var piece = board.getPiece(p);
                  if ((piece !== null) && (piece.player != board.player)) {
                      var v = getLine(design, board, p, dir, captured);
                      while (p !== null) {
                          var piece = board.getPiece(p);
                          if (piece === null) break;
                          if (piece.player == board.player) break;
                          var k = _.indexOf(positions, p);
                          if (k < 0) {
                              k = positions.length;
                              positions.push(p);
                              pieces.push(piece);
                          } else {
                              piece = pieces[k];
                          }
                          pieces[k] = piece.setValue(ix, v);
                          p = design.navigate(board.player, p, dir);
                      }
                  }
              }
          });
          move.capturePiece(p);
      });
      for (var i = 0; i < positions.length; i++) {
          move.movePiece(positions[i], positions[i], pieces[i]);
      }
  });
  CheckInvariants(board);
}

})();
