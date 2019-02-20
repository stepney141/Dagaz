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
    design.checkVersion("show-captures", "false");
    design.checkVersion("advisor-wait", "5");

    design.addDirection("s"); // 0
    design.addDirection("e"); // 1
    design.addDirection("w"); // 2
    design.addDirection("n"); // 3

    design.addPlayer("Red", [3, 2, 1, 0]);
    design.addPlayer("Blue", [0, 1, 2, 3]);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.repeatMark();
    design.addTurn(1);
    design.addTurn(2);

    design.addPosition("a9", [10, 1, 0, 0]);
    design.addPosition("b9", [10, 1, -1, 0]);
    design.addPosition("c9", [10, 1, -1, 0]);
    design.addPosition("d9", [10, 1, -1, 0]);
    design.addPosition("e9", [10, 1, -1, 0]);
    design.addPosition("f9", [10, 1, -1, 0]);
    design.addPosition("g9", [10, 1, -1, 0]);
    design.addPosition("h9", [10, 1, -1, 0]);
    design.addPosition("i9", [10, 1, -1, 0]);
    design.addPosition("j9", [10, 0, -1, 0]);
    design.addPosition("a8", [10, 1, 0, -10]);
    design.addPosition("b8", [10, 1, -1, -10]);
    design.addPosition("c8", [10, 1, -1, -10]);
    design.addPosition("d8", [10, 1, -1, -10]);
    design.addPosition("e8", [10, 1, -1, -10]);
    design.addPosition("f8", [10, 1, -1, -10]);
    design.addPosition("g8", [10, 1, -1, -10]);
    design.addPosition("h8", [10, 1, -1, -10]);
    design.addPosition("i8", [10, 1, -1, -10]);
    design.addPosition("j8", [10, 0, -1, -10]);
    design.addPosition("a7", [10, 1, 0, -10]);
    design.addPosition("b7", [10, 1, -1, -10]);
    design.addPosition("c7", [10, 1, -1, -10]);
    design.addPosition("d7", [10, 1, -1, -10]);
    design.addPosition("e7", [10, 1, -1, -10]);
    design.addPosition("f7", [10, 1, -1, -10]);
    design.addPosition("g7", [10, 1, -1, -10]);
    design.addPosition("h7", [10, 1, -1, -10]);
    design.addPosition("i7", [10, 1, -1, -10]);
    design.addPosition("j7", [10, 0, -1, -10]);
    design.addPosition("a6", [10, 1, 0, -10]);
    design.addPosition("b6", [10, 1, -1, -10]);
    design.addPosition("c6", [0, 1, -1, -10]);
    design.addPosition("d6", [0, 1, -1, -10]);
    design.addPosition("e6", [10, 1, -1, -10]);
    design.addPosition("f6", [10, 1, -1, -10]);
    design.addPosition("g6", [0, 1, -1, -10]);
    design.addPosition("h6", [0, 1, -1, -10]);
    design.addPosition("i6", [10, 1, -1, -10]);
    design.addPosition("j6", [10, 0, -1, -10]);
    design.addPosition("a5", [10, 1, 0, -10]);
    design.addPosition("b5", [10, 0, -1, -10]);
    design.addPosition("c5", [0, 1, 2, 3]);
    design.addPosition("d5", [0, 1, 2, 3]);
    design.addPosition("e5", [10, 1, 0, -10]);
    design.addPosition("f5", [10, 0, -1, -10]);
    design.addPosition("g5", [0, 1, 2, 3]);
    design.addPosition("h5", [0, 1, 2, 3]);
    design.addPosition("i5", [10, 1, 0, -10]);
    design.addPosition("j5", [10, 0, -1, -10]);
    design.addPosition("a4", [10, 1, 0, -10]);
    design.addPosition("b4", [10, 0, -1, -10]);
    design.addPosition("c4", [0, 1, 2, 3]);
    design.addPosition("d4", [0, 1, 2, 3]);
    design.addPosition("e4", [10, 1, 0, -10]);
    design.addPosition("f4", [10, 0, -1, -10]);
    design.addPosition("g4", [0, 1, 2, 3]);
    design.addPosition("h4", [0, 1, 2, 3]);
    design.addPosition("i4", [10, 1, 0, -10]);
    design.addPosition("j4", [10, 0, -1, -10]);
    design.addPosition("a3", [10, 1, 0, -10]);
    design.addPosition("b3", [10, 1, -1, -10]);
    design.addPosition("c3", [10, 1, -1, 0]);
    design.addPosition("d3", [10, 1, -1, 0]);
    design.addPosition("e3", [10, 1, -1, -10]);
    design.addPosition("f3", [10, 1, -1, -10]);
    design.addPosition("g3", [10, 1, -1, 0]);
    design.addPosition("h3", [10, 1, -1, 0]);
    design.addPosition("i3", [10, 1, -1, -10]);
    design.addPosition("j3", [10, 0, -1, -10]);
    design.addPosition("a2", [10, 1, 0, -10]);
    design.addPosition("b2", [10, 1, -1, -10]);
    design.addPosition("c2", [10, 1, -1, -10]);
    design.addPosition("d2", [10, 1, -1, -10]);
    design.addPosition("e2", [10, 1, -1, -10]);
    design.addPosition("f2", [10, 1, -1, -10]);
    design.addPosition("g2", [10, 1, -1, -10]);
    design.addPosition("h2", [10, 1, -1, -10]);
    design.addPosition("i2", [10, 1, -1, -10]);
    design.addPosition("j2", [10, 0, -1, -10]);
    design.addPosition("a1", [10, 1, 0, -10]);
    design.addPosition("b1", [10, 1, -1, -10]);
    design.addPosition("c1", [10, 1, -1, -10]);
    design.addPosition("d1", [10, 1, -1, -10]);
    design.addPosition("e1", [10, 1, -1, -10]);
    design.addPosition("f1", [10, 1, -1, -10]);
    design.addPosition("g1", [10, 1, -1, -10]);
    design.addPosition("h1", [10, 1, -1, -10]);
    design.addPosition("i1", [10, 1, -1, -10]);
    design.addPosition("j1", [10, 0, -1, -10]);
    design.addPosition("a0", [0, 1, 0, -10]);
    design.addPosition("b0", [0, 1, -1, -10]);
    design.addPosition("c0", [0, 1, -1, -10]);
    design.addPosition("d0", [0, 1, -1, -10]);
    design.addPosition("e0", [0, 1, -1, -10]);
    design.addPosition("f0", [0, 1, -1, -10]);
    design.addPosition("g0", [0, 1, -1, -10]);
    design.addPosition("h0", [0, 1, -1, -10]);
    design.addPosition("i0", [0, 1, -1, -10]);
    design.addPosition("j0", [0, 0, -1, -10]);

    design.addZone("home-zone", 1, [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69]);
    design.addZone("home-zone", 2, [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.IN_ZONE,	0);	// home-zone
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	7);
    design.addCommand(2, ZRF.FORK,	3);
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end
    design.addCommand(2, ZRF.PARAM,	1);	// $2
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.JUMP,	-8);
    design.addCommand(2, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addPriority(0);			// priority-type
    design.addPriority(1);			// drop-type
    design.addPriority(2);			// normal-type

    design.addPiece("Flag", 0, 10000);
    design.addDrop(0, 0, [], 0);

    design.addPiece("Spy", 1, 100);
    design.addDrop(1, 0, [], 1);
    design.addMove(1, 1, [3], 2);
    design.addMove(1, 1, [1], 2);
    design.addMove(1, 1, [2], 2);
    design.addMove(1, 1, [0], 2);

    design.addPiece("Scout", 2, 50);
    design.addDrop(2, 0, [], 1);
    design.addMove(2, 2, [3, 3], 2);
    design.addMove(2, 2, [1, 1], 2);
    design.addMove(2, 2, [2, 2], 2);
    design.addMove(2, 2, [0, 0], 2);

    design.addPiece("Disarmer", 3, 200);
    design.addDrop(3, 0, [], 1);
    design.addMove(3, 1, [3], 2);
    design.addMove(3, 1, [1], 2);
    design.addMove(3, 1, [2], 2);
    design.addMove(3, 1, [0], 2);

    design.addPiece("Sergeant", 4, 40);
    design.addDrop(4, 0, [], 1);
    design.addMove(4, 1, [3], 2);
    design.addMove(4, 1, [1], 2);
    design.addMove(4, 1, [2], 2);
    design.addMove(4, 1, [0], 2);

    design.addPiece("Lieutenant", 5, 50);
    design.addDrop(5, 0, [], 1);
    design.addMove(5, 1, [3], 2);
    design.addMove(5, 1, [1], 2);
    design.addMove(5, 1, [2], 2);
    design.addMove(5, 1, [0], 2);

    design.addPiece("Captain", 6, 60);
    design.addDrop(6, 0, [], 1);
    design.addMove(6, 1, [3], 2);
    design.addMove(6, 1, [1], 2);
    design.addMove(6, 1, [2], 2);
    design.addMove(6, 1, [0], 2);

    design.addPiece("Major", 7, 70);
    design.addDrop(7, 0, [], 1);
    design.addMove(7, 1, [3], 2);
    design.addMove(7, 1, [1], 2);
    design.addMove(7, 1, [2], 2);
    design.addMove(7, 1, [0], 2);

    design.addPiece("Brigadier", 8, 80);
    design.addDrop(8, 0, [], 1);
    design.addMove(8, 1, [3], 2);
    design.addMove(8, 1, [1], 2);
    design.addMove(8, 1, [2], 2);
    design.addMove(8, 1, [0], 2);

    design.addPiece("General", 9, 90);
    design.addDrop(9, 0, [], 1);
    design.addMove(9, 1, [3], 2);
    design.addMove(9, 1, [1], 2);
    design.addMove(9, 1, [2], 2);
    design.addMove(9, 1, [0], 2);

    design.addPiece("Commandant", 10, 100);
    design.addDrop(10, 0, [], 1);
    design.addMove(10, 1, [3], 2);
    design.addMove(10, 1, [1], 2);
    design.addMove(10, 1, [2], 2);
    design.addMove(10, 1, [0], 2);

    design.addPiece("Bomb", 11, 2);
    design.addDrop(11, 0, [], 0);

    design.reserve("Red", "Flag", 1);
    design.reserve("Red", "Spy", 1);
    design.reserve("Red", "Scout", 8);
    design.reserve("Red", "Disarmer", 5);
    design.reserve("Red", "Sergeant", 4);
    design.reserve("Red", "Lieutenant", 4);
    design.reserve("Red", "Captain", 4);
    design.reserve("Red", "Major", 3);
    design.reserve("Red", "Brigadier", 2);
    design.reserve("Red", "General", 1);
    design.reserve("Red", "Commandant", 1);
    design.reserve("Red", "Bomb", 6);
    design.reserve("Blue", "Flag", 0);
    design.reserve("Blue", "Spy", 0);
    design.reserve("Blue", "Scout", 0);
    design.reserve("Blue", "Disarmer", 0);
    design.reserve("Blue", "Sergeant", 0);
    design.reserve("Blue", "Lieutenant", 0);
    design.reserve("Blue", "Captain", 0);
    design.reserve("Blue", "Major", 0);
    design.reserve("Blue", "Brigadier", 0);
    design.reserve("Blue", "General", 0);
    design.reserve("Blue", "Commandant", 0);
    design.reserve("Blue", "Bomb", 0);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("RedFlag", "Red Flag");
    view.defPiece("BlueFlag", "Blue Flag");
    view.defPiece("RedSpy", "Red Spy");
    view.defPiece("BlueSpy", "Blue Spy");
    view.defPiece("RedScout", "Red Scout");
    view.defPiece("BlueScout", "Blue Scout");
    view.defPiece("RedDisarmer", "Red Disarmer");
    view.defPiece("BlueDisarmer", "Blue Disarmer");
    view.defPiece("RedSergeant", "Red Sergeant");
    view.defPiece("BlueSergeant", "Blue Sergeant");
    view.defPiece("RedLieutenant", "Red Lieutenant");
    view.defPiece("BlueLieutenant", "Blue Lieutenant");
    view.defPiece("RedCaptain", "Red Captain");
    view.defPiece("BlueCaptain", "Blue Captain");
    view.defPiece("RedMajor", "Red Major");
    view.defPiece("BlueMajor", "Blue Major");
    view.defPiece("RedBrigadier", "Red Brigadier");
    view.defPiece("BlueBrigadier", "Blue Brigadier");
    view.defPiece("RedGeneral", "Red General");
    view.defPiece("BlueGeneral", "Blue General");
    view.defPiece("RedCommandant", "Red Commandant");
    view.defPiece("BlueCommandant", "Blue Commandant");
    view.defPiece("RedBomb", "Red Bomb");
    view.defPiece("BlueBomb", "Blue Bomb");
    view.defPiece("Ko", "Ko");
 
    view.defPosition("a9", 0, 0, 40, 40);
    view.defPosition("b9", 40, 0, 40, 40);
    view.defPosition("c9", 80, 0, 40, 40);
    view.defPosition("d9", 120, 0, 40, 40);
    view.defPosition("e9", 160, 0, 40, 40);
    view.defPosition("f9", 200, 0, 40, 40);
    view.defPosition("g9", 240, 0, 40, 40);
    view.defPosition("h9", 280, 0, 40, 40);
    view.defPosition("i9", 320, 0, 40, 40);
    view.defPosition("j9", 360, 0, 40, 40);
    view.defPosition("a8", 0, 40, 40, 40);
    view.defPosition("b8", 40, 40, 40, 40);
    view.defPosition("c8", 80, 40, 40, 40);
    view.defPosition("d8", 120, 40, 40, 40);
    view.defPosition("e8", 160, 40, 40, 40);
    view.defPosition("f8", 200, 40, 40, 40);
    view.defPosition("g8", 240, 40, 40, 40);
    view.defPosition("h8", 280, 40, 40, 40);
    view.defPosition("i8", 320, 40, 40, 40);
    view.defPosition("j8", 360, 40, 40, 40);
    view.defPosition("a7", 0, 80, 40, 40);
    view.defPosition("b7", 40, 80, 40, 40);
    view.defPosition("c7", 80, 80, 40, 40);
    view.defPosition("d7", 120, 80, 40, 40);
    view.defPosition("e7", 160, 80, 40, 40);
    view.defPosition("f7", 200, 80, 40, 40);
    view.defPosition("g7", 240, 80, 40, 40);
    view.defPosition("h7", 280, 80, 40, 40);
    view.defPosition("i7", 320, 80, 40, 40);
    view.defPosition("j7", 360, 80, 40, 40);
    view.defPosition("a6", 0, 120, 40, 40);
    view.defPosition("b6", 40, 120, 40, 40);
    view.defPosition("c6", 80, 120, 40, 40);
    view.defPosition("d6", 120, 120, 40, 40);
    view.defPosition("e6", 160, 120, 40, 40);
    view.defPosition("f6", 200, 120, 40, 40);
    view.defPosition("g6", 240, 120, 40, 40);
    view.defPosition("h6", 280, 120, 40, 40);
    view.defPosition("i6", 320, 120, 40, 40);
    view.defPosition("j6", 360, 120, 40, 40);
    view.defPosition("a5", 0, 160, 40, 40);
    view.defPosition("b5", 40, 160, 40, 40);
    view.defPosition("c5", 80, 160, 40, 40);
    view.defPosition("d5", 120, 160, 40, 40);
    view.defPosition("e5", 160, 160, 40, 40);
    view.defPosition("f5", 200, 160, 40, 40);
    view.defPosition("g5", 240, 160, 40, 40);
    view.defPosition("h5", 280, 160, 40, 40);
    view.defPosition("i5", 320, 160, 40, 40);
    view.defPosition("j5", 360, 160, 40, 40);
    view.defPosition("a4", 0, 200, 40, 40);
    view.defPosition("b4", 40, 200, 40, 40);
    view.defPosition("c4", 80, 200, 40, 40);
    view.defPosition("d4", 120, 200, 40, 40);
    view.defPosition("e4", 160, 200, 40, 40);
    view.defPosition("f4", 200, 200, 40, 40);
    view.defPosition("g4", 240, 200, 40, 40);
    view.defPosition("h4", 280, 200, 40, 40);
    view.defPosition("i4", 320, 200, 40, 40);
    view.defPosition("j4", 360, 200, 40, 40);
    view.defPosition("a3", 0, 240, 40, 40);
    view.defPosition("b3", 40, 240, 40, 40);
    view.defPosition("c3", 80, 240, 40, 40);
    view.defPosition("d3", 120, 240, 40, 40);
    view.defPosition("e3", 160, 240, 40, 40);
    view.defPosition("f3", 200, 240, 40, 40);
    view.defPosition("g3", 240, 240, 40, 40);
    view.defPosition("h3", 280, 240, 40, 40);
    view.defPosition("i3", 320, 240, 40, 40);
    view.defPosition("j3", 360, 240, 40, 40);
    view.defPosition("a2", 0, 280, 40, 40);
    view.defPosition("b2", 40, 280, 40, 40);
    view.defPosition("c2", 80, 280, 40, 40);
    view.defPosition("d2", 120, 280, 40, 40);
    view.defPosition("e2", 160, 280, 40, 40);
    view.defPosition("f2", 200, 280, 40, 40);
    view.defPosition("g2", 240, 280, 40, 40);
    view.defPosition("h2", 280, 280, 40, 40);
    view.defPosition("i2", 320, 280, 40, 40);
    view.defPosition("j2", 360, 280, 40, 40);
    view.defPosition("a1", 0, 320, 40, 40);
    view.defPosition("b1", 40, 320, 40, 40);
    view.defPosition("c1", 80, 320, 40, 40);
    view.defPosition("d1", 120, 320, 40, 40);
    view.defPosition("e1", 160, 320, 40, 40);
    view.defPosition("f1", 200, 320, 40, 40);
    view.defPosition("g1", 240, 320, 40, 40);
    view.defPosition("h1", 280, 320, 40, 40);
    view.defPosition("i1", 320, 320, 40, 40);
    view.defPosition("j1", 360, 320, 40, 40);
    view.defPosition("a0", 0, 360, 40, 40);
    view.defPosition("b0", 40, 360, 40, 40);
    view.defPosition("c0", 80, 360, 40, 40);
    view.defPosition("d0", 120, 360, 40, 40);
    view.defPosition("e0", 160, 360, 40, 40);
    view.defPosition("f0", 200, 360, 40, 40);
    view.defPosition("g0", 240, 360, 40, 40);
    view.defPosition("h0", 280, 360, 40, 40);
    view.defPosition("i0", 320, 360, 40, 40);
    view.defPosition("j0", 360, 360, 40, 40);
}
