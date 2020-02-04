my $f = 0;

while (<>) {
   chomp;
   my $str = $_;
   if ($str =~ /<\/g>/) {
       if ($f > 0) {
           print "</a>\n";
       }
       $f = 0;
   }
   print "$str\n";
   if ($str =~ /<title>S?(\d)(\d)(\d)(\d)<\/title>/) {
       print "<a xlink:href=\"mini-mancala.htm?setup=0:2=$4;0:2=$3;0:1=$1;0:1=$2;;&amp;turn=0\">\n";
       $f = 1;
   }
   if ($str =~ /<title>N(\d)(\d)(\d)(\d)<\/title>/) {
       print "<a xlink:href=\"mini-mancala.htm?setup=0:2=$2;0:2=$1;0:1=$3;0:1=$4;;&amp;turn=1\">\n";
       $f = 1;
   }
}
