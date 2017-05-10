(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "kauri-extension") {
     checkVersion(design, name, value);
  }
}

var isKauri = function(pieces) {
  for (var i in pieces) {
       if (pieces[i].toString() == "Kauri") {
           return true;
       }
  }
  return false;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  for (var i in board.moves) {
       var a = [];
       var m = board.moves[i];
       for (var j in m.actions) {
           fp = m.actions[j][0];
           tp = m.actions[j][1];
           pc = m.actions[j][2];
           if ((fp !== null) && (tp !== null) && (pc !== null)) {
               var piece = board.getPiece(tp[0]);
               if (pc[0].toString() == "Kauri") {
                   if (!isKauri(piece)) {
                       var dir = design.getDirection("win");
                       if (dir !== null) {
                           var dest = design.navigate(board.player, tp[0], dir);
                           if (dest !== null) {
                               a.push([ tp, [ dest ], null, 1]);
                           }
                       }
                   }
               } else {
                   if (isKauri(piece)) {
                       var dir = design.getDirection("loss");
                       if (dir !== null) {
                           var dest = design.navigate(board.player, tp[0], dir);
                           if (dest !== null) {
                               m.actions[j][1] = [ dest ];
                           }
                       }
                   }
               }
           }
       }
       if (a.length > 0) {
           for (var j in m.actions) {
               a.push(m[j]);
           }
           m.actions = a;
       }
  }
  CheckInvariants(board);
}

})();
