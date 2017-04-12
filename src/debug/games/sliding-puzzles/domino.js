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
    design.checkVersion("smart-moves", "from");
    design.checkVersion("sliding-puzzle", "true");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("n");

    design.addPlayer("You", [1, 0, 3, 2]);

    design.addPosition("a7", [0, 1, 7, 0]);
    design.addPosition("b7", [-1, 1, 7, 0]);
    design.addPosition("c7", [-1, 1, 7, 0]);
    design.addPosition("d7", [-1, 1, 7, 0]);
    design.addPosition("e7", [-1, 1, 7, 0]);
    design.addPosition("f7", [-1, 1, 7, 0]);
    design.addPosition("g7", [-1, 0, 7, 0]);
    design.addPosition("a6", [0, 1, 7, -7]);
    design.addPosition("b6", [-1, 1, 7, -7]);
    design.addPosition("c6", [-1, 1, 7, -7]);
    design.addPosition("d6", [-1, 1, 7, -7]);
    design.addPosition("e6", [-1, 1, 7, -7]);
    design.addPosition("f6", [-1, 1, 7, -7]);
    design.addPosition("g6", [-1, 0, 7, -7]);
    design.addPosition("a5", [0, 1, 7, -7]);
    design.addPosition("b5", [-1, 1, 7, -7]);
    design.addPosition("c5", [-1, 1, 7, -7]);
    design.addPosition("d5", [-1, 1, 7, -7]);
    design.addPosition("e5", [-1, 1, 7, -7]);
    design.addPosition("f5", [-1, 1, 7, -7]);
    design.addPosition("g5", [-1, 0, 7, -7]);
    design.addPosition("a4", [0, 1, 7, -7]);
    design.addPosition("b4", [-1, 1, 7, -7]);
    design.addPosition("c4", [-1, 1, 7, -7]);
    design.addPosition("d4", [-1, 1, 7, -7]);
    design.addPosition("e4", [-1, 1, 7, -7]);
    design.addPosition("f4", [-1, 1, 7, -7]);
    design.addPosition("g4", [-1, 0, 7, -7]);
    design.addPosition("a3", [0, 1, 7, -7]);
    design.addPosition("b3", [-1, 1, 7, -7]);
    design.addPosition("c3", [-1, 1, 7, -7]);
    design.addPosition("d3", [-1, 1, 7, -7]);
    design.addPosition("e3", [-1, 1, 7, -7]);
    design.addPosition("f3", [-1, 1, 7, -7]);
    design.addPosition("g3", [-1, 0, 7, -7]);
    design.addPosition("a2", [0, 1, 7, -7]);
    design.addPosition("b2", [-1, 1, 7, -7]);
    design.addPosition("c2", [-1, 1, 7, -7]);
    design.addPosition("d2", [-1, 1, 7, -7]);
    design.addPosition("e2", [-1, 1, 7, -7]);
    design.addPosition("f2", [-1, 1, 7, -7]);
    design.addPosition("g2", [-1, 0, 7, -7]);
    design.addPosition("a1", [0, 1, 0, -7]);
    design.addPosition("b1", [-1, 1, 0, -7]);
    design.addPosition("c1", [-1, 1, 0, -7]);
    design.addPosition("d1", [-1, 1, 0, -7]);
    design.addPosition("e1", [-1, 1, 0, -7]);
    design.addPosition("f1", [-1, 1, 0, -7]);
    design.addPosition("g1", [-1, 0, 0, -7]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("HB1", 0);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [2], 0);
    design.addMove(0, 0, [0], 0);
    design.addMove(0, 0, [1], 0);

    design.addPiece("HT1", 1);
    design.addMove(1, 0, [3], 0);
    design.addMove(1, 0, [2], 0);
    design.addMove(1, 0, [0], 0);
    design.addMove(1, 0, [1], 0);

    design.addPiece("HB2", 2);
    design.addMove(2, 0, [3], 0);
    design.addMove(2, 0, [2], 0);
    design.addMove(2, 0, [0], 0);
    design.addMove(2, 0, [1], 0);

    design.addPiece("HT2", 3);
    design.addMove(3, 0, [3], 0);
    design.addMove(3, 0, [2], 0);
    design.addMove(3, 0, [0], 0);
    design.addMove(3, 0, [1], 0);

    design.addPiece("HR3", 4);
    design.addMove(4, 0, [3], 0);
    design.addMove(4, 0, [2], 0);
    design.addMove(4, 0, [0], 0);
    design.addMove(4, 0, [1], 0);

    design.addPiece("HL3", 5);
    design.addMove(5, 0, [3], 0);
    design.addMove(5, 0, [2], 0);
    design.addMove(5, 0, [0], 0);
    design.addMove(5, 0, [1], 0);

    design.addPiece("HB4", 6);
    design.addMove(6, 0, [3], 0);
    design.addMove(6, 0, [2], 0);
    design.addMove(6, 0, [0], 0);
    design.addMove(6, 0, [1], 0);

    design.addPiece("HT4", 7);
    design.addMove(7, 0, [3], 0);
    design.addMove(7, 0, [2], 0);
    design.addMove(7, 0, [0], 0);
    design.addMove(7, 0, [1], 0);

    design.addPiece("HR5", 8);
    design.addMove(8, 0, [3], 0);
    design.addMove(8, 0, [2], 0);
    design.addMove(8, 0, [0], 0);
    design.addMove(8, 0, [1], 0);

    design.addPiece("HL5", 9);
    design.addMove(9, 0, [3], 0);
    design.addMove(9, 0, [2], 0);
    design.addMove(9, 0, [0], 0);
    design.addMove(9, 0, [1], 0);

    design.addPiece("HB6", 10);
    design.addMove(10, 0, [3], 0);
    design.addMove(10, 0, [2], 0);
    design.addMove(10, 0, [0], 0);
    design.addMove(10, 0, [1], 0);

    design.addPiece("HT6", 11);
    design.addMove(11, 0, [3], 0);
    design.addMove(11, 0, [2], 0);
    design.addMove(11, 0, [0], 0);
    design.addMove(11, 0, [1], 0);

    design.addPiece("HB7", 12);
    design.addMove(12, 0, [3], 0);
    design.addMove(12, 0, [2], 0);
    design.addMove(12, 0, [0], 0);
    design.addMove(12, 0, [1], 0);

    design.addPiece("HT7", 13);
    design.addMove(13, 0, [3], 0);
    design.addMove(13, 0, [2], 0);
    design.addMove(13, 0, [0], 0);
    design.addMove(13, 0, [1], 0);

    design.addPiece("HR8", 14);
    design.addMove(14, 0, [3], 0);
    design.addMove(14, 0, [2], 0);
    design.addMove(14, 0, [0], 0);
    design.addMove(14, 0, [1], 0);

    design.addPiece("HL8", 15);
    design.addMove(15, 0, [3], 0);
    design.addMove(15, 0, [2], 0);
    design.addMove(15, 0, [0], 0);
    design.addMove(15, 0, [1], 0);

    design.addPiece("HB9", 16);
    design.addMove(16, 0, [3], 0);
    design.addMove(16, 0, [2], 0);
    design.addMove(16, 0, [0], 0);
    design.addMove(16, 0, [1], 0);

    design.addPiece("HT9", 17);
    design.addMove(17, 0, [3], 0);
    design.addMove(17, 0, [2], 0);
    design.addMove(17, 0, [0], 0);
    design.addMove(17, 0, [1], 0);

    design.addPiece("HB10", 18);
    design.addMove(18, 0, [3], 0);
    design.addMove(18, 0, [2], 0);
    design.addMove(18, 0, [0], 0);
    design.addMove(18, 0, [1], 0);

    design.addPiece("HT10", 19);
    design.addMove(19, 0, [3], 0);
    design.addMove(19, 0, [2], 0);
    design.addMove(19, 0, [0], 0);
    design.addMove(19, 0, [1], 0);

    design.addPiece("HB11", 20);
    design.addMove(20, 0, [3], 0);
    design.addMove(20, 0, [2], 0);
    design.addMove(20, 0, [0], 0);
    design.addMove(20, 0, [1], 0);

    design.addPiece("HT11", 21);
    design.addMove(21, 0, [3], 0);
    design.addMove(21, 0, [2], 0);
    design.addMove(21, 0, [0], 0);
    design.addMove(21, 0, [1], 0);

    design.addPiece("HB12", 22);
    design.addMove(22, 0, [3], 0);
    design.addMove(22, 0, [2], 0);
    design.addMove(22, 0, [0], 0);
    design.addMove(22, 0, [1], 0);

    design.addPiece("HT12", 23);
    design.addMove(23, 0, [3], 0);
    design.addMove(23, 0, [2], 0);
    design.addMove(23, 0, [0], 0);
    design.addMove(23, 0, [1], 0);

    design.addPiece("HB13", 24);
    design.addMove(24, 0, [3], 0);
    design.addMove(24, 0, [2], 0);
    design.addMove(24, 0, [0], 0);
    design.addMove(24, 0, [1], 0);

    design.addPiece("HT13", 25);
    design.addMove(25, 0, [3], 0);
    design.addMove(25, 0, [2], 0);
    design.addMove(25, 0, [0], 0);
    design.addMove(25, 0, [1], 0);

    design.addPiece("HR14", 26);
    design.addMove(26, 0, [3], 0);
    design.addMove(26, 0, [2], 0);
    design.addMove(26, 0, [0], 0);
    design.addMove(26, 0, [1], 0);

    design.addPiece("HL14", 27);
    design.addMove(27, 0, [3], 0);
    design.addMove(27, 0, [2], 0);
    design.addMove(27, 0, [0], 0);
    design.addMove(27, 0, [1], 0);

    design.addPiece("HB15", 28);
    design.addMove(28, 0, [3], 0);
    design.addMove(28, 0, [2], 0);
    design.addMove(28, 0, [0], 0);
    design.addMove(28, 0, [1], 0);

    design.addPiece("HT15", 29);
    design.addMove(29, 0, [3], 0);
    design.addMove(29, 0, [2], 0);
    design.addMove(29, 0, [0], 0);
    design.addMove(29, 0, [1], 0);

    design.addPiece("HR16", 30);
    design.addMove(30, 0, [3], 0);
    design.addMove(30, 0, [2], 0);
    design.addMove(30, 0, [0], 0);
    design.addMove(30, 0, [1], 0);

    design.addPiece("HL16", 31);
    design.addMove(31, 0, [3], 0);
    design.addMove(31, 0, [2], 0);
    design.addMove(31, 0, [0], 0);
    design.addMove(31, 0, [1], 0);

    design.addPiece("HR17", 32);
    design.addMove(32, 0, [3], 0);
    design.addMove(32, 0, [2], 0);
    design.addMove(32, 0, [0], 0);
    design.addMove(32, 0, [1], 0);

    design.addPiece("HL17", 33);
    design.addMove(33, 0, [3], 0);
    design.addMove(33, 0, [2], 0);
    design.addMove(33, 0, [0], 0);
    design.addMove(33, 0, [1], 0);

    design.addPiece("HR18", 34);
    design.addMove(34, 0, [3], 0);
    design.addMove(34, 0, [2], 0);
    design.addMove(34, 0, [0], 0);
    design.addMove(34, 0, [1], 0);

    design.addPiece("HL18", 35);
    design.addMove(35, 0, [3], 0);
    design.addMove(35, 0, [2], 0);
    design.addMove(35, 0, [0], 0);
    design.addMove(35, 0, [1], 0);

    design.addPiece("HR19", 36);
    design.addMove(36, 0, [3], 0);
    design.addMove(36, 0, [2], 0);
    design.addMove(36, 0, [0], 0);
    design.addMove(36, 0, [1], 0);

    design.addPiece("HL19", 37);
    design.addMove(37, 0, [3], 0);
    design.addMove(37, 0, [2], 0);
    design.addMove(37, 0, [0], 0);
    design.addMove(37, 0, [1], 0);

    design.addPiece("HR20", 38);
    design.addMove(38, 0, [3], 0);
    design.addMove(38, 0, [2], 0);
    design.addMove(38, 0, [0], 0);
    design.addMove(38, 0, [1], 0);

    design.addPiece("HL20", 39);
    design.addMove(39, 0, [3], 0);
    design.addMove(39, 0, [2], 0);
    design.addMove(39, 0, [0], 0);
    design.addMove(39, 0, [1], 0);

    design.addPiece("HR21", 40);
    design.addMove(40, 0, [3], 0);
    design.addMove(40, 0, [2], 0);
    design.addMove(40, 0, [0], 0);
    design.addMove(40, 0, [1], 0);

    design.addPiece("HL21", 41);
    design.addMove(41, 0, [3], 0);
    design.addMove(41, 0, [2], 0);
    design.addMove(41, 0, [0], 0);
    design.addMove(41, 0, [1], 0);

    design.addPiece("HR22", 42);
    design.addMove(42, 0, [3], 0);
    design.addMove(42, 0, [2], 0);
    design.addMove(42, 0, [0], 0);
    design.addMove(42, 0, [1], 0);

    design.addPiece("HL22", 43);
    design.addMove(43, 0, [3], 0);
    design.addMove(43, 0, [2], 0);
    design.addMove(43, 0, [0], 0);
    design.addMove(43, 0, [1], 0);

    design.addPiece("HR23", 44);
    design.addMove(44, 0, [3], 0);
    design.addMove(44, 0, [2], 0);
    design.addMove(44, 0, [0], 0);
    design.addMove(44, 0, [1], 0);

    design.addPiece("HL23", 45);
    design.addMove(45, 0, [3], 0);
    design.addMove(45, 0, [2], 0);
    design.addMove(45, 0, [0], 0);
    design.addMove(45, 0, [1], 0);

    design.addPiece("H24", 46);
    design.addMove(46, 0, [3], 0);
    design.addMove(46, 0, [2], 0);
    design.addMove(46, 0, [0], 0);
    design.addMove(46, 0, [1], 0);

    design.setup("You", "HB1", 2);
    design.setup("You", "HT1", 9);
    design.setup("You", "HB2", 3);
    design.setup("You", "HT2", 10);
    design.setup("You", "HR3", 4);
    design.setup("You", "HL3", 5);
    design.setup("You", "HB4", 6);
    design.setup("You", "HT4", 13);
    design.setup("You", "HR5", 7);
    design.setup("You", "HL5", 8);
    design.setup("You", "HB6", 11);
    design.setup("You", "HT6", 18);
    design.setup("You", "HB7", 12);
    design.setup("You", "HT7", 19);
    design.setup("You", "HR8", 14);
    design.setup("You", "HL8", 15);
    design.setup("You", "HB9", 16);
    design.setup("You", "HT9", 23);
    design.setup("You", "HB10", 17);
    design.setup("You", "HT10", 24);
    design.setup("You", "HB11", 20);
    design.setup("You", "HT11", 27);
    design.setup("You", "HB12", 21);
    design.setup("You", "HT12", 28);
    design.setup("You", "HB13", 22);
    design.setup("You", "HT13", 29);
    design.setup("You", "HR14", 25);
    design.setup("You", "HL14", 26);
    design.setup("You", "HB15", 30);
    design.setup("You", "HT15", 37);
    design.setup("You", "HR16", 31);
    design.setup("You", "HL16", 32);
    design.setup("You", "HR17", 33);
    design.setup("You", "HL17", 34);
    design.setup("You", "HR18", 35);
    design.setup("You", "HL18", 36);
    design.setup("You", "HR19", 38);
    design.setup("You", "HL19", 39);
    design.setup("You", "HR20", 40);
    design.setup("You", "HL20", 41);
    design.setup("You", "HR21", 42);
    design.setup("You", "HL21", 43);
    design.setup("You", "HR22", 44);
    design.setup("You", "HL22", 45);
    design.setup("You", "HR23", 46);
    design.setup("You", "HL23", 47);
    design.setup("You", "H24", 48);

    design.goal(0, "You", "H24", [0]);
}

