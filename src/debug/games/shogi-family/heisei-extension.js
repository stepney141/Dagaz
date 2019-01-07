(function() {

var dropLimit   = null;
var sharedLimit = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "heisei-extension") {
      dropLimit = Math.abs(value);
      sharedLimit = (value < 0);
  } else {
      checkVersion(design, name, value);
  }
}

var isFriendNeighbour = function(design, board, player, pos) {
  var r = false;
  _.each(design.allDirections(), function(dir) {
      var p = design.navigate(player, pos, dir);
      if (p !== null) {
          var piece = board.getPiece(p);
          if ((piece !== null) && (piece.player == player)) {
              r = true;
          }
      }
  });
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var ko = [];
  _.each(board.moves, function(move) {
      if (move.isDropMove()) {
          var pos = move.actions[0][1][0];
          if (isFriendNeighbour(design, board, board.player, pos)) {
              if (dropLimit !== null) {
                  var player = board.player - 1;
                  if (sharedLimit) {
                      player = 0;
                  }
                  var v = board.getValue(player);
                  if ((v !== null) && (v >= dropLimit)) {
                      move.failed = true;
                      return;
                  }
                  move.addValue(player, 1);
              }
              ko.push(pos);
          } else {
              move.failed = true;
          }
      }
  });
  if (ko.length > 0) {
      board.ko = ko;
  }
  CheckInvariants(board);
}

})();
