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
    design.checkVersion("prevent-flipping", "2");
    design.checkVersion("smart-moves", "true");
    design.checkVersion("animate-captures", "false");
    design.checkVersion("show-hints", "false");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("n");

    design.addPlayer("You", [1, 0, 3, 2]);

    design.addPosition("a7", [0, 1, 2, 3]);
    design.addPosition("b7", [0, 1, 2, 3]);
    design.addPosition("c7", [0, 1, 7, 0]);
    design.addPosition("d7", [-1, 1, 7, 0]);
    design.addPosition("e7", [-1, 0, 7, 0]);
    design.addPosition("f7", [0, 1, 2, 3]);
    design.addPosition("g7", [0, 1, 2, 3]);
    design.addPosition("a6", [0, 1, 2, 3]);
    design.addPosition("b6", [0, 1, 2, 3]);
    design.addPosition("c6", [0, 1, 7, -7]);
    design.addPosition("d6", [-1, 1, 7, -7]);
    design.addPosition("e6", [-1, 0, 7, -7]);
    design.addPosition("f6", [0, 1, 2, 3]);
    design.addPosition("g6", [0, 1, 2, 3]);
    design.addPosition("a5", [0, 1, 7, 0]);
    design.addPosition("b5", [-1, 1, 7, 0]);
    design.addPosition("c5", [-1, 1, 7, -7]);
    design.addPosition("d5", [-1, 1, 7, -7]);
    design.addPosition("e5", [-1, 1, 7, -7]);
    design.addPosition("f5", [-1, 1, 7, 0]);
    design.addPosition("g5", [-1, 0, 7, 0]);
    design.addPosition("a4", [0, 1, 7, -7]);
    design.addPosition("b4", [-1, 1, 7, -7]);
    design.addPosition("c4", [-1, 1, 7, -7]);
    design.addPosition("d4", [-1, 1, 7, -7]);
    design.addPosition("e4", [-1, 1, 7, -7]);
    design.addPosition("f4", [-1, 1, 7, -7]);
    design.addPosition("g4", [-1, 0, 7, -7]);
    design.addPosition("a3", [0, 1, 0, -7]);
    design.addPosition("b3", [-1, 1, 0, -7]);
    design.addPosition("c3", [-1, 1, 7, -7]);
    design.addPosition("d3", [-1, 1, 7, -7]);
    design.addPosition("e3", [-1, 1, 7, -7]);
    design.addPosition("f3", [-1, 1, 0, -7]);
    design.addPosition("g3", [-1, 0, 0, -7]);
    design.addPosition("a2", [0, 1, 2, 3]);
    design.addPosition("b2", [0, 1, 2, 3]);
    design.addPosition("c2", [0, 1, 7, -7]);
    design.addPosition("d2", [-1, 1, 7, -7]);
    design.addPosition("e2", [-1, 0, 7, -7]);
    design.addPosition("f2", [0, 1, 2, 3]);
    design.addPosition("g2", [0, 1, 2, 3]);
    design.addPosition("a1", [0, 1, 2, 3]);
    design.addPosition("b1", [0, 1, 2, 3]);
    design.addPosition("c1", [0, 1, 0, -7]);
    design.addPosition("d1", [-1, 1, 0, -7]);
    design.addPosition("e1", [-1, 0, 0, -7]);
    design.addPosition("f1", [0, 1, 2, 3]);
    design.addPosition("g1", [0, 1, 2, 3]);


    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	26);	// capture
    design.addCommand(0, ZRF.PARAM,	1);	// $2
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end


    design.addPiece("Stone", 0);
    design.addMove(0, 0, [3, 3], 0);
    design.addMove(0, 0, [1, 1], 0);
    design.addMove(0, 0, [2, 2], 0);
    design.addMove(0, 0, [0, 0], 0);

    design.setup("You", "Stone", 28);
    design.setup("You", "Stone", 21);
    design.setup("You", "Stone", 14);
    design.setup("You", "Stone", 29);
    design.setup("You", "Stone", 22);
    design.setup("You", "Stone", 15);
    design.setup("You", "Stone", 44);
    design.setup("You", "Stone", 37);
    design.setup("You", "Stone", 30);
    design.setup("You", "Stone", 23);
    design.setup("You", "Stone", 16);
    design.setup("You", "Stone", 9);
    design.setup("You", "Stone", 2);
    design.setup("You", "Stone", 45);
    design.setup("You", "Stone", 38);
    design.setup("You", "Stone", 31);
    design.setup("You", "Stone", 17);
    design.setup("You", "Stone", 10);
    design.setup("You", "Stone", 3);
    design.setup("You", "Stone", 46);
    design.setup("You", "Stone", 39);
    design.setup("You", "Stone", 32);
    design.setup("You", "Stone", 25);
    design.setup("You", "Stone", 18);
    design.setup("You", "Stone", 11);
    design.setup("You", "Stone", 4);
    design.setup("You", "Stone", 33);
    design.setup("You", "Stone", 26);
    design.setup("You", "Stone", 19);
    design.setup("You", "Stone", 34);
    design.setup("You", "Stone", 27);
    design.setup("You", "Stone", 20);

}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("YouStone", "You Stone");
 
    view.defPosition("a7", 20, 23, 97, 97);
    view.defPosition("b7", 117, 23, 97, 97);
    view.defPosition("c7", 214, 23, 97, 97);
    view.defPosition("d7", 311, 23, 97, 97);
    view.defPosition("e7", 408, 23, 97, 97);
    view.defPosition("f7", 505, 23, 97, 97);
    view.defPosition("g7", 602, 23, 97, 97);
    view.defPosition("a6", 20, 120, 97, 97);
    view.defPosition("b6", 117, 120, 97, 97);
    view.defPosition("c6", 214, 120, 97, 97);
    view.defPosition("d6", 311, 120, 97, 97);
    view.defPosition("e6", 408, 120, 97, 97);
    view.defPosition("f6", 505, 120, 97, 97);
    view.defPosition("g6", 602, 120, 97, 97);
    view.defPosition("a5", 20, 217, 97, 97);
    view.defPosition("b5", 117, 217, 97, 97);
    view.defPosition("c5", 214, 217, 97, 97);
    view.defPosition("d5", 311, 217, 97, 97);
    view.defPosition("e5", 408, 217, 97, 97);
    view.defPosition("f5", 505, 217, 97, 97);
    view.defPosition("g5", 602, 217, 97, 97);
    view.defPosition("a4", 20, 314, 97, 97);
    view.defPosition("b4", 117, 314, 97, 97);
    view.defPosition("c4", 214, 314, 97, 97);
    view.defPosition("d4", 311, 314, 97, 97);
    view.defPosition("e4", 408, 314, 97, 97);
    view.defPosition("f4", 505, 314, 97, 97);
    view.defPosition("g4", 602, 314, 97, 97);
    view.defPosition("a3", 20, 411, 97, 97);
    view.defPosition("b3", 117, 411, 97, 97);
    view.defPosition("c3", 214, 411, 97, 97);
    view.defPosition("d3", 311, 411, 97, 97);
    view.defPosition("e3", 408, 411, 97, 97);
    view.defPosition("f3", 505, 411, 97, 97);
    view.defPosition("g3", 602, 411, 97, 97);
    view.defPosition("a2", 20, 508, 97, 97);
    view.defPosition("b2", 117, 508, 97, 97);
    view.defPosition("c2", 214, 508, 97, 97);
    view.defPosition("d2", 311, 508, 97, 97);
    view.defPosition("e2", 408, 508, 97, 97);
    view.defPosition("f2", 505, 508, 97, 97);
    view.defPosition("g2", 602, 508, 97, 97);
    view.defPosition("a1", 20, 605, 97, 97);
    view.defPosition("b1", 117, 605, 97, 97);
    view.defPosition("c1", 214, 605, 97, 97);
    view.defPosition("d1", 311, 605, 97, 97);
    view.defPosition("e1", 408, 605, 97, 97);
    view.defPosition("f1", 505, 605, 97, 97);
    view.defPosition("g1", 602, 605, 97, 97);
}
