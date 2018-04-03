(function() {

var getSetup = function() {
  var str = window.location.search.toString();
  var re  = /^\?setup=(.*)$/;
  return str.replace(re, "$1");
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

var num  = rgx(/\d+/);
var str  = rgx(/[^=;]+/);

var attr = seq([
    txt('='), str
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
              if ((pos < r.res.length) && !_.isUndefined(r.res[pos])) {
                  var type = r.res[pos].type;
                  var player = r.res[pos].player;
                  piece = Dagaz.Model.createPiece(type, player);
                  for (var i = 0; i < r.res[pos].attrs.length; i++) {
                       piece = piece.setValue(i, r.res[pos].attrs[i]);
                  }
              }
              board.setPiece(pos, piece);
          });
      }
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
  return "?setup=" + str;
}

})();
