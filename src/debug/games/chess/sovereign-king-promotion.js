(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "sovereign-chess-promotion") {
     checkVersion(design, name, value);
  }
}

var getColors = function(board) {
  var p = board.player;
  var f = board.getValue(p);
  if (f === null) f = p;
  if (p == 1) {
      p = 2;
  } else {
      p = 1;
  }
  var e = board.getValue(p);
  if (e === null) e = p;
  return {
      friend: [f],
      enemy:  [e]
  };
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var c = getColors(board);
  var king = null;
  _.each(design.allPositions(), function(pos) {
      if (king !== null) return;
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (_.indexOf(c.friend, piece.player) < 0) return;
      if (piece.type != 5) return;
      king = pos;
  });
  Dagaz.Model.expandColors(design, board, c.friend, c.enemy);
  Dagaz.Model.expandColors(design, board, c.enemy, c.friend);
  if ((king !== null) && (c.friend.length > 1)) {
      var piece = board.getPiece(king);
      var m = Dagaz.Model.createMove(0);
      m.movePiece(king, king, piece);
      var pieces = [];
      _.each(c.friend, function(player) {
          pieces.push(piece.changeOwner(player));
      });
      board.moves.push(m);
  }
  CheckInvariants(board);
}

})();
