(function() {

var symmetric = false;

Dagaz.Model.invisible = [];

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "dark-chess-view") {
      if (symmetric == "true") symmetric = true;
  } else {
      checkVersion(design, name, value);
  }
}

Dagaz.Model.Done = function(design, board) {
  Dagaz.Model.invisible = [];
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if (piece.type == 1) Dagaz.Model.invisible.push(pos);
      }
  });
  console.log(Dagaz.Model.invisible);
}

Dagaz.View.showPiece = function(view, ctx, frame, pos, piece, model, x, y) {
  var isSaved = false;
  if (_.indexOf(Dagaz.Model.invisible, pos) >= 0) {
      ctx.save();
      ctx.globalAlpha = 0.25;
      isSaved = true;
  }
  ctx.drawImage(piece.h, x, y, piece.dx, piece.dy);
  if (isSaved) {
      ctx.restore();
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;

  CheckInvariants(board);
}

})();
