/*
 * js/class/Sort.class.js
 */
function Sort() {}

Sort.prototype.quickSort = function(arr) {

	if (arr.length <= 1) {
        return arr;
    }
    
    var orderby = arguments[1];
    
    switch(orderby) {
        case undefined:
            orderby = 'aesc';
            break;
        case 'aesc':
            break;
        case 'desc':
            break;
        default:
            orderby = 'aesc';
    }
    
    if (arr.length > 1) {
        var left = [],
            right = [],
            middle = arr[0],
            len = arr.length;
            
        for(var i = 1; i < len; i++) {
            if (orderby == 'aesc' ? arr[i] <= middle : arr[i] >= middle) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        
        return this.quickSort(left).concat(middle, this.quickSort(right));
    }
};

/*
 * class/Sort.class.php
 */
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