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
    design.checkVersion("animate-drops", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-drops", "true");
    design.checkVersion("show-captures", "false");
    design.checkVersion("pass-turn", "forced");
    design.checkVersion("blokus-extension", "5");

    design.addDirection("se");  // 0
    design.addDirection("s");   // 1
    design.addDirection("sw");  // 2
    design.addDirection("e");   // 3
    design.addDirection("w");   // 4
    design.addDirection("ne");  // 5
    design.addDirection("nw");  // 6
    design.addDirection("n");   // 7

    design.addPlayer("Blue", [6, 7, 5, 4, 3, 2, 0, 1]);
    design.addPlayer("Yellow", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPlayer("Red", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPlayer("Green", [0, 1, 2, 3, 4, 5, 6, 7]);

    design.addPosition("a10", [11, 10, 0, 1, 0, 0, 0, 0]);
    design.addPosition("b10", [11, 10, 9, 1, -1, 0, 0, 0]);
    design.addPosition("c10", [11, 10, 9, 1, -1, 0, 0, 0]);
    design.addPosition("d10", [11, 10, 9, 1, -1, 0, 0, 0]);
    design.addPosition("e10", [11, 10, 9, 1, -1, 0, 0, 0]);
    design.addPosition("f10", [11, 10, 9, 1, -1, 0, 0, 0]);
    design.addPosition("g10", [11, 10, 9, 1, -1, 0, 0, 0]);
    design.addPosition("h10", [11, 10, 9, 1, -1, 0, 0, 0]);
    design.addPosition("i10", [11, 10, 9, 1, -1, 0, 0, 0]);
    design.addPosition("j10", [0, 10, 9, 0, -1, 0, 0, 0]);
    design.addPosition("a9", [11, 10, 0, 1, 0, -9, 0, -10]);
    design.addPosition("b9", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("c9", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("d9", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("e9", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("f9", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("g9", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("h9", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("i9", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("j9", [0, 10, 9, 0, -1, 0, -11, -10]);
    design.addPosition("a8", [11, 10, 0, 1, 0, -9, 0, -10]);
    design.addPosition("b8", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("c8", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("d8", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("e8", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("f8", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("g8", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("h8", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("i8", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("j8", [0, 10, 9, 0, -1, 0, -11, -10]);
    design.addPosition("a7", [11, 10, 0, 1, 0, -9, 0, -10]);
    design.addPosition("b7", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("c7", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("d7", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("e7", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("f7", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("g7", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("h7", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("i7", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("j7", [0, 10, 9, 0, -1, 0, -11, -10]);
    design.addPosition("a6", [11, 10, 0, 1, 0, -9, 0, -10]);
    design.addPosition("b6", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("c6", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("d6", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("e6", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("f6", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("g6", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("h6", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("i6", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("j6", [0, 10, 9, 0, -1, 0, -11, -10]);
    design.addPosition("a5", [11, 10, 0, 1, 0, -9, 0, -10]);
    design.addPosition("b5", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("c5", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("d5", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("e5", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("f5", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("g5", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("h5", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("i5", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("j5", [0, 10, 9, 0, -1, 0, -11, -10]);
    design.addPosition("a4", [11, 10, 0, 1, 0, -9, 0, -10]);
    design.addPosition("b4", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("c4", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("d4", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("e4", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("f4", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("g4", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("h4", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("i4", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("j4", [0, 10, 9, 0, -1, 0, -11, -10]);
    design.addPosition("a3", [11, 10, 0, 1, 0, -9, 0, -10]);
    design.addPosition("b3", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("c3", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("d3", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("e3", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("f3", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("g3", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("h3", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("i3", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("j3", [0, 10, 9, 0, -1, 0, -11, -10]);
    design.addPosition("a2", [11, 10, 0, 1, 0, -9, 0, -10]);
    design.addPosition("b2", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("c2", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("d2", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("e2", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("f2", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("g2", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("h2", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("i2", [11, 10, 9, 1, -1, -9, -11, -10]);
    design.addPosition("j2", [0, 10, 9, 0, -1, 0, -11, -10]);
    design.addPosition("a1", [0, 0, 0, 1, 0, -9, 0, -10]);
    design.addPosition("b1", [0, 0, 0, 1, -1, -9, -11, -10]);
    design.addPosition("c1", [0, 0, 0, 1, -1, -9, -11, -10]);
    design.addPosition("d1", [0, 0, 0, 1, -1, -9, -11, -10]);
    design.addPosition("e1", [0, 0, 0, 1, -1, -9, -11, -10]);
    design.addPosition("f1", [0, 0, 0, 1, -1, -9, -11, -10]);
    design.addPosition("g1", [0, 0, 0, 1, -1, -9, -11, -10]);
    design.addPosition("h1", [0, 0, 0, 1, -1, -9, -11, -10]);
    design.addPosition("i1", [0, 0, 0, 1, -1, -9, -11, -10]);
    design.addPosition("j1", [0, 0, 0, 0, -1, 0, -11, -10]);

    design.addZone("home", 3, [0]);
    design.addZone("home", 1, [99]);
    design.addZone("home", 2, [90]);
    design.addZone("home", 4, [9]);

    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("B0", 0);
    design.addDrop(0, 0, [], 0);

    design.addPiece("B1", 1);
    design.addDrop(1, 0, [], 0);

    design.addPiece("B2", 2);

    design.addPiece("B3", 3);
    design.addDrop(3, 0, [], 0);

    design.addPiece("B4", 4);

    design.addPiece("B5", 5);

    design.addPiece("B6", 6);

    design.addPiece("B7", 7);
    design.addDrop(7, 0, [], 0);

    design.addPiece("B8", 8);

    design.addPiece("B9", 9);

    design.addPiece("B10", 10);

    design.addPiece("B11", 11);
    design.addDrop(11, 0, [], 0);

    design.addPiece("B12", 12);

    design.addPiece("B13", 13);

    design.addPiece("B14", 14);

    design.addPiece("B15", 15);

    design.addPiece("B16", 16);

    design.addPiece("B17", 17);

    design.addPiece("B18", 18);

    design.addPiece("B19", 19);

    design.addPiece("B20", 20);

    design.addPiece("B21", 21);

    design.addPiece("B22", 22);

    design.addPiece("B23", 23);

    design.addPiece("B24", 24);

    design.addPiece("B25", 25);

    design.addPiece("B26", 26);

    design.addPiece("B27", 27);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("BlueB0", "Blue B0");
    view.defPiece("GreenB0", "Green B0");
    view.defPiece("RedB0", "Red B0");
    view.defPiece("YellowB0", "Yellow B0");
    view.defPiece("BlueB1", "Blue B1");
    view.defPiece("GreenB1", "Green B1");
    view.defPiece("RedB1", "Red B1");
    view.defPiece("YellowB1", "Yellow B1");
    view.defPiece("BlueB2", "Blue B2");
    view.defPiece("GreenB2", "Green B2");
    view.defPiece("RedB2", "Red B2");
    view.defPiece("YellowB2", "Yellow B2");
    view.defPiece("BlueB3", "Blue B3");
    view.defPiece("GreenB3", "Green B3");
    view.defPiece("RedB3", "Red B3");
    view.defPiece("YellowB3", "Yellow B3");
    view.defPiece("BlueB4", "Blue B4");
    view.defPiece("GreenB4", "Green B4");
    view.defPiece("RedB4", "Red B4");
    view.defPiece("YellowB4", "Yellow B4");
    view.defPiece("BlueB5", "Blue B5");
    view.defPiece("GreenB5", "Green B5");
    view.defPiece("RedB5", "Red B5");
    view.defPiece("YellowB5", "Yellow B5");
    view.defPiece("BlueB6", "Blue B6");
    view.defPiece("GreenB6", "Green B6");
    view.defPiece("RedB6", "Red B6");
    view.defPiece("YellowB6", "Yellow B6");
    view.defPiece("BlueB7", "Blue B7");
    view.defPiece("GreenB7", "Green B7");
    view.defPiece("RedB7", "Red B7");
    view.defPiece("YellowB7", "Yellow B7");
    view.defPiece("BlueB8", "Blue B8");
    view.defPiece("GreenB8", "Green B8");
    view.defPiece("RedB8", "Red B8");
    view.defPiece("YellowB8", "Yellow B8");
    view.defPiece("BlueB9", "Blue B9");
    view.defPiece("GreenB9", "Green B9");
    view.defPiece("RedB9", "Red B9");
    view.defPiece("YellowB9", "Yellow B9");
    view.defPiece("BlueB10", "Blue B10");
    view.defPiece("GreenB10", "Green B10");
    view.defPiece("RedB10", "Red B10");
    view.defPiece("YellowB10", "Yellow B10");
    view.defPiece("BlueB11", "Blue B11");
    view.defPiece("GreenB11", "Green B11");
    view.defPiece("RedB11", "Red B11");
    view.defPiece("YellowB11", "Yellow B11");
    view.defPiece("BlueB12", "Blue B12");
    view.defPiece("GreenB12", "Green B12");
    view.defPiece("RedB12", "Red B12");
    view.defPiece("YellowB12", "Yellow B12");
    view.defPiece("BlueB13", "Blue B13");
    view.defPiece("GreenB13", "Green B13");
    view.defPiece("RedB13", "Red B13");
    view.defPiece("YellowB13", "Yellow B13");
    view.defPiece("BlueB14", "Blue B14");
    view.defPiece("GreenB14", "Green B14");
    view.defPiece("RedB14", "Red B14");
    view.defPiece("YellowB14", "Yellow B14");
    view.defPiece("BlueB15", "Blue B15");
    view.defPiece("GreenB15", "Green B15");
    view.defPiece("RedB15", "Red B15");
    view.defPiece("YellowB15", "Yellow B15");
    view.defPiece("BlueB16", "Blue B16");
    view.defPiece("GreenB16", "Green B16");
    view.defPiece("RedB16", "Red B16");
    view.defPiece("YellowB16", "Yellow B16");
    view.defPiece("BlueB17", "Blue B17");
    view.defPiece("GreenB17", "Green B17");
    view.defPiece("RedB17", "Red B17");
    view.defPiece("YellowB17", "Yellow B17");
    view.defPiece("BlueB18", "Blue B18");
    view.defPiece("GreenB18", "Green B18");
    view.defPiece("RedB18", "Red B18");
    view.defPiece("YellowB18", "Yellow B18");
    view.defPiece("BlueB19", "Blue B19");
    view.defPiece("GreenB19", "Green B19");
    view.defPiece("RedB19", "Red B19");
    view.defPiece("YellowB19", "Yellow B19");
    view.defPiece("BlueB20", "Blue B20");
    view.defPiece("GreenB20", "Green B20");
    view.defPiece("RedB20", "Red B20");
    view.defPiece("YellowB20", "Yellow B20");
    view.defPiece("BlueB21", "Blue B21");
    view.defPiece("GreenB21", "Green B21");
    view.defPiece("RedB21", "Red B21");
    view.defPiece("YellowB21", "Yellow B21");
    view.defPiece("BlueB22", "Blue B22");
    view.defPiece("GreenB22", "Green B22");
    view.defPiece("RedB22", "Red B22");
    view.defPiece("YellowB22", "Yellow B22");
    view.defPiece("BlueB23", "Blue B23");
    view.defPiece("GreenB23", "Green B23");
    view.defPiece("RedB23", "Red B23");
    view.defPiece("YellowB23", "Yellow B23");
    view.defPiece("BlueB24", "Blue B24");
    view.defPiece("GreenB24", "Green B24");
    view.defPiece("RedB24", "Red B24");
    view.defPiece("YellowB24", "Yellow B24");
    view.defPiece("BlueB25", "Blue B25");
    view.defPiece("GreenB25", "Green B25");
    view.defPiece("RedB25", "Red B25");
    view.defPiece("YellowB25", "Yellow B25");
    view.defPiece("BlueB26", "Blue B26");
    view.defPiece("GreenB26", "Green B26");
    view.defPiece("RedB26", "Red B26");
    view.defPiece("YellowB26", "Yellow B26");
    view.defPiece("BlueB27", "Blue B27");
    view.defPiece("GreenB27", "Green B27");
    view.defPiece("RedB27", "Red B27");
    view.defPiece("YellowB27", "Yellow B27");
 
    view.defPosition("a10", 2, 2, 50, 50);
    view.defPosition("b10", 52, 2, 50, 50);
    view.defPosition("c10", 102, 2, 50, 50);
    view.defPosition("d10", 152, 2, 50, 50);
    view.defPosition("e10", 202, 2, 50, 50);
    view.defPosition("f10", 252, 2, 50, 50);
    view.defPosition("g10", 302, 2, 50, 50);
    view.defPosition("h10", 352, 2, 50, 50);
    view.defPosition("i10", 402, 2, 50, 50);
    view.defPosition("j10", 452, 2, 50, 50);
    view.defPosition("a9", 2, 52, 50, 50);
    view.defPosition("b9", 52, 52, 50, 50);
    view.defPosition("c9", 102, 52, 50, 50);
    view.defPosition("d9", 152, 52, 50, 50);
    view.defPosition("e9", 202, 52, 50, 50);
    view.defPosition("f9", 252, 52, 50, 50);
    view.defPosition("g9", 302, 52, 50, 50);
    view.defPosition("h9", 352, 52, 50, 50);
    view.defPosition("i9", 402, 52, 50, 50);
    view.defPosition("j9", 452, 52, 50, 50);
    view.defPosition("a8", 2, 102, 50, 50);
    view.defPosition("b8", 52, 102, 50, 50);
    view.defPosition("c8", 102, 102, 50, 50);
    view.defPosition("d8", 152, 102, 50, 50);
    view.defPosition("e8", 202, 102, 50, 50);
    view.defPosition("f8", 252, 102, 50, 50);
    view.defPosition("g8", 302, 102, 50, 50);
    view.defPosition("h8", 352, 102, 50, 50);
    view.defPosition("i8", 402, 102, 50, 50);
    view.defPosition("j8", 452, 102, 50, 50);
    view.defPosition("a7", 2, 152, 50, 50);
    view.defPosition("b7", 52, 152, 50, 50);
    view.defPosition("c7", 102, 152, 50, 50);
    view.defPosition("d7", 152, 152, 50, 50);
    view.defPosition("e7", 202, 152, 50, 50);
    view.defPosition("f7", 252, 152, 50, 50);
    view.defPosition("g7", 302, 152, 50, 50);
    view.defPosition("h7", 352, 152, 50, 50);
    view.defPosition("i7", 402, 152, 50, 50);
    view.defPosition("j7", 452, 152, 50, 50);
    view.defPosition("a6", 2, 202, 50, 50);
    view.defPosition("b6", 52, 202, 50, 50);
    view.defPosition("c6", 102, 202, 50, 50);
    view.defPosition("d6", 152, 202, 50, 50);
    view.defPosition("e6", 202, 202, 50, 50);
    view.defPosition("f6", 252, 202, 50, 50);
    view.defPosition("g6", 302, 202, 50, 50);
    view.defPosition("h6", 352, 202, 50, 50);
    view.defPosition("i6", 402, 202, 50, 50);
    view.defPosition("j6", 452, 202, 50, 50);
    view.defPosition("a5", 2, 252, 50, 50);
    view.defPosition("b5", 52, 252, 50, 50);
    view.defPosition("c5", 102, 252, 50, 50);
    view.defPosition("d5", 152, 252, 50, 50);
    view.defPosition("e5", 202, 252, 50, 50);
    view.defPosition("f5", 252, 252, 50, 50);
    view.defPosition("g5", 302, 252, 50, 50);
    view.defPosition("h5", 352, 252, 50, 50);
    view.defPosition("i5", 402, 252, 50, 50);
    view.defPosition("j5", 452, 252, 50, 50);
    view.defPosition("a4", 2, 302, 50, 50);
    view.defPosition("b4", 52, 302, 50, 50);
    view.defPosition("c4", 102, 302, 50, 50);
    view.defPosition("d4", 152, 302, 50, 50);
    view.defPosition("e4", 202, 302, 50, 50);
    view.defPosition("f4", 252, 302, 50, 50);
    view.defPosition("g4", 302, 302, 50, 50);
    view.defPosition("h4", 352, 302, 50, 50);
    view.defPosition("i4", 402, 302, 50, 50);
    view.defPosition("j4", 452, 302, 50, 50);
    view.defPosition("a3", 2, 352, 50, 50);
    view.defPosition("b3", 52, 352, 50, 50);
    view.defPosition("c3", 102, 352, 50, 50);
    view.defPosition("d3", 152, 352, 50, 50);
    view.defPosition("e3", 202, 352, 50, 50);
    view.defPosition("f3", 252, 352, 50, 50);
    view.defPosition("g3", 302, 352, 50, 50);
    view.defPosition("h3", 352, 352, 50, 50);
    view.defPosition("i3", 402, 352, 50, 50);
    view.defPosition("j3", 452, 352, 50, 50);
    view.defPosition("a2", 2, 402, 50, 50);
    view.defPosition("b2", 52, 402, 50, 50);
    view.defPosition("c2", 102, 402, 50, 50);
    view.defPosition("d2", 152, 402, 50, 50);
    view.defPosition("e2", 202, 402, 50, 50);
    view.defPosition("f2", 252, 402, 50, 50);
    view.defPosition("g2", 302, 402, 50, 50);
    view.defPosition("h2", 352, 402, 50, 50);
    view.defPosition("i2", 402, 402, 50, 50);
    view.defPosition("j2", 452, 402, 50, 50);
    view.defPosition("a1", 2, 452, 50, 50);
    view.defPosition("b1", 52, 452, 50, 50);
    view.defPosition("c1", 102, 452, 50, 50);
    view.defPosition("d1", 152, 452, 50, 50);
    view.defPosition("e1", 202, 452, 50, 50);
    view.defPosition("f1", 252, 452, 50, 50);
    view.defPosition("g1", 302, 452, 50, 50);
    view.defPosition("h1", 352, 452, 50, 50);
    view.defPosition("i1", 402, 452, 50, 50);
    view.defPosition("j1", 452, 452, 50, 50);
}
