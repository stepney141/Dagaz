(function() {

Dagaz.Model.deferredStrike = true;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "columns-checkers-extension") {
     checkVersion(design, name, value);
  }
}

Dagaz.View.showPiece = function(self, ctx, pos, piece, model, x, y) {
  var val = null;
  if (model) {
      val = model.getValue(0);
  }
  if (!val) {
      val = null;
  }
  if (val !== null) {
      x -= 3;
      // TODO:
  }
  ctx.drawImage(piece.h, x, y, piece.dx, piece.dy);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
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
                    maxpn = action[3];
                    var target = null;
                    if (last !== null) {
                        var p = board.getPiece(last);
                        if (p !== null) {
                            var dst = piece.getValue(0);
                            if (dst === null) {
                                dst = "";
                            }
                            dst = dst + ((p.type * 2) + p.player - 1);
                            var src = p.getValue(0);
                            if ((src === null) || (src == "")) {
                                captured.push(last);
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
