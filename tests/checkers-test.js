QUnit.test( "Template", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  assert.equal( design.checkOption("z2j", 1), true, "Z2J Version");
  assert.equal( design.checkOption("zrf", "2.0"), true, "ZRF Version");
  assert.equal( design.checkOption("maximal-captures", "true"), true, "Max Captures option");
  assert.equal( design.failed, false, "All options is valid");
  var board  = Dagaz.Model.getInitBoard();
  var move   = new Dagaz.Model.createMove();
  assert.equal( design.templates.length , 4, "Templates");
  assert.equal( design.modes.length, 2, "Priorities");
  var t0 = design.getTemplate(0);
  var t1 = design.getTemplate(1);
  var t2 = design.getTemplate(2);
  var t3 = design.getTemplate(3);
  assert.ok( t0 !== t1, "Different templates" );
  assert.equal( t1.commands.length , 13, "Commands");
  assert.equal( t0.commands[1], t1.commands[1], "Equal commands");
  assert.ok( t0.commands[1] !== t0.commands[6], "Not equal commands");
  var g0 = Dagaz.Model.createGen(t0, [1, 2]);
  g0.init(board, 0);
  g0.move = move;
  assert.equal( (t0.commands[0])(g0), null, "Piece not found");
  var man = Dagaz.Model.createPiece(0, 1);
  board.setPiece(0, man);
  assert.equal( (t0.commands[0])(g0), 0, "FROM command executed");
  assert.equal( g0.piece, man, "... current piece is Man");
  assert.equal( g0.from, 0, "... from position a8");
  var g = g0.copy(g0.template, g0.params);
  assert.equal( (t0.commands[1])(g0), 0, "PARAM command executed");
  assert.equal( g0.stack.pop(), 1, "... PARAM value");
  assert.equal( (t0.commands[2])(g0), null, "Stack is empty");
  g0.stack.push(1);
  assert.equal( (t0.commands[2])(g0), 0, "NAVIGATE command executed");
  assert.equal( g0.getPos(), 1, "... current position changed");
  assert.equal( (t0.commands[3])(g0), 0, "IS_ENEMY? command executed");
  assert.equal( g0.stack.pop(), false, "... position is empty");
  assert.equal( (t0.commands[8])(g0), 0, "IS_EMPTY? command executed");
  assert.equal( g0.stack.pop(), true, "... position is empty");
  g0.stack.push(false);
  assert.equal( (t0.commands[4])(g0), null, "VERIFY failed");
  g0.stack.push(true);
  assert.equal( (t0.commands[4])(g0), 0, "VERIFY command executed");
  g0.pos = 0;
  assert.equal( (t0.commands[5])(g0), 0, "CAPTURE command executed");
  assert.equal( move.toString(), "x a8", "... piece is captured");
  assert.equal( (t0.commands[10])(g0), 0, "IN_ZONE? command executed");
  assert.equal( g0.stack.pop(), true, "... promotion zone for A Player");
  assert.equal( (t0.commands[11])(g0), null, "Stack is empty");
  g0.stack.push(true);
  assert.equal( (t0.commands[11])(g0), 3, "IF then");
  g0.stack.push(false);
  assert.equal( (t0.commands[11])(g0), 0, "... and else");
  assert.equal( (t3.commands[6])(g0), 0, "FORK command executed");
  var fork = board.forks.pop();
  assert.equal( fork.cmd, 2, "... fork jump");
  assert.equal( (t0.commands[16])(g0), 0, "MODE command executed");
  assert.equal( g0.mode, 2, "... notype mode");
  assert.equal( (t0.commands[14])(g0), 3, "JUMP command executed");
  assert.equal( (t0.commands[15])(g0), 0, "PROMOTE command executed");
  assert.equal( g0.piece.toString(), "White King", "... piece promoted");
  g0.pos = 1;
  assert.equal( (t0.commands[17])(g0), 0, "TO command executed");
  assert.ok( g0.from === undefined, "... no from position");
  assert.ok( g0.piece === undefined, "... and no piece");
  assert.equal( g.getPiece(0), null, "... from position is empty");
  assert.equal( g.getPiece(1).toString(), "White King", "... and King piece on TO position");
  assert.equal( (t3.commands[12])(g0), null, "END command executed");
  assert.equal( board.moves.length, 1, "Move is generated");
  var g1 = Dagaz.Model.createGen(t1, [3]);
  g1.init(board, 0);
  g1.move = move;
  assert.equal( (t1.commands[6])(g1), null, "Stack is empty");
  g1.stack.push(false);
  assert.equal( (t1.commands[6])(g1), 0, "NOT command executed");
  assert.equal( g1.stack.pop(), true, "... NOT command result");
  assert.equal( (t2.commands[24])(g), null, "Stack is empty");
  g.stack.push(2);
  assert.equal( (t2.commands[24])(g), 0, "OPPOSITE command executed");
  assert.equal( g.stack.pop(), 3, "... opposite direction on stack");
  assert.equal( (t2.commands[19])(g), 0, "MARK command executed");
  var oldPos = g.pos;
  g.pos = 1;
  assert.equal( (t2.commands[28])(g), 0, "BACK command executed");
  assert.equal( oldPos, g.getPos(), "... mark equal current position again");
  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});

