(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gogomoku-extension") {
      checkVersion(design, name, value);
  }
}

var isDead = function(design, board, player, group, dirs) {
  var dame = 0;
  for (var i = 0; i < group.length; i++) {
      _.each(dirs, function(dir) {
          var pos = design.navigate(1, group[i], dir);
          if ((pos === null) || (_.indexOf(group, pos) >= 0)) return;
          var piece = board.getPiece(pos);
          if (piece === null) {
              dame++;
              return;
          }
          if (piece.player != player) return;
          group.push(pos);
      });
  }
  return dame == 0;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!move.isDropMove()) return;
      var pos = move.actions[0][1][0];
      var piece = move.actions[0][2][0];
      board.setPiece(pos, piece);
      var group = [pos];
      if (isDead(design, board, piece.player, group, [1, 3, 4, 7]) ||
          isDead(design, board, piece.player, group, [0, 2, 5, 6])) {
          move.failed = true;
          return;
      }
      var captured = [];
      _.each([1, 3, 4, 7], function(dir) {
          var p = design.navigate(1, pos, dir);
          if (p === null) return;
          var piece = board.getPiece(p);
          if (piece === null) return;
          if (piece.player == board.player) return;
          var group = [p];
          if (!isDead(design, board, piece.player, group, [1, 3, 4, 7])) return;
          captured = _.union(captured, group);
      });
      _.each([0, 2, 5, 6], function(dir) {
          var p = design.navigate(1, pos, dir);
          if (p === null) return;
          var piece = board.getPiece(p);
          if (piece === null) return;
          if (piece.player == board.player) return;
          var group = [p];
          if (!isDead(design, board, piece.player, group, [0, 2, 5, 6])) return;
          captured = _.union(captured, group);
      });
      _.each(captured, function(p) {
          var piece = board.getPiece(p);
          if (piece === null) return;
          if (piece.player == board.player) return;
          move.movePiece(p, p, piece.changeOwner(board.player));
      });
      board.setPiece(pos, null);
  });
  CheckInvariants(board);
}

})();
