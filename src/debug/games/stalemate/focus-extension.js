(function() {

Dagaz.View.SHIFT_X = 2;
Dagaz.View.SHIFT_Y = 1;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "focus-extension") {
      checkVersion(design, name, value);
  }
}

var drawBar = function(ctx, x, y, height, val) {
  var h = (height / val.length) | 0;
  var w = 2;
  if (h < 2) {
      h = 2;
      w = 1;
  }
  var last = null;
  var offset = 0;
  for (var i = 0; i < val.length; i++) {
       var isWhite = (val[i] == 1);
       if ((last !== null) && (last == val[i])) {
           ctx.fillStyle = "#000000";
           ctx.fillRect(x, y + offset - 1, 4, w);
       }
       if (isWhite) {
           ctx.fillStyle = "#FFFFFF";
       } else {
           ctx.fillStyle = "#888888";
       }
       ctx.fillRect(x, y + offset, 4, h);
       offset += h; height -= h;
       if (height < h) break;
       last = val[i];
  }
}

Dagaz.View.showPiece = function(view, ctx, frame, pos, piece, model, x, y) {
  var val = null;
  if (model) {
      val = model.getValue(0);
  }
  if (!val) {
      val = null;
  }
  if ((val !== null) && (val.length > 0)) {
      var t = val.substr(0, 1);
      var back = null;
      var f = (t == 1);
      if (f) {
          back = view.piece["White Man"];
      } else {
          back = view.piece["Black Man"];
      }
      if (back !== null) {
          ctx.save();
          ctx.translate(x + frame.dx / 2, y + frame.dy / 2); 
          ctx.scale(0.95, 0.95);
          ctx.translate(-x - frame.dx /2, -y - frame.dy /2);
          ctx.drawImage(back.h, x + 1, y + 2, piece.dx, piece.dy);
          drawBar(ctx, x + 42, y - 2, 46, val);
          ctx.restore();
          x -= 5;
          y -= 5;
      }
  } else {
      x += 2;
  }
  ctx.drawImage(piece.h, x, y, piece.dx, piece.dy);
}

var prepareStack = function(design, board, player, stack, move) {
  var tail = "";
  var i = 0;
  for (; i < stack.length; i++) {
      if (i >= 4) break;
      tail = tail + stack[i];
  }
  var cnt = 0;
  for (; i < stack.length; i++) {
      if (stack[i] == player) cnt++;
  }
  var piece = Dagaz.Model.createPiece(0, player);
  var dir = design.getDirection("wr");
  var pos = Dagaz.Model.stringToPos("a1", design);
  while ((pos !== null) && (cnt > 0)) {
      pos = design.navigate(player, pos, dir);
      if ((pos !== null) && (board.getPiece(pos) === null)) {
          move.dropPiece(pos, piece);
          cnt--;
      }
  }
  return tail;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.isSimpleMove()) {
          var piece  = board.getPiece(move.actions[0][0][0]);
          var target = board.getPiece(move.actions[0][1][0]);
          if ((piece !== null) && (target !== null)) {
               var stack = piece.getValue(0);
               if (stack === null) stack = "";
               stack = stack + target.player;
               var tail = target.getValue(0);
               if (tail !== null) {
                   stack = stack + tail;
               }
               stack = prepareStack(design, board, board.player, stack, move);
               piece = piece.setValue(0, stack);
               move.actions[0][2] = [ piece ];
          }
      }
  });
  CheckInvariants(board);
}

})();
