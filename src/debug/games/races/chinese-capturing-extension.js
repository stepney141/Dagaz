(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "chinese-capturing-extension") {
     checkVersion(design, name, value);
  }
}

if (!_.isUndefined(Dagaz.Controller.addSound)) {
    Dagaz.Controller.addSound(0, "../../sounds/slide.ogg", true);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var t = null;
  _.each(board.moves, function(move) {
      var actions = []; var captured = [];
      _.each(move.actions, function(a) {
           if ((a[0] !== null) && (a[1] === null)) {
               var piece = board.getPiece(a[0]);
               if (piece !== null) {
                   if (t === null) {
                       t = design.navigate(board.player, a[0], 6);
                       while (t !== null) {
                           if (board.getPiece(t) === null) break;
                           t = design.navigate(board.player, t, 12);
                       }
                   } else {
                       t = design.navigate(board.player, t, 12);
                   }
                   if (t !== null) {
                       a[1] = [t];
                       a[2] = [piece.promote(1)];
                       captured.push(a);
                   } else {
                       actions.push(a);
                   }
               }
           } else {
               actions.push(a);
           }
      });
      _.each(captured, function(a) {
           actions.push(a);
      });
      move.actions = actions;
  });
  CheckInvariants(board);
}

})();
