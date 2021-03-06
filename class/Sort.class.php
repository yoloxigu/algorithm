<?php
/**
 * This class for array sort
 * @author yoloxigu
 */
class Sort {
    private $valueType;
    private $paramChecked = false;
    private $orderby = 'asc';

    /**
     * @param mixed $value
     * @param string $orderby
     * @return void
     */
    private function checkParam($value, $orderby) {
        $this->paramChecked = true;
        $this->checkValueType($value);
        $this->checkOrderType($orderby);
    }

    /**
     * @param string $value
     * @return void
     */
    private function checkValueType($value) {
        if(is_null($value)) {
            $this->valueType = 'null';
        }
        if(is_string($value)) {
            $this->valueType = 'string';
        }
        if(is_numeric($value)) {
            $this->valueType = 'numeric';
        }
        if(is_array($value)) {
            $this->valueType = 'array';
        }
    }

    /**
     * @param string $orderby
     * @return void
     */
    private function checkOrderType($orderby) {
        switch($orderby) {
            case 'asc':
                $this->orderby = 'asc';
                break;
            case 'desc':
                $this->orderby = 'desc';
                break;
            default:
                $this->orderby = 'asc';
        }
    }

    /**
     * @param string $value
     * @return string
     */
    private function sortByString($value) {
        if($this->orderby == 'asc') {
            return $value;
        } else {
            return strrev($value);
        }
    }

    /**
     * @param numeric $value
     * @return string
     */
    private function sortByNumeric($value) {
        settype($value, 'string');
        return $this->sortByString($value);
    }

    /**
     * @param array $value
     * @return array
     */
    private function popSortByArray($value) {
        if(empty($value)) {
            return 'This array is empty!';
        }
        if(sizeof($value) <= 1) {
            return $value;
        }

        $len = count($value);

        for($i = 0; $i < $len; $i++) {
            for($j = $len - 1; $j > $i; $j--) {
                if($this->orderby == 'asc'
                    ? $value[$j] < $value[$j - 1]
                    : $value[$j] > $value[$j - 1]) {
                    $temp = $value[$j];
                    $value[$j] = $value[$j - 1];
                    $value[$j - 1] = $temp;
                }
            }
        }
        return $value;
    }

    /**
     * @param array $value
     * @return array
     */
    private function quickSortByArray($value) {
        if(sizeof($value) > 1) {
            $k = $value[0];
            $left = array();
            $right = array();
            $len = count($value);

            for($i = 1; $i < $len; $i++) {
                if($this->orderby == 'asc' ? $value[$i] <= $k : $value[$i] >= $k) {
                    $left[] = $value[$i];
                } else {
                    $right[] = $value[$i];
                }
            }

            $left = $this->quickSortByArray($left, $this->orderby);
            $right = $this->quickSortByArray($right, $this->orderby);

            return array_merge($left, array($k), $right);
        } else {
            return $value;
        }
    }

    /**
     * @param mixed $value
     * @param string orderby
     * @param string sortType
     * @return array
     */
    private function callSort($value, $orderby, $sortType) {
        if(!$this->paramChecked) {
            $this->checkParam($value, $orderby);
        }
        switch($this->valueType) {
            case 'null':
                return null;
            case 'string':
                return $this->sortByString($value);
            case 'numeric':
                return $this->sortByNumeric($value);
            case 'array':
                $sortTypeByArray = $sortType . 'ByArray';
                return $this->$sortTypeByArray($value);
            default:
                return 'Put [Array | String | Number] Value Type Please!';
        }
    }

    /**
     * @param mixed $value
     * @param string $orderby
     * @return array
     */
    public function popSort($value, $orderby = 'asc') {
        return $this->callSort($value, $orderby, 'popSort');
    }

    /**
     * @param mixed $value
     * @param string $orderby
     * @return array
     */
    public function quickSort($value, $orderby = 'asc') {
        return $this->callSort($value, $orderby, 'quickSort');
    }
}