(function() {

Dagaz.AI.AI_FRAME      = 1000;
Dagaz.Model.showBlink  = false;
Dagaz.AI.getForcedMove = Dagaz.AI.getChessForcedMove;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gorogoro-shogi-extension") {
      checkVersion(design, name, value);
  }
}

})();
