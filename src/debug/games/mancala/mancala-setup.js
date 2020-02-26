(function() {

Dagaz.Controller.persistense = "setup";
Dagaz.Controller.defaultLife = 3600;

var checkVersion = Dagaz.Model.checkVersion;
var cnt = 0;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "mancala-setup") {
      cnt = +value;
  } else {
      checkVersion(design, name, value);
  }
}

var getName = function() {
  var str = window.location.pathname.toString();
  var result = str.match(/\/([^.\/]+)\./);
  if (result) {
      return result[1].replace("-board", "");
  } else {
      return str;
  }
}

var badName = function(str) {
  var result = str.match(/[?&]game=([^&]*)/);
  if (result) {
      return result[1] != getName();
  } else {
      return true;
  }
}

var getCookie = function() {
  var str = document.cookie;
  var result = str.match(/dagaz\.(setup=[^*]*)/);
  if (result) {
      var r = decodeURIComponent(result[1]);
      if (badName(r)) return "";
      return "?" + r;
  } else {
      return "";
  }
}

var getMaxage = function() {
  var str = window.location.search.toString();
  var result = str.match(/[?&]cookie=(\d+)/);
  if (result) {
      return result[1];
  } else {
      return "";
  }
}

var getSetup = function() {
  var str = window.location.search.toString();
  var result = str.match(/[?&]setup=([^&]*)/);
  if (result) {
      return result[1];
  } else {
      str = getCookie();
      result = str.match(/[?&]setup=([^&]*)/);
      if (result) {
          return result[1];
      } else {
          return "";
      }
  }
}

var getTurn = function() {
  var str = window.location.search.toString();
  var result = str.match(/[?&]turn=(\d+)/);
  if (result) {
      return result[1];
  } else {
      str = getCookie();
      result = str.match(/[?&]turn=(\d+)/);
      if (result) {
          return result[1];
      } else {
          return "";
      }
  }
}

function Pattern(exec) {
    this.exec = exec;
    this.then = function (transform) {
        return new Pattern(function (str, pos) {
            var r = exec(str, pos);
            return r && { res: transform(r.res), end: r.end };
        });
    };
}

function txt(text) {
    return new Pattern(function (str, pos) {
        if (str.substr(pos, text.length) == text)
            return { res: text, end: pos + text.length };
    });
}

function rgx(regexp) {
    return new Pattern(function (str, pos) {
        var m = regexp.exec(str.slice(pos));
        if (m && m.index == 0)
            return { res: m[0], end: pos + m[0].length };
    });
}

function opt(pattern) {
    return new Pattern(function (str, pos) {
        return pattern.exec(str, pos) || { res: void 0, end: pos };
    });
}

function seq(patterns) {
    return new Pattern(function (str, pos) {
        var i, r, end = pos, res = [];
        for (i = 0; i < patterns.length; i++) {
            r = patterns[i].exec(str, end);
            if (!r) return;
            res.push(r.res);
            end = r.end;
        }
        return { res: res, end: end };
    });
}

function rep(pattern, separator) {
    var separated = !separator ? pattern :
        seq([separator, pattern]).then(function(r) {return r[1];});
    return new Pattern(function (str, pos) {
        var res = [], end = pos, r = pattern.exec(str, end);
        while (r && r.end > end) {
            res.push(r.res);
            end = r.end;
            r = separated.exec(str, end);
        }
        return { res: res, end: end };
    });
}

var num  = rgx(/-?\d+/);

var attr = seq([
    txt('='), num
]).then(function(r) {return r[1];});

var parm = seq([
    num, txt(':'), num, opt(rep(attr))
]).then(function(r) {return {
    type:   r[0],
    player: r[2],
    attrs:  r[3]
};});

var term = seq([
    opt(parm), txt(';')
]).then(function(r) {return r[0];});

var conf = rep(term);

Dagaz.Model.setup = function(board) {
  var design = Dagaz.Model.design;
  var setup  = getSetup();
  if (setup) {
      var r = conf.exec(setup, 0);
      if (r.end > 0) {
          _.each(design.allPositions(), function(pos) {
              var piece = null;
              var cnt   = 0;
              if ((pos < r.res.length) && !_.isUndefined(r.res[pos])) {
                  var type = r.res[pos].type;
                  var player = r.res[pos].player;
                  piece = Dagaz.Model.createPiece(type, player);
                  for (var i = 0; i < r.res[pos].attrs.length; i++) {
                       piece = piece.setValue(i, +r.res[pos].attrs[i]);
                       cnt += +r.res[pos].attrs[i];
                  }
              }
              if (cnt > 0) {
                  board.setPiece(pos, piece);
              } else {
                  board.setPiece(pos, null);
              }
          });
          var turn = getTurn();
          if (turn) {
              board.turn   = +turn;
              board.player = design.currPlayer(board.turn);
          }
      }
      board.noInitial = true;
  } else {
      _.each(design.allPositions(), function(pos) {
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.type == 0)) {
              piece = piece.setValue(0, cnt);
              board.setPiece(pos, piece);
          }
      });
  }
}

Dagaz.Model.getSetup = function(design, board) {
  var str = "";
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          str = str + piece.type + ":" + piece.player;
          for (var i = 0; i < 10; i++) {
               var value = piece.getValue(i);
               if (value === null) break;
               str = str + "=" + value;
          }
      }
      str = str + ";";
  });
  str = str + ";&turn=" + board.turn;
  if (Dagaz.Controller.persistense == "setup") {
      var s = str + "&game=" + getName() + "*";
      var maxage = getMaxage();
      if (!maxage && (Dagaz.Controller.defaultLife > 0)) maxage = Dagaz.Controller.defaultLife;
      if (maxage) {
          document.cookie = "dagaz.setup=" + encodeURIComponent(s) + "; max-age=" + maxage;
      } else {
          document.cookie = "dagaz.setup=" + encodeURIComponent(s);
      }
  }
  return "?setup=" + str;
}

var clearGame = Dagaz.Controller.clearGame;

Dagaz.Controller.clearGame = function() {
   document.cookie = "dagaz.setup=" + encodeURIComponent("*") + "; max-age=0";
   if (!_.isUndefined(clearGame)) {
       clearGame();
   }
}

})();
