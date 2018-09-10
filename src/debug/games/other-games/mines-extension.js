(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "mines-extension") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.isDropMove()) {
          var pos = move.actions[0][1][0];
          var piece = board.getPiece(pos);
          if (piece !== null) {
              if (piece.type == 9) {
                  piece = piece.promote(10);
                  move.dropPiece(pos, piece);
                  move.sound = 1;
              } else {
                  move.failed = true;
              }
          } else {
              var cnt = 0;
              _.each(design.allDirections(), function(dir) {
                  var p = design.navigate(board.player, pos, dir);
                  if (p !== null) {
                      var piece = board.getPiece(p);
                      if ((piece !== null) && (piece.type >= 9)) cnt++;
                  }
              });
              move.dropPiece(pos, Dagaz.Model.createPiece(cnt, 1));
              if (cnt == 0) {
                  var group = [ pos ];
                  for (var i = 0; i < group.length; i++) {
                       if (board.getPiece(group[i]) !== null) continue;
                       if (i > 0) {
                           cnt = 0;
                           _.each(design.allDirections(), function(dir) {
                               var p = design.navigate(board.player, group[i], dir);
                               if (p !== null) {
                                   var piece = board.getPiece(p);
                                   if ((piece !== null) && (piece.type > 8)) cnt++;
                               }
                           });
                           move.dropPiece(group[i], Dagaz.Model.createPiece(cnt, 1));
                       }
                       if (cnt > 0) continue;
                       _.each(design.allDirections(), function(dir) {
                           var p = design.navigate(board.player, group[i], dir);
                           if ((p !== null) && (_.indexOf(group, p) < 0)) {
                               group.push(p);
                           }
                       });
                  }
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
