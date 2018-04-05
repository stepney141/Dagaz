(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "go-extension") {
     checkVersion(design, name, value);
  }
}

var expand = function(design, board, group, player, captured) {
   var r = 0;
   for (var i = 0; i < group.length; i++) {
        var pos = group[i];
        _.each(design.allDirections(), function(dir) {
            var p = design.navigate(player, pos, dir);
            if (p !== null) {
                var piece = board.getPiece(p);
                if (piece !== null) {
                    if ((piece.player == player) && (_.indexOf(group, p) < 0)) {
                        group.push(p);
                    }
                    if (!_.isUndefined(captured) && (_.indexOf(captured, p) >= 0)) {
                        r++;
                    }
                } else {
                    r++;
                }
            }
        });
   }
   return r;
}

var capture = function(move, group) {
   _.each(group, function(pos) {
        move.capturePiece(pos);
   });
}

var change = function(move, board, group, dame) {
   _.each(group, function(pos) {
        var piece = board.getPiece(pos);
        if (piece !== null) {
            piece = piece.setValue(0, dame);
            move.movePiece(pos, pos, piece);
        }
   });
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if ((move.actions.length == 1) && (move.actions[0][1] !== null) && (move.actions[0][2] !== null)) {
           var dame = 0;
           var pos  = move.actions[0][1][0];
           var captured = []; var group = []; var enemies = []; 
           _.each(design.allDirections(), function(dir) {
               var p = design.navigate(board.player, pos, dir);
               if ((p !== null) && (_.indexOf(enemies, p) < 0)) {
                   var piece = board.getPiece(p);
                   if (piece !== null) {
                       if (piece.getValue(0) === null) {
                           move.failed = true;
                           return;
                       }
                       var value = +piece.getValue(0);
                       if (piece.player == board.player) {
                           dame += value - 1;
                           group.push(p);
                       } else {
                           if (value <= 1) {
                               captured.push(p);
                               expand(design, board, captured, piece.player);
                               _.each(captured, function(q) {
                                    enemies.push(q);
                               });
                               dame++;
                           } else {
                               var g = [ p ];
                               expand(design, board, g, piece.player);
                               _.each(g, function(q) {
                                    enemies.push(q);
                               });
                               change(move, board, g, value - 1);
                           }
                       }
                   } else {
                       dame++;
                   }
               }
           });
           expand(design, board, group, board.player);
           if (captured.length > 0) {
               capture(move, captured);
               var friends = [];
               _.each(captured, function(e) {
                   _.each(design.allDirections(), function(dir) {
                       var p = design.navigate(board.player, e, dir);
                       if ((p !== null) && (_.indexOf(group, p) < 0) && (_.indexOf(friends, p) < 0)) {
                            var g = [ p ];
                            var d = expand(design, board, g, board.player, captured);
                            _.each(g, function(q) {
                                friends.push(q);
                                var piece = board.getPiece(q);
                                if ((piece !== null) && (piece.player == board.player)) {
                                     piece = piece.setValue(0, d);
                                     move.movePiece(q, q, piece);
                                }
                            });
                       }
                   });
               });
           } else {
               if (dame == 0) {
                   move.failed = true;
                   return;
               }
           }
           change(move, board, group, dame);
           var piece = move.actions[0][2][0].setValue(0, dame);
           move.actions[0][2] = [ piece ];
      }
  });
  CheckInvariants(board);
}

})();
