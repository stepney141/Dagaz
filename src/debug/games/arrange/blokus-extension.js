(function() {

var pattern = [];
var limited = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "blokus-extension") {
     pattern.push([                     // 0
        [1,  0]                         // *
     ]);
     pattern.push([                     // 1
        [2,  1,  2]                     // **
     ]);
     pattern.push([                     // 2
        [2,  3],                        // *
        [0,  4]                         // *
     ]);
     pattern.push([                     // 3
        [3,  1,  5],                    // **
        [1,  4]                         //  *
     ]);
     pattern.push([                     // 4
        [3,  3],                        //  *
        [-1, 1,  6]                     // **
     ]);
     pattern.push([                     // 5
        [3,  3],                        // *
        [0,  8,  2]                     // **
     ]);
     pattern.push([                     // 6
        [3,  7,  2],                    // **
        [0,  4]                         // *
     ]);
     pattern.push([                     // 7
        [4,  1,  9,  2],                // ***
     ]);
     pattern.push([                     // 8
        [4,  3],                        // *
        [0,  10],                       // *
        [0,  4]                         // *
     ]);
     if (+value > 3) {
         pattern.push([                 // 9
            [5,  11, 12],               // **
            [0,  13, 14]                // **
         ]);
         pattern.push([                 // 10
            [6,  3],                    //  *
            [-1, 1,  15, 2]             // ***
         ]);
         pattern.push([                 // 11
            [6,  3],                    // *
            [0,  16, 2],                // **
            [0,  4]                     // *
         ]);
         pattern.push([                 // 12
            [6,  1,  17, 2],            // ***
            [1,  4]                     //  *
         ]);
         pattern.push([                 // 13
            [6,  3],                    //  *
            [-1, 1,  18],               // **
            [0,  4]                     //  *
         ]);
         pattern.push([                 // 14
            [7,  1,  9,  9,  2],        // ****
         ]);
         pattern.push([                 // 15
            [7,  3],                    // *
            [0,  10],                   // *
            [0,  10],                   // *
            [0,  4]                     // *
         ]);
         pattern.push([                 // 16
            [8,  3],                    //   *
            [-2, 1,  9,  6]             // ***
         ]);
         pattern.push([                 // 17
            [8,  3],                    // *
            [0,  10],                   // *
            [0,  8,  2]                 // **
         ]);
         pattern.push([                 // 18
            [8,  7,  9,  2],            // ***
            [0,  4]                     // *
         ]);
         pattern.push([                 // 19
            [8,  1,  5],                // **
            [1,  10],                   //  *
            [1,  4]                     //  *
         ]);
         pattern.push([                 // 20
            [8,  3],                    // *
            [0,  8,  9,  2]             // ***
         ]);
         pattern.push([                 // 21
            [8,  7,  2],                // **
            [0,  10],                   // *
            [0,  4]                     // *
         ]);
         pattern.push([                 // 22
            [8,  1,  9,  5],            // ***
            [2,  4]                     //   *
         ]);
         pattern.push([                 // 23
            [8,  3],                    //  *
            [0,  10],                   //  *
            [-1, 1,  6]                 // **
         ]);
         pattern.push([                 // 24
            [9,  7,  2],                //  **
            [-1, 1,  6]                 // **
         ]);
         pattern.push([                 // 25
            [9,  3],                    // *
            [0,  8,  5],                // **
            [1,  4]                     //  *
         ]);
         pattern.push([                 // 26
            [9,  1,  5],                // **
            [1,  8,  2]                 //  **
         ]);
         pattern.push([                 // 27
            [9,  3],                    //  *
            [-1, 7,  6],                // **
            [-1, 4]                     // *
         ]);
     }
     if (+value > 4) {
         limited = true;
         pattern.push([                 // 28
            [10, 3],                    // *
            [0,  8,  9,  9,  2]         // ****
         ]);
         pattern.push([                 // 29
            [10, 7,  2],                // ** 
            [0,  10],                   // *
            [0,  10],                   // *
            [0,  4]                     // *
         ]);
         pattern.push([                 // 30
            [10, 1,  9,  9,  5],        // ****
            [3,  4]                     //    *
         ]);
         pattern.push([                 // 31
            [10, 3],                    //  *
            [0,  10],                   //  *
            [0,  10],                   //  *
            [-1, 1,  6]                 // **
         ]);
         pattern.push([                 // 32
            [10, 3],                    //    * 
            [-3, 1,  9,  9,  6]         // ****
         ]);
         pattern.push([                 // 33
            [10, 3],                    // *
            [0,  10],                   // *
            [0,  10],                   // *
            [0,  8,  2]                 // **
         ]);
         pattern.push([                 // 34
            [10, 7,  9,  9,  2],        // ****
            [0,  4]                     // *
         ]);
         pattern.push([                 // 35
            [10, 1,  5],                // **
            [1,  10],                   //  *
            [1,  10],                   //  *
            [1,  4]                     //  *
         ]);
         pattern.push([                 // 36
            [11, 3],                    //  *
            [0,  10],                   //  *
            [-1, 1,  15, 2]             // ***
         ]);
         pattern.push([                 // 37
            [11, 3],                    // *
            [0,  16, 9,  2],            // ***
            [0,  4]                     // *
         ]);
         pattern.push([                 // 38
            [11, 1,  17, 2],            // ***
            [1,  10],                   //  *
            [1,  4]                     //  *
         ]);
         pattern.push([                 // 39
            [11, 3],                    //   *
            [-2, 1,  9,  18],           // ***
            [0,  4]                     //   *
         ]);
         pattern.push([                 // 40
            [12, 3],                    // *
            [0,  10],                   // *
            [0,  8,  9,  2]             // ***
         ]);
         pattern.push([                 // 41
            [12, 7,  9,  2],            // ***
            [0,  10],                   // *
            [0,  4]                     // *
         ]);
         pattern.push([                 // 42
            [12, 1,  9,  5],            // ***
            [2,  10],                   //   *
            [2,  4]                     //   *
         ]);
         pattern.push([                 // 43
            [12, 3],                    //   *
            [0,  10],                   //   *
            [-2, 1,  9,  6]             // ***
         ]);
         pattern.push([                 // 44
            [13, 7,  9,  2],            //  ***
            [-1, 1,  6]                 // **
         ]);
         pattern.push([                 // 45
            [13, 3],                    // *
            [0,  8,  5],                // **
            [1,  10],                   //  *
            [1,  4]                     //  *
         ]);
         pattern.push([                 // 46
            [13, 7,  2],                //   **
            [-2, 1,  9,  6]             // ***
         ]);
         pattern.push([                 // 47
            [13, 3],                    // *
            [0,  10],                   // *
            [0,  8,  5],                // **
            [1,  4]                     //  *
         ]);
         pattern.push([                 // 48
            [13, 1,  9,  5],            // ***
            [2,  8,  2]                 //   **
         ]);
         pattern.push([                 // 49
            [13, 3],                    //  *
            [0,  10],                   //  *
            [-1, 7,  6],                // **
            [-1, 4]                     // *
         ]);
         pattern.push([                 // 50
            [13, 1,  5],                // **
            [1,  8,  9,  2]             //  ***
         ]);
         pattern.push([                 // 51
            [13, 3],                    //  *
            [-1, 7,  6],                // **
            [-1, 10],                   // *
            [-1, 4]                     // *
         ]);
         pattern.push([                 // 52
            [14, 3],                    //   *
            [-2, 7,  9,  6],            // ***
            [-2, 4]                     // *
         ]);
         pattern.push([                 // 53
            [14,  1,  5],               // **
            [1,  10],                   //  *
            [1,  8,  2]                 //  **
         ]);
         pattern.push([                 // 54
            [14, 3],                    // *
            [0,  8,  9,  5],            // ***
            [2,  4]                     //   *
         ]);
         pattern.push([                 // 55
            [14, 7,  2],                //  **
            [0,  10],                   //  *
            [-1, 1,  6]                 // **
         ]);
         pattern.push([                 // 56
            [15,  1,  9,  9,  9,  2],   // *****
         ]);
         pattern.push([                 // 57
            [15, 3],                    // *
            [0,  10],                   // *
            [0,  10],                   // *
            [0,  10],                   // *
            [0,  4]                     // *
         ]);
         pattern.push([                 // 55
            [16, 3],                    // *
            [0,  19, 12],               // **
            [0,  13, 14]                // **
         ]);
         pattern.push([                 // 56
            [16, 11, 20, 2],            // ***
            [0,  13, 14]                // **
         ]);
         pattern.push([                 // 57
            [16, 11, 12],               // **
            [0,  13, 21],               // **
            [1,  4]                     //  *
         ]);
         pattern.push([                 // 58
            [16, 11, 12],               //  **
            [-1, 1,  22, 14]            // ***
         ]);
         pattern.push([                 // 59
            [16, 3],                    //  *
            [-1, 11, 23],               // **
            [-1, 13, 14]                // **
         ]);
         pattern.push([                 // 60
            [16, 11, 12],               // **
            [0,  13, 24, 2]             // ***
         ]);
         pattern.push([                 // 61
            [16, 11, 12],               // **
            [0,  25, 14],               // **
            [0,  4]                     // *
         ]);
         pattern.push([                 // 62
            [16, 1,  26, 12],           // ***
            [1,  13, 14]                //  **
         ]);
         pattern.push([                 // 63
            [17, 7,  2],                //  **
            [-1, 7,  6],                // **
            [-1, 4]                     // *
         ]);
         pattern.push([                 // 64
            [17, 1,  5],                // **
            [1,  8,  5],                //  **
            [2,  4]                     //   *
         ]);
         pattern.push([                 // 65
            [17, 3],                    //   *
            [-1, 7,  6],                //  **
            [-2, 1,  6]                 // **
         ]);
         pattern.push([                 // 66
            [17, 3],                    // *
            [0,  8,  5],                // **
            [1,  8,  2]                 //  **
         ]);
         pattern.push([                 // 67
            [18, 7,  2],                // **
            [0,  10],                   // *
            [0,  8,  2]                 // **
         ]);
         pattern.push([                 // 68
            [18, 7,  9,  5],            // ***
            [0,  4,  0,  4]             // * *
         ]);
         pattern.push([                 // 69
            [18, 1,  5],                // **
            [1,  10],                   //  *
            [0,  1,  6]                 // **
         ]);
         pattern.push([                 // 70
            [18, 3,  0,  3],            // * *
            [0,  8,  9,  6]             // ***
         ]);
         pattern.push([                 // 71
            [19, 7,  2],                //  **
            [-1, 1,  18],               // **
            [0,  4]                     //  *
         ]);
         pattern.push([                 // 72
            [19, 3],                    //  *
            [-1, 1, 15, 5],             // ***
            [1,  4]                     //   *
         ]);
         pattern.push([                 // 73
            [19, 3],                    //  *
            [0,  16, 2],                //  **
            [-1, 1,  6]                 // **
         ]);
         pattern.push([                 // 74
            [19, 3],                    // *
            [0,  8,  17, 2],            // ***
            [1,  4]                     //  *
         ]);
         pattern.push([                 // 75
            [19, 1,  5],                // **
            [1,  16, 2],                //  **
            [1,  4]                     //  *
         ]);
         pattern.push([                 // 76
            [19, 3],                    //   *
            [-2, 1,  17, 6],            // ***
            [-1, 4]                     //  *
         ]);
         pattern.push([                 // 77
            [19, 3],                    //  *
            [-1, 1,  18],               // **
            [0,  8,  2]                 //  **
         ]);
         pattern.push([                 // 78
            [19, 3],                    //  *
            [-1, 1,  15, 2],            // ***
            [-1, 4]                     // *
         ]);
         pattern.push([                 // 79
            [20, 3],                    //  *
            [-1, 1,  27, 2],            // ***
            [0,  4]                     //  *
         ]);
         pattern.push([                 // 80
            [21, 3],                    //  *
            [-1, 1,  15, 9,  2]         // ****
         ]);
         pattern.push([                 // 81
            [21, 3],                    // *
            [0,  16, 2],                // **
            [0,  10],                   // *
            [0,  4]                     // *
         ]);
         pattern.push([                 // 82
            [21, 1,  9, 17, 2],         // ****
            [2,  4]                     //   *
         ]);
         pattern.push([                 // 83
            [21, 3],                    //  *
            [0,  10],                   //  *
            [-1, 1,  18],               // **
            [0,  4]                     //  *
         ]);
         pattern.push([                 // 84
            [21, 3],                    //   *
            [-2, 1,  9,  15, 2]         // ****
         ]);
         pattern.push([                 // 85
            [21, 3],                    // *
            [0,  10],                   // *
            [0,  16, 2],                // **
            [0,  4]                     // *
         ]);
         pattern.push([                 // 86
            [21, 1,  17, 9,  2],        // ****
            [1,  4]                     //  *
         ]);
         pattern.push([                 // 87
            [21, 3],                    //  *
            [-1, 1,  18],               // **
            [0,  10],                   //  *
            [0,  4]                     //  *
         ]);
     }
  } else {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var s = design.getDirection("s")
  var e = design.getDirection("e")
  var w = design.getDirection("w")
  var list = board.getValue(board.player);
  if (list === null) {
      list = [];
  }
  var moves = [];
  _.each(board.moves, function(move) {
      if (move.isDropMove()) {
          var pos   = move.actions[0][1][0];
          var piece = move.actions[0][2][0];
          for (var i = 0; i < pattern.length; i++) {
               if ((pattern[i][0][1] == piece.type) &&
                   (_.indexOf(list, pattern[i][0][0]) < 0)) {
                   var m = Dagaz.Model.createMove(i);
                   m.dropPiece(pos, piece);
                   for (var r = 0; r < pattern[i].length; r++) {
                        var p = pos;
                        if (r > 0) {
                            pos = design.navigate(board.player, pos, s);
                            p = pos;
                            if (pattern[i][r][0] > 0) {
                                var c = pattern[i][r][0];
                                for (var j = 0; j < c; j++) {
                                    if (p === null) break;
                                    p = design.navigate(board.player, p, e);
                                }
                            }
                            if (pattern[i][r][0] < 0) {
                                var c = -pattern[i][r][0];
                                for (var j = 0; j < c; j++) {
                                    if (p === null) break;
                                    p = design.navigate(board.player, p, w);
                                }
                            }
                        }
                        if (p === null) {
                            m.failed = true;
                            break;
                        }
                        for (var c = 1; c < pattern[i][r].length; c++) {
                            if ((p === null) || (board.getPiece(p) !== null)) {
                                 p = null;
                                 m.failed = true;
                                 break;
                            }
                            if (((r > 0) || (c > 1)) && (pattern[i][r][c] > 0)) {
                                piece = Dagaz.Model.createPiece(pattern[i][r][c], board.player);
                                m.dropPiece(p, piece);
                            }
                            p = design.navigate(board.player, p, e);
                        }
                        if (!_.isUndefined(m.failed)) break;
                   }
                   if (_.isUndefined(m.failed)) {
                       list.push(pattern[i][0][0]);
                       if (limited) {
                           m.setValue(board.player, list);
                       }
                       moves.push(m);
                   }
               }
          }
      }
  });
  board.moves = moves;
  CheckInvariants(board);
}

})();
