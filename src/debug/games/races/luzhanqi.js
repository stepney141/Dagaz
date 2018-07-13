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
    design.checkVersion("animate-drops", "false");
    design.checkVersion("pass-partial", "true");
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-drops", "true");
    design.checkVersion("show-captures", "false");

    design.addDirection("N");
    design.addDirection("S");
    design.addDirection("E");
    design.addDirection("W");
    design.addDirection("n");
    design.addDirection("s");
    design.addDirection("e");
    design.addDirection("w");
    design.addDirection("nw");
    design.addDirection("se");
    design.addDirection("ne");
    design.addDirection("sw");

    design.addPlayer("South", [1, 0, 3, 2, 5, 4, 7, 6, 9, 8, 11, 10]);
    design.addPlayer("North", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
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

    design.addPosition("a13", [0, 0, 0, 0, 0, 1, 6, 0, 0, 0, 0, 0]);
    design.addPosition("a12", [0, 1, 6, 0, -1, 0, 0, 0, 0, 7, 0, 0]);
    design.addPosition("a11", [-1, 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0]);
    design.addPosition("a10", [-1, 1, 0, 0, 0, 0, 6, 0, 0, 7, 5, 0]);
    design.addPosition("a9", [-1, 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0]);
    design.addPosition("a8", [-1, 25, 6, 0, 0, 0, 0, 0, 0, 0, 5, 0]);
    design.addPosition("b13", [0, 0, 0, 0, 0, 1, 6, -6, 0, 0, 0, 0]);
    design.addPosition("b12", [0, 0, 6, -6, -1, 1, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b11", [0, 0, 0, 0, -1, 1, 6, -6, -7, 7, 5, -5]);
    design.addPosition("b10", [0, 0, 0, 0, -1, 1, 6, -6, 0, 0, 0, 0]);
    design.addPosition("b9", [0, 0, 0, 0, -1, 1, 6, -6, -7, 7, 5, -5]);
    design.addPosition("b8", [0, 0, 6, -6, -1, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c13", [0, 0, 0, 0, 0, 1, 6, -6, 0, 0, 0, 0]);
    design.addPosition("c12", [0, 0, 6, -6, -1, 1, 0, 0, 0, 7, 0, -5]);
    design.addPosition("c11", [0, 0, 0, 0, -1, 1, 6, -6, 0, 0, 0, 0]);
    design.addPosition("c10", [0, 0, 0, 0, -1, 1, 6, -6, -7, 7, 5, -5]);
    design.addPosition("c9", [0, 0, 0, 0, -1, 1, 6, -6, 0, 0, 0, 0]);
    design.addPosition("c8", [0, 14, 6, -6, -1, 0, 0, 0, -7, 0, 5, 0]);
    design.addPosition("d13", [0, 0, 0, 0, 0, 1, 6, -6, 0, 0, 0, 0]);
    design.addPosition("d12", [0, 0, 6, -6, -1, 1, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d11", [0, 0, 0, 0, -1, 1, 6, -6, -7, 7, 5, -5]);
    design.addPosition("d10", [0, 0, 0, 0, -1, 1, 6, -6, 0, 0, 0, 0]);
    design.addPosition("d9", [0, 0, 0, 0, -1, 1, 6, -6, -7, 7, 5, -5]);
    design.addPosition("d8", [0, 0, 6, -6, -1, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e13", [0, 0, 0, 0, 0, 1, 0, -6, 0, 0, 0, 0]);
    design.addPosition("e12", [0, 1, 0, -6, -1, 0, 0, 0, 0, 0, 0, -5]);
    design.addPosition("e11", [-1, 1, 0, 0, 0, 0, 0, -6, 0, 0, 0, 0]);
    design.addPosition("e10", [-1, 1, 0, 0, 0, 0, 0, -6, -7, 0, 0, -5]);
    design.addPosition("e9", [-1, 1, 0, 0, 0, 0, 0, -6, 0, 0, 0, 0]);
    design.addPosition("e8", [-1, 3, 0, -6, 0, 0, 0, 0, -7, 0, 0, 0]);
    design.addPosition("a7", [-25, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c7", [-14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e7", [-3, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a6", [-3, 1, 6, 0, 0, 0, 0, 0, 0, 7, 0, 0]);
    design.addPosition("a5", [-1, 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0]);
    design.addPosition("a4", [-1, 1, 0, 0, 0, 0, 6, 0, 0, 7, 5, 0]);
    design.addPosition("a3", [-1, 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0]);
    design.addPosition("a2", [-1, 0, 6, 0, 0, 1, 0, 0, 0, 0, 5, 0]);
    design.addPosition("a1", [0, 0, 0, 0, -1, 0, 6, 0, 0, 0, 0, 0]);
    design.addPosition("b6", [0, 0, 6, -6, 0, 1, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b5", [0, 0, 0, 0, -1, 1, 6, -6, -7, 7, 5, -5]);
    design.addPosition("b4", [0, 0, 0, 0, -1, 1, 6, -6, 0, 0, 0, 0]);
    design.addPosition("b3", [0, 0, 0, 0, -1, 1, 6, -6, -7, 7, 5, -5]);
    design.addPosition("b2", [0, 0, 6, -6, -1, 1, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b1", [0, 0, 0, 0, -1, 0, 6, -6, 0, 0, 0, 0]);
    design.addPosition("c6", [-14, 0, 6, -6, 0, 1, 0, 0, 0, 7, 0, -5]);
    design.addPosition("c5", [0, 0, 0, 0, -1, 1, 6, -6, 0, 0, 0, 0]);
    design.addPosition("c4", [0, 0, 0, 0, -1, 1, 6, -6, -7, 7, 5, -5]);
    design.addPosition("c3", [0, 0, 0, 0, -1, 1, 6, -6, 0, 0, 0, 0]);
    design.addPosition("c2", [0, 0, 6, -6, -1, 1, 0, 0, -7, 0, 5, 0]);
    design.addPosition("c1", [0, 0, 0, 0, -1, 0, 6, -6, 0, 0, 0, 0]);
    design.addPosition("d6", [0, 0, 6, -6, 0, 1, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d5", [0, 0, 0, 0, -1, 1, 6, -6, -7, 7, 5, -5]);
    design.addPosition("d4", [0, 0, 0, 0, -1, 1, 6, -6, 0, 0, 0, 0]);
    design.addPosition("d3", [0, 0, 0, 0, -1, 1, 6, -6, -7, 7, 5, -5]);
    design.addPosition("d2", [0, 0, 6, -6, -1, 1, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d1", [0, 0, 0, 0, -1, 0, 6, -6, 0, 0, 0, 0]);
    design.addPosition("e6", [-25, 1, 0, -6, 0, 0, 0, 0, 0, 0, 0, -5]);
    design.addPosition("e5", [-1, 1, 0, 0, 0, 0, 0, -6, 0, 0, 0, 0]);
    design.addPosition("e4", [-1, 1, 0, 0, 0, 0, 0, -6, -7, 0, 0, -5]);
    design.addPosition("e3", [-1, 1, 0, 0, 0, 0, 0, -6, 0, 0, 0, 0]);
    design.addPosition("e2", [-1, 0, 0, -6, 0, 1, 0, 0, -7, 0, 0, 0]);
    design.addPosition("e1", [0, 0, 0, 0, -1, 0, 0, -6, 0, 0, 0, 0]);

    design.addZone("safe", 2, [42, 40, 10, 8, 47, 15, 54, 52, 22, 20]);
    design.addZone("safe", 1, [42, 40, 10, 8, 47, 15, 54, 52, 22, 20]);
    design.addZone("cross", 2, [37, 33, 5, 1, 45, 17, 61, 57, 29, 25]);
    design.addZone("cross", 1, [37, 33, 5, 1, 45, 17, 61, 57, 29, 25]);
    design.addZone("hqf", 2, [6, 18]);
    design.addZone("hqf", 1, [44, 56]);
    design.addZone("hqe", 2, [44, 56]);
    design.addZone("hqe", 1, [6, 18]);
    design.addZone("home", 2, [5, 4, 3, 2, 1, 0, 11, 9, 7, 6, 17, 16, 14, 13, 12, 23, 21, 19, 18, 29, 28, 27, 26, 25, 24]);
    design.addZone("home", 1, [38, 37, 36, 35, 34, 33, 44, 43, 41, 39, 50, 49, 48, 46, 45, 56, 55, 53, 51, 62, 61, 60, 59, 58, 57]);
    design.addZone("front", 2, [1, 7, 13, 19, 25, 2, 14, 26, 3, 9, 21, 27, 4, 16, 28, 5, 11, 17, 23, 29]);
    design.addZone("front", 1, [37, 43, 49, 55, 61, 36, 48, 60, 35, 41, 53, 59, 34, 46, 58, 33, 39, 45, 51, 57]);
    design.addZone("rear", 2, [0, 6, 12, 18, 24, 1, 7, 13, 19, 25]);
    design.addZone("rear", 1, [38, 44, 50, 56, 62, 37, 43, 49, 55, 61]);

    design.addCommand(0, ZRF.IN_ZONE,	4);	// home
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
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

    design.addCommand(3, ZRF.IN_ZONE,	5);	// front
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.IN_ZONE,	6);	// rear
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.IN_ZONE,	2);	// hqf
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addPriority(0);			// flagtype
    design.addPriority(1);			// bombtype
    design.addPriority(2);			// droptype
    design.addPriority(3);			// normaltype

    design.addPiece("FieldMarshal", 0);
    design.addDrop(0, 0, [], 2);
    design.addMove(0, 1, [4], 3);
    design.addMove(0, 1, [5], 3);
    design.addMove(0, 1, [7], 3);
    design.addMove(0, 1, [6], 3);
    design.addMove(0, 1, [8], 3);
    design.addMove(0, 1, [11], 3);
    design.addMove(0, 1, [10], 3);
    design.addMove(0, 1, [9], 3);
    design.addMove(0, 2, [0, 0], 3);
    design.addMove(0, 2, [1, 1], 3);
    design.addMove(0, 2, [3, 3], 3);
    design.addMove(0, 2, [2, 2], 3);

    design.addPiece("General", 1);
    design.addDrop(1, 0, [], 2);
    design.addMove(1, 1, [4], 3);
    design.addMove(1, 1, [5], 3);
    design.addMove(1, 1, [7], 3);
    design.addMove(1, 1, [6], 3);
    design.addMove(1, 1, [8], 3);
    design.addMove(1, 1, [11], 3);
    design.addMove(1, 1, [10], 3);
    design.addMove(1, 1, [9], 3);
    design.addMove(1, 2, [0, 0], 3);
    design.addMove(1, 2, [1, 1], 3);
    design.addMove(1, 2, [3, 3], 3);
    design.addMove(1, 2, [2, 2], 3);

    design.addPiece("MajorGeneral", 2);
    design.addDrop(2, 0, [], 2);
    design.addMove(2, 1, [4], 3);
    design.addMove(2, 1, [5], 3);
    design.addMove(2, 1, [7], 3);
    design.addMove(2, 1, [6], 3);
    design.addMove(2, 1, [8], 3);
    design.addMove(2, 1, [11], 3);
    design.addMove(2, 1, [10], 3);
    design.addMove(2, 1, [9], 3);
    design.addMove(2, 2, [0, 0], 3);
    design.addMove(2, 2, [1, 1], 3);
    design.addMove(2, 2, [3, 3], 3);
    design.addMove(2, 2, [2, 2], 3);

    design.addPiece("BrigadierGeneral", 3);
    design.addDrop(3, 0, [], 2);
    design.addMove(3, 1, [4], 3);
    design.addMove(3, 1, [5], 3);
    design.addMove(3, 1, [7], 3);
    design.addMove(3, 1, [6], 3);
    design.addMove(3, 1, [8], 3);
    design.addMove(3, 1, [11], 3);
    design.addMove(3, 1, [10], 3);
    design.addMove(3, 1, [9], 3);
    design.addMove(3, 2, [0, 0], 3);
    design.addMove(3, 2, [1, 1], 3);
    design.addMove(3, 2, [3, 3], 3);
    design.addMove(3, 2, [2, 2], 3);

    design.addPiece("Colonel", 4);
    design.addDrop(4, 0, [], 2);
    design.addMove(4, 1, [4], 3);
    design.addMove(4, 1, [5], 3);
    design.addMove(4, 1, [7], 3);
    design.addMove(4, 1, [6], 3);
    design.addMove(4, 1, [8], 3);
    design.addMove(4, 1, [11], 3);
    design.addMove(4, 1, [10], 3);
    design.addMove(4, 1, [9], 3);
    design.addMove(4, 2, [0, 0], 3);
    design.addMove(4, 2, [1, 1], 3);
    design.addMove(4, 2, [3, 3], 3);
    design.addMove(4, 2, [2, 2], 3);

    design.addPiece("Major", 5);
    design.addDrop(5, 0, [], 2);
    design.addMove(5, 1, [4], 3);
    design.addMove(5, 1, [5], 3);
    design.addMove(5, 1, [7], 3);
    design.addMove(5, 1, [6], 3);
    design.addMove(5, 1, [8], 3);
    design.addMove(5, 1, [11], 3);
    design.addMove(5, 1, [10], 3);
    design.addMove(5, 1, [9], 3);
    design.addMove(5, 2, [0, 0], 3);
    design.addMove(5, 2, [1, 1], 3);
    design.addMove(5, 2, [3, 3], 3);
    design.addMove(5, 2, [2, 2], 3);

    design.addPiece("Captain", 6);
    design.addDrop(6, 0, [], 2);
    design.addMove(6, 1, [4], 3);
    design.addMove(6, 1, [5], 3);
    design.addMove(6, 1, [7], 3);
    design.addMove(6, 1, [6], 3);
    design.addMove(6, 1, [8], 3);
    design.addMove(6, 1, [11], 3);
    design.addMove(6, 1, [10], 3);
    design.addMove(6, 1, [9], 3);
    design.addMove(6, 2, [0, 0], 3);
    design.addMove(6, 2, [1, 1], 3);
    design.addMove(6, 2, [3, 3], 3);
    design.addMove(6, 2, [2, 2], 3);

    design.addPiece("Lieutenant", 7);
    design.addDrop(7, 0, [], 2);
    design.addMove(7, 1, [4], 3);
    design.addMove(7, 1, [5], 3);
    design.addMove(7, 1, [7], 3);
    design.addMove(7, 1, [6], 3);
    design.addMove(7, 1, [8], 3);
    design.addMove(7, 1, [11], 3);
    design.addMove(7, 1, [10], 3);
    design.addMove(7, 1, [9], 3);
    design.addMove(7, 2, [0, 0], 3);
    design.addMove(7, 2, [1, 1], 3);
    design.addMove(7, 2, [3, 3], 3);
    design.addMove(7, 2, [2, 2], 3);

    design.addPiece("Engineer", 8);
    design.addDrop(8, 0, [], 2);

    design.addPiece("Bomb", 9);
    design.addDrop(9, 3, [], 2);

    design.addPiece("Landmine", 10);
    design.addDrop(10, 4, [], 1);

    design.addPiece("Flag", 11);
    design.addDrop(11, 5, [], 0);

    design.reserve("North", "FieldMarshal", 0);
    design.reserve("North", "General", 0);
    design.reserve("North", "MajorGeneral", 0);
    design.reserve("North", "BrigadierGeneral", 0);
    design.reserve("North", "Colonel", 0);
    design.reserve("North", "Major", 0);
    design.reserve("North", "Captain", 0);
    design.reserve("North", "Lieutenant", 0);
    design.reserve("North", "Engineer", 0);
    design.reserve("North", "Bomb", 0);
    design.reserve("North", "Landmine", 0);
    design.reserve("North", "Flag", 0);
    design.reserve("South", "FieldMarshal", 1);
    design.reserve("South", "General", 1);
    design.reserve("South", "MajorGeneral", 2);
    design.reserve("South", "BrigadierGeneral", 2);
    design.reserve("South", "Colonel", 2);
    design.reserve("South", "Major", 2);
    design.reserve("South", "Captain", 3);
    design.reserve("South", "Lieutenant", 3);
    design.reserve("South", "Engineer", 3);
    design.reserve("South", "Bomb", 2);
    design.reserve("South", "Landmine", 3);
    design.reserve("South", "Flag", 1);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("SouthFieldMarshal", "South FieldMarshal");
    view.defPiece("NorthFieldMarshal", "North FieldMarshal");
    view.defPiece("SouthGeneral", "South General");
    view.defPiece("NorthGeneral", "North General");
    view.defPiece("SouthMajorGeneral", "South MajorGeneral");
    view.defPiece("NorthMajorGeneral", "North MajorGeneral");
    view.defPiece("SouthBrigadierGeneral", "South BrigadierGeneral");
    view.defPiece("NorthBrigadierGeneral", "North BrigadierGeneral");
    view.defPiece("SouthColonel", "South Colonel");
    view.defPiece("NorthColonel", "North Colonel");
    view.defPiece("SouthMajor", "South Major");
    view.defPiece("NorthMajor", "North Major");
    view.defPiece("SouthCaptain", "South Captain");
    view.defPiece("NorthCaptain", "North Captain");
    view.defPiece("SouthLieutenant", "South Lieutenant");
    view.defPiece("NorthLieutenant", "North Lieutenant");
    view.defPiece("SouthEngineer", "South Engineer");
    view.defPiece("NorthEngineer", "North Engineer");
    view.defPiece("SouthBomb", "South Bomb");
    view.defPiece("NorthBomb", "North Bomb");
    view.defPiece("SouthLandmine", "South Landmine");
    view.defPiece("NorthLandmine", "North Landmine");
    view.defPiece("SouthFlag", "South Flag");
    view.defPiece("NorthFlag", "North Flag");
 
    view.defPosition("a13", 0, 8, 91, 43);
    view.defPosition("a12", 0, 50, 91, 43);
    view.defPosition("a11", 0, 90, 91, 43);
    view.defPosition("a10", 0, 133, 91, 43);
    view.defPosition("a9", 0, 176, 91, 43);
    view.defPosition("a8", 0, 219, 91, 43);
    view.defPosition("b13", 84, 8, 91, 43);
    view.defPosition("b12", 84, 50, 91, 43);
    view.defPosition("b11", 84, 90, 91, 43);
    view.defPosition("b10", 84, 133, 91, 43);
    view.defPosition("b9", 84, 176, 91, 43);
    view.defPosition("b8", 84, 219, 91, 43);
    view.defPosition("c13", 180, 8, 91, 43);
    view.defPosition("c12", 180, 50, 91, 43);
    view.defPosition("c11", 180, 90, 91, 43);
    view.defPosition("c10", 180, 133, 91, 43);
    view.defPosition("c9", 180, 176, 91, 43);
    view.defPosition("c8", 180, 219, 91, 43);
    view.defPosition("d13", 273, 8, 91, 43);
    view.defPosition("d12", 273, 50, 91, 43);
    view.defPosition("d11", 273, 90, 91, 43);
    view.defPosition("d10", 273, 133, 91, 43);
    view.defPosition("d9", 273, 176, 91, 43);
    view.defPosition("d8", 273, 219, 91, 43);
    view.defPosition("e13", 359, 8, 91, 43);
    view.defPosition("e12", 359, 50, 91, 43);
    view.defPosition("e11", 359, 90, 91, 43);
    view.defPosition("e10", 359, 133, 91, 43);
    view.defPosition("e9", 359, 176, 91, 36);
    view.defPosition("e8", 359, 219, 91, 43);
    view.defPosition("a7", 0, 282, 91, 43);
    view.defPosition("c7", 180, 282, 91, 43);
    view.defPosition("e7", 359, 282, 91, 43);
    view.defPosition("a6", 0, 347, 91, 43);
    view.defPosition("a5", 0, 388, 91, 43);
    view.defPosition("a4", 0, 431, 91, 43);
    view.defPosition("a3", 0, 474, 91, 43);
    view.defPosition("a2", 0, 514, 91, 43);
    view.defPosition("a1", 0, 556, 91, 43);
    view.defPosition("b6", 84, 347, 91, 43);
    view.defPosition("b5", 84, 388, 91, 43);
    view.defPosition("b4", 84, 431, 91, 43);
    view.defPosition("b3", 84, 474, 91, 43);
    view.defPosition("b2", 84, 514, 91, 43);
    view.defPosition("b1", 84, 556, 91, 43);
    view.defPosition("c6", 180, 347, 91, 43);
    view.defPosition("c5", 180, 388, 91, 43);
    view.defPosition("c4", 180, 431, 91, 43);
    view.defPosition("c3", 180, 474, 91, 43);
    view.defPosition("c2", 180, 514, 91, 43);
    view.defPosition("c1", 180, 556, 91, 43);
    view.defPosition("d6", 273, 347, 91, 43);
    view.defPosition("d5", 273, 388, 91, 43);
    view.defPosition("d4", 273, 431, 91, 43);
    view.defPosition("d3", 273, 474, 91, 43);
    view.defPosition("d2", 273, 514, 91, 43);
    view.defPosition("d1", 273, 556, 91, 43);
    view.defPosition("e6", 359, 347, 91, 43);
    view.defPosition("e5", 359, 388, 91, 43);
    view.defPosition("e4", 359, 431, 91, 43);
    view.defPosition("e3", 359, 474, 91, 43);
    view.defPosition("e2", 359, 514, 91, 43);
    view.defPosition("e1", 359, 556, 91, 43);
}
