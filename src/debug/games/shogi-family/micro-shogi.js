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

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("ne");
    design.addDirection("n");
    design.addDirection("se");
    design.addDirection("sw");
    design.addDirection("nw");
    design.addDirection("nx");

    design.addPlayer("South", [1, 0, 4, 6, 2, 7, 3, 5, 8]);
    design.addPlayer("North", [1, 0, 4, 6, 2, 7, 3, 5, 8]);

    design.addPosition("X5", [0, 1, 10, 0, 0, 11, 0, 0, 0]);
    design.addPosition("Y5", [-1, 0, 10, 0, 0, 0, 9, 0, 0]);
    design.addPosition("I5", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("a5", [0, 1, 10, 0, 0, 11, 0, 0, 41]);
    design.addPosition("b5", [-1, 1, 10, 0, 0, 11, 9, 0, 41]);
    design.addPosition("c5", [-1, 1, 10, 0, 0, 11, 9, 0, 41]);
    design.addPosition("d5", [-1, 0, 10, 0, 0, 0, 9, 0, 42]);
    design.addPosition("J5", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("Z5", [0, 1, 10, 0, 0, 11, 0, 0, 0]);
    design.addPosition("T5", [-1, 0, 10, 0, 0, 0, 9, 0, 0]);
    design.addPosition("X4", [0, 1, 10, -9, -10, 11, 0, 0, 0]);
    design.addPosition("Y4", [-1, 0, 10, 0, -10, 0, 9, -11, 0]);
    design.addPosition("I4", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("a4", [0, 1, 10, -9, -10, 11, 0, 0, -10]);
    design.addPosition("b4", [-1, 1, 10, -9, -10, 11, 9, -11, -10]);
    design.addPosition("c4", [-1, 1, 10, -9, -10, 11, 9, -11, -10]);
    design.addPosition("d4", [-1, 0, 10, 0, -10, 0, 9, -11, -10]);
    design.addPosition("J4", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("Z4", [0, 1, 10, -9, -10, 11, 0, 0, 0]);
    design.addPosition("T4", [-1, 0, 10, 0, -10, 0, 9, -11, 0]);
    design.addPosition("X3", [0, 1, 10, -9, -10, 11, 0, 0, 0]);
    design.addPosition("Y3", [-1, 0, 10, 0, -10, 0, 9, -11, 0]);
    design.addPosition("I3", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("a3", [0, 1, 10, -9, -10, 11, 0, 0, -10]);
    design.addPosition("b3", [-1, 1, 10, -9, -10, 11, 9, -11, -10]);
    design.addPosition("c3", [-1, 1, 10, -9, -10, 11, 9, -11, -10]);
    design.addPosition("d3", [-1, 0, 10, 0, -10, 0, 9, -11, -10]);
    design.addPosition("J3", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("Z3", [0, 1, 10, -9, -10, 11, 0, 0, 0]);
    design.addPosition("T3", [-1, 0, 10, 0, -10, 0, 9, -11, 0]);
    design.addPosition("X2", [0, 1, 10, -9, -10, 11, 0, 0, 0]);
    design.addPosition("Y2", [-1, 0, 10, 0, -10, 0, 9, -11, 0]);
    design.addPosition("I2", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("a2", [0, 1, 10, -9, -10, 11, 0, 0, -10]);
    design.addPosition("b2", [-1, 1, 10, -9, -10, 11, 9, -11, -10]);
    design.addPosition("c2", [-1, 1, 10, -9, -10, 11, 9, -11, -10]);
    design.addPosition("d2", [-1, 0, 10, 0, -10, 0, 9, -11, -10]);
    design.addPosition("J2", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("Z2", [0, 1, 10, -9, -10, 11, 0, 0, 0]);
    design.addPosition("T2", [-1, 0, 10, 0, -10, 0, 9, -11, 0]);
    design.addPosition("X1", [0, 1, 0, -9, -10, 0, 0, 0, 0]);
    design.addPosition("Y1", [-1, 0, 0, 0, -10, 0, 0, -11, 0]);
    design.addPosition("I1", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("a1", [0, 1, 0, -9, -10, 0, 0, 0, -10]);
    design.addPosition("b1", [-1, 1, 0, -9, -10, 0, 0, -11, -10]);
    design.addPosition("c1", [-1, 1, 0, -9, -10, 0, 0, -11, -10]);
    design.addPosition("d1", [-1, 0, 0, 0, -10, 0, 0, -11, -10]);
    design.addPosition("J1", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("Z1", [0, 1, 0, -9, -10, 0, 0, 0, 0]);
    design.addPosition("T1", [-1, 0, 0, 0, -10, 0, 0, -11, 0]);

    design.addZone("board-zone", 2, [43, 44, 45, 46, 33, 34, 35, 36, 23, 24, 25, 26, 13, 14, 15, 16, 3, 4, 5, 6]);
    design.addZone("board-zone", 1, [43, 44, 45, 46, 33, 34, 35, 36, 23, 24, 25, 26, 13, 14, 15, 16, 3, 4, 5, 6]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.IN_ZONE,	0);	// board-zone
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.IN_ZONE,	0);	// board-zone
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
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
    design.addCommand(1, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.PROMOTE,	2);	// Tokin
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.IN_ZONE,	0);	// board-zone
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	21);	// position
    design.addCommand(2, ZRF.ON_BOARD_DIR,	8);	// name
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	10);
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	4);
    design.addCommand(2, ZRF.FORK,	3);
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end
    design.addCommand(2, ZRF.PARAM,	1);	// $2
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.JUMP,	-11);
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.IN_ZONE,	0);	// board-zone
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.IF,	4);
    design.addCommand(3, ZRF.PROMOTE,	1);	// Bishop
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.JUMP,	2);
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.IN_ZONE,	0);	// board-zone
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.IF,	4);
    design.addCommand(4, ZRF.PROMOTE,	4);	// Rook
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.JUMP,	2);
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.IN_ZONE,	0);	// board-zone
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(5, ZRF.FUNCTION,	0);	// not
    design.addCommand(5, ZRF.IF,	7);
    design.addCommand(5, ZRF.FORK,	3);
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end
    design.addCommand(5, ZRF.PARAM,	1);	// $2
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.JUMP,	-8);
    design.addCommand(5, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.PROMOTE,	3);	// Gold
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.IN_ZONE,	0);	// board-zone
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.PARAM,	0);	// $1
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.IF,	4);
    design.addCommand(6, ZRF.PROMOTE,	6);	// Lance
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.JUMP,	2);
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addCommand(7, ZRF.FUNCTION,	24);	// from
    design.addCommand(7, ZRF.IN_ZONE,	0);	// board-zone
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.PARAM,	0);	// $1
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.IF,	7);
    design.addCommand(7, ZRF.FORK,	3);
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.FUNCTION,	28);	// end
    design.addCommand(7, ZRF.PARAM,	1);	// $2
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.JUMP,	-8);
    design.addCommand(7, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.PROMOTE,	5);	// Silver
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.FUNCTION,	28);	// end

    design.addCommand(8, ZRF.FUNCTION,	24);	// from
    design.addCommand(8, ZRF.IN_ZONE,	0);	// board-zone
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.PARAM,	0);	// $1
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	4);
    design.addCommand(8, ZRF.PROMOTE,	8);	// Knight
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.JUMP,	2);
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.FUNCTION,	28);	// end

    design.addCommand(9, ZRF.FUNCTION,	24);	// from
    design.addCommand(9, ZRF.IN_ZONE,	0);	// board-zone
    design.addCommand(9, ZRF.FUNCTION,	20);	// verify
    design.addCommand(9, ZRF.PARAM,	0);	// $1
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.PARAM,	1);	// $2
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(9, ZRF.FUNCTION,	0);	// not
    design.addCommand(9, ZRF.FUNCTION,	20);	// verify
    design.addCommand(9, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(9, ZRF.FUNCTION,	0);	// not
    design.addCommand(9, ZRF.IF,	4);
    design.addCommand(9, ZRF.PROMOTE,	7);	// Pawn
    design.addCommand(9, ZRF.FUNCTION,	25);	// to
    design.addCommand(9, ZRF.JUMP,	2);
    design.addCommand(9, ZRF.FUNCTION,	25);	// to
    design.addCommand(9, ZRF.FUNCTION,	28);	// end

    design.addPiece("King", 0, 100);
    design.addMove(0, 0, [4], 0);
    design.addMove(0, 0, [7], 0);
    design.addMove(0, 0, [2], 0);
    design.addMove(0, 0, [5], 0);
    design.addMove(0, 0, [0], 0);
    design.addMove(0, 0, [6], 0);
    design.addMove(0, 0, [1], 0);
    design.addMove(0, 0, [3], 0);

    design.addPiece("Bishop", 1);
    design.addMove(1, 1, [7, 7], 0);
    design.addMove(1, 1, [5, 5], 0);
    design.addMove(1, 1, [6, 6], 0);
    design.addMove(1, 1, [3, 3], 0);
    design.addMove(1, 2, [43, 8], 0);

    design.addPiece("Tokin", 2, 6);
    design.addMove(2, 3, [4], 0);
    design.addMove(2, 3, [7], 0);
    design.addMove(2, 3, [2], 0);
    design.addMove(2, 3, [3], 0);
    design.addMove(2, 3, [0], 0);
    design.addMove(2, 3, [1], 0);
    design.addMove(2, 2, [43, 8], 0);

    design.addPiece("Gold", 3, 6);
    design.addMove(3, 4, [4], 0);
    design.addMove(3, 4, [7], 0);
    design.addMove(3, 4, [2], 0);
    design.addMove(3, 4, [3], 0);
    design.addMove(3, 4, [0], 0);
    design.addMove(3, 4, [1], 0);
    design.addMove(3, 2, [43, 8], 0);

    design.addPiece("Rook", 4, 15);
    design.addMove(4, 5, [4, 4], 0);
    design.addMove(4, 5, [1, 1], 0);
    design.addMove(4, 5, [0, 0], 0);
    design.addMove(4, 5, [2, 2], 0);
    design.addMove(4, 2, [43, 8], 0);

    design.addPiece("Silver", 5, 5);
    design.addMove(5, 6, [7], 0);
    design.addMove(5, 6, [6], 0);
    design.addMove(5, 6, [5], 0);
    design.addMove(5, 6, [3], 0);
    design.addMove(5, 6, [4], 0);
    design.addMove(5, 2, [43, 8], 0);

    design.addPiece("Lance", 6, 7);
    design.addMove(6, 7, [4, 4], 0);
    design.addMove(6, 2, [43, 8], 0);

    design.addPiece("Pawn", 7, 1);
    design.addMove(7, 8, [4], 0);
    design.addMove(7, 2, [43, 8], 0);

    design.addPiece("Knight", 8, 2);
    design.addMove(8, 9, [4, 7], 0);
    design.addMove(8, 9, [4, 3], 0);
    design.addMove(8, 2, [43, 8], 0);

    design.setup("South", "King", 46);
    design.setup("South", "Bishop", 45);
    design.setup("South", "Gold", 44);
    design.setup("South", "Silver", 43);
    design.setup("South", "Pawn", 36);
    design.setup("North", "King", 3);
    design.setup("North", "Bishop", 4);
    design.setup("North", "Gold", 5);
    design.setup("North", "Silver", 6);
    design.setup("North", "Pawn", 13);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("SouthKing", "South King");
    view.defPiece("NorthKing", "North King");
    view.defPiece("SouthBishop", "South Bishop");
    view.defPiece("NorthBishop", "North Bishop");
    view.defPiece("SouthTokin", "South Tokin");
    view.defPiece("NorthTokin", "North Tokin");
    view.defPiece("SouthGold", "South Gold");
    view.defPiece("NorthGold", "North Gold");
    view.defPiece("SouthRook", "South Rook");
    view.defPiece("NorthRook", "North Rook");
    view.defPiece("SouthSilver", "South Silver");
    view.defPiece("NorthSilver", "North Silver");
    view.defPiece("SouthLance", "South Lance");
    view.defPiece("NorthLance", "North Lance");
    view.defPiece("SouthPawn", "South Pawn");
    view.defPiece("NorthPawn", "North Pawn");
    view.defPiece("SouthKnight", "South Knight");
    view.defPiece("NorthKnight", "North Knight");
 
    view.defPosition("X5", 14, 15, 41, 46);
    view.defPosition("Y5", 55, 15, 41, 46);
    view.defPosition("I5", 96, 15, 41, 46);
    view.defPosition("a5", 137, 15, 41, 46);
    view.defPosition("b5", 178, 15, 41, 46);
    view.defPosition("c5", 219, 15, 41, 46);
    view.defPosition("d5", 260, 15, 41, 46);
    view.defPosition("J5", 301, 15, 41, 46);
    view.defPosition("Z5", 342, 15, 41, 46);
    view.defPosition("T5", 383, 15, 41, 46);
    view.defPosition("X4", 14, 61, 41, 46);
    view.defPosition("Y4", 55, 61, 41, 46);
    view.defPosition("I4", 96, 61, 41, 46);
    view.defPosition("a4", 137, 61, 41, 46);
    view.defPosition("b4", 178, 61, 41, 46);
    view.defPosition("c4", 219, 61, 41, 46);
    view.defPosition("d4", 260, 61, 41, 46);
    view.defPosition("J4", 301, 61, 41, 46);
    view.defPosition("Z4", 342, 61, 41, 46);
    view.defPosition("T4", 383, 61, 41, 46);
    view.defPosition("X3", 14, 107, 41, 46);
    view.defPosition("Y3", 55, 107, 41, 46);
    view.defPosition("I3", 96, 107, 41, 46);
    view.defPosition("a3", 137, 107, 41, 46);
    view.defPosition("b3", 178, 107, 41, 46);
    view.defPosition("c3", 219, 107, 41, 46);
    view.defPosition("d3", 260, 107, 41, 46);
    view.defPosition("J3", 301, 107, 41, 46);
    view.defPosition("Z3", 342, 107, 41, 46);
    view.defPosition("T3", 383, 107, 41, 46);
    view.defPosition("X2", 14, 153, 41, 46);
    view.defPosition("Y2", 55, 153, 41, 46);
    view.defPosition("I2", 96, 153, 41, 46);
    view.defPosition("a2", 137, 153, 41, 46);
    view.defPosition("b2", 178, 153, 41, 46);
    view.defPosition("c2", 219, 153, 41, 46);
    view.defPosition("d2", 260, 153, 41, 46);
    view.defPosition("J2", 301, 153, 41, 46);
    view.defPosition("Z2", 342, 153, 41, 46);
    view.defPosition("T2", 383, 153, 41, 46);
    view.defPosition("X1", 14, 199, 41, 46);
    view.defPosition("Y1", 55, 199, 41, 46);
    view.defPosition("I1", 96, 199, 41, 46);
    view.defPosition("a1", 137, 199, 41, 46);
    view.defPosition("b1", 178, 199, 41, 46);
    view.defPosition("c1", 219, 199, 41, 46);
    view.defPosition("d1", 260, 199, 41, 46);
    view.defPosition("J1", 301, 199, 41, 46);
    view.defPosition("Z1", 342, 199, 41, 46);
    view.defPosition("T1", 383, 199, 41, 46);
}
