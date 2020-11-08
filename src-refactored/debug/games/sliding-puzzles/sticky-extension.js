(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "sticky-extension") {
     checkVersion(design, name, value);
  }
}

var isEqual = function(a, b) {
  if ((a == 0) || (b == 0)) return false;
  return a == b;
}

var calcType = function(board, player, pos, piece) {
  var design = Dagaz.Model.design;
  var value  = piece.getValue(1);
  var name   = piece.type.slice(0, 1);
  _.each(_.range(design.dirs.length), function(dir) {
      var c = "0";
      var p = design.navigate(player, pos, dir);
      if (p !== null) {
          var neighbor = board.getPiece(p);
          if ((neighbor !== null) && isEqual(neighbor.getValue(1), value)) {
              c = "1";
          }
      }
      name += c;
  });
  return design.getPieceType(name);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  CheckInvariants(board);
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var b = board.apply(move);
      _.chain(move.actions)
       .map(function(action) {
           return action[1];
        })
       .flatten()
       .compact()
       .uniq()
       .map(function(pos) {
           var piece = b.getPiece(pos);
           if (piece === null) return null;
           var value = piece.getValue(1);
           var r = [ pos ];
           _.each(_.range(design.dirs.length), function(dir) {
               var p = design.navigate(board.player, pos, dir);
               if (p !== null) {
                   var neighbor = b.getPiece(p);
                   if ((neighbor !== null) && isEqual(neighbor.getValue(1), value)) {
                       r.push(p);
                   }
               }
           });
           return r;
        })
       .flatten()
       .compact()
       .uniq()
       .each(function(pos) {
           var piece = b.getPiece(pos);
           if (piece === null) return;
           var type = calcType(b, board.player, pos, piece);
           if (type === null) return;
           if (type == piece.type) return;
           var value = piece.getValue(1);
           piece = piece.promote(type).setValue(0);
           _.chain(move.actions)
            .filter(function(action) {
                return action[1] == pos;
             })
            .each(function(action) {
                action[2] = [ piece ];
             });
        });
  });
}

})();
