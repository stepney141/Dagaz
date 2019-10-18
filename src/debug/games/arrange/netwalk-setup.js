(function() {

Dagaz.View.MARK_R = 0;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "netwalk-setup") {
      checkVersion(design, name, value);
  }
}

var getSetup = function() {
  var str = window.location.search.toString();
  var result = str.match(/\?setup=([^&]*)/);
  if (result) {
      return result[1];
  } else {
      return "";
  }
}

var getSeed = function() {
  var str = window.location.search.toString();
  var result = str.match(/\?seed=([^&]*)/);
  if (result) {
      return result[1];
  } else {
      return "" + _.random(0, 10000);
  }
}

var checkAround = function(design, board, pos) {
  var r = true;
  _.each(design.allDirections(), function(dir) {
      var p = design.navigate(1, pos, dir);
      if ((p === null) || (board.getPiece(p) !== null)) {
          r = false;
          return;
      }
  });
  return r;
}

var getRestrictedMask = function(design, board, pos, dirs) {
  var r = 0;
  while (dirs.length > 0) {
      r = r << 1;
      var dir = dirs.shift();
      var p = design.navigate(1, pos, dir);
      if ((p === null) || (board.getPiece(p) !== null)) {
          r = r | 1;
      }
  }
  return r;
}

var getTypes = function(design, filled, restricted) {
  var r = [];
  for (var t = 1; t <= 8; t++) {
       var flags = design.price[t];
       if (((flags & filled) != 0) && ((flags & restricted) == 0)) {
           r.push(t);
       }
  }
  return r;
}

var setup = Dagaz.Model.setup;

Dagaz.Model.setup = function(board) {
  var seed = 0; // getSeed();
  console.log("Seed: " + seed);
  Math.seedrandom(seed);
  if (getSetup()) {
      setup(board);
      return;
  }
  var design = Dagaz.Model.design;
  var queue = [];
  var cnt = 1; // _.random(2, 5);
  var piece = Dagaz.Model.createPiece(0, 1);
  while (cnt > 0) {
      var pos = _.random(0, design.positions.length - 10);
      if ((board.getPiece(pos) === null) && checkAround(design, board, pos)) {
          board.setPiece(pos, piece);
          queue.push(pos);
          cnt--;
      }
  }
  while (queue.length > 0) {
      var pos = queue.shift();
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var flags = design.price[piece.type];
          var dirs  = [2, 0, 1, 3];
          var mask  = [2, 3, 0, 1];
          while (dirs.length > 0) {
              var dir = dirs.shift();
              var f = 1 << mask.shift();
              if ((flags & 1) == 1) {
                  var p = design.navigate(1, pos, dir);
                  if ((p !== null) && (board.getPiece(p) === null)) {
                      var r = getRestrictedMask(design, board, pos, [3, 1, 0, 2]);
                      var types = getTypes(design, f, r);
                      if (types.length > 0) {
                          var ix = 0;
                          if (types.length > 1) {
                              ix = _.random(0, types.length - 1);
                          }
                          var piece = Dagaz.Model.createPiece(types[ix], 1);
                          board.setPiece(p, piece);
                          queue.push(p);
                      }
                  }
              }
              flags = flags >> 1;
          }
      }
  }
}

})();
