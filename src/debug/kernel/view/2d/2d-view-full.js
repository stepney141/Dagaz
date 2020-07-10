(function() {

var MessageCode = {
  MOUSE_MOVE:           0,
  MOUSE_LKM:            1,
  MOUSE_PKM:            2,
  MOUSE_WHEEL:          3,
  KEY_PRESSED:          4,
  TURN_MOVE:            5,
  MARK_CAPTURES:        6,
  MARK_TARGETS:         7
};

var isValid             = false;
var mouseX              = 0;
var mouseY              = 0;
var mousePressed        = false; // TODO

Dagaz.View.SHIFT_X      = 0;
Dagaz.View.SHIFT_Y      = 0;
Dagaz.View.STRIKE_ALPHA = 0.5;
Dagaz.View.STEP_CNT     = 3;

function Region(x, y, dx, dy, isActive, extension) {
  this.e = extension;
  this.x = x; this.dx = dx;
  this.y = y; this.dy = dy;
  this.isActive = isActive;
  this.regions = [];
  this.boards = [];
  this.positions = [];
}

Region.prototype.addRegion = function(x, y, dx, dy, isActive, extension) {
  var r = new Region(x, y, dx, dy, isActive, extension);
  r.view = this.view;
  r.parent = this;
  r.zValue = this.regions.length;
  this.regions.push(r);
  return r;
}

Region.prototype.addBoard = function(name, turns, selector, extension) {
  if (!_.isUndefined(selector) && (selector != Dagaz.Model.getResourceSelector())) return;
  var board = {
      h: document.getElementById(name),
      t: turns,
      e: extension
  };
  this.boards.push(board);
}

Region.prototype.addPosition = function(name, x, y, dx, dy) {
  var pos = {
      name: name,
      x:    x,
      y:    y,
      dx:   dx,
      dy:   dy
  };
  this.positions.push(pos);
}

Region.prototype.findPosition = function(name) {
  for (var i = 0; i < this.positions.length; i++) {
       if (this.positions[i].name == name) return this.positions[i];
  }
  for (var i = 0; i < this.regions.length; i++) {
       var r = this.regions[i].findPosition(name);
       if (r !== null) return r;
  }
  return null;
}

Region.prototype.isLoaded = function() {
  for (var i = 0; i < this.regions.length; i++) {
       if (!this.regions[i].isLoaded()) return false;
  }
  for (var i = 0; i < this.boards.length; i++) {
       var image = this.boards[i].h;
       if (!image.complete || (image.naturalWidth == 0)) return false;
       this.boards[i].dx = image.naturalWidth;
       this.boards[i].dy = image.naturalHeight;
  }
  return true;
}

var drawMark = function(ctx, pos, x, y, color) {
  x += pos.x; y += pos.y;
  x += (pos.dx / 2) | 0;
  y += (pos.dy / 2) | 0;
  var r = pos.dx / 4;
  if (Math.abs(pos.dy - pos.dx) > 10) {
      r = Math.min(pos.dy, pos.dx) / 2;
  }
  if (!_.isUndefined(Dagaz.View.MARK_R)) {
      r = Dagaz.View.MARK_R;
  }
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x + Dagaz.View.SHIFT_X, y + Dagaz.View.SHIFT_Y, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

Region.prototype.draw = function(ctx, x, y) {
  if (!this.isActive) return;
  _.each(r.boards, function(board) {
      if (!_.isUndefined(board.t) && !_.isUndefined(this.turn)) {
          if (_.indexOf(board.t, +this.turn) < 0) return;
      }
      ctx.drawImage(board.h, x, y);
      if (!_.isUndefined(board.e)) {
          board.e(view, ctx, board);
      }
  });
  for (var i = 0; i < this.positions.length; i++) {
       if (!_.isUndefined(this.positions[i].setup)) {
           var setup = this.positions[i].setup;
           if (setup.c > 0) {
               setup.x += setup.dx;
               setup.y += setup.dy;
               setup.c--;
           }
           setup.piece.e(view, ctx, this.positions[i], x + setup.x, y + setup.y);
       }
  }
  if (!_.isUndefined(this.markTargets)) {
       for (var i = 0; i < this.positions.length; i++) {
            var ix = Dagaz.Model.stringToPos(this.positions[i].name, this.view.design);
            if (_.indexOf(this.markTargets, ix) >= 0) {
                drawMark(ctx, this.positions[i], x, y, "#00AA00");
            }
       }
  }
  // TODO: Show drops, etc.

  if (!_.isUndefined(this.e)) {
       this.e(view, ctx, this);
  }
  for (var i = 0; i < this.regions.length; i++) {
       var r = this.regions[i];
       r.draw(ctx, x + r.x, y + r.y);
  }
}

Region.prototype.close = function() {
  this.isActive = false;
}

Region.prototype.open = function() {
  if (!_.isUndefined(this.parent)) {
       var p = this.parent;
       var regions = [];
       for (var i = 0; i < this.regions.length; i++) {
            var r = this.regions[i];
            if (r.zValue != this.zValue) {
                r.zValue = regions.length;
                regions.push(r);
            }
       }
       this.zValue = regions.length;
       regions.push(this);
       p.regions = regions;
  }
  this.isActive = true;
}

var inRect = function(obj, x, y) {
  return (x >= obj.x) &&
         (y >= obj.y) &&
         (x < obj.x + obj.dx) &&
         (y < obj.y + obj.dy);
}

Region.prototype.recv = function(code, event, x, y) {
  if (code == TURN_MOVE) {
      this.turn = event;
      return false;
  }
  if (!_.isUndefined(x) && !_.isUndefined(y)) {
      for (var i = 0; i < this.positions.length; i++) {
           if (inRect(this.positions[i], x, y) && this.view.recv(code, event, this.positions[i].name)) return true;
      }
  }
  // TODO:

}

Region.prototype.send = function(code, event, x, y) {
  var r = false;
  if (_.isUndefined(x) || _.isUndefined(y) || inRect(this, x, y)) {
      for (var i = this.regions.length - 1; i >= 0 ; i--) {
           if (this.regions[i].isActive) {
               r = this.regions[i].send(code, event, _.isUndefined(x) ? x : x - this.regions[i].x, _.isUndefined(y) ? y : y - this.regions[i].y);
           }
           if (r) break;         
      }
      if (!r) {
           r = this.recv(code, event, x, y);
      }
  }
  return r;
}

function View(design) {
  this.design = design;
  this.root = new Region(0, 0, canvas.width, canvas.height, true);
  this.root.view = this;
  this.pieces = [];
}

Dagaz.View.getView = function() {
  if (_.isUndefined(Dagaz.View.view)) {
      Dagaz.View.view = new View();
  }
  return Dagaz.View.view;
}

var drawPiece = function(view, ctx, pos, x, y) {
  var isSaved = false;
  var piece = pos.setup.piece;
  if (Dagaz.Model.showCaptures) {
      var ix = Dagaz.Model.stringToPos(pos.name, view.design);
      if (!_.isUndefined(this.markCaptures) && (_.indexOf(this.markCaptures, ix) >= 0)) {
          ctx.save();
          ctx.globalAlpha = Dagaz.View.STRIKE_ALPHA;
          isSaved = true;
      }
  }
  x += (pos.dx - piece.dx) / 2 | 0;
  y += (pos.dy - piece.dy) / 2 | 0;
  ctx.drawImage(piece.h, x, y, piece.dx, piece.dy);
  if (isSaved) {
      ctx.restore();
  }
}

View.prototype.addPiece = function(name, extension) {
  var piece = {
      n: name,
      h: document.getElementById(name),
      e: _.isUndefined(extension) ? drawPiece : extension
  };
  this.pieces.push(piece);
}

View.prototype.findPiece = function(name) {
  for (var i = 0; i < this.pieces.length; i++) {
       if (this.pieces[i].n == name) return this.pieces[i];
  }
  return null;
}

View.prototype.isLoaded = function() {
  if (_.isUndefined(this.allLoaded)) {
      if (!root.isLoaded()) return false;
      for (var i = 0; i < this.pieces.length; i++) {
           var image = this.pieces[i].h;
           if (!image.complete || (image.naturalWidth == 0)) return false;
           this.pieces[i].dx = image.naturalWidth;
           this.pieces[i].dy = image.naturalHeight;
      }
      this.allLoaded = true;
  }
  return this.allLoaded;
}

View.prototype.send = function(code, event, x, y) {
  if (code == MARK_CAPTURES) {
      this.markCaptures = event;
      return true;
  }
  if (code == MARK_TARGETS) {
      this.markTargets = event;
      return true;
  }

  return this.root.send(code, event, x, y);
}

View.prototype.invalidate = function() {
   isValid = false;
}

View.prototype.addSetup = function(name, piece) {
  var pos = this.root.findPosition(name);
  if (pos !== null) {
      pos.setup = {
          piece: piece,
          x: pos.x,
          y: pos.y,
          dx: 0,
          dy: 0,
          c: 0
      };
      this.invalidate();
  }
}

View.prototype.apply = function(move) {
  if (!_.isUndefined(this.move)) return false;
  this.move = move;
  this.step = 0;
  this.changes = [];
  return true;
}

View.prototype.animate = function() {
  if (!_.isUndefined(this.changes) && !_.isUndefined(this.move)) {
       var f = true;
       for (var i = 0; i < this.changes.length; i++) {
           if (this.changes[i].c > 0) {
               this.changes[i].c--;
               f = false;
           }
       }
       if (f) {
           for (var i = 0; i < this.changes.length; i++) {
                var c = this.changes[i];
                if ((c.n !== null) && (c.o !== null) && (c.s !== null)) {
                    c.s.x = c.n.x; c.s.dx = 0;
                    c.s.y = c.n.y; c.s.dy = 0;
                    c.n.setup = c.s; c.s.c = 0;
                    delete c.o;
                }
           }
           for (var i = 0; i < this.changes.length; i++) {
                var c = this.changes[i];
                if ((c.o === null) && (c.n !== null) && (c.s !== null)) {
                    c.s.x = c.n.x; c.s.dx = 0;
                    c.s.y = c.n.y; c.s.dy = 0;
                    c.n.setup = c.s; c.s.c = 0;
                }
           }
           for (var i = 0; i < this.changes.length; i++) {
                var c = this.changes[i];
                if ((c.o !== null) && (c.n === null)) {
                    delete c.o;
                }
           }
           this.step++;
           this.changes = [];
           for (var i = 0; i < this.move.actions.length; i++) {
                var a = this.move.actions[i];
                var o = null; var n = null;
                var s = null; var c = 0;
                if (a[0] !== null) o = this.root.findPosition(Dagaz.Model.posToString(a[0][0], this.design));
                if (a[1] !== null) n = this.root.findPosition(Dagaz.Model.posToString(a[1][0], this.design));
                if (a[2] !== null) {
                    s = {
                       piece: this.findPiece(a[2][0].getOwner() + a[2][0].getType());
                    };
                }
                if ((o !== null) && (n !== null)) {
                   c = Dagaz.View.STEP_CNT;
                   if (s === null) {
                       s = o.setup;
                   }
                   o.setup.dx = ((n.x - o.x) / c) | 0;
                   o.setup.dy = ((n.y - o.y) / c) | 0;
                   o.setup.c = c;
                }
                this.changes.push({
                   c: c, o: o, n: n, s: s
                });
           }          
           if (this.changes.length == 0) {
               delete this.changes;
               delete this.move;
           }
       }
       this.invalidate();
  }
}

View.prototype.draw = function() {
  if (!this.isLoaded()) return;
  this.animate();
  if (!isValid) return;
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, this.root.dx, this.root.dy);
  this.root.draw(ctx, 0, 0);
  isValid = true;
}

View.prototype.recv = function(code, event, name) {
  // TODO: PKM

}

var mouseUpdate = function(event) {
  var canvasRect = canvas.getBoundingClientRect();
  mouseX = event.clientX - canvasRect.left;
  mouseY = event.clientY - canvasRect.top;
}

var mouseMove = function(event) {
  mouseUpdate(event);
  this.root.send(MOUSE_MOVE, event, mouseX, mouseY);
}

var mouseUp = function(event) {
  // TODO:

}

var mouseDown = function(event) {
  // TODO:

}

var mouseWheel = function(event) {
  // TODO:

}

View.prototype.setController = function(controller) {
  canvas.onmousemove = mouseMove;
  canvas.onmouseup   = mouseUp;
  canvas.onmousedown = mouseDown;
  if ('onwheel' in document) {
      document.addEventListener('wheel', mouseWheel, { passive: false });
  } else if ('onmousewheel' in document) {
      document.addEventListener('mousewheel', mouseWheel, { passive: false });
  } else {
      document.MozMousePixelScroll = mouseWheel;
  }
  this.controller = controller;
}

document.oncontextmenu = function()  { 
  this.root.send(MOUSE_PKM, null, mouseX, mouseY);
  return false; 
}

var onkeyup = window.onkeyup;

window.onkeyup = function(event) {
  this.root.send(KEY_PRESSED, event);
  if (onkeyup) {
      onkeyup(event);
  }
}

})();
