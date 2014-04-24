function Sort() {
    this.counter = 0;
}
/*
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
                this.counter++;
            } else {
                right.push(arr[i]);
                this.counter++;
            }
        }

        left = this.quickSort(left, orderby);
        right = this.quickSort(right, orderby);

        return left.concat(middle, right);
    }
};
*/

Sort.prototype.quickSort = function(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        var sortby;
        switch(arguments[1]) {
            case arguments[1] === undefined:
                sortby = 'aesc';
                break;
            case arguments[1] === 'aesc':
                break;
            case arguments[1] === 'desc':
                break;
            default:
                sortby = 'aesc';
        }

        var pivotIndex = Math.floor(arr.length / 2),
            pivot = arguments[0].splice(pivotIndex, 1)[0],
            left = [],
            right = [];

        for(var i = 0; i < arr.length; i++) {
            if(arr[i] <= pivot) {
                left.push(arr[i]);
                this.counter++;
            } else {
                right.push(arr[i]);
                this.counter++;
            }
        }
        return this.quickSort(left).concat(pivot, this.quickSort(right));
};