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
    design.checkVersion("show-hints", "false");

    design.addDirection("w");  // 0
    design.addDirection("e");  // 1
    design.addDirection("s");  // 2
    design.addDirection("ne"); // 3
    design.addDirection("n");  // 4
    design.addDirection("se"); // 5
    design.addDirection("sw"); // 6
    design.addDirection("nw"); // 7

    design.addPlayer("White", [1, 0, 4, 6, 2, 7, 3, 5]);
    design.addPlayer("Black", [0, 1, 4, 5, 2, 3, 7, 6]);

    design.addPosition("a8", [0, 1, 8, 0, 0, 9, 0, 0]);
    design.addPosition("b8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("c8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("d8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("e8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("f8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("g8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("h8", [-1, 0, 8, 0, 0, 0, 7, 0]);
    design.addPosition("a7", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h7", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a6", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h6", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a5", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h5", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a4", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h4", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a3", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h3", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a2", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h2", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a1", [0, 1, 0, -7, -8, 0, 0, 0]);
    design.addPosition("b1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("c1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("d1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("e1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("f1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("g1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("h1", [-1, 0, 0, 0, -8, 0, 0, -9]);

    design.addZone("third-rank", 1, [40, 41, 42, 43, 44, 45, 46, 47]);
    design.addZone("third-rank", 2, [16, 17, 18, 19, 20, 21, 22, 23]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.IN_ZONE,	0);	// third-rank
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	11);
    design.addCommand(0, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FORK,	3);
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.PARAM,	1);	// $2
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	2);	// enemy?
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
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addPiece("Pawn", 0, 100);
    design.addMove(0, 0, [4, 4], 0);
    design.addMove(0, 1, [7], 0);
    design.addMove(0, 1, [3], 0);

    design.addPiece("Rook", 1, 500);
    design.addMove(1, 2, [4, 4], 1);
    design.addMove(1, 2, [2, 2], 1);
    design.addMove(1, 2, [0, 0], 1);
    design.addMove(1, 2, [1, 1], 1);

    design.addPiece("Knight", 2, 320);
    design.addMove(2, 3, [4, 7], 1);
    design.addMove(2, 3, [4, 3], 1);
    design.addMove(2, 3, [2, 6], 1);
    design.addMove(2, 3, [2, 5], 1);
    design.addMove(2, 3, [0, 7], 1);
    design.addMove(2, 3, [0, 6], 1);
    design.addMove(2, 3, [1, 3], 1);
    design.addMove(2, 3, [1, 5], 1);

    design.addPiece("Bishop", 3, 330);
    design.addMove(3, 2, [7, 7], 1);
    design.addMove(3, 2, [6, 6], 1);
    design.addMove(3, 2, [3, 3], 1);
    design.addMove(3, 2, [5, 5], 1);

    design.addPiece("Queen", 4, 900);
    design.addMove(4, 2, [4, 4], 1);
    design.addMove(4, 2, [2, 2], 1);
    design.addMove(4, 2, [0, 0], 1);
    design.addMove(4, 2, [1, 1], 1);
    design.addMove(4, 2, [7, 7], 1);
    design.addMove(4, 2, [6, 6], 1);
    design.addMove(4, 2, [3, 3], 1);
    design.addMove(4, 2, [5, 5], 1);

    design.addPiece("King", 5, 20000);
    design.addMove(5, 4, [4], 0);
    design.addMove(5, 4, [2], 0);
    design.addMove(5, 4, [0], 0);
    design.addMove(5, 4, [1], 0);
    design.addMove(5, 4, [7], 0);
    design.addMove(5, 4, [6], 0);
    design.addMove(5, 4, [3], 0);
    design.addMove(5, 4, [5], 0);

    design.addPiece("PawnP", 6, 100);
    design.addMove(6, 0, [4, 4], 0);
    design.addMove(6, 1, [7], 0);
    design.addMove(6, 1, [3], 0);

    design.addPiece("RookP", 7, 500);
    design.addMove(7, 2, [4, 4], 0);
    design.addMove(7, 2, [2, 2], 0);
    design.addMove(7, 2, [0, 0], 0);
    design.addMove(7, 2, [1, 1], 0);

    design.addPiece("KnightP", 8, 320);
    design.addMove(8, 3, [4, 7], 1);
    design.addMove(8, 3, [4, 3], 1);
    design.addMove(8, 3, [2, 6], 1);
    design.addMove(8, 3, [2, 5], 1);
    design.addMove(8, 3, [0, 7], 1);
    design.addMove(8, 3, [0, 6], 1);
    design.addMove(8, 3, [1, 3], 1);
    design.addMove(8, 3, [1, 5], 1);

    design.addPiece("BishopP", 9, 330);
    design.addMove(9, 2, [7, 7], 1);
    design.addMove(9, 2, [6, 6], 1);
    design.addMove(9, 2, [3, 3], 1);
    design.addMove(9, 2, [5, 5], 1);

    design.addPiece("QueenP", 10, 900);
    design.addMove(10, 2, [7, 7], 0);
    design.addMove(10, 2, [1, 1], 0);
    design.addMove(10, 2, [4, 4], 0);
    design.addMove(10, 2, [3, 3], 0);
    design.addMove(10, 2, [6, 6], 0);
    design.addMove(10, 2, [2, 2], 0);
    design.addMove(10, 2, [5, 5], 0);
    design.addMove(10, 2, [0, 0], 0);

    design.addPiece("KingP", 11, 20000);
    design.addMove(11, 4, [7], 0);
    design.addMove(11, 4, [1], 0);
    design.addMove(11, 4, [4], 0);
    design.addMove(11, 4, [3], 0);
    design.addMove(11, 4, [6], 0);
    design.addMove(11, 4, [2], 0);
    design.addMove(11, 4, [5], 0);
    design.addMove(11, 4, [0], 0);

    design.setup("White", "Pawn", 48);
    design.setup("White", "Pawn", 49);
    design.setup("White", "Pawn", 50);
    design.setup("White", "Pawn", 51);
    design.setup("White", "Pawn", 52);
    design.setup("White", "Pawn", 53);
    design.setup("White", "Pawn", 54);
    design.setup("White", "Pawn", 55);
    design.setup("White", "Rook", 56);
    design.setup("White", "Rook", 63);
    design.setup("White", "Knight", 57);
    design.setup("White", "Knight", 62);
    design.setup("White", "Bishop", 58);
    design.setup("White", "Bishop", 61);
    design.setup("White", "Queen", 59);
    design.setup("White", "King", 60);
    design.setup("Black", "Pawn", 8);
    design.setup("Black", "Pawn", 9);
    design.setup("Black", "Pawn", 10);
    design.setup("Black", "Pawn", 11);
    design.setup("Black", "Pawn", 12);
    design.setup("Black", "Pawn", 13);
    design.setup("Black", "Pawn", 14);
    design.setup("Black", "Pawn", 15);
    design.setup("Black", "Rook", 0);
    design.setup("Black", "Rook", 7);
    design.setup("Black", "Knight", 1);
    design.setup("Black", "Knight", 6);
    design.setup("Black", "Bishop", 2);
    design.setup("Black", "Bishop", 5);
    design.setup("Black", "Queen", 3);
    design.setup("Black", "King", 4);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhitePawn", "White Pawn");
    view.defPiece("BlackPawn", "Black Pawn");
    view.defPiece("WhiteRook", "White Rook");
    view.defPiece("BlackRook", "Black Rook");
    view.defPiece("WhiteKnight", "White Knight");
    view.defPiece("BlackKnight", "Black Knight");
    view.defPiece("WhiteBishop", "White Bishop");
    view.defPiece("BlackBishop", "Black Bishop");
    view.defPiece("WhiteQueen", "White Queen");
    view.defPiece("BlackQueen", "Black Queen");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
    view.defPiece("WhitePawnP", "White PawnP");
    view.defPiece("BlackPawnP", "Black PawnP");
    view.defPiece("WhiteRookP", "White RookP");
    view.defPiece("BlackRookP", "Black RookP");
    view.defPiece("WhiteKnightP", "White KnightP");
    view.defPiece("BlackKnightP", "Black KnightP");
    view.defPiece("WhiteBishopP", "White BishopP");
    view.defPiece("BlackBishopP", "Black BishopP");
    view.defPiece("WhiteQueenP", "White QueenP");
    view.defPiece("BlackQueenP", "Black QueenP");
    view.defPiece("WhiteKingP", "White KingP");
    view.defPiece("BlackKingP", "Black KingP");
 
    view.defPosition("a8", 29, 29, 60, 60);
    view.defPosition("b8", 89, 29, 60, 60);
    view.defPosition("c8", 149, 29, 60, 60);
    view.defPosition("d8", 209, 29, 60, 60);
    view.defPosition("e8", 269, 29, 60, 60);
    view.defPosition("f8", 329, 29, 60, 60);
    view.defPosition("g8", 389, 29, 60, 60);
    view.defPosition("h8", 449, 29, 60, 60);
    view.defPosition("a7", 29, 89, 60, 60);
    view.defPosition("b7", 89, 89, 60, 60);
    view.defPosition("c7", 149, 89, 60, 60);
    view.defPosition("d7", 209, 89, 60, 60);
    view.defPosition("e7", 269, 89, 60, 60);
    view.defPosition("f7", 329, 89, 60, 60);
    view.defPosition("g7", 389, 89, 60, 60);
    view.defPosition("h7", 449, 89, 60, 60);
    view.defPosition("a6", 29, 149, 60, 60);
    view.defPosition("b6", 89, 149, 60, 60);
    view.defPosition("c6", 149, 149, 60, 60);
    view.defPosition("d6", 209, 149, 60, 60);
    view.defPosition("e6", 269, 149, 60, 60);
    view.defPosition("f6", 329, 149, 60, 60);
    view.defPosition("g6", 389, 149, 60, 60);
    view.defPosition("h6", 449, 149, 60, 60);
    view.defPosition("a5", 29, 209, 60, 60);
    view.defPosition("b5", 89, 209, 60, 60);
    view.defPosition("c5", 149, 209, 60, 60);
    view.defPosition("d5", 209, 209, 60, 60);
    view.defPosition("e5", 269, 209, 60, 60);
    view.defPosition("f5", 329, 209, 60, 60);
    view.defPosition("g5", 389, 209, 60, 60);
    view.defPosition("h5", 449, 209, 60, 60);
    view.defPosition("a4", 29, 269, 60, 60);
    view.defPosition("b4", 89, 269, 60, 60);
    view.defPosition("c4", 149, 269, 60, 60);
    view.defPosition("d4", 209, 269, 60, 60);
    view.defPosition("e4", 269, 269, 60, 60);
    view.defPosition("f4", 329, 269, 60, 60);
    view.defPosition("g4", 389, 269, 60, 60);
    view.defPosition("h4", 449, 269, 60, 60);
    view.defPosition("a3", 29, 329, 60, 60);
    view.defPosition("b3", 89, 329, 60, 60);
    view.defPosition("c3", 149, 329, 60, 60);
    view.defPosition("d3", 209, 329, 60, 60);
    view.defPosition("e3", 269, 329, 60, 60);
    view.defPosition("f3", 329, 329, 60, 60);
    view.defPosition("g3", 389, 329, 60, 60);
    view.defPosition("h3", 449, 329, 60, 60);
    view.defPosition("a2", 29, 389, 60, 60);
    view.defPosition("b2", 89, 389, 60, 60);
    view.defPosition("c2", 149, 389, 60, 60);
    view.defPosition("d2", 209, 389, 60, 60);
    view.defPosition("e2", 269, 389, 60, 60);
    view.defPosition("f2", 329, 389, 60, 60);
    view.defPosition("g2", 389, 389, 60, 60);
    view.defPosition("h2", 449, 389, 60, 60);
    view.defPosition("a1", 29, 449, 60, 60);
    view.defPosition("b1", 89, 449, 60, 60);
    view.defPosition("c1", 149, 449, 60, 60);
    view.defPosition("d1", 209, 449, 60, 60);
    view.defPosition("e1", 269, 449, 60, 60);
    view.defPosition("f1", 329, 449, 60, 60);
    view.defPosition("g1", 389, 449, 60, 60);
    view.defPosition("h1", 449, 449, 60, 60);
}
