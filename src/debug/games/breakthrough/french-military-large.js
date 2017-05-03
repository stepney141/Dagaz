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
    design.checkVersion("z2j", "1");
    design.checkVersion("zrf", "3.0");
    design.checkVersion("highlight-goals", "false");
    design.checkVersion("ko", "situation");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("n");
    design.addDirection("ne");
    design.addDirection("se");
    design.addDirection("sw");
    design.addDirection("nw");

    design.addPlayer("Green", [1, 0, 3, 2, 6, 7, 4, 5]);
    design.addPlayer("Red", [0, 1, 2, 3, 4, 5, 6, 7]);

    design.addPosition("a7", [null, null, null, null, null, null, null, null]);
    design.addPosition("b7", [0, 0, 3, 0, 0, 4, 2, 0]);
    design.addPosition("c7", [null, null, null, null, null, null, null, null]);
    design.addPosition("a6", [0, 1, 3, 0, -2, 4, 0, 0]);
    design.addPosition("b6", [-1, 1, 3, -3, 0, 0, 0, 0]);
    design.addPosition("c6", [-1, 0, 3, 0, 0, 0, 2, -4]);
    design.addPosition("a5", [0, 1, 3, -3, 0, 0, 0, 0]);
    design.addPosition("b5", [-1, 1, 3, -3, -2, 4, 2, -4]);
    design.addPosition("c5", [-1, 0, 3, -3, 0, 0, 0, 0]);
    design.addPosition("a4", [0, 1, 3, -3, -2, 4, 0, 0]);
    design.addPosition("b4", [-1, 1, 3, -3, 0, 0, 0, 0]);
    design.addPosition("c4", [-1, 0, 3, -3, 0, 0, 2, -4]);
    design.addPosition("a3", [0, 1, 3, -3, 0, 0, 0, 0]);
    design.addPosition("b3", [-1, 1, 3, -3, -2, 4, 2, -4]);
    design.addPosition("c3", [-1, 0, 3, -3, 0, 0, 0, 0]);
    design.addPosition("a2", [0, 1, 0, -3, -2, 4, 0, 0]);
    design.addPosition("b2", [-1, 1, 3, -3, 0, 0, 0, 0]);
    design.addPosition("c2", [-1, 0, 0, -3, 0, 0, 2, -4]);
    design.addPosition("a1", [null, null, null, null, null, null, null, null]);
    design.addPosition("b1", [0, 0, 0, -3, -2, 0, 0, -4]);
    design.addPosition("c1", [null, null, null, null, null, null, null, null]);


    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end


    design.addPiece("RedPiece", 0);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [2], 0);
    design.addMove(0, 0, [1], 0);
    design.addMove(0, 0, [0], 0);
    design.addMove(0, 0, [7], 0);
    design.addMove(0, 0, [4], 0);
    design.addMove(0, 0, [6], 0);
    design.addMove(0, 0, [5], 0);

    design.addPiece("GreenPiece", 1);
    design.addMove(1, 0, [3], 0);
    design.addMove(1, 0, [1], 0);
    design.addMove(1, 0, [0], 0);
    design.addMove(1, 0, [7], 0);
    design.addMove(1, 0, [4], 0);

    design.setup("Green", "GreenPiece", 15);
    design.setup("Green", "GreenPiece", 19);
    design.setup("Green", "GreenPiece", 17);
    design.setup("Red", "RedPiece", 10);

    design.goal(0, "Red", "RedPiece", [19]);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("RedRedPiece", "Red RedPiece");
    view.defPiece("GreenGreenPiece", "Green GreenPiece");
 
    view.defPosition("a7", 5, 5, 48, 48);
    view.defPosition("b7", 69, 5, 48, 48);
    view.defPosition("c7", 133, 5, 48, 48);
    view.defPosition("a6", 5, 69, 48, 48);
    view.defPosition("b6", 69, 69, 48, 48);
    view.defPosition("c6", 133, 69, 48, 48);
    view.defPosition("a5", 5, 133, 48, 48);
    view.defPosition("b5", 69, 133, 48, 48);
    view.defPosition("c5", 133, 133, 48, 48);
    view.defPosition("a4", 5, 197, 48, 48);
    view.defPosition("b4", 69, 197, 48, 48);
    view.defPosition("c4", 133, 197, 48, 48);
    view.defPosition("a3", 5, 261, 48, 48);
    view.defPosition("b3", 69, 261, 48, 48);
    view.defPosition("c3", 133, 261, 48, 48);
    view.defPosition("a2", 5, 325, 48, 48);
    view.defPosition("b2", 69, 325, 48, 48);
    view.defPosition("c2", 133, 325, 48, 48);
    view.defPosition("a1", 5, 389, 48, 48);
    view.defPosition("b1", 69, 389, 48, 48);
    view.defPosition("c1", 133, 389, 48, 48);
}
