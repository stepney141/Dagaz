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

    design.addPlayer("Blue", [6, 7, 5, 4, 3, 2, 0, 1]);
    design.addPlayer("Green", [0, 1, 2, 3, 4, 5, 6, 7]);

    design.addPosition("a8", [9, 8, 0, 1, 0, 0, 0, 0]);
    design.addPosition("b8", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("c8", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("d8", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("e8", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("f8", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("g8", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("h8", [0, 8, 7, 0, -1, 0, 0, 0]);
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

    design.addZone("last-rank", 1, [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addZone("last-rank", 2, [56, 57, 58, 59, 60, 61, 62, 63]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	7);
    design.addCommand(2, ZRF.FORK,	3);
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end
    design.addCommand(2, ZRF.PARAM,	1);	// $2
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.JUMP,	-8);
    design.addCommand(2, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.IF,	9);
    design.addCommand(3, ZRF.FORK,	3);
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end
    design.addCommand(3, ZRF.PARAM,	2);	// $3
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	3);	// $4
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.JUMP,	-10);
    design.addCommand(3, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addPiece("King", 0, 100000);
    design.addMove(0, 0, [7], 0);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [4], 0);
    design.addMove(0, 0, [1], 0);
    design.addMove(0, 0, [6], 1);
    design.addMove(0, 0, [5], 1);
    design.addMove(0, 0, [2], 1);
    design.addMove(0, 0, [0], 1);
    design.addMove(0, 1, [7, 7], 2);
    design.addMove(0, 1, [3, 3], 2);
    design.addMove(0, 1, [4, 4], 2);
    design.addMove(0, 1, [1, 1], 2);
    design.addMove(0, 1, [6, 6], 3);
    design.addMove(0, 1, [5, 5], 3);
    design.addMove(0, 1, [2, 2], 3);
    design.addMove(0, 1, [0, 0], 3);
    design.addMove(0, 1, [7, 6], 4);
    design.addMove(0, 1, [7, 5], 4);
    design.addMove(0, 1, [1, 2], 4);
    design.addMove(0, 1, [1, 0], 4);
    design.addMove(0, 1, [4, 6], 4);
    design.addMove(0, 1, [4, 2], 4);
    design.addMove(0, 1, [3, 5], 4);
    design.addMove(0, 1, [3, 0], 4);
    design.addMove(0, 2, [6, 6], 5);
    design.addMove(0, 2, [5, 5], 5);
    design.addMove(0, 2, [2, 2], 5);
    design.addMove(0, 2, [0, 0], 5);
    design.addMove(0, 3, [7, 7, 7, 7], 6);
    design.addMove(0, 3, [3, 3, 3, 3], 6);
    design.addMove(0, 3, [4, 4, 4, 4], 6);
    design.addMove(0, 3, [1, 1, 1, 1], 6);
    design.addMove(0, 3, [6, 6, 6, 6], 7);
    design.addMove(0, 3, [5, 5, 5, 5], 7);
    design.addMove(0, 3, [2, 2, 2, 2], 7);
    design.addMove(0, 3, [0, 0, 0, 0], 7);
    design.addMove(0, 3, [7, 6, 7, 6], 8);
    design.addMove(0, 3, [7, 5, 7, 5], 8);
    design.addMove(0, 3, [1, 2, 1, 2], 8);
    design.addMove(0, 3, [1, 0, 1, 0], 8);
    design.addMove(0, 3, [4, 6, 4, 6], 8);
    design.addMove(0, 3, [4, 2, 4, 2], 8);
    design.addMove(0, 3, [3, 5, 3, 5], 8);
    design.addMove(0, 3, [3, 0, 3, 0], 8);

    design.addPiece("Man", 1, 100);
    design.addMove(1, 0, [6], 1);
    design.addMove(1, 0, [5], 1);
    design.addMove(1, 0, [2], 1);
    design.addMove(1, 0, [0], 1);
    design.addMove(1, 1, [7, 7], 2);
    design.addMove(1, 1, [3, 3], 2);
    design.addMove(1, 1, [4, 4], 2);
    design.addMove(1, 1, [1, 1], 2);
    design.addMove(1, 1, [6, 6], 3);
    design.addMove(1, 1, [5, 5], 3);
    design.addMove(1, 1, [2, 2], 3);
    design.addMove(1, 1, [0, 0], 3);
    design.addMove(1, 1, [7, 6], 4);
    design.addMove(1, 1, [7, 5], 4);
    design.addMove(1, 1, [1, 2], 4);
    design.addMove(1, 1, [1, 0], 4);
    design.addMove(1, 1, [4, 6], 4);
    design.addMove(1, 1, [4, 2], 4);
    design.addMove(1, 1, [3, 5], 4);
    design.addMove(1, 1, [3, 0], 4);
    design.addMove(1, 2, [6, 6], 5);
    design.addMove(1, 2, [5, 5], 5);
    design.addMove(1, 2, [2, 2], 5);
    design.addMove(1, 2, [0, 0], 5);
    design.addMove(1, 3, [7, 7, 7, 7], 6);
    design.addMove(1, 3, [3, 3, 3, 3], 6);
    design.addMove(1, 3, [4, 4, 4, 4], 6);
    design.addMove(1, 3, [1, 1, 1, 1], 6);
    design.addMove(1, 3, [6, 6, 6, 6], 7);
    design.addMove(1, 3, [5, 5, 5, 5], 7);
    design.addMove(1, 3, [2, 2, 2, 2], 7);
    design.addMove(1, 3, [0, 0, 0, 0], 7);
    design.addMove(1, 3, [7, 6, 7, 6], 8);
    design.addMove(1, 3, [7, 5, 7, 5], 8);
    design.addMove(1, 3, [1, 2, 1, 2], 8);
    design.addMove(1, 3, [1, 0, 1, 0], 8);
    design.addMove(1, 3, [4, 6, 4, 6], 8);
    design.addMove(1, 3, [4, 2, 4, 2], 8);
    design.addMove(1, 3, [3, 5, 3, 5], 8);
    design.addMove(1, 3, [3, 0, 3, 0], 8);

    design.setup("Blue", "Man", 56);
    design.setup("Blue", "Man", 57);
    design.setup("Blue", "Man", 58);
    design.setup("Blue", "Man", 59);
    design.setup("Blue", "Man", 61);
    design.setup("Blue", "Man", 62);
    design.setup("Blue", "Man", 63);
    design.setup("Blue", "Man", 48);
    design.setup("Blue", "Man", 49);
    design.setup("Blue", "Man", 50);
    design.setup("Blue", "Man", 51);
    design.setup("Blue", "Man", 52);
    design.setup("Blue", "Man", 53);
    design.setup("Blue", "Man", 54);
    design.setup("Blue", "Man", 55);
    design.setup("Blue", "King", 60);
    design.setup("Green", "Man", 0);
    design.setup("Green", "Man", 1);
    design.setup("Green", "Man", 2);
    design.setup("Green", "Man", 3);
    design.setup("Green", "Man", 5);
    design.setup("Green", "Man", 6);
    design.setup("Green", "Man", 7);
    design.setup("Green", "Man", 8);
    design.setup("Green", "Man", 9);
    design.setup("Green", "Man", 10);
    design.setup("Green", "Man", 11);
    design.setup("Green", "Man", 12);
    design.setup("Green", "Man", 13);
    design.setup("Green", "Man", 14);
    design.setup("Green", "Man", 15);
    design.setup("Green", "King", 4);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("BlueKing", "Blue King");
    view.defPiece("GreenKing", "Green King");
    view.defPiece("BlueMan", "Blue Man");
    view.defPiece("GreenMan", "Green Man");
    view.defPiece("L0", "L0");
    view.defPiece("L1", "L1");
    view.defPiece("L2", "L2");
    view.defPiece("L3", "L3");
    view.defPiece("R0", "R0");
    view.defPiece("R1", "R1");
    view.defPiece("R2", "R2");
    view.defPiece("R3", "R3");
 
    view.defPosition("a8", 2, 2, 80, 80);
    view.defPosition("b8", 82, 2, 80, 80);
    view.defPosition("c8", 162, 2, 80, 80);
    view.defPosition("d8", 242, 2, 80, 80);
    view.defPosition("e8", 322, 2, 80, 80);
    view.defPosition("f8", 402, 2, 80, 80);
    view.defPosition("g8", 482, 2, 80, 80);
    view.defPosition("h8", 562, 2, 80, 80);
    view.defPosition("a7", 2, 82, 80, 80);
    view.defPosition("b7", 82, 82, 80, 80);
    view.defPosition("c7", 162, 82, 80, 80);
    view.defPosition("d7", 242, 82, 80, 80);
    view.defPosition("e7", 322, 82, 80, 80);
    view.defPosition("f7", 402, 82, 80, 80);
    view.defPosition("g7", 482, 82, 80, 80);
    view.defPosition("h7", 562, 82, 80, 80);
    view.defPosition("a6", 2, 162, 80, 80);
    view.defPosition("b6", 82, 162, 80, 80);
    view.defPosition("c6", 162, 162, 80, 80);
    view.defPosition("d6", 242, 162, 80, 80);
    view.defPosition("e6", 322, 162, 80, 80);
    view.defPosition("f6", 402, 162, 80, 80);
    view.defPosition("g6", 482, 162, 80, 80);
    view.defPosition("h6", 562, 162, 80, 80);
    view.defPosition("a5", 2, 242, 80, 80);
    view.defPosition("b5", 82, 242, 80, 80);
    view.defPosition("c5", 162, 242, 80, 80);
    view.defPosition("d5", 242, 242, 80, 80);
    view.defPosition("e5", 322, 242, 80, 80);
    view.defPosition("f5", 402, 242, 80, 80);
    view.defPosition("g5", 482, 242, 80, 80);
    view.defPosition("h5", 562, 242, 80, 80);
    view.defPosition("a4", 2, 322, 80, 80);
    view.defPosition("b4", 82, 322, 80, 80);
    view.defPosition("c4", 162, 322, 80, 80);
    view.defPosition("d4", 242, 322, 80, 80);
    view.defPosition("e4", 322, 322, 80, 80);
    view.defPosition("f4", 402, 322, 80, 80);
    view.defPosition("g4", 482, 322, 80, 80);
    view.defPosition("h4", 562, 322, 80, 80);
    view.defPosition("a3", 2, 402, 80, 80);
    view.defPosition("b3", 82, 402, 80, 80);
    view.defPosition("c3", 162, 402, 80, 80);
    view.defPosition("d3", 242, 402, 80, 80);
    view.defPosition("e3", 322, 402, 80, 80);
    view.defPosition("f3", 402, 402, 80, 80);
    view.defPosition("g3", 482, 402, 80, 80);
    view.defPosition("h3", 562, 402, 80, 80);
    view.defPosition("a2", 2, 482, 80, 80);
    view.defPosition("b2", 82, 482, 80, 80);
    view.defPosition("c2", 162, 482, 80, 80);
    view.defPosition("d2", 242, 482, 80, 80);
    view.defPosition("e2", 322, 482, 80, 80);
    view.defPosition("f2", 402, 482, 80, 80);
    view.defPosition("g2", 482, 482, 80, 80);
    view.defPosition("h2", 562, 482, 80, 80);
    view.defPosition("a1", 2, 562, 80, 80);
    view.defPosition("b1", 82, 562, 80, 80);
    view.defPosition("c1", 162, 562, 80, 80);
    view.defPosition("d1", 242, 562, 80, 80);
    view.defPosition("e1", 322, 562, 80, 80);
    view.defPosition("f1", 402, 562, 80, 80);
    view.defPosition("g1", 482, 562, 80, 80);
    view.defPosition("h1", 562, 562, 80, 80);
}
