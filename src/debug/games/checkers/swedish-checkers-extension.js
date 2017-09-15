(function() {

var strictMode = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "swedish-checkers-extension") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var swt = design.getDirection("swt");
  _.chain(board.moves)
   .filter(function(move) {
        return move.actions.length > 1;
    })
   .each(function(move) {
        var captured = _.filter(move.actions, function(a) {
            return (a[0] !== null) && (a[1] === null);
        }).length;
        if (captured > 0) {
            var pn     = captured;
            var pos    = 1;
            var player = board.player + 2;
            if (player > 4) {
                player -= 4;
            }
            var piece  = Dagaz.Model.createPiece(0, player);
            while (captured > 0) {
                pos = design.navigate(board.player, pos, swt);
                if (pos === null) {
                    break;
                }
                if (board.getPiece(pos) === null) {
                    move.dropPiece(pos, piece, pn);
                    captured--;
                }
            }
        } else {
            move.failed = true;
        }
    });
  CheckInvariants(board);
}

})();
