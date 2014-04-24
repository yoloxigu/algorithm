<?php
class Sort {
    public function quickSort($arr, $orderby = 'aesc') {
        if(sizeof($arr) > 1) {
            $k = $arr[0];
            $x = array();
            $y = array();
            $_size = count($arr);

            switch($orderby) {
                case Null:
                    $orderby = 'aesc';
                    break;
                case 'aesc':
                    break;
                case 'desc':
                    break;
                default:
                    $orderby = 'aesc';
                    break;
            }

            for($i = 1; $i < $_size; $i++) {
                if($orderby == 'aesc' ? $arr[$i] <= $k : $arr[$i] >= $k) {
                    $x[] = $arr[$i];
                } else {
                    $y[] = $arr[$i];
                }
            }

            $x = $this->quickSort($x, $orderby);
            $y = $this->quickSort($y, $orderby);

            return array_merge($x, array($k), $y);
        } else {
            return $arr;
        }
    }
} 