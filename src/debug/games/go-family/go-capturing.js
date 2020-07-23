(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "go-capturing") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!_.isUndefined(move.failed)) return;
      if (!move.isDropMove()) return;
      var pos = move.actions[0][1][0];
      var isSuicide = true;
      var done = [];
      board.setPiece(pos, move.actions[0][2][0]);
      _.each(design.allDirections(), function(dir) {
          var p = design.navigate(board.player, pos, dir);
          if ((p === null) || (_.indexOf(done, p) >= 0)) return;
          var piece = board.getPiece(p);
          if (piece === null) {
               isSuicide = false;
               return;
          }
          var group = [p]; var dame = 0;
          for (var i = 0; i < group.length; i++) {
               _.each(design.allDirections(), function(dir) {
                    var q = design.navigate(board.player, group[i], dir);
                    if ((q === null) || (_.indexOf(group, q) >= 0)) return;
                    var x = board.getPiece(q);
                    if (x === null) {
                        dame++;
                        return;
                    }
                    if (x.player != piece.player) return;
                    group.push(q);
               });
          }
          if (piece.player == board.player) {
              if (dame > 1) isSuicide = false;
              return;
          }
          if (dame == 0) {
               _.each(group, function(pos) {
                    move.capturePiece(pos);
               });
               isSuicide = false;
          }
          done = _.union(done, group);
      });
      board.setPiece(pos, null);
      if (isSuicide) move.failed = true;
  });
  CheckInvariants(board);
}

})();
