(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "omega-fool-extension") {
      checkVersion(design, name, value);
  }
}

var isFoolSpawn = function(board, pos) {
  if (_.isUndefined(board.parent) || (board.parent === null)) return false;
  var b = board.parent;
  if (_.isUndefined(b.move)) return false;
  var move = b.move;
  if (!move.isSimpleMove()) return false;
  if (pos != move.actions[0][0][0]) return false;
  if (_.isUndefined(b.parent) || (b.parent === null)) return false;
  var b = b.parent;
  var piece = b.getPiece(pos);
  if (piece === null) return false;
  return piece.getValue(0) === null;
}

var isValidFoolMove = function(board, type) {
  if (_.isUndefined(board.parent) || (board.parent === null)) return false;
  var b = board.parent;
  if (_.isUndefined(board.move)) return false;
  var move = board.move;
  if (!move.isSimpleMove()) return false;
  var piece = b.getPiece(move.actions[0][0][0]);
  if (piece === null) return false;
  return piece.type == type;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.isDropMove()) {
          var pos = move.actions[0][1][0];
          if (!isFoolSpawn(board, pos)) {
              move.failed = true;
              return;
          }
      } else {
          _.each(move.actions, function(a) {
              if ((a[0] !== null) && (a[1] !== null)) {
                   var piece = board.getPiece(a[0][0]);
                   if (piece.getValue(0) === null) {
                       a[2] = [ piece.setValue(0, 1) ];
                   }
              }
          });
          if ((move.mode < 8) && !isValidFoolMove(board, move.mode)) {
              move.failed = false;
          }
      }
  });
  CheckInvariants(board);
}

})();
