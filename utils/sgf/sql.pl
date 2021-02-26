my $id = 0;

while (<>) {
  if (/^(\S+\s[wb]):\s(.*)$/) {
      $id++;
      print "insert into game_openings(id, game_id, variant_id, setup_prefix, move_list) values ($id, 30, 31, '$1', '$2');\n";
  }
}
