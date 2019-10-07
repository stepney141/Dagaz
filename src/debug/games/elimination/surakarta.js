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
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("advisor-wait", "5");

    design.addDirection("s"); // 0
    design.addDirection("e"); // 1
    design.addDirection("w"); // 2
    design.addDirection("n"); // 3

    design.addPlayer("White", [3, 2, 1, 0]);
    design.addPlayer("Black", [0, 1, 2, 3]);

    design.addPosition("a6", [6, 1, 0, 0]);
    design.addPosition("b6", [6, 1, -1, 0]);
    design.addPosition("c6", [6, 1, -1, 0]);
    design.addPosition("d6", [6, 1, -1, 0]);
    design.addPosition("e6", [6, 1, -1, 0]);
    design.addPosition("f6", [6, 0, -1, 0]);
    design.addPosition("a5", [6, 1, 0, -6]);
    design.addPosition("b5", [6, 1, -1, -6]);
    design.addPosition("c5", [6, 1, -1, -6]);
    design.addPosition("d5", [6, 1, -1, -6]);
    design.addPosition("e5", [6, 1, -1, -6]);
    design.addPosition("f5", [6, 0, -1, -6]);
    design.addPosition("a4", [6, 1, 0, -6]);
    design.addPosition("b4", [6, 1, -1, -6]);
    design.addPosition("c4", [6, 1, -1, -6]);
    design.addPosition("d4", [6, 1, -1, -6]);
    design.addPosition("e4", [6, 1, -1, -6]);
    design.addPosition("f4", [6, 0, -1, -6]);
    design.addPosition("a3", [6, 1, 0, -6]);
    design.addPosition("b3", [6, 1, -1, -6]);
    design.addPosition("c3", [6, 1, -1, -6]);
    design.addPosition("d3", [6, 1, -1, -6]);
    design.addPosition("e3", [6, 1, -1, -6]);
    design.addPosition("f3", [6, 0, -1, -6]);
    design.addPosition("a2", [6, 1, 0, -6]);
    design.addPosition("b2", [6, 1, -1, -6]);
    design.addPosition("c2", [6, 1, -1, -6]);
    design.addPosition("d2", [6, 1, -1, -6]);
    design.addPosition("e2", [6, 1, -1, -6]);
    design.addPosition("f2", [6, 0, -1, -6]);
    design.addPosition("a1", [0, 1, 0, -6]);
    design.addPosition("b1", [0, 1, -1, -6]);
    design.addPosition("c1", [0, 1, -1, -6]);
    design.addPosition("d1", [0, 1, -1, -6]);
    design.addPosition("e1", [0, 1, -1, -6]);
    design.addPosition("f1", [0, 0, -1, -6]);
    design.addPosition("C1", [0, 1, 2, 3]);
    design.addPosition("C2", [0, 1, 2, 3]);
    design.addPosition("C3", [0, 1, 2, 3]);
    design.addPosition("C4", [0, 1, 2, 3]);
    design.addPosition("C5", [0, 1, 2, 3]);
    design.addPosition("C6", [0, 1, 2, 3]);
    design.addPosition("C7", [0, 1, 2, 3]);
    design.addPosition("C8", [0, 1, 2, 3]);
    design.addPosition("C9", [0, 1, 2, 3]);
    design.addPosition("C10", [0, 1, 2, 3]);
    design.addPosition("B1", [0, 1, 2, 3]);
    design.addPosition("B2", [0, 1, 2, 3]);
    design.addPosition("B3", [0, 1, 2, 3]);
    design.addPosition("B4", [0, 1, 2, 3]);
    design.addPosition("B5", [0, 1, 2, 3]);
    design.addPosition("B6", [0, 1, 2, 3]);
    design.addPosition("D1", [0, 1, 2, 3]);
    design.addPosition("D2", [0, 1, 2, 3]);
    design.addPosition("D3", [0, 1, 2, 3]);
    design.addPosition("D4", [0, 1, 2, 3]);
    design.addPosition("D5", [0, 1, 2, 3]);
    design.addPosition("D6", [0, 1, 2, 3]);
    design.addPosition("D7", [0, 1, 2, 3]);
    design.addPosition("D8", [0, 1, 2, 3]);
    design.addPosition("D9", [0, 1, 2, 3]);
    design.addPosition("D10", [0, 1, 2, 3]);
    design.addPosition("E1", [0, 1, 2, 3]);
    design.addPosition("E2", [0, 1, 2, 3]);
    design.addPosition("E3", [0, 1, 2, 3]);
    design.addPosition("E4", [0, 1, 2, 3]);
    design.addPosition("E5", [0, 1, 2, 3]);
    design.addPosition("E6", [0, 1, 2, 3]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("Man", 0);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [1], 0);
    design.addMove(0, 0, [2], 0);
    design.addMove(0, 0, [0], 0);

    design.setup("White", "Man", 30);
    design.setup("White", "Man", 31);
    design.setup("White", "Man", 32);
    design.setup("White", "Man", 33);
    design.setup("White", "Man", 34);
    design.setup("White", "Man", 35);
    design.setup("White", "Man", 24);
    design.setup("White", "Man", 25);
    design.setup("White", "Man", 26);
    design.setup("White", "Man", 27);
    design.setup("White", "Man", 28);
    design.setup("White", "Man", 29);
    design.setup("Black", "Man", 0);
    design.setup("Black", "Man", 1);
    design.setup("Black", "Man", 2);
    design.setup("Black", "Man", 3);
    design.setup("Black", "Man", 4);
    design.setup("Black", "Man", 5);
    design.setup("Black", "Man", 6);
    design.setup("Black", "Man", 7);
    design.setup("Black", "Man", 8);
    design.setup("Black", "Man", 9);
    design.setup("Black", "Man", 10);
    design.setup("Black", "Man", 11);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
 
    view.defPosition("a6", 94, 94, 35, 35);
    view.defPosition("b6", 130, 94, 35, 35);
    view.defPosition("c6", 166, 94, 35, 35);
    view.defPosition("d6", 202, 94, 35, 35);
    view.defPosition("e6", 238, 94, 35, 35);
    view.defPosition("f6", 274, 94, 35, 35);
    view.defPosition("a5", 94, 130, 35, 35);
    view.defPosition("b5", 130, 130, 35, 35);
    view.defPosition("c5", 166, 130, 35, 35);
    view.defPosition("d5", 202, 130, 35, 35);
    view.defPosition("e5", 238, 130, 35, 35);
    view.defPosition("f5", 274, 130, 35, 35);
    view.defPosition("a4", 94, 166, 35, 35);
    view.defPosition("b4", 130, 166, 35, 35);
    view.defPosition("c4", 166, 166, 35, 35);
    view.defPosition("d4", 202, 166, 35, 35);
    view.defPosition("e4", 238, 166, 35, 35);
    view.defPosition("f4", 274, 166, 35, 35);
    view.defPosition("a3", 94, 202, 35, 35);
    view.defPosition("b3", 130, 202, 35, 35);
    view.defPosition("c3", 166, 202, 35, 35);
    view.defPosition("d3", 202, 202, 35, 35);
    view.defPosition("e3", 238, 202, 35, 35);
    view.defPosition("f3", 274, 202, 35, 35);
    view.defPosition("a2", 94, 238, 35, 35);
    view.defPosition("b2", 130, 238, 35, 35);
    view.defPosition("c2", 166, 238, 35, 35);
    view.defPosition("d2", 202, 238, 35, 35);
    view.defPosition("e2", 238, 238, 35, 35);
    view.defPosition("f2", 274, 238, 35, 35);
    view.defPosition("a1", 94, 274, 35, 35);
    view.defPosition("b1", 130, 274, 35, 35);
    view.defPosition("c1", 166, 274, 35, 35);
    view.defPosition("d1", 202, 274, 35, 35);
    view.defPosition("e1", 238, 274, 35, 35);
    view.defPosition("f1", 274, 274, 35, 35);
    view.defPosition("C1", 50, 152, 30, 30);
    view.defPosition("C2", 26, 99, 30, 30);
    view.defPosition("C3", 46, 47, 30, 30);
    view.defPosition("C4", 98, 27, 30, 30);
    view.defPosition("C5", 152, 55, 33, 30);
    view.defPosition("C6", 50, 219, 30, 30);
    view.defPosition("C7", 26, 272, 30, 30);
    view.defPosition("C8", 46, 324, 30, 30);
    view.defPosition("C9", 98, 346, 30, 30);
    view.defPosition("C10", 152, 316, 33, 30);
    view.defPosition("B1", 61, 115, 30, 30);
    view.defPosition("B2", 72, 73, 30, 30);
    view.defPosition("B3", 115, 62, 30, 30);
    view.defPosition("B4", 61, 256, 30, 30);
    view.defPosition("B5", 72, 299, 30, 30);
    view.defPosition("B6", 115, 309, 30, 30);
    view.defPosition("D1", 321, 152, 30, 30);
    view.defPosition("D2", 345, 99, 30, 30);
    view.defPosition("D3", 325, 47, 30, 30);
    view.defPosition("D4", 273, 27, 30, 30);
    view.defPosition("D5", 219, 55, 30, 30);
    view.defPosition("D6", 321, 219, 30, 30);
    view.defPosition("D7", 345, 272, 30, 30);
    view.defPosition("D8", 325, 324, 30, 30);
    view.defPosition("D9", 273, 346, 30, 30);
    view.defPosition("D10", 219, 316, 30, 30);
    view.defPosition("E1", 310, 115, 30, 30);
    view.defPosition("E2", 300, 73, 30, 30);
    view.defPosition("E3", 256, 62, 30, 30);
    view.defPosition("E4", 310, 256, 30, 30);
    view.defPosition("E5", 300, 299, 30, 30);
    view.defPosition("E6", 256, 309, 33, 30);
}
