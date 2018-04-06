(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "atari-go-goal") {
      checkVersion(design, name, value);
  }
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  if ((move.actions.length > 0) && (move.actions[0][1] !== null)) {
      var pos = move.actions[0][1][0];
      var fa  = false; var dm = 0; var eg = false;
      var fs  = 0; var fm = null; em = null; var nn = true;
      for (var dir = 0; dir < design.dirs.length; dir++) {
          var p = design.navigate(board.player, pos, dir);
          if (p !== null) {
              var piece = board.getPiece(p);
              if (piece !== null) {
                  var value = +piece.getValue(0);
                  if (value == 1) {
                      if (piece.player != board.player) return 1000;
                      fa = true;
                  }
                  if (piece.player == board.player) {
                      if ((fm == null) || (fm > value)) fm = value;
                      fs += value - 1;
                  } else {
                      if ((em == null) || (em > value)) em = value;
                  }
                  nn = false;
              } else {
                  dm++;
              }
          } else {
              eg = true;
          }
      }
      if (fa) return 500;
      var r = 0;
      if ((fm !== null) && (fm < 4) && (fs + dm > fm)) r += 200 - fm;
      if ((em !== null) && (em < 4)) r += 100;
      if (eg) r--;
      if (r > 0) return r;
      if (eg || nn) return -1;
      if (em !== null) return 100 - em;
      return 1;
  } else {
      return -1;
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  if (!_.isUndefined(board.move)) {
      var captures = _.filter(board.move.actions, function(a) {
          return (a[0] !== null) && (a[1] === null);
      });
      if (captures.length > 0) {
          if (board.player == player){
              return -1;
          } else {
              return 1;
          }
      }
  }
  return checkGoals(design, board, player);
}

})();
