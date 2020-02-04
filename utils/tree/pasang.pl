use File::Find;

sub proc {
    if ($File::Find::name =~ /\.htm$/) {
        my $name = $_;
        print "$File::Find::name\n";
        open(my $r, '<', $name) or die "Can't open file $name";
        open(my $w, '>', $name . "l");
        while (my $line = <$r>) {
            chomp $line;
            if ($line =~ /href=\"pasang-(\d+(-board)?)/) {
                my $n = $1;
                $line = '<tr><td><a href="javascript:Dagaz.Controller.undo()" style="display:none" id="undo"><img src="../images/undo.png"/></a>';
                print $w $line . "\n";
                $line = 'Traditional - Brunei (<a href="https://en.wikipedia.org/wiki/Pasang_(game)">rules</a>) <a href="pasang-' . $n . '.htm">no AI</a>';
                print $w $line . "\n";
                $line = '<a href="javascript:Dagaz.Controller.redo()" style="display:none" id="redo"><img src="../images/redo.png"/></a></td></tr>';
            }
            print $w $line . "\n";
        }
        close($w);
        close($r);
        unlink($name);
        rename($name . "l", $name);
    }
}

find(\&proc, ("."));
