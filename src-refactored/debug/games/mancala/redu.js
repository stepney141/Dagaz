Dagaz.View.CLEAR_KO = true;

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
    design.checkVersion("smart-moves", "to");
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("pass-turn", "forced");
    design.checkVersion("mancala-setup", "4");
    design.checkVersion("shared-pieces", "true");
    design.checkVersion("advisor-wait", "5");

    design.addDirection("se"); // 0
    design.addDirection("s");  // 1
    design.addDirection("sw"); // 2
    design.addDirection("e");  // 3
    design.addDirection("w");  // 4
    design.addDirection("ne"); // 5
    design.addDirection("nw"); // 6
    design.addDirection("n");  // 7
    design.addDirection("sr"); // 8
    design.addDirection("nr"); // 9

    design.addPlayer("South", [6, 7, 5, 4, 3, 2, 0, 1, 8, 9]);
    design.addPlayer("North", [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);

    design.addPosition("a2", [7, 6, 0, 1, 0, 0, 0, 0, 15, 14]);
    design.addPosition("b2", [7, 6, 5, 1, -1, 0, 0, 0, 14, 13]);
    design.addPosition("c2", [7, 6, 5, 1, -1, 0, 0, 0, 13, 12]);
    design.addPosition("d2", [7, 6, 5, 1, -1, 0, 0, 0, 12, 11]);
    design.addPosition("e2", [7, 6, 5, 1, -1, 0, 0, 0, 11, 10]);
    design.addPosition("f2", [0, 6, 5, 0, -1, 0, 0, 0, 10, 9]);
    design.addPosition("a1", [0, 0, 0, 1, 0, -5, 0, -6, 9, 8]);
    design.addPosition("b1", [0, 0, 0, 1, -1, -5, -7, -6, 8, 7]);
    design.addPosition("c1", [0, 0, 0, 1, -1, -5, -7, -6, 7, 6]);
    design.addPosition("d1", [0, 0, 0, 1, -1, -5, -7, -6, 6, 5]);
    design.addPosition("e1", [0, 0, 0, 1, -1, -5, -7, -6, 5, 4]);
    design.addPosition("f1", [0, 0, 0, 0, -1, 0, -7, -6, 4, 3]);
    design.addPosition("B1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("B2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	26);	// capture
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addPiece("Seed", 0);
    design.addMove(0, 0, [7], 0);
    design.addMove(0, 0, [6], 0);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [5], 0);
    design.addMove(0, 0, [4], 0);
    design.addMove(0, 0, [2], 0);
    design.addMove(0, 0, [1], 0);
    design.addMove(0, 0, [0], 0);

    design.addPiece("Button", 1);
    design.addMove(1, 1, [], 0);

    design.setup("South", "Seed", 6);
    design.setup("South", "Seed", 7);
    design.setup("South", "Seed", 8);
    design.setup("South", "Seed", 9);
    design.setup("South", "Seed", 10);
    design.setup("South", "Seed", 11);
    design.setup("North", "Seed", 0);
    design.setup("North", "Seed", 1);
    design.setup("North", "Seed", 2);
    design.setup("North", "Seed", 3);
    design.setup("North", "Seed", 4);
    design.setup("North", "Seed", 5);
}

Dagaz.View.configure = function(view) {
    view.defBoard("SouthBoard", 0, 0, undefined, [0]);
    view.defBoard("NorthBoard", 0, 0, undefined, [1]);
    view.defPiece("SouthSeed", "South Seed");
    view.defPiece("NorthSeed", "North Seed");
    view.defPiece("SouthButton", "South Button");
    view.defPiece("NorthButton", "North Button");
    view.defPiece("0", "0");
    view.defPiece("1", "1");
    view.defPiece("2", "2");
    view.defPiece("3", "3");
    view.defPiece("4", "4");
    view.defPiece("5", "5");
    view.defPiece("6", "6");
    view.defPiece("7", "7");
    view.defPiece("8", "8");
    view.defPiece("9", "9");
    view.defPiece("Ko", "Ko");
 
    view.defPosition("a2", 188, 8, 80, 80);
    view.defPosition("b2", 288, 8, 80, 80);
    view.defPosition("c2", 388, 8, 80, 80);
    view.defPosition("d2", 488, 8, 80, 80);
    view.defPosition("e2", 588, 8, 80, 80);
    view.defPosition("f2", 688, 8, 80, 80);
    view.defPosition("a1", 188, 108, 80, 80);
    view.defPosition("b1", 288, 108, 80, 80);
    view.defPosition("c1", 388, 108, 80, 80);
    view.defPosition("d1", 488, 108, 80, 80);
    view.defPosition("e1", 588, 108, 80, 80);
    view.defPosition("f1", 688, 108, 80, 80);
    view.defPosition("B1", 943, 158, 72, 31);
    view.defPosition("B2", 943, 8, 72, 31);
    view.defPosition("X2", 28, 8, 140, 180);
    view.defPosition("X1", 788, 8, 140, 180);
}
