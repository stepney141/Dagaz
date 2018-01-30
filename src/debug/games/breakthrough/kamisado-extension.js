(function() {

Dagaz.Model.WIDTH  = 8;
Dagaz.Model.HEIGHT = 8;

Dagaz.View.showHint = function(view) {}

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "kamisado-extension") {
     checkVersion(design, name, value);
  }
}

var toChar = function(n) {
  if (n < 10) {
      return String.fromCharCode("0".charCodeAt(0) + n);
  } else {
      return String.fromCharCode("A".charCodeAt(0) + n - 10);
  }
}

var toStr = function(n) {
  var r = "";
  if (n == 0) return "0";
  while (n > 0) {
      r = toChar(n % 36) + r;
      n = (n / 36) | 0;
  }
  return r;
}

Dagaz.Model.continue = function(design, board, text) {
  var str = "?setup=";
  var offset = (Dagaz.Model.HEIGHT - 1) * Dagaz.Model.WIDTH;
  _.chain(design.allPositions())
   .filter(function(pos) {
        var piece = board.getPiece(pos);
        if (piece === null) return false;
        return piece.player == 1;
    })
   .sortBy(function(pos) {
        var x = Dagaz.Model.getX(pos);
        var y = Dagaz.Model.HEIGHT - Dagaz.Model.getY(pos);
        return (y * Dagaz.Model.WIDTH) + x;
    })
   .each(function(pos) {
        var piece = board.getPiece(pos);
        if (piece !== null) {
            var type = piece.type;
            if ((type % 2 == 0) && design.inZone(8, 1, pos)) {
                type++;
            }
            str = str + toChar(type);
            str = str + toStr(offset);
            str = str + ";";
            offset++;
        }
    });
  str = str + "-";
  offset = Dagaz.Model.WIDTH - 1;
  _.chain(design.allPositions())
   .filter(function(pos) {
        var piece = board.getPiece(pos);
        if (piece === null) return false;
        return piece.player == 2;
    })
   .sortBy(function(pos) {
        var x = Dagaz.Model.WIDTH - Dagaz.Model.getX(pos);
        var y = Dagaz.Model.getY(pos);
        return (y * Dagaz.Model.WIDTH) + x;
    })
   .each(function(pos) {
        var piece = board.getPiece(pos);
        if (piece !== null) {
            var type = piece.type;
            if ((type % 2 == 0) && design.inZone(8, 2, pos)) {
                type++;
            }
            str = str + toChar(type);
            str = str + toStr(offset);
            str = str + ";";
            offset--;
        }
    });
  return str;
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  var design = Dagaz.Model.design;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var goals = design.getGoalPositions(piece.player, [ piece.type ]);
          _.each(design.allDirections(), function(dir) {
              var p = design.navigate(piece.player, pos, dir);
              while (p !== null) {
                  if (board.getPiece(p) !== null) break;
                  if (_.indexOf(goals, p) >= 0) {
                      if (piece.player == player) {
                          r++;
                      } else {
                          r--;
                      }
                      break;
                  }
                  p = design.navigate(piece.player, p, dir);
              }
          });
      }
  });
  return r;
}

var getColor = function(player, pos) {
  var design = Dagaz.Model.design;
  return _.chain(_.keys(design.zones))
   .filter(function(zone) {
       if (_.isUndefined(design.zones[zone][player])) return false;
       return Dagaz.find(design.zones[zone][player], +pos) >= 0;
    })
   .min()
   .value();
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var color  = -1;
  if (!_.isUndefined(board.lastt)) {
      color = getColor(board.player, board.lastt);
      var piece = board.getPiece(board.lastt);
      if ((piece !== null) && (piece.player == board.player)) {
          var enemy = _.chain(_.keys(board.pieces))
           .filter(function(pos) {
               return board.getPiece(pos) !== null;
            })
           .filter(function(pos) {
               return ((board.getPiece(pos).type / 2) | 0) == color;
            })
           .filter(function(pos) {
               return board.getPiece(pos).player != board.player;
            })
           .first()
           .value();
          color = getColor(board.player, enemy); 
      }
  }
  if (color >= 0) {
      _.chain(board.moves)
       .filter(function(move) {
            return move.actions.length > 0;
        })
       .filter(function(move) {
            return move.actions[0][0] !== null;
        })
       .each(function(move) {
            var pos = move.actions[0][0][0];
            var piece = board.getPiece(pos);
            if ((piece !== null) && (((piece.type / 2) | 0) != color)) {
                move.failed = true;
            }
        });
  }
  _.chain(board.moves)
   .filter(function(move) {
        return !move.failed;
    })
   .each(function(move) {
        var value = board.getValue(0);
        if (value !== null) {
            if (value != board.player) {
                move.failed = true;
            }
            if (move.actions.length == 1) {
                move.setValue(0, null);
            }
        }
        if (move.actions.length == 2) {
            move.setValue(0, board.player);
        }
    });
  CheckInvariants(board);
}

})();