QUnit.test( "Move Generator", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();
  board.clear();
  var t = design.getTemplate(1);
  var from = Dagaz.Model.stringToPos("b2");
  assert.ok( from !== null, "Correct position");
  assert.equal( Dagaz.Model.posToString(from), "b2", "From position");
  var m = new Dagaz.Model.createMove();
  var g = Dagaz.Model.createGen(t, [3]);
  g.init(board, from);
  g.move = m;
  var man = Dagaz.Model.createPiece(0, 1);
  var king = man.promote(1);
  assert.equal( man.getType(), "Man", "Man piece");
  assert.equal( king.getType(), "King", "King piece");
  board.setPiece(from, man);
  var to = design.navigate(1, from, 3);
  assert.equal( Dagaz.Model.posToString(to), "b3", "To position");
  g.setPiece(from, null);
  g.setPiece(to, man);
  assert.equal( g.getPiece(from), man, "Man in [from] position (snapshot)");
  assert.equal( g.getPiece(to), null, "And [to] position is empty");
  var c = g.copy(g.template, g.params);
  assert.equal( c.getPiece(from), null, "[from] position is empty");
  assert.equal( c.getPiece(to), man, "[to] position contains Man");
  assert.equal( g.getValue(0, from), null, "No value");
  g.setValue(0, from, true);
  assert.equal( g.getValue(0, from), true, "Position flag");
  assert.equal( c.getValue(0, from), null, "No value again");
  assert.equal( g.getAttr(0, from), null, "No attribute value");
  design.addAttribute(man.type, 0, false);
  assert.equal( g.getAttr(0, from), false, "Attribute's initial value");
  g.setAttr(0, to, true);
  assert.equal( g.attrs[to][0], true, "Attribute's value changed");
  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});

