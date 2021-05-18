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

if (!_.isUndefined(Dagaz.Controller.addSound)) {
    Dagaz.Controller.addSound(0, "../../sounds/slide.ogg", true);
    Dagaz.Controller.addSound(10, "../../sounds/dice.wav", true);
}

Dagaz.Model.BuildDesign = function(design) {
    design.checkVersion("z2j", "2");
    design.checkVersion("smart-moves", "from");
    design.checkVersion("pass-turn", "forced");
    design.checkVersion("pass-partial", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-captures", "false");
    design.checkVersion("show-drops", "false");
    design.checkVersion("advisor-wait", "10");

    design.addDirection("s");      // 0
    design.addDirection("e");      // 1
    design.addDirection("w");      // 2
    design.addDirection("n");      // 3
    design.addDirection("wup");    // 4
    design.addDirection("dn");     // 5
    design.addDirection("up");     // 6
    design.addDirection("shadow"); // 7
    design.addDirection("top");    // 8
    design.addDirection("na");     // 9
    design.addDirection("wna");    // 10
    design.addDirection("nb");     // 11
    design.addDirection("wnb");    // 12

    design.addPlayer("Black", [3, 2, 1, 0, 4, 5, 5, 7, 8, 9, 10, 11, 12]);
    design.addPlayer("White", [0, 1, 2, 3, 6, 5, 4, 7, 8, 10, 9, 12, 11]);
    design.addPlayer("N", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    design.addTurn(1);
    design.addTurn(2);

    design.addPosition("X", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("Y", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("Z", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("aI", [15, 1, 0, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("bI", [15, 1, -1, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("cI", [15, 1, -1, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("dI", [15, 1, -1, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("eI", [15, 1, -1, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("fI", [15, 1, -1, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("gI", [15, 1, -1, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("hI", [15, 1, -1, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("iI", [15, 1, -1, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("jI", [15, 1, -1, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("kI", [15, 1, -1, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("lI", [15, 1, -1, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("mI", [15, 1, -1, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("nI", [15, 1, -1, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("oI", [15, 0, -1, 0, 0, 225, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("aII", [15, 1, 0, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("bII", [15, 1, -1, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("cII", [15, 1, -1, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("dII", [15, 1, -1, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("eII", [15, 1, -1, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("fII", [15, 1, -1, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("gII", [15, 1, -1, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("hII", [15, 1, -1, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("iII", [15, 1, -1, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("jII", [15, 1, -1, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("kII", [15, 1, -1, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("lII", [15, 1, -1, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("mII", [15, 1, -1, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("nII", [15, 1, -1, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("oII", [15, 0, -1, -15, 0, 105, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("aIII", [0, 1, 0, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("bIII", [0, 1, -1, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("cIII", [0, 1, -1, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("dIII", [0, 1, -1, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("eIII", [0, 1, -1, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("fIII", [0, 1, -1, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("gIII", [0, 1, -1, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("hIII", [0, 1, -1, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("iIII", [0, 1, -1, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("jIII", [0, 1, -1, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("kIII", [0, 1, -1, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("lIII", [0, 1, -1, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("mIII", [0, 1, -1, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("nIII", [0, 1, -1, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("oIII", [0, 0, -1, -15, 0, 75, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("f17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("g17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("h17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("j17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("l17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("m17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("n17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("o17", [0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 1, 105, 0, 0]);
    design.addPosition("b16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 1, -1, 0, 0]);
    design.addPosition("c16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 1, -1, 0, 0]);
    design.addPosition("d16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 1, -1, 0, 0]);
    design.addPosition("e16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 1, -1, 0, 0]);
    design.addPosition("f16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 1, -1, 0, 0]);
    design.addPosition("g16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 1, -1, 0, 0]);
    design.addPosition("h16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 1, -1, 0, 0]);
    design.addPosition("i16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 1, -1, 0, 0]);
    design.addPosition("j16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 1, -1, 0, 0]);
    design.addPosition("k16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 1, -1, 0, 0]);
    design.addPosition("l16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 1, -1, 0, 0]);
    design.addPosition("m16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 1, -1, 0, 0]);
    design.addPosition("n16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 1, -1, 0, 0]);
    design.addPosition("o16", [0, 0, 0, 0, 15, -15, 15, 0, -30, 0, -1, 105, 0]);
    design.addPosition("a15", [0, 0, 0, 0, 15, -15, 15, 0, -45, -14, 90, 0, 0]);
    design.addPosition("b15", [0, 0, 0, 0, 15, -15, 15, 0, -45, -14, -16, 0, 0]);
    design.addPosition("c15", [0, 0, 0, 0, 15, -15, 15, 0, -45, -14, -16, 0, 0]);
    design.addPosition("d15", [0, 0, 0, 0, 15, -15, 15, 0, -45, -14, -16, 0, 0]);
    design.addPosition("e15", [0, 0, 0, 0, 15, -15, 15, 0, -45, -14, -16, 0, 0]);
    design.addPosition("f15", [0, 0, 0, 0, 15, -15, 15, 0, -45, -14, -16, 0, 0]);
    design.addPosition("g15", [0, 0, 0, 0, 15, -15, 15, 0, -45, -14, -16, 0, 0]);
    design.addPosition("h15", [0, 0, 0, 0, 15, -15, 15, 0, -45, -14, -16, 0, 0]);
    design.addPosition("i15", [0, 0, 0, 0, 15, -15, 15, 0, -45, -14, -16, 0, 0]);
    design.addPosition("j15", [0, 0, 0, 0, 15, -15, 15, 0, -45, -14, -16, 0, 0]);
    design.addPosition("k15", [0, 0, 0, 0, 15, -15, 15, 0, -45, -14, -16, 0, 0]);
    design.addPosition("l15", [0, 0, 0, 0, 15, -15, 15, 0, -45, -14, -16, 0, 0]);
    design.addPosition("m15", [0, 0, 0, 0, 15, -15, 15, 0, -45, -14, -16, 0, 0]);
    design.addPosition("n15", [0, 0, 0, 0, 15, -15, 15, 0, -45, -14, -16, 0, 0]);
    design.addPosition("o15", [0, 0, 0, 0, 15, -15, 15, 0, -45, 0, -16, 90, 0]);
    design.addPosition("a14", [0, 0, 0, 0, 15, -15, 15, 0, -60, -29, 75, 0, 0]);
    design.addPosition("b14", [0, 0, 0, 0, 15, -15, 15, 0, -60, -29, -31, 0, 0]);
    design.addPosition("c14", [0, 0, 0, 0, 15, -15, 15, 0, -60, -29, -31, 0, 0]);
    design.addPosition("d14", [0, 0, 0, 0, 15, -15, 15, 0, -60, -29, -31, 0, 0]);
    design.addPosition("e14", [0, 0, 0, 0, 15, -15, 15, 0, -60, -29, -31, 0, 0]);
    design.addPosition("f14", [0, 0, 0, 0, 15, -15, 15, 0, -60, -29, -31, 0, 0]);
    design.addPosition("g14", [0, 0, 0, 0, 15, -15, 15, 0, -60, -29, -31, 0, 0]);
    design.addPosition("h14", [0, 0, 0, 0, 15, -15, 15, 0, -60, -29, -31, 0, 0]);
    design.addPosition("i14", [0, 0, 0, 0, 15, -15, 15, 0, -60, -29, -31, 0, 0]);
    design.addPosition("j14", [0, 0, 0, 0, 15, -15, 15, 0, -60, -29, -31, 0, 0]);
    design.addPosition("k14", [0, 0, 0, 0, 15, -15, 15, 0, -60, -29, -31, 0, 0]);
    design.addPosition("l14", [0, 0, 0, 0, 15, -15, 15, 0, -60, -29, -31, 0, 0]);
    design.addPosition("m14", [0, 0, 0, 0, 15, -15, 15, 0, -60, -29, -31, 0, 0]);
    design.addPosition("n14", [0, 0, 0, 0, 15, -15, 15, 0, -60, -29, -31, 0, 0]);
    design.addPosition("o14", [0, 0, 0, 0, 15, -15, 15, 0, -60, 0, -31, 75, 0]);
    design.addPosition("a13", [0, 0, 0, 0, 0, -15, 0, 0, -75, -44, 60, 0, 0]);
    design.addPosition("b13", [0, 0, 0, 0, 0, -15, 0, 0, -75, -44, -46, 0, 0]);
    design.addPosition("c13", [0, 0, 0, 0, 0, -15, 0, 0, -75, -44, -46, 0, 0]);
    design.addPosition("d13", [0, 0, 0, 0, 0, -15, 0, 0, -75, -44, -46, 0, 0]);
    design.addPosition("e13", [0, 0, 0, 0, 0, -15, 0, 0, -75, -44, -46, 0, 0]);
    design.addPosition("f13", [0, 0, 0, 0, 0, -15, 0, 0, -75, -44, -46, 0, 0]);
    design.addPosition("g13", [0, 0, 0, 0, 0, -15, 0, 0, -75, -44, -46, 0, 0]);
    design.addPosition("h13", [0, 0, 0, 0, 0, -15, 0, 0, -75, -44, -46, 0, 0]);
    design.addPosition("i13", [0, 0, 0, 0, 0, -15, 0, 0, -75, -44, -46, 0, 0]);
    design.addPosition("j13", [0, 0, 0, 0, 0, -15, 0, 0, -75, -44, -46, 0, 0]);
    design.addPosition("k13", [0, 0, 0, 0, 0, -15, 0, 0, -75, -44, -46, 0, 0]);
    design.addPosition("l13", [0, 0, 0, 0, 0, -15, 0, 0, -75, -44, -46, 0, 0]);
    design.addPosition("m13", [0, 0, 0, 0, 0, -15, 0, 0, -75, -44, -46, 0, 0]);
    design.addPosition("n13", [0, 0, 0, 0, 0, -15, 0, 0, -75, -44, -46, 0, 0]);
    design.addPosition("o13", [0, 0, 0, 0, 0, -15, 0, 0, -75, 0, -46, 60, 0]);
    design.addPosition("a12", [0, 0, 0, 0, 60, 15, 0, 0, -105, -60, 46, 150, 46]);
    design.addPosition("b12", [0, 0, 0, 0, 60, 15, 0, 0, -105, 44, 46, 44, 46]);
    design.addPosition("c12", [0, 0, 0, 0, 60, 15, 0, 0, -105, 44, 46, 44, 46]);
    design.addPosition("d12", [0, 0, 0, 0, 60, 15, 0, 0, -105, 44, 46, 44, 46]);
    design.addPosition("e12", [0, 0, 0, 0, 60, 15, 0, 0, -105, 44, 46, 44, 46]);
    design.addPosition("f12", [0, 0, 0, 0, 60, 15, 0, 0, -105, 44, 46, 44, 46]);
    design.addPosition("g12", [0, 0, 0, 0, 60, 15, 0, 0, -105, 44, 46, 44, 46]);
    design.addPosition("h12", [0, 0, 0, 0, 60, 15, 0, 0, -105, 44, 46, 44, 46]);
    design.addPosition("i12", [0, 0, 0, 0, 60, 15, 0, 0, -105, 44, 46, 44, 46]);
    design.addPosition("j12", [0, 0, 0, 0, 60, 15, 0, 0, -105, 44, 46, 44, 46]);
    design.addPosition("k12", [0, 0, 0, 0, 60, 15, 0, 0, -105, 44, 46, 44, 46]);
    design.addPosition("l12", [0, 0, 0, 0, 60, 15, 0, 0, -105, 44, 46, 44, 46]);
    design.addPosition("m12", [0, 0, 0, 0, 60, 15, 0, 0, -105, 44, 46, 44, 46]);
    design.addPosition("n12", [0, 0, 0, 0, 60, 15, 0, 0, -105, 44, 46, 44, 46]);
    design.addPosition("o12", [0, 0, 0, 0, 60, 15, 0, 0, -105, 44, 150, 44, -60]);
    design.addPosition("a11", [0, 0, 0, 0, -15, 15, -15, 0, -120, -75, 31, 135, 31]);
    design.addPosition("b11", [0, 0, 0, 0, -15, 15, -15, 0, -120, 29, 31, 29, 31]);
    design.addPosition("c11", [0, 0, 0, 0, -15, 15, -15, 0, -120, 29, 31, 29, 31]);
    design.addPosition("d11", [0, 0, 0, 0, -15, 15, -15, 0, -120, 29, 31, 29, 31]);
    design.addPosition("e11", [0, 0, 0, 0, -15, 15, -15, 0, -120, 29, 31, 29, 31]);
    design.addPosition("f11", [0, 0, 0, 0, -15, 15, -15, 0, -120, 29, 31, 29, 31]);
    design.addPosition("g11", [0, 0, 0, 0, -15, 15, -15, 0, -120, 29, 31, 29, 31]);
    design.addPosition("h11", [0, 0, 0, 0, -15, 15, -15, 0, -120, 29, 31, 29, 31]);
    design.addPosition("i11", [0, 0, 0, 0, -15, 15, -15, 0, -120, 29, 31, 29, 31]);
    design.addPosition("j11", [0, 0, 0, 0, -15, 15, -15, 0, -120, 29, 31, 29, 31]);
    design.addPosition("k11", [0, 0, 0, 0, -15, 15, -15, 0, -120, 29, 31, 29, 31]);
    design.addPosition("l11", [0, 0, 0, 0, -15, 15, -15, 0, -120, 29, 31, 29, 31]);
    design.addPosition("m11", [0, 0, 0, 0, -15, 15, -15, 0, -120, 29, 31, 29, 31]);
    design.addPosition("n11", [0, 0, 0, 0, -15, 15, -15, 0, -120, 29, 31, 29, 31]);
    design.addPosition("o11", [0, 0, 0, 0, -15, 15, -15, 0, -120, 29, 135, 29, -75]);
    design.addPosition("a10", [0, 0, 0, 0, -15, 60, -15, -135, -135, -90, 16, 120, 16]);
    design.addPosition("b10", [0, 0, 0, 0, -15, 60, -15, -135, -135, 14, 16, 14, 16]);
    design.addPosition("c10", [0, 0, 0, 0, -15, 60, -15, -135, -135, 14, 16, 14, 16]);
    design.addPosition("d10", [0, 0, 0, 0, -15, 60, -15, -135, -135, 14, 16, 14, 16]);
    design.addPosition("e10", [0, 0, 0, 0, -15, 60, -15, -135, -135, 14, 16, 14, 16]);
    design.addPosition("f10", [0, 0, 0, 0, -15, 60, -15, -135, -135, 14, 16, 14, 16]);
    design.addPosition("g10", [0, 0, 0, 0, -15, 60, -15, -135, -135, 14, 16, 14, 16]);
    design.addPosition("h10", [0, 0, 0, 0, -15, 60, -15, -135, -135, 14, 16, 14, 16]);
    design.addPosition("i10", [0, 0, 0, 0, -15, 60, -15, -135, -135, 14, 16, 14, 16]);
    design.addPosition("j10", [0, 0, 0, 0, -15, 60, -15, -135, -135, 14, 16, 14, 16]);
    design.addPosition("k10", [0, 0, 0, 0, -15, 60, -15, -135, -135, 14, 16, 14, 16]);
    design.addPosition("l10", [0, 0, 0, 0, -15, 60, -15, -135, -135, 14, 16, 14, 16]);
    design.addPosition("m10", [0, 0, 0, 0, -15, 60, -15, -135, -135, 14, 16, 14, 16]);
    design.addPosition("n10", [0, 0, 0, 0, -15, 60, -15, -135, -135, 14, 16, 14, 16]);
    design.addPosition("o10", [0, 0, 0, 0, -15, 60, -15, -135, -135, 14, 120, 14, -90]);
    design.addPosition("a9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -105, 1, 105, 1]);
    design.addPosition("b9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -1, 1, -1, 1]);
    design.addPosition("c9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -1, 1, -1, 1]);
    design.addPosition("d9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -1, 1, -1, 1]);
    design.addPosition("e9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -1, 1, -1, 1]);
    design.addPosition("f9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -1, 1, -1, 1]);
    design.addPosition("g9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -1, 1, -1, 1]);
    design.addPosition("h9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -1, 1, -1, 1]);
    design.addPosition("i9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -1, 1, -1, 1]);
    design.addPosition("j9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -1, 1, -1, 1]);
    design.addPosition("k9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -1, 1, -1, 1]);
    design.addPosition("l9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -1, 1, -1, 1]);
    design.addPosition("m9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -1, 1, -1, 1]);
    design.addPosition("n9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -1, 1, -1, 1]);
    design.addPosition("o9", [0, 0, 0, 0, -15, 0, 15, -150, -150, -1, 105, -1, -105]);
    design.addPosition("a8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -120, -14, 90, -14]);
    design.addPosition("b8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -16, -14, -16, -14]);
    design.addPosition("c8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -16, -14, -16, -14]);
    design.addPosition("d8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -16, -14, -16, -14]);
    design.addPosition("e8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -16, -14, -16, -14]);
    design.addPosition("f8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -16, -14, -16, -14]);
    design.addPosition("g8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -16, -14, -16, -14]);
    design.addPosition("h8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -16, -14, -16, -14]);
    design.addPosition("i8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -16, -14, -16, -14]);
    design.addPosition("j8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -16, -14, -16, -14]);
    design.addPosition("k8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -16, -14, -16, -14]);
    design.addPosition("l8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -16, -14, -16, -14]);
    design.addPosition("m8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -16, -14, -16, -14]);
    design.addPosition("n8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -16, -14, -16, -14]);
    design.addPosition("o8", [0, 0, 0, 0, 15, -15, 15, -165, -165, -16, 90, -16, -120]);
    design.addPosition("a7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -135, -29, 75, -29]);
    design.addPosition("b7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -31, -29, -31, -29]);
    design.addPosition("c7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -31, -29, -31, -29]);
    design.addPosition("d7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -31, -29, -31, -29]);
    design.addPosition("e7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -31, -29, -31, -29]);
    design.addPosition("f7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -31, -29, -31, -29]);
    design.addPosition("g7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -31, -29, -31, -29]);
    design.addPosition("h7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -31, -29, -31, -29]);
    design.addPosition("i7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -31, -29, -31, -29]);
    design.addPosition("j7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -31, -29, -31, -29]);
    design.addPosition("k7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -31, -29, -31, -29]);
    design.addPosition("l7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -31, -29, -31, -29]);
    design.addPosition("m7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -31, -29, -31, -29]);
    design.addPosition("n7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -31, -29, -31, -29]);
    design.addPosition("o7", [0, 0, 0, 0, 15, -15, 15, 0, -180, -31, 75, -31, -135]);
    design.addPosition("a6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -150, -44, 60, -44]);
    design.addPosition("b6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -46, -44, -46, -44]);
    design.addPosition("c6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -46, -44, -46, -44]);
    design.addPosition("d6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -46, -44, -46, -44]);
    design.addPosition("e6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -46, -44, -46, -44]);
    design.addPosition("f6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -46, -44, -46, -44]);
    design.addPosition("g6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -46, -44, -46, -44]);
    design.addPosition("h6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -46, -44, -46, -44]);
    design.addPosition("i6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -46, -44, -46, -44]);
    design.addPosition("j6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -46, -44, -46, -44]);
    design.addPosition("k6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -46, -44, -46, -44]);
    design.addPosition("l6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -46, -44, -46, -44]);
    design.addPosition("m6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -46, -44, -46, -44]);
    design.addPosition("n6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -46, -44, -46, -44]);
    design.addPosition("o6", [0, 0, 0, 0, 0, -15, -60, 0, -195, -46, 60, -46, -150]);
    design.addPosition("a5", [0, 0, 0, 0, 0, 15, 0, 0, -225, 46, 0, 0, -60]);
    design.addPosition("b5", [0, 0, 0, 0, 0, 15, 0, 0, -225, 46, 44, 0, 0]);
    design.addPosition("c5", [0, 0, 0, 0, 0, 15, 0, 0, -225, 46, 44, 0, 0]);
    design.addPosition("d5", [0, 0, 0, 0, 0, 15, 0, 0, -225, 46, 44, 0, 0]);
    design.addPosition("e5", [0, 0, 0, 0, 0, 15, 0, 0, -225, 46, 44, 0, 0]);
    design.addPosition("f5", [0, 0, 0, 0, 0, 15, 0, 0, -225, 46, 44, 0, 0]);
    design.addPosition("g5", [0, 0, 0, 0, 0, 15, 0, 0, -225, 46, 44, 0, 0]);
    design.addPosition("h5", [0, 0, 0, 0, 0, 15, 0, 0, -225, 46, 44, 0, 0]);
    design.addPosition("i5", [0, 0, 0, 0, 0, 15, 0, 0, -225, 46, 44, 0, 0]);
    design.addPosition("j5", [0, 0, 0, 0, 0, 15, 0, 0, -225, 46, 44, 0, 0]);
    design.addPosition("k5", [0, 0, 0, 0, 0, 15, 0, 0, -225, 46, 44, 0, 0]);
    design.addPosition("l5", [0, 0, 0, 0, 0, 15, 0, 0, -225, 46, 44, 0, 0]);
    design.addPosition("m5", [0, 0, 0, 0, 0, 15, 0, 0, -225, 46, 44, 0, 0]);
    design.addPosition("n5", [0, 0, 0, 0, 0, 15, 0, 0, -225, 46, 44, 0, 0]);
    design.addPosition("o5", [0, 0, 0, 0, 0, 15, 0, 0, -225, -60, 44, 0, 0]);
    design.addPosition("a4", [0, 0, 0, 0, -15, 15, -15, 0, -240, 31, 0, 0, -75]);
    design.addPosition("b4", [0, 0, 0, 0, -15, 15, -15, 0, -240, 31, 29, 0, 0]);
    design.addPosition("c4", [0, 0, 0, 0, -15, 15, -15, 0, -240, 31, 29, 0, 0]);
    design.addPosition("d4", [0, 0, 0, 0, -15, 15, -15, 0, -240, 31, 29, 0, 0]);
    design.addPosition("e4", [0, 0, 0, 0, -15, 15, -15, 0, -240, 31, 29, 0, 0]);
    design.addPosition("f4", [0, 0, 0, 0, -15, 15, -15, 0, -240, 31, 29, 0, 0]);
    design.addPosition("g4", [0, 0, 0, 0, -15, 15, -15, 0, -240, 31, 29, 0, 0]);
    design.addPosition("h4", [0, 0, 0, 0, -15, 15, -15, 0, -240, 31, 29, 0, 0]);
    design.addPosition("i4", [0, 0, 0, 0, -15, 15, -15, 0, -240, 31, 29, 0, 0]);
    design.addPosition("j4", [0, 0, 0, 0, -15, 15, -15, 0, -240, 31, 29, 0, 0]);
    design.addPosition("k4", [0, 0, 0, 0, -15, 15, -15, 0, -240, 31, 29, 0, 0]);
    design.addPosition("l4", [0, 0, 0, 0, -15, 15, -15, 0, -240, 31, 29, 0, 0]);
    design.addPosition("m4", [0, 0, 0, 0, -15, 15, -15, 0, -240, 31, 29, 0, 0]);
    design.addPosition("n4", [0, 0, 0, 0, -15, 15, -15, 0, -240, 31, 29, 0, 0]);
    design.addPosition("o4", [0, 0, 0, 0, -15, 15, -15, 0, -240, -75, 29, 0, 0]);
    design.addPosition("a3", [0, 0, 0, 0, -15, 15, -15, 0, -255, 16, 0, 0, -90]);
    design.addPosition("b3", [0, 0, 0, 0, -15, 15, -15, 0, -255, 16, 14, 0, 0]);
    design.addPosition("c3", [0, 0, 0, 0, -15, 15, -15, 0, -255, 16, 14, 0, 0]);
    design.addPosition("d3", [0, 0, 0, 0, -15, 15, -15, 0, -255, 16, 14, 0, 0]);
    design.addPosition("e3", [0, 0, 0, 0, -15, 15, -15, 0, -255, 16, 14, 0, 0]);
    design.addPosition("f3", [0, 0, 0, 0, -15, 15, -15, 0, -255, 16, 14, 0, 0]);
    design.addPosition("g3", [0, 0, 0, 0, -15, 15, -15, 0, -255, 16, 14, 0, 0]);
    design.addPosition("h3", [0, 0, 0, 0, -15, 15, -15, 0, -255, 16, 14, 0, 0]);
    design.addPosition("i3", [0, 0, 0, 0, -15, 15, -15, 0, -255, 16, 14, 0, 0]);
    design.addPosition("j3", [0, 0, 0, 0, -15, 15, -15, 0, -255, 16, 14, 0, 0]);
    design.addPosition("k3", [0, 0, 0, 0, -15, 15, -15, 0, -255, 16, 14, 0, 0]);
    design.addPosition("l3", [0, 0, 0, 0, -15, 15, -15, 0, -255, 16, 14, 0, 0]);
    design.addPosition("m3", [0, 0, 0, 0, -15, 15, -15, 0, -255, 16, 14, 0, 0]);
    design.addPosition("n3", [0, 0, 0, 0, -15, 15, -15, 0, -255, 16, 14, 0, 0]);
    design.addPosition("o3", [0, 0, 0, 0, -15, 15, -15, 0, -255, -90, 14, 0, 0]);
    design.addPosition("a2", [0, 0, 0, 0, -15, 15, -15, 0, -270, 1, 0, 0, -105]);
    design.addPosition("b2", [0, 0, 0, 0, -15, 15, -15, 0, -270, 1, -1, 0, 0]);
    design.addPosition("c2", [0, 0, 0, 0, -15, 15, -15, 0, -270, 1, -1, 0, 0]);
    design.addPosition("d2", [0, 0, 0, 0, -15, 15, -15, 0, -270, 1, -1, 0, 0]);
    design.addPosition("e2", [0, 0, 0, 0, -15, 15, -15, 0, -270, 1, -1, 0, 0]);
    design.addPosition("f2", [0, 0, 0, 0, -15, 15, -15, 0, -270, 1, -1, 0, 0]);
    design.addPosition("g2", [0, 0, 0, 0, -15, 15, -15, 0, -270, 1, -1, 0, 0]);
    design.addPosition("h2", [0, 0, 0, 0, -15, 15, -15, 0, -270, 1, -1, 0, 0]);
    design.addPosition("i2", [0, 0, 0, 0, -15, 15, -15, 0, -270, 1, -1, 0, 0]);
    design.addPosition("j2", [0, 0, 0, 0, -15, 15, -15, 0, -270, 1, -1, 0, 0]);
    design.addPosition("k2", [0, 0, 0, 0, -15, 15, -15, 0, -270, 1, -1, 0, 0]);
    design.addPosition("l2", [0, 0, 0, 0, -15, 15, -15, 0, -270, 1, -1, 0, 0]);
    design.addPosition("m2", [0, 0, 0, 0, -15, 15, -15, 0, -270, 1, -1, 0, 0]);
    design.addPosition("n2", [0, 0, 0, 0, -15, 15, -15, 0, -270, 1, -1, 0, 0]);
    design.addPosition("o2", [0, 0, 0, 0, -15, 15, -15, 0, -270, -105, -1, 0, 0]);
    design.addPosition("a1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("f1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("g1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("h1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("j1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("l1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("m1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("n1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);
    design.addPosition("o1", [0, 0, 0, 0, -15, 0, -15, 0, 0, 0, 0, 0, 0]);

    design.addZone("dices", 2, [0, 1, 2]);
    design.addZone("dices", 1, [0, 1, 2]);
    design.addZone("start", 2, [288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62]);
    design.addZone("start", 1, [288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62]);

    design.addCommand(0, ZRF.IN_ZONE,	0);	// dices
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.MODE,	1);	// dice-1
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.MODE,	2);	// dice-2
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.IN_ZONE,	1);	// start
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.ON_BOARD_DIR,	9);	// name
    design.addCommand(5, ZRF.FUNCTION,	0);	// not
    design.addCommand(5, ZRF.IF,	4);
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.JUMP,	3);
    design.addCommand(5, ZRF.PARAM,	1);	// $2
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.ON_BOARD_DIR,	9);	// name
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.IF,	4);
    design.addCommand(6, ZRF.PARAM,	0);	// $1
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.JUMP,	3);
    design.addCommand(6, ZRF.PARAM,	1);	// $2
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.ON_BOARD_DIR,	9);	// name
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.IF,	4);
    design.addCommand(6, ZRF.PARAM,	2);	// $3
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.JUMP,	3);
    design.addCommand(6, ZRF.PARAM,	3);	// $4
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addCommand(7, ZRF.FUNCTION,	24);	// from
    design.addCommand(7, ZRF.ON_BOARD_DIR,	9);	// name
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.IF,	4);
    design.addCommand(7, ZRF.PARAM,	0);	// $1
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.JUMP,	3);
    design.addCommand(7, ZRF.PARAM,	1);	// $2
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.ON_BOARD_DIR,	9);	// name
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.IF,	4);
    design.addCommand(7, ZRF.PARAM,	2);	// $3
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.JUMP,	3);
    design.addCommand(7, ZRF.PARAM,	3);	// $4
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.ON_BOARD_DIR,	9);	// name
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.IF,	4);
    design.addCommand(7, ZRF.PARAM,	4);	// $5
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.JUMP,	3);
    design.addCommand(7, ZRF.PARAM,	5);	// $6
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.FUNCTION,	28);	// end

    design.addPiece("D0", 0);
//  design.addDrop(0, 0, [], 0, 10);

    design.addPiece("D1", 1);
//  design.addDrop(1, 0, [], 0, 10);

    design.addPiece("D2", 2);
//  design.addDrop(2, 0, [], 0, 10);

    design.addPiece("D3", 3);
//  design.addDrop(3, 0, [], 0, 10);

    design.addPiece("King", 4);
    design.addMove(4, 1, [3], 1);
    design.addMove(4, 1, [1], 1);
    design.addMove(4, 1, [2], 1);
    design.addMove(4, 1, [0], 1);
    design.addMove(4, 2, [3], 2);
    design.addMove(4, 2, [1], 2);
    design.addMove(4, 2, [2], 2);
    design.addMove(4, 2, [0], 2);
    design.addMove(4, 3, [3], 3);
    design.addMove(4, 3, [1], 3);
    design.addMove(4, 3, [2], 3);
    design.addMove(4, 3, [0], 3);

    design.addPiece("Man", 5);
    design.addMove(5, 4, [6], 1);
    design.addMove(5, 5, [9, 11, 6], 1);
    design.addMove(5, 6, [9, 11, 9, 11, 6], 2);
    design.addMove(5, 7, [9, 11, 9, 11, 9, 11, 6], 3);

    design.setup("White", "Man", 48);
    design.setup("White", "Man", 49);
    design.setup("White", "Man", 50);
    design.setup("White", "Man", 51);
    design.setup("White", "Man", 52);
    design.setup("White", "Man", 53);
    design.setup("White", "Man", 54);
    design.setup("White", "Man", 55);
    design.setup("White", "Man", 56);
    design.setup("White", "Man", 57);
    design.setup("White", "Man", 58);
    design.setup("White", "Man", 59);
    design.setup("White", "Man", 60);
    design.setup("White", "Man", 61);
    design.setup("White", "Man", 62);
    design.setup("Black", "Man", 288);
    design.setup("Black", "Man", 289);
    design.setup("Black", "Man", 290);
    design.setup("Black", "Man", 291);
    design.setup("Black", "Man", 292);
    design.setup("Black", "Man", 293);
    design.setup("Black", "Man", 294);
    design.setup("Black", "Man", 295);
    design.setup("Black", "Man", 296);
    design.setup("Black", "Man", 297);
    design.setup("Black", "Man", 298);
    design.setup("Black", "Man", 299);
    design.setup("Black", "Man", 300);
    design.setup("Black", "Man", 301);
    design.setup("Black", "Man", 302);
    design.setup("N", "King", 25);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteD0", "White D0");
    view.defPiece("BlackD0", "Black D0");
    view.defPiece("WhiteD1", "White D1");
    view.defPiece("BlackD1", "Black D1");
    view.defPiece("WhiteD2", "White D2");
    view.defPiece("BlackD2", "Black D2");
    view.defPiece("WhiteD3", "White D3");
    view.defPiece("BlackD3", "Black D3");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
    view.defPiece("NKing", "N King");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
 
    view.defPosition("X", 751, 107, 92, 21);
    view.defPosition("Y", 751, 155, 92, 21);
    view.defPosition("Z", 751, 203, 92, 21);
    view.defPosition("aI", 11, 103, 42, 42);
    view.defPosition("bI", 58, 103, 42, 42);
    view.defPosition("cI", 105, 103, 42, 42);
    view.defPosition("dI", 152, 103, 42, 42);
    view.defPosition("eI", 199, 103, 42, 42);
    view.defPosition("fI", 246, 103, 42, 42);
    view.defPosition("gI", 293, 103, 42, 42);
    view.defPosition("hI", 340, 103, 42, 42);
    view.defPosition("iI", 387, 103, 42, 42);
    view.defPosition("jI", 434, 103, 42, 42);
    view.defPosition("kI", 481, 103, 42, 42);
    view.defPosition("lI", 528, 103, 42, 42);
    view.defPosition("mI", 575, 103, 42, 42);
    view.defPosition("nI", 622, 103, 42, 42);
    view.defPosition("oI", 669, 103, 42, 42);
    view.defPosition("aII", 11, 145, 42, 42);
    view.defPosition("bII", 58, 145, 42, 42);
    view.defPosition("cII", 105, 145, 42, 42);
    view.defPosition("dII", 152, 145, 42, 42);
    view.defPosition("eII", 199, 145, 42, 42);
    view.defPosition("fII", 246, 145, 42, 42);
    view.defPosition("gII", 293, 145, 42, 42);
    view.defPosition("hII", 340, 145, 42, 42);
    view.defPosition("iII", 387, 145, 42, 42);
    view.defPosition("jII", 434, 145, 42, 42);
    view.defPosition("kII", 481, 145, 42, 42);
    view.defPosition("lII", 528, 145, 42, 42);
    view.defPosition("mII", 575, 145, 42, 42);
    view.defPosition("nII", 622, 145, 42, 42);
    view.defPosition("oII", 669, 145, 42, 42);
    view.defPosition("aIII", 11, 187, 42, 42);
    view.defPosition("bIII", 58, 187, 42, 42);
    view.defPosition("cIII", 105, 187, 42, 42);
    view.defPosition("dIII", 152, 187, 42, 42);
    view.defPosition("eIII", 199, 187, 42, 42);
    view.defPosition("fIII", 246, 187, 42, 42);
    view.defPosition("gIII", 293, 187, 42, 42);
    view.defPosition("hIII", 340, 187, 42, 42);
    view.defPosition("iIII", 387, 187, 42, 42);
    view.defPosition("jIII", 434, 187, 42, 42);
    view.defPosition("kIII", 481, 187, 42, 42);
    view.defPosition("lIII", 528, 187, 42, 42);
    view.defPosition("mIII", 575, 187, 42, 42);
    view.defPosition("nIII", 622, 187, 42, 42);
    view.defPosition("oIII", 669, 187, 42, 42);
    view.defPosition("a17", 12, 21, 40, 16);
    view.defPosition("b17", 59, 21, 40, 16);
    view.defPosition("c17", 106, 21, 40, 16);
    view.defPosition("d17", 153, 21, 40, 16);
    view.defPosition("e17", 200, 21, 40, 16);
    view.defPosition("f17", 247, 21, 40, 16);
    view.defPosition("g17", 294, 21, 40, 16);
    view.defPosition("h17", 341, 21, 40, 16);
    view.defPosition("i17", 388, 21, 40, 16);
    view.defPosition("j17", 435, 21, 40, 16);
    view.defPosition("k17", 482, 21, 40, 16);
    view.defPosition("l17", 529, 21, 40, 16);
    view.defPosition("m17", 576, 21, 40, 16);
    view.defPosition("n17", 623, 21, 40, 16);
    view.defPosition("o17", 670, 21, 40, 16);
    view.defPosition("a16", 12, 38, 40, 16);
    view.defPosition("b16", 59, 38, 40, 16);
    view.defPosition("c16", 106, 38, 40, 16);
    view.defPosition("d16", 153, 38, 40, 16);
    view.defPosition("e16", 200, 38, 40, 16);
    view.defPosition("f16", 247, 38, 40, 16);
    view.defPosition("g16", 294, 38, 40, 16);
    view.defPosition("h16", 341, 38, 40, 16);
    view.defPosition("i16", 388, 38, 40, 16);
    view.defPosition("j16", 435, 38, 40, 16);
    view.defPosition("k16", 482, 38, 40, 16);
    view.defPosition("l16", 529, 38, 40, 16);
    view.defPosition("m16", 576, 38, 40, 16);
    view.defPosition("n16", 623, 38, 40, 16);
    view.defPosition("o16", 670, 38, 40, 16);
    view.defPosition("a15", 12, 55, 40, 16);
    view.defPosition("b15", 59, 55, 40, 16);
    view.defPosition("c15", 106, 55, 40, 16);
    view.defPosition("d15", 153, 55, 40, 16);
    view.defPosition("e15", 200, 55, 40, 16);
    view.defPosition("f15", 247, 55, 40, 16);
    view.defPosition("g15", 294, 55, 40, 16);
    view.defPosition("h15", 341, 55, 40, 16);
    view.defPosition("i15", 388, 55, 40, 16);
    view.defPosition("j15", 435, 55, 40, 16);
    view.defPosition("k15", 482, 55, 40, 16);
    view.defPosition("l15", 529, 55, 40, 16);
    view.defPosition("m15", 576, 55, 40, 16);
    view.defPosition("n15", 623, 55, 40, 16);
    view.defPosition("o15", 670, 55, 40, 16);
    view.defPosition("a14", 12, 72, 40, 16);
    view.defPosition("b14", 59, 72, 40, 16);
    view.defPosition("c14", 106, 72, 40, 16);
    view.defPosition("d14", 153, 72, 40, 16);
    view.defPosition("e14", 200, 72, 40, 16);
    view.defPosition("f14", 247, 72, 40, 16);
    view.defPosition("g14", 294, 72, 40, 16);
    view.defPosition("h14", 341, 72, 40, 16);
    view.defPosition("i14", 388, 72, 40, 16);
    view.defPosition("j14", 435, 72, 40, 16);
    view.defPosition("k14", 482, 72, 40, 16);
    view.defPosition("l14", 529, 72, 40, 16);
    view.defPosition("m14", 576, 72, 40, 16);
    view.defPosition("n14", 623, 72, 40, 16);
    view.defPosition("o14", 670, 72, 40, 16);
    view.defPosition("a13", 12, 89, 40, 16);
    view.defPosition("b13", 59, 89, 40, 16);
    view.defPosition("c13", 106, 89, 40, 16);
    view.defPosition("d13", 153, 89, 40, 16);
    view.defPosition("e13", 200, 89, 40, 16);
    view.defPosition("f13", 247, 89, 40, 16);
    view.defPosition("g13", 294, 89, 40, 16);
    view.defPosition("h13", 341, 89, 40, 16);
    view.defPosition("i13", 388, 89, 40, 16);
    view.defPosition("j13", 435, 89, 40, 16);
    view.defPosition("k13", 482, 89, 40, 16);
    view.defPosition("l13", 529, 89, 40, 16);
    view.defPosition("m13", 576, 89, 40, 16);
    view.defPosition("n13", 623, 89, 40, 16);
    view.defPosition("o13", 670, 89, 40, 16);
    view.defPosition("a12", 12, 107, 40, 16);
    view.defPosition("b12", 59, 107, 40, 16);
    view.defPosition("c12", 106, 107, 40, 16);
    view.defPosition("d12", 153, 107, 40, 16);
    view.defPosition("e12", 200, 107, 40, 16);
    view.defPosition("f12", 247, 107, 40, 16);
    view.defPosition("g12", 294, 107, 40, 16);
    view.defPosition("h12", 341, 107, 40, 16);
    view.defPosition("i12", 388, 107, 40, 16);
    view.defPosition("j12", 435, 107, 40, 16);
    view.defPosition("k12", 482, 107, 40, 16);
    view.defPosition("l12", 529, 107, 40, 16);
    view.defPosition("m12", 576, 107, 40, 16);
    view.defPosition("n12", 623, 107, 40, 16);
    view.defPosition("o12", 670, 107, 40, 16);
    view.defPosition("a11", 12, 124, 40, 16);
    view.defPosition("b11", 59, 124, 40, 16);
    view.defPosition("c11", 106, 124, 40, 16);
    view.defPosition("d11", 153, 124, 40, 16);
    view.defPosition("e11", 200, 124, 40, 16);
    view.defPosition("f11", 247, 124, 40, 16);
    view.defPosition("g11", 294, 124, 40, 16);
    view.defPosition("h11", 341, 124, 40, 16);
    view.defPosition("i11", 388, 124, 40, 16);
    view.defPosition("j11", 435, 124, 40, 16);
    view.defPosition("k11", 482, 124, 40, 16);
    view.defPosition("l11", 529, 124, 40, 16);
    view.defPosition("m11", 576, 124, 40, 16);
    view.defPosition("n11", 623, 124, 40, 16);
    view.defPosition("o11", 670, 124, 40, 16);
    view.defPosition("a10", 12, 141, 40, 16);
    view.defPosition("b10", 59, 141, 40, 16);
    view.defPosition("c10", 106, 141, 40, 16);
    view.defPosition("d10", 153, 141, 40, 16);
    view.defPosition("e10", 200, 141, 40, 16);
    view.defPosition("f10", 247, 141, 40, 16);
    view.defPosition("g10", 294, 141, 40, 16);
    view.defPosition("h10", 341, 141, 40, 16);
    view.defPosition("i10", 388, 141, 40, 16);
    view.defPosition("j10", 435, 141, 40, 16);
    view.defPosition("k10", 482, 141, 40, 16);
    view.defPosition("l10", 529, 141, 40, 16);
    view.defPosition("m10", 576, 141, 40, 16);
    view.defPosition("n10", 623, 141, 40, 16);
    view.defPosition("o10", 670, 141, 40, 16);
    view.defPosition("a9", 12, 158, 40, 16);
    view.defPosition("b9", 59, 158, 40, 16);
    view.defPosition("c9", 106, 158, 40, 16);
    view.defPosition("d9", 153, 158, 40, 16);
    view.defPosition("e9", 200, 158, 40, 16);
    view.defPosition("f9", 247, 158, 40, 16);
    view.defPosition("g9", 294, 158, 40, 16);
    view.defPosition("h9", 341, 158, 40, 16);
    view.defPosition("i9", 388, 158, 40, 16);
    view.defPosition("j9", 435, 158, 40, 16);
    view.defPosition("k9", 482, 158, 40, 16);
    view.defPosition("l9", 529, 158, 40, 16);
    view.defPosition("m9", 576, 158, 40, 16);
    view.defPosition("n9", 623, 158, 40, 16);
    view.defPosition("o9", 670, 158, 40, 16);
    view.defPosition("a8", 12, 175, 40, 16);
    view.defPosition("b8", 59, 175, 40, 16);
    view.defPosition("c8", 106, 175, 40, 16);
    view.defPosition("d8", 153, 175, 40, 16);
    view.defPosition("e8", 200, 175, 40, 16);
    view.defPosition("f8", 247, 175, 40, 16);
    view.defPosition("g8", 294, 175, 40, 16);
    view.defPosition("h8", 341, 175, 40, 16);
    view.defPosition("i8", 388, 175, 40, 16);
    view.defPosition("j8", 435, 175, 40, 16);
    view.defPosition("k8", 482, 175, 40, 16);
    view.defPosition("l8", 529, 175, 40, 16);
    view.defPosition("m8", 576, 175, 40, 16);
    view.defPosition("n8", 623, 175, 40, 16);
    view.defPosition("o8", 670, 175, 40, 16);
    view.defPosition("a7", 12, 192, 40, 16);
    view.defPosition("b7", 59, 192, 40, 16);
    view.defPosition("c7", 106, 192, 40, 16);
    view.defPosition("d7", 153, 192, 40, 16);
    view.defPosition("e7", 200, 192, 40, 16);
    view.defPosition("f7", 247, 192, 40, 16);
    view.defPosition("g7", 294, 192, 40, 16);
    view.defPosition("h7", 341, 192, 40, 16);
    view.defPosition("i7", 388, 192, 40, 16);
    view.defPosition("j7", 435, 192, 40, 16);
    view.defPosition("k7", 482, 192, 40, 16);
    view.defPosition("l7", 529, 192, 40, 16);
    view.defPosition("m7", 576, 192, 40, 16);
    view.defPosition("n7", 623, 192, 40, 16);
    view.defPosition("o7", 670, 192, 40, 16);
    view.defPosition("a6", 12, 209, 40, 16);
    view.defPosition("b6", 59, 209, 40, 16);
    view.defPosition("c6", 106, 209, 40, 16);
    view.defPosition("d6", 153, 209, 40, 16);
    view.defPosition("e6", 200, 209, 40, 16);
    view.defPosition("f6", 247, 209, 40, 16);
    view.defPosition("g6", 294, 209, 40, 16);
    view.defPosition("h6", 341, 209, 40, 16);
    view.defPosition("i6", 388, 209, 40, 16);
    view.defPosition("j6", 435, 209, 40, 16);
    view.defPosition("k6", 482, 209, 40, 16);
    view.defPosition("l6", 529, 209, 40, 16);
    view.defPosition("m6", 576, 209, 40, 16);
    view.defPosition("n6", 623, 209, 40, 16);
    view.defPosition("o6", 670, 209, 40, 16);
    view.defPosition("a5", 12, 227, 40, 16);
    view.defPosition("b5", 59, 227, 40, 16);
    view.defPosition("c5", 106, 227, 40, 16);
    view.defPosition("d5", 153, 227, 40, 16);
    view.defPosition("e5", 200, 227, 40, 16);
    view.defPosition("f5", 247, 227, 40, 16);
    view.defPosition("g5", 294, 227, 40, 16);
    view.defPosition("h5", 341, 227, 40, 16);
    view.defPosition("i5", 388, 227, 40, 16);
    view.defPosition("j5", 435, 227, 40, 16);
    view.defPosition("k5", 482, 227, 40, 16);
    view.defPosition("l5", 529, 227, 40, 16);
    view.defPosition("m5", 576, 227, 40, 16);
    view.defPosition("n5", 623, 227, 40, 16);
    view.defPosition("o5", 670, 227, 40, 16);
    view.defPosition("a4", 12, 244, 40, 16);
    view.defPosition("b4", 59, 244, 40, 16);
    view.defPosition("c4", 106, 244, 40, 16);
    view.defPosition("d4", 153, 244, 40, 16);
    view.defPosition("e4", 200, 244, 40, 16);
    view.defPosition("f4", 247, 244, 40, 16);
    view.defPosition("g4", 294, 244, 40, 16);
    view.defPosition("h4", 341, 244, 40, 16);
    view.defPosition("i4", 388, 244, 40, 16);
    view.defPosition("j4", 435, 244, 40, 16);
    view.defPosition("k4", 482, 244, 40, 16);
    view.defPosition("l4", 529, 244, 40, 16);
    view.defPosition("m4", 576, 244, 40, 16);
    view.defPosition("n4", 623, 244, 40, 16);
    view.defPosition("o4", 670, 244, 40, 16);
    view.defPosition("a3", 12, 261, 40, 16);
    view.defPosition("b3", 59, 261, 40, 16);
    view.defPosition("c3", 106, 261, 40, 16);
    view.defPosition("d3", 153, 261, 40, 16);
    view.defPosition("e3", 200, 261, 40, 16);
    view.defPosition("f3", 247, 261, 40, 16);
    view.defPosition("g3", 294, 261, 40, 16);
    view.defPosition("h3", 341, 261, 40, 16);
    view.defPosition("i3", 388, 261, 40, 16);
    view.defPosition("j3", 435, 261, 40, 16);
    view.defPosition("k3", 482, 261, 40, 16);
    view.defPosition("l3", 529, 261, 40, 16);
    view.defPosition("m3", 576, 261, 40, 16);
    view.defPosition("n3", 623, 261, 40, 16);
    view.defPosition("o3", 670, 261, 40, 16);
    view.defPosition("a2", 12, 278, 40, 16);
    view.defPosition("b2", 59, 278, 40, 16);
    view.defPosition("c2", 106, 278, 40, 16);
    view.defPosition("d2", 153, 278, 40, 16);
    view.defPosition("e2", 200, 278, 40, 16);
    view.defPosition("f2", 247, 278, 40, 16);
    view.defPosition("g2", 294, 278, 40, 16);
    view.defPosition("h2", 341, 278, 40, 16);
    view.defPosition("i2", 388, 278, 40, 16);
    view.defPosition("j2", 435, 278, 40, 16);
    view.defPosition("k2", 482, 278, 40, 16);
    view.defPosition("l2", 529, 278, 40, 16);
    view.defPosition("m2", 576, 278, 40, 16);
    view.defPosition("n2", 623, 278, 40, 16);
    view.defPosition("o2", 670, 278, 40, 16);
    view.defPosition("a1", 12, 295, 40, 16);
    view.defPosition("b1", 59, 295, 40, 16);
    view.defPosition("c1", 106, 295, 40, 16);
    view.defPosition("d1", 153, 295, 40, 16);
    view.defPosition("e1", 200, 295, 40, 16);
    view.defPosition("f1", 247, 295, 40, 16);
    view.defPosition("g1", 294, 295, 40, 16);
    view.defPosition("h1", 341, 295, 40, 16);
    view.defPosition("i1", 388, 295, 40, 16);
    view.defPosition("j1", 435, 295, 40, 16);
    view.defPosition("k1", 482, 295, 40, 16);
    view.defPosition("l1", 529, 295, 40, 16);
    view.defPosition("m1", 576, 295, 40, 16);
    view.defPosition("n1", 623, 295, 40, 16);
    view.defPosition("o1", 670, 295, 40, 16);
}
