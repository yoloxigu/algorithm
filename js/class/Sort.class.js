function Sort() {
    var _paramChecked = false,
        _orderBy = 'asc';

    var _checkParam = function(value, orderBy) {
        _paramChecked = true;
        _getValueType(value);
        _getOrderType(orderBy);
    };

    var _getValueType = function (value) {

        if(typeof value === null) {
            return 'null';
        }
        if(typeof value === 'string') {
            return 'string';
        }
        if(typeof value === 'number') {
            return 'number';
        }
        if(Object.prototype.toString.call(value) == '[object Array]') {
            return 'array';
        }
    };

    var _getOrderType = function (orderBy) {
        switch(orderBy) {
            case 'asc':
                _orderBy = 'asc';
                break;
            case 'desc':
                _orderBy = 'desc';
                break;
            default:
                _orderBy = 'asc';
        }
    };

    var _sortByString = function (value) {
        value = value.split('');
        if(_orderBy == 'asc') {
            return _quickSortByArray(value, 'asc');
        } else {
            return _quickSortByArray(value, 'desc');
        }
    };

    var _sortByNumeric = function (value) {
        if(value < 0) {
            value = value.toString().substr(1);
        } else {
            value = value.toString();
        }
        return _sortByString(value.toString());
    };

    var _popSortByArray = function(value) {
        for(var i = 0, len = value.length; i < len; i++) {
            for(var j = len - 1; j > i; j--) {
                if(_orderBy == 'asc'
                    ? value[j] < value[j - 1]
                    : value[j] > value[j - 1]) {
                    var temp = value[j];
                    value[j] = value[j - 1];
                    value[j - 1] = temp;
                }
            }
        }
        return value;
    };

    var _quickSortByArray = function(value) {
        if(value.length <= 1) {
            return value;
        }

        var left = [],
            right = [],
            middle = value[0],
            len = value.length;

        for(var i = 1; i < len; i++) {
            if(_orderBy == 'asc' ? value[i] <= middle : value[i] >= middle) {
                left.push(value[i]);
            } else {
                right.push(value[i]);
            }
        }
        return _quickSortByArray(left)
                .concat(middle, _quickSortByArray(right));
    };

    var _multiSortByArray = function(value) {
        var len = value.length;

        for(var i = 0; i < len; i++) {
            if(Object.prototype.toString.call(value[i]) == '[object Array]') {
                for(var j = 0; j < value[i].length; j++) {
                    value[i] = _quickSortByArray(value[i]);
                }
            }
        }
        return value;
    };

    var _shellSortByArray = function(value) {
        var len = value.length,
            step = Math.floor(len / 2);
        while(step >= 1) {
            for(var i = step; i < len; i++) {
                var temp = value[i];
                var j = 0;
                for(j = i - step; j >= 0 && (_orderBy == 'asc'
                    ? temp < value[j]
                    : temp > value[j]); j = j - step) {
                    value[j + step] = value[j];
                }
                value[j + step] = temp;
            }
            step = Math.floor(step / 2);
        }
        return value;
    };

    this.callSort = function(value, orderBy, sortType) {
        if(!_paramChecked) {
            _checkParam(value, orderBy);
        }

        switch(_getValueType(value)) {
            case 'null':
                return null;
            case 'string':
                return _sortByString(value);
            case 'number':
                return _sortByNumeric(value);
            case 'array':
                switch(sortType) {
                    case 'popSort':
                        return _popSortByArray(value);
                    case 'quickSort':
                        return _quickSortByArray(value);
                    case 'multiSort':
                        return _multiSortByArray(value);
                    case 'shellSort':
                        return _shellSortByArray(value);
                    default:
                        return _quickSortByArray(value);
                }
                break;
            default:
                return 'Put [Array | String | Number] Value Type Please!';
        }
    };
}

Sort.prototype = {
    popSort: function(value, orderBy) {
        return this.callSort(value, orderBy, 'popSort');
    },
    quickSort: function(value, orderBy) {
        return this.callSort(value, orderBy, 'quickSort');
    },
    multiSort: function(value, orderBy) {
        return this.callSort(value,orderBy, 'multiSort');
    },
    shellSort: function(value, orderBy) {
        return this.callSort(value, orderBy, 'shellSort');
    }
};

