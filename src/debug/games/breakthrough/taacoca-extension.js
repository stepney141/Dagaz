(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "taacoca-extension") {
      checkVersion(design, name, value);
  }
}

Dagaz.Model.closure = function(board, move, group) {
  return group;
}

})();
