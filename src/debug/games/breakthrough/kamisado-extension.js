(function() {

Dagaz.View.showHint = function(view) {}

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "kamisado-extension") {
     checkVersion(design, name, value);
  }
}

var getColor = function(player, pos) {
  var design = Dagaz.Model.design;
  return _.chain(_.keys(design.zones))
   .filter(function(zone) {
       if (_.isUndefined(design.zones[zone][player])) return false;
       return Dagaz.find(design.zones[zone][player], +pos) >= 0;
    })
   .min()
   .value();
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var color  = null;
  if (board.lastt !== null) {
      color = getColor(board.player, board.lastt);
      var piece = board.getPiece(board.lastt);
      if (piece.player == board.player) {
          var enemy = _.chain(_.keys(board.pieces))
           .filter(function(pos) {
               return board.getPiece(pos) !== null;
            })
           .filter(function(pos) {
               return board.getPiece(pos).type == color;
            })
           .filter(function(pos) {
               return board.getPiece(pos).player != board.player;
            })
           .first()
           .value();
          color = getColor(board.player, enemy);
      }
  }
  if (color != null) {
      _.chain(board.moves)
       .filter(function(move) {
            return move.actions.length == 1;
        })
       .filter(function(move) {
            return move.actions[0][0] !== null;
        })
       .each(function(move) {
            var pos = move.actions[0][0][0];
            var piece = board.getPiece(pos);
            if (piece !== null) {
                move.failed = piece.type != color;
            }
        });
  }
  CheckInvariants(board);
}

})();
