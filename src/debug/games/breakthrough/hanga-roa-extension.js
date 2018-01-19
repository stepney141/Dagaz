(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "hanga-roa-extension") {
      checkVersion(design, name, value);
  }
}

var moaiCheck = function(player, piece) {
  return (piece.player == player) && (piece.type == 0);
}

var arikiCheck = function(player, piece) {
  return false;
}

var isCaptured = function(design, board, player, pos, dirs, check) {
  var r = true;
  _.each(dirs, function(dir) {
      var p = design.navigate(player, pos, dir);
      if (p !== null) {
          var piece = board.getPiece(p);
          if ((piece === null) || check(player, piece)) {
              r = false;
          }
      }
  });
  return r;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var moai    = design.getPieceType("Moai");
  var enemies = 0;
  var friends = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == moai)) {
          if (piece.player != player) {
              enemies++;
          } else {
              friends++;
          }
      }
  });
  if (enemies < 1) {
      return 1;
  }
  if (friends < 1) {
      return -1;
  }
  return checkGoals(design, board, player);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var moai   = design.getPieceType("Moai");
  var ariki  = design.getPieceType("Ariki");
  var n  = design.getDirection("n");  var w  = design.getDirection("w");
  var s  = design.getDirection("s");  var e  = design.getDirection("e");
  var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
  var ne = design.getDirection("ne"); var se = design.getDirection("se");
  var dirs = [n, e, w, s, nw, ne, sw, se];
  _.each(board.moves, function(move) {
      var b  = board.apply(move);
      var pn = _.chain(move.actions).map(function(a) { return a[3];}).max().value();
      _.each(design.allPositions(), function(pos) {
          var piece = b.getPiece(pos);
          if (piece !== null) {
              if ((piece.type == moai) && (piece.player != board.player)) {
                  if (isCaptured(design, b, piece.player, pos, dirs, moaiCheck)) {
                      move.capturePiece(pos, pn);
                  }
              }
              if (piece.type == ariki) {
                  if (isCaptured(design, b, piece.player, pos, dirs, arikiCheck)) {
                      var br = design.getDirection("br");
                      var p = design.navigate(board.player, 0, br);
                      while (p !== null) {
                          if (b.getPiece(p) === null) {
                              move.movePiece(pos, p, piece, pn);
                              break;
                          }
                          p = design.navigate(board.player, p, br);
                      }
                  }
              }
          }
      });
  });
  CheckInvariants(board);
}

})();
