(function() {

Dagaz.Model.WIN_CNT = 27;
Dagaz.Model.SIZE    = 18;
Dagaz.Model.HALF    = 9;

Dagaz.View.DX       = 0;
Dagaz.View.DY       = 0;
Dagaz.View.MX       = 25;

var cache = [];

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "selus-extension") {
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

var toReserve = function(design, board, player, move, cnt) {
  var pos = design.navigate(player, 0, 1);
  if ((cnt != 0) && (pos !== null)) {
      piece = board.getPiece(pos);
      if (piece === null) {
          piece = Dagaz.Model.createPiece(0, player);
          piece = piece.setValue(0, cnt);
          move.dropPiece(pos, piece);
      } else {
          cnt += Math.abs(+piece.getValue(0));
          piece = piece.setValue(0, cnt);
          move.movePiece(pos, pos, piece);
      }
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var noCapturing = (board.getValue(1) === null) || (board.getValue(2) === null);
  _.each(board.moves, function(move) {
      var fr  = 0;
      var dir = 0;
      if (move.isSimpleMove()) {
          var isCollision = false;
          var pos = move.actions[0][0][0];
          if (design.inZone(1, board.player, pos)) {
              move.failed = true;
              return;
          }
          if (board.getValue(board.player) === null) {
              move.setValue(board.player, 1);
          }
          var piece = board.getPiece(pos);
          var cnt = +piece.getValue(0);
          cnt = Math.abs(cnt);
          if (_.isUndefined(cache[piece.player])) {
              cache[piece.player] = [];
              cache[piece.player][cnt] = piece;
          }
          var positions = [];
          var result = [];
          if (piece.getValue(1) === null) {
              result.push(0);
          } else {
              result.push(piece.getValue(1));
          }
          positions.push(pos);
          for (var ix = 1; cnt > 0; cnt--, ix++) {
               pos = design.navigate(board.player, pos, dir);
               if (pos === null) {
                   move.failed = true;
                   return;
               }
               positions.push(pos);
               if (ix >= Dagaz.Model.SIZE) {
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
          // TODO: Capturing

          if (result[ix] != 1) {
              result[ix] = -result[ix];
          }
          var pos = move.actions[0][0][0];
          for (var ix = 0; ix < result.length; ix++) {
               var player = board.player;
               if (!design.inZone(0, board.player, pos) && (result[ix] > 0)) {
                   player = design.nextPlayer(board.player);
               }
               if (isCollision && (result[ix] < 0)) {
                   player = design.nextPlayer(board.player);
               }
               var piece = createPiece(design, player, result[ix]);
               if (isCollision && (result[ix] < 0)) {
                   piece = piece.setValue(1, 1);
               }
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
                               var x = board.getPiece(pos);
                               if ((x !== null) && (x.player != board.player) && (+x.getValue(0) < 0)) {
                                   piece = piece.changeOwner(x.player);
                                   piece = piece.setValue(0, -(Math.abs(+piece.getValue(0)) + Math.abs(+x.getValue(0))));
                               }
                               move.movePiece(pos, pos, piece);
                           } else {
                               move.dropPiece(pos, piece);
                           }
                       }
                   }
               }
               pos = design.navigate(board.player, pos, dir);
          }
          toReserve(design, board, board.player, move, fr);
      }
  });
  var ko = [];
  _.each(design.allPositions(), function(pos) {
      if (design.inZone(1, board.player, pos)) return;
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.player == board.player)) {
          var value = +piece.getValue(0);
          if ((value !== null) && (value < 0)) {
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
