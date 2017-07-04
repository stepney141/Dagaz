(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "fanorona-extension") {
     checkVersion(design, name, value);
  }
}

var getParts = function(moves, part) {
  return _.chain(moves)
   .map(function(move) {
        var actions = _.chain(move.actions)
         .filter(function(action) {
             return (action[0] !== null) && (action[1] !== null);
          })
         .filter(function(action) {
             return action[3] == part;
          })
         .value();
        if (actions.length > 0) {
            return {
               action: actions[0],
               move:   move
            };
        } else {
            return null;
        }
    })
   .compact().value();
}

var isEqual = function(a, b) {
  return (a[0][0] == b[0][0]) && (a[1][0] == b[1][0]);
}

var markMove = function(move, part) {
  if (_.isUndefined(move.changed)) {
      move.changed = [];
  }
  move.changed.push(part);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var parts = getParts(board.moves, 0);
  for (var i = 0; parts.length > 1; i++) {
       for (var j = 0; j < parts.length - 1; j++) {
            var isFound = false;
            for (var k = j + 1; k < parts.length; k++) {
                if (isEqual(parts[j].action, parts[k].action)) {
                    markMove(parts[k].move, i);
                    isFound = true;
                }
            }
            if (isFound) {
                markMove(parts[j].move, i);
            }
       }
       parts = getParts(board.moves, i + 1);
  }
  _.each(board.moves, function(move) {
      var pos = 0;
      if (move.changed) {
          _.each(move.actions, function(action) {
              if (pos < move.changed.length) {
                  while (move.changed[pos] < action[3]) pos++;
                  if ((move.changed[pos] == action[3]) && (action[0] !== null) && (action[1] === null)) {
                      action[3]++;
                  }
              }
              action[3] += pos;
          });
      }
  });
  CheckInvariants(board);
}

})();
