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

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("n");
    design.addDirection("ne");
    design.addDirection("sw");
    design.addDirection("nw");
    design.addDirection("se");

    design.addPlayer("Black", [1, 0, 3, 2, 5, 4, 7, 6]);
    design.addPlayer("White", [0, 1, 2, 3, 4, 5, 6, 7]);

    design.addPosition("a13", [0, 1, 6, 0, 0, 0, 0, 42]);
    design.addPosition("b13", [-1, 1, 6, 0, 0, 41, 0, 42]);
    design.addPosition("c13", [-1, 1, 6, 0, 0, 41, 0, 42]);
    design.addPosition("d13", [-1, 1, 6, 0, 0, 41, 0, 42]);
    design.addPosition("e13", [-1, 1, 6, 0, 0, 41, 0, 42]);
    design.addPosition("f13", [-1, 0, 6, 0, 0, 41, 0, 0]);
    design.addPosition("a11", [0, 1, 6, -6, 36, 0, 0, 41]);
    design.addPosition("b11", [-1, 1, 6, -6, 36, 40, 35, 41]);
    design.addPosition("c11", [-1, 1, 6, -6, 36, 40, 35, 41]);
    design.addPosition("d11", [-1, 1, 6, -6, 36, 40, 35, 41]);
    design.addPosition("e11", [-1, 1, 6, -6, 36, 40, 35, 41]);
    design.addPosition("f11", [-1, 0, 6, -6, 0, 40, 35, 0]);
    design.addPosition("a9", [0, 1, 6, -6, 35, 0, 0, 40]);
    design.addPosition("b9", [-1, 1, 6, -6, 35, 39, 34, 40]);
    design.addPosition("c9", [-1, 1, 6, -6, 35, 39, 34, 40]);
    design.addPosition("d9", [-1, 1, 6, -6, 35, 39, 34, 40]);
    design.addPosition("e9", [-1, 1, 6, -6, 35, 39, 34, 40]);
    design.addPosition("f9", [-1, 0, 6, -6, 0, 39, 34, 0]);
    design.addPosition("a7", [0, 1, 6, -6, 34, 0, 0, 39]);
    design.addPosition("b7", [-1, 1, 6, -6, 34, 38, 33, 39]);
    design.addPosition("c7", [-1, 1, 6, -6, 34, 38, 33, 39]);
    design.addPosition("d7", [-1, 1, 6, -6, 34, 38, 33, 39]);
    design.addPosition("e7", [-1, 1, 6, -6, 34, 38, 33, 39]);
    design.addPosition("f7", [-1, 0, 6, -6, 0, 38, 33, 0]);
    design.addPosition("a5", [0, 1, 6, -6, 33, 0, 0, 38]);
    design.addPosition("b5", [-1, 1, 6, -6, 33, 37, 32, 38]);
    design.addPosition("c5", [-1, 1, 6, -6, 33, 37, 32, 38]);
    design.addPosition("d5", [-1, 1, 6, -6, 33, 37, 32, 38]);
    design.addPosition("e5", [-1, 1, 6, -6, 33, 37, 32, 38]);
    design.addPosition("f5", [-1, 0, 6, -6, 0, 37, 32, 0]);
    design.addPosition("a3", [0, 1, 6, -6, 32, 0, 0, 37]);
    design.addPosition("b3", [-1, 1, 6, -6, 32, 36, 31, 37]);
    design.addPosition("c3", [-1, 1, 6, -6, 32, 36, 31, 37]);
    design.addPosition("d3", [-1, 1, 6, -6, 32, 36, 31, 37]);
    design.addPosition("e3", [-1, 1, 6, -6, 32, 36, 31, 37]);
    design.addPosition("f3", [-1, 0, 6, -6, 0, 36, 31, 0]);
    design.addPosition("a1", [0, 1, 0, -6, 31, 0, 0, 0]);
    design.addPosition("b1", [-1, 1, 0, -6, 31, 0, 30, 0]);
    design.addPosition("c1", [-1, 1, 0, -6, 31, 0, 30, 0]);
    design.addPosition("d1", [-1, 1, 0, -6, 31, 0, 30, 0]);
    design.addPosition("e1", [-1, 1, 0, -6, 31, 0, 30, 0]);
    design.addPosition("f1", [-1, 0, 0, -6, 0, 0, 30, 0]);
    design.addPosition("a12", [0, 0, 0, 0, -41, -36, -42, -35]);
    design.addPosition("b12", [0, 0, 0, 0, -41, -36, -42, -35]);
    design.addPosition("c12", [0, 0, 0, 0, -41, -36, -42, -35]);
    design.addPosition("d12", [0, 0, 0, 0, -41, -36, -42, -35]);
    design.addPosition("e12", [0, 0, 0, 0, -41, -36, -42, -35]);
    design.addPosition("a10", [0, 0, 0, 0, -40, -35, -41, -34]);
    design.addPosition("b10", [0, 0, 0, 0, -40, -35, -41, -34]);
    design.addPosition("c10", [0, 0, 0, 0, -40, -35, -41, -34]);
    design.addPosition("d10", [0, 0, 0, 0, -40, -35, -41, -34]);
    design.addPosition("e10", [0, 0, 0, 0, -40, -35, -41, -34]);
    design.addPosition("a8", [0, 0, 0, 0, -39, -34, -40, -33]);
    design.addPosition("b8", [0, 0, 0, 0, -39, -34, -40, -33]);
    design.addPosition("c8", [0, 0, 0, 0, -39, -34, -40, -33]);
    design.addPosition("d8", [0, 0, 0, 0, -39, -34, -40, -33]);
    design.addPosition("e8", [0, 0, 0, 0, -39, -34, -40, -33]);
    design.addPosition("a6", [0, 0, 0, 0, -38, -33, -39, -32]);
    design.addPosition("b6", [0, 0, 0, 0, -38, -33, -39, -32]);
    design.addPosition("c6", [0, 0, 0, 0, -38, -33, -39, -32]);
    design.addPosition("d6", [0, 0, 0, 0, -38, -33, -39, -32]);
    design.addPosition("e6", [0, 0, 0, 0, -38, -33, -39, -32]);
    design.addPosition("a4", [0, 0, 0, 0, -37, -32, -38, -31]);
    design.addPosition("b4", [0, 0, 0, 0, -37, -32, -38, -31]);
    design.addPosition("c4", [0, 0, 0, 0, -37, -32, -38, -31]);
    design.addPosition("d4", [0, 0, 0, 0, -37, -32, -38, -31]);
    design.addPosition("e4", [0, 0, 0, 0, -37, -32, -38, -31]);
    design.addPosition("a2", [0, 0, 0, 0, -36, -31, -37, -30]);
    design.addPosition("b2", [0, 0, 0, 0, -36, -31, -37, -30]);
    design.addPosition("c2", [0, 0, 0, 0, -36, -31, -37, -30]);
    design.addPosition("d2", [0, 0, 0, 0, -36, -31, -37, -30]);
    design.addPosition("e2", [0, 0, 0, 0, -36, -31, -37, -30]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	26);	// capture
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.MODE,	1);	// jump-type
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addPriority(0);			// normal-type

    design.addPiece("King", 0);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [0], 0);
    design.addMove(0, 0, [2], 0);
    design.addMove(0, 0, [1], 0);
    design.addMove(0, 0, [6], 0);
    design.addMove(0, 0, [5], 0);
    design.addMove(0, 0, [7], 0);
    design.addMove(0, 0, [4], 0);
    design.addMove(0, 1, [3, 3], 0);
    design.addMove(0, 1, [0, 0], 0);
    design.addMove(0, 1, [2, 2], 0);
    design.addMove(0, 1, [1, 1], 0);
    design.addMove(0, 1, [6, 6], 0);
    design.addMove(0, 1, [5, 5], 0);
    design.addMove(0, 1, [7, 7], 0);
    design.addMove(0, 1, [4, 4], 0);
    design.addMove(0, 1, [3, 3], 1);
    design.addMove(0, 1, [0, 0], 1);
    design.addMove(0, 1, [2, 2], 1);
    design.addMove(0, 1, [1, 1], 1);
    design.addMove(0, 1, [6, 6], 1);
    design.addMove(0, 1, [5, 5], 1);
    design.addMove(0, 1, [7, 7], 1);
    design.addMove(0, 1, [4, 4], 1);

    design.addPiece("Prince", 1);
    design.addMove(1, 0, [3], 0);
    design.addMove(1, 0, [0], 0);
    design.addMove(1, 0, [2], 0);
    design.addMove(1, 0, [1], 0);
    design.addMove(1, 0, [6], 0);
    design.addMove(1, 0, [5], 0);
    design.addMove(1, 0, [7], 0);
    design.addMove(1, 0, [4], 0);
    design.addMove(1, 1, [3, 3], 0);
    design.addMove(1, 1, [0, 0], 0);
    design.addMove(1, 1, [2, 2], 0);
    design.addMove(1, 1, [1, 1], 0);
    design.addMove(1, 1, [6, 6], 0);
    design.addMove(1, 1, [5, 5], 0);
    design.addMove(1, 1, [7, 7], 0);
    design.addMove(1, 1, [4, 4], 0);
    design.addMove(1, 1, [3, 3], 1);
    design.addMove(1, 1, [0, 0], 1);
    design.addMove(1, 1, [2, 2], 1);
    design.addMove(1, 1, [1, 1], 1);
    design.addMove(1, 1, [6, 6], 1);
    design.addMove(1, 1, [5, 5], 1);
    design.addMove(1, 1, [7, 7], 1);
    design.addMove(1, 1, [4, 4], 1);

    design.addPiece("Man", 2);
    design.addMove(2, 0, [3], 0);
    design.addMove(2, 0, [0], 0);
    design.addMove(2, 0, [2], 0);
    design.addMove(2, 0, [1], 0);
    design.addMove(2, 0, [6], 0);
    design.addMove(2, 0, [5], 0);
    design.addMove(2, 0, [7], 0);
    design.addMove(2, 0, [4], 0);
    design.addMove(2, 1, [3, 3], 0);
    design.addMove(2, 1, [0, 0], 0);
    design.addMove(2, 1, [2, 2], 0);
    design.addMove(2, 1, [1, 1], 0);
    design.addMove(2, 1, [6, 6], 0);
    design.addMove(2, 1, [5, 5], 0);
    design.addMove(2, 1, [7, 7], 0);
    design.addMove(2, 1, [4, 4], 0);
    design.addMove(2, 1, [3, 3], 1);
    design.addMove(2, 1, [0, 0], 1);
    design.addMove(2, 1, [2, 2], 1);
    design.addMove(2, 1, [1, 1], 1);
    design.addMove(2, 1, [6, 6], 1);
    design.addMove(2, 1, [5, 5], 1);
    design.addMove(2, 1, [7, 7], 1);
    design.addMove(2, 1, [4, 4], 1);

    design.setup("White", "King", 18);
    design.setup("White", "Prince", 52);
    design.setup("White", "Man", 0);
    design.setup("White", "Man", 6);
    design.setup("White", "Man", 12);
    design.setup("White", "Man", 1);
    design.setup("White", "Man", 7);
    design.setup("White", "Man", 13);
    design.setup("White", "Man", 2);
    design.setup("White", "Man", 8);
    design.setup("White", "Man", 14);
    design.setup("White", "Man", 3);
    design.setup("White", "Man", 9);
    design.setup("White", "Man", 15);
    design.setup("White", "Man", 4);
    design.setup("White", "Man", 10);
    design.setup("White", "Man", 16);
    design.setup("White", "Man", 5);
    design.setup("White", "Man", 11);
    design.setup("White", "Man", 17);
    design.setup("White", "Man", 42);
    design.setup("White", "Man", 47);
    design.setup("White", "Man", 43);
    design.setup("White", "Man", 48);
    design.setup("White", "Man", 44);
    design.setup("White", "Man", 49);
    design.setup("White", "Man", 45);
    design.setup("White", "Man", 50);
    design.setup("White", "Man", 46);
    design.setup("White", "Man", 51);
    design.setup("Black", "King", 23);
    design.setup("Black", "Prince", 61);
    design.setup("Black", "Man", 36);
    design.setup("Black", "Man", 30);
    design.setup("Black", "Man", 24);
    design.setup("Black", "Man", 37);
    design.setup("Black", "Man", 31);
    design.setup("Black", "Man", 25);
    design.setup("Black", "Man", 38);
    design.setup("Black", "Man", 32);
    design.setup("Black", "Man", 26);
    design.setup("Black", "Man", 39);
    design.setup("Black", "Man", 33);
    design.setup("Black", "Man", 27);
    design.setup("Black", "Man", 40);
    design.setup("Black", "Man", 34);
    design.setup("Black", "Man", 28);
    design.setup("Black", "Man", 41);
    design.setup("Black", "Man", 35);
    design.setup("Black", "Man", 29);
    design.setup("Black", "Man", 67);
    design.setup("Black", "Man", 62);
    design.setup("Black", "Man", 68);
    design.setup("Black", "Man", 63);
    design.setup("Black", "Man", 69);
    design.setup("Black", "Man", 64);
    design.setup("Black", "Man", 70);
    design.setup("Black", "Man", 65);
    design.setup("Black", "Man", 71);
    design.setup("Black", "Man", 66);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
    view.defPiece("WhitePrince", "White Prince");
    view.defPiece("BlackPrince", "Black Prince");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
 
    view.defPosition("a13", 4, 4, 59, 59);
    view.defPosition("b13", 92, 4, 59, 59);
    view.defPosition("c13", 180, 4, 59, 59);
    view.defPosition("d13", 268, 4, 59, 59);
    view.defPosition("e13", 356, 4, 59, 59);
    view.defPosition("f13", 444, 4, 59, 59);
    view.defPosition("a11", 4, 92, 59, 59);
    view.defPosition("b11", 92, 92, 59, 59);
    view.defPosition("c11", 180, 92, 59, 59);
    view.defPosition("d11", 268, 92, 59, 59);
    view.defPosition("e11", 356, 92, 59, 59);
    view.defPosition("f11", 444, 92, 59, 59);
    view.defPosition("a9", 4, 180, 59, 59);
    view.defPosition("b9", 92, 180, 59, 59);
    view.defPosition("c9", 180, 180, 59, 59);
    view.defPosition("d9", 268, 180, 59, 59);
    view.defPosition("e9", 356, 180, 59, 59);
    view.defPosition("f9", 444, 180, 59, 59);
    view.defPosition("a7", 4, 268, 59, 59);
    view.defPosition("b7", 92, 268, 59, 59);
    view.defPosition("c7", 180, 268, 59, 59);
    view.defPosition("d7", 268, 268, 59, 59);
    view.defPosition("e7", 356, 268, 59, 59);
    view.defPosition("f7", 444, 268, 59, 59);
    view.defPosition("a5", 4, 356, 59, 59);
    view.defPosition("b5", 92, 356, 59, 59);
    view.defPosition("c5", 180, 356, 59, 59);
    view.defPosition("d5", 268, 356, 59, 59);
    view.defPosition("e5", 356, 356, 59, 59);
    view.defPosition("f5", 444, 356, 59, 59);
    view.defPosition("a3", 4, 444, 59, 59);
    view.defPosition("b3", 92, 444, 59, 59);
    view.defPosition("c3", 180, 444, 59, 59);
    view.defPosition("d3", 268, 444, 59, 59);
    view.defPosition("e3", 356, 444, 59, 59);
    view.defPosition("f3", 444, 444, 59, 59);
    view.defPosition("a1", 4, 532, 59, 59);
    view.defPosition("b1", 92, 532, 59, 59);
    view.defPosition("c1", 180, 532, 59, 59);
    view.defPosition("d1", 268, 532, 59, 59);
    view.defPosition("e1", 356, 532, 59, 59);
    view.defPosition("f1", 444, 532, 59, 59);
    view.defPosition("a12", 48, 48, 59, 59);
    view.defPosition("b12", 136, 48, 59, 59);
    view.defPosition("c12", 224, 48, 59, 59);
    view.defPosition("d12", 312, 48, 59, 59);
    view.defPosition("e12", 400, 48, 59, 59);
    view.defPosition("a10", 48, 136, 59, 59);
    view.defPosition("b10", 136, 136, 59, 59);
    view.defPosition("c10", 224, 136, 59, 59);
    view.defPosition("d10", 312, 136, 59, 59);
    view.defPosition("e10", 400, 136, 59, 59);
    view.defPosition("a8", 48, 224, 59, 59);
    view.defPosition("b8", 136, 224, 59, 59);
    view.defPosition("c8", 224, 224, 59, 59);
    view.defPosition("d8", 312, 224, 59, 59);
    view.defPosition("e8", 400, 224, 59, 59);
    view.defPosition("a6", 48, 312, 59, 59);
    view.defPosition("b6", 136, 312, 59, 59);
    view.defPosition("c6", 224, 312, 59, 59);
    view.defPosition("d6", 312, 312, 59, 59);
    view.defPosition("e6", 400, 312, 59, 59);
    view.defPosition("a4", 48, 400, 59, 59);
    view.defPosition("b4", 136, 400, 59, 59);
    view.defPosition("c4", 224, 400, 59, 59);
    view.defPosition("d4", 312, 400, 59, 59);
    view.defPosition("e4", 400, 400, 59, 59);
    view.defPosition("a2", 48, 488, 59, 59);
    view.defPosition("b2", 136, 488, 59, 59);
    view.defPosition("c2", 224, 488, 59, 59);
    view.defPosition("d2", 312, 488, 59, 59);
    view.defPosition("e2", 400, 488, 59, 59);
}
