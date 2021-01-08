my $id = 1;

while (<>) {
  if (/-\s+([^:]+):\s+(\S+)/) {
      my $fen   = $1;
      my $moves = $2;
      $moves =~ s/(\d)-(\w)/\1 \2/g;
      $moves =~ s/(\w\d)(\w\d)/\1-\2/g;
      print "insert into game_debuts(id, game_id, variant_id, setup_prefix, move_list) values($id, 30, 31, '$fen', '$moves');\n";
      $id++;
  }
}
