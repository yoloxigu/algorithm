function Sort() {
    this.arr = [];
    this.paramChecked = false;
    this.haveParam = true;
    this.isArray = false;
    this.isString = false;
    this.isNumeric = false;
    this.orderby = 'asc';
    this.message = '';
}

Sort.prototype = {
    checkParam: function(arguments) {
        this.paramChecked = true;
        if(arguments.length == 0) {
            this.haveParam = false;
            return this.message = 'Have not a param at invoked!';
        }

        if(arguments[0] instanceof Array) {
            this.isArray = true;
        }

        if(typeof arguments[0] == 'string') {
            this.isString = true;
        }

        if(typeof arguments[0] == 'number') {
            this.isNumeric = true;
        }

        switch(arguments[1]) {
            case undefined:
                return this.orderby = 'asc';
            case 'asc':
                return this.orderby = 'asc';
            case 'desc':
                return this.orderby = 'desc';
            default:
                return this.orderby = 'asc';
        }
    },
    popSort: function(value, orderby) {
        if(!this.paramChecked) {
            this.checkParam(arguments);
        }

        if(!this.haveParam) {
            return this.message;
        }

        if(this.isNumeric) {
            if(value < 0) {
                value = value.toString().substr(1).split('');
                this.isNumeric = false;
            } else {
                value = value.toString().split('');
                this.isNumeric = false;
            }
        }

        if(this.isString) {
            value = value.split('');
            this.isString = false;
        }

        if(value.length <= 1) {
            return value;
        }

        for(var i = 0, len = value.length; i < len; i++) {
            for(var j = len - 1; j > i; j--) {
                if(this.orderby == 'asc' ? value[j] < value[j - 1] : value[j] > value[j - 1]) {
                   var temp = value[j];
                       value[j] = value[j - 1];
                       value[j - 1] = temp;
                }
            }
        }
        return value;
    },
    quickSort: function(value, orderby) {
        if(!this.paramChecked) {
            this.checkParam(arguments);
        }

        if(!this.haveParam) {
            return this.message;
        }

        if(this.isNumeric) {
            if(value < 0) {
                value = value.toString().substr(1).split('');
                this.isNumeric = false;
            } else {
                value = value.toString().split('');
                this.isNumeric = false;
            }
        }

        if(this.isString) {
            value = value.split('');
            this.isString = false;
        }

        if(value.length <= 1) {
            return value;
        }

        var left = [],
            right = [],
            middle = value[0],
            len = value.length;

        for(var i = 1; i < len; i++) {
            if (this.orderby == 'asc' ? value[i] <= middle : value[i] >= middle) {
                left.push(value[i]);
            } else {
                right.push(value[i]);
            }
        }
        return this.quickSort(left, this.orderby).concat(middle, this.quickSort(right, this.orderby));
    }
};