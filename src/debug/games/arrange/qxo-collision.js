(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "qxo-collision") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  if (!_.isUndefined(board.move) && (board.move.mode == 4)) {
      board.moves = [];
  } else {
      _.each(board.moves, function(move) {
          if (move.isSimpleMove()) {
              var pos = move.actions[0][0][0];
              var piece = board.getPiece(pos);
              if (piece !== null) {
                  move.actions[0][2] = [piece.promote(+piece.type - 4)];
              }
          }
      });
  }
  CheckInvariants(board);
}

})();
