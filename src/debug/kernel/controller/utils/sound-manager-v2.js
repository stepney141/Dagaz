Dagaz.Sounds = [];

Dagaz.Sounds.move  = 0;
Dagaz.Sounds.drop  = 1;
Dagaz.Sounds.win   = 2;
Dagaz.Sounds.lose  = 3;
Dagaz.Sounds.draw  = 4;
Dagaz.Sounds.page  = 5;
Dagaz.Sounds.start = 6;
Dagaz.Sounds.hint  = 7;
Dagaz.Sounds.popup = 8;

Dagaz.Controller.soundOff = false;

(function() {

var sounds  = [];
var current = null;

function Sound(src, clonable) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.clonable = clonable;
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

Dagaz.Controller.addSound = function(ix, src, clonable) {
    sounds[ix + "_1"] = new Sound(src, clonable);
}

var getSound = function(ix, player) {
    if (!_.isUndefined(sounds[ix + "_1"])) {
        var parent = sounds[ix + "_1"];
        if ((parent.clonable) && (player != 1)) {
           if (_.isUndefined(sounds[ix + "_" + player])) {               
               sounds[ix + "_" + player] = new Sound(parent.sound.src, parent.clonable);
           }
           return sounds[ix + "_" + player];
        }
        return parent;
    }
    return null;
}

Dagaz.Controller.play = function(ix, player) {
    if (Dagaz.Controller.soundOff) return;
    Dagaz.Controller.stop();
    current = getSound(ix, player);
    if (current !== null) {
        current.play();
    }
}

Dagaz.Controller.stop = function() {
    if (current !== null) {
        current = null;
    }
}

Dagaz.Controller.sound = function() {
    if (Dagaz.Controller.soundOff) {
        sound.innerHTML = "no Sound";
        Dagaz.Controller.soundOff = false;
        document.cookie = "dagaz.sound=on";
    } else {
        sound.innerHTML = "Sound";
        Dagaz.Controller.soundOff = true;
        document.cookie = "dagaz.sound=off";
    }
}

Dagaz.Controller.checkSound = function() {
   var str = document.cookie;
   var result = str.match(/dagaz\.sound=off/);
   if (result) {
       sound.innerHTML = "Sound";
       Dagaz.Controller.soundOff = true;
   } else {
       sound.innerHTML = "no Sound";
       Dagaz.Controller.soundOff = false;
   }
}

})();

Dagaz.Controller.checkSound();

Dagaz.Controller.addSound(Dagaz.Sounds.move,  "../../sounds/clack.wav");
Dagaz.Controller.addSound(Dagaz.Sounds.drop,  "../../sounds/on.wav");
Dagaz.Controller.addSound(Dagaz.Sounds.win,   "../../sounds/tadam.wav");
Dagaz.Controller.addSound(Dagaz.Sounds.lose,  "../../sounds/loss.wav");
Dagaz.Controller.addSound(Dagaz.Sounds.draw,  "../../sounds/draw.ogg");
Dagaz.Controller.addSound(Dagaz.Sounds.page,  "../../sounds/page.wav");
Dagaz.Controller.addSound(Dagaz.Sounds.hint,  "../../sounds/bird.wav");
Dagaz.Controller.addSound(Dagaz.Sounds.popup, "../../sounds/popup.wav");
