(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "ordo-extension") {
     checkVersion(design, name, value);
  }
}

var getPos = function(move) {
  for (var i in move.actions) {
       var fp = move.actions[i][0];
       var tp = move.actions[i][1];
       if ((fp !== null) && (tp !== null)) {
           return tp[0];
       }
  }
  return null;
}

var buildGroup = function(group, player) {
  var design = Dagaz.Model.design;
  for (var i = 0; i < group.length; i++) {
       var pos = group[i];
       for (var j = 0; j < design.dirs.length; j++) {
            var p = design.navigate(player, pos, design.dirs[j]);
            if (p !== null) {
                var piece = board.getPiece(p);
                if ((piece !== null) && (piece.player == player)) {
                    ix = Model.find(group, p);
                    if (ix < 0) {
                        group.push(p);
                    }
                }
            }
       }
  }
}

var checkCoherence = function(board, player, group) {
  var design = Dagaz.Model.design;
  var len = design.positions.length;
  for (var p = 0; p < len; p++) {
       var piece = board.getPiece(p);
       if ((piece !== null) && (piece.player == player)) {
           ix = Model.find(group, p);
           if (ix < 0) {
               return false;
           }
       }
  }
  return true;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  for (var i in board.moves) {
       var m = board.moves[i];
       var b = board.apply(m);
       var p = getPos(m);
       if (p !== null) {
           var group = [ p ];
           buildGroup(group, board.player);
           if (!checkCoherence(b, board.player, group)) {
               m.failed = true;
           }
       }
  }
  CheckInvariants(board);
}

})();
