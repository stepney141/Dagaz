(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "ming-mang-extension") {
      checkVersion(design, name, value);
  }
}

var done = function(design, board, pos, dir, trace, captured) {
  var p = design.navigate(board.player, pos, dir);
  if (p !== null) {
      var piece = board.getPiece(p);
      if (piece !== null) {
          if (piece.player == board.player) {
              _.each(trace, function(pos) {
                  if (_.indexOf(captured, pos) < 0) {
                      captured.push(pos);
                  }
              });
          } else {
              trace.push(p);
              done(design, board, p, dir, trace, captured);
              trace.pop();
          }
      }
  }
}

var capture = function(design, board, pos, dir, dirs, trace, captured) {
  var p = design.navigate(board.player, pos, dir);
  if (p !== null) {
      var piece = board.getPiece(p);
      if (piece !== null) {
          if (piece.player == board.player) {
              _.each(trace, function(pos) {
                  if (_.indexOf(captured, pos) < 0) {
                      captured.push(pos);
                  }
              });
          } else {
              trace.push(p);
              capture(design, board, p, dir, dirs, trace, captured);
              if (trace.length > 1) {
                  _.each(dirs, function(dir) {
                      var pos = design.navigate(board.player, p, dir);
                      if (pos !== null) {
                          var piece = board.getPiece(pos);
                          if ((piece !== null) && (piece.player != board.player)) {
                              trace.push(pos);
                              done(design, board, pos, dir, trace, captured);
                              trace.pop();
                          }
                      }
                  });
              }
              trace.pop();
          }
      }
  }
}

var Extension = Dagaz.Model.Extension;

Dagaz.Model.Extension = function(board) {
  var design = Dagaz.Model.design;
  var n  = design.getDirection("n");  var w  = design.getDirection("w");
  var s  = design.getDirection("s");  var e  = design.getDirection("e");
  _.each(board.moves, function(move) {
      if (move.isSimpleMove()) {
          var pos = move.actions[0][1][0];
          var captured = [];
          var trace = [];
          capture(design, board, pos, n, [w, e], trace, captured);
          capture(design, board, pos, e, [n, s], trace, captured);
          capture(design, board, pos, s, [w, e], trace, captured);
          capture(design, board, pos, w, [n, s], trace, captured);
          _.each(captured, function(pos) {
              var piece = board.getPiece(pos);
              if (piece !== null) {
                  move.movePiece(pos, pos, piece.changeOwner(board.player));
              }
          });
      }
  });
  Extension(board);
}

})();
