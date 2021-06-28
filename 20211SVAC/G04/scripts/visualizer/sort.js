"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var BAR_MARGIN = 10;
var BAR_WIDTH = 5;
var BAR_HEIGHT = 300;
canvasBannerDif = 60;
var globalSortData = [
    4, 1, 13, 2, 15, 3, 8, 9, 5, 11, 14, 6, 18, 12, 7,
];
var allStrings = false;
var globalCopyStringData = [];
var globalCopySortData = __spreadArray([], globalSortData);
var globalSortLength = globalSortData.length;
var sortBarWidth = (BAR_WIDTH / globalSortLength) * 100;
var maxSortDataValue = Math.max.apply(Math, globalSortData);
var sortBarHeight = BAR_HEIGHT / Math.max(0.5, maxSortDataValue);
var fontSize = 25;
var fontY = 20;
var codeDataArray = document.getElementById('code-data-array');
var sortStepText = document.getElementById('sort-step-text');
var sortPerformance = document.getElementById('sort-performance');
var sortMethod = function () { return null; };
var saveSortJSONFile = function () {
    return saveJSONFile(allStrings
        ? globalSortData.map(function (wIndex) { return globalCopyStringData[wIndex - 1]; })
        : globalSortData);
};
fileUploadCallback = function (json) {
    var valores = json.valores;
    globalCopySortData = valores;
    globalSortData = valores;
    globalSortLength = valores.length;
    sortBarWidth = (BAR_WIDTH / valores.length) * 100;
    maxSortDataValue = Math.max.apply(Math, valores);
    sortBarHeight = BAR_HEIGHT / Math.max(0.5, maxSortDataValue);
    if (globalSortLength > 0 && globalSortLength <= 10) {
        fontSize = 25;
        fontY = 20;
    }
    else if (globalSortLength > 10 && globalSortLength <= 15) {
        fontSize = 25;
        fontY = 20;
    }
    else if (globalSortLength > 15 && globalSortLength <= 30) {
        fontSize = 17;
        fontY = 27;
    }
    else if (globalSortLength > 30 && globalSortLength <= 50) {
        fontSize = 13;
        fontY = 35;
    }
    else {
        fontSize = 13;
        fontY = 35.5;
    }
    allStrings = valores.every(function (valor) { return typeof valor === 'string'; });
    if (allStrings) {
        var sortedStrings_1 = __spreadArray([], valores).sort(function (a, b) {
            return a.localeCompare(b);
        });
        globalCopyStringData = sortedStrings_1;
        var unSortedStrings = valores.map(function (valor) { return sortedStrings_1.indexOf(valor) + 1; });
        globalCopySortData = globalSortData = unSortedStrings;
        globalSortLength = unSortedStrings.length;
        sortBarWidth = (BAR_WIDTH / unSortedStrings.length) * 100;
        maxSortDataValue = Math.max.apply(Math, unSortedStrings);
        sortBarHeight = BAR_HEIGHT / Math.max(0.5, maxSortDataValue);
    }
    if (codeDataArray)
        codeDataArray.textContent = valores.join(', ');
    if (sortStepText)
        sortStepText.textContent = '0';
    if (sortPerformance)
        sortPerformance.textContent = '0%';
    removeBanner();
    setSortRuntime();
    setElementsLength(globalSortLength);
};
drawInCanvas = function () {
    if (canvasCtx) {
        canvasCtx.clearRect(0, 0, width, height);
        for (var barIndex = 0; barIndex < globalSortLength; barIndex++) {
            canvasCtx.fillStyle =
                canvasObjectColors[barIndex > canvasObjectColors.length - 1
                    ? barIndex -
                        canvasObjectColors.length *
                            Math.floor(barIndex / canvasObjectColors.length)
                    : barIndex];
            var rectX = sortBarWidth * barIndex + BAR_MARGIN * (barIndex + 1) - width / 2 + 20;
            var rectY = -(sortBarHeight * globalSortData[barIndex]) + 138;
            var rectH = sortBarHeight * globalSortData[barIndex];
            var fontHeight = fontSize - globalSortData[barIndex].toString().length * 2;
            canvasCtx.fillRect(rectX, rectY, sortBarWidth, rectH);
            var barValue = allStrings
                ? globalCopyStringData[globalSortData[barIndex] - 1]
                : globalSortData[barIndex].toString();
            canvasCtx.save();
            if (allStrings) {
                canvasCtx.translate(rectX * 2 - rectX - 142, 180 + rectX - fontY + 7);
                canvasCtx.rotate(-Math.PI / 2);
            }
            canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc';
            canvasCtx.font = "bold " + fontHeight + "px Montserrat";
            canvasCtx.textAlign = allStrings ? 'right' : 'center';
            canvasCtx.fillText(barValue, rectX + sortBarWidth / 2, 185 - fontY);
            canvasCtx.restore();
        }
    }
};
var startSorting = function () {
    sortMethod(globalSortData, function (newSortData, step) {
        var tmpSortData = __spreadArray([], newSortData);
        setTimeout(function () {
            globalSortData = tmpSortData;
            if (sortStepText)
                sortStepText.textContent = step.toString();
            if (sortPerformance)
                sortPerformance.textContent = ((globalSortLength / step) *
                    100).toFixed(2) + "%";
        }, step * (30 - ANIMATION_VELOCITY));
    });
};
var setSortRuntime = function () {
    var t0 = performance.now();
    sortMethod(globalSortData);
    var tf = performance.now();
    setRuntimeText(tf - t0);
};
var restartSortedData = function () {
    resetCanvas();
    globalSortData = globalCopySortData;
};
setSortRuntime();
