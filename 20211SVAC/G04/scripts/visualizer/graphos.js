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
var newEdgeLength = -1;
var tmpSearchGraphoNode = null;
var graphoNodeScaleCounter = 0;
var edgesArray = [];
var nodesArray = [];
var searchGraphoPositions = [];
var vertexArray = [];
fileUploadCallback = function () {
    var values = globalJSONInput === null || globalJSONInput === void 0 ? void 0 : globalJSONInput.valores;
    vertexArray = values;
    var valueCounter = 0;
    var matrixLength = Math.floor(Math.sqrt(2 * (values.length - 1)));
    var rootPosition = {
        x: -((matrixLength - 1) * 130) / 2 - 100,
        y: 0,
    };
    var positions = [rootPosition];
    newNodeValue = values[0].vertice.toString();
    addNodeOnGraphosAtPosition(rootPosition);
    for (var i = 0; i < matrixLength; i++)
        for (var j = 0; j < matrixLength; j++)
            if (valueCounter < values.length) {
                valueCounter++;
                newNodeValue = values[valueCounter].vertice.toString();
                var position = {
                    x: i * 130 - ((matrixLength - 1) * 130) / 2,
                    y: j * 130 - ((matrixLength - 1) * 130) / 2,
                };
                addNodeOnGraphosAtPosition(position);
                positions.push(position);
            }
    var _loop_1 = function (vertexIndex) {
        var _loop_2 = function (edgeIndex) {
            var edge = values[vertexIndex].aristas[edgeIndex];
            var nodeIndex = values
                .map(function (value) { return value.vertice; })
                .indexOf(edge.arista);
            var edgeColor = canvasObjectColors[vertexIndex > canvasObjectColors.length - 1
                ? vertexIndex -
                    canvasObjectColors.length *
                        Math.floor(vertexIndex / canvasObjectColors.length)
                : vertexIndex];
            var edgeDestColor = canvasObjectColors[nodeIndex > canvasObjectColors.length - 1
                ? nodeIndex -
                    canvasObjectColors.length *
                        Math.floor(nodeIndex / canvasObjectColors.length)
                : nodeIndex];
            var isDouble = edgesArray.some(function (edge) {
                var _a, _b;
                return edge.origin.x === positions[nodeIndex].x &&
                    edge.origin.y === positions[nodeIndex].y &&
                    ((_a = edge.dest) === null || _a === void 0 ? void 0 : _a.x) === positions[vertexIndex].x &&
                    ((_b = edge.dest) === null || _b === void 0 ? void 0 : _b.y) === positions[vertexIndex].y;
            });
            edgesArray.push({
                origin: __assign(__assign({}, positions[vertexIndex]), { color: edgeColor, isDouble: false, value: values[vertexIndex].vertice.toString(), randPhase: 0 }),
                dest: __assign(__assign({}, positions[nodeIndex]), { color: isDouble ? edgeDestColor : edgeColor, value: edge.arista.toString(), isDouble: isDouble, randPhase: 0 }),
                distance: edge.distancia,
            });
        };
        for (var edgeIndex = 0; edgeIndex < values[vertexIndex].aristas.length; edgeIndex++) {
            _loop_2(edgeIndex);
        }
    };
    for (var vertexIndex = 0; vertexIndex < values.length; vertexIndex++) {
        _loop_1(vertexIndex);
    }
    selectedFirstEdge = -1;
    enableAddEdge = false;
};
var saveGraphosJSON = function () {
    if (graphoSaveType === 'matrix') {
        var matrix = [];
        for (var i = 0; i < nodesArray.length; i++) {
            var row = [];
            var _loop_3 = function (j) {
                var currentVertex = vertexArray[i];
                if (currentVertex.aristas.some(function (edge) {
                    return edge.arista.toString() === vertexArray[j].vertice.toString();
                }))
                    row.push(1);
                else
                    row.push(0);
            };
            for (var j = 0; j < nodesArray.length; j++) {
                _loop_3(j);
            }
            matrix.push(row);
        }
        saveJSONFile(matrix);
    }
    else {
        var values = vertexArray.map(function (vertex) {
            return vertex.aristas.map(function (edge) { return edge.arista; });
        });
        saveJSONFile(values);
    }
};
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
        var _loop_4 = function (edgeIndex) {
            var currentEdge = edgesArray[edgeIndex];
            var currentSearchEdge = searchGraphoPositions.find(function (node) {
                var _a, _b, _c, _d;
                return ((_a = node === null || node === void 0 ? void 0 : node.dest) === null || _a === void 0 ? void 0 : _a.x) === ((_b = currentEdge === null || currentEdge === void 0 ? void 0 : currentEdge.dest) === null || _b === void 0 ? void 0 : _b.x) &&
                    ((_c = node === null || node === void 0 ? void 0 : node.dest) === null || _c === void 0 ? void 0 : _c.y) === ((_d = currentEdge === null || currentEdge === void 0 ? void 0 : currentEdge.dest) === null || _d === void 0 ? void 0 : _d.y) &&
                    node.origin.x === currentEdge.origin.x &&
                    node.origin.y === currentEdge.origin.y;
            });
            if (currentEdge.dest) {
                canvasCtx.beginPath();
                canvasCtx.strokeStyle = !currentSearchEdge
                    ? currentEdge.dest.isDouble
                        ? currentEdge.dest.color
                        : currentEdge.origin.color
                    : currentSearchEdge === null || currentSearchEdge === void 0 ? void 0 : currentSearchEdge.origin.color;
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
        };
        for (var edgeIndex = 0; edgeIndex < edgesArray.length; edgeIndex++) {
            _loop_4(edgeIndex);
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
var addNodeOnGraphosAtPosition = function (position) {
    tmpGraphoNode = __assign(__assign({}, position), { value: newNodeValue });
    tmpSearchGraphoNode = null;
    graphoNodeScaleCounter = 0;
    nodesArray.push(tmpGraphoNode);
    addTestCode('insertar', newNodeValue);
    enableAddNode = false;
    tmpGraphoNode = null;
};
canvas.addEventListener('mousedown', function (ev) {
    mouseIsDown = true;
    setTimeout(function () {
        if (mouseIsDown) {
            if (enableAddNode && newNodeValue.length) {
                ev.preventDefault();
                addNodeOnGraphosAtPosition({
                    x: ev.clientX / cameraZoom - cameraOffset.x - 30,
                    y: ev.clientY / cameraZoom - cameraOffset.y - 80,
                });
                vertexArray.push({
                    vertice: +newNodeValue,
                    aristas: [],
                });
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
    if (newEdgeLength >= 0) {
        hideNavMenu(1);
        enableAddEdge = true;
    }
};
canvas.addEventListener('click', function (ev) {
    var _a;
    if (enableAddEdge && newEdgeLength >= 0) {
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
                (_a = vertexArray[vertexArray
                    .map(function (vert) { return vert.vertice.toString(); })
                    .indexOf(lastEdge_1.origin.value)]) === null || _a === void 0 ? void 0 : _a.aristas.push({
                    arista: selectedNode_1.value,
                    distancia: newEdgeLength,
                });
                lastEdge_1.dest = selectedNode_1;
                enableAddEdge = false;
                selectedFirstEdge = -1;
            }
        }
    }
});
var deleteNodeOnGraphos = function () {
    if (oldNodeValue.length) {
        var node = searchNodeOnGrapho(oldNodeValue.toString());
        if (node) {
            nodesArray = nodesArray.filter(function (eNode) { return eNode.value.toString() !== oldNodeValue; });
            vertexArray = vertexArray.filter(function (vertex) { return vertex.vertice.toString() !== oldNodeValue; });
            vertexArray.forEach(function (vertex) {
                var edges = vertex.aristas.filter(function (edge) { return edge.arista.toString() !== oldNodeValue; });
                vertex.aristas = edges;
            });
            edgesArray = edgesArray.filter(function (edge) {
                var _a;
                return edge.origin.value !== oldNodeValue &&
                    ((_a = edge.dest) === null || _a === void 0 ? void 0 : _a.value) !== oldNodeValue;
            });
            addTestCode('eliminar', oldNodeValue);
            hideNavMenu(1);
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
            for (var vertexIndex = 0; vertexIndex < vertexArray.length; vertexIndex++)
                if (vertexArray[vertexIndex].vertice.toString() === oldNodeValue)
                    vertexArray[vertexIndex].vertice = +newNodeValue;
            addTestCode('actualizar', oldNodeValue + "," + newNodeValue);
            hideNavMenu(1);
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
            addTestCode('buscar', oldNodeValue);
            hideNavMenu(1);
        }
        else
            alert('Nodo no econtrado');
    }
};
var graphosWidthSearch = function () {
    var textValues = vertexArray.map(function (value) {
        return value.vertice.toString();
    });
    var usedNodes = [textValues[0]];
    var widthSearchEdges = [];
    vertexArray.forEach(function (currentNode, currentIndex) {
        currentNode.aristas.forEach(function (edge) {
            var destEdge = edge.arista.toString();
            if (!usedNodes.some(function (node) { return node === destEdge; })) {
                usedNodes.push(destEdge);
                widthSearchEdges.push({
                    origin: __assign(__assign({}, nodesArray[textValues.indexOf(textValues[currentIndex])]), { color: '#ADD8E6', isDouble: false, randPhase: 0 }),
                    dest: __assign(__assign({}, nodesArray[textValues.indexOf(destEdge)]), { color: '#ADD8E6', isDouble: false, randPhase: 0 }),
                    distance: edge.distancia,
                });
            }
        });
    });
    searchGraphoPositions = widthSearchEdges;
};
var graphosDeepSearch = function () {
    var textValues = vertexArray.map(function (value) {
        return value.vertice.toString();
    });
    var currentNodeIndex = 0;
    var usedNodes = [textValues[0]];
    var deepSearchEdges = [];
    while (usedNodes.length < vertexArray.length) {
        if (currentNodeIndex >= 0) {
            var lastEdge = graphoType === 'dir' ? undefined : vertexArray[currentNodeIndex].aristas[0];
            var _loop_5 = function (edgesIndex) {
                if (!usedNodes.some(function (node) {
                    return node ===
                        vertexArray[currentNodeIndex].aristas[edgesIndex].arista.toString();
                })) {
                    lastEdge = vertexArray[currentNodeIndex].aristas[edgesIndex];
                    return "break";
                }
            };
            for (var edgesIndex = 0; edgesIndex < vertexArray[currentNodeIndex].aristas.length; edgesIndex++) {
                var state_1 = _loop_5(edgesIndex);
                if (state_1 === "break")
                    break;
            }
            if (lastEdge) {
                var nextNodeIndex = textValues.indexOf(lastEdge.arista.toString());
                usedNodes.push(lastEdge.arista.toString());
                deepSearchEdges.push({
                    origin: __assign(__assign({}, nodesArray[currentNodeIndex]), { color: '#ADD8E6', isDouble: false, randPhase: 0 }),
                    dest: __assign(__assign({}, nodesArray[nextNodeIndex]), { color: '#ADD8E6', isDouble: false, randPhase: 0 }),
                    distance: lastEdge.distancia,
                });
                currentNodeIndex = nextNodeIndex;
            }
            else
                currentNodeIndex--;
        }
        else
            break;
    }
    searchGraphoPositions = deepSearchEdges;
};
var handleWaySearchOnGraphos = function () {
    if (graphoWaySearch === 'deep')
        graphosDeepSearch();
    else
        graphosWidthSearch();
    addTestCode('recorrer', graphoWaySearch);
    hideNavMenu(1);
};
