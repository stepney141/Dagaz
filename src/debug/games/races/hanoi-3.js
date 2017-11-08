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
    design.checkVersion("smart-moves", "true");
    design.checkVersion("show-blink", "false");
    design.checkVersion("hanoi-extension", "true");

    design.addDirection("up");
    design.addDirection("dn");
    design.addDirection("a");
    design.addDirection("b");
    design.addDirection("c");

    design.addPlayer("You", [1, 0, 2, 3, 4]);

    design.addPosition("a5", [0, 3, 0, 13, 14]);
    design.addPosition("b5", [0, 3, 11, 0, 13]);
    design.addPosition("c5", [0, 3, 10, 11, 0]);
    design.addPosition("a4", [-3, 3, 0, 10, 11]);
    design.addPosition("b4", [-3, 3, 8, 0, 10]);
    design.addPosition("c4", [-3, 3, 7, 8, 0]);
    design.addPosition("a3", [-3, 3, 0, 7, 8]);
    design.addPosition("b3", [-3, 3, 5, 0, 7]);
    design.addPosition("c3", [-3, 3, 4, 5, 0]);
    design.addPosition("a2", [-3, 3, 0, 4, 5]);
    design.addPosition("b2", [-3, 3, 2, 0, 4]);
    design.addPosition("c2", [-3, 3, 1, 2, 0]);
    design.addPosition("a1", [-3, 0, 0, 1, 2]);
    design.addPosition("b1", [-3, 0, -1, 0, 1]);
    design.addPosition("c1", [-3, 0, -2, -1, 0]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.IF,	4);
    design.addCommand(0, ZRF.PARAM,	1);	// $2
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.JUMP,	-4);
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("B3", 5);
    design.addMove(5, 0, [2, 0], 0);
    design.addMove(5, 0, [3, 0], 0);
    design.addMove(5, 0, [4, 0], 0);

    design.addPiece("B4", 7);
    design.addMove(7, 0, [2, 0], 0);
    design.addMove(7, 0, [3, 0], 0);
    design.addMove(7, 0, [4, 0], 0);

    design.addPiece("B5", 9);
    design.addMove(9, 0, [2, 0], 0);
    design.addMove(9, 0, [3, 0], 0);
    design.addMove(9, 0, [4, 0], 0);

    design.setup("You", "B5", 12);
    design.setup("You", "B4", 9);
    design.setup("You", "B3", 6);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("YouB3", "You B3");
    view.defPiece("YouB4", "You B4");
    view.defPiece("YouB5", "You B5");
 
    view.defPosition("a5", 9, 11, 150, 20);
    view.defPosition("b5", 181, 11, 150, 20);
    view.defPosition("c5", 353, 11, 150, 20);
    view.defPosition("a4", 9, 32, 150, 20);
    view.defPosition("b4", 181, 32, 150, 20);
    view.defPosition("c4", 353, 32, 150, 20);
    view.defPosition("a3", 9, 53, 150, 20);
    view.defPosition("b3", 181, 53, 150, 20);
    view.defPosition("c3", 353, 53, 150, 20);
    view.defPosition("a2", 9, 74, 150, 20);
    view.defPosition("b2", 181, 74, 150, 20);
    view.defPosition("c2", 353, 74, 150, 20);
    view.defPosition("a1", 9, 95, 150, 20);
    view.defPosition("b1", 181, 95, 150, 20);
    view.defPosition("c1", 353, 95, 150, 20);
}
