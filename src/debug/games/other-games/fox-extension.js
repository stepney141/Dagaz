(function() {

var moving = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "fox-extension") {
      if (value == "moving") moving = true;
  } else {
      checkVersion(design, name, value);
  }
}

var animateFox = function(design, board, pos, move, changes) {
  _.each(design.allPositions(), function(p) {
       if (p == pos) return;
       var piece = board.getPiece(p);
       if ((piece !== null) && (piece.type == 9)) {
           var dir = piece.getValue(0);
           if (dir === null) {
               dir = _.random(0, 3);
               if (dir == 3) dir++;
           }
           var q = design.navigate(board.player, p, dir);
           if ((q === null) || (q == pos) || (_.indexOf(changes.new, q) >= 0) || (board.getPiece(q) !== null)) {
               dir = design.opposite(dir);
               q = design.navigate(board.player, p, dir);
               if ((q === null) || (q == pos) || (_.indexOf(changes.new, q) >= 0) || (board.getPiece(q) !== null)) return;
           }
           piece = piece.setValue(0, dir);
           move.movePiece(p, q, piece);
           changes.old.push(p);
           changes.new.push(q);
       }
  });
}

var calcFox = function(design, board, pos, changes) {
  var cnt = 0;
  _.each(design.allDirections(), function(dir) {
      var p = design.navigate(board.player, pos, dir);
      while (p !== null) {
          if (_.indexOf(changes.new, p) >= 0) {
              cnt++;
              p = design.navigate(board.player, p, dir);
              continue;
          }
          if (_.indexOf(changes.old, p) < 0) {
              var piece = board.getPiece(p);
              if ((piece !== null) && (piece.type >= 9)) cnt++;
          }
          p = design.navigate(board.player, p, dir);
      }
  });
  return cnt;
}

var updateCounters = function(design, board, pos, move, changes) {
  _.each(design.allPositions(), function(p) {
       if (p == pos) return;
       var piece = board.getPiece(p);
       if ((piece !== null) && (piece.type < 9)) {
            var cnt = calcFox(design, board, p, changes);
            if (piece.type != cnt) {
                var drop = Dagaz.Model.createPiece(cnt, 1);
                move.dropPiece(p, drop);
            }
       }
  });
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.isDropMove()) {
          var pos = move.actions[0][1][0];
          var piece = board.getPiece(pos);
          var drop = null;
          if (piece !== null) {
              if (piece.type == 9) {
                  drop = piece.promote(10);
                  move.sound = 1;
              } else {
                  move.failed = true;
                  return;
              }
          }
          var changes = {
              old: [],
              new: []
          };
          if (moving) {
              animateFox(design, board, pos, move, changes);
              updateCounters(design, board, pos, move, changes);
          }
          if (piece === null) {
              var cnt = calcFox(design, board, pos, changes);
              if (cnt > 0) drop = Dagaz.Model.createPiece(cnt, 1);
          }
          if (drop !== null) {
              move.dropPiece(pos, drop);
          }
      }
  });
  CheckInvariants(board);
}

})();
