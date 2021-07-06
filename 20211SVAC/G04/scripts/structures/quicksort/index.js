"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var quickSort = function (arry, stepCallback) {
    var arr = __spreadArray([], arry);
    var counter = 0;
    var stack = [];
    var partition = function (arr, start, end) {
        var _a, _b;
        var pivotValue = arr[end];
        var pivotIndex = start;
        for (var i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                ;
                _a = [arr[pivotIndex], arr[i]], arr[i] = _a[0], arr[pivotIndex] = _a[1];
                pivotIndex++;
            }
            if (stepCallback)
                stepCallback(arr, ++counter);
        }
        ;
        _b = [arr[end], arr[pivotIndex]], arr[pivotIndex] = _b[0], arr[end] = _b[1];
        return pivotIndex;
    };
    stack.push(0);
    stack.push(arr.length - 1);
    while (stack[stack.length - 1] >= 0) {
        var end = stack.pop();
        var start = stack.pop();
        var pivotIndex = partition(arr, start, end);
        if (pivotIndex - 1 > start) {
            stack.push(start);
            stack.push(pivotIndex - 1);
        }
        if (pivotIndex + 1 < end) {
            stack.push(pivotIndex + 1);
            stack.push(end);
        }
        if (stepCallback)
            stepCallback(arr, ++counter);
    }
    return arr;
};
