(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "columns-checkers-extension") {
     checkVersion(design, name, value);
  }
}

var PostActions = Dagaz.Model.PostActions;

Dagaz.Model.PostActions = function(board) {
  PostActions(board);
  for (var i in board.moves) {
       var m = board.moves[i];
       var captured = [];
       var piece = null;
       for (var j in m.actions) {
            var fp = m.actions[j][0];
            var tp = m.actions[j][1];
            var pc = m.actions[j][2];
            if ((fp !== null) && (tp !== null)) {
                if (piece === null) {
                    piece = board.getPiece(fp[0]);
                }
                if ((pc !== null) && _.isObject(pc[0])) {
                    piece.pop();
                    piece.push(pc[0]);
                }
                while (captured.length > 0) {
                    piece.unshift(captured.pop());
                }
                m.actions[j][2] = [ piece ];
            }
            if ((fp !== null) && (tp === null)) {
                var p = board.getPiece(fp[0]);
                captured.push(p.pop());
                if (p.length > 0) {
                    m.actions[j][1] = fp;
                    m.actions[j][2] = [ p ];
                }
            }
       }
  }
}

})();
