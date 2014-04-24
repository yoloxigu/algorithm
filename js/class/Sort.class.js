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