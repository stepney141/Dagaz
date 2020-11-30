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
    design.checkVersion("shared-pieces", "true");
    design.checkVersion("pasang-extension", "true");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("n");
    design.addDirection("gr");
    design.addDirection("sd");

    design.addPlayer("Blue", [1, 0, 3, 2, 4, 5]);
    design.addPlayer("Red", [0, 1, 2, 3, 4, 5]);
    design.addPlayer("N", [0, 1, 2, 3, 4, 5]);
    design.addTurn(1);
    design.addTurn(2);

    design.addPosition("a11", [0, 1, 11, 0, 44, 110]);
    design.addPosition("b11", [-1, 1, 11, 0, 44, 109]);
    design.addPosition("c11", [-1, 1, 11, 0, 44, 108]);
    design.addPosition("d11", [-1, 1, 11, 0, 44, 107]);
    design.addPosition("e11", [-1, 1, 11, 0, 44, 106]);
    design.addPosition("f11", [-1, 1, 11, 0, 44, 110]);
    design.addPosition("g11", [-1, 1, 11, 0, 44, 110]);
    design.addPosition("h11", [-1, 1, 11, 0, 44, 109]);
    design.addPosition("i11", [-1, 1, 11, 0, 44, 108]);
    design.addPosition("j11", [-1, 1, 11, 0, 44, 107]);
    design.addPosition("k11", [-1, 0, 11, 0, 44, 106]);
    design.addPosition("a10", [0, 1, 11, -11, -11, 99]);
    design.addPosition("b10", [-1, 1, 11, -11, -11, 98]);
    design.addPosition("c10", [-1, 1, 11, -11, -11, 97]);
    design.addPosition("d10", [-1, 1, 11, -11, -11, 96]);
    design.addPosition("e10", [-1, 1, 11, -11, -11, 95]);
    design.addPosition("f10", [-1, 1, 11, -11, -11, 99]);
    design.addPosition("g10", [-1, 1, 11, -11, -11, 99]);
    design.addPosition("h10", [-1, 1, 11, -11, -11, 98]);
    design.addPosition("i10", [-1, 1, 11, -11, -11, 97]);
    design.addPosition("j10", [-1, 1, 11, -11, -11, 96]);
    design.addPosition("k10", [-1, 0, 11, -11, -11, 95]);
    design.addPosition("a9", [0, 1, 11, -11, -11, 88]);
    design.addPosition("b9", [-1, 1, 11, -11, -11, 87]);
    design.addPosition("c9", [-1, 1, 11, -11, -11, 86]);
    design.addPosition("d9", [-1, 1, 11, -11, -11, 85]);
    design.addPosition("e9", [-1, 1, 11, -11, -11, 84]);
    design.addPosition("f9", [-1, 1, 11, -11, -11, 88]);
    design.addPosition("g9", [-1, 1, 11, -11, -11, 88]);
    design.addPosition("h9", [-1, 1, 11, -11, -11, 87]);
    design.addPosition("i9", [-1, 1, 11, -11, -11, 86]);
    design.addPosition("j9", [-1, 1, 11, -11, -11, 85]);
    design.addPosition("k9", [-1, 0, 11, -11, -11, 84]);
    design.addPosition("a8", [0, 1, 11, -11, -11, 77]);
    design.addPosition("b8", [-1, 1, 11, -11, -11, 76]);
    design.addPosition("c8", [-1, 1, 11, -11, -11, 75]);
    design.addPosition("d8", [-1, 1, 11, -11, -11, 74]);
    design.addPosition("e8", [-1, 1, 11, -11, -11, 73]);
    design.addPosition("f8", [-1, 1, 11, -11, -11, 77]);
    design.addPosition("g8", [-1, 1, 11, -11, -11, 77]);
    design.addPosition("h8", [-1, 1, 11, -11, -11, 76]);
    design.addPosition("i8", [-1, 1, 11, -11, -11, 75]);
    design.addPosition("j8", [-1, 1, 11, -11, -11, 74]);
    design.addPosition("k8", [-1, 0, 11, -11, -11, 73]);
    design.addPosition("a7", [0, 1, 11, -11, -11, 66]);
    design.addPosition("b7", [-1, 1, 11, -11, -11, 65]);
    design.addPosition("c7", [-1, 1, 11, -11, -11, 64]);
    design.addPosition("d7", [-1, 1, 11, -11, -11, 63]);
    design.addPosition("e7", [-1, 1, 11, -11, -11, 62]);
    design.addPosition("f7", [-1, 1, 0, -11, -11, 66]);
    design.addPosition("g7", [-1, 1, 11, -11, -11, 66]);
    design.addPosition("h7", [-1, 1, 11, -11, -11, 65]);
    design.addPosition("i7", [-1, 1, 11, -11, -11, 64]);
    design.addPosition("j7", [-1, 1, 11, -11, -11, 63]);
    design.addPosition("k7", [-1, 0, 11, -11, -11, 62]);
    design.addPosition("a6", [0, 1, 11, -11, 0, 0]);
    design.addPosition("b6", [-1, 1, 11, -11, 0, 0]);
    design.addPosition("c6", [-1, 1, 11, -11, 0, 0]);
    design.addPosition("d6", [-1, 1, 11, -11, 0, 0]);
    design.addPosition("e6", [-1, 0, 11, -11, 0, 0]);
    design.addPosition("f6", [0, 0, 0, 0, 0, 0]);
    design.addPosition("g6", [0, 1, 11, -11, 0, 0]);
    design.addPosition("h6", [-1, 1, 11, -11, 0, 0]);
    design.addPosition("i6", [-1, 1, 11, -11, 0, 0]);
    design.addPosition("j6", [-1, 1, 11, -11, 0, 0]);
    design.addPosition("k6", [-1, 0, 11, -11, 0, 0]);
    design.addPosition("a5", [0, 1, 11, -11, 44, 45]);
    design.addPosition("b5", [-1, 1, 11, -11, 44, 45]);
    design.addPosition("c5", [-1, 1, 11, -11, 44, 45]);
    design.addPosition("d5", [-1, 1, 11, -11, 44, 45]);
    design.addPosition("e5", [-1, 1, 11, -11, 44, 0]);
    design.addPosition("f5", [-1, 1, 11, 0, 44, 0]);
    design.addPosition("g5", [-1, 1, 11, -11, 44, 45]);
    design.addPosition("h5", [-1, 1, 11, -11, 44, 45]);
    design.addPosition("i5", [-1, 1, 11, -11, 44, 45]);
    design.addPosition("j5", [-1, 1, 11, -11, 44, 45]);
    design.addPosition("k5", [-1, 0, 11, -11, 44, 0]);
    design.addPosition("a4", [0, 1, 11, -11, -11, -11]);
    design.addPosition("b4", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("c4", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("d4", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("e4", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("f4", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("g4", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("h4", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("i4", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("j4", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("k4", [-1, 0, 11, -11, -11, -11]);
    design.addPosition("a3", [0, 1, 11, -11, -11, -11]);
    design.addPosition("b3", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("c3", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("d3", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("e3", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("f3", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("g3", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("h3", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("i3", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("j3", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("k3", [-1, 0, 11, -11, -11, -11]);
    design.addPosition("a2", [0, 1, 11, -11, -11, -11]);
    design.addPosition("b2", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("c2", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("d2", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("e2", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("f2", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("g2", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("h2", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("i2", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("j2", [-1, 1, 11, -11, -11, -11]);
    design.addPosition("k2", [-1, 0, 11, -11, -11, -11]);
    design.addPosition("a1", [0, 1, 0, -11, -11, -11]);
    design.addPosition("b1", [-1, 1, 0, -11, -11, -11]);
    design.addPosition("c1", [-1, 1, 0, -11, -11, -11]);
    design.addPosition("d1", [-1, 1, 0, -11, -11, -11]);
    design.addPosition("e1", [-1, 1, 0, -11, -11, -11]);
    design.addPosition("f1", [-1, 1, 0, -11, -11, -11]);
    design.addPosition("g1", [-1, 1, 0, -11, -11, -11]);
    design.addPosition("h1", [-1, 1, 0, -11, -11, -11]);
    design.addPosition("i1", [-1, 1, 0, -11, -11, -11]);
    design.addPosition("j1", [-1, 1, 0, -11, -11, -11]);
    design.addPosition("k1", [-1, 0, 0, -11, -11, -11]);

    design.addZone("home-zone", 1, [110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76]);
    design.addZone("home-zone", 2, [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	7);
    design.addCommand(0, ZRF.FORK,	3);
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end
    design.addCommand(0, ZRF.PARAM,	1);	// $2
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.JUMP,	-8);
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.IN_ZONE,	0);	// home-zone
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	26);	// capture
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.IN_ZONE,	0);	// home-zone
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PROMOTE,	0);	// Ka
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.IN_ZONE,	0);	// home-zone
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.PROMOTE,	0);	// Ka
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addPriority(0);			// priority-type
    design.addPriority(1);			// normal-type

    design.addPiece("Ka", 0);
    design.addMove(0, 0, [3, 3], 0);
    design.addMove(0, 0, [2, 2], 0);
    design.addMove(0, 0, [0, 0], 0);
    design.addMove(0, 0, [1, 1], 0);

    design.addPiece("Black", 1);
    design.addMove(1, 1, [], 1);
    design.addMove(1, 2, [3], 1);
    design.addMove(1, 2, [2], 1);
    design.addMove(1, 2, [0], 1);
    design.addMove(1, 2, [1], 1);
    design.addMove(1, 3, [3, 3], 1);
    design.addMove(1, 3, [2, 2], 1);
    design.addMove(1, 3, [0, 0], 1);
    design.addMove(1, 3, [1, 1], 1);

    design.addPiece("White", 2);
    design.addMove(2, 1, [], 1);
    design.addMove(2, 2, [3], 1);
    design.addMove(2, 2, [2], 1);
    design.addMove(2, 2, [0], 1);
    design.addMove(2, 2, [1], 1);
    design.addMove(2, 3, [3, 3], 1);
    design.addMove(2, 3, [2, 2], 1);
    design.addMove(2, 3, [0, 0], 1);
    design.addMove(2, 3, [1, 1], 1);

    design.setup("N", "Black", 110);
    design.setup("N", "Black", 11);
    design.setup("N", "Black", 0);
    design.setup("N", "Black", 99);
    design.setup("N", "Black", 66);
    design.setup("N", "Black", 44);
    design.setup("N", "Black", 111);
    design.setup("N", "Black", 1);
    design.setup("N", "Black", 89);
    design.setup("N", "Black", 78);
    design.setup("N", "Black", 56);
    design.setup("N", "Black", 34);
    design.setup("N", "Black", 23);
    design.setup("N", "Black", 13);
    design.setup("N", "Black", 101);
    design.setup("N", "Black", 68);
    design.setup("N", "Black", 46);
    design.setup("N", "Black", 14);
    design.setup("N", "Black", 102);
    design.setup("N", "Black", 69);
    design.setup("N", "Black", 47);
    design.setup("N", "Black", 114);
    design.setup("N", "Black", 4);
    design.setup("N", "Black", 92);
    design.setup("N", "Black", 81);
    design.setup("N", "Black", 59);
    design.setup("N", "Black", 37);
    design.setup("N", "Black", 26);
    design.setup("N", "Black", 16);
    design.setup("N", "Black", 104);
    design.setup("N", "Black", 71);
    design.setup("N", "Black", 49);
    design.setup("N", "Black", 116);
    design.setup("N", "Black", 6);
    design.setup("N", "Black", 94);
    design.setup("N", "Black", 83);
    design.setup("N", "Black", 61);
    design.setup("N", "Black", 39);
    design.setup("N", "Black", 28);
    design.setup("N", "Black", 18);
    design.setup("N", "Black", 106);
    design.setup("N", "Black", 73);
    design.setup("N", "Black", 51);
    design.setup("N", "Black", 19);
    design.setup("N", "Black", 107);
    design.setup("N", "Black", 74);
    design.setup("N", "Black", 52);
    design.setup("N", "Black", 119);
    design.setup("N", "Black", 9);
    design.setup("N", "Black", 97);
    design.setup("N", "Black", 86);
    design.setup("N", "Black", 64);
    design.setup("N", "Black", 42);
    design.setup("N", "Black", 31);
    design.setup("N", "Black", 120);
    design.setup("N", "Black", 21);
    design.setup("N", "Black", 10);
    design.setup("N", "Black", 109);
    design.setup("N", "Black", 76);
    design.setup("N", "Black", 54);
    design.setup("N", "White", 88);
    design.setup("N", "White", 77);
    design.setup("N", "White", 55);
    design.setup("N", "White", 33);
    design.setup("N", "White", 22);
    design.setup("N", "White", 12);
    design.setup("N", "White", 100);
    design.setup("N", "White", 67);
    design.setup("N", "White", 45);
    design.setup("N", "White", 112);
    design.setup("N", "White", 2);
    design.setup("N", "White", 90);
    design.setup("N", "White", 79);
    design.setup("N", "White", 57);
    design.setup("N", "White", 35);
    design.setup("N", "White", 24);
    design.setup("N", "White", 113);
    design.setup("N", "White", 3);
    design.setup("N", "White", 91);
    design.setup("N", "White", 80);
    design.setup("N", "White", 58);
    design.setup("N", "White", 36);
    design.setup("N", "White", 25);
    design.setup("N", "White", 15);
    design.setup("N", "White", 103);
    design.setup("N", "White", 70);
    design.setup("N", "White", 48);
    design.setup("N", "White", 115);
    design.setup("N", "White", 5);
    design.setup("N", "White", 93);
    design.setup("N", "White", 82);
    design.setup("N", "White", 38);
    design.setup("N", "White", 27);
    design.setup("N", "White", 17);
    design.setup("N", "White", 105);
    design.setup("N", "White", 72);
    design.setup("N", "White", 50);
    design.setup("N", "White", 117);
    design.setup("N", "White", 7);
    design.setup("N", "White", 95);
    design.setup("N", "White", 84);
    design.setup("N", "White", 62);
    design.setup("N", "White", 40);
    design.setup("N", "White", 29);
    design.setup("N", "White", 118);
    design.setup("N", "White", 8);
    design.setup("N", "White", 96);
    design.setup("N", "White", 85);
    design.setup("N", "White", 63);
    design.setup("N", "White", 41);
    design.setup("N", "White", 30);
    design.setup("N", "White", 20);
    design.setup("N", "White", 108);
    design.setup("N", "White", 75);
    design.setup("N", "White", 53);
    design.setup("N", "White", 98);
    design.setup("N", "White", 87);
    design.setup("N", "White", 65);
    design.setup("N", "White", 43);
    design.setup("N", "White", 32);

}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("BlueKa", "Blue Ka");
    view.defPiece("RedKa", "Red Ka");
    view.defPiece("NBlack", "N Black");
    view.defPiece("NWhite", "N White");
 
    view.defPosition("a11", 5, 5, 32, 32);
    view.defPosition("b11", 37, 5, 32, 32);
    view.defPosition("c11", 69, 5, 32, 32);
    view.defPosition("d11", 101, 5, 32, 32);
    view.defPosition("e11", 133, 5, 32, 32);
    view.defPosition("f11", 165, 5, 32, 32);
    view.defPosition("g11", 197, 5, 32, 32);
    view.defPosition("h11", 229, 5, 32, 32);
    view.defPosition("i11", 261, 5, 32, 32);
    view.defPosition("j11", 293, 5, 32, 32);
    view.defPosition("k11", 325, 5, 32, 32);
    view.defPosition("a10", 5, 37, 32, 32);
    view.defPosition("b10", 37, 37, 32, 32);
    view.defPosition("c10", 69, 37, 32, 32);
    view.defPosition("d10", 101, 37, 32, 32);
    view.defPosition("e10", 133, 37, 32, 32);
    view.defPosition("f10", 165, 37, 32, 32);
    view.defPosition("g10", 197, 37, 32, 32);
    view.defPosition("h10", 229, 37, 32, 32);
    view.defPosition("i10", 261, 37, 32, 32);
    view.defPosition("j10", 293, 37, 32, 32);
    view.defPosition("k10", 325, 37, 32, 32);
    view.defPosition("a9", 5, 69, 32, 32);
    view.defPosition("b9", 37, 69, 32, 32);
    view.defPosition("c9", 69, 69, 32, 32);
    view.defPosition("d9", 101, 69, 32, 32);
    view.defPosition("e9", 133, 69, 32, 32);
    view.defPosition("f9", 165, 69, 32, 32);
    view.defPosition("g9", 197, 69, 32, 32);
    view.defPosition("h9", 229, 69, 32, 32);
    view.defPosition("i9", 261, 69, 32, 32);
    view.defPosition("j9", 293, 69, 32, 32);
    view.defPosition("k9", 325, 69, 32, 32);
    view.defPosition("a8", 5, 101, 32, 32);
    view.defPosition("b8", 37, 101, 32, 32);
    view.defPosition("c8", 69, 101, 32, 32);
    view.defPosition("d8", 101, 101, 32, 32);
    view.defPosition("e8", 133, 101, 32, 32);
    view.defPosition("f8", 165, 101, 32, 32);
    view.defPosition("g8", 197, 101, 32, 32);
    view.defPosition("h8", 229, 101, 32, 32);
    view.defPosition("i8", 261, 101, 32, 32);
    view.defPosition("j8", 293, 101, 32, 32);
    view.defPosition("k8", 325, 101, 32, 32);
    view.defPosition("a7", 5, 133, 32, 32);
    view.defPosition("b7", 37, 133, 32, 32);
    view.defPosition("c7", 69, 133, 32, 32);
    view.defPosition("d7", 101, 133, 32, 32);
    view.defPosition("e7", 133, 133, 32, 32);
    view.defPosition("f7", 165, 133, 32, 32);
    view.defPosition("g7", 197, 133, 32, 32);
    view.defPosition("h7", 229, 133, 32, 32);
    view.defPosition("i7", 261, 133, 32, 32);
    view.defPosition("j7", 293, 133, 32, 32);
    view.defPosition("k7", 325, 133, 32, 32);
    view.defPosition("a6", 5, 165, 32, 32);
    view.defPosition("b6", 37, 165, 32, 32);
    view.defPosition("c6", 69, 165, 32, 32);
    view.defPosition("d6", 101, 165, 32, 32);
    view.defPosition("e6", 133, 165, 32, 32);
    view.defPosition("f6", 165, 165, 32, 32);
    view.defPosition("g6", 197, 165, 32, 32);
    view.defPosition("h6", 229, 165, 32, 32);
    view.defPosition("i6", 261, 165, 32, 32);
    view.defPosition("j6", 293, 165, 32, 32);
    view.defPosition("k6", 325, 165, 32, 32);
    view.defPosition("a5", 5, 197, 32, 32);
    view.defPosition("b5", 37, 197, 32, 32);
    view.defPosition("c5", 69, 197, 32, 32);
    view.defPosition("d5", 101, 197, 32, 32);
    view.defPosition("e5", 133, 197, 32, 32);
    view.defPosition("f5", 165, 197, 32, 32);
    view.defPosition("g5", 197, 197, 32, 32);
    view.defPosition("h5", 229, 197, 32, 32);
    view.defPosition("i5", 261, 197, 32, 32);
    view.defPosition("j5", 293, 197, 32, 32);
    view.defPosition("k5", 325, 197, 32, 32);
    view.defPosition("a4", 5, 229, 32, 32);
    view.defPosition("b4", 37, 229, 32, 32);
    view.defPosition("c4", 69, 229, 32, 32);
    view.defPosition("d4", 101, 229, 32, 32);
    view.defPosition("e4", 133, 229, 32, 32);
    view.defPosition("f4", 165, 229, 32, 32);
    view.defPosition("g4", 197, 229, 32, 32);
    view.defPosition("h4", 229, 229, 32, 32);
    view.defPosition("i4", 261, 229, 32, 32);
    view.defPosition("j4", 293, 229, 32, 32);
    view.defPosition("k4", 325, 229, 32, 32);
    view.defPosition("a3", 5, 261, 32, 32);
    view.defPosition("b3", 37, 261, 32, 32);
    view.defPosition("c3", 69, 261, 32, 32);
    view.defPosition("d3", 101, 261, 32, 32);
    view.defPosition("e3", 133, 261, 32, 32);
    view.defPosition("f3", 165, 261, 32, 32);
    view.defPosition("g3", 197, 261, 32, 32);
    view.defPosition("h3", 229, 261, 32, 32);
    view.defPosition("i3", 261, 261, 32, 32);
    view.defPosition("j3", 293, 261, 32, 32);
    view.defPosition("k3", 325, 261, 32, 32);
    view.defPosition("a2", 5, 293, 32, 32);
    view.defPosition("b2", 37, 293, 32, 32);
    view.defPosition("c2", 69, 293, 32, 32);
    view.defPosition("d2", 101, 293, 32, 32);
    view.defPosition("e2", 133, 293, 32, 32);
    view.defPosition("f2", 165, 293, 32, 32);
    view.defPosition("g2", 197, 293, 32, 32);
    view.defPosition("h2", 229, 293, 32, 32);
    view.defPosition("i2", 261, 293, 32, 32);
    view.defPosition("j2", 293, 293, 32, 32);
    view.defPosition("k2", 325, 293, 32, 32);
    view.defPosition("a1", 5, 325, 32, 32);
    view.defPosition("b1", 37, 325, 32, 32);
    view.defPosition("c1", 69, 325, 32, 32);
    view.defPosition("d1", 101, 325, 32, 32);
    view.defPosition("e1", 133, 325, 32, 32);
    view.defPosition("f1", 165, 325, 32, 32);
    view.defPosition("g1", 197, 325, 32, 32);
    view.defPosition("h1", 229, 325, 32, 32);
    view.defPosition("i1", 261, 325, 32, 32);
    view.defPosition("j1", 293, 325, 32, 32);
    view.defPosition("k1", 325, 325, 32, 32);
}
