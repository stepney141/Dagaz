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
    design.checkVersion("pass-turn", "forced");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-captures", "false");
    design.checkVersion("show-drops", "false");
    design.checkVersion("advisor-wait", "5");

    design.addDirection("se"); // 0
    design.addDirection("s");  // 1
    design.addDirection("sw"); // 2
    design.addDirection("e");  // 3
    design.addDirection("w");  // 4
    design.addDirection("ne"); // 5
    design.addDirection("nw"); // 6
    design.addDirection("n");  // 7

    design.addPlayer("White", [6, 7, 5, 4, 3, 2, 0, 1]);
    design.addPlayer("Black", [5, 7, 6, 3, 4, 0, 2, 1]);
    design.addRandom(1, [0]);
    design.addTurn(1, [1, 2, 3, 4, 5, 6, 7]);
    design.addRandom(2, [0]);
    design.addTurn(2, [1, 2, 3, 4, 5, 6, 7]);

    design.addPosition("d16", [0, 4, 5, 0, 1, 0, 0, 0]);
    design.addPosition("b16", [3, 4, 5, -1, 1, 0, 0, 0]);
    design.addPosition("c16", [3, 4, 5, -1, 1, 0, 0, 0]);
    design.addPosition("a16", [3, 4, 0, -1, 0, 0, 0, 0]);
    design.addPosition("d15", [0, 4, 5, 0, 1, 0, -3, -4]);
    design.addPosition("b15", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("c15", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("a15", [3, 4, 0, -1, 0, -5, 0, -4]);
    design.addPosition("d14", [0, 4, 5, 0, 1, 0, -3, -4]);
    design.addPosition("b14", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("c14", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("a14", [3, 4, 0, -1, 0, -5, 0, -4]);
    design.addPosition("d13", [0, 4, 5, 0, 1, 0, -3, -4]);
    design.addPosition("b13", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("c13", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("a13", [3, 4, 0, -1, 0, -5, 0, -4]);
    design.addPosition("d12", [0, 4, 5, 0, 1, 0, -3, -4]);
    design.addPosition("b12", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("c12", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("a12", [3, 4, 0, -1, 0, -5, 0, -4]);
    design.addPosition("d11", [0, 4, 5, 0, 1, 0, -3, -4]);
    design.addPosition("b11", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("c11", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("a11", [3, 4, 0, -1, 0, -5, 0, -4]);
    design.addPosition("d10", [0, 4, 5, 0, 1, 0, -3, -4]);
    design.addPosition("b10", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("c10", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("a10", [3, 4, 0, -1, 0, -5, 0, -4]);
    design.addPosition("d9", [0, 4, 5, 0, 1, 0, -3, -4]);
    design.addPosition("b9", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("c9", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("a9", [3, 4, 0, -1, 0, -5, 0, -4]);
    design.addPosition("d8", [0, 4, 5, 0, 1, 0, -3, -4]);
    design.addPosition("b8", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("c8", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("a8", [3, 4, 0, -1, 0, -5, 0, -4]);
    design.addPosition("d7", [0, 4, 5, 0, 1, 0, -3, -4]);
    design.addPosition("b7", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("c7", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("a7", [3, 4, 0, -1, 0, -5, 0, -4]);
    design.addPosition("d6", [0, 4, 5, 0, 1, 0, -3, -4]);
    design.addPosition("b6", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("c6", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("a6", [3, 4, 0, -1, 0, -5, 0, -4]);
    design.addPosition("d5", [0, 4, 5, 0, 1, 0, -3, -4]);
    design.addPosition("b5", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("c5", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("a5", [3, 4, 0, -1, 0, -5, 0, -4]);
    design.addPosition("d4", [0, 4, 5, 0, 1, 0, -3, -4]);
    design.addPosition("b4", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("c4", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("a4", [3, 4, 0, -1, 0, -5, 0, -4]);
    design.addPosition("d3", [0, 4, 5, 0, 1, 0, -3, -4]);
    design.addPosition("b3", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("c3", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("a3", [3, 4, 0, -1, 0, -5, 0, -4]);
    design.addPosition("d2", [0, 4, 5, 0, 1, 0, -3, -4]);
    design.addPosition("b2", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("c2", [3, 4, 5, -1, 1, -5, -3, -4]);
    design.addPosition("a2", [3, 4, 0, -1, 0, -5, 0, -4]);
    design.addPosition("d1", [0, 0, 0, 0, 1, 0, -3, -4]);
    design.addPosition("b1", [0, 0, 0, -1, 1, -5, -3, -4]);
    design.addPosition("c1", [0, 0, 0, -1, 1, -5, -3, -4]);
    design.addPosition("a1", [0, 0, 0, -1, 0, -5, 0, -4]);
    design.addPosition("DICE", [0, 0, 0, 0, 0, 0, 0, 0]);

    design.addZone("promotion", 1, [3, 1, 2, 0]);
    design.addZone("promotion", 2, [63, 61, 62, 60]);
    design.addZone("dice-zone", 1, [64]);
    design.addZone("dice-zone", 2, [64]);

    design.addCommand(0, ZRF.IN_ZONE,	1);	// dice-zone
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
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

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.IN_ZONE,	0);	// promotion
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.IF,	4);
    design.addCommand(4, ZRF.PROMOTE,	7);	// Fers
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.JUMP,	2);
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.IN_ZONE,	0);	// promotion
    design.addCommand(5, ZRF.FUNCTION,	0);	// not
    design.addCommand(5, ZRF.IF,	4);
    design.addCommand(5, ZRF.PROMOTE,	7);	// Fers
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.JUMP,	2);
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addPiece("D1", 0, 1);
    design.addDrop(0, 0, [], 0, 10);

    design.addPiece("D2", 1, 2);
    design.addDrop(1, 0, [], 0, 10);

    design.addPiece("D3", 2, 3);
    design.addDrop(2, 0, [], 0, 10);

    design.addPiece("D4", 3, 4);
    design.addDrop(3, 0, [], 0, 10);

    design.addPiece("D5", 4, 5);
    design.addDrop(4, 0, [], 0, 10);

    design.addPiece("D6", 5, 6);
    design.addDrop(5, 0, [], 0, 10);

    design.addPiece("Shah", 6, 6000);
    design.addMove(6, 1, [7], 6);
    design.addMove(6, 1, [1], 6);
    design.addMove(6, 1, [4], 6);
    design.addMove(6, 1, [3], 6);
    design.addMove(6, 1, [6], 6);
    design.addMove(6, 1, [2], 6);
    design.addMove(6, 1, [5], 6);
    design.addMove(6, 1, [0], 6);
    design.addMove(6, 6, [], 7);

    design.addPiece("Fers", 7, 24);
    design.addMove(7, 1, [6], 5);
    design.addMove(7, 1, [2], 5);
    design.addMove(7, 1, [5], 5);
    design.addMove(7, 1, [0], 5);

    design.addPiece("Rokh", 8, 120);
    design.addMove(8, 2, [7, 7], 2);
    design.addMove(8, 2, [1, 1], 2);
    design.addMove(8, 2, [4, 4], 2);
    design.addMove(8, 2, [3, 3], 2);

    design.addPiece("Alfil", 9, 12);
    design.addMove(9, 3, [6, 6], 4);
    design.addMove(9, 3, [5, 5], 4);
    design.addMove(9, 3, [2, 2], 4);
    design.addMove(9, 3, [0, 0], 4);

    design.addPiece("Asb", 10, 48);
    design.addMove(10, 3, [7, 6], 3);
    design.addMove(10, 3, [7, 5], 3);
    design.addMove(10, 3, [1, 2], 3);
    design.addMove(10, 3, [1, 0], 3);
    design.addMove(10, 3, [4, 6], 3);
    design.addMove(10, 3, [4, 2], 3);
    design.addMove(10, 3, [3, 5], 3);
    design.addMove(10, 3, [3, 0], 3);

    design.addPiece("Sarbaz", 11, 6);
    design.addMove(11, 4, [7], 1);
    design.addMove(11, 5, [6], 1);
    design.addMove(11, 5, [5], 1);

    design.setupSelector(7);

    design.setup("White", "Sarbaz", 47, 1);
    design.setup("White", "Sarbaz", 45, 1);
    design.setup("White", "Sarbaz", 46, 1);
    design.setup("White", "Sarbaz", 44, 1);
    design.setup("White", "Sarbaz", 39, 1);
    design.setup("White", "Sarbaz", 37, 1);
    design.setup("White", "Sarbaz", 38, 1);
    design.setup("White", "Sarbaz", 36, 1);
    design.setup("White", "Rokh", 55, 1);
    design.setup("White", "Rokh", 52, 1);
    design.setup("White", "Asb", 57, 1);
    design.setup("White", "Asb", 58, 1);
    design.setup("White", "Alfil", 63, 1);
    design.setup("White", "Alfil", 60, 1);
    design.setup("White", "Fers", 62, 1);
    design.setup("White", "Shah", 61, 1);
    design.setup("Black", "Sarbaz", 27, 1);
    design.setup("Black", "Sarbaz", 25, 1);
    design.setup("Black", "Sarbaz", 26, 1);
    design.setup("Black", "Sarbaz", 24, 1);
    design.setup("Black", "Sarbaz", 19, 1);
    design.setup("Black", "Sarbaz", 17, 1);
    design.setup("Black", "Sarbaz", 18, 1);
    design.setup("Black", "Sarbaz", 16, 1);
    design.setup("Black", "Rokh", 11, 1);
    design.setup("Black", "Rokh", 8, 1);
    design.setup("Black", "Asb", 5, 1);
    design.setup("Black", "Asb", 6, 1);
    design.setup("Black", "Alfil", 3, 1);
    design.setup("Black", "Alfil", 0, 1);
    design.setup("Black", "Fers", 2, 1);
    design.setup("Black", "Shah", 1, 1);

    design.setup("White", "Sarbaz", 47, 2);
    design.setup("White", "Sarbaz", 45, 2);
    design.setup("White", "Sarbaz", 46, 2);
    design.setup("White", "Sarbaz", 44, 2);
    design.setup("White", "Sarbaz", 43, 2);
    design.setup("White", "Sarbaz", 41, 2);
    design.setup("White", "Sarbaz", 42, 2);
    design.setup("White", "Sarbaz", 40, 2);
    design.setup("White", "Rokh", 55, 2);
    design.setup("White", "Rokh", 52, 2);
    design.setup("White", "Asb", 57, 2);
    design.setup("White", "Asb", 58, 2);
    design.setup("White", "Alfil", 63, 2);
    design.setup("White", "Alfil", 60, 2);
    design.setup("White", "Fers", 62, 2);
    design.setup("White", "Shah", 61, 2);
    design.setup("Black", "Sarbaz", 23, 2);
    design.setup("Black", "Sarbaz", 21, 2);
    design.setup("Black", "Sarbaz", 22, 2);
    design.setup("Black", "Sarbaz", 20, 2);
    design.setup("Black", "Sarbaz", 19, 2);
    design.setup("Black", "Sarbaz", 17, 2);
    design.setup("Black", "Sarbaz", 18, 2);
    design.setup("Black", "Sarbaz", 16, 2);
    design.setup("Black", "Rokh", 11, 2);
    design.setup("Black", "Rokh", 8, 2);
    design.setup("Black", "Asb", 5, 2);
    design.setup("Black", "Asb", 6, 2);
    design.setup("Black", "Alfil", 3, 2);
    design.setup("Black", "Alfil", 0, 2);
    design.setup("Black", "Fers", 1, 2);
    design.setup("Black", "Shah", 2, 2);

    design.setup("White", "Sarbaz", 59, 3);
    design.setup("White", "Sarbaz", 57, 3);
    design.setup("White", "Sarbaz", 58, 3);
    design.setup("White", "Sarbaz", 56, 3);
    design.setup("White", "Sarbaz", 51, 3);
    design.setup("White", "Sarbaz", 49, 3);
    design.setup("White", "Sarbaz", 50, 3);
    design.setup("White", "Sarbaz", 48, 3);
    design.setup("White", "Rokh", 55, 3);
    design.setup("White", "Rokh", 52, 3);
    design.setup("White", "Asb", 53, 3);
    design.setup("White", "Asb", 54, 3);
    design.setup("White", "Alfil", 63, 3);
    design.setup("White", "Alfil", 60, 3);
    design.setup("White", "Fers", 61, 3);
    design.setup("White", "Shah", 62, 3);
    design.setup("Black", "Sarbaz", 7, 3);
    design.setup("Black", "Sarbaz", 5, 3);
    design.setup("Black", "Sarbaz", 6, 3);
    design.setup("Black", "Sarbaz", 4, 3);
    design.setup("Black", "Sarbaz", 15, 3);
    design.setup("Black", "Sarbaz", 13, 3);
    design.setup("Black", "Sarbaz", 14, 3);
    design.setup("Black", "Sarbaz", 12, 3);
    design.setup("Black", "Rokh", 11, 3);
    design.setup("Black", "Rokh", 8, 3);
    design.setup("Black", "Asb", 9, 3);
    design.setup("Black", "Asb", 10, 3);
    design.setup("Black", "Alfil", 3, 3);
    design.setup("Black", "Alfil", 0, 3);
    design.setup("Black", "Fers", 1, 3);
    design.setup("Black", "Shah", 2, 3);

    design.setup("White", "Sarbaz", 55, 4);
    design.setup("White", "Sarbaz", 53, 4);
    design.setup("White", "Sarbaz", 54, 4);
    design.setup("White", "Sarbaz", 52, 4);
    design.setup("White", "Sarbaz", 51, 4);
    design.setup("White", "Sarbaz", 49, 4);
    design.setup("White", "Sarbaz", 50, 4);
    design.setup("White", "Sarbaz", 48, 4);
    design.setup("White", "Rokh", 63, 4);
    design.setup("White", "Rokh", 60, 4);
    design.setup("White", "Asb", 61, 4);
    design.setup("White", "Asb", 62, 4);
    design.setup("White", "Alfil", 59, 4);
    design.setup("White", "Alfil", 56, 4);
    design.setup("White", "Fers", 58, 4);
    design.setup("White", "Shah", 57, 4);
    design.setup("Black", "Sarbaz", 11, 4);
    design.setup("Black", "Sarbaz", 9, 4);
    design.setup("Black", "Sarbaz", 10, 4);
    design.setup("Black", "Sarbaz", 8, 4);
    design.setup("Black", "Sarbaz", 15, 4);
    design.setup("Black", "Sarbaz", 13, 4);
    design.setup("Black", "Sarbaz", 14, 4);
    design.setup("Black", "Sarbaz", 12, 4);
    design.setup("Black", "Rokh", 3, 4);
    design.setup("Black", "Rokh", 0, 4);
    design.setup("Black", "Asb", 1, 4);
    design.setup("Black", "Asb", 2, 4);
    design.setup("Black", "Alfil", 7, 4);
    design.setup("Black", "Alfil", 4, 4);
    design.setup("Black", "Fers", 6, 4);
    design.setup("Black", "Shah", 5, 4);

    design.setup("White", "Sarbaz", 47, 5);
    design.setup("White", "Sarbaz", 45, 5);
    design.setup("White", "Sarbaz", 46, 5);
    design.setup("White", "Sarbaz", 44, 5);
    design.setup("White", "Sarbaz", 43, 5);
    design.setup("White", "Sarbaz", 41, 5);
    design.setup("White", "Sarbaz", 42, 5);
    design.setup("White", "Sarbaz", 40, 5);
    design.setup("White", "Rokh", 63, 5);
    design.setup("White", "Rokh", 60, 5);
    design.setup("White", "Asb", 57, 5);
    design.setup("White", "Asb", 58, 5);
    design.setup("White", "Alfil", 53, 5);
    design.setup("White", "Alfil", 54, 5);
    design.setup("White", "Fers", 62, 5);
    design.setup("White", "Shah", 61, 5);
    design.setup("Black", "Sarbaz", 19, 5);
    design.setup("Black", "Sarbaz", 17, 5);
    design.setup("Black", "Sarbaz", 18, 5);
    design.setup("Black", "Sarbaz", 16, 5);
    design.setup("Black", "Sarbaz", 23, 5);
    design.setup("Black", "Sarbaz", 21, 5);
    design.setup("Black", "Sarbaz", 22, 5);
    design.setup("Black", "Sarbaz", 20, 5);
    design.setup("Black", "Rokh", 3, 5);
    design.setup("Black", "Rokh", 0, 5);
    design.setup("Black", "Asb", 5, 5);
    design.setup("Black", "Asb", 6, 5);
    design.setup("Black", "Alfil", 9, 5);
    design.setup("Black", "Alfil", 10, 5);
    design.setup("Black", "Fers", 2, 5);
    design.setup("Black", "Shah", 1, 5);

    design.setup("White", "Sarbaz", 47, 6);
    design.setup("White", "Sarbaz", 45, 6);
    design.setup("White", "Sarbaz", 46, 6);
    design.setup("White", "Sarbaz", 44, 6);
    design.setup("White", "Sarbaz", 43, 6);
    design.setup("White", "Sarbaz", 41, 6);
    design.setup("White", "Sarbaz", 42, 6);
    design.setup("White", "Sarbaz", 40, 6);
    design.setup("White", "Rokh", 63, 6);
    design.setup("White", "Rokh", 60, 6);
    design.setup("White", "Asb", 57, 6);
    design.setup("White", "Asb", 58, 6);
    design.setup("White", "Alfil", 53, 6);
    design.setup("White", "Alfil", 54, 6);
    design.setup("White", "Fers", 61, 6);
    design.setup("White", "Shah", 62, 6);
    design.setup("Black", "Sarbaz", 19, 6);
    design.setup("Black", "Sarbaz", 17, 6);
    design.setup("Black", "Sarbaz", 18, 6);
    design.setup("Black", "Sarbaz", 16, 6);
    design.setup("Black", "Sarbaz", 23, 6);
    design.setup("Black", "Sarbaz", 21, 6);
    design.setup("Black", "Sarbaz", 22, 6);
    design.setup("Black", "Sarbaz", 20, 6);
    design.setup("Black", "Rokh", 3, 6);
    design.setup("Black", "Rokh", 0, 6);
    design.setup("Black", "Asb", 5, 6);
    design.setup("Black", "Asb", 6, 6);
    design.setup("Black", "Alfil", 9, 6);
    design.setup("Black", "Alfil", 10, 6);
    design.setup("Black", "Fers", 2, 6);
    design.setup("Black", "Shah", 1, 6);

    design.setup("White", "Sarbaz", 47, 7);
    design.setup("White", "Sarbaz", 45, 7);
    design.setup("White", "Sarbaz", 46, 7);
    design.setup("White", "Sarbaz", 44, 7);
    design.setup("White", "Sarbaz", 51, 7);
    design.setup("White", "Sarbaz", 49, 7);
    design.setup("White", "Sarbaz", 50, 7);
    design.setup("White", "Sarbaz", 48, 7);
    design.setup("White", "Rokh", 63, 7);
    design.setup("White", "Rokh", 60, 7);
    design.setup("White", "Asb", 57, 7);
    design.setup("White", "Asb", 58, 7);
    design.setup("White", "Alfil", 53, 7);
    design.setup("White", "Alfil", 54, 7);
    design.setup("White", "Fers", 62, 7);
    design.setup("White", "Shah", 61, 7);
    design.setup("Black", "Sarbaz", 19, 7);
    design.setup("Black", "Sarbaz", 17, 7);
    design.setup("Black", "Sarbaz", 18, 7);
    design.setup("Black", "Sarbaz", 16, 7);
    design.setup("Black", "Sarbaz", 15, 7);
    design.setup("Black", "Sarbaz", 13, 7);
    design.setup("Black", "Sarbaz", 14, 7);
    design.setup("Black", "Sarbaz", 12, 7);
    design.setup("Black", "Rokh", 3, 7);
    design.setup("Black", "Rokh", 0, 7);
    design.setup("Black", "Asb", 5, 7);
    design.setup("Black", "Asb", 6, 7);
    design.setup("Black", "Alfil", 9, 7);
    design.setup("Black", "Alfil", 10, 7);
    design.setup("Black", "Fers", 1, 7);
    design.setup("Black", "Shah", 2, 7);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteD1", "White D1");
    view.defPiece("BlackD1", "Black D1");
    view.defPiece("WhiteD2", "White D2");
    view.defPiece("BlackD2", "Black D2");
    view.defPiece("WhiteD3", "White D3");
    view.defPiece("BlackD3", "Black D3");
    view.defPiece("WhiteD4", "White D4");
    view.defPiece("BlackD4", "Black D4");
    view.defPiece("WhiteD5", "White D5");
    view.defPiece("BlackD5", "Black D5");
    view.defPiece("WhiteD6", "White D6");
    view.defPiece("BlackD6", "Black D6");
    view.defPiece("WhiteShah", "White Shah");
    view.defPiece("BlackShah", "Black Shah");
    view.defPiece("WhiteFers", "White Fers");
    view.defPiece("BlackFers", "Black Fers");
    view.defPiece("WhiteRokh", "White Rokh");
    view.defPiece("BlackRokh", "Black Rokh");
    view.defPiece("WhiteAlfil", "White Alfil");
    view.defPiece("BlackAlfil", "Black Alfil");
    view.defPiece("WhiteAsb", "White Asb");
    view.defPiece("BlackAsb", "Black Asb");
    view.defPiece("WhiteSarbaz", "White Sarbaz");
    view.defPiece("BlackSarbaz", "Black Sarbaz");
    view.defPiece("Ko", "Ko");
 
    view.defPosition("d16", 1, 2, 50, 50);
    view.defPosition("b16", 1, 52, 50, 50);
    view.defPosition("c16", 1, 102, 50, 50);
    view.defPosition("a16", 1, 152, 50, 50);
    view.defPosition("d15", 51, 2, 50, 50);
    view.defPosition("b15", 51, 52, 50, 50);
    view.defPosition("c15", 51, 102, 50, 50);
    view.defPosition("a15", 51, 152, 50, 50);
    view.defPosition("d14", 101, 2, 50, 50);
    view.defPosition("b14", 101, 52, 50, 50);
    view.defPosition("c14", 101, 102, 50, 50);
    view.defPosition("a14", 101, 152, 50, 50);
    view.defPosition("d13", 151, 2, 50, 50);
    view.defPosition("b13", 151, 52, 50, 50);
    view.defPosition("c13", 151, 102, 50, 50);
    view.defPosition("a13", 151, 152, 50, 50);
    view.defPosition("d12", 201, 2, 50, 50);
    view.defPosition("b12", 201, 52, 50, 50);
    view.defPosition("c12", 201, 102, 50, 50);
    view.defPosition("a12", 201, 152, 50, 50);
    view.defPosition("d11", 251, 2, 50, 50);
    view.defPosition("b11", 251, 52, 50, 50);
    view.defPosition("c11", 251, 102, 50, 50);
    view.defPosition("a11", 251, 152, 50, 50);
    view.defPosition("d10", 301, 2, 50, 50);
    view.defPosition("b10", 301, 52, 50, 50);
    view.defPosition("c10", 301, 102, 50, 50);
    view.defPosition("a10", 301, 152, 50, 50);
    view.defPosition("d9", 351, 2, 50, 50);
    view.defPosition("b9", 351, 52, 50, 50);
    view.defPosition("c9", 351, 102, 50, 50);
    view.defPosition("a9", 351, 152, 50, 50);
    view.defPosition("d8", 401, 2, 50, 50);
    view.defPosition("b8", 401, 52, 50, 50);
    view.defPosition("c8", 401, 102, 50, 50);
    view.defPosition("a8", 401, 152, 50, 50);
    view.defPosition("d7", 451, 2, 50, 50);
    view.defPosition("b7", 451, 52, 50, 50);
    view.defPosition("c7", 451, 102, 50, 50);
    view.defPosition("a7", 451, 152, 50, 50);
    view.defPosition("d6", 501, 2, 50, 50);
    view.defPosition("b6", 501, 52, 50, 50);
    view.defPosition("c6", 501, 102, 50, 50);
    view.defPosition("a6", 501, 152, 50, 50);
    view.defPosition("d5", 551, 2, 50, 50);
    view.defPosition("b5", 551, 52, 50, 50);
    view.defPosition("c5", 551, 102, 50, 50);
    view.defPosition("a5", 551, 152, 50, 50);
    view.defPosition("d4", 601, 2, 50, 50);
    view.defPosition("b4", 601, 52, 50, 50);
    view.defPosition("c4", 601, 102, 50, 50);
    view.defPosition("a4", 601, 152, 50, 50);
    view.defPosition("d3", 651, 2, 50, 50);
    view.defPosition("b3", 651, 52, 50, 50);
    view.defPosition("c3", 651, 102, 50, 50);
    view.defPosition("a3", 651, 152, 50, 50);
    view.defPosition("d2", 701, 2, 50, 50);
    view.defPosition("b2", 701, 52, 50, 50);
    view.defPosition("c2", 701, 102, 50, 50);
    view.defPosition("a2", 701, 152, 50, 50);
    view.defPosition("d1", 751, 2, 50, 50);
    view.defPosition("b1", 751, 52, 50, 50);
    view.defPosition("c1", 751, 102, 50, 50);
    view.defPosition("a1", 751, 152, 50, 50);
    view.defPosition("DICE", 811, 86, 28, 28);
}
