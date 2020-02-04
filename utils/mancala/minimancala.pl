my %done;
my @queue = ('2222');


for (my $i = 0; $i < scalar(@queue); $i++) {
     $done{$queue[$i]} = 1;
     if ($queue[$i] =~ /(\d)(\d)(\d)(\d)/) {
         my @board = ($1, $2, $3, $4);
         my $ix = 0; my $cn = $board[$ix]; $board[$ix] = 0;
         if ($cn > 0) {
             while ($cn > 0) {
                $ix++;
                if ($ix > 3) {
                    $ix = 0;
                }
                $board[$ix]++;
                $cn--;
             }
             my $rs = $board[2] . $board[3] . $board[0] . $board[1];
             print "\"$queue[$i]\" -> \"$rs\";\n";
             if (!$done{$rs}) {
                 $queue[scalar(@queue)] = $rs;
                 $done{$rs} = 1;
             }
         }
     }
     if ($queue[$i] =~ /(\d)(\d)(\d)(\d)/) {
         my @board = ($1, $2, $3, $4);
         my $ix = 1; my $cn = $board[$ix]; $board[$ix] = 0;
         if ($cn > 0) {
             while ($cn > 0) {
                $ix++;
                if ($ix > 3) {
                    $ix = 0;
                }
                $board[$ix]++;
                $cn--;
             }
             my $rs = $board[2] . $board[3] . $board[0] . $board[1];
             print "\"$queue[$i]\" -> \"$rs\";\n";
             if (!$done{$rs}) {
                 $queue[scalar(@queue)] = $rs;
                 $done{$rs} = 1;
             }
         }
     }
}
