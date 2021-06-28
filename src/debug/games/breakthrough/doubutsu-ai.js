"use strict";

(function() {

var g_timeout = 3000;
var g_width   = 3;
var g_height  = 4;

var g_hand    = [ 0, 0, 0, 0, 0, 0 ];

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
                var pieceChar = [" ", "p", "r", "b", "q", "k", " ", " "][(piece & 0x7)];
                result += ((piece & colorWhite) != 0) ? pieceChar.toUpperCase() : pieceChar;
            }
        }
        if (empty != 0) {
            result += empty;
        }
    }
    result += "-";
    for (var i = 0; i < 3 * 2; i++) {
        result += g_hand[ i ];
    }
    result += g_toMove == colorWhite ? " w" : " b";
    return result;
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
