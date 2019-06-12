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
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "true");
    design.checkVersion("advisor-wait", "5");

    design.addDirection("ee"); // 0
    design.addDirection("ww"); // 1
    design.addDirection("se"); // 2
    design.addDirection("sw"); // 3
    design.addDirection("ne"); // 4
    design.addDirection("nw"); // 5

    design.addPlayer("White", [1, 0, 5, 4, 3, 2]);
    design.addPlayer("Black", [0, 1, 2, 3, 4, 5]);

    design.addPosition("a11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("d11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("e11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("f11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("g11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("h11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("i11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("j11", [2, 0, 23, 21, 0, 0]);
    design.addPosition("k11", [2, 0, 23, 21, 0, 0]);
    design.addPosition("l11", [2, -2, 23, 21, 0, 0]);
    design.addPosition("m11", [0, -2, 23, 21, 0, 0]);
    design.addPosition("n11", [0, -2, 23, 21, 0, 0]);
    design.addPosition("o11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("p11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("q11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("r11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("s11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("t11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("u11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("v11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("d10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("e10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("f10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("g10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("h10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("i10", [2, 0, 23, 21, -21, 0]);
    design.addPosition("j10", [2, 0, 23, 21, -21, 0]);
    design.addPosition("k10", [2, -2, 23, 21, -21, -23]);
    design.addPosition("l10", [2, -2, 23, 21, -21, -23]);
    design.addPosition("m10", [2, -2, 23, 21, -21, -23]);
    design.addPosition("n10", [0, -2, 23, 21, 0, -23]);
    design.addPosition("o10", [0, -2, 23, 21, 0, -23]);
    design.addPosition("p10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("q10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("r10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("s10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("t10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("u10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("v10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("d9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("e9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("f9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("g9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("h9", [2, 0, 23, 21, -21, 0]);
    design.addPosition("i9", [2, 0, 23, 21, -21, 0]);
    design.addPosition("j9", [2, -2, 23, 21, -21, -23]);
    design.addPosition("k9", [2, -2, 23, 21, -21, -23]);
    design.addPosition("l9", [2, -2, 23, 21, -21, -23]);
    design.addPosition("m9", [2, -2, 23, 21, -21, -23]);
    design.addPosition("n9", [2, -2, 23, 21, -21, -23]);
    design.addPosition("o9", [0, -2, 23, 21, 0, -23]);
    design.addPosition("p9", [0, -2, 23, 21, 0, -23]);
    design.addPosition("q9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("r9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("s9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("t9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("u9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("v9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a8", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b8", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c8", [0, 0, 0, 0, 0, 0]);
    design.addPosition("d8", [0, 0, 0, 0, 0, 0]);
    design.addPosition("e8", [0, 0, 0, 0, 0, 0]);
    design.addPosition("f8", [0, 0, 0, 0, 0, 0]);
    design.addPosition("g8", [2, 0, 23, 21, -21, 0]);
    design.addPosition("h8", [2, 0, 23, 21, -21, 0]);
    design.addPosition("i8", [2, -2, 23, 21, -21, -23]);
    design.addPosition("j8", [2, -2, 23, 21, -21, -23]);
    design.addPosition("k8", [2, -2, 23, 21, -21, -23]);
    design.addPosition("l8", [2, -2, 23, 21, -21, -23]);
    design.addPosition("m8", [2, -2, 23, 21, -21, -23]);
    design.addPosition("n8", [2, -2, 23, 21, -21, -23]);
    design.addPosition("o8", [2, -2, 23, 21, -21, -23]);
    design.addPosition("p8", [0, -2, 23, 21, 0, -23]);
    design.addPosition("q8", [0, -2, 23, 21, 0, -23]);
    design.addPosition("r8", [0, 0, 0, 0, 0, 0]);
    design.addPosition("s8", [0, 0, 0, 0, 0, 0]);
    design.addPosition("t8", [0, 0, 0, 0, 0, 0]);
    design.addPosition("u8", [0, 0, 0, 0, 0, 0]);
    design.addPosition("v8", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a7", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b7", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c7", [0, 0, 0, 0, 0, 0]);
    design.addPosition("d7", [0, 0, 0, 0, 0, 0]);
    design.addPosition("e7", [0, 0, 0, 0, 0, 0]);
    design.addPosition("f7", [2, 0, 23, 21, -21, 0]);
    design.addPosition("g7", [2, 0, 23, 21, -21, 0]);
    design.addPosition("h7", [2, -2, 23, 21, -21, -23]);
    design.addPosition("i7", [2, -2, 23, 21, -21, -23]);
    design.addPosition("j7", [2, -2, 23, 21, -21, -23]);
    design.addPosition("k7", [2, -2, 23, 21, -21, -23]);
    design.addPosition("l7", [2, -2, 23, 21, -21, -23]);
    design.addPosition("m7", [2, -2, 23, 21, -21, -23]);
    design.addPosition("n7", [2, -2, 23, 21, -21, -23]);
    design.addPosition("o7", [2, -2, 23, 21, -21, -23]);
    design.addPosition("p7", [2, -2, 23, 21, -21, -23]);
    design.addPosition("q7", [0, -2, 23, 21, 0, -23]);
    design.addPosition("r7", [0, -2, 23, 21, 0, -23]);
    design.addPosition("s7", [0, 0, 0, 0, 0, 0]);
    design.addPosition("t7", [0, 0, 0, 0, 0, 0]);
    design.addPosition("u7", [0, 0, 0, 0, 0, 0]);
    design.addPosition("v7", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a6", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b6", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c6", [0, 0, 0, 0, 0, 0]);
    design.addPosition("d6", [0, 0, 0, 0, 0, 0]);
    design.addPosition("e6", [2, 0, 23, 21, -21, 0]);
    design.addPosition("f6", [2, 0, 23, 21, -21, 0]);
    design.addPosition("g6", [2, -2, 23, 21, -21, -23]);
    design.addPosition("h6", [2, -2, 23, 21, -21, -23]);
    design.addPosition("i6", [2, -2, 23, 21, -21, -23]);
    design.addPosition("j6", [2, -2, 23, 21, -21, -23]);
    design.addPosition("k6", [2, -2, 23, 21, -21, -23]);
    design.addPosition("l6", [2, -2, 23, 21, -21, -23]);
    design.addPosition("m6", [2, -2, 23, 21, -21, -23]);
    design.addPosition("n6", [2, -2, 23, 21, -21, -23]);
    design.addPosition("o6", [2, -2, 23, 21, -21, -23]);
    design.addPosition("p6", [2, -2, 23, 21, -21, -23]);
    design.addPosition("q6", [2, -2, 23, 21, -21, -23]);
    design.addPosition("r6", [0, -2, 23, 21, 0, -23]);
    design.addPosition("s6", [0, -2, 23, 21, 0, -23]);
    design.addPosition("t6", [0, 0, 0, 0, 0, 0]);
    design.addPosition("u6", [0, 0, 0, 0, 0, 0]);
    design.addPosition("v6", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a5", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b5", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c5", [0, 0, 0, 0, 0, 0]);
    design.addPosition("d5", [2, 0, 23, 21, -21, 0]);
    design.addPosition("e5", [2, 0, 23, 21, -21, 0]);
    design.addPosition("f5", [2, -2, 23, 21, -21, -23]);
    design.addPosition("g5", [2, -2, 23, 21, -21, -23]);
    design.addPosition("h5", [2, -2, 23, 21, -21, -23]);
    design.addPosition("i5", [2, -2, 23, 21, -21, -23]);
    design.addPosition("j5", [2, -2, 23, 21, -21, -23]);
    design.addPosition("k5", [2, -2, 23, 21, -21, -23]);
    design.addPosition("l5", [2, -2, 23, 21, -21, -23]);
    design.addPosition("m5", [2, -2, 23, 21, -21, -23]);
    design.addPosition("n5", [2, -2, 23, 21, -21, -23]);
    design.addPosition("o5", [2, -2, 23, 21, -21, -23]);
    design.addPosition("p5", [2, -2, 23, 21, -21, -23]);
    design.addPosition("q5", [2, -2, 23, 21, -21, -23]);
    design.addPosition("r5", [2, -2, 23, 21, -21, -23]);
    design.addPosition("s5", [0, -2, 23, 21, 0, -23]);
    design.addPosition("t5", [0, -2, 23, 21, 0, -23]);
    design.addPosition("u5", [0, 0, 0, 0, 0, 0]);
    design.addPosition("v5", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a4", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b4", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c4", [2, 0, 23, 21, -21, 0]);
    design.addPosition("d4", [2, 0, 23, 21, -21, 0]);
    design.addPosition("e4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("f4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("g4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("h4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("i4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("j4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("k4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("l4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("m4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("n4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("o4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("p4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("q4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("r4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("s4", [2, -2, 23, 21, -21, -23]);
    design.addPosition("t4", [0, -2, 23, 21, 0, -23]);
    design.addPosition("u4", [0, -2, 23, 21, 0, -23]);
    design.addPosition("v4", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a3", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b3", [2, 0, 23, 0, -21, 0]);
    design.addPosition("c3", [2, 0, 23, 21, -21, 0]);
    design.addPosition("d3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("e3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("f3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("g3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("h3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("i3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("j3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("k3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("l3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("m3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("n3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("o3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("p3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("q3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("r3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("s3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("t3", [2, -2, 23, 21, -21, -23]);
    design.addPosition("u3", [0, -2, 23, 21, 0, -23]);
    design.addPosition("v3", [0, -2, 0, 21, 0, -23]);
    design.addPosition("a2", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b2", [2, 0, 23, 0, -21, 0]);
    design.addPosition("c2", [2, 0, 23, 0, -21, -23]);
    design.addPosition("d2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("e2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("f2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("g2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("h2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("i2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("j2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("k2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("l2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("m2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("n2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("o2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("p2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("q2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("r2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("s2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("t2", [2, -2, 23, 21, -21, -23]);
    design.addPosition("u2", [0, -2, 0, 21, -21, -23]);
    design.addPosition("v2", [0, -2, 0, 21, 0, -23]);
    design.addPosition("a1", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b1", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c1", [2, 0, 0, 0, -21, -23]);
    design.addPosition("d1", [2, 0, 0, 0, -21, -23]);
    design.addPosition("e1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("f1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("g1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("h1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("i1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("j1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("k1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("l1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("m1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("n1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("o1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("p1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("q1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("r1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("s1", [2, -2, 0, 0, -21, -23]);
    design.addPosition("t1", [0, -2, 0, 0, -21, -23]);
    design.addPosition("u1", [0, -2, 0, 0, -21, -23]);
    design.addPosition("v1", [0, 0, 0, 0, 0, 0]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("Soldier", 0, 2);
    design.addMove(0, 0, [5], 0);
    design.addMove(0, 0, [4], 0);
    design.addMove(0, 0, [0], 0);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [2], 0);
    design.addMove(0, 0, [1], 0);

    design.addPiece("Captain", 1, 10);
    design.addMove(1, 0, [5], 0);
    design.addMove(1, 0, [4], 0);
    design.addMove(1, 0, [0], 0);
    design.addMove(1, 0, [3], 0);
    design.addMove(1, 0, [2], 0);
    design.addMove(1, 0, [1], 0);

    design.setup("White", "Soldier", 205);
    design.setup("White", "Soldier", 207);
    design.setup("White", "Soldier", 209);
    design.setup("White", "Soldier", 211);
    design.setup("White", "Soldier", 213);
    design.setup("White", "Soldier", 182);
    design.setup("White", "Soldier", 184);
    design.setup("White", "Soldier", 186);
    design.setup("White", "Soldier", 188);
    design.setup("White", "Soldier", 190);
    design.setup("White", "Soldier", 192);
    design.setup("White", "Soldier", 159);
    design.setup("White", "Soldier", 163);
    design.setup("White", "Soldier", 165);
    design.setup("White", "Soldier", 167);
    design.setup("White", "Soldier", 171);
    design.setup("White", "Captain", 161);
    design.setup("White", "Captain", 169);
    design.setup("Black", "Soldier", 116);
    design.setup("Black", "Soldier", 120);
    design.setup("Black", "Soldier", 122);
    design.setup("Black", "Soldier", 126);
    design.setup("Black", "Soldier", 95);
    design.setup("Black", "Soldier", 97);
    design.setup("Black", "Soldier", 99);
    design.setup("Black", "Soldier", 101);
    design.setup("Black", "Soldier", 103);
    design.setup("Black", "Soldier", 74);
    design.setup("Black", "Soldier", 76);
    design.setup("Black", "Soldier", 78);
    design.setup("Black", "Soldier", 80);
    design.setup("Black", "Soldier", 53);
    design.setup("Black", "Soldier", 55);
    design.setup("Black", "Soldier", 57);
    design.setup("Black", "Captain", 118);
    design.setup("Black", "Captain", 124);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteSoldier", "White Soldier");
    view.defPiece("BlackSoldier", "Black Soldier");
    view.defPiece("WhiteCaptain", "White Captain");
    view.defPiece("BlackCaptain", "Black Captain");
 
    view.defPosition("a11", 0, 25, 30, 30);
    view.defPosition("b11", 26, 35, 30, 30);
    view.defPosition("c11", 52, 25, 30, 30);
    view.defPosition("d11", 78, 35, 30, 30);
    view.defPosition("e11", 104, 25, 30, 30);
    view.defPosition("f11", 130, 35, 30, 30);
    view.defPosition("g11", 156, 25, 30, 30);
    view.defPosition("h11", 182, 35, 30, 30);
    view.defPosition("i11", 208, 25, 30, 30);
    view.defPosition("j11", 234, 35, 30, 30);
    view.defPosition("k11", 260, 25, 30, 30);
    view.defPosition("l11", 286, 35, 30, 30);
    view.defPosition("m11", 312, 25, 30, 30);
    view.defPosition("n11", 338, 35, 30, 30);
    view.defPosition("o11", 364, 25, 30, 30);
    view.defPosition("p11", 390, 35, 30, 30);
    view.defPosition("q11", 416, 25, 30, 30);
    view.defPosition("r11", 442, 35, 30, 30);
    view.defPosition("s11", 468, 25, 30, 30);
    view.defPosition("t11", 494, 35, 30, 30);
    view.defPosition("u11", 520, 25, 30, 30);
    view.defPosition("v11", 546, 35, 30, 30);
    view.defPosition("a10", 0, 80, 30, 30);
    view.defPosition("b10", 26, 70, 30, 30);
    view.defPosition("c10", 52, 80, 30, 30);
    view.defPosition("d10", 78, 70, 30, 30);
    view.defPosition("e10", 104, 80, 30, 30);
    view.defPosition("f10", 130, 70, 30, 30);
    view.defPosition("g10", 156, 80, 30, 30);
    view.defPosition("h10", 182, 70, 30, 30);
    view.defPosition("i10", 208, 80, 30, 30);
    view.defPosition("j10", 234, 70, 30, 30);
    view.defPosition("k10", 260, 80, 30, 30);
    view.defPosition("l10", 286, 70, 30, 30);
    view.defPosition("m10", 312, 80, 30, 30);
    view.defPosition("n10", 338, 70, 30, 30);
    view.defPosition("o10", 364, 80, 30, 30);
    view.defPosition("p10", 390, 70, 30, 30);
    view.defPosition("q10", 416, 80, 30, 30);
    view.defPosition("r10", 442, 70, 30, 30);
    view.defPosition("s10", 468, 80, 30, 30);
    view.defPosition("t10", 494, 70, 30, 30);
    view.defPosition("u10", 520, 80, 30, 30);
    view.defPosition("v10", 546, 70, 30, 30);
    view.defPosition("a9", 0, 115, 30, 30);
    view.defPosition("b9", 26, 125, 30, 30);
    view.defPosition("c9", 52, 115, 30, 30);
    view.defPosition("d9", 78, 125, 30, 30);
    view.defPosition("e9", 104, 115, 30, 30);
    view.defPosition("f9", 130, 125, 30, 30);
    view.defPosition("g9", 156, 115, 30, 30);
    view.defPosition("h9", 182, 125, 30, 30);
    view.defPosition("i9", 208, 115, 30, 30);
    view.defPosition("j9", 234, 125, 30, 30);
    view.defPosition("k9", 260, 115, 30, 30);
    view.defPosition("l9", 286, 125, 30, 30);
    view.defPosition("m9", 312, 115, 30, 30);
    view.defPosition("n9", 338, 125, 30, 30);
    view.defPosition("o9", 364, 115, 30, 30);
    view.defPosition("p9", 390, 125, 30, 30);
    view.defPosition("q9", 416, 115, 30, 30);
    view.defPosition("r9", 442, 125, 30, 30);
    view.defPosition("s9", 468, 115, 30, 30);
    view.defPosition("t9", 494, 125, 30, 30);
    view.defPosition("u9", 520, 115, 30, 30);
    view.defPosition("v9", 546, 125, 30, 30);
    view.defPosition("a8", 0, 170, 30, 30);
    view.defPosition("b8", 26, 160, 30, 30);
    view.defPosition("c8", 52, 170, 30, 30);
    view.defPosition("d8", 78, 160, 30, 30);
    view.defPosition("e8", 104, 170, 30, 30);
    view.defPosition("f8", 130, 160, 30, 30);
    view.defPosition("g8", 156, 170, 30, 30);
    view.defPosition("h8", 182, 160, 30, 30);
    view.defPosition("i8", 208, 170, 30, 30);
    view.defPosition("j8", 234, 160, 30, 30);
    view.defPosition("k8", 260, 170, 30, 30);
    view.defPosition("l8", 286, 160, 30, 30);
    view.defPosition("m8", 312, 170, 30, 30);
    view.defPosition("n8", 338, 160, 30, 30);
    view.defPosition("o8", 364, 170, 30, 30);
    view.defPosition("p8", 390, 160, 30, 30);
    view.defPosition("q8", 416, 170, 30, 30);
    view.defPosition("r8", 442, 160, 30, 30);
    view.defPosition("s8", 468, 170, 30, 30);
    view.defPosition("t8", 494, 160, 30, 30);
    view.defPosition("u8", 520, 170, 30, 30);
    view.defPosition("v8", 546, 160, 30, 30);
    view.defPosition("a7", 0, 205, 30, 30);
    view.defPosition("b7", 26, 215, 30, 30);
    view.defPosition("c7", 52, 205, 30, 30);
    view.defPosition("d7", 78, 215, 30, 30);
    view.defPosition("e7", 104, 205, 30, 30);
    view.defPosition("f7", 130, 215, 30, 30);
    view.defPosition("g7", 156, 205, 30, 30);
    view.defPosition("h7", 182, 215, 30, 30);
    view.defPosition("i7", 208, 205, 30, 30);
    view.defPosition("j7", 234, 215, 30, 30);
    view.defPosition("k7", 260, 205, 30, 30);
    view.defPosition("l7", 286, 215, 30, 30);
    view.defPosition("m7", 312, 205, 30, 30);
    view.defPosition("n7", 338, 215, 30, 30);
    view.defPosition("o7", 364, 205, 30, 30);
    view.defPosition("p7", 390, 215, 30, 30);
    view.defPosition("q7", 416, 205, 30, 30);
    view.defPosition("r7", 442, 215, 30, 30);
    view.defPosition("s7", 468, 205, 30, 30);
    view.defPosition("t7", 494, 215, 30, 30);
    view.defPosition("u7", 520, 205, 30, 30);
    view.defPosition("v7", 546, 215, 30, 30);
    view.defPosition("a6", 0, 260, 30, 30);
    view.defPosition("b6", 26, 250, 30, 30);
    view.defPosition("c6", 52, 260, 30, 30);
    view.defPosition("d6", 78, 250, 30, 30);
    view.defPosition("e6", 104, 260, 30, 30);
    view.defPosition("f6", 130, 250, 30, 30);
    view.defPosition("g6", 156, 260, 30, 30);
    view.defPosition("h6", 182, 250, 30, 30);
    view.defPosition("i6", 208, 260, 30, 30);
    view.defPosition("j6", 234, 250, 30, 30);
    view.defPosition("k6", 260, 260, 30, 30);
    view.defPosition("l6", 286, 250, 30, 30);
    view.defPosition("m6", 312, 260, 30, 30);
    view.defPosition("n6", 338, 250, 30, 30);
    view.defPosition("o6", 364, 260, 30, 30);
    view.defPosition("p6", 390, 250, 30, 30);
    view.defPosition("q6", 416, 260, 30, 30);
    view.defPosition("r6", 442, 250, 30, 30);
    view.defPosition("s6", 468, 260, 30, 30);
    view.defPosition("t6", 494, 250, 30, 30);
    view.defPosition("u6", 520, 260, 30, 30);
    view.defPosition("v6", 546, 250, 30, 30);
    view.defPosition("a5", 0, 295, 30, 30);
    view.defPosition("b5", 26, 305, 30, 30);
    view.defPosition("c5", 52, 295, 30, 30);
    view.defPosition("d5", 78, 305, 30, 30);
    view.defPosition("e5", 104, 295, 30, 30);
    view.defPosition("f5", 130, 305, 30, 30);
    view.defPosition("g5", 156, 295, 30, 30);
    view.defPosition("h5", 182, 305, 30, 30);
    view.defPosition("i5", 208, 295, 30, 30);
    view.defPosition("j5", 234, 305, 30, 30);
    view.defPosition("k5", 260, 295, 30, 30);
    view.defPosition("l5", 286, 305, 30, 30);
    view.defPosition("m5", 312, 295, 30, 30);
    view.defPosition("n5", 338, 305, 30, 30);
    view.defPosition("o5", 364, 295, 30, 30);
    view.defPosition("p5", 390, 305, 30, 30);
    view.defPosition("q5", 416, 295, 30, 30);
    view.defPosition("r5", 442, 305, 30, 30);
    view.defPosition("s5", 468, 295, 30, 30);
    view.defPosition("t5", 494, 305, 30, 30);
    view.defPosition("u5", 520, 295, 30, 30);
    view.defPosition("v5", 546, 305, 30, 30);
    view.defPosition("a4", 0, 350, 30, 30);
    view.defPosition("b4", 26, 340, 30, 30);
    view.defPosition("c4", 52, 350, 30, 30);
    view.defPosition("d4", 78, 340, 30, 30);
    view.defPosition("e4", 104, 350, 30, 30);
    view.defPosition("f4", 130, 340, 30, 30);
    view.defPosition("g4", 156, 350, 30, 30);
    view.defPosition("h4", 182, 340, 30, 30);
    view.defPosition("i4", 208, 350, 30, 30);
    view.defPosition("j4", 234, 340, 30, 30);
    view.defPosition("k4", 260, 350, 30, 30);
    view.defPosition("l4", 286, 340, 30, 30);
    view.defPosition("m4", 312, 350, 30, 30);
    view.defPosition("n4", 338, 340, 30, 30);
    view.defPosition("o4", 364, 350, 30, 30);
    view.defPosition("p4", 390, 340, 30, 30);
    view.defPosition("q4", 416, 350, 30, 30);
    view.defPosition("r4", 442, 340, 30, 30);
    view.defPosition("s4", 468, 350, 30, 30);
    view.defPosition("t4", 494, 340, 30, 30);
    view.defPosition("u4", 520, 350, 30, 30);
    view.defPosition("v4", 546, 340, 30, 30);
    view.defPosition("a3", 0, 385, 30, 30);
    view.defPosition("b3", 26, 395, 30, 30);
    view.defPosition("c3", 52, 385, 30, 30);
    view.defPosition("d3", 78, 395, 30, 30);
    view.defPosition("e3", 104, 385, 30, 30);
    view.defPosition("f3", 130, 395, 30, 30);
    view.defPosition("g3", 156, 385, 30, 30);
    view.defPosition("h3", 182, 395, 30, 30);
    view.defPosition("i3", 208, 385, 30, 30);
    view.defPosition("j3", 234, 395, 30, 30);
    view.defPosition("k3", 260, 385, 30, 30);
    view.defPosition("l3", 286, 395, 30, 30);
    view.defPosition("m3", 312, 385, 30, 30);
    view.defPosition("n3", 338, 395, 30, 30);
    view.defPosition("o3", 364, 385, 30, 30);
    view.defPosition("p3", 390, 395, 30, 30);
    view.defPosition("q3", 416, 385, 30, 30);
    view.defPosition("r3", 442, 395, 30, 30);
    view.defPosition("s3", 468, 385, 30, 30);
    view.defPosition("t3", 494, 395, 30, 30);
    view.defPosition("u3", 520, 385, 30, 30);
    view.defPosition("v3", 546, 395, 30, 30);
    view.defPosition("a2", 0, 440, 30, 30);
    view.defPosition("b2", 26, 430, 30, 30);
    view.defPosition("c2", 52, 440, 30, 30);
    view.defPosition("d2", 78, 430, 30, 30);
    view.defPosition("e2", 104, 440, 30, 30);
    view.defPosition("f2", 130, 430, 30, 30);
    view.defPosition("g2", 156, 440, 30, 30);
    view.defPosition("h2", 182, 430, 30, 30);
    view.defPosition("i2", 208, 440, 30, 30);
    view.defPosition("j2", 234, 430, 30, 30);
    view.defPosition("k2", 260, 440, 30, 30);
    view.defPosition("l2", 286, 430, 30, 30);
    view.defPosition("m2", 312, 440, 30, 30);
    view.defPosition("n2", 338, 430, 30, 30);
    view.defPosition("o2", 364, 440, 30, 30);
    view.defPosition("p2", 390, 430, 30, 30);
    view.defPosition("q2", 416, 440, 30, 30);
    view.defPosition("r2", 442, 430, 30, 30);
    view.defPosition("s2", 468, 440, 30, 30);
    view.defPosition("t2", 494, 430, 30, 30);
    view.defPosition("u2", 520, 440, 30, 30);
    view.defPosition("v2", 546, 430, 30, 30);
    view.defPosition("a1", 0, 475, 30, 30);
    view.defPosition("b1", 26, 485, 30, 30);
    view.defPosition("c1", 52, 475, 30, 30);
    view.defPosition("d1", 78, 485, 30, 30);
    view.defPosition("e1", 104, 475, 30, 30);
    view.defPosition("f1", 130, 485, 30, 30);
    view.defPosition("g1", 156, 475, 30, 30);
    view.defPosition("h1", 182, 485, 30, 30);
    view.defPosition("i1", 208, 475, 30, 30);
    view.defPosition("j1", 234, 485, 30, 30);
    view.defPosition("k1", 260, 475, 30, 30);
    view.defPosition("l1", 286, 485, 30, 30);
    view.defPosition("m1", 312, 475, 30, 30);
    view.defPosition("n1", 338, 485, 30, 30);
    view.defPosition("o1", 364, 475, 30, 30);
    view.defPosition("p1", 390, 485, 30, 30);
    view.defPosition("q1", 416, 475, 30, 30);
    view.defPosition("r1", 442, 485, 30, 30);
    view.defPosition("s1", 468, 475, 30, 30);
    view.defPosition("t1", 494, 485, 30, 30);
    view.defPosition("u1", 520, 475, 30, 30);
    view.defPosition("v1", 546, 485, 30, 30);
}