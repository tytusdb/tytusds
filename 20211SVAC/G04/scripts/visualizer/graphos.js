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
var enableAddNode = false;
var enableAddEdge = false;
var selectedFirstEdge = 0;
var mouseIsDown = false;
var tmpGraphoNode = null;
var edgesArray = [];
var nodesArray = [
    {
        x: 0,
        y: 0,
        value: '1',
    },
];
var getNodesDistance = function (x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
drawInCanvas = function () {
    if (canvasCtx) {
        for (var edgeIndex = 0; edgeIndex < edgesArray.length; edgeIndex++) {
            var currentEdge = edgesArray[edgeIndex];
            if (currentEdge.dest) {
                canvasCtx.beginPath();
                canvasCtx.strokeStyle = currentEdge.origin.color;
                canvasCtx.lineWidth = 5;
                canvasCtx.moveTo(currentEdge.origin.x, currentEdge.origin.y);
                if (currentEdge.dest.isDouble) {
                    var midX = (currentEdge.dest.x + currentEdge.origin.x) / 2;
                    var midY = (currentEdge.dest.y + currentEdge.origin.y) / 2;
                    var deltaX = currentEdge.dest.x - currentEdge.origin.x;
                    var deltaY = currentEdge.dest.y - currentEdge.origin.y;
                    var distance = getNodesDistance(currentEdge.origin.x, currentEdge.dest.x, currentEdge.origin.y, currentEdge.dest.y);
                    var randPhase = currentEdge.dest.randPhase;
                    canvasCtx.quadraticCurveTo(midX +
                        (Math.abs(deltaY) > Math.abs(deltaX) ? distance / 2 : 0) *
                            randPhase, midY +
                        +(Math.abs(deltaX) > Math.abs(deltaY) ? distance / 2 : 0) *
                            randPhase, currentEdge.dest.x, currentEdge.dest.y);
                }
                else
                    canvasCtx.lineTo(currentEdge.dest.x, currentEdge.dest.y);
                canvasCtx.stroke();
                canvasCtx.closePath();
            }
        }
        for (var nodeIndex = 0; nodeIndex < nodesArray.length; nodeIndex++) {
            var currentColorIndex = nodeIndex > canvasObjectColors.length - 1
                ? nodeIndex -
                    canvasObjectColors.length *
                        Math.floor(nodeIndex / canvasObjectColors.length)
                : nodeIndex;
            var currentNode = nodesArray[nodeIndex];
            canvasCtx.strokeStyle = canvasObjectColors[currentColorIndex];
            canvasCtx.beginPath();
            canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)';
            canvasCtx.lineWidth = 7;
            canvasCtx.arc(currentNode.x, currentNode.y, 25, 0, 2 * Math.PI);
            canvasCtx.stroke();
            canvasCtx.fill();
            canvasCtx.closePath();
            if (tmpGraphoNode !== null) {
                if (enableAddNode) {
                    canvasCtx.beginPath();
                    canvasCtx.strokeStyle =
                        canvasObjectColors[nodeIndex + 1 > canvasObjectColors.length - 1
                            ? nodeIndex +
                                1 -
                                canvasObjectColors.length *
                                    Math.floor(nodeIndex + 1 / canvasObjectColors.length)
                            : nodeIndex + 1];
                    canvasCtx.fillStyle = isDarkMode
                        ? 'rgba(170, 170, 170, .7)'
                        : 'rgba(248, 248, 248, .7)';
                    canvasCtx.lineWidth = 7;
                    canvasCtx.arc(tmpGraphoNode.x, tmpGraphoNode.y, 15, 0, 2 * Math.PI);
                    canvasCtx.stroke();
                    canvasCtx.fill();
                    canvasCtx.closePath();
                }
                else if (enableAddEdge) {
                    if (edgesArray[edgesArray.length - 1] && selectedFirstEdge !== -1) {
                        canvasCtx.beginPath();
                        canvasCtx.strokeStyle = edgesArray[selectedFirstEdge].origin.color;
                        canvasCtx.lineWidth = 5;
                        canvasCtx.moveTo(edgesArray[selectedFirstEdge].origin.x, edgesArray[selectedFirstEdge].origin.y);
                        canvasCtx.lineTo(tmpGraphoNode.x, tmpGraphoNode.y);
                        canvasCtx.stroke();
                        canvasCtx.closePath();
                    }
                }
            }
            canvasCtx.beginPath();
            canvasCtx.textAlign = 'center';
            canvasCtx.textBaseline = 'middle';
            canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc';
            canvasCtx.font = "bold " + (20 - currentNode.value.toString().length * 2.5) + "px Montserrat";
            canvasCtx.fillText(currentNode.value, currentNode.x, currentNode.y - 45);
            canvasCtx.closePath();
        }
    }
};
var addNodeOnGraphos = function () {
    if (newNodeValue.length > 0) {
        hideNavMenu(1);
        enableAddNode = true;
    }
};
var removeTmpGraphoNode = function () { return (mouseIsDown = false); };
canvas.addEventListener('mouseup', removeTmpGraphoNode);
canvas.addEventListener('touchend', removeTmpGraphoNode);
canvas.addEventListener('mousemove', function (ev) {
    if (enableAddNode || enableAddEdge) {
        tmpGraphoNode = {
            x: ev.clientX / cameraZoom - cameraOffset.x - 30,
            y: ev.clientY / cameraZoom - cameraOffset.y - 80,
            value: newNodeValue,
        };
    }
    mouseIsDown = false;
});
canvas.addEventListener('mousedown', function (ev) {
    mouseIsDown = true;
    setTimeout(function () {
        if (mouseIsDown) {
            if (enableAddNode) {
                ev.preventDefault();
                tmpGraphoNode = {
                    x: ev.clientX / cameraZoom - cameraOffset.x - 30,
                    y: ev.clientY / cameraZoom - cameraOffset.y - 80,
                    value: newNodeValue,
                };
                nodesArray.push(tmpGraphoNode);
                enableAddNode = false;
                tmpGraphoNode = null;
            }
        }
    }, 500);
});
var addEdgeOnGraphos = function () {
    hideNavMenu(1);
    enableAddEdge = true;
};
canvas.addEventListener('click', function (ev) {
    if (enableAddEdge) {
        var selectedNodeIndex = 0;
        var selectedNode_1 = null;
        var currentPosition = {
            x: ev.clientX / cameraZoom - cameraOffset.x - 30,
            y: ev.clientY / cameraZoom - cameraOffset.y - 80,
            value: newNodeValue,
        };
        var lastEdge_1 = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1] : null;
        for (var nodeIndex = 0; nodeIndex < nodesArray.length; nodeIndex++) {
            var currentNode = nodesArray[nodeIndex];
            if (currentPosition.x <= currentNode.x + 25 &&
                currentPosition.x >= currentNode.x - 25 &&
                currentPosition.y <= currentNode.y + 25 &&
                currentPosition.y >= currentNode.y - 25) {
                selectedNodeIndex = nodeIndex;
                selectedNode_1 = __assign(__assign({}, currentNode), { color: '', isDouble: false, randPhase: 1 });
                break;
            }
        }
        if (selectedNode_1 !== null) {
            if (lastEdge_1 === null || lastEdge_1.dest !== null) {
                selectedNode_1.color =
                    canvasObjectColors[selectedNodeIndex > canvasObjectColors.length - 1
                        ? selectedNodeIndex -
                            canvasObjectColors.length *
                                Math.floor(selectedNodeIndex / canvasObjectColors.length)
                        : selectedNodeIndex];
                edgesArray.push({ origin: selectedNode_1, dest: null });
                selectedFirstEdge = edgesArray.length - 1;
            }
            else {
                var isJoinAdded = edgesArray.some(function (edge) {
                    var _a, _b, _c, _d;
                    return ((_a = edge.dest) === null || _a === void 0 ? void 0 : _a.x) === (lastEdge_1 === null || lastEdge_1 === void 0 ? void 0 : lastEdge_1.origin.x) &&
                        ((_b = edge.dest) === null || _b === void 0 ? void 0 : _b.y) === (lastEdge_1 === null || lastEdge_1 === void 0 ? void 0 : lastEdge_1.origin.y) &&
                        (selectedNode_1 === null || selectedNode_1 === void 0 ? void 0 : selectedNode_1.x) === ((_c = edge.origin) === null || _c === void 0 ? void 0 : _c.x) &&
                        (selectedNode_1 === null || selectedNode_1 === void 0 ? void 0 : selectedNode_1.y) === ((_d = edge.origin) === null || _d === void 0 ? void 0 : _d.y);
                });
                if (isJoinAdded) {
                    selectedNode_1.isDouble = true;
                    selectedNode_1.randPhase = Math.random() + 0.1;
                }
                lastEdge_1.dest = selectedNode_1;
                enableAddEdge = false;
                selectedFirstEdge = -1;
            }
        }
    }
});
