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
    design.checkVersion("highlight-goals", "false");
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("hi-que-extension", "advanced");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("ne");
    design.addDirection("n");
    design.addDirection("se");
    design.addDirection("sw");
    design.addDirection("nw");

    design.addPlayer("White", [1, 0, 4, 6, 2, 7, 3, 5]);
    design.addPlayer("Black", [0, 1, 4, 3, 2, 5, 6, 7]);

    design.addPosition("a13", [0, 2, 26, 0, 0, 14, 0, 0]);
    design.addPosition("b13", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("c13", [-2, 2, 26, 0, 0, 14, 12, 0]);
    design.addPosition("d13", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("e13", [-2, 2, 26, 0, 0, 14, 12, 0]);
    design.addPosition("f13", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("g13", [-2, 2, 26, 0, 0, 14, 12, 0]);
    design.addPosition("h13", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("i13", [-2, 2, 26, 0, 0, 14, 12, 0]);
    design.addPosition("j13", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("k13", [-2, 2, 26, 0, 0, 14, 12, 0]);
    design.addPosition("l13", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("m13", [-2, 0, 26, 0, 0, 0, 12, 0]);
    design.addPosition("a12", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("b12", [0, 2, 26, -12, 0, 14, 12, -14]);
    design.addPosition("c12", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("d12", [-2, 2, 26, -12, 0, 14, 12, -14]);
    design.addPosition("e12", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("f12", [-2, 2, 26, -12, 0, 14, 12, -14]);
    design.addPosition("g12", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("h12", [-2, 2, 26, -12, 0, 14, 12, -14]);
    design.addPosition("i12", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("j12", [-2, 2, 26, -12, 0, 14, 12, -14]);
    design.addPosition("k12", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("l12", [-2, 0, 26, -12, 0, 14, 12, -14]);
    design.addPosition("m12", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("a11", [0, 2, 26, -12, -26, 14, 0, 0]);
    design.addPosition("b11", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("c11", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("d11", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("e11", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("f11", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("g11", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("h11", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("i11", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("j11", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("k11", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("l11", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("m11", [-2, 0, 26, 0, -26, 0, 12, -14]);
    design.addPosition("a10", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("b10", [0, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("c10", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("d10", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("e10", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("f10", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("g10", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("h10", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("i10", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("j10", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("k10", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("l10", [-2, 0, 26, -12, -26, 14, 12, -14]);
    design.addPosition("m10", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("a9", [0, 2, 26, -12, -26, 14, 0, 0]);
    design.addPosition("b9", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("c9", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("d9", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("e9", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("f9", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("g9", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("h9", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("i9", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("j9", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("k9", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("l9", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("m9", [-2, 0, 26, 0, -26, 0, 12, -14]);
    design.addPosition("a8", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("b8", [0, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("c8", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("d8", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("e8", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("f8", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("g8", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("h8", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("i8", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("j8", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("k8", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("l8", [-2, 0, 26, -12, -26, 14, 12, -14]);
    design.addPosition("m8", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("a7", [0, 2, 26, -12, -26, 14, 0, 0]);
    design.addPosition("b7", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("c7", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("d7", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("e7", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("f7", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("g7", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("h7", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("i7", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("j7", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("k7", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("l7", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("m7", [-2, 0, 26, 0, -26, 0, 12, -14]);
    design.addPosition("a6", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("b6", [0, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("c6", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("d6", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("e6", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("f6", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("g6", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("h6", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("i6", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("j6", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("k6", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("l6", [-2, 0, 26, -12, -26, 14, 12, -14]);
    design.addPosition("m6", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("a5", [0, 2, 26, -12, -26, 14, 0, 0]);
    design.addPosition("b5", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("c5", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("d5", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("e5", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("f5", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("g5", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("h5", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("i5", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("j5", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("k5", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("l5", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("m5", [-2, 0, 26, 0, -26, 0, 12, -14]);
    design.addPosition("a4", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("b4", [0, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("c4", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("d4", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("e4", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("f4", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("g4", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("h4", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("i4", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("j4", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("k4", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("l4", [-2, 0, 26, -12, -26, 14, 12, -14]);
    design.addPosition("m4", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("a3", [0, 2, 26, -12, -26, 14, 0, 0]);
    design.addPosition("b3", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("c3", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("d3", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("e3", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("f3", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("g3", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("h3", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("i3", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("j3", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("k3", [-2, 2, 26, -12, -26, 14, 12, -14]);
    design.addPosition("l3", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("m3", [-2, 0, 26, 0, -26, 0, 12, -14]);
    design.addPosition("a2", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("b2", [0, 2, 0, -12, -26, 14, 12, -14]);
    design.addPosition("c2", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("d2", [-2, 2, 0, -12, -26, 14, 12, -14]);
    design.addPosition("e2", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("f2", [-2, 2, 0, -12, -26, 14, 12, -14]);
    design.addPosition("g2", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("h2", [-2, 2, 0, -12, -26, 14, 12, -14]);
    design.addPosition("i2", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("j2", [-2, 2, 0, -12, -26, 14, 12, -14]);
    design.addPosition("k2", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("l2", [-2, 0, 0, -12, -26, 14, 12, -14]);
    design.addPosition("m2", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("a1", [0, 2, 0, -12, -26, 0, 0, 0]);
    design.addPosition("b1", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("c1", [-2, 2, 0, -12, -26, 0, 0, -14]);
    design.addPosition("d1", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("e1", [-2, 2, 0, -12, -26, 0, 0, -14]);
    design.addPosition("f1", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("g1", [-2, 2, 0, -12, -26, 0, 0, -14]);
    design.addPosition("h1", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("i1", [-2, 2, 0, -12, -26, 0, 0, -14]);
    design.addPosition("j1", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("k1", [-2, 2, 0, -12, -26, 0, 0, -14]);
    design.addPosition("l1", [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addPosition("m1", [-2, 0, 0, 0, -26, 0, 0, -14]);

    design.addZone("goal-zone", 1, [0, 2, 4, 6, 8, 10, 12]);
    design.addZone("goal-zone", 2, [156, 158, 160, 162, 164, 166, 168]);

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
    design.addCommand(1, ZRF.IF,	7);
    design.addCommand(1, ZRF.FORK,	3);
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.JUMP,	-8);
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addPiece("Man", 0);
    design.addMove(0, 0, [4], 0);
    design.addMove(0, 0, [0], 0);
    design.addMove(0, 0, [1], 0);

    design.addPiece("Angel", 1);
    design.addMove(1, 1, [4, 4], 0);
    design.addMove(1, 1, [2, 2], 0);
    design.addMove(1, 1, [0, 0], 0);
    design.addMove(1, 1, [1, 1], 0);

    design.setup("White", "Man", 158);
    design.setup("White", "Man", 160);
    design.setup("White", "Man", 162);
    design.setup("White", "Man", 164);
    design.setup("White", "Man", 166);
    design.setup("White", "Angel", 146);
    design.setup("White", "Angel", 148);
    design.setup("White", "Angel", 150);
    design.setup("White", "Angel", 152);
    design.setup("Black", "Man", 2);
    design.setup("Black", "Man", 4);
    design.setup("Black", "Man", 6);
    design.setup("Black", "Man", 8);
    design.setup("Black", "Man", 10);
    design.setup("Black", "Angel", 16);
    design.setup("Black", "Angel", 18);
    design.setup("Black", "Angel", 20);
    design.setup("Black", "Angel", 22);

    design.goal(0, "White", "Man", [2, 4, 6, 8, 10]);
    design.goal(1, "Black", "Man", [158, 160, 162, 164, 166]);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
    view.defPiece("WhiteAngel", "White Angel");
    view.defPiece("BlackAngel", "Black Angel");
 
    view.defPosition("a13", 76, 76, 41, 41);
    view.defPosition("b13", 117, 76, 41, 41);
    view.defPosition("c13", 158, 76, 41, 41);
    view.defPosition("d13", 199, 76, 41, 41);
    view.defPosition("e13", 240, 76, 41, 41);
    view.defPosition("f13", 281, 76, 41, 41);
    view.defPosition("g13", 322, 76, 41, 41);
    view.defPosition("h13", 363, 76, 41, 41);
    view.defPosition("i13", 404, 76, 41, 41);
    view.defPosition("j13", 445, 76, 41, 41);
    view.defPosition("k13", 486, 76, 41, 41);
    view.defPosition("l13", 527, 76, 41, 41);
    view.defPosition("m13", 568, 76, 41, 41);
    view.defPosition("a12", 76, 117, 41, 41);
    view.defPosition("b12", 117, 117, 41, 41);
    view.defPosition("c12", 158, 117, 41, 41);
    view.defPosition("d12", 199, 117, 41, 41);
    view.defPosition("e12", 240, 117, 41, 41);
    view.defPosition("f12", 281, 117, 41, 41);
    view.defPosition("g12", 322, 117, 41, 41);
    view.defPosition("h12", 363, 117, 41, 41);
    view.defPosition("i12", 404, 117, 41, 41);
    view.defPosition("j12", 445, 117, 41, 41);
    view.defPosition("k12", 486, 117, 41, 41);
    view.defPosition("l12", 527, 117, 41, 41);
    view.defPosition("m12", 568, 117, 41, 41);
    view.defPosition("a11", 76, 158, 41, 41);
    view.defPosition("b11", 117, 158, 41, 41);
    view.defPosition("c11", 158, 158, 41, 41);
    view.defPosition("d11", 199, 158, 41, 41);
    view.defPosition("e11", 240, 158, 41, 41);
    view.defPosition("f11", 281, 158, 41, 41);
    view.defPosition("g11", 322, 158, 41, 41);
    view.defPosition("h11", 363, 158, 41, 41);
    view.defPosition("i11", 404, 158, 41, 41);
    view.defPosition("j11", 445, 158, 41, 41);
    view.defPosition("k11", 486, 158, 41, 41);
    view.defPosition("l11", 527, 158, 41, 41);
    view.defPosition("m11", 568, 158, 41, 41);
    view.defPosition("a10", 76, 199, 41, 41);
    view.defPosition("b10", 117, 199, 41, 41);
    view.defPosition("c10", 158, 199, 41, 41);
    view.defPosition("d10", 199, 199, 41, 41);
    view.defPosition("e10", 240, 199, 41, 41);
    view.defPosition("f10", 281, 199, 41, 41);
    view.defPosition("g10", 322, 199, 41, 41);
    view.defPosition("h10", 363, 199, 41, 41);
    view.defPosition("i10", 404, 199, 41, 41);
    view.defPosition("j10", 445, 199, 41, 41);
    view.defPosition("k10", 486, 199, 41, 41);
    view.defPosition("l10", 527, 199, 41, 41);
    view.defPosition("m10", 568, 199, 41, 41);
    view.defPosition("a9", 76, 240, 41, 41);
    view.defPosition("b9", 117, 240, 41, 41);
    view.defPosition("c9", 158, 240, 41, 41);
    view.defPosition("d9", 199, 240, 41, 41);
    view.defPosition("e9", 240, 240, 41, 41);
    view.defPosition("f9", 281, 240, 41, 41);
    view.defPosition("g9", 322, 240, 41, 41);
    view.defPosition("h9", 363, 240, 41, 41);
    view.defPosition("i9", 404, 240, 41, 41);
    view.defPosition("j9", 445, 240, 41, 41);
    view.defPosition("k9", 486, 240, 41, 41);
    view.defPosition("l9", 527, 240, 41, 41);
    view.defPosition("m9", 568, 240, 41, 41);
    view.defPosition("a8", 76, 281, 41, 41);
    view.defPosition("b8", 117, 281, 41, 41);
    view.defPosition("c8", 158, 281, 41, 41);
    view.defPosition("d8", 199, 281, 41, 41);
    view.defPosition("e8", 240, 281, 41, 41);
    view.defPosition("f8", 281, 281, 41, 41);
    view.defPosition("g8", 322, 281, 41, 41);
    view.defPosition("h8", 363, 281, 41, 41);
    view.defPosition("i8", 404, 281, 41, 41);
    view.defPosition("j8", 445, 281, 41, 41);
    view.defPosition("k8", 486, 281, 41, 41);
    view.defPosition("l8", 527, 281, 41, 41);
    view.defPosition("m8", 568, 281, 41, 41);
    view.defPosition("a7", 76, 322, 41, 41);
    view.defPosition("b7", 117, 322, 41, 41);
    view.defPosition("c7", 158, 322, 41, 41);
    view.defPosition("d7", 199, 322, 41, 41);
    view.defPosition("e7", 240, 322, 41, 41);
    view.defPosition("f7", 281, 322, 41, 41);
    view.defPosition("g7", 322, 322, 41, 41);
    view.defPosition("h7", 363, 322, 41, 41);
    view.defPosition("i7", 404, 322, 41, 41);
    view.defPosition("j7", 445, 322, 41, 41);
    view.defPosition("k7", 486, 322, 41, 41);
    view.defPosition("l7", 527, 322, 41, 41);
    view.defPosition("m7", 568, 322, 41, 41);
    view.defPosition("a6", 76, 363, 41, 41);
    view.defPosition("b6", 117, 363, 41, 41);
    view.defPosition("c6", 158, 363, 41, 41);
    view.defPosition("d6", 199, 363, 41, 41);
    view.defPosition("e6", 240, 363, 41, 41);
    view.defPosition("f6", 281, 363, 41, 41);
    view.defPosition("g6", 322, 363, 41, 41);
    view.defPosition("h6", 363, 363, 41, 41);
    view.defPosition("i6", 404, 363, 41, 41);
    view.defPosition("j6", 445, 363, 41, 41);
    view.defPosition("k6", 486, 363, 41, 41);
    view.defPosition("l6", 527, 363, 41, 41);
    view.defPosition("m6", 568, 363, 41, 41);
    view.defPosition("a5", 76, 404, 41, 41);
    view.defPosition("b5", 117, 404, 41, 41);
    view.defPosition("c5", 158, 404, 41, 41);
    view.defPosition("d5", 199, 404, 41, 41);
    view.defPosition("e5", 240, 404, 41, 41);
    view.defPosition("f5", 281, 404, 41, 41);
    view.defPosition("g5", 322, 404, 41, 41);
    view.defPosition("h5", 363, 404, 41, 41);
    view.defPosition("i5", 404, 404, 41, 41);
    view.defPosition("j5", 445, 404, 41, 41);
    view.defPosition("k5", 486, 404, 41, 41);
    view.defPosition("l5", 527, 404, 41, 41);
    view.defPosition("m5", 568, 404, 41, 41);
    view.defPosition("a4", 76, 445, 41, 41);
    view.defPosition("b4", 117, 445, 41, 41);
    view.defPosition("c4", 158, 445, 41, 41);
    view.defPosition("d4", 199, 445, 41, 41);
    view.defPosition("e4", 240, 445, 41, 41);
    view.defPosition("f4", 281, 445, 41, 41);
    view.defPosition("g4", 322, 445, 41, 41);
    view.defPosition("h4", 363, 445, 41, 41);
    view.defPosition("i4", 404, 445, 41, 41);
    view.defPosition("j4", 445, 445, 41, 41);
    view.defPosition("k4", 486, 445, 41, 41);
    view.defPosition("l4", 527, 445, 41, 41);
    view.defPosition("m4", 568, 445, 41, 41);
    view.defPosition("a3", 76, 486, 41, 41);
    view.defPosition("b3", 117, 486, 41, 41);
    view.defPosition("c3", 158, 486, 41, 41);
    view.defPosition("d3", 199, 486, 41, 41);
    view.defPosition("e3", 240, 486, 41, 41);
    view.defPosition("f3", 281, 486, 41, 41);
    view.defPosition("g3", 322, 486, 41, 41);
    view.defPosition("h3", 363, 486, 41, 41);
    view.defPosition("i3", 404, 486, 41, 41);
    view.defPosition("j3", 445, 486, 41, 41);
    view.defPosition("k3", 486, 486, 41, 41);
    view.defPosition("l3", 527, 486, 41, 41);
    view.defPosition("m3", 568, 486, 41, 41);
    view.defPosition("a2", 76, 527, 41, 41);
    view.defPosition("b2", 117, 527, 41, 41);
    view.defPosition("c2", 158, 527, 41, 41);
    view.defPosition("d2", 199, 527, 41, 41);
    view.defPosition("e2", 240, 527, 41, 41);
    view.defPosition("f2", 281, 527, 41, 41);
    view.defPosition("g2", 322, 527, 41, 41);
    view.defPosition("h2", 363, 527, 41, 41);
    view.defPosition("i2", 404, 527, 41, 41);
    view.defPosition("j2", 445, 527, 41, 41);
    view.defPosition("k2", 486, 527, 41, 41);
    view.defPosition("l2", 527, 527, 41, 41);
    view.defPosition("m2", 568, 527, 41, 41);
    view.defPosition("a1", 76, 568, 41, 41);
    view.defPosition("b1", 117, 568, 41, 41);
    view.defPosition("c1", 158, 568, 41, 41);
    view.defPosition("d1", 199, 568, 41, 41);
    view.defPosition("e1", 240, 568, 41, 41);
    view.defPosition("f1", 281, 568, 41, 41);
    view.defPosition("g1", 322, 568, 41, 41);
    view.defPosition("h1", 363, 568, 41, 41);
    view.defPosition("i1", 404, 568, 41, 41);
    view.defPosition("j1", 445, 568, 41, 41);
    view.defPosition("k1", 486, 568, 41, 41);
    view.defPosition("l1", 527, 568, 41, 41);
    view.defPosition("m1", 568, 568, 41, 41);
}
