{

Dagaz.Controller.persistense = "setup";

let getName = function() {
  let str = window.location.pathname.toString();
  let result = str.match(/\/([^.\/]+)\./);
  if (result) {
      return result[1].replace("-board", "").replace("-ai", "").replace("-kanji", "");
  } else {
      return str;
  }
}

let badName = function(str) {
  let result = str.match(/[?&]game=([^&*]*)/);
  if (result) {
      return result[1] != getName();
  } else {
      return true;
  }
}

let getCookie = function() {
  let result = localStorage.getItem('dagaz.setup');
  if (result) {
      if (badName(result)) return "";
      return "?setup=" + result;
  } else {
      return "";
  }
}

let getSetup = function(setup) {
  let str = window.location.search.toString();
  if (setup) {
      str = setup;
  }
  let result = str.match(/[?&]setup=([^&]*)/);
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

let getTurn = function(setup) {
  let str = window.location.search.toString();
  if (setup) {
      str = setup;
  }
  let result = str.match(/[?&]turn=(\d+)/);
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

let getSeed = function(setup) {
  let str = window.location.search.toString();
  if (setup) {
      str = setup;
  }
  let result = str.match(/[?&]seed=(\d+)/);
  if (result) {
      return result[1];
  } else {
      str = getCookie();
      result = str.match(/[?&]seed=(\d+)/);
      if (result) {
          return result[1];
      } else {
          return "";
      }
  }
}

let getReserve = function(setup) {
  let str = window.location.search.toString();
  if (setup) {
      str = setup;
  }
  let result = str.match(/[?&]reserve=([,;\d]+)/);
  if (result) {
      return result[1];
  } else {
      str = getCookie();
      result = str.match(/[?&]reserve=([,;\d]+)/);
      if (result) {
          return result[1];
      } else {
          return "";
      }
  }
}

let getGlobal = function(setup) {
  let str = window.location.search.toString();
  if (setup) {
      str = setup;
  }
  let result = str.match(/[?&]global=([;\d]+)/);
  if (result) {
      return result[1];
  } else {
      str = getCookie();
      result = str.match(/[?&]global=([;\d]+)/);
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
            let r = exec(str, pos);
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
        let m = regexp.exec(str.slice(pos));
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
        let i, r, end = pos, res = [];
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
    let separated = !separator ? pattern :
        seq([separator, pattern]).then(function(r) {return r[1];});
    return new Pattern(function (str, pos) {
        let res = [], end = pos, r = pattern.exec(str, end);
        while (r && r.end > end) {
            res.push(r.res);
            end = r.end;
            r = separated.exec(str, end);
        }
        return { res: res, end: end };
    });
}

let num  = rgx(/-?\d+/);
let str  = rgx(/[^=;+]+/);

let attr = seq([
    txt('='), str
]).then(function(r) {return r[1];});

let quan = seq([
    txt('+'), num
]).then(function(r) {return r[1];});

let parm = seq([
    num, txt(':'), num, opt(rep(attr))
]).then(function(r) {return {
    type:   r[0],
    player: r[2],
    attrs:  r[3]
};});

let term = seq([
    opt(parm), opt(quan), txt(';')
]).then(function(r) {return {
    body:   r[0],
    quan:   r[1]
};});

let conf = rep(term);

Dagaz.Model.setup = function(board, init) {
  let design = Dagaz.Model.design;
  let setup  = getSetup(init);
  if (setup) {
      let r = conf.exec(setup, 0);
      if (r.end > 0) {
          let pos = 0;
          for (let ix = 0; ix < r.res.length; ix++, pos++) {
              if (pos >= design.positions.length) break;
              let piece = null;
              if ((ix < r.res.length) && !_.isUndefined(r.res[ix].body)) {
                  let type = r.res[ix].body.type;
                  let player = r.res[ix].body.player;
                  piece = Dagaz.Model.createPiece(type, player);
                  for (let i = 0; i < r.res[ix].body.attrs.length; i++) {
                       piece = piece.setValue(i, r.res[ix].body.attrs[i]);
                  }
              }
              board.setPiece(pos, piece);
              if (!_.isUndefined(r.res[ix].quan)) {
                  let cnt = +r.res[ix].quan;
                  for (let i = 0; i < cnt; i++) {
                       pos++;
                       if (pos >= design.positions.length) break;
                       board.setPiece(pos, piece);
                  }
              }
          }
          let turn = getTurn(init);
          if (turn) {
              board.turn   = +turn;
              board.player = design.currPlayer(board.turn);
          }
          _.each(_.keys(board.reserve), function(t) {
              _.each(_.keys(board.reserve[t]), function(p) {
                  board.reserve[t][p] = 0;
              });
          });
          let rs = getReserve(init);
          if (rs) {
              Dagaz.Model.setReserve(design, board, rs);
          }
          let g = getGlobal(init);
          if (g) {
              Dagaz.Model.setGlobal(design, board, g);
          }
      }
  }
}

Dagaz.Model.getGlobal = function(design, board) {
  let r = "";
  let k = _.keys(board.values);
  if (k.length > 0) {
     for (let i = 0; i <= _.max(k); i++) {
          let v = board.getValue(i);
          if (v !== null) {
              r = r + v;
          }
          r = r + ";";
     }
  }
  return r;
}

Dagaz.Model.setGlobal = function(design, board, str) {
  let ix = 0; let n = null;
  for (let i = 0; i < str.length; i++) {
       if (str[i] == ';') {
           if (n !== null) {
               board.setValue(ix, n);
           }
           n = null;
           ix++;
       } else {
           if (n !== null) {
               n = n * 10;
           } else {
               n = 0;
           }
           n += +str[i];
       }
  }
}

Dagaz.Model.getReserve = function(design, board) {
  let r = "";
  for (let o = 1; o < design.playerNames.length; o++) {
       if (r != "") r = r + ";";
       _.each(_.keys(design.pieceNames), function(t) {
           if (_.isUndefined(board.reserve[t])) return;
           if (_.isUndefined(board.reserve[t][o])) {
               r = r + "0,";
           } else {
               r = r + board.reserve[t][o] + ",";
           }
       });
  }
  return r;
}

Dagaz.Model.setReserve = function(design, board, str) {
  design.reserve = [];
  let o = 1; let t = 0; let n = 0;
  for (let i = 0; i < str.length; i++) {
       if (str[i] == ';') {
           o++;
           t = 0;
       } else if (str[i] == ',') {
           if (_.isUndefined(design.reserve[t])) {
               design.reserve[t] = [];
           }
           design.reserve[t][o] = n;
           t++; n = 0;
       } else {
           n = n * 10;
           n += +str[i];
       }
  }
  board.reserve = design.reserve;
}

Dagaz.Model.getSetup = function(design, board) {
  let str = ""; let prev = null; let cnt = 0;
  _.each(design.allPositions(), function(pos) {
      let piece = board.getPiece(pos);
      let s = "";
      if (piece !== null) {
          s = s + piece.type + ":" + piece.player;
          for (let i = 0; i < 10; i++) {
               let value = piece.getValue(i);
               if (value === null) break;
               s = s + "=" + value;
          }
      }
      if ((prev === null) || (prev != s)) {
          if (prev !== null) {
              str = str + prev;
              if (cnt > 0) {
                  str = str + "+" + cnt;
              }
              str = str + ";";
          }
          prev = s;
          cnt = 0;
      } else {
          cnt++;
      }
  });
  str = str + prev;
  if (cnt > 0) {
      str = str + "+" + cnt;
  }
  str = str + ";&turn=" + board.turn;
  let rs = Dagaz.Model.getReserve(design, board);
  if (rs != "") {
      str = str + "&reserve=" + rs;
  }
  let g = Dagaz.Model.getGlobal(design, board);
  if (g != "") {
      str = str + "&global=" + g;
  }
  if (!_.isUndefined(Dagaz.Controller.seed)) {
      str = str + "&seed=" + Dagaz.Controller.seed;
  }
  if (Dagaz.Controller.persistense == "setup") {
      let s = str + "&game=" + getName() + "*";
      localStorage.setItem('dagaz.setup', s);
  }
  return "?setup=" + str;
}

let getSetupSelector = Dagaz.Model.getSetupSelector;

Dagaz.Model.getSetupSelector = function(val) {
  if (Dagaz.Controller.randomized && _.isUndefined(Dagaz.Controller.seed)) {
      Dagaz.Controller.seed = getSeed();
      if (!Dagaz.Controller.seed) {
          Dagaz.Controller.seed = _.random(0, 10000);
      }
      console.log("Seed: " + Dagaz.Controller.seed);
      Math.seedrandom(+Dagaz.Controller.seed);
  }
  return getSetupSelector(val);
}

let clearGame = Dagaz.Controller.clearGame;

Dagaz.Controller.clearGame = function() {
   localStorage.setItem('dagaz.setup', '');
   if (!_.isUndefined(clearGame)) {
       clearGame();
   }
}

}
