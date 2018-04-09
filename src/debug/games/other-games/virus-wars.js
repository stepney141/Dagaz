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
    design.checkVersion("animate-drops", "false");
    design.checkVersion("animate-captures", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("virus-wars-invariant", "true");
    design.checkVersion("virus-wars-extension", "true");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("ne");
    design.addDirection("n");
    design.addDirection("se");
    design.addDirection("sw");
    design.addDirection("nw");

    design.addPlayer("Blue", [1, 0, 4, 6, 2, 7, 3, 5]);
    design.addPlayer("Red", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(2);
    design.addTurn(2);
    design.addTurn(2);

    design.addPosition("a10", [0, 1, 10, 0, 0, 11, 0, 0]);
    design.addPosition("b10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("c10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("d10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("e10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("f10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("g10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("h10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("i10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("j10", [-1, 0, 10, 0, 0, 0, 9, 0]);
    design.addPosition("a9", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j9", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a8", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j8", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a7", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j7", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a6", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j6", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a5", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j5", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a4", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j4", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a3", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j3", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a2", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j2", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a1", [0, 1, 0, -9, -10, 0, 0, 0]);
    design.addPosition("b1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("c1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("d1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("e1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("f1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("g1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("h1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("i1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("j1", [-1, 0, 0, 0, -10, 0, 0, -11]);


    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.LITERAL,	0);	// Alive
    design.addCommand(1, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addPiece("Alive", 0);
    design.addDrop(0, 0, [], 0);

    design.addPiece("Dead", 1);
    design.addDrop(1, 1, [], 0);

    design.setup("Blue", "Alive", 99);
    design.setup("Red", "Alive", 0);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("BlueAlive", "Blue Alive");
    view.defPiece("RedAlive", "Red Alive");
    view.defPiece("BlueDead", "Blue Dead");
    view.defPiece("RedDead", "Red Dead");
 
    view.defPosition("a10", 8, 8, 27, 26);
    view.defPosition("b10", 35, 8, 27, 26);
    view.defPosition("c10", 61, 8, 27, 26);
    view.defPosition("d10", 87, 8, 27, 26);
    view.defPosition("e10", 112, 8, 27, 26);
    view.defPosition("f10", 136, 8, 27, 26);
    view.defPosition("g10", 162, 8, 27, 26);
    view.defPosition("h10", 188, 8, 27, 26);
    view.defPosition("i10", 214, 8, 27, 26);
    view.defPosition("j10", 241, 8, 27, 26);
    view.defPosition("a9", 8, 34, 27, 26);
    view.defPosition("b9", 35, 34, 27, 26);
    view.defPosition("c9", 61, 34, 27, 26);
    view.defPosition("d9", 87, 34, 27, 26);
    view.defPosition("e9", 112, 34, 27, 26);
    view.defPosition("f9", 136, 34, 27, 26);
    view.defPosition("g9", 162, 34, 27, 26);
    view.defPosition("h9", 188, 34, 27, 26);
    view.defPosition("i9", 214, 34, 27, 26);
    view.defPosition("j9", 241, 34, 27, 26);
    view.defPosition("a8", 8, 60, 27, 26);
    view.defPosition("b8", 35, 60, 27, 26);
    view.defPosition("c8", 61, 60, 27, 26);
    view.defPosition("d8", 87, 60, 27, 26);
    view.defPosition("e8", 112, 60, 27, 26);
    view.defPosition("f8", 136, 60, 27, 26);
    view.defPosition("g8", 162, 60, 27, 26);
    view.defPosition("h8", 188, 60, 27, 26);
    view.defPosition("i8", 214, 60, 27, 26);
    view.defPosition("j8", 241, 60, 27, 26);
    view.defPosition("a7", 8, 86, 27, 26);
    view.defPosition("b7", 35, 86, 27, 26);
    view.defPosition("c7", 61, 86, 27, 26);
    view.defPosition("d7", 87, 86, 27, 26);
    view.defPosition("e7", 112, 86, 27, 26);
    view.defPosition("f7", 136, 86, 27, 26);
    view.defPosition("g7", 162, 86, 27, 26);
    view.defPosition("h7", 188, 86, 27, 26);
    view.defPosition("i7", 214, 86, 27, 26);
    view.defPosition("j7", 241, 86, 27, 26);
    view.defPosition("a6", 8, 112, 27, 26);
    view.defPosition("b6", 35, 112, 27, 26);
    view.defPosition("c6", 61, 112, 27, 26);
    view.defPosition("d6", 87, 112, 27, 26);
    view.defPosition("e6", 112, 112, 27, 26);
    view.defPosition("f6", 136, 112, 27, 26);
    view.defPosition("g6", 162, 112, 27, 26);
    view.defPosition("h6", 188, 112, 27, 26);
    view.defPosition("i6", 214, 112, 27, 26);
    view.defPosition("j6", 241, 112, 27, 26);
    view.defPosition("a5", 8, 138, 27, 26);
    view.defPosition("b5", 35, 138, 27, 26);
    view.defPosition("c5", 61, 138, 27, 26);
    view.defPosition("d5", 87, 138, 27, 26);
    view.defPosition("e5", 112, 138, 27, 26);
    view.defPosition("f5", 136, 138, 27, 26);
    view.defPosition("g5", 162, 138, 27, 26);
    view.defPosition("h5", 188, 138, 27, 26);
    view.defPosition("i5", 214, 138, 27, 26);
    view.defPosition("j5", 241, 138, 27, 26);
    view.defPosition("a4", 8, 164, 27, 26);
    view.defPosition("b4", 35, 164, 27, 26);
    view.defPosition("c4", 61, 164, 27, 26);
    view.defPosition("d4", 87, 164, 27, 26);
    view.defPosition("e4", 112, 164, 27, 26);
    view.defPosition("f4", 136, 164, 27, 26);
    view.defPosition("g4", 162, 164, 27, 26);
    view.defPosition("h4", 188, 164, 27, 26);
    view.defPosition("i4", 214, 164, 27, 26);
    view.defPosition("j4", 241, 164, 27, 26);
    view.defPosition("a3", 8, 190, 27, 26);
    view.defPosition("b3", 35, 190, 27, 26);
    view.defPosition("c3", 61, 190, 27, 26);
    view.defPosition("d3", 87, 190, 27, 26);
    view.defPosition("e3", 112, 190, 27, 26);
    view.defPosition("f3", 136, 190, 27, 26);
    view.defPosition("g3", 162, 190, 27, 26);
    view.defPosition("h3", 188, 190, 27, 26);
    view.defPosition("i3", 214, 190, 27, 26);
    view.defPosition("j3", 241, 190, 27, 26);
    view.defPosition("a2", 8, 216, 27, 26);
    view.defPosition("b2", 35, 216, 27, 26);
    view.defPosition("c2", 61, 216, 27, 26);
    view.defPosition("d2", 87, 216, 27, 26);
    view.defPosition("e2", 112, 216, 27, 26);
    view.defPosition("f2", 136, 216, 27, 26);
    view.defPosition("g2", 162, 216, 27, 26);
    view.defPosition("h2", 188, 216, 27, 26);
    view.defPosition("i2", 214, 216, 27, 26);
    view.defPosition("j2", 241, 216, 27, 26);
    view.defPosition("a1", 8, 242, 27, 26);
    view.defPosition("b1", 35, 242, 27, 26);
    view.defPosition("c1", 61, 242, 27, 26);
    view.defPosition("d1", 87, 242, 27, 26);
    view.defPosition("e1", 112, 242, 27, 26);
    view.defPosition("f1", 136, 242, 27, 26);
    view.defPosition("g1", 162, 242, 27, 26);
    view.defPosition("h1", 188, 242, 27, 26);
    view.defPosition("i1", 214, 242, 27, 26);
    view.defPosition("j1", 241, 242, 27, 26);
}
