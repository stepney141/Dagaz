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
    design.checkVersion("smart-moves", "from");
    design.checkVersion("pass-turn", "forced");
    design.checkVersion("pass-partial", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-captures", "false");
    design.checkVersion("show-drops", "false");
    design.checkVersion("advisor-wait", "10");

    design.addDirection("next");       // 0
    design.addDirection("next-black"); // 1
    design.addDirection("up");         // 2

    design.addPlayer("White", [0, 1, 2]);
    design.addPlayer("Black", [1, 0, 2]);

    design.addPosition("x1", [0, 0, 0]);
    design.addPosition("x2", [0, 0, 0]);
    design.addPosition("x3", [0, 0, 0]);
    design.addPosition("x4", [0, 0, 0]);
    design.addPosition("a4", [0, 1, 48]);
    design.addPosition("a3", [4, 4, 48]);
    design.addPosition("a2", [-1, 1, 48]);
    design.addPosition("a1", [4, 4, 48]);
    design.addPosition("b4", [-4, -4, 48]);
    design.addPosition("b3", [4, 4, 48]);
    design.addPosition("b2", [-4, -4, 48]);
    design.addPosition("b1", [4, 4, 48]);
    design.addPosition("c4", [-4, -4, 48]);
    design.addPosition("c3", [4, 4, 48]);
    design.addPosition("c2", [-4, -4, 48]);
    design.addPosition("c1", [4, 4, 48]);
    design.addPosition("d4", [-4, -4, 48]);
    design.addPosition("d3", [4, 4, 48]);
    design.addPosition("d2", [-4, -4, 48]);
    design.addPosition("d1", [4, 4, 48]);
    design.addPosition("e4", [-4, -4, 48]);
    design.addPosition("e3", [4, 4, 48]);
    design.addPosition("e2", [-4, -4, 48]);
    design.addPosition("e1", [4, 4, 48]);
    design.addPosition("f4", [-4, -4, 48]);
    design.addPosition("f3", [4, 4, 48]);
    design.addPosition("f2", [-4, -4, 48]);
    design.addPosition("f1", [4, 4, 48]);
    design.addPosition("g4", [-4, -4, 48]);
    design.addPosition("g3", [4, 4, 48]);
    design.addPosition("g2", [-4, -4, 48]);
    design.addPosition("g1", [4, 4, 48]);
    design.addPosition("h4", [-4, -4, 48]);
    design.addPosition("h3", [4, 4, 48]);
    design.addPosition("h2", [-4, -4, 48]);
    design.addPosition("h1", [4, 4, 48]);
    design.addPosition("i4", [-4, -4, 48]);
    design.addPosition("i3", [4, 4, 48]);
    design.addPosition("i2", [-4, -4, 48]);
    design.addPosition("i1", [4, 4, 48]);
    design.addPosition("j4", [-4, -4, 48]);
    design.addPosition("j3", [4, 4, 48]);
    design.addPosition("j2", [-4, -4, 48]);
    design.addPosition("j1", [4, 4, 48]);
    design.addPosition("k4", [-4, -4, 48]);
    design.addPosition("k3", [4, 4, 48]);
    design.addPosition("k2", [-4, -4, 48]);
    design.addPosition("k1", [4, 4, 48]);
    design.addPosition("l4", [-4, -4, 48]);
    design.addPosition("l3", [-1, 1, 48]);
    design.addPosition("l2", [-4, -4, 48]);
    design.addPosition("l1", [-1, 0, 48]);
    design.addPosition("A4", [0, 0, 0]);
    design.addPosition("A3", [0, 0, 0]);
    design.addPosition("A2", [0, 0, 0]);
    design.addPosition("A1", [0, 0, 0]);
    design.addPosition("B4", [0, 0, 0]);
    design.addPosition("B3", [0, 0, 0]);
    design.addPosition("B2", [0, 0, 0]);
    design.addPosition("B1", [0, 0, 0]);
    design.addPosition("C4", [0, 0, 0]);
    design.addPosition("C3", [0, 0, 0]);
    design.addPosition("C2", [0, 0, 0]);
    design.addPosition("C1", [0, 0, 0]);
    design.addPosition("D4", [0, 0, 0]);
    design.addPosition("D3", [0, 0, 0]);
    design.addPosition("D2", [0, 0, 0]);
    design.addPosition("D1", [0, 0, 0]);
    design.addPosition("E4", [0, 0, 0]);
    design.addPosition("E3", [0, 0, 0]);
    design.addPosition("E2", [0, 0, 0]);
    design.addPosition("E1", [0, 0, 0]);
    design.addPosition("F4", [0, 0, 0]);
    design.addPosition("F3", [0, 0, 0]);
    design.addPosition("F2", [0, 0, 0]);
    design.addPosition("F1", [0, 0, 0]);
    design.addPosition("G4", [0, 0, 0]);
    design.addPosition("G3", [0, 0, 0]);
    design.addPosition("G2", [0, 0, 0]);
    design.addPosition("G1", [0, 0, 0]);
    design.addPosition("H4", [0, 0, 0]);
    design.addPosition("H3", [0, 0, 0]);
    design.addPosition("H2", [0, 0, 0]);
    design.addPosition("H1", [0, 0, 0]);
    design.addPosition("I4", [0, 0, 0]);
    design.addPosition("I3", [0, 0, 0]);
    design.addPosition("I2", [0, 0, 0]);
    design.addPosition("I1", [0, 0, 0]);
    design.addPosition("J4", [0, 0, 0]);
    design.addPosition("J3", [0, 0, 0]);
    design.addPosition("J2", [0, 0, 0]);
    design.addPosition("J1", [0, 0, 0]);
    design.addPosition("K4", [0, 0, 0]);
    design.addPosition("K3", [0, 0, 0]);
    design.addPosition("K2", [0, 0, 0]);
    design.addPosition("K1", [0, 0, 0]);
    design.addPosition("L4", [0, 0, 0]);
    design.addPosition("L3", [0, 0, 0]);
    design.addPosition("L2", [0, 0, 0]);
    design.addPosition("L1", [0, 0, 0]);

    design.addZone("target", 1, [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48]);
    design.addZone("target", 2, [7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51]);

    design.addCommand(0, ZRF.IN_ZONE,	0);	// dices
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.PARAM,	1);	// $2
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.PARAM,	2);	// $3
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.PARAM,	3);	// $4
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.PARAM,	4);	// $5
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.PARAM,	5);	// $6
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.PARAM,	6);	// $7
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.PARAM,	7);	// $8
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	2);	// $3
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	3);	// $4
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	4);	// $5
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	5);	// $6
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	6);	// $7
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	7);	// $8
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	8);	// $9
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	9);	// $10
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	10);	// $11
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	11);	// $12
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.PARAM,	1);	// $2
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.PARAM,	2);	// $3
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.PARAM,	3);	// $4
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(5, ZRF.FUNCTION,	0);	// not
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.PARAM,	0);	// $1
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.PARAM,	1);	// $2
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.PARAM,	2);	// $3
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.PARAM,	3);	// $4
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.PARAM,	4);	// $5
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.PARAM,	5);	// $6
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addPiece("dice0", 0);
//  design.addDrop(0, 0, [], 0);

    design.addPiece("dice1", 1);
