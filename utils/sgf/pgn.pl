while (<>) {
  chomp;
  my $s = $_;
  if (/\S+\s*[wb]\s*([KQkq-]+)\s/) {
      my $r = $1;
      if ($r ne 'KQkq') {
          print "$s/$r\n";
      } else {
          print "$s\n";
      }
  } else {
      print "$s\n";
  }
}