QUnit.test( "Board", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();
  board.clear();
  design.setup("Black", "Man", 3);
  design.setup("Black", "Man", 8);
  design.setup("Black", "Man", 13);
  design.setup("Black", "Man", 18);
  design.setup("Black", "Man", 29);
  design.setup("Black", "Man", 53);
  design.setup("Black", "Man", 56);
  design.setup("Black", "Man", 58);
  design.setup("White", "King", 45);
  assert.equal( board.player, 1, "White");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("a1")).toString(), "Black Man", "a1 - Black Man");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("b1")), null, "b1 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c1")).toString(), "Black Man", "c1 - Black Man");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("d1")), null, "d1 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("e1")), null, "e1 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("f1")), null, "f1 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("g1")), null, "g1 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("h1")), null, "h1 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("a2")), null, "a2 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("b2")), null, "b2 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c2")), null, "c2 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("d2")), null, "d2 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("e2")), null, "e2 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("f2")).toString(), "Black Man", "f2 - Black Man");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("g2")), null, "g2 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("h2")), null, "h2 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("a3")), null, "a3 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("b3")), null, "b3 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c3")), null, "c3 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("d3")), null, "d3 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("e3")), null, "e3 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("f3")).toString(), "White King", "f3 - White King");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("g3")), null, "g3 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("h3")), null, "h3 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("a4")), null, "a4 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("b4")), null, "b4 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c4")), null, "c4 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("d4")), null, "d4 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("e4")), null, "e4 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("f4")), null, "f4 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("g4")), null, "g4 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("h4")), null, "h4 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("a5")), null, "a5 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("b5")), null, "b5 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c5")), null, "c5 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("d5")), null, "d5 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("e5")), null, "e5 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("f5")).toString(), "Black Man", "f5 - Black Man");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("g5")), null, "g5 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("h5")), null, "h5 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("a6")), null, "a6 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("b6")), null, "b6 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c6")).toString(), "Black Man", "c6 - Black Man");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("d6")), null, "d6 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("e6")), null, "e6 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("f6")), null, "f6 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("g6")), null, "g6 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("h6")), null, "h6 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("a7")).toString(), "Black Man", "a7 - Black Man");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("b7")), null, "b7 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c7")), null, "c7 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("d7")), null, "d7 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("e7")), null, "e7 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("f7")).toString(), "Black Man", "f7 - Black Man");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("g7")), null, "g7 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("h7")), null, "h7 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("a8")), null, "a8 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("b8")), null, "b8 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c8")), null, "c8 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("d8")).toString(), "Black Man", "d8 - Black Man");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("e8")), null, "e8 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("f8")), null, "f8 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("g8")), null, "g8 - Empty");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("h8")), null, "h8 - Empty");

  var p = board.getPiece(Dagaz.Model.stringToPos("f3"));
  var m = Dagaz.Model.createMove();
  m.capturePiece(Dagaz.Model.stringToPos("f5"), 1);
  m.movePiece(Dagaz.Model.stringToPos("f3"), Dagaz.Model.stringToPos("f6"), p, 1);
  assert.equal( m.toString(1), "f3 - f6 x f5", "f3 - f6 x f5");
  var mb = board.apply(m);
  assert.equal( mb.player, 2, "Black");
  assert.equal( mb.getPiece(Dagaz.Model.stringToPos("f3")), null, "f3 - Empty");
  assert.equal( mb.getPiece(Dagaz.Model.stringToPos("f5")), null, "f5 - Empty");
  assert.equal( mb.getPiece(Dagaz.Model.stringToPos("f6")).toString(), "White King", "f6 - White King");
  assert.equal( mb.getPiece(Dagaz.Model.stringToPos("f7")).toString(), "Black Man", "f7 - Black Man");

  var q = board.getPiece(Dagaz.Model.stringToPos("f7"));
  var n = Dagaz.Model.createMove();
  n.capturePiece(Dagaz.Model.stringToPos("f6"), 1);
  n.movePiece(Dagaz.Model.stringToPos("f7"), Dagaz.Model.stringToPos("f5"), q, 1);
  assert.equal( n.toString(1), "f7 - f5 x f6", "f7 - f5 x f6");
  var nb = mb.apply(n);
  assert.equal( nb.player, 1, "White");
  assert.equal( nb.getPiece(Dagaz.Model.stringToPos("f7")), null, "f7 - Empty");
  assert.equal( nb.getPiece(Dagaz.Model.stringToPos("f6")), null, "f6 - Empty");
  assert.equal( nb.getPiece(Dagaz.Model.stringToPos("f5")).toString(), "Black Man", "f5 - Black Man");

  var p = board.getPiece(Dagaz.Model.stringToPos("f3"));
  var o = m.copy();
  o.capturePiece(Dagaz.Model.stringToPos("c6"), 2);
  o.movePiece(Dagaz.Model.stringToPos("f6"), Dagaz.Model.stringToPos("a6"), p, 2);
  assert.equal( o.toString(1), "f3 - f6 x f5", "f3 - f6 x f5");
  assert.equal( o.toString(2), "f6 - a6 x c6", "f6 - a6 x c6");
  assert.equal( o.toString(), "f3 - f6 - a6 x f5 x c6", "f3 - f6 - a6 x f5 x c6");
  var ob = board.apply(o);
  assert.equal( ob.player, 2, "Black");
  assert.equal( ob.getPiece(Dagaz.Model.stringToPos("f3")), null, "f3 - Empty");
  assert.equal( ob.getPiece(Dagaz.Model.stringToPos("f5")), null, "f5 - Empty");
  assert.equal( ob.getPiece(Dagaz.Model.stringToPos("f6")), null, "f6 - Empty");
  assert.equal( ob.getPiece(Dagaz.Model.stringToPos("c6")), null, "c6 - Empty");
  assert.equal( ob.getPiece(Dagaz.Model.stringToPos("a6")).toString(), "White King", "a6 - White King");

  assert.equal( o.isAttacked(Dagaz.Model.stringToPos("f3")), false, "f3 - Not attacked");
  assert.equal( o.isAttacked(Dagaz.Model.stringToPos("f6")), true, "f6 - Is attacked");
  assert.equal( o.isAttacked(Dagaz.Model.stringToPos("a6")), true, "a6 - Is attacked");
  assert.equal( o.isAttacked(Dagaz.Model.stringToPos("f5")), true, "f5 - Is attacked");
  assert.equal( o.isAttacked(Dagaz.Model.stringToPos("c6")), true, "c6 - Is attacked");

  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});

