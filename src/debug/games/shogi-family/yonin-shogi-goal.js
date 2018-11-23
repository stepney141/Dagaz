(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "yonin-shogi-goal") {
      checkVersion(design, name, value);
  }
}

var push = function(pos, acc) {
  if (_.indexOf(acc, pos) < 0) {
      acc.push(pos);
  }
}

var cover = function(board, piece, f, e, enemy) {
  if ((enemy === null) || (piece.player != enemy.player)) {
      if (piece.player == board.player) {
          push(e, board.attacked);
      } else {
          push(e, board.attacking);
      }
  }
  board.cover[e].push(f);
}

var checkStep = function(design, board, piece, pos, dir, check) {
  var p = design.navigate(piece.player, pos, dir);
  if (p === null) return;
  check(board, piece, pos, p, board.getPiece(p));
}

var checkJump = function(design, board, piece, pos, o, d, check) {
  var p = design.navigate(piece.player, pos, o);
  if (p === null) return;
  p = design.navigate(piece.player, p, d);
  if (p === null) return;
  check(board, piece, pos, p, board.getPiece(p));
}

var checkSlide = function(design, board, piece, pos, dir, check) {
  var p = design.navigate(piece.player, pos, dir);
  while (p !== null) {
      var enemy = board.getPiece(p);
      check(board, piece, pos, p, enemy);
      if (enemy !== null) break;
      p = design.navigate(piece.player, p, dir);
  }
}

var traceAttack = function(design, board, piece, pos, target, dir) {
  var r = [];
  var p = design.navigate(piece.player, pos, dir);
  while (p !== null) {
      if (p == target) return r;
      r.push(p);
      p = design.navigate(piece.player, p, dir);
  }
  return null;
}

Dagaz.Model.influence = function(design, board, pos) {
  var n  = design.getDirection("n");  var w  = design.getDirection("w");
  var s  = design.getDirection("s");  var e  = design.getDirection("e");
  var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
  var ne = design.getDirection("ne"); var se = design.getDirection("se");
  var piece = board.getPiece(pos);
  if (piece === null) return;
  if (piece.type == 0) {
      if (piece.player == board.player) board.kings.push(pos);
      checkStep(design, board, piece, pos,  n, cover);
      checkStep(design, board, piece, pos,  e, cover);
      checkStep(design, board, piece, pos,  w, cover);
      checkStep(design, board, piece, pos,  s, cover);
      checkStep(design, board, piece, pos, nw, cover);
      checkStep(design, board, piece, pos, ne, cover);
      checkStep(design, board, piece, pos, sw, cover);
      checkStep(design, board, piece, pos, se, cover);
  }
  if ((piece.type == 1) || (piece.type == 8) || (piece.type == 9) || (piece.type == 10) || (piece.type == 13)) {
      checkStep(design, board, piece, pos,  n, cover);
      checkStep(design, board, piece, pos,  e, cover);
      checkStep(design, board, piece, pos,  w, cover);
      checkStep(design, board, piece, pos,  s, cover);
      checkStep(design, board, piece, pos, nw, cover);
      checkStep(design, board, piece, pos, ne, cover);
  }
  if (piece.type == 2) {
      checkStep(design, board, piece, pos,  n, cover);
      checkStep(design, board, piece, pos, nw, cover);
      checkStep(design, board, piece, pos, ne, cover);
      checkStep(design, board, piece, pos, sw, cover);
      checkStep(design, board, piece, pos, se, cover);
  }
  if (piece.type == 3) {
      checkJump(design, board, piece, pos, n, nw, cover);
      checkJump(design, board, piece, pos, n, ne, cover);
  }
  if (piece.type == 4) {
      checkSlide(design, board, piece, pos, n, cover);
  }
  if ((piece.type == 5) || (piece.type == 11)) {
      checkSlide(design, board, piece, pos, nw, cover);
      checkSlide(design, board, piece, pos, ne, cover);
      checkSlide(design, board, piece, pos, sw, cover);
      checkSlide(design, board, piece, pos, se, cover);
  }
  if ((piece.type == 6) || (piece.type == 12)) {
      checkSlide(design, board, piece, pos, n, cover);
      checkSlide(design, board, piece, pos, e, cover);
      checkSlide(design, board, piece, pos, w, cover);
      checkSlide(design, board, piece, pos, s, cover);
  }
  if (piece.type == 7) {
      checkStep(design, board, piece, pos, n, cover);
  }
  if (piece.type == 11) {
      checkStep(design, board, piece, pos, n, cover);
      checkStep(design, board, piece, pos, e, cover);
      checkStep(design, board, piece, pos, w, cover);
      checkStep(design, board, piece, pos, s, cover);
  }
  if (piece.type == 12) {
      checkStep(design, board, piece, pos, nw, cover);
      checkStep(design, board, piece, pos, ne, cover);
      checkStep(design, board, piece, pos, sw, cover);
      checkStep(design, board, piece, pos, se, cover);
  }
}

Dagaz.Model.prepare = function(design, board) {
  if (_.isUndefined(board.cover)) {
      board.kings     = []; board.cover     = [];
      board.attacked  = []; board.attacking = [];
      _.each(design.allPositions(), function(pos) {
          board.cover[pos] = [];
      });
      _.each(design.allPositions(), function(pos) {
          if (!design.inZone(0, board.player, pos)) return;
          Dagaz.Model.influence(design, board, pos);
      });
  }
}

