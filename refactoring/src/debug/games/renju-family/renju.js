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
    design.checkVersion("show-drops", "23");
    design.checkVersion("pass-turn", "forced");
    design.checkVersion("advisor-wait", "5");

    design.addDirection("w");  // 0
    design.addDirection("e");  // 1
    design.addDirection("s");  // 2
    design.addDirection("ne"); // 3
    design.addDirection("n");  // 4
    design.addDirection("se"); // 5
    design.addDirection("sw"); // 6
    design.addDirection("nw"); // 7

    design.addPlayer("Black", [1, 0, 4, 6, 2, 7, 3, 5]);
    design.addPlayer("White", [0, 1, 2, 3, 4, 5, 6, 7]);

    design.addPosition("a15", [0, 1, 15, 0, 0, 16, 0, 0]);
    design.addPosition("b15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("c15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("d15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("e15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("f15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("g15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("h15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("i15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("j15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("k15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("l15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("m15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("n15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("o15", [-1, 0, 15, 0, 0, 0, 14, 0]);
    design.addPosition("a14", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o14", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a13", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o13", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a12", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o12", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a11", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o11", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a10", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o10", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a9", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o9", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a8", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o8", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a7", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o7", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a6", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o6", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a5", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o5", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a4", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o4", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a3", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o3", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a2", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o2", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a1", [0, 1, 0, -14, -15, 0, 0, 0]);
    design.addPosition("b1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("c1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("d1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("e1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("f1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("g1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("h1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("i1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("j1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("k1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("l1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("m1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("n1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("o1", [-1, 0, 0, 0, -15, 0, 0, -16]);

    design.addZone("first-move", 1, [112]);
    design.addZone("second-move", 2, [126, 111, 96, 127, 97, 128, 113, 98]);
    design.addZone("third-move", 1, [126, 111, 96, 127, 97, 128, 113, 98, 140, 125, 110, 95, 80, 141, 81, 142, 82, 143, 83, 144, 129, 114, 99, 84]);

    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("Stone", 0);
    design.addDrop(0, 0, [], 0);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("BlackStone", "Black Stone");
    view.defPiece("WhiteStone", "White Stone");
    view.defPiece("Ko", "Ko");
 
    view.defPosition("a15", 5, 5, 30, 30);
    view.defPosition("b15", 35, 5, 30, 30);
    view.defPosition("c15", 65, 5, 30, 30);
    view.defPosition("d15", 95, 5, 30, 30);
    view.defPosition("e15", 125, 5, 30, 30);
    view.defPosition("f15", 155, 5, 30, 30);
    view.defPosition("g15", 185, 5, 30, 30);
    view.defPosition("h15", 215, 5, 30, 30);
    view.defPosition("i15", 245, 5, 30, 30);
    view.defPosition("j15", 275, 5, 30, 30);
    view.defPosition("k15", 305, 5, 30, 30);
    view.defPosition("l15", 335, 5, 30, 30);
    view.defPosition("m15", 365, 5, 30, 30);
    view.defPosition("n15", 395, 5, 30, 30);
    view.defPosition("o15", 425, 5, 30, 30);
    view.defPosition("a14", 5, 35, 30, 30);
    view.defPosition("b14", 35, 35, 30, 30);
    view.defPosition("c14", 65, 35, 30, 30);
    view.defPosition("d14", 95, 35, 30, 30);
    view.defPosition("e14", 125, 35, 30, 30);
    view.defPosition("f14", 155, 35, 30, 30);
    view.defPosition("g14", 185, 35, 30, 30);
    view.defPosition("h14", 215, 35, 30, 30);
    view.defPosition("i14", 245, 35, 30, 30);
    view.defPosition("j14", 275, 35, 30, 30);
    view.defPosition("k14", 305, 35, 30, 30);
    view.defPosition("l14", 335, 35, 30, 30);
    view.defPosition("m14", 365, 35, 30, 30);
    view.defPosition("n14", 395, 35, 30, 30);
    view.defPosition("o14", 425, 35, 30, 30);
    view.defPosition("a13", 5, 65, 30, 30);
    view.defPosition("b13", 35, 65, 30, 30);
    view.defPosition("c13", 65, 65, 30, 30);
    view.defPosition("d13", 95, 65, 30, 30);
    view.defPosition("e13", 125, 65, 30, 30);
    view.defPosition("f13", 155, 65, 30, 30);
    view.defPosition("g13", 185, 65, 30, 30);
    view.defPosition("h13", 215, 65, 30, 30);
    view.defPosition("i13", 245, 65, 30, 30);
    view.defPosition("j13", 275, 65, 30, 30);
    view.defPosition("k13", 305, 65, 30, 30);
    view.defPosition("l13", 335, 65, 30, 30);
    view.defPosition("m13", 365, 65, 30, 30);
    view.defPosition("n13", 395, 65, 30, 30);
    view.defPosition("o13", 425, 65, 30, 30);
    view.defPosition("a12", 5, 95, 30, 30);
    view.defPosition("b12", 35, 95, 30, 30);
    view.defPosition("c12", 65, 95, 30, 30);
    view.defPosition("d12", 95, 95, 30, 30);
    view.defPosition("e12", 125, 95, 30, 30);
    view.defPosition("f12", 155, 95, 30, 30);
    view.defPosition("g12", 185, 95, 30, 30);
    view.defPosition("h12", 215, 95, 30, 30);
    view.defPosition("i12", 245, 95, 30, 30);
    view.defPosition("j12", 275, 95, 30, 30);
    view.defPosition("k12", 305, 95, 30, 30);
    view.defPosition("l12", 335, 95, 30, 30);
    view.defPosition("m12", 365, 95, 30, 30);
    view.defPosition("n12", 395, 95, 30, 30);
    view.defPosition("o12", 425, 95, 30, 30);
    view.defPosition("a11", 5, 125, 30, 30);
    view.defPosition("b11", 35, 125, 30, 30);
    view.defPosition("c11", 65, 125, 30, 30);
    view.defPosition("d11", 95, 125, 30, 30);
    view.defPosition("e11", 125, 125, 30, 30);
    view.defPosition("f11", 155, 125, 30, 30);
    view.defPosition("g11", 185, 125, 30, 30);
    view.defPosition("h11", 215, 125, 30, 30);
    view.defPosition("i11", 245, 125, 30, 30);
    view.defPosition("j11", 275, 125, 30, 30);
    view.defPosition("k11", 305, 125, 30, 30);
    view.defPosition("l11", 335, 125, 30, 30);
    view.defPosition("m11", 365, 125, 30, 30);
    view.defPosition("n11", 395, 125, 30, 30);
    view.defPosition("o11", 425, 125, 30, 30);
    view.defPosition("a10", 5, 155, 30, 30);
    view.defPosition("b10", 35, 155, 30, 30);
    view.defPosition("c10", 65, 155, 30, 30);
    view.defPosition("d10", 95, 155, 30, 30);
    view.defPosition("e10", 125, 155, 30, 30);
    view.defPosition("f10", 155, 155, 30, 30);
    view.defPosition("g10", 185, 155, 30, 30);
    view.defPosition("h10", 215, 155, 30, 30);
    view.defPosition("i10", 245, 155, 30, 30);
    view.defPosition("j10", 275, 155, 30, 30);
    view.defPosition("k10", 305, 155, 30, 30);
    view.defPosition("l10", 335, 155, 30, 30);
    view.defPosition("m10", 365, 155, 30, 30);
    view.defPosition("n10", 395, 155, 30, 30);
    view.defPosition("o10", 425, 155, 30, 30);
    view.defPosition("a9", 5, 185, 30, 30);
    view.defPosition("b9", 35, 185, 30, 30);
    view.defPosition("c9", 65, 185, 30, 30);
    view.defPosition("d9", 95, 185, 30, 30);
    view.defPosition("e9", 125, 185, 30, 30);
    view.defPosition("f9", 155, 185, 30, 30);
    view.defPosition("g9", 185, 185, 30, 30);
    view.defPosition("h9", 215, 185, 30, 30);
    view.defPosition("i9", 245, 185, 30, 30);
    view.defPosition("j9", 275, 185, 30, 30);
    view.defPosition("k9", 305, 185, 30, 30);
    view.defPosition("l9", 335, 185, 30, 30);
    view.defPosition("m9", 365, 185, 30, 30);
    view.defPosition("n9", 395, 185, 30, 30);
    view.defPosition("o9", 425, 185, 30, 30);
    view.defPosition("a8", 5, 215, 30, 30);
    view.defPosition("b8", 35, 215, 30, 30);
    view.defPosition("c8", 65, 215, 30, 30);
    view.defPosition("d8", 95, 215, 30, 30);
    view.defPosition("e8", 125, 215, 30, 30);
    view.defPosition("f8", 155, 215, 30, 30);
    view.defPosition("g8", 185, 215, 30, 30);
    view.defPosition("h8", 215, 215, 30, 30);
    view.defPosition("i8", 245, 215, 30, 30);
    view.defPosition("j8", 275, 215, 30, 30);
    view.defPosition("k8", 305, 215, 30, 30);
    view.defPosition("l8", 335, 215, 30, 30);
    view.defPosition("m8", 365, 215, 30, 30);
    view.defPosition("n8", 395, 215, 30, 30);
    view.defPosition("o8", 425, 215, 30, 30);
    view.defPosition("a7", 5, 245, 30, 30);
    view.defPosition("b7", 35, 245, 30, 30);
    view.defPosition("c7", 65, 245, 30, 30);
    view.defPosition("d7", 95, 245, 30, 30);
    view.defPosition("e7", 125, 245, 30, 30);
    view.defPosition("f7", 155, 245, 30, 30);
    view.defPosition("g7", 185, 245, 30, 30);
    view.defPosition("h7", 215, 245, 30, 30);
    view.defPosition("i7", 245, 245, 30, 30);
    view.defPosition("j7", 275, 245, 30, 30);
    view.defPosition("k7", 305, 245, 30, 30);
    view.defPosition("l7", 335, 245, 30, 30);
    view.defPosition("m7", 365, 245, 30, 30);
    view.defPosition("n7", 395, 245, 30, 30);
    view.defPosition("o7", 425, 245, 30, 30);
    view.defPosition("a6", 5, 275, 30, 30);
    view.defPosition("b6", 35, 275, 30, 30);
    view.defPosition("c6", 65, 275, 30, 30);
    view.defPosition("d6", 95, 275, 30, 30);
    view.defPosition("e6", 125, 275, 30, 30);
    view.defPosition("f6", 155, 275, 30, 30);
    view.defPosition("g6", 185, 275, 30, 30);
    view.defPosition("h6", 215, 275, 30, 30);
    view.defPosition("i6", 245, 275, 30, 30);
    view.defPosition("j6", 275, 275, 30, 30);
    view.defPosition("k6", 305, 275, 30, 30);
    view.defPosition("l6", 335, 275, 30, 30);
    view.defPosition("m6", 365, 275, 30, 30);
    view.defPosition("n6", 395, 275, 30, 30);
    view.defPosition("o6", 425, 275, 30, 30);
    view.defPosition("a5", 5, 305, 30, 30);
    view.defPosition("b5", 35, 305, 30, 30);
    view.defPosition("c5", 65, 305, 30, 30);
    view.defPosition("d5", 95, 305, 30, 30);
    view.defPosition("e5", 125, 305, 30, 30);
    view.defPosition("f5", 155, 305, 30, 30);
    view.defPosition("g5", 185, 305, 30, 30);
    view.defPosition("h5", 215, 305, 30, 30);
    view.defPosition("i5", 245, 305, 30, 30);
    view.defPosition("j5", 275, 305, 30, 30);
    view.defPosition("k5", 305, 305, 30, 30);
    view.defPosition("l5", 335, 305, 30, 30);
    view.defPosition("m5", 365, 305, 30, 30);
    view.defPosition("n5", 395, 305, 30, 30);
    view.defPosition("o5", 425, 305, 30, 30);
    view.defPosition("a4", 5, 335, 30, 30);
    view.defPosition("b4", 35, 335, 30, 30);
    view.defPosition("c4", 65, 335, 30, 30);
    view.defPosition("d4", 95, 335, 30, 30);
    view.defPosition("e4", 125, 335, 30, 30);
    view.defPosition("f4", 155, 335, 30, 30);
    view.defPosition("g4", 185, 335, 30, 30);
    view.defPosition("h4", 215, 335, 30, 30);
    view.defPosition("i4", 245, 335, 30, 30);
    view.defPosition("j4", 275, 335, 30, 30);
    view.defPosition("k4", 305, 335, 30, 30);
    view.defPosition("l4", 335, 335, 30, 30);
    view.defPosition("m4", 365, 335, 30, 30);
    view.defPosition("n4", 395, 335, 30, 30);
    view.defPosition("o4", 425, 335, 30, 30);
    view.defPosition("a3", 5, 365, 30, 30);
    view.defPosition("b3", 35, 365, 30, 30);
    view.defPosition("c3", 65, 365, 30, 30);
    view.defPosition("d3", 95, 365, 30, 30);
    view.defPosition("e3", 125, 365, 30, 30);
    view.defPosition("f3", 155, 365, 30, 30);
    view.defPosition("g3", 185, 365, 30, 30);
    view.defPosition("h3", 215, 365, 30, 30);
    view.defPosition("i3", 245, 365, 30, 30);
    view.defPosition("j3", 275, 365, 30, 30);
    view.defPosition("k3", 305, 365, 30, 30);
    view.defPosition("l3", 335, 365, 30, 30);
    view.defPosition("m3", 365, 365, 30, 30);
    view.defPosition("n3", 395, 365, 30, 30);
    view.defPosition("o3", 425, 365, 30, 30);
    view.defPosition("a2", 5, 395, 30, 30);
    view.defPosition("b2", 35, 395, 30, 30);
    view.defPosition("c2", 65, 395, 30, 30);
    view.defPosition("d2", 95, 395, 30, 30);
    view.defPosition("e2", 125, 395, 30, 30);
    view.defPosition("f2", 155, 395, 30, 30);
    view.defPosition("g2", 185, 395, 30, 30);
    view.defPosition("h2", 215, 395, 30, 30);
    view.defPosition("i2", 245, 395, 30, 30);
    view.defPosition("j2", 275, 395, 30, 30);
    view.defPosition("k2", 305, 395, 30, 30);
    view.defPosition("l2", 335, 395, 30, 30);
    view.defPosition("m2", 365, 395, 30, 30);
    view.defPosition("n2", 395, 395, 30, 30);
    view.defPosition("o2", 425, 395, 30, 30);
    view.defPosition("a1", 5, 425, 30, 30);
    view.defPosition("b1", 35, 425, 30, 30);
    view.defPosition("c1", 65, 425, 30, 30);
    view.defPosition("d1", 95, 425, 30, 30);
    view.defPosition("e1", 125, 425, 30, 30);
    view.defPosition("f1", 155, 425, 30, 30);
    view.defPosition("g1", 185, 425, 30, 30);
    view.defPosition("h1", 215, 425, 30, 30);
    view.defPosition("i1", 245, 425, 30, 30);
    view.defPosition("j1", 275, 425, 30, 30);
    view.defPosition("k1", 305, 425, 30, 30);
    view.defPosition("l1", 335, 425, 30, 30);
    view.defPosition("m1", 365, 425, 30, 30);
    view.defPosition("n1", 395, 425, 30, 30);
    view.defPosition("o1", 425, 425, 30, 30);
}
