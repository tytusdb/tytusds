"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var insertionSort = function (data, stepCallback) {
    var copy = __spreadArray([], data);
    var len = data.length;
    var counter = 0;
    for (var i = 1; i < len; i++) {
        var current = copy[i];
        var j = i - 1;
        while (j > -1 && current < copy[j]) {
            copy[j + 1] = copy[j];
            j--;
            if (stepCallback)
                stepCallback(copy, ++counter);
        }
        copy[j + 1] = current;
        if (stepCallback)
            stepCallback(copy, ++counter);
    }
    return copy;
};
