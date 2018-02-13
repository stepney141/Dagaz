(function() {

Dagaz.AI.AI_FRAME = 3000;
Dagaz.AI.isForced = Dagaz.AI.isChessForced;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "spock-extension") {
      checkVersion(design, name, value);
  }
}

var findSpock = function(design, board, player, pos, o, d) {
  var p = design.navigate(player, pos, o);
  if (p === null) return 0;
  p = design.navigate(player, p, d);
  if (p === null) return 0;
  var piece = board.getPiece(p);
  if (piece === null) return 0;
  if (piece.type != 0) return 0;
  if (piece.player == player) {
      return 1;
  } else {
      return -1;
  }
}

var spockBalance = function(design, board, player, pos) {
  var r = 0;
  var n  = design.getDirection("n");  var w  = design.getDirection("w");
  var s  = design.getDirection("s");  var e  = design.getDirection("e");
  var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
  var ne = design.getDirection("ne"); var se = design.getDirection("se");
  r += findSpock(design, board, player, pos, n, nw);
  r += findSpock(design, board, player, pos, n, ne);
  r += findSpock(design, board, player, pos, s, sw);
  r += findSpock(design, board, player, pos, s, se);
  r += findSpock(design, board, player, pos, w, nw);
  r += findSpock(design, board, player, pos, w, sw);
  r += findSpock(design, board, player, pos, e, ne);
  r += findSpock(design, board, player, pos, e, se);
  return r;
}

var heuristic = Dagaz.AI.heuristic;

Dagaz.AI.heuristic = function(ai, design, board, move) {
  if ((move.actions.length > 0) && (move.actions[0][0] !== null) && (move.actions[0][1] !== null)) {
      var pos = move.actions[0][0][0];
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == 0)) {
          pos = move.actions[0][1][0];
          var enemy = board.getPiece(pos);
          if ((enemy !== null) && (enemy.player != board.player) && (enemy.type == 4)) {
              return design.price[piece.type];;
          } else {
              return -1;
          }
      }
  }
  return heuristic(ai, design, board, move);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var spock  = design.getPieceType("Spock");
  _.each(board.moves, function(m) {
      if ((m.actions.length == 1) && (m.actions[0][0] !== null) && (m.actions[0][1] !== null)) {
           var pos = m.actions[0][0][0];
           var piece = board.getPiece(pos);
           if ((piece !== null) && (piece.type == spock)) {
                var target = m.actions[0][1][0];
                var piece = board.getPiece(target);
                if (piece !== null) {
                    var type = piece.type + 1;
                    if (type >= 5) {
                        type = 0;
                    }
                    piece = Dagaz.Model.createPiece(type, board.player);
                    m.dropPiece(pos, piece);
                }
           }
      }
  });
  CheckInvariants(board);
}

})();
