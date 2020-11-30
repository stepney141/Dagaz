(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "filler-editor-extension") {
     checkVersion(design, name, value);
  }
}

var go = Dagaz.Controller.go;

Dagaz.Controller.go = function(url) {
  var design = Dagaz.Model.design;
  var board = Dagaz.Controller.app.board;
  var pieces = [];
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (_.isUndefined(pieces[piece.type])) {
          pieces[piece.type] = [];
      }
      pieces[piece.type].push(pos);
  });
  _.each(_.keys(pieces), function(ix) {
     var s = '';
     _.each(pieces[ix], function(pos) {
         if (s) {
             s = s + ",";
         }
         s = s + pos;
     });
     if (s) {
         console.log(ix + ": " + s);
     }
  });
}

})();
