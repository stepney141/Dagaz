(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "lines-drops") {
     checkVersion(design, name, value);
  }
}

var tryDir = function(design, board, player, pos, dir, type, group) {
  var p = design.navigate(player, pos, dir);
  while (p !== null) {
      var piece = board.getPiece(p);
      if (piece === null) return;
      if (piece.type != type) return;
      group.push(p);
      p = design.navigate(player, p, dir);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = board.game.design;  
  _.each(board.moves, function(move) {
      if (move.mode != 4) return;
      var piece = move.actions[0][2][0];
      var notFound = true;
      for (var pos = 0; pos < 3; pos++) {
           var x = board.getPiece(pos);
           if ((x !== null) && (x.type == piece.type)) {
               move.capturePiece(pos);
               notFound = false;
               break;
           }
      }
      if (notFound) {
          move.failed = true;
          return;
      }
      if (!_.isUndefined(board.move) && (board.move.mode == 0) && board.move.isSimpleMove()) {
          var pos = board.move.actions[0][1][0];
          var piece = board.getPiece(pos);
          if (piece === null) return;
          var captures = [];
          for (var dir = 1; dir <= 8; dir++) {
               var group = [pos];
               tryDir(design, board, 1, pos, dir, piece.type, group);
               tryDir(design, board, 0, pos, dir, piece.type, group);
               if (group.length >= 5) {
                   _.each(group, function(pos) {
                       if (_.indexOf(captures, pos) >= 0) return;
                       captures.push(pos);
                   });
               }
          }
          if (captures.length > 0) {
              move.actions = [];
              _.each(captures, function(pos) {
                 move.capturePiece(pos, 1);
              });
              move.goTo(6);
          }
      }
  });
  CheckInvariants(board);
}

})();
