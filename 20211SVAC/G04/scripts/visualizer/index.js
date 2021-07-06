"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var sortRuntime = document.getElementById('sort-runtime');
var sortLengthText = document.getElementById('sort-length');
var editor = document.querySelector('.editor > pre > code');
var startButton = document.getElementById('start-btn');
var sortBanner = document.getElementById('sort-banner');
var navBtns = document.querySelectorAll('.nav-btn');
var globalJSONInput = null;
var canvasBannerDif = 20;
var repeatValues = true;
var newNodeValue = '';
var oldNodeValue = '';
var canvasObjectColors = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#009688',
    '#4CAF50',
    '#CDDC39',
    '#FFC107',
    '#FF5722',
];
var resetCanvas = function () {
    if (canvasCtx) {
        xTranslateCounter = 0;
        yTranslateCounter = 0;
        scaleCounter = 0;
        isDragging = false;
        initialPinchDistance = null;
        cameraOffset = { x: width / 2, y: height / 2 };
        dragStart = { x: 0, y: 0 };
        cameraZoom = 1;
        lastZoom = 1;
    }
};
var fileUploadCallback = function () { };
var onChangeUploadInput = function (ev) {
    var input = ev.target;
    var file = input.files ? input.files[0] : null;
    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;
        var json = JSON.parse(typeof text === 'string' ? text : '{}');
        globalJSONInput = json;
        if (globalJSONInput.repeticion)
            repeatValues = globalJSONInput.repeticion;
        if (globalJSONInput.animacion)
            ANIMATION_VELOCITY = globalJSONInput.animacion;
        fileUploadCallback(json);
    };
    if (file) {
        reader.readAsText(file);
        input.value = '';
    }
};
var saveJSONFile = function (valores) {
    var strJSON = JSON.stringify(__assign(__assign({}, globalJSONInput), { valores: valores }));
    var uriData = "data:text/json;charset=utf-8," + encodeURIComponent(strJSON);
    var a = document.createElement('a');
    a.href = uriData;
    a.download = 'data.json';
    a.innerHTML = 'download JSON';
    a.click();
    hideNavMenu(0);
};
var onChangeSortVelocity = function (ev) {
    var target = ev.target;
    ANIMATION_VELOCITY = +target.value;
};
var removeBanner = function () {
    if (startButton && sortBanner) {
        setTimeout(function () {
            var btnRect = startButton.getBoundingClientRect().bottom;
            var bannerRect = sortBanner.getBoundingClientRect().top + 24;
            if (btnRect - bannerRect > canvasBannerDif)
                sortBanner.style.display = 'none';
        }, 100);
    }
};
var setRuntimeText = function (ms) {
    if (sortRuntime)
        sortRuntime.textContent = ms.toFixed(3) + "ms";
};
var setElementsLength = function (length) {
    if (sortLengthText)
        sortLengthText.textContent = length.toString();
};
var addTestCode = function (method, value) {
    if (editor)
        editor.innerHTML =
            editor.innerHTML +
                ("\ndata.<strong style=\"color: var(--monoFuncGreen)\">" + method + "</strong>(<strong style=\"color: var(--lightPurple)\">" + value + "</strong>)");
};
var inputsMenuSwitcher = Array.prototype.slice
    .call(navBtns)
    .map(function (element) {
    return element.previousElementSibling;
})
    .filter(Boolean);
navBtns.forEach(function (navElement, navIndex) {
    return navElement.addEventListener('click', function () {
        return inputsMenuSwitcher.forEach(function (inputElement, inpIndex) {
            if (navIndex !== inpIndex)
                inputElement.checked = false;
        });
    });
});
var hideNavMenu = function (index) {
    inputsMenuSwitcher.forEach(function (inputElement, inpIndex) {
        if (index === inpIndex)
            inputElement.checked = false;
    });
};
var saveNewNodeValue = function (ev) {
    var target = ev.target;
    newNodeValue = target.value;
};
var saveOldNodeValue = function (ev) {
    var target = ev.target;
    oldNodeValue = target.value;
};
var changeRepeatValues = function (ev) {
    var target = ev.target;
    repeatValues = target.checked;
};
removeBanner();
