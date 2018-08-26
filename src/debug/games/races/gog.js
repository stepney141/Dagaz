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
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-blink", "false");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("n");

    design.addPlayer("White", [1, 0, 3, 2]);
    design.addPlayer("Black", [0, 1, 2, 3]);

    design.addPosition("a8", [0, 1, 9, 0]);
    design.addPosition("b8", [-1, 1, 9, 0]);
    design.addPosition("c8", [-1, 1, 9, 0]);
    design.addPosition("d8", [-1, 1, 9, 0]);
    design.addPosition("e8", [-1, 1, 9, 0]);
    design.addPosition("f8", [-1, 1, 9, 0]);
    design.addPosition("g8", [-1, 1, 9, 0]);
    design.addPosition("h8", [-1, 1, 9, 0]);
    design.addPosition("i8", [-1, 0, 9, 0]);
    design.addPosition("a7", [0, 1, 9, -9]);
    design.addPosition("b7", [-1, 1, 9, -9]);
    design.addPosition("c7", [-1, 1, 9, -9]);
    design.addPosition("d7", [-1, 1, 9, -9]);
    design.addPosition("e7", [-1, 1, 9, -9]);
    design.addPosition("f7", [-1, 1, 9, -9]);
    design.addPosition("g7", [-1, 1, 9, -9]);
    design.addPosition("h7", [-1, 1, 9, -9]);
    design.addPosition("i7", [-1, 0, 9, -9]);
    design.addPosition("a6", [0, 1, 9, -9]);
    design.addPosition("b6", [-1, 1, 9, -9]);
    design.addPosition("c6", [-1, 1, 9, -9]);
    design.addPosition("d6", [-1, 1, 9, -9]);
    design.addPosition("e6", [-1, 1, 9, -9]);
    design.addPosition("f6", [-1, 1, 9, -9]);
    design.addPosition("g6", [-1, 1, 9, -9]);
    design.addPosition("h6", [-1, 1, 9, -9]);
    design.addPosition("i6", [-1, 0, 9, -9]);
    design.addPosition("a5", [0, 1, 9, -9]);
    design.addPosition("b5", [-1, 1, 9, -9]);
    design.addPosition("c5", [-1, 1, 9, -9]);
    design.addPosition("d5", [-1, 1, 9, -9]);
    design.addPosition("e5", [-1, 1, 9, -9]);
    design.addPosition("f5", [-1, 1, 9, -9]);
    design.addPosition("g5", [-1, 1, 9, -9]);
    design.addPosition("h5", [-1, 1, 9, -9]);
    design.addPosition("i5", [-1, 0, 9, -9]);
    design.addPosition("a4", [0, 1, 9, -9]);
    design.addPosition("b4", [-1, 1, 9, -9]);
    design.addPosition("c4", [-1, 1, 9, -9]);
    design.addPosition("d4", [-1, 1, 9, -9]);
    design.addPosition("e4", [-1, 1, 9, -9]);
    design.addPosition("f4", [-1, 1, 9, -9]);
    design.addPosition("g4", [-1, 1, 9, -9]);
    design.addPosition("h4", [-1, 1, 9, -9]);
    design.addPosition("i4", [-1, 0, 9, -9]);
    design.addPosition("a3", [0, 1, 9, -9]);
    design.addPosition("b3", [-1, 1, 9, -9]);
    design.addPosition("c3", [-1, 1, 9, -9]);
    design.addPosition("d3", [-1, 1, 9, -9]);
    design.addPosition("e3", [-1, 1, 9, -9]);
    design.addPosition("f3", [-1, 1, 9, -9]);
    design.addPosition("g3", [-1, 1, 9, -9]);
    design.addPosition("h3", [-1, 1, 9, -9]);
    design.addPosition("i3", [-1, 0, 9, -9]);
    design.addPosition("a2", [0, 1, 9, -9]);
    design.addPosition("b2", [-1, 1, 9, -9]);
    design.addPosition("c2", [-1, 1, 9, -9]);
    design.addPosition("d2", [-1, 1, 9, -9]);
    design.addPosition("e2", [-1, 1, 9, -9]);
    design.addPosition("f2", [-1, 1, 9, -9]);
    design.addPosition("g2", [-1, 1, 9, -9]);
    design.addPosition("h2", [-1, 1, 9, -9]);
    design.addPosition("i2", [-1, 0, 9, -9]);
    design.addPosition("a1", [0, 1, 0, -9]);
    design.addPosition("b1", [-1, 1, 0, -9]);
    design.addPosition("c1", [-1, 1, 0, -9]);
    design.addPosition("d1", [-1, 1, 0, -9]);
    design.addPosition("e1", [-1, 1, 0, -9]);
    design.addPosition("f1", [-1, 1, 0, -9]);
    design.addPosition("g1", [-1, 1, 0, -9]);
    design.addPosition("h1", [-1, 1, 0, -9]);
    design.addPosition("i1", [-1, 0, 0, -9]);

    design.addZone("home", 1, [63, 64, 65, 66, 67, 68, 69, 70, 71, 54, 55, 56, 57, 58, 59, 60, 61, 62, 45, 46, 47, 48, 49, 50, 51, 52, 53]);
    design.addZone("home", 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("General-5", 0, 780);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [1], 0);
    design.addMove(0, 0, [0], 0);
    design.addMove(0, 0, [2], 0);

    design.addPiece("General-4", 1, 695);
    design.addMove(1, 0, [3], 0);
    design.addMove(1, 0, [1], 0);
    design.addMove(1, 0, [0], 0);
    design.addMove(1, 0, [2], 0);

    design.addPiece("General-3", 2, 615);
    design.addMove(2, 0, [3], 0);
    design.addMove(2, 0, [1], 0);
    design.addMove(2, 0, [0], 0);
    design.addMove(2, 0, [2], 0);

    design.addPiece("General-2", 3, 540);
    design.addMove(3, 0, [3], 0);
    design.addMove(3, 0, [1], 0);
    design.addMove(3, 0, [0], 0);
    design.addMove(3, 0, [2], 0);

    design.addPiece("General-1", 4, 470);
    design.addMove(4, 0, [3], 0);
    design.addMove(4, 0, [1], 0);
    design.addMove(4, 0, [0], 0);
    design.addMove(4, 0, [2], 0);

    design.addPiece("Spy", 5, 750);
    design.addMove(5, 0, [3], 0);
    design.addMove(5, 0, [1], 0);
    design.addMove(5, 0, [0], 0);
    design.addMove(5, 0, [2], 0);

    design.addPiece("Colonel-1", 6, 405);
    design.addMove(6, 0, [3], 0);
    design.addMove(6, 0, [1], 0);
    design.addMove(6, 0, [0], 0);
    design.addMove(6, 0, [2], 0);

    design.addPiece("Colonel-2", 7, 345);
    design.addMove(7, 0, [3], 0);
    design.addMove(7, 0, [1], 0);
    design.addMove(7, 0, [0], 0);
    design.addMove(7, 0, [2], 0);

    design.addPiece("Major", 8, 290);
    design.addMove(8, 0, [3], 0);
    design.addMove(8, 0, [1], 0);
    design.addMove(8, 0, [0], 0);
    design.addMove(8, 0, [2], 0);

    design.addPiece("Captain", 9, 240);
    design.addMove(9, 0, [3], 0);
    design.addMove(9, 0, [1], 0);
    design.addMove(9, 0, [0], 0);
    design.addMove(9, 0, [2], 0);

    design.addPiece("Lieutenant-1", 10, 195);
    design.addMove(10, 0, [3], 0);
    design.addMove(10, 0, [1], 0);
    design.addMove(10, 0, [0], 0);
    design.addMove(10, 0, [2], 0);

    design.addPiece("Lieutenant-2", 11, 155);
    design.addMove(11, 0, [3], 0);
    design.addMove(11, 0, [1], 0);
    design.addMove(11, 0, [0], 0);
    design.addMove(11, 0, [2], 0);

    design.addPiece("Private", 12, 137);
    design.addMove(12, 0, [3], 0);
    design.addMove(12, 0, [1], 0);
    design.addMove(12, 0, [0], 0);
    design.addMove(12, 0, [2], 0);

    design.addPiece("Sergeant", 13, 120);
    design.addMove(13, 0, [3], 0);
    design.addMove(13, 0, [1], 0);
    design.addMove(13, 0, [0], 0);
    design.addMove(13, 0, [2], 0);

    design.addPiece("Flag", 14, 10000);
    design.addMove(14, 0, [3], 0);
    design.addMove(14, 0, [1], 0);
    design.addMove(14, 0, [0], 0);
    design.addMove(14, 0, [2], 0);

    design.setup("White", "Flag", 54);
    design.setup("White", "General-5", 45);
    design.setup("White", "General-4", 47);
    design.setup("White", "General-3", 49);
    design.setup("White", "General-2", 57);
    design.setup("White", "General-1", 64);
    design.setup("White", "Colonel-1", 46);
    design.setup("White", "Colonel-2", 53);
    design.setup("White", "Major", 51);
    design.setup("White", "Captain", 52);
    design.setup("White", "Lieutenant-2", 60);
    design.setup("White", "Lieutenant-1", 67);
    design.setup("White", "Sergeant", 62);
    design.setup("White", "Private", 56);
    design.setup("White", "Private", 58);
    design.setup("White", "Private", 59);
    design.setup("White", "Private", 50);
    design.setup("White", "Private", 70);
    design.setup("White", "Private", 61);
    design.setup("White", "Spy", 55);
    design.setup("White", "Spy", 48);
    design.setup("Black", "Flag", 17);
    design.setup("Black", "General-5", 26);
    design.setup("Black", "General-4", 24);
    design.setup("Black", "General-3", 22);
    design.setup("Black", "General-2", 14);
    design.setup("Black", "General-1", 7);
    design.setup("Black", "Colonel-1", 25);
    design.setup("Black", "Colonel-2", 18);
    design.setup("Black", "Major", 20);
    design.setup("Black", "Captain", 19);
    design.setup("Black", "Lieutenant-2", 11);
    design.setup("Black", "Lieutenant-1", 4);
    design.setup("Black", "Sergeant", 9);
    design.setup("Black", "Private", 15);
    design.setup("Black", "Private", 13);
    design.setup("Black", "Private", 12);
    design.setup("Black", "Private", 21);
    design.setup("Black", "Private", 1);
    design.setup("Black", "Private", 10);
    design.setup("Black", "Spy", 16);
    design.setup("Black", "Spy", 23);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteGeneral-5", "White General-5");
    view.defPiece("BlackGeneral-5", "Black General-5");
    view.defPiece("WhiteGeneral-4", "White General-4");
    view.defPiece("BlackGeneral-4", "Black General-4");
    view.defPiece("WhiteGeneral-3", "White General-3");
    view.defPiece("BlackGeneral-3", "Black General-3");
    view.defPiece("WhiteGeneral-2", "White General-2");
    view.defPiece("BlackGeneral-2", "Black General-2");
    view.defPiece("WhiteGeneral-1", "White General-1");
    view.defPiece("BlackGeneral-1", "Black General-1");
    view.defPiece("WhiteSpy", "White Spy");
    view.defPiece("BlackSpy", "Black Spy");
    view.defPiece("WhiteColonel-1", "White Colonel-1");
    view.defPiece("BlackColonel-1", "Black Colonel-1");
    view.defPiece("WhiteColonel-2", "White Colonel-2");
    view.defPiece("BlackColonel-2", "Black Colonel-2");
    view.defPiece("WhiteMajor", "White Major");
    view.defPiece("BlackMajor", "Black Major");
    view.defPiece("WhiteCaptain", "White Captain");
    view.defPiece("BlackCaptain", "Black Captain");
    view.defPiece("WhiteLieutenant-1", "White Lieutenant-1");
    view.defPiece("BlackLieutenant-1", "Black Lieutenant-1");
    view.defPiece("WhiteLieutenant-2", "White Lieutenant-2");
    view.defPiece("BlackLieutenant-2", "Black Lieutenant-2");
    view.defPiece("WhitePrivate", "White Private");
    view.defPiece("BlackPrivate", "Black Private");
    view.defPiece("WhiteSergeant", "White Sergeant");
    view.defPiece("BlackSergeant", "Black Sergeant");
    view.defPiece("WhiteFlag", "White Flag");
    view.defPiece("BlackFlag", "Black Flag");
 
    view.defPosition("a8", 3, 3, 80, 60);
    view.defPosition("b8", 84, 3, 80, 60);
    view.defPosition("c8", 165, 3, 80, 60);
    view.defPosition("d8", 246, 3, 80, 60);
    view.defPosition("e8", 327, 3, 80, 60);
    view.defPosition("f8", 408, 3, 80, 60);
    view.defPosition("g8", 489, 3, 80, 60);
    view.defPosition("h8", 570, 3, 80, 60);
    view.defPosition("i8", 651, 3, 80, 60);
    view.defPosition("a7", 3, 64, 80, 60);
    view.defPosition("b7", 84, 64, 80, 60);
    view.defPosition("c7", 165, 64, 80, 60);
    view.defPosition("d7", 246, 64, 80, 60);
    view.defPosition("e7", 327, 64, 80, 60);
    view.defPosition("f7", 408, 64, 80, 60);
    view.defPosition("g7", 489, 64, 80, 60);
    view.defPosition("h7", 570, 64, 80, 60);
    view.defPosition("i7", 651, 64, 80, 60);
    view.defPosition("a6", 3, 125, 80, 60);
    view.defPosition("b6", 84, 125, 80, 60);
    view.defPosition("c6", 165, 125, 80, 60);
    view.defPosition("d6", 246, 125, 80, 60);
    view.defPosition("e6", 327, 125, 80, 60);
    view.defPosition("f6", 408, 125, 80, 60);
    view.defPosition("g6", 489, 125, 80, 60);
    view.defPosition("h6", 570, 125, 80, 60);
    view.defPosition("i6", 651, 125, 80, 60);
    view.defPosition("a5", 3, 186, 80, 60);
    view.defPosition("b5", 84, 186, 80, 60);
    view.defPosition("c5", 165, 186, 80, 60);
    view.defPosition("d5", 246, 186, 80, 60);
    view.defPosition("e5", 327, 186, 80, 60);
    view.defPosition("f5", 408, 186, 80, 60);
    view.defPosition("g5", 489, 186, 80, 60);
    view.defPosition("h5", 570, 186, 80, 60);
    view.defPosition("i5", 651, 186, 80, 60);
    view.defPosition("a4", 3, 247, 80, 60);
    view.defPosition("b4", 84, 247, 80, 60);
    view.defPosition("c4", 165, 247, 80, 60);
    view.defPosition("d4", 246, 247, 80, 60);
    view.defPosition("e4", 327, 247, 80, 60);
    view.defPosition("f4", 408, 247, 80, 60);
    view.defPosition("g4", 489, 247, 80, 60);
    view.defPosition("h4", 570, 247, 80, 60);
    view.defPosition("i4", 651, 247, 80, 60);
    view.defPosition("a3", 3, 308, 80, 60);
    view.defPosition("b3", 84, 308, 80, 60);
    view.defPosition("c3", 165, 308, 80, 60);
    view.defPosition("d3", 246, 308, 80, 60);
    view.defPosition("e3", 327, 308, 80, 60);
    view.defPosition("f3", 408, 308, 80, 60);
    view.defPosition("g3", 489, 308, 80, 60);
    view.defPosition("h3", 570, 308, 80, 60);
    view.defPosition("i3", 651, 308, 80, 60);
    view.defPosition("a2", 3, 369, 80, 60);
    view.defPosition("b2", 84, 369, 80, 60);
    view.defPosition("c2", 165, 369, 80, 60);
    view.defPosition("d2", 246, 369, 80, 60);
    view.defPosition("e2", 327, 369, 80, 60);
    view.defPosition("f2", 408, 369, 80, 60);
    view.defPosition("g2", 489, 369, 80, 60);
    view.defPosition("h2", 570, 369, 80, 60);
    view.defPosition("i2", 651, 369, 80, 60);
    view.defPosition("a1", 3, 430, 80, 60);
    view.defPosition("b1", 84, 430, 80, 60);
    view.defPosition("c1", 165, 430, 80, 60);
    view.defPosition("d1", 246, 430, 80, 60);
    view.defPosition("e1", 327, 430, 80, 60);
    view.defPosition("f1", 408, 430, 80, 60);
    view.defPosition("g1", 489, 430, 80, 60);
    view.defPosition("h1", 570, 430, 80, 60);
    view.defPosition("i1", 651, 430, 80, 60);
}
