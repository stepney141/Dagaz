(function() {

Dagaz.Model.deferredStrike = true;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "columns-checkers-extension") {
     checkVersion(design, name, value);
  }
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
                                dst = 0;
                            }
                            dst *= 4;
                            dst += p.type * 2;
                            dst += p.player - 1;
                            var src = p.getValue(0);
                            if ((src === null) || (src == 0)) {
                                captured.push(last);
                                last = null;
                            } else {
                                var acc = 0;
                                var num = 0;
                                while ((src / 4) | 0 != 0) {
                                    acc += num * (src % 4);
                                    num *= 4;
                                    src = (src / 4) | 0;
                                }
                                target = Dagaz.Model.createPiece((src / 2) | 0, (src % 2) + 1);
                                if (acc != 0) {
                                    target = target.setValue(acc);
                                }
                            }
                            piece = piece.setValue(0, dst);
                        }
                    }
                    actions.push([ action[0], action[1], piece, maxpn ]);
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
