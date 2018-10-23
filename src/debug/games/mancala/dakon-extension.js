(function() {

Dagaz.Model.WIN_CNT = 49;

Dagaz.View.DX       = 0;
Dagaz.View.DY       = 0;
Dagaz.View.MX       = 25;

var cache = [];
var size  = 15;

var isMikul = false;
var isMatiBela = false;
var isSimulate = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "dakon-extension") {
      if (value == "mikul") isMikul = true;
      if (value == "mati-bela") isMatiBela = true;
      if (value == "simulate") isSimulate = true;
  } else {
      checkVersion(design, name, value);
  }
}

var createPiece = function(design, player, value) {
  if (value != 0) {
      if (!_.isUndefined(cache[player]) && !_.isUndefined(cache[player][value])) {
          return cache[player][value];
      }
      var r = Dagaz.Model.createPiece(0, player).setValue(0, value);
      if (_.isUndefined(cache[player])) {
          cache[player] = [];
      }
      cache[player][value] = r;
      return r;
  } else {
      return null;
  }
}

var addReserve = function(x, y) {
  var r = Math.abs(x) + y;
  if (x < 0) {
      return -r;
  } else {
      return r;
  }
}

var toReserve = function(design, board, player, move, cnt) {
  var pos = design.navigate(player, 0, 2);
  if ((cnt != 0) && (pos !== null)) {
      piece = board.getPiece(pos);
      if (piece === null) {
          piece = Dagaz.Model.createPiece(0, player);
          piece = piece.setValue(0, cnt);
          move.dropPiece(pos, piece);
      } else {
          cnt = addReserve(cnt, Math.abs(+piece.getValue(0)));
          piece = piece.setValue(0, cnt);
          move.movePiece(pos, pos, piece);
      }
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;  
  var noCapturing = false;
  if (_.isUndefined(board.noInitial) && isSimulate) {
      noCapturing = (board.parent === null) || (board.parent.parent === null);
  }
  _.each(board.moves, function(move) {
      var isPool = false;
      var fr = 0;
      if (move.isSimpleMove()) {
          var pos = move.actions[0][0][0];
          if (design.inZone(1, board.player, pos)) {
              move.failed = true;
              return;
          }
          var piece = board.getPiece(pos);
          var cnt = Math.abs(+piece.getValue(0));
          if (_.isUndefined(cache[piece.player])) {
              cache[piece.player] = [];
              cache[piece.player][cnt] = piece;
          }
          var positions = [];
          var result = [];
          result.push(0);
          for (var ix = 1; cnt > 0; cnt--, ix++) {
               pos = design.navigate(board.player, pos, 0);
               positions.push(pos);
               if (pos === null) {
                   move.failed = true;
                   return;
               }
               if (ix >= size) {
                   ix = 0;
               }
               piece = board.getPiece(pos);
               if (ix < result.length) {
                   result[ix]++;
               } else {
                   if (piece === null) {
                       result.push(1);
                   } else {
                       result.push(Math.abs(+piece.getValue(0)) + 1);
                   }
               }
          }
          ix--;
          var captured = [];
          isPool = design.inZone(1, board.player, pos);
          if (!noCapturing) {
              if ((result[ix] > 1) || isPool) {
                  result[ix] = -result[ix];
              } else {
                  if (!isPool) {
                      if (design.inZone(0, board.player, pos)) {
                          pos = design.navigate(board.player, pos, 4);
                          if (pos !== null) {
                              piece = board.getPiece(pos);
                              if ((piece !== null) || (result.length == size) || (_.indexOf(positions, pos) >= 0)) {
                                  captured.push(pos);
                                  if (isMatiBela) {
                                      fr++;
                                      result[ix] = 0;
                                  }
                              }
                          }
                      } else {
                          var p = design.navigate(board.player, pos, 0);
                          var q = design.navigate(board.player, pos, 6);
                          if (isMikul && (p !== null) && (q !== null) && (result.length > 1)) {
                              var piece = board.getPiece(p);
                              if ((piece !== null) && (Math.abs(+piece.getValue(0)) == Math.abs(result[ix - 1]))) {
                                  captured.push(p);
                                  captured.push(q);
                                  fr++;
                                  result[ix] = 0;
                              }
                          }
                      }
                  }
              }
          }
          var pos = move.actions[0][0][0];
          for (var ix = 0; ix < result.length; ix++) {
               if (_.indexOf(captured, pos) >= 0) {
                   fr += result[ix];
                   result[ix] = 0;
                   captured = _.without(captured, pos);                   
               }
               pos = design.navigate(board.player, pos, 0);
          }
          _.each(captured, function(pos) {
               piece = board.getPiece(pos);
               if (piece !== null) {
                   fr += Math.abs(+piece.getValue(0));
                   move.capturePiece(pos);
               }
          });
          var pos = move.actions[0][0][0];
          for (var ix = 0; ix < result.length; ix++) {
               if (design.inZone(1, board.player, pos)) {
                   result[ix] = addReserve(result[ix], fr);
                   fr = 0;
               }
               var player = board.player;
               if (!design.inZone(0, board.player, pos) && !design.inZone(1, board.player, pos) && (result[ix] > 0)) {
                   player = design.nextPlayer(player);
               }
               var piece = createPiece(design, player, result[ix]);
               if (result[ix] == 0) {
                   if (ix > 0) {
                       move.capturePiece(pos);
                       if (ix == 1) {
                           move.actions[0][2] = [ Dagaz.Model.createPiece(1, board.player) ];
                       }
                   }
               } else {
                   if (piece !== null) {
                       if (ix == 1) {
                           move.actions[0][2] = [ piece ];
                       } else {
                           if ((ix > 0) && (board.getPiece(pos) !== null)) {
                               move.movePiece(pos, pos, piece);
                           } else {
                               move.dropPiece(pos, piece);
                           }
                       }
                   }
               }
               pos = design.navigate(board.player, pos, 0);
          }
          if (!isPool && (fr == 0)) {
               _.each(design.allPositions(), function(pos) {
                    if (design.inZone(1, board.player, pos)) {
                        var piece = board.getPiece(pos);
                        if (piece !== null) {
                            var value = +piece.getValue(0);
                            if (value < 0) {
                                piece = piece.setValue(0, -value);
                                move.movePiece(pos, pos, piece);
                            }
                        }
                    }
               });
          }
          toReserve(design, board, board.player, move, fr);
      }
  });
  var ko = [];
  _.each(design.allPositions(), function(pos) {
      if (design.inZone(1, board.player, pos)) return;
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var value = +piece.getValue(0);
          if ((value !== null) && (value < -1)) {
              ko.push(pos);
          }
      }
  });
  if (ko.length > 0) {
      board.ko = ko;
  }
  CheckInvariants(board);
}

})();
