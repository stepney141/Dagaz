QUnit.test( "Model Bug", function( assert ) {
  Dagaz.Model.InitGame();
  var design = Dagaz.Model.getDesign();
  var board  = Dagaz.Model.getInitBoard();

  board.generate();
  assert.equal( board.moves.length, 5, "5 moves generated");
  assert.equal( board.moves[0].toString(), "f2 - e3 [1] x d4 [2] x c5 [2]");
  assert.equal( board.moves[1].toString(), "e2 - e3 [1] x e4 [2] x e5 [2]");
  assert.equal( board.moves[2].toString(), "d2 - e3 [1] x f4 [2] x g5 [2]");
  assert.equal( board.moves[3].toString(), "d3 - e3 [1] x c3 [2]");
  assert.equal( board.moves[4].toString(), "d3 - e3 [1] x f3 [2]");

  board = board.apply(board.moves[3]);
  board.generate();
  assert.equal( board.moves.length, 18, "18 moves generated");
  assert.equal( board.moves[0].toString(), "d4 - c3 [1] x b2 [2] x a1 [2]");
  assert.equal( board.moves[1].toString(), "d4 - c3 [1] - d3 [3] x b2 [2] x a1 [2] x e3 [4]");
  assert.equal( board.moves[2].toString(), "d4 - c3 [1] - d3 [3] x b2 [2] x a1 [2] x b3 [4]");
  assert.equal( board.moves[3].toString(), "d4 - d3 [1] x d2 [2] x d1 [2]");
  assert.equal( board.moves[4].toString(), "d4 - d3 [1] - c3 [3] x d2 [2] x d1 [2] x b3 [4]");
  assert.equal( board.moves[5].toString(), "d4 - d3 [1] - c3 [3] - d2 [5] x d2 [2] x d1 [2] x b3 [4] x e1 [6]");
  assert.equal( board.moves[6].toString(), "d4 - d3 [1] - c3 [3] x d2 [2] x d1 [2] x e3 [4]");
  assert.equal( board.moves[7].toString(), "d4 - d3 [1] - c3 [3] - d2 [5] x d2 [2] x d1 [2] x e3 [4] x e1 [6]");
  assert.equal( board.moves[8].toString(), "d4 - d3 [1] - c3 [3] - d2 [5] - e3 [7] x d2 [2] x d1 [2] x e3 [4] x e1 [6] x c1 [8]");
  assert.equal( board.moves[9].toString(), "c4 - c3 [1] x c2 [2] x c1 [2]");
  assert.equal( board.moves[10].toString(), "c4 - c3 [1] - d3 [3] x c2 [2] x c1 [2] x e3 [4]");
  assert.equal( board.moves[11].toString(), "c4 - c3 [1] - d3 [3] x c2 [2] x c1 [2] x b3 [4]");
  assert.equal( board.moves[12].toString(), "b4 - c3 [1] x d2 [2] x e1 [2]");
  assert.equal( board.moves[13].toString(), "b4 - c3 [1] - d3 [3] x d2 [2] x e1 [2] x e3 [4]");
  assert.equal( board.moves[14].toString(), "b4 - c3 [1] - d3 [3] - d2 [5] x d2 [2] x e1 [2] x e3 [4] x d1 [6]");
  assert.equal( board.moves[15].toString(), "b4 - c3 [1] - d3 [3] - d2 [5] - e3 [7] x d2 [2] x e1 [2] x e3 [4] x d1 [6] x c1 [8]");
  assert.equal( board.moves[16].toString(), "b4 - c3 [1] - d3 [3] x d2 [2] x e1 [2] x b3 [4]");
  assert.equal( board.moves[17].toString(), "b4 - c3 [1] - d3 [3] - d2 [5] x d2 [2] x e1 [2] x b3 [4] x d1 [6]");

//board = board.apply(board.moves[10]);
//assert.equal( board.getPiece(Dagaz.Model.stringToPos("d3")), null, "d3 is empty?");

  var move = board.moves[10];
  board = board.copy();
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c4")).toString(), "Black Stone", "c4 - Black Stone");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c3")), null, "c3 is empty?");

  assert.equal( move.applyTo(board, 1), true, "c4 - c3");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c3")).toString(), "Black Stone", "c3 - Black Stone");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c4")), null, "c4 is empty?");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c1")).toString(), "White Stone", "c1 - White Stone");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c2")).toString(), "White Stone", "c2 - White Stone");

  assert.equal( move.applyTo(board, 2), true, "x c2 x c1");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c3")).toString(), "Black Stone", "c3 - Black Stone");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("d3")), null, "d3 is empty?");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c4")), null, "c4 is empty?");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c1")), null, "c1 is empty?");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c2")), null, "c2 is empty?");

//assert.equal( move.applyTo(board, 3), true, "c3 - d3");
  board.movePiece(Dagaz.Model.stringToPos("c3"), Dagaz.Model.stringToPos("d3"), null, 3);
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("c3")), null, "c3 is empty?");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("d3")).toString(), "Black Stone", "d3 - Black Stone");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("e3")).toString(), "White Stone", "e3 - White Stone");

  assert.equal( move.applyTo(board, 4), true, "x e3");
  assert.equal( board.getPiece(Dagaz.Model.stringToPos("e3")), null, "e3 is empty?");

  Dagaz.Model.design = undefined;
  Dagaz.Model.board = undefined;
});
