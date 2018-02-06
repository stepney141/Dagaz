(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "watermelon-extension") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.isSimpleMove()) {
          var pos = move.actions[0][1][0];
          _.each(design.allDirections(), function(dir) {
              var p = design.navigate(board.player, pos, dir);
              if ((p !== null) && (p != pos)) {
                  var piece = board.getPiece(p);
                  if ((piece !== null) && (piece.player != board.player)) {
                       var f = true;
                       _.each(design.allDirections(), function(d) {
                           var q = design.navigate(board.player, p, d);
                           if ((q === null) || (q == pos)) return;
                           var piece = board.getPiece(q);
                           if ((piece !== null) && (piece.player == board.player)) return;
                           f = false;
                       });
                       if (f) {
                           move.capturePiece(p);
                       }
                  }
              }
          });
      }
  });
  CheckInvariants(board);
}

})();
