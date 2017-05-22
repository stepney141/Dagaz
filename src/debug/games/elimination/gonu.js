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
    design.checkVersion("prevent-flipping", "2");
    design.checkVersion("smart-moves", "true");
    design.checkVersion("animate-captures", "false");

    design.addDirection("w");
    design.addDirection("ww");
    design.addDirection("ee");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("nn");
    design.addDirection("n");
    design.addDirection("ss");

    design.addPlayer("Black", [3, 2, 1, 0, 6, 7, 4, 5]);
    design.addPlayer("White", [0, 1, 2, 3, 4, 5, 6, 7]);

    design.addPosition("a4", [0, 0, 2, 1, 4, 0, 0, 8]);
    design.addPosition("b4", [-1, 0, 2, 1, 4, 0, 0, 8]);
    design.addPosition("c4", [-1, -2, 0, 1, 4, 0, 0, 8]);
    design.addPosition("d4", [-1, -2, 0, 0, 4, 0, 0, 8]);
    design.addPosition("a3", [0, 0, 2, 1, 4, 0, -4, 8]);
    design.addPosition("b3", [-1, 0, 2, 1, 4, 0, -4, 8]);
    design.addPosition("c3", [-1, -2, 0, 1, 4, 0, -4, 8]);
    design.addPosition("d3", [-1, -2, 0, 0, 4, 0, -4, 8]);
    design.addPosition("a2", [0, 0, 2, 1, 4, -8, -4, 0]);
    design.addPosition("b2", [-1, 0, 2, 1, 4, -8, -4, 0]);
    design.addPosition("c2", [-1, -2, 0, 1, 4, -8, -4, 0]);
    design.addPosition("d2", [-1, -2, 0, 0, 4, -8, -4, 0]);
    design.addPosition("a1", [0, 0, 2, 1, 0, -8, -4, 0]);
    design.addPosition("b1", [-1, 0, 2, 1, 0, -8, -4, 0]);
    design.addPosition("c1", [-1, -2, 0, 1, 0, -8, -4, 0]);
    design.addPosition("d1", [-1, -2, 0, 0, 0, -8, -4, 0]);


    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// true
    design.addCommand(0, ZRF.SET_POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.PARAM,	1);	// $2
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.PARAM,	2);	// true
    design.addCommand(0, ZRF.SET_POS_FLAG,	1);	// to-pos
    design.addCommand(0, ZRF.ON_BOARD_DIR,	6);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	10);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	3);	// $4
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	105);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	4);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	4);	// $5
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	5);	// $6
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	1);	// to-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	6);	// $7
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	72);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	5);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	5);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	7);	// $8
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	8);	// $9
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	35);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	7);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	7);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	9);	// $10
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	10);	// $11
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	6);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	11);	// $12
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	26);	// capture
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	0);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	10);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	12);	// $13
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	105);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	3);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	13);	// $14
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	14);	// $15
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	1);	// to-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	15);	// $16
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	72);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	1);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	1);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	16);	// $17
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	17);	// $18
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	35);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	2);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	2);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	18);	// $19
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	19);	// $20
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	6);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	20);	// $21
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	26);	// capture
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	4);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	10);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	21);	// $22
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	105);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	6);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	22);	// $23
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	23);	// $24
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	1);	// to-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	24);	// $25
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	72);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	7);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	7);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	25);	// $26
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	26);	// $27
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	35);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	5);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	5);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	27);	// $28
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	28);	// $29
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	6);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	29);	// $30
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	26);	// capture
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	3);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	10);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	30);	// $31
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	105);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	0);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	31);	// $32
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	32);	// $33
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	1);	// to-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	33);	// $34
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	72);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	2);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	2);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	34);	// $35
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	35);	// $36
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	35);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	1);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	1);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	36);	// $37
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	37);	// $38
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	6);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	38);	// $39
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	26);	// capture
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	6);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	39);	// $40
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	40);	// $41
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	1);	// to-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	41);	// $42
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	132);
    design.addCommand(0, ZRF.FUNCTION,	6);	// mark
    design.addCommand(0, ZRF.PARAM,	42);	// $43
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.ON_BOARD_DIR,	6);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	10);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	43);	// $44
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	105);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	4);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	44);	// $45
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	45);	// $46
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	1);	// to-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	46);	// $47
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	72);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	5);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	5);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	47);	// $48
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	48);	// $49
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	35);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	7);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	7);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	49);	// $50
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	50);	// $51
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	6);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	51);	// $52
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	26);	// capture
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	7);	// back
    design.addCommand(0, ZRF.ON_BOARD_DIR,	0);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	52);	// $53
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	53);	// $54
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	1);	// to-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	54);	// $55
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	132);
    design.addCommand(0, ZRF.FUNCTION,	6);	// mark
    design.addCommand(0, ZRF.PARAM,	55);	// $56
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.ON_BOARD_DIR,	0);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	10);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	56);	// $57
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	105);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	3);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	57);	// $58
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	58);	// $59
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	1);	// to-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	59);	// $60
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	72);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	1);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	1);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	60);	// $61
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	61);	// $62
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	35);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	2);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	2);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	62);	// $63
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	63);	// $64
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	6);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	64);	// $65
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	26);	// capture
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	7);	// back
    design.addCommand(0, ZRF.ON_BOARD_DIR,	4);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	65);	// $66
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	66);	// $67
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	1);	// to-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	67);	// $68
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	132);
    design.addCommand(0, ZRF.FUNCTION,	6);	// mark
    design.addCommand(0, ZRF.PARAM,	68);	// $69
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.ON_BOARD_DIR,	4);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	10);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	69);	// $70
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	105);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	6);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	70);	// $71
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	71);	// $72
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	1);	// to-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	72);	// $73
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	72);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	7);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	7);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	73);	// $74
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	74);	// $75
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	35);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	5);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	5);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	75);	// $76
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	76);	// $77
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	6);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	77);	// $78
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	26);	// capture
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	7);	// back
    design.addCommand(0, ZRF.ON_BOARD_DIR,	3);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	78);	// $79
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	79);	// $80
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	1);	// to-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	80);	// $81
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	132);
    design.addCommand(0, ZRF.FUNCTION,	6);	// mark
    design.addCommand(0, ZRF.PARAM,	81);	// $82
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.ON_BOARD_DIR,	3);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	10);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	82);	// $83
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	105);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	0);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	83);	// $84
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	84);	// $85
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	1);	// to-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	85);	// $86
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	72);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	2);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	2);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	86);	// $87
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	87);	// $88
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	35);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	1);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	28);
    design.addCommand(0, ZRF.ON_BOARD_DIR,	1);	// name
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	20);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	88);	// $89
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.POS_FLAG,	0);	// from-pos
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	9);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	89);	// $90
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	3);
    design.addCommand(0, ZRF.LITERAL,	1);	// true
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.LITERAL,	0);	// false
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	6);
    design.addCommand(0, ZRF.PUSH,	0);
    design.addCommand(0, ZRF.PARAM,	90);	// $91
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	26);	// capture
    design.addCommand(0, ZRF.POP,	0);
    design.addCommand(0, ZRF.FUNCTION,	7);	// back
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end


    design.addPiece("Stone", 0);
    design.addMove(0, 0, [1, 6, 1, 6, 4, 4, 4, 5, 5, 7, 7, 6, 0, 3, 3, 3, 1, 1, 2, 2, 0, 4, 6, 6, 6, 7, 7, 5, 5, 4, 3, 0, 0, 0, 2, 2, 1, 1, 3, 6, 6, 6, 6, 6, 4, 4, 4, 5, 5, 7, 7, 6, 0, 0, 0, 0, 0, 3, 3, 3, 1, 1, 2, 2, 0, 4, 4, 4, 4, 4, 6, 6, 6, 7, 7, 5, 5, 4, 3, 3, 3, 3, 3, 0, 0, 0, 2, 2, 1, 1, 3], 0);
    design.addMove(0, 0, [1, 3, 1, 6, 4, 4, 4, 5, 5, 7, 7, 6, 0, 3, 3, 3, 1, 1, 2, 2, 0, 4, 6, 6, 6, 7, 7, 5, 5, 4, 3, 0, 0, 0, 2, 2, 1, 1, 3, 6, 6, 6, 6, 6, 4, 4, 4, 5, 5, 7, 7, 6, 0, 0, 0, 0, 0, 3, 3, 3, 1, 1, 2, 2, 0, 4, 4, 4, 4, 4, 6, 6, 6, 7, 7, 5, 5, 4, 3, 3, 3, 3, 3, 0, 0, 0, 2, 2, 1, 1, 3], 0);
    design.addMove(0, 0, [1, 4, 1, 6, 4, 4, 4, 5, 5, 7, 7, 6, 0, 3, 3, 3, 1, 1, 2, 2, 0, 4, 6, 6, 6, 7, 7, 5, 5, 4, 3, 0, 0, 0, 2, 2, 1, 1, 3, 6, 6, 6, 6, 6, 4, 4, 4, 5, 5, 7, 7, 6, 0, 0, 0, 0, 0, 3, 3, 3, 1, 1, 2, 2, 0, 4, 4, 4, 4, 4, 6, 6, 6, 7, 7, 5, 5, 4, 3, 3, 3, 3, 3, 0, 0, 0, 2, 2, 1, 1, 3], 0);
    design.addMove(0, 0, [1, 0, 1, 6, 4, 4, 4, 5, 5, 7, 7, 6, 0, 3, 3, 3, 1, 1, 2, 2, 0, 4, 6, 6, 6, 7, 7, 5, 5, 4, 3, 0, 0, 0, 2, 2, 1, 1, 3, 6, 6, 6, 6, 6, 4, 4, 4, 5, 5, 7, 7, 6, 0, 0, 0, 0, 0, 3, 3, 3, 1, 1, 2, 2, 0, 4, 4, 4, 4, 4, 6, 6, 6, 7, 7, 5, 5, 4, 3, 3, 3, 3, 3, 0, 0, 0, 2, 2, 1, 1, 3], 0);

    design.setup("White", "Stone", 4);
    design.setup("White", "Stone", 7);
    design.setup("White", "Stone", 0);
    design.setup("White", "Stone", 1);
    design.setup("White", "Stone", 2);
    design.setup("White", "Stone", 3);
    design.setup("Black", "Stone", 12);
    design.setup("Black", "Stone", 13);
    design.setup("Black", "Stone", 14);
    design.setup("Black", "Stone", 15);
    design.setup("Black", "Stone", 8);
    design.setup("Black", "Stone", 11);

}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteStone", "White Stone");
    view.defPiece("BlackStone", "Black Stone");
 
    view.defPosition("a4", 2, 2, 61, 61);
    view.defPosition("b4", 63, 2, 61, 61);
    view.defPosition("c4", 124, 2, 61, 61);
    view.defPosition("d4", 185, 2, 61, 61);
    view.defPosition("a3", 2, 63, 61, 61);
    view.defPosition("b3", 63, 63, 61, 61);
    view.defPosition("c3", 124, 63, 61, 61);
    view.defPosition("d3", 185, 63, 61, 61);
    view.defPosition("a2", 2, 124, 61, 61);
    view.defPosition("b2", 63, 124, 61, 61);
    view.defPosition("c2", 124, 124, 61, 61);
    view.defPosition("d2", 185, 124, 61, 61);
    view.defPosition("a1", 2, 185, 61, 61);
    view.defPosition("b1", 63, 185, 61, 61);
    view.defPosition("c1", 124, 185, 61, 61);
    view.defPosition("d1", 185, 185, 61, 61);
}
