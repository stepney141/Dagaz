use File::Find;

sub proc {
    if ($File::Find::name =~ /\.[^\/]+$/) {
        my $name = $File::Find::name;
        $name =~ s/^\.\///;
        print "git add $name\n";
    }
}

find(\&proc, ("."));
