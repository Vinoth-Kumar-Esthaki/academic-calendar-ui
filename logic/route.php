<?php
    include 'common.php';
    
    $start ="05-2018";
    $end ="02-2019";

    $calendar_data = getAcademicCalendar($start,$end);

    $output = json_encode($calendar_data);

    echo $output;
    return $output;
    
    
?>