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

    design.addDirection("n");   // 0
    design.addDirection("e");   // 1
    design.addDirection("w");   // 2
    design.addDirection("s");   // 3
    design.addDirection("ne");  // 4
    design.addDirection("sw");  // 5
    design.addDirection("nw");  // 6
    design.addDirection("se");  // 7
    design.addDirection("cwv"); // 8
    design.addDirection("cwh"); // 9
    design.addDirection("ccv"); // 10
    design.addDirection("cch"); // 11

    design.addPlayer("White", [3, 2, 1, 0, 5, 4, 7, 6, 10, 11, 8, 9]);
    design.addPlayer("Black", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

    design.addPosition("a6", [0, 6, 0, 1, 0, 0, 0, 7, 0, 0, 0, 0]);
    design.addPosition("a5", [-1, 6, 0, 1, 5, 0, 0, 7, 45, 0, 0, 6]);
    design.addPosition("a4", [-1, 6, 0, 1, 5, 0, 0, 7, 34, 0, 0, 6]);
    design.addPosition("a3", [-1, 6, 0, 1, 5, 0, 0, 7, 0, 6, 0, 38]);
    design.addPosition("a2", [-1, 6, 0, 1, 5, 0, 0, 7, 0, 6, 0, 45]);
    design.addPosition("a1", [-1, 6, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b6", [0, 6, -6, 1, 0, -5, 0, 7, 1, 0, 42, 0]);
    design.addPosition("b5", [-1, 6, -6, 1, 5, -5, -7, 7, 1, -6, -1, 6]);
    design.addPosition("b4", [-1, 6, -6, 1, 5, -5, -7, 7, 1, -6, -1, 6]);
    design.addPosition("b3", [-1, 6, -6, 1, 5, -5, -7, 7, 1, 6, -1, -6]);
    design.addPosition("b2", [-1, 6, -6, 1, 5, -5, -7, 7, 1, 6, -1, -6]);
    design.addPosition("b1", [-1, 6, -6, 0, 5, 0, -7, 0, 0, 40, -1, 0]);
    design.addPosition("c6", [0, 6, -6, 1, 0, -5, 0, 7, 1, 0, 28, 0]);
    design.addPosition("c5", [-1, 6, -6, 1, 5, -5, -7, 7, 1, -6, -1, 6]);
    design.addPosition("c4", [-1, 6, -6, 1, 5, -5, -7, 7, 1, -6, -1, 6]);
    design.addPosition("c3", [-1, 6, -6, 1, 5, -5, -7, 7, 1, 6, -1, -6]);
    design.addPosition("c2", [-1, 6, -6, 1, 5, -5, -7, 7, 1, 6, -1, -6]);
    design.addPosition("c1", [-1, 6, -6, 0, 5, 0, -7, 0, 0, 28, -1, 0]);
    design.addPosition("d6", [0, 6, -6, 1, 0, -5, 0, 7, 0, 38, 1, 0]);
    design.addPosition("d5", [-1, 6, -6, 1, 5, -5, -7, 7, -1, -6, 1, 6]);
    design.addPosition("d4", [-1, 6, -6, 1, 5, -5, -7, 7, -1, -6, 1, 6]);
    design.addPosition("d3", [-1, 6, -6, 1, 5, -5, -7, 7, -1, 6, 1, -6]);
    design.addPosition("d2", [-1, 6, -6, 1, 5, -5, -7, 7, -1, 6, 1, -6]);
    design.addPosition("d1", [-1, 6, -6, 0, 5, 0, -7, 0, -1, 0, 38, 0]);
    design.addPosition("e6", [0, 6, -6, 1, 0, -5, 0, 7, 0, 40, 1, 0]);
    design.addPosition("e5", [-1, 6, -6, 1, 5, -5, -7, 7, -1, -6, 1, 6]);
    design.addPosition("e4", [-1, 6, -6, 1, 5, -5, -7, 7, -1, -6, 1, 6]);
    design.addPosition("e3", [-1, 6, -6, 1, 5, -5, -7, 7, -1, 6, 1, -6]);
    design.addPosition("e2", [-1, 6, -6, 1, 5, -5, -7, 7, -1, 6, 1, -6]);
    design.addPosition("e1", [-1, 6, -6, 0, 5, 0, -7, 0, -1, 0, 38, 0]);
    design.addPosition("f6", [0, 0, -6, 1, 0, -5, 0, 0, 0, 0, 0, 0]);
    design.addPosition("f5", [-1, 0, -6, 1, 0, -5, -7, 0, 0, -6, 0, 31]);
    design.addPosition("f4", [-1, 0, -6, 1, 0, -5, -7, 0, 0, -6, 0, 20]);
    design.addPosition("f3", [-1, 0, -6, 1, 0, -5, -7, 0, 24, 0, 0, -6]);
    design.addPosition("f2", [-1, 0, -6, 1, 0, -5, -7, 0, 31, 0, 0, -6]);
    design.addPosition("f1", [-1, 0, -6, 0, 0, 0, -7, 0, 0, 0, 0, 0]);
    design.addPosition("C1", [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -34, 0]);
    design.addPosition("C2", [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0]);
    design.addPosition("C3", [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0]);
    design.addPosition("C4", [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0]);
    design.addPosition("C5", [0, 0, 0, 0, 0, 0, 0, 0, -28, 0, -1, 0]);
    design.addPosition("C6", [0, 0, 0, 0, 0, 0, 0, 0, 0, -38, 0, 1]);
    design.addPosition("C7", [0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1]);
    design.addPosition("C8", [0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1]);
    design.addPosition("C9", [0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1]);
    design.addPosition("C10", [0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, -28]);
    design.addPosition("B1", [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -45, 0]);
    design.addPosition("B2", [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0]);
    design.addPosition("B3", [0, 0, 0, 0, 0, 0, 0, 0, -42, 0, -1, 0]);
    design.addPosition("B4", [0, 0, 0, 0, 0, 0, 0, 0, 0, -45, 0, 1]);
    design.addPosition("B5", [0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1]);
    design.addPosition("B6", [0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, -40]);
    design.addPosition("D1", [0, 0, 0, 0, 0, 0, 0, 0, 0, -20, 0, 1]);
    design.addPosition("D2", [0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1]);
    design.addPosition("D3", [0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1]);
    design.addPosition("D4", [0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1]);
    design.addPosition("D5", [0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, -38]);
    design.addPosition("D6", [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -24, 0]);
    design.addPosition("D7", [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0]);
    design.addPosition("D8", [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0]);
    design.addPosition("D9", [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0]);
    design.addPosition("D10", [0, 0, 0, 0, 0, 0, 0, 0, -38, 0, -1, 0]);
    design.addPosition("E1", [0, 0, 0, 0, 0, 0, 0, 0, 0, -31, 0, 1]);
    design.addPosition("E2", [0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1]);
    design.addPosition("E3", [0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, -40]);
    design.addPosition("E4", [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -31, 0]);
    design.addPosition("E5", [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0]);
    design.addPosition("E6", [0, 0, 0, 0, 0, 0, 0, 0, -38, 0, -1, 0]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("Man", 0, 2);
    design.addMove(0, 0, [0], 0);
    design.addMove(0, 0, [1], 0);
    design.addMove(0, 0, [2], 0);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [6], 0);
    design.addMove(0, 0, [4], 0);
    design.addMove(0, 0, [5], 0);
    design.addMove(0, 0, [7], 0);

    design.setup("White", "Man", 5);
    design.setup("White", "Man", 11);
    design.setup("White", "Man", 17);
    design.setup("White", "Man", 23);
    design.setup("White", "Man", 29);
    design.setup("White", "Man", 35);
    design.setup("White", "Man", 4);
    design.setup("White", "Man", 10);
    design.setup("White", "Man", 16);
    design.setup("White", "Man", 22);
    design.setup("White", "Man", 28);
    design.setup("White", "Man", 34);
    design.setup("Black", "Man", 0);
    design.setup("Black", "Man", 6);
    design.setup("Black", "Man", 12);
    design.setup("Black", "Man", 18);
    design.setup("Black", "Man", 24);
    design.setup("Black", "Man", 30);
    design.setup("Black", "Man", 1);
    design.setup("Black", "Man", 7);
    design.setup("Black", "Man", 13);
    design.setup("Black", "Man", 19);
    design.setup("Black", "Man", 25);
    design.setup("Black", "Man", 31);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
 
    view.defPosition("a6", 94, 94, 35, 35);
    view.defPosition("b6", 94, 130, 35, 35);
    view.defPosition("c6", 94, 166, 35, 35);
    view.defPosition("d6", 94, 202, 35, 35);
    view.defPosition("e6", 94, 238, 35, 35);
    view.defPosition("f6", 94, 274, 35, 35);
    view.defPosition("a5", 130, 94, 35, 35);
    view.defPosition("b5", 130, 130, 35, 35);
    view.defPosition("c5", 130, 166, 35, 35);
    view.defPosition("d5", 130, 202, 35, 35);
    view.defPosition("e5", 130, 238, 35, 35);
    view.defPosition("f5", 130, 274, 35, 35);
    view.defPosition("a4", 166, 94, 35, 35);
    view.defPosition("b4", 166, 130, 35, 35);
    view.defPosition("c4", 166, 166, 35, 35);
    view.defPosition("d4", 166, 202, 35, 35);
    view.defPosition("e4", 166, 238, 35, 35);
    view.defPosition("f4", 166, 274, 35, 35);
    view.defPosition("a3", 202, 94, 35, 35);
    view.defPosition("b3", 202, 130, 35, 35);
    view.defPosition("c3", 202, 166, 35, 35);
    view.defPosition("d3", 202, 202, 35, 35);
    view.defPosition("e3", 202, 238, 35, 35);
    view.defPosition("f3", 202, 274, 35, 35);
    view.defPosition("a2", 238, 94, 35, 35);
    view.defPosition("b2", 238, 130, 35, 35);
    view.defPosition("c2", 238, 166, 35, 35);
    view.defPosition("d2", 238, 202, 35, 35);
    view.defPosition("e2", 238, 238, 35, 35);
    view.defPosition("f2", 238, 274, 35, 35);
    view.defPosition("a1", 274, 94, 35, 35);
    view.defPosition("b1", 274, 130, 35, 35);
    view.defPosition("c1", 274, 166, 35, 35);
    view.defPosition("d1", 274, 202, 35, 35);
    view.defPosition("e1", 274, 238, 35, 35);
    view.defPosition("f1", 274, 274, 35, 35);
    view.defPosition("C1", 152, 50, 30, 30);
    view.defPosition("C2", 99, 26, 30, 30);
    view.defPosition("C3", 47, 46, 30, 30);
    view.defPosition("C4", 27, 98, 30, 30);
    view.defPosition("C5", 55, 152, 30, 33);
    view.defPosition("C6", 219, 50, 30, 30);
    view.defPosition("C7", 272, 26, 30, 30);
    view.defPosition("C8", 324, 46, 30, 30);
    view.defPosition("C9", 346, 98, 30, 30);
    view.defPosition("C10", 316, 152, 30, 33);
    view.defPosition("B1", 115, 61, 30, 30);
    view.defPosition("B2", 73, 72, 30, 30);
    view.defPosition("B3", 62, 115, 30, 30);
    view.defPosition("B4", 256, 61, 30, 30);
    view.defPosition("B5", 299, 72, 30, 30);
    view.defPosition("B6", 309, 115, 30, 30);
    view.defPosition("D1", 152, 321, 30, 30);
    view.defPosition("D2", 99, 345, 30, 30);
    view.defPosition("D3", 47, 325, 30, 30);
    view.defPosition("D4", 27, 273, 30, 30);
    view.defPosition("D5", 55, 219, 30, 30);
    view.defPosition("D6", 219, 321, 30, 30);
    view.defPosition("D7", 272, 345, 30, 30);
    view.defPosition("D8", 324, 325, 30, 30);
    view.defPosition("D9", 346, 273, 30, 30);
    view.defPosition("D10", 316, 219, 30, 30);
    view.defPosition("E1", 115, 310, 30, 30);
    view.defPosition("E2", 73, 300, 30, 30);
    view.defPosition("E3", 62, 256, 30, 30);
    view.defPosition("E4", 256, 310, 30, 30);
    view.defPosition("E5", 299, 300, 30, 30);
    view.defPosition("E6", 309, 256, 30, 33);
}
