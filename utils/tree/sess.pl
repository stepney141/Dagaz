use File::Find;

sub proc {
    if ($File::Find::name =~ /\.htm$/) {
        my $name = $_;
        print "$File::Find::name\n";
        open(my $r, '<', $name) or die "Can't open file $name";
        open(my $w, '>', $name . "l");
        while (my $line = <$r>) {
            chomp $line;
            if ($line =~ /move-list-v2/) {
                print $w $line . "\n";
                $line = '<script src="../common-scripts/session-manager.js"></script>';
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