var getAttackers = function(board) {
  if (_.isUndefined(board.attackers)) {
      board.attackers = [];
      _.each(board.cover[board.kings[0]], function(p) {
          var piece = board.getPiece(p);
          if ((piece !== null) && (piece.player != board.player)) {
              board.attackers.push(p);
          }
      });
  }
  return board.attackers;
}

var getShield = function(design, board) {
  if (_.isUndefined(board.shield)) {
      board.shield  = null;
      var attacking = board.kings[0];
      var attacker  = board.attackers[0];
      var enemy = board.getPiece(attacker);
      if (enemy !== null) {
          var dirs = [];
          if ((enemy.type == 4) || (enemy.type == 6) || (enemy.type == 12)) {
              dirs.push(design.getDirection("n"));
          }
          if ((enemy.type == 6) || (enemy.type == 12)) {
              dirs.push(design.getDirection("w"));
              dirs.push(design.getDirection("s")); 
              dirs.push(design.getDirection("e"));
          }
          if ((enemy.type == 5) || (enemy.type == 11)) {
              dirs.push(design.getDirection("nw")); 
              dirs.push(design.getDirection("sw"));
              dirs.push(design.getDirection("ne")); 
              dirs.push(design.getDirection("se"));
          }
          _.each(dirs, function(dir) {
              if (board.shield === null) {
                  var r = traceAttack(design, board, enemy, attacker, attacking, dir);
                  if (r !== null) {
                      board.shield = r;
                  }
              }
          });
      }
      if (board.shield === null) board.shield = [];
  }
  return board.shield;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  if (move.isPass()) return 1;
  Dagaz.Model.prepare(design, board);
  if (board.kings.length == 0) {
      var pos = move.actions[0][1][0];
      if (_.indexOf(board.attacked, pos) >= 0) return -1;
      return 1;
  }
  var pos    = move.actions[0][0][0];
  var target = move.actions[0][1][0];
  var piece  = board.getPiece(pos);
  if (!design.inZone(0, board.player, pos)) {
      if ((piece !== null) && (piece.type == 0)) return -1
  }
  if (_.indexOf(board.kings, pos) >= 0) {
      if (_.indexOf(board.attacked, target) >= 0) return -1;
  }
  var r = 1;
  if ((board.kings.length > 1) || (_.indexOf(board.attacked, board.kings[0]) < 0)) {
      var enemy  = board.getPiece(target);
      if ((enemy !== null) && (enemy.player != board.player)) {
          r += design.price[enemy.type];
          var isAttacked = false;
          _.each(board.cover[target], function(p) {
              if (!isAttacked) {
                  var piece = board.getPiece(p);
                  if ((piece !== null) && (piece.player != board.player)) isAttacked = true;
              }
          });
          if (isAttacked) {
              r -= design.price[piece.type];
              return r;
          }
      }
      if (move.actions[0][2] !== null) {
          r -= design.price[piece.type];
          piece = move.actions[0][2][0];
          r += design.price[piece.type];
      }
  } else {
      var attackers = getAttackers(board);
      if (attackers.length == 1) {
          if (target == attackers[0]) {
              r += design.price[0];
              return r;
          }
          var shield = getShield(design, board);
          if (_.indexOf(shield, target) >= 0) {
              r += (design.price[0] / 2) | 0;
              return r;
          }
      }
      if (pos == board.kings[0]) {
          r += (design.price[0] / 2) | 0;
          return r;
      }
  }
  return r;
}

Dagaz.Model.apply = function(design, board, move) {
  var r = board.apply(move);
  var pos    = move.actions[0][0][0];
  var target = move.actions[0][1][0];
  var positions = [ pos ];
  _.each(board.cover[target], function(p) {
      positions.push(p);
  });
  r.cover = [];
  _.each(design.allPositions(), function(p) {
      // TODO: <-- 
      r.cover[pos] = _.difference(board.cover[pos], positions);
  });
  r.attacked = _.without(board.attacked, pos);
  _.each(board.cover[pos], function(p) {
      positions.push(p);
  });
  _.each(positions, function(p) {
      Dagaz.Model.influence(design, board, p);
  })
  return r;
}

Dagaz.AI.eval = function(ai, design, board, player) {
  Dagaz.Model.prepare(design, board);
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var v = design.price[piece.type];
          if (design.inZone(0, board.player, pos)) {
              _.each(board.cover[pos], function(p) {
                  var f = 0; var e = 0;
                  var x = board.getPiece(p);
                  if (x !== null) {
                      if (x.player == piece.player) {
                          f += design.price[x.type];
                      } else {
                          e += design.price[x.type];
                      }
                  }
                  if (e > f) {
                      v -= (f / 2) | 0;
                  }
              });
          } else {
              v += (design.price[piece.type] / 2) | 0;
          }
          if (piece.player != player) {
              v = -v;
          }
          r += v;
      }
  });
  return r;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var kings  = 0;
  var noKing = true;
  var king = design.getPieceType("King");
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == king)) {
          if (piece.player == player) {
              kings++;
          }
          if (piece.player == 1) {
              noKing = false;
          }
      }
  });
  if (noKing || (kings == 4)) {
      return 1;
  }
  return checkGoals(design, board, player);
}

})();
