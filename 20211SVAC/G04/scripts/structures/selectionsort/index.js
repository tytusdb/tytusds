"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var selectionSort = function (data, stepCallback) {
    var copy = __spreadArray([], data);
    var len = data.length;
    var counter = 0;
    for (var i = 0; i < len; i++) {
        var min = i;
        for (var j = i + 1; j < len; j++) {
            if (copy[j] < copy[min])
                min = j;
            if (stepCallback)
                stepCallback(copy, ++counter);
        }
        if (min != i) {
            var tmp = copy[i];
            copy[i] = copy[min];
            copy[min] = tmp;
        }
        if (stepCallback)
            stepCallback(copy, ++counter);
    }
    return copy;
};
