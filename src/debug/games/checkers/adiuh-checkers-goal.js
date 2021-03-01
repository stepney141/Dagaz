(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "adiuh-checkers-goal") {
      checkVersion(design, name, value);
  }
}

var showDigits = function(view, ctx, x, y, v) {
  for (var i = 0; i < v.length; i++) {
       var r = view.piece[v[i]];
       if (r) {
           ctx.drawImage(r.h, x, y, r.dx, r.dy);
       }
       x += 22;
  }
}

Dagaz.View.showBoard = function(board, ctx) {
  var design = Dagaz.Model.design;
  var w = 0; var b = 0;
  for (var pos = 0; pos < 64; pos++) {
       var piece = board.getPiece(pos);
       if (piece !== null) {
           var c = 1;
           var s = piece.getValue(0);
           if (s !== null) {
               c += s.length;
           }
           if (pos < 32) {
               w += c;
           } else {
               b += c;
           }
       }
  }
  w = w.toString(10);
  b = b.toString(10);
  var view = Dagaz.Controller.app.view;
  showDigits(view, ctx, 0, 5, b);
  showDigits(view, ctx, 548 - (w.length * 22), 5, w);
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  board.generate(design);
  if (board.moves.length == 0) {
      var w = 0; var b = 0;
      for (var pos = 0; pos < 64; pos++) {
           var piece = board.getPiece(pos);
           if (piece !== null) {
               var c = 1;
               var s = piece.getValue(0);
               if (s !== null) {
                   c += s.length;
               }
               if (pos < 32) {
                   w += c;
               } else {
                   b += c;
               }
           }
      }
      if (w == b) return 0;
      if (w > b) {
          if (player == 1) {
              return 1;
          } else {
              return -1;
          }
      } else {
          if (player == 1) {
              return -1;
          } else {
              return 1;
          }
      }
  }
  return checkGoals(design, board, player);
}

})();
