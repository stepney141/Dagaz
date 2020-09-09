(function() {

var once = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "chess-go-drops-mobile") {
      if (value == "once") once = true;
  } else {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = board.game.design;
  var size = Dagaz.Model.WIDTH * Dagaz.Model.WIDTH;
  var positions = []; var f = false;
  for (var pos = 0; pos < size; pos++) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.player == board.player)) {
          if (piece.type == 7) f = true;
          if (piece.type == 0) positions.push(pos);
      }
  }
  if (positions.length > 0) {
      for (var pos = size; pos < design.positions.length; pos++) {
           var piece = board.getPiece(pos);
           if ((piece !== null) && (piece.player == board.player)) {
                if (f || (piece.type == 7)) {
                    _.each(positions, function(p) {
                         var move = Dagaz.Model.createMove(0);
                         move.movePiece(pos, p, piece);
                         if (once && (_.indexOf([4, 5], +piece.type) >= 0)) {
                             for (var q = size; q < design.positions.length; q++) {
                                  if (q != pos) {
                                      var target = board.getPiece(q);
                                      if ((target !== null) && (target.player == board.player) && (_.indexOf([4, 5], +target.type) >= 0)) {
                                           move.capturePiece(q);
                                      }
                                  }
                             }
                         }
                         board.moves.push(move);
                    });
                }
           }
      }
  }
  CheckInvariants(board);
}

})();