QUnit.test( "Man's moves", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();
  board.clear();
  assert.equal( board.moves.length, 0, "No board moves");

  design.setup("White", "Man", Dagaz.Model.stringToPos("c3"));
  design.setup("White", "Man", Dagaz.Model.stringToPos("g7"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("c5"));
  assert.equal( board.player, 1, "White player");
  var n  = design.getDirection("n");
  assert.equal( n, 3, "North direction");
  var t1 = design.getTemplate(1);
  var g1 = Dagaz.Model.createGen(t1, [ n ]);
  assert.equal( g1.pieces.length , 0, "No Generator's positions");
  g1.init(board, Dagaz.Model.stringToPos("c3"));
  assert.equal( g1.pieces.length , 0, "No Generator's positions again");
  assert.equal( g1.template.commands.length, 13, "Template length");
  assert.equal( g1.stack.length, 0, "Stack is empty");
  assert.equal( g1.pos, 42, "Initial position");
  assert.equal( g1.getPiece(g1.pos).toString(), "White Man", "Current piece");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_FROM executed");
  assert.equal( g1.cmd, 1, "cmd = 1");
  assert.equal( g1.from, 42, "Initial position");
  assert.equal( g1.piece.toString(), "White Man", "Current piece");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_PARAM executed");
  assert.equal( g1.cmd, 2, "cmd = 2");
  assert.equal( g1.stack.length, 1, "Stack");
  assert.equal( g1.stack[0], 3, "Direction");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_NAVIGATE executed");
  assert.equal( g1.cmd, 3, "cmd = 3");
  assert.equal( g1.stack.length, 0, "Stack is empty");
  assert.equal( g1.pos, 34, "Target position");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_IS_EMPTY executed");
  assert.equal( g1.cmd, 4, "cmd = 4");
  assert.equal( g1.stack.length, 1, "Stack");
  assert.equal( g1.stack[0], true, "Position is empty");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_VERIFY executed");
  assert.equal( g1.cmd, 5, "cmd = 5");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_IN_ZONE executed");
  assert.equal( g1.cmd, 6, "cmd = 6");
  assert.equal( g1.stack.length, 1, "Stack");
  assert.equal( g1.stack[0], false, "Not in promotion");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_NOT executed");
  assert.equal( g1.cmd, 7, "cmd = 7");
  assert.equal( g1.stack.length, 1, "Stack");
  assert.equal( g1.stack[0], true, "Not");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 3, "ZRF_IF executed");
  g1.cmd += 3;
  assert.equal( g1.cmd, 11, "cmd = 11");
  assert.equal( g1.stack.length, 0, "Stack is empty");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_TO executed");
  assert.equal( g1.cmd, 12, "cmd = 12");
  assert.equal( g1.from, null, "Empty position");
  assert.equal( g1.piece, null, "Empty piece");
  assert.equal( g1.move.actions.length, 1, "1 action");
  assert.equal( g1.move.actions[0][0][0], 42, "From position");
  assert.equal( g1.move.actions[0][1][0], 34, "To position");
  assert.equal( g1.move.actions[0][2][0].toString(), "White Man", "piece");
  assert.equal( g1.move.actions[0][3], 1, "level");
  assert.equal( g1.lastf, 42, "Last from");
  assert.equal( g1.lastt, 34, "Last to");
  assert.equal( g1.pieces[42], null, "c3 is empty");
  assert.equal( g1.pieces[34].toString(), "White Man", "White Man on c4");
  assert.equal( g1.pieces[0], undefined, "any positions undefined");
  assert.equal( g1.move.toString(1), "c3 - c4", "c3 - c4");
  assert.equal( g1.move.toString(), "c3 - c4", "c3 - c4");

  assert.equal( g1.moveType, 1, "Default MoveType");
  assert.equal( (g1.template.commands[g1.cmd++])(g1), null, "ZRF_END executed");
  assert.equal( g1.cmd, 13, "cmd = 13");
  assert.equal( g1.moveType, 0, "MoveType cleaned");
  assert.equal( board.moves.length, 1, "Move generated");
  assert.equal( board.moves[0].toString(), "c3 - c4", "c3 - c4");

  var g2 = Dagaz.Model.createGen(t1, [ design.getDirection("w") ]);
  g2.init(board, Dagaz.Model.stringToPos("c3"));
  g2.generate();
  assert.equal( board.moves.length, 2, "Move generated");
  assert.equal( board.moves[1].toString(), "c3 - b3", "c3 - b3");

  var g4 = Dagaz.Model.createGen(t1, [ design.getDirection("n") ]);
  g4.init(board, Dagaz.Model.stringToPos("g7"));
  g4.generate();
  assert.equal( board.moves.length, 3, "Move generated");
  assert.equal( board.moves[2].toString(), "g7 - g8", "g7 - g8");
  assert.equal( board.moves[2].actions[0][2][0].toString(), "White King", "promoted");

  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});

