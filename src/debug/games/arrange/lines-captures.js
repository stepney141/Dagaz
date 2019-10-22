(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "lines-captures") {
     checkVersion(design, name, value);
  }
}

var tryDir = function(design, board, player, pos, dir, type, group) {
  var p = design.navigate(player, pos, dir);
  while (p !== null) {
      var piece = board.getPiece(p);
      if (piece === null) return;
      if (piece.type != type) return;
      group.push(p);
      p = design.navigate(player, p, dir);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = board.game.design;  
  _.each(board.moves, function(move) {
      if (!move.isSimpleMove() || (move.mode > 0)) return;
      var b = board.apply(move);
      var pos = move.actions[0][1][0];
      var piece = b.getPiece(pos);
      if (piece === null) return;
      var captures = [];
      _.each(design.allDirections(), function(dir) {
          if (dir == 0) return;
          var group = [pos];
          tryDir(design, b, 1, pos, dir, piece.type, group);
          tryDir(design, b, 0, pos, dir, piece.type, group);
          if (group.length >= 5) {
              _.each(group, function(pos) {
                  if (_.indexOf(captures, pos) >= 0) return;
                  captures.push(pos);
              });
          }
      });
      _.each(captures, function(pos) {
          move.capturePiece(pos, 2);
      });
  });
  CheckInvariants(board);
}

})();
