(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "renju-invariant") {
      checkVersion(design, name, value);
  }
}

var addKo = function(board, move) {
  if ((move.actions.length > 0) && (move.actions[0][1] !== null)) {
       pos = move.actions[0][1][0];
       if (_.isUndefined(board.ko)) {
           board.ko = [];
       }
       if (_.indexOf(board.ko, pos) < 0) {
           board.ko.push(pos);
       }
  }
}

var isOpened = function(design, board, player, pos, dir) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return false;
  var piece = board.getPiece(p);
  while (piece !== null) {
     if (piece.player != player) return false;
     p = design.navigate(player, p, dir);
     if (p === null) return false;
     piece = board.getPiece(p);
  }
  return true;
}

var getRank = function(design, board, player, pos, dir, ix, val) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return 0;
  var piece = board.getPiece(p);
  while (piece !== null) {
     if (piece.player != player) return 0;
     p = design.navigate(player, p, dir);
     if (p === null) return 0;
     piece = board.getPiece(p);
  }
  p = design.navigate(player, p, dir);
  if (p === null) return 0;
  piece = board.getPiece(p);
  if (piece == null) return 0;
  if (piece.player != player) return val;
//if (!isOpened(design, board, player, p, dir)) return 0;
  val += +piece.getValue(ix);
  return val;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var dirs   = [];
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  dirs.push(design.getDirection("s")); dirs.push(design.getDirection("sw"));
  dirs.push(design.getDirection("w")); dirs.push(design.getDirection("nw"));
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  if (board.player == 1) {
      _.each(board.moves, function(move) {          
          if (move.isPass()) return;
          var pos   = move.actions[0][1][0];
          var piece = move.actions[0][2][0];
          var a = 0; var b = 0;
          for (var ix = 0; ix < 4; ix++) {
               var v = +piece.getValue(ix);
               if (v > 5) {
                   addKo(board, move);
                   move.failed = true;
                   return;
               }
               if ((v > 2) && 
                   (isOpened(design, board, board.player, pos, dirs[ix]) || 
                    isOpened(design, board, board.player, pos, dirs[ix + 4]))) {
                    a++;
               }
          }
          for (var i = 0; i < 8; i++) {
               var dir = dirs[i];
               var ix  = i;
               if (ix > 3) ix -= 4;
               var v = +piece.getValue(ix);
               v = getRank(design, board, board.player, pos, dir, ix, v);
               if ((v > 2) && isOpened(design, board, board.player, pos, dirs[ix + 4])) b++;
          }
          if ((a > 1) || (b > 1)) {
              addKo(board, move);
              move.failed = true;
              return;
          }
      });
  }
  CheckInvariants(board);
}

})();
