(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "go-score-extension") {
     checkVersion(design, name, value);
  }
}

var getValue = function(design, board, pos, type) {
  var r = 0;
  var g = [ pos ];
  for (var i = 0; i < g.length; i++) {
      _.each(design.allDirections(), function(dir) {
           var p = design.navigate(1, g[i], dir);
           if ((p !== null) && (_.indexOf(g, p) < 0)) {
               var piece = board.getPiece(p);
               if ((piece === null) || (piece.type >= 2)) {
                   r++;
               } else {
                   if (piece.type != type) return;
                   g.push(p);
               }
           }
      });
  }
  return r;
}

var go = Dagaz.Controller.go;

Dagaz.Controller.go = function(url) {
  var design = Dagaz.Model.design;
  var board = Dagaz.Controller.app.board;
  url = url + "?setup="; 
  var b = 0; var w = 0;
  var prev = null; var cnt = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      var s = "";
      if ((piece !== null) && (piece.type < 2)) {
          if (piece.type == 0) { b++; } else { w++; }
          var player = +piece.type + 1;
          s = s + "0:" + player;
          s = s + "=" + getValue(design, board, pos, piece.type);
      }
      if ((prev === null) || (prev != s)) {
          if (prev !== null) {
              url = url + prev;
              if (cnt > 0) {
                  url = url + "+" + cnt;
              }
              url = url + ";";
          }
          prev = s;
          cnt = 0;
      } else {
          cnt++;
      }
  });
  url = url + prev;
  if (cnt > 0) {
      url = url + "+" + cnt;
  }
  if (b == w + 1) {
      url = url + ";&turn=1";
  } else {
      url = url + ";&turn=0";
  }
  go(url);
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
      var black = []; var white = []; var done = [];
      _.each(design.allPositions(), function(pos) {
          if (_.indexOf(done, pos) >= 0) return;
          var piece = b.getPiece(pos);
          if ((piece !== null) && (piece.type < 2)) return;
          var group = [pos];
          var player = checkTerritory(design, b, group);
          done = _.union(done, group);
          if (player === null) return;
          if (player == 1) {
              black = _.union(black, group);
          } else {
              white = _.union(white, group);
          }
      });
      var target = null;
      if (move.mode == 1) {
          target = move.actions[0][0][0];
      }
      _.each(design.allPositions(), function(pos) {
          var piece = b.getPiece(pos);
          if (piece === null) {
              if (_.indexOf(black, pos) >= 0) {
                  if ((target !== null) && (target == pos)) {
                      move.actions[0][1] = [move.actions[0][0][0]];
                      move.actions[0][2] = [Dagaz.Model.createPiece(2, 1)];
                  } else {
                      move.dropPiece(pos, Dagaz.Model.createPiece(2, 1));
                  }
              }
              if (_.indexOf(white, pos) >= 0) {
                  if ((target !== null) && (target == pos)) {
                      move.actions[0][1] = [move.actions[0][0][0]];
                      move.actions[0][2] = [Dagaz.Model.createPiece(3, 1)];
                  } else {
                      move.dropPiece(pos, Dagaz.Model.createPiece(3, 1));
                  }
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

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.mode != 1) return;
      var pos = move.actions[0][0][0];
      var piece = board.getPiece(pos);
      if ((piece === null) || (piece.type >= 2)) {
          move.failed = true;
          return;
      }
      var player = +piece.type;
      var group  = [pos];
      for (var i = 0; i < group.length; i++) {
          _.each(design.allDirections(), function(dir) {
               var p = design.navigate(1, group[i], dir);
               if ((p === null) || (_.indexOf(group, p) >= 0)) return;
               var piece = board.getPiece(p);
               if (piece === null) return;
               if ((+piece.type != player) && (+piece.type != player + 2)) return;
               group.push(p);
          });
      }
      for (var i = 1; i < group.length; i++) {
           var p = group[i];
           var piece = board.getPiece(p);
           move.movePiece(p, p, piece.promote(_.indexOf([0, 2], +piece.type) >= 0 ? 3: 2));
      }
      var pos = move.actions[0][0][0];
      var piece = board.getPiece(pos);
      if (piece !== null) {
          move.actions[0][1] = [pos];
          move.actions[0][2] = [piece.promote(_.indexOf([0, 2], +piece.type) >= 0 ? 3: 2)];
      }
  });
  CheckInvariants(board);
}

})();
