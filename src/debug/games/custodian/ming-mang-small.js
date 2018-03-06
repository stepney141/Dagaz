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
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("ko", "situation");
    design.checkVersion("ming-mang-extension", "true");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("n");

    design.addPlayer("Black", [1, 0, 3, 2]);
    design.addPlayer("White", [0, 1, 2, 3]);

    design.addPosition("a9", [0, 1, 9, 0]);
    design.addPosition("b9", [-1, 1, 9, 0]);
    design.addPosition("c9", [-1, 1, 9, 0]);
    design.addPosition("d9", [-1, 1, 9, 0]);
    design.addPosition("e9", [-1, 1, 9, 0]);
    design.addPosition("f9", [-1, 1, 9, 0]);
    design.addPosition("g9", [-1, 1, 9, 0]);
    design.addPosition("h9", [-1, 1, 9, 0]);
    design.addPosition("i9", [-1, 0, 9, 0]);
    design.addPosition("a8", [0, 1, 9, -9]);
    design.addPosition("b8", [-1, 1, 9, -9]);
    design.addPosition("c8", [-1, 1, 9, -9]);
    design.addPosition("d8", [-1, 1, 9, -9]);
    design.addPosition("e8", [-1, 1, 9, -9]);
    design.addPosition("f8", [-1, 1, 9, -9]);
    design.addPosition("g8", [-1, 1, 9, -9]);
    design.addPosition("h8", [-1, 1, 9, -9]);
    design.addPosition("i8", [-1, 0, 9, -9]);
    design.addPosition("a7", [0, 1, 9, -9]);
    design.addPosition("b7", [-1, 1, 9, -9]);
    design.addPosition("c7", [-1, 1, 9, -9]);
    design.addPosition("d7", [-1, 1, 9, -9]);
    design.addPosition("e7", [-1, 1, 9, -9]);
    design.addPosition("f7", [-1, 1, 9, -9]);
    design.addPosition("g7", [-1, 1, 9, -9]);
    design.addPosition("h7", [-1, 1, 9, -9]);
    design.addPosition("i7", [-1, 0, 9, -9]);
    design.addPosition("a6", [0, 1, 9, -9]);
    design.addPosition("b6", [-1, 1, 9, -9]);
    design.addPosition("c6", [-1, 1, 9, -9]);
    design.addPosition("d6", [-1, 1, 9, -9]);
    design.addPosition("e6", [-1, 1, 9, -9]);
    design.addPosition("f6", [-1, 1, 9, -9]);
    design.addPosition("g6", [-1, 1, 9, -9]);
    design.addPosition("h6", [-1, 1, 9, -9]);
    design.addPosition("i6", [-1, 0, 9, -9]);
    design.addPosition("a5", [0, 1, 9, -9]);
    design.addPosition("b5", [-1, 1, 9, -9]);
    design.addPosition("c5", [-1, 1, 9, -9]);
    design.addPosition("d5", [-1, 1, 9, -9]);
    design.addPosition("e5", [-1, 1, 9, -9]);
    design.addPosition("f5", [-1, 1, 9, -9]);
    design.addPosition("g5", [-1, 1, 9, -9]);
    design.addPosition("h5", [-1, 1, 9, -9]);
    design.addPosition("i5", [-1, 0, 9, -9]);
    design.addPosition("a4", [0, 1, 9, -9]);
    design.addPosition("b4", [-1, 1, 9, -9]);
    design.addPosition("c4", [-1, 1, 9, -9]);
    design.addPosition("d4", [-1, 1, 9, -9]);
    design.addPosition("e4", [-1, 1, 9, -9]);
    design.addPosition("f4", [-1, 1, 9, -9]);
    design.addPosition("g4", [-1, 1, 9, -9]);
    design.addPosition("h4", [-1, 1, 9, -9]);
    design.addPosition("i4", [-1, 0, 9, -9]);
    design.addPosition("a3", [0, 1, 9, -9]);
    design.addPosition("b3", [-1, 1, 9, -9]);
    design.addPosition("c3", [-1, 1, 9, -9]);
    design.addPosition("d3", [-1, 1, 9, -9]);
    design.addPosition("e3", [-1, 1, 9, -9]);
    design.addPosition("f3", [-1, 1, 9, -9]);
    design.addPosition("g3", [-1, 1, 9, -9]);
    design.addPosition("h3", [-1, 1, 9, -9]);
    design.addPosition("i3", [-1, 0, 9, -9]);
    design.addPosition("a2", [0, 1, 9, -9]);
    design.addPosition("b2", [-1, 1, 9, -9]);
    design.addPosition("c2", [-1, 1, 9, -9]);
    design.addPosition("d2", [-1, 1, 9, -9]);
    design.addPosition("e2", [-1, 1, 9, -9]);
    design.addPosition("f2", [-1, 1, 9, -9]);
    design.addPosition("g2", [-1, 1, 9, -9]);
    design.addPosition("h2", [-1, 1, 9, -9]);
    design.addPosition("i2", [-1, 0, 9, -9]);
    design.addPosition("a1", [0, 1, 0, -9]);
    design.addPosition("b1", [-1, 1, 0, -9]);
    design.addPosition("c1", [-1, 1, 0, -9]);
    design.addPosition("d1", [-1, 1, 0, -9]);
    design.addPosition("e1", [-1, 1, 0, -9]);
    design.addPosition("f1", [-1, 1, 0, -9]);
    design.addPosition("g1", [-1, 1, 0, -9]);
    design.addPosition("h1", [-1, 1, 0, -9]);
    design.addPosition("i1", [-1, 0, 0, -9]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	7);
    design.addCommand(0, ZRF.FORK,	3);
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end
    design.addCommand(0, ZRF.PARAM,	1);	// $2
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.JUMP,	-8);
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("Stone", 0, 2);
    design.addMove(0, 0, [3, 3], 0);
    design.addMove(0, 0, [2, 2], 0);
    design.addMove(0, 0, [1, 1], 0);
    design.addMove(0, 0, [0, 0], 0);

    design.setup("White", "Stone", 63);
    design.setup("White", "Stone", 54);
    design.setup("White", "Stone", 45);
    design.setup("White", "Stone", 36);
    design.setup("White", "Stone", 27);
    design.setup("White", "Stone", 18);
    design.setup("White", "Stone", 9);
    design.setup("White", "Stone", 0);
    design.setup("White", "Stone", 1);
    design.setup("White", "Stone", 2);
    design.setup("White", "Stone", 3);
    design.setup("White", "Stone", 4);
    design.setup("White", "Stone", 5);
    design.setup("White", "Stone", 6);
    design.setup("White", "Stone", 7);
    design.setup("White", "Stone", 8);
    design.setup("Black", "Stone", 72);
    design.setup("Black", "Stone", 73);
    design.setup("Black", "Stone", 74);
    design.setup("Black", "Stone", 75);
    design.setup("Black", "Stone", 76);
    design.setup("Black", "Stone", 77);
    design.setup("Black", "Stone", 78);
    design.setup("Black", "Stone", 79);
    design.setup("Black", "Stone", 80);
    design.setup("Black", "Stone", 71);
    design.setup("Black", "Stone", 62);
    design.setup("Black", "Stone", 53);
    design.setup("Black", "Stone", 44);
    design.setup("Black", "Stone", 35);
    design.setup("Black", "Stone", 26);
    design.setup("Black", "Stone", 17);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteStone", "White Stone");
    view.defPiece("BlackStone", "Black Stone");
 
    view.defPosition("a9", 13, 13, 61, 61);
    view.defPosition("b9", 74, 13, 61, 61);
    view.defPosition("c9", 135, 13, 61, 61);
    view.defPosition("d9", 196, 13, 61, 61);
    view.defPosition("e9", 257, 13, 61, 61);
    view.defPosition("f9", 318, 13, 61, 61);
    view.defPosition("g9", 379, 13, 61, 61);
    view.defPosition("h9", 440, 13, 61, 61);
    view.defPosition("i9", 501, 13, 61, 61);
    view.defPosition("a8", 13, 74, 61, 61);
    view.defPosition("b8", 74, 74, 61, 61);
    view.defPosition("c8", 135, 74, 61, 61);
    view.defPosition("d8", 196, 74, 61, 61);
    view.defPosition("e8", 257, 74, 61, 61);
    view.defPosition("f8", 318, 74, 61, 61);
    view.defPosition("g8", 379, 74, 61, 61);
    view.defPosition("h8", 440, 74, 61, 61);
    view.defPosition("i8", 501, 74, 61, 61);
    view.defPosition("a7", 13, 135, 61, 61);
    view.defPosition("b7", 74, 135, 61, 61);
    view.defPosition("c7", 135, 135, 61, 61);
    view.defPosition("d7", 196, 135, 61, 61);
    view.defPosition("e7", 257, 135, 61, 61);
    view.defPosition("f7", 318, 135, 61, 61);
    view.defPosition("g7", 379, 135, 61, 61);
    view.defPosition("h7", 440, 135, 61, 61);
    view.defPosition("i7", 501, 135, 61, 61);
    view.defPosition("a6", 13, 196, 61, 61);
    view.defPosition("b6", 74, 196, 61, 61);
    view.defPosition("c6", 135, 196, 61, 61);
    view.defPosition("d6", 196, 196, 61, 61);
    view.defPosition("e6", 257, 196, 61, 61);
    view.defPosition("f6", 318, 196, 61, 61);
    view.defPosition("g6", 379, 196, 61, 61);
    view.defPosition("h6", 440, 196, 61, 61);
    view.defPosition("i6", 501, 196, 61, 61);
    view.defPosition("a5", 13, 257, 61, 61);
    view.defPosition("b5", 74, 257, 61, 61);
    view.defPosition("c5", 135, 257, 61, 61);
    view.defPosition("d5", 196, 257, 61, 61);
    view.defPosition("e5", 257, 257, 61, 61);
    view.defPosition("f5", 318, 257, 61, 61);
    view.defPosition("g5", 379, 257, 61, 61);
    view.defPosition("h5", 440, 257, 61, 61);
    view.defPosition("i5", 501, 257, 61, 61);
    view.defPosition("a4", 13, 318, 61, 61);
    view.defPosition("b4", 74, 318, 61, 61);
    view.defPosition("c4", 135, 318, 61, 61);
    view.defPosition("d4", 196, 318, 61, 61);
    view.defPosition("e4", 257, 318, 61, 61);
    view.defPosition("f4", 318, 318, 61, 61);
    view.defPosition("g4", 379, 318, 61, 61);
    view.defPosition("h4", 440, 318, 61, 61);
    view.defPosition("i4", 501, 318, 61, 61);
    view.defPosition("a3", 13, 379, 61, 61);
    view.defPosition("b3", 74, 379, 61, 61);
    view.defPosition("c3", 135, 379, 61, 61);
    view.defPosition("d3", 196, 379, 61, 61);
    view.defPosition("e3", 257, 379, 61, 61);
    view.defPosition("f3", 318, 379, 61, 61);
    view.defPosition("g3", 379, 379, 61, 61);
    view.defPosition("h3", 440, 379, 61, 61);
    view.defPosition("i3", 501, 379, 61, 61);
    view.defPosition("a2", 13, 440, 61, 61);
    view.defPosition("b2", 74, 440, 61, 61);
    view.defPosition("c2", 135, 440, 61, 61);
    view.defPosition("d2", 196, 440, 61, 61);
    view.defPosition("e2", 257, 440, 61, 61);
    view.defPosition("f2", 318, 440, 61, 61);
    view.defPosition("g2", 379, 440, 61, 61);
    view.defPosition("h2", 440, 440, 61, 61);
    view.defPosition("i2", 501, 440, 61, 61);
    view.defPosition("a1", 13, 501, 61, 61);
    view.defPosition("b1", 74, 501, 61, 61);
    view.defPosition("c1", 135, 501, 61, 61);
    view.defPosition("d1", 196, 501, 61, 61);
    view.defPosition("e1", 257, 501, 61, 61);
    view.defPosition("f1", 318, 501, 61, 61);
    view.defPosition("g1", 379, 501, 61, 61);
    view.defPosition("h1", 440, 501, 61, 61);
    view.defPosition("i1", 501, 501, 61, 61);
}