Dagaz.View.configure = function(view) {
    view.defPiece("YouHB1", "You HB1");
    view.defPiece("YouHT1", "You HT1");
    view.defPiece("YouHB2", "You HB2");
    view.defPiece("YouHT2", "You HT2");
    view.defPiece("YouHR3", "You HR3");
    view.defPiece("YouHL3", "You HL3");
    view.defPiece("YouHB4", "You HB4");
    view.defPiece("YouHT4", "You HT4");
    view.defPiece("YouHR5", "You HR5");
    view.defPiece("YouHL5", "You HL5");
    view.defPiece("YouHB6", "You HB6");
    view.defPiece("YouHT6", "You HT6");
    view.defPiece("YouHB7", "You HB7");
    view.defPiece("YouHT7", "You HT7");
    view.defPiece("YouHR8", "You HR8");
    view.defPiece("YouHL8", "You HL8");
    view.defPiece("YouHB9", "You HB9");
    view.defPiece("YouHT9", "You HT9");
    view.defPiece("YouHB10", "You HB10");
    view.defPiece("YouHT10", "You HT10");
    view.defPiece("YouHB11", "You HB11");
    view.defPiece("YouHT11", "You HT11");
    view.defPiece("YouHB12", "You HB12");
    view.defPiece("YouHT12", "You HT12");
    view.defPiece("YouHB13", "You HB13");
    view.defPiece("YouHT13", "You HT13");
    view.defPiece("YouHR14", "You HR14");
    view.defPiece("YouHL14", "You HL14");
    view.defPiece("YouHB15", "You HB15");
    view.defPiece("YouHT15", "You HT15");
    view.defPiece("YouHR16", "You HR16");
    view.defPiece("YouHL16", "You HL16");
    view.defPiece("YouHR17", "You HR17");
    view.defPiece("YouHL17", "You HL17");
    view.defPiece("YouHR18", "You HR18");
    view.defPiece("YouHL18", "You HL18");
    view.defPiece("YouHR19", "You HR19");
    view.defPiece("YouHL19", "You HL19");
    view.defPiece("YouHR20", "You HR20");
    view.defPiece("YouHL20", "You HL20");
    view.defPiece("YouHR21", "You HR21");
    view.defPiece("YouHL21", "You HL21");
    view.defPiece("YouHR22", "You HR22");
    view.defPiece("YouHL22", "You HL22");
    view.defPiece("YouHR23", "You HR23");
    view.defPiece("YouHL23", "You HL23");
    view.defPiece("YouH24", "You H24"); 

    view.defPosition("a7", 0, 0, 50, 50);
    view.defPosition("b7", 50, 0, 50, 50);
    view.defPosition("c7", 100, 0, 50, 50);
    view.defPosition("d7", 150, 0, 50, 50);
    view.defPosition("e7", 200, 0, 50, 50);
    view.defPosition("f7", 250, 0, 50, 50);
    view.defPosition("g7", 300, 0, 50, 50);
    view.defPosition("a6", 0, 50, 50, 50);
    view.defPosition("b6", 50, 50, 50, 50);
    view.defPosition("c6", 100, 50, 50, 50);
    view.defPosition("d6", 150, 50, 50, 50);
    view.defPosition("e6", 200, 50, 50, 50);
    view.defPosition("f6", 250, 50, 50, 50);
    view.defPosition("g6", 300, 50, 50, 50);
    view.defPosition("a5", 0, 100, 50, 50);
    view.defPosition("b5", 50, 100, 50, 50);
    view.defPosition("c5", 100, 100, 50, 50);
    view.defPosition("d5", 150, 100, 50, 50);
    view.defPosition("e5", 200, 100, 50, 50);
    view.defPosition("f5", 250, 100, 50, 50);
    view.defPosition("g5", 300, 100, 50, 50);
    view.defPosition("a4", 0, 150, 50, 50);
    view.defPosition("b4", 50, 150, 50, 50);
    view.defPosition("c4", 100, 150, 50, 50);
    view.defPosition("d4", 150, 150, 50, 50);
    view.defPosition("e4", 200, 150, 50, 50);
    view.defPosition("f4", 250, 150, 50, 50);
    view.defPosition("g4", 300, 150, 50, 50);
    view.defPosition("a3", 0, 200, 50, 50);
    view.defPosition("b3", 50, 200, 50, 50);
    view.defPosition("c3", 100, 200, 50, 50);
    view.defPosition("d3", 150, 200, 50, 50);
    view.defPosition("e3", 200, 200, 50, 50);
    view.defPosition("f3", 250, 200, 50, 50);
    view.defPosition("g3", 300, 200, 50, 50);
    view.defPosition("a2", 0, 250, 50, 50);
    view.defPosition("b2", 50, 250, 50, 50);
    view.defPosition("c2", 100, 250, 50, 50);
    view.defPosition("d2", 150, 250, 50, 50);
    view.defPosition("e2", 200, 250, 50, 50);
    view.defPosition("f2", 250, 250, 50, 50);
    view.defPosition("g2", 300, 250, 50, 50);
    view.defPosition("a1", 0, 300, 50, 50);
    view.defPosition("b1", 50, 300, 50, 50);
    view.defPosition("c1", 100, 300, 50, 50);
    view.defPosition("d1", 150, 300, 50, 50);
    view.defPosition("e1", 200, 300, 50, 50);
    view.defPosition("f1", 250, 300, 50, 50);
    view.defPosition("g1", 300, 300, 50, 50);
}
