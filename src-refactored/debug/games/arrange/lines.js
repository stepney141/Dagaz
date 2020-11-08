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

    design.addDirection("nx"); // 0
    design.addDirection("se"); // 1
    design.addDirection("s");  // 2
    design.addDirection("sw"); // 3
    design.addDirection("e");  // 4
    design.addDirection("w");  // 5
    design.addDirection("ne"); // 6
    design.addDirection("nw"); // 7
    design.addDirection("n");  // 8

    design.addPlayer("You", [0, 7, 8, 6, 5, 4, 3, 1, 2]);

    design.addRandom(1, [5]); // 0
    design.addRandom(1, [5]); // 1
    design.addRandom(1, [5]); // 2
    design.repeatMark();
    design.addRandom(1, [1]); // 3
    design.addRandom(1, [2]); // 4
    design.addRandom(1, [3]); // 5
    design.addTurn(1, [0]);   // 6
    design.addRandom(1, [4]); // 7
    design.addRandom(1, [4]); // 8
    design.addRandom(1, [4]); // 9

    design.addPosition("X1", [1, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("Y1", [1, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("Z1", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("a9", [0, 10, 9, 0, 1, 0, 0, 0, 0]);
    design.addPosition("b9", [0, 10, 9, 8, 1, -1, 0, 0, 0]);
    design.addPosition("c9", [0, 10, 9, 8, 1, -1, 0, 0, 0]);
    design.addPosition("d9", [0, 10, 9, 8, 1, -1, 0, 0, 0]);
    design.addPosition("e9", [0, 10, 9, 8, 1, -1, 0, 0, 0]);
    design.addPosition("f9", [0, 10, 9, 8, 1, -1, 0, 0, 0]);
    design.addPosition("g9", [0, 10, 9, 8, 1, -1, 0, 0, 0]);
    design.addPosition("h9", [0, 10, 9, 8, 1, -1, 0, 0, 0]);
    design.addPosition("i9", [0, 0, 9, 8, 0, -1, 0, 0, 0]);
    design.addPosition("a8", [0, 10, 9, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b8", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("c8", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("d8", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("e8", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("f8", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("g8", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("h8", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("i8", [0, 0, 9, 8, 0, -1, 0, -10, -9]);
    design.addPosition("a7", [0, 10, 9, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b7", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("c7", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("d7", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("e7", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("f7", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("g7", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("h7", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("i7", [0, 0, 9, 8, 0, -1, 0, -10, -9]);
    design.addPosition("a6", [0, 10, 9, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b6", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("c6", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("d6", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("e6", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("f6", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("g6", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("h6", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("i6", [0, 0, 9, 8, 0, -1, 0, -10, -9]);
    design.addPosition("a5", [0, 10, 9, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b5", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("c5", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("d5", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("e5", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("f5", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("g5", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("h5", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("i5", [0, 0, 9, 8, 0, -1, 0, -10, -9]);
    design.addPosition("a4", [0, 10, 9, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b4", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("c4", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("d4", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("e4", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("f4", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("g4", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("h4", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("i4", [0, 0, 9, 8, 0, -1, 0, -10, -9]);
    design.addPosition("a3", [0, 10, 9, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b3", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("c3", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("d3", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("e3", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("f3", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("g3", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("h3", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("i3", [0, 0, 9, 8, 0, -1, 0, -10, -9]);
    design.addPosition("a2", [0, 10, 9, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b2", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("c2", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("d2", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("e2", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("f2", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("g2", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("h2", [0, 10, 9, 8, 1, -1, -8, -10, -9]);
    design.addPosition("i2", [0, 0, 9, 8, 0, -1, 0, -10, -9]);
    design.addPosition("a1", [0, 0, 0, 0, 1, 0, -8, 0, -9]);
    design.addPosition("b1", [0, 0, 0, 0, 1, -1, -8, -10, -9]);
    design.addPosition("c1", [0, 0, 0, 0, 1, -1, -8, -10, -9]);
    design.addPosition("d1", [0, 0, 0, 0, 1, -1, -8, -10, -9]);
    design.addPosition("e1", [0, 0, 0, 0, 1, -1, -8, -10, -9]);
    design.addPosition("f1", [0, 0, 0, 0, 1, -1, -8, -10, -9]);
    design.addPosition("g1", [0, 0, 0, 0, 1, -1, -8, -10, -9]);
    design.addPosition("h1", [0, 0, 0, 0, 1, -1, -8, -10, -9]);
    design.addPosition("i1", [0, 0, 0, 0, 0, -1, 0, -10, -9]);
    design.addPosition("D6", [0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("D5", [0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("D4", [0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("D3", [0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("D2", [0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("D1", [0, 0, 0, 0, 0, 0, 0, 0, 0]);

    design.addZone("preview-zone", 1, [0, 1, 2, 84, 85, 86, 87, 88, 89]);
    design.addZone("preview-1", 1, [0]);
    design.addZone("preview-2", 1, [1]);
    design.addZone("preview-3", 1, [2]);

    design.addCommand(1, ZRF.IN_ZONE,	1);	// preview-1
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.IN_ZONE,	2);	// preview-2
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.IN_ZONE,	3);	// preview-3
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.IN_ZONE,	0);	// preview-zone
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addPiece("Dark", 0);
    design.addDrop(0, 1, [], 1, 100);
    design.addDrop(0, 2, [], 2, 100);
    design.addDrop(0, 3, [], 3, 100);
    design.addDrop(0, 4, [], 4, 100);
    design.addDrop(0, 4, [], 5, 100);

    design.addPiece("Light", 1);
    design.addDrop(1, 1, [], 1, 100);
    design.addDrop(1, 2, [], 2, 100);
    design.addDrop(1, 3, [], 3, 100);
    design.addDrop(1, 4, [], 4, 100);
    design.addDrop(1, 4, [], 5, 100);

    design.addPiece("Green", 2);
    design.addDrop(2, 1, [], 1, 100);
    design.addDrop(2, 2, [], 2, 100);
    design.addDrop(2, 3, [], 3, 100);
    design.addDrop(2, 4, [], 4, 100);
    design.addDrop(2, 4, [], 5, 100);

    design.addPiece("Red", 3);
    design.addDrop(3, 1, [], 1, 100);
    design.addDrop(3, 2, [], 2, 100);
    design.addDrop(3, 3, [], 3, 100);
    design.addDrop(3, 4, [], 4, 100);
    design.addDrop(3, 4, [], 5, 100);

    design.addPiece("Yellow", 4);
    design.addDrop(4, 1, [], 1, 100);
    design.addDrop(4, 2, [], 2, 100);
    design.addDrop(4, 3, [], 3, 100);
    design.addDrop(4, 4, [], 4, 100);
    design.addDrop(4, 4, [], 5, 100);

    design.addPiece("Purple", 5);
    design.addDrop(5, 1, [], 1, 100);
    design.addDrop(5, 2, [], 2, 100);
    design.addDrop(5, 3, [], 3, 100);
    design.addDrop(5, 4, [], 4, 100);
    design.addDrop(5, 4, [], 5, 100);

    design.addPiece("N0", 6);
    design.addPiece("N1", 7);
    design.addPiece("N2", 8);
    design.addPiece("N3", 9);
    design.addPiece("N4", 10);
    design.addPiece("N5", 11);
    design.addPiece("N6", 12);
    design.addPiece("N7", 13);
    design.addPiece("N8", 14);
    design.addPiece("N9", 15);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("YouDark", "You Dark");
    view.defPiece("YouLight", "You Light");
    view.defPiece("YouGreen", "You Green");
    view.defPiece("YouRed", "You Red");
    view.defPiece("YouYellow", "You Yellow");
    view.defPiece("YouPurple", "You Purple");
    view.defPiece("YouN0", "You N0");
    view.defPiece("YouN1", "You N1");
    view.defPiece("YouN2", "You N2");
    view.defPiece("YouN3", "You N3");
    view.defPiece("YouN4", "You N4");
    view.defPiece("YouN5", "You N5");
    view.defPiece("YouN6", "You N6");
    view.defPiece("YouN7", "You N7");
    view.defPiece("YouN8", "You N8");
    view.defPiece("YouN9", "You N9");
 
    view.defPosition("X1", 60, 5, 25, 27);
    view.defPosition("Y1", 94, 5, 25, 27);
    view.defPosition("Z1", 128, 5, 25, 27);
    view.defPosition("a9", 8, 57, 25, 27);
    view.defPosition("b9", 42, 57, 25, 27);
    view.defPosition("c9", 76, 57, 25, 27);
    view.defPosition("d9", 110, 57, 25, 27);
    view.defPosition("e9", 144, 57, 25, 27);
    view.defPosition("f9", 178, 57, 25, 27);
    view.defPosition("g9", 212, 57, 25, 27);
    view.defPosition("h9", 246, 57, 25, 27);
    view.defPosition("i9", 280, 57, 25, 27);
    view.defPosition("a8", 8, 90, 25, 27);
    view.defPosition("b8", 42, 90, 25, 27);
    view.defPosition("c8", 76, 90, 25, 27);
    view.defPosition("d8", 110, 90, 25, 27);
    view.defPosition("e8", 144, 90, 25, 27);
    view.defPosition("f8", 178, 90, 25, 27);
    view.defPosition("g8", 212, 90, 25, 27);
    view.defPosition("h8", 246, 90, 25, 27);
    view.defPosition("i8", 280, 90, 25, 27);
    view.defPosition("a7", 8, 123, 25, 27);
    view.defPosition("b7", 42, 123, 25, 27);
    view.defPosition("c7", 76, 123, 25, 27);
    view.defPosition("d7", 110, 123, 25, 27);
    view.defPosition("e7", 144, 123, 25, 27);
    view.defPosition("f7", 178, 123, 25, 27);
    view.defPosition("g7", 212, 123, 25, 27);
    view.defPosition("h7", 246, 123, 25, 27);
    view.defPosition("i7", 280, 123, 25, 27);
    view.defPosition("a6", 8, 156, 25, 27);
    view.defPosition("b6", 42, 156, 25, 27);
    view.defPosition("c6", 76, 156, 25, 27);
    view.defPosition("d6", 110, 156, 25, 27);
    view.defPosition("e6", 144, 156, 25, 27);
    view.defPosition("f6", 178, 156, 25, 27);
    view.defPosition("g6", 212, 156, 25, 27);
    view.defPosition("h6", 246, 156, 25, 27);
    view.defPosition("i6", 280, 156, 25, 27);
    view.defPosition("a5", 8, 189, 25, 27);
    view.defPosition("b5", 42, 189, 25, 27);
    view.defPosition("c5", 76, 189, 25, 27);
    view.defPosition("d5", 110, 189, 25, 27);
    view.defPosition("e5", 144, 189, 25, 27);
    view.defPosition("f5", 178, 189, 25, 27);
    view.defPosition("g5", 212, 189, 25, 27);
    view.defPosition("h5", 246, 189, 25, 27);
    view.defPosition("i5", 280, 189, 25, 27);
    view.defPosition("a4", 8, 222, 25, 27);
    view.defPosition("b4", 42, 222, 25, 27);
    view.defPosition("c4", 76, 222, 25, 27);
    view.defPosition("d4", 110, 222, 25, 27);
    view.defPosition("e4", 144, 222, 25, 27);
    view.defPosition("f4", 178, 222, 25, 27);
    view.defPosition("g4", 212, 222, 25, 27);
    view.defPosition("h4", 246, 222, 25, 27);
    view.defPosition("i4", 280, 222, 25, 27);
    view.defPosition("a3", 8, 255, 25, 27);
    view.defPosition("b3", 42, 255, 25, 27);
    view.defPosition("c3", 76, 255, 25, 27);
    view.defPosition("d3", 110, 255, 25, 27);
    view.defPosition("e3", 144, 255, 25, 27);
    view.defPosition("f3", 178, 255, 25, 27);
    view.defPosition("g3", 212, 255, 25, 27);
    view.defPosition("h3", 246, 255, 25, 27);
    view.defPosition("i3", 280, 255, 25, 27);
    view.defPosition("a2", 8, 288, 25, 27);
    view.defPosition("b2", 42, 288, 25, 27);
    view.defPosition("c2", 76, 288, 25, 27);
    view.defPosition("d2", 110, 288, 25, 27);
    view.defPosition("e2", 144, 288, 25, 27);
    view.defPosition("f2", 178, 288, 25, 27);
    view.defPosition("g2", 212, 288, 25, 27);
    view.defPosition("h2", 246, 288, 25, 27);
    view.defPosition("i2", 280, 288, 25, 27);
    view.defPosition("a1", 8, 321, 25, 27);
    view.defPosition("b1", 42, 321, 25, 27);
    view.defPosition("c1", 76, 321, 25, 27);
    view.defPosition("d1", 110, 321, 25, 27);
    view.defPosition("e1", 144, 321, 25, 27);
    view.defPosition("f1", 178, 321, 25, 27);
    view.defPosition("g1", 212, 321, 25, 27);
    view.defPosition("h1", 246, 321, 25, 27);
    view.defPosition("i1", 280, 321, 25, 27);
    view.defPosition("D6", 235, 11, 10, 17);
    view.defPosition("D5", 246, 11, 10, 17);
    view.defPosition("D4", 257, 11, 10, 17);
    view.defPosition("D3", 268, 11, 10, 17);
    view.defPosition("D2", 279, 11, 10, 17);
    view.defPosition("D1", 290, 11, 10, 17);
}
