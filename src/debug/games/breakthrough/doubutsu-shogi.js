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

    design.addDirection("s");
    design.addDirection("n");

    design.addPlayer("Green", [1, 0]);
    design.addPlayer("Red", [1, 0]);

    design.addPosition("r4", [5, 0]);
    design.addPosition("a4", [5, 0]);
    design.addPosition("b4", [5, 0]);
    design.addPosition("c4", [5, 0]);
    design.addPosition("g4", [5, 0]);
    design.addPosition("r3", [5, -5]);
    design.addPosition("a3", [5, -5]);
    design.addPosition("b3", [5, -5]);
    design.addPosition("c3", [5, -5]);
    design.addPosition("g3", [5, -5]);
    design.addPosition("r2", [5, -5]);
    design.addPosition("a2", [5, -5]);
    design.addPosition("b2", [5, -5]);
    design.addPosition("c2", [5, -5]);
    design.addPosition("g2", [5, -5]);
    design.addPosition("r1", [0, -5]);
    design.addPosition("a1", [0, -5]);
    design.addPosition("b1", [0, -5]);
    design.addPosition("c1", [0, -5]);
    design.addPosition("g1", [0, -5]);

    design.addZone("board-zone", 2, [16, 17, 18, 11, 12, 13, 6, 7, 8, 1, 2, 3]);
    design.addZone("board-zone", 1, [16, 17, 18, 11, 12, 13, 6, 7, 8, 1, 2, 3]);
    design.addZone("promotion-zone", 2, [16, 17, 18]);
    design.addZone("promotion-zone", 1, [1, 2, 3]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.IN_ZONE,	0);	// board-zone
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end


    design.addPiece("King", 0);
    design.addMove(0, 0, [1], 0);
    design.addMove(0, 0, [0], 0);

    design.addPiece("Za", 1);
    design.addMove(1, 0, [1], 0);
    design.addMove(1, 0, [0], 0);

    design.addPiece("Sang", 2);
    design.addMove(2, 0, [1], 0);
    design.addMove(2, 0, [0], 0);

    design.addPiece("Jang", 3);
    design.addMove(3, 0, [1], 0);
    design.addMove(3, 0, [0], 0);

    design.addPiece("Hu", 4);
    design.addMove(4, 0, [1], 0);
    design.addMove(4, 0, [0], 0);

    design.setup("Green", "Sang", 16);
    design.setup("Green", "King", 17);
    design.setup("Green", "Jang", 18);
    design.setup("Green", "Za", 12);
    design.setup("Red", "Sang", 3);
    design.setup("Red", "King", 2);
    design.setup("Red", "Jang", 1);
    design.setup("Red", "Za", 7);

    design.goal(0, "Green", "King", [1, 2, 3]);
    design.goal(1, "Red", "King", [16, 17, 18]);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("GreenKing", "Green King");
    view.defPiece("RedKing", "Red King");
    view.defPiece("GreenZa", "Green Za");
    view.defPiece("RedZa", "Red Za");
    view.defPiece("GreenSang", "Green Sang");
    view.defPiece("RedSang", "Red Sang");
    view.defPiece("GreenJang", "Green Jang");
    view.defPiece("RedJang", "Red Jang");
    view.defPiece("GreenHu", "Green Hu");
    view.defPiece("RedHu", "Red Hu");
 
    view.defPosition("r4", 12, 12, 103, 93);
    view.defPosition("a4", 105, 12, 103, 93);
    view.defPosition("b4", 198, 12, 103, 93);
    view.defPosition("c4", 291, 12, 103, 93);
    view.defPosition("g4", 384, 12, 103, 93);
    view.defPosition("r3", 12, 106, 103, 93);
    view.defPosition("a3", 105, 106, 103, 93);
    view.defPosition("b3", 198, 106, 103, 93);
    view.defPosition("c3", 291, 106, 103, 93);
    view.defPosition("g3", 384, 106, 103, 93);
    view.defPosition("r2", 12, 200, 103, 93);
    view.defPosition("a2", 105, 200, 103, 93);
    view.defPosition("b2", 198, 200, 103, 93);
    view.defPosition("c2", 291, 200, 103, 93);
    view.defPosition("g2", 384, 200, 103, 93);
    view.defPosition("r1", 12, 294, 103, 93);
    view.defPosition("a1", 105, 294, 103, 93);
    view.defPosition("b1", 198, 294, 103, 93);
    view.defPosition("c1", 291, 294, 103, 93);
    view.defPosition("g1", 384, 294, 103, 93);
}
