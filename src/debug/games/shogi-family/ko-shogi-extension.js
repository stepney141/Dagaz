(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "ko-shogi-extension") {
      checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var gf = true; var tf = 0;
  var ge = true; var te = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if ((piece.type == 0) || (piece.type == 1)) {
              if (piece.player == player) {
                  gf = false;
              } else {
                  ge = false;
              }
          }
          if ((piece.type == 38) || (piece.type == 39)) {
              if (piece.player == player) {
                  tf++;
              } else {
                  te++;
              }
          }
      }
  });
  if (gf && (tf < 2)) return -1;
  if (ge && (te < 2)) return 1;
  return checkGoals(design, board, player);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var src = null;
      var dst = null;
      var lst = null;
      var prt = 1;
      _.each(move.actions, function(a) {
          if ((a[0] !== null) && (a[1] !== null)) {
              if (src === null) {
                  src = a[0][0];
              }
              dst = a[1][0];
              prt = a[3];
              lst = a;
          }
      });
      if ((src !== null) && (dst !== null)) {
          var piece = board.getPiece(src);
          var isFired = false;
          _.each(design.allDirections(), function(dir) {
              var pos = design.navigate(board.player, dst, dir);
              if (pos !== null) {
                  var piece = board.getPiece(pos);
                  if ((piece !== null) && (piece.type == 10) && (piece.player != board.player)) {
                      isFired = true;
                  }
              }
          });
          if (!isFired && (piece !== null) && (piece.type == 10)) {
               _.each(design.allDirections(), function(dir) {
                    var pos = design.navigate(board.player, dst, dir);
                    if (pos !== null) {
                        var piece = board.getPiece(pos);
                        if ((piece !== null) && (piece.player != board.player)) {
                            move.capturePiece(pos, prt);
                        }
                    }
               });
          }
          if (isFired) {
               move.capturePiece(dst, prt);
               if (lst !== null) {
                   var piece = board.getPiece(src);
                   if (piece !== null) {
                       lst[2] = [ piece.promote(64) ];
                   }
               }
          }
      }
  });
  CheckInvariants(board);
}

})();
