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
    design.checkVersion("smart-moves", "false");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("n");

    design.addPlayer("White", [1, 0, 3, 2]);
    design.addPlayer("Black", [0, 1, 2, 3]);

    design.addPosition("a7", [0, 1, 6, 0]);
    design.addPosition("b7", [-1, 1, 6, 0]);
    design.addPosition("c7", [-1, 1, 6, 0]);
    design.addPosition("d7", [-1, 1, 6, 0]);
    design.addPosition("e7", [-1, 1, 6, 0]);
    design.addPosition("f7", [-1, 0, 6, 0]);
    design.addPosition("a6", [0, 1, 6, -6]);
    design.addPosition("b6", [-1, 1, 6, -6]);
    design.addPosition("c6", [-1, 1, 6, -6]);
    design.addPosition("d6", [-1, 1, 6, -6]);
    design.addPosition("e6", [-1, 1, 6, -6]);
    design.addPosition("f6", [-1, 0, 6, -6]);
    design.addPosition("a5", [0, 1, 6, -6]);
    design.addPosition("b5", [-1, 1, 6, -6]);
    design.addPosition("c5", [-1, 1, 6, -6]);
    design.addPosition("d5", [-1, 1, 6, -6]);
    design.addPosition("e5", [-1, 1, 6, -6]);
    design.addPosition("f5", [-1, 0, 6, -6]);
    design.addPosition("a4", [0, 1, 6, -6]);
    design.addPosition("b4", [-1, 1, 6, -6]);
    design.addPosition("c4", [-1, 1, 6, -6]);
    design.addPosition("d4", [-1, 1, 6, -6]);
    design.addPosition("e4", [-1, 1, 6, -6]);
    design.addPosition("f4", [-1, 0, 6, -6]);
    design.addPosition("a3", [0, 1, 6, -6]);
    design.addPosition("b3", [-1, 1, 6, -6]);
    design.addPosition("c3", [-1, 1, 6, -6]);
    design.addPosition("d3", [-1, 1, 6, -6]);
    design.addPosition("e3", [-1, 1, 6, -6]);
    design.addPosition("f3", [-1, 0, 6, -6]);
    design.addPosition("a2", [0, 1, 6, -6]);
    design.addPosition("b2", [-1, 1, 6, -6]);
    design.addPosition("c2", [-1, 1, 6, -6]);
    design.addPosition("d2", [-1, 1, 6, -6]);
    design.addPosition("e2", [-1, 1, 6, -6]);
    design.addPosition("f2", [-1, 0, 6, -6]);
    design.addPosition("a1", [0, 1, 6, -6]);
    design.addPosition("b1", [-1, 1, 6, -6]);
    design.addPosition("c1", [-1, 1, 6, -6]);
    design.addPosition("d1", [-1, 1, 6, -6]);
    design.addPosition("e1", [-1, 1, 6, -6]);
    design.addPosition("f1", [-1, 0, 6, -6]);
    design.addPosition("a0", [0, 1, 0, -6]);
    design.addPosition("b0", [-1, 1, 0, -6]);
    design.addPosition("c0", [-1, 1, 0, -6]);
    design.addPosition("d0", [-1, 1, 0, -6]);
    design.addPosition("e0", [-1, 1, 0, -6]);
    design.addPosition("f0", [-1, 0, 0, -6]);

    design.setupSelector(2);

    design.addZone("one", 1, [36, 12, 31, 19, 26, 14, 33, 9, 40, 28, 16, 23], 1);
    design.addZone("one", 2, [36, 12, 31, 19, 26, 14, 33, 9, 40, 28, 16, 23], 1);
    design.addZone("two", 1, [30, 24, 6, 7, 38, 20, 39, 21, 10, 35, 29, 11], 1);
    design.addZone("two", 2, [30, 24, 6, 7, 38, 20, 39, 21, 10, 35, 29, 11], 1);
    design.addZone("three", 1, [18, 37, 25, 13, 32, 8, 27, 15, 34, 22, 41, 17], 1);
    design.addZone("three", 2, [18, 37, 25, 13, 32, 8, 27, 15, 34, 22, 41, 17], 1);

    design.addZone("one", 1, [30, 6, 25, 13, 32, 20, 39, 15, 34, 22, 10, 29], 2);
    design.addZone("one", 2, [30, 6, 25, 13, 32, 20, 39, 15, 34, 22, 10, 29], 2);
    design.addZone("two", 1, [24, 18, 37, 7, 38, 8, 27, 21, 41, 35, 17, 11], 2);
    design.addZone("two", 2, [24, 18, 37, 7, 38, 8, 27, 21, 41, 35, 17, 11], 2);
    design.addZone("three", 1, [36, 12, 31, 19, 26, 14, 33, 9, 40, 28, 16, 23], 2);
    design.addZone("three", 2, [36, 12, 31, 19, 26, 14, 33, 9, 40, 28, 16, 23], 2);

    design.addPiece("Ronin", 0);

    design.addPiece("RoninMana", 1);

    design.addPiece("Damyo", 2);

    design.addPiece("Damyomana", 3);

    design.setup("White", "Ronin", 42);
    design.setup("White", "Ronin", 43);
    design.setup("White", "Ronin", 44);
    design.setup("White", "Ronin", 45);
    design.setup("White", "Ronin", 46);
    design.setup("White", "Damyo", 47);
    design.setup("Black", "Ronin", 0);
    design.setup("Black", "Ronin", 1);
    design.setup("Black", "Ronin", 2);
    design.setup("Black", "Ronin", 3);
    design.setup("Black", "Ronin", 4);
    design.setup("Black", "Damyo", 5);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board_SW", 0, 0, 1);
    view.defBoard("Board_SE", 0, 0, 2);
    view.defPiece("WhiteRonin", "White Ronin");
    view.defPiece("BlackRonin", "Black Ronin");
    view.defPiece("WhiteRoninMana", "White RoninMana");
    view.defPiece("BlackRoninMana", "Black RoninMana");
    view.defPiece("WhiteDamyo", "White Damyo");
    view.defPiece("BlackDamyo", "Black Damyo");
    view.defPiece("WhiteDamyomana", "White Damyomana");
    view.defPiece("BlackDamyomana", "Black Damyomana");
 
    view.defPosition("a7", 24, 23, 50, 50);
    view.defPosition("b7", 74, 23, 50, 50);
    view.defPosition("c7", 124, 23, 50, 50);
    view.defPosition("d7", 174, 23, 50, 50);
    view.defPosition("e7", 224, 23, 50, 50);
    view.defPosition("f7", 274, 23, 50, 50);
    view.defPosition("a6", 24, 73, 50, 50);
    view.defPosition("b6", 74, 73, 50, 50);
    view.defPosition("c6", 124, 73, 50, 50);
    view.defPosition("d6", 174, 73, 50, 50);
    view.defPosition("e6", 224, 73, 50, 50);
    view.defPosition("f6", 274, 73, 50, 50);
    view.defPosition("a5", 24, 123, 50, 50);
    view.defPosition("b5", 74, 123, 50, 50);
    view.defPosition("c5", 124, 123, 50, 50);
    view.defPosition("d5", 174, 123, 50, 50);
    view.defPosition("e5", 224, 123, 50, 50);
    view.defPosition("f5", 274, 123, 50, 50);
    view.defPosition("a4", 24, 173, 50, 50);
    view.defPosition("b4", 74, 173, 50, 50);
    view.defPosition("c4", 124, 173, 50, 50);
    view.defPosition("d4", 174, 173, 50, 50);
    view.defPosition("e4", 224, 173, 50, 50);
    view.defPosition("f4", 274, 173, 50, 50);
    view.defPosition("a3", 24, 223, 50, 50);
    view.defPosition("b3", 74, 223, 50, 50);
    view.defPosition("c3", 124, 223, 50, 50);
    view.defPosition("d3", 174, 223, 50, 50);
    view.defPosition("e3", 224, 223, 50, 50);
    view.defPosition("f3", 274, 223, 50, 50);
    view.defPosition("a2", 24, 273, 50, 50);
    view.defPosition("b2", 74, 273, 50, 50);
    view.defPosition("c2", 124, 273, 50, 50);
    view.defPosition("d2", 174, 273, 50, 50);
    view.defPosition("e2", 224, 273, 50, 50);
    view.defPosition("f2", 274, 273, 50, 50);
    view.defPosition("a1", 24, 323, 50, 50);
    view.defPosition("b1", 74, 323, 50, 50);
    view.defPosition("c1", 124, 323, 50, 50);
    view.defPosition("d1", 174, 323, 50, 50);
    view.defPosition("e1", 224, 323, 50, 50);
    view.defPosition("f1", 274, 323, 50, 50);
    view.defPosition("a0", 24, 373, 50, 50);
    view.defPosition("b0", 74, 373, 50, 50);
    view.defPosition("c0", 124, 373, 50, 50);
    view.defPosition("d0", 174, 373, 50, 50);
    view.defPosition("e0", 224, 373, 50, 50);
    view.defPosition("f0", 274, 373, 50, 50);
}
