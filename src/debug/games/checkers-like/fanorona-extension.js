(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "fanorona-extension") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.chain(board.moves)
   .filter(function(move) {
        return move.actions.length > 1;
    })
   .each(function(move) {
        var actions = [];
        var mx = _.chain(move.actions)
         .map(function(action) {
              return action[3];
          }).max().value();
        var last = null;
        for (var part = 1; part <= mx; part++) {
             var from = null;
             var to   = null;
             var pos  = null;
             _.chain(move.actions)
              .filter(function(action) {
                   return (action[3] == part);
               })
              .each(function(action) {
                   if ((action[0] !== null) && (action[1] !== null)) {
                       from = action[0][0];
                       to = action[1][0];
                   }
                   if ((action[0] !== null) && (action[1] === null)) {
                       pos = action[0][0];
                   }
               });
             if ((last !== null) && (design.findDirection(last, from) == design.findDirection(from, to))) {
                 move.failed = true;
                 break;
             }
             last = from;
             var cn =_.chain(board.moves)
              .filter(function(move) {
                 return _.chain(move.actions)
                  .filter(function(action) {
                       if ((action[3] != part)) return false;
                       if ((action[0] === null) || (action[1] === null)) return false;
                       return (action[0][0] == from) && (action[1][0] == to);
                   }).size().value() > 0;
               })
              .map(function(move) {
                 return _.chain(move.actions)
                  .filter(function(action) {
                       if ((action[3] != part)) return false;
                       if ((action[0] === null) || (action[1] !== null)) return false;
                       return action[0][0];
                   }).max().value();
               }).uniq().size().value();
             var dir = design.findDirection(from, pos);
             if (dir === null) {
                 dir = design.findDirection(to, pos);
             }
             if ((pos === null) || (dir == null)) {
                 move.failed = true;
                 return;
             }
             actions.push([ [from], [to], null, (cn < 2) ? part : (((part - 1) * 2) + 1) ]);
             while (pos !== null) {
                  actions.push([ [pos], null, null, (cn < 2) ? part : (((part - 1) * 2) + 2) ]);
                  pos = design.navigate(board.player, pos, dir);
                  if (pos !== null) {
                      var piece = board.getPiece(pos);
                      if ((piece === null) || (piece.player == board.player)) {
                          pos = null;
                          break;
                      }
                  }
             }
        }
        move.actions = actions;
    });
  CheckInvariants(board);
}

})();
