Dagaz.Model.passTurn        = 0;
Dagaz.Model.passPartial     = false;
Dagaz.Model.sharedPieces    = false;
Dagaz.Model.smartFrom       = false;
Dagaz.Model.smartTo         = false;
Dagaz.Model.recycleCaptures = false;

(function() {

function Design() {
   this.directions = [];
   this.players    = [];
   this.symmetries = [];
   this.positions  = [];
   this.graph      = [];
   this.graph.push([]);
}

Dagaz.Model.getDesign = function(player) {
   if (_.isUndefined(Dagaz.Model.design)) {
       Dagaz.Model.design = new Design();
   }
   return Dagaz.Model.design;
}

Design.prototype.createMove = function(mode) {
   return new Move(mode);
}

Dagaz.Model.checkOption = function(name, value) {
   if (name == "pass-turn") {
       if (value == "true") {
           Dagaz.Model.passTurn = 1;
       }
       if (value == "forced") {
           Dagaz.Model.passTurn = 2;
       }
       return;
   }
   if (name == "pass-partial") {
       Dagaz.Model.passPartial = (value == "true");
       return;
   }
   if (name == "shared-pieces") {
       Dagaz.Model.sharedPieces = (value == "true");
       return;
   }
   if (name == "smart-moves") {
       if ((value == "from") || (value == "true")) {
           Dagaz.Model.smartFrom = true;
       }
       if ((value == "to") || (value == "true")) {
           Dagaz.Model.smartTo = true;
       }
       return;
   }
   if (name == "recycle-captures") {
       Dagaz.Model.recycleCaptures = (value == "true");
       return;
   }
   alert("Option [" + name + " = " + value + "] not supported.");
}

Design.prototype.checkOption = function(name, value) {
   Dagaz.Model.checkOption(name, value);
}

Design.prototype.co = Design.prototype.checkOption;

Design.prototype.addDirection = function(name) {
   this.directions.push(name);
}

Design.prototype.di = Design.prototype.addDirection;

Design.prototype.addPosition = function(name, dirs) {
   this.positions.push(name);
   // TODO: Check dirs is array
   this.graph(dirs);
}

Design.prototype.ps = Design.prototype.addPosition;

Design.prototype.addPlayer = function(name, dirs) {
   this.players.push(name);
   this.symmetries.push(dirs);
}

Design.prototype.pl = Design.prototype.addPlayer;

Design.prototype.allDirections = function() {
   return _.range(this.directions.length);
}

Design.prototype.allPositions = function() {
   return _.range(1, this.graph.length);
}

Design.prototype.posToString = function(pos) {
   if (pos < this.positions.length) {
       return this.positions[pos];
   } else {
       return "?";
   }
}

Design.prototype.stringToPos = function(name) {
   var pos = _.indexOf(this.positions, name);
   if (pos < 0) {
       return null;
   } else {
       return pos;
   }
}

function Move(mode) {
   this.mode  = mode;
   this.parts = [];
   this.part  = 0;
}

Move.prototype.isPass = function() {
   return this.parts.length == 0;
}

Move.prototype.closePart = function() {
   // TODO: Check this.current is undefined
   this.part++;
}

Move.prototype.getPart = function() {
   if (_.isUndefined(this.parts[this.part])) {
       this.parts[this.part] = [];
   }
   return this.parts[this.part];
}

Move.prototype.capturePiece = function(pos) {
   var part = this.getPart();
   part.push(new Action(pos));
}

Move.prototype.dropPiece = function(pos, pieces) {
   var part = this.getPart();
   part.push(new Action(null, pos, pieces));
}

Move.prototype.startMove = function(pos) {
   var part = this.getPart();
   this.current = new Action(pos);
   part.push(this.current);
}

Move.prototype.endMove = function(pos, pieces) {
   if (!_.isUndefined(this.current)) {
       this.current.to = pos;
       this.current.pieces = pieces;
       delete this.current;
   }
}

function Action(from, to, pieces) {
   this.from = from;
   this.to   = _.isUndefined(to) ? null : to;
   if (!_.isUndefined(pieces)) {
       this.pieces = pieces;
   }
}

Action.prototype.isMove = function() {
   return (this.from !== null) && (this.to !== null);
}

Action.prototype.isCapture = function() {
   return (this.from !== null) && (this.to === null);
}

Action.prototype.isDrop = function() {
   return (this.from === null) && (this.to !== null);
}

})();
