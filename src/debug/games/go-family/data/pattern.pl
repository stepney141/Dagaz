my $price   = 0;
my $pattern = "";

sub flip {
  my ($x) = @_;
  my $r = "";
  for (my $j = 0; $j < 5; $j++) {
     for (my $i = 4; $i >= 0; $i--) {
         $r .= substr($x, $j * 5 + $i, 1);
     }
  }
  return $r;
}

sub rotate {
  my ($x) = @_;
  my $r = "";
  for (my $i = 4; $i >= 0; $i--) {
     for (my $j = 0; $j < 5; $j++) {
         $r .= substr($x, $j * 5 + $i, 1);
     }
  }
  return $r;
}

sub term {
  my ($x, $c) = @_;
  my $r = $x;
  if ($x eq '?') {
     $r = '.';
  }
  if ($x eq '.') {
     $r = '0';
  }
  if ($x eq '+') {
     $r = '\s';
  }
  if ($x eq '*') {
     $r = '[\s0]';
  }
  if ($x eq 'x') {
     $r = '[a-dx]';
  }
  if ($x eq '!') {
     $r = '[a-dx\s]';
  }
  if ($x eq 'X') {
     $r = '[A-DX]';
  }
  if ($c > 1) {
      $r .= "{$c}";
  }
  return $r;
}

sub compile {
  my ($x) = @_;
  my $r = "";
  my $p = "";
  my $c = 0;
  for (my $i = 0; $i < 25; $i++) {
      my $s = substr($x, $i, 1);
      if ($p eq $s) {
          $c++;
      } else {
          if ($p ne "") {
              $r .= term($p, $c);
          }
          $p = $s;
          $c = 1;
      }
  }
  $r .= term($p, $c);
  return $r;
}

sub out {
  my ($x, $p) = @_;
  $x = compile($x);
  print "Dagaz.AI.Patterns.push({re: /$x/, price: $p});\n";
}

print "Dagaz.AI.Patterns = [];\n\n";

while (<>) {
  if (/^(-?\d+)/) {
      $price = $1;
  }
  if (/^([?+*.a-zA-Z]{5})/) {
      $pattern .= $1;
  }
  if (length($pattern) == 25) {
      my %cache;
      $cache{$pattern} = 1;
      out($pattern, $price);
      my $x = rotate($pattern);
      if (!$cache{$x}) {
          $cache{$x} = 1;
          out($x, $price);
      }
      $x = rotate($x);
      if (!$cache{$x}) {
          $cache{$x} = 1;
          out($x, $price);
      }
      $x = rotate($x);
      if (!$cache{$x}) {
          $cache{$x} = 1;
          out($x, $price);
      }
      $x = flip($pattern);
      if (!$cache{$x}) {
          $cache{$x} = 1;
          out($x, $price);
      }
      $x = rotate($x);
      if (!$cache{$x}) {
          $cache{$x} = 1;
          out($x, $price);
      }
      $x = rotate($x);
      if (!$cache{$x}) {
          $cache{$x} = 1;
          out($x, $price);
      }
      $x = rotate($x);
      if (!$cache{$x}) {
          $cache{$x} = 1;
          out($x, $price);
      }
      $pattern = "";
  }
}
