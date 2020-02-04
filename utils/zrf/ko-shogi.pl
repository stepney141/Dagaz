sub atod {
  my ($x) = @_;
  return ord($x) - ord('A') + 1;
}

sub dtoa {
  my ($x) = @_;
  return chr($x + ord('A') - 1);
}

while (<>) {
  s/(\d+)([A-S])/dtoa($1) . atod($2)/ge;
  print;
}
