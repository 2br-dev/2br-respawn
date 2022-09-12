<?php  return '$new_year = (int)date("Y");
$start_year = 2021;

if( $new_year <> $start_year ){
    echo "$start_year - $new_year";
}else{
    echo $new_year;
}
return;
';