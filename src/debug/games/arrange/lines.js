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
    design.checkVersion("animate-captures", "true");
    design.checkVersion("animate-drops", "true");
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "true");

    design.addDirection("se"); // 0
    design.addDirection("s");  // 1
    design.addDirection("sw"); // 2
    design.addDirection("e");  // 3
    design.addDirection("w");  // 4
    design.addDirection("ne"); // 5
    design.addDirection("nw"); // 6
    design.addDirection("n");  // 7

    design.addPlayer("You", [6, 7, 5, 4, 3, 2, 0, 1]);

    design.addPosition("a9", [10, 9, 0, 1, 0, 0, 0, 0]);
    design.addPosition("b9", [10, 9, 8, 1, -1, 0, 0, 0]);
    design.addPosition("c9", [10, 9, 8, 1, -1, 0, 0, 0]);
    design.addPosition("d9", [10, 9, 8, 1, -1, 0, 0, 0]);
    design.addPosition("e9", [10, 9, 8, 1, -1, 0, 0, 0]);
    design.addPosition("f9", [10, 9, 8, 1, -1, 0, 0, 0]);
    design.addPosition("g9", [10, 9, 8, 1, -1, 0, 0, 0]);
    design.addPosition("h9", [10, 9, 8, 1, -1, 0, 0, 0]);
    design.addPosition("i9", [0, 9, 8, 0, -1, 0, 0, 0]);
    design.addPosition("a8", [10, 9, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b8", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("c8", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("d8", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("e8", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("f8", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("g8", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("h8", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("i8", [0, 9, 8, 0, -1, 0, -10, -9]);
    design.addPosition("a7", [10, 9, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b7", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("c7", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("d7", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("e7", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("f7", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("g7", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("h7", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("i7", [0, 9, 8, 0, -1, 0, -10, -9]);
    design.addPosition("a6", [10, 9, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b6", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("c6", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("d6", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("e6", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("f6", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("g6", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("h6", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("i6", [0, 9, 8, 0, -1, 0, -10, -9]);
    design.addPosition("a5", [10, 9, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b5", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("c5", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("d5", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("e5", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("f5", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("g5", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("h5", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("i5", [0, 9, 8, 0, -1, 0, -10, -9]);
    design.addPosition("a4", [10, 9, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b4", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("c4", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("d4", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("e4", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("f4", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("g4", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("h4", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("i4", [0, 9, 8, 0, -1, 0, -10, -9]);
    design.addPosition("a3", [10, 9, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b3", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("c3", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("d3", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("e3", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("f3", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("g3", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("h3", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("i3", [0, 9, 8, 0, -1, 0, -10, -9]);
    design.addPosition("a2", [10, 9, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b2", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("c2", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("d2", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("e2", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("f2", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("g2", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("h2", [10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("i2", [0, 9, 8, 0, -1, 0, -10, -9]);
    design.addPosition("a1", [0, 0, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b1", [0, 0, 0, 1, -1, -8, -10, -9]);
    design.addPosition("c1", [0, 0, 0, 1, -1, -8, -10, -9]);
    design.addPosition("d1", [0, 0, 0, 1, -1, -8, -10, -9]);
    design.addPosition("e1", [0, 0, 0, 1, -1, -8, -10, -9]);
    design.addPosition("f1", [0, 0, 0, 1, -1, -8, -10, -9]);
    design.addPosition("g1", [0, 0, 0, 1, -1, -8, -10, -9]);
    design.addPosition("h1", [0, 0, 0, 1, -1, -8, -10, -9]);
    design.addPosition("i1", [0, 0, 0, 0, -1, 0, -10, -9]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("Dark", 0);
    design.addMove(0, 0, [7], 0);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [4], 0);
    design.addMove(0, 0, [1], 0);

    design.addPiece("Light", 1);
    design.addMove(1, 0, [7], 0);
    design.addMove(1, 0, [3], 0);
    design.addMove(1, 0, [4], 0);
    design.addMove(1, 0, [1], 0);

    design.addPiece("Green", 2);
    design.addMove(2, 0, [7], 0);
    design.addMove(2, 0, [3], 0);
    design.addMove(2, 0, [4], 0);
    design.addMove(2, 0, [1], 0);

    design.addPiece("Red", 3);
    design.addMove(3, 0, [7], 0);
    design.addMove(3, 0, [3], 0);
    design.addMove(3, 0, [4], 0);
    design.addMove(3, 0, [1], 0);

    design.addPiece("Yellow", 4);
    design.addMove(4, 0, [7], 0);
    design.addMove(4, 0, [3], 0);
    design.addMove(4, 0, [4], 0);
    design.addMove(4, 0, [1], 0);

    design.addPiece("Purple", 5);
    design.addMove(5, 0, [7], 0);
    design.addMove(5, 0, [3], 0);
    design.addMove(5, 0, [4], 0);
    design.addMove(5, 0, [1], 0);

    design.setup("You", "Dark", 72);
    design.setup("You", "Light", 64);
    design.setup("You", "Green", 56);
    design.setup("You", "Red", 24);
    design.setup("You", "Yellow", 16);
    design.setup("You", "Purple", 8);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("YouDark", "You Dark");
    view.defPiece("YouLight", "You Light");
    view.defPiece("YouGreen", "You Green");
    view.defPiece("YouRed", "You Red");
    view.defPiece("YouYellow", "You Yellow");
    view.defPiece("YouPurple", "You Purple");
 
    view.defPosition("a9", 7, 57, 25, 27);
    view.defPosition("b9", 41, 57, 25, 27);
    view.defPosition("c9", 75, 57, 25, 27);
    view.defPosition("d9", 109, 57, 25, 27);
    view.defPosition("e9", 143, 57, 25, 27);
    view.defPosition("f9", 177, 57, 25, 27);
    view.defPosition("g9", 211, 57, 25, 27);
    view.defPosition("h9", 245, 57, 25, 27);
    view.defPosition("i9", 279, 57, 25, 27);
    view.defPosition("a8", 7, 90, 25, 27);
    view.defPosition("b8", 41, 90, 25, 27);
    view.defPosition("c8", 75, 90, 25, 27);
    view.defPosition("d8", 109, 90, 25, 27);
    view.defPosition("e8", 143, 90, 25, 27);
    view.defPosition("f8", 177, 90, 25, 27);
    view.defPosition("g8", 211, 90, 25, 27);
    view.defPosition("h8", 245, 90, 25, 27);
    view.defPosition("i8", 279, 90, 25, 27);
    view.defPosition("a7", 7, 123, 25, 27);
    view.defPosition("b7", 41, 123, 25, 27);
    view.defPosition("c7", 75, 123, 25, 27);
    view.defPosition("d7", 109, 123, 25, 27);
    view.defPosition("e7", 143, 123, 25, 27);
    view.defPosition("f7", 177, 123, 25, 27);
    view.defPosition("g7", 211, 123, 25, 27);
    view.defPosition("h7", 245, 123, 25, 27);
    view.defPosition("i7", 279, 123, 25, 27);
    view.defPosition("a6", 7, 156, 25, 27);
    view.defPosition("b6", 41, 156, 25, 27);
    view.defPosition("c6", 75, 156, 25, 27);
    view.defPosition("d6", 109, 156, 25, 27);
    view.defPosition("e6", 143, 156, 25, 27);
    view.defPosition("f6", 177, 156, 25, 27);
    view.defPosition("g6", 211, 156, 25, 27);
    view.defPosition("h6", 245, 156, 25, 27);
    view.defPosition("i6", 279, 156, 25, 27);
    view.defPosition("a5", 7, 189, 25, 27);
    view.defPosition("b5", 41, 189, 25, 27);
    view.defPosition("c5", 75, 189, 25, 27);
    view.defPosition("d5", 109, 189, 25, 27);
    view.defPosition("e5", 143, 189, 25, 27);
    view.defPosition("f5", 177, 189, 25, 27);
    view.defPosition("g5", 211, 189, 25, 27);
    view.defPosition("h5", 245, 189, 25, 27);
    view.defPosition("i5", 279, 189, 25, 27);
    view.defPosition("a4", 7, 222, 25, 27);
    view.defPosition("b4", 41, 222, 25, 27);
    view.defPosition("c4", 75, 222, 25, 27);
    view.defPosition("d4", 109, 222, 25, 27);
    view.defPosition("e4", 143, 222, 25, 27);
    view.defPosition("f4", 177, 222, 25, 27);
    view.defPosition("g4", 211, 222, 25, 27);
    view.defPosition("h4", 245, 222, 25, 27);
    view.defPosition("i4", 279, 222, 25, 27);
    view.defPosition("a3", 7, 255, 25, 27);
    view.defPosition("b3", 41, 255, 25, 27);
    view.defPosition("c3", 75, 255, 25, 27);
    view.defPosition("d3", 109, 255, 25, 27);
    view.defPosition("e3", 143, 255, 25, 27);
    view.defPosition("f3", 177, 255, 25, 27);
    view.defPosition("g3", 211, 255, 25, 27);
    view.defPosition("h3", 245, 255, 25, 27);
    view.defPosition("i3", 279, 255, 25, 27);
    view.defPosition("a2", 7, 288, 25, 27);
    view.defPosition("b2", 41, 288, 25, 27);
    view.defPosition("c2", 75, 288, 25, 27);
    view.defPosition("d2", 109, 288, 25, 27);
    view.defPosition("e2", 143, 288, 25, 27);
    view.defPosition("f2", 177, 288, 25, 27);
    view.defPosition("g2", 211, 288, 25, 27);
    view.defPosition("h2", 245, 288, 25, 27);
    view.defPosition("i2", 279, 288, 25, 27);
    view.defPosition("a1", 7, 321, 25, 27);
    view.defPosition("b1", 41, 321, 25, 27);
    view.defPosition("c1", 75, 321, 25, 27);
    view.defPosition("d1", 109, 321, 25, 27);
    view.defPosition("e1", 143, 321, 25, 27);
    view.defPosition("f1", 177, 321, 25, 27);
    view.defPosition("g1", 211, 321, 25, 27);
    view.defPosition("h1", 245, 321, 25, 27);
    view.defPosition("i1", 279, 321, 25, 27);
}
