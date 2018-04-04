(function() {

var suicideMode = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "go-extension") {
     if (value == "suicide") {
         suicideMode = true;
     }
  } else {
     checkVersion(design, name, value);
  }
}

var expand = function(design, board, group, player) {
   for (var i = 0; i < group.length; i++) {
        var pos = group[i];
        _.each(design.allDirections(), function(dir) {
            var p = design.navigate(player, pos, dir);
            if (p !== null) {
                var piece = board.getPiece(p);
                if ((piece !== null) && (piece.player == player)) {
                    if (_.indexOf(group, p) < 0) group.push(p);
                }
            }
        });
   }
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
           } else {
               if (dame == 0) {
                   if (!suicideMode) {
                       move.failed = true;
                   }
                   capture(move, group);
                   move.capturePiece(pos);
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
