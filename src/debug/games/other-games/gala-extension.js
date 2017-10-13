(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gala-extension") {
     checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var design = Dagaz.Model.design;
  var king   = design.getPieceType("Gala");
  var fa     = 0;
  var ea     = 0;
  var fc     = 0;
  var ec     = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == king)) {
          if (design.inZone(0, player, pos)) {
              if (piece.player == player) {
                  fc++;
              } else {
                  ec++;
              }
          }
          if (piece.player == player) {
              fa++;
          } else {
              ea++;
          }
      }
  });
  if ((fc == 2) || (ea == 0)) {
      return 1;
  }
  if ((ec == 2) || (fa == 0)) {
      return -1;
  }
  if ((fa == 1) && (ea == 1)) {
      return 0;
  }
  return checkGoals(design, board, player);
}

var noEnemy = function(design, board) {
  var r = true;
  _.chain(design.allPositions())
   .filter(function(pos) {
        return design.inZone(0, board.player, pos);
    })
   .each(function(pos) {
        var piece = board.getPiece(pos);
        if ((piece !== null) && (piece.player != board.player)) {
            r = false;
        }
    });
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var horsa  = design.getPieceType("Horsa");
  var korna  = design.getPieceType("Korna");
  var kampa  = design.getPieceType("Kampa");
  _.each(board.moves, function(m) {
      if ((m.actions.length == 1) && (m.actions[0][0] !== null) && (m.actions[0][1] !== null)) {
          var pos    = m.actions[0][0][0];
          var target = m.actions[0][1][0];
          var piece  = board.getPiece(pos);
          if ((piece !== null) && design.inZone(0, board.player, target)) {
              if ((piece.type == horsa) || (piece.type == korna)) {
                  m.failed = true;
              }
              if ((piece.type == kampa) && noEnemy(design, board)) {
                  m.failed = true;
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
