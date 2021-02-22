(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "adiuh-checkers-restriction") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var pos = board.getValue(0);
  if (pos !== null) {
      var moves = [];
      _.each(board.moves, function(move) {
          from = null; to = null;
          _.each(move.actions, function(a) {
               if (a[0] === null) return;
               if (a[1] === null) return;
               if (a[0][0] == a[1][0]) return;
               if (from === null) from = a[0][0];
               to = a[1][0];
          });
          if (from === null) return;
          if (to === null) return;
          if (from == pos) {
              var q = board.getValue(1);
              if (q !== null) {
                  var f = false;
                  _.each(design.allDirections(), function(dir) {
                      var p = design.navigate(board.player, pos, dir);
                      while (p !== null) {
                          if (p == q) f = true;
                          p = design.navigate(board.player, p, dir);
                      }
                  });
                  if (f) return;
              }
              moves.push(move);
          }
      });
      if (moves.length > 0) {
          board.moves = moves;
      }
  }
  CheckInvariants(board);
}

})();
