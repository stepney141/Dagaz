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
    design.checkVersion("smart-moves", "from");
    design.checkVersion("pass-turn", "forced");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-drops", "true");
    design.checkVersion("advisor-wait", "5");

    design.addDirection("nx"); // 0
    design.addDirection("bx"); // 1
    design.addDirection("wx"); // 2
    design.addDirection("wn"); // 3
    design.addDirection("bn"); // 4

    design.addPlayer("White", [0, 1, 2, 3, 4]);
    design.addPlayer("Black", [0, 2, 1, 4, 3]);
    design.addRandom(1, [0]);
    design.addRandom(1, [0]);
    design.addTurn(1, [1, 2, 3, 4, 5, 6]);
    design.addRandom(2, [0]);
    design.addRandom(2, [0]);
    design.addTurn(2, [1, 2, 3, 4, 5, 6]);

    design.addPosition("m1", [35, 34, 26, 12, 1]);
    design.addPosition("l1", [0, 0, 0, -1, 1]);
    design.addPosition("k1", [0, 0, 0, -1, 1]);
    design.addPosition("j1", [0, 0, 0, -1, 1]);
    design.addPosition("h1", [0, 0, 0, -1, 1]);
    design.addPosition("g1", [0, 0, 0, -1, 1]);
    design.addPosition("f1", [0, 0, 0, -1, 1]);
    design.addPosition("e1", [0, 0, 0, -1, 1]);
    design.addPosition("d1", [0, 0, 0, -1, 1]);
    design.addPosition("c1", [0, 0, 0, -1, 1]);
    design.addPosition("b1", [0, 0, 0, -1, 1]);
    design.addPosition("a1", [0, 0, 0, -1, 13]);
    design.addPosition("m2", [0, 0, 0, 1, -12]);
    design.addPosition("l2", [0, 0, 0, 1, -1]);
    design.addPosition("k2", [0, 0, 0, 1, -1]);
    design.addPosition("j2", [0, 0, 0, 1, -1]);
    design.addPosition("h2", [0, 0, 0, 1, -1]);
    design.addPosition("g2", [0, 0, 0, 1, -1]);
    design.addPosition("f2", [0, 0, 0, 1, -1]);
    design.addPosition("e2", [0, 0, 0, 1, -1]);
    design.addPosition("d2", [0, 0, 0, 1, -1]);
    design.addPosition("c2", [0, 0, 0, 1, -1]);
    design.addPosition("b2", [0, 0, 0, 1, -1]);
    design.addPosition("a2", [0, 0, 0, 2, -1]);
    design.addPosition("H2", [0, 0, 0, 0, 0]);
    design.addPosition("H1", [0, 0, 0, 0, 0]);
    design.addPosition("B9", [0, 0, 1, -15, -3]);
    design.addPosition("B8", [0, -1, 1, -16, -4]);
    design.addPosition("B7", [0, -1, 1, -17, -5]);
    design.addPosition("B6", [0, -1, 1, -18, -6]);
    design.addPosition("B5", [0, -1, 1, -19, -7]);
    design.addPosition("B4", [0, -1, 1, -20, -8]);
    design.addPosition("B3", [0, -1, 1, -21, -9]);
    design.addPosition("B2", [0, -1, 1, -22, -10]);
    design.addPosition("B1", [0, -1, 0, -23, -11]);
    design.addPosition("D1", [1, 0, 0, 0, 0]);
    design.addPosition("D2", [1, 0, 0, 0, 0]);
    design.addPosition("D3", [1, 0, 0, 0, 0]);
    design.addPosition("D4", [0, 0, 0, 0, 0]);

    design.addZone("home", 1, [23, 22, 21, 20, 19, 18, 25, 24]);
    design.addZone("home", 2, [11, 10, 9, 8, 7, 6, 25, 24]);
    design.addZone("dice", 1, [37, 38]);
    design.addZone("dice", 2, [35, 36]);
    design.addZone("bar", 1, [34, 33, 32, 31, 30, 29, 28, 27, 26]);
    design.addZone("bar", 2, [34, 33, 32, 31, 30, 29, 28, 27, 26]);
    design.addZone("out", 1, [25, 24]);
    design.addZone("out", 2, [25, 24]);
    design.addZone("top", 1, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 24]);
    design.addZone("top", 2, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 24]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.IN_ZONE,	1);	// dice
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addPiece("Man", 0);
    design.addMove(0, 0, [3], 1);
    design.addMove(0, 1, [3], 2);
    design.addMove(0, 2, [3], 3);
    design.addMove(0, 3, [3], 4);
    design.addMove(0, 4, [3], 5);
    design.addMove(0, 5, [3], 6);

    design.addPiece("D1", 1, 1);
    design.addDrop(1, 6, [], 0);
    design.addPiece("D2", 2, 2);
    design.addDrop(2, 6, [], 0);
    design.addPiece("D3", 3, 3);
    design.addDrop(3, 6, [], 0);
    design.addPiece("D4", 4, 4);
    design.addDrop(4, 6, [], 0);
    design.addPiece("D5", 5, 5);
    design.addDrop(5, 6, [], 0);
    design.addPiece("D6", 6, 6);
    design.addDrop(6, 6, [], 0);

    design.setup("White", "Man", 11);
    design.setup("White", "Man", 10);
    design.setup("White", "Man", 9);
    design.setup("Black", "Man", 23);
    design.setup("Black", "Man", 22);
    design.setup("Black", "Man", 21);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
    view.defPiece("WhiteD1", "White D1");
    view.defPiece("BlackD1", "Black D1");
    view.defPiece("WhiteD2", "White D2");
    view.defPiece("BlackD2", "Black D2");
    view.defPiece("WhiteD3", "White D3");
    view.defPiece("BlackD3", "Black D3");
    view.defPiece("WhiteD4", "White D4");
    view.defPiece("BlackD4", "Black D4");
    view.defPiece("WhiteD5", "White D5");
    view.defPiece("BlackD5", "Black D5");
    view.defPiece("WhiteD6", "White D6");
    view.defPiece("BlackD6", "Black D6");
 
    view.defPosition("m1", 9, 10, 34, 150);
    view.defPosition("l1", 43, 10, 34, 150);
    view.defPosition("k1", 77, 10, 34, 150);
    view.defPosition("j1", 111, 10, 34, 150);
    view.defPosition("h1", 145, 10, 34, 150);
    view.defPosition("g1", 179, 10, 34, 150);
    view.defPosition("f1", 237, 10, 34, 150);
    view.defPosition("e1", 271, 10, 34, 150);
    view.defPosition("d1", 305, 10, 34, 150);
    view.defPosition("c1", 339, 10, 34, 150);
    view.defPosition("b1", 373, 10, 34, 150);
    view.defPosition("a1", 407, 10, 34, 150);
    view.defPosition("m2", 9, 190, 34, 150);
    view.defPosition("l2", 43, 190, 34, 150);
    view.defPosition("k2", 77, 190, 34, 150);
    view.defPosition("j2", 111, 190, 34, 150);
    view.defPosition("h2", 145, 190, 34, 150);
    view.defPosition("g2", 179, 190, 34, 150);
    view.defPosition("f2", 237, 190, 34, 150);
    view.defPosition("e2", 271, 190, 34, 150);
    view.defPosition("d2", 305, 190, 34, 150);
    view.defPosition("c2", 339, 190, 34, 150);
    view.defPosition("b2", 373, 190, 34, 150);
    view.defPosition("a2", 407, 190, 34, 150);
    view.defPosition("H2", 456, 10, 40, 150);
    view.defPosition("H1", 456, 190, 40, 150);
    view.defPosition("B9", 210, 40, 30, 30);
    view.defPosition("B8", 210, 70, 30, 30);
    view.defPosition("B7", 210, 100, 30, 30);
    view.defPosition("B6", 210, 130, 30, 30);
    view.defPosition("B5", 210, 160, 30, 30);
    view.defPosition("B4", 210, 190, 30, 30);
    view.defPosition("B3", 210, 220, 30, 30);
    view.defPosition("B2", 210, 250, 30, 30);
    view.defPosition("B1", 210, 280, 30, 30);
    view.defPosition("D1", 77, 160, 34, 29);
    view.defPosition("D2", 111, 160, 34, 29);
    view.defPosition("D3", 305, 160, 34, 29);
    view.defPosition("D4", 339, 160, 34, 29);
}
