(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "alice-chess-extension") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      _.each(move.actions, function(a) {
          var piece = board.getPiece(a[0][0]);
          if (piece !== null) {
              var m = piece.type % 2;
              var target = board.getPiece(a[1][0]);
              if (target !== null) {
                  var t = target.type % 2;
                  if (m != t) {
                      move.failed = true;
                      return;
                  }
              }
              if (m == 0) {
                  piece = piece.promote(piece.type + 1);
              } else {
                  piece = piece.promote(piece.type - 1);
              }
              if ((a[2] !== null) && (a[2][0].type == 8) && (m == 0)) {
                  piece = piece.promote(a[2][0].type + 1);
              }
              a[2] = [ piece ];
          }
      });
  });
  CheckInvariants(board);
}

})();
