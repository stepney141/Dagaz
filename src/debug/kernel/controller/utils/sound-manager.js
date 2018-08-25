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
