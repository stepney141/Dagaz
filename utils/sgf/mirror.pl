while (<>) {
  chomp;
  tr/abcdefgh/hgfedcba/;
  print "$_\n";
}