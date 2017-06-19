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
    design.checkVersion("highlight-goals", "false");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("n");

    design.addPlayer("White", [1, 0, 3, 2]);
    design.addPlayer("Black", [0, 1, 2, 3]);

    design.addPosition("a5", [0, 1, 5, 0]);
    design.addPosition("b5", [-1, 1, 5, 0]);
    design.addPosition("c5", [-1, 1, 5, 0]);
    design.addPosition("d5", [-1, 1, 5, 0]);
    design.addPosition("e5", [-1, 0, 5, 0]);
    design.addPosition("a4", [0, 1, 5, -5]);
    design.addPosition("b4", [-1, 1, 5, -5]);
    design.addPosition("c4", [-1, 1, 5, -5]);
    design.addPosition("d4", [-1, 1, 5, -5]);
    design.addPosition("e4", [-1, 0, 5, -5]);
    design.addPosition("a3", [0, 1, 5, -5]);
    design.addPosition("b3", [-1, 1, 5, -5]);
    design.addPosition("c3", [-1, 1, 5, -5]);
    design.addPosition("d3", [-1, 1, 5, -5]);
    design.addPosition("e3", [-1, 0, 5, -5]);
    design.addPosition("a2", [0, 1, 5, -5]);
    design.addPosition("b2", [-1, 1, 5, -5]);
    design.addPosition("c2", [-1, 1, 5, -5]);
    design.addPosition("d2", [-1, 1, 5, -5]);
    design.addPosition("e2", [-1, 0, 5, -5]);
    design.addPosition("a1", [0, 1, 0, -5]);
    design.addPosition("b1", [-1, 1, 0, -5]);
    design.addPosition("c1", [-1, 1, 0, -5]);
    design.addPosition("d1", [-1, 1, 0, -5]);
    design.addPosition("e1", [-1, 0, 0, -5]);

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
    design.addCommand(1, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	26);	// capture
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	26);	// capture
    design.addCommand(2, ZRF.PARAM,	1);	// $2
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PARAM,	2);	// $3
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	26);	// capture
    design.addCommand(2, ZRF.PARAM,	3);	// $4
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	26);	// capture
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.PARAM,	2);	// $3
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	26);	// capture
    design.addCommand(3, ZRF.PARAM,	3);	// $4
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.PARAM,	4);	// $5
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	26);	// capture
    design.addCommand(3, ZRF.PARAM,	5);	// $6
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

//    design.addPriority(0);			// jump-type
//    design.addPriority(1);			// shift-type

    design.addPiece("Runner", 0);
    design.addMove(0, 0, [3], 1);
    design.addMove(0, 1, [3, 3], 0);
    design.addMove(0, 2, [3, 3, 3, 3], 0);
    design.addMove(0, 3, [3, 3, 3, 3, 3, 3], 0);

    design.addPiece("Left", 1);
    design.addMove(1, 0, [1], 1);
    design.addMove(1, 1, [1, 1], 0);
    design.addMove(1, 2, [1, 1, 1, 1], 0);
    design.addMove(1, 3, [1, 1, 1, 1, 1, 1], 0);

    design.addPiece("Right", 2);
    design.addMove(2, 0, [0], 1);
    design.addMove(2, 1, [0, 0], 0);
    design.addMove(2, 2, [0, 0, 0, 0], 0);
    design.addMove(2, 3, [0, 0, 0, 0, 0, 0], 0);

    design.setup("White", "Runner", 21);
    design.setup("White", "Runner", 22);
    design.setup("White", "Runner", 23);
    design.setup("Black", "Left", 15);
    design.setup("Black", "Left", 10);
    design.setup("Black", "Left", 5);
    design.setup("Black", "Right", 19);
    design.setup("Black", "Right", 14);
    design.setup("Black", "Right", 9);

    design.goal(0, "White", "Runner", [1]);
    design.goal(1, "White", "Runner", [2]);
    design.goal(2, "White", "Runner", [3]);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteRunner", "White Runner");
    view.defPiece("BlackLeft", "Black Left");
    view.defPiece("BlackRight", "Black Right");
 
    view.defPosition("a5", 2, 2, 80, 80);
    view.defPosition("b5", 82, 2, 80, 80);
    view.defPosition("c5", 162, 2, 80, 80);
    view.defPosition("d5", 242, 2, 80, 80);
    view.defPosition("e5", 322, 2, 80, 80);
    view.defPosition("a4", 2, 82, 80, 80);
    view.defPosition("b4", 82, 82, 80, 80);
    view.defPosition("c4", 162, 82, 80, 80);
    view.defPosition("d4", 242, 82, 80, 80);
    view.defPosition("e4", 322, 82, 80, 80);
    view.defPosition("a3", 2, 162, 80, 80);
    view.defPosition("b3", 82, 162, 80, 80);
    view.defPosition("c3", 162, 162, 80, 80);
    view.defPosition("d3", 242, 162, 80, 80);
    view.defPosition("e3", 322, 162, 80, 80);
    view.defPosition("a2", 2, 242, 80, 80);
    view.defPosition("b2", 82, 242, 80, 80);
    view.defPosition("c2", 162, 242, 80, 80);
    view.defPosition("d2", 242, 242, 80, 80);
    view.defPosition("e2", 322, 242, 80, 80);
    view.defPosition("a1", 2, 322, 80, 80);
    view.defPosition("b1", 82, 322, 80, 80);
    view.defPosition("c1", 162, 322, 80, 80);
    view.defPosition("d1", 242, 322, 80, 80);
    view.defPosition("e1", 322, 322, 80, 80);
}
