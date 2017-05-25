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
  var color  = -1;
  if (!_.isUndefined(board.lastt)) {
      color = getColor(board.player, board.lastt);
      var piece = board.getPiece(board.lastt);
      if ((piece !== null) && (piece.player == board.player)) {
          var enemy = _.chain(_.keys(board.pieces))
           .filter(function(pos) {
               return board.getPiece(pos) !== null;
            })
           .filter(function(pos) {
               return ((board.getPiece(pos).type / 2) | 0) == color;
            })
           .filter(function(pos) {
               return board.getPiece(pos).player != board.player;
            })
           .first()
           .value();
          color = getColor(board.player, enemy); 
      }
  }
  if (color >= 0) {
      _.chain(board.moves)
       .filter(function(move) {
            return move.actions.length > 0;
        })
       .filter(function(move) {
            return move.actions[0][0] !== null;
        })
       .each(function(move) {
            var pos = move.actions[0][0][0];
            var piece = board.getPiece(pos);
            if ((piece !== null) && (((piece.type / 2) | 0) != color)) {
                move.failed = true;
            }
        });
  }
  _.chain(board.moves)
   .filter(function(move) {
        return !move.failed;
    })
   .each(function(move) {
        var value = board.getValue(0);
        if (value !== null) {
            if (value != board.player) {
                move.failed = true;
            }
            if (move.actions.length == 1) {
                move.setValue(0, null);
            }
        }
        if (move.actions.length == 2) {
            move.setValue(0, board.player);
        }
    });
  CheckInvariants(board);
}

})();
