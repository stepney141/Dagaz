(function() {

Dagaz.View.MARK_R = 15;
Dagaz.View.WIDTH = 404;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "chaturaji-score") {
      checkVersion(design, name, value);
  }
}

var getValue = function(board, ix) {
  var v = board.getValue(ix);
  if (v === null) return 0;
  return v;
}

var showBoard = Dagaz.View.showBoard;

Dagaz.View.showBoard = function(board, ctx) {
  if (!_.isUndefined(showBoard)) {
       showBoard(board, ctx);
  }
  var g = getValue(board, 0) + getValue(board, 2);
  var r = getValue(board, 1) + getValue(board, 3);
  if (g + r == 0) return;
  ctx.save();
  ctx.fillStyle = '#00C800';
  if (g * r == 0) {
      if (g == 0) ctx.fillStyle = '#FF0000';
      ctx.fillRect(57, 407, Dagaz.View.WIDTH, 6);
  } else {
      var m = ((r * Dagaz.View.WIDTH)/(g + r)) | 0;
      if (m < 20) m = 20;
      if (Dagaz.View.WIDTH - m < 20) m = Dagaz.View.WIDTH - 20;
      ctx.fillRect(57, 407, m, 6);
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(m + 57, 407, Dagaz.View.WIDTH - m, 6);
      if (r != g) {
          if (g > r) ctx.fillStyle = '#00C800';
          ctx.beginPath();
          ctx.arc(m + 57, 410, 3, 0, 2 * Math.PI);
          ctx.fill();
      }
  }
  ctx.restore();
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var g = 0; var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (piece.type != 4) return;
      if (_.indexOf([1, 3], +piece.player) >= 0) {
          g++;
      } else {
          r++;
      }
  });
  if (g * r == 0) {
      g = getValue(board, 0) + getValue(board, 2);
      r = getValue(board, 1) + getValue(board, 3);
      if (g == r) return 0;
      if (_.indexOf([1, 3], +player) >= 0) {
          if (g > r) {
              return 1;
          } else {
              return -1;
          }
      } else {
          if (g > r) {
              return -1;
          } else {
              return 1;
          }
      }
  }
  return checkGoals(design, board, player);
}

})();
