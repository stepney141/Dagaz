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
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("progressive-levels", "true");

    design.addDirection("s"); // 0
    design.addDirection("e"); // 1
    design.addDirection("w"); // 2
    design.addDirection("n"); // 3

    design.addPlayer("You", [3, 2, 1, 0]);

    design.addPosition("a9", [9, 1, 0, 0]);
    design.addPosition("b9", [9, 1, -1, 0]);
    design.addPosition("c9", [9, 1, -1, 0]);
    design.addPosition("d9", [9, 1, -1, 0]);
    design.addPosition("e9", [9, 1, -1, 0]);
    design.addPosition("f9", [9, 1, -1, 0]);
    design.addPosition("g9", [9, 1, -1, 0]);
    design.addPosition("h9", [9, 1, -1, 0]);
    design.addPosition("i9", [9, 0, -1, 0]);
    design.addPosition("a8", [9, 1, 0, -9]);
    design.addPosition("b8", [9, 1, -1, -9]);
    design.addPosition("c8", [9, 1, -1, -9]);
    design.addPosition("d8", [9, 1, -1, -9]);
    design.addPosition("e8", [9, 1, -1, -9]);
    design.addPosition("f8", [9, 1, -1, -9]);
    design.addPosition("g8", [9, 1, -1, -9]);
    design.addPosition("h8", [9, 1, -1, -9]);
    design.addPosition("i8", [9, 0, -1, -9]);
    design.addPosition("a7", [9, 1, 0, -9]);
    design.addPosition("b7", [9, 1, -1, -9]);
    design.addPosition("c7", [9, 1, -1, -9]);
    design.addPosition("d7", [9, 1, -1, -9]);
    design.addPosition("e7", [9, 1, -1, -9]);
    design.addPosition("f7", [9, 1, -1, -9]);
    design.addPosition("g7", [9, 1, -1, -9]);
    design.addPosition("h7", [9, 1, -1, -9]);
    design.addPosition("i7", [9, 0, -1, -9]);
    design.addPosition("a6", [9, 1, 0, -9]);
    design.addPosition("b6", [9, 1, -1, -9]);
    design.addPosition("c6", [9, 1, -1, -9]);
    design.addPosition("d6", [9, 1, -1, -9]);
    design.addPosition("e6", [9, 1, -1, -9]);
    design.addPosition("f6", [9, 1, -1, -9]);
    design.addPosition("g6", [9, 1, -1, -9]);
    design.addPosition("h6", [9, 1, -1, -9]);
    design.addPosition("i6", [9, 0, -1, -9]);
    design.addPosition("a5", [9, 1, 0, -9]);
    design.addPosition("b5", [9, 1, -1, -9]);
    design.addPosition("c5", [9, 1, -1, -9]);
    design.addPosition("d5", [9, 1, -1, -9]);
    design.addPosition("e5", [9, 1, -1, -9]);
    design.addPosition("f5", [9, 1, -1, -9]);
    design.addPosition("g5", [9, 1, -1, -9]);
    design.addPosition("h5", [9, 1, -1, -9]);
    design.addPosition("i5", [9, 0, -1, -9]);
    design.addPosition("a4", [9, 1, 0, -9]);
    design.addPosition("b4", [9, 1, -1, -9]);
    design.addPosition("c4", [9, 1, -1, -9]);
    design.addPosition("d4", [9, 1, -1, -9]);
    design.addPosition("e4", [9, 1, -1, -9]);
    design.addPosition("f4", [9, 1, -1, -9]);
    design.addPosition("g4", [9, 1, -1, -9]);
    design.addPosition("h4", [9, 1, -1, -9]);
    design.addPosition("i4", [9, 0, -1, -9]);
    design.addPosition("a3", [9, 1, 0, -9]);
    design.addPosition("b3", [9, 1, -1, -9]);
    design.addPosition("c3", [9, 1, -1, -9]);
    design.addPosition("d3", [9, 1, -1, -9]);
    design.addPosition("e3", [9, 1, -1, -9]);
    design.addPosition("f3", [9, 1, -1, -9]);
    design.addPosition("g3", [9, 1, -1, -9]);
    design.addPosition("h3", [9, 1, -1, -9]);
    design.addPosition("i3", [9, 0, -1, -9]);
    design.addPosition("a2", [9, 1, 0, -9]);
    design.addPosition("b2", [9, 1, -1, -9]);
    design.addPosition("c2", [9, 1, -1, -9]);
    design.addPosition("d2", [9, 1, -1, -9]);
    design.addPosition("e2", [9, 1, -1, -9]);
    design.addPosition("f2", [9, 1, -1, -9]);
    design.addPosition("g2", [9, 1, -1, -9]);
    design.addPosition("h2", [9, 1, -1, -9]);
    design.addPosition("i2", [9, 0, -1, -9]);
    design.addPosition("a1", [0, 1, 0, -9]);
    design.addPosition("b1", [0, 1, -1, -9]);
    design.addPosition("c1", [0, 1, -1, -9]);
    design.addPosition("d1", [0, 1, -1, -9]);
    design.addPosition("e1", [0, 1, -1, -9]);
    design.addPosition("f1", [0, 1, -1, -9]);
    design.addPosition("g1", [0, 1, -1, -9]);
    design.addPosition("h1", [0, 1, -1, -9]);
    design.addPosition("i1", [0, 0, -1, -9]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PROMOTE,	0);	// b1n
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PROMOTE,	2);	// b2se
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PROMOTE,	3);	// b2sw
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PROMOTE,	4);	// b2nw
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.PROMOTE,	1);	// b2ne
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.PROMOTE,	6);	// b3e
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.PROMOTE,	7);	// b3s
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addCommand(7, ZRF.FUNCTION,	24);	// from
    design.addCommand(7, ZRF.PROMOTE,	8);	// b3w
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.FUNCTION,	28);	// end

    design.addCommand(8, ZRF.FUNCTION,	24);	// from
    design.addCommand(8, ZRF.PROMOTE,	5);	// b3n
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.FUNCTION,	28);	// end

    design.addCommand(9, ZRF.FUNCTION,	24);	// from
    design.addCommand(9, ZRF.PROMOTE,	9);	// g1n
    design.addCommand(9, ZRF.FUNCTION,	25);	// to
    design.addCommand(9, ZRF.FUNCTION,	28);	// end

    design.addCommand(10, ZRF.FUNCTION,	24);	// from
    design.addCommand(10, ZRF.PROMOTE,	11);	// g2se
    design.addCommand(10, ZRF.FUNCTION,	25);	// to
    design.addCommand(10, ZRF.FUNCTION,	28);	// end

    design.addCommand(11, ZRF.FUNCTION,	24);	// from
    design.addCommand(11, ZRF.PROMOTE,	12);	// g2sw
    design.addCommand(11, ZRF.FUNCTION,	25);	// to
    design.addCommand(11, ZRF.FUNCTION,	28);	// end

    design.addCommand(12, ZRF.FUNCTION,	24);	// from
    design.addCommand(12, ZRF.PROMOTE,	13);	// g2nw
    design.addCommand(12, ZRF.FUNCTION,	25);	// to
    design.addCommand(12, ZRF.FUNCTION,	28);	// end

    design.addCommand(13, ZRF.FUNCTION,	24);	// from
    design.addCommand(13, ZRF.PROMOTE,	10);	// g2ne
    design.addCommand(13, ZRF.FUNCTION,	25);	// to
    design.addCommand(13, ZRF.FUNCTION,	28);	// end

    design.addCommand(14, ZRF.FUNCTION,	24);	// from
    design.addCommand(14, ZRF.PROMOTE,	15);	// g3e
    design.addCommand(14, ZRF.FUNCTION,	25);	// to
    design.addCommand(14, ZRF.FUNCTION,	28);	// end

    design.addCommand(15, ZRF.FUNCTION,	24);	// from
    design.addCommand(15, ZRF.PROMOTE,	16);	// g3s
    design.addCommand(15, ZRF.FUNCTION,	25);	// to
    design.addCommand(15, ZRF.FUNCTION,	28);	// end

    design.addCommand(16, ZRF.FUNCTION,	24);	// from
    design.addCommand(16, ZRF.PROMOTE,	17);	// g3w
    design.addCommand(16, ZRF.FUNCTION,	25);	// to
    design.addCommand(16, ZRF.FUNCTION,	28);	// end

    design.addCommand(17, ZRF.FUNCTION,	24);	// from
    design.addCommand(17, ZRF.PROMOTE,	14);	// g3n
    design.addCommand(17, ZRF.FUNCTION,	25);	// to
    design.addCommand(17, ZRF.FUNCTION,	28);	// end

    design.addPiece("b1n", 0, 8);

    design.addPiece("b2ne", 1, 12);
    design.addMove(1, 1, [], 0);

    design.addPiece("b2se", 2, 6);
    design.addMove(2, 2, [], 0);

    design.addPiece("b2sw", 3, 3);
    design.addMove(3, 3, [], 0);

    design.addPiece("b2nw", 4, 9);
    design.addMove(4, 4, [], 0);

    design.addPiece("b3n", 5, 13);
    design.addMove(5, 5, [], 0);

    design.addPiece("b3e", 6, 14);
    design.addMove(6, 6, [], 0);

    design.addPiece("b3s", 7, 7);
    design.addMove(7, 7, [], 0);

    design.addPiece("b3w", 8, 11);
    design.addMove(8, 8, [], 0);

    design.addPiece("g1n", 9, 8);
    design.addPiece("g2ne", 10, 12);
    design.addPiece("g2se", 11, 6);
    design.addPiece("g2sw", 12, 3);
    design.addPiece("g2nw", 13, 9);
    design.addPiece("g3n", 14, 13);
    design.addPiece("g3e", 15, 14);
    design.addPiece("g3s", 16, 7);
    design.addPiece("g3w", 17, 11);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("Youb1n", "You b1n");
    view.defPiece("Youb2ne", "You b2ne");
    view.defPiece("Youb2se", "You b2se");
    view.defPiece("Youb2sw", "You b2sw");
    view.defPiece("Youb2nw", "You b2nw");
    view.defPiece("Youb3n", "You b3n");
    view.defPiece("Youb3e", "You b3e");
    view.defPiece("Youb3s", "You b3s");
    view.defPiece("Youb3w", "You b3w");
    view.defPiece("Youg1n", "You g1n");
    view.defPiece("Youg2ne", "You g2ne");
    view.defPiece("Youg2se", "You g2se");
    view.defPiece("Youg2sw", "You g2sw");
    view.defPiece("Youg2nw", "You g2nw");
    view.defPiece("Youg3n", "You g3n");
    view.defPiece("Youg3e", "You g3e");
    view.defPiece("Youg3s", "You g3s");
    view.defPiece("Youg3w", "You g3w");
 
    view.defPosition("a9", 0, 0, 50, 50);
    view.defPosition("b9", 50, 0, 50, 50);
    view.defPosition("c9", 100, 0, 50, 50);
    view.defPosition("d9", 150, 0, 50, 50);
    view.defPosition("e9", 200, 0, 50, 50);
    view.defPosition("f9", 250, 0, 50, 50);
    view.defPosition("g9", 300, 0, 50, 50);
    view.defPosition("h9", 350, 0, 50, 50);
    view.defPosition("i9", 400, 0, 50, 50);
    view.defPosition("a8", 0, 50, 50, 50);
    view.defPosition("b8", 50, 50, 50, 50);
    view.defPosition("c8", 100, 50, 50, 50);
    view.defPosition("d8", 150, 50, 50, 50);
    view.defPosition("e8", 200, 50, 50, 50);
    view.defPosition("f8", 250, 50, 50, 50);
    view.defPosition("g8", 300, 50, 50, 50);
    view.defPosition("h8", 350, 50, 50, 50);
    view.defPosition("i8", 400, 50, 50, 50);
    view.defPosition("a7", 0, 100, 50, 50);
    view.defPosition("b7", 50, 100, 50, 50);
    view.defPosition("c7", 100, 100, 50, 50);
    view.defPosition("d7", 150, 100, 50, 50);
    view.defPosition("e7", 200, 100, 50, 50);
    view.defPosition("f7", 250, 100, 50, 50);
    view.defPosition("g7", 300, 100, 50, 50);
    view.defPosition("h7", 350, 100, 50, 50);
    view.defPosition("i7", 400, 100, 50, 50);
    view.defPosition("a6", 0, 150, 50, 50);
    view.defPosition("b6", 50, 150, 50, 50);
    view.defPosition("c6", 100, 150, 50, 50);
    view.defPosition("d6", 150, 150, 50, 50);
    view.defPosition("e6", 200, 150, 50, 50);
    view.defPosition("f6", 250, 150, 50, 50);
    view.defPosition("g6", 300, 150, 50, 50);
    view.defPosition("h6", 350, 150, 50, 50);
    view.defPosition("i6", 400, 150, 50, 50);
    view.defPosition("a5", 0, 200, 50, 50);
    view.defPosition("b5", 50, 200, 50, 50);
    view.defPosition("c5", 100, 200, 50, 50);
    view.defPosition("d5", 150, 200, 50, 50);
    view.defPosition("e5", 200, 200, 50, 50);
    view.defPosition("f5", 250, 200, 50, 50);
    view.defPosition("g5", 300, 200, 50, 50);
    view.defPosition("h5", 350, 200, 50, 50);
    view.defPosition("i5", 400, 200, 50, 50);
    view.defPosition("a4", 0, 250, 50, 50);
    view.defPosition("b4", 50, 250, 50, 50);
    view.defPosition("c4", 100, 250, 50, 50);
    view.defPosition("d4", 150, 250, 50, 50);
    view.defPosition("e4", 200, 250, 50, 50);
    view.defPosition("f4", 250, 250, 50, 50);
    view.defPosition("g4", 300, 250, 50, 50);
    view.defPosition("h4", 350, 250, 50, 50);
    view.defPosition("i4", 400, 250, 50, 50);
    view.defPosition("a3", 0, 300, 50, 50);
    view.defPosition("b3", 50, 300, 50, 50);
    view.defPosition("c3", 100, 300, 50, 50);
    view.defPosition("d3", 150, 300, 50, 50);
    view.defPosition("e3", 200, 300, 50, 50);
    view.defPosition("f3", 250, 300, 50, 50);
    view.defPosition("g3", 300, 300, 50, 50);
    view.defPosition("h3", 350, 300, 50, 50);
    view.defPosition("i3", 400, 300, 50, 50);
    view.defPosition("a2", 0, 350, 50, 50);
    view.defPosition("b2", 50, 350, 50, 50);
    view.defPosition("c2", 100, 350, 50, 50);
    view.defPosition("d2", 150, 350, 50, 50);
    view.defPosition("e2", 200, 350, 50, 50);
    view.defPosition("f2", 250, 350, 50, 50);
    view.defPosition("g2", 300, 350, 50, 50);
    view.defPosition("h2", 350, 350, 50, 50);
    view.defPosition("i2", 400, 350, 50, 50);
    view.defPosition("a1", 0, 400, 50, 50);
    view.defPosition("b1", 50, 400, 50, 50);
    view.defPosition("c1", 100, 400, 50, 50);
    view.defPosition("d1", 150, 400, 50, 50);
    view.defPosition("e1", 200, 400, 50, 50);
    view.defPosition("f1", 250, 400, 50, 50);
    view.defPosition("g1", 300, 400, 50, 50);
    view.defPosition("h1", 350, 400, 50, 50);
    view.defPosition("i1", 400, 400, 50, 50);
}
