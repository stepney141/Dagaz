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
    design.checkVersion("show-blink", "true");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-drops", "all");
    design.checkVersion("pass-turn", "forced");
    design.checkVersion("splut-extension", "true");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("n");

    design.addPlayer("South", [1, 0, 3, 2]);
    design.addPlayer("West", [0, 1, 2, 3]);
    design.addPlayer("North", [0, 1, 2, 3]);
    design.addPlayer("East", [0, 1, 2, 3]);
    design.addTurn(1);
    design.addTurn(3);
    design.addTurn(3);
    design.repeatMark();
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(3);
    design.addTurn(3);
    design.addTurn(3);

    design.addPosition("a9", [0, 0, 0, 0]);
    design.addPosition("b9", [0, 0, 0, 0]);
    design.addPosition("c9", [0, 0, 0, 0]);
    design.addPosition("d9", [0, 0, 0, 0]);
    design.addPosition("e9", [0, 0, 9, 0]);
    design.addPosition("f9", [0, 0, 0, 0]);
    design.addPosition("g9", [0, 0, 0, 0]);
    design.addPosition("h9", [0, 0, 0, 0]);
    design.addPosition("i9", [0, 0, 0, 0]);
    design.addPosition("a8", [0, 0, 0, 0]);
    design.addPosition("b8", [0, 0, 0, 0]);
    design.addPosition("c8", [0, 0, 0, 0]);
    design.addPosition("d8", [0, 1, 9, 0]);
    design.addPosition("e8", [-1, 1, 9, -9]);
    design.addPosition("f8", [-1, 0, 9, 0]);
    design.addPosition("g8", [0, 0, 0, 0]);
    design.addPosition("h8", [0, 0, 0, 0]);
    design.addPosition("i8", [0, 0, 0, 0]);
    design.addPosition("a7", [0, 0, 0, 0]);
    design.addPosition("b7", [0, 0, 0, 0]);
    design.addPosition("c7", [0, 1, 9, 0]);
    design.addPosition("d7", [-1, 1, 9, -9]);
    design.addPosition("e7", [-1, 1, 9, -9]);
    design.addPosition("f7", [-1, 1, 9, -9]);
    design.addPosition("g7", [-1, 0, 9, 0]);
    design.addPosition("h7", [0, 0, 0, 0]);
    design.addPosition("i7", [0, 0, 0, 0]);
    design.addPosition("a6", [0, 0, 0, 0]);
    design.addPosition("b6", [0, 1, 9, 0]);
    design.addPosition("c6", [-1, 1, 9, -9]);
    design.addPosition("d6", [-1, 1, 9, -9]);
    design.addPosition("e6", [-1, 1, 9, -9]);
    design.addPosition("f6", [-1, 1, 9, -9]);
    design.addPosition("g6", [-1, 1, 9, -9]);
    design.addPosition("h6", [-1, 0, 9, 0]);
    design.addPosition("i6", [0, 0, 0, 0]);
    design.addPosition("a5", [0, 1, 0, 0]);
    design.addPosition("b5", [-1, 1, 9, -9]);
    design.addPosition("c5", [-1, 1, 9, -9]);
    design.addPosition("d5", [-1, 1, 9, -9]);
    design.addPosition("e5", [-1, 1, 9, -9]);
    design.addPosition("f5", [-1, 1, 9, -9]);
    design.addPosition("g5", [-1, 1, 9, -9]);
    design.addPosition("h5", [-1, 1, 9, -9]);
    design.addPosition("i5", [-1, 0, 0, 0]);
    design.addPosition("a4", [0, 0, 0, 0]);
    design.addPosition("b4", [0, 1, 0, -9]);
    design.addPosition("c4", [-1, 1, 9, -9]);
    design.addPosition("d4", [-1, 1, 9, -9]);
    design.addPosition("e4", [-1, 1, 9, -9]);
    design.addPosition("f4", [-1, 1, 9, -9]);
    design.addPosition("g4", [-1, 1, 9, -9]);
    design.addPosition("h4", [-1, 0, 0, -9]);
    design.addPosition("i4", [0, 0, 0, 0]);
    design.addPosition("a3", [0, 0, 0, 0]);
    design.addPosition("b3", [0, 0, 0, 0]);
    design.addPosition("c3", [0, 1, 0, -9]);
    design.addPosition("d3", [-1, 1, 9, -9]);
    design.addPosition("e3", [-1, 1, 9, -9]);
    design.addPosition("f3", [-1, 1, 9, -9]);
    design.addPosition("g3", [-1, 0, 0, -9]);
    design.addPosition("h3", [0, 0, 0, 0]);
    design.addPosition("i3", [0, 0, 0, 0]);
    design.addPosition("a2", [0, 0, 0, 0]);
    design.addPosition("b2", [0, 0, 0, 0]);
    design.addPosition("c2", [0, 0, 0, 0]);
    design.addPosition("d2", [0, 1, 0, -9]);
    design.addPosition("e2", [-1, 1, 9, -9]);
    design.addPosition("f2", [-1, 0, 0, -9]);
    design.addPosition("g2", [0, 0, 0, 0]);
    design.addPosition("h2", [0, 0, 0, 0]);
    design.addPosition("i2", [0, 0, 0, 0]);
    design.addPosition("a1", [0, 0, 0, 0]);
    design.addPosition("b1", [0, 0, 0, 0]);
    design.addPosition("c1", [0, 0, 0, 0]);
    design.addPosition("d1", [0, 0, 0, 0]);
    design.addPosition("e1", [0, 0, 0, -9]);
    design.addPosition("f1", [0, 0, 0, 0]);
    design.addPosition("g1", [0, 0, 0, 0]);
    design.addPosition("h1", [0, 0, 0, 0]);
    design.addPosition("i1", [0, 0, 0, 0]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
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
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.IF,	6);
    design.addCommand(2, ZRF.LITERAL,	3);	// Stone
    design.addCommand(2, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(2, ZRF.IF,	3);
    design.addCommand(2, ZRF.LITERAL,	0);	// false
    design.addCommand(2, ZRF.JUMP,	2);
    design.addCommand(2, ZRF.LITERAL,	1);	// true
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addPiece("Wizard", 0);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [2], 0);
    design.addMove(0, 0, [0], 0);
    design.addMove(0, 0, [1], 0);

    design.addPiece("Dwarf", 1);
    design.addMove(1, 1, [3, 3], 0);
    design.addMove(1, 1, [2, 2], 0);
    design.addMove(1, 1, [0, 0], 0);
    design.addMove(1, 1, [1, 1], 0);

    design.addPiece("Troll", 2);
    design.addMove(2, 2, [3], 0);
    design.addMove(2, 2, [2], 0);
    design.addMove(2, 2, [0], 0);
    design.addMove(2, 2, [1], 0);

    design.addPiece("Stone", 3);

    design.setup("South", "Stone", 76);
    design.setup("South", "Wizard", 66);
    design.setup("South", "Dwarf", 67);
    design.setup("South", "Troll", 68);
    design.setup("North", "Stone", 4);
    design.setup("North", "Wizard", 14);
    design.setup("North", "Dwarf", 13);
    design.setup("North", "Troll", 12);
    design.setup("West", "Stone", 36);
    design.setup("East", "Stone", 44);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("SouthWizard", "South Wizard");
    view.defPiece("NorthWizard", "North Wizard");
    view.defPiece("WestWizard", "West Wizard");
    view.defPiece("EastWizard", "East Wizard");
    view.defPiece("NorthDwarf", "North Dwarf");
    view.defPiece("SouthDwarf", "South Dwarf");
    view.defPiece("WestDwarf", "West Dwarf");
    view.defPiece("EastDwarf", "East Dwarf");
    view.defPiece("NorthTroll", "North Troll");
    view.defPiece("SouthTroll", "South Troll");
    view.defPiece("WestTroll", "West Troll");
    view.defPiece("EastTroll", "East Troll");
    view.defPiece("NorthStone", "North Stone");
    view.defPiece("SouthStone", "South Stone");
    view.defPiece("WestStone", "West Stone");
    view.defPiece("EastStone", "East Stone");
 
    view.defPosition("a9", 8, 8, 48, 48);
    view.defPosition("b9", 48, 8, 48, 48);
    view.defPosition("c9", 88, 8, 48, 48);
    view.defPosition("d9", 128, 8, 48, 48);
    view.defPosition("e9", 168, 8, 48, 48);
    view.defPosition("f9", 208, 8, 48, 48);
    view.defPosition("g9", 248, 8, 48, 48);
    view.defPosition("h9", 288, 8, 48, 48);
    view.defPosition("i9", 328, 8, 48, 48);
    view.defPosition("a8", 8, 48, 48, 48);
    view.defPosition("b8", 48, 48, 48, 48);
    view.defPosition("c8", 88, 48, 48, 48);
    view.defPosition("d8", 128, 48, 48, 48);
    view.defPosition("e8", 168, 48, 48, 48);
    view.defPosition("f8", 208, 48, 48, 48);
    view.defPosition("g8", 248, 48, 48, 48);
    view.defPosition("h8", 288, 48, 48, 48);
    view.defPosition("i8", 328, 48, 48, 48);
    view.defPosition("a7", 8, 88, 48, 48);
    view.defPosition("b7", 48, 88, 48, 48);
    view.defPosition("c7", 88, 88, 48, 48);
    view.defPosition("d7", 128, 88, 48, 48);
    view.defPosition("e7", 168, 88, 48, 48);
    view.defPosition("f7", 208, 88, 48, 48);
    view.defPosition("g7", 248, 88, 48, 48);
    view.defPosition("h7", 288, 88, 48, 48);
    view.defPosition("i7", 328, 88, 48, 48);
    view.defPosition("a6", 8, 128, 48, 48);
    view.defPosition("b6", 48, 128, 48, 48);
    view.defPosition("c6", 88, 128, 48, 48);
    view.defPosition("d6", 128, 128, 48, 48);
    view.defPosition("e6", 168, 128, 48, 48);
    view.defPosition("f6", 208, 128, 48, 48);
    view.defPosition("g6", 248, 128, 48, 48);
    view.defPosition("h6", 288, 128, 48, 48);
    view.defPosition("i6", 328, 128, 48, 48);
    view.defPosition("a5", 8, 168, 48, 48);
    view.defPosition("b5", 48, 168, 48, 48);
    view.defPosition("c5", 88, 168, 48, 48);
    view.defPosition("d5", 128, 168, 48, 48);
    view.defPosition("e5", 168, 168, 48, 48);
    view.defPosition("f5", 208, 168, 48, 48);
    view.defPosition("g5", 248, 168, 48, 48);
    view.defPosition("h5", 288, 168, 48, 48);
    view.defPosition("i5", 328, 168, 48, 48);
    view.defPosition("a4", 8, 208, 48, 48);
    view.defPosition("b4", 48, 208, 48, 48);
    view.defPosition("c4", 88, 208, 48, 48);
    view.defPosition("d4", 128, 208, 48, 48);
    view.defPosition("e4", 168, 208, 48, 48);
    view.defPosition("f4", 208, 208, 48, 48);
    view.defPosition("g4", 248, 208, 48, 48);
    view.defPosition("h4", 288, 208, 48, 48);
    view.defPosition("i4", 328, 208, 48, 48);
    view.defPosition("a3", 8, 248, 48, 48);
    view.defPosition("b3", 48, 248, 48, 48);
    view.defPosition("c3", 88, 248, 48, 48);
    view.defPosition("d3", 128, 248, 48, 48);
    view.defPosition("e3", 168, 248, 48, 48);
    view.defPosition("f3", 208, 248, 48, 48);
    view.defPosition("g3", 248, 248, 48, 48);
    view.defPosition("h3", 288, 248, 48, 48);
    view.defPosition("i3", 328, 248, 48, 48);
    view.defPosition("a2", 8, 288, 48, 48);
    view.defPosition("b2", 48, 288, 48, 48);
    view.defPosition("c2", 88, 288, 48, 48);
    view.defPosition("d2", 128, 288, 48, 48);
    view.defPosition("e2", 168, 288, 48, 48);
    view.defPosition("f2", 208, 288, 48, 48);
    view.defPosition("g2", 248, 288, 48, 48);
    view.defPosition("h2", 288, 288, 48, 48);
    view.defPosition("i2", 328, 288, 48, 48);
    view.defPosition("a1", 8, 328, 48, 48);
    view.defPosition("b1", 48, 328, 48, 48);
    view.defPosition("c1", 88, 328, 48, 48);
    view.defPosition("d1", 128, 328, 48, 48);
    view.defPosition("e1", 168, 328, 48, 48);
    view.defPosition("f1", 208, 328, 48, 48);
    view.defPosition("g1", 248, 328, 48, 48);
    view.defPosition("h1", 288, 328, 48, 48);
    view.defPosition("i1", 328, 328, 48, 48);
}
