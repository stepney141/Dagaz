(function() {

Dagaz.AI.AI_FRAME      = 2000;
Dagaz.AI.MIN_DEEP      = 6;

var MAX_FORCED_FACTOR  = 2;

var inversed = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "columns-checkers-extension") {
      if (value == "deferred") {
          Dagaz.Model.deferredStrike = true;
      }
      if (value == "inversed") {
          inversed = true;
      }
  } else {
      checkVersion(design, name, value);
  }
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  _.each(move.actions, function(a) {
      if (a[0] !== null) {
          if (a[1] !== null) {
              if (design.inZone(0, board.player, a[1][0])) r += 1000;
          } else {
              var piece = board.getPiece(a[0][0]);
              if (piece !== null) {
                  r += design.price[piece.type];
              }
          }
      }
  });
  return r;
}

Dagaz.AI.isForced = function(design, board, move) {
  if (_.isUndefined(move.isForced)) {
      move.isForced = false;
      var b = board.apply(move);
      var c = 0;
      _.each(design.allPositions(), function(pos) {
          var piece = b.getPiece(pos);
          if ((piece !== null) && (piece.type == 0) && (piece.player == b.player)) {
              _.each(design.allDirections(), function(dir) {
                   var p = design.navigate(b.player, pos, dir);
                   if (p !== null) {
                       piece = b.getPiece(p);
                       if ((piece !== null) && (piece.type == 0) && (piece.player != b.player)) {
                            p = design.navigate(b.player, p, dir);
                            if ((p !== null) && (b.getPiece(p) === null)) c++;
                       }
                   }
              });
          }
      });
      if ((c > 0) && (c <= MAX_FORCED_FACTOR)) {
          move.isForced = true;
      }
  }
  return move.isForced;
}

Dagaz.AI.getEval = function(design, board) {
  if (_.isUndefined(board.eval)) {
      board.eval = 0;
      _.each(design.allPositions(), function(pos) {
          var piece = board.getPiece(pos);
          if (piece !== null) {
              var v = design.price[piece.type];
              var bonus = 6;
              if (_.indexOf([1, 23, 24, 39, 40, 62], +pos) >= 0) {
                  bonus -= 3;
              }
              if (_.indexOf([7, 8, 55, 56], +pos) >= 0) {
                  bonus -= 4;
              }
              if (_.indexOf([3, 5, 17, 46, 58, 60], +pos) >= 0) {
                  bonus -= 2;
              }
              if (design.inZone(1, board.player, pos)) {
                  bonus -= 4;
              }
              if ((piece.type == 1) && (_.indexOf([7, 14, 21, 28, 35, 42, 49, 56], +pos) >= 0)) {
                  bonus -= 2;
              }
              v += bonus;
              if (!Dagaz.AI.isFriend(board.player, piece.player)) {
                  v = -v;
              }
              board.eval += v;
          }
      });
  }
  return board.eval;
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = Dagaz.AI.getEval(design, board);
  if (board.player != player) {
      r = -r;
  }
  return r;
}

var drawBar = function(ctx, x, y, height, val) {
  var h = (height / val.length) | 0;
  var w = 2;
  if (h < 2) {
      h = 2;
      w = 1;
  }
  var last = null;
  var offset = 0;
  for (var i = 0; i < val.length; i++) {
       var isWhite = ((val[i] % 2) == 0);
       if (inversed) isWhite = !isWhite;
       if ((last !== null) && (last == val[i])) {
           ctx.fillStyle = "#000000";
           ctx.fillRect(x, y + offset - 1, 3 + 2, w);
       }
       if (((val[i] / 2) | 0) == 0) {
           if (isWhite) {
               ctx.fillStyle = "#FFFFFF";
           } else {
               ctx.fillStyle = "#888888";
           }
       } else {
           if (isWhite) {
               ctx.fillStyle = "#FFFF00";
           } else {
               ctx.fillStyle = "#0000FF";
           }
       }
       ctx.fillRect(x, y + offset, 3, h);
       offset += h; height -= h;
       if (height < h) break;
       last = val[i];
  }
}

