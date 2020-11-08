(function() {

var rowSize = function(design) {
  return _.chain(design.positionNames)
   .filter(function(name) {
       return name.endsWith("1");
    })
   .size()
   .value();
}

var numToPos = function(design, num, sz) {
  var pos = (+num * 2) - 1;
  if (((pos / sz | 0) % 2) == 1) {
      pos--;
  }
  return Dagaz.Model.posToString(pos, design);
}

var compareMove = Dagaz.Model.compareMove;

Dagaz.Model.compareMove = function(move, notation, board, design) {
  var m = /(\d+)[-x:](\d+)/.exec(notation);
  if (m && design) {
      var sz = rowSize(design);
      var fp = numToPos(m[1], sz);
      var tp = numToPos(m[2], sz);
      notation = Dagaz.Model.posToString(fp) +
                 Dagaz.Model.posToString(tp);
      return compareMove(move, notation);
  }
  m = /((\w\d?):)?(\w\d)/.exec(notation);
  if (m) {
      var action = _.chain(move.actions)
       .filter(function(action) {
          return (action[0] !== null) && (action[1] !== null);
        })
       .first()
       .value();
      if (Dagaz.Model.stringToPos(m[3]) == action[1][0]) {
          if (!m[2]) return true;
          var s = Dagaz.Model.posToString(action[0][0]);
          if (s.startsWith(m[2])) return true;
      }
  }
  return compareMove(move, notation, board, design);
}

})();
