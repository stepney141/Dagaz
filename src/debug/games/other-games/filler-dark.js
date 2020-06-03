(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "filler-dark") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var dark = []; var pattern = null;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (piece.type != 9) return;
      dark.push(pos);
      pattern = piece;
  });
  if (pattern !== null) {
      var group = [];
      _.each(dark, function(pos) {
          _.each(design.allDirections(), function(dir) {
               var p = design.navigate(1, pos, dir);
               if (p === null) return;
               if (_.indexOf(dark, p) >= 0) return;
               if (_.indexOf(group, p) >= 0) return;
               var piece = board.getPiece(p);
               if (piece === null) return;
               if (piece.type >= 7) return;
               group.push(p);
          });
      });
      _.each(board.moves, function(move) {
          _.each(group, function(pos) {
               move.movePiece(pos, pos, pattern);
          });
      });
  }
  CheckInvariants(board);
}

})();
