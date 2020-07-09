(function() {

var MessageCode = {
  MOUSE_MOVE:           0,
  MOUSE_LKM:            1,
  MOUSE_PKM:            2,
  MOUSE_WHEEL:          3,
  KEY_PRESSED:          4,
  TURN_MOVE:            5
};

var isValid           = false;
var mouseX            = 0;
var mouseY            = 0;
var mousePressed      = false; // TODO

function Region(x, y, dx, dy, isActive) {
  this.x = x; this.dx = dx;
  this.y = y; this.dy = dy;
  this.isActive = isActive;
  this.regions = [];
  this.boards = [];
  this.positions = [];
}

Region.prototype.addRegion = function(x, y, dx, dy, isActive) {
  var r = new Region(x, y, dx, dy, isActive);
  r.view = this.view;
  r.parent = this;
  r.zValue = this.regions.length;
  this.regions.push(r);
}

Region.prototype.addBoard = function(name, turns, selector) {
  if (!_.isUndefined(selector) && (selector != Dagaz.Model.getResourceSelector())) return;
  var board = {
      h: document.getElementById(name),
      t: turns
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

Region.prototype.isLoaded = function() {
  for (var i = 0; i < this.regions.length; i++) {
       if (!this.regions[i].isLoaded()) return false;
  }
  for (var i = 0; i < this.boards.length; i++) {
       var image = this.boards[i].h;
       if (!image.complete || (image.naturalWidth == 0)) return false;
  }
  return true;
}

Region.prototype.draw = function(x, y) {
  if (!this.isActive) return;
  _.each(r.boards, function(board) {
      if (!_.isUndefined(board.t) && !_.isUndefined(this.turn)) {
          if (_.indexOf(board.t, +this.turn) < 0) return;
      }
      ctx.drawImage(board.h, x, y);
  });
  // TODO: Show pieces, marks, etc.

  for (var i = 0; i < this.regions.length; i++) {
       var r = this.regions[i];
       r.draw(x + r.x, y + r.y);
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

function View(dx, dy) {
  this.root = new Region(0, 0, dx, dy, true);
  this.root.view = this;
  this.pieces = [];
}

Dagaz.View.getView = function() {
  if (_.isUndefined(Dagaz.View.view)) {
      Dagaz.View.view = new View();
  }
  return Dagaz.View.view;
}

View.prototype.addPiece = function(name) {
  var piece = {
      h: document.getElementById(name),
      dx: 0,
      dy: 0
  };
  this.pieces.push(piece);
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

View.prototype.invalidate = function() {
   isValid = false;
}

View.prototype.draw = function() {
  if (!this.isLoaded() && !isValid) return;
  this.root.draw();
  // TODO: Show moving pieces

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
