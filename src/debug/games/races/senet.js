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
    design.checkVersion("animate-drops", "false");
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "false");

    design.addDirection("nx");

    design.addPlayer("Blue", [0]);
    design.addPlayer("Green", [0]);

    design.addPosition("a3", [1]);
    design.addPosition("b3", [1]);
    design.addPosition("c3", [1]);
    design.addPosition("d3", [1]);
    design.addPosition("e3", [1]);
    design.addPosition("f3", [1]);
    design.addPosition("g3", [1]);
    design.addPosition("h3", [1]);
    design.addPosition("i3", [1]);
    design.addPosition("j3", [10]);
    design.addPosition("a2", [10]);
    design.addPosition("b2", [-1]);
    design.addPosition("c2", [-1]);
    design.addPosition("d2", [-1]);
    design.addPosition("e2", [-1]);
    design.addPosition("f2", [-1]);
    design.addPosition("g2", [-1]);
    design.addPosition("h2", [-1]);
    design.addPosition("i2", [-1]);
    design.addPosition("j2", [-1]);
    design.addPosition("a1", [1]);
    design.addPosition("b1", [1]);
    design.addPosition("c1", [1]);
    design.addPosition("d1", [1]);
    design.addPosition("e1", [1]);
    design.addPosition("f1", [1]);
    design.addPosition("g1", [1]);
    design.addPosition("h1", [1]);
    design.addPosition("i1", [1]);
    design.addPosition("j1", [0]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("Stone", 0);
    design.addMove(0, 0, [0], 0);

    design.setup("Green", "Stone", 0);
    design.setup("Green", "Stone", 2);
    design.setup("Green", "Stone", 4);
    design.setup("Green", "Stone", 6);
    design.setup("Green", "Stone", 8);
    design.setup("Green", "Stone", 19);
    design.setup("Green", "Stone", 17);
    design.setup("Blue", "Stone", 1);
    design.setup("Blue", "Stone", 3);
    design.setup("Blue", "Stone", 5);
    design.setup("Blue", "Stone", 7);
    design.setup("Blue", "Stone", 9);
    design.setup("Blue", "Stone", 18);
    design.setup("Blue", "Stone", 16);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("BlueStone", "Blue Stone");
    view.defPiece("GreenStone", "Green Stone");
 
    view.defPosition("a3", 6, 8, 49, 49);
    view.defPosition("b3", 66, 8, 49, 49);
    view.defPosition("c3", 126, 8, 49, 49);
    view.defPosition("d3", 186, 8, 49, 49);
    view.defPosition("e3", 246, 8, 49, 49);
    view.defPosition("f3", 306, 8, 49, 49);
    view.defPosition("g3", 366, 8, 49, 49);
    view.defPosition("h3", 426, 8, 49, 49);
    view.defPosition("i3", 486, 8, 49, 49);
    view.defPosition("j3", 546, 8, 49, 49);
    view.defPosition("a2", 6, 68, 49, 49);
    view.defPosition("b2", 66, 68, 49, 49);
    view.defPosition("c2", 126, 68, 49, 49);
    view.defPosition("d2", 186, 68, 49, 49);
    view.defPosition("e2", 246, 68, 49, 49);
    view.defPosition("f2", 306, 68, 49, 49);
    view.defPosition("g2", 366, 68, 49, 49);
    view.defPosition("h2", 426, 68, 49, 49);
    view.defPosition("i2", 486, 68, 49, 49);
    view.defPosition("j2", 546, 68, 49, 49);
    view.defPosition("a1", 6, 128, 49, 49);
    view.defPosition("b1", 66, 128, 49, 49);
    view.defPosition("c1", 126, 128, 49, 49);
    view.defPosition("d1", 186, 128, 49, 49);
    view.defPosition("e1", 246, 128, 49, 49);
    view.defPosition("f1", 306, 128, 49, 49);
    view.defPosition("g1", 366, 128, 49, 49);
    view.defPosition("h1", 426, 128, 49, 49);
    view.defPosition("i1", 486, 128, 49, 49);
    view.defPosition("j1", 546, 128, 49, 49);
}