//  design.addDrop(1, 0, [], 0);

    design.addPiece("Man", 2);
    design.addMove(2, 1, [0, 0], 2);
    design.addMove(2, 2, [0, 0, 0, 0, 0, 0, 0, 0], 8);
    design.addMove(2, 3, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 12);
    design.addMove(2, 4, [0], 1);
    design.addMove(2, 5, [0, 0, 0, 0], 4);
    design.addMove(2, 6, [0, 0, 0, 0, 0, 0], 6);

    design.setup("White", "Man", 7);
    design.setup("White", "Man", 11);
    design.setup("White", "Man", 15);
    design.setup("White", "Man", 19);
    design.setup("White", "Man", 23);
    design.setup("White", "Man", 27);
    design.setup("White", "Man", 31);
    design.setup("White", "Man", 35);
    design.setup("White", "Man", 39);
    design.setup("White", "Man", 43);
    design.setup("White", "Man", 47);
    design.setup("White", "Man", 51);
    design.setup("White", "dice0", 0);
    design.setup("White", "dice0", 1);
    design.setup("White", "dice0", 2);
    design.setup("White", "dice1", 3);
    design.setup("Black", "Man", 4);
    design.setup("Black", "Man", 8);
    design.setup("Black", "Man", 12);
    design.setup("Black", "Man", 16);
    design.setup("Black", "Man", 20);
    design.setup("Black", "Man", 24);
    design.setup("Black", "Man", 28);
    design.setup("Black", "Man", 32);
    design.setup("Black", "Man", 36);
    design.setup("Black", "Man", 40);
    design.setup("Black", "Man", 44);
    design.setup("Black", "Man", 48);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("Whitedice0", "White dice0");
    view.defPiece("Blackdice0", "Black dice0");
    view.defPiece("Whitedice1", "White dice1");
    view.defPiece("Blackdice1", "Black dice1");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
 
    view.defPosition("x1", 613, 0, 15, 204);
    view.defPosition("x2", 634, 0, 15, 204);
    view.defPosition("x3", 655, 0, 15, 204);
    view.defPosition("x4", 676, 0, 15, 204);
    view.defPosition("a4", 2, 2, 50, 50);
    view.defPosition("a3", 2, 52, 50, 50);
    view.defPosition("a2", 2, 102, 50, 50);
    view.defPosition("a1", 2, 152, 50, 50);
    view.defPosition("b4", 52, 2, 50, 50);
    view.defPosition("b3", 52, 52, 50, 50);
    view.defPosition("b2", 52, 102, 50, 50);
    view.defPosition("b1", 52, 152, 50, 50);
    view.defPosition("c4", 102, 2, 50, 50);
    view.defPosition("c3", 102, 52, 50, 50);
    view.defPosition("c2", 102, 102, 50, 50);
    view.defPosition("c1", 102, 152, 50, 50);
    view.defPosition("d4", 152, 2, 50, 50);
    view.defPosition("d3", 152, 52, 50, 50);
    view.defPosition("d2", 152, 102, 50, 50);
    view.defPosition("d1", 152, 152, 50, 50);
    view.defPosition("e4", 202, 2, 50, 50);
    view.defPosition("e3", 202, 52, 50, 50);
    view.defPosition("e2", 202, 102, 50, 50);
    view.defPosition("e1", 202, 152, 50, 50);
    view.defPosition("f4", 252, 2, 50, 50);
    view.defPosition("f3", 252, 52, 50, 50);
    view.defPosition("f2", 252, 102, 50, 50);
    view.defPosition("f1", 252, 152, 50, 50);
    view.defPosition("g4", 302, 2, 50, 50);
    view.defPosition("g3", 302, 52, 50, 50);
    view.defPosition("g2", 302, 102, 50, 50);
    view.defPosition("g1", 302, 152, 50, 50);
    view.defPosition("h4", 352, 2, 50, 50);
    view.defPosition("h3", 352, 52, 50, 50);
    view.defPosition("h2", 352, 102, 50, 50);
    view.defPosition("h1", 352, 152, 50, 50);
    view.defPosition("i4", 402, 2, 50, 50);
    view.defPosition("i3", 402, 52, 50, 50);
    view.defPosition("i2", 402, 102, 50, 50);
    view.defPosition("i1", 402, 152, 50, 50);
    view.defPosition("j4", 452, 2, 50, 50);
    view.defPosition("j3", 452, 52, 50, 50);
    view.defPosition("j2", 452, 102, 50, 50);
    view.defPosition("j1", 452, 152, 50, 50);
    view.defPosition("k4", 502, 2, 50, 50);
    view.defPosition("k3", 502, 52, 50, 50);
    view.defPosition("k2", 502, 102, 50, 50);
    view.defPosition("k1", 502, 152, 50, 50);
    view.defPosition("l4", 552, 2, 50, 50);
    view.defPosition("l3", 552, 52, 50, 50);
    view.defPosition("l2", 552, 102, 50, 50);
    view.defPosition("l1", 552, 152, 50, 50);
    view.defPosition("A4", 2, 2, 50, 50);
    view.defPosition("A3", 2, 52, 50, 50);
    view.defPosition("A2", 2, 102, 50, 50);
    view.defPosition("A1", 2, 152, 50, 50);
    view.defPosition("B4", 52, 2, 50, 50);
    view.defPosition("B3", 52, 52, 50, 50);
    view.defPosition("B2", 52, 102, 50, 50);
    view.defPosition("B1", 52, 152, 50, 50);
    view.defPosition("C4", 102, 2, 50, 50);
    view.defPosition("C3", 102, 52, 50, 50);
    view.defPosition("C2", 102, 102, 50, 50);
    view.defPosition("C1", 102, 152, 50, 50);
    view.defPosition("D4", 152, 2, 50, 50);
    view.defPosition("D3", 152, 52, 50, 50);
    view.defPosition("D2", 152, 102, 50, 50);
    view.defPosition("D1", 152, 152, 50, 50);
    view.defPosition("E4", 202, 2, 50, 50);
    view.defPosition("E3", 202, 52, 50, 50);
    view.defPosition("E2", 202, 102, 50, 50);
    view.defPosition("E1", 202, 152, 50, 50);
    view.defPosition("F4", 252, 2, 50, 50);
    view.defPosition("F3", 252, 52, 50, 50);
    view.defPosition("F2", 252, 102, 50, 50);
    view.defPosition("F1", 252, 152, 50, 50);
    view.defPosition("G4", 302, 2, 50, 50);
    view.defPosition("G3", 302, 52, 50, 50);
    view.defPosition("G2", 302, 102, 50, 50);
    view.defPosition("G1", 302, 152, 50, 50);
    view.defPosition("H4", 352, 2, 50, 50);
    view.defPosition("H3", 352, 52, 50, 50);
    view.defPosition("H2", 352, 102, 50, 50);
    view.defPosition("H1", 352, 152, 50, 50);
    view.defPosition("I4", 402, 2, 50, 50);
    view.defPosition("I3", 402, 52, 50, 50);
    view.defPosition("I2", 402, 102, 50, 50);
    view.defPosition("I1", 402, 152, 50, 50);
    view.defPosition("J4", 452, 2, 50, 50);
    view.defPosition("J3", 452, 52, 50, 50);
    view.defPosition("J2", 452, 102, 50, 50);
    view.defPosition("J1", 452, 152, 50, 50);
    view.defPosition("K4", 502, 2, 50, 50);
    view.defPosition("K3", 502, 52, 50, 50);
    view.defPosition("K2", 502, 102, 50, 50);
    view.defPosition("K1", 502, 152, 50, 50);
    view.defPosition("L4", 552, 2, 50, 50);
    view.defPosition("L3", 552, 52, 50, 50);
    view.defPosition("L2", 552, 102, 50, 50);
    view.defPosition("L1", 552, 152, 50, 50);
}
