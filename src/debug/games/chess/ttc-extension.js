(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "ttc-extension") {
      checkVersion(design, name, value);
  }
}

var getPieceType = function(type) {
  if (type >= 6) {
      return type - 6;
  }
  return +type;
}

var createPiece = function(design, type, player, stack) {
  var piece = Dagaz.Model.createPiece(getPieceType(type), player);
  if (stack !== null) {
      piece = piece.promote(+piece.type + 6);
      piece = piece.setValue(0, stack);
  }
  return piece;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!move.isSimpleMove()) return;
      var pos = move.actions[0][0][0];
      var piece = board.getPiece(pos);
      if (piece === null) return;
      var stack = piece.getValue(0);
      var s = ""; var t = null; var p = null;
      if (stack !== null) {
          while (stack.length >= 2) {
              var tp = +stack.substr(stack.length - 1, 1);
              var pl = +stack.substr(stack.length - 2, 1);
              stack = stack.substr(0, stack.length - 2);
              if (pl == board.player) {
                  t = tp;
                  p = pl;
                  break;
              }
              s = "" + pl + tp + s;
          }
          if (stack.length < 2) {
              stack = null;
          }
          if (t !== null) {
              move.dropPiece(pos, createPiece(design, t, p, stack));
          }
      }
      pos = move.actions[0][1][0];
      target = board.getPiece(pos);
      if (target !== null) {
          s = "" + target.player + getPieceType(target.type) + s;
          var stack = target.getValue(0);
          if (stack !== null) {
              s = stack + s;
          }
      }
      if (s.length < 2) {
          s = null;
      }
      move.actions[0][2] = [createPiece(design, piece.type, piece.player, s)];
  });
  CheckInvariants(board);
}

})();
