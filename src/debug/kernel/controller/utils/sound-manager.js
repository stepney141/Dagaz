Dagaz.Sounds = [];

Dagaz.Sounds.move  = 0;
Dagaz.Sounds.drop  = 1;
Dagaz.Sounds.win   = 2;
Dagaz.Sounds.lose  = 3;
Dagaz.Sounds.draw  = 4;
Dagaz.Sounds.page  = 5;
Dagaz.Sounds.start = 6;

(function() {

var sounds  = [];
var current = null;

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

Dagaz.Controller.addSound = function(ix, src) {
    sounds[ix] = src;
}

Dagaz.Controller.play = function(ix) {
    Dagaz.Controller.stop();
    if ((current === null) && !_.isUndefined(sounds[ix])) {
         current = new Sound(sounds[ix]);
         current.play();
    }
}

Dagaz.Controller.stop = function() {
    if (current !== null) {
        current.stop();
        current = null;
    }
}

})();

Dagaz.Controller.addSound(Dagaz.Sounds.move, "../../sounds/clack.wav");
Dagaz.Controller.addSound(Dagaz.Sounds.drop, "../../sounds/on.wav");
Dagaz.Controller.addSound(Dagaz.Sounds.win,  "../../sounds/tadam.wav");
Dagaz.Controller.addSound(Dagaz.Sounds.lose, "../../sounds/loss.wav");
Dagaz.Controller.addSound(Dagaz.Sounds.draw, "../../sounds/draw.ogg");
Dagaz.Controller.addSound(Dagaz.Sounds.page, "../../sounds/page.wav");
