(function() {

var checkVersion  = Dagaz.Model.checkVersion;
var checkOption   = Dagaz.Model.checkOption;
var getPiece      = Dagaz.Model.getPiece;
var isLastFrom    = Dagaz.Model.isLastFrom;
var isLastTo      = Dagaz.Model.isLastTo;
var getMark       = Dagaz.Model.getMark;
var setMark       = Dagaz.Model.setMark;
var getPartList   = Dagaz.Model.getPartList;

var modes = [];
var simpleMode    = false;
var compositeMode = false;
var markMode      = false;
var forkMode      = false;
var lastMode      = false;
var partialMode   = false;

Dagaz.Model.checkVersion = function(aDesign, aName, aValue) {
  if (aName == "zrf-advanced") {
     var mode = null;
     if ((aValue === "simple")    || (aValue === "true")) {
         mode = aValue;
         simpleMode = true;
     }
     if ((aValue === "composite") || (aValue === "true")) {
         mode = aValue;
         compositeMode = true;
     }
     if ((aValue === "mark")      || (aValue === "true")) {
         mode = aValue;
         markMode = true;
     }
     if ((aValue === "fork")      || (aValue === "true")) {
         mode = aValue;
         Dagaz.Model.forkMode = true;
     }
     if ((aValue === "last")      || (aValue === "true")) {
         mode = aValue;
         lastMode = true;
     }
     if ((aValue === "deferred")   || (aValue === "true")) {
         mode = aValue;
         Dagaz.Model.deferredStrike = true;
     }
     if ((aValue === "shared")    || (aValue === "true")) {
         mode = aValue;
         Dagaz.Model.sharedPieces = true;
     }
     if ((aValue === "partial")   || (aValue === "true")) {
         mode = aValue;
         partialMode = true;
     }
     if (mode !== null) {
         modes.push(mode);
     } else {
         aDesign.failed = true;
     }
  } else {
     checkVersion(aDesign, aName, aValue);
  }
}

Dagaz.Model.checkOption = function(aDesign, aName, aValue) {
  if (aName == "zrf-advanced") {
     return (Dagaz.find(modes, aValue) >= 0) || 
            (Dagaz.find(modes, "true") >= 0);
  } else {
     return checkOption(aDesign, aName, aValue);
  }
}

Dagaz.Model.getAttrInternal = function (aGen, aName, aPos) {
  var r = null;
  if (simpleMode) {
      var piece = aGen.getPieceInternal(aPos);
      if (piece === null) {
          piece = aGen.piece;
      }
      if (piece !== null) {
          var r = piece.getValue(aName);
          if (r === null) {
              var design = aGen.board.game.getDesign();
              r = design.getAttribute(piece.type, aName);
          }
      }
      if (r === null) {
          if (!_.isUndefined(aGen.attrs[aPos])) {
              if (!_.isUndefined(aGen.attrs[aPos][aName])) {
                  r = aGen.attrs[aPos][aName];
              }
          }
      }
      if (r === null) {
          if (aGen.parent !== null) {
              r = Dagaz.Model.getAttrInternal(aGen.parent, aName, aPos);
          }
      }
  }
  return r;
}

Dagaz.Model.getValueInternal = function (aGen, aName, aPos) {
  if (compositeMode) {
      if (aGen.parent !== null) {
          return aGen.parent.getValue(aName, aPos);
      }
  }
  return null;
}

Dagaz.Model.getPiece = function(aGen, aPos) {
  if (simpleMode) {
      return aGen.getPieceInternal(aPos);
  } else {
      return getPiece(aGen, aPos);
  }
}

Dagaz.Model.isLastFrom = function(aPos, aBoard) {
  if (lastMode) {
      return false;
  } else {
      return isLastFrom(aPos, aBoard);
  }
}

Dagaz.Model.isLastTo = function(aPos, aBoard) {
  if (lastMode) {
      return false;
  } else {
      return isLastTo(aPos, aBoard);
  }
}

Dagaz.Model.getMark = function(aGen) {
  if (markMode) {
      if (aGen.marks.length === 0) {
          return null;
      }
      return aGen.marks.pop();
  } else {
      return getMark(aGen);
  }
}

Dagaz.Model.setMark = function(aGen) {
  if (markMode) {
      aGen.marks.push(aGen.pos);
  } else {
      setMark(aGen);
  }
}

Dagaz.Model.getPartList = function(board, gen) {
  if (partialMode === true) {
      var r = [];
      var design = Dagaz.Model.getDesign();
      for (var pos = 0; pos < design.positions.length; pos++) {
           if (gen.getPieceInternal(pos) !== null) {
               r.push(pos);
           }
      }
      return r;
  } else {
      return getPartList(board, gen);
  }
}

})();
