(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "qxo-extension") {
     checkVersion(design, name, value);
  }
}

if (!_.isUndefined(Dagaz.Controller.addSound)) {
    Dagaz.Controller.addSound(0, "../../sounds/step.ogg");
}

Dagaz.View.getDropPieces = function(design, board, pos) {
  var t = 0;
  while ((t < 3) && (board.reserve[t][board.player] == 0)) {
      t++;
  }
  return [ Dagaz.Model.createPiece(t, board.player) ];
}

var decReserve = function(piece, move) {
  move.actions.push([ null, null, [{
      exec: function(board) {
          if (!_.isUndefined(board.reserve) &&
              !_.isUndefined(board.reserve[piece.type]) && 
              !_.isUndefined(board.reserve[piece.type][piece.player]) &&
              (board.reserve[piece.type][piece.player] > 0)) {
              board.reserve[piece.type][piece.player]--;
          }
      }
  }], 1]);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.isDropMove()) {
          var pos   = move.actions[0][1][0];
          var piece = move.actions[0][2][0];
          var p = design.navigate(1, pos, 8);
          while (p !== null) {
              if (board.getPiece(p) === null) {
                  decReserve(piece, move);
                  move.actions[0][2][0] = [Dagaz.Model.createPiece(8, board.player)];
                  move.dropPiece(p, piece.promote(+piece.type + 4));
                  move.capturePiece(pos);
                  return;
              }
              p = design.navigate(1, p, 8);
          }
      }
  });
  CheckInvariants(board);
}

})();
