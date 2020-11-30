Dagaz.Controller.persistense = "none";

ZRF = {
    JUMP:          0,
    IF:            1,
    FORK:          2,
    FUNCTION:      3,
    IN_ZONE:       4,
    FLAG:          5,
    SET_FLAG:      6,
    POS_FLAG:      7,
    SET_POS_FLAG:  8,
    ATTR:          9,
    SET_ATTR:      10,
    PROMOTE:       11,
    MODE:          12,
    ON_BOARD_DIR:  13,
    ON_BOARD_POS:  14,
    PARAM:         15,
    LITERAL:       16,
    VERIFY:        20
};

Dagaz.Model.BuildDesign = function(design) {
    design.checkVersion("z2j", "2");
    design.checkVersion("animate-captures", "false");
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-hints", "false");

    design.addDirection("se"); // 0
    design.addDirection("s");  // 1
    design.addDirection("sw"); // 2
    design.addDirection("e");  // 3
    design.addDirection("w");  // 4
    design.addDirection("ne"); // 5
    design.addDirection("nw"); // 6
    design.addDirection("n");  // 7

    design.addPlayer("White", [6, 7, 5, 4, 3, 2, 0, 1]);
    design.addPlayer("Black", [5, 7, 6, 3, 4, 0, 2, 1]);

    design.addPosition("a1", [9, 8, 0, 1, 0, 0, 0, 0]);
    design.addPosition("b1", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("c1", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("d1", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("e1", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("f1", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("g1", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("h1", [0, 8, 7, 0, -1, 0, 0, 0]);
    design.addPosition("a2", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h2", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a3", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h3", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a4", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h4", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a5", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h5", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a6", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h6", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a7", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h7", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a8", [0, 0, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b8", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("c8", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("d8", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("e8", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("f8", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("g8", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("h8", [0, 0, 0, 0, -1, 0, -9, -8]);

    design.setupSelector(12);

    design.addZone("last-rank", 1, [0, 1, 2], 1);
    design.addZone("last-rank", 2, [16, 17, 18], 1);
    design.addZone("third-rank", 1, [], 1);
    design.addZone("third-rank", 2, [], 1);
    design.addZone("init-king", 1, [], 1);
    design.addZone("init-king", 2, [], 1);
    design.addZone("init-rook", 1, [], 1);
    design.addZone("init-rook", 2, [], 1);
    design.addZone("board-zone", 1, [0, 1, 2, 8, 9, 10, 16, 17, 18], 1);
    design.addZone("board-zone", 2, [0, 1, 2, 8, 9, 10, 16, 17, 18], 1);

    design.addZone("last-rank", 1, [0, 1, 2, 3], 2);
    design.addZone("last-rank", 2, [16, 17, 18, 19], 2);
    design.addZone("third-rank", 1, [], 2);
    design.addZone("third-rank", 2, [], 2);
    design.addZone("init-king", 1, [], 2);
    design.addZone("init-king", 2, [], 2);
    design.addZone("init-rook", 1, [], 2);
    design.addZone("init-rook", 2, [], 2);
    design.addZone("board-zone", 1, [0, 1, 2, 3, 8, 9, 10, 11, 16, 17, 18, 19], 2);
    design.addZone("board-zone", 2, [0, 1, 2, 3, 8, 9, 10, 11, 16, 17, 18, 19], 2);

    design.addZone("last-rank", 1, [0, 1, 2, 3, 4], 3);
    design.addZone("last-rank", 2, [16, 17, 18, 19, 20], 3);
    design.addZone("third-rank", 1, [], 3);
    design.addZone("third-rank", 2, [], 3);
    design.addZone("init-king", 1, [], 3);
    design.addZone("init-king", 2, [], 3);
    design.addZone("init-rook", 1, [], 3);
    design.addZone("init-rook", 2, [], 3);
    design.addZone("board-zone", 1, [0, 1, 2, 3, 4, 8, 9, 10, 11, 12, 16, 17, 18, 19, 20], 3);
    design.addZone("board-zone", 2, [0, 1, 2, 3, 4, 8, 9, 10, 11, 12, 16, 17, 18, 19, 20], 3);

    design.addZone("last-rank", 1, [0, 1, 2, 3, 4, 5], 4);
    design.addZone("last-rank", 2, [16, 17, 18, 19, 20, 21], 4);
    design.addZone("third-rank", 1, [], 4);
    design.addZone("third-rank", 2, [], 4);
    design.addZone("init-king", 1, [], 4);
    design.addZone("init-king", 2, [], 4);
    design.addZone("init-rook", 1, [], 4);
    design.addZone("init-rook", 2, [], 4);
    design.addZone("board-zone", 1, [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21], 4);
    design.addZone("board-zone", 2, [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21], 4);

    design.addZone("last-rank", 1, [0, 1, 2, 3, 4, 5], 5);
    design.addZone("last-rank", 2, [16, 17, 18, 19, 20, 21], 5);
    design.addZone("third-rank", 1, [], 5);
    design.addZone("third-rank", 2, [], 5);
    design.addZone("init-king", 1, [], 5);
    design.addZone("init-king", 2, [], 5);
    design.addZone("init-rook", 1, [], 5);
    design.addZone("init-rook", 2, [], 5);
    design.addZone("board-zone", 1, [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21], 5);
    design.addZone("board-zone", 2, [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21], 5);

    design.addZone("last-rank", 1, [0, 1, 2, 3, 4, 5, 6, 7], 6);
    design.addZone("last-rank", 2, [16, 17, 18, 19, 20, 21, 22, 23], 6);
    design.addZone("third-rank", 1, [], 6);
    design.addZone("third-rank", 2, [], 6);
    design.addZone("init-king", 1, [], 6);
    design.addZone("init-king", 2, [], 6);
    design.addZone("init-rook", 1, [], 6);
    design.addZone("init-rook", 2, [], 6);
    design.addZone("board-zone", 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 6);
    design.addZone("board-zone", 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 6);

    design.addZone("last-rank", 1, [0, 1, 2], 7);
    design.addZone("last-rank", 2, [24, 25, 26], 7);
    design.addZone("third-rank", 1, [], 7);
    design.addZone("third-rank", 2, [], 7);
    design.addZone("init-king", 1, [], 7);
    design.addZone("init-king", 2, [], 7);
    design.addZone("init-rook", 1, [], 7);
    design.addZone("init-rook", 2, [], 7);
    design.addZone("board-zone", 1, [0, 1, 2, 8, 9, 10, 16, 17, 18, 24, 25, 26], 7);
    design.addZone("board-zone", 2, [0, 1, 2, 8, 9, 10, 16, 17, 18, 24, 25, 26], 7);

    design.addZone("last-rank", 1, [0, 1, 2, 3], 8);
    design.addZone("last-rank", 2, [24, 25, 26, 27], 8);
    design.addZone("third-rank", 1, [], 8);
    design.addZone("third-rank", 2, [], 8);
    design.addZone("init-king", 1, [], 8);
    design.addZone("init-king", 2, [], 8);
    design.addZone("init-rook", 1, [], 8);
    design.addZone("init-rook", 2, [], 8);
    design.addZone("board-zone", 1, [0, 1, 2, 3, 8, 9, 10, 11, 16, 17, 18, 19, 24, 25, 26, 27], 8);
    design.addZone("board-zone", 2, [0, 1, 2, 3, 8, 9, 10, 11, 16, 17, 18, 19, 24, 25, 26, 27], 8);

    design.addZone("last-rank", 1, [0, 1, 2, 3, 4], 9);
    design.addZone("last-rank", 2, [24, 25, 26, 27, 28], 9);
    design.addZone("third-rank", 1, [], 9);
    design.addZone("third-rank", 2, [], 9);
    design.addZone("init-king", 1, [], 9);
    design.addZone("init-king", 2, [], 9);
    design.addZone("init-rook", 1, [], 9);
    design.addZone("init-rook", 2, [], 9);
    design.addZone("board-zone", 1, [0, 1, 2, 3, 4, 8, 9, 10, 11, 12, 16, 17, 18, 19, 20, 24, 25, 26, 27, 28], 9);
    design.addZone("board-zone", 2, [0, 1, 2, 3, 4, 8, 9, 10, 11, 12, 16, 17, 18, 19, 20, 24, 25, 26, 27, 28], 9);

    design.addZone("last-rank", 1, [0, 1, 2, 3, 4, 5], 10);
    design.addZone("last-rank", 2, [24, 25, 26, 27, 28, 29], 10);
    design.addZone("third-rank", 1, [], 10);
    design.addZone("third-rank", 2, [], 10);
    design.addZone("init-king", 1, [], 10);
    design.addZone("init-king", 2, [], 10);
    design.addZone("init-rook", 1, [], 10);
    design.addZone("init-rook", 2, [], 10);
    design.addZone("board-zone", 1, [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 29], 10);
    design.addZone("board-zone", 2, [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 29], 10);

    design.addZone("last-rank", 1, [0, 1, 2, 3, 4, 5, 6], 11);
    design.addZone("last-rank", 2, [24, 25, 26, 27, 28, 29, 30], 11);
    design.addZone("third-rank", 1, [], 11);
    design.addZone("third-rank", 2, [], 11);
    design.addZone("init-king", 1, [], 11);
    design.addZone("init-king", 2, [], 11);
    design.addZone("init-rook", 1, [], 11);
    design.addZone("init-rook", 2, [], 11);
    design.addZone("board-zone", 1, [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30], 11);
    design.addZone("board-zone", 2, [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30], 11);

    design.addZone("last-rank", 1, [0, 1, 2, 3, 4, 5, 6, 7], 12);
    design.addZone("last-rank", 2, [24, 25, 26, 27, 28, 29, 30, 31], 12);
    design.addZone("third-rank", 1, [], 12);
    design.addZone("third-rank", 2, [], 12);
    design.addZone("init-king", 1, [], 12);
    design.addZone("init-king", 2, [], 12);
    design.addZone("init-rook", 1, [], 12);
    design.addZone("init-rook", 2, [], 12);
    design.addZone("board-zone", 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 12);
    design.addZone("board-zone", 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 12);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.IN_ZONE,	4);	// board-zone
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.IN_ZONE,	0);	// last-rank
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	4);
    design.addCommand(0, ZRF.PROMOTE,	4);	// Queen
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.IN_ZONE,	1);	// third-rank
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.IN_ZONE,	4);	// board-zone
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.IN_ZONE,	4);	// board-zone
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.IN_ZONE,	0);	// last-rank
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	4);
    design.addCommand(2, ZRF.PROMOTE,	4);	// Queen
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.JUMP,	2);
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	5);	// last-to?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.LITERAL,	0);	// Pawn
    design.addCommand(3, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	26);	// capture
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	6);	// mark
    design.addCommand(3, ZRF.PARAM,	2);	// $3
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	4);	// last-from?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	7);	// back
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.IF,	9);
    design.addCommand(4, ZRF.IN_ZONE,	4);	// board-zone
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FORK,	3);
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end
    design.addCommand(4, ZRF.PARAM,	1);	// $2
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.JUMP,	-10);
    design.addCommand(4, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.IN_ZONE,	4);	// board-zone
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.PARAM,	1);	// $2
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(5, ZRF.FUNCTION,	0);	// not
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.IN_ZONE,	4);	// board-zone
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.PARAM,	0);	// $1
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.IN_ZONE,	4);	// board-zone
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addCommand(7, ZRF.FUNCTION,	24);	// from
    design.addCommand(7, ZRF.IN_ZONE,	2);	// init-king
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.PARAM,	0);	// $1
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.PARAM,	1);	// $2
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.PARAM,	2);	// $3
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.LITERAL,	1);	// Rook
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.IN_ZONE,	3);	// init-rook
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.FUNCTION,	24);	// from
    design.addCommand(7, ZRF.PARAM,	3);	// $4
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.PARAM,	4);	// $5
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.FUNCTION,	28);	// end

    design.addCommand(8, ZRF.FUNCTION,	24);	// from
    design.addCommand(8, ZRF.IN_ZONE,	2);	// init-king
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.PARAM,	0);	// $1
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.PARAM,	1);	// $2
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.PARAM,	2);	// $3
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.PARAM,	3);	// $4
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.LITERAL,	1);	// Rook
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.IN_ZONE,	3);	// init-rook
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.FUNCTION,	24);	// from
    design.addCommand(8, ZRF.PARAM,	4);	// $5
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.PARAM,	5);	// $6
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.PARAM,	6);	// $7
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.FUNCTION,	28);	// end

    design.addPiece("Pawn", 0, 800);
    design.addMove(0, 0, [7], 0);
    design.addMove(0, 1, [7, 7], 0);
    design.addMove(0, 2, [6], 0);
    design.addMove(0, 2, [5], 0);
    design.addMove(0, 3, [3, 7, 7], 0);
    design.addMove(0, 3, [4, 7, 7], 0);

    design.addPiece("Rook", 1, 5000);
    design.addMove(1, 4, [7, 7], 0);
    design.addMove(1, 4, [1, 1], 0);
    design.addMove(1, 4, [4, 4], 0);
    design.addMove(1, 4, [3, 3], 0);

    design.addPiece("Knight", 2, 3350);
    design.addMove(2, 5, [7, 6], 0);
    design.addMove(2, 5, [7, 5], 0);
    design.addMove(2, 5, [1, 2], 0);
    design.addMove(2, 5, [1, 0], 0);
    design.addMove(2, 5, [4, 6], 0);
    design.addMove(2, 5, [4, 2], 0);
    design.addMove(2, 5, [3, 5], 0);
    design.addMove(2, 5, [3, 0], 0);

    design.addPiece("Bishop", 3, 3450);
    design.addMove(3, 4, [6, 6], 0);
    design.addMove(3, 4, [2, 2], 0);
    design.addMove(3, 4, [5, 5], 0);
    design.addMove(3, 4, [0, 0], 0);

    design.addPiece("Queen", 4, 9750);
    design.addMove(4, 4, [7, 7], 0);
    design.addMove(4, 4, [1, 1], 0);
    design.addMove(4, 4, [4, 4], 0);
    design.addMove(4, 4, [3, 3], 0);
    design.addMove(4, 4, [6, 6], 0);
    design.addMove(4, 4, [2, 2], 0);
    design.addMove(4, 4, [5, 5], 0);
    design.addMove(4, 4, [0, 0], 0);

    design.addPiece("King", 5, 600000);
    design.addMove(5, 6, [7], 0);
    design.addMove(5, 6, [1], 0);
    design.addMove(5, 6, [4], 0);
    design.addMove(5, 6, [3], 0);
    design.addMove(5, 6, [6], 0);
    design.addMove(5, 6, [2], 0);
    design.addMove(5, 6, [5], 0);
    design.addMove(5, 6, [0], 0);
    design.addMove(5, 7, [3, 3, 3, 4, 4], 0);
    design.addMove(5, 8, [4, 4, 4, 4, 3, 3, 3], 0);

    design.setup("White", "King", 17, 1);
    design.setup("Black", "King", 1, 1);

    design.setup("White", "King", 18, 2);
    design.setup("Black", "King", 1, 2);

    design.setup("White", "King", 18, 3);
    design.setup("Black", "King", 2, 3);

    design.setup("White", "King", 19, 4);
    design.setup("Black", "King", 2, 4);

    design.setup("White", "King", 19, 5);
    design.setup("Black", "King", 3, 5);

    design.setup("White", "King", 20, 6);
    design.setup("Black", "King", 3, 6);

    design.setup("White", "King", 25, 7);
    design.setup("Black", "King", 1, 7);

    design.setup("White", "King", 26, 8);
    design.setup("Black", "King", 1, 8);

    design.setup("White", "King", 26, 9);
    design.setup("Black", "King", 2, 9);

    design.setup("White", "King", 27, 10);
    design.setup("Black", "King", 2, 10);

    design.setup("White", "King", 27, 11);
    design.setup("Black", "King", 3, 11);

    design.setup("White", "King", 28, 12);
    design.setup("Black", "King", 3, 12);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board_1", 0, 0, 1);
    view.defBoard("Board_2", 0, 0, 2);
    view.defBoard("Board_3", 0, 0, 3);
    view.defBoard("Board_4", 0, 0, 4);
    view.defBoard("Board_5", 0, 0, 5);
    view.defBoard("Board_6", 0, 0, 6);
    view.defBoard("Board_7", 0, 0, 7);
    view.defBoard("Board_8", 0, 0, 8);
    view.defBoard("Board_9", 0, 0, 9);
    view.defBoard("Board_10", 0, 0, 10);
    view.defBoard("Board_11", 0, 0, 11);
    view.defBoard("Board_12", 0, 0, 12);
    view.defPiece("WhitePawn", "White Pawn");
    view.defPiece("BlackPawn", "Black Pawn");
    view.defPiece("WhiteRook", "White Rook");
    view.defPiece("BlackRook", "Black Rook");
    view.defPiece("WhiteKnight", "White Knight");
    view.defPiece("BlackKnight", "Black Knight");
    view.defPiece("WhiteBishop", "White Bishop");
    view.defPiece("BlackBishop", "Black Bishop");
    view.defPiece("WhiteQueen", "White Queen");
    view.defPiece("BlackQueen", "Black Queen");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
 
    view.defPosition("a1", 2, 2, 68, 68);
    view.defPosition("b1", 70, 2, 68, 68);
    view.defPosition("c1", 138, 2, 68, 68);
    view.defPosition("d1", 206, 2, 68, 68);
    view.defPosition("e1", 274, 2, 68, 68);
    view.defPosition("f1", 342, 2, 68, 68);
    view.defPosition("g1", 410, 2, 68, 68);
    view.defPosition("h1", 478, 2, 68, 68);
    view.defPosition("a2", 2, 70, 68, 68);
    view.defPosition("b2", 70, 70, 68, 68);
    view.defPosition("c2", 138, 70, 68, 68);
    view.defPosition("d2", 206, 70, 68, 68);
    view.defPosition("e2", 274, 70, 68, 68);
    view.defPosition("f2", 342, 70, 68, 68);
    view.defPosition("g2", 410, 70, 68, 68);
    view.defPosition("h2", 478, 70, 68, 68);
    view.defPosition("a3", 2, 138, 68, 68);
    view.defPosition("b3", 70, 138, 68, 68);
    view.defPosition("c3", 138, 138, 68, 68);
    view.defPosition("d3", 206, 138, 68, 68);
    view.defPosition("e3", 274, 138, 68, 68);
    view.defPosition("f3", 342, 138, 68, 68);
    view.defPosition("g3", 410, 138, 68, 68);
    view.defPosition("h3", 478, 138, 68, 68);
    view.defPosition("a4", 2, 206, 68, 68);
    view.defPosition("b4", 70, 206, 68, 68);
    view.defPosition("c4", 138, 206, 68, 68);
    view.defPosition("d4", 206, 206, 68, 68);
    view.defPosition("e4", 274, 206, 68, 68);
    view.defPosition("f4", 342, 206, 68, 68);
    view.defPosition("g4", 410, 206, 68, 68);
    view.defPosition("h4", 478, 206, 68, 68);
    view.defPosition("a5", 2, 274, 68, 68);
    view.defPosition("b5", 70, 274, 68, 68);
    view.defPosition("c5", 138, 274, 68, 68);
    view.defPosition("d5", 206, 274, 68, 68);
    view.defPosition("e5", 274, 274, 68, 68);
    view.defPosition("f5", 342, 274, 68, 68);
    view.defPosition("g5", 410, 274, 68, 68);
    view.defPosition("h5", 478, 274, 68, 68);
    view.defPosition("a6", 2, 342, 68, 68);
    view.defPosition("b6", 70, 342, 68, 68);
    view.defPosition("c6", 138, 342, 68, 68);
    view.defPosition("d6", 206, 342, 68, 68);
    view.defPosition("e6", 274, 342, 68, 68);
    view.defPosition("f6", 342, 342, 68, 68);
    view.defPosition("g6", 410, 342, 68, 68);
    view.defPosition("h6", 478, 342, 68, 68);
    view.defPosition("a7", 2, 410, 68, 68);
    view.defPosition("b7", 70, 410, 68, 68);
    view.defPosition("c7", 138, 410, 68, 68);
    view.defPosition("d7", 206, 410, 68, 68);
    view.defPosition("e7", 274, 410, 68, 68);
    view.defPosition("f7", 342, 410, 68, 68);
    view.defPosition("g7", 410, 410, 68, 68);
    view.defPosition("h7", 478, 410, 68, 68);
    view.defPosition("a8", 2, 478, 68, 68);
    view.defPosition("b8", 70, 478, 68, 68);
    view.defPosition("c8", 138, 478, 68, 68);
    view.defPosition("d8", 206, 478, 68, 68);
    view.defPosition("e8", 274, 478, 68, 68);
    view.defPosition("f8", 342, 478, 68, 68);
    view.defPosition("g8", 410, 478, 68, 68);
    view.defPosition("h8", 478, 478, 68, 68);
}
