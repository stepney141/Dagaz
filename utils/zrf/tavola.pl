my $dx = 50;
my $dy = 0;

while (<>) {
  if (/\((\S+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\)/) {
      my $s = $1;
      my $x = $2; $x += $dx;
      my $y = $3; $y += $dy;
      my $w = $4; $w += $dx;
      my $h = $5; $h += $dy;
      print "         ($s $x $y $w $h)\n";
  } else {
      print;
  }
}
