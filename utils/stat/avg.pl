my @queue;
my $sum   = 0;
my $cn    = 0;

while (<>) {
  if (/^Stat:\s+(\d+)/) {
      my $n = $1;
      if ($cn == 4) {
          my $m = shift @queue;
          $sum -= $m;
          $cn--;
      }
      push @queue, $n;
      $sum += $n;
      $cn++;
      if ($cn == 4) {
          my $avg = $sum / $cn;
          print "$avg\n";
      }
  }
}
