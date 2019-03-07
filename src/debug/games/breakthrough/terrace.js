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
    design.checkVersion("animate-drops", "false");
    design.checkVersion("animate-captures", "false");
    design.checkVersion("show-blink", "false");

    design.addDirection("sw");
    design.addDirection("swu");
    design.addDirection("swd");
    design.addDirection("se");
    design.addDirection("seu");
    design.addDirection("sed");
    design.addDirection("nw");
    design.addDirection("nwu");
    design.addDirection("nwd");
    design.addDirection("ne");
    design.addDirection("neu");
    design.addDirection("ned");
    design.addDirection("w");
    design.addDirection("wu");
    design.addDirection("wd");
    design.addDirection("e");
    design.addDirection("eu");
    design.addDirection("ed");
    design.addDirection("s");
    design.addDirection("su");
    design.addDirection("sd");
    design.addDirection("n");
    design.addDirection("nu");
    design.addDirection("nd");

    design.addPlayer("Black", [9, 11, 10, 6, 8, 7, 3, 5, 4, 0, 2, 1, 15, 17, 16, 12, 14, 13, 18, 23, 22, 21, 20, 19]);
    design.addPlayer("White", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);

    design.addPosition("f6f", [0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 6, 0, 0, 0]);
    design.addPosition("e6e", [5, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 1, 6, 0, 0, 0, 0, 0]);
    design.addPosition("d6d", [0, 5, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 1, 6, 0, 0, 0, 0, 0]);
    design.addPosition("c6c", [0, 5, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 1, 6, 0, 0, 0, 0, 0]);
    design.addPosition("b6b", [0, 5, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 1, 6, 0, 0, 0, 0, 0]);
    design.addPosition("a6a", [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0]);
    design.addPosition("f5e", [0, 0, 0, 0, 0, 7, 0, 0, 0, -5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 6, 0, -6, 0]);
    design.addPosition("e5e", [0, 0, 5, 0, 0, 7, 0, -7, 0, 0, 0, -5, -1, 0, 0, 0, 0, 1, 0, 0, 6, -6, 0, 0]);
    design.addPosition("d5d", [5, 0, 0, 0, 0, 7, 0, -7, 0, 0, 0, -5, 0, -1, 0, 0, 0, 1, 6, 0, 0, -6, 0, 0]);
    design.addPosition("c5c", [0, 5, 0, 7, 0, 0, 0, -7, 0, 0, 0, -5, 0, -1, 0, 0, 0, 1, 6, 0, 0, -6, 0, 0]);
    design.addPosition("b5b", [0, 5, 0, 0, 7, 0, 0, -7, 0, 0, 0, -5, 0, -1, 0, 1, 0, 0, 0, 6, 0, -6, 0, 0]);
    design.addPosition("a5b", [0, 5, 0, 0, 0, 0, -7, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, -6]);
    design.addPosition("f4d", [0, 0, 0, 0, 0, 7, 0, 0, 0, 0, -5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 6, 0, -6, 0]);
    design.addPosition("e4d", [0, 0, 5, 0, 0, 7, 0, -7, 0, -5, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 6, 0, -6, 0]);
    design.addPosition("d4d", [0, 0, 5, 7, 0, 0, 0, -7, 0, 0, 0, -5, -1, 0, 0, 0, 0, 1, 0, 0, 6, -6, 0, 0]);
    design.addPosition("c4c", [5, 0, 0, 0, 7, 0, 0, -7, 0, 0, 0, -5, 0, -1, 0, 1, 0, 0, 0, 6, 0, -6, 0, 0]);
    design.addPosition("b4c", [0, 5, 0, 0, 7, 0, -7, 0, 0, 0, 0, -5, -1, 0, 0, 1, 0, 0, 0, 6, 0, 0, 0, -6]);
    design.addPosition("a4c", [0, 5, 0, 0, 0, 0, 0, 0, -7, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, -6]);
    design.addPosition("f3c", [0, 0, 0, 0, 0, 7, 0, 0, 0, 0, -5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 6, 0, -6, 0]);
    design.addPosition("e3c", [0, 0, 5, 7, 0, 0, 0, -7, 0, 0, -5, 0, -1, 0, 0, 1, 0, 0, 0, 0, 6, 0, -6, 0]);
    design.addPosition("d3c", [0, 0, 5, 0, 7, 0, 0, -7, 0, -5, 0, 0, -1, 0, 0, 0, 1, 0, 6, 0, 0, 0, -6, 0]);
    design.addPosition("c3d", [0, 0, 5, 0, 7, 0, -7, 0, 0, 0, 0, -5, 0, 0, -1, 1, 0, 0, 6, 0, 0, 0, 0, -6]);
    design.addPosition("b3d", [5, 0, 0, 0, 7, 0, 0, 0, -7, 0, 0, -5, -1, 0, 0, 1, 0, 0, 0, 6, 0, 0, 0, -6]);
    design.addPosition("a3d", [0, 5, 0, 0, 0, 0, 0, 0, -7, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, -6]);
    design.addPosition("f2b", [0, 0, 0, 7, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 6, 0, -6, 0]);
    design.addPosition("e2b", [0, 0, 5, 0, 7, 0, 0, -7, 0, 0, -5, 0, -1, 0, 0, 0, 1, 0, 6, 0, 0, 0, -6, 0]);
    design.addPosition("d2c", [0, 0, 5, 0, 7, 0, -7, 0, 0, 0, -5, 0, 0, 0, -1, 0, 1, 0, 6, 0, 0, -6, 0, 0]);
    design.addPosition("c2d", [0, 0, 5, 0, 7, 0, 0, 0, -7, -5, 0, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, -6, 0, 0]);
    design.addPosition("b2e", [0, 0, 5, 0, 7, 0, 0, 0, -7, 0, 0, -5, 0, 0, -1, 1, 0, 0, 6, 0, 0, 0, 0, -6]);
    design.addPosition("a2e", [5, 0, 0, 0, 0, 0, 0, 0, -7, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, -6]);
    design.addPosition("f1a", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -6, 0]);
    design.addPosition("e1b", [0, 0, 0, 0, 0, 0, -7, 0, 0, 0, -5, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, -6, 0, 0]);
    design.addPosition("d1c", [0, 0, 0, 0, 0, 0, 0, 0, -7, 0, -5, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, -6, 0, 0]);
    design.addPosition("c1d", [0, 0, 0, 0, 0, 0, 0, 0, -7, 0, -5, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, -6, 0, 0]);
    design.addPosition("b1e", [0, 0, 0, 0, 0, 0, 0, 0, -7, -5, 0, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, -6, 0, 0]);
    design.addPosition("a1f", [0, 0, 0, 0, 0, 0, 0, 0, -7, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, -6]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.FUNCTION,	26);	// capture
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("T", 0);
    design.addMove(0, 0, [], 0);

    design.addPiece("S", 1);
    design.addMove(1, 0, [], 0);

    design.addPiece("M", 2);
    design.addMove(2, 0, [], 0);

    design.addPiece("L", 3);
    design.addMove(3, 0, [], 0);

    design.setup("Black", "L", 35);
    design.setup("Black", "L", 34);
    design.setup("Black", "L", 25);
    design.setup("Black", "L", 24);
    design.setup("Black", "M", 33);
    design.setup("Black", "M", 32);
    design.setup("Black", "M", 27);
    design.setup("Black", "M", 26);
    design.setup("Black", "S", 29);
    design.setup("Black", "S", 28);
    design.setup("Black", "S", 31);
    design.setup("Black", "T", 30);
    design.setup("White", "L", 1);
    design.setup("White", "L", 0);
    design.setup("White", "L", 11);
    design.setup("White", "L", 10);
    design.setup("White", "M", 3);
    design.setup("White", "M", 2);
    design.setup("White", "M", 9);
    design.setup("White", "M", 8);
    design.setup("White", "S", 7);
    design.setup("White", "S", 6);
    design.setup("White", "S", 4);
    design.setup("White", "T", 5);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("BlackT", "Black T");
    view.defPiece("WhiteT", "White T");
    view.defPiece("BlackS", "Black S");
    view.defPiece("WhiteS", "White S");
    view.defPiece("BlackM", "Black M");
    view.defPiece("WhiteM", "White M");
    view.defPiece("BlackL", "Black L");
    view.defPiece("WhiteL", "White L");
 
    view.defPosition("f6f", 48, 6, 102, 99);
    view.defPosition("e6e", 120, 14, 102, 99);
    view.defPosition("d6d", 192, 22, 102, 99);
    view.defPosition("c6c", 264, 30, 102, 99);
    view.defPosition("b6b", 336, 38, 102, 99);
    view.defPosition("a6a", 408, 46, 102, 99);
    view.defPosition("f5e", 40, 95, 102, 99);
    view.defPosition("e5e", 120, 95, 102, 99);
    view.defPosition("d5d", 192, 103, 102, 99);
    view.defPosition("c5c", 264, 111, 102, 99);
    view.defPosition("b5b", 336, 119, 102, 99);
    view.defPosition("a5b", 416, 119, 102, 99);
    view.defPosition("f4d", 32, 184, 102, 99);
    view.defPosition("e4d", 112, 184, 102, 99);
    view.defPosition("d4d", 192, 184, 102, 99);
    view.defPosition("c4c", 264, 192, 102, 99);
    view.defPosition("b4c", 344, 192, 102, 99);
    view.defPosition("a4c", 424, 192, 102, 99);
    view.defPosition("f3c", 24, 273, 102, 99);
    view.defPosition("e3c", 104, 273, 102, 99);
    view.defPosition("d3c", 184, 273, 102, 99);
    view.defPosition("c3d", 272, 265, 102, 99);
    view.defPosition("b3d", 352, 265, 102, 99);
    view.defPosition("a3d", 432, 265, 102, 99);
    view.defPosition("f2b", 16, 362, 102, 99);
    view.defPosition("e2b", 96, 362, 102, 99);
    view.defPosition("d2c", 184, 354, 102, 99);
    view.defPosition("c2d", 272, 346, 102, 99);
    view.defPosition("b2e", 360, 338, 102, 99);
    view.defPosition("a2e", 440, 338, 102, 99);
    view.defPosition("f1a", 8, 451, 102, 99);
    view.defPosition("e1b", 96, 443, 102, 99);
    view.defPosition("d1c", 184, 435, 102, 99);
    view.defPosition("c1d", 272, 427, 102, 99);
    view.defPosition("b1e", 360, 419, 102, 99);
    view.defPosition("a1f", 448, 411, 102, 99);
}
