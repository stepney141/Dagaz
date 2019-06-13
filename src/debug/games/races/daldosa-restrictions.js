(function() {

Dagaz.Model.passForcedDraw = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "daldosa-restrictions") {
      checkVersion(design, name, value);
  }
}

if (!_.isUndefined(Dagaz.Controller.addSound)) {
    Dagaz.Controller.addSound(1, "../../sounds/slide.ogg", true);
    Dagaz.Controller.addSound(10, "../../sounds/dice.wav", true);
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var e = 0; var f = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type < 2)) {
          if (piece.player != player) {
              e++;
          } else {
              f++;
          }
      }
  });
  if (e < 1) return 1;
  if (f < 1) return -1;
  return checkGoals(design, board, player);
}

var checkDice = function(design, board, pos, move) {
  var piece = board.getPiece(pos);
  if (piece === null) return false;
  if (design.price[piece.type] != move.mode) return false;
  move.capturePiece(pos);
  return true;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.mode == 0) return;
      if (!checkDice(design, board, 0, move) && !checkDice(design, board, 1, move)) {
          move.failed = true;
      }
  });
  CheckInvariants(board);
}

})();