Dagaz.View.showPiece = function(view, ctx, frame, pos, piece, model, x, y) {
  var val = null;
  if (model) {
      val = model.getValue(0);
  }
  if (!val) {
      val = null;
  }
  if ((val !== null) && (val.length > 0)) {
      var t = val.substr(0, 1);
      var back = null;
      var f = ((t % 2) == 0);
      if (inversed) {
          f = !f;
      }
      if (f) {
          back = view.piece["White Man"];
      } else {
          back = view.piece["Black Man"];
      }
      if (back !== null) {
          ctx.save();
          ctx.translate(x + frame.dx / 2, y + frame.dy / 2); 
          ctx.scale(0.95, 0.95);
          ctx.translate(-x - frame.dx /2, -y - frame.dy /2);
          ctx.drawImage(back.h, x + 1, y + 2, piece.dx, piece.dy);
          drawBar(ctx, x + 42, y - 2, 46, val);
          ctx.restore();
          x -= 5;
          y -= 5;
      }
  }
  ctx.drawImage(piece.h, x, y, piece.dx, piece.dy);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  _.chain(board.moves)
   .filter(function(move) {
        return move.actions.length == 1;
    })
   .each(function(move) {
        var pos = move.actions[0][0][0];
        var piece = board.getPiece(pos);
        if (piece === null) {
            move.failed = true;
            return;
        }
        var val = piece.getValue(0);
        if ((val !== null) && (piece.type == 0)) {
            piece = move.actions[0][2][0];
            if ((piece !== null) && (piece.type == 1)) {
                move.actions[0][2][0] = piece.setValue(0, val);
            }
        }
    });
  _.chain(board.moves)
   .filter(function(move) {
        return move.actions.length > 1;
    })
   .each(function(move) {
        var actions  = [];
        var captured = [];
        var piece = null;
        var last  = null;
        var maxpn = null;
        _.each(move.actions, function(action) {
            if (action[0] !== null) {
                if (action[1] !== null) {
                    if (piece === null) {
                        piece = board.getPiece(action[0][0]);
                        if (piece === null) {
                            move.failed = true;
                        }
                    }
                    if (action[2] !== null) {
                        var v = piece.getValue(0);
                        piece = action[2][0];
                        if (v !== null) {
                            piece = piece.setValue(0, v);
                        }
                    }
                    maxpn = action[3];
                    var target = null;
                    if (last !== null) {
                        var p = board.getPiece(last);
                        if (p !== null) {
                            var dst = piece.getValue(0);
                            if (dst === null) {
                                dst = "";
                            }
                            dst = dst + ((+p.type * 2) + p.player - 1);
                            var src = p.getValue(0);
                            if ((src === null) || (src == "")) {
                                if (Dagaz.Model.deferredStrike) {
                                    captured.push(last);
                                } else {
                                    actions.push([ [last], null, null, maxpn ]);
                                }
                                last = null;
                            } else {
                                var acc = "";
                                while (src.length > 1) {
                                    acc = src.slice(-1) + acc;
                                    src = src.substr(0, src.length - 1);
                                }
                                target = Dagaz.Model.createPiece((src / 2) | 0, (src % 2) + 1);
                                if (acc.length > 0) {
                                    target = target.setValue(0, acc);
                                }
                            }
                            piece = piece.setValue(0, dst);
                        }
                    }
                    actions.push([ action[0], action[1], [piece], maxpn ]);
                    if (target !== null) {
                        actions.push([ [last], [last], [target], maxpn ]);
                        last = null;
                    }
                } else {
                    last = action[0][0];
                }
            } else {
                nove.failed = true;
            }
        });
        _.each(captured, function(pos) {
            actions.push([ [pos], null, null, maxpn ]);
        });
        move.actions = actions;
    });
  CheckInvariants(board);
}

})();
