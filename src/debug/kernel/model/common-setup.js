(function() {

var getSetup = function() {
  var str = window.location.search.toString();
  var re  = /^\?setup=(.*)$/;
  return str.replace(re, "$1");
}

var getNum = function(c) {
  if ((c >= "0".charCodeAt(0)) && (c <= "9".charCodeAt(0))) {
      return c - "0".charCodeAt(0);
  }
  if ((c >= "A".charCodeAt(0)) && (c <= "Z".charCodeAt(0))) {
      return c - "A".charCodeAt(0) + 10;
  }
  return null;
}

Dagaz.Model.setup = function(board) {
  var design = Dagaz.Model.design;
  var setup  = getSetup();
  var player = 1;
  if (setup) {
      setup = setup + ";";
      board.clear();
      var type = null;
      var pos  = null;
      for (var i = 0; i < setup.length; i++) {
           var c = setup.charCodeAt(i);
           if (c == "-".charCodeAt(0)) {
               player++;
               continue;
           }
           if (c == ";".charCodeAt(0)) {
               if ((type === null) || (pos === null)) break;
               var piece = Dagaz.Model.createPiece(type, player);
               board.setPiece(pos, piece);
               type = null;
               pos  = null;
           }
           var n = getNum(c);
           if (type === null) {
               type = n;
               continue;
           }
           if (pos === null) {
               pos = n;
           } else {
               pos *= 36;
               pos += n;
           }
      }
  }
}

})();
