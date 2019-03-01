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
    design.checkVersion("show-captures", "false");

    design.addPlayer("X", []);
    design.addPlayer("O", []);

    design.addPosition("a3", []);
    design.addPosition("b3", []);
    design.addPosition("c3", []);
    design.addPosition("a2", []);
    design.addPosition("b2", []);
    design.addPosition("c2", []);
    design.addPosition("a1", []);
    design.addPosition("b1", []);
    design.addPosition("c1", []);

    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPriority(0);			// type-1
    design.addPriority(1);			// type-2
    design.addPriority(2);			// type-3
    design.addPriority(3);			// type-4

    design.addPiece("B1", 0);
    design.addDrop(0, 0, [], 0);

    design.addPiece("B2", 1);
    design.addDrop(1, 0, [], 1);

    design.addPiece("B3", 2);
    design.addDrop(2, 0, [], 2);

    design.addPiece("B4", 3);
    design.addDrop(3, 0, [], 3);

    design.reserve("X", "B1", 1);
    design.reserve("X", "B2", 1);
    design.reserve("X", "B3", 1);
    design.reserve("X", "B4", 1);
    design.reserve("O", "B1", 1);
    design.reserve("O", "B2", 1);
    design.reserve("O", "B3", 1);
    design.reserve("O", "B4", 1);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("XB1", "X B1");
    view.defPiece("OB1", "O B1");
    view.defPiece("XB2", "X B2");
    view.defPiece("OB2", "O B2");
    view.defPiece("XB3", "X B3");
    view.defPiece("OB3", "O B3");
    view.defPiece("XB4", "X B4");
    view.defPiece("OB4", "O B4");
 
    view.defPosition("a3", 20, 50, 150, 150);
    view.defPosition("b3", 210, 40, 150, 150);
    view.defPosition("c3", 400, 30, 150, 150);
    view.defPosition("a2", 20, 230, 150, 150);
    view.defPosition("b2", 210, 220, 150, 150);
    view.defPosition("c2", 400, 210, 150, 150);
    view.defPosition("a1", 20, 410, 150, 150);
    view.defPosition("b1", 210, 400, 150, 150);
    view.defPosition("c1", 400, 390, 150, 150);
}
