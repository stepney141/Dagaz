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

    design.addDirection("kagga");
    design.addDirection("v");
    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("ee");
    design.addDirection("ww");
    design.addDirection("ve");
    design.addDirection("vw");
    design.addDirection("ev");
    design.addDirection("wv");
    design.addDirection("xv");
    design.addDirection("wedge");

    design.addPlayer("Gold", [0, 1, 3, 2, 5, 4, 9, 8, 7, 6, 10, 11]);
    design.addPlayer("Green", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    design.addTurn(1, 2);
/*  design.addTurn(1, 2);
    design.addTurn(1, 2);
    design.addTurn(1, 2);
    design.addTurn(1, 2);
    design.addTurn(1, 2);
    design.addTurn(1, 2);
    design.addTurn(1, 2);
    design.addTurn(1, 2);*/
    design.addTurn(2, 2);
/*  design.addTurn(2, 2);
    design.addTurn(2, 2);
    design.addTurn(2, 2);
    design.addTurn(2, 2);
    design.addTurn(2, 2);
    design.addTurn(2, 2);
    design.addTurn(2, 2);
    design.addTurn(2, 2);
    design.addTurn(1, 0);
    design.addTurn(2, 0);*/
    design.repeatMark();
    design.addTurn(1, 1);
    design.addTurn(2, 1);

    design.addPosition("Kagga-Crown", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("A19", [-1, 4, 0, 0, 0, 0, 6, 2, 0, 0, 1, 12]);
    design.addPosition("A19V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("B18", [0, 8, 0, 2, 4, 0, 10, 6, -2, 0, 1, 10]);
    design.addPosition("B18V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("B19", [0, -4, -2, 2, 0, 0, 0, 0, 10, 6, 1, 8]);
    design.addPosition("B19V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("B29", [0, 8, -2, 0, 0, -4, 10, 6, 0, -6, 1, 6]);
    design.addPosition("B29V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("C17", [0, 12, 0, 2, 4, 0, 14, 10, -6, 0, 1, 0]);
    design.addPosition("C17V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("C18", [0, -8, -2, 2, 4, 0, -6, 0, 14, 10, 1, 0]);
    design.addPosition("C18V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("C28", [0, 12, -2, 2, 4, -4, 14, 10, -6, -10, 1, 0]);
    design.addPosition("C28V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("C29", [0, -8, -2, 2, 0, -4, 0, -10, 14, 10, 1, 0]);
    design.addPosition("C29V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("C39", [0, 12, -2, 0, 0, -4, 14, 10, 0, -10, 1, 0]);
    design.addPosition("C39V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("D16", [0, 16, 0, 2, 4, 0, 18, 14, -10, 0, 1, 0]);
    design.addPosition("D16V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("D17", [0, -12, -2, 2, 4, 0, -10, 0, 18, 14, 1, 0]);
    design.addPosition("D17V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("D27", [0, 16, -2, 2, 4, -4, 18, 14, -10, -14, 1, 0]);
    design.addPosition("D27V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("D28", [0, -12, -2, 2, 4, -4, -10, -14, 18, 14, 1, 0]);
    design.addPosition("D28V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("D38", [0, 16, -2, 2, 4, -4, 18, 14, -10, -14, 1, 0]);
    design.addPosition("D38V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("D39", [0, -12, -2, 2, 0, -4, 0, -14, 18, 14, 1, 0]);
    design.addPosition("D39V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("D49", [0, 16, -2, 0, 0, -4, 18, 14, 0, -14, 1, 0]);
    design.addPosition("D49V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("E15", [0, 20, 0, 2, 4, 0, 22, 18, -14, 0, 1, 0]);
    design.addPosition("E15V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("E16", [0, -16, -2, 2, 4, 0, -14, 0, 22, 18, 1, 0]);
    design.addPosition("E16V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("E26", [0, 20, -2, 2, 4, -4, 22, 18, -14, -18, 1, 0]);
    design.addPosition("E26V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("E27", [0, -16, -2, 2, 4, -4, -14, -18, 22, 18, 1, 0]);
    design.addPosition("E27V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("E37", [0, 20, -2, 2, 4, -4, 22, 18, -14, -18, 1, 0]);
    design.addPosition("E37V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("E38", [0, -16, -2, 2, 4, -4, -14, -18, 22, 18, 1, 0]);
    design.addPosition("E38V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("E48", [0, 20, -2, 2, 4, -4, 22, 18, -14, -18, 1, 0]);
    design.addPosition("E48V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("E49", [0, -16, -2, 2, 0, -4, 0, -18, 22, 18, 1, 0]);
    design.addPosition("E49V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("E59", [0, 20, -2, 0, 0, -4, 22, 18, 0, -18, 1, 0]);
    design.addPosition("E59V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("F14", [0, 24, 0, 2, 4, 0, 26, 22, -18, 0, 1, 0]);
    design.addPosition("F14V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("F15", [0, -20, -2, 2, 4, 0, -18, 0, 26, 22, 1, 0]);
    design.addPosition("F15V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("F25", [0, 24, -2, 2, 4, -4, 26, 22, -18, -22, 1, 0]);
    design.addPosition("F25V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("F26", [0, -20, -2, 2, 4, -4, -18, -22, 26, 22, 1, 0]);
    design.addPosition("F26V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("F36", [0, 24, -2, 2, 4, -4, 26, 22, -18, -22, 1, 0]);
    design.addPosition("F36V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("F37", [0, -20, -2, 2, 4, -4, -18, -22, 26, 22, 1, 0]);
    design.addPosition("F37V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("F47", [0, 24, -2, 2, 4, -4, 26, 22, -18, -22, 1, 0]);
    design.addPosition("F47V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("F48", [0, -20, -2, 2, 4, -4, -18, -22, 26, 22, 1, 0]);
    design.addPosition("F48V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("F58", [0, 24, -2, 2, 4, -4, 26, 22, -18, -22, 1, 0]);
    design.addPosition("F58V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("F59", [0, -20, -2, 2, 0, -4, 0, -22, 26, 22, 1, 0]);
    design.addPosition("F59V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("F69", [0, 24, -2, 0, 0, -4, 26, 22, 0, -22, 1, 0]);
    design.addPosition("F69V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("G13", [0, 28, 0, 2, 4, 0, 30, 26, -22, 0, 1, 0]);
    design.addPosition("G13V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("G14", [0, -24, -2, 2, 4, 0, -22, 0, 30, 26, 1, 0]);
    design.addPosition("G14V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("G24", [0, 28, -2, 2, 4, -4, 30, 26, -22, -26, 1, 0]);
    design.addPosition("G24V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("G25", [0, -24, -2, 2, 4, -4, -22, -26, 30, 26, 1, 0]);
    design.addPosition("G25V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("G35", [0, 28, -2, 2, 4, -4, 30, 26, -22, -26, 1, 0]);
    design.addPosition("G35V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("G36", [0, -24, -2, 2, 4, -4, -22, -26, 30, 26, 1, 0]);
    design.addPosition("G36V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("G46", [0, 28, -2, 2, 4, -4, 30, 26, -22, -26, 1, 0]);
    design.addPosition("G46V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("G47", [0, -24, -2, 2, 4, -4, -22, -26, 30, 26, 1, 0]);
    design.addPosition("G47V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("G57", [0, 28, -2, 2, 4, -4, 30, 26, -22, -26, 1, 0]);
    design.addPosition("G57V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("G58", [0, -24, -2, 2, 4, -4, -22, -26, 30, 26, 1, 0]);
    design.addPosition("G58V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("G68", [0, 28, -2, 2, 4, -4, 30, 26, -22, -26, 1, 0]);
    design.addPosition("G68V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("G69", [0, -24, -2, 2, 0, -4, 0, -26, 30, 26, 1, 0]);
    design.addPosition("G69V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("G79", [0, 28, -2, 0, 0, -4, 30, 26, 0, -26, 1, 0]);
    design.addPosition("G79V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H12", [0, 32, 0, 2, 4, 0, 34, 30, -26, 0, 1, 4]);
    design.addPosition("H12V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H13", [0, -28, -2, 2, 4, 0, -26, 0, 34, 30, 1, 0]);
    design.addPosition("H13V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H23", [0, 32, -2, 2, 4, -4, 34, 30, -26, -30, 1, 0]);
    design.addPosition("H23V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H24", [0, -28, -2, 2, 4, -4, -26, -30, 34, 30, 1, 0]);
    design.addPosition("H24V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H34", [0, 32, -2, 2, 4, -4, 34, 30, -26, -30, 1, 0]);
    design.addPosition("H34V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H35", [0, -28, -2, 2, 4, -4, -26, -30, 34, 30, 1, 0]);
    design.addPosition("H35V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H45", [0, 32, -2, 2, 4, -4, 34, 30, -26, -30, 1, 0]);
    design.addPosition("H45V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H46", [0, -28, -2, 2, 4, -4, -26, -30, 34, 30, 1, 0]);
    design.addPosition("H46V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H56", [0, 32, -2, 2, 4, -4, 34, 30, -26, -30, 1, 0]);
    design.addPosition("H56V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H57", [0, -28, -2, 2, 4, -4, -26, -30, 34, 30, 1, 0]);
    design.addPosition("H57V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H67", [0, 32, -2, 2, 4, -4, 34, 30, -26, -30, 1, 0]);
    design.addPosition("H67V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H68", [0, -28, -2, 2, 4, -4, -26, -30, 34, 30, 1, 0]);
    design.addPosition("H68V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H78", [0, 32, -2, 2, 4, -4, 34, 30, -26, -30, 1, 0]);
    design.addPosition("H78V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H79", [0, -28, -2, 2, 0, -4, 0, -30, 34, 30, 1, 0]);
    design.addPosition("H79V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("H89", [0, 32, -2, 0, 0, -4, 34, 30, 0, -30, 1, -4]);
    design.addPosition("H89V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I11", [0, 0, 0, 2, 4, 0, 0, 0, -30, 0, 1, -26]);
    design.addPosition("I11V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I12", [0, -32, -2, 2, 4, 0, -30, 0, 0, 0, 1, -28]);
    design.addPosition("I12V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I22", [0, 0, -2, 2, 4, -4, 0, 0, -30, -34, 1, -30]);
    design.addPosition("I22V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I23", [0, -32, -2, 2, 4, -4, -30, -34, 0, 0, 1, 0]);
    design.addPosition("I23V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I33", [0, 0, -2, 2, 4, -4, 0, 0, -30, -34, 1, 0]);
    design.addPosition("I33V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I34", [0, -32, -2, 2, 4, -4, -30, -34, 0, 0, 1, 0]);
    design.addPosition("I34V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I44", [0, 0, -2, 2, 4, -4, 0, 0, -30, -34, 1, 0]);
    design.addPosition("I44V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I45", [0, -32, -2, 2, 4, -4, -30, -34, 0, 0, 1, 0]);
    design.addPosition("I45V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I55", [0, 0, -2, 2, 4, -4, 0, 0, -30, -34, 1, 0]);
    design.addPosition("I55V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I56", [0, -32, -2, 2, 4, -4, -30, -34, 0, 0, 1, 0]);
    design.addPosition("I56V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I66", [0, 0, -2, 2, 4, -4, 0, 0, -30, -34, 1, 0]);
    design.addPosition("I66V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I67", [0, -32, -2, 2, 4, -4, -30, -34, 0, 0, 1, 0]);
    design.addPosition("I67V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I77", [0, 0, -2, 2, 4, -4, 0, 0, -30, -34, 1, 0]);
    design.addPosition("I77V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I78", [0, -32, -2, 2, 4, -4, -30, -34, 0, 0, 1, 0]);
    design.addPosition("I78V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I88", [0, 0, -2, 2, 4, -4, 0, 0, -30, -34, 1, -34]);
    design.addPosition("I88V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I89", [0, -32, -2, 2, 0, -4, 0, -34, 0, 0, 1, -36]);
    design.addPosition("I89V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);
    design.addPosition("I99", [0, 0, -2, 0, 0, -4, 0, 0, 0, -34, 1, -38]);
    design.addPosition("I99V", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0]);

    design.addZone("board-zone", 1, [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121, 123, 125, 127, 129, 131, 133, 135, 137, 139, 141, 143, 145, 147, 149, 151, 153, 155, 157, 159, 161]);
    design.addZone("board-zone", 2, [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121, 123, 125, 127, 129, 131, 133, 135, 137, 139, 141, 143, 145, 147, 149, 151, 153, 155, 157, 159, 161]);
    design.addZone("wedge", 1, [13, 103, 123]);
    design.addZone("wedge", 2, [13, 103, 123]);
    design.addZone("dishonor", 1, [1, 3, 5, 7, 99, 127, 129, 131, 133, 157, 159, 161]);
    design.addZone("dishonor", 2, [1, 3, 5, 7, 99, 127, 129, 131, 133, 157, 159, 161]);

    design.addCommand(0, ZRF.IN_ZONE,	0);	// board-zone
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.FUNCTION,	7);	// back
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	2);	// $3
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.PARAM,	3);	// $4
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.PARAM,	4);	// $5
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.PARAM,	1);	// $2
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.FUNCTION,	7);	// back
    design.addCommand(2, ZRF.PARAM,	2);	// $3
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	3);	// $4
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.PARAM,	4);	// $5
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.PARAM,	5);	// $6
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.PARAM,	6);	// $7
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	2);	// $3
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.FUNCTION,	7);	// back
    design.addCommand(3, ZRF.PARAM,	3);	// $4
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	4);	// $5
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	5);	// $6
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	6);	// $7
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	7);	// $8
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.PARAM,	8);	// $9
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.IF,	6);
    design.addCommand(4, ZRF.PARAM,	1);	// $2
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.PROMOTE,	2);	// Vanguard-carrier
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.JUMP,	5);
    design.addCommand(4, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.PROMOTE,	1);	// Vanguard
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.PARAM,	0);	// $1
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.IF,	6);
    design.addCommand(6, ZRF.PARAM,	1);	// $2
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.PROMOTE,	4);	// Power-Vanguard-carrier
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.JUMP,	5);
    design.addCommand(6, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addCommand(7, ZRF.FUNCTION,	24);	// from
    design.addCommand(7, ZRF.PARAM,	0);	// $1
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.PARAM,	1);	// $2
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.IF,	6);
    design.addCommand(7, ZRF.PARAM,	2);	// $3
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.PROMOTE,	4);	// Power-Vanguard-carrier
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.JUMP,	5);
    design.addCommand(7, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.FUNCTION,	28);	// end

    design.addCommand(8, ZRF.FUNCTION,	24);	// from
    design.addCommand(8, ZRF.PARAM,	0);	// $1
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.PROMOTE,	3);	// Power-Vanguard
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.FUNCTION,	28);	// end

    design.addCommand(9, ZRF.FUNCTION,	24);	// from
    design.addCommand(9, ZRF.PARAM,	0);	// $1
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.PARAM,	1);	// $2
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.PROMOTE,	3);	// Power-Vanguard
    design.addCommand(9, ZRF.FUNCTION,	25);	// to
    design.addCommand(9, ZRF.FUNCTION,	28);	// end

    design.addCommand(10, ZRF.FUNCTION,	24);	// from
    design.addCommand(10, ZRF.PARAM,	0);	// $1
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(10, ZRF.FUNCTION,	0);	// not
    design.addCommand(10, ZRF.IF,	6);
    design.addCommand(10, ZRF.PARAM,	1);	// $2
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.PROMOTE,	6);	// Lancer-carrier
    design.addCommand(10, ZRF.FUNCTION,	25);	// to
    design.addCommand(10, ZRF.JUMP,	5);
    design.addCommand(10, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(10, ZRF.FUNCTION,	0);	// not
    design.addCommand(10, ZRF.FUNCTION,	20);	// verify
    design.addCommand(10, ZRF.FUNCTION,	25);	// to
    design.addCommand(10, ZRF.FUNCTION,	28);	// end

    design.addCommand(11, ZRF.FUNCTION,	24);	// from
    design.addCommand(11, ZRF.PARAM,	0);	// $1
    design.addCommand(11, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(11, ZRF.PARAM,	1);	// $2
    design.addCommand(11, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(11, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(11, ZRF.FUNCTION,	0);	// not
    design.addCommand(11, ZRF.IF,	6);
    design.addCommand(11, ZRF.PARAM,	2);	// $3
    design.addCommand(11, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(11, ZRF.PROMOTE,	6);	// Lancer-carrier
    design.addCommand(11, ZRF.FUNCTION,	25);	// to
    design.addCommand(11, ZRF.JUMP,	5);
    design.addCommand(11, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(11, ZRF.FUNCTION,	0);	// not
    design.addCommand(11, ZRF.FUNCTION,	20);	// verify
    design.addCommand(11, ZRF.FUNCTION,	25);	// to
    design.addCommand(11, ZRF.FUNCTION,	28);	// end

    design.addCommand(12, ZRF.FUNCTION,	24);	// from
    design.addCommand(12, ZRF.PARAM,	0);	// $1
    design.addCommand(12, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(12, ZRF.PARAM,	1);	// $2
    design.addCommand(12, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(12, ZRF.PARAM,	2);	// $3
    design.addCommand(12, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(12, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(12, ZRF.FUNCTION,	0);	// not
    design.addCommand(12, ZRF.IF,	6);
    design.addCommand(12, ZRF.PARAM,	3);	// $4
    design.addCommand(12, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(12, ZRF.PROMOTE,	6);	// Lancer-carrier
    design.addCommand(12, ZRF.FUNCTION,	25);	// to
    design.addCommand(12, ZRF.JUMP,	5);
    design.addCommand(12, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(12, ZRF.FUNCTION,	0);	// not
    design.addCommand(12, ZRF.FUNCTION,	20);	// verify
    design.addCommand(12, ZRF.FUNCTION,	25);	// to
    design.addCommand(12, ZRF.FUNCTION,	28);	// end

    design.addCommand(13, ZRF.FUNCTION,	24);	// from
    design.addCommand(13, ZRF.PARAM,	0);	// $1
    design.addCommand(13, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(13, ZRF.PROMOTE,	5);	// Lancer
    design.addCommand(13, ZRF.FUNCTION,	25);	// to
    design.addCommand(13, ZRF.FUNCTION,	28);	// end

    design.addCommand(14, ZRF.FUNCTION,	24);	// from
    design.addCommand(14, ZRF.PARAM,	0);	// $1
    design.addCommand(14, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(14, ZRF.PARAM,	1);	// $2
    design.addCommand(14, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(14, ZRF.PROMOTE,	5);	// Lancer
    design.addCommand(14, ZRF.FUNCTION,	25);	// to
    design.addCommand(14, ZRF.FUNCTION,	28);	// end

    design.addCommand(15, ZRF.FUNCTION,	24);	// from
    design.addCommand(15, ZRF.PARAM,	0);	// $1
    design.addCommand(15, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(15, ZRF.PARAM,	1);	// $2
    design.addCommand(15, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(15, ZRF.PARAM,	2);	// $3
    design.addCommand(15, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(15, ZRF.PROMOTE,	5);	// Lancer
    design.addCommand(15, ZRF.FUNCTION,	25);	// to
    design.addCommand(15, ZRF.FUNCTION,	28);	// end

    design.addCommand(16, ZRF.FUNCTION,	24);	// from
    design.addCommand(16, ZRF.PARAM,	0);	// $1
    design.addCommand(16, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(16, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(16, ZRF.FUNCTION,	0);	// not
    design.addCommand(16, ZRF.IF,	6);
    design.addCommand(16, ZRF.PARAM,	1);	// $2
    design.addCommand(16, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(16, ZRF.PROMOTE,	8);	// Fencer-carrier
    design.addCommand(16, ZRF.FUNCTION,	25);	// to
    design.addCommand(16, ZRF.JUMP,	5);
    design.addCommand(16, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(16, ZRF.FUNCTION,	0);	// not
    design.addCommand(16, ZRF.FUNCTION,	20);	// verify
    design.addCommand(16, ZRF.FUNCTION,	25);	// to
    design.addCommand(16, ZRF.FUNCTION,	28);	// end

    design.addCommand(17, ZRF.FUNCTION,	24);	// from
    design.addCommand(17, ZRF.PARAM,	0);	// $1
    design.addCommand(17, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(17, ZRF.PARAM,	1);	// $2
    design.addCommand(17, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(17, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(17, ZRF.FUNCTION,	0);	// not
    design.addCommand(17, ZRF.IF,	6);
    design.addCommand(17, ZRF.PARAM,	2);	// $3
    design.addCommand(17, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(17, ZRF.PROMOTE,	8);	// Fencer-carrier
    design.addCommand(17, ZRF.FUNCTION,	25);	// to
    design.addCommand(17, ZRF.JUMP,	5);
    design.addCommand(17, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(17, ZRF.FUNCTION,	0);	// not
    design.addCommand(17, ZRF.FUNCTION,	20);	// verify
    design.addCommand(17, ZRF.FUNCTION,	25);	// to
    design.addCommand(17, ZRF.FUNCTION,	28);	// end

    design.addCommand(18, ZRF.FUNCTION,	24);	// from
    design.addCommand(18, ZRF.PARAM,	0);	// $1
    design.addCommand(18, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(18, ZRF.PARAM,	1);	// $2
    design.addCommand(18, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(18, ZRF.PARAM,	2);	// $3
    design.addCommand(18, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(18, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(18, ZRF.FUNCTION,	0);	// not
    design.addCommand(18, ZRF.IF,	6);
    design.addCommand(18, ZRF.PARAM,	3);	// $4
    design.addCommand(18, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(18, ZRF.PROMOTE,	8);	// Fencer-carrier
    design.addCommand(18, ZRF.FUNCTION,	25);	// to
    design.addCommand(18, ZRF.JUMP,	5);
    design.addCommand(18, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(18, ZRF.FUNCTION,	0);	// not
    design.addCommand(18, ZRF.FUNCTION,	20);	// verify
    design.addCommand(18, ZRF.FUNCTION,	25);	// to
    design.addCommand(18, ZRF.FUNCTION,	28);	// end

    design.addCommand(19, ZRF.FUNCTION,	24);	// from
    design.addCommand(19, ZRF.PARAM,	0);	// $1
    design.addCommand(19, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(19, ZRF.PROMOTE,	7);	// Fencer
    design.addCommand(19, ZRF.FUNCTION,	25);	// to
    design.addCommand(19, ZRF.FUNCTION,	28);	// end

    design.addCommand(20, ZRF.FUNCTION,	24);	// from
    design.addCommand(20, ZRF.PARAM,	0);	// $1
    design.addCommand(20, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(20, ZRF.PARAM,	1);	// $2
    design.addCommand(20, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(20, ZRF.PROMOTE,	7);	// Fencer
    design.addCommand(20, ZRF.FUNCTION,	25);	// to
    design.addCommand(20, ZRF.FUNCTION,	28);	// end

    design.addCommand(21, ZRF.FUNCTION,	24);	// from
    design.addCommand(21, ZRF.PARAM,	0);	// $1
    design.addCommand(21, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(21, ZRF.PARAM,	1);	// $2
    design.addCommand(21, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(21, ZRF.PARAM,	2);	// $3
    design.addCommand(21, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(21, ZRF.PROMOTE,	7);	// Fencer
    design.addCommand(21, ZRF.FUNCTION,	25);	// to
    design.addCommand(21, ZRF.FUNCTION,	28);	// end

    design.addCommand(22, ZRF.FUNCTION,	24);	// from
    design.addCommand(22, ZRF.PARAM,	0);	// $1
    design.addCommand(22, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(22, ZRF.PARAM,	1);	// $2
    design.addCommand(22, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(22, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(22, ZRF.FUNCTION,	0);	// not
    design.addCommand(22, ZRF.IF,	6);
    design.addCommand(22, ZRF.PARAM,	2);	// $3
    design.addCommand(22, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(22, ZRF.PROMOTE,	10);	// Swift-carrier
    design.addCommand(22, ZRF.FUNCTION,	25);	// to
    design.addCommand(22, ZRF.JUMP,	5);
    design.addCommand(22, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(22, ZRF.FUNCTION,	0);	// not
    design.addCommand(22, ZRF.FUNCTION,	20);	// verify
    design.addCommand(22, ZRF.FUNCTION,	25);	// to
    design.addCommand(22, ZRF.FUNCTION,	28);	// end

    design.addCommand(23, ZRF.FUNCTION,	24);	// from
    design.addCommand(23, ZRF.PARAM,	0);	// $1
    design.addCommand(23, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(23, ZRF.PARAM,	1);	// $2
    design.addCommand(23, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(23, ZRF.PARAM,	2);	// $3
    design.addCommand(23, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(23, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(23, ZRF.FUNCTION,	0);	// not
    design.addCommand(23, ZRF.IF,	6);
    design.addCommand(23, ZRF.PARAM,	3);	// $4
    design.addCommand(23, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(23, ZRF.PROMOTE,	10);	// Swift-carrier
    design.addCommand(23, ZRF.FUNCTION,	25);	// to
    design.addCommand(23, ZRF.JUMP,	5);
    design.addCommand(23, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(23, ZRF.FUNCTION,	0);	// not
    design.addCommand(23, ZRF.FUNCTION,	20);	// verify
    design.addCommand(23, ZRF.FUNCTION,	25);	// to
    design.addCommand(23, ZRF.FUNCTION,	28);	// end

    design.addCommand(24, ZRF.FUNCTION,	24);	// from
    design.addCommand(24, ZRF.PARAM,	0);	// $1
    design.addCommand(24, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(24, ZRF.PARAM,	1);	// $2
    design.addCommand(24, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(24, ZRF.PARAM,	2);	// $3
    design.addCommand(24, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(24, ZRF.PARAM,	3);	// $4
    design.addCommand(24, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(24, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(24, ZRF.FUNCTION,	0);	// not
    design.addCommand(24, ZRF.IF,	6);
    design.addCommand(24, ZRF.PARAM,	4);	// $5
    design.addCommand(24, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(24, ZRF.PROMOTE,	10);	// Swift-carrier
    design.addCommand(24, ZRF.FUNCTION,	25);	// to
    design.addCommand(24, ZRF.JUMP,	5);
    design.addCommand(24, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(24, ZRF.FUNCTION,	0);	// not
    design.addCommand(24, ZRF.FUNCTION,	20);	// verify
    design.addCommand(24, ZRF.FUNCTION,	25);	// to
    design.addCommand(24, ZRF.FUNCTION,	28);	// end

    design.addCommand(25, ZRF.FUNCTION,	24);	// from
    design.addCommand(25, ZRF.PARAM,	0);	// $1
    design.addCommand(25, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(25, ZRF.PARAM,	1);	// $2
    design.addCommand(25, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(25, ZRF.PROMOTE,	9);	// Swift
    design.addCommand(25, ZRF.FUNCTION,	25);	// to
    design.addCommand(25, ZRF.FUNCTION,	28);	// end

    design.addCommand(26, ZRF.FUNCTION,	24);	// from
    design.addCommand(26, ZRF.PARAM,	0);	// $1
    design.addCommand(26, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(26, ZRF.PARAM,	1);	// $2
    design.addCommand(26, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(26, ZRF.PARAM,	2);	// $3
    design.addCommand(26, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(26, ZRF.PROMOTE,	9);	// Swift
    design.addCommand(26, ZRF.FUNCTION,	25);	// to
    design.addCommand(26, ZRF.FUNCTION,	28);	// end

    design.addCommand(27, ZRF.FUNCTION,	24);	// from
    design.addCommand(27, ZRF.PARAM,	0);	// $1
    design.addCommand(27, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(27, ZRF.PARAM,	1);	// $2
    design.addCommand(27, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(27, ZRF.PARAM,	2);	// $3
    design.addCommand(27, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(27, ZRF.PARAM,	3);	// $4
    design.addCommand(27, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(27, ZRF.PROMOTE,	9);	// Swift
    design.addCommand(27, ZRF.FUNCTION,	25);	// to
    design.addCommand(27, ZRF.FUNCTION,	28);	// end

    design.addCommand(28, ZRF.FUNCTION,	24);	// from
    design.addCommand(28, ZRF.PARAM,	0);	// $1
    design.addCommand(28, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(28, ZRF.PARAM,	1);	// $2
    design.addCommand(28, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(28, ZRF.PARAM,	2);	// $3
    design.addCommand(28, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(28, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(28, ZRF.FUNCTION,	0);	// not
    design.addCommand(28, ZRF.IF,	6);
    design.addCommand(28, ZRF.PARAM,	3);	// $4
    design.addCommand(28, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(28, ZRF.PROMOTE,	12);	// Flier-carrier
    design.addCommand(28, ZRF.FUNCTION,	25);	// to
    design.addCommand(28, ZRF.JUMP,	5);
    design.addCommand(28, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(28, ZRF.FUNCTION,	0);	// not
    design.addCommand(28, ZRF.FUNCTION,	20);	// verify
    design.addCommand(28, ZRF.FUNCTION,	25);	// to
    design.addCommand(28, ZRF.FUNCTION,	28);	// end

    design.addCommand(29, ZRF.FUNCTION,	24);	// from
    design.addCommand(29, ZRF.PARAM,	0);	// $1
    design.addCommand(29, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(29, ZRF.PARAM,	1);	// $2
    design.addCommand(29, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(29, ZRF.PARAM,	2);	// $3
    design.addCommand(29, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(29, ZRF.PARAM,	3);	// $4
    design.addCommand(29, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(29, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(29, ZRF.FUNCTION,	0);	// not
    design.addCommand(29, ZRF.IF,	6);
    design.addCommand(29, ZRF.PARAM,	4);	// $5
    design.addCommand(29, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(29, ZRF.PROMOTE,	12);	// Flier-carrier
    design.addCommand(29, ZRF.FUNCTION,	25);	// to
    design.addCommand(29, ZRF.JUMP,	5);
    design.addCommand(29, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(29, ZRF.FUNCTION,	0);	// not
    design.addCommand(29, ZRF.FUNCTION,	20);	// verify
    design.addCommand(29, ZRF.FUNCTION,	25);	// to
    design.addCommand(29, ZRF.FUNCTION,	28);	// end

    design.addCommand(30, ZRF.FUNCTION,	24);	// from
    design.addCommand(30, ZRF.PARAM,	0);	// $1
    design.addCommand(30, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(30, ZRF.PARAM,	1);	// $2
    design.addCommand(30, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(30, ZRF.PARAM,	2);	// $3
    design.addCommand(30, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(30, ZRF.PARAM,	3);	// $4
    design.addCommand(30, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(30, ZRF.PARAM,	4);	// $5
    design.addCommand(30, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(30, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(30, ZRF.FUNCTION,	0);	// not
    design.addCommand(30, ZRF.IF,	6);
    design.addCommand(30, ZRF.PARAM,	5);	// $6
    design.addCommand(30, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(30, ZRF.PROMOTE,	12);	// Flier-carrier
    design.addCommand(30, ZRF.FUNCTION,	25);	// to
    design.addCommand(30, ZRF.JUMP,	5);
    design.addCommand(30, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(30, ZRF.FUNCTION,	0);	// not
    design.addCommand(30, ZRF.FUNCTION,	20);	// verify
    design.addCommand(30, ZRF.FUNCTION,	25);	// to
    design.addCommand(30, ZRF.FUNCTION,	28);	// end

    design.addCommand(31, ZRF.FUNCTION,	24);	// from
    design.addCommand(31, ZRF.PARAM,	0);	// $1
    design.addCommand(31, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(31, ZRF.PARAM,	1);	// $2
    design.addCommand(31, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(31, ZRF.PARAM,	2);	// $3
    design.addCommand(31, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(31, ZRF.PARAM,	3);	// $4
    design.addCommand(31, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(31, ZRF.PARAM,	4);	// $5
    design.addCommand(31, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(31, ZRF.PARAM,	5);	// $6
    design.addCommand(31, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(31, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(31, ZRF.FUNCTION,	0);	// not
    design.addCommand(31, ZRF.IF,	6);
    design.addCommand(31, ZRF.PARAM,	6);	// $7
    design.addCommand(31, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(31, ZRF.PROMOTE,	12);	// Flier-carrier
    design.addCommand(31, ZRF.FUNCTION,	25);	// to
    design.addCommand(31, ZRF.JUMP,	5);
    design.addCommand(31, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(31, ZRF.FUNCTION,	0);	// not
    design.addCommand(31, ZRF.FUNCTION,	20);	// verify
    design.addCommand(31, ZRF.FUNCTION,	25);	// to
    design.addCommand(31, ZRF.FUNCTION,	28);	// end

    design.addCommand(32, ZRF.FUNCTION,	24);	// from
    design.addCommand(32, ZRF.PARAM,	0);	// $1
    design.addCommand(32, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(32, ZRF.PARAM,	1);	// $2
    design.addCommand(32, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(32, ZRF.PARAM,	2);	// $3
    design.addCommand(32, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(32, ZRF.PROMOTE,	11);	// Flier
    design.addCommand(32, ZRF.FUNCTION,	25);	// to
    design.addCommand(32, ZRF.FUNCTION,	28);	// end

    design.addCommand(33, ZRF.FUNCTION,	24);	// from
    design.addCommand(33, ZRF.PARAM,	0);	// $1
    design.addCommand(33, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(33, ZRF.PARAM,	1);	// $2
    design.addCommand(33, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(33, ZRF.PARAM,	2);	// $3
    design.addCommand(33, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(33, ZRF.PARAM,	3);	// $4
    design.addCommand(33, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(33, ZRF.PROMOTE,	11);	// Flier
    design.addCommand(33, ZRF.FUNCTION,	25);	// to
    design.addCommand(33, ZRF.FUNCTION,	28);	// end

    design.addCommand(34, ZRF.FUNCTION,	24);	// from
    design.addCommand(34, ZRF.PARAM,	0);	// $1
    design.addCommand(34, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(34, ZRF.PARAM,	1);	// $2
    design.addCommand(34, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(34, ZRF.PARAM,	2);	// $3
    design.addCommand(34, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(34, ZRF.PARAM,	3);	// $4
    design.addCommand(34, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(34, ZRF.PARAM,	4);	// $5
    design.addCommand(34, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(34, ZRF.PROMOTE,	11);	// Flier
    design.addCommand(34, ZRF.FUNCTION,	25);	// to
    design.addCommand(34, ZRF.FUNCTION,	28);	// end

    design.addCommand(35, ZRF.FUNCTION,	24);	// from
    design.addCommand(35, ZRF.PARAM,	0);	// $1
    design.addCommand(35, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(35, ZRF.PARAM,	1);	// $2
    design.addCommand(35, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(35, ZRF.PARAM,	2);	// $3
    design.addCommand(35, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(35, ZRF.PARAM,	3);	// $4
    design.addCommand(35, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(35, ZRF.PARAM,	4);	// $5
    design.addCommand(35, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(35, ZRF.PARAM,	5);	// $6
    design.addCommand(35, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(35, ZRF.PROMOTE,	11);	// Flier
    design.addCommand(35, ZRF.FUNCTION,	25);	// to
    design.addCommand(35, ZRF.FUNCTION,	28);	// end

    design.addCommand(36, ZRF.FUNCTION,	24);	// from
    design.addCommand(36, ZRF.PARAM,	0);	// $1
    design.addCommand(36, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(36, ZRF.FUNCTION,	25);	// to
    design.addCommand(36, ZRF.FUNCTION,	28);	// end

    design.addCommand(37, ZRF.FUNCTION,	24);	// from
    design.addCommand(37, ZRF.PARAM,	0);	// $1
    design.addCommand(37, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(37, ZRF.PARAM,	1);	// $2
    design.addCommand(37, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(37, ZRF.FUNCTION,	25);	// to
    design.addCommand(37, ZRF.FUNCTION,	28);	// end

    design.addPiece("Goal", 0);
    design.addDrop(0, 0, [], 0);
    design.addMove(0, 1, [1, 10, 10, 1, 10], 1);
    design.addMove(0, 1, [3, 10, 10, 3, 10], 1);
    design.addMove(0, 1, [2, 10, 10, 2, 10], 1);
    design.addMove(0, 2, [1, 3, 10, 10, 1, 3, 10], 1);
    design.addMove(0, 2, [3, 3, 10, 10, 3, 3, 10], 1);
    design.addMove(0, 2, [3, 1, 10, 10, 3, 1, 10], 1);
    design.addMove(0, 2, [1, 2, 10, 10, 1, 2, 10], 1);
    design.addMove(0, 2, [2, 2, 10, 10, 2, 2, 10], 1);
    design.addMove(0, 2, [2, 1, 10, 10, 2, 1, 10], 1);
    design.addMove(0, 3, [1, 3, 1, 10, 10, 1, 3, 1, 10], 1);
    design.addMove(0, 3, [3, 3, 3, 10, 10, 3, 3, 3, 10], 1);
    design.addMove(0, 3, [3, 1, 3, 10, 10, 3, 1, 3, 10], 1);
    design.addMove(0, 3, [1, 2, 1, 10, 10, 1, 2, 1, 10], 1);
    design.addMove(0, 3, [2, 2, 2, 10, 10, 2, 2, 2, 10], 1);
    design.addMove(0, 3, [2, 1, 2, 10, 10, 2, 1, 2, 10], 1);
    design.addMove(0, 3, [1, 3, 3, 10, 10, 1, 3, 3, 10], 1);
    design.addMove(0, 3, [3, 3, 1, 10, 10, 3, 3, 1, 10], 1);
    design.addMove(0, 3, [3, 1, 2, 10, 10, 3, 1, 2, 10], 1);
    design.addMove(0, 3, [1, 2, 2, 10, 10, 1, 2, 2, 10], 1);
    design.addMove(0, 3, [2, 2, 1, 10, 10, 2, 2, 1, 10], 1);
    design.addMove(0, 3, [2, 1, 3, 10, 10, 2, 1, 3, 10], 1);

    design.addPiece("Vanguard", 1);
    design.addDrop(1, 0, [], 2);
    design.addMove(1, 4, [1, 10], 1);
    design.addMove(1, 4, [3, 10], 1);
    design.addMove(1, 4, [2, 10], 1);

    design.addPiece("Vanguard-carrier", 2);
    design.addMove(2, 5, [1], 1);
    design.addMove(2, 5, [3], 1);
    design.addMove(2, 5, [2], 1);

    design.addPiece("Power-Vanguard", 3);
    design.addDrop(3, 0, [], 2);
    design.addMove(3, 6, [1, 10], 1);
    design.addMove(3, 6, [3, 10], 1);
    design.addMove(3, 6, [2, 10], 1);
    design.addMove(3, 7, [1, 3, 10], 1);
    design.addMove(3, 7, [3, 3, 10], 1);
    design.addMove(3, 7, [3, 1, 10], 1);
    design.addMove(3, 7, [1, 2, 10], 1);
    design.addMove(3, 7, [2, 2, 10], 1);
    design.addMove(3, 7, [2, 1, 10], 1);

    design.addPiece("Power-Vanguard-carrier", 4);
    design.addMove(4, 8, [1], 1);
    design.addMove(4, 8, [3], 1);
    design.addMove(4, 8, [2], 1);
    design.addMove(4, 9, [1, 3], 1);
    design.addMove(4, 9, [3, 3], 1);
    design.addMove(4, 9, [3, 1], 1);
    design.addMove(4, 9, [1, 2], 1);
    design.addMove(4, 9, [2, 2], 1);
    design.addMove(4, 9, [2, 1], 1);

    design.addPiece("Lancer", 5);
    design.addDrop(5, 0, [], 2);
    design.addMove(5, 10, [1, 10], 1);
    design.addMove(5, 10, [3, 10], 1);
    design.addMove(5, 10, [2, 10], 1);
    design.addMove(5, 11, [1, 3, 10], 1);
    design.addMove(5, 11, [3, 3, 10], 1);
    design.addMove(5, 11, [3, 1, 10], 1);
    design.addMove(5, 11, [1, 2, 10], 1);
    design.addMove(5, 11, [2, 2, 10], 1);
    design.addMove(5, 11, [2, 1, 10], 1);
    design.addMove(5, 12, [1, 3, 1, 10], 1);
    design.addMove(5, 12, [3, 3, 3, 10], 1);
    design.addMove(5, 12, [3, 1, 3, 10], 1);
    design.addMove(5, 12, [1, 2, 1, 10], 1);
    design.addMove(5, 12, [2, 2, 2, 10], 1);
    design.addMove(5, 12, [2, 1, 2, 10], 1);

    design.addPiece("Lancer-carrier", 6);
    design.addMove(6, 13, [1], 1);
    design.addMove(6, 13, [3], 1);
    design.addMove(6, 13, [2], 1);
    design.addMove(6, 14, [1, 3], 1);
    design.addMove(6, 14, [3, 3], 1);
    design.addMove(6, 14, [3, 1], 1);
    design.addMove(6, 14, [1, 2], 1);
    design.addMove(6, 14, [2, 2], 1);
    design.addMove(6, 14, [2, 1], 1);
    design.addMove(6, 15, [1, 3, 1], 1);
    design.addMove(6, 15, [3, 3, 3], 1);
    design.addMove(6, 15, [3, 1, 3], 1);
    design.addMove(6, 15, [1, 2, 1], 1);
    design.addMove(6, 15, [2, 2, 2], 1);
    design.addMove(6, 15, [2, 1, 2], 1);

    design.addPiece("Fencer", 7);
    design.addDrop(7, 0, [], 2);
    design.addMove(7, 16, [1, 10], 1);
    design.addMove(7, 16, [3, 10], 1);
    design.addMove(7, 16, [2, 10], 1);
    design.addMove(7, 17, [1, 3, 10], 1);
    design.addMove(7, 17, [3, 3, 10], 1);
    design.addMove(7, 17, [3, 1, 10], 1);
    design.addMove(7, 17, [1, 2, 10], 1);
    design.addMove(7, 17, [2, 2, 10], 1);
    design.addMove(7, 17, [2, 1, 10], 1);
    design.addMove(7, 18, [1, 3, 1, 10], 1);
    design.addMove(7, 18, [3, 3, 3, 10], 1);
    design.addMove(7, 18, [3, 1, 3, 10], 1);
    design.addMove(7, 18, [1, 2, 1, 10], 1);
    design.addMove(7, 18, [2, 2, 2, 10], 1);
    design.addMove(7, 18, [2, 1, 2, 10], 1);
    design.addMove(7, 18, [1, 3, 3, 10], 1);
    design.addMove(7, 18, [3, 3, 1, 10], 1);
    design.addMove(7, 18, [3, 1, 2, 10], 1);
    design.addMove(7, 18, [1, 2, 2, 10], 1);
    design.addMove(7, 18, [2, 2, 1, 10], 1);
    design.addMove(7, 18, [2, 1, 3, 10], 1);

    design.addPiece("Fencer-carrier", 8);
    design.addMove(8, 19, [1], 1);
    design.addMove(8, 19, [3], 1);
    design.addMove(8, 19, [2], 1);
    design.addMove(8, 20, [1, 3], 1);
    design.addMove(8, 20, [3, 3], 1);
    design.addMove(8, 20, [3, 1], 1);
    design.addMove(8, 20, [1, 2], 1);
    design.addMove(8, 20, [2, 2], 1);
    design.addMove(8, 20, [2, 1], 1);
    design.addMove(8, 21, [1, 3, 1], 1);
    design.addMove(8, 21, [3, 3, 3], 1);
    design.addMove(8, 21, [3, 1, 3], 1);
    design.addMove(8, 21, [1, 2, 1], 1);
    design.addMove(8, 21, [2, 2, 2], 1);
    design.addMove(8, 21, [2, 1, 2], 1);
    design.addMove(8, 21, [1, 3, 3], 1);
    design.addMove(8, 21, [3, 3, 1], 1);
    design.addMove(8, 21, [3, 1, 2], 1);
    design.addMove(8, 21, [1, 2, 2], 1);
    design.addMove(8, 21, [2, 2, 1], 1);
    design.addMove(8, 21, [2, 1, 3], 1);

    design.addPiece("Swift", 9);
    design.addDrop(9, 0, [], 2);
    design.addMove(9, 22, [1, 3, 10], 1);
    design.addMove(9, 22, [3, 3, 10], 1);
    design.addMove(9, 22, [3, 1, 10], 1);
    design.addMove(9, 22, [1, 2, 10], 1);
    design.addMove(9, 22, [2, 2, 10], 1);
    design.addMove(9, 22, [2, 1, 10], 1);
    design.addMove(9, 23, [1, 3, 1, 10], 1);
    design.addMove(9, 23, [3, 3, 3, 10], 1);
    design.addMove(9, 23, [3, 1, 3, 10], 1);
    design.addMove(9, 23, [1, 2, 1, 10], 1);
    design.addMove(9, 23, [2, 2, 2, 10], 1);
    design.addMove(9, 23, [2, 1, 2, 10], 1);
    design.addMove(9, 23, [1, 3, 3, 10], 1);
    design.addMove(9, 23, [3, 3, 1, 10], 1);
    design.addMove(9, 23, [3, 1, 2, 10], 1);
    design.addMove(9, 23, [1, 2, 2, 10], 1);
    design.addMove(9, 23, [2, 2, 1, 10], 1);
    design.addMove(9, 23, [2, 1, 3, 10], 1);
    design.addMove(9, 24, [1, 2, 1, 2, 10], 1);
    design.addMove(9, 24, [1, 2, 1, 3, 10], 1);
    design.addMove(9, 24, [1, 2, 2, 2, 10], 1);
    design.addMove(9, 24, [1, 2, 2, 1, 10], 1);
    design.addMove(9, 24, [1, 3, 1, 2, 10], 1);
    design.addMove(9, 24, [1, 3, 1, 3, 10], 1);
    design.addMove(9, 24, [1, 3, 3, 1, 10], 1);
    design.addMove(9, 24, [1, 3, 3, 3, 10], 1);
    design.addMove(9, 24, [2, 1, 2, 2, 10], 1);
    design.addMove(9, 24, [2, 1, 2, 1, 10], 1);
    design.addMove(9, 24, [2, 1, 3, 1, 10], 1);
    design.addMove(9, 24, [2, 1, 3, 3, 10], 1);
    design.addMove(9, 24, [2, 2, 1, 2, 10], 1);
    design.addMove(9, 24, [2, 2, 1, 3, 10], 1);
    design.addMove(9, 24, [2, 2, 2, 2, 10], 1);
    design.addMove(9, 24, [2, 2, 2, 1, 10], 1);
    design.addMove(9, 24, [3, 3, 1, 2, 10], 1);
    design.addMove(9, 24, [3, 3, 1, 3, 10], 1);
    design.addMove(9, 24, [3, 3, 3, 3, 10], 1);
    design.addMove(9, 24, [3, 3, 3, 1, 10], 1);
    design.addMove(9, 24, [3, 1, 2, 2, 10], 1);
    design.addMove(9, 24, [3, 1, 2, 1, 10], 1);
    design.addMove(9, 24, [3, 1, 3, 3, 10], 1);
    design.addMove(9, 24, [3, 1, 3, 1, 10], 1);

    design.addPiece("Swift-carrier", 10);
    design.addMove(10, 25, [1, 3], 1);
    design.addMove(10, 25, [3, 3], 1);
    design.addMove(10, 25, [3, 1], 1);
    design.addMove(10, 25, [1, 2], 1);
    design.addMove(10, 25, [2, 2], 1);
    design.addMove(10, 25, [2, 1], 1);
    design.addMove(10, 26, [1, 3, 1], 1);
    design.addMove(10, 26, [3, 3, 3], 1);
    design.addMove(10, 26, [3, 1, 3], 1);
    design.addMove(10, 26, [1, 2, 1], 1);
    design.addMove(10, 26, [2, 2, 2], 1);
    design.addMove(10, 26, [2, 1, 2], 1);
    design.addMove(10, 26, [1, 3, 3], 1);
    design.addMove(10, 26, [3, 3, 1], 1);
    design.addMove(10, 26, [3, 1, 2], 1);
    design.addMove(10, 26, [1, 2, 2], 1);
    design.addMove(10, 26, [2, 2, 1], 1);
    design.addMove(10, 26, [2, 1, 3], 1);
    design.addMove(10, 27, [1, 2, 1, 2], 1);
    design.addMove(10, 27, [1, 2, 1, 3], 1);
    design.addMove(10, 27, [1, 2, 2, 2], 1);
    design.addMove(10, 27, [1, 2, 2, 1], 1);
    design.addMove(10, 27, [1, 3, 1, 2], 1);
    design.addMove(10, 27, [1, 3, 1, 3], 1);
    design.addMove(10, 27, [1, 3, 3, 1], 1);
    design.addMove(10, 27, [1, 3, 3, 3], 1);
    design.addMove(10, 27, [2, 1, 2, 2], 1);
    design.addMove(10, 27, [2, 1, 2, 1], 1);
    design.addMove(10, 27, [2, 1, 3, 1], 1);
    design.addMove(10, 27, [2, 1, 3, 3], 1);
    design.addMove(10, 27, [2, 2, 1, 2], 1);
    design.addMove(10, 27, [2, 2, 1, 3], 1);
    design.addMove(10, 27, [2, 2, 2, 2], 1);
    design.addMove(10, 27, [2, 2, 2, 1], 1);
    design.addMove(10, 27, [3, 3, 1, 2], 1);
    design.addMove(10, 27, [3, 3, 1, 3], 1);
    design.addMove(10, 27, [3, 3, 3, 3], 1);
    design.addMove(10, 27, [3, 3, 3, 1], 1);
    design.addMove(10, 27, [3, 1, 2, 2], 1);
    design.addMove(10, 27, [3, 1, 2, 1], 1);
    design.addMove(10, 27, [3, 1, 3, 3], 1);
    design.addMove(10, 27, [3, 1, 3, 1], 1);

    design.addPiece("Flier", 11);
    design.addDrop(11, 0, [], 2);
    design.addMove(11, 28, [1, 3, 1, 10], 1);
    design.addMove(11, 28, [3, 3, 3, 10], 1);
    design.addMove(11, 28, [3, 1, 3, 10], 1);
    design.addMove(11, 28, [1, 2, 1, 10], 1);
    design.addMove(11, 28, [2, 2, 2, 10], 1);
    design.addMove(11, 28, [2, 1, 2, 10], 1);
    design.addMove(11, 29, [1, 3, 1, 3, 10], 1);
    design.addMove(11, 29, [3, 3, 3, 3, 10], 1);
    design.addMove(11, 29, [3, 1, 3, 1, 10], 1);
    design.addMove(11, 29, [1, 2, 1, 2, 10], 1);
    design.addMove(11, 29, [2, 2, 2, 2, 10], 1);
    design.addMove(11, 29, [2, 1, 2, 1, 10], 1);
    design.addMove(11, 30, [1, 3, 1, 3, 1, 10], 1);
    design.addMove(11, 30, [3, 3, 3, 3, 3, 10], 1);
    design.addMove(11, 30, [3, 1, 3, 1, 3, 10], 1);
    design.addMove(11, 30, [1, 2, 1, 2, 1, 10], 1);
    design.addMove(11, 30, [2, 2, 2, 2, 2, 10], 1);
    design.addMove(11, 30, [2, 1, 2, 1, 2, 10], 1);
    design.addMove(11, 31, [1, 3, 1, 3, 1, 3, 10], 1);
    design.addMove(11, 31, [3, 3, 3, 3, 3, 3, 10], 1);
    design.addMove(11, 31, [3, 1, 3, 1, 3, 1, 10], 1);
    design.addMove(11, 31, [1, 2, 1, 2, 1, 2, 10], 1);
    design.addMove(11, 31, [2, 2, 2, 2, 2, 2, 10], 1);
    design.addMove(11, 31, [2, 1, 2, 1, 2, 1, 10], 1);

    design.addPiece("Flier-carrier", 12);
    design.addMove(12, 32, [1, 3, 1], 1);
    design.addMove(12, 32, [3, 3, 3], 1);
    design.addMove(12, 32, [3, 1, 3], 1);
    design.addMove(12, 32, [1, 2, 1], 1);
    design.addMove(12, 32, [2, 2, 2], 1);
    design.addMove(12, 32, [2, 1, 2], 1);
    design.addMove(12, 33, [1, 3, 1, 3], 1);
    design.addMove(12, 33, [3, 3, 3, 3], 1);
    design.addMove(12, 33, [3, 1, 3, 1], 1);
    design.addMove(12, 33, [1, 2, 1, 2], 1);
    design.addMove(12, 33, [2, 2, 2, 2], 1);
    design.addMove(12, 33, [2, 1, 2, 1], 1);
    design.addMove(12, 34, [1, 3, 1, 3, 1], 1);
    design.addMove(12, 34, [3, 3, 3, 3, 3], 1);
    design.addMove(12, 34, [3, 1, 3, 1, 3], 1);
    design.addMove(12, 34, [1, 2, 1, 2, 1], 1);
    design.addMove(12, 34, [2, 2, 2, 2, 2], 1);
    design.addMove(12, 34, [2, 1, 2, 1, 2], 1);
    design.addMove(12, 35, [1, 3, 1, 3, 1, 3], 1);
    design.addMove(12, 35, [3, 3, 3, 3, 3, 3], 1);
    design.addMove(12, 35, [3, 1, 3, 1, 3, 1], 1);
    design.addMove(12, 35, [1, 2, 1, 2, 1, 2], 1);
    design.addMove(12, 35, [2, 2, 2, 2, 2, 2], 1);
    design.addMove(12, 35, [2, 1, 2, 1, 2, 1], 1);

    design.addPiece("Blockader", 13);
    design.addDrop(13, 0, [], 2);
    design.addMove(13, 36, [1], 1);
    design.addMove(13, 36, [3], 1);
    design.addMove(13, 36, [2], 1);
    design.addMove(13, 37, [1, 3], 1);
    design.addMove(13, 37, [1, 2], 1);
    design.addMove(13, 37, [3, 3], 1);
    design.addMove(13, 37, [2, 2], 1);
    design.addMove(13, 37, [3, 1], 1);
    design.addMove(13, 37, [2, 1], 1);

    design.addPiece("Crown", 14);

    design.reserve("Gold", "Vanguard", 3);
    design.reserve("Gold", "Lancer", 1);
    design.reserve("Gold", "Flier", 2);
    design.reserve("Gold", "Swift", 1);
    design.reserve("Gold", "Fencer", 1);
    design.reserve("Gold", "Blockader", 1);
    design.reserve("Gold", "Goal", 1);
    design.reserve("Green", "Vanguard", 3);
    design.reserve("Green", "Lancer", 1);
    design.reserve("Green", "Flier", 2);
    design.reserve("Green", "Swift", 1);
    design.reserve("Green", "Fencer", 1);
    design.reserve("Green", "Blockader", 1);
    design.reserve("Green", "Goal", 1);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("GoldGoal", "Gold Goal");
    view.defPiece("GreenGoal", "Green Goal");
    view.defPiece("GoldVanguard", "Gold Vanguard");
    view.defPiece("GreenVanguard", "Green Vanguard");
    view.defPiece("GoldVanguard-carrier", "Gold Vanguard-carrier");
    view.defPiece("GreenVanguard-carrier", "Green Vanguard-carrier");
    view.defPiece("GoldPower-Vanguard", "Gold Power-Vanguard");
    view.defPiece("GreenPower-Vanguard", "Green Power-Vanguard");
    view.defPiece("GoldPower-Vanguard-carrier", "Gold Power-Vanguard-carrier");
    view.defPiece("GreenPower-Vanguard-carrier", "Green Power-Vanguard-carrier");
    view.defPiece("GoldLancer", "Gold Lancer");
    view.defPiece("GreenLancer", "Green Lancer");
    view.defPiece("GoldLancer-carrier", "Gold Lancer-carrier");
    view.defPiece("GreenLancer-carrier", "Green Lancer-carrier");
    view.defPiece("GoldFencer", "Gold Fencer");
    view.defPiece("GreenFencer", "Green Fencer");
    view.defPiece("GoldFencer-carrier", "Gold Fencer-carrier");
    view.defPiece("GreenFencer-carrier", "Green Fencer-carrier");
    view.defPiece("GoldSwift", "Gold Swift");
    view.defPiece("GreenSwift", "Green Swift");
    view.defPiece("GoldSwift-carrier", "Gold Swift-carrier");
    view.defPiece("GreenSwift-carrier", "Green Swift-carrier");
    view.defPiece("GoldFlier", "Gold Flier");
    view.defPiece("GreenFlier", "Green Flier");
    view.defPiece("GoldFlier-carrier", "Gold Flier-carrier");
    view.defPiece("GreenFlier-carrier", "Green Flier-carrier");
    view.defPiece("GoldBlockader", "Gold Blockader");
    view.defPiece("GreenBlockader", "Green Blockader");
    view.defPiece("GoldCrown", "Gold Crown");
    view.defPiece("GreenCrown", "Green Crown");
 
    view.defPosition("Kagga-Crown", 403, 0, 91, 24);
    view.defPosition("A19", 427, 43, 44, 33);
    view.defPosition("A19V", 437, 25, 24, 17);
    view.defPosition("B18", 382, 121, 44, 33);
    view.defPosition("B18V", 392, 103, 24, 17);
    view.defPosition("B19", 427, 79, 44, 33);
    view.defPosition("B19V", 437, 113, 24, 17);
    view.defPosition("B29", 472, 121, 44, 33);
    view.defPosition("B29V", 482, 103, 24, 17);
    view.defPosition("C17", 337, 199, 44, 33);
    view.defPosition("C17V", 347, 181, 24, 17);
    view.defPosition("C18", 382, 157, 44, 33);
    view.defPosition("C18V", 392, 191, 24, 17);
    view.defPosition("C28", 427, 199, 44, 33);
    view.defPosition("C28V", 437, 181, 24, 17);
    view.defPosition("C29", 472, 157, 44, 33);
    view.defPosition("C29V", 482, 191, 24, 17);
    view.defPosition("C39", 517, 199, 44, 33);
    view.defPosition("C39V", 527, 181, 24, 17);
    view.defPosition("D16", 292, 277, 44, 33);
    view.defPosition("D16V", 302, 259, 24, 17);
    view.defPosition("D17", 337, 235, 44, 33);
    view.defPosition("D17V", 347, 269, 24, 17);
    view.defPosition("D27", 382, 277, 44, 33);
    view.defPosition("D27V", 392, 259, 24, 17);
    view.defPosition("D28", 427, 235, 44, 33);
    view.defPosition("D28V", 437, 269, 24, 17);
    view.defPosition("D38", 472, 277, 44, 33);
    view.defPosition("D38V", 482, 259, 24, 17);
    view.defPosition("D39", 517, 235, 44, 33);
    view.defPosition("D39V", 527, 269, 24, 17);
    view.defPosition("D49", 562, 277, 44, 33);
    view.defPosition("D49V", 572, 259, 24, 17);
    view.defPosition("E15", 247, 355, 44, 33);
    view.defPosition("E15V", 257, 337, 24, 17);
    view.defPosition("E16", 292, 313, 44, 33);
    view.defPosition("E16V", 302, 347, 24, 17);
    view.defPosition("E26", 337, 355, 44, 33);
    view.defPosition("E26V", 347, 337, 24, 17);
    view.defPosition("E27", 382, 313, 44, 33);
    view.defPosition("E27V", 392, 347, 24, 17);
    view.defPosition("E37", 427, 355, 44, 33);
    view.defPosition("E37V", 437, 337, 24, 17);
    view.defPosition("E38", 472, 313, 44, 33);
    view.defPosition("E38V", 482, 347, 24, 17);
    view.defPosition("E48", 517, 355, 44, 33);
    view.defPosition("E48V", 527, 337, 24, 17);
    view.defPosition("E49", 562, 313, 44, 33);
    view.defPosition("E49V", 572, 347, 24, 17);
    view.defPosition("E59", 607, 355, 44, 33);
    view.defPosition("E59V", 617, 337, 24, 17);
    view.defPosition("F14", 202, 433, 44, 33);
    view.defPosition("F14V", 212, 415, 24, 17);
    view.defPosition("F15", 247, 391, 44, 33);
    view.defPosition("F15V", 257, 425, 24, 17);
    view.defPosition("F25", 292, 433, 44, 33);
    view.defPosition("F25V", 302, 415, 24, 17);
    view.defPosition("F26", 337, 391, 44, 33);
    view.defPosition("F26V", 347, 425, 24, 17);
    view.defPosition("F36", 382, 433, 44, 33);
    view.defPosition("F36V", 392, 415, 24, 17);
    view.defPosition("F37", 427, 391, 44, 33);
    view.defPosition("F37V", 437, 425, 24, 17);
    view.defPosition("F47", 472, 433, 44, 33);
    view.defPosition("F47V", 482, 415, 24, 17);
    view.defPosition("F48", 517, 391, 44, 33);
    view.defPosition("F48V", 527, 425, 24, 17);
    view.defPosition("F58", 562, 433, 44, 33);
    view.defPosition("F58V", 572, 415, 24, 17);
    view.defPosition("F59", 607, 391, 44, 33);
    view.defPosition("F59V", 617, 425, 24, 17);
    view.defPosition("F69", 652, 433, 44, 33);
    view.defPosition("F69V", 662, 415, 24, 17);
    view.defPosition("G13", 157, 511, 44, 33);
    view.defPosition("G13V", 167, 493, 24, 17);
    view.defPosition("G14", 202, 469, 44, 33);
    view.defPosition("G14V", 212, 503, 24, 17);
    view.defPosition("G24", 247, 511, 44, 33);
    view.defPosition("G24V", 257, 493, 24, 17);
    view.defPosition("G25", 292, 469, 44, 33);
    view.defPosition("G25V", 302, 503, 24, 17);
    view.defPosition("G35", 337, 511, 44, 33);
    view.defPosition("G35V", 347, 493, 24, 17);
    view.defPosition("G36", 382, 469, 44, 33);
    view.defPosition("G36V", 392, 503, 24, 17);
    view.defPosition("G46", 427, 511, 44, 33);
    view.defPosition("G46V", 437, 493, 24, 17);
    view.defPosition("G47", 472, 469, 44, 33);
    view.defPosition("G47V", 482, 503, 24, 17);
    view.defPosition("G57", 517, 511, 44, 33);
    view.defPosition("G57V", 527, 493, 24, 17);
    view.defPosition("G58", 562, 469, 44, 33);
    view.defPosition("G58V", 572, 503, 24, 17);
    view.defPosition("G68", 607, 511, 44, 33);
    view.defPosition("G68V", 617, 493, 24, 17);
    view.defPosition("G69", 652, 469, 44, 33);
    view.defPosition("G69V", 662, 503, 24, 17);
    view.defPosition("G79", 697, 511, 44, 33);
    view.defPosition("G79V", 707, 493, 24, 17);
    view.defPosition("H12", 112, 589, 44, 33);
    view.defPosition("H12V", 122, 571, 24, 17);
    view.defPosition("H13", 157, 547, 44, 33);
    view.defPosition("H13V", 167, 581, 24, 17);
    view.defPosition("H23", 202, 589, 44, 33);
    view.defPosition("H23V", 212, 571, 24, 17);
    view.defPosition("H24", 247, 547, 44, 33);
    view.defPosition("H24V", 257, 581, 24, 17);
    view.defPosition("H34", 292, 589, 44, 33);
    view.defPosition("H34V", 302, 571, 24, 17);
    view.defPosition("H35", 337, 547, 44, 33);
    view.defPosition("H35V", 347, 581, 24, 17);
    view.defPosition("H45", 382, 589, 44, 33);
    view.defPosition("H45V", 392, 571, 24, 17);
    view.defPosition("H46", 427, 547, 44, 33);
    view.defPosition("H46V", 437, 581, 24, 17);
    view.defPosition("H56", 472, 589, 44, 33);
    view.defPosition("H56V", 482, 571, 24, 17);
    view.defPosition("H57", 517, 547, 44, 33);
    view.defPosition("H57V", 527, 581, 24, 17);
    view.defPosition("H67", 562, 589, 44, 33);
    view.defPosition("H67V", 572, 571, 24, 17);
    view.defPosition("H68", 607, 547, 44, 33);
    view.defPosition("H68V", 617, 581, 24, 17);
    view.defPosition("H78", 652, 589, 44, 33);
    view.defPosition("H78V", 662, 571, 24, 17);
    view.defPosition("H79", 697, 547, 44, 33);
    view.defPosition("H79V", 707, 581, 24, 17);
    view.defPosition("H89", 742, 589, 44, 33);
    view.defPosition("H89V", 752, 571, 24, 17);
    view.defPosition("I11", 67, 667, 44, 33);
    view.defPosition("I11V", 77, 649, 24, 17);
    view.defPosition("I12", 112, 625, 44, 33);
    view.defPosition("I12V", 122, 659, 24, 17);
    view.defPosition("I22", 157, 667, 44, 33);
    view.defPosition("I22V", 167, 649, 24, 17);
    view.defPosition("I23", 202, 625, 44, 33);
    view.defPosition("I23V", 212, 659, 24, 17);
    view.defPosition("I33", 247, 667, 44, 33);
    view.defPosition("I33V", 257, 649, 24, 17);
    view.defPosition("I34", 292, 625, 44, 33);
    view.defPosition("I34V", 302, 659, 24, 17);
    view.defPosition("I44", 337, 667, 44, 33);
    view.defPosition("I44V", 347, 649, 24, 17);
    view.defPosition("I45", 382, 625, 44, 33);
    view.defPosition("I45V", 392, 659, 24, 17);
    view.defPosition("I55", 427, 667, 44, 33);
    view.defPosition("I55V", 437, 649, 24, 17);
    view.defPosition("I56", 472, 625, 44, 33);
    view.defPosition("I56V", 482, 659, 24, 17);
    view.defPosition("I66", 517, 667, 44, 33);
    view.defPosition("I66V", 527, 649, 24, 17);
    view.defPosition("I67", 562, 625, 44, 33);
    view.defPosition("I67V", 572, 659, 24, 17);
    view.defPosition("I77", 607, 667, 44, 33);
    view.defPosition("I77V", 617, 649, 24, 17);
    view.defPosition("I78", 652, 625, 44, 33);
    view.defPosition("I78V", 662, 659, 24, 17);
    view.defPosition("I88", 697, 667, 44, 33);
    view.defPosition("I88V", 707, 649, 24, 17);
    view.defPosition("I89", 742, 625, 44, 33);
    view.defPosition("I89V", 752, 659, 24, 17);
    view.defPosition("I99", 787, 667, 44, 33);
    view.defPosition("I99V", 797, 649, 24, 17);
}
