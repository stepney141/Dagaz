my @s = [];
my $c = 0;

while (<>) {
  if (/\((\w+)\s+(\w+)\s+([\w\d]+)\)/) {
      $s[$c++] = "$2 $3";
  }
}

my $cp = "";

print "   (board-setup\n";
print "      (N\n";
foreach my $item (sort @s) {
  if ($item =~ /(\w+)\s+([\w\d]+)/) {
      my $piece = $1;
      my $pos   = $2;
      if ($cp ne $piece) {
          if ($cp) {
              print ")\n";
          }
          print "          ($piece";
          $cp = $piece;
      }
      print " $pos";
  }
}
print ")\n";
print "      )\n";
print "   )\n";
