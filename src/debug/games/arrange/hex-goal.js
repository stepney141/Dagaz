(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "hex-goal") {
     checkVersion(design, name, value);
  }
}

var checkMiaiDir = function(design, board, player, pos, a, b, targets) {
  var p = design.navigate(player, pos, a);
  var q = design.navigate(player, pos, b);
  if ((p === null) || (q === null)) return;
  var x = board.getPiece(p);
  var y = board.getPiece(q);
  if ((x !== null) && (y !== null)) return;
  var isFork = design.inZone(0, player, p) && design.inZone(0, player, q);
  if (!isFork) {
      isFork = design.inZone(1, player, p) && design.inZone(1, player, q);
  }
  if (!isFork) {
      var t = design.navigate(player, p, b);
      if (t === null) return;
      var piece = board.getPiece(t);
      if (piece === null) return;
      if (piece.player != player) return;
  }
  if (x === null) {
      if (y === null) return;
      if (y.player != player) {
          targets.push(p);
      }
      return;
  }
  if ((y === null) && (x.player != player)) {
      targets.push(q);
  }
}

var checkMiai = function(design, board, player, targets) {
  var w  = design.getDirection("w");  var e  = design.getDirection("e");
  var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
  var ne = design.getDirection("ne"); var se = design.getDirection("se");
  _.each(design.allPositions(), function(pos) {
       if (design.inZone(0, player, pos) || design.inZone(1, player, pos)) return;
       var piece = board.getPiece(pos);
       if ((piece !== null) && (piece.player == player)) {
           checkMiaiDir(design, board, player, pos, nw, ne, board.targets);
           checkMiaiDir(design, board, player, pos, ne, e,  board.targets);
           checkMiaiDir(design, board, player, pos, e,  se, board.targets);
           checkMiaiDir(design, board, player, pos, se, sw, board.targets);
           checkMiaiDir(design, board, player, pos, sw, w,  board.targets);
           checkMiaiDir(design, board, player, pos, w, nw,  board.targets);
       }
  });
}

var getTargets = function(design, board, player) {
  if (_.isUndefined(board.targets)) {
      board.targets = [];
      checkMiai(design, board, player, board.targets);
      if (board.targets.length == 0) {
          // TODO:

      }
  }
  return board.targets;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var targets = getTargets(design, board, board.player);
  if (move.isDropMove() && (targets.length > 0)) {
      var pos = move.actions[0][1][0];
      if (_.indexOf(targets, pos) >= 0) {
          return 100;
      }
  }
  return 1;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var r = null;
  var group = [];
  _.each(design.allPositions(), function(pos) {
      if (design.inZone(0, player, pos)) {
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.player == player)) {
              group.push(pos);
          }
      }
  });
  for (var i = 0; i < group.length; i++) {
      _.each(design.allDirections(), function(dir) {
           var pos = design.navigate(player, group[i], dir);
           if ((pos !== null) && (_.indexOf(group, pos) < 0)) {
               var piece = board.getPiece(pos);
               if ((piece !== null) && (piece.player == player)) {
                    if (design.inZone(1, player, pos)) {
                        r = 1;
                    }
                    group.push(pos);
               }
           }
      });
  }
  if (r !== null) return r;
  return checkGoals(design, board, player);
}

})();
