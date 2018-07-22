(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "passive-chess-goal") {
     checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  if (!_.isUndefined(board.move) && !_.isUndefined(board.parent) && board.move.isSimpleMove()) {
      var pos = board.move.actions[0][1][0];
      var piece = board.parent.getPiece(pos);
      if ((piece !== null) && (piece.type == 0)) {
          return 1;
      }
  }
  var enemies = 0;
  var friends = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == 0)) {
          if (piece.player != player) {
              enemies++;
          } else {
              friends++;
          }
      }
  });
  if (enemies < 2) {
      return 1;
  }
  if (friends < 2) {
      return -1;
  }
  return checkGoals(design, board, player);
}

})();
