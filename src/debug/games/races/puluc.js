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
    design.checkVersion("smart-moves", "from");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-drops", "true");
    design.checkVersion("advisor-wait", "5");

    design.addDirection("up");         // 0
    design.addDirection("down");       // 1
    design.addDirection("next");       // 2
    design.addDirection("next-black"); // 3

    design.addPlayer("White", [1, 0, 2, 3]);
    design.addPlayer("Black", [0, 1, 3, 2]);
    design.addRandom(1, [0]);
    design.addRandom(1, [0]);
    design.addRandom(1, [0]);
    design.addRandom(1, [0]);
    design.addTurn(1, [1, 2, 3, 4, 5]);
    design.addRandom(2, [0]);
    design.addRandom(2, [0]);
    design.addRandom(2, [0]);
    design.addRandom(2, [0]);
    design.addTurn(2, [1, 2, 3, 4, 5]);

    design.addPosition("x1", [0, 0, 0, 0]);
    design.addPosition("x2", [0, 0, 0, 0]);
    design.addPosition("x3", [0, 0, 0, 0]);
    design.addPosition("x4", [0, 0, 0, 0]);
    design.addPosition("a11", [1, 0, 0, 10]);
    design.addPosition("b11", [1, -1, 0, 9]);
    design.addPosition("c11", [1, -1, 0, 8]);
    design.addPosition("d11", [1, -1, 0, 7]);
    design.addPosition("e11", [0, -1, 0, 6]);
    design.addPosition("a1", [1, 0, 13, 0]);
    design.addPosition("b1", [1, -1, 12, 0]);
    design.addPosition("c1", [1, -1, 11, 0]);
    design.addPosition("d1", [1, -1, 10, 0]);
    design.addPosition("e1", [0, -1, 9, 0]);
    design.addPosition("a10", [9, 0, -5, 1]);
    design.addPosition("a9", [9, 0, -1, 1]);
    design.addPosition("a8", [9, 0, -1, 1]);
    design.addPosition("a7", [9, 0, -1, 1]);
    design.addPosition("a6", [9, 0, -1, 1]);
    design.addPosition("a5", [9, 0, -1, 1]);
    design.addPosition("a4", [9, 0, -1, 1]);
    design.addPosition("a3", [9, 0, -1, 1]);
    design.addPosition("a2", [9, 0, -1, -18]);
    design.addPosition("b10", [9, -9, -14, -8]);
    design.addPosition("b9", [9, -9, -10, -8]);
    design.addPosition("b8", [9, -9, -10, -8]);
    design.addPosition("b7", [9, -9, -10, -8]);
    design.addPosition("b6", [9, -9, -10, -8]);
    design.addPosition("b5", [9, -9, -10, -8]);
    design.addPosition("b4", [9, -9, -10, -8]);
    design.addPosition("b3", [9, -9, -10, -8]);
    design.addPosition("b2", [9, -9, -10, -27]);
    design.addPosition("c10", [9, -9, -23, -17]);
    design.addPosition("c9", [9, -9, -19, -17]);
    design.addPosition("c8", [9, -9, -19, -17]);
    design.addPosition("c7", [9, -9, -19, -17]);
    design.addPosition("c6", [9, -9, -19, -17]);
    design.addPosition("c5", [9, -9, -19, -17]);
    design.addPosition("c4", [9, -9, -19, -17]);
    design.addPosition("c3", [9, -9, -19, -17]);
    design.addPosition("c2", [9, -9, -19, -36]);
    design.addPosition("d10", [9, -9, -32, -26]);
    design.addPosition("d9", [9, -9, -28, -26]);
    design.addPosition("d8", [9, -9, -28, -26]);
    design.addPosition("d7", [9, -9, -28, -26]);
    design.addPosition("d6", [9, -9, -28, -26]);
    design.addPosition("d5", [9, -9, -28, -26]);
    design.addPosition("d4", [9, -9, -28, -26]);
    design.addPosition("d3", [9, -9, -28, -26]);
    design.addPosition("d2", [9, -9, -28, -45]);
    design.addPosition("e10", [9, -9, -41, -35]);
    design.addPosition("e9", [9, -9, -37, -35]);
    design.addPosition("e8", [9, -9, -37, -35]);
    design.addPosition("e7", [9, -9, -37, -35]);
    design.addPosition("e6", [9, -9, -37, -35]);
    design.addPosition("e5", [9, -9, -37, -35]);
    design.addPosition("e4", [9, -9, -37, -35]);
    design.addPosition("e3", [9, -9, -37, -35]);
    design.addPosition("e2", [9, -9, -37, -54]);
    design.addPosition("f10", [9, -9, -50, -44]);
    design.addPosition("f9", [9, -9, -46, -44]);
    design.addPosition("f8", [9, -9, -46, -44]);
    design.addPosition("f7", [9, -9, -46, -44]);
    design.addPosition("f6", [9, -9, -46, -44]);
    design.addPosition("f5", [9, -9, -46, -44]);
    design.addPosition("f4", [9, -9, -46, -44]);
    design.addPosition("f3", [9, -9, -46, -44]);
    design.addPosition("f2", [9, -9, -46, -63]);
    design.addPosition("g10", [0, -9, -59, -53]);
    design.addPosition("g9", [0, -9, -55, -53]);
    design.addPosition("g8", [0, -9, -55, -53]);
    design.addPosition("g7", [0, -9, -55, -53]);
    design.addPosition("g6", [0, -9, -55, -53]);
    design.addPosition("g5", [0, -9, -55, -53]);
    design.addPosition("g4", [0, -9, -55, -53]);
    design.addPosition("g3", [0, -9, -55, -53]);
    design.addPosition("g2", [0, -9, -55, -72]);

    design.addZone("dice", 1, [0, 1, 2, 3]);
    design.addZone("dice", 2, [0, 1, 2, 3]);
    design.addZone("home", 1, [9, 10, 11, 12, 13]);
    design.addZone("home", 2, [4, 5, 6, 7, 8]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.IF,	4);
    design.addCommand(0, ZRF.PARAM,	1);	// $2
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.JUMP,	-4);
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.IN_ZONE,	1);	// home
    design.addCommand(1, ZRF.IF,	3);
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.IF,	4);
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.JUMP,	-4);
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.IN_ZONE,	1);	// home
    design.addCommand(2, ZRF.IF,	3);
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.IN_ZONE,	1);	// home
    design.addCommand(2, ZRF.IF,	3);
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.IF,	4);
    design.addCommand(2, ZRF.PARAM,	1);	// $2
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.JUMP,	-4);
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.IN_ZONE,	1);	// home
    design.addCommand(3, ZRF.IF,	3);
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.IN_ZONE,	1);	// home
    design.addCommand(3, ZRF.IF,	3);
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.IN_ZONE,	1);	// home
    design.addCommand(3, ZRF.IF,	3);
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.IF,	4);
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.JUMP,	-4);
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.IN_ZONE,	1);	// home
    design.addCommand(4, ZRF.IF,	3);
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.IN_ZONE,	1);	// home
    design.addCommand(4, ZRF.IF,	3);
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.IN_ZONE,	1);	// home
    design.addCommand(4, ZRF.IF,	3);
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.IN_ZONE,	1);	// home
    design.addCommand(4, ZRF.IF,	3);
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.IF,	4);
    design.addCommand(4, ZRF.PARAM,	1);	// $2
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.JUMP,	-4);
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.IN_ZONE,	0);	// dice
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(5, ZRF.FUNCTION,	0);	// not
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addPiece("W", 0);
    design.addDrop(0, 5, [], 0);

    design.addPiece("B", 1);
    design.addDrop(1, 5, [], 0);

    design.addPiece("Man", 2);
    design.addMove(2, 0, [2, 0], 1);
    design.addMove(2, 1, [2, 0], 2);
    design.addMove(2, 2, [2, 0], 3);
    design.addMove(2, 3, [2, 0], 4);
    design.addMove(2, 4, [2, 0], 5);

    design.setup("White", "Man", 9);
    design.setup("White", "Man", 10);
    design.setup("White", "Man", 11);
    design.setup("White", "Man", 12);
    design.setup("White", "Man", 13);
    design.setup("Black", "Man", 4);
    design.setup("Black", "Man", 5);
    design.setup("Black", "Man", 6);
    design.setup("Black", "Man", 7);
    design.setup("Black", "Man", 8);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
    view.defPiece("WhiteW", "White W");
    view.defPiece("BlackW", "Black W");
    view.defPiece("WhiteB", "White B");
    view.defPiece("BlackB", "Black B");
 
    view.defPosition("x1", 214, 105, 13, 345);
    view.defPosition("x2", 232, 105, 13, 345);
    view.defPosition("x3", 250, 105, 13, 345);
    view.defPosition("x4", 268, 105, 13, 345);
    view.defPosition("a11", 0, 0, 50, 50);
    view.defPosition("b11", 38, 0, 50, 50);
    view.defPosition("c11", 76, 0, 50, 50);
    view.defPosition("d11", 114, 0, 50, 50);
    view.defPosition("e11", 152, 0, 50, 50);
    view.defPosition("a1", 0, 510, 50, 50);
    view.defPosition("b1", 38, 510, 50, 50);
    view.defPosition("c1", 76, 510, 50, 50);
    view.defPosition("d1", 114, 510, 50, 50);
    view.defPosition("e1", 152, 510, 50, 50);
    view.defPosition("a10", 13, 54, 24, 51);
    view.defPosition("a9", 13, 104, 24, 51);
    view.defPosition("a8", 13, 154, 24, 51);
    view.defPosition("a7", 13, 204, 24, 51);
    view.defPosition("a6", 13, 254, 24, 51);
    view.defPosition("a5", 13, 304, 24, 51);
    view.defPosition("a4", 13, 354, 24, 51);
    view.defPosition("a3", 13, 404, 24, 51);
    view.defPosition("a2", 13, 454, 24, 51);
    view.defPosition("b10", 38, 54, 24, 51);
    view.defPosition("b9", 38, 104, 24, 51);
    view.defPosition("b8", 38, 154, 24, 51);
    view.defPosition("b7", 38, 204, 24, 51);
    view.defPosition("b6", 38, 254, 24, 51);
    view.defPosition("b5", 38, 304, 24, 51);
    view.defPosition("b4", 38, 354, 24, 51);
    view.defPosition("b3", 38, 404, 24, 51);
    view.defPosition("b2", 38, 454, 24, 51);
    view.defPosition("c10", 63, 54, 24, 51);
    view.defPosition("c9", 63, 104, 24, 51);
    view.defPosition("c8", 63, 154, 24, 51);
    view.defPosition("c7", 63, 204, 24, 51);
    view.defPosition("c6", 63, 254, 24, 51);
    view.defPosition("c5", 63, 304, 24, 51);
    view.defPosition("c4", 63, 354, 24, 51);
    view.defPosition("c3", 63, 404, 24, 51);
    view.defPosition("c2", 63, 454, 24, 51);
    view.defPosition("d10", 88, 54, 24, 51);
    view.defPosition("d9", 88, 104, 24, 51);
    view.defPosition("d8", 88, 154, 24, 51);
    view.defPosition("d7", 88, 204, 24, 51);
    view.defPosition("d6", 88, 254, 24, 51);
    view.defPosition("d5", 88, 304, 24, 51);
    view.defPosition("d4", 88, 354, 24, 51);
    view.defPosition("d3", 88, 404, 24, 51);
    view.defPosition("d2", 88, 454, 24, 51);
    view.defPosition("e10", 113, 54, 24, 51);
    view.defPosition("e9", 113, 104, 24, 51);
    view.defPosition("e8", 113, 154, 24, 51);
    view.defPosition("e7", 113, 204, 24, 51);
    view.defPosition("e6", 113, 254, 24, 51);
    view.defPosition("e5", 113, 304, 24, 51);
    view.defPosition("e4", 113, 354, 24, 51);
    view.defPosition("e3", 113, 404, 24, 51);
    view.defPosition("e2", 113, 454, 24, 51);
    view.defPosition("f10", 138, 54, 24, 51);
    view.defPosition("f9", 138, 104, 24, 51);
    view.defPosition("f8", 138, 154, 24, 51);
    view.defPosition("f7", 138, 204, 24, 51);
    view.defPosition("f6", 138, 254, 24, 51);
    view.defPosition("f5", 138, 304, 24, 51);
    view.defPosition("f4", 138, 354, 24, 51);
    view.defPosition("f3", 138, 404, 24, 51);
    view.defPosition("f2", 138, 454, 24, 51);
    view.defPosition("g10", 163, 54, 24, 51);
    view.defPosition("g9", 163, 104, 24, 51);
    view.defPosition("g8", 163, 154, 24, 51);
    view.defPosition("g7", 163, 204, 24, 51);
    view.defPosition("g6", 163, 254, 24, 51);
    view.defPosition("g5", 163, 304, 24, 51);
    view.defPosition("g4", 163, 354, 24, 51);
    view.defPosition("g3", 163, 404, 24, 51);
    view.defPosition("g2", 163, 454, 24, 51);
}
