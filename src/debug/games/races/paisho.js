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
    design.checkVersion("pass-partial", "true");
    design.checkVersion("smart-moves", "false");
    design.checkVersion("detect-loops", "true");
    design.checkVersion("advisor-wait", "5");

    design.addDirection("n");
    design.addDirection("s");
    design.addDirection("e");
    design.addDirection("w");
    design.addDirection("ne");
    design.addDirection("sw");
    design.addDirection("nw");
    design.addDirection("se");

    design.addPlayer("Black", [1, 0, 3, 2, 5, 4, 7, 6]);
    design.addPlayer("White", [0, 1, 2, 3, 4, 5, 6, 7]);

    design.addPosition("a15", [0, 1, 5, 0, 122, 0, 0, 123]);
    design.addPosition("a13", [-1, 1, 5, 0, 122, 0, 0, 123]);
    design.addPosition("a11", [-1, 0, 5, 0, 122, 0, 0, 123]);
    design.addPosition("b19", [0, 1, 8, 0, 124, 118, 0, 125]);
    design.addPosition("b17", [-1, 1, 8, 0, 124, 118, 117, 125]);
    design.addPosition("b15", [-1, 1, 8, -5, 124, 118, 117, 125]);
    design.addPosition("b13", [-1, 1, 8, -5, 124, 118, 117, 125]);
    design.addPosition("b11", [-1, 1, 8, -5, 124, 118, 117, 125]);
    design.addPosition("b9", [-1, 1, 8, 0, 124, 118, 117, 125]);
    design.addPosition("b7", [-1, 0, 8, 0, 124, 0, 117, 125]);
    design.addPosition("c21", [0, 1, 10, 0, 125, 117, 0, 126]);
    design.addPosition("c19", [-1, 1, 10, -8, 125, 117, 116, 126]);
    design.addPosition("c17", [-1, 1, 10, -8, 125, 117, 116, 126]);
    design.addPosition("c15", [-1, 1, 10, -8, 125, 117, 116, 126]);
    design.addPosition("c13", [-1, 1, 10, -8, 125, 117, 116, 126]);
    design.addPosition("c11", [-1, 1, 10, -8, 125, 117, 116, 126]);
    design.addPosition("c9", [-1, 1, 10, -8, 125, 117, 116, 126]);
    design.addPosition("c7", [-1, 1, 10, -8, 125, 117, 116, 126]);
    design.addPosition("c5", [-1, 0, 10, 0, 125, 0, 116, 126]);
    design.addPosition("d23", [0, 1, 11, 0, 126, 116, 0, 127]);
    design.addPosition("d21", [-1, 1, 11, -10, 126, 116, 115, 127]);
    design.addPosition("d19", [-1, 1, 11, -10, 126, 116, 115, 127]);
    design.addPosition("d17", [-1, 1, 11, -10, 126, 116, 115, 127]);
    design.addPosition("d15", [-1, 1, 11, -10, 126, 116, 115, 127]);
    design.addPosition("d13", [-1, 1, 11, -10, 126, 116, 115, 127]);
    design.addPosition("d11", [-1, 1, 11, -10, 126, 116, 115, 127]);
    design.addPosition("d9", [-1, 1, 11, -10, 126, 116, 115, 127]);
    design.addPosition("d7", [-1, 1, 11, -10, 126, 116, 115, 127]);
    design.addPosition("d5", [-1, 1, 11, -10, 126, 116, 115, 127]);
    design.addPosition("d3", [-1, 0, 11, 0, 126, 0, 115, 127]);
    design.addPosition("e23", [0, 1, 12, -11, 127, 116, 115, 128]);
    design.addPosition("e21", [-1, 1, 12, -11, 127, 116, 115, 128]);
    design.addPosition("e19", [-1, 1, 12, -11, 127, 116, 115, 128]);
    design.addPosition("e17", [-1, 1, 12, -11, 127, 116, 115, 128]);
    design.addPosition("e15", [-1, 1, 12, -11, 127, 116, 115, 128]);
    design.addPosition("e13", [-1, 1, 12, -11, 127, 116, 115, 128]);
    design.addPosition("e11", [-1, 1, 12, -11, 127, 116, 115, 128]);
    design.addPosition("e9", [-1, 1, 12, -11, 127, 116, 115, 128]);
    design.addPosition("e7", [-1, 1, 12, -11, 127, 116, 115, 128]);
    design.addPosition("e5", [-1, 1, 12, -11, 127, 116, 115, 128]);
    design.addPosition("e3", [-1, 0, 12, -11, 127, 116, 115, 128]);
    design.addPosition("f25", [0, 1, 13, 0, 0, 116, 0, 128]);
    design.addPosition("f23", [-1, 1, 13, -12, 127, 116, 115, 128]);
    design.addPosition("f21", [-1, 1, 13, -12, 127, 116, 115, 128]);
    design.addPosition("f19", [-1, 1, 13, -12, 127, 116, 115, 128]);
    design.addPosition("f17", [-1, 1, 13, -12, 127, 116, 115, 128]);
    design.addPosition("f15", [-1, 1, 13, -12, 127, 116, 115, 128]);
    design.addPosition("f13", [-1, 1, 13, -12, 127, 116, 115, 128]);
    design.addPosition("f11", [-1, 1, 13, -12, 127, 116, 115, 128]);
    design.addPosition("f9", [-1, 1, 13, -12, 127, 116, 115, 128]);
    design.addPosition("f7", [-1, 1, 13, -12, 127, 116, 115, 128]);
    design.addPosition("f5", [-1, 1, 13, -12, 127, 116, 115, 128]);
    design.addPosition("f3", [-1, 1, 13, -12, 127, 116, 115, 128]);
    design.addPosition("f1", [-1, 0, 13, 0, 127, 0, 115, 0]);
    design.addPosition("g25", [0, 1, 13, -13, 0, 115, 0, 127]);
    design.addPosition("g23", [-1, 1, 13, -13, 126, 115, 114, 127]);
    design.addPosition("g21", [-1, 1, 13, -13, 126, 115, 114, 127]);
    design.addPosition("g19", [-1, 1, 13, -13, 126, 115, 114, 127]);
    design.addPosition("g17", [-1, 1, 13, -13, 126, 115, 114, 127]);
    design.addPosition("g15", [-1, 1, 13, -13, 126, 115, 114, 127]);
    design.addPosition("g13", [-1, 1, 13, -13, 126, 115, 114, 127]);
    design.addPosition("g11", [-1, 1, 13, -13, 126, 115, 114, 127]);
    design.addPosition("g9", [-1, 1, 13, -13, 126, 115, 114, 127]);
    design.addPosition("g7", [-1, 1, 13, -13, 126, 115, 114, 127]);
    design.addPosition("g5", [-1, 1, 13, -13, 126, 115, 114, 127]);
    design.addPosition("g3", [-1, 1, 13, -13, 126, 115, 114, 127]);
    design.addPosition("g1", [-1, 0, 13, -13, 126, 0, 114, 0]);
    design.addPosition("h25", [0, 1, 0, -13, 0, 114, 0, 126]);
    design.addPosition("h23", [-1, 1, 12, -13, 125, 114, 113, 126]);
    design.addPosition("h21", [-1, 1, 12, -13, 125, 114, 113, 126]);
    design.addPosition("h19", [-1, 1, 12, -13, 125, 114, 113, 126]);
    design.addPosition("h17", [-1, 1, 12, -13, 125, 114, 113, 126]);
    design.addPosition("h15", [-1, 1, 12, -13, 125, 114, 113, 126]);
    design.addPosition("h13", [-1, 1, 12, -13, 125, 114, 113, 126]);
    design.addPosition("h11", [-1, 1, 12, -13, 125, 114, 113, 126]);
    design.addPosition("h9", [-1, 1, 12, -13, 125, 114, 113, 126]);
    design.addPosition("h7", [-1, 1, 12, -13, 125, 114, 113, 126]);
    design.addPosition("h5", [-1, 1, 12, -13, 125, 114, 113, 126]);
    design.addPosition("h3", [-1, 1, 12, -13, 125, 114, 113, 126]);
    design.addPosition("h1", [-1, 0, 0, -13, 125, 0, 113, 0]);
    design.addPosition("i23", [0, 1, 11, -12, 125, 114, 113, 126]);
    design.addPosition("i21", [-1, 1, 11, -12, 125, 114, 113, 126]);
    design.addPosition("i19", [-1, 1, 11, -12, 125, 114, 113, 126]);
    design.addPosition("i17", [-1, 1, 11, -12, 125, 114, 113, 126]);
    design.addPosition("i15", [-1, 1, 11, -12, 125, 114, 113, 126]);
    design.addPosition("i13", [-1, 1, 11, -12, 125, 114, 113, 126]);
    design.addPosition("i11", [-1, 1, 11, -12, 125, 114, 113, 126]);
    design.addPosition("i9", [-1, 1, 11, -12, 125, 114, 113, 126]);
    design.addPosition("i7", [-1, 1, 11, -12, 125, 114, 113, 126]);
    design.addPosition("i5", [-1, 1, 11, -12, 125, 114, 113, 126]);
    design.addPosition("i3", [-1, 0, 11, -12, 125, 114, 113, 126]);
    design.addPosition("j23", [0, 1, 0, -11, 0, 115, 114, 126]);
    design.addPosition("j21", [-1, 1, 10, -11, 125, 115, 114, 126]);
    design.addPosition("j19", [-1, 1, 10, -11, 125, 115, 114, 126]);
    design.addPosition("j17", [-1, 1, 10, -11, 125, 115, 114, 126]);
    design.addPosition("j15", [-1, 1, 10, -11, 125, 115, 114, 126]);
    design.addPosition("j13", [-1, 1, 10, -11, 125, 115, 114, 126]);
    design.addPosition("j11", [-1, 1, 10, -11, 125, 115, 114, 126]);
    design.addPosition("j9", [-1, 1, 10, -11, 125, 115, 114, 126]);
    design.addPosition("j7", [-1, 1, 10, -11, 125, 115, 114, 126]);
    design.addPosition("j5", [-1, 1, 10, -11, 125, 115, 114, 126]);
    design.addPosition("j3", [-1, 0, 0, -11, 125, 115, 114, 0]);
    design.addPosition("k21", [0, 1, 0, -10, 0, 116, 115, 125]);
    design.addPosition("k19", [-1, 1, 8, -10, 124, 116, 115, 125]);
    design.addPosition("k17", [-1, 1, 8, -10, 124, 116, 115, 125]);
    design.addPosition("k15", [-1, 1, 8, -10, 124, 116, 115, 125]);
    design.addPosition("k13", [-1, 1, 8, -10, 124, 116, 115, 125]);
    design.addPosition("k11", [-1, 1, 8, -10, 124, 116, 115, 125]);
    design.addPosition("k9", [-1, 1, 8, -10, 124, 116, 115, 125]);
    design.addPosition("k7", [-1, 1, 8, -10, 124, 116, 115, 125]);
    design.addPosition("k5", [-1, 0, 0, -10, 124, 116, 115, 0]);
    design.addPosition("l19", [0, 1, 0, -8, 0, 117, 116, 124]);
    design.addPosition("l17", [-1, 1, 0, -8, 123, 117, 116, 124]);
    design.addPosition("l15", [-1, 1, 5, -8, 123, 117, 116, 124]);
    design.addPosition("l13", [-1, 1, 5, -8, 123, 117, 116, 124]);
    design.addPosition("l11", [-1, 1, 5, -8, 123, 117, 116, 124]);
    design.addPosition("l9", [-1, 1, 0, -8, 123, 117, 116, 124]);
    design.addPosition("l7", [-1, 0, 0, -8, 123, 117, 116, 0]);
    design.addPosition("m15", [0, 1, 0, -5, 0, 119, 118, 0]);
    design.addPosition("m13", [-1, 1, 0, -5, 0, 119, 118, 0]);
    design.addPosition("m11", [-1, 0, 0, -5, 0, 119, 118, 0]);
    design.addPosition("a18", [0, 1, 7, 0, -118, 0, 0, -117]);
    design.addPosition("a16", [-1, 1, 7, 0, -118, -122, 0, -117]);
    design.addPosition("a14", [-1, 1, 7, 0, -118, -122, -123, -117]);
    design.addPosition("a12", [-1, 1, 7, 0, -118, -122, -123, -117]);
    design.addPosition("a10", [-1, 1, 7, 0, -118, 0, -123, -117]);
    design.addPosition("a8", [-1, 0, 7, 0, -118, 0, 0, -117]);
    design.addPosition("b20", [0, 1, 9, 0, -117, -124, 0, -116]);
    design.addPosition("b18", [-1, 1, 9, -7, -117, -124, -125, -116]);
    design.addPosition("b16", [-1, 1, 9, -7, -117, -124, -125, -116]);
    design.addPosition("b14", [-1, 1, 9, -7, -117, -124, -125, -116]);
    design.addPosition("b12", [-1, 1, 9, -7, -117, -124, -125, -116]);
    design.addPosition("b10", [-1, 1, 9, -7, -117, -124, -125, -116]);
    design.addPosition("b8", [-1, 1, 9, -7, -117, -124, -125, -116]);
    design.addPosition("b6", [-1, 0, 9, 0, -117, 0, -125, -116]);
    design.addPosition("c22", [0, 1, 11, 0, -116, -125, 0, -115]);
    design.addPosition("c20", [-1, 1, 11, -9, -116, -125, -126, -115]);
    design.addPosition("c18", [-1, 1, 11, -9, -116, -125, -126, -115]);
    design.addPosition("c16", [-1, 1, 11, -9, -116, -125, -126, -115]);
    design.addPosition("c14", [-1, 1, 11, -9, -116, -125, -126, -115]);
    design.addPosition("c12", [-1, 1, 11, -9, -116, -125, -126, -115]);
    design.addPosition("c10", [-1, 1, 11, -9, -116, -125, -126, -115]);
    design.addPosition("c8", [-1, 1, 11, -9, -116, -125, -126, -115]);
    design.addPosition("c6", [-1, 1, 11, -9, -116, -125, -126, -115]);
    design.addPosition("c4", [-1, 0, 11, 0, -116, 0, -126, -115]);
    design.addPosition("d24", [0, 1, 12, 0, 0, -126, 0, -115]);
    design.addPosition("d22", [-1, 1, 12, -11, -116, -126, -127, -115]);
    design.addPosition("d20", [-1, 1, 12, -11, -116, -126, -127, -115]);
    design.addPosition("d18", [-1, 1, 12, -11, -116, -126, -127, -115]);
    design.addPosition("d16", [-1, 1, 12, -11, -116, -126, -127, -115]);
    design.addPosition("d14", [-1, 1, 12, -11, -116, -126, -127, -115]);
    design.addPosition("d12", [-1, 1, 12, -11, -116, -126, -127, -115]);
    design.addPosition("d10", [-1, 1, 12, -11, -116, -126, -127, -115]);
    design.addPosition("d8", [-1, 1, 12, -11, -116, -126, -127, -115]);
    design.addPosition("d6", [-1, 1, 12, -11, -116, -126, -127, -115]);
    design.addPosition("d4", [-1, 1, 12, -11, -116, -126, -127, -115]);
    design.addPosition("d2", [-1, 0, 12, 0, -116, 0, -127, 0]);
    design.addPosition("e24", [0, 1, 12, -12, -116, -127, 0, -115]);
    design.addPosition("e22", [-1, 1, 12, -12, -116, -127, -128, -115]);
    design.addPosition("e20", [-1, 1, 12, -12, -116, -127, -128, -115]);
    design.addPosition("e18", [-1, 1, 12, -12, -116, -127, -128, -115]);
    design.addPosition("e16", [-1, 1, 12, -12, -116, -127, -128, -115]);
    design.addPosition("e14", [-1, 1, 12, -12, -116, -127, -128, -115]);
    design.addPosition("e12", [-1, 1, 12, -12, -116, -127, -128, -115]);
    design.addPosition("e10", [-1, 1, 12, -12, -116, -127, -128, -115]);
    design.addPosition("e8", [-1, 1, 12, -12, -116, -127, -128, -115]);
    design.addPosition("e6", [-1, 1, 12, -12, -116, -127, -128, -115]);
    design.addPosition("e4", [-1, 1, 12, -12, -116, -127, -128, -115]);
    design.addPosition("e2", [-1, 0, 12, -12, -116, 0, -128, -115]);
    design.addPosition("f24", [0, 1, 12, -12, -115, -127, -128, -114]);
    design.addPosition("f22", [-1, 1, 12, -12, -115, -127, -128, -114]);
    design.addPosition("f20", [-1, 1, 12, -12, -115, -127, -128, -114]);
    design.addPosition("f18", [-1, 1, 12, -12, -115, -127, -128, -114]);
    design.addPosition("f16", [-1, 1, 12, -12, -115, -127, -128, -114]);
    design.addPosition("f14", [-1, 1, 12, -12, -115, -127, -128, -114]);
    design.addPosition("f12", [-1, 1, 12, -12, -115, -127, -128, -114]);
    design.addPosition("f10", [-1, 1, 12, -12, -115, -127, -128, -114]);
    design.addPosition("f8", [-1, 1, 12, -12, -115, -127, -128, -114]);
    design.addPosition("f6", [-1, 1, 12, -12, -115, -127, -128, -114]);
    design.addPosition("f4", [-1, 1, 12, -12, -115, -127, -128, -114]);
    design.addPosition("f2", [-1, 0, 12, -12, -115, -127, -128, -114]);
    design.addPosition("g24", [0, 1, 12, -12, -114, -126, -127, -113]);
    design.addPosition("g22", [-1, 1, 12, -12, -114, -126, -127, -113]);
    design.addPosition("g20", [-1, 1, 12, -12, -114, -126, -127, -113]);
    design.addPosition("g18", [-1, 1, 12, -12, -114, -126, -127, -113]);
    design.addPosition("g16", [-1, 1, 12, -12, -114, -126, -127, -113]);
    design.addPosition("g14", [-1, 1, 12, -12, -114, -126, -127, -113]);
    design.addPosition("g12", [-1, 1, 12, -12, -114, -126, -127, -113]);
    design.addPosition("g10", [-1, 1, 12, -12, -114, -126, -127, -113]);
    design.addPosition("g8", [-1, 1, 12, -12, -114, -126, -127, -113]);
    design.addPosition("g6", [-1, 1, 12, -12, -114, -126, -127, -113]);
    design.addPosition("g4", [-1, 1, 12, -12, -114, -126, -127, -113]);
    design.addPosition("g2", [-1, 0, 12, -12, -114, -126, -127, -113]);
    design.addPosition("h24", [0, 1, 12, -12, 0, -125, -126, -113]);
    design.addPosition("h22", [-1, 1, 12, -12, -114, -125, -126, -113]);
    design.addPosition("h20", [-1, 1, 12, -12, -114, -125, -126, -113]);
    design.addPosition("h18", [-1, 1, 12, -12, -114, -125, -126, -113]);
    design.addPosition("h16", [-1, 1, 12, -12, -114, -125, -126, -113]);
    design.addPosition("h14", [-1, 1, 12, -12, -114, -125, -126, -113]);
    design.addPosition("h12", [-1, 1, 12, -12, -114, -125, -126, -113]);
    design.addPosition("h10", [-1, 1, 12, -12, -114, -125, -126, -113]);
    design.addPosition("h8", [-1, 1, 12, -12, -114, -125, -126, -113]);
    design.addPosition("h6", [-1, 1, 12, -12, -114, -125, -126, -113]);
    design.addPosition("h4", [-1, 1, 12, -12, -114, -125, -126, -113]);
    design.addPosition("h2", [-1, 0, 12, -12, -114, -125, -126, 0]);
    design.addPosition("i24", [0, 1, 0, -12, 0, -125, 0, -114]);
    design.addPosition("i22", [-1, 1, 11, -12, -115, -125, -126, -114]);
    design.addPosition("i20", [-1, 1, 11, -12, -115, -125, -126, -114]);
    design.addPosition("i18", [-1, 1, 11, -12, -115, -125, -126, -114]);
    design.addPosition("i16", [-1, 1, 11, -12, -115, -125, -126, -114]);
    design.addPosition("i14", [-1, 1, 11, -12, -115, -125, -126, -114]);
    design.addPosition("i12", [-1, 1, 11, -12, -115, -125, -126, -114]);
    design.addPosition("i10", [-1, 1, 11, -12, -115, -125, -126, -114]);
    design.addPosition("i8", [-1, 1, 11, -12, -115, -125, -126, -114]);
    design.addPosition("i6", [-1, 1, 11, -12, -115, -125, -126, -114]);
    design.addPosition("i4", [-1, 1, 11, -12, -115, -125, -126, -114]);
    design.addPosition("i2", [-1, 0, 0, -12, -115, 0, -126, 0]);
    design.addPosition("j22", [0, 1, 0, -11, 0, -125, -126, -115]);
    design.addPosition("j20", [-1, 1, 9, -11, -116, -125, -126, -115]);
    design.addPosition("j18", [-1, 1, 9, -11, -116, -125, -126, -115]);
    design.addPosition("j16", [-1, 1, 9, -11, -116, -125, -126, -115]);
    design.addPosition("j14", [-1, 1, 9, -11, -116, -125, -126, -115]);
    design.addPosition("j12", [-1, 1, 9, -11, -116, -125, -126, -115]);
    design.addPosition("j10", [-1, 1, 9, -11, -116, -125, -126, -115]);
    design.addPosition("j8", [-1, 1, 9, -11, -116, -125, -126, -115]);
    design.addPosition("j6", [-1, 1, 9, -11, -116, -125, -126, -115]);
    design.addPosition("j4", [-1, 0, 0, -11, -116, -125, -126, 0]);
    design.addPosition("k20", [0, 1, 0, -9, 0, -124, -125, -116]);
    design.addPosition("k18", [-1, 1, 7, -9, -117, -124, -125, -116]);
    design.addPosition("k16", [-1, 1, 7, -9, -117, -124, -125, -116]);
    design.addPosition("k14", [-1, 1, 7, -9, -117, -124, -125, -116]);
    design.addPosition("k12", [-1, 1, 7, -9, -117, -124, -125, -116]);
    design.addPosition("k10", [-1, 1, 7, -9, -117, -124, -125, -116]);
    design.addPosition("k8", [-1, 1, 7, -9, -117, -124, -125, -116]);
    design.addPosition("k6", [-1, 0, 0, -9, -117, -124, -125, 0]);
    design.addPosition("l18", [0, 1, 0, -7, 0, -123, -124, 0]);
    design.addPosition("l16", [-1, 1, 0, -7, 0, -123, -124, -118]);
    design.addPosition("l14", [-1, 1, 0, -7, -119, -123, -124, -118]);
    design.addPosition("l12", [-1, 1, 0, -7, -119, -123, -124, -118]);
    design.addPosition("l10", [-1, 1, 0, -7, -119, -123, -124, 0]);
    design.addPosition("l8", [-1, 0, 0, -7, 0, -123, -124, 0]);

    design.addZone("goal-zone", 2, [60]);
    design.addZone("goal-zone", 1, [60]);
    design.addZone("home-zone", 2, [56]);
    design.addZone("home-zone", 1, [64]);

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
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.MODE,	1);	// continue-type
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addPiece("Avatar", 0, 100);
    design.addMove(0, 0, [0], 0);
    design.addMove(0, 0, [1], 0);
    design.addMove(0, 0, [2], 0);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [6], 0);
    design.addMove(0, 0, [5], 0);
    design.addMove(0, 0, [4], 0);
    design.addMove(0, 0, [7], 0);
    design.addMove(0, 1, [0, 0], 1);
    design.addMove(0, 1, [1, 1], 1);
    design.addMove(0, 1, [2, 2], 1);
    design.addMove(0, 1, [3, 3], 1);
    design.addMove(0, 1, [6, 6], 1);
    design.addMove(0, 1, [5, 5], 1);
    design.addMove(0, 1, [4, 4], 1);
    design.addMove(0, 1, [7, 7], 1);

    design.addPiece("Water", 1, 10);
    design.addMove(1, 0, [0], 0);
    design.addMove(1, 0, [1], 0);
    design.addMove(1, 0, [2], 0);
    design.addMove(1, 0, [3], 0);
    design.addMove(1, 0, [6], 0);
    design.addMove(1, 0, [5], 0);
    design.addMove(1, 0, [4], 0);
    design.addMove(1, 0, [7], 0);
    design.addMove(1, 1, [0, 0], 1);
    design.addMove(1, 1, [1, 1], 1);
    design.addMove(1, 1, [2, 2], 1);
    design.addMove(1, 1, [3, 3], 1);
    design.addMove(1, 1, [6, 6], 1);
    design.addMove(1, 1, [5, 5], 1);
    design.addMove(1, 1, [4, 4], 1);
    design.addMove(1, 1, [7, 7], 1);

    design.addPiece("Fire", 2, 10);
    design.addMove(2, 0, [0], 0);
    design.addMove(2, 0, [1], 0);
    design.addMove(2, 0, [2], 0);
    design.addMove(2, 0, [3], 0);
    design.addMove(2, 0, [6], 0);
    design.addMove(2, 0, [5], 0);
    design.addMove(2, 0, [4], 0);
    design.addMove(2, 0, [7], 0);
    design.addMove(2, 1, [0, 0], 1);
    design.addMove(2, 1, [1, 1], 1);
    design.addMove(2, 1, [2, 2], 1);
    design.addMove(2, 1, [3, 3], 1);
    design.addMove(2, 1, [6, 6], 1);
    design.addMove(2, 1, [5, 5], 1);
    design.addMove(2, 1, [4, 4], 1);
    design.addMove(2, 1, [7, 7], 1);

    design.addPiece("Wind", 3, 10);
    design.addMove(3, 0, [0], 0);
    design.addMove(3, 0, [1], 0);
    design.addMove(3, 0, [2], 0);
    design.addMove(3, 0, [3], 0);
    design.addMove(3, 0, [6], 0);
    design.addMove(3, 0, [5], 0);
    design.addMove(3, 0, [4], 0);
    design.addMove(3, 0, [7], 0);
    design.addMove(3, 1, [0, 0], 1);
    design.addMove(3, 1, [1, 1], 1);
    design.addMove(3, 1, [2, 2], 1);
    design.addMove(3, 1, [3, 3], 1);
    design.addMove(3, 1, [6, 6], 1);
    design.addMove(3, 1, [5, 5], 1);
    design.addMove(3, 1, [4, 4], 1);
    design.addMove(3, 1, [7, 7], 1);

    design.addPiece("Stone", 4, 10);
    design.addMove(4, 0, [0], 0);
    design.addMove(4, 0, [1], 0);
    design.addMove(4, 0, [2], 0);
    design.addMove(4, 0, [3], 0);
    design.addMove(4, 0, [6], 0);
    design.addMove(4, 0, [5], 0);
    design.addMove(4, 0, [4], 0);
    design.addMove(4, 0, [7], 0);
    design.addMove(4, 1, [0, 0], 1);
    design.addMove(4, 1, [1, 1], 1);
    design.addMove(4, 1, [2, 2], 1);
    design.addMove(4, 1, [3, 3], 1);
    design.addMove(4, 1, [6, 6], 1);
    design.addMove(4, 1, [5, 5], 1);
    design.addMove(4, 1, [4, 4], 1);
    design.addMove(4, 1, [7, 7], 1);

    design.addPiece("Lotus", 5, 10000);
    design.addMove(5, 0, [0], 0);
    design.addMove(5, 0, [1], 0);
    design.addMove(5, 0, [2], 0);
    design.addMove(5, 0, [3], 0);
    design.addMove(5, 0, [6], 0);
    design.addMove(5, 0, [5], 0);
    design.addMove(5, 0, [4], 0);
    design.addMove(5, 0, [7], 0);
    design.addMove(5, 1, [0, 0], 1);
    design.addMove(5, 1, [1, 1], 1);
    design.addMove(5, 1, [2, 2], 1);
    design.addMove(5, 1, [3, 3], 1);
    design.addMove(5, 1, [6, 6], 1);
    design.addMove(5, 1, [5, 5], 1);
    design.addMove(5, 1, [4, 4], 1);
    design.addMove(5, 1, [7, 7], 1);

    design.setup("Black", "Avatar", 64);
    design.setup("Black", "Lotus", 66);
    design.setup("Black", "Stone", 166);
    design.setup("Black", "Stone", 180);
    design.setup("Black", "Stone", 203);
    design.setup("Black", "Wind", 167);
    design.setup("Black", "Wind", 192);
    design.setup("Black", "Wind", 202);
    design.setup("Black", "Water", 39);
    design.setup("Black", "Water", 78);
    design.setup("Black", "Water", 100);
    design.setup("Black", "Fire", 28);
    design.setup("Black", "Fire", 52);
    design.setup("Black", "Fire", 89);
    design.setup("White", "Avatar", 56);
    design.setup("White", "Lotus", 54);
    design.setup("White", "Wind", 169);
    design.setup("White", "Wind", 194);
    design.setup("White", "Wind", 159);
    design.setup("White", "Stone", 181);
    design.setup("White", "Stone", 158);
    design.setup("White", "Stone", 195);
    design.setup("White", "Water", 42);
    design.setup("White", "Water", 81);
    design.setup("White", "Water", 20);
    design.setup("White", "Fire", 68);
    design.setup("White", "Fire", 31);
    design.setup("White", "Fire", 92);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteAvatar", "White Avatar");
    view.defPiece("BlackAvatar", "Black Avatar");
    view.defPiece("WhiteWater", "White Water");
    view.defPiece("BlackWater", "Black Water");
    view.defPiece("WhiteFire", "White Fire");
    view.defPiece("BlackFire", "Black Fire");
    view.defPiece("WhiteWind", "White Wind");
    view.defPiece("BlackWind", "Black Wind");
    view.defPiece("WhiteStone", "White Stone");
    view.defPiece("BlackStone", "Black Stone");
    view.defPiece("WhiteLotus", "White Lotus");
    view.defPiece("BlackLotus", "Black Lotus");
 
    view.defPosition("a15", 44, 310, 34, 34);
    view.defPosition("a13", 44, 364, 34, 34);
    view.defPosition("a11", 44, 417, 34, 34);
    view.defPosition("b19", 98, 202, 34, 34);
    view.defPosition("b17", 98, 256, 34, 34);
    view.defPosition("b15", 98, 310, 34, 34);
    view.defPosition("b13", 98, 364, 34, 34);
    view.defPosition("b11", 98, 417, 34, 34);
    view.defPosition("b9", 98, 471, 34, 34);
    view.defPosition("b7", 98, 524, 34, 34);
    view.defPosition("c21", 151, 148, 34, 34);
    view.defPosition("c19", 151, 202, 34, 34);
    view.defPosition("c17", 151, 256, 34, 34);
    view.defPosition("c15", 151, 310, 34, 34);
    view.defPosition("c13", 151, 364, 34, 34);
    view.defPosition("c11", 151, 417, 34, 34);
    view.defPosition("c9", 151, 471, 34, 34);
    view.defPosition("c7", 151, 524, 34, 34);
    view.defPosition("c5", 151, 578, 34, 34);
    view.defPosition("d23", 205, 95, 34, 34);
    view.defPosition("d21", 205, 149, 34, 34);
    view.defPosition("d19", 205, 202, 34, 34);
    view.defPosition("d17", 205, 256, 34, 34);
    view.defPosition("d15", 205, 310, 34, 34);
    view.defPosition("d13", 205, 364, 34, 34);
    view.defPosition("d11", 205, 417, 34, 34);
    view.defPosition("d9", 205, 471, 34, 34);
    view.defPosition("d7", 205, 524, 34, 34);
    view.defPosition("d5", 205, 578, 34, 34);
    view.defPosition("d3", 205, 632, 34, 34);
    view.defPosition("e23", 259, 95, 34, 34);
    view.defPosition("e21", 259, 149, 34, 35);
    view.defPosition("e19", 259, 202, 34, 34);
    view.defPosition("e17", 259, 256, 34, 34);
    view.defPosition("e15", 259, 310, 34, 34);
    view.defPosition("e13", 259, 364, 34, 34);
    view.defPosition("e11", 259, 417, 34, 34);
    view.defPosition("e9", 259, 471, 34, 34);
    view.defPosition("e7", 259, 524, 34, 34);
    view.defPosition("e5", 259, 578, 34, 34);
    view.defPosition("e3", 259, 632, 34, 34);
    view.defPosition("f25", 312, 41, 34, 34);
    view.defPosition("f23", 312, 95, 34, 34);
    view.defPosition("f21", 312, 149, 34, 34);
    view.defPosition("f19", 312, 202, 34, 34);
    view.defPosition("f17", 312, 256, 34, 34);
    view.defPosition("f15", 312, 310, 34, 34);
    view.defPosition("f13", 312, 364, 34, 34);
    view.defPosition("f11", 312, 417, 34, 34);
    view.defPosition("f9", 312, 471, 34, 34);
    view.defPosition("f7", 312, 524, 34, 34);
    view.defPosition("f5", 312, 578, 34, 34);
    view.defPosition("f3", 312, 632, 34, 34);
    view.defPosition("f1", 312, 685, 34, 34);
    view.defPosition("g25", 366, 41, 34, 34);
    view.defPosition("g23", 366, 95, 34, 34);
    view.defPosition("g21", 366, 149, 34, 34);
    view.defPosition("g19", 366, 202, 34, 34);
    view.defPosition("g17", 366, 256, 34, 34);
    view.defPosition("g15", 366, 310, 34, 34);
    view.defPosition("g13", 366, 364, 34, 34);
    view.defPosition("g11", 366, 417, 34, 34);
    view.defPosition("g9", 366, 471, 34, 34);
    view.defPosition("g7", 366, 524, 34, 34);
    view.defPosition("g5", 366, 578, 34, 34);
    view.defPosition("g3", 366, 632, 34, 34);
    view.defPosition("g1", 366, 685, 34, 34);
    view.defPosition("h25", 419, 41, 34, 34);
    view.defPosition("h23", 419, 95, 34, 34);
    view.defPosition("h21", 419, 149, 34, 34);
    view.defPosition("h19", 419, 202, 34, 34);
    view.defPosition("h17", 419, 256, 34, 34);
    view.defPosition("h15", 419, 310, 34, 34);
    view.defPosition("h13", 419, 364, 34, 34);
    view.defPosition("h11", 419, 417, 34, 34);
    view.defPosition("h9", 419, 471, 34, 34);
    view.defPosition("h7", 419, 524, 34, 34);
    view.defPosition("h5", 419, 578, 34, 34);
    view.defPosition("h3", 419, 632, 34, 34);
    view.defPosition("h1", 419, 685, 34, 34);
    view.defPosition("i23", 473, 95, 34, 34);
    view.defPosition("i21", 473, 149, 34, 34);
    view.defPosition("i19", 473, 202, 34, 34);
    view.defPosition("i17", 473, 256, 34, 34);
    view.defPosition("i15", 473, 310, 34, 34);
    view.defPosition("i13", 473, 364, 34, 34);
    view.defPosition("i11", 473, 417, 34, 34);
    view.defPosition("i9", 473, 471, 34, 34);
    view.defPosition("i7", 473, 524, 34, 34);
    view.defPosition("i5", 473, 578, 34, 34);
    view.defPosition("i3", 473, 632, 34, 34);
    view.defPosition("j23", 527, 95, 34, 34);
    view.defPosition("j21", 527, 149, 34, 34);
    view.defPosition("j19", 527, 202, 34, 34);
    view.defPosition("j17", 527, 256, 34, 34);
    view.defPosition("j15", 527, 310, 34, 34);
    view.defPosition("j13", 527, 364, 34, 34);
    view.defPosition("j11", 527, 417, 34, 34);
    view.defPosition("j9", 527, 471, 34, 34);
    view.defPosition("j7", 527, 524, 34, 34);
    view.defPosition("j5", 527, 578, 34, 34);
    view.defPosition("j3", 527, 632, 34, 34);
    view.defPosition("k21", 580, 149, 34, 34);
    view.defPosition("k19", 580, 202, 34, 34);
    view.defPosition("k17", 580, 256, 34, 34);
    view.defPosition("k15", 580, 310, 34, 34);
    view.defPosition("k13", 580, 364, 34, 34);
    view.defPosition("k11", 580, 417, 34, 34);
    view.defPosition("k9", 580, 471, 34, 34);
    view.defPosition("k7", 580, 524, 34, 34);
    view.defPosition("k5", 580, 578, 34, 34);
    view.defPosition("l19", 634, 202, 34, 34);
    view.defPosition("l17", 634, 256, 34, 34);
    view.defPosition("l15", 634, 310, 34, 34);
    view.defPosition("l13", 634, 364, 34, 34);
    view.defPosition("l11", 634, 417, 34, 34);
    view.defPosition("l9", 634, 471, 34, 34);
    view.defPosition("l7", 634, 524, 34, 34);
    view.defPosition("m15", 688, 310, 34, 34);
    view.defPosition("m13", 688, 364, 34, 34);
    view.defPosition("m11", 688, 417, 34, 34);
    view.defPosition("a18", 71, 229, 34, 34);
    view.defPosition("a16", 71, 282, 34, 34);
    view.defPosition("a14", 71, 336, 34, 34);
    view.defPosition("a12", 71, 390, 34, 34);
    view.defPosition("a10", 71, 444, 34, 34);
    view.defPosition("a8", 71, 497, 34, 34);
    view.defPosition("b20", 124, 175, 34, 34);
    view.defPosition("b18", 124, 229, 34, 34);
    view.defPosition("b16", 124, 282, 34, 34);
    view.defPosition("b14", 124, 336, 34, 34);
    view.defPosition("b12", 124, 390, 34, 34);
    view.defPosition("b10", 124, 444, 34, 34);
    view.defPosition("b8", 124, 497, 34, 34);
    view.defPosition("b6", 124, 550, 34, 34);
    view.defPosition("c22", 178, 121, 34, 34);
    view.defPosition("c20", 178, 175, 34, 34);
    view.defPosition("c18", 178, 229, 34, 34);
    view.defPosition("c16", 178, 282, 34, 34);
    view.defPosition("c14", 178, 336, 34, 34);
    view.defPosition("c12", 178, 390, 34, 34);
    view.defPosition("c10", 178, 444, 34, 34);
    view.defPosition("c8", 178, 497, 34, 34);
    view.defPosition("c6", 178, 550, 34, 34);
    view.defPosition("c4", 178, 604, 34, 34);
    view.defPosition("d24", 231, 68, 34, 34);
    view.defPosition("d22", 231, 121, 34, 34);
    view.defPosition("d20", 231, 175, 34, 34);
    view.defPosition("d18", 231, 229, 34, 34);
    view.defPosition("d16", 231, 282, 34, 34);
    view.defPosition("d14", 231, 336, 34, 34);
    view.defPosition("d12", 231, 390, 34, 34);
    view.defPosition("d10", 231, 444, 34, 34);
    view.defPosition("d8", 231, 497, 34, 34);
    view.defPosition("d6", 231, 550, 34, 34);
    view.defPosition("d4", 231, 604, 34, 34);
    view.defPosition("d2", 231, 657, 34, 34);
    view.defPosition("e24", 285, 68, 34, 34);
    view.defPosition("e22", 285, 121, 34, 34);
    view.defPosition("e20", 285, 175, 34, 34);
    view.defPosition("e18", 285, 229, 34, 34);
    view.defPosition("e16", 285, 282, 34, 34);
    view.defPosition("e14", 285, 336, 34, 34);
    view.defPosition("e12", 285, 390, 34, 34);
    view.defPosition("e10", 285, 444, 34, 34);
    view.defPosition("e8", 285, 497, 34, 34);
    view.defPosition("e6", 285, 550, 34, 34);
    view.defPosition("e4", 285, 604, 34, 34);
    view.defPosition("e2", 285, 657, 34, 34);
    view.defPosition("f24", 339, 68, 33, 34);
    view.defPosition("f22", 339, 121, 34, 34);
    view.defPosition("f20", 339, 175, 34, 34);
    view.defPosition("f18", 339, 229, 34, 34);
    view.defPosition("f16", 339, 282, 34, 34);
    view.defPosition("f14", 339, 336, 34, 34);
    view.defPosition("f12", 339, 390, 34, 34);
    view.defPosition("f10", 339, 444, 34, 34);
    view.defPosition("f8", 339, 497, 34, 34);
    view.defPosition("f6", 339, 550, 34, 34);
    view.defPosition("f4", 339, 604, 34, 34);
    view.defPosition("f2", 339, 657, 34, 34);
    view.defPosition("g24", 392, 68, 34, 34);
    view.defPosition("g22", 392, 121, 34, 34);
    view.defPosition("g20", 392, 175, 34, 34);
    view.defPosition("g18", 392, 229, 34, 34);
    view.defPosition("g16", 392, 282, 34, 34);
    view.defPosition("g14", 392, 336, 34, 34);
    view.defPosition("g12", 392, 390, 34, 34);
    view.defPosition("g10", 392, 444, 34, 34);
    view.defPosition("g8", 392, 497, 34, 34);
    view.defPosition("g6", 392, 550, 34, 34);
    view.defPosition("g4", 392, 604, 34, 34);
    view.defPosition("g2", 392, 657, 34, 34);
    view.defPosition("h24", 446, 68, 34, 34);
    view.defPosition("h22", 446, 121, 34, 34);
    view.defPosition("h20", 446, 175, 34, 34);
    view.defPosition("h18", 446, 229, 34, 34);
    view.defPosition("h16", 446, 282, 34, 34);
    view.defPosition("h14", 446, 336, 34, 34);
    view.defPosition("h12", 446, 390, 34, 34);
    view.defPosition("h10", 446, 444, 34, 34);
    view.defPosition("h8", 446, 497, 34, 34);
    view.defPosition("h6", 446, 550, 34, 34);
    view.defPosition("h4", 446, 604, 34, 34);
    view.defPosition("h2", 446, 657, 34, 34);
    view.defPosition("i24", 500, 68, 34, 34);
    view.defPosition("i22", 500, 121, 34, 34);
    view.defPosition("i20", 500, 175, 34, 34);
    view.defPosition("i18", 500, 229, 34, 34);
    view.defPosition("i16", 500, 282, 34, 34);
    view.defPosition("i14", 500, 336, 34, 34);
    view.defPosition("i12", 500, 390, 34, 34);
    view.defPosition("i10", 500, 444, 34, 34);
    view.defPosition("i8", 500, 497, 34, 34);
    view.defPosition("i6", 500, 550, 34, 34);
    view.defPosition("i4", 500, 604, 34, 34);
    view.defPosition("i2", 500, 657, 34, 34);
    view.defPosition("j22", 553, 121, 34, 34);
    view.defPosition("j20", 553, 175, 34, 34);
    view.defPosition("j18", 553, 229, 34, 34);
    view.defPosition("j16", 553, 282, 34, 34);
    view.defPosition("j14", 553, 336, 34, 34);
    view.defPosition("j12", 553, 390, 34, 34);
    view.defPosition("j10", 553, 444, 34, 34);
    view.defPosition("j8", 553, 497, 34, 34);
    view.defPosition("j6", 553, 550, 34, 34);
    view.defPosition("j4", 553, 604, 34, 34);
    view.defPosition("k20", 606, 175, 34, 34);
    view.defPosition("k18", 606, 229, 34, 34);
    view.defPosition("k16", 606, 282, 34, 34);
    view.defPosition("k14", 606, 336, 34, 34);
    view.defPosition("k12", 606, 390, 34, 34);
    view.defPosition("k10", 606, 444, 34, 34);
    view.defPosition("k8", 606, 497, 34, 34);
    view.defPosition("k6", 606, 550, 34, 34);
    view.defPosition("l18", 660, 229, 34, 34);
    view.defPosition("l16", 660, 282, 34, 34);
    view.defPosition("l14", 660, 336, 34, 34);
    view.defPosition("l12", 660, 390, 34, 34);
    view.defPosition("l10", 660, 444, 34, 34);
    view.defPosition("l8", 660, 497, 34, 34);
}