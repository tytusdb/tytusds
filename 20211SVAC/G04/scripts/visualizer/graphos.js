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
var graphoType = 'dir';
var graphoWaySearch = 'width';
var graphoSaveType = 'matrix';
var enableAddNode = false;
var enableAddEdge = false;
var selectedFirstEdge = 0;
var mouseIsDown = false;
var tmpGraphoNode = null;
var newEdgeLength = 0;
var tmpSearchGraphoNode = null;
var graphoNodeScaleCounter = 0;
var edgesArray = [];
var nodesArray = [
    {
        x: 0,
        y: 0,
        value: '1',
    },
];
var onChangeGraphosInput = function (ev, callback) {
    var target = ev.target;
    var value = target.value;
    callback(value);
};
var onChangeGraphosType = function (ev) {
    return onChangeGraphosInput(ev, function (value) { return (graphoType = value); });
};
var onChangeGraphosSearch = function (ev) {
    return onChangeGraphosInput(ev, function (value) { return (graphoWaySearch = value); });
};
var onChangeGraphosSave = function (ev) {
    return onChangeGraphosInput(ev, function (value) { return (graphoSaveType = value); });
};
var onChangeEdgeLength = function (ev) {
    var target = ev.target;
    var value = +target.value;
    newEdgeLength = value;
};
var getNodesDistance = function (x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
drawInCanvas = function () {
    if (canvasCtx) {
        for (var edgeIndex = 0; edgeIndex < edgesArray.length; edgeIndex++) {
            var currentEdge = edgesArray[edgeIndex];
            if (currentEdge.dest) {
                canvasCtx.beginPath();
                canvasCtx.strokeStyle = currentEdge.dest.isDouble
                    ? currentEdge.dest.color
                    : currentEdge.origin.color;
                canvasCtx.lineWidth = 5;
                canvasCtx.moveTo(currentEdge.origin.x, currentEdge.origin.y);
                if (graphoType === 'dir')
                    canvasCtx.arrowTo(currentEdge.origin.x, currentEdge.origin.y, currentEdge.dest.x, currentEdge.dest.y, 30);
                else {
                    canvasCtx.moveTo(currentEdge.origin.x, currentEdge.origin.y);
                    canvasCtx.lineTo(currentEdge.dest.x, currentEdge.dest.y);
                }
                canvasCtx.stroke();
                canvasCtx.closePath();
                canvasCtx.beginPath();
                var textX = (currentEdge.dest.x + currentEdge.origin.x) / 2;
                var textY = (currentEdge.dest.y + currentEdge.origin.y) / 2;
                canvasCtx.textAlign = 'center';
                canvasCtx.textBaseline = 'middle';
                canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc';
                canvasCtx.font = "bold 20px Montserrat";
                canvasCtx.clearRect(textX - 10, textY - 15, 20, 30);
                canvasCtx.fillText(currentEdge.distance.toString(), textX, textY);
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
            if (tmpSearchGraphoNode !== null && graphoNodeScaleCounter < 6)
                graphoNodeScaleCounter += ANIMATION_VELOCITY * 0.5;
            var enableScale = (tmpSearchGraphoNode === null || tmpSearchGraphoNode === void 0 ? void 0 : tmpSearchGraphoNode.x) === currentNode.x &&
                (tmpSearchGraphoNode === null || tmpSearchGraphoNode === void 0 ? void 0 : tmpSearchGraphoNode.y) === currentNode.y;
            var addedScale = enableScale ? graphoNodeScaleCounter : 0;
            canvasCtx.beginPath();
            canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)';
            canvasCtx.lineWidth = 7;
            canvasCtx.arc(currentNode.x, currentNode.y, 25 + addedScale, 0, 2 * Math.PI);
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
            canvasCtx.fillStyle = '#011f3bcc';
            canvasCtx.font = "bold " + (20 -
                currentNode.value.toString().length * 2.5 +
                (enableScale ? graphoNodeScaleCounter * 0.6 : 0)) + "px Montserrat";
            canvasCtx.fillText(currentNode.value, currentNode.x, currentNode.y);
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
            if (enableAddNode && newNodeValue.length) {
                ev.preventDefault();
                tmpGraphoNode = {
                    x: ev.clientX / cameraZoom - cameraOffset.x - 30,
                    y: ev.clientY / cameraZoom - cameraOffset.y - 80,
                    value: newNodeValue,
                };
                tmpSearchGraphoNode = null;
                graphoNodeScaleCounter = 0;
                nodesArray.push(tmpGraphoNode);
                enableAddNode = false;
                tmpGraphoNode = null;
            }
        }
    }, 500);
});
var searchNodeOnGrapho = function (value) {
    var currentNode = null;
    for (var nodeIndex = 0; nodeIndex < nodesArray.length; nodeIndex++)
        if (nodesArray[nodeIndex].value.toString() === value)
            currentNode = nodesArray[nodeIndex];
    return currentNode;
};
var addEdgeOnGraphos = function () {
    hideNavMenu(1);
    enableAddEdge = true;
};
canvas.addEventListener('click', function (ev) {
    if (enableAddEdge && newEdgeLength) {
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
                edgesArray.push({
                    origin: selectedNode_1,
                    dest: null,
                    distance: newEdgeLength,
                });
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
                    selectedNode_1.randPhase = Math.random() * (0.5 - 0.3) + 0.3;
                }
                lastEdge_1.dest = selectedNode_1;
                enableAddEdge = false;
                selectedFirstEdge = -1;
            }
        }
    }
});
var deleteNodeOnGraphos = function () {
    if (oldNodeValue.length) {
        var node_1 = searchNodeOnGrapho(oldNodeValue.toString());
        if (node_1) {
            nodesArray = nodesArray.filter(function (eNode) { return node_1.x !== eNode.x && node_1.y !== eNode.y; });
            edgesArray = edgesArray.filter(function (edge) {
                var _a, _b;
                return edge.origin.x !== node_1.x &&
                    edge.origin.y !== node_1.y &&
                    ((_a = edge.dest) === null || _a === void 0 ? void 0 : _a.x) !== node_1.x &&
                    ((_b = edge.dest) === null || _b === void 0 ? void 0 : _b.y) !== node_1.y;
            });
        }
        else
            console.log('Nodo no econtrado');
    }
};
var updateNodeOnGraphos = function () {
    if (oldNodeValue.length && newNodeValue.length) {
        var node = searchNodeOnGrapho(oldNodeValue.toString());
        if (node) {
            tmpSearchGraphoNode = node;
            graphoNodeScaleCounter = 0;
            node.value = newNodeValue;
        }
        else
            alert('Nodo no econtrado');
    }
};
var searchNodeOnGraphos = function () {
    if (oldNodeValue.length) {
        var node = searchNodeOnGrapho(oldNodeValue.toString());
        if (node) {
            tmpSearchGraphoNode = node;
            graphoNodeScaleCounter = 0;
        }
        else
            alert('Nodo no econtrado');
    }
};
