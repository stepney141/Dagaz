(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "dtc-extension") {
      checkVersion(design, name, value);
  }
}

var addReserve = function(design, board, player, type, move, cnt) {
  if (!cnt) cnt = 1;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (piece.player != player) return;
      if (piece.type != +type + 6) return;
      var v = piece.getValue(0);
      if (v === null) { 
          v = 0;
      }
      move.movePiece(pos, pos, piece.setValue(0, v + cnt));
  });
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!move.isSimpleMove()) return;
      var pos = move.actions[0][0][0];
      var piece = board.getPiece(pos);
      if (piece === null) return;
      pos = move.actions[0][1][0];
      var target = board.getPiece(pos);
      if (target === null) return;
      var v = target.getValue(0);
      if (v !== null) {
          if (piece.getValue(0) !== null) {
              move.failed = true;
              return;
          }
          var player = ((v / 10) | 0) + 1;
          if ((target.player != board.player) || (player != board.player)) {
              var type = v % 10;
              addReserve(design, board, player, type, move);
          }
      }
      if (target.type == 5) {
          if (target.player == board.player) {
              move.failed = true;
              return;
          }
          addReserve(design, board, board.player, 5, move);
          return;
      }
      if (target.player != board.player) {
          if (piece.getValue(0) !== null) {
              addReserve(design, board, target.player, target.type, move);
          } else {
              move.actions[0][2] = [piece.setValue(0, (target.player - 1) * 10 + target.type)];
          }
          return;
      }
      if (v === null) {
          v = piece.getValue(0);
      }
      if (v !== null) {
          var player = ((v / 10) | 0) + 1;
          if (player != board.player) return;
          var type = (v % 10) + target.type;
          if (type > 5) {
              var t = type - 5;
              if (t == piece.type) {
                  addReserve(design, board, board.player, piece.type, move, 2);
              } else {
                  addReserve(design, board, board.player, t, move);
                  addReserve(design, board, board.player, piece.type, move);
              }
              move.actions[0][2] = [Dagaz.Model.createPiece(5, board.player)];
          } else {
              move.actions[0][2] = [piece.setValue(0, (board.player - 1) * 10 + type)];
          }
      }
  });
  CheckInvariants(board);
}

})();
