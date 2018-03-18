(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "pasang-extension") {
      checkVersion(design, name, value);
  }
}

var checkDir = function(design, board, pos, dir) {
  while (pos !== null) {
      if (board.getPiece(pos) === null) return true;
      pos = design.navigate(board.player, pos, dir);
  }
  return false;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var w = design.getDirection("w"); var gr = design.getDirection("gr"); 
  var e = design.getDirection("e"); var sd = design.getDirection("sd"); 
  var mode = null;
  _.each(board.moves, function(move) {
      if ((move.actions.length == 1) && (move.actions[0][0] !== null) && (move.actions[0][1] === null)) {
          var pos = move.actions[0][0][0];
          if (checkDir(design, board, pos, w) || 
              checkDir(design, board, pos, e) || 
              checkDir(design, board, pos, sd)) {
              move.failed = true;
              return;
          }
          for (var i = 0; i < 4; i++) {
              pos = design.navigate(board.player, pos, gr);
              move.capturePiece(pos);
          }
      }
      if ((mode === null) || (mode > move.mode)) mode = move.mode;
  });
  if (mode !== null) {
      _.each(board.moves, function(move) {
          if (move.mode > mode) {
              move.failed = true;
          }
      });
  }
  CheckInvariants(board);
}

})();
