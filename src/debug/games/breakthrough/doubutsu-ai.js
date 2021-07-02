"use strict";

(function() {

var g_timeout   = 3000;
var g_width     = 3;
var g_height    = 4;

var colorBlack  = 0x10;
var colorWhite  = 0x08;

var pieceEmpty  = 0x00;
var pieceKing   = 0x01;
var piecePawn   = 0x02;
var pieceBishop = 0x03;
var pieceRook   = 0x04;
var pieceQueen  = 0x05;

var moveflagPromotion  = 0x1 << 16;
var moveflagDrop       = 0x2 << 16;
var moveflagDropBishop = 0x4 << 16;
var moveflagDropRook   = 0x8 << 16;

function GetFen() {
    var result = "";
    for (var row = 0; row < g_height; row++) {
        if (row != 0) 
            result += '/';
        var empty = 0;
        for (var col = 0; col < g_width; col++) {
            var piece = g_board[((row + 2) << 4) + col + 4];
            if (piece == 0) {
                empty++;
            }
            else {
                if (empty != 0) 
                    result += empty;
                empty = 0;
                var pieceChar = [" ", "k", "p", "b", "r", "q", " ", " "][(piece & 0x7)];
                result += ((piece & colorWhite) != 0) ? pieceChar.toUpperCase() : pieceChar;
            }
        }
        if (empty != 0) {
            result += empty;
        }
    }
    result += "-";
    for (var i = 0; i < 6; i++) {
        result += g_hand[ i ];
    }
    result += g_toMove == colorWhite ? " w" : " b";
    return result;
}

function FormatSquare(square) {
    var letters = ['a', 'b', 'c'];
    return letters[(square & 0xF) - 4] + (((g_height + 1) - (square >> 4)) + 1);
}

function FormatMove(move) {
    var result = FormatSquare(move & 0xFF) + '-' + FormatSquare((move >> 8) & 0xFF);
    if (move & moveflagDrop) {
        result = FormatSquare((move >> 8) & 0xFF)
        if (g_toMove == colorWhite) result += " Green";
            else result += " Red";
        if (move & moveflagDropBishop) result += " Sang";
        else if (move & moveflagDropRook) result += " Jang";
        else result += " Za";
    }  
    return result;
}

var minEval = -2000000;
var maxEval = +2000000;

var g_startTime;
var g_nodeCount;
var g_qNodeCount;
var g_searchValid;
var g_globalPly = 0;

function Search(finishMoveCallback, maxPly, finishPlyCallback) {
    var alpha = minEval;
    var beta = maxEval;
    
    g_globalPly++;
    g_nodeCount = 0;
    g_qNodeCount = 0;
    g_searchValid = true;
    
    var bestMove = 0;
    var value;
    
    g_startTime = (new Date()).getTime();

    var i;
    for (i = 1; i <= maxPly && g_searchValid; i++) {
        var tmp = AlphaBeta(i, 0, alpha, beta);
        if (!g_searchValid) break;

        value = tmp;

        if (value > alpha && value < beta) {
            alpha = value - 500;
            beta = value + 500;

            if (alpha < minEval) alpha = minEval;
            if (beta > maxEval) beta = maxEval;
        } else if (alpha != minEval) {
            alpha = minEval;
            beta = maxEval;
            i--;
        }

        if (g_hashTable[g_hashKeyLow & g_hashMask] != null) {
            bestMove = g_hashTable[g_hashKeyLow & g_hashMask].bestMove;
        }

        if (finishPlyCallback != null) {
            finishPlyCallback(bestMove, value, (new Date()).getTime() - g_startTime, i);
        }
    }

    if (finishMoveCallback != null) {
        finishMoveCallback(bestMove, value, (new Date()).getTime() - g_startTime, i - 1);
    }
}

var minMateBuffer = minEval + 2000;
var maxMateBuffer = maxEval - 2000;

var materialTable = [0, 600000, 800, 3000, 5000, 5500];

var pawnAdj = [ 
     0,   0,   0,
   200, 200, 200,
   100, 100, 100,
     0,   0,   0
];

var bishopAdj = [ 
   100, 200, 100,
   200, 400, 200,
   200, 400, 200,
   100, 200, 100
];

var rookAdj = [ 
   200, 300, 200,
   300, 400, 300,
   300, 400, 300,
   200, 300, 200
];

var queenAdj = [ 
   200, 300, 200,
   400, 600, 400,
   400, 600, 400,
   300, 500, 300
];

var kingAdj = [ 
  9000,9000,9000,
   500, 400, 500,
   300, 200, 300,
   100, 200, 100
];

var emptyAdj = [ 
     0,   0,   0,
     0,   0,   0,
     0,   0,   0,
     0,   0,   0
];

var pieceSquareAdj = new Array(8);

// Returns the square flipped
var flipTable = new Array(256);

function Mobility(color) {
    var result = 0;
    var from, to, mob, pieceIdx;
    var enemy = color == colorWhite ? 0x10 : 0x8
    var mobUnit = color == colorWhite ? g_mobUnit[0] : g_mobUnit[1];

    // Bishop mobility
    mob = -2;
    pieceIdx = (color | pieceBishop) << 4;
    from = g_pieceList[pieceIdx++];
    while (from != 0) {
        mob += mobUnit[g_board[from + 15]];
        mob += mobUnit[g_board[from + 17]];
        mob += mobUnit[g_board[from - 15]];
        mob += mobUnit[g_board[from - 17]];
        from = g_pieceList[pieceIdx++];
    }
    result += 22 * mob;

    // Rook mobility
    mob = -2;
    pieceIdx = (color | pieceRook) << 4;
    from = g_pieceList[pieceIdx++];
    while (from != 0) {
        mob += mobUnit[g_board[from + 1]];
        mob += mobUnit[g_board[from + 16]];
        mob += mobUnit[g_board[from - 16]];
        mob += mobUnit[g_board[from - 1]];
        from = g_pieceList[pieceIdx++];
    }
    result += 22 * mob;

    // Queen mobility
    mob = -2;
    pieceIdx = (color | pieceQueen) << 4;
    from = g_pieceList[pieceIdx++];
    while (from != 0) {
        mob += mobUnit[g_board[from + 1]];
        mob += mobUnit[g_board[from + 16]];
        mob += mobUnit[g_board[from - 16]];
        mob += mobUnit[g_board[from - 1]];
        if (color == colorWhite) {
            mob += mobUnit[g_board[from - 15]];
            mob += mobUnit[g_board[from - 17]];
        } else {
            mob += mobUnit[g_board[from + 15]];
            mob += mobUnit[g_board[from + 17]];
        }
        from = g_pieceList[pieceIdx++];
    }
    result += 22 * mob;

    return result;
}

function Evaluate() {
    var curEval = g_baseEval;
    var mobility = Mobility(colorWhite) - Mobility(0);
    if (g_toMove == 0) {
        // Black
        curEval -= mobility;
    }
    else {
        curEval += mobility;
    }
    return curEval;
}

function ScoreMove(move){
    var moveTo = (move >> 8) & 0xFF;
    var captured = g_board[moveTo] & 0x7;
    var piece = g_board[move & 0xFF];
    var score;
    if (captured != 0) {
        var pieceType = piece & 0x7;
        score = (captured << 5) - pieceType;
    } else {
        score = historyTable[piece & 0xF][moveTo];
    }
    return score;
}

function QSearch(alpha, beta, ply) {
    g_qNodeCount++;

    var realEval = g_inCheck ? (minEval + 1) : Evaluate();
    
    if (realEval >= beta) 
        return realEval;

    if (realEval > alpha)
        alpha = realEval;

    var moves = new Array();
    var moveScores = new Array();
    var wasInCheck = g_inCheck;

    if (wasInCheck) {
        GenerateCaptureMoves(moves);
        GenerateAllMoves(moves);
        for (var i = 0; i < moves.length; i++) {
            moveScores[i] = ScoreMove(moves[i]);
        }
    } else {
        GenerateCaptureMoves(moves);
        for (var i = 0; i < moves.length; i++) {
            var captured = g_board[(moves[i] >> 8) & 0xFF] & 0x7;
            var pieceType = g_board[moves[i] & 0xFF] & 0x7;

            moveScores[i] = (captured << 5) - pieceType;
        }
    }

    for (var i = 0; i < moves.length; i++) {
        var bestMove = i;
        for (var j = moves.length - 1; j > i; j--) {
            if (moveScores[j] > moveScores[bestMove]) {
                bestMove = j;
            }
        }
        {
            var tmpMove = moves[i];
            moves[i] = moves[bestMove];
            moves[bestMove] = tmpMove;
            
            var tmpScore = moveScores[i];
            moveScores[i] = moveScores[bestMove];
            moveScores[bestMove] = tmpScore;
        }

        if (!wasInCheck && !See(moves[i])) {
            continue;
        }

        if (!MakeMove(moves[i])) {
            continue;
        }

        var value = -QSearch(-beta, -alpha, ply - 1);
        
        UnmakeMove(moves[i]);
        
        if (value > realEval) {
            if (value >= beta) 
                return value;
            
            if (value > alpha)
                alpha = value;
            
            realEval = value;
        }
    }

    return realEval;
}

function StoreHash(value, flags, ply, move, depth) {
	if (value >= maxMateBuffer)
		value += depth;
	else if (value <= minMateBuffer)
		value -= depth;
	g_hashTable[g_hashKeyLow & g_hashMask] = new HashEntry(g_hashKeyHigh, value, flags, ply, move);
}

function IsHashMoveValid(hashMove) {
    var to = (hashMove >> 8) & 0xFF;
//  if (g_board[to] & 0x80) return false;
    if (hashMove & moveflagDrop) {
        if (g_board[to] != 0) return false;
        var ix = 0;
        if (hashMove & moveflagDropBishop) ix = 1;
        if (hashMove & moveflagDropRook) ix = 2;
        if (g_toMove != colorWhite) ix += 3;
        if (!g_hand[ix]) return false;
/*      if ((hashMove & (moveflagDropBishop | moveflagDropRook)) == 0) {
            var row = square & 0xF0;
            if (g_toMove == colorWhite) {
                if (row == 0x20) return false;
            } else {
                if (row == 0x50) return false;
            }
        }*/
        return true;
    }
    var from = hashMove & 0xFF;
    var ourPiece = g_board[from];
    var pieceType = ourPiece & 0x7;
    if (pieceType < pieceKing || pieceType > pieceQueen) return false;
    // Can't move a piece we don't control
    if (g_toMove != (ourPiece & 0x8)) return false;
    // Can't move to a square that has something of the same color
    if (g_board[to] != 0 && (g_toMove == (g_board[to] & 0x8))) return false;
    if (pieceType == piecePawn) {
        // Valid moves
        var dir = to - from;
        if ((g_toMove == colorWhite) != (dir < 0))  {
            // Pawns have to move in the right direction
            return false;
        }        
    }
    if (pieceType == pieceQueen) {
        var dir = to - from;
        if ((Math.abs(dir) != 1) && (Math.abs(dir) != 16)) {
            if ((g_toMove == colorWhite) != (dir < 0)) return false;
        }
    }
    return IsSquareAttackableFrom(to, from);
}

function IsRepDraw() {
    var stop = g_moveCount - 1 - g_move50;
    stop = stop < 0 ? 0 : stop;
    for (var i = g_moveCount - 5; i >= stop; i -= 2) {
        if (g_repMoveStack[i] == g_hashKeyLow)
            return true;
    }
    return false;
}

function MovePicker(hashMove, depth, killer1, killer2) {
    this.hashMove = hashMove;
    this.depth = depth;
    this.killer1 = killer1;
    this.killer2 = killer2;

    this.moves = new Array();
    this.losingCaptures = null;
    this.moveCount = 0;
    this.atMove = -1;
    this.moveScores = null;
    this.stage = 0;

    this.nextMove = function () {
        if (++this.atMove == this.moveCount) {
            this.stage++;
            if (this.stage == 1) {
                if (this.hashMove != null && IsHashMoveValid(hashMove)) {
                    this.moves[0] = hashMove;
                    this.moveCount = 1;
                }
                if (this.moveCount != 1) {
                    this.hashMove = null;
                    this.stage++;
                }
            }

            if (this.stage == 2) {
                GenerateCaptureMoves(this.moves, null);
                this.moveCount = this.moves.length;
                this.moveScores = new Array(this.moveCount);
                // Move ordering
                for (var i = this.atMove; i < this.moveCount; i++) {
                    var captured = g_board[(this.moves[i] >> 8) & 0xFF] & 0x7;
                    var pieceType = g_board[this.moves[i] & 0xFF] & 0x7;
                    this.moveScores[i] = (captured << 5) - pieceType;
                }
                // No moves, onto next stage
                if (this.atMove == this.moveCount) this.stage++;
            }

            if (this.stage == 3) {
                if (IsHashMoveValid(this.killer1) &&
                    this.killer1 != this.hashMove) {
                    this.moves[this.moves.length] = this.killer1;
                    this.moveCount = this.moves.length;
                } else {
                    this.killer1 = 0;
                    this.stage++;
                }
            }

            if (this.stage == 4) {
                if (IsHashMoveValid(this.killer2) &&
                    this.killer2 != this.hashMove) {
                    this.moves[this.moves.length] = this.killer2;
                    this.moveCount = this.moves.length;
                } else {
                    this.killer2 = 0;
                    this.stage++;
                }
            }

            if (this.stage == 5) {
                GenerateAllMoves(this.moves);
                this.moveCount = this.moves.length;
                // Move ordering
                for (var i = this.atMove; i < this.moveCount; i++) this.moveScores[i] = ScoreMove(this.moves[i]);
                // No moves, onto next stage
                if (this.atMove == this.moveCount) this.stage++;
            }

            if (this.stage == 6) {
                // Losing captures
                if (this.losingCaptures != null) {
                    for (var i = 0; i < this.losingCaptures.length; i++) {
                        this.moves[this.moves.length] = this.losingCaptures[i];
                    }
                    for (var i = this.atMove; i < this.moveCount; i++) this.moveScores[i] = ScoreMove(this.moves[i]);
                    this.moveCount = this.moves.length;
                }
                // No moves, onto next stage
                if (this.atMove == this.moveCount) this.stage++;
            }

            if (this.stage == 7)
                return 0;
        }

        var bestMove = this.atMove;
        for (var j = this.atMove + 1; j < this.moveCount; j++) {
            if (this.moveScores[j] > this.moveScores[bestMove]) {
                bestMove = j;
            }
        }

        if (bestMove != this.atMove) {
            var tmpMove = this.moves[this.atMove];
            this.moves[this.atMove] = this.moves[bestMove];
            this.moves[bestMove] = tmpMove;

            var tmpScore = this.moveScores[this.atMove];
            this.moveScores[this.atMove] = this.moveScores[bestMove];
            this.moveScores[bestMove] = tmpScore;
        }

        var candidateMove = this.moves[this.atMove];
        if ((this.stage > 1 && candidateMove == this.hashMove) ||
            (this.stage > 3 && candidateMove == this.killer1) ||
            (this.stage > 4 && candidateMove == this.killer2)) {
            return this.nextMove();
        }

        if (this.stage == 2 && !See(candidateMove)) {
            if (this.losingCaptures == null) {
                this.losingCaptures = new Array();
            }
            this.losingCaptures[this.losingCaptures.length] = candidateMove;
            return this.nextMove();
        }

        return this.moves[this.atMove];
    }
}

function AllCutNode(ply, depth, beta, allowNull) {
    if (ply <= 0) {
        return QSearch(beta - 1, beta, 0);
    }

    if ((g_nodeCount & 127) == 127) {
        if ((new Date()).getTime() - g_startTime > g_timeout) {
            // Time cutoff
            g_searchValid = false;
            return beta - 1;
        }
    }

    g_nodeCount++;
    if (IsRepDraw()) return 0;

    // Mate distance pruning
    if (minEval + depth >= beta)
       return beta;

    if (maxEval - (depth + 1) < beta)
	return beta - 1;

    var hashMove = null;
    var hashNode = g_hashTable[g_hashKeyLow & g_hashMask];
    if (hashNode != null && hashNode.lock == g_hashKeyHigh) {
        hashMove = hashNode.bestMove;
        if (hashNode.hashDepth >= ply) {
            var hashValue = hashNode.value;

            // Fixup mate scores
            if (hashValue >= maxMateBuffer)
		hashValue -= depth;
            else if (hashValue <= minMateBuffer)
                hashValue += depth;

            if (hashNode.flags == hashflagExact)
                return hashValue;
            if (hashNode.flags == hashflagAlpha && hashValue < beta)
                return hashValue;
            if (hashNode.flags == hashflagBeta && hashValue >= beta)
                return hashValue;
        }
    }

    if (!g_inCheck &&
        allowNull &&
        beta > minMateBuffer && 
        beta < maxMateBuffer) {
        // Try some razoring
        if (hashMove == null &&
            ply < 4) {
            var razorMargin = 2500 + 200 * ply;
            if (g_baseEval < beta - razorMargin) {
                var razorBeta = beta - razorMargin;
                var v = QSearch(razorBeta - 1, razorBeta, 0);
                if (v < razorBeta)
                    return v;
            }
        }
        
        // Null move
        if (ply > 1 &&
            g_baseEval >= beta - (ply >= 4 ? 2500 : 0) &&
            // Disable null move if potential zugzwang (no big pieces)
            (g_hand[g_toMove == ? colorWhite : 0 : 3] + 
             g_hand[g_toMove == ? colorWhite : 1 : 4] +
             g_hand[g_toMove == ? colorWhite : 2 : 5] > 0 ||
             g_pieceCount[pieceBishop | g_toMove] != 0 ||
             g_pieceCount[pieceRook   | g_toMove] != 0 ||
             g_pieceCount[pieceQueen  | g_toMove] != 0)) {
                var r = 3 + (ply >= 5 ? 1 : ply / 4);
                if (g_baseEval - beta > 1500) r++;

	        g_toMove = colorWhite - g_toMove;
	        g_baseEval = -g_baseEval;
	        g_hashKeyLow ^= g_zobristBlackLow;
	        g_hashKeyHigh ^= g_zobristBlackHigh;
			
	        var value = -AllCutNode(ply - r, depth + 1, -(beta - 1), false);

	        g_hashKeyLow ^= g_zobristBlackLow;
	        g_hashKeyHigh ^= g_zobristBlackHigh;
	        g_toMove = colorWhite - g_toMove;
	        g_baseEval = -g_baseEval;

            if (value >= beta) return beta;
        }
    }

    var moveMade = false;
    var realEval = minEval - 1;
    var inCheck = g_inCheck;

    var movePicker = new MovePicker(hashMove, depth, g_killers[depth][0], g_killers[depth][1]);

    for (;;) {
        var currentMove = movePicker.nextMove();
        if (currentMove == 0) {
            break;
        }

        var plyToSearch = ply - 1;

        if (!MakeMove(currentMove)) {
            continue;
        }

        var value;
        var doFullSearch = true;

        if (g_inCheck) {
            // Check extensions
            plyToSearch++;
        } else {
            var reduced = plyToSearch - (movePicker.atMove > 14 ? 2 : 1);

            // Late move reductions
            if (movePicker.stage == 5 && movePicker.atMove > 5 && ply >= 3) {
                value = -AllCutNode(reduced, depth + 1, -(beta - 1), true);
                doFullSearch = (value >= beta);
            }
        }

        if (doFullSearch) {
            value = -AllCutNode(plyToSearch, depth + 1, -(beta  - 1), true);
        }

        moveMade = true;

        UnmakeMove(currentMove);

        if (!g_searchValid) {
            return beta - 1;
        }

        if (value > realEval) {
            if (value >= beta) {
				var histTo = (currentMove >> 8) & 0xFF;
				if (g_board[histTo] == 0) {
				    var histPiece = g_board[currentMove & 0xFF] & 0xF;
				    historyTable[histPiece][histTo] += ply * ply;
				    if (historyTable[histPiece][histTo] > 32767) {
				        historyTable[histPiece][histTo] >>= 1;
				    }

				    if (g_killers[depth][0] != currentMove) {
				        g_killers[depth][1] = g_killers[depth][0];
				        g_killers[depth][0] = currentMove;
				    }
				}

                StoreHash(value, hashflagBeta, ply, currentMove, depth);
                return value;
            }

            realEval = value;
            hashMove = currentMove;
        }
    }

    if (!moveMade) {
        // If we have no valid moves it's either stalemate or checkmate
        if (g_inCheck)
            // Checkmate.
            return minEval + depth;
        else 
            // Stalemate
            return 0;
    }

    StoreHash(realEval, hashflagAlpha, ply, hashMove, depth);
    return realEval;
}

function AlphaBeta(ply, depth, alpha, beta) {
    if (ply <= 0) {
        return QSearch(alpha, beta, 0);
    }

    g_nodeCount++;

    if (depth > 0 && IsRepDraw())
        return 0;

    // Mate distance pruning
    var oldAlpha = alpha;
    alpha = alpha < minEval + depth ? alpha : minEval + depth;
    beta = beta > maxEval - (depth + 1) ? beta : maxEval - (depth + 1);
    if (alpha >= beta)
       return alpha;

    var hashMove = null;
    var hashFlag = hashflagAlpha;
    var hashNode = g_hashTable[g_hashKeyLow & g_hashMask];
    if (hashNode != null && hashNode.lock == g_hashKeyHigh) {
        hashMove = hashNode.bestMove;
    }
    
    var inCheck = g_inCheck;

    var moveMade = false;
    var realEval = minEval;

    var movePicker = new MovePicker(hashMove, depth, g_killers[depth][0], g_killers[depth][1]);

    for (;;) {
        var currentMove = movePicker.nextMove();
        if (currentMove == 0) {
            break;
        }

        var plyToSearch = ply - 1;

        if (!MakeMove(currentMove)) {
            continue;
        }

        if (g_inCheck) {
            // Check extensions
            plyToSearch++;
        }

        var value;
        if (moveMade) {
            value = -AllCutNode(plyToSearch, depth + 1, -alpha, true);
            if (value > alpha) {
                value = -AlphaBeta(plyToSearch, depth + 1, -beta, -alpha);
            }
        } else {
            value = -AlphaBeta(plyToSearch, depth + 1, -beta, -alpha);
        }

        moveMade = true;

        UnmakeMove(currentMove);

        if (!g_searchValid) {
            return alpha;
        }

        if (value > realEval) {
            if (value >= beta) {
                var histTo = (currentMove >> 8) & 0xFF;
                if (g_board[histTo] == 0) {
                    var histPiece = g_board[currentMove & 0xFF] & 0xF;
                    historyTable[histPiece][histTo] += ply * ply;
                    if (historyTable[histPiece][histTo] > 32767) {
                        historyTable[histPiece][histTo] >>= 1;
                    }

                    if (g_killers[depth][0] != currentMove) {
                        g_killers[depth][1] = g_killers[depth][0];
                        g_killers[depth][0] = currentMove;
                    }
                }

                StoreHash(value, hashflagBeta, ply, currentMove, depth);
                return value;
            }

            if (value > oldAlpha) {
                hashFlag = hashflagExact;
                alpha = value;
            }

            realEval = value;
            hashMove = currentMove;
        }
    }

    if (!moveMade) {
        // If we have no valid moves it's either stalemate or checkmate
        if (inCheck) 
            // Checkmate.
            return minEval + depth;
        else 
            // Stalemate
            return 0;
    }

    StoreHash(realEval, hashFlag, ply, hashMove, depth);
    return realEval;
}

var g_vectorDelta = new Array(256);

var g_bishopDeltas = [-15, -17, 15, 17];
var g_rookDeltas = [-1, +1, -16, +16];
var g_kingDeltas = [-1, +1, -16, +16, -15, -17, 15, 17];

function MT() {
 	var N = 624;
	var M = 397;
	var MAG01 = [0x0, 0x9908b0df];
    
    this.mt = new Array(N);
    this.mti = N + 1;

    this.setSeed = function()
	{
		var a = arguments;
		switch (a.length) {
		case 1:
			if (a[0].constructor === Number) {
				this.mt[0]= a[0];
				for (var i = 1; i < N; ++i) {
					var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
					this.mt[i] = ((1812433253 * ((s & 0xffff0000) >>> 16))
							<< 16)
						+ 1812433253 * (s & 0x0000ffff)
						+ i;
				}
				this.mti = N;
				return;
			}

			this.setSeed(19650218);

			var l = a[0].length;
			var i = 1;
			var j = 0;

			for (var k = N > l ? N : l; k != 0; --k) {
				var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)
				this.mt[i] = (this.mt[i]
						^ (((1664525 * ((s & 0xffff0000) >>> 16)) << 16)
							+ 1664525 * (s & 0x0000ffff)))
					+ a[0][j]
					+ j;
				if (++i >= N) {
					this.mt[0] = this.mt[N - 1];
					i = 1;
				}
				if (++j >= l) {
					j = 0;
				}
			}

			for (var k = N - 1; k != 0; --k) {
				var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
				this.mt[i] = (this.mt[i]
						^ (((1566083941 * ((s & 0xffff0000) >>> 16)) << 16)
							+ 1566083941 * (s & 0x0000ffff)))
					- i;
				if (++i >= N) {
					this.mt[0] = this.mt[N-1];
					i = 1;
				}
			}

			this.mt[0] = 0x80000000;
			return;
		default:
			var seeds = new Array();
			for (var i = 0; i < a.length; ++i) {
				seeds.push(a[i]);
			}
			this.setSeed(seeds);
			return;
		}
	}

    this.setSeed(0x1BADF00D);

    this.next = function (bits)
	{
		if (this.mti >= N) {
			var x = 0;

			for (var k = 0; k < N - M; ++k) {
				x = (this.mt[k] & 0x80000000) | (this.mt[k + 1] & 0x7fffffff);
				this.mt[k] = this.mt[k + M] ^ (x >>> 1) ^ MAG01[x & 0x1];
			}
			for (var k = N - M; k < N - 1; ++k) {
				x = (this.mt[k] & 0x80000000) | (this.mt[k + 1] & 0x7fffffff);
				this.mt[k] = this.mt[k + (M - N)] ^ (x >>> 1) ^ MAG01[x & 0x1];
			}
			x = (this.mt[N - 1] & 0x80000000) | (this.mt[0] & 0x7fffffff);
			this.mt[N - 1] = this.mt[M - 1] ^ (x >>> 1) ^ MAG01[x & 0x1];

			this.mti = 0;
		}

		var y = this.mt[this.mti++];
		y ^= y >>> 11;
		y ^= (y << 7) & 0x9d2c5680;
		y ^= (y << 15) & 0xefc60000;
		y ^= y >>> 18;
		return (y >>> (32 - bits)) & 0xFFFFFFFF;
	}
}

// Position variables
var g_board = new Array(256); // Sentinel 0x80, pieces are in low 4 bits, 0x8 for color, 0x7 bits for piece type
var g_hand  = new Array(6);
var g_toMove; // side to move, 0 or 8, 0 = black, 8 = white

var g_baseEval;
var g_hashKeyLow, g_hashKeyHigh;
var g_inCheck;

// Utility variables
var g_moveCount = 0;
var g_moveUndoStack = new Array();

var g_move50 = 0;
var g_repMoveStack = new Array();

var g_hashSize = 1 << 22;
var g_hashMask = g_hashSize - 1;
var g_hashTable;

var g_killers;
var historyTable = new Array(32);

var g_zobristLow;
var g_zobristHigh;
var g_zobristHandLow;
var g_zobristHandHigh;
var g_zobristBlackLow;
var g_zobristBlackHigh;

// Evaulation variables
var g_mobUnit;

var hashflagAlpha = 1;
var hashflagBeta  = 2;
var hashflagExact = 3;

function HashEntry(lock, value, flags, hashDepth, bestMove, globalPly) {
    this.lock = lock;
    this.value = value;
    this.flags = flags;
    this.hashDepth = hashDepth;
    this.bestMove = bestMove;
}

function MakeSquare(row, column) {
    return ((row + 2) << 4) | (column + 4);
}

function MakeTable(table) {
    var result = new Array(256);
    for (var i = 0; i < 256; i++) {
        result[i] = 0;
    }
    for (var row = 0; row < g_height; row++) {
        for (var col = 0; col < g_width; col++) {
            result[MakeSquare(row, col)] = table[row * g_width + col];
        }
    }
    return result;
}

function ResetGame() {
    g_killers = new Array(128);
    for (var i = 0; i < 128; i++) {
        g_killers[i] = [0, 0];
    }

    g_hashTable = new Array(g_hashSize);

    for (var i = 0; i < 32; i++) {
        historyTable[i] = new Array(256);
        for (var j = 0; j < 256; j++)
            historyTable[i][j] = 0;
    }

    var mt = new MT(0x1badf00d);

    g_zobristLow = new Array(256);
    g_zobristHigh = new Array(256);
    for (var i = 0; i < 256; i++) {
        g_zobristLow[i] = new Array(16);
        g_zobristHigh[i] = new Array(16);
        for (var j = 0; j < 16; j++) {
            g_zobristLow[i][j] = mt.next(32);
            g_zobristHigh[i][j] = mt.next(32);
        }
    }
    g_zobristHandLow = new Array(6);
    g_zobristHandHigh = new Array(6);
    for (var i = 0; i < 6; i++) {
        g_zobristHandLow[i] = new Array(2);
        g_zobristHandHigh[i] = new Array(2);
        for (var j = 0; j < 2; j++) {
             g_zobristHandLow[i][j] = mt.next(32);
             g_zobristHandHigh[i][j] = mt.next(32);
        }
    }
    g_zobristBlackLow = mt.next(32);
    g_zobristBlackHigh = mt.next(32);

    for (var row = 0; row < g_height; row++) {
        for (var col = 0; col < g_width; col++) {
            var square = MakeSquare(row, col);
            flipTable[square] = MakeSquare(3 - row, col);
        }
    }

    pieceSquareAdj[piecePawn] = MakeTable(pawnAdj);
    pieceSquareAdj[pieceBishop] = MakeTable(bishopAdj);
    pieceSquareAdj[pieceRook] = MakeTable(rookAdj);
    pieceSquareAdj[pieceQueen] = MakeTable(queenAdj);
    pieceSquareAdj[pieceKing] = MakeTable(kingAdj);

    var pieceDeltas = [[], g_kingDeltas, [], g_bishopDeltas, g_rookDeltas, g_rookDeltas];

    for (var i = 0; i < 256; i++) {
        g_vectorDelta[i] = new Object();
        g_vectorDelta[i].delta = 0;
        g_vectorDelta[i].pieceMask = new Array(2);
        g_vectorDelta[i].pieceMask[0] = 0;
        g_vectorDelta[i].pieceMask[1] = 0;
    }
    
    // Initialize the vector delta table    
    for (var row = 0; row < 0x40; row += 0x10) 
        for (var col = 0; col < 0x3; col++) {
            var square = row | col;
            
            // Pawn moves
            var index = square - (square - 16) + 128;
            g_vectorDelta[index].pieceMask[colorWhite >> 3] |= (1 << piecePawn);
            index = square - (square + 16) + 128;
            g_vectorDelta[index].pieceMask[0] |= (1 << piecePawn);

            // Queen moves
            index = square - (square - 17) + 128;
            g_vectorDelta[index].pieceMask[colorWhite >> 3] |= (1 << pieceQueen);
            index = square - (square - 15) + 128;
            g_vectorDelta[index].pieceMask[colorWhite >> 3] |= (1 << pieceQueen);
            
            index = square - (square + 17) + 128;
            g_vectorDelta[index].pieceMask[0] |= (1 << pieceQueen);
            index = square - (square + 15) + 128;
            g_vectorDelta[index].pieceMask[0] |= (1 << pieceQueen);
            
            for (var i = pieceKing; i <= pieceQueen; i++) {
                for (var dir = 0; dir < pieceDeltas[i].length; dir++) {
                    var target = square + pieceDeltas[i][dir];
                    if (!(target & 0x88)) {
                        index = square - target + 128;
                        g_vectorDelta[index].pieceMask[colorWhite >> 3] |= (1 << i);
                        g_vectorDelta[index].pieceMask[0] |= (1 << i);
                        var flip = -1;
                        if (square < target) flip = 1;
                        if ((square & 0xF0) == (target & 0xF0)) {
                            // On the same row
                            g_vectorDelta[index].delta = flip * 1;
                        } else if ((square & 0x0F) == (target & 0x0F)) {
                            // On the same column
                            g_vectorDelta[index].delta = flip * 16;
                        } else if ((square % 15) == (target % 15)) {
                            g_vectorDelta[index].delta = flip * 15;
                        } else if ((square % 17) == (target % 17)) {
                            g_vectorDelta[index].delta = flip * 17;
                        }
                    }
                }
            }
        }

    InitializeEval();
    InitializeFromFen("rkb/1p1/1P1/BKR-000000 w");
}

function InitializeEval() {
    g_mobUnit = new Array(2);
    for (var i = 0; i < 2; i++) {
        g_mobUnit[i] = new Array();
        var enemy = i == 0 ? 0x10 : 8;
        var friend = i == 0 ? 8 : 0x10;
        g_mobUnit[i][0] = 1;
        g_mobUnit[i][0x80] = 0;
        g_mobUnit[i][enemy | piecePawn] = 1;
        g_mobUnit[i][enemy | pieceBishop] = 2;
        g_mobUnit[i][enemy | pieceRook] = 4;
        g_mobUnit[i][enemy | pieceQueen] = 6;
        g_mobUnit[i][enemy | pieceKing] = 6;
        g_mobUnit[i][friend | piecePawn] = 0;
        g_mobUnit[i][friend | pieceBishop] = 0;
        g_mobUnit[i][friend | pieceRook] = 0;
        g_mobUnit[i][friend | pieceQueen] = 0;
        g_mobUnit[i][friend | pieceKing] = 0;
    }
}

function SetHash() {
    var result = new Object();
    result.hashKeyLow = 0;
    result.hashKeyHigh = 0;
    for (var i = 0; i < 256; i++) {
        var piece = g_board[i];
        if (piece & 0x18) {
            result.hashKeyLow ^= g_zobristLow[i][piece & 0xF]
            result.hashKeyHigh ^= g_zobristHigh[i][piece & 0xF]
        }
    }
    for (var i = 0; i < 6; i++) {
        var j = g_hand[i];
        if (j > 2) j = 2;
        if (j > 0) {
            result.hashKeyLow ^= g_zobristHandLow[i][j - 1];
            result.hashKeyHigh ^= g_zobristHandHigh[i][j - 1];
        }
    }
    if (!g_toMove) {
        result.hashKeyLow ^= g_zobristBlackLow;
        result.hashKeyHigh ^= g_zobristBlackHigh;
    }
    return result;
}

function InitializeFromFen(fen) {
    var chunks = fen.split(' ');
    
    for (var i = 0; i < 256; i++) 
        g_board[i] = 0x80;
    
    var row = 0;
    var col = 0;

    var pie = chunks[0].split('-');
    var pieces = pie[0];
    for (var i = 0; i < pieces.length; i++) {
        var c = pieces.charAt(i);
        if (c == '/') {
            row++;
            col = 0;
        }
        else {
            if (c >= '0' && c <= '9') {
                for (var j = 0; j < parseInt(c); j++) {
                    g_board[MakeSquare(row, col)] = 0;
                    col++;
                }
            }
            else {
                var isBlack = c >= 'a' && c <= 'z';
                var piece = isBlack ? colorBlack : colorWhite;
                if (!isBlack) 
                    c = pieces.toLowerCase().charAt(i);
                switch (c) {
                    case 'p':
                        piece |= piecePawn;
                        break;
                    case 'b':
                        piece |= pieceBishop;
                        break;
                    case 'r':
                        piece |= pieceRook;
                        break;
                    case 'q':
                        piece |= pieceQueen;
                        break;
                    case 'k':
                        piece |= pieceKing;
                        break;
                }
                g_board[MakeSquare(row, col)] = piece;
                col++;
            }
        }
    }

    for (var i = 0; i < pie[1].length; i++) {
        g_hand[i] = pie[1][i];
    }
    
    InitializePieceList();
    
    g_toMove = chunks[1].charAt(0) == 'w' ? colorWhite : 0;
    var them = 8 - g_toMove;
    
    var hashResult = SetHash();
    g_hashKeyLow = hashResult.hashKeyLow;
    g_hashKeyHigh = hashResult.hashKeyHigh;

    g_baseEval = 0;
    for (var i = 0; i < 256; i++) {
        if (g_board[i] & colorWhite) {
            g_baseEval += pieceSquareAdj[g_board[i] & 0x7][i];
            g_baseEval += materialTable[g_board[i] & 0x7];
        } else if (g_board[i] & colorBlack) {
            g_baseEval -= pieceSquareAdj[g_board[i] & 0x7][flipTable[i]];
            g_baseEval -= materialTable[g_board[i] & 0x7];
        }
    }
    if (!g_toMove) g_baseEval = -g_baseEval;

    g_move50 = 0;
    var kingPos = g_pieceList[(g_toMove | pieceKing) << 4];
    g_inCheck = false;
    if (kingPos != 0) {
        g_inCheck = IsSquareAttackable(kingPos, them);
    }

    // Check for king capture (invalid FEN)
    kingPos = g_pieceList[(them | pieceKing) << 4]
    if ((kingPos != 0) && IsSquareAttackable(kingPos, g_toMove)) {
        return 'Invalid FEN: Can capture king';
    }

    // Checkmate/stalemate
    if (GenerateValidMoves().length == 0) {
        return g_inCheck ? 'Checkmate' : 'Stalemate';
    } 

    return '';
}

var g_pieceIndex = new Array(256);
var g_pieceList = new Array(2 * 8 * 64);
var g_pieceCount = new Array(2 * 8);

function InitializePieceList() {
    for (var i = 0; i < 16; i++) {
        g_pieceCount[i] = 0;
        for (var j = 0; j < 64; j++) {
            // 0 is used as the terminator for piece lists
            g_pieceList[(i << 4) | j] = 0;
        }
    }
    for (var i = 0; i < 256; i++) {
        g_pieceIndex[i] = 0;
        if (g_board[i] & (colorWhite | colorBlack)) {
            var piece = g_board[i] & 0xF;
            g_pieceList[(piece << 4) | g_pieceCount[piece]] = i;
            g_pieceIndex[i] = g_pieceCount[piece];
            g_pieceCount[piece]++;
        }
    }
}

function UndoHistory(inCheck, baseEval, hashKeyLow, hashKeyHigh, move50, captured) {
    this.inCheck = inCheck;
    this.baseEval = baseEval;
    this.hashKeyLow = hashKeyLow;
    this.hashKeyHigh = hashKeyHigh;
    this.move50 = move50;
    this.captured = captured;
}

function MakeMove(move){
    var me = g_toMove >> 3;
    var otherColor = 8 - g_toMove; 

    var flags = move & 0xFF0000;
    var to = (move >> 8) & 0xFF;
    var from = move & 0xFF;
    var captured = g_board[to];
    var piece = g_board[from];

    g_moveUndoStack[g_moveCount] = new UndoHistory(g_inCheck, g_baseEval, g_hashKeyLow, g_hashKeyHigh, g_move50, captured);
    g_moveCount++;

    if (flags & moveflagDrop) {
        var pieceType = piecePawn;
        var ix = 0;
        if (flags & moveflagDropBishop) {
            pieceType = pieceBishop;
            ix = 1;
        }
        if (flags & moveflagDropRook) {
            pieceType = pieceRook;
            ix = 2;
        }
        if (g_toMove != colorWhite) ix += 3;
        g_hashKeyLow ^= g_zobristHandLow[pieceType][g_hand[ix] - 1];
        g_hashKeyHigh ^= g_zobristHandHigh[pieceType][g_hand[ix] - 1];
        g_hand[ix]--;
        if (g_hand[ix] > 0) {
            g_hashKeyLow ^= g_zobristHandLow[pieceType][0];
            g_hashKeyHigh ^= g_zobristHandHigh[pieceType][0];
        }
        g_board[to] = pieceType;
        g_hashKeyLow ^= g_zobristLow[to][pieceType & 0xF];
        g_hashKeyHigh ^= g_zobristHigh[to][pieceType & 0xF];

        g_pieceIndex[to] = g_pieceCount[pieceType];
        g_pieceList[(pieceType << 4) | g_pieceCount[pieceType]] = to;
        g_pieceCount[pieceType]++;
        return true;
    }

    if (captured) {
        // Remove our piece from the piece list
        var captureType = captured & 0xF;
        g_pieceCount[captureType]--;
        var lastPieceSquare = g_pieceList[(captureType << 4) | g_pieceCount[captureType]];
        g_pieceIndex[lastPieceSquare] = g_pieceIndex[to];
        g_pieceList[(captureType << 4) | g_pieceIndex[lastPieceSquare]] = lastPieceSquare;
        g_pieceList[(captureType << 4) | g_pieceCount[captureType]] = 0;

        g_baseEval += materialTable[captured & 0x7];
        g_baseEval += pieceSquareAdj[captured & 0x7][me ? flipTable[to] : to];

        g_hashKeyLow ^= g_zobristLow[to][captureType];
        g_hashKeyHigh ^= g_zobristHigh[to][captureType];
        g_move50 = 0;

        if (captureType > pieceKing) {
            if (captureType == pieceQueen) captureType = piecePawn;
            captureType -= piecePawn;
            if (g_toMove != colorWhite) captureType += 3;
            var j = g_hand[captureType];
            if (j < 2) {
                if (j) {
                    g_hashKeyLow ^= g_zobristHandLow[captureType][j - 1];
                    g_hashKeyHigh ^= g_zobristHandHigh[captureType][j - 1];
                }
                g_hand[captureType]++;
                g_hashKeyLow ^= g_zobristHandLow[captureType][j];
                g_hashKeyHigh ^= g_zobristHandHigh[captureType][j];
            }
        }
    }

    g_hashKeyLow ^= g_zobristLow[from][piece & 0xF];
    g_hashKeyHigh ^= g_zobristHigh[from][piece & 0xF];
    g_hashKeyLow ^= g_zobristLow[to][piece & 0xF];
    g_hashKeyHigh ^= g_zobristHigh[to][piece & 0xF];
    g_hashKeyLow ^= g_zobristBlackLow;
    g_hashKeyHigh ^= g_zobristBlackHigh;

    g_baseEval -= pieceSquareAdj[piece & 0x7][me == 0 ? flipTable[from] : from];

    // Move our piece in the piece list
    g_pieceIndex[to] = g_pieceIndex[from];
    g_pieceList[((piece & 0xF) << 4) | g_pieceIndex[to]] = to;

    if (flags & moveflagPromotion) {
        var newPiece = piece & (~0x7);
        newPiece |= pieceQueen;

        g_hashKeyLow ^= g_zobristLow[to][piece & 0xF];
        g_hashKeyHigh ^= g_zobristHigh[to][piece & 0xF];
        g_board[to] = newPiece;
        g_hashKeyLow ^= g_zobristLow[to][newPiece & 0xF];
        g_hashKeyHigh ^= g_zobristHigh[to][newPiece & 0xF];

        g_baseEval += pieceSquareAdj[newPiece & 0x7][me == 0 ? flipTable[to] : to];
        g_baseEval -= materialTable[piecePawn];
        g_baseEval += materialTable[newPiece & 0x7];

        var pawnType = piece & 0xF;
        var promoteType = newPiece & 0xF;

        g_pieceCount[pawnType]--;

        var lastPawnSquare = g_pieceList[(pawnType << 4) | g_pieceCount[pawnType]];
        g_pieceIndex[lastPawnSquare] = g_pieceIndex[to];
        g_pieceList[(pawnType << 4) | g_pieceIndex[lastPawnSquare]] = lastPawnSquare;
        g_pieceList[(pawnType << 4) | g_pieceCount[pawnType]] = 0;
        g_pieceIndex[to] = g_pieceCount[promoteType];
        g_pieceList[(promoteType << 4) | g_pieceIndex[to]] = to;
        g_pieceCount[promoteType]++;
    } else {
        g_board[to] = g_board[from];
        g_baseEval += pieceSquareAdj[piece & 0x7][me == 0 ? flipTable[to] : to];
    }

    g_board[from] = pieceEmpty;
    g_toMove = otherColor;
    g_baseEval = -g_baseEval;

    if ((piece & 0x7) == pieceKing || g_inCheck) {
        var kingPos =g_pieceList[(pieceKing | (8 - g_toMove)) << 4];
        if ((kingPos != 0) && IsSquareAttackable(kingPos, otherColor)) {
            UnmakeMove(move);
            return false;
        }
    } else {
        var kingPos = g_pieceList[(pieceKing | (8 - g_toMove)) << 4];
        if (kingPos != 0) {
            if (ExposesCheck(from, kingPos)) {
                UnmakeMove(move);
                return false;
            }
        }
    }
    
    g_inCheck = false;
    var kingPos = g_pieceList[(pieceKing | g_toMove) << 4];
    if (kingPos != 0) {
        g_inCheck = IsSquareAttackable(kingPos, 8 - g_toMove);
    }

    g_repMoveStack[g_moveCount - 1] = g_hashKeyLow;
    g_move50++;

    return true;
}

function UnmakeMove(move){
    g_toMove = 8 - g_toMove;
    g_baseEval = -g_baseEval;
    
    g_moveCount--;
    g_inCheck = g_moveUndoStack[g_moveCount].inCheck;
    g_baseEval = g_moveUndoStack[g_moveCount].baseEval;
    g_hashKeyLow = g_moveUndoStack[g_moveCount].hashKeyLow;
    g_hashKeyHigh = g_moveUndoStack[g_moveCount].hashKeyHigh;
    g_move50 = g_moveUndoStack[g_moveCount].move50;

    var otherColor = 8 - g_toMove;
    var me = g_toMove >> 3;
    var them = otherColor >> 3;

    var flags = move & 0xFF0000;
    var captured = g_moveUndoStack[g_moveCount].captured;
    var to = (move >> 8) & 0xFF;
    var from = move & 0xFF;
    var piece = g_board[to];

    if (flags & moveflagDrop) {
        var ix = 0;
        if (flags & moveflagDropBishop) ix = 1;
        if (flags & moveflagDropRook) ix = 2;
        if (g_toMove != colorWhite) ix += 3;
        g_hand[ix]++;
        var pieceType = g_board[to] & 0xF;
        g_pieceCount[pieceType]--;
        var lastPieceSquare = g_pieceList[(pieceType << 4) | g_pieceCount[pieceType]];
        g_pieceIndex[lastPieceSquare] = g_pieceIndex[to];
        g_pieceList[(pieceType << 4) | g_pieceIndex[lastPieceSquare]] = lastPieceSquare;
        g_pieceList[(pieceType << 4) | g_pieceCount[pieceType]] = 0;
        g_board[to] = pieceEmpty;
        return;
    }

    if (flags & moveflagPromotion) {
        piece = (g_board[to] & (~0x7)) | piecePawn;
        g_board[from] = piece;
        var pawnType = g_board[from] & 0xF;
        var promoteType = g_board[to] & 0xF;
        g_pieceCount[promoteType]--;
        var lastPromoteSquare = g_pieceList[(promoteType << 4) | g_pieceCount[promoteType]];
        g_pieceIndex[lastPromoteSquare] = g_pieceIndex[to];
        g_pieceList[(promoteType << 4) | g_pieceIndex[lastPromoteSquare]] = lastPromoteSquare;
        g_pieceList[(promoteType << 4) | g_pieceCount[promoteType]] = 0;
        g_pieceIndex[to] = g_pieceCount[pawnType];
        g_pieceList[(pawnType << 4) | g_pieceIndex[to]] = to;
        g_pieceCount[pawnType]++;
    } else {
        g_board[from] = g_board[to];
    }
    g_board[to] = captured;

    // Move our piece in the piece list
    g_pieceIndex[from] = g_pieceIndex[to];
    g_pieceList[((piece & 0xF) << 4) | g_pieceIndex[from]] = from;

    if (captured) {
        // Restore our piece to the piece list
        var captureType = captured & 0xF;
        g_pieceIndex[to] = g_pieceCount[captureType];
        g_pieceList[(captureType << 4) | g_pieceCount[captureType]] = to;
        g_pieceCount[captureType]++;
        if (captureType > pieceKing) {
            if (captureType == pieceQueen) captureType = piecePawn;
            captureType -= piecePawn;
            if (g_toMove != colorWhite) captureType += 3;
            g_hand[captureType]--;
        }
    }
}

function ExposesCheck(from, kingPos){
    var index = kingPos - from + 128;
    // If a queen can't reach it, nobody can!
    if ((g_vectorDelta[index].pieceMask[0] & (1 << (pieceKing))) != 0) {
        var delta = g_vectorDelta[index].delta;
        var pos = kingPos + delta;
//      while (g_board[pos] == 0) pos += delta;
        var piece = g_board[pos];
        if (((piece & (g_board[kingPos] ^ 0x18)) & 0x18) == 0) return false;
        // Now see if the piece can actually attack the king
        var backwardIndex = pos - kingPos + 128;
        return (g_vectorDelta[backwardIndex].pieceMask[(piece >> 3) & 1] & (1 << (piece & 0x7))) != 0;
    }
    return false;
}

function IsSquareAttackableFrom(target, from){
    var index = from - target + 128;
    var piece = g_board[from];
    if (g_vectorDelta[index].pieceMask[(piece >> 3) & 1] & (1 << (piece & 0x7))) {
        // Yes, this square is pseudo-attackable.  Now, check for real attack
        var inc = g_vectorDelta[index].delta;
//      do {
            from += inc;
            if (from == target)	return true;
//	} while (g_board[from] == 0);
    }
    return false;
}

function IsSquareAttackable(target, color) {
    // Attackable by pieces?
    for (var i = pieceKing; i <= pieceQueen; i++) {
        var index = (color | i) << 4;
        var square = g_pieceList[index];
        while (square != 0) {
            if (IsSquareAttackableFrom(target, square)) return true;
            square = g_pieceList[++index];
        }
    }
    return false;
}

function GenerateMove(from, to) {
    return from | (to << 8);
}

function GenerateMove(from, to, flags){
    return from | (to << 8) | flags;
}

function GenerateValidMoves() {
    var moveList = new Array();
    var allMoves = new Array();
    GenerateCaptureMoves(allMoves, null);
    GenerateAllMoves(allMoves);
    for (var i = allMoves.length - 1; i >= 0; i--) {
        if (MakeMove(allMoves[i])) {
            moveList[moveList.length] = allMoves[i];
            UnmakeMove(allMoves[i]);
        }
    }
    return moveList;
}

function GenerateAllMoves(moveStack) {
    var from, to, pieceIdx;
    var inc = (g_toMove == colorWhite) ? -16 : 16;

    // King quiet moves
    pieceIdx = (g_toMove | pieceKing) << 4;
    from = g_pieceList[pieceIdx];
    while (from != 0) {
        to = from - 15; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from - 17; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 15; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 17; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from - 1;  if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 1;  if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from - 16; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 16; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        from = g_pieceList[pieceIdx++];
    }

    // Pawn quiet moves
    pieceIdx = (g_toMove | piecePawn) << 4;
    from = g_pieceList[pieceIdx];
    while (from != 0) {
        to = from + inc; 
        if (g_board[to] == 0) {
             var flags = 0;
             var row = square & 0xF0;
             if (g_toMove == colorWhite) {
                 if (row == 0x20) flags = moveflagPromotion;
             } else {
                 if (row == 0x50) flags = moveflagPromotion;
             }
             moveStack[moveStack.length] = GenerateMove(from, to, flags);
        }
        from = g_pieceList[pieceIdx++];
    }

    // Bishop quiet moves
    pieceIdx = (g_toMove | pieceBishop) << 4;
    from = g_pieceList[pieceIdx++];
    while (from != 0) {
        to = from - 15; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from - 17; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 15; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 17; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        from = g_pieceList[pieceIdx++];
    }

    // Rook quiet moves
    pieceIdx = (g_toMove | pieceRook) << 4;
    from = g_pieceList[pieceIdx++];
    while (from != 0) {
        to = from - 1;  if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 1;  if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from - 16; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 16; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        from = g_pieceList[pieceIdx++];
    }

    // Queen quiet moves
    pieceIdx = (g_toMove | pieceQueen) << 4;
    from = g_pieceList[pieceIdx++];
    while (from != 0) {
        to = from - 1;  if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 1;  if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from - 16; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 16; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        inc = (g_toMove == colorWhite) ? -17 : 17;
        to = from + inc; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        inc = (g_toMove == colorWhite) ? -15 : 15;
        to = from + inc; if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(from, to);
        from = g_pieceList[pieceIdx++];
    }

    // drop moves
    var ix = 0;
    if (color != colorWhite) ix += 3;
    if (g_hand[ix]) {
        for (var row = 1; row < g_height; row++) {
            for (var col = 0; col < g_width; col++) {
                 var to = MakeSquare(row, col);
                 if (color != colorWhite) {
                     to = flipTable[to];
                 }
                 if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(0, to, moveflagDrop);
            }
        }
    }
    ix++;
    var flags = moveflagDropBishop;
    for (var i = 0; i < 2; i++, ix++, flags <<= 1) {
         if (g_hand[ix]) {
             for (var row = 0; row < g_height; row++) {
                 for (var col = 0; col < g_width; col++) {
                      var to = MakeSquare(row, col);
                      if (g_board[to] == 0) moveStack[moveStack.length] = GenerateMove(0, to, moveflagDrop | flags);
                 }
             }
         }
    }
}

function GenerateCaptureMoves(moveStack, moveScores) {
    var from, to, pieceIdx;
    var enemy = g_toMove == 8 ? 0x10 : 0x8;
    var inc = (g_toMove == 8) ? -16 : 16;

    // King quiet moves
    pieceIdx = (g_toMove | pieceKing) << 4;
    from = g_pieceList[pieceIdx];
    while (from != 0) {
        to = from - 15; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from - 17; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 15; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 17; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from - 1;  if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 1;  if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from - 16; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 16; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        from = g_pieceList[pieceIdx++];
    }

    // Pawn quiet moves
    pieceIdx = (g_toMove | piecePawn) << 4;
    from = g_pieceList[pieceIdx];
    while (from != 0) {
        to = from + inc; 
        if (g_board[to] & enemy) {
             var flags = 0;
             var row = square & 0xF0;
             if (g_toMove == colorWhite) {
                 if (row == 0x20) flags = moveflagPromotion;
             } else {
                 if (row == 0x50) flags = moveflagPromotion;
             }
             moveStack[moveStack.length] = GenerateMove(from, to, flags);
        }
        from = g_pieceList[pieceIdx++];
    }

    // Bishop quiet moves
    pieceIdx = (g_toMove | pieceBishop) << 4;
    from = g_pieceList[pieceIdx++];
    while (from != 0) {
        to = from - 15; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from - 17; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 15; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 17; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        from = g_pieceList[pieceIdx++];
    }

    // Rook quiet moves
    pieceIdx = (g_toMove | pieceRook) << 4;
    from = g_pieceList[pieceIdx++];
    while (from != 0) {
        to = from - 1;  if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 1;  if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from - 16; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 16; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        from = g_pieceList[pieceIdx++];
    }

    // Queen quiet moves
    pieceIdx = (g_toMove | pieceQueen) << 4;
    from = g_pieceList[pieceIdx++];
    while (from != 0) {
        to = from - 1;  if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 1;  if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from - 16; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        to = from + 16; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        inc = (g_toMove == colorWhite) ? -17 : 17;
        to = from + inc; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        inc = (g_toMove == colorWhite) ? -15 : 15;
        to = from + inc; if (g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
        from = g_pieceList[pieceIdx++];
    }
}

var g_seeValues = [0, 900, 1, 3, 4, 5, 0, 0,
                   0, 900, 1, 3, 4, 5, 0, 0];

function See(move) {
    var from = move & 0xFF;
    var to = (move >> 8) & 0xFF;

    var fromPiece = g_board[from];

    var fromValue = g_seeValues[fromPiece & 0xF];
    var toValue = g_seeValues[g_board[to] & 0xF];

    if (fromValue <= toValue) {
        return true;
    }

    if (move >> 16) {
        // Drops, promotion, ep are always good
        return true;
    }

    // Pawn attacks 
    // If any opponent pawns can capture back, this capture is probably not worthwhile (as we must be using knight or above).
    var inc = (fromPiece & colorWhite) ? -16 : 16; // Note: this is capture direction from to, so reversed from normal move direction
    if ((g_board[to + inc] & 0xF) == (piecePawn | them)) {
        return false;
    }

    var themAttacks = new Array();

    // If any opponent knights can capture back, and the deficit we have to make up is greater than the knights value, 
    // it's not worth it.  We can capture on this square again, and the opponent doesn't have to capture back. 
    var captureDeficit = fromValue - toValue;
    SeeAddSliderAttacks(to, them, themAttacks, pieceBishop);
    if (themAttacks.length != 0 && captureDeficit > g_seeValues[pieceBishop]) {
        return false;
    }

    g_board[from] = 0;
    for (var pieceType = pieceRook; pieceType <= pieceQueen; pieceType++) {
        if (SeeAddSliderAttacks(to, them, themAttacks, pieceType)) {
            if (captureDeficit > g_seeValues[pieceType]) {
                g_board[from] = fromPiece;
                return false;
            }
        }
    }

    // Pawn defenses 
    // At this point, we are sure we are making a "losing" capture.  The opponent can not capture back with a 
    // pawn.  They cannot capture back with a minor/major and stand pat either.  So, if we can capture with 
    // a pawn, it's got to be a winning or equal capture. 
    if ((g_board[to - inc] & 0xF) == (piecePawn | us)) {
        g_board[from] = fromPiece;
        return true;
    }

    // King attacks
    SeeAddSliderAttacks(to, them, themAttacks, pieceKing);

    // Our attacks
    var usAttacks = new Array();
    for (var pieceType = pieceBishop; pieceType <= pieceQueen; pieceType++) {
        SeeAddSliderAttacks(to, us, usAttacks, pieceType);
    }
    SeeAddSliderAttacks(to, us, usAttacks, pieceKing);

    g_board[from] = fromPiece;

    // We are currently winning the amount of material of the captured piece, time to see if the opponent 
    // can get it back somehow.  We assume the opponent can capture our current piece in this score, which 
    // simplifies the later code considerably. 
    var seeValue = toValue - fromValue;

    for (;;) {
        var capturingPieceValue = 1000;
        var capturingPieceIndex = -1;

        // Find the least valuable piece of the opponent that can attack the square
        for (var i = 0; i < themAttacks.length; i++) {
            if (themAttacks[i] != 0) {
                var pieceValue = g_seeValues[g_board[themAttacks[i]] & 0x7];
                if (pieceValue < capturingPieceValue) {
                    capturingPieceValue = pieceValue;
                    capturingPieceIndex = i;
                }
            }
        }

        if (capturingPieceIndex == -1) {
            // Opponent can't capture back, we win
            return true;
        }

        // Now, if seeValue < 0, the opponent is winning.  If even after we take their piece, 
        // we can't bring it back to 0, then we have lost this battle. 
        seeValue += capturingPieceValue;
        if (seeValue < 0) {
            return false;
        }

        var capturingPieceSquare = themAttacks[capturingPieceIndex];
        themAttacks[capturingPieceIndex] = 0;

        // Add any x-ray attackers
//      SeeAddXrayAttack(to, capturingPieceSquare, us, usAttacks, themAttacks);

        // Our turn to capture
        capturingPieceValue = 1000;
        capturingPieceIndex = -1;

        // Find our least valuable piece that can attack the square
        for (var i = 0; i < usAttacks.length; i++) {
            if (usAttacks[i] != 0) {
                var pieceValue = g_seeValues[g_board[usAttacks[i]] & 0x7];
                if (pieceValue < capturingPieceValue) {
                    capturingPieceValue = pieceValue;
                    capturingPieceIndex = i;
                }
            }
        }

        if (capturingPieceIndex == -1) {
            // We can't capture back, we lose :( 
            return false;
        }

        // Assume our opponent can capture us back, and if we are still winning, we can stand-pat 
        // here, and assume we've won. 
        seeValue -= capturingPieceValue;
        if (seeValue >= 0) {
            return true;
        }

        capturingPieceSquare = usAttacks[capturingPieceIndex];
        usAttacks[capturingPieceIndex] = 0;

        // Add any x-ray attackers
//      SeeAddXrayAttack(to, capturingPieceSquare, us, usAttacks, themAttacks);
    }
}

function SeeAddSliderAttacks(target, us, attacks, pieceType) {
    var pieceIdx = (us | pieceType) << 4;
    var attackerSq = g_pieceList[pieceIdx++];
    var hit = false;
    while (attackerSq != 0) {
        if (IsSquareAttackableFrom(target, attackerSq)) {
            attacks[attacks.length] = attackerSq;
            hit = true;
        }
        attackerSq = g_pieceList[pieceIdx++];
    }
    return hit;
}

function BuildPVMessage(bestMove, value, timeTaken, ply) {
    var totalNodes = g_nodeCount + g_qNodeCount;
    return "Ply:" + ply + " Score:" + value + " Nodes:" + totalNodes + " NPS:" + ((totalNodes / (timeTaken / 1000)) | 0) + " " + PVFromHash(bestMove, 15);
}

function SetTimeout(timeout) {
    g_timeout = timeout;
}

//////////////////////////////////////////////////
// Test Harness
//////////////////////////////////////////////////
function FinishPlyCallback(bestMove, value, timeTaken, ply) {
    postMessage("pv " + BuildPVMessage(bestMove, value, timeTaken, ply));
}

function FinishMoveLocalTesting(bestMove, value, timeTaken, ply) {
    if (bestMove != null) {
        MakeMove(bestMove);
        postMessage(FormatMove(bestMove));
    }
}

var needsReset = true;
self.onmessage = function (e) {
    if (e.data == "go" || needsReset) {
        ResetGame();
        needsReset = false;
        if (e.data == "go") return;
    }
    if (e.data.match("^position") == "position") {
        ResetGame();
        var result = InitializeFromFen(e.data.substr(9, e.data.length - 9));
        if (result.length != 0) {
            postMessage("message " + result);
        }
    } else if (e.data.match("^search") == "search") {
        g_timeout = parseInt(e.data.substr(7, e.data.length - 7), 10);
        Search(FinishMoveLocalTesting, 99, FinishPlyCallback);
    } else if (e.data == "analyze") {
        g_timeout = 99999999999;
        Search(null, 99, FinishPlyCallback);
    } else {
        MakeMove(GetMoveFromString(e.data));
    }
}

Dagaz.AI.FormatMove        = FormatMove;
Dagaz.AI.ResetGame         = ResetGame;
Dagaz.AI.InitializeFromFen = InitializeFromFen;
Dagaz.AI.Search            = Search;
Dagaz.AI.SetTimeout        = SetTimeout;

})();
