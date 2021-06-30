"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var bubbleSort = function (data, stepCallback) {
    var copy = __spreadArray([], data);
    var len = data.length;
    var counter = 0;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - i - 1; j++) {
            if (copy[j] > copy[j + 1]) {
                var temp = copy[j];
                copy[j] = copy[j + 1];
                copy[j + 1] = temp;
            }
            if (stepCallback)
                stepCallback(copy, ++counter);
        }
        if (stepCallback)
            stepCallback(copy, ++counter);
    }
    return copy;
};
