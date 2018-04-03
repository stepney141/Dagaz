(function() {

var MAXVALUE = 1000000;

var patterns = [];

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "atari-go-goal") {
      patterns[   0] = -1; // w e s n
      patterns[   3] = -1; // . . . b
      patterns[  30] = -1; // . . b .
      patterns[ 300] = -1; // . b . .
      patterns[ 303] = -1; // . b . b
      patterns[ 330] = -1; // . b b .
      patterns[3000] = -1; // b . . .
      patterns[3003] = -1; // b . . b
      patterns[3030] = -1; // b . b .
      patterns[  23] = -1; // . . e b
      patterns[ 203] = -1; // . e . b
      patterns[2003] = -1; // e . . b
      patterns[  32] = -1; // . . b e
      patterns[ 230] = -1; // . e b .
      patterns[2030] = -1; // e . b .
      patterns[ 302] = -1; // . b . e
      patterns[ 320] = -1; // . b e .
      patterns[2300] = -1; // e b . .
      patterns[3002] = -1; // b . . e
      patterns[3020] = -1; // b . e .
      patterns[3200] = -1; // b e . .
      patterns[1111] = -1; // f f f f
      patterns[1113] = -1; // f f f b
      patterns[1131] = -1; // f f b f
      patterns[1311] = -1; // f b f f
      patterns[3111] = -1; // b f f f
      patterns[ 222] = -1; // . e e e
      patterns[2022] = -1; // e . e e
      patterns[2202] = -1; // e e . e
      patterns[2220] = -1; // e e e .
      patterns[1222] = -1; // f e e e
      patterns[2122] = -1; // e f e e
      patterns[2212] = -1; // e e f e
      patterns[2221] = -1; // e e e f
      patterns[   1] =  2; // . . . f
      patterns[  10] =  2; // . . f .
      patterns[ 100] =  2; // . f . .
      patterns[1000] =  2; // f . . .
      patterns[   2] =  3; // . . . e
      patterns[  20] =  3; // . . e .
      patterns[ 200] =  3; // . e . .
      patterns[2000] =  3; // e . . .
      patterns[  11] =  4; // . . f f
      patterns[1100] =  4; // f f . .
      patterns[  22] =  5; // . . e e
      patterns[2200] =  5; // e e . .
      patterns[ 211] =  6; // . e f f
      patterns[2011] =  6; // e . f f
      patterns[2211] =  7; // e e f f
      patterns[1102] =  6; // f f . e
      patterns[1120] =  6; // f f e .
      patterns[1122] =  7; // f f e e
  } else {
      checkVersion(design, name, value);
  }
}

var getAtari = function(design, board, pos) {
  var r = null;
  _.each(design.allDirections(), function(dir) {
      if (r === null) {
          var p = design.navigate(board.player, pos, dir);
          if (p !== null) {
              var piece = board.getPiece(p);
              if (piece == null) r = p;
          }
      }
  });
  return r;
}

Dagaz.AI.eval = function(design, params, board, player) {
  var fa = null; var ea = null;
  var fp = null; var ep = null;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var value = piece.getValue(0);
          if (value !== null) {
              if (piece.player == board.player) {
                  if (fa == 1) {
                      var p = getAtari(design, board, pos);
                      if (p === null) return;
                      if ((fp !== null) && (fp != p)) {
                          fa = 0;
                      }
                      fp = p;
                  }
                  if ((fa === null) || (fa > value)) fa = value;
              } else {
                  if (ea == 1) {
                      var p = getAtari(design, board, pos);
                      if (p === null) return;
                      if ((ep !== null) && (ep != p)) {
                          ea = 0;
                      }
                      ep = p;
                  }
                  if ((ea === null) || (ea > value)) ea = value;
              }
          }
      }
  });
  var r = 0;
  if ((fa !== null) && (ea !== null)) {
      if (fa <= 1) {
          fa = MAXVALUE;
          if (fa > 0) fa = (fa / 2) | 0;
      } else {
          fa = 100 - fa;
      }
      if (ea <= 1) {
          ea = MAXVALUE;
          if (ea > 0) ea = (ea / 2) | 0;
      } else {
          ea = 100 - ea;
      }
      ea = (ea / 2) | 0;
      r = ea - fa;
  }
  if (board.player != player) r = -r;
  return r;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var isAtari = false;
  if ((move.actions.length > 0) && (move.actions[0][1] !== null)) {
      var pos = move.actions[0][1][0];
      var pattern = 0;
      _.each(design.allDirections(), function(dir) {
          var p = design.navigate(board.player, pos, dir);
          if (p !== null) {
              var piece = board.getPiece(p);
              if (piece !== null) {
                  if (piece.getValue(0) == 1) {
                      isAtari = true;
                      return;
                  }
                  if (piece.player == board.player) {
                      pattern += 1;
                  } else {
                      pattern += 2;
                  }
              }
          } else {
              pattern += 3;
          }
          pattern = pattern * 10;
      });
      if (isAtari) return MAXVALUE;
      if (!_.isUndefined(patterns[pattern])) {
          return patterns[pattern];
      } else {
          return 1;
      }
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
