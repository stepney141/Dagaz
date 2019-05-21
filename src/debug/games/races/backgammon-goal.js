(function() {

var penalty = [11, 12, 14, 15, 15, 17, 6, 6, 3, 3, 2, 3, 0, 0, 1, 1];

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "backgammon-goal") {
      checkVersion(design, name, value);
  }
}

var getPenalty = function(state, ix, eb) {
  var r = 0;
  for (var i = 0; i < penalty.length; i++) {
      if (ix + i >= state.length) {
          if (eb > 0) {
              r += penalty[i];
          }
          break;
      }
      if (state[ix + i] < 0) {
          r += penalty[i];
      }
  }
  return r;
}

Dagaz.AI.eval = function(design, board, player) {
  var pos = Dagaz.Model.stringToPos("a1");
  if (player > 1) {
      pos = Dagaz.Model.stringToPos("a2");
  }
  var inHome = true;
  var state = [];
  while (pos !== null) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var v = piece.getValue(0);
          if ((v === null) || (v == 0)) v = 1;
          if (piece.player != player) {
              v = -v;
          } else {
              if (!design.inZone(0, player, pos)) inHome = false;
          }
          state.push(v);
      } else {
          state.push(0);
      }
      pos = design.navigate(player, pos, 3);
  }
  var eb = 0; var fo = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (design.inZone(2, piece.player, pos)) {
          if (piece.player != player) {
              eb++;
          }
      }
      if (design.inZone(3, piece.player, pos)) {
          if (piece.player == player) {
              fo = piece.getValue(0);
              if ((fo === null) || (fo == 0)) fo = 1;
          }
      }
  });
  var r = 0;
  for (var i = 0; i < state.length; i++) {
      if (state[i] > 0) {
          var v = 36;
          if (state[i] == 1) {
              v -= getPenalty(state, i + 1, eb);
          }
          r += v;
      }
  }
  if (inHome) {
      r *= 2;
  }
  r += fo * 100;
  r += eb * 50;
  return r;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var enemies = 0; var friends = 0;
  _.each(design.allPositions(), function(pos) {
      if (!design.inZone(5, player, pos)) return;
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if (piece.player != player) {
              enemies++;
          } else {
              friends++;
          }
      }
  });
  if (enemies < 1) {
      return -1;
  }
  if (friends < 1) {
      return 1;
  }
  return checkGoals(design, board, player);
}

})();
