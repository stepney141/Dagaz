(function() {

var blink = 1;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "stapeldammen-extension") {
     checkVersion(design, name, value);
  }
}

var nextPlayer = function(player) {
  if (player == 1) {
      return 2;
  } else {
      return 1;
  }
}

Dagaz.View.showPiece = function(view, ctx, frame, pos, piece, model, x, y) {
  var dx = 0;
  var value = null;
  if (model) {
      value = +model.getValue(0);
  }
  if (Dagaz.Model.showBlink && (_.indexOf(view.current, pos) >= 0)) {
      dx = blink;
      blink = -blink;
  }
  var isSaved = false;
  if ((value !== null) && (value > 0)) {
      var stack = [];
      while (value > 0) {
          stack.push(value % 10);
          value = (value / 10) | 0;
      }
      var s = stack.length * 5;
      if (s > 15) s = 15;
      y += s;
      while (stack.length > 0) {
          var player = stack.pop();
          var p = view.piece["Red Man"];
          if (player == 1) {
              p = view.piece["White Man"];
          }
          ctx.drawImage(p.h, x + dx, y, piece.dx, piece.dy);
          y -= 5;
      }
  } else {
      if ((model.type == 0) && (_.indexOf(view.strike, pos) >= 0)) {
          ctx.save();
          ctx.globalAlpha = 0.5;
          isSaved = true;
      }
  }
  ctx.drawImage(piece.h, x + dx, y, piece.dx, piece.dy);
  if (isSaved) {
      ctx.restore();
  }
}

var pushToBottom = function(piece) {
  var value  = +piece.getValue(0);
  var player = nextPlayer(piece.player);
  if (value === null) {
      value = player;
  } else {
      var v = value;
      while (v > 0) {
          player *= 10;
          v = (v / 10) | 0;
      }
      value += player;
  }
  return piece.setValue(0, value);
}

var popFromTop = function(piece) {
  var value = +piece.getValue(0);
  if ((value === null) || (value == 0)) return null;
  var player = value % 10;
  value = (value / 10) | 0;
  var r = Dagaz.Model.createPiece(0, player);
  if (value > 0) {
      r = r.setValue(0, value);
  }
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var actions   = [];
      var capturing = null;
      var piece     = null;
      _.each(move.actions, function(a) {
          if (a[0] !== null) {
              if (a[1] !== null) {
                  if (piece === null) {
                      piece = board.getPiece(a[0][0]);
                  }
                  if (capturing !== null) {
                      var enemy = board.getPiece(capturing[0][0]);
                      if (enemy !== null) {
                          piece = pushToBottom(piece);
                          a[2]  = [ piece ];
                          enemy = popFromTop(enemy);
                          if (enemy !== null) {
                              capturing[1] = capturing[0];
                              capturing[2] = [ enemy ];
                          }
                      }
                      actions.push(a);
                      actions.push(capturing);
                      capturing = null;                          
                  } else {
                      actions.push(a);
                  }
              } else {
                  capturing = a;
              }
          }
      });
      move.actions = actions;
  });
  CheckInvariants(board);
}

})();
