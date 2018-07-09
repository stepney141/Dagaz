(function() {

Dagaz.Model.invisible    = [];
Dagaz.Model.invisibleOld = [];

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "dark-qiquo-view") {
      checkVersion(design, name, value);
  }
}

var isEnemy = function(a, b) {
  if (a == 1) {
      return b != 1;
  } else {
      return b == 1;
  }
}

var checkStep = function(design, board, player, pos, dir, n, visible) {
  for (; n > 0; n--) {
      var p = design.navigate(player, pos, dir);
      if (p === null) return;
      var piece = board.getPiece(p);
      if (piece !== null) {
          if (isEnemy(piece.player, player)) {
              visible.push(p);
          }
          return;
      }
  }
}

var checkJump = function(design, board, player, pos, o, d, n, visible) {
  var p = design.navigate(player, pos, o);
  if (p === null) return;
  var piece = board.getPiece(p);
  if (piece !== null) {
      if (isEnemy(piece.player, player)) {
          visible.push(p);
      }
      return;
  }
  for (; n > 0; n--) {
      p = design.navigate(player, p, d);
      if (p === null) return;
      piece = board.getPiece(p);
      if (piece !== null) {
          if (isEnemy(piece.player, player)) {
              visible.push(p);
          }
          return;
      }
  }
}

var checkSlide = function(design, board, player, pos, dir, visible) {
  var p = design.navigate(player, pos, dir);
  while (p !== null) {
      var piece = board.getPiece(p);
      if (piece !== null) {
          if (isEnemy(piece.player, player)) {
              visible.push(p);
          }
          return;
      }
      p = design.navigate(player, p, dir);
  }
}

var checkShoot = function(design, board, player, pos, dir, visible) {
  var p = design.navigate(player, pos, dir);
  while (p !== null) {
      var piece = board.getPiece(p);
      p = design.navigate(player, p, dir);
      if (piece !== null) break;
  }
  while (p !== null) {
      var piece = board.getPiece(p);
      if (piece !== null) {
          if (isEnemy(piece.player, player)) {
              visible.push(p);
          }
          return;
      }
      p = design.navigate(player, p, dir);
  }
}

Dagaz.Model.Done = function(design, board) {
  var visible = [];
  var n  = design.getDirection("n");  var w  = design.getDirection("w");
  var s  = design.getDirection("s");  var e  = design.getDirection("e");
  var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
  var ne = design.getDirection("ne"); var se = design.getDirection("se");
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if ((piece.type == 1) || (piece.type == 0)) {
              checkSlide(design, board, piece.player, pos, n, visible);
              checkSlide(design, board, piece.player, pos, e, visible);
              checkSlide(design, board, piece.player, pos, w, visible);
              checkSlide(design, board, piece.player, pos, s, visible);
          }
          if ((piece.type == 2) || (piece.type == 0)) {
              checkSlide(design, board, piece.player, pos, nw, visible);
              checkSlide(design, board, piece.player, pos, ne, visible);
              checkSlide(design, board, piece.player, pos, sw, visible);
              checkSlide(design, board, piece.player, pos, se, visible);
          }
          if (piece.type == 3) {
              visible.push(pos);
          }
          if (piece.type == 4) {
              checkShoot(design, board, piece.player, pos, n, visible);
              checkShoot(design, board, piece.player, pos, e, visible);
              checkShoot(design, board, piece.player, pos, w, visible);
              checkShoot(design, board, piece.player, pos, s, visible);
          }
          if (piece.type == 5) {
              checkStep(design, board, piece.player, pos,  n, 4, visible);
              checkStep(design, board, piece.player, pos,  e, 4, visible);
              checkStep(design, board, piece.player, pos,  w, 4, visible);
              checkStep(design, board, piece.player, pos,  s, 4, visible);
              checkStep(design, board, piece.player, pos, nw, 4, visible);
              checkStep(design, board, piece.player, pos, ne, 4, visible);
              checkStep(design, board, piece.player, pos, sw, 4, visible);
              checkStep(design, board, piece.player, pos, se, 4, visible);
          }
          if (piece.type == 6) {
              checkStep(design, board, piece.player, pos,  n, 5, visible);
              checkStep(design, board, piece.player, pos,  e, 5, visible);
              checkStep(design, board, piece.player, pos,  w, 5, visible);
              checkStep(design, board, piece.player, pos,  s, 5, visible);
              checkStep(design, board, piece.player, pos, nw, 5, visible);
              checkStep(design, board, piece.player, pos, ne, 5, visible);
              checkStep(design, board, piece.player, pos, sw, 5, visible);
              checkStep(design, board, piece.player, pos, se, 5, visible);
          }
          if (piece.type == 7) {
              checkJump(design, board, piece.player, pos, n, nw, 3, visible);
              checkJump(design, board, piece.player, pos, n, ne, 3, visible);
              checkJump(design, board, piece.player, pos, e, ne, 3, visible);
              checkJump(design, board, piece.player, pos, e, se, 3, visible);
              checkJump(design, board, piece.player, pos, w, nw, 3, visible);
              checkJump(design, board, piece.player, pos, w, sw, 3, visible);
              checkJump(design, board, piece.player, pos, s, sw, 3, visible);
              checkJump(design, board, piece.player, pos, s, se, 3, visible);
          }
          if (piece.type == 8) {
              checkStep(design, board, piece.player, pos, nw, 1, visible);
              checkStep(design, board, piece.player, pos, ne, 1, visible);
              checkStep(design, board, piece.player, pos, sw, 1, visible);
              checkStep(design, board, piece.player, pos, se, 1, visible);
          }
          if (piece.type == 9) {
              checkStep(design, board, piece.player, pos, n, 1, visible);
              checkStep(design, board, piece.player, pos, e, 1, visible);
              checkStep(design, board, piece.player, pos, w, 1, visible);
              checkStep(design, board, piece.player, pos, s, 1, visible);
          }
      }
  });
  Dagaz.Model.invisibleOld = [];
  _.each(Dagaz.Model.invisible, function(p) {
      if (board.getPiece(p) === null) {
          Dagaz.Model.invisibleOld.push(p);
      }
  });
  Dagaz.Model.invisible = [];
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (_.indexOf(visible, pos) < 0)) {
          Dagaz.Model.invisible.push(pos);
      }
  });
}

Dagaz.View.showPiece = function(view, ctx, frame, pos, piece, model, x, y, setup) {
  var isSaved = false;
  if (_.indexOf(_.union(Dagaz.Model.invisible, Dagaz.Model.invisibleOld), setup.pos) >= 0) {
      ctx.save();
      if (model.player == 1) {
          ctx.globalAlpha = 0.5;
      } else {
          ctx.globalAlpha = 0;
      }
      isSaved = true;
  }
  ctx.drawImage(piece.h, x, y, piece.dx, piece.dy);
  if (isSaved) {
      ctx.restore();
  }
}

})();
