<?php
$sql = "select id from modx_site_content where parent=2 and published=1 order by rand()";
$result = $modx->query($sql);

$all_rows = [];

while( $row = $result->fetch(PDO::FETCH_ASSOC) ){
    $all_rows[] = $row['id'];
}

$cases_arr = array_slice( $all_rows, 0, 12 );
$cases_ids = implode(',', $cases_arr);

return $cases_ids;
return;
