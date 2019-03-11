(function() {

var getPos = function() {
  var url = window.location.search.toString();
  var result = url.match(/[?&]pos=([^&]*)/);
  if (result) {
      return result[1];
  } else {
      return null;
  }
}

var getZone = function() {
  var url = window.location.search.toString();
  var result = url.match(/[?&]zone=([^&]*)/);
  if (result) {
      return +result[1];
  } else {
      return null;
  }
}

var showBoard = Dagaz.View.showBoard;

Dagaz.View.showBoard = function(board, ctx) {
  var design = Dagaz.Controller.app.design;
  var view = Dagaz.Controller.app.view;
  var pos = getPos(); var zone = getZone();
  if (pos !== null) {
      if (Dagaz.Model.stringToPos(pos, design) !== null) {
          pos = Dagaz.Model.stringToPos(pos, design);
      }
  }
  ctx.save();
  ctx.strokeStyle = "#0000FF";
  _.each(design.allPositions(), function(p) {
      var r = view.pos[p];
      if (!_.isUndefined(r)) {
          if ((zone !== null) && design.inZone(zone, board.player, p)) {
              ctx.beginPath();
              ctx.moveTo(r.x, r.y);
              ctx.lineTo(r.x + r.dx, r.y + r.dy);
              ctx.moveTo(r.x, r.y + r.dy);
              ctx.lineTo(r.x + r.dx, r.y);
              ctx.stroke();
          }
          if ((pos !== null) && (pos != p)) return;
          ctx.strokeRect(r.x, r.y, r.dx, r.dy);
      }
  });
  ctx.restore();
  if (!_.isUndefined(showBoard)) {
      showBoard(board, ctx);
  }
}

})();
