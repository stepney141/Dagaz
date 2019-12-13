(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "rithmomachia-ambush") {
      checkVersion(design, name, value);
  }
}

var isC = function(piece) {
  if (Dagaz.Model.isC(piece.type)) return true;
  if (!Dagaz.Model.isP(piece.type)) return false;
  for (var ix = 0; ix < 6; ix++) {
       var t = piece.getValue(ix);
       if ((t !== null) && Dagaz.Model.isC(t)) return true;
  }
  return false;
}

var isT = function(piece) {
  if (Dagaz.Model.isT(piece.type)) return true;
  if (!Dagaz.Model.isP(piece.type)) return false;
  for (var ix = 0; ix < 6; ix++) {
       var t = piece.getValue(ix);
       if ((t !== null) && Dagaz.Model.isT(t)) return true;
  }
  return false;
}

var isS = function(piece) {
  if (Dagaz.Model.isS(piece.type)) return true;
  if (!Dagaz.Model.isP(piece.type)) return false;
  for (var ix = 0; ix < 6; ix++) {
       var t = piece.getValue(ix);
       if ((t !== null) && Dagaz.Model.isS(t)) return true;
  }
  return false;
}

var getDirs = function(dir) {
  r = [dir];
  if (dir == 1) {
      r.push(0); r.push(2);
  }
  if (dir == 3) {
      r.push(0); r.push(5);
  }
  if (dir == 4) {
      r.push(2); r.push(6);
  }
  if (dir == 7) {
      r.push(5); r.push(6);
  }
  return r;
}

var getTargets = function(design, pos, piece) {
  var r = [];
  if (isC(piece)) {
      _.each([0, 2, 5, 6], function(o) {
          var p = design.navigate(1, pos, o);
          if (p === null) return;
          r.push(p);
      });
  }
  if (isT(piece)) {
      _.each([1, 3, 4, 7], function(o) {
          var p = design.navigate(1, pos, o);
          if (p === null) return;
          _.each(getDirs(o), function(d) {
              var q = design.navigate(1, p, d);
              if (q === null) return;
              r.push(q);
          });
      });
  }
  if (isS(piece)) {
      _.each([1, 3, 4, 7], function(o) {
          var p = design.navigate(1, pos, o);
          if (p === null) return;
          p = design.navigate(1, pos, o);
          if (p === null) return;
          _.each(getDirs(o), function(d) {
              var q = design.navigate(1, p, d);
              if (q === null) return;
              r.push(q);
          });
      });
  }
  return r;
}

var isCaptured = function(pos, move) {
  for (var i = 0; i < move.actions.length; i++) {
       if ((move.actions[i][0] !== null) &&
           (move.actions[i][1] === null) &&
           (move.actions[i][0][0] == pos)) return true;
  }
  return false;
}

var getEqual = function(design, piece, target) {
  if (design.price[piece.type] == design.price[target.type]) return target.type;
  if (Dagaz.Model.isP(piece.type)) {
      for (var i = 0; i < 6; i++) {
           var p = piece.getValue(i);
           if ((p !== null) && 
               (design.price[p] == design.price[target.type])) return target.type;
           if (Dagaz.Model.isP(target.type)) {
                for (var j = 0; j < 6; j++) {
                     var q = piece.getValue(j);
                     if ((q !== null) && (design.price[p] == design.price[q])) return q;
                }
           }
      }
  }
  if (Dagaz.Model.isP(target.type)) {
      for (var j = 0; j < 6; j++) {
           var q = piece.getValue(j);
           if ((q !== null) && (design.price[piece.type] == design.price[q])) return q;
      }
  }
  return null;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = board.game.design;
  _.each(board.moves, function(move) {
      var src = move.actions[0][0][0];
      var dst = move.actions[0][1][0];
      var piece = board.getPiece(src);
      if (piece === null) return;
      _.each(getTargets(design, pos, piece), function(p) {
          if ((p == src) || isCaptured(p, move)) return;
          var target = board.getPiece(p);
          if ((target === null) || (target.player == board.player)) return;
          var e = getEqual(design, piece, target);
          var c = [];
          if (e !== null) {
              if (e == target.type) {
                  move.capturePiece(p);
                  return;
              } else {
                  c.push(e);
              }
          }
          // TODO: Ambush
          // TODO: Eruption

           
          if (c.length > 0) {
              var s = 0; var c = 0; var v = 0;
              for (var ix = 0; ix < 6; ix++) {
                   var t = target.getValue(ix);
                   if (t !== null) {
                       if (_.indexOf(c, t) >= 0) {
                           target = target.setValue(ix, null);
                       } else {               
                           s += design.price[t];
                           v += t;
                           c++;
                       }
                   }
              }
              if (c == 0) {
                  move.capturePiece(p);
                  return;
              }
              if (c > 1) {
                  target = target.promote(design.getPieceType("P" + s));
              } else {
                  target = target.promote(v);
              }
              move.movePiece(p, p, target);
          }
      });
  });
  CheckInvariants(board);
}

})();
