my $last = 0;

while (<>) {
  if (/Zillions/) {
      $last = 1000;
  }
  if (/^(\d+)\.\s+.*(\w\d+)\s+-\s+(\S+)/) {
      my $num  = $1;
      my $from = $2;
      my $to   = $3;
      if ($num < $last) {
          print "\n";
      }
      $last = $num;
      print "$from$to ";
  }
}

print "\n";
