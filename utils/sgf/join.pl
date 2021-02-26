my %c;

while (<>) {
  chomp;
  my $s = $_;
  if (/^(\S+\s[wb]):\s*(.*)$/) {
     my $fen = $1;
     my @moves = split(/,/, $2);
     if ($c{$fen}) {
         foreach my $it (@moves) {
             $it =~ s/(\w\d)(\w\d)/$1-$2/;
             my $f = 1;
             foreach my $x (@{$c{$fen}}) {
                if ($it eq $x) {
                    $f = 0;
                }
             }
             if ($f) {
                push(@{$c{$fen}}, $it);
             }
         }
     } else {
         $c{$fen} = \@moves;
     }
  }
}

while (my ($fen, $it) = each(%c)) {
  print "$fen: ";
  my $f = 0;
  foreach my $x (@$it) {
     if ($f) {
         print ",";
     }
     print "$x";
     $f = 1;
  }
  print "\n";
}