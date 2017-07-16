(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "chessence-extension") {
      checkVersion(design, name, value);
  }
}

var getX = function(pos) {
  return pos % 8;
}

var getY = function(pos) {
  return (pos / 8) | 0;
}

var notFriend = function(design, board, pos, dir) {
  var p = design.navigate(board.player, pos, dir);
  if (p === null) return true;
  var piece = board.getPiece(p);
  if (piece === null) return true;
  return piece.player == board.player;
}

var Extension = Dagaz.Model.Extension;

Dagaz.Model.Extension = function(board) {
  var design = Dagaz.Model.design;
  var n   = design.getDirection("n");   var w   = design.getDirection("w");
  var s   = design.getDirection("s");   var e   = design.getDirection("e");
  var nw  = design.getDirection("nw");  var sw  = design.getDirection("sw");
  var ne  = design.getDirection("ne");  var se  = design.getDirection("se");
  var nnw = design.getDirection("nnw"); var ssw = design.getDirection("ssw");
  var nne = design.getDirection("nne"); var sse = design.getDirection("sse");
  var nww = design.getDirection("nww"); var sww = design.getDirection("sww");
  var nee = design.getDirection("nee"); var see = design.getDirection("see");
  _.chain(board.moves)
   .filter(function(move) {
       return move.actions.length > 0;
    })
   .each(function(move) {
       _.chain(move.actions)
        .filter(function(action) {
             return (action[0] !== null) && (action[1] !== null);
         })
        .chain(function(action) {
             var pos = action[0][0];
             var fx  = getX(action[0][0]); var fy = getY(action[0][0]);
             var tx  = getX(action[1][0]); var ty = getY(action[1][0]);
             if ((fx == tx) || (fy == ty)) {
                 if (notFriend(design, board, pos, n) &&
                     notFriend(design, board, pos, s) &&
                     notFriend(design, board, pos, w) &&
                     notFriend(design, board, pos, e)) {
                     move.failed = true;
                 }
                 return;
             }
             if (Math.abs(tx - fx) == Math.abs(ty - fy)) {
                 if (notFriend(design, board, pos, nw) &&
                     notFriend(design, board, pos, se) &&
                     notFriend(design, board, pos, sw) &&
                     notFriend(design, board, pos, ne)) {
                     move.failed = true;
                 }
                 return;
             }
             if (notFriend(design, board, pos, nnw) &&
                 notFriend(design, board, pos, nne) &&
                 notFriend(design, board, pos, ssw) &&
                 notFriend(design, board, pos, sse) &&
                 notFriend(design, board, pos, nww) &&
                 notFriend(design, board, pos, nee) &&
                 notFriend(design, board, pos, sww) &&
                 notFriend(design, board, pos, see)) {
                 move.failed = true;
             }
         });
    });
  Extension(board);
}

})();
