(function() {

var checkVersion = Dagaz.Model.checkVersion;
var suicideMode = false;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "go-extension") {
     if (value == "suicide") {
         suicideMode = true;
     }
  } else {
     checkVersion(design, name, value);
  }
}

Model.Move.moveToString = function(move, part) {
  if (move.actions.length == 0) return "";
  return _.chain(move.actions)
   .filter(function (action) {
       return (action[0] === null) && (action[1] !== null) && (action[2] !== null);
    })
   .map(function (action) {
       return Dagaz.Model.posToString(action[1][0]);
    })
   .first()
   .value();
}

var expand = function(design, board, group, player) {
   for (var i = 0; i < group.length; i++) {
        var pos = group[i];
        _.each(_.range(design.dirs.length), function(dir) {
            var p = design.navigate(board.player, pos, dir);
            if (p !== null) {
                var piece = board.getPiece(p);
                if ((piece !== null) && (piece.player == player)) {
                    if (_.indexOf(group, p) < 0) group.push(p);
                }
            }
        });
   }
}

var capture = function(move, group) {
   _.each(group, function(pos) {
        move.capturePiece(pos);
   });
}

var change = function(move, board, group, dame, cnt) {
   _.each(group, function(pos) {
        var piece = board.getPiece(pos);
        if (piece !== null) {
            piece = piece.setValue(0, dame);
            if (cnt) {
                piece = piece.setValue(1, cnt);
            }
            move.movePiece(pos, pos, piece);
        }
   });
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.chain(board.moves)
   .filter(function(move) {
      return move.actions.length == 1;
    })
   .each(function(move) {
      var dame   = -1;
      var cnt    = 1;
      var pos    = move.actions[0][1][0];
      var friend = [];
      var enemy  = [];
      _.each(_.range(design.dirs.length), function(dir) {
          var p = design.navigate(board.player, pos, dir);
          if (p !== null) {
              var piece = board.getPiece(p);
              if (piece === null) {
                  dame++;
              } else {
                  if (piece.player != board.player) {
                      if (_.indexOf(enemy, p) < 0) {
                          var d = piece.getValue(0);
                          var g = [ p ];
                          expand(design, board, g, piece.player);
                          if (d <= 1) {
                              move.addValue(piece.player, g.length);
                              capture(move, g);
                              dame++;
                          } else {
                              change(move, board, g, d - 1);
                          }
                          _.each(g, function(pos) {
                               enemy.push(pos);
                          });
                      }
                  } else {
                      if (_.indexOf(friend, p) < 0) {
                          var g = [ p ];
                          expand(design, board, g, board.player);
                          dame += piece.getValue(0);
                          cnt  += piece.getValue(1);
                          _.each(g, function(pos) {
                               friend.push(pos);
                          });
                      }
                  }
              }
          }
      });
      if (dame == 0) {
          if (!suicideMode || (cnt == 1)) {
              move.failed = true;
          } else {
              move.addValue(board.player, friend.length);
              capture(move, friend);
              move.actions.shift();
          }
      } else {
          change(move, board, friend, dame, cnt);
          var piece = move.actions[0][2][0];
          piece = piece.setValue(0, dame);
          piece = piece.setValue(1, cnt);
          move.actions[0][2][0] = piece;
      }
  });
  CheckInvariants(board);
}

})();
