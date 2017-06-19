(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "doubutsu-shogi-extension") {
      checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var kings = _.chain(design.allPositions())
   .filter(function(pos) {
       var piece = board.getPiece(pos);
       if (piece === null) return false;
       return (piece.type == 0) && (piece.player != player);
    })
   .value();
  if (kings.length == 0) {
      return 1;
  } else {
      return checkGoals(design, board, player);
  }
}

var findPiece = function(design, board, player, type) {
  var positions = design.allPositions();
  for (var i = 0; i < positions.length; i++) {
       var piece = board.getPiece(positions[i]);
       if ((piece !== null) && (piece.type == type) && (piece.player == player)) {
           return positions[i];
       }
  }
  return null;
}

var checkDirection = function(design, board, player, pos, dir, types) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return false;
  var piece = board.getPiece(p);
  if (piece == null) return false;
  if (piece.player == player) return false;
  return _.indexOf(types, piece.type) >= 0;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var king   = design.getPieceType("King");
  var za     = design.getPieceType("Za");
  var sang   = design.getPieceType("Sang");
  var jang   = design.getPieceType("Jang");
  var hu     = design.getPieceType("Hu");
  var n  = design.getDirection("n");  var w  = design.getDirection("w");
  var s  = design.getDirection("s");  var e  = design.getDirection("e");
  var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
  var ne = design.getDirection("ne"); var se = design.getDirection("se");
  _.each(board.moves, function(move) {
      var b = board.apply(move);
      var pos = findPiece(design, b, board.player, king);
      if (pos === null) {
          move.failed = true;
          return;
      }
      if (checkDirection(design, b, board.player, pos, n,  [king, za, jang, hu]) ||
          checkDirection(design, b, board.player, pos, s,  [king, jang, hu]) ||
          checkDirection(design, b, board.player, pos, w,  [king, jang, hu]) ||
          checkDirection(design, b, board.player, pos, e,  [king, jang, hu]) ||
          checkDirection(design, b, board.player, pos, nw, [king, sang, hu]) ||
          checkDirection(design, b, board.player, pos, ne, [king, sang, hu]) ||
          checkDirection(design, b, board.player, pos, sw, [king, sang]) ||
          checkDirection(design, b, board.player, pos, se, [king, sang])) {
          move.failed = true;
      }
  });
  CheckInvariants(board);
}

})();