QUnit.test( "Man's capturing", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();
  board.clear();
  assert.equal( board.moves.length, 0, "No board moves");

  design.setup("White", "Man", Dagaz.Model.stringToPos("d6"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("e6"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("f7"));

  var e  = design.getDirection("e");
  var t0 = design.getTemplate(0);
  var g1 = Dagaz.Model.createGen(t0, [ e, e ]);
  g1.init(board, Dagaz.Model.stringToPos("d6"));
  assert.equal( g1.level, 1, "Level 1");
  assert.equal( g1.moveType, 1, "Default MoveType");
  assert.equal( g1.mode, null, "No Mode");
  g1.generate();
  assert.equal( g1.moveType, 0, "No MoveType");
  assert.equal( g1.mode, 0, "jumptype");
  assert.equal( board.moves.length, 1, "Move generated");
  assert.equal( board.moves[0].toString(), "d6 - f6 x e6", "d6 - f6 x e6");
  assert.equal( g1.lastf, Dagaz.Model.stringToPos("d6"), "Last from");
  assert.equal( g1.lastt, Dagaz.Model.stringToPos("f6"), "Last to");

  var n  = design.getDirection("n");
  var g2 = g1.copy(t0, [ n, n ]);
  assert.equal( g2.level, 2, "Level 2");
  assert.equal( g2.parent, g1, "Parent assigned");
  assert.equal( g2.pos, Dagaz.Model.stringToPos("f6"), "Pos assigned");
  assert.equal( g2.move.toString(), "d6 - f6 x e6", "Move assigned");
  g2.generate();
  assert.equal( g2.moveType, 0, "No MoveType");
  assert.equal( g2.mode, 2, "notype");
  assert.equal( board.moves.length, 2, "Move generated");
  assert.equal( board.moves[1].toString(1), "d6 - f6 x e6", "d6 - f6 x e6");
  assert.equal( board.moves[1].toString(2), "f6 - f8 x f7", "f6 - f8 x f7");
  assert.equal( board.moves[1].toString(), "d6 - f6 - f8 x e6 x f7", "d6 - f6 - f8 x e6 x f7");
  assert.equal( board.moves[1].actions.length, 4, "actions");
  assert.equal( board.moves[1].actions[3][2][0].toString(), "White King", "promoted");
  assert.equal( g2.lastf, Dagaz.Model.stringToPos("f6"), "Last from");
  assert.equal( g2.lastt, Dagaz.Model.stringToPos("f8"), "Last to");
  assert.equal( g2.isLastFrom(Dagaz.Model.stringToPos("f6")), false, "Not is last");
  assert.equal( g2.isLastFrom(Dagaz.Model.stringToPos("d6")), true, "Last from position");

  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});

QUnit.test( "King's moves", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();
  board.clear();
  assert.equal( board.moves.length, 0, "No board moves");
  assert.equal( board.player, 1, "White player");

  design.setup("White", "King", Dagaz.Model.stringToPos("b1"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("b5"));
  var t3 = design.getTemplate(3);
  var n  = design.getDirection("n");
  var g1 = Dagaz.Model.createGen(t3, [ n, n ]);
  g1.init(board, Dagaz.Model.stringToPos("b1"));
  assert.equal( g1.pieces.length , 0, "No Generator's positions");
  assert.equal( g1.template.commands.length, 13, "Template length");
  assert.equal( g1.stack.length, 0, "Stack is empty");
  assert.equal( g1.pos, Dagaz.Model.stringToPos("b1"), "Initial position");
  assert.equal( g1.getPiece(g1.pos).toString(), "White King", "Current piece");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_FROM executed");
  assert.equal( g1.cmd, 1, "cmd = 1");
  assert.equal( g1.from, Dagaz.Model.stringToPos("b1"), "Initial position");
  assert.equal( g1.piece.toString(), "White King", "Current piece");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_PARAM executed");
  assert.equal( g1.cmd, 2, "cmd = 2");
  assert.equal( g1.stack.length, 1, "Stack");
  assert.equal( g1.stack[0], 3, "Direction");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_NAVIGATE executed");
  assert.equal( g1.cmd, 3, "cmd = 3");
  assert.equal( g1.stack.length, 0, "Stack is empty");
  assert.equal( g1.pos, Dagaz.Model.stringToPos("b2"), "Target position");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_IS_EMPTY executed");
  assert.equal( g1.cmd, 4, "cmd = 4");
  assert.equal( g1.stack.length, 1, "Stack");
  assert.equal( g1.stack[0], true, "Position is empty");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_NOT executed");
  assert.equal( g1.cmd, 5, "cmd = 5");
  assert.equal( g1.stack.length, 1, "Stack");
  assert.equal( g1.stack[0], false, "Not");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_IF executed");
  assert.equal( g1.cmd, 6, "cmd = 6");
  assert.equal( g1.stack.length, 0, "Stack is empty");

  assert.equal( board.forks.length, 0, "No forks");
  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_FORK executed");
  assert.equal( board.forks.length, 1, "Fork generated");
  assert.equal( g1.cmd, 7, "cmd = 7");

  assert.equal( (g1.template.commands[g1.cmd++])(g1), 0, "ZRF_TO executed");
  assert.equal( g1.cmd, 8, "cmd = 8");
  assert.equal( g1.from, null, "Empty position");
  assert.equal( g1.piece, null, "Empty piece");
  assert.equal( g1.move.actions.length, 1, "1 action");
  assert.equal( g1.move.actions[0][0][0], Dagaz.Model.stringToPos("b1"), "From position");
  assert.equal( g1.move.actions[0][1][0], Dagaz.Model.stringToPos("b2"), "To position");
  assert.equal( g1.move.actions[0][2][0].toString(), "White King", "piece");
  assert.equal( g1.move.actions[0][3], 1, "level");
  assert.equal( g1.lastf, Dagaz.Model.stringToPos("b1"), "Last from");
  assert.equal( g1.lastt, Dagaz.Model.stringToPos("b2"), "Last to");
  assert.equal( g1.pieces[Dagaz.Model.stringToPos("b1")], null, "b1 is empty");
  assert.equal( g1.pieces[Dagaz.Model.stringToPos("b2")].toString(), "White King", "White King on b2");
  assert.equal( g1.move.toString(1), "b1 - b2", "b1 - b2");
  assert.equal( g1.move.toString(), "b1 - b2", "b1 - b2");

  assert.equal( g1.moveType, 1, "Default MoveType");
  assert.equal( (g1.template.commands[g1.cmd++])(g1), null, "ZRF_END executed");
  assert.equal( g1.cmd, 9, "cmd = 9");
  assert.equal( g1.moveType, 0, "MoveType cleaned");
  assert.equal( board.moves.length, 1, "Move generated");
  assert.equal( board.moves[0].toString(), "b1 - b2", "b1 - b2");

  var g2 = board.forks.pop();
  assert.equal( g2.move.toString() , "Pass", "No move");
  assert.equal( g2.moveType , 1, "Default MoveType");
  assert.equal( g2.pieces.length , 0, "No Generator's positions");
  assert.equal( g2.template.commands.length, 13, "Template length");
  assert.equal( g2.params.length, 2, "Params length");
  assert.equal( g2.mode, null, "No mode");
  assert.equal( g2.parent, null, "No parent");
  assert.equal( g2.board, board, "Board initialized");
  assert.equal( g2.pos, Dagaz.Model.stringToPos("b2"), "Current position");
  assert.equal( g2.stack.length, 0, "Stack is empty");
  assert.equal( g2.level, 1, "Level 1");
  assert.equal( g2.from, Dagaz.Model.stringToPos("b1"), "Initial position");
  assert.equal( g2.piece.toString(), "White King", "Current piece");
  assert.equal( g2.cmd, 9, "cmd = 9");

  assert.equal( (g2.template.commands[g2.cmd++])(g2), 0, "ZRF_PARAM executed");
  assert.equal( g2.cmd, 10, "cmd = 10");
  assert.equal( g2.stack.length, 1, "Stack");
  assert.equal( g2.stack[0], 3, "Direction");

  assert.equal( (g2.template.commands[g2.cmd++])(g2), 0, "ZRF_NAVIGATE executed");
  assert.equal( g2.cmd, 11, "cmd = 11");
  assert.equal( g2.stack.length, 0, "Stack is empty");
  assert.equal( g2.pos, Dagaz.Model.stringToPos("b3"), "Current position");

  assert.equal( (g2.template.commands[g2.cmd++])(g2), -9, "ZRF_JUMP executed");
  g2.cmd += -9;
  assert.equal( g2.cmd, 3, "cmd = 3");

  assert.equal( (g2.template.commands[g2.cmd++])(g2), 0, "ZRF_IS_EMPTY executed");
  assert.equal( g2.cmd, 4, "cmd = 4");
  assert.equal( g2.stack.length, 1, "Stack");
  assert.equal( g2.stack[0], true, "Position is empty");

  assert.equal( (g2.template.commands[g2.cmd++])(g2), 0, "ZRF_NOT executed");
  assert.equal( g2.cmd, 5, "cmd = 5");
  assert.equal( g2.stack.length, 1, "Stack");
  assert.equal( g2.stack[0], false, "Not");

  assert.equal( (g2.template.commands[g2.cmd++])(g2), 0, "ZRF_IF executed");
  assert.equal( g2.cmd, 6, "cmd = 6");
  assert.equal( g2.stack.length, 0, "Stack is empty");

  assert.equal( board.forks.length, 0, "No forks");
  assert.equal( (g2.template.commands[g2.cmd++])(g2), 0, "ZRF_FORK executed");
  assert.equal( board.forks.length, 1, "Fork generated");
  assert.equal( g2.cmd, 7, "cmd = 7");

  assert.equal( (g2.template.commands[g2.cmd++])(g2), 0, "ZRF_TO executed");
  assert.equal( g2.cmd, 8, "cmd = 8");
  assert.equal( g2.from, null, "Empty position");
  assert.equal( g2.piece, null, "Empty piece");
  assert.equal( g2.move.toString(), "b1 - b3", "b1 - b3");

  assert.equal( (g2.template.commands[g2.cmd++])(g2), null, "ZRF_END executed");
  assert.equal( g2.cmd, 9, "cmd = 9");
  assert.equal( board.moves.length, 2, "Move generated");
  assert.equal( board.moves[0].toString(), "b1 - b2", "b1 - b2");
  assert.equal( board.moves[1].toString(), "b1 - b3", "b1 - b3");

  var g3 = board.forks.pop();
  assert.equal( g3.move.toString() , "Pass", "No move");
  assert.equal( g3.moveType , 1, "Default MoveType");
  assert.equal( g3.pieces.length , 0, "No Generator's positions");
  assert.equal( g3.template.commands.length, 13, "Template length");
  assert.equal( g3.params.length, 2, "Params length");
  assert.equal( g3.mode, null, "No mode");
  assert.equal( g3.parent, null, "No parent");
  assert.equal( g3.board, board, "Board initialized");
  assert.equal( g3.pos, Dagaz.Model.stringToPos("b3"), "Current position");
  assert.equal( g3.stack.length, 0, "Stack is empty");
  assert.equal( g3.level, 1, "Level 1");
  assert.equal( g3.from, Dagaz.Model.stringToPos("b1"), "Initial position");
  assert.equal( g3.piece.toString(), "White King", "Current piece");
  assert.equal( g3.cmd, 9, "cmd = 9");
  g3.generate();
  assert.equal( board.forks.length, 1, "Fork generated");
  assert.equal( board.moves.length, 3, "Move generated");
  assert.equal( board.moves[0].toString(), "b1 - b2", "b1 - b2");
  assert.equal( board.moves[1].toString(), "b1 - b3", "b1 - b3");
  assert.equal( board.moves[2].toString(), "b1 - b4", "b1 - b4");

  var g4 = board.forks.pop();
  g4.generate();
  assert.equal( board.forks.length, 0, "No Forks");
  assert.equal( board.moves.length, 3, "No Move generated");

  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});

QUnit.test( "King's capturing", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();
  board.clear();
  assert.equal( board.moves.length, 0, "No board moves");
  assert.equal( board.player, 1, "White player");

  design.setup("White", "King", Dagaz.Model.stringToPos("c4"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("b4"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("e4"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("g6"));
  var t2 = design.getTemplate(2);
  var e  = design.getDirection("e");
  var g1 = Dagaz.Model.createGen(t2, [e, e, e, e, e]);
  g1.init(board, Dagaz.Model.stringToPos("c4"));

  g1.generate();
  assert.equal( board.forks.length, 1, "Fork generated");
  assert.equal( board.moves.length, 1, "Move generated");
  assert.equal( board.moves[0].toString(), "c4 - f4 x e4", "c4 - f4 x e4");

  var g2 = board.forks.pop();
  g2.generate();
  assert.equal( board.forks.length, 1, "Fork generated");
  assert.equal( board.moves.length, 2, "Move generated");
  assert.equal( board.moves[1].toString(), "c4 - g4 x e4", "c4 - g4 x e4");
  board.forks.pop();

  var n  = design.getDirection("n");
  var g3 = g2.copy(t2, [n, n, n, n, n]);
  assert.equal( g3.level, 2, "Level 2");
  assert.equal( g3.parent, g2, "Parent assigned");
  assert.equal( g3.pos, Dagaz.Model.stringToPos("g4"), "Pos assigned");
  assert.equal( g3.move.toString(), "c4 - g4 x e4", "Move assigned");
  g3.generate();
  assert.equal( board.forks.length, 1, "Fork generated");
  assert.equal( board.moves.length, 3, "Move generated");
  assert.equal( board.moves[2].toString(), "c4 - g4 - g7 x e4 x g6", "c4 - g4 - g7 x e4 x g6");
  board.forks.pop();

  var w  = design.getDirection("w");
  var g4 = g1.copy(t2, [w, w, w, w, w]);
  assert.equal( g4.level, 2, "Level 2");
  assert.equal( g4.parent, g1, "Parent assigned");
  assert.equal( g4.pos, Dagaz.Model.stringToPos("f4"), "Pos assigned");
  assert.equal( g4.move.toString(), "c4 - f4 x e4", "Move assigned");
  assert.equal( g4.cmd, 0, "cmd = 0");

  assert.equal( (g4.template.commands[g4.cmd++])(g4), 0, "ZRF_FROM executed");
  assert.equal( g4.cmd, 1, "cmd = 1");
  assert.equal( g4.from, Dagaz.Model.stringToPos("f4"), "Initial position");
  assert.equal( g4.piece.toString(), "White King", "Current piece");

  assert.equal( (g4.template.commands[g4.cmd++])(g4), 0, "ZRF_PARAM executed");
  assert.equal( g4.cmd, 2, "cmd = 2");
  assert.equal( g4.stack.length, 1, "Stack");
  assert.equal( g4.stack[0], 0, "Direction");

  assert.equal( (g4.template.commands[g4.cmd++])(g4), 0, "ZRF_NAVIGATE executed");
  assert.equal( g4.cmd, 3, "cmd = 3");
  assert.equal( g4.stack.length, 0, "Stack is empty");
  assert.equal( g4.pos, Dagaz.Model.stringToPos("e4"), "Current position");

  assert.equal( (g4.template.commands[g4.cmd++])(g4), 0, "ZRF_IS_EMPTY executed");
  assert.equal( g4.cmd, 4, "cmd = 4");
  assert.equal( g4.stack.length, 1, "Stack");
  assert.equal( g4.stack[0], true, "Piece is captured");
  assert.equal( g4.isLastFrom(Dagaz.Model.stringToPos("c4")), true, "c4 - is last from position");

  var g5 = g1.copy(t2, [w, w, w, w, w]);
  g5.generate();
  assert.equal( board.forks.length, 0, "No Forks");
  assert.equal( board.moves.length, 3, "No Moves generated");

  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});

QUnit.test( "Simple Man's moves", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();
  board.clear();
  assert.equal( board.moves.length, 0, "No board moves");

  design.setup("White", "Man", Dagaz.Model.stringToPos("c3"));
  board.generate();
  assert.equal( board.moves.length, 3, "3 Moves generated");
  assert.equal( board.moves[0].toString(), "c3 - d3", "c3 - d3");
  assert.equal( board.moves[1].toString(), "c3 - b3", "c3 - b3");
  assert.equal( board.moves[2].toString(), "c3 - c4", "c3 - c4");

  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});

QUnit.test( "Man's capturing priorited", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();
  board.clear();
  assert.equal( board.moves.length, 0, "No board moves");

  design.setup("White", "Man", Dagaz.Model.stringToPos("b2"));
  design.setup("White", "Man", Dagaz.Model.stringToPos("e2"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("b3"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("f2"));

  board.generate();
  assert.equal( board.moves.length, 2, "2 Moves generated");
  assert.equal( board.moves[0].toString(), "e2 - g2 x f2", "e2 - g2 x f2");
  assert.equal( board.moves[1].toString(), "b2 - b4 x b3", "b2 - b4 x b3");

  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});

QUnit.test( "Man's capturing chain", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();
  board.clear();
  assert.equal( board.moves.length, 0, "No board moves");

  design.setup("White", "Man", Dagaz.Model.stringToPos("d2"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("d3"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("d5"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("e4"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("f5"));

  board.generate();
  assert.equal( board.moves.length, 1, "1 move generated");
  assert.equal( board.moves[0].toString(), "d2 - d4 - f4 - f6 x d3 x e4 x f5", "d2 - d4 - f4 - f6 x d3 x e4 x f5");

  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});

QUnit.test( "King's slide", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();
  board.clear();
  assert.equal( board.moves.length, 0, "No board moves");

  design.setup("White", "King", Dagaz.Model.stringToPos("d4"));
  board.generate();
  assert.equal( board.moves.length, 14, "14 moves generated");
  assert.equal( board.moves[0].toString(), "d4 - d3", "d4 - d3");
  assert.equal( board.moves[1].toString(), "d4 - e4", "d4 - e4");
  assert.equal( board.moves[2].toString(), "d4 - c4", "d4 - c4");
  assert.equal( board.moves[3].toString(), "d4 - d5", "d4 - d5");
  assert.equal( board.moves[4].toString(), "d4 - d6", "d4 - d6");
  assert.equal( board.moves[5].toString(), "d4 - d7", "d4 - d7");
  assert.equal( board.moves[6].toString(), "d4 - d8", "d4 - d8");
  assert.equal( board.moves[7].toString(), "d4 - b4", "d4 - b4");
  assert.equal( board.moves[8].toString(), "d4 - a4", "d4 - a4");
  assert.equal( board.moves[9].toString(), "d4 - f4", "d4 - f4");
  assert.equal( board.moves[10].toString(), "d4 - g4", "d4 - g4");
  assert.equal( board.moves[11].toString(), "d4 - h4", "d4 - h4");
  assert.equal( board.moves[12].toString(), "d4 - d2", "d4 - d2");
  assert.equal( board.moves[13].toString(), "d4 - d1", "d4 - d1");

  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});

QUnit.test( "King's capturing chain", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();
  board.clear();
  assert.equal( board.moves.length, 0, "No board moves");

  design.setup("White", "King", Dagaz.Model.stringToPos("d4"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("c4"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("a6"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("f8"));

  board.generate();
  assert.equal( board.moves.length, 2, "2 moves generated");
  assert.equal( board.moves[0].toString(), "d4 - a4 - a8 - g8 x c4 x a6 x f8", "d4 - a4 - a8 - g8 x c4 x a6 x f8");
  assert.equal( board.moves[1].toString(), "d4 - a4 - a8 - h8 x c4 x a6 x f8", "d4 - a4 - a8 - h8 x c4 x a6 x f8");

  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});

QUnit.test( "Move List", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();
  board.clear();
  assert.equal( board.moves.length, 0, "No board moves");

  design.setup("White", "King", Dagaz.Model.stringToPos("d8"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("e8"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("b7"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("e7"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("a6"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("b6"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("d6"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("e6"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("g6"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("h6"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("e5"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("b3"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("c3"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("f3"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("a2"));
  design.setup("Black", "Man", Dagaz.Model.stringToPos("d1"));

  board.generate();
  assert.equal( board.moves.length, 42, "42 moves generated");
  assert.equal( board.moves[0].toString(), "d8 - g8 - g3 - d3 - d7 - h7 - h5 - a5 - a7 - e7 - e1 - c1 - c6 - a6 - a1 x e8 x g6 x f3 x d6 x e7 x h6 x e5 x a6 x b7 x e6 x d1 x c3 x b6 x a2", "d8 - g8 - g3 - d3 - d7 - h7 - h5 - a5 - a7 - e7 - e1 - c1 - c6 - a6 - a1 x e8 x g6 x f3 x d6 x e7 x h6 x e5 x a6 x b7 x e6 x d1 x c3 x b6 x a2");

  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});
