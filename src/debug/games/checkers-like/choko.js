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
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-captures", "false");
    design.checkVersion("show-drops", "true");
    design.checkVersion("shared-pieces", "true");
    design.checkVersion("pass-turn", "forced");

    design.addDirection("s");
    design.addDirection("e");
    design.addDirection("w");
    design.addDirection("n");

    design.addPlayer("White", [3, 2, 1, 0]);
    design.addPlayer("Black", [0, 1, 2, 3]);

    design.addPosition("a5", [5, 1, 0, 0]);
    design.addPosition("b5", [5, 1, -1, 0]);
    design.addPosition("c5", [5, 1, -1, 0]);
    design.addPosition("d5", [5, 1, -1, 0]);
    design.addPosition("e5", [5, 0, -1, 0]);
    design.addPosition("a4", [5, 1, 0, -5]);
    design.addPosition("b4", [5, 1, -1, -5]);
    design.addPosition("c4", [5, 1, -1, -5]);
    design.addPosition("d4", [5, 1, -1, -5]);
    design.addPosition("e4", [5, 0, -1, -5]);
    design.addPosition("a3", [5, 1, 0, -5]);
    design.addPosition("b3", [5, 1, -1, -5]);
    design.addPosition("c3", [5, 1, -1, -5]);
    design.addPosition("d3", [5, 1, -1, -5]);
    design.addPosition("e3", [5, 0, -1, -5]);
    design.addPosition("a2", [5, 1, 0, -5]);
    design.addPosition("b2", [5, 1, -1, -5]);
    design.addPosition("c2", [5, 1, -1, -5]);
    design.addPosition("d2", [5, 1, -1, -5]);
    design.addPosition("e2", [5, 0, -1, -5]);
    design.addPosition("a1", [0, 1, 0, -5]);
    design.addPosition("b1", [0, 1, -1, -5]);
    design.addPosition("c1", [0, 1, -1, -5]);
    design.addPosition("d1", [0, 1, -1, -5]);
    design.addPosition("e1", [0, 0, -1, -5]);

    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	26);	// capture
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	26);	// capture
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addPiece("Stone", 0);
    design.addDrop(0, 0, [], 0);
    design.addMove(0, 1, [3, 3], 0);
    design.addMove(0, 1, [0, 0], 0);
    design.addMove(0, 1, [2, 2], 0);
    design.addMove(0, 1, [1, 1], 0);
    design.addMove(0, 2, [3], 0);
    design.addMove(0, 2, [0], 0);
    design.addMove(0, 2, [2], 0);
    design.addMove(0, 2, [1], 0);
    design.addMove(0, 3, [], 1);

    design.reserve("Black", "Stone", 12);
    design.reserve("White", "Stone", 12);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteStone", "White Stone");
    view.defPiece("BlackStone", "Black Stone");
    view.defPiece("Ko", "Ko");
 
    view.defPosition("a5", 0, 0, 54, 54);
    view.defPosition("b5", 54, 0, 54, 54);
    view.defPosition("c5", 108, 0, 54, 54);
    view.defPosition("d5", 162, 0, 54, 54);
    view.defPosition("e5", 216, 0, 54, 54);
    view.defPosition("a4", 0, 54, 54, 54);
    view.defPosition("b4", 54, 54, 54, 54);
    view.defPosition("c4", 108, 54, 54, 54);
    view.defPosition("d4", 162, 54, 54, 54);
    view.defPosition("e4", 216, 54, 54, 54);
    view.defPosition("a3", 0, 108, 54, 54);
    view.defPosition("b3", 54, 108, 54, 54);
    view.defPosition("c3", 108, 108, 54, 54);
    view.defPosition("d3", 162, 108, 54, 54);
    view.defPosition("e3", 216, 108, 54, 54);
    view.defPosition("a2", 0, 162, 54, 54);
    view.defPosition("b2", 54, 162, 54, 54);
    view.defPosition("c2", 108, 162, 54, 54);
    view.defPosition("d2", 162, 162, 54, 54);
    view.defPosition("e2", 216, 162, 54, 54);
    view.defPosition("a1", 0, 216, 54, 54);
    view.defPosition("b1", 54, 216, 54, 54);
    view.defPosition("c1", 108, 216, 54, 54);
    view.defPosition("d1", 162, 216, 54, 54);
    view.defPosition("e1", 216, 216, 54, 54);
}
