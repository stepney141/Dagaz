(function() {

var promote = [];

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "tenjiku-shogi-promotion") {
      promote[ 0] = 51; // Knight -> Side-Soldier!
      promote[ 1] = 53; // Iron-General -> Vertical-Soldier!
      promote[ 2] = 38; // Pawn -> Gold-General!
      promote[ 3] = 22; // Bishop -> Dragon-Horse!
      promote[ 5] = 20; // Rook -> Dragon-King!
      promote[ 7] = 57; // Queen -> Free-Eagle
      promote[11] = 45; // Horned-Falcon -> Bishop-General!
      promote[13] = 47; // Soaring-Eagle -> Rook-General!
      promote[17] = 58; // Lion -> Lion-Hawk
      promote[19] = 14; // Dragon-King -> Soaring-Eagle!
      promote[21] = 12; // Dragon-Horse -> Horned-Falcon!
      promote[23] = 18; // Kirin -> Lion!
      promote[24] =  8; // Phoenix -> Queen!
      promote[25] = 15; // Reverse-Chariot -> Whale
      promote[26] = 10; // Side-Mover -> Free-Boar
      promote[28] =  9; // Vertical-Mover -> Flying-Ox
      promote[31] = 16; // Lance -> White-Horse
      promote[34] = 30; // Blind-Tiger -> Flying-Stag
      promote[35] = 33; // Drunk-Elephant -> Prince
      promote[36] =  4; // Ferocious-Leopard -> Bishop!
      promote[37] =  6; // Gold-General -> Rook!
      promote[39] = 29; // Silver-General -> Vertical-Mover!
      promote[40] = 27; // Copper-General -> Side-Mover!
      promote[41] = 59; // Chariot-Soldier -> Heavenly-Tetrarch
      promote[43] = 60; // Dog -> Multi-General
      promote[44] = 48; // Bishop-General -> Vice-General
      promote[46] = 49; // Rook-General -> Great-General
      promote[50] = 55; // Side-Soldier -> Water-Buffalo!
      promote[52] = 42; // Vertical-Soldier -> Chariot-Soldier!
      promote[54] = 56; // Water-Buffalo -> Fire-Demon
  } else {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.chain(board.moves)
   .filter(function(move) {
        return move.actions.length > 0;
    })
   .each(function(move) {
        var pos = null;
        var action = null;
        _.chain(move.actions)
         .filter(function(a) {
              return (a[0] !== null) && (a[1] !== null);
          })
         .each(function(a) {
              if (pos === null) {
                  pos = a[0][0];
              }
              action = a;
          });
        if ((pos !== null) && (action !== null)) {
            var isForced = false;
            var piece = board.getPiece(pos);
            var enemy = board.getPiece(action[1][0]);
            if ((piece !== null) && promote[piece.type]) {
                if (piece.type == 0) {
                    var p = design.navigate(board.player, action[1][0], 4);
                    if (p !== null) {
                        p = design.navigate(board.player, p, 4);
                        if (p === null) {
                            isForced = true;
                        }
                    }
                }
                if ((piece.type == 2) || (piece.type == 31) || (piece.type == 1)) {
                    var p = design.navigate(board.player, action[1][0], 4);
                    if (p === null) {
                        isForced = true;
                    }
                }
                if ((design.inZone(0, board.player, action[1][0]) && !design.inZone(0, board.player, pos)) ||
                    (design.inZone(0, board.player, pos) && (enemy !== null)) || isForced) {
                     action[2] = isForced ? [ piece.promote(promote[piece.type]) ] : [ piece, piece.promote(promote[piece.type]) ];
                }
            }
        }
    });
  CheckInvariants(board);
}

})();
