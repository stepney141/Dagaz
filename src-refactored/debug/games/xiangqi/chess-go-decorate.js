(function() {

var POSITIONS = [];

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "chess-go-decorate") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var ko = [];
  _.each(POSITIONS, function(name) {
      ko.push(Dagaz.Model.stringToPos(name, design));
  });
  board.ko = ko;
  CheckInvariants(board);
}

})();
