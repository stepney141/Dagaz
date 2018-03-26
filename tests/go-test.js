QUnit.test("Drop moves", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();

  board.generate();
  assert.equal( board.moves.length, 81, "81 moves generated");
  assert.equal( board.moves[0].actions.length, 1, "move.actions.length == 1");
  assert.equal( board.moves[0].actions[0][0], null, "from position == null");
  assert.equal( board.moves[0].actions[0][1].length, 1, "move.actions[0][1].length == 1");
  assert.equal( board.moves[0].actions[0][1][0], 80, "to position == 80");
  assert.equal( board.moves[0].actions[0][2].length, 1, "move.actions[0][2].length == 1");
  assert.equal( board.moves[0].actions[0][2][0].toString(), "Black Stone", "Black Stone");
  assert.equal( board.moves[0].toString(), "Black Stone i1", "Black Stone i1");

  assert.equal( design.reserve[0][1], 81, "81 Black Stones");
  assert.equal( design.reserve[0][2], 81, "81 White Stones");
  assert.equal( board.getPiece(80), null, "i1 is Empty");
  board = board.apply(board.moves[0]);
  assert.equal( board.getPiece(80).toString(), "Black Stone", "i1 - Black Stone");
  assert.equal( design.reserve[0][1], 80, "80 Black Stones");
  assert.equal( design.reserve[0][2], 81, "81 White Stones");

  board.generate();
  assert.equal( board.moves.length, 80, "80 moves generated");
  assert.equal( board.moves[0].toString(), "White Stone h1", "White Stone h1");
  assert.equal( board.getPiece(79), null, "h1 is Empty");
  board = board.apply(board.moves[0]);
  assert.equal( board.getPiece(80).toString(), "Black Stone", "i1 - Black Stone");
  assert.equal( board.getPiece(79).toString(), "White Stone", "h1 - White Stone");
  assert.equal( design.reserve[0][1], 80, "80 Black Stones");
  assert.equal( design.reserve[0][2], 80, "80 White Stones");

  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});

QUnit.test("Move list", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();
  var list   = Dagaz.Model.getMoveList(board);

  assert.equal( board.moves.length, 81, "81 moves generated");
  var drops = list.getDrops();
  assert.equal( drops.length, 81, "81 drops");
  assert.equal( drops[0], 80, "i1 position");
  var pieces = list.getDropPieces(80);
  assert.equal( pieces.length, 1, "One drop pieces");
  assert.equal( pieces[0].toString(), "Black Stone", "is Black Stone");

  var starts = list.getStarts();
  assert.equal( starts.length, 0, "Starts is empty");

  var targets = list.getTargets();
  assert.equal( targets.length, 0, "Targets is empty");

  var stops = list.getStops();
  assert.equal( stops.length, 81, "81 Stop positions");

  var move = list.setPosition(80);
  assert.equal( move.toString(), "Black Stone i1", "Black Stone i1");

  var moves = list.getMoves();
  assert.equal( list.isDone(), true, "Move is done");
  assert.equal( moves.length, 1, "One move");
  assert.equal( moves[0].toString(), "Black Stone i1", "Black Stone i1");

  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});
