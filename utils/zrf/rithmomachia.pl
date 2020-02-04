while (<>) {
  if (/design.addPiece\(\"(\D)(\d+)\",\s*(\d+)\);/) {
      print "    design.addPiece(\"$1$2\", $3, $2);\n";
  } else {
      print;
  }
}
