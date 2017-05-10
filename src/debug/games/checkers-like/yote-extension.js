(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "yote-extension") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  for (var i in board.moves) {
       var m = board.moves[i];
       for (var j in m.actions) {
            fp = m.actions[j][0];
            tp = m.actions[j][1];
            pn = m.actions[j][3];
            if ((fp !== null) && (tp === null)) {
                var captured = [];
                var len = design.positions.length;
                for (var p = 0; p < len; p++) {
                    if (p != fp[0]) {
                       var piece = board.getPiece(p);
                       if ((piece !== null) && (piece.player != board.player)) {
                           captured.push(p);
                       }
                    }
                }
                if (captured.length > 0) {
                    m.actions.push([captured, null, null, pn]);
                }
                break;
            }
       }
  }
  CheckInvariants(board);
}

})();
