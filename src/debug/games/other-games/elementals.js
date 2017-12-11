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
    design.checkVersion("show-blink", "false");
    design.checkVersion("pass-partial", "true");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("ne");
    design.addDirection("n");
    design.addDirection("se");
    design.addDirection("sw");
    design.addDirection("nw");

    design.addPlayer("Light", [1, 0, 4, 6, 2, 7, 3, 5]);
    design.addPlayer("Dark", [0, 1, 2, 3, 4, 5, 6, 7]);

    design.addPosition("a10", [0, 1, 10, 0, 0, 11, 0, 0]);
    design.addPosition("b10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("c10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("d10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("e10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("f10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("g10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("h10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("i10", [-1, 1, 10, 0, 0, 11, 9, 0]);
    design.addPosition("j10", [-1, 0, 10, 0, 0, 0, 9, 0]);
    design.addPosition("a9", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i9", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j9", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a8", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i8", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j8", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a7", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i7", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j7", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a6", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i6", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j6", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a5", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i5", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j5", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a4", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i4", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j4", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a3", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i3", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j3", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a2", [0, 1, 10, -9, -10, 11, 0, 0]);
    design.addPosition("b2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("c2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("d2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("e2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("f2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("g2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("h2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("i2", [-1, 1, 10, -9, -10, 11, 9, -11]);
    design.addPosition("j2", [-1, 0, 10, 0, -10, 0, 9, -11]);
    design.addPosition("a1", [0, 1, 0, -9, -10, 0, 0, 0]);
    design.addPosition("b1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("c1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("d1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("e1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("f1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("g1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("h1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("i1", [-1, 1, 0, -9, -10, 0, 0, -11]);
    design.addPosition("j1", [-1, 0, 0, 0, -10, 0, 0, -11]);

    design.addZone("center", 2, [54, 44, 55, 45]);
    design.addZone("center", 1, [54, 44, 55, 45]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.IF,	6);
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.JUMP,	-6);
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PROMOTE,	1);	// GB
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.PROMOTE,	3);	// GD
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.PROMOTE,	2);	// GC
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(5, ZRF.FUNCTION,	0);	// not
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.PROMOTE,	0);	// GA
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.PARAM,	0);	// $1
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(6, ZRF.IF,	7);
    design.addCommand(6, ZRF.FORK,	3);
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end
    design.addCommand(6, ZRF.PARAM,	1);	// $2
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.JUMP,	-7);
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addCommand(7, ZRF.FUNCTION,	24);	// from
    design.addCommand(7, ZRF.PARAM,	0);	// $1
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.PROMOTE,	5);	// BYB
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.FUNCTION,	28);	// end

    design.addCommand(8, ZRF.FUNCTION,	24);	// from
    design.addCommand(8, ZRF.PARAM,	0);	// $1
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.PROMOTE,	11);	// YBD
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.FUNCTION,	28);	// end

    design.addCommand(9, ZRF.FUNCTION,	24);	// from
    design.addCommand(9, ZRF.PARAM,	0);	// $1
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(9, ZRF.IF,	15);
    design.addCommand(9, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(9, ZRF.FUNCTION,	0);	// not
    design.addCommand(9, ZRF.IF,	6);
    design.addCommand(9, ZRF.FORK,	4);
    design.addCommand(9, ZRF.MODE,	1);	// continue-type
    design.addCommand(9, ZRF.FUNCTION,	25);	// to
    design.addCommand(9, ZRF.FUNCTION,	28);	// end
    design.addCommand(9, ZRF.JUMP,	4);
    design.addCommand(9, ZRF.FORK,	3);
    design.addCommand(9, ZRF.FUNCTION,	25);	// to
    design.addCommand(9, ZRF.FUNCTION,	28);	// end
    design.addCommand(9, ZRF.PARAM,	1);	// $2
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.JUMP,	-15);
    design.addCommand(9, ZRF.FUNCTION,	28);	// end

    design.addCommand(10, ZRF.FUNCTION,	24);	// from
    design.addCommand(10, ZRF.PARAM,	0);	// $1
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(10, ZRF.IF,	8);
    design.addCommand(10, ZRF.FORK,	4);
    design.addCommand(10, ZRF.PROMOTE,	5);	// BYB
    design.addCommand(10, ZRF.FUNCTION,	25);	// to
    design.addCommand(10, ZRF.FUNCTION,	28);	// end
    design.addCommand(10, ZRF.PARAM,	1);	// $2
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.JUMP,	-8);
    design.addCommand(10, ZRF.FUNCTION,	28);	// end

    design.addCommand(11, ZRF.FUNCTION,	24);	// from
    design.addCommand(11, ZRF.PARAM,	0);	// $1
    design.addCommand(11, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(11, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(11, ZRF.IF,	8);
    design.addCommand(11, ZRF.FORK,	4);
    design.addCommand(11, ZRF.PROMOTE,	11);	// YBD
    design.addCommand(11, ZRF.FUNCTION,	25);	// to
    design.addCommand(11, ZRF.FUNCTION,	28);	// end
    design.addCommand(11, ZRF.PARAM,	1);	// $2
    design.addCommand(11, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(11, ZRF.JUMP,	-8);
    design.addCommand(11, ZRF.FUNCTION,	28);	// end

    design.addCommand(12, ZRF.FUNCTION,	24);	// from
    design.addCommand(12, ZRF.PARAM,	0);	// $1
    design.addCommand(12, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(12, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(12, ZRF.FUNCTION,	0);	// not
    design.addCommand(12, ZRF.FUNCTION,	20);	// verify
    design.addCommand(12, ZRF.PROMOTE,	6);	// BYC
    design.addCommand(12, ZRF.FUNCTION,	25);	// to
    design.addCommand(12, ZRF.FUNCTION,	28);	// end

    design.addCommand(13, ZRF.FUNCTION,	24);	// from
    design.addCommand(13, ZRF.PARAM,	0);	// $1
    design.addCommand(13, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(13, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(13, ZRF.FUNCTION,	0);	// not
    design.addCommand(13, ZRF.FUNCTION,	20);	// verify
    design.addCommand(13, ZRF.PROMOTE,	4);	// BYA
    design.addCommand(13, ZRF.FUNCTION,	25);	// to
    design.addCommand(13, ZRF.FUNCTION,	28);	// end

    design.addCommand(14, ZRF.FUNCTION,	24);	// from
    design.addCommand(14, ZRF.PARAM,	0);	// $1
    design.addCommand(14, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(14, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(14, ZRF.IF,	8);
    design.addCommand(14, ZRF.FORK,	4);
    design.addCommand(14, ZRF.PROMOTE,	6);	// BYC
    design.addCommand(14, ZRF.FUNCTION,	25);	// to
    design.addCommand(14, ZRF.FUNCTION,	28);	// end
    design.addCommand(14, ZRF.PARAM,	1);	// $2
    design.addCommand(14, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(14, ZRF.JUMP,	-8);
    design.addCommand(14, ZRF.FUNCTION,	28);	// end

    design.addCommand(15, ZRF.FUNCTION,	24);	// from
    design.addCommand(15, ZRF.PARAM,	0);	// $1
    design.addCommand(15, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(15, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(15, ZRF.IF,	8);
    design.addCommand(15, ZRF.FORK,	4);
    design.addCommand(15, ZRF.PROMOTE,	4);	// BYA
    design.addCommand(15, ZRF.FUNCTION,	25);	// to
    design.addCommand(15, ZRF.FUNCTION,	28);	// end
    design.addCommand(15, ZRF.PARAM,	1);	// $2
    design.addCommand(15, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(15, ZRF.JUMP,	-8);
    design.addCommand(15, ZRF.FUNCTION,	28);	// end

    design.addCommand(16, ZRF.FUNCTION,	24);	// from
    design.addCommand(16, ZRF.PARAM,	0);	// $1
    design.addCommand(16, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(16, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(16, ZRF.FUNCTION,	0);	// not
    design.addCommand(16, ZRF.FUNCTION,	20);	// verify
    design.addCommand(16, ZRF.PROMOTE,	7);	// BYD
    design.addCommand(16, ZRF.FUNCTION,	25);	// to
    design.addCommand(16, ZRF.FUNCTION,	28);	// end

    design.addCommand(17, ZRF.FUNCTION,	24);	// from
    design.addCommand(17, ZRF.PARAM,	0);	// $1
    design.addCommand(17, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(17, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(17, ZRF.IF,	8);
    design.addCommand(17, ZRF.FORK,	4);
    design.addCommand(17, ZRF.PROMOTE,	7);	// BYD
    design.addCommand(17, ZRF.FUNCTION,	25);	// to
    design.addCommand(17, ZRF.FUNCTION,	28);	// end
    design.addCommand(17, ZRF.PARAM,	1);	// $2
    design.addCommand(17, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(17, ZRF.JUMP,	-8);
    design.addCommand(17, ZRF.FUNCTION,	28);	// end

    design.addCommand(18, ZRF.FUNCTION,	24);	// from
    design.addCommand(18, ZRF.PARAM,	0);	// $1
    design.addCommand(18, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(18, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(18, ZRF.FUNCTION,	0);	// not
    design.addCommand(18, ZRF.FUNCTION,	20);	// verify
    design.addCommand(18, ZRF.PROMOTE,	8);	// YBA
    design.addCommand(18, ZRF.FUNCTION,	25);	// to
    design.addCommand(18, ZRF.FUNCTION,	28);	// end

    design.addCommand(19, ZRF.FUNCTION,	24);	// from
    design.addCommand(19, ZRF.PARAM,	0);	// $1
    design.addCommand(19, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(19, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(19, ZRF.IF,	8);
    design.addCommand(19, ZRF.FORK,	4);
    design.addCommand(19, ZRF.PROMOTE,	8);	// YBA
    design.addCommand(19, ZRF.FUNCTION,	25);	// to
    design.addCommand(19, ZRF.FUNCTION,	28);	// end
    design.addCommand(19, ZRF.PARAM,	1);	// $2
    design.addCommand(19, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(19, ZRF.JUMP,	-8);
    design.addCommand(19, ZRF.FUNCTION,	28);	// end

    design.addCommand(20, ZRF.FUNCTION,	24);	// from
    design.addCommand(20, ZRF.PARAM,	0);	// $1
    design.addCommand(20, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(20, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(20, ZRF.FUNCTION,	0);	// not
    design.addCommand(20, ZRF.FUNCTION,	20);	// verify
    design.addCommand(20, ZRF.PROMOTE,	9);	// YBB
    design.addCommand(20, ZRF.FUNCTION,	25);	// to
    design.addCommand(20, ZRF.FUNCTION,	28);	// end

    design.addCommand(21, ZRF.FUNCTION,	24);	// from
    design.addCommand(21, ZRF.PARAM,	0);	// $1
    design.addCommand(21, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(21, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(21, ZRF.IF,	8);
    design.addCommand(21, ZRF.FORK,	4);
    design.addCommand(21, ZRF.PROMOTE,	9);	// YBB
    design.addCommand(21, ZRF.FUNCTION,	25);	// to
    design.addCommand(21, ZRF.FUNCTION,	28);	// end
    design.addCommand(21, ZRF.PARAM,	1);	// $2
    design.addCommand(21, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(21, ZRF.JUMP,	-8);
    design.addCommand(21, ZRF.FUNCTION,	28);	// end

    design.addCommand(22, ZRF.FUNCTION,	24);	// from
    design.addCommand(22, ZRF.PARAM,	0);	// $1
    design.addCommand(22, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(22, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(22, ZRF.FUNCTION,	0);	// not
    design.addCommand(22, ZRF.FUNCTION,	20);	// verify
    design.addCommand(22, ZRF.PROMOTE,	10);	// YBC
    design.addCommand(22, ZRF.FUNCTION,	25);	// to
    design.addCommand(22, ZRF.FUNCTION,	28);	// end

    design.addCommand(23, ZRF.FUNCTION,	24);	// from
    design.addCommand(23, ZRF.PARAM,	0);	// $1
    design.addCommand(23, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(23, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(23, ZRF.IF,	8);
    design.addCommand(23, ZRF.FORK,	4);
    design.addCommand(23, ZRF.PROMOTE,	10);	// YBC
    design.addCommand(23, ZRF.FUNCTION,	25);	// to
    design.addCommand(23, ZRF.FUNCTION,	28);	// end
    design.addCommand(23, ZRF.PARAM,	1);	// $2
    design.addCommand(23, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(23, ZRF.JUMP,	-8);
    design.addCommand(23, ZRF.FUNCTION,	28);	// end

    design.addCommand(24, ZRF.FUNCTION,	24);	// from
    design.addCommand(24, ZRF.PARAM,	0);	// $1
    design.addCommand(24, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(24, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(24, ZRF.FUNCTION,	0);	// not
    design.addCommand(24, ZRF.FUNCTION,	20);	// verify
    design.addCommand(24, ZRF.PROMOTE,	13);	// GBB
    design.addCommand(24, ZRF.FUNCTION,	25);	// to
    design.addCommand(24, ZRF.FUNCTION,	28);	// end

    design.addCommand(25, ZRF.FUNCTION,	24);	// from
    design.addCommand(25, ZRF.PARAM,	0);	// $1
    design.addCommand(25, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(25, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(25, ZRF.FUNCTION,	0);	// not
    design.addCommand(25, ZRF.FUNCTION,	20);	// verify
    design.addCommand(25, ZRF.PROMOTE,	19);	// BGD
    design.addCommand(25, ZRF.FUNCTION,	25);	// to
    design.addCommand(25, ZRF.FUNCTION,	28);	// end

    design.addCommand(26, ZRF.FUNCTION,	24);	// from
    design.addCommand(26, ZRF.PARAM,	0);	// $1
    design.addCommand(26, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(26, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(26, ZRF.FUNCTION,	0);	// not
    design.addCommand(26, ZRF.FUNCTION,	20);	// verify
    design.addCommand(26, ZRF.PROMOTE,	14);	// GBC
    design.addCommand(26, ZRF.FUNCTION,	25);	// to
    design.addCommand(26, ZRF.FUNCTION,	28);	// end

    design.addCommand(27, ZRF.FUNCTION,	24);	// from
    design.addCommand(27, ZRF.PARAM,	0);	// $1
    design.addCommand(27, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(27, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(27, ZRF.FUNCTION,	0);	// not
    design.addCommand(27, ZRF.FUNCTION,	20);	// verify
    design.addCommand(27, ZRF.PROMOTE,	12);	// GBA
    design.addCommand(27, ZRF.FUNCTION,	25);	// to
    design.addCommand(27, ZRF.FUNCTION,	28);	// end

    design.addCommand(28, ZRF.FUNCTION,	24);	// from
    design.addCommand(28, ZRF.PARAM,	0);	// $1
    design.addCommand(28, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(28, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(28, ZRF.FUNCTION,	0);	// not
    design.addCommand(28, ZRF.FUNCTION,	20);	// verify
    design.addCommand(28, ZRF.PROMOTE,	15);	// GBD
    design.addCommand(28, ZRF.FUNCTION,	25);	// to
    design.addCommand(28, ZRF.FUNCTION,	28);	// end

    design.addCommand(29, ZRF.FUNCTION,	24);	// from
    design.addCommand(29, ZRF.PARAM,	0);	// $1
    design.addCommand(29, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(29, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(29, ZRF.FUNCTION,	0);	// not
    design.addCommand(29, ZRF.FUNCTION,	20);	// verify
    design.addCommand(29, ZRF.PROMOTE,	16);	// BGA
    design.addCommand(29, ZRF.FUNCTION,	25);	// to
    design.addCommand(29, ZRF.FUNCTION,	28);	// end

    design.addCommand(30, ZRF.FUNCTION,	24);	// from
    design.addCommand(30, ZRF.PARAM,	0);	// $1
    design.addCommand(30, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(30, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(30, ZRF.FUNCTION,	0);	// not
    design.addCommand(30, ZRF.FUNCTION,	20);	// verify
    design.addCommand(30, ZRF.PROMOTE,	17);	// BGB
    design.addCommand(30, ZRF.FUNCTION,	25);	// to
    design.addCommand(30, ZRF.FUNCTION,	28);	// end

    design.addCommand(31, ZRF.FUNCTION,	24);	// from
    design.addCommand(31, ZRF.PARAM,	0);	// $1
    design.addCommand(31, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(31, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(31, ZRF.FUNCTION,	0);	// not
    design.addCommand(31, ZRF.FUNCTION,	20);	// verify
    design.addCommand(31, ZRF.PROMOTE,	18);	// BGC
    design.addCommand(31, ZRF.FUNCTION,	25);	// to
    design.addCommand(31, ZRF.FUNCTION,	28);	// end

    design.addCommand(32, ZRF.FUNCTION,	24);	// from
    design.addCommand(32, ZRF.PARAM,	0);	// $1
    design.addCommand(32, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(32, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(32, ZRF.FUNCTION,	0);	// not
    design.addCommand(32, ZRF.FUNCTION,	20);	// verify
    design.addCommand(32, ZRF.PROMOTE,	21);	// YGB
    design.addCommand(32, ZRF.FUNCTION,	25);	// to
    design.addCommand(32, ZRF.FUNCTION,	28);	// end

    design.addCommand(33, ZRF.FUNCTION,	24);	// from
    design.addCommand(33, ZRF.PARAM,	0);	// $1
    design.addCommand(33, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(33, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(33, ZRF.FUNCTION,	0);	// not
    design.addCommand(33, ZRF.FUNCTION,	20);	// verify
    design.addCommand(33, ZRF.PROMOTE,	27);	// GYD
    design.addCommand(33, ZRF.FUNCTION,	25);	// to
    design.addCommand(33, ZRF.FUNCTION,	28);	// end

    design.addCommand(34, ZRF.FUNCTION,	24);	// from
    design.addCommand(34, ZRF.PARAM,	0);	// $1
    design.addCommand(34, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(34, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(34, ZRF.IF,	8);
    design.addCommand(34, ZRF.FORK,	4);
    design.addCommand(34, ZRF.PROMOTE,	21);	// YGB
    design.addCommand(34, ZRF.FUNCTION,	25);	// to
    design.addCommand(34, ZRF.FUNCTION,	28);	// end
    design.addCommand(34, ZRF.PARAM,	1);	// $2
    design.addCommand(34, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(34, ZRF.JUMP,	-8);
    design.addCommand(34, ZRF.FUNCTION,	28);	// end

    design.addCommand(35, ZRF.FUNCTION,	24);	// from
    design.addCommand(35, ZRF.PARAM,	0);	// $1
    design.addCommand(35, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(35, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(35, ZRF.IF,	8);
    design.addCommand(35, ZRF.FORK,	4);
    design.addCommand(35, ZRF.PROMOTE,	27);	// GYD
    design.addCommand(35, ZRF.FUNCTION,	25);	// to
    design.addCommand(35, ZRF.FUNCTION,	28);	// end
    design.addCommand(35, ZRF.PARAM,	1);	// $2
    design.addCommand(35, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(35, ZRF.JUMP,	-8);
    design.addCommand(35, ZRF.FUNCTION,	28);	// end

    design.addCommand(36, ZRF.FUNCTION,	24);	// from
    design.addCommand(36, ZRF.PARAM,	0);	// $1
    design.addCommand(36, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(36, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(36, ZRF.FUNCTION,	0);	// not
    design.addCommand(36, ZRF.FUNCTION,	20);	// verify
    design.addCommand(36, ZRF.PROMOTE,	22);	// YGC
    design.addCommand(36, ZRF.FUNCTION,	25);	// to
    design.addCommand(36, ZRF.FUNCTION,	28);	// end

    design.addCommand(37, ZRF.FUNCTION,	24);	// from
    design.addCommand(37, ZRF.PARAM,	0);	// $1
    design.addCommand(37, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(37, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(37, ZRF.FUNCTION,	0);	// not
    design.addCommand(37, ZRF.FUNCTION,	20);	// verify
    design.addCommand(37, ZRF.PROMOTE,	20);	// YGA
    design.addCommand(37, ZRF.FUNCTION,	25);	// to
    design.addCommand(37, ZRF.FUNCTION,	28);	// end

    design.addCommand(38, ZRF.FUNCTION,	24);	// from
    design.addCommand(38, ZRF.PARAM,	0);	// $1
    design.addCommand(38, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(38, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(38, ZRF.IF,	8);
    design.addCommand(38, ZRF.FORK,	4);
    design.addCommand(38, ZRF.PROMOTE,	22);	// YGC
    design.addCommand(38, ZRF.FUNCTION,	25);	// to
    design.addCommand(38, ZRF.FUNCTION,	28);	// end
    design.addCommand(38, ZRF.PARAM,	1);	// $2
    design.addCommand(38, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(38, ZRF.JUMP,	-8);
    design.addCommand(38, ZRF.FUNCTION,	28);	// end

    design.addCommand(39, ZRF.FUNCTION,	24);	// from
    design.addCommand(39, ZRF.PARAM,	0);	// $1
    design.addCommand(39, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(39, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(39, ZRF.IF,	8);
    design.addCommand(39, ZRF.FORK,	4);
    design.addCommand(39, ZRF.PROMOTE,	20);	// YGA
    design.addCommand(39, ZRF.FUNCTION,	25);	// to
    design.addCommand(39, ZRF.FUNCTION,	28);	// end
    design.addCommand(39, ZRF.PARAM,	1);	// $2
    design.addCommand(39, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(39, ZRF.JUMP,	-8);
    design.addCommand(39, ZRF.FUNCTION,	28);	// end

    design.addCommand(40, ZRF.FUNCTION,	24);	// from
    design.addCommand(40, ZRF.PARAM,	0);	// $1
    design.addCommand(40, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(40, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(40, ZRF.FUNCTION,	0);	// not
    design.addCommand(40, ZRF.FUNCTION,	20);	// verify
    design.addCommand(40, ZRF.PROMOTE,	23);	// YGD
    design.addCommand(40, ZRF.FUNCTION,	25);	// to
    design.addCommand(40, ZRF.FUNCTION,	28);	// end

    design.addCommand(41, ZRF.FUNCTION,	24);	// from
    design.addCommand(41, ZRF.PARAM,	0);	// $1
    design.addCommand(41, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(41, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(41, ZRF.IF,	8);
    design.addCommand(41, ZRF.FORK,	4);
    design.addCommand(41, ZRF.PROMOTE,	23);	// YGD
    design.addCommand(41, ZRF.FUNCTION,	25);	// to
    design.addCommand(41, ZRF.FUNCTION,	28);	// end
    design.addCommand(41, ZRF.PARAM,	1);	// $2
    design.addCommand(41, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(41, ZRF.JUMP,	-8);
    design.addCommand(41, ZRF.FUNCTION,	28);	// end

    design.addCommand(42, ZRF.FUNCTION,	24);	// from
    design.addCommand(42, ZRF.PARAM,	0);	// $1
    design.addCommand(42, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(42, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(42, ZRF.FUNCTION,	0);	// not
    design.addCommand(42, ZRF.FUNCTION,	20);	// verify
    design.addCommand(42, ZRF.PROMOTE,	24);	// GYA
    design.addCommand(42, ZRF.FUNCTION,	25);	// to
    design.addCommand(42, ZRF.FUNCTION,	28);	// end

    design.addCommand(43, ZRF.FUNCTION,	24);	// from
    design.addCommand(43, ZRF.PARAM,	0);	// $1
    design.addCommand(43, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(43, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(43, ZRF.IF,	8);
    design.addCommand(43, ZRF.FORK,	4);
    design.addCommand(43, ZRF.PROMOTE,	24);	// GYA
    design.addCommand(43, ZRF.FUNCTION,	25);	// to
    design.addCommand(43, ZRF.FUNCTION,	28);	// end
    design.addCommand(43, ZRF.PARAM,	1);	// $2
    design.addCommand(43, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(43, ZRF.JUMP,	-8);
    design.addCommand(43, ZRF.FUNCTION,	28);	// end

    design.addCommand(44, ZRF.FUNCTION,	24);	// from
    design.addCommand(44, ZRF.PARAM,	0);	// $1
    design.addCommand(44, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(44, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(44, ZRF.FUNCTION,	0);	// not
    design.addCommand(44, ZRF.FUNCTION,	20);	// verify
    design.addCommand(44, ZRF.PROMOTE,	25);	// GYB
    design.addCommand(44, ZRF.FUNCTION,	25);	// to
    design.addCommand(44, ZRF.FUNCTION,	28);	// end

    design.addCommand(45, ZRF.FUNCTION,	24);	// from
    design.addCommand(45, ZRF.PARAM,	0);	// $1
    design.addCommand(45, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(45, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(45, ZRF.IF,	8);
    design.addCommand(45, ZRF.FORK,	4);
    design.addCommand(45, ZRF.PROMOTE,	25);	// GYB
    design.addCommand(45, ZRF.FUNCTION,	25);	// to
    design.addCommand(45, ZRF.FUNCTION,	28);	// end
    design.addCommand(45, ZRF.PARAM,	1);	// $2
    design.addCommand(45, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(45, ZRF.JUMP,	-8);
    design.addCommand(45, ZRF.FUNCTION,	28);	// end

    design.addCommand(46, ZRF.FUNCTION,	24);	// from
    design.addCommand(46, ZRF.PARAM,	0);	// $1
    design.addCommand(46, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(46, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(46, ZRF.FUNCTION,	0);	// not
    design.addCommand(46, ZRF.FUNCTION,	20);	// verify
    design.addCommand(46, ZRF.PROMOTE,	26);	// GYC
    design.addCommand(46, ZRF.FUNCTION,	25);	// to
    design.addCommand(46, ZRF.FUNCTION,	28);	// end

    design.addCommand(47, ZRF.FUNCTION,	24);	// from
    design.addCommand(47, ZRF.PARAM,	0);	// $1
    design.addCommand(47, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(47, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(47, ZRF.IF,	8);
    design.addCommand(47, ZRF.FORK,	4);
    design.addCommand(47, ZRF.PROMOTE,	26);	// GYC
    design.addCommand(47, ZRF.FUNCTION,	25);	// to
    design.addCommand(47, ZRF.FUNCTION,	28);	// end
    design.addCommand(47, ZRF.PARAM,	1);	// $2
    design.addCommand(47, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(47, ZRF.JUMP,	-8);
    design.addCommand(47, ZRF.FUNCTION,	28);	// end

    design.addCommand(48, ZRF.FUNCTION,	24);	// from
    design.addCommand(48, ZRF.PARAM,	0);	// $1
    design.addCommand(48, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(48, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(48, ZRF.FUNCTION,	0);	// not
    design.addCommand(48, ZRF.IF,	7);
    design.addCommand(48, ZRF.FORK,	3);
    design.addCommand(48, ZRF.FUNCTION,	25);	// to
    design.addCommand(48, ZRF.FUNCTION,	28);	// end
    design.addCommand(48, ZRF.PARAM,	1);	// $2
    design.addCommand(48, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(48, ZRF.JUMP,	-8);
    design.addCommand(48, ZRF.FUNCTION,	28);	// end

    design.addCommand(49, ZRF.FUNCTION,	24);	// from
    design.addCommand(49, ZRF.PARAM,	0);	// $1
    design.addCommand(49, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(49, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(49, ZRF.FUNCTION,	20);	// verify
    design.addCommand(49, ZRF.PROMOTE,	29);	// RB
    design.addCommand(49, ZRF.FUNCTION,	25);	// to
    design.addCommand(49, ZRF.FUNCTION,	28);	// end

    design.addCommand(50, ZRF.FUNCTION,	24);	// from
    design.addCommand(50, ZRF.PARAM,	0);	// $1
    design.addCommand(50, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(50, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(50, ZRF.FUNCTION,	20);	// verify
    design.addCommand(50, ZRF.PROMOTE,	31);	// RD
    design.addCommand(50, ZRF.FUNCTION,	25);	// to
    design.addCommand(50, ZRF.FUNCTION,	28);	// end

    design.addCommand(51, ZRF.FUNCTION,	24);	// from
    design.addCommand(51, ZRF.PARAM,	0);	// $1
    design.addCommand(51, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(51, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(51, ZRF.FUNCTION,	20);	// verify
    design.addCommand(51, ZRF.PROMOTE,	30);	// RC
    design.addCommand(51, ZRF.FUNCTION,	25);	// to
    design.addCommand(51, ZRF.FUNCTION,	28);	// end

    design.addCommand(52, ZRF.FUNCTION,	24);	// from
    design.addCommand(52, ZRF.PARAM,	0);	// $1
    design.addCommand(52, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(52, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(52, ZRF.FUNCTION,	20);	// verify
    design.addCommand(52, ZRF.PROMOTE,	28);	// RA
    design.addCommand(52, ZRF.FUNCTION,	25);	// to
    design.addCommand(52, ZRF.FUNCTION,	28);	// end

    design.addCommand(53, ZRF.FUNCTION,	24);	// from
    design.addCommand(53, ZRF.PARAM,	0);	// $1
    design.addCommand(53, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(53, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(53, ZRF.FUNCTION,	0);	// not
    design.addCommand(53, ZRF.FUNCTION,	20);	// verify
    design.addCommand(53, ZRF.PROMOTE,	33);	// GRB
    design.addCommand(53, ZRF.FUNCTION,	25);	// to
    design.addCommand(53, ZRF.FUNCTION,	28);	// end

    design.addCommand(54, ZRF.FUNCTION,	24);	// from
    design.addCommand(54, ZRF.PARAM,	0);	// $1
    design.addCommand(54, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(54, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(54, ZRF.FUNCTION,	0);	// not
    design.addCommand(54, ZRF.FUNCTION,	20);	// verify
    design.addCommand(54, ZRF.PROMOTE,	39);	// RGD
    design.addCommand(54, ZRF.FUNCTION,	25);	// to
    design.addCommand(54, ZRF.FUNCTION,	28);	// end

    design.addCommand(55, ZRF.FUNCTION,	24);	// from
    design.addCommand(55, ZRF.PARAM,	0);	// $1
    design.addCommand(55, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(55, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(55, ZRF.FUNCTION,	20);	// verify
    design.addCommand(55, ZRF.PROMOTE,	33);	// GRB
    design.addCommand(55, ZRF.FUNCTION,	25);	// to
    design.addCommand(55, ZRF.FUNCTION,	28);	// end

    design.addCommand(56, ZRF.FUNCTION,	24);	// from
    design.addCommand(56, ZRF.PARAM,	0);	// $1
    design.addCommand(56, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(56, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(56, ZRF.FUNCTION,	20);	// verify
    design.addCommand(56, ZRF.PROMOTE,	39);	// RGD
    design.addCommand(56, ZRF.FUNCTION,	25);	// to
    design.addCommand(56, ZRF.FUNCTION,	28);	// end

    design.addCommand(57, ZRF.FUNCTION,	24);	// from
    design.addCommand(57, ZRF.PARAM,	0);	// $1
    design.addCommand(57, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(57, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(57, ZRF.FUNCTION,	0);	// not
    design.addCommand(57, ZRF.FUNCTION,	20);	// verify
    design.addCommand(57, ZRF.PROMOTE,	34);	// GRC
    design.addCommand(57, ZRF.FUNCTION,	25);	// to
    design.addCommand(57, ZRF.FUNCTION,	28);	// end

    design.addCommand(58, ZRF.FUNCTION,	24);	// from
    design.addCommand(58, ZRF.PARAM,	0);	// $1
    design.addCommand(58, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(58, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(58, ZRF.FUNCTION,	0);	// not
    design.addCommand(58, ZRF.FUNCTION,	20);	// verify
    design.addCommand(58, ZRF.PROMOTE,	32);	// GRA
    design.addCommand(58, ZRF.FUNCTION,	25);	// to
    design.addCommand(58, ZRF.FUNCTION,	28);	// end

    design.addCommand(59, ZRF.FUNCTION,	24);	// from
    design.addCommand(59, ZRF.PARAM,	0);	// $1
    design.addCommand(59, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(59, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(59, ZRF.FUNCTION,	20);	// verify
    design.addCommand(59, ZRF.PROMOTE,	34);	// GRC
    design.addCommand(59, ZRF.FUNCTION,	25);	// to
    design.addCommand(59, ZRF.FUNCTION,	28);	// end

    design.addCommand(60, ZRF.FUNCTION,	24);	// from
    design.addCommand(60, ZRF.PARAM,	0);	// $1
    design.addCommand(60, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(60, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(60, ZRF.FUNCTION,	20);	// verify
    design.addCommand(60, ZRF.PROMOTE,	32);	// GRA
    design.addCommand(60, ZRF.FUNCTION,	25);	// to
    design.addCommand(60, ZRF.FUNCTION,	28);	// end

    design.addCommand(61, ZRF.FUNCTION,	24);	// from
    design.addCommand(61, ZRF.PARAM,	0);	// $1
    design.addCommand(61, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(61, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(61, ZRF.FUNCTION,	0);	// not
    design.addCommand(61, ZRF.FUNCTION,	20);	// verify
    design.addCommand(61, ZRF.PROMOTE,	35);	// GRD
    design.addCommand(61, ZRF.FUNCTION,	25);	// to
    design.addCommand(61, ZRF.FUNCTION,	28);	// end

    design.addCommand(62, ZRF.FUNCTION,	24);	// from
    design.addCommand(62, ZRF.PARAM,	0);	// $1
    design.addCommand(62, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(62, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(62, ZRF.FUNCTION,	20);	// verify
    design.addCommand(62, ZRF.PROMOTE,	35);	// GRD
    design.addCommand(62, ZRF.FUNCTION,	25);	// to
    design.addCommand(62, ZRF.FUNCTION,	28);	// end

    design.addCommand(63, ZRF.FUNCTION,	24);	// from
    design.addCommand(63, ZRF.PARAM,	0);	// $1
    design.addCommand(63, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(63, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(63, ZRF.FUNCTION,	0);	// not
    design.addCommand(63, ZRF.FUNCTION,	20);	// verify
    design.addCommand(63, ZRF.PROMOTE,	36);	// RGA
    design.addCommand(63, ZRF.FUNCTION,	25);	// to
    design.addCommand(63, ZRF.FUNCTION,	28);	// end

    design.addCommand(64, ZRF.FUNCTION,	24);	// from
    design.addCommand(64, ZRF.PARAM,	0);	// $1
    design.addCommand(64, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(64, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(64, ZRF.FUNCTION,	20);	// verify
    design.addCommand(64, ZRF.PROMOTE,	36);	// RGA
    design.addCommand(64, ZRF.FUNCTION,	25);	// to
    design.addCommand(64, ZRF.FUNCTION,	28);	// end

    design.addCommand(65, ZRF.FUNCTION,	24);	// from
    design.addCommand(65, ZRF.PARAM,	0);	// $1
    design.addCommand(65, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(65, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(65, ZRF.FUNCTION,	0);	// not
    design.addCommand(65, ZRF.FUNCTION,	20);	// verify
    design.addCommand(65, ZRF.PROMOTE,	37);	// RGB
    design.addCommand(65, ZRF.FUNCTION,	25);	// to
    design.addCommand(65, ZRF.FUNCTION,	28);	// end

    design.addCommand(66, ZRF.FUNCTION,	24);	// from
    design.addCommand(66, ZRF.PARAM,	0);	// $1
    design.addCommand(66, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(66, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(66, ZRF.FUNCTION,	20);	// verify
    design.addCommand(66, ZRF.PROMOTE,	37);	// RGB
    design.addCommand(66, ZRF.FUNCTION,	25);	// to
    design.addCommand(66, ZRF.FUNCTION,	28);	// end

    design.addCommand(67, ZRF.FUNCTION,	24);	// from
    design.addCommand(67, ZRF.PARAM,	0);	// $1
    design.addCommand(67, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(67, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(67, ZRF.FUNCTION,	0);	// not
    design.addCommand(67, ZRF.FUNCTION,	20);	// verify
    design.addCommand(67, ZRF.PROMOTE,	38);	// RGC
    design.addCommand(67, ZRF.FUNCTION,	25);	// to
    design.addCommand(67, ZRF.FUNCTION,	28);	// end

    design.addCommand(68, ZRF.FUNCTION,	24);	// from
    design.addCommand(68, ZRF.PARAM,	0);	// $1
    design.addCommand(68, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(68, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(68, ZRF.FUNCTION,	20);	// verify
    design.addCommand(68, ZRF.PROMOTE,	38);	// RGC
    design.addCommand(68, ZRF.FUNCTION,	25);	// to
    design.addCommand(68, ZRF.FUNCTION,	28);	// end

    design.addPiece("GA", 0);
    design.addMove(0, 0, [4], 0);
    design.addMove(0, 1, [4, 4], 0);
    design.addMove(0, 0, [2], 0);
    design.addMove(0, 1, [2, 2], 0);
    design.addMove(0, 2, [7], 0);
    design.addMove(0, 3, [3], 0);
    design.addMove(0, 2, [5], 0);
    design.addMove(0, 3, [6], 0);

    design.addPiece("GB", 1);
    design.addMove(1, 0, [7], 0);
    design.addMove(1, 1, [7, 7], 0);
    design.addMove(1, 0, [5], 0);
    design.addMove(1, 1, [5, 5], 0);
    design.addMove(1, 4, [0], 0);
    design.addMove(1, 5, [4], 0);
    design.addMove(1, 4, [1], 0);
    design.addMove(1, 5, [2], 0);

    design.addPiece("GC", 2);
    design.addMove(2, 0, [0], 0);
    design.addMove(2, 1, [0, 0], 0);
    design.addMove(2, 0, [1], 0);
    design.addMove(2, 1, [1, 1], 0);
    design.addMove(2, 3, [6], 0);
    design.addMove(2, 2, [7], 0);
    design.addMove(2, 3, [3], 0);
    design.addMove(2, 2, [5], 0);

    design.addPiece("GD", 3);
    design.addMove(3, 0, [6], 0);
    design.addMove(3, 1, [6, 6], 0);
    design.addMove(3, 0, [3], 0);
    design.addMove(3, 1, [3, 3], 0);
    design.addMove(3, 5, [2], 0);
    design.addMove(3, 4, [0], 0);
    design.addMove(3, 5, [4], 0);
    design.addMove(3, 4, [1], 0);

    design.addPiece("BYA", 4);
    design.addMove(4, 6, [4, 4], 0);
    design.addMove(4, 7, [7], 0);
    design.addMove(4, 8, [3], 0);
    design.addMove(4, 9, [2, 2], 0);
    design.addMove(4, 10, [5, 5], 1);
    design.addMove(4, 11, [6, 6], 1);

    design.addPiece("BYB", 5);
    design.addMove(5, 6, [7, 7], 0);
    design.addMove(5, 12, [0], 0);
    design.addMove(5, 13, [4], 0);
    design.addMove(5, 9, [5, 5], 0);
    design.addMove(5, 14, [1, 1], 1);
    design.addMove(5, 15, [2, 2], 1);

    design.addPiece("BYC", 6);
    design.addMove(6, 6, [0, 0], 0);
    design.addMove(6, 16, [6], 0);
    design.addMove(6, 7, [7], 0);
    design.addMove(6, 9, [1, 1], 0);
    design.addMove(6, 17, [3, 3], 1);
    design.addMove(6, 10, [5, 5], 1);

    design.addPiece("BYD", 7);
    design.addMove(7, 6, [6, 6], 0);
    design.addMove(7, 18, [2], 0);
    design.addMove(7, 12, [0], 0);
    design.addMove(7, 9, [3, 3], 0);
    design.addMove(7, 19, [4, 4], 1);
    design.addMove(7, 14, [1, 1], 1);

    design.addPiece("YBA", 8);
    design.addMove(8, 6, [2, 2], 0);
    design.addMove(8, 20, [5], 0);
    design.addMove(8, 16, [6], 0);
    design.addMove(8, 9, [4, 4], 0);
    design.addMove(8, 21, [7, 7], 1);
    design.addMove(8, 17, [3, 3], 1);

    design.addPiece("YBB", 9);
    design.addMove(9, 6, [5, 5], 0);
    design.addMove(9, 22, [1], 0);
    design.addMove(9, 18, [2], 0);
    design.addMove(9, 9, [7, 7], 0);
    design.addMove(9, 23, [0, 0], 1);
    design.addMove(9, 19, [4, 4], 1);

    design.addPiece("YBC", 10);
    design.addMove(10, 6, [1, 1], 0);
    design.addMove(10, 8, [3], 0);
    design.addMove(10, 20, [5], 0);
    design.addMove(10, 9, [0, 0], 0);
    design.addMove(10, 11, [6, 6], 1);
    design.addMove(10, 21, [7, 7], 1);

    design.addPiece("YBD", 11);
    design.addMove(11, 6, [3, 3], 0);
    design.addMove(11, 13, [4], 0);
    design.addMove(11, 22, [1], 0);
    design.addMove(11, 9, [6, 6], 0);
    design.addMove(11, 15, [2, 2], 1);
    design.addMove(11, 23, [0, 0], 1);

    design.addPiece("GBA", 12);
    design.addMove(12, 0, [4], 0);
    design.addMove(12, 1, [4, 4], 0);
    design.addMove(12, 24, [7], 0);
    design.addMove(12, 25, [3], 0);
    design.addMove(12, 6, [2, 2], 0);
    design.addMove(12, 24, [5], 0);
    design.addMove(12, 25, [6], 0);

    design.addPiece("GBB", 13);
    design.addMove(13, 0, [7], 0);
    design.addMove(13, 1, [7, 7], 0);
    design.addMove(13, 26, [0], 0);
    design.addMove(13, 27, [4], 0);
    design.addMove(13, 6, [5, 5], 0);
    design.addMove(13, 26, [1], 0);
    design.addMove(13, 27, [2], 0);

    design.addPiece("GBC", 14);
    design.addMove(14, 0, [0], 0);
    design.addMove(14, 1, [0, 0], 0);
    design.addMove(14, 28, [6], 0);
    design.addMove(14, 24, [7], 0);
    design.addMove(14, 6, [1, 1], 0);
    design.addMove(14, 28, [3], 0);
    design.addMove(14, 24, [5], 0);

    design.addPiece("GBD", 15);
    design.addMove(15, 0, [6], 0);
    design.addMove(15, 1, [6, 6], 0);
    design.addMove(15, 29, [2], 0);
    design.addMove(15, 26, [0], 0);
    design.addMove(15, 6, [3, 3], 0);
    design.addMove(15, 29, [4], 0);
    design.addMove(15, 26, [1], 0);

    design.addPiece("BGA", 16);
    design.addMove(16, 0, [2], 0);
    design.addMove(16, 1, [2, 2], 0);
    design.addMove(16, 30, [5], 0);
    design.addMove(16, 28, [6], 0);
    design.addMove(16, 6, [4, 4], 0);
    design.addMove(16, 30, [7], 0);
    design.addMove(16, 28, [3], 0);

    design.addPiece("BGB", 17);
    design.addMove(17, 0, [5], 0);
    design.addMove(17, 1, [5, 5], 0);
    design.addMove(17, 31, [1], 0);
    design.addMove(17, 29, [2], 0);
    design.addMove(17, 6, [7, 7], 0);
    design.addMove(17, 31, [0], 0);
    design.addMove(17, 29, [4], 0);

    design.addPiece("BGC", 18);
    design.addMove(18, 0, [1], 0);
    design.addMove(18, 1, [1, 1], 0);
    design.addMove(18, 25, [3], 0);
    design.addMove(18, 30, [5], 0);
    design.addMove(18, 6, [0, 0], 0);
    design.addMove(18, 25, [6], 0);
    design.addMove(18, 30, [7], 0);

    design.addPiece("BGD", 19);
    design.addMove(19, 0, [3], 0);
    design.addMove(19, 1, [3, 3], 0);
    design.addMove(19, 27, [4], 0);
    design.addMove(19, 31, [1], 0);
    design.addMove(19, 6, [6, 6], 0);
    design.addMove(19, 27, [2], 0);
    design.addMove(19, 31, [0], 0);

    design.addPiece("YGA", 20);
    design.addMove(20, 0, [2], 0);
    design.addMove(20, 1, [2, 2], 0);
    design.addMove(20, 32, [5], 0);
    design.addMove(20, 33, [6], 0);
    design.addMove(20, 9, [4, 4], 0);
    design.addMove(20, 34, [7, 7], 1);
    design.addMove(20, 35, [3, 3], 1);

    design.addPiece("YGB", 21);
    design.addMove(21, 0, [5], 0);
    design.addMove(21, 1, [5, 5], 0);
    design.addMove(21, 36, [1], 0);
    design.addMove(21, 37, [2], 0);
    design.addMove(21, 9, [7, 7], 0);
    design.addMove(21, 38, [0, 0], 1);
    design.addMove(21, 39, [4, 4], 1);

    design.addPiece("YGC", 22);
    design.addMove(22, 0, [1], 0);
    design.addMove(22, 1, [1, 1], 0);
    design.addMove(22, 40, [3], 0);
    design.addMove(22, 32, [5], 0);
    design.addMove(22, 9, [0, 0], 0);
    design.addMove(22, 41, [6, 6], 1);
    design.addMove(22, 34, [7, 7], 1);

    design.addPiece("YGD", 23);
    design.addMove(23, 0, [3], 0);
    design.addMove(23, 1, [3, 3], 0);
    design.addMove(23, 42, [4], 0);
    design.addMove(23, 36, [1], 0);
    design.addMove(23, 9, [6, 6], 0);
    design.addMove(23, 43, [2, 2], 1);
    design.addMove(23, 38, [0, 0], 1);

    design.addPiece("GYA", 24);
    design.addMove(24, 0, [4], 0);
    design.addMove(24, 1, [4, 4], 0);
    design.addMove(24, 44, [7], 0);
    design.addMove(24, 40, [3], 0);
    design.addMove(24, 9, [2, 2], 0);
    design.addMove(24, 45, [5, 5], 1);
    design.addMove(24, 41, [6, 6], 1);

    design.addPiece("GYB", 25);
    design.addMove(25, 0, [7], 0);
    design.addMove(25, 1, [7, 7], 0);
    design.addMove(25, 46, [0], 0);
    design.addMove(25, 42, [4], 0);
    design.addMove(25, 9, [5, 5], 0);
    design.addMove(25, 47, [1, 1], 1);
    design.addMove(25, 43, [2, 2], 1);

    design.addPiece("GYC", 26);
    design.addMove(26, 0, [0], 0);
    design.addMove(26, 1, [0, 0], 0);
    design.addMove(26, 33, [6], 0);
    design.addMove(26, 44, [7], 0);
    design.addMove(26, 9, [1, 1], 0);
    design.addMove(26, 35, [3, 3], 1);
    design.addMove(26, 45, [5, 5], 1);

    design.addPiece("GYD", 27);
    design.addMove(27, 0, [6], 0);
    design.addMove(27, 1, [6, 6], 0);
    design.addMove(27, 37, [2], 0);
    design.addMove(27, 46, [0], 0);
    design.addMove(27, 9, [3, 3], 0);
    design.addMove(27, 39, [4, 4], 1);
    design.addMove(27, 47, [1, 1], 1);

    design.addPiece("RA", 28);
    design.addMove(28, 48, [4, 4], 0);
    design.addMove(28, 48, [2, 2], 0);
    design.addMove(28, 49, [7], 0);
    design.addMove(28, 50, [3], 0);
    design.addMove(28, 49, [5], 0);
    design.addMove(28, 50, [6], 0);

    design.addPiece("RB", 29);
    design.addMove(29, 48, [7, 7], 0);
    design.addMove(29, 48, [5, 5], 0);
    design.addMove(29, 51, [0], 0);
    design.addMove(29, 52, [4], 0);
    design.addMove(29, 51, [1], 0);
    design.addMove(29, 52, [2], 0);

    design.addPiece("RC", 30);
    design.addMove(30, 48, [0, 0], 0);
    design.addMove(30, 48, [1, 1], 0);
    design.addMove(30, 50, [6], 0);
    design.addMove(30, 49, [7], 0);
    design.addMove(30, 50, [3], 0);
    design.addMove(30, 49, [5], 0);

    design.addPiece("RD", 31);
    design.addMove(31, 48, [6, 6], 0);
    design.addMove(31, 48, [3, 3], 0);
    design.addMove(31, 52, [2], 0);
    design.addMove(31, 51, [0], 0);
    design.addMove(31, 52, [4], 0);
    design.addMove(31, 51, [1], 0);

    design.addPiece("GRA", 32);
    design.addMove(32, 0, [4], 0);
    design.addMove(32, 1, [4, 4], 0);
    design.addMove(32, 53, [7], 0);
    design.addMove(32, 54, [3], 0);
    design.addMove(32, 48, [2, 2], 0);
    design.addMove(32, 55, [5], 0);
    design.addMove(32, 56, [6], 0);

    design.addPiece("GRB", 33);
    design.addMove(33, 0, [7], 0);
    design.addMove(33, 1, [7, 7], 0);
    design.addMove(33, 57, [0], 0);
    design.addMove(33, 58, [4], 0);
    design.addMove(33, 48, [5, 5], 0);
    design.addMove(33, 59, [1], 0);
    design.addMove(33, 60, [2], 0);

    design.addPiece("GRC", 34);
    design.addMove(34, 0, [0], 0);
    design.addMove(34, 1, [0, 0], 0);
    design.addMove(34, 61, [6], 0);
    design.addMove(34, 53, [7], 0);
    design.addMove(34, 48, [1, 1], 0);
    design.addMove(34, 62, [3], 0);
    design.addMove(34, 55, [5], 0);

    design.addPiece("GRD", 35);
    design.addMove(35, 0, [6], 0);
    design.addMove(35, 1, [6, 6], 0);
    design.addMove(35, 63, [2], 0);
    design.addMove(35, 57, [0], 0);
    design.addMove(35, 48, [3, 3], 0);
    design.addMove(35, 64, [4], 0);
    design.addMove(35, 59, [1], 0);

    design.addPiece("RGA", 36);
    design.addMove(36, 0, [2], 0);
    design.addMove(36, 1, [2, 2], 0);
    design.addMove(36, 65, [5], 0);
    design.addMove(36, 61, [6], 0);
    design.addMove(36, 48, [4, 4], 0);
    design.addMove(36, 66, [7], 0);
    design.addMove(36, 62, [3], 0);

    design.addPiece("RGB", 37);
    design.addMove(37, 0, [5], 0);
    design.addMove(37, 1, [5, 5], 0);
    design.addMove(37, 67, [1], 0);
    design.addMove(37, 63, [2], 0);
    design.addMove(37, 48, [7, 7], 0);
    design.addMove(37, 68, [0], 0);
    design.addMove(37, 64, [4], 0);

    design.addPiece("RGC", 38);
    design.addMove(38, 0, [1], 0);
    design.addMove(38, 1, [1, 1], 0);
    design.addMove(38, 54, [3], 0);
    design.addMove(38, 65, [5], 0);
    design.addMove(38, 48, [0, 0], 0);
    design.addMove(38, 56, [6], 0);
    design.addMove(38, 66, [7], 0);

    design.addPiece("RGD", 39);
    design.addMove(39, 0, [3], 0);
    design.addMove(39, 1, [3, 3], 0);
    design.addMove(39, 58, [4], 0);
    design.addMove(39, 67, [1], 0);
    design.addMove(39, 48, [6, 6], 0);
    design.addMove(39, 60, [2], 0);
    design.addMove(39, 68, [0], 0);

    design.setup("Light", "GA", 82);
    design.setup("Light", "GA", 83);
    design.setup("Light", "GA", 84);
    design.setup("Light", "GA", 85);
    design.setup("Light", "GA", 86);
    design.setup("Light", "GA", 87);
    design.setup("Light", "GC", 91);
    design.setup("Light", "GC", 98);
    design.setup("Light", "GB", 81);
    design.setup("Light", "GD", 88);
    design.setup("Light", "BYA", 94);
    design.setup("Light", "BYA", 95);
    design.setup("Light", "GBB", 93);
    design.setup("Light", "BGD", 96);
    design.setup("Light", "GYB", 92);
    design.setup("Light", "YGD", 97);
    design.setup("Dark", "GA", 12);
    design.setup("Dark", "GA", 13);
    design.setup("Dark", "GA", 14);
    design.setup("Dark", "GA", 15);
    design.setup("Dark", "GA", 16);
    design.setup("Dark", "GA", 17);
    design.setup("Dark", "GC", 1);
    design.setup("Dark", "GC", 8);
    design.setup("Dark", "GB", 18);
    design.setup("Dark", "GD", 11);
    design.setup("Dark", "RA", 4);
    design.setup("Dark", "RA", 5);
    design.setup("Dark", "GRD", 3);
    design.setup("Dark", "RGB", 6);
    design.setup("Dark", "GBD", 2);
    design.setup("Dark", "BGB", 7);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("LightGA", "Light GA");
    view.defPiece("DarkGA", "Dark GA");
    view.defPiece("LightGB", "Light GB");
    view.defPiece("DarkGB", "Dark GB");
    view.defPiece("LightGC", "Light GC");
    view.defPiece("DarkGC", "Dark GC");
    view.defPiece("LightGD", "Light GD");
    view.defPiece("DarkGD", "Dark GD");
    view.defPiece("LightBYA", "Light BYA");
    view.defPiece("LightBYB", "Light BYB");
    view.defPiece("LightBYC", "Light BYC");
    view.defPiece("LightBYD", "Light BYD");
    view.defPiece("LightYBA", "Light YBA");
    view.defPiece("LightYBB", "Light YBB");
    view.defPiece("LightYBC", "Light YBC");
    view.defPiece("LightYBD", "Light YBD");
    view.defPiece("LightGBA", "Light GBA");
    view.defPiece("DarkGBA", "Dark GBA");
    view.defPiece("LightGBB", "Light GBB");
    view.defPiece("DarkGBB", "Dark GBB");
    view.defPiece("LightGBC", "Light GBC");
    view.defPiece("DarkGBC", "Dark GBC");
    view.defPiece("LightGBD", "Light GBD");
    view.defPiece("DarkGBD", "Dark GBD");
    view.defPiece("LightBGA", "Light BGA");
    view.defPiece("DarkBGA", "Dark BGA");
    view.defPiece("LightBGB", "Light BGB");
    view.defPiece("DarkBGB", "Dark BGB");
    view.defPiece("LightBGC", "Light BGC");
    view.defPiece("DarkBGC", "Dark BGC");
    view.defPiece("LightBGD", "Light BGD");
    view.defPiece("DarkBGD", "Dark BGD");
    view.defPiece("LightYGA", "Light YGA");
    view.defPiece("LightYGB", "Light YGB");
    view.defPiece("LightYGC", "Light YGC");
    view.defPiece("LightYGD", "Light YGD");
    view.defPiece("LightGYA", "Light GYA");
    view.defPiece("LightGYB", "Light GYB");
    view.defPiece("LightGYC", "Light GYC");
    view.defPiece("LightGYD", "Light GYD");
    view.defPiece("DarkRA", "Dark RA");
    view.defPiece("DarkRB", "Dark RB");
    view.defPiece("DarkRC", "Dark RC");
    view.defPiece("DarkRD", "Dark RD");
    view.defPiece("DarkGRA", "Dark GRA");
    view.defPiece("DarkGRB", "Dark GRB");
    view.defPiece("DarkGRC", "Dark GRC");
    view.defPiece("DarkGRD", "Dark GRD");
    view.defPiece("DarkRGA", "Dark RGA");
    view.defPiece("DarkRGB", "Dark RGB");
    view.defPiece("DarkRGC", "Dark RGC");
    view.defPiece("DarkRGD", "Dark RGD");
 
    view.defPosition("a10", 2, 2, 70, 70);
    view.defPosition("b10", 72, 2, 70, 70);
    view.defPosition("c10", 142, 2, 70, 70);
    view.defPosition("d10", 212, 2, 70, 70);
    view.defPosition("e10", 282, 2, 70, 70);
    view.defPosition("f10", 352, 2, 70, 70);
    view.defPosition("g10", 422, 2, 70, 70);
    view.defPosition("h10", 492, 2, 70, 70);
    view.defPosition("i10", 562, 2, 70, 70);
    view.defPosition("j10", 632, 2, 70, 70);
    view.defPosition("a9", 2, 72, 70, 70);
    view.defPosition("b9", 72, 72, 70, 70);
    view.defPosition("c9", 142, 72, 70, 70);
    view.defPosition("d9", 212, 72, 70, 70);
    view.defPosition("e9", 282, 72, 70, 70);
    view.defPosition("f9", 352, 72, 70, 70);
    view.defPosition("g9", 422, 72, 70, 70);
    view.defPosition("h9", 492, 72, 70, 70);
    view.defPosition("i9", 562, 72, 70, 70);
    view.defPosition("j9", 632, 72, 70, 70);
    view.defPosition("a8", 2, 142, 70, 70);
    view.defPosition("b8", 72, 142, 70, 70);
    view.defPosition("c8", 142, 142, 70, 70);
    view.defPosition("d8", 212, 142, 70, 70);
    view.defPosition("e8", 282, 142, 70, 70);
    view.defPosition("f8", 352, 142, 70, 70);
    view.defPosition("g8", 422, 142, 70, 70);
    view.defPosition("h8", 492, 142, 70, 70);
    view.defPosition("i8", 562, 142, 70, 70);
    view.defPosition("j8", 632, 142, 70, 70);
    view.defPosition("a7", 2, 212, 70, 70);
    view.defPosition("b7", 72, 212, 70, 70);
    view.defPosition("c7", 142, 212, 70, 70);
    view.defPosition("d7", 212, 212, 70, 70);
    view.defPosition("e7", 282, 212, 70, 70);
    view.defPosition("f7", 352, 212, 70, 70);
    view.defPosition("g7", 422, 212, 70, 70);
    view.defPosition("h7", 492, 212, 70, 70);
    view.defPosition("i7", 562, 212, 70, 70);
    view.defPosition("j7", 632, 212, 70, 70);
    view.defPosition("a6", 2, 282, 70, 70);
    view.defPosition("b6", 72, 282, 70, 70);
    view.defPosition("c6", 142, 282, 70, 70);
    view.defPosition("d6", 212, 282, 70, 70);
    view.defPosition("e6", 282, 282, 70, 70);
    view.defPosition("f6", 352, 282, 70, 70);
    view.defPosition("g6", 422, 282, 70, 70);
    view.defPosition("h6", 492, 282, 70, 70);
    view.defPosition("i6", 562, 282, 70, 70);
    view.defPosition("j6", 632, 282, 70, 70);
    view.defPosition("a5", 2, 352, 70, 70);
    view.defPosition("b5", 72, 352, 70, 70);
    view.defPosition("c5", 142, 352, 70, 70);
    view.defPosition("d5", 212, 352, 70, 70);
    view.defPosition("e5", 282, 352, 70, 70);
    view.defPosition("f5", 352, 352, 70, 70);
    view.defPosition("g5", 422, 352, 70, 70);
    view.defPosition("h5", 492, 352, 70, 70);
    view.defPosition("i5", 562, 352, 70, 70);
    view.defPosition("j5", 632, 352, 70, 70);
    view.defPosition("a4", 2, 422, 70, 70);
    view.defPosition("b4", 72, 422, 70, 70);
    view.defPosition("c4", 142, 422, 70, 70);
    view.defPosition("d4", 212, 422, 70, 70);
    view.defPosition("e4", 282, 422, 70, 70);
    view.defPosition("f4", 352, 422, 70, 70);
    view.defPosition("g4", 422, 422, 70, 70);
    view.defPosition("h4", 492, 422, 70, 70);
    view.defPosition("i4", 562, 422, 70, 70);
    view.defPosition("j4", 632, 422, 70, 70);
    view.defPosition("a3", 2, 492, 70, 70);
    view.defPosition("b3", 72, 492, 70, 70);
    view.defPosition("c3", 142, 492, 70, 70);
    view.defPosition("d3", 212, 492, 70, 70);
    view.defPosition("e3", 282, 492, 70, 70);
    view.defPosition("f3", 352, 492, 70, 70);
    view.defPosition("g3", 422, 492, 70, 70);
    view.defPosition("h3", 492, 492, 70, 70);
    view.defPosition("i3", 562, 492, 70, 70);
    view.defPosition("j3", 632, 492, 70, 70);
    view.defPosition("a2", 2, 562, 70, 70);
    view.defPosition("b2", 72, 562, 70, 70);
    view.defPosition("c2", 142, 562, 70, 70);
    view.defPosition("d2", 212, 562, 70, 70);
    view.defPosition("e2", 282, 562, 70, 70);
    view.defPosition("f2", 352, 562, 70, 70);
    view.defPosition("g2", 422, 562, 70, 70);
    view.defPosition("h2", 492, 562, 70, 70);
    view.defPosition("i2", 562, 562, 70, 70);
    view.defPosition("j2", 632, 562, 70, 70);
    view.defPosition("a1", 2, 632, 70, 70);
    view.defPosition("b1", 72, 632, 70, 70);
    view.defPosition("c1", 142, 632, 70, 70);
    view.defPosition("d1", 212, 632, 70, 70);
    view.defPosition("e1", 282, 632, 70, 70);
    view.defPosition("f1", 352, 632, 70, 70);
    view.defPosition("g1", 422, 632, 70, 70);
    view.defPosition("h1", 492, 632, 70, 70);
    view.defPosition("i1", 562, 632, 70, 70);
    view.defPosition("j1", 632, 632, 70, 70);
}
