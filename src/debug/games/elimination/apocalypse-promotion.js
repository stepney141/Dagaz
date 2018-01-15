(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "apocalypse-promotion") {
     checkVersion(design, name, value);
  }
}

var countPieces = function(design, board, type) {
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == type)) {
          r++;
      }
  });
  return r;
}

var getPrice = function(design, board, move) {
  if (move.isSimpleMove()) {
      var pos = move.actions[0][0][0];
      var piece = board.getPiece(pos);
      if (piece !== null) {
          return piece.type;
      }
  }
  return 0;
}

Dagaz.Model.join = function(design, board, a, b) {
  var x = getPrice(design, board, a);
  var y = getPrice(design, board, b);
  if (x > y) {
      return Dagaz.Model.join(design, board, b, a);
  }
  if (a.isSimpleMove() && b.isSimpleMove()) {
      var knight  = design.getPieceType("Knight");
      var limit   = 4 - countPieces(design, board, knight);
      var pos     = a.actions[0][0][0];
      var piece   = board.getPiece(pos);
      if (piece !== null) {
          if ((a.actions[0][2] !== null) && (a.actions[0][2][0].type != piece.type)) {
              var target = a.actions[0][1][0];
              var enemy  = board.getPiece(target);
              if ((enemy !== null) && (enemy.type == knight) && (target != b.actions[0][0][0])) {
                  limit++;
              }
              if (limit > 0) {
                  x = 1;
                  limit--;
              } else {
                  a.actions[0][2] = [ piece ];
              }
          }
      }
      pos   = b.actions[0][0][0];
      piece = board.getPiece(pos);
      if (piece !== null) {
          if ((b.actions[0][2] !== null) && (b.actions[0][2][0].type != piece.type)) {
              var target = b.actions[0][1][0];
              var enemy  = board.getPiece(target);
              if ((enemy !== null) && (enemy.type == knight)) {
                  limit++;
              }
              if (limit > 0) {
                  y = 1;
                  limit--;
              } else {
                  b.actions[0][2] = [ piece ];
              }
          }
      }
      a.actions.push(b.actions[0]);
      if (/*(x == y) && */ (a.actions[0][1][0] == b.actions[0][1][0])) {
          a.actions[0][2] = [ Dagaz.Model.createPiece(2, 1) ];
          a.actions[1][2] = [ Dagaz.Model.createPiece(2, 1) ];
          a.capturePiece(a.actions[0][1][0]);
      }
  }
  return a;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var knight  = design.getPieceType("Knight");
  var enemies = 0;
  var friends = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == knight)) {
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
  var n = design.getDirection("n");
  _.each(board.moves, function(move) {
      if (move.isSimpleMove() && (move.mode == 0)) {
          var pos = design.navigate(board.player, move.actions[0][1][0], n);
          if (pos === null) {
              move.failed = true;
          }
      }
  });
  CheckInvariants(board);
}

})();
