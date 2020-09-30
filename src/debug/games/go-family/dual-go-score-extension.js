(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "dual-go-score-extension") {
     checkVersion(design, name, value);
  }
}

var checkTerritory = function(design, board, group) {
  var r = null;
  for (var i = 0; i < group.length; i++) {
       for (var dir = 0; dir < design.dirs.length; dir++) {
            var pos = design.navigate(1, group[i], dir);
            if ((pos !== null) && (_.indexOf(group, pos) < 0)) {
                var piece = board.getPiece(pos);
                if ((piece !== null) && (piece.type < 2)) {
                    if ((r !== null) && (r != +piece.type + 1)) return null;
                    r = +piece.type + 1;
                } else {
                    group.push(pos);
                }
            }
       }
  }
  return r;
}

var PostProcessing = Dagaz.Model.PostProcessing;

Dagaz.Model.PostProcessing = function(board, moves) {
  var design = Dagaz.Model.design;
  _.each(moves, function(move) {
      var b = board.apply(move);
      var black = []; var white = [];
      _.each(design.allPositions(), function(pos) {
          var piece = b.getPiece(pos);
          if ((piece !== null) && (piece.type < 2)) return;
          var group = [pos];
          var player = checkTerritory(design, b, group);
          if (player === null) return;
          if (player == 1) {
              black = _.union(black, group);
          } else {
              white = _.union(white, group);
          }
      });
      _.each(design.allPositions(), function(pos) {
          var piece = b.getPiece(pos);
          if (piece === null) {
              if (_.indexOf(black, pos) >= 0) {
                  move.dropPiece(pos, Dagaz.Model.createPiece(2, 1));
              }
              if (_.indexOf(white, pos) >= 0) {
                  move.dropPiece(pos, Dagaz.Model.createPiece(3, 1));
              }
          } else {
              if (piece.type >= 2) {
                  if (_.indexOf(black, pos) >= 0) return;
                  if (_.indexOf(white, pos) >= 0) return;
                  move.capturePiece(pos);
              }
          }
      });
  });
  if (!_.isUndefined(PostProcessing)) {
      PostProcessing(board, moves);
  }
}

})();
