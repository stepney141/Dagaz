(function() {

Dagaz.Model.WIN_CNT = 1600;
Dagaz.AI.NOISE_FACTOR = 0;

var WIDTH = 640;
var HEIGHT = 32;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "filler-goal") {
     checkVersion(design, name, value);
  }
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  return move.actions.length;
}

var getScore = function(design, board) {
  if (_.isUndefined(board.score)) {
      board.score = [0, 0];
      _.each(design.allPositions(), function(pos) {
          var piece = board.getPiece(pos);
          if (piece === null) return;
          if (piece.player > 2) return;
          if (piece.type > 6) return;
          board.score[piece.player - 1]++;
      });
      console.log(board.score);
  }
  return board.score;
}

Dagaz.View.showBoard = function(board, ctx) {
  var design = Dagaz.Model.design;
  var score = getScore(design, board);
  var a = score[1];
  var b = score[0];
  var m = ((b * WIDTH)/(a + b)) | 0;
  ctx.save();
  ctx.fillStyle = '#0080FF';
  ctx.fillRect(0, 0, m, HEIGHT);
  ctx.fillStyle = '#FF00FF';
  ctx.fillRect(m, 0, WIDTH - m, HEIGHT);
  if (a != b) {
      if (b > a) ctx.fillStyle = '#0080FF';
      ctx.beginPath();
      ctx.arc(m, 16, 16, 0, 2 * Math.PI);
      ctx.fill();
  }
  ctx.restore();
}


var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var score = getScore(design, board);
  if (score[0] > Dagaz.Model.WIN_CNT) {
      if (player == 1) {
          return 1;
      } else {
          return -1;
      }
  }
  if (score[1] > Dagaz.Model.WIN_CNT) {
      if (player == 2) {
          return 1;
      } else {
          return -1;
      }
  }
  return checkGoals(design, board, player);
}

})();
