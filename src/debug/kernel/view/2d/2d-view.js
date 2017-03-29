(function() {

Dagaz.View.markType = {
   TARGET:    0,
   ATTACKING: 1
};

var STEP_CNT     = 10;

var isConfigured = false;
var isValid      = false;

Dagaz.View.configure = function(view) {}

function View2D() {
  this.pos     = [];
  this.res     = [];
  this.piece   = [];
  this.board   = [];
  this.setup   = [];
  this.target  = [];
  this.strike  = [];
  this.changes = [];
}

Dagaz.View.getView = function() {
  if (_.isUndefined(Dagaz.View.view)) {
      Dagaz.View.view = new View2D();
  }
  return Dagaz.View.view;
}

View2D.prototype.pointToPos = function(x, y) {
  for (var i = 0; i < this.pos.length; i++) {
       if ((x > this.pos[i].x) &&
           (y > this.pos[i].y) &&
           (x < this.pos[i].x + this.pos[i].dx) &&
           (y < this.pos[i].y + this.pos[i].dy)) {
           return i;
       }
  }
  return null;
}

View2D.prototype.posToIx = function(pos) {
  for (var i = 0; i < this.setup.length; i++) {
       if (this.setup[i].pos === pos) {
           return i;
       }
  }
  return null;
}

View2D.prototype.defPosition = function(name, x, y, dx, dy) {
  this.pos.push({
      name: name,
      x:    x,
      y:    y,
      dx:   dx,
      dy:   dy
  });
}

View2D.prototype.defBoard = function(img, x, y) {
  var board = {
     h: document.getElementById(img),
     x: x ? x : 0,
     y: y ? y : 0
  };
  this.res.push(board);
  this.board.push(board);
}

View2D.prototype.defPiece = function(img, name, help, glyph) {
  var piece = {
     h:    document.getElementById(img),
     name: name
  };
  if (glyph) {
     piece.glyph = document.getElementById(glyph);
  }
  if (help) {
     piece.help = help;
  }
  this.res.push(piece);
  this.piece[name] = piece;
}

View2D.prototype.allResLoaded = function() {
  if (this.allDone) return true;
  for (var i = 0; i < this.res.length; i++) {
       var image = this.res[i].h;
       if (!image.complete || (image.naturalWidth == 0)) return false;
       this.res[i].dx = image.naturalWidth;
       this.res[i].dy = image.naturalHeight;
  }
  this.allDone = true;
  return true;
}

View2D.prototype.addPiece = function(piece, pos) {
  this.setup.push({
       pos:  pos,
       name: piece,
       x:    this.pos[pos].x,
       y:    this.pos[pos].y
  });
}

View2D.prototype.markPositions = function(type, positions) {
  if (type === Dagaz.View.markType.TARGET) {
      this.target = positions;
  } else {
      this.strike = positions;
  }
  this.invalidate();
}

View2D.prototype.movePiece = function(from, to, piece) {
  this.setup = _.filter(this.setup, function(frame) {
      return frame.pos !== to;
  });
  var ix = this.posToIx(from);
  if (ix === null) return;
  this.changes.push({
      from:  from,
      to:    to,
      op:    ix,
      np:    piece.toString(),
      dx:    ((this.pos[to].x - this.pos[from].x) / STEP_CNT) | 0,
      dy:    ((this.pos[to].y - this.pos[from].y) / STEP_CNT) | 0
  });
}

View2D.prototype.dropPiece = function(pos, piece) {
  this.setup = _.filter(this.setup, function(frame) {
      return frame.pos !== to;
  });
  this.changes.push({
      to:    to,
      np:    piece.toString()
  });
}

View2D.prototype.capturePiece = function(pos) {
  var ix = this.posToIx(from);
  if (ix === null) return;
  this.changes.push({
      from:  from,
      op:    ix
  });
}

View2D.prototype.commit = function() {
   var steps = STEP_CNT;
   var moves = _.chain(this.changes)
    .filter(function(frame) {
        return !_.isUndefined(frame.from) && !_.isUndefined(frame.to);
     })
    .size()
    .value();
   if (moves === 0) {
        steps = 1;
   }
   _.each(this.changes, function(frame) {
      frame.cnt = steps;
   });
   this.invalidate();
}

var drawMarks = function(ctx, self, list, color) {
   _.each(list, function(p) {
        var pos = this.pos[p];
        var x = pos.x; var y = pos.y;
        if (pos.dx > 0) {
            x += pos.dx / 2 | 0;
        }
        if (pos.dy > 0) {
            y += pos.dy / 2 | 0;
        }
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, pos.dx / 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
   }, self);
}

View2D.prototype.invalidate = function() {
   isValid = false;
}

View2D.prototype.animate = function() {
  _.chain(this.changes)
   .filter(function(frame) {
        return !_.isUndefined(frame.cnt);
    })
   .each(function(frame) {
        if (!_.isUndefined(frame.op)) {
            var piece = this.setup[frame.op];
            if (!_.isUndefined(frame.dx)) {
                piece.x += frame.dx;
            }
            if (!_.isUndefined(frame.dy)) {
                piece.y += frame.dy;
            }
        }
        frame.cnt--;
    });
  _.chain(this.changes)
   .filter(function(frame) {
        return frame.cnt <= 0;
    })
   .each(function(frame) {
        if (_.isUndefined(frame.to)) {
            this.setup = _.filter(this.setup, function(frame) {
               return frame.pos !== to;
            });
        } else {
            if (!_.isUndefined(frame.op)) {
                var piece = this.setup[frame.op];
                if (frame.np) {
                    piece.name = frame.np;
                }
                piece.pos = frame.to;
                piece.x = this.pos[frame.to].x;
                piece.y = this.pos[frame.to].y;
            } else {
                this.setup.push({
                    pos:  frame.to,
                    name: frame.np,
                    x:    this.pos[frame.to].x,
                    y:    this.pos[frame.to].y
                });
            }
        }
        frame.done = true;
    }, this);
    this.changes = _.filter(this.changes, function(frame) {
        return _.isUndefined(frame.done);
    });
    if (this.changes.length === 0) {
        isValid = true;
    }
}

View2D.prototype.draw = function(canvas) {
  if (!isConfigured) {
      Dagaz.View.configure(this);
      var board = Dagaz.Model.getInitBoard();
      board.setup(this);
      isConfigured = true;
  }
  if (this.allResLoaded() && !isValid) {
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      _.each(this.board, function(b) {
           ctx.drawImage(b.h, b.x, b.y);
      });
      _.each(this.setup, function(p) {
           var pos = this.pos[p.pos];
           var x = pos.x; var y = pos.y;
           var piece = this.piece[p.name];
           x += (pos.dx - piece.dx) / 2 | 0;
           y += (pos.dy - piece.dy) / 2 | 0;
           ctx.drawImage(piece.h, x, y);
      }, this);
      drawMarks(ctx, this, this.target, "#00FF00");
      drawMarks(ctx, this, this.strike, "#FF0000");
      this.animate();
  }
}

})();
