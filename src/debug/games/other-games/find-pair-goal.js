(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "find-pair-goal") {
      checkVersion(design, name, value);
  }
}

var getNum = function(board, from, to) {
  var r = 0;
  for (var pos = from; pos <= to; pos++) {
       var piece = board.getPiece(pos);
       if (piece !== null) {
           r = r * 10;
           r = r + piece.type;
       }
  }
  return r;
}

var setNum = function(board, from, to, val, move) {
  for (var pos = to; pos >= from; pos--) {
       var t = val % 10;
       val = (val / 10) | 0;
       var piece = board.getPiece(pos);
       if ((piece !== null) && (piece.type != t)) {
           move.movePiece(pos, pos, piece.promote(t));
       }   
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var positions = [];
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type >= 10)) {
          positions.push(pos);
      }
  });
  if (positions.length == 0) return 1;
  return checkGoals(design, board, player);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var num = getNum(board, 0, 1);
  var score = getNum(board, 2, 6);
  _.each(board.moves, function(move) {
      if (move.mode != 1) {
          if (num == 0) {
              move.failed = true;
              return;
          }
          setNum(board, 0, 1, num - 1, move);
      }
      if (move.mode > 0) {
          var v = 1;
          var bonus = board.getValue(0);
          if (bonus !== null) {
              v += bonus;
          }
          if (!Dagaz.Model.easy) {
              v = v * 2;
          }
          setNum(board, 2, 6, score + v, move);
      }
  });
}

})();
