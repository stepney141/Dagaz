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
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("advisor-wait", "5");

    design.addDirection("se"); // 0
    design.addDirection("s");  // 1
    design.addDirection("sw"); // 2
    design.addDirection("e");  // 3
    design.addDirection("w");  // 4
    design.addDirection("ne"); // 5
    design.addDirection("nw"); // 6
    design.addDirection("n");  // 7

    design.addPlayer("White", [6, 7, 5, 4, 3, 2, 0, 1]);
    design.addPlayer("Black", [0, 1, 2, 3, 4, 5, 6, 7]);

    design.addPosition("a9", [9, 8, 0, 1, 0, 0, 0, 0]);
    design.addPosition("b9", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("c9", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("d9", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("e9", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("f9", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("g9", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("h9", [0, 8, 7, 0, -1, 0, 0, 0]);
    design.addPosition("a8", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b8", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c8", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d8", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e8", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f8", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g8", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h8", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a7", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h7", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a6", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h6", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a5", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h5", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a4", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h4", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a3", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h3", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a2", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h2", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a1", [0, 0, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b1", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("c1", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("d1", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("e1", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("f1", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("g1", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("h1", [0, 0, 0, 0, -1, 0, -9, -8]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PARAM,	1);	// $2
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PARAM,	2);	// $3
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addPiece("C2", 0, 2);
    design.addMove(0, 0, [7], 0);
    design.addMove(0, 0, [6], 0);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [5], 0);
    design.addMove(0, 0, [4], 0);
    design.addMove(0, 0, [2], 0);
    design.addMove(0, 0, [1], 0);
    design.addMove(0, 0, [0], 0);

    design.addPiece("C4", 1, 4);
    design.addMove(1, 0, [7], 0);
    design.addMove(1, 0, [6], 0);
    design.addMove(1, 0, [3], 0);
    design.addMove(1, 0, [5], 0);
    design.addMove(1, 0, [4], 0);
    design.addMove(1, 0, [2], 0);
    design.addMove(1, 0, [1], 0);
    design.addMove(1, 0, [0], 0);

    design.addPiece("C6", 2, 6);
    design.addMove(2, 0, [7], 0);
    design.addMove(2, 0, [6], 0);
    design.addMove(2, 0, [3], 0);
    design.addMove(2, 0, [5], 0);
    design.addMove(2, 0, [4], 0);
    design.addMove(2, 0, [2], 0);
    design.addMove(2, 0, [1], 0);
    design.addMove(2, 0, [0], 0);

    design.addPiece("C8", 3, 8);
    design.addMove(3, 0, [7], 0);
    design.addMove(3, 0, [6], 0);
    design.addMove(3, 0, [3], 0);
    design.addMove(3, 0, [5], 0);
    design.addMove(3, 0, [4], 0);
    design.addMove(3, 0, [2], 0);
    design.addMove(3, 0, [1], 0);
    design.addMove(3, 0, [0], 0);

    design.addPiece("C16", 4, 16);
    design.addMove(4, 0, [7], 0);
    design.addMove(4, 0, [6], 0);
    design.addMove(4, 0, [3], 0);
    design.addMove(4, 0, [5], 0);
    design.addMove(4, 0, [4], 0);
    design.addMove(4, 0, [2], 0);
    design.addMove(4, 0, [1], 0);
    design.addMove(4, 0, [0], 0);

    design.addPiece("C36", 5, 36);
    design.addMove(5, 0, [7], 0);
    design.addMove(5, 0, [6], 0);
    design.addMove(5, 0, [3], 0);
    design.addMove(5, 0, [5], 0);
    design.addMove(5, 0, [4], 0);
    design.addMove(5, 0, [2], 0);
    design.addMove(5, 0, [1], 0);
    design.addMove(5, 0, [0], 0);

    design.addPiece("C64", 6, 64);
    design.addMove(6, 0, [7], 0);
    design.addMove(6, 0, [6], 0);
    design.addMove(6, 0, [3], 0);
    design.addMove(6, 0, [5], 0);
    design.addMove(6, 0, [4], 0);
    design.addMove(6, 0, [2], 0);
    design.addMove(6, 0, [1], 0);
    design.addMove(6, 0, [0], 0);

    design.addPiece("C3", 7, 3);
    design.addMove(7, 0, [7], 0);
    design.addMove(7, 0, [6], 0);
    design.addMove(7, 0, [3], 0);
    design.addMove(7, 0, [5], 0);
    design.addMove(7, 0, [4], 0);
    design.addMove(7, 0, [2], 0);
    design.addMove(7, 0, [1], 0);
    design.addMove(7, 0, [0], 0);

    design.addPiece("C5", 8, 5);
    design.addMove(8, 0, [7], 0);
    design.addMove(8, 0, [6], 0);
    design.addMove(8, 0, [3], 0);
    design.addMove(8, 0, [5], 0);
    design.addMove(8, 0, [4], 0);
    design.addMove(8, 0, [2], 0);
    design.addMove(8, 0, [1], 0);
    design.addMove(8, 0, [0], 0);

    design.addPiece("C7", 9, 7);
    design.addMove(9, 0, [7], 0);
    design.addMove(9, 0, [6], 0);
    design.addMove(9, 0, [3], 0);
    design.addMove(9, 0, [5], 0);
    design.addMove(9, 0, [4], 0);
    design.addMove(9, 0, [2], 0);
    design.addMove(9, 0, [1], 0);
    design.addMove(9, 0, [0], 0);

    design.addPiece("C9", 10, 9);
    design.addMove(10, 0, [7], 0);
    design.addMove(10, 0, [6], 0);
    design.addMove(10, 0, [3], 0);
    design.addMove(10, 0, [5], 0);
    design.addMove(10, 0, [4], 0);
    design.addMove(10, 0, [2], 0);
    design.addMove(10, 0, [1], 0);
    design.addMove(10, 0, [0], 0);

    design.addPiece("C25", 11, 25);
    design.addMove(11, 0, [7], 0);
    design.addMove(11, 0, [6], 0);
    design.addMove(11, 0, [3], 0);
    design.addMove(11, 0, [5], 0);
    design.addMove(11, 0, [4], 0);
    design.addMove(11, 0, [2], 0);
    design.addMove(11, 0, [1], 0);
    design.addMove(11, 0, [0], 0);

    design.addPiece("C49", 12, 49);
    design.addMove(12, 0, [7], 0);
    design.addMove(12, 0, [6], 0);
    design.addMove(12, 0, [3], 0);
    design.addMove(12, 0, [5], 0);
    design.addMove(12, 0, [4], 0);
    design.addMove(12, 0, [2], 0);
    design.addMove(12, 0, [1], 0);
    design.addMove(12, 0, [0], 0);

    design.addPiece("C81", 13, 81);
    design.addMove(13, 0, [7], 0);
    design.addMove(13, 0, [6], 0);
    design.addMove(13, 0, [3], 0);
    design.addMove(13, 0, [5], 0);
    design.addMove(13, 0, [4], 0);
    design.addMove(13, 0, [2], 0);
    design.addMove(13, 0, [1], 0);
    design.addMove(13, 0, [0], 0);

    design.addPiece("T6", 14, 6);
    design.addMove(14, 0, [7], 0);
    design.addMove(14, 0, [6], 0);
    design.addMove(14, 0, [3], 0);
    design.addMove(14, 0, [5], 0);
    design.addMove(14, 0, [4], 0);
    design.addMove(14, 0, [2], 0);
    design.addMove(14, 0, [1], 0);
    design.addMove(14, 0, [0], 0);
    design.addMove(14, 1, [7, 7], 0);
    design.addMove(14, 1, [6, 6], 0);
    design.addMove(14, 1, [3, 3], 0);
    design.addMove(14, 1, [5, 5], 0);
    design.addMove(14, 1, [4, 4], 0);
    design.addMove(14, 1, [2, 2], 0);
    design.addMove(14, 1, [1, 1], 0);
    design.addMove(14, 1, [0, 0], 0);

    design.addPiece("T9", 15, 9);
    design.addMove(15, 0, [7], 0);
    design.addMove(15, 0, [6], 0);
    design.addMove(15, 0, [3], 0);
    design.addMove(15, 0, [5], 0);
    design.addMove(15, 0, [4], 0);
    design.addMove(15, 0, [2], 0);
    design.addMove(15, 0, [1], 0);
    design.addMove(15, 0, [0], 0);
    design.addMove(15, 1, [7, 7], 0);
    design.addMove(15, 1, [6, 6], 0);
    design.addMove(15, 1, [3, 3], 0);
    design.addMove(15, 1, [5, 5], 0);
    design.addMove(15, 1, [4, 4], 0);
    design.addMove(15, 1, [2, 2], 0);
    design.addMove(15, 1, [1, 1], 0);
    design.addMove(15, 1, [0, 0], 0);

    design.addPiece("T16", 16, 16);
    design.addMove(16, 0, [7], 0);
    design.addMove(16, 0, [6], 0);
    design.addMove(16, 0, [3], 0);
    design.addMove(16, 0, [5], 0);
    design.addMove(16, 0, [4], 0);
    design.addMove(16, 0, [2], 0);
    design.addMove(16, 0, [1], 0);
    design.addMove(16, 0, [0], 0);
    design.addMove(16, 1, [7, 7], 0);
    design.addMove(16, 1, [6, 6], 0);
    design.addMove(16, 1, [3, 3], 0);
    design.addMove(16, 1, [5, 5], 0);
    design.addMove(16, 1, [4, 4], 0);
    design.addMove(16, 1, [2, 2], 0);
    design.addMove(16, 1, [1, 1], 0);
    design.addMove(16, 1, [0, 0], 0);

    design.addPiece("T20", 17, 20);
    design.addMove(17, 0, [7], 0);
    design.addMove(17, 0, [6], 0);
    design.addMove(17, 0, [3], 0);
    design.addMove(17, 0, [5], 0);
    design.addMove(17, 0, [4], 0);
    design.addMove(17, 0, [2], 0);
    design.addMove(17, 0, [1], 0);
    design.addMove(17, 0, [0], 0);
    design.addMove(17, 1, [7, 7], 0);
    design.addMove(17, 1, [6, 6], 0);
    design.addMove(17, 1, [3, 3], 0);
    design.addMove(17, 1, [5, 5], 0);
    design.addMove(17, 1, [4, 4], 0);
    design.addMove(17, 1, [2, 2], 0);
    design.addMove(17, 1, [1, 1], 0);
    design.addMove(17, 1, [0, 0], 0);

    design.addPiece("T25", 18, 25);
    design.addMove(18, 0, [7], 0);
    design.addMove(18, 0, [6], 0);
    design.addMove(18, 0, [3], 0);
    design.addMove(18, 0, [5], 0);
    design.addMove(18, 0, [4], 0);
    design.addMove(18, 0, [2], 0);
    design.addMove(18, 0, [1], 0);
    design.addMove(18, 0, [0], 0);
    design.addMove(18, 1, [7, 7], 0);
    design.addMove(18, 1, [6, 6], 0);
    design.addMove(18, 1, [3, 3], 0);
    design.addMove(18, 1, [5, 5], 0);
    design.addMove(18, 1, [4, 4], 0);
    design.addMove(18, 1, [2, 2], 0);
    design.addMove(18, 1, [1, 1], 0);
    design.addMove(18, 1, [0, 0], 0);

    design.addPiece("T42", 19, 42);
    design.addMove(19, 0, [7], 0);
    design.addMove(19, 0, [6], 0);
    design.addMove(19, 0, [3], 0);
    design.addMove(19, 0, [5], 0);
    design.addMove(19, 0, [4], 0);
    design.addMove(19, 0, [2], 0);
    design.addMove(19, 0, [1], 0);
    design.addMove(19, 0, [0], 0);
    design.addMove(19, 1, [7, 7], 0);
    design.addMove(19, 1, [6, 6], 0);
    design.addMove(19, 1, [3, 3], 0);
    design.addMove(19, 1, [5, 5], 0);
    design.addMove(19, 1, [4, 4], 0);
    design.addMove(19, 1, [2, 2], 0);
    design.addMove(19, 1, [1, 1], 0);
    design.addMove(19, 1, [0, 0], 0);

    design.addPiece("T49", 20, 49);
    design.addMove(20, 0, [7], 0);
    design.addMove(20, 0, [6], 0);
    design.addMove(20, 0, [3], 0);
    design.addMove(20, 0, [5], 0);
    design.addMove(20, 0, [4], 0);
    design.addMove(20, 0, [2], 0);
    design.addMove(20, 0, [1], 0);
    design.addMove(20, 0, [0], 0);
    design.addMove(20, 1, [7, 7], 0);
    design.addMove(20, 1, [6, 6], 0);
    design.addMove(20, 1, [3, 3], 0);
    design.addMove(20, 1, [5, 5], 0);
    design.addMove(20, 1, [4, 4], 0);
    design.addMove(20, 1, [2, 2], 0);
    design.addMove(20, 1, [1, 1], 0);
    design.addMove(20, 1, [0, 0], 0);

    design.addPiece("T72", 21, 72);
    design.addMove(21, 0, [7], 0);
    design.addMove(21, 0, [6], 0);
    design.addMove(21, 0, [3], 0);
    design.addMove(21, 0, [5], 0);
    design.addMove(21, 0, [4], 0);
    design.addMove(21, 0, [2], 0);
    design.addMove(21, 0, [1], 0);
    design.addMove(21, 0, [0], 0);
    design.addMove(21, 1, [7, 7], 0);
    design.addMove(21, 1, [6, 6], 0);
    design.addMove(21, 1, [3, 3], 0);
    design.addMove(21, 1, [5, 5], 0);
    design.addMove(21, 1, [4, 4], 0);
    design.addMove(21, 1, [2, 2], 0);
    design.addMove(21, 1, [1, 1], 0);
    design.addMove(21, 1, [0, 0], 0);

    design.addPiece("T81", 22, 81);
    design.addMove(22, 0, [7], 0);
    design.addMove(22, 0, [6], 0);
    design.addMove(22, 0, [3], 0);
    design.addMove(22, 0, [5], 0);
    design.addMove(22, 0, [4], 0);
    design.addMove(22, 0, [2], 0);
    design.addMove(22, 0, [1], 0);
    design.addMove(22, 0, [0], 0);
    design.addMove(22, 1, [7, 7], 0);
    design.addMove(22, 1, [6, 6], 0);
    design.addMove(22, 1, [3, 3], 0);
    design.addMove(22, 1, [5, 5], 0);
    design.addMove(22, 1, [4, 4], 0);
    design.addMove(22, 1, [2, 2], 0);
    design.addMove(22, 1, [1, 1], 0);
    design.addMove(22, 1, [0, 0], 0);

    design.addPiece("T12", 23, 12);
    design.addMove(23, 0, [7], 0);
    design.addMove(23, 0, [6], 0);
    design.addMove(23, 0, [3], 0);
    design.addMove(23, 0, [5], 0);
    design.addMove(23, 0, [4], 0);
    design.addMove(23, 0, [2], 0);
    design.addMove(23, 0, [1], 0);
    design.addMove(23, 0, [0], 0);
    design.addMove(23, 1, [7, 7], 0);
    design.addMove(23, 1, [6, 6], 0);
    design.addMove(23, 1, [3, 3], 0);
    design.addMove(23, 1, [5, 5], 0);
    design.addMove(23, 1, [4, 4], 0);
    design.addMove(23, 1, [2, 2], 0);
    design.addMove(23, 1, [1, 1], 0);
    design.addMove(23, 1, [0, 0], 0);

    design.addPiece("T16", 24, 16);
    design.addMove(24, 0, [7], 0);
    design.addMove(24, 0, [6], 0);
    design.addMove(24, 0, [3], 0);
    design.addMove(24, 0, [5], 0);
    design.addMove(24, 0, [4], 0);
    design.addMove(24, 0, [2], 0);
    design.addMove(24, 0, [1], 0);
    design.addMove(24, 0, [0], 0);
    design.addMove(24, 1, [7, 7], 0);
    design.addMove(24, 1, [6, 6], 0);
    design.addMove(24, 1, [3, 3], 0);
    design.addMove(24, 1, [5, 5], 0);
    design.addMove(24, 1, [4, 4], 0);
    design.addMove(24, 1, [2, 2], 0);
    design.addMove(24, 1, [1, 1], 0);
    design.addMove(24, 1, [0, 0], 0);

    design.addPiece("T30", 25, 30);
    design.addMove(25, 0, [7], 0);
    design.addMove(25, 0, [6], 0);
    design.addMove(25, 0, [3], 0);
    design.addMove(25, 0, [5], 0);
    design.addMove(25, 0, [4], 0);
    design.addMove(25, 0, [2], 0);
    design.addMove(25, 0, [1], 0);
    design.addMove(25, 0, [0], 0);
    design.addMove(25, 1, [7, 7], 0);
    design.addMove(25, 1, [6, 6], 0);
    design.addMove(25, 1, [3, 3], 0);
    design.addMove(25, 1, [5, 5], 0);
    design.addMove(25, 1, [4, 4], 0);
    design.addMove(25, 1, [2, 2], 0);
    design.addMove(25, 1, [1, 1], 0);
    design.addMove(25, 1, [0, 0], 0);

    design.addPiece("T36", 26, 36);
    design.addMove(26, 0, [7], 0);
    design.addMove(26, 0, [6], 0);
    design.addMove(26, 0, [3], 0);
    design.addMove(26, 0, [5], 0);
    design.addMove(26, 0, [4], 0);
    design.addMove(26, 0, [2], 0);
    design.addMove(26, 0, [1], 0);
    design.addMove(26, 0, [0], 0);
    design.addMove(26, 1, [7, 7], 0);
    design.addMove(26, 1, [6, 6], 0);
    design.addMove(26, 1, [3, 3], 0);
    design.addMove(26, 1, [5, 5], 0);
    design.addMove(26, 1, [4, 4], 0);
    design.addMove(26, 1, [2, 2], 0);
    design.addMove(26, 1, [1, 1], 0);
    design.addMove(26, 1, [0, 0], 0);

    design.addPiece("T56", 27, 56);
    design.addMove(27, 0, [7], 0);
    design.addMove(27, 0, [6], 0);
    design.addMove(27, 0, [3], 0);
    design.addMove(27, 0, [5], 0);
    design.addMove(27, 0, [4], 0);
    design.addMove(27, 0, [2], 0);
    design.addMove(27, 0, [1], 0);
    design.addMove(27, 0, [0], 0);
    design.addMove(27, 1, [7, 7], 0);
    design.addMove(27, 1, [6, 6], 0);
    design.addMove(27, 1, [3, 3], 0);
    design.addMove(27, 1, [5, 5], 0);
    design.addMove(27, 1, [4, 4], 0);
    design.addMove(27, 1, [2, 2], 0);
    design.addMove(27, 1, [1, 1], 0);
    design.addMove(27, 1, [0, 0], 0);

    design.addPiece("T64", 28, 64);
    design.addMove(28, 0, [7], 0);
    design.addMove(28, 0, [6], 0);
    design.addMove(28, 0, [3], 0);
    design.addMove(28, 0, [5], 0);
    design.addMove(28, 0, [4], 0);
    design.addMove(28, 0, [2], 0);
    design.addMove(28, 0, [1], 0);
    design.addMove(28, 0, [0], 0);
    design.addMove(28, 1, [7, 7], 0);
    design.addMove(28, 1, [6, 6], 0);
    design.addMove(28, 1, [3, 3], 0);
    design.addMove(28, 1, [5, 5], 0);
    design.addMove(28, 1, [4, 4], 0);
    design.addMove(28, 1, [2, 2], 0);
    design.addMove(28, 1, [1, 1], 0);
    design.addMove(28, 1, [0, 0], 0);

    design.addPiece("T90", 29, 90);
    design.addMove(29, 0, [7], 0);
    design.addMove(29, 0, [6], 0);
    design.addMove(29, 0, [3], 0);
    design.addMove(29, 0, [5], 0);
    design.addMove(29, 0, [4], 0);
    design.addMove(29, 0, [2], 0);
    design.addMove(29, 0, [1], 0);
    design.addMove(29, 0, [0], 0);
    design.addMove(29, 1, [7, 7], 0);
    design.addMove(29, 1, [6, 6], 0);
    design.addMove(29, 1, [3, 3], 0);
    design.addMove(29, 1, [5, 5], 0);
    design.addMove(29, 1, [4, 4], 0);
    design.addMove(29, 1, [2, 2], 0);
    design.addMove(29, 1, [1, 1], 0);
    design.addMove(29, 1, [0, 0], 0);

    design.addPiece("T100", 30, 100);
    design.addMove(30, 0, [7], 0);
    design.addMove(30, 0, [6], 0);
    design.addMove(30, 0, [3], 0);
    design.addMove(30, 0, [5], 0);
    design.addMove(30, 0, [4], 0);
    design.addMove(30, 0, [2], 0);
    design.addMove(30, 0, [1], 0);
    design.addMove(30, 0, [0], 0);
    design.addMove(30, 1, [7, 7], 0);
    design.addMove(30, 1, [6, 6], 0);
    design.addMove(30, 1, [3, 3], 0);
    design.addMove(30, 1, [5, 5], 0);
    design.addMove(30, 1, [4, 4], 0);
    design.addMove(30, 1, [2, 2], 0);
    design.addMove(30, 1, [1, 1], 0);
    design.addMove(30, 1, [0, 0], 0);

    design.addPiece("S15", 31, 15);
    design.addMove(31, 0, [7], 0);
    design.addMove(31, 0, [6], 0);
    design.addMove(31, 0, [3], 0);
    design.addMove(31, 0, [5], 0);
    design.addMove(31, 0, [4], 0);
    design.addMove(31, 0, [2], 0);
    design.addMove(31, 0, [1], 0);
    design.addMove(31, 0, [0], 0);
    design.addMove(31, 1, [7, 7], 0);
    design.addMove(31, 1, [6, 6], 0);
    design.addMove(31, 1, [3, 3], 0);
    design.addMove(31, 1, [5, 5], 0);
    design.addMove(31, 1, [4, 4], 0);
    design.addMove(31, 1, [2, 2], 0);
    design.addMove(31, 1, [1, 1], 0);
    design.addMove(31, 1, [0, 0], 0);
    design.addMove(31, 2, [7, 7, 7], 0);
    design.addMove(31, 2, [6, 6, 6], 0);
    design.addMove(31, 2, [3, 3, 3], 0);
    design.addMove(31, 2, [5, 5, 5], 0);
    design.addMove(31, 2, [4, 4, 4], 0);
    design.addMove(31, 2, [2, 2, 2], 0);
    design.addMove(31, 2, [1, 1, 1], 0);
    design.addMove(31, 2, [0, 0, 0], 0);

    design.addPiece("S25", 32, 25);
    design.addMove(32, 0, [7], 0);
    design.addMove(32, 0, [6], 0);
    design.addMove(32, 0, [3], 0);
    design.addMove(32, 0, [5], 0);
    design.addMove(32, 0, [4], 0);
    design.addMove(32, 0, [2], 0);
    design.addMove(32, 0, [1], 0);
    design.addMove(32, 0, [0], 0);
    design.addMove(32, 1, [7, 7], 0);
    design.addMove(32, 1, [6, 6], 0);
    design.addMove(32, 1, [3, 3], 0);
    design.addMove(32, 1, [5, 5], 0);
    design.addMove(32, 1, [4, 4], 0);
    design.addMove(32, 1, [2, 2], 0);
    design.addMove(32, 1, [1, 1], 0);
    design.addMove(32, 1, [0, 0], 0);
    design.addMove(32, 2, [7, 7, 7], 0);
    design.addMove(32, 2, [6, 6, 6], 0);
    design.addMove(32, 2, [3, 3, 3], 0);
    design.addMove(32, 2, [5, 5, 5], 0);
    design.addMove(32, 2, [4, 4, 4], 0);
    design.addMove(32, 2, [2, 2, 2], 0);
    design.addMove(32, 2, [1, 1, 1], 0);
    design.addMove(32, 2, [0, 0, 0], 0);

    design.addPiece("S45", 33, 45);
    design.addMove(33, 0, [7], 0);
    design.addMove(33, 0, [6], 0);
    design.addMove(33, 0, [3], 0);
    design.addMove(33, 0, [5], 0);
    design.addMove(33, 0, [4], 0);
    design.addMove(33, 0, [2], 0);
    design.addMove(33, 0, [1], 0);
    design.addMove(33, 0, [0], 0);
    design.addMove(33, 1, [7, 7], 0);
    design.addMove(33, 1, [6, 6], 0);
    design.addMove(33, 1, [3, 3], 0);
    design.addMove(33, 1, [5, 5], 0);
    design.addMove(33, 1, [4, 4], 0);
    design.addMove(33, 1, [2, 2], 0);
    design.addMove(33, 1, [1, 1], 0);
    design.addMove(33, 1, [0, 0], 0);
    design.addMove(33, 2, [7, 7, 7], 0);
    design.addMove(33, 2, [6, 6, 6], 0);
    design.addMove(33, 2, [3, 3, 3], 0);
    design.addMove(33, 2, [5, 5, 5], 0);
    design.addMove(33, 2, [4, 4, 4], 0);
    design.addMove(33, 2, [2, 2, 2], 0);
    design.addMove(33, 2, [1, 1, 1], 0);
    design.addMove(33, 2, [0, 0, 0], 0);

    design.addPiece("S81", 34, 81);
    design.addMove(34, 0, [7], 0);
    design.addMove(34, 0, [6], 0);
    design.addMove(34, 0, [3], 0);
    design.addMove(34, 0, [5], 0);
    design.addMove(34, 0, [4], 0);
    design.addMove(34, 0, [2], 0);
    design.addMove(34, 0, [1], 0);
    design.addMove(34, 0, [0], 0);
    design.addMove(34, 1, [7, 7], 0);
    design.addMove(34, 1, [6, 6], 0);
    design.addMove(34, 1, [3, 3], 0);
    design.addMove(34, 1, [5, 5], 0);
    design.addMove(34, 1, [4, 4], 0);
    design.addMove(34, 1, [2, 2], 0);
    design.addMove(34, 1, [1, 1], 0);
    design.addMove(34, 1, [0, 0], 0);
    design.addMove(34, 2, [7, 7, 7], 0);
    design.addMove(34, 2, [6, 6, 6], 0);
    design.addMove(34, 2, [3, 3, 3], 0);
    design.addMove(34, 2, [5, 5, 5], 0);
    design.addMove(34, 2, [4, 4, 4], 0);
    design.addMove(34, 2, [2, 2, 2], 0);
    design.addMove(34, 2, [1, 1, 1], 0);
    design.addMove(34, 2, [0, 0, 0], 0);

    design.addPiece("S153", 35, 153);
    design.addMove(35, 0, [7], 0);
    design.addMove(35, 0, [6], 0);
    design.addMove(35, 0, [3], 0);
    design.addMove(35, 0, [5], 0);
    design.addMove(35, 0, [4], 0);
    design.addMove(35, 0, [2], 0);
    design.addMove(35, 0, [1], 0);
    design.addMove(35, 0, [0], 0);
    design.addMove(35, 1, [7, 7], 0);
    design.addMove(35, 1, [6, 6], 0);
    design.addMove(35, 1, [3, 3], 0);
    design.addMove(35, 1, [5, 5], 0);
    design.addMove(35, 1, [4, 4], 0);
    design.addMove(35, 1, [2, 2], 0);
    design.addMove(35, 1, [1, 1], 0);
    design.addMove(35, 1, [0, 0], 0);
    design.addMove(35, 2, [7, 7, 7], 0);
    design.addMove(35, 2, [6, 6, 6], 0);
    design.addMove(35, 2, [3, 3, 3], 0);
    design.addMove(35, 2, [5, 5, 5], 0);
    design.addMove(35, 2, [4, 4, 4], 0);
    design.addMove(35, 2, [2, 2, 2], 0);
    design.addMove(35, 2, [1, 1, 1], 0);
    design.addMove(35, 2, [0, 0, 0], 0);

    design.addPiece("S169", 36, 169);
    design.addMove(36, 0, [7], 0);
    design.addMove(36, 0, [6], 0);
    design.addMove(36, 0, [3], 0);
    design.addMove(36, 0, [5], 0);
    design.addMove(36, 0, [4], 0);
    design.addMove(36, 0, [2], 0);
    design.addMove(36, 0, [1], 0);
    design.addMove(36, 0, [0], 0);
    design.addMove(36, 1, [7, 7], 0);
    design.addMove(36, 1, [6, 6], 0);
    design.addMove(36, 1, [3, 3], 0);
    design.addMove(36, 1, [5, 5], 0);
    design.addMove(36, 1, [4, 4], 0);
    design.addMove(36, 1, [2, 2], 0);
    design.addMove(36, 1, [1, 1], 0);
    design.addMove(36, 1, [0, 0], 0);
    design.addMove(36, 2, [7, 7, 7], 0);
    design.addMove(36, 2, [6, 6, 6], 0);
    design.addMove(36, 2, [3, 3, 3], 0);
    design.addMove(36, 2, [5, 5, 5], 0);
    design.addMove(36, 2, [4, 4, 4], 0);
    design.addMove(36, 2, [2, 2, 2], 0);
    design.addMove(36, 2, [1, 1, 1], 0);
    design.addMove(36, 2, [0, 0, 0], 0);

    design.addPiece("S289", 37, 289);
    design.addMove(37, 0, [7], 0);
    design.addMove(37, 0, [6], 0);
    design.addMove(37, 0, [3], 0);
    design.addMove(37, 0, [5], 0);
    design.addMove(37, 0, [4], 0);
    design.addMove(37, 0, [2], 0);
    design.addMove(37, 0, [1], 0);
    design.addMove(37, 0, [0], 0);
    design.addMove(37, 1, [7, 7], 0);
    design.addMove(37, 1, [6, 6], 0);
    design.addMove(37, 1, [3, 3], 0);
    design.addMove(37, 1, [5, 5], 0);
    design.addMove(37, 1, [4, 4], 0);
    design.addMove(37, 1, [2, 2], 0);
    design.addMove(37, 1, [1, 1], 0);
    design.addMove(37, 1, [0, 0], 0);
    design.addMove(37, 2, [7, 7, 7], 0);
    design.addMove(37, 2, [6, 6, 6], 0);
    design.addMove(37, 2, [3, 3, 3], 0);
    design.addMove(37, 2, [5, 5, 5], 0);
    design.addMove(37, 2, [4, 4, 4], 0);
    design.addMove(37, 2, [2, 2, 2], 0);
    design.addMove(37, 2, [1, 1, 1], 0);
    design.addMove(37, 2, [0, 0, 0], 0);

    design.addPiece("S28", 38, 28);
    design.addMove(38, 0, [7], 0);
    design.addMove(38, 0, [6], 0);
    design.addMove(38, 0, [3], 0);
    design.addMove(38, 0, [5], 0);
    design.addMove(38, 0, [4], 0);
    design.addMove(38, 0, [2], 0);
    design.addMove(38, 0, [1], 0);
    design.addMove(38, 0, [0], 0);
    design.addMove(38, 1, [7, 7], 0);
    design.addMove(38, 1, [6, 6], 0);
    design.addMove(38, 1, [3, 3], 0);
    design.addMove(38, 1, [5, 5], 0);
    design.addMove(38, 1, [4, 4], 0);
    design.addMove(38, 1, [2, 2], 0);
    design.addMove(38, 1, [1, 1], 0);
    design.addMove(38, 1, [0, 0], 0);
    design.addMove(38, 2, [7, 7, 7], 0);
    design.addMove(38, 2, [6, 6, 6], 0);
    design.addMove(38, 2, [3, 3, 3], 0);
    design.addMove(38, 2, [5, 5, 5], 0);
    design.addMove(38, 2, [4, 4, 4], 0);
    design.addMove(38, 2, [2, 2, 2], 0);
    design.addMove(38, 2, [1, 1, 1], 0);
    design.addMove(38, 2, [0, 0, 0], 0);

    design.addPiece("S49", 39, 49);
    design.addMove(39, 0, [7], 0);
    design.addMove(39, 0, [6], 0);
    design.addMove(39, 0, [3], 0);
    design.addMove(39, 0, [5], 0);
    design.addMove(39, 0, [4], 0);
    design.addMove(39, 0, [2], 0);
    design.addMove(39, 0, [1], 0);
    design.addMove(39, 0, [0], 0);
    design.addMove(39, 1, [7, 7], 0);
    design.addMove(39, 1, [6, 6], 0);
    design.addMove(39, 1, [3, 3], 0);
    design.addMove(39, 1, [5, 5], 0);
    design.addMove(39, 1, [4, 4], 0);
    design.addMove(39, 1, [2, 2], 0);
    design.addMove(39, 1, [1, 1], 0);
    design.addMove(39, 1, [0, 0], 0);
    design.addMove(39, 2, [7, 7, 7], 0);
    design.addMove(39, 2, [6, 6, 6], 0);
    design.addMove(39, 2, [3, 3, 3], 0);
    design.addMove(39, 2, [5, 5, 5], 0);
    design.addMove(39, 2, [4, 4, 4], 0);
    design.addMove(39, 2, [2, 2, 2], 0);
    design.addMove(39, 2, [1, 1, 1], 0);
    design.addMove(39, 2, [0, 0, 0], 0);

    design.addPiece("S66", 40, 66);
    design.addMove(40, 0, [7], 0);
    design.addMove(40, 0, [6], 0);
    design.addMove(40, 0, [3], 0);
    design.addMove(40, 0, [5], 0);
    design.addMove(40, 0, [4], 0);
    design.addMove(40, 0, [2], 0);
    design.addMove(40, 0, [1], 0);
    design.addMove(40, 0, [0], 0);
    design.addMove(40, 1, [7, 7], 0);
    design.addMove(40, 1, [6, 6], 0);
    design.addMove(40, 1, [3, 3], 0);
    design.addMove(40, 1, [5, 5], 0);
    design.addMove(40, 1, [4, 4], 0);
    design.addMove(40, 1, [2, 2], 0);
    design.addMove(40, 1, [1, 1], 0);
    design.addMove(40, 1, [0, 0], 0);
    design.addMove(40, 2, [7, 7, 7], 0);
    design.addMove(40, 2, [6, 6, 6], 0);
    design.addMove(40, 2, [3, 3, 3], 0);
    design.addMove(40, 2, [5, 5, 5], 0);
    design.addMove(40, 2, [4, 4, 4], 0);
    design.addMove(40, 2, [2, 2, 2], 0);
    design.addMove(40, 2, [1, 1, 1], 0);
    design.addMove(40, 2, [0, 0, 0], 0);

    design.addPiece("S120", 41, 120);
    design.addMove(41, 0, [7], 0);
    design.addMove(41, 0, [6], 0);
    design.addMove(41, 0, [3], 0);
    design.addMove(41, 0, [5], 0);
    design.addMove(41, 0, [4], 0);
    design.addMove(41, 0, [2], 0);
    design.addMove(41, 0, [1], 0);
    design.addMove(41, 0, [0], 0);
    design.addMove(41, 1, [7, 7], 0);
    design.addMove(41, 1, [6, 6], 0);
    design.addMove(41, 1, [3, 3], 0);
    design.addMove(41, 1, [5, 5], 0);
    design.addMove(41, 1, [4, 4], 0);
    design.addMove(41, 1, [2, 2], 0);
    design.addMove(41, 1, [1, 1], 0);
    design.addMove(41, 1, [0, 0], 0);
    design.addMove(41, 2, [7, 7, 7], 0);
    design.addMove(41, 2, [6, 6, 6], 0);
    design.addMove(41, 2, [3, 3, 3], 0);
    design.addMove(41, 2, [5, 5, 5], 0);
    design.addMove(41, 2, [4, 4, 4], 0);
    design.addMove(41, 2, [2, 2, 2], 0);
    design.addMove(41, 2, [1, 1, 1], 0);
    design.addMove(41, 2, [0, 0, 0], 0);

    design.addPiece("S121", 42, 121);
    design.addMove(42, 0, [7], 0);
    design.addMove(42, 0, [6], 0);
    design.addMove(42, 0, [3], 0);
    design.addMove(42, 0, [5], 0);
    design.addMove(42, 0, [4], 0);
    design.addMove(42, 0, [2], 0);
    design.addMove(42, 0, [1], 0);
    design.addMove(42, 0, [0], 0);
    design.addMove(42, 1, [7, 7], 0);
    design.addMove(42, 1, [6, 6], 0);
    design.addMove(42, 1, [3, 3], 0);
    design.addMove(42, 1, [5, 5], 0);
    design.addMove(42, 1, [4, 4], 0);
    design.addMove(42, 1, [2, 2], 0);
    design.addMove(42, 1, [1, 1], 0);
    design.addMove(42, 1, [0, 0], 0);
    design.addMove(42, 2, [7, 7, 7], 0);
    design.addMove(42, 2, [6, 6, 6], 0);
    design.addMove(42, 2, [3, 3, 3], 0);
    design.addMove(42, 2, [5, 5, 5], 0);
    design.addMove(42, 2, [4, 4, 4], 0);
    design.addMove(42, 2, [2, 2, 2], 0);
    design.addMove(42, 2, [1, 1, 1], 0);
    design.addMove(42, 2, [0, 0, 0], 0);

    design.addPiece("S225", 43, 225);
    design.addMove(43, 0, [7], 0);
    design.addMove(43, 0, [6], 0);
    design.addMove(43, 0, [3], 0);
    design.addMove(43, 0, [5], 0);
    design.addMove(43, 0, [4], 0);
    design.addMove(43, 0, [2], 0);
    design.addMove(43, 0, [1], 0);
    design.addMove(43, 0, [0], 0);
    design.addMove(43, 1, [7, 7], 0);
    design.addMove(43, 1, [6, 6], 0);
    design.addMove(43, 1, [3, 3], 0);
    design.addMove(43, 1, [5, 5], 0);
    design.addMove(43, 1, [4, 4], 0);
    design.addMove(43, 1, [2, 2], 0);
    design.addMove(43, 1, [1, 1], 0);
    design.addMove(43, 1, [0, 0], 0);
    design.addMove(43, 2, [7, 7, 7], 0);
    design.addMove(43, 2, [6, 6, 6], 0);
    design.addMove(43, 2, [3, 3, 3], 0);
    design.addMove(43, 2, [5, 5, 5], 0);
    design.addMove(43, 2, [4, 4, 4], 0);
    design.addMove(43, 2, [2, 2, 2], 0);
    design.addMove(43, 2, [1, 1, 1], 0);
    design.addMove(43, 2, [0, 0, 0], 0);

    design.addPiece("S361", 44, 361);
    design.addMove(44, 0, [7], 0);
    design.addMove(44, 0, [6], 0);
    design.addMove(44, 0, [3], 0);
    design.addMove(44, 0, [5], 0);
    design.addMove(44, 0, [4], 0);
    design.addMove(44, 0, [2], 0);
    design.addMove(44, 0, [1], 0);
    design.addMove(44, 0, [0], 0);
    design.addMove(44, 1, [7, 7], 0);
    design.addMove(44, 1, [6, 6], 0);
    design.addMove(44, 1, [3, 3], 0);
    design.addMove(44, 1, [5, 5], 0);
    design.addMove(44, 1, [4, 4], 0);
    design.addMove(44, 1, [2, 2], 0);
    design.addMove(44, 1, [1, 1], 0);
    design.addMove(44, 1, [0, 0], 0);
    design.addMove(44, 2, [7, 7, 7], 0);
    design.addMove(44, 2, [6, 6, 6], 0);
    design.addMove(44, 2, [3, 3, 3], 0);
    design.addMove(44, 2, [5, 5, 5], 0);
    design.addMove(44, 2, [4, 4, 4], 0);
    design.addMove(44, 2, [2, 2, 2], 0);
    design.addMove(44, 2, [1, 1, 1], 0);
    design.addMove(44, 2, [0, 0, 0], 0);

    design.addPiece("P91", 45, 91);

    design.addPiece("P190", 46, 190);

    design.setup("White", "C2", 42);
    design.setup("White", "C4", 50);
    design.setup("White", "C4", 43);
    design.setup("White", "C6", 44);
    design.setup("White", "C8", 45);
    design.setup("White", "C16", 51);
    design.setup("White", "C36", 52);
    design.setup("White", "C64", 53);
    design.setup("White", "T6", 58);
    design.setup("White", "T9", 48);
    design.setup("White", "T20", 59);
    design.setup("White", "T25", 49);
    design.setup("White", "T42", 60);
    design.setup("White", "T49", 54);
    design.setup("White", "T72", 61);
    design.setup("White", "T81", 55);
    design.setup("White", "S15", 56);
    design.setup("White", "S25", 64);
    design.setup("White", "S45", 57);
    design.setup("White", "S81", 65);
    design.setup("White", "S153", 63);
    design.setup("White", "S169", 70);
    design.setup("White", "S289", 71);
    design.setup("White", "P91", 62);
    design.setup("Black", "C3", 29);
    design.setup("Black", "C5", 28);
    design.setup("Black", "C7", 27);
    design.setup("Black", "C9", 26);
    design.setup("Black", "C9", 21);
    design.setup("Black", "C25", 20);
    design.setup("Black", "C49", 19);
    design.setup("Black", "C81", 18);
    design.setup("Black", "T12", 21);
    design.setup("Black", "T16", 15);
    design.setup("Black", "T30", 20);
    design.setup("Black", "T36", 14);
    design.setup("Black", "T56", 19);
    design.setup("Black", "T64", 9);
    design.setup("Black", "T90", 18);
    design.setup("Black", "T100", 8);
    design.setup("Black", "S28", 15);
    design.setup("Black", "S49", 7);
    design.setup("Black", "S66", 14);
    design.setup("Black", "S120", 9);
    design.setup("Black", "S121", 6);
    design.setup("Black", "S225", 1);
    design.setup("Black", "S361", 0);
    design.setup("Black", "P190", 8);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteC2", "White C2");
    view.defPiece("BlackC2", "Black C2");
    view.defPiece("WhiteC4", "White C4");
    view.defPiece("BlackC4", "Black C4");
    view.defPiece("WhiteC6", "White C6");
    view.defPiece("BlackC6", "Black C6");
    view.defPiece("WhiteC8", "White C8");
    view.defPiece("BlackC8", "Black C8");
    view.defPiece("WhiteC16", "White C16");
    view.defPiece("BlackC16", "Black C16");
    view.defPiece("WhiteC36", "White C36");
    view.defPiece("BlackC36", "Black C36");
    view.defPiece("WhiteC64", "White C64");
    view.defPiece("BlackC64", "Black C64");
    view.defPiece("WhiteC3", "White C3");
    view.defPiece("BlackC3", "Black C3");
    view.defPiece("WhiteC5", "White C5");
    view.defPiece("BlackC5", "Black C5");
    view.defPiece("WhiteC7", "White C7");
    view.defPiece("BlackC7", "Black C7");
    view.defPiece("WhiteC9", "White C9");
    view.defPiece("BlackC9", "Black C9");
    view.defPiece("WhiteC25", "White C25");
    view.defPiece("BlackC25", "Black C25");
    view.defPiece("WhiteC49", "White C49");
    view.defPiece("BlackC49", "Black C49");
    view.defPiece("WhiteC81", "White C81");
    view.defPiece("BlackC81", "Black C81");
    view.defPiece("WhiteT6", "White T6");
    view.defPiece("BlackT6", "Black T6");
    view.defPiece("WhiteT9", "White T9");
    view.defPiece("BlackT9", "Black T9");
    view.defPiece("WhiteT16", "White T16");
    view.defPiece("BlackT16", "Black T16");
    view.defPiece("WhiteT20", "White T20");
    view.defPiece("BlackT20", "Black T20");
    view.defPiece("WhiteT25", "White T25");
    view.defPiece("BlackT25", "Black T25");
    view.defPiece("WhiteT42", "White T42");
    view.defPiece("BlackT42", "Black T42");
    view.defPiece("WhiteT49", "White T49");
    view.defPiece("BlackT49", "Black T49");
    view.defPiece("WhiteT72", "White T72");
    view.defPiece("BlackT72", "Black T72");
    view.defPiece("WhiteT81", "White T81");
    view.defPiece("BlackT81", "Black T81");
    view.defPiece("WhiteT12", "White T12");
    view.defPiece("BlackT12", "Black T12");
    view.defPiece("WhiteT16", "White T16");
    view.defPiece("BlackT16", "Black T16");
    view.defPiece("WhiteT30", "White T30");
    view.defPiece("BlackT30", "Black T30");
    view.defPiece("WhiteT36", "White T36");
    view.defPiece("BlackT36", "Black T36");
    view.defPiece("WhiteT56", "White T56");
    view.defPiece("BlackT56", "Black T56");
    view.defPiece("WhiteT64", "White T64");
    view.defPiece("BlackT64", "Black T64");
    view.defPiece("WhiteT90", "White T90");
    view.defPiece("BlackT90", "Black T90");
    view.defPiece("WhiteT100", "White T100");
    view.defPiece("BlackT100", "Black T100");
    view.defPiece("WhiteS15", "White S15");
    view.defPiece("BlackS15", "Black S15");
    view.defPiece("WhiteS25", "White S25");
    view.defPiece("BlackS25", "Black S25");
    view.defPiece("WhiteS45", "White S45");
    view.defPiece("BlackS45", "Black S45");
    view.defPiece("WhiteS81", "White S81");
    view.defPiece("BlackS81", "Black S81");
    view.defPiece("WhiteS153", "White S153");
    view.defPiece("BlackS153", "Black S153");
    view.defPiece("WhiteS169", "White S169");
    view.defPiece("BlackS169", "Black S169");
    view.defPiece("WhiteS289", "White S289");
    view.defPiece("BlackS289", "Black S289");
    view.defPiece("WhiteS28", "White S28");
    view.defPiece("BlackS28", "Black S28");
    view.defPiece("WhiteS49", "White S49");
    view.defPiece("BlackS49", "Black S49");
    view.defPiece("WhiteS66", "White S66");
    view.defPiece("BlackS66", "Black S66");
    view.defPiece("WhiteS120", "White S120");
    view.defPiece("BlackS120", "Black S120");
    view.defPiece("WhiteS121", "White S121");
    view.defPiece("BlackS121", "Black S121");
    view.defPiece("WhiteS225", "White S225");
    view.defPiece("BlackS225", "Black S225");
    view.defPiece("WhiteS361", "White S361");
    view.defPiece("BlackS361", "Black S361");
    view.defPiece("WhiteP91", "White P91");
    view.defPiece("BlackP91", "Black P91");
    view.defPiece("WhiteP190", "White P190");
    view.defPiece("BlackP190", "Black P190");
 
    view.defPosition("a9", 4, 4, 32, 32);
    view.defPosition("b9", 39, 4, 32, 32);
    view.defPosition("c9", 74, 4, 32, 32);
    view.defPosition("d9", 109, 4, 32, 32);
    view.defPosition("e9", 144, 4, 32, 32);
    view.defPosition("f9", 179, 4, 32, 32);
    view.defPosition("g9", 214, 4, 32, 32);
    view.defPosition("h9", 249, 4, 32, 32);
    view.defPosition("a8", 4, 39, 32, 32);
    view.defPosition("b8", 39, 39, 32, 32);
    view.defPosition("c8", 74, 39, 32, 32);
    view.defPosition("d8", 109, 39, 32, 32);
    view.defPosition("e8", 144, 39, 32, 32);
    view.defPosition("f8", 179, 39, 32, 32);
    view.defPosition("g8", 214, 39, 32, 32);
    view.defPosition("h8", 249, 39, 32, 32);
    view.defPosition("a7", 4, 74, 32, 32);
    view.defPosition("b7", 39, 74, 32, 32);
    view.defPosition("c7", 74, 74, 32, 32);
    view.defPosition("d7", 109, 74, 32, 32);
    view.defPosition("e7", 144, 74, 32, 32);
    view.defPosition("f7", 179, 74, 32, 32);
    view.defPosition("g7", 214, 74, 32, 32);
    view.defPosition("h7", 249, 74, 32, 32);
    view.defPosition("a6", 4, 109, 32, 32);
    view.defPosition("b6", 39, 109, 32, 32);
    view.defPosition("c6", 74, 109, 32, 32);
    view.defPosition("d6", 109, 109, 32, 32);
    view.defPosition("e6", 144, 109, 32, 32);
    view.defPosition("f6", 179, 109, 32, 32);
    view.defPosition("g6", 214, 109, 32, 32);
    view.defPosition("h6", 249, 109, 32, 32);
    view.defPosition("a5", 4, 144, 32, 32);
    view.defPosition("b5", 39, 144, 32, 32);
    view.defPosition("c5", 74, 144, 32, 32);
    view.defPosition("d5", 109, 144, 32, 32);
    view.defPosition("e5", 144, 144, 32, 32);
    view.defPosition("f5", 179, 144, 32, 32);
    view.defPosition("g5", 214, 144, 32, 32);
    view.defPosition("h5", 249, 144, 32, 32);
    view.defPosition("a4", 4, 179, 32, 32);
    view.defPosition("b4", 39, 179, 32, 32);
    view.defPosition("c4", 74, 179, 32, 32);
    view.defPosition("d4", 109, 179, 32, 32);
    view.defPosition("e4", 144, 179, 32, 32);
    view.defPosition("f4", 179, 179, 32, 32);
    view.defPosition("g4", 214, 179, 32, 32);
    view.defPosition("h4", 249, 179, 32, 32);
    view.defPosition("a3", 4, 214, 32, 32);
    view.defPosition("b3", 39, 214, 32, 32);
    view.defPosition("c3", 74, 214, 32, 32);
    view.defPosition("d3", 109, 214, 32, 32);
    view.defPosition("e3", 144, 214, 32, 32);
    view.defPosition("f3", 179, 214, 32, 32);
    view.defPosition("g3", 214, 214, 32, 32);
    view.defPosition("h3", 249, 214, 32, 32);
    view.defPosition("a2", 4, 249, 32, 32);
    view.defPosition("b2", 39, 249, 32, 32);
    view.defPosition("c2", 74, 249, 32, 32);
    view.defPosition("d2", 109, 249, 32, 32);
    view.defPosition("e2", 144, 249, 32, 32);
    view.defPosition("f2", 179, 249, 32, 32);
    view.defPosition("g2", 214, 249, 32, 32);
    view.defPosition("h2", 249, 249, 32, 32);
    view.defPosition("a1", 4, 284, 32, 32);
    view.defPosition("b1", 39, 284, 32, 32);
    view.defPosition("c1", 74, 284, 32, 32);
    view.defPosition("d1", 109, 284, 32, 32);
    view.defPosition("e1", 144, 284, 32, 32);
    view.defPosition("f1", 179, 284, 32, 32);
    view.defPosition("g1", 214, 284, 32, 32);
    view.defPosition("h1", 249, 284, 32, 32);
}
