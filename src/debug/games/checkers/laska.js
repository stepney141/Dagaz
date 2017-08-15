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
    design.checkVersion("columns-checkers-extension", "inversed");

    design.addDirection("ne");
    design.addDirection("se");
    design.addDirection("sw");
    design.addDirection("nw");

    design.addPlayer("Black", [2, 3, 0, 1]);
    design.addPlayer("White", [2, 3, 0, 1]);


    design.addPosition("a7", [0, 8, 0, 0]);
    design.addPosition("b7", [0, 8, 6, 0]);
    design.addPosition("c7", [0, 8, 6, 0]);
    design.addPosition("d7", [0, 8, 6, 0]);
    design.addPosition("e7", [0, 8, 6, 0]);
    design.addPosition("f7", [0, 8, 6, 0]);
    design.addPosition("g7", [0, 0, 6, 0]);
    design.addPosition("a6", [-6, 8, 0, 0]);
    design.addPosition("b6", [-6, 8, 6, -8]);
    design.addPosition("c6", [-6, 8, 6, -8]);
    design.addPosition("d6", [-6, 8, 6, -8]);
    design.addPosition("e6", [-6, 8, 6, -8]);
    design.addPosition("f6", [-6, 8, 6, -8]);
    design.addPosition("g6", [0, 0, 6, -8]);
    design.addPosition("a5", [-6, 8, 0, 0]);
    design.addPosition("b5", [-6, 8, 6, -8]);
    design.addPosition("c5", [-6, 8, 6, -8]);
    design.addPosition("d5", [-6, 8, 6, -8]);
    design.addPosition("e5", [-6, 8, 6, -8]);
    design.addPosition("f5", [-6, 8, 6, -8]);
    design.addPosition("g5", [0, 0, 6, -8]);
    design.addPosition("a4", [-6, 8, 0, 0]);
    design.addPosition("b4", [-6, 8, 6, -8]);
    design.addPosition("c4", [-6, 8, 6, -8]);
    design.addPosition("d4", [-6, 8, 6, -8]);
    design.addPosition("e4", [-6, 8, 6, -8]);
    design.addPosition("f4", [-6, 8, 6, -8]);
    design.addPosition("g4", [0, 0, 6, -8]);
    design.addPosition("a3", [-6, 8, 0, 0]);
    design.addPosition("b3", [-6, 8, 6, -8]);
    design.addPosition("c3", [-6, 8, 6, -8]);
    design.addPosition("d3", [-6, 8, 6, -8]);
    design.addPosition("e3", [-6, 8, 6, -8]);
    design.addPosition("f3", [-6, 8, 6, -8]);
    design.addPosition("g3", [0, 0, 6, -8]);
    design.addPosition("a2", [-6, 8, 0, 0]);
    design.addPosition("b2", [-6, 8, 6, -8]);
    design.addPosition("c2", [-6, 8, 6, -8]);
    design.addPosition("d2", [-6, 8, 6, -8]);
    design.addPosition("e2", [-6, 8, 6, -8]);
    design.addPosition("f2", [-6, 8, 6, -8]);
    design.addPosition("g2", [0, 0, 6, -8]);
    design.addPosition("a1", [-6, 0, 0, 0]);
    design.addPosition("b1", [-6, 0, 0, -8]);
    design.addPosition("c1", [-6, 0, 0, -8]);
    design.addPosition("d1", [-6, 0, 0, -8]);
    design.addPosition("e1", [-6, 0, 0, -8]);
    design.addPosition("f1", [-6, 0, 0, -8]);
    design.addPosition("g1", [0, 0, 0, -8]);

    design.addZone("promotion", 2, [42, 44, 46, 48]);
    design.addZone("promotion", 1, [0, 2, 4, 6]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	26);	// capture
    design.addCommand(0, ZRF.PARAM,	1);	// $2
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.IN_ZONE,	0);	// promotion
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	4);
    design.addCommand(0, ZRF.PROMOTE,	1);	// King
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.JUMP,	3);
    design.addCommand(0, ZRF.MODE,	0);	// jump-type
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.IN_ZONE,	0);	// promotion
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.IF,	4);
    design.addCommand(1, ZRF.PROMOTE,	1);	// King
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.JUMP,	2);
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	26);	// capture
    design.addCommand(2, ZRF.PARAM,	1);	// $2
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.MODE,	0);	// jump-type
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addPriority(0);			// jump-type
    design.addPriority(1);			// normal-type

    design.addPiece("Man", 0);
    design.addMove(0, 0, [3, 3], 0);
    design.addMove(0, 0, [0, 0], 0);
    design.addMove(0, 1, [3], 1);
    design.addMove(0, 1, [0], 1);

    design.addPiece("King", 1);
    design.addMove(1, 2, [3, 3], 0);
    design.addMove(1, 2, [0, 0], 0);
    design.addMove(1, 2, [2, 2], 0);
    design.addMove(1, 2, [1, 1], 0);
    design.addMove(1, 3, [3], 1);
    design.addMove(1, 3, [0], 1);
    design.addMove(1, 3, [2], 1);
    design.addMove(1, 3, [1], 1);

    design.setup("Black", "Man", 42);
    design.setup("Black", "Man", 44);
    design.setup("Black", "Man", 46);
    design.setup("Black", "Man", 48);
    design.setup("Black", "Man", 36);
    design.setup("Black", "Man", 38);
    design.setup("Black", "Man", 40);
    design.setup("Black", "Man", 28);
    design.setup("Black", "Man", 30);
    design.setup("Black", "Man", 32);
    design.setup("Black", "Man", 34);
    design.setup("White", "Man", 0);
    design.setup("White", "Man", 2);
    design.setup("White", "Man", 4);
    design.setup("White", "Man", 6);
    design.setup("White", "Man", 8);
    design.setup("White", "Man", 10);
    design.setup("White", "Man", 12);
    design.setup("White", "Man", 14);
    design.setup("White", "Man", 16);
    design.setup("White", "Man", 18);
    design.setup("White", "Man", 20);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
 
    view.defPosition("a7", 2, 2, 50, 50);
    view.defPosition("b7", 52, 2, 50, 50);
    view.defPosition("c7", 102, 2, 50, 50);
    view.defPosition("d7", 152, 2, 50, 50);
    view.defPosition("e7", 202, 2, 50, 50);
    view.defPosition("f7", 252, 2, 50, 50);
    view.defPosition("g7", 302, 2, 50, 50);
    view.defPosition("a6", 2, 52, 50, 50);
    view.defPosition("b6", 52, 52, 50, 50);
    view.defPosition("c6", 102, 52, 50, 50);
    view.defPosition("d6", 152, 52, 50, 50);
    view.defPosition("e6", 202, 52, 50, 50);
    view.defPosition("f6", 252, 52, 50, 50);
    view.defPosition("g6", 302, 52, 50, 50);
    view.defPosition("a5", 2, 102, 50, 50);
    view.defPosition("b5", 52, 102, 50, 50);
    view.defPosition("c5", 102, 102, 50, 50);
    view.defPosition("d5", 152, 102, 50, 50);
    view.defPosition("e5", 202, 102, 50, 50);
    view.defPosition("f5", 252, 102, 50, 50);
    view.defPosition("g5", 302, 102, 50, 50);
    view.defPosition("a4", 2, 152, 50, 50);
    view.defPosition("b4", 52, 152, 50, 50);
    view.defPosition("c4", 102, 152, 50, 50);
    view.defPosition("d4", 152, 152, 50, 50);
    view.defPosition("e4", 202, 152, 50, 50);
    view.defPosition("f4", 252, 152, 50, 50);
    view.defPosition("g4", 302, 152, 50, 50);
    view.defPosition("a3", 2, 202, 50, 50);
    view.defPosition("b3", 52, 202, 50, 50);
    view.defPosition("c3", 102, 202, 50, 50);
    view.defPosition("d3", 152, 202, 50, 50);
    view.defPosition("e3", 202, 202, 50, 50);
    view.defPosition("f3", 252, 202, 50, 50);
    view.defPosition("g3", 302, 202, 50, 50);
    view.defPosition("a2", 2, 252, 50, 50);
    view.defPosition("b2", 52, 252, 50, 50);
    view.defPosition("c2", 102, 252, 50, 50);
    view.defPosition("d2", 152, 252, 50, 50);
    view.defPosition("e2", 202, 252, 50, 50);
    view.defPosition("f2", 252, 252, 50, 50);
    view.defPosition("g2", 302, 252, 50, 50);
    view.defPosition("a1", 2, 302, 50, 50);
    view.defPosition("b1", 52, 302, 50, 50);
    view.defPosition("c1", 102, 302, 50, 50);
    view.defPosition("d1", 152, 302, 50, 50);
    view.defPosition("e1", 202, 302, 50, 50);
    view.defPosition("f1", 252, 302, 50, 50);
    view.defPosition("g1", 302, 302, 50, 50);
}
