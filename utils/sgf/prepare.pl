while (<>) {
  chomp;
  my $s = $_;
  if (/^(\S+\s[wb])[^:]+:\s*(.*)$/) {
     print "$1: $2\n";
  } else {
     print "$s\n";
  }
}
