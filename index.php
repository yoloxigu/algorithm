<?php
include_once "./class/Sort.class.php";

$sort = new Sort();
$arr = array(7,2,4,3,8,1,9,6,5,0,77,34,23,78,56);
//$arr = array('ac', 'ba', 'ab', 'g', 'h', 'z', 'x', 'y', 'n', 'm');
$arr = $sort->quickSort($arr, 'desc');
$str = implode(' ', $arr);
echo $str;

//print_r($arr);