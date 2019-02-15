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
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-captures", "false");
    design.checkVersion("smart-moves", "false");
    design.checkVersion("pass-partial", "true");
    design.checkVersion("detect-loops", "true");
    design.checkVersion("advisor-wait", "5");

    design.addDirection("se"); // 0
    design.addDirection("sw"); // 1
    design.addDirection("ne"); // 2
    design.addDirection("nw"); // 3

    design.addPlayer("Black", [3, 2, 1, 0]);
    design.addPlayer("White", [3, 2, 1, 0]);

    design.addPosition("a5", [6, 0, 0, 0]);
    design.addPosition("b5", [6, 4, 0, 0]);
    design.addPosition("c5", [6, 4, 0, 0]);
    design.addPosition("d5", [6, 4, 0, 0]);
    design.addPosition("e5", [0, 4, 0, 0]);
    design.addPosition("a4", [6, 0, -4, 0]);
    design.addPosition("b4", [6, 4, -4, -6]);
    design.addPosition("c4", [6, 4, -4, -6]);
    design.addPosition("d4", [6, 4, -4, -6]);
    design.addPosition("e4", [0, 4, 0, -6]);
    design.addPosition("a3", [6, 0, -4, 0]);
    design.addPosition("b3", [6, 4, -4, -6]);
    design.addPosition("c3", [6, 4, -4, -6]);
    design.addPosition("d3", [6, 4, -4, -6]);
    design.addPosition("e3", [0, 4, 0, -6]);
    design.addPosition("a2", [6, 0, -4, 0]);
    design.addPosition("b2", [6, 4, -4, -6]);
    design.addPosition("c2", [6, 4, -4, -6]);
    design.addPosition("d2", [6, 4, -4, -6]);
    design.addPosition("e2", [0, 4, 0, -6]);
    design.addPosition("a1", [0, 0, -4, 0]);
    design.addPosition("b1", [0, 0, -4, -6]);
    design.addPosition("c1", [0, 0, -4, -6]);
    design.addPosition("d1", [0, 0, -4, -6]);
    design.addPosition("e1", [0, 0, 0, -6]);

    design.addZone("goal", 2, [20]);
    design.addZone("goal", 1, [4]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.MODE,	0);	// continue-type
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addPiece("Stone", 0, 10);
    design.addMove(0, 0, [2], 0);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [0], 0);
    design.addMove(0, 1, [2], 1);
    design.addMove(0, 1, [3], 1);
    design.addMove(0, 1, [0], 1);

    design.setup("Black", "Stone", 20);
    design.setup("Black", "Stone", 21);
    design.setup("Black", "Stone", 22);
    design.setup("Black", "Stone", 23);
    design.setup("Black", "Stone", 15);
    design.setup("Black", "Stone", 16);
    design.setup("Black", "Stone", 17);
    design.setup("Black", "Stone", 10);
    design.setup("Black", "Stone", 11);
    design.setup("Black", "Stone", 5);
    design.setup("White", "Stone", 1);
    design.setup("White", "Stone", 2);
    design.setup("White", "Stone", 3);
    design.setup("White", "Stone", 4);
    design.setup("White", "Stone", 7);
    design.setup("White", "Stone", 8);
    design.setup("White", "Stone", 9);
    design.setup("White", "Stone", 13);
    design.setup("White", "Stone", 14);
    design.setup("White", "Stone", 19);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteStone", "White Stone");
    view.defPiece("BlackStone", "Black Stone");
 
    view.defPosition("a5", 33, 33, 40, 40);
    view.defPosition("b5", 99, 33, 40, 40);
    view.defPosition("c5", 165, 33, 40, 40);
    view.defPosition("d5", 231, 33, 40, 40);
    view.defPosition("e5", 297, 33, 40, 40);
    view.defPosition("a4", 33, 99, 40, 40);
    view.defPosition("b4", 99, 99, 40, 40);
    view.defPosition("c4", 165, 99, 40, 40);
    view.defPosition("d4", 231, 99, 40, 40);
    view.defPosition("e4", 297, 99, 40, 40);
    view.defPosition("a3", 33, 165, 40, 40);
    view.defPosition("b3", 99, 165, 40, 40);
    view.defPosition("c3", 165, 165, 40, 40);
    view.defPosition("d3", 231, 165, 40, 40);
    view.defPosition("e3", 297, 165, 40, 40);
    view.defPosition("a2", 33, 231, 40, 40);
    view.defPosition("b2", 99, 231, 40, 40);
    view.defPosition("c2", 165, 231, 40, 40);
    view.defPosition("d2", 231, 231, 40, 40);
    view.defPosition("e2", 297, 231, 40, 40);
    view.defPosition("a1", 33, 297, 40, 40);
    view.defPosition("b1", 99, 297, 40, 40);
    view.defPosition("c1", 165, 297, 40, 40);
    view.defPosition("d1", 231, 297, 40, 40);
    view.defPosition("e1", 297, 297, 40, 40);
}
