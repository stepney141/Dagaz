(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "chess-go-extension") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!_.isUndefined(move.failed)) return;
      var b = board.apply(move);
      var pos = move.actions[0][1][0];
      var isSuicide = true;
      var done = [];
      _.each([1, 3, 4, 7], function(dir) {
          var p = design.navigate(board.player, pos, dir);
          if ((p === null) || (_.indexOf(done, p) >= 0)) return;
          var piece = b.getPiece(p);
          if (piece === null) {
               isSuicide = false;
               return;
          }
          var group = [p]; var dame = 0;
          for (var i = 0; i < group.length; i++) {
               _.each([1, 3, 4, 7], function(dir) {
                    var q = design.navigate(board.player, group[i], dir);
                    if ((q === null) || (_.indexOf(group, q) >= 0)) return;
                    var x = b.getPiece(q);
                    if (x === null) {
                        dame++;
                        return;
                    }
                    if (x.player != piece.player) return;
                    group.push(q);
                    if (x.type == 6) {
                        _.each(design.allPositions(), function(p) {
                             var piece = b.getPiece(p);
                             if (piece === null) return;
                             if (piece.player != x.player) return;
                             if (piece.type != x.type) return;
                             if (p == q) return;
                             group.push(p);
                        });
                    }
               });
          }
          if (piece.player == board.player) {
              if (dame > 0) isSuicide = false;
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
      if ((move.actions.length > 1) && (move.actions[1][0] !== null) && (move.actions[1][1] !== null)) {
          var pos = move.actions[1][1][0];
          var piece = b.getPiece(pos);
          if ((piece !== null) && (piece.player != board.player)) {
               var done = [];
               _.each([1, 3, 4, 7], function(dir) {
                    var p = design.navigate(board.player, pos, dir);
                    if ((p === null) || (_.indexOf(done, p) >= 0)) return;
                    var x = b.getPiece(p);
                    if ((x === null) || (x.player != board.player)) return;
                    var group = [p]; var dame = 0;
                    for (var i = 0; i < group.length; i++) {
                        _.each([1, 3, 4, 7], function(dir) {
                             var q = design.navigate(board.player, group[i], dir);
                             if ((q === null) || (_.indexOf(group, q) >= 0)) return;
                             var x = b.getPiece(q);
                             if (x === null) {
                                 dame++;
                                 return;
                             }
                             if (x.player != board.player) return;
                             group.push(q);
                             if (x.type == 6) {
                                 _.each(design.allPositions(), function(p) {
                                      var piece = b.getPiece(p);
                                      if (piece === null) return;
                                      if (piece.player != x.player) return;
                                      if (piece.type != x.type) return;
                                      if (p == q) return;
                                      group.push(p);
                                 });
                             }
                        });
                    }
                    if (dame == 0) isSuicide = true;
                    done = _.union(done, group);
               });
          }
      }
      if (isSuicide) move.failed = true;
  });
  CheckInvariants(board);
}

})();
