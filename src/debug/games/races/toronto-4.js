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
    design.addDirection("d");

    design.addPlayer("You", [0, 1, 2, 3, 4]);

    design.addPosition("a5", [0, 4, 0, 17, 18, 19]);
    design.addPosition("b5", [0, 4, 15, 0, 17, 18]);
    design.addPosition("c5", [0, 4, 14, 15, 0, 17]);
    design.addPosition("d5", [0, 4, 13, 14, 15, 0]);
    design.addPosition("a4", [-4, 4, 0, 13, 14, 15]);
    design.addPosition("b4", [-4, 4, 11, 0, 13, 14]);
    design.addPosition("c4", [-4, 4, 10, 11, 0, 13]);
    design.addPosition("d4", [-4, 4, 9, 10, 11, 0]);
    design.addPosition("a3", [-4, 4, 0, 9, 10, 11]);
    design.addPosition("b3", [-4, 4, 7, 0, 9, 10]);
    design.addPosition("c3", [-4, 4, 6, 7, 0, 9]);
    design.addPosition("d3", [-4, 4, 5, 6, 7, 0]);
    design.addPosition("a2", [-4, 4, 0, 5, 6, 7]);
    design.addPosition("b2", [-4, 4, 3, 0, 5, 6]);
    design.addPosition("c2", [-4, 4, 2, 3, 0, 5]);
    design.addPosition("d2", [-4, 4, 1, 2, 3, 0]);
    design.addPosition("a1", [-4, 0, 0, 1, 2, 3]);
    design.addPosition("b1", [-4, 0, -1, 0, 1, 2]);
    design.addPosition("c1", [-4, 0, -2, -1, 0, 1]);
    design.addPosition("d1", [-4, 0, -3, -2, -1, 0]);

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

    design.addPiece("R2", 2);
    design.addMove(2, 0, [2, 0], 0);
    design.addMove(2, 0, [3, 0], 0);
    design.addMove(2, 0, [4, 0], 0);
    design.addMove(2, 0, [5, 0], 0);

    design.addPiece("B2", 3);
    design.addMove(3, 0, [2, 0], 0);
    design.addMove(3, 0, [3, 0], 0);
    design.addMove(3, 0, [4, 0], 0);
    design.addMove(3, 0, [5, 0], 0);

    design.addPiece("R3", 4);
    design.addMove(4, 0, [2, 0], 0);
    design.addMove(4, 0, [3, 0], 0);
    design.addMove(4, 0, [4, 0], 0);
    design.addMove(4, 0, [5, 0], 0);

    design.addPiece("B3", 5);
    design.addMove(5, 0, [2, 0], 0);
    design.addMove(5, 0, [3, 0], 0);
    design.addMove(5, 0, [4, 0], 0);
    design.addMove(5, 0, [5, 0], 0);

    design.addPiece("R4", 6);
    design.addMove(6, 0, [2, 0], 0);
    design.addMove(6, 0, [3, 0], 0);
    design.addMove(6, 0, [4, 0], 0);
    design.addMove(6, 0, [5, 0], 0);

    design.addPiece("B4", 7);
    design.addMove(7, 0, [2, 0], 0);
    design.addMove(7, 0, [3, 0], 0);
    design.addMove(7, 0, [4, 0], 0);
    design.addMove(7, 0, [5, 0], 0);

    design.addPiece("R5", 8);
    design.addMove(8, 0, [2, 0], 0);
    design.addMove(8, 0, [3, 0], 0);
    design.addMove(8, 0, [4, 0], 0);
    design.addMove(8, 0, [5, 0], 0);

    design.addPiece("B5", 9);
    design.addMove(9, 0, [2, 0], 0);
    design.addMove(9, 0, [3, 0], 0);
    design.addMove(9, 0, [4, 0], 0);
    design.addMove(9, 0, [5, 0], 0);

    design.setup("You", "B5", 16);
    design.setup("You", "R5", 19);
    design.setup("You", "R4", 12);
    design.setup("You", "B4", 15);
    design.setup("You", "B3", 8);
    design.setup("You", "R3", 11);
    design.setup("You", "R2", 4);
    design.setup("You", "B2", 7);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("YouR2", "You R2");
    view.defPiece("YouB2", "You B2");
    view.defPiece("YouR3", "You R3");
    view.defPiece("YouB3", "You B3");
    view.defPiece("YouR4", "You R4");
    view.defPiece("YouB4", "You B4");
    view.defPiece("YouR5", "You R5");
    view.defPiece("YouB5", "You B5");
 
    view.defPosition("a5", 9, 11, 150, 20);
    view.defPosition("b5", 181, 11, 150, 20);
    view.defPosition("c5", 353, 11, 150, 20);
    view.defPosition("d5", 525, 11, 150, 20);
    view.defPosition("a4", 9, 32, 150, 20);
    view.defPosition("b4", 181, 32, 150, 20);
    view.defPosition("c4", 353, 32, 150, 20);
    view.defPosition("d4", 525, 32, 150, 20);
    view.defPosition("a3", 9, 53, 150, 20);
    view.defPosition("b3", 181, 53, 150, 20);
    view.defPosition("c3", 353, 53, 150, 20);
    view.defPosition("d3", 525, 53, 150, 20);
    view.defPosition("a2", 9, 74, 150, 20);
    view.defPosition("b2", 181, 74, 150, 20);
    view.defPosition("c2", 353, 74, 150, 20);
    view.defPosition("d2", 525, 74, 150, 20);
    view.defPosition("a1", 9, 95, 150, 20);
    view.defPosition("b1", 181, 95, 150, 20);
    view.defPosition("c1", 353, 95, 150, 20);
    view.defPosition("d1", 525, 95, 150, 20);
}
