(function() {

Dagaz.AI.AI_FRAME     = 1000;
Dagaz.AI.NOISE_FACTOR = 100;

var price =
  [   0, 100, 100, 100, 100, 100, 100, 100,   0,
    100, 150, 200, 200, 200, 200, 200, 150, 100,
    100, 200, 400, 400, 400, 400, 400, 200, 100,
    100, 200, 400, 500, 500, 500, 400, 200, 100,
    100, 200, 400, 500, 700, 500, 400, 200, 100,
    100, 200, 400, 500, 500, 500, 400, 200, 100,
    100, 200, 400, 400, 400, 400, 400, 200, 100,
    100, 150, 200, 200, 200, 200, 200, 150, 100,
      0, 100, 100, 100, 100, 100, 100, 100,   0 ];

Dagaz.AI.getPrice = function(design, piece, pos) {
  return price[pos];
}

Dagaz.AI.see = function(design, board, move) {
  return false;
}

var getEval = function(groups, player) {
  var d = null; var e = 0;
  _.each(groups, function(g) {
      if (g.player != player) return;
      if ((d === null) || (d > g.dame)) {
           d = g.dame;
           e = g.price;
      }
  });
  if (d === null) return 0;
  if (d == 1) return -10000;
  if (d == 2) return -100;
  return e + 1000 * d;
}

Dagaz.AI.eval = function(design, params, board, player) {
  var done = []; var groups = [];
  _.each(design.allPositions(), function(pos) {
      if (_.indexOf(done, pos) >= 0) return;
      var piece = board.getPiece(pos);
      if (piece === null) return;
      var e = null; var d = 0; var c = 0;
      var group = [ pos ];
      for (var i = 0; i < group.length; i++) {
          if ((e === null) || (e > price[group[i]])) {
               e = price[group[i]];
          }
          _.each(design.allDirections(), function(dir) {
               var p = design.navigate(player, group[i], dir);
               if (p === null) return;
               if (_.indexOf(done, p) >= 0) return;
               var x = board.getPiece(p);
               if (x === null) {
                   d++;
                   return;
               }
               if (x.player != piece.player) return;
               group.push(p);
               done.push(p);
               c++;
          });
      }
      groups.push({
          player: piece.player,
          dame:   d,
          price:  e,
          count:  c
      });
  });
  return getEval(groups, player) - 
         getEval(groups, design.nextPlayer(player));
}

})();
