(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "fanorona-invariant") {
      checkVersion(design, name, value);
  }
}

var isMove = function(action) {
  return (action[0] !== null) && (action[1] !== null);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var positions = [];
      var last-delta = 0;
      _.chain(move.actions)
       .filter(isMove)
       .each(function(a) {
           if (positions.length == 0) {
               positions.push(a[0][0]);
               positions.push(a[1][0]);
               last-delta = a[1][0] - a[0][0];
           } else {
               var delta = a[1][0] - a[0][0];
               if ((last-delta == delta) || (_.indexOf(positions, a[1][0]) >= 0)) {
                   move.failed = true;
               }
               positions.push(a[1][0]);
               last-delta = delta;
           }
       });
  });
  CheckInvariants(board);
}

})();
