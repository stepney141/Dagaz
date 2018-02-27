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
    design.checkVersion("smart-moves", "true");
    design.checkVersion("show-blink", "false");

    design.addDirection("nx");

    design.addPlayer("South", [0]);
    design.addPlayer("North", [0]);

    design.addPosition("a2", [9]);
    design.addPosition("b2", [-1]);
    design.addPosition("c2", [-1]);
    design.addPosition("d2", [-1]);
    design.addPosition("e2", [-1]);
    design.addPosition("f2", [-1]);
    design.addPosition("g2", [-1]);
    design.addPosition("h2", [-1]);
    design.addPosition("i2", [-1]);
    design.addPosition("a1", [1]);
    design.addPosition("b1", [1]);
    design.addPosition("c1", [1]);
    design.addPosition("d1", [1]);
    design.addPosition("e1", [1]);
    design.addPosition("f1", [1]);
    design.addPosition("g1", [1]);
    design.addPosition("h1", [1]);
    design.addPosition("i1", [-9]);
    design.addPosition("2", [0]);
    design.addPosition("1", [0]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("Seed", 0);
    design.addMove(0, 0, [0], 0);

    design.addPiece("Tuzdyk", 1);

    design.setup("South", "Seed", 9);
    design.setup("South", "Seed", 10);
    design.setup("South", "Seed", 11);
    design.setup("South", "Seed", 12);
    design.setup("South", "Seed", 13);
    design.setup("South", "Seed", 14);
    design.setup("South", "Seed", 15);
    design.setup("South", "Seed", 16);
    design.setup("South", "Seed", 17);
    design.setup("North", "Seed", 0);
    design.setup("North", "Seed", 1);
    design.setup("North", "Seed", 2);
    design.setup("North", "Seed", 3);
    design.setup("North", "Seed", 4);
    design.setup("North", "Seed", 5);
    design.setup("North", "Seed", 6);
    design.setup("North", "Seed", 7);
    design.setup("North", "Seed", 8);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("SouthSeed", "South Seed");
    view.defPiece("NorthSeed", "North Seed");
    view.defPiece("SouthTuzdyk", "South Tuzdyk");
    view.defPiece("NorthTuzdyk", "North Tuzdyk");
 
    view.defPosition("a2", 4, 9, 70, 270);
    view.defPosition("b2", 74, 9, 70, 270);
    view.defPosition("c2", 144, 9, 70, 270);
    view.defPosition("d2", 214, 9, 70, 270);
    view.defPosition("e2", 284, 9, 70, 270);
    view.defPosition("f2", 354, 9, 70, 270);
    view.defPosition("g2", 424, 9, 70, 270);
    view.defPosition("h2", 494, 9, 70, 270);
    view.defPosition("i2", 564, 9, 70, 270);
    view.defPosition("a1", 4, 543, 70, 270);
    view.defPosition("b1", 74, 543, 70, 270);
    view.defPosition("c1", 144, 543, 70, 270);
    view.defPosition("d1", 214, 543, 70, 270);
    view.defPosition("e1", 284, 543, 70, 270);
    view.defPosition("f1", 354, 543, 70, 270);
    view.defPosition("g1", 424, 543, 70, 270);
    view.defPosition("h1", 494, 543, 70, 270);
    view.defPosition("i1", 564, 543, 70, 270);
    view.defPosition("2", 8, 288, 620, 120);
    view.defPosition("1", 8, 416, 620, 120);
}
