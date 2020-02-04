my %node;

while (<>) {
  if (/\"(\d+)\" -> \"(\d+)\"/) {
      my $s = $1; my $d = $2;
      if (!$node{$d}) {
          $node{$d} = [];
      }
      push(@{$node{$d}}, $s);
  }
}

my %done;
my @queue = ('0008');

for (my $i = 0; $i < scalar(@queue); $i++) {
     my $n = $queue[$i];
#    $done{$n} = 1;
     if ($node{$n}) {
         foreach my $it (@{$node{$n}}) {
              if (!$done{$it}) {
                  print "\"$n\" -> \"$it\";\n";
                  $queue[scalar(@queue)] = $it;
                  $done{$it} = 1;
              }
         }
     }
}
