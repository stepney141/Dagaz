use File::Find;

sub proc {
    if ($File::Find::name =~ /\.htm$/) {
        my $name = $_;
        print "$File::Find::name\n";
        open(my $r, '<', $name) or die "Can't open file $name";
        open(my $w, '>', $name . "l");
        my $esc = 0;
        while (my $line = <$r>) {
            chomp $line;
            if ($esc == 1) {
                $esc = 0;
                next;
            }
            if ($line =~ /analytics/) {
                $esc = 1;
                next;
            }
            if ($line =~ /underscore/) {
                $line = '<script src="../underscore/underscore-min.js"></script>';
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
