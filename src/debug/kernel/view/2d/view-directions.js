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

var getDir = function() {
  var url = window.location.search.toString();
  var result = url.match(/[?&]dir=([^&]*)/);
  if (result) {
      return result[1];
  } else {
      return null;
  }
}

var showBoard = Dagaz.View.showBoard;

Dagaz.View.showBoard = function(board, ctx) {
  var design = Dagaz.Controller.app.design;
  var view = Dagaz.Controller.app.view;
  var pos = getPos(); var dir = getDir();
  if (pos !== null) {
      if (Dagaz.Model.stringToPos(pos, design) !== null) {
          pos = Dagaz.Model.stringToPos(pos, design);
      }
  }
  if (dir !== null) {
      if (design.getDirection(dir) !== null) {
          dir = design.getDirection(dir);
      }
  }
  ctx.save();
  ctx.strokeStyle = "#FFFF00";
  ctx.fillStyle = "#FFFF00";
  _.each(design.allPositions(), function(p) {
      if ((pos !== null) && (pos != p)) return;
      _.each(design.allDirections(), function(d) {
           var r = view.pos[p];
           var q = design.navigate(board.player, p, d);
           if (!_.isUndefined(r) && (q !== null)) {
               if ((dir !== null) && (dir != d)) return;
               var t = view.pos[q];
               if (!_.isUndefined(t)) {
                   ctx.beginPath();
                   ctx.moveTo(r.x + r.dx / 2, r.y + r.dy / 2);
                   ctx.lineTo(t.x + t.dx / 2, t.y + t.dy / 2);
                   ctx.arc(t.x + t.dx / 2, t.y + t.dy / 2, 2, 0, 2 * Math.PI);
                   ctx.fill();
                   ctx.stroke();
               }
           }
      });
  });
  ctx.restore();
  if (!_.isUndefined(showBoard)) {
      showBoard(board, ctx);
  }
}

})();
