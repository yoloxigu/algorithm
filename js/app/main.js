define(["jquery", "Sort"], function() {
    var arr = [11, 77, 23, 26, 97, 77, 45, 27, 34, 2, 1, 3];
    //var arr = ['ac', 'ba', 'ab', 'g', 'h', 'z', 'x', 'y', 'n', 'm'];
    var sort = new Sort();
    var sorted = sort.quickSort(arr, 'desc');
    var str = sorted.join(' ');
    console.log(str);
});
