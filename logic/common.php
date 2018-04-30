<?php
/**
 * getAcademicCalendar
 * function to get the list of month-year between given start and end
 * start --> starting month year
 * end --> ending month year
 */
    function getAcademicCalendar($start,$end){
//start        
        $start_month = getMonth($start);
        $start_year = getYear($start);
//end
        $end_month = getMonth($end);
        $end_year = getYear($end);
//formulated        
        $begin = new DateTime($start_year."-".$start_month."-01");
        $finish = new DateTime($end_year."-".$end_month."-01");

        $interval = DateInterval::createFromDateString('1 month');

        $period   = new DatePeriod($begin, $interval, $finish);

        $data = array();
        foreach ($period as $dt) {
            $data[] = array("month"=> $dt->format("M"),"year"=>$dt->format("Y"));
        }

        $monthNum  = $end_month;
        $dateObj   = DateTime::createFromFormat('!m', $monthNum);
        $monthName = $dateObj->format('M'); // March

        $last = array('month'=>$monthName,'year'=>$end_year);
        array_push($data,$last);

        return $data;

    }

    function getMonth($date){
        $month =1;
        if($date !==""){
            $chunk = explode("-",$date);
            $month = $chunk[0];
        }
        return $month;
    }
    function getYear($date){
        $year = date("Y");
        if($date !==""){
            $chunk = explode("-",$date);
            $year = $chunk[1];
        }
        return $year;
    }
?>