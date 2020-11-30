{
  games = {
    model: {
      passTurn: false,
      passPartial: false,
      sharedPieces: false,
      deferredCaptures: false
    },
    view: []
  };

  class TMove {
    constructor(mode) {
      this.actions = [];
      this.mode = mode;
    }

    copy() {
      const r = new TMove(this.mode);
      _.each(this.actions, function (a) {
        r.actions.push(a);
      });
      return r;
    }

    clone(part) {
      const r = new TMove(this.mode);
      _.each(this.actions, function (a) {
        if ((a[0] !== null) && (a[1] !== null) && (a[3] == part)) return;
        r.actions.push(a);
      });
      return r;
    }

    toString(design) {
      let r = "";
      let p = null;
      for (let i = 0; i < this.actions.length; i++) {
        const a = this.actions[i];
        if ((a[0] !== null) && (a[1] !== null)) {
          if ((p === null) || (p != a[0])) {
            if (r != "") r = r + " ";
            r = r + design.posToString(a[0]);
          }
          r = r + "-" + design.posToString(a[1]);
          p = a[1];
        }
      }
      return r;
    }

    isPass() {
      return this.actions.length == 0;
    }

    isDropMove() {
      if (this.actions.length != 1) return false;
      return (this.actions[0][0] === null) && (this.actions[0][1] !== null) && (this.actions[0][2] !== null);
    }

    isSimpleMove() {
      if (this.actions.length != 1) return false;
      return (this.actions[0][0] !== null) && (this.actions[0][1] !== null);
    }

    movePiece(from, to, piece, part) {
      if (_.isUndefined(part)) part = 1;
      this.actions.push([from, to, piece, part]);
    }

    capturePiece(from, part) {
      if (_.isUndefined(part)) part = 1;
      this.actions.push([from, null, null, part]);
    }

    dropPiece(to, piece, part) {
      if (_.isUndefined(part)) part = 1;
      this.actions.push([null, to, piece, part]);
    }

    applyTo(obj) {
      _.each(this.actions, function (a) {
        if (a[0] !== null) {
          obj.setPiece(a[0], null);
        }
        if ((a[1] !== null) && (a[2] !== null)) {
          obj.setPiece(a[1], a[2]);
        }
        if ((a[0] !== null) && (a[1] !== null) && !_.isUndefined(obj.setLastFrom)) {
          obj.setLastFrom(a[0]);
        }
      });
    }
  }

  class TMoveContext {
    constructor(design, board, pos, piece) {
      this.design = design;
      this.board = board;
      this.from = pos;
      this.pos = pos;
      this.mode = null;
      this.parent = null;
      this.part = 1;
      this.piece = piece;
      this.move = new TMove(this.mode);
      this.succeed = false;
      this.changes = [];
      this.marks = [];
    }

    copy() {
      const r = new TMoveContext(this.design, this.board, this.pos, this.piece);
      r.parent = this;
      r.part = this.part + 1;
      r.move = this.move.copy();
      r.mode = this.mode;
      return r;
    }

    setPiece(pos, piece) {
      this.changes.push({
        p: pos,
        x: piece
      });
    }

    getPiece(pos) {
      for (let i = 0; i < this.changes.length; i++) {
        if (this.changes[i].p == pos) return this.changes[i].x;
      }
      if (this.parent !== null) {
        return this.parent.getPiece(pos);
      }
      return this.board.getPiece(pos);
    }

    mark() {
      this.marks.push(this.pos);
    }

    back() {
      if (this.marks.length > 0) {
        this.pos = this.marks[this.marks.length - 1];
      }
    }

    pop() {
      if (this.marks.length > 0) {
        this.pos = this.marks.pop();
      }
    }

    take() {
      this.hand = {
        start: this.pos,
        piece: this.board.getPiece(this.pos)
      };
    }

    put() {
      if (!_.isUndefined(this.hand)) {
        this.piece = this.hand.piece;
        this.move.movePiece(this.hand.start, this.pos, this.hand.piece, this.part);
        delete this.hand;
        this.succeed = true;
      }
    }

    getParam(params, ix) {
      if (_.isUndefined(params)) return null;
      if (_.isArray(params)) return params[ix];
      return params;
    }

    go(params, ix) {
      const dir = this.getParam(params, ix);
      if (dir === null) return false;
      let player = this.board.player;
      if (!_.isUndefined(this.hand)) {
        player = this.hand.piece.player;
      }
      const p = this.design.navigate(player, this.pos, dir);
      if (p === null) return false;
      this.pos = p;
      return true;
    }

    opposite(params, ix) {
      const dir = this.getParam(params, ix);
      if (dir === null) return null;
      return this.design.opposite(dir);
    }

    isLastFrom(params, ix) {
      let pos = this.getParam(params, ix);
      if (pos === null) {
        pos = this.pos;
      }
      if ((this.parent !== null) && (this.parent.parent !== null)) {
        if (pos == this.parent.parent.from) return true;
      }
      return this.board.isLastFrom(pos);
    }

    isEmpty() {
      if (games.model.deferredCaptures) {
        for (let i = 0; i < this.move.actions.length; i++) {
          const a = this.move.actions[i];
          if ((a[0] !== null) && (a[1] === null) && (a[0] == this.pos)) return false;
        }
      }
      return this.getPiece(this.pos) === null;
    }

    isEnemy() {
      const piece = this.getPiece(this.pos);
      if (piece === null) return false;
      return piece.player != this.board.player;
    }

    isFriend() {
      const piece = this.getPiece(this.pos);
      if (piece === null) return false;
      return piece.player == this.board.player;
    }

    isPiece(params, ix) {
      const t = this.getParam(params, ix);
      if (t === null) {
        return !this.isEmpty();
      }
      const piece = this.getPiece(this.pos);
      if (piece === null) return false;
      return piece.type == t;
    }

    inZone(params, ix) {
      const zone = this.getParam(params, ix);
      if (zone === null) return null;
      let player = this.board.player;
      if (!_.isUndefined(this.hand)) {
        player = this.hand.piece.player;
      }
      return this.design.inZone(player, this.pos, zone);
    }

    promote(params, ix) {
      if (_.isUndefined(this.hand)) return false;
      const type = this.getParam(params, ix);
      if (type === null) return false;
      this.hand.piece = this.hand.piece.promote(type);
      return true;
    }

    capture() {
      this.setPiece(this.pos, null);
      this.move.capturePiece(this.pos, this.part);
    }

    end(params, ix) {
      const hand = this.hand;
      this.put();
      this.mode = this.getParam(params, ix);
      if (this.succeed) {
        if (this.mode !== null) {
          const ctx = this.copy();
          this.board.forks.push(ctx);
        } else {
          this.board.moves.push(this.move);
        }
      }
      this.move = this.move.clone(this.part);
      this.hand = hand;
    }
  }

  class TPiece {
    constructor(type, player) {
      this.type = type;
      this.player = player;
    }

    toString(design) {
      return design.playerNames[this.player] + " " + design.pieceNames[this.type];
    }

    getValue(ix) {
      if (_.isUndefined(this.values)) return null;
      if (_.isUndefined(this.values[ix])) return null;
      return this.values[ix];
    }

    setValue(ix, value) {
      const v = this.getValue(ix);
      if ((v === null) && (value === null)) return this;
      if ((v !== null) && (value !== null) && (v == value)) return this;
      const r = new TPiece(this.type, this.player);
      if (_.isUndefined(r.values)) {
        r.values = [];
      }
      if (!_.isUndefined(this.values)) {
        _.each(_.keys(this.values), function (i) {
          r.values[i] = this.values[i];
        }, this);
      }
      if (value !== null) {
        r.values[ix] = value;
      } else {
        delete r.values[ix];
      }
      return r;
    }

    promote(type) {
      if (type == this.type) return this;
      return new TPiece(type, this.player);
    }

    changeOwner(player) {
      if (player == this.player) return this;
      return new TPiece(this.type, player);
    }
  }

  class TBoard {
    constructor(design) {
      this.design = design;
      this.pieces = [];
      this.turn = 0;
      this.player = design.currPlayer(this.turn);
      this.z = 0;
    }

    copy() {
      const r = new TBoard(this.design);
      r.parent = this;
      r.turn = this.turn;
      r.player = this.player;
      _.each(_.keys(this.pieces), function (pos) {
        r.pieces[pos] = this.pieces[pos];
      }, this);
      r.z = this.z;
      return r;
    }

    clear() {
      this.pieces = [];
      this.z = 0;
      delete this.moves;
    }

    setLastFrom(pos) {
      this.lastFrom = pos;
    }

    isLastFrom(pos) {
      if (!_.isUndefined(this.lastFrom)) {
        return this.lastFrom == pos;
      }
      return false;
    }

    getPiece(pos) {
      if (_.isUndefined(this.pieces[pos])) {
        return null;
      } else {
        return this.pieces[pos];
      }
    }

    setPiece(pos, piece) {
      if (!_.isUndefined(games.model.zupdate) && !_.isUndefined(this.pieces[pos])) {
        this.z = games.model.zupdate(this.z, this.pieces[pos], pos);
      }
      if (piece === null) {
        delete this.pieces[pos];
      } else {
        this.pieces[pos] = piece;
        if (!_.isUndefined(games.model.zupdate)) {
          this.z = games.model.zupdate(this.z, piece, pos);
        }
      }
    }

    completeMove(parent) {
      let r = false;
      _.each(this.design.moves, function (t) {
        if (t.t != parent.piece.type) return;
        if (t.m != parent.mode) return;
        const ctx = parent.copy();
        ctx.hand = {
          start: parent.pos,
          piece: parent.piece
        };
        ctx.mode = null;
        t.f(ctx, t.p);
        if (ctx.succeed) {
          r = true;
        }
      }, this);
      return r;
    }

    generate() {
      if (_.isUndefined(this.moves)) {
        this.forks = [];
        this.moves = [];
        const groups = _.groupBy(this.design.moves, function (t) {
          if (this.design.modes.length == 0) return 0;
          return _.indexOf(this.design.modes, t.m);
        }, this);
        let cnt = this.design.modes.length;
        if (cnt == 0) cnt = 1;
        for (let i = 0; i < cnt; i++) {
          let completed = false;
          _.each(this.design.allPositions(), function (pos) {
            const piece = this.getPiece(pos);
            if (piece === null) return;
            if (!games.model.sharedPieces && (piece.player != this.player)) return;
            _.each(groups[i], function (t) {
              if (t.t != piece.type) return;
              const ctx = new TMoveContext(this.design, this, pos, piece);
              ctx.move.mode = t.m;
              ctx.take();
              ctx.setPiece(pos, null);
              t.f(ctx, t.p);
              if (ctx.succeed) {
                completed = true;
              }
            }, this);
          }, this);
          if (completed) break;
        }
        for (let i = 0; i < this.forks.length; i++) {
          const ctx = this.forks[i];
          let f = true;
          if (this.completeMove(ctx)) f = false;
          if (games.model.passPartial || f) {
            this.moves.push(ctx.move);
          }
        }
        delete this.forks;
        if (!_.isUndefined(games.model.extension)) {
          games.model.extension(this);
        }
        if (games.model.passTurn && (this.moves.length == 0)) {
          this.moves.push(new TMove(0));
        }
      }
    }

    apply(move) {
      const r = this.copy();
      r.turn = r.design.nextTurn(this);
      r.player = r.design.currPlayer(r.turn);
      move.applyTo(r);
      r.move = move;
      return r;
    }
  }

  class TDesign {
    constructor() {
      this.dirs = [];
      this.players = [];
      this.playerNames = [];
      this.positions = [];
      this.positionNames = [];
      this.modes = [];
      this.zones = [];
      this.zoneNames = [];
      this.pieceNames = [];
      this.price = [];
      this.moves = [];
      this.initial = [];
    }

    createPiece(type, player) {
      return new TPiece(type, player);
    }

    checkVersion(name, value) {
      if (name == "pass-turn") {
        games.model.passTurn = (value == "true");
      }
      if (name == "pass-partial") {
        games.model.passPartial = (value == "true");
      }
      if (name == "shared-pieces") {
        games.model.sharedPieces = (value == "true");
      }
      if (name == "deferred-captures") {
        games.model.deferredCaptures = (value == "true");
      }
    }

    posToString(pos) {
      if (_.isUndefined(this.positionNames[pos])) return "?";
      return this.positionNames[pos];
    }

    stringToPos(name) {
      const pos = _.indexOf(this.positionNames, name);
      if (pos < 0) return null;
      return pos;
    }

    addDirection(name) {
      this.dirs.push(name);
    }

    addPlayer(name, symmetry) {
      const ix = this.playerNames.length;
      if (this.playerNames.length == 0) {
        this.playerNames.push("opposite");
      }
      this.players[ix] = symmetry;
      this.playerNames.push(name);
    }

    addTurn(player, modes) {
      if (_.isUndefined(this.turns)) {
        this.turns = [];
      }
      if (!_.isUndefined(modes) && !_.isArray(modes)) {
        modes = [modes];
      }
      this.turns.push({
        p: player,
        m: modes
      });
    }

    repeatMark() {
      if (_.isUndefined(this.turns)) {
        this.turns = [];
      }
      this.repeat = this.turns.length;
    }

    addPosition(name, dirs) {
      if ((this.positions.length == 0) && (name != "start")) {
        this.positionNames.push("start");
        this.positions.push(_.map(_.range(dirs.length), function (n) {
          return 0;
        }));
      }
      this.positionNames.push(name);
      this.positions.push(dirs);
    }

    addZone(name, player, positions) {
      let zone = _.indexOf(this.zoneNames, name);
      if (zone < 0) {
        zone = this.zoneNames.length;
        this.zoneNames.push(name);
      }
      if (_.isUndefined(this.zones[zone])) {
        this.zones[zone] = [];
      }
      this.zones[zone][player] = _.map(positions, function (name) {
        return this.stringToPos(name);
      }, this);
    }

    addPriority(mode) {
      this.modes.push(mode);
    }

    addPiece(name, type, price) {
      this.pieceNames[type] = name;
      this.price[type] = price ? price : 1;
    }

    getPieceType(name) {
      const r = _.indexOf(this.pieceNames, name);
      if (r < 0) return null;
      return r;
    }

    addMove(type, fun, params, mode, sound) {
      this.moves.push({
        t: type,
        f: fun,
        p: params,
        s: sound,
        m: mode
      });
    }

    getInitBoard() {
      if (_.isUndefined(this.board)) {
        games.model.BuildDesign(this);
        this.board = new TBoard(this);
        _.each(this.initial, function (s) {
          this.board.setPiece(s.p, s.t);
        }, this);
      }
      return this.board;
    }

    setup(player, type, positions) {
      const t = _.indexOf(this.pieceNames, type);
      const p = _.indexOf(this.playerNames, player);
      if ((t < 0) || (p < 0)) return;
      const piece = new TPiece(t, p);
      if (!_.isArray(positions)) {
        positions = [positions];
      }
      _.chain(positions)
        .map(function (name) {
          return this.stringToPos(name);
        }, this)
        .each(function (pos) {
          this.initial.push({
            p: pos,
            t: piece
          });
        }, this);
    }

    allDirections() {
      return _.range(this.dirs.length);
    }

    allPlayers() {
      return _.range(1, this.playerNames.length);
    }

    allPositions() {
      return _.range(1, this.positions.length);
    }

    getDirection(name) {
      const dir = _.indexOf(this.dirs, name);
      if (dir < 0) {
        return null;
      }
      return dir;
    }

    navigate(player, pos, dir) {
      if (!_.isUndefined(this.players[player])) {
        dir = this.players[player][dir];
      }
      if (this.positions[pos][dir] != 0) {
        return +pos + this.positions[pos][dir];
      } else {
        return null;
      }
    }

    opposite(dir, player) {
      if (_.isUndefined(player)) {
        player = 0;
      }
      return this.players[player][dir];
    }

    getZone(name) {
      const zone = _.indexOf(this.zoneNames, name);
      if (zone < 0) return null;
      return zone;
    }

    inZone(player, pos, zone) {
      if (!_.isUndefined(this.zones[zone])) {
        if (!_.isUndefined(this.zones[zone][player])) {
          return _.indexOf(this.zones[zone][player], pos) >= 0;
        }
      }
      return false;
    }

    nextPlayer(player) {
      if (player + 1 >= this.playerNames.length) {
        return 1;
      } else {
        return player + 1;
      }
    }

    nextTurn(board) {
      let turn = board.turn + 1;
      if (_.isUndefined(this.turns)) {
        if (turn >= this.players.length - 1) {
          turn = 0;
          if (!_.isUndefined(this.repeat)) {
            turn += this.repeat;
          }
        }
      } else {
        if (turn >= this.turns.length) {
          turn = 0;
          if (!_.isUndefined(this.repeat)) {
            turn += this.repeat;
          }
        }
      }
      return turn;
    }

    currPlayer(turn) {
      if (_.isUndefined(this.turns)) {
        return turn + 1;
      } else {
        return this.turns[turn].player;
      }
    }
  }

  games.model.getDesign = function () {
    if (_.isUndefined(games.model.design)) {
      games.model.design = new TDesign();
    }
    return games.model.design;
  }

  games.model.BuildDesign = function (design) {}
}