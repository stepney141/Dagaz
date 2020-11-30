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
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-drops", "true");

    design.addDirection("n");
    design.addDirection("s");
    design.addDirection("e");
    design.addDirection("w");
    design.addDirection("ne");
    design.addDirection("sw");
    design.addDirection("se");
    design.addDirection("nw");
    design.addDirection("cw");
    design.addDirection("cc");

    design.addPlayer("Black", [1, 0, 3, 2, 5, 4, 7, 6, 9, 8]);
    design.addPlayer("White", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    design.addPosition("a6", [0, 1, 6, 0, 0, 0, 7, 0, 12, 2]);
    design.addPosition("a5", [-1, 1, 6, 0, 0, 0, 7, 0, 5, 7]);
    design.addPosition("a4", [-1, 1, 6, 0, 0, 0, 0, 0, -2, 12]);
    design.addPosition("a3", [-1, 1, 6, 0, 0, 0, 0, 0, 12, 2]);
    design.addPosition("a2", [-1, 1, 6, 0, 5, 0, 0, 0, 5, 7]);
    design.addPosition("a1", [-1, 0, 6, 0, 5, 0, 0, 0, -2, 12]);
    design.addPosition("b6", [0, 1, 6, -6, 0, 0, 7, 0, 7, -5]);
    design.addPosition("b5", [-1, 1, 6, -6, 0, 0, 7, -7, 0, 0]);
    design.addPosition("b4", [-1, 1, 6, -6, 0, 0, 7, -7, -7, 5]);
    design.addPosition("b3", [-1, 1, 6, -6, 5, -5, 0, 0, 7, -5]);
    design.addPosition("b2", [-1, 1, 6, -6, 5, -5, 0, 0, 0, 0]);
    design.addPosition("b1", [-1, 0, 6, -6, 5, 0, 0, 0, -7, 5]);
    design.addPosition("c6", [0, 1, 6, -6, 0, 0, 0, 0, 2, -12]);
    design.addPosition("c5", [-1, 1, 6, -6, 0, 0, 7, -7, -5, -7]);
    design.addPosition("c4", [-1, 1, 6, -6, 5, -5, 7, -7, -12, -2]);
    design.addPosition("c3", [-1, 1, 6, -6, 5, -5, 7, -7, 2, -12]);
    design.addPosition("c2", [-1, 1, 6, -6, 5, -5, 0, 0, -5, -7]);
    design.addPosition("c1", [-1, 0, 6, -6, 0, 0, 0, 0, -12, -2]);
    design.addPosition("d6", [0, 1, 6, -6, 0, 0, 0, 0, 12, 2]);
    design.addPosition("d5", [-1, 1, 6, -6, 5, -5, 0, 0, 5, 7]);
    design.addPosition("d4", [-1, 1, 6, -6, 5, -5, 7, -7, -2, 12]);
    design.addPosition("d3", [-1, 1, 6, -6, 5, -5, 7, -7, 12, 2]);
    design.addPosition("d2", [-1, 1, 6, -6, 0, 0, 7, -7, 5, 7]);
    design.addPosition("d1", [-1, 0, 6, -6, 0, 0, 0, 0, -2, 12]);
    design.addPosition("e6", [0, 1, 6, -6, 0, -5, 0, 0, 7, -5]);
    design.addPosition("e5", [-1, 1, 6, -6, 5, -5, 0, 0, 0, 0]);
    design.addPosition("e4", [-1, 1, 6, -6, 5, -5, 0, 0, -7, 5]);
    design.addPosition("e3", [-1, 1, 6, -6, 0, 0, 7, -7, 7, -5]);
    design.addPosition("e2", [-1, 1, 6, -6, 0, 0, 7, -7, 0, 0]);
    design.addPosition("e1", [-1, 0, 6, -6, 0, 0, 0, -7, -7, 5]);
    design.addPosition("f6", [0, 1, 0, -6, 0, -5, 0, 0, 2, -12]);
    design.addPosition("f5", [-1, 1, 0, -6, 0, -5, 0, 0, -5, -7]);
    design.addPosition("f4", [-1, 1, 0, -6, 0, 0, 0, 0, -12, -2]);
    design.addPosition("f3", [-1, 1, 0, -6, 0, 0, 0, 0, 2, -12]);
    design.addPosition("f2", [-1, 1, 0, -6, 0, 0, 0, -7, -5, -7]);
    design.addPosition("f1", [-1, 0, 0, -6, 0, 0, 0, -7, -12, -2]);

    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("Stone", 0);
    design.addDrop(0, 0, [], 0);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("BlackStone", "Black Stone");
    view.defPiece("WhiteStone", "White Stone");
 
    view.defPosition("a6", 1, 3, 52, 52);
    view.defPosition("a5", 1, 67, 52, 52);
    view.defPosition("a4", 0, 133, 51, 52);
    view.defPosition("a3", 2, 194, 52, 52);
    view.defPosition("a2", 1, 259, 52, 52);
    view.defPosition("a1", 0, 323, 51, 52);
    view.defPosition("b6", 67, 3, 52, 52);
    view.defPosition("b5", 67, 67, 52, 52);
    view.defPosition("b4", 66, 132, 52, 52);
    view.defPosition("b3", 66, 194, 52, 52);
    view.defPosition("b2", 67, 259, 52, 52);
    view.defPosition("b1", 66, 322, 51, 53);
    view.defPosition("c6", 131, 3, 52, 52);
    view.defPosition("c5", 131, 67, 52, 52);
    view.defPosition("c4", 132, 132, 52, 52);
    view.defPosition("c3", 131, 193, 52, 52);
    view.defPosition("c2", 131, 259, 52, 52);
    view.defPosition("c1", 131, 323, 52, 52);
    view.defPosition("d6", 195, 3, 52, 52);
    view.defPosition("d5", 195, 67, 52, 52);
    view.defPosition("d4", 193, 133, 52, 52);
    view.defPosition("d3", 194, 194, 52, 52);
    view.defPosition("d2", 194, 259, 52, 52);
    view.defPosition("d1", 193, 323, 52, 52);
    view.defPosition("e6", 259, 3, 52, 52);
    view.defPosition("e5", 261, 67, 52, 52);
    view.defPosition("e4", 258, 132, 52, 52);
    view.defPosition("e3", 260, 193, 52, 52);
    view.defPosition("e2", 259, 259, 52, 52);
    view.defPosition("e1", 259, 323, 52, 52);
    view.defPosition("f6", 325, 3, 52, 52);
    view.defPosition("f5", 325, 67, 52, 52);
    view.defPosition("f4", 325, 131, 52, 52);
    view.defPosition("f3", 324, 193, 52, 52);
    view.defPosition("f2", 323, 259, 52, 52);
    view.defPosition("f1", 324, 322, 52, 52);
}
