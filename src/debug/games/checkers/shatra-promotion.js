(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "shatra-promotion") {
     checkVersion(design, name, value);
  }
}

var getX = function(pos) {
  return pos % 7;
}

var getY = function(pos) {
  return (pos / 7) | 0;
}

var isCantCapture = function(design, board, a, b, piece) {
  if (piece.type == 4) return false;
  var dx = Math.abs(getX(a) - getX(b));
  var dy = Math.abs(getY(a) - getY(b));
  if ((dx <= 1) && (dy <= 1)) {
      return false;
  }
  if ((dx == 0) || (dy == 0)) {
      return piece.type <= 2;
  }
  if (dx == dy) {
      return piece.type != 2;
  }
  return true;
}

var calcPieces = function(design, board, player, type) {
  var cnt = 0;
  _.each(design.allPositions(), function(p) {
      var piece = board.getPiece(p);
      if ((piece !== null) && (piece.player == player) && (piece.type == type)) {
          cnt++;
      }
  });
  return cnt;
}

var promotePiece = function(design, board, player, piece) {
  var type = 4;
  var cnt  = calcPieces(design, board, player, type);
  if (cnt >= 1) {
      type = 3;
      cnt  = calcPieces(design, board, player, type);
  }
  if (cnt >= 2) {
      type = 2;
      cnt  = calcPieces(design, board, player, type);
  }
  if (cnt >= 2) {
      type = 0;
  }
  if (piece.type == type) return piece;
  if (type == 0) {
      return piece.promote(type).setValue(1, true);
  } else {
      return piece.promote(type);
  }
}

var getWaiting = function(design, board, player) {
  return _.filter(design.allPositions(), function(p) {
      var piece = board.getPiece(p);
      if (piece === null) return false;
      if (piece.type != 0) return false;
      if (piece.player == player) return false;
      return piece.getValue(1) !== null;
  });
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(m) {
      var piece     = null;
      var promoted  = null;
      var actions   = [];
      var last      = null;
      var isBreaked = false;
      _.each(m.actions, function(a) {
          if ((a[0] !== null) && (a[1] === null) && (last !== null) && (promoted !== null)) {
              if (isCantCapture(design, board, last, a[0][0], promoted)) {
                  isBreaked = true;
                  return;
              }
          }
          if ((a[0] !== null) && (a[1] !== null)) {
              if (piece === null) {
                  piece = board.getPiece(a[0][0]);
              }
              last = a[1][0];
              var p = null;
              if (a[2] !== null) {
                  p = a[2][0];
              }
              if ((p !== null) && (p.type != piece.type)) {
                  if (promoted === null) {
                      promoted = promotePiece(design, board, board.player, p);
                  }
                  a[2] = [ promoted ];
              }
          }
          actions.push(a);
      });
      if (isBreaked) {
          m.actions = actions;
      }
  });  
  _.each(board.moves, function(m) {
      var actions = [];
      var waiting = getWaiting(design, board, board.player);
      _.each(m.actions, function(a) {
          if ((a[0] !== null) && (a[1] === null)) {
               var piece = board.getPiece(a[0][0]);
               if ((piece !== null) && (piece.type > 1) && (waiting.length > 0)) {
                   var pos = waiting.pop();
                   var p = board.getPiece(pos);
                   if (p !== null) {
                       actions.push([ [ pos ], [ pos ], [ p.promote(piece.type) ], a[3]]);
                   }
               }
          }
      });
      _.each(actions, function(a) {
          m.actions.push(a);
      });
  });
  CheckInvariants(board);
}

})();
