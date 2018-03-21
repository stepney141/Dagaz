(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "mancala-goal") {
      checkVersion(design, name, value);
  }
}

var getReserve = function(design, board, player, dir) {
  var pos = design.navigate(player, 0, dir);
  if (pos !== null) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          return piece.getValue(0);
      }
  }
  return 0;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var fr = getReserve(design, board, player, 2);
  var er = getReserve(design, board, player, 3);
  if (fr > Dagaz.Model.WIN_CNT) return 1;
  if (er > Dagaz.Model.WIN_CNT) return -1;
  var fc = 0; var ec = 0;
  for (var pos = design.positions.length - 3; pos >= 0; pos--) {
       var piece = board.getPiece(pos);
       if (piece !== null) {
           var value = piece.getValue(0);
           if (value !== null) {
               if (piece.player == board.player) {
                   fc += value;
               } else {
                   ec += value;
               }
           }
       }
  }
  console.log("player = " + player + ", board.player = " + board.player + ", fr = " + fr + ", er = " + er + ", fc = " + fc + ", ec = " + ec);
  if (fc == 0) {
      if (board.player == player) {
          er += ec;
      } else {
          fr += ec;
      }
      if (fr > er) return 1;
      if (fr < er) return -1;
      return 0;
  }
  return checkGoals(design, board, player);
}

})();
