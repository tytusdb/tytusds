"use strict";
var canvas = document.getElementById('canvas');
var canvasCtx = canvas.getContext('2d');
var width = window.innerWidth - 60;
var height = window.innerHeight - 160;
var cameraOffset = {
    x: width / 2,
    y: height / 2,
};
var cameraZoom = 1;
var MAX_ZOOM = 5;
var MIN_ZOOM = 0.1;
var SCROLL_SENSITIVITY = 0.003;
var ANIMATION_VELOCITY = 5;
var isDragging = false;
var dragStart = { x: 0, y: 0 };
var initialPinchDistance = null;
var lastZoom = cameraZoom;
var drawInCanvas = function () { };
var enableTranslate = false;
var xTranslateCounter = 0;
var yTranslateCounter = 0;
var xTranslate = 0;
var yTranslate = 0;
var enableZoom = false;
var scaleCounter = 0;
var animScale = 0;
var canvasTranslateEndCallback = function () { };
var canvasZoomEndCallback = function () { };
var draw = function () {
    canvas.width = width;
    canvas.height = height;
    if (canvasCtx) {
        if (enableTranslate) {
            if (xTranslate !== 0) {
                if (xTranslateCounter < Math.abs(xTranslate))
                    xTranslateCounter += ANIMATION_VELOCITY;
                else {
                    canvasTranslateEndCallback();
                    enableTranslate = false;
                }
            }
            if (yTranslate !== 0) {
                if (yTranslateCounter < Math.abs(yTranslate))
                    yTranslateCounter += ANIMATION_VELOCITY;
                else {
                    canvasTranslateEndCallback();
                    enableTranslate = false;
                }
            }
        }
        if (enableZoom) {
            if (scaleCounter < animScale)
                scaleCounter += 0.05;
            else {
                canvasZoomEndCallback();
                enableZoom = false;
            }
        }
        canvasCtx.translate(xTranslateCounter * -1.25 * (xTranslate < 0 ? -1 : 1), yTranslateCounter * -1.25 * (yTranslate < 0 ? -1 : 1));
        canvasCtx.translate(width / 2, height / 2);
        canvasCtx.scale(cameraZoom + scaleCounter * 1.25, cameraZoom + scaleCounter * 1.25);
        canvasCtx.translate(-width / 2 + cameraOffset.x, -height / 2 + cameraOffset.y);
        drawInCanvas();
        requestAnimationFrame(draw);
    }
};
var getEventLocation = function (event) {
    if (event.touches && event.touches.length == 1) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    else if (event.clientX && event.clientY) {
        return { x: event.clientX, y: event.clientY };
    }
    else
        return { x: 0, y: 0 };
};
var onCanvasPointerDown = function (event) {
    isDragging = true;
    dragStart.x = getEventLocation(event).x / cameraZoom - cameraOffset.x;
    dragStart.y = getEventLocation(event).y / cameraZoom - cameraOffset.y;
};
var onCanvasPointerUp = function (_event) {
    isDragging = false;
    initialPinchDistance = null;
    lastZoom = cameraZoom;
};
var onCanvasPointerMove = function (event) {
    if (isDragging) {
        cameraOffset.x = getEventLocation(event).x / cameraZoom - dragStart.x;
        cameraOffset.y = getEventLocation(event).y / cameraZoom - dragStart.y;
    }
};
var handleCanvasTouch = function (event, singleTouchHandler) {
    if (event.touches.length == 1)
        singleTouchHandler(event);
    else if (event.type == 'touchmove' && event.touches.length == 2) {
        isDragging = false;
        handleCanvasPinch(event);
    }
};
var handleCanvasPinch = function (event) {
    event.preventDefault();
    var touch1 = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
    };
    var touch2 = {
        x: event.touches[1].clientX,
        y: event.touches[1].clientY,
    };
    var currentDistance = Math.pow((touch1.x - touch2.x), 2) + Math.pow((touch1.y - touch2.y), 2);
    if (initialPinchDistance == null)
        initialPinchDistance = currentDistance;
    else
        adjustCanvasZoom(null, currentDistance / initialPinchDistance);
};
var adjustCanvasZoom = function (zoomAmount, zoomFactor) {
    if (!isDragging) {
        if (zoomAmount)
            cameraZoom += zoomAmount;
        else if (zoomFactor)
            cameraZoom = zoomFactor * lastZoom;
        cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
        cameraZoom = Math.max(cameraZoom, MIN_ZOOM);
    }
};
canvas.addEventListener('mousedown', function (event) {
    return onCanvasPointerDown(event);
});
canvas.addEventListener('touchstart', function (event) {
    return handleCanvasTouch(event, onCanvasPointerDown);
});
canvas.addEventListener('mouseup', onCanvasPointerUp);
canvas.addEventListener('touchend', function (event) {
    return handleCanvasTouch(event, onCanvasPointerUp);
});
canvas.addEventListener('mousemove', function (event) {
    return onCanvasPointerMove(event);
});
canvas.addEventListener('touchmove', function (event) {
    return handleCanvasTouch(event, onCanvasPointerMove);
});
canvas.addEventListener('wheel', function (event) {
    return adjustCanvasZoom(event.deltaY * SCROLL_SENSITIVITY);
});
draw();
CanvasRenderingContext2D.prototype.arrow = function (x, y, distance, width, down, left, double) {
    var lineWidth = width || 4;
    this.lineWidth = lineWidth;
    this.moveTo(x, y);
    this.quadraticCurveTo(x + distance / 2, y + (distance / 2) * (down ? 1 : -1), x + distance, y);
    this.strokeStyle = this.fillStyle;
    this.stroke();
    if (!left || double) {
        this.beginPath();
        this.lineWidth = 1;
        if (!down) {
            this.moveTo(x + distance - 5, y + 5);
            this.lineTo(x + distance + 5, y - 5);
            this.lineTo(x + distance + 5, y + 5);
        }
        else {
            this.moveTo(x + distance + 5, y + 5);
            this.lineTo(x + distance - 5, y - 5);
            this.lineTo(x + distance + 5, y - 5);
        }
        this.stroke();
        this.fill();
        this.closePath();
    }
    if (left || double) {
        this.beginPath();
        this.lineWidth = 1;
        if (!down) {
            this.moveTo(x - 5, y - 5);
            this.lineTo(x + 5, y + 5);
            this.lineTo(x - 5, y + 5);
        }
        else {
            this.moveTo(x - 5, y + 5);
            this.lineTo(x + 5, y - 5);
            this.lineTo(x - 5, y - 5);
        }
        this.stroke();
        this.fill();
        this.closePath();
    }
};
CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
    if (radius === void 0) { radius = 5; }
    var localRadius = {
        tl: 5,
        tr: 5,
        br: 5,
        bl: 5,
    };
    if (typeof radius === 'number') {
        localRadius = { tl: radius, tr: radius, br: radius, bl: radius };
    }
    else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius)
            localRadius[side] = localRadius[side] || defaultRadius[side];
    }
    this.moveTo(x + localRadius.tl, y);
    this.lineTo(x + width - localRadius.tr, y);
    this.quadraticCurveTo(x + width, y, x + width, y + localRadius.tr);
    this.lineTo(x + width, y + height - localRadius.br);
    this.quadraticCurveTo(x + width, y + height, x + width - localRadius.br, y + height);
    this.lineTo(x + localRadius.bl, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - localRadius.bl);
    this.lineTo(x, y + localRadius.tl);
    this.quadraticCurveTo(x, y, x + localRadius.tl, y);
};
var translateCanvasTo = function (x, y, callback) {
    if (callback)
        canvasTranslateEndCallback = callback;
    enableTranslate = true;
    xTranslate = x;
    yTranslate = y;
};
var zoomCanvasTo = function (scale, callback) {
    if (callback)
        canvasZoomEndCallback = callback;
    enableZoom = true;
    animScale = scale;
};
