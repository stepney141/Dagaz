while (<>) {
  if (/min\/max\/sum\/count = (\d+)\/(\d+)\/(\d+)\/(\d+)/) {
      my $min = $1;
      my $max = $2;
      my $avg = $3 / $4;
      print "$min;$avg;$max\n";
  }
}
