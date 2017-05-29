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

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("ne");
    design.addDirection("n");
    design.addDirection("se");
    design.addDirection("sw");
    design.addDirection("nw");

    design.addPlayer("Black", [1, 0, 4, 6, 2, 7, 3, 5]);
    design.addPlayer("White", [0, 1, 4, 5, 2, 3, 7, 6]);

    design.addPosition("a16", [0, 1, 16, 0, 0, 17, 0, 0]);
    design.addPosition("b16", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("c16", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("d16", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("e16", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("f16", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("g16", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("h16", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("i16", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("j16", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("k16", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("l16", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("m16", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("n16", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("o16", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("p16", [-1, 0, 16, 0, 0, 0, 15, 0]);
    design.addPosition("a15", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("b15", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("c15", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("d15", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("e15", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("f15", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("g15", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("h15", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("i15", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("j15", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("k15", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("l15", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("m15", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("n15", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("o15", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("p15", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("a14", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("b14", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("c14", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("d14", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("e14", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("f14", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("g14", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("h14", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("i14", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("j14", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("k14", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("l14", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("m14", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("n14", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("o14", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("p14", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("a13", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("b13", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("c13", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("d13", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("e13", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("f13", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("g13", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("h13", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("i13", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("j13", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("k13", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("l13", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("m13", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("n13", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("o13", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("p13", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("a12", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("b12", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("c12", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("d12", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("e12", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("f12", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("g12", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("h12", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("i12", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("j12", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("k12", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("l12", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("m12", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("n12", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("o12", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("p12", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("a11", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("b11", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("c11", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("d11", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("e11", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("f11", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("g11", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("h11", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("i11", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("j11", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("k11", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("l11", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("m11", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("n11", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("o11", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("p11", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("a10", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("b10", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("c10", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("d10", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("e10", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("f10", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("g10", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("h10", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("i10", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("j10", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("k10", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("l10", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("m10", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("n10", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("o10", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("p10", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("a9", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("b9", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("c9", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("d9", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("e9", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("f9", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("g9", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("h9", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("i9", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("j9", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("k9", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("l9", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("m9", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("n9", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("o9", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("p9", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("a8", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("b8", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("c8", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("d8", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("e8", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("f8", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("g8", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("h8", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("i8", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("j8", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("k8", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("l8", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("m8", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("n8", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("o8", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("p8", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("a7", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("b7", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("c7", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("d7", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("e7", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("f7", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("g7", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("h7", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("i7", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("j7", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("k7", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("l7", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("m7", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("n7", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("o7", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("p7", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("a6", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("b6", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("c6", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("d6", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("e6", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("f6", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("g6", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("h6", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("i6", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("j6", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("k6", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("l6", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("m6", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("n6", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("o6", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("p6", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("a5", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("b5", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("c5", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("d5", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("e5", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("f5", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("g5", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("h5", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("i5", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("j5", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("k5", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("l5", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("m5", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("n5", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("o5", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("p5", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("a4", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("b4", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("c4", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("d4", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("e4", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("f4", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("g4", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("h4", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("i4", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("j4", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("k4", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("l4", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("m4", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("n4", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("o4", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("p4", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("a3", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("b3", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("c3", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("d3", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("e3", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("f3", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("g3", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("h3", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("i3", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("j3", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("k3", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("l3", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("m3", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("n3", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("o3", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("p3", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("a2", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("b2", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("c2", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("d2", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("e2", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("f2", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("g2", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("h2", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("i2", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("j2", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("k2", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("l2", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("m2", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("n2", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("o2", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("p2", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("a1", [0, 1, 0, -15, -16, 0, 0, 0]);
    design.addPosition("b1", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("c1", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("d1", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("e1", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("f1", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("g1", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("h1", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("i1", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("j1", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("k1", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("l1", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("m1", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("n1", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("o1", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("p1", [-1, 0, 0, 0, -16, 0, 0, -17]);

    design.addZone("promotion-zone", 2, [251, 235, 219, 203, 187, 171, 155, 139, 123, 107, 91, 75, 59, 43, 27, 11, 252, 236, 220, 204, 188, 172, 156, 140, 124, 108, 92, 76, 60, 44, 28, 12, 253, 237, 221, 205, 189, 173, 157, 141, 125, 109, 93, 77, 61, 45, 29, 13, 254, 238, 222, 206, 190, 174, 158, 142, 126, 110, 94, 78, 62, 46, 30, 14, 255, 239, 223, 207, 191, 175, 159, 143, 127, 111, 95, 79, 63, 47, 31, 15]);
    design.addZone("promotion-zone", 1, [240, 224, 208, 192, 176, 160, 144, 128, 112, 96, 80, 64, 48, 32, 16, 0, 241, 225, 209, 193, 177, 161, 145, 129, 113, 97, 81, 65, 49, 33, 17, 1, 242, 226, 210, 194, 178, 162, 146, 130, 114, 98, 82, 66, 50, 34, 18, 2, 243, 227, 211, 195, 179, 163, 147, 131, 115, 99, 83, 67, 51, 35, 19, 3, 244, 228, 212, 196, 180, 164, 148, 132, 116, 100, 84, 68, 52, 36, 20, 4]);
    design.addZone("last-two-ranks", 2, [254, 238, 222, 206, 190, 174, 158, 142, 126, 110, 94, 78, 62, 46, 30, 14, 255, 239, 223, 207, 191, 175, 159, 143, 127, 111, 95, 79, 63, 47, 31, 15]);
    design.addZone("last-two-ranks", 1, [240, 224, 208, 192, 176, 160, 144, 128, 112, 96, 80, 64, 48, 32, 16, 0, 241, 225, 209, 193, 177, 161, 145, 129, 113, 97, 81, 65, 49, 33, 17, 1]);
    design.addZone("last-rank", 2, [255, 239, 223, 207, 191, 175, 159, 143, 127, 111, 95, 79, 63, 47, 31, 15]);
    design.addZone("last-rank", 1, [240, 224, 208, 192, 176, 160, 144, 128, 112, 96, 80, 64, 48, 32, 16, 0]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.IF,	7);
    design.addCommand(1, ZRF.FORK,	3);
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.JUMP,	-8);
    design.addCommand(1, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end


    design.addPiece("Knight", 0);

    design.addPiece("Iron-General", 1);

    design.addPiece("Pawn", 2);
    design.addMove(2, 0, [4], 0);

    design.addPiece("Bishop", 3);

    design.addPiece("z2j-a", 4);

    design.addPiece("Rook", 5);

    design.addPiece("z2j-a", 6);

    design.addPiece("Queen", 7);
    design.addMove(7, 1, [4, 4], 0);
    design.addMove(7, 1, [2, 2], 0);
    design.addMove(7, 1, [0, 0], 0);
    design.addMove(7, 1, [1, 1], 0);
    design.addMove(7, 1, [7, 7], 0);
    design.addMove(7, 1, [6, 6], 0);
    design.addMove(7, 1, [3, 3], 0);
    design.addMove(7, 1, [5, 5], 0);

    design.addPiece("z2j-a", 8);

    design.addPiece("Flying-Ox", 9);

    design.addPiece("Free-Boar", 10);

    design.addPiece("Horned-Falcon", 11);

    design.addPiece("z2j-a", 12);

    design.addPiece("Soaring-Eagle", 13);

    design.addPiece("z2j-a", 14);

    design.addPiece("Whale", 15);

    design.addPiece("White-Horse", 16);

    design.addPiece("Lion", 17);

    design.addPiece("z2j-a", 18);

    design.addPiece("Dragon-King", 19);

    design.addPiece("z2j-a", 20);

    design.addPiece("Dragon-Horse", 21);

    design.addPiece("z2j-a", 22);

    design.addPiece("Kylin", 23);

    design.addPiece("Phoenix", 24);

    design.addPiece("Reverse-Chariot", 25);

    design.addPiece("Side-Mover", 26);

    design.addPiece("z2j-a", 27);

    design.addPiece("Vertical-Mover", 28);

    design.addPiece("z2j-a", 29);

    design.addPiece("Flying-Stag", 30);

    design.addPiece("Lance", 31);

    design.addPiece("King", 32);
    design.addMove(32, 0, [4], 0);
    design.addMove(32, 0, [2], 0);
    design.addMove(32, 0, [0], 0);
    design.addMove(32, 0, [1], 0);
    design.addMove(32, 0, [7], 0);
    design.addMove(32, 0, [6], 0);
    design.addMove(32, 0, [3], 0);
    design.addMove(32, 0, [5], 0);

    design.addPiece("Prince", 33);

    design.addPiece("Blind-Tiger", 34);

    design.addPiece("Drunk-Elephant", 35);

    design.addPiece("Ferocious-Leopard", 36);

    design.addPiece("Gold-General", 37);

    design.addPiece("z2j-a", 38);

    design.addPiece("Silver-General", 39);

    design.addPiece("Copper-General", 40);

    design.addPiece("Chariot-Soldier", 41);

    design.addPiece("z2j-a", 42);

    design.addPiece("Dog", 43);

    design.addPiece("Bishop-General", 44);

    design.addPiece("z2j-a", 45);

    design.addPiece("Rook-General", 46);

    design.addPiece("z2j-a", 47);

    design.addPiece("Vice-General", 48);

    design.addPiece("Great-General", 49);

    design.addPiece("Side-Soldier", 50);

    design.addPiece("z2j-a", 51);

    design.addPiece("Vertical-Soldier", 52);

    design.addPiece("z2j-a", 53);

    design.addPiece("Water-Buffalo", 54);

    design.addPiece("z2j-a", 55);

    design.addPiece("Fire-Demon", 56);

    design.addPiece("Free-Eagle", 57);

    design.addPiece("Lion-Hawk", 58);

    design.addPiece("Heavenly-Tetrarch", 59);

    design.addPiece("Multi-General", 60);

    design.setup("White", "King", 128);
    design.setup("White", "Queen", 113);
    design.setup("Black", "King", 127);
    design.setup("Black", "Queen", 142);

}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteKnight", "White Knight");
    view.defPiece("BlackKnight", "Black Knight");
    view.defPiece("WhiteIron-General", "White Iron-General");
    view.defPiece("BlackIron-General", "Black Iron-General");
    view.defPiece("WhitePawn", "White Pawn");
    view.defPiece("BlackPawn", "Black Pawn");
    view.defPiece("WhiteBishop", "White Bishop");
    view.defPiece("BlackBishop", "Black Bishop");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteRook", "White Rook");
    view.defPiece("BlackRook", "Black Rook");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteQueen", "White Queen");
    view.defPiece("BlackQueen", "Black Queen");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteFlying-Ox", "White Flying-Ox");
    view.defPiece("BlackFlying-Ox", "Black Flying-Ox");
    view.defPiece("WhiteFree-Boar", "White Free-Boar");
    view.defPiece("BlackFree-Boar", "Black Free-Boar");
    view.defPiece("WhiteHorned-Falcon", "White Horned-Falcon");
    view.defPiece("BlackHorned-Falcon", "Black Horned-Falcon");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteSoaring-Eagle", "White Soaring-Eagle");
    view.defPiece("BlackSoaring-Eagle", "Black Soaring-Eagle");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteWhale", "White Whale");
    view.defPiece("BlackWhale", "Black Whale");
    view.defPiece("WhiteWhite-Horse", "White White-Horse");
    view.defPiece("BlackWhite-Horse", "Black White-Horse");
    view.defPiece("WhiteLion", "White Lion");
    view.defPiece("BlackLion", "Black Lion");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteDragon-King", "White Dragon-King");
    view.defPiece("BlackDragon-King", "Black Dragon-King");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteDragon-Horse", "White Dragon-Horse");
    view.defPiece("BlackDragon-Horse", "Black Dragon-Horse");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteKylin", "White Kylin");
    view.defPiece("BlackKylin", "Black Kylin");
    view.defPiece("WhitePhoenix", "White Phoenix");
    view.defPiece("BlackPhoenix", "Black Phoenix");
    view.defPiece("WhiteReverse-Chariot", "White Reverse-Chariot");
    view.defPiece("BlackReverse-Chariot", "Black Reverse-Chariot");
    view.defPiece("WhiteSide-Mover", "White Side-Mover");
    view.defPiece("BlackSide-Mover", "Black Side-Mover");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteVertical-Mover", "White Vertical-Mover");
    view.defPiece("BlackVertical-Mover", "Black Vertical-Mover");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteFlying-Stag", "White Flying-Stag");
    view.defPiece("BlackFlying-Stag", "Black Flying-Stag");
    view.defPiece("WhiteLance", "White Lance");
    view.defPiece("BlackLance", "Black Lance");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
    view.defPiece("WhitePrince", "White Prince");
    view.defPiece("BlackPrince", "Black Prince");
    view.defPiece("WhiteBlind-Tiger", "White Blind-Tiger");
    view.defPiece("BlackBlind-Tiger", "Black Blind-Tiger");
    view.defPiece("WhiteDrunk-Elephant", "White Drunk-Elephant");
    view.defPiece("BlackDrunk-Elephant", "Black Drunk-Elephant");
    view.defPiece("WhiteFerocious-Leopard", "White Ferocious-Leopard");
    view.defPiece("BlackFerocious-Leopard", "Black Ferocious-Leopard");
    view.defPiece("WhiteGold-General", "White Gold-General");
    view.defPiece("BlackGold-General", "Black Gold-General");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteSilver-General", "White Silver-General");
    view.defPiece("BlackSilver-General", "Black Silver-General");
    view.defPiece("WhiteCopper-General", "White Copper-General");
    view.defPiece("BlackCopper-General", "Black Copper-General");
    view.defPiece("WhiteChariot-Soldier", "White Chariot-Soldier");
    view.defPiece("BlackChariot-Soldier", "Black Chariot-Soldier");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteDog", "White Dog");
    view.defPiece("BlackDog", "Black Dog");
    view.defPiece("WhiteBishop-General", "White Bishop-General");
    view.defPiece("BlackBishop-General", "Black Bishop-General");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteRook-General", "White Rook-General");
    view.defPiece("BlackRook-General", "Black Rook-General");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteVice-General", "White Vice-General");
    view.defPiece("BlackVice-General", "Black Vice-General");
    view.defPiece("WhiteGreat-General", "White Great-General");
    view.defPiece("BlackGreat-General", "Black Great-General");
    view.defPiece("WhiteSide-Soldier", "White Side-Soldier");
    view.defPiece("BlackSide-Soldier", "Black Side-Soldier");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteVertical-Soldier", "White Vertical-Soldier");
    view.defPiece("BlackVertical-Soldier", "Black Vertical-Soldier");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteWater-Buffalo", "White Water-Buffalo");
    view.defPiece("BlackWater-Buffalo", "Black Water-Buffalo");
    view.defPiece("Whitez2j-a", "White z2j-a");
    view.defPiece("Blackz2j-a", "Black z2j-a");
    view.defPiece("WhiteFire-Demon", "White Fire-Demon");
    view.defPiece("BlackFire-Demon", "Black Fire-Demon");
    view.defPiece("WhiteFree-Eagle", "White Free-Eagle");
    view.defPiece("BlackFree-Eagle", "Black Free-Eagle");
    view.defPiece("WhiteLion-Hawk", "White Lion-Hawk");
    view.defPiece("BlackLion-Hawk", "Black Lion-Hawk");
    view.defPiece("WhiteHeavenly-Tetrarch", "White Heavenly-Tetrarch");
    view.defPiece("BlackHeavenly-Tetrarch", "Black Heavenly-Tetrarch");
    view.defPiece("WhiteMulti-General", "White Multi-General");
    view.defPiece("BlackMulti-General", "Black Multi-General");
 
    view.defPosition("a16", 5, 5, 49, 49);
    view.defPosition("b16", 41, 5, 49, 49);
    view.defPosition("c16", 77, 5, 49, 49);
    view.defPosition("d16", 113, 5, 49, 49);
    view.defPosition("e16", 149, 5, 49, 49);
    view.defPosition("f16", 185, 5, 49, 49);
    view.defPosition("g16", 221, 5, 49, 49);
    view.defPosition("h16", 257, 5, 49, 49);
    view.defPosition("i16", 293, 5, 49, 49);
    view.defPosition("j16", 329, 5, 49, 49);
    view.defPosition("k16", 365, 5, 49, 49);
    view.defPosition("l16", 401, 5, 49, 49);
    view.defPosition("m16", 437, 5, 49, 49);
    view.defPosition("n16", 473, 5, 49, 49);
    view.defPosition("o16", 509, 5, 49, 49);
    view.defPosition("p16", 545, 5, 49, 49);
    view.defPosition("a15", 5, 41, 49, 49);
    view.defPosition("b15", 41, 41, 49, 49);
    view.defPosition("c15", 77, 41, 49, 49);
    view.defPosition("d15", 113, 41, 49, 49);
    view.defPosition("e15", 149, 41, 49, 49);
    view.defPosition("f15", 185, 41, 49, 49);
    view.defPosition("g15", 221, 41, 49, 49);
    view.defPosition("h15", 257, 41, 49, 49);
    view.defPosition("i15", 293, 41, 49, 49);
    view.defPosition("j15", 329, 41, 49, 49);
    view.defPosition("k15", 365, 41, 49, 49);
    view.defPosition("l15", 401, 41, 49, 49);
    view.defPosition("m15", 437, 41, 49, 49);
    view.defPosition("n15", 473, 41, 49, 49);
    view.defPosition("o15", 509, 41, 49, 49);
    view.defPosition("p15", 545, 41, 49, 49);
    view.defPosition("a14", 5, 77, 49, 49);
    view.defPosition("b14", 41, 77, 49, 49);
    view.defPosition("c14", 77, 77, 49, 49);
    view.defPosition("d14", 113, 77, 49, 49);
    view.defPosition("e14", 149, 77, 49, 49);
    view.defPosition("f14", 185, 77, 49, 49);
    view.defPosition("g14", 221, 77, 49, 49);
    view.defPosition("h14", 257, 77, 49, 49);
    view.defPosition("i14", 293, 77, 49, 49);
    view.defPosition("j14", 329, 77, 49, 49);
    view.defPosition("k14", 365, 77, 49, 49);
    view.defPosition("l14", 401, 77, 49, 49);
    view.defPosition("m14", 437, 77, 49, 49);
    view.defPosition("n14", 473, 77, 49, 49);
    view.defPosition("o14", 509, 77, 49, 49);
    view.defPosition("p14", 545, 77, 49, 49);
    view.defPosition("a13", 5, 113, 49, 49);
    view.defPosition("b13", 41, 113, 49, 49);
    view.defPosition("c13", 77, 113, 49, 49);
    view.defPosition("d13", 113, 113, 49, 49);
    view.defPosition("e13", 149, 113, 49, 49);
    view.defPosition("f13", 185, 113, 49, 49);
    view.defPosition("g13", 221, 113, 49, 49);
    view.defPosition("h13", 257, 113, 49, 49);
    view.defPosition("i13", 293, 113, 49, 49);
    view.defPosition("j13", 329, 113, 49, 49);
    view.defPosition("k13", 365, 113, 49, 49);
    view.defPosition("l13", 401, 113, 49, 49);
    view.defPosition("m13", 437, 113, 49, 49);
    view.defPosition("n13", 473, 113, 49, 49);
    view.defPosition("o13", 509, 113, 49, 49);
    view.defPosition("p13", 545, 113, 49, 49);
    view.defPosition("a12", 5, 149, 49, 49);
    view.defPosition("b12", 41, 149, 49, 49);
    view.defPosition("c12", 77, 149, 49, 49);
    view.defPosition("d12", 113, 149, 49, 49);
    view.defPosition("e12", 149, 149, 49, 49);
    view.defPosition("f12", 185, 149, 49, 49);
    view.defPosition("g12", 221, 149, 49, 49);
    view.defPosition("h12", 257, 149, 49, 49);
    view.defPosition("i12", 293, 149, 49, 49);
    view.defPosition("j12", 329, 149, 49, 49);
    view.defPosition("k12", 365, 149, 49, 49);
    view.defPosition("l12", 401, 149, 49, 49);
    view.defPosition("m12", 437, 149, 49, 49);
    view.defPosition("n12", 473, 149, 49, 49);
    view.defPosition("o12", 509, 149, 49, 49);
    view.defPosition("p12", 545, 149, 49, 49);
    view.defPosition("a11", 5, 185, 49, 49);
    view.defPosition("b11", 41, 185, 49, 49);
    view.defPosition("c11", 77, 185, 49, 49);
    view.defPosition("d11", 113, 185, 49, 49);
    view.defPosition("e11", 149, 185, 49, 49);
    view.defPosition("f11", 185, 185, 49, 49);
    view.defPosition("g11", 221, 185, 49, 49);
    view.defPosition("h11", 257, 185, 49, 49);
    view.defPosition("i11", 293, 185, 49, 49);
    view.defPosition("j11", 329, 185, 49, 49);
    view.defPosition("k11", 365, 185, 49, 49);
    view.defPosition("l11", 401, 185, 49, 49);
    view.defPosition("m11", 437, 185, 49, 49);
    view.defPosition("n11", 473, 185, 49, 49);
    view.defPosition("o11", 509, 185, 49, 49);
    view.defPosition("p11", 545, 185, 49, 49);
    view.defPosition("a10", 5, 221, 49, 49);
    view.defPosition("b10", 41, 221, 49, 49);
    view.defPosition("c10", 77, 221, 49, 49);
    view.defPosition("d10", 113, 221, 49, 49);
    view.defPosition("e10", 149, 221, 49, 49);
    view.defPosition("f10", 185, 221, 49, 49);
    view.defPosition("g10", 221, 221, 49, 49);
    view.defPosition("h10", 257, 221, 49, 49);
    view.defPosition("i10", 293, 221, 49, 49);
    view.defPosition("j10", 329, 221, 49, 49);
    view.defPosition("k10", 365, 221, 49, 49);
    view.defPosition("l10", 401, 221, 49, 49);
    view.defPosition("m10", 437, 221, 49, 49);
    view.defPosition("n10", 473, 221, 49, 49);
    view.defPosition("o10", 509, 221, 49, 49);
    view.defPosition("p10", 545, 221, 49, 49);
    view.defPosition("a9", 5, 257, 49, 49);
    view.defPosition("b9", 41, 257, 49, 49);
    view.defPosition("c9", 77, 257, 49, 49);
    view.defPosition("d9", 113, 257, 49, 49);
    view.defPosition("e9", 149, 257, 49, 49);
    view.defPosition("f9", 185, 257, 49, 49);
    view.defPosition("g9", 221, 257, 49, 49);
    view.defPosition("h9", 257, 257, 49, 49);
    view.defPosition("i9", 293, 257, 49, 49);
    view.defPosition("j9", 329, 257, 49, 49);
    view.defPosition("k9", 365, 257, 49, 49);
    view.defPosition("l9", 401, 257, 49, 49);
    view.defPosition("m9", 437, 257, 49, 49);
    view.defPosition("n9", 473, 257, 49, 49);
    view.defPosition("o9", 509, 257, 49, 49);
    view.defPosition("p9", 545, 257, 49, 49);
    view.defPosition("a8", 5, 293, 49, 49);
    view.defPosition("b8", 41, 293, 49, 49);
    view.defPosition("c8", 77, 293, 49, 49);
    view.defPosition("d8", 113, 293, 49, 49);
    view.defPosition("e8", 149, 293, 49, 49);
    view.defPosition("f8", 185, 293, 49, 49);
    view.defPosition("g8", 221, 293, 49, 49);
    view.defPosition("h8", 257, 293, 49, 49);
    view.defPosition("i8", 293, 293, 49, 49);
    view.defPosition("j8", 329, 293, 49, 49);
    view.defPosition("k8", 365, 293, 49, 49);
    view.defPosition("l8", 401, 293, 49, 49);
    view.defPosition("m8", 437, 293, 49, 49);
    view.defPosition("n8", 473, 293, 49, 49);
    view.defPosition("o8", 509, 293, 49, 49);
    view.defPosition("p8", 545, 293, 49, 49);
    view.defPosition("a7", 5, 329, 49, 49);
    view.defPosition("b7", 41, 329, 49, 49);
    view.defPosition("c7", 77, 329, 49, 49);
    view.defPosition("d7", 113, 329, 49, 49);
    view.defPosition("e7", 149, 329, 49, 49);
    view.defPosition("f7", 185, 329, 49, 49);
    view.defPosition("g7", 221, 329, 49, 49);
    view.defPosition("h7", 257, 329, 49, 49);
    view.defPosition("i7", 293, 329, 49, 49);
    view.defPosition("j7", 329, 329, 49, 49);
    view.defPosition("k7", 365, 329, 49, 49);
    view.defPosition("l7", 401, 329, 49, 49);
    view.defPosition("m7", 437, 329, 49, 49);
    view.defPosition("n7", 473, 329, 49, 49);
    view.defPosition("o7", 509, 329, 49, 49);
    view.defPosition("p7", 545, 329, 49, 49);
    view.defPosition("a6", 5, 365, 49, 49);
    view.defPosition("b6", 41, 365, 49, 49);
    view.defPosition("c6", 77, 365, 49, 49);
    view.defPosition("d6", 113, 365, 49, 49);
    view.defPosition("e6", 149, 365, 49, 49);
    view.defPosition("f6", 185, 365, 49, 49);
    view.defPosition("g6", 221, 365, 49, 49);
    view.defPosition("h6", 257, 365, 49, 49);
    view.defPosition("i6", 293, 365, 49, 49);
    view.defPosition("j6", 329, 365, 49, 49);
    view.defPosition("k6", 365, 365, 49, 49);
    view.defPosition("l6", 401, 365, 49, 49);
    view.defPosition("m6", 437, 365, 49, 49);
    view.defPosition("n6", 473, 365, 49, 49);
    view.defPosition("o6", 509, 365, 49, 49);
    view.defPosition("p6", 545, 365, 49, 49);
    view.defPosition("a5", 5, 401, 49, 49);
    view.defPosition("b5", 41, 401, 49, 49);
    view.defPosition("c5", 77, 401, 49, 49);
    view.defPosition("d5", 113, 401, 49, 49);
    view.defPosition("e5", 149, 401, 49, 49);
    view.defPosition("f5", 185, 401, 49, 49);
    view.defPosition("g5", 221, 401, 49, 49);
    view.defPosition("h5", 257, 401, 49, 49);
    view.defPosition("i5", 293, 401, 49, 49);
    view.defPosition("j5", 329, 401, 49, 49);
    view.defPosition("k5", 365, 401, 49, 49);
    view.defPosition("l5", 401, 401, 49, 49);
    view.defPosition("m5", 437, 401, 49, 49);
    view.defPosition("n5", 473, 401, 49, 49);
    view.defPosition("o5", 509, 401, 49, 49);
    view.defPosition("p5", 545, 401, 49, 49);
    view.defPosition("a4", 5, 437, 49, 49);
    view.defPosition("b4", 41, 437, 49, 49);
    view.defPosition("c4", 77, 437, 49, 49);
    view.defPosition("d4", 113, 437, 49, 49);
    view.defPosition("e4", 149, 437, 49, 49);
    view.defPosition("f4", 185, 437, 49, 49);
    view.defPosition("g4", 221, 437, 49, 49);
    view.defPosition("h4", 257, 437, 49, 49);
    view.defPosition("i4", 293, 437, 49, 49);
    view.defPosition("j4", 329, 437, 49, 49);
    view.defPosition("k4", 365, 437, 49, 49);
    view.defPosition("l4", 401, 437, 49, 49);
    view.defPosition("m4", 437, 437, 49, 49);
    view.defPosition("n4", 473, 437, 49, 49);
    view.defPosition("o4", 509, 437, 49, 49);
    view.defPosition("p4", 545, 437, 49, 49);
    view.defPosition("a3", 5, 473, 49, 49);
    view.defPosition("b3", 41, 473, 49, 49);
    view.defPosition("c3", 77, 473, 49, 49);
    view.defPosition("d3", 113, 473, 49, 49);
    view.defPosition("e3", 149, 473, 49, 49);
    view.defPosition("f3", 185, 473, 49, 49);
    view.defPosition("g3", 221, 473, 49, 49);
    view.defPosition("h3", 257, 473, 49, 49);
    view.defPosition("i3", 293, 473, 49, 49);
    view.defPosition("j3", 329, 473, 49, 49);
    view.defPosition("k3", 365, 473, 49, 49);
    view.defPosition("l3", 401, 473, 49, 49);
    view.defPosition("m3", 437, 473, 49, 49);
    view.defPosition("n3", 473, 473, 49, 49);
    view.defPosition("o3", 509, 473, 49, 49);
    view.defPosition("p3", 545, 473, 49, 49);
    view.defPosition("a2", 5, 509, 49, 49);
    view.defPosition("b2", 41, 509, 49, 49);
    view.defPosition("c2", 77, 509, 49, 49);
    view.defPosition("d2", 113, 509, 49, 49);
    view.defPosition("e2", 149, 509, 49, 49);
    view.defPosition("f2", 185, 509, 49, 49);
    view.defPosition("g2", 221, 509, 49, 49);
    view.defPosition("h2", 257, 509, 49, 49);
    view.defPosition("i2", 293, 509, 49, 49);
    view.defPosition("j2", 329, 509, 49, 49);
    view.defPosition("k2", 365, 509, 49, 49);
    view.defPosition("l2", 401, 509, 49, 49);
    view.defPosition("m2", 437, 509, 49, 49);
    view.defPosition("n2", 473, 509, 49, 49);
    view.defPosition("o2", 509, 509, 49, 49);
    view.defPosition("p2", 545, 509, 49, 49);
    view.defPosition("a1", 5, 545, 49, 49);
    view.defPosition("b1", 41, 545, 49, 49);
    view.defPosition("c1", 77, 545, 49, 49);
    view.defPosition("d1", 113, 545, 49, 49);
    view.defPosition("e1", 149, 545, 49, 49);
    view.defPosition("f1", 185, 545, 49, 49);
    view.defPosition("g1", 221, 545, 49, 49);
    view.defPosition("h1", 257, 545, 49, 49);
    view.defPosition("i1", 293, 545, 49, 49);
    view.defPosition("j1", 329, 545, 49, 49);
    view.defPosition("k1", 365, 545, 49, 49);
    view.defPosition("l1", 401, 545, 49, 49);
    view.defPosition("m1", 437, 545, 49, 49);
    view.defPosition("n1", 473, 545, 49, 49);
    view.defPosition("o1", 509, 545, 49, 49);
    view.defPosition("p1", 545, 545, 49, 49);
}
