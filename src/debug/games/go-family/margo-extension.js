(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "margo-extension") {
     checkVersion(design, name, value);
  }
}

var isLocked = function(design, board, player, pos, dir) {
  var dirs = [];
  if (dir == 0) dirs = [4, 6];
  if (dir == 1) dirs = [4, 8];
  if (dir == 2) dirs = [6, 10];
  if (dir == 3) dirs = [8, 10];
  if (dirs.length == 0) return false;
  var r = true;
  _.each(dirs, function(d) {
      if (!r) return;
      var p = design.navigate(1, pos, d);
      if (p === null) return;
      var piece = board.getPiece(p);
      if ((piece === null) || (piece.player == player)) r = false;     
  });
  return r;
}

var isZombie = function(design, board, pos, captured) {
  var r = false;
  _.each([4, 6, 8, 10], function(dir) {
      if (!r) return;
      var p = design.navigate(1, pos, dir);
      if (p === null) return;
      if (_.indexOf(captured, p) >= 0) return;
      if (board.getPiece(p) !== null) {
          r = true;
      }
  });
  return r;
}

var getDame = function(design, board, player, group) {
  var r = 0;
  for (var i = 0; i < group.length; i++) {
      _.each(design.allDirections(), function(dir) {
          var p = design.navigate(1, group[i], dir);
          if (p === null) return;
          if (_.indexOf(group, p) >= 0) return;
          if (isLocked(design, board, player, group[i], dir)) return;
          var piece = board.getPiece(p);
          if (piece === null) {
              if (design.inZone(0, 1, p)) r++;
              return;
          }
          if (piece.player != player) return;
          group.push(p);
      });
  }
  return r;
}

var setDame = function(board, group, dame, move) {
  _.each(group, function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      move.movePiece(pos, pos, piece.setValue(0, dame));
  });
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!move.isDropMove()) return;
      var pos = move.actions[0][1][0];
      var e = []; var g = [pos];
      _.each(design.allDirections(), function(dir) {
          var p = design.navigate(1, pos, dir);
          if (p === null) return;
          var piece = board.getPiece(p);
          if (piece === null) return;
          if (piece.player == board.player) {
              g.push(p);
          } else {
              e.push(p);
          }
      });
      var d = getDame(design, board, board.player, g);
      var done = [];
      _.each(e, function(pos) {
          if (_.indexOf(done, pos) >= 0) return;
          var piece = board.getPiece(pos);
          if (piece === null) return;
          var group = [pos];
          var dame = getDame(design, board, piece.player, group);
          done = _.union(done, group);
          if (dame == 0) {
              var captured = []; var zombie = [];
              group = _.sortBy(group, function(pos) {
                  return pos;
              });
              while (group.length > 0) {
                  var pos = group.pop();
                  if (isZombie(design, board, pos, captured)) {
                      zombie.push(pos);
                  } else {
                      captured.push(pos);
                  }
              }
              _.each(captured, function(pos) {
                  if ((_.indexOf(e, pos) >= 0) && design.inZone(0, 1, pos)) {
                      d++;
                  }
                  move.capturePiece(pos);
              });
              group = zombie;
          }
          setDame(board, group, dame, move);
      });
      if (d == 0) {
          move.failed = true;
      }
      g.shift();
      setDame(board, g, d, move);
      var piece = move.actions[0][2][0];
      move.actions[0][2] = [ piece.setValue(0, d) ];
  });
  CheckInvariants(board);
}

})();
