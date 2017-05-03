(function() {

var checkVersion = Dagaz.Model.checkVersion;
var superKo = null;
var numKo = 1;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "ko") {
     if (value == "true") {
         superKo = 0;
     }
     if (value == "position") {
         superKo = 1;
     }
     if (value == "situation") {
         superKo = 2;
     }
     if (value == "3") {
         superKo = 2;
         numKo   = 2;
     }
  } else {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  if (superKo !== null) {
      for (var i = 0; i < board.moves.length; i++) {
           var r = 0;
           var m = board.moves[i];
           var b = board.apply(m);
           if (superKo == 0) {
               if (board.parent) {
                   if (b.zSign == board.parent.zSign) {
                       r = 1;
                   }
               }
           } else {
               var p = b;
               while (p.parent) {
                   var q = p.parent;
                   if ((superKo == 1) || (q.player == b.player)) {
                       if (b.zSign == q.zSign) {
                           r++;
                           if ((numKo < 2) || (r >= numKo)) {
                               break;
                           }
                       }
                   }
                   p = q;
               }
           }
           if (r >= numKo) {
               m.failed = true;
           }
      }
  }
  CheckInvariants(board);
}

})();
