"use strict";
var linearStructure = null;
var linearStructureLength = 0;
var className = 'ListaSimple';
var isLikeStack = false;
var isCircular = false;
var isSimple = true;
var lastPriority = 0;
var isPriority = false;
var insertMode = 'end';
canvasBannerDif = 110;
var nodeScaleCounter = 0;
var nodeScaleIndex = -1;
var opacityCounter = 0;
var deleteIndex = -1;
var opacityEndCallback = function () { };
var setLinearStructure = function (newLinearStructure, linearClassName, simple, circular, likeStack, insertModeType, isPriorityQueue) {
    if (circular === void 0) { circular = false; }
    if (likeStack === void 0) { likeStack = false; }
    if (insertModeType === void 0) { insertModeType = 'end'; }
    if (isPriorityQueue === void 0) { isPriorityQueue = false; }
    linearStructure = newLinearStructure;
    className = linearClassName;
    isPriority = isPriorityQueue;
    insertMode = insertModeType;
    isLikeStack = likeStack;
    isCircular = circular;
    isSimple = simple;
    if (linearStructure) {
        linearStructure.insertar(isPriority ? 6 : 1, isPriority ? 5 : undefined);
        linearStructure.insertar(isPriority ? 5 : 2, isPriority ? 4 : undefined);
        linearStructure.insertar(isPriority ? 4 : 3, isPriority ? 3 : undefined);
        linearStructure.insertar(isPriority ? 3 : 4, isPriority ? 2 : undefined);
        linearStructure.insertar(isPriority ? 2 : 5, isPriority ? 1 : undefined);
        if (isLikeStack)
            linearStructure.insertar(isPriority ? 1 : 6, isPriority ? 0 : undefined);
    }
    linearStructureLength = (linearStructure === null || linearStructure === void 0 ? void 0 : linearStructure.getTamaño()) || 5;
    if (isLikeStack)
        canvasBannerDif += 20;
};
var saveJSONLinearFile = function () {
    var _a;
    if (linearStructure) {
        var valores = [];
        for (var linearIndex = 0; linearIndex < linearStructureLength; linearIndex++) {
            valores.push((_a = linearStructure.obtener(linearIndex)) === null || _a === void 0 ? void 0 : _a.valor);
        }
        saveJSONFile(valores);
    }
};
fileUploadCallback = function (json) {
    var valores = json.valores;
    if (linearStructure)
        for (var linearIndex = 0; linearIndex < linearStructureLength; linearIndex++)
            linearStructure.pop();
    linearStructureLength = 0;
    if (editor)
        editor.innerHTML = "<strong style=\"color:var(--monoConstIce)\">const</strong> data <i style='color:var(--graySoda)'>=</i> <strong style='color:var(--keywordSoda)'>new</strong> <strong style=\"color:var(--monoClassIce)\">" + className + "</strong><strong style=\"color:var(--gray)\">&#x3c;</strong><strong style=\"color:var(--monoNumberIce)\">number</strong><strong style=\"color:var(--gray)\">&#x3e;</strong>()\n";
    valores.forEach(function (valor) {
        if (linearStructure) {
            if (repeatValues ||
                (!repeatValues && linearStructure.buscar(valor.toString()) === null)) {
                newNodeValue = isPriority ? valor.valor.toString() : valor.toString();
                lastPriority = isPriority ? valor.prioridad : lastPriority;
                addNode(false);
            }
        }
    });
    setElementsLength(linearStructure ? linearStructure.getTamaño() : 0);
};
drawInCanvas = function () {
    var _a, _b;
    if (canvasCtx) {
        canvasCtx.globalCompositeOperation = 'destination-over';
        for (var nodeIndex = 0; nodeIndex < linearStructureLength; nodeIndex++) {
            var nodeX = -579 + 150 * nodeIndex;
            var addedX = 0;
            if (isCircular && !isSimple)
                addedX = 90;
            var scaleAdded = nodeScaleIndex === nodeIndex ? nodeScaleCounter : 0;
            if (isCircular && nodeIndex === 0 && !isSimple) {
                var nodeEndX = -530 + 150 * -1;
                canvasCtx.beginPath();
                canvasCtx.arc(nodeEndX + addedX, 0, 30, 0, 2 * Math.PI);
                canvasCtx.save();
                canvasCtx.globalAlpha = 0.5;
                canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)';
                canvasCtx.strokeStyle =
                    canvasObjectColors[linearStructureLength + 2 > canvasObjectColors.length - 1
                        ? linearStructureLength +
                            2 -
                            canvasObjectColors.length *
                                Math.floor(linearStructureLength / canvasObjectColors.length)
                        : linearStructureLength + 2];
                canvasCtx.lineWidth = 7;
                canvasCtx.stroke();
                canvasCtx.fill();
                canvasCtx.closePath();
                var nodeEndValue = linearStructure
                    ? (_a = linearStructure.obtener(linearStructureLength - 1)) === null || _a === void 0 ? void 0 : _a.valor.toString()
                    : '';
                if (linearStructure) {
                    canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc';
                    canvasCtx.font = "bold " + (20 - nodeEndValue.length * 0.5) + "px Montserrat";
                    canvasCtx.textAlign = 'center';
                    canvasCtx.fillText(nodeEndValue, nodeEndX + addedX, -50);
                }
                canvasCtx.restore();
            }
            canvasCtx.beginPath();
            if (nodeScaleIndex === nodeIndex && nodeScaleCounter < 10)
                nodeScaleCounter += ANIMATION_VELOCITY * 0.1;
            if (!isLikeStack)
                canvasCtx.arc(nodeX + addedX, 0, 40 + scaleAdded, 0, 2 * Math.PI);
            canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)';
            canvasCtx.strokeStyle =
                canvasObjectColors[nodeIndex > canvasObjectColors.length - 1
                    ? nodeIndex -
                        canvasObjectColors.length *
                            Math.floor(nodeIndex / canvasObjectColors.length)
                    : nodeIndex];
            canvasCtx.lineWidth = 7;
            if (nodeIndex === deleteIndex) {
                if (opacityCounter < 1) {
                    canvasCtx.save();
                    opacityCounter += ANIMATION_VELOCITY / 150;
                    canvasCtx.globalAlpha = 1 - opacityCounter;
                }
                else {
                    opacityEndCallback();
                    opacityEndCallback = function () { };
                }
            }
            if (!isLikeStack) {
                canvasCtx.stroke();
                canvasCtx.fill();
            }
            else {
                canvasCtx.beginPath();
                canvasCtx.roundRect(nodeX - nodeX / 3.5 - 200 + addedX - scaleAdded / 2, -40 - scaleAdded / 2, 80 + scaleAdded, 80 + scaleAdded, 10);
                canvasCtx.stroke();
                canvasCtx.closePath();
                canvasCtx.fillRect(nodeX - nodeX / 3.5 - 200 + addedX - scaleAdded / 2, -40 - scaleAdded / 2, 80 + scaleAdded, 80 + scaleAdded);
            }
            canvasCtx.closePath();
            var nodeValue = linearStructure
                ? ((_b = linearStructure.obtener(nodeIndex)) === null || _b === void 0 ? void 0 : _b.valor.toString()) || ''
                : '';
            if (linearStructure) {
                canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc';
                canvasCtx.font = "bold " + (20 - (nodeValue === null || nodeValue === void 0 ? void 0 : nodeValue.length) * 0.5) + "px Montserrat";
                canvasCtx.textAlign = 'center';
                canvasCtx.fillText(nodeValue, (isLikeStack ? nodeX - nodeX / 3.5 - 160 : nodeX) + addedX, (isLikeStack ? -55 : -50) -
                    (nodeScaleIndex === nodeIndex ? nodeScaleCounter : 0));
            }
            canvasCtx.restore();
            if ((nodeIndex < linearStructureLength - 1 ||
                (isCircular && nodeIndex === linearStructureLength - 1)) &&
                !isLikeStack) {
                var isCircularEnd = isCircular && nodeIndex === linearStructureLength - 1;
                canvasCtx.beginPath();
                if (isSimple || isCircular) {
                    canvasCtx.save();
                    if (isSimple) {
                        canvasCtx.scale(2, 2);
                        canvasCtx.translate(225, 0);
                    }
                    if (isCircularEnd)
                        canvasCtx.globalAlpha = 0.5;
                }
                canvasCtx.fillStyle = isDarkMode ? 'white' : '#bbb';
                canvasCtx.arrow((isSimple ? nodeX / 2 : nodeX) + 5 + (isSimple ? -215 : 0) + addedX, -1, isSimple ? (isCircularEnd ? 36 : 60) : 95, 4);
                canvasCtx.closePath();
                if (isSimple || isCircular)
                    canvasCtx.restore();
            }
            if (isCircular && nodeIndex === linearStructureLength - 1) {
                var nodeRootX = -625 + 150 * (nodeIndex + 1);
                canvasCtx.beginPath();
                canvasCtx.arc(nodeRootX + addedX, 0, 30, 0, 2 * Math.PI);
                canvasCtx.save();
                canvasCtx.globalAlpha = 0.5;
                canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)';
                canvasCtx.strokeStyle =
                    canvasObjectColors[nodeIndex + 1 > canvasObjectColors.length - 1
                        ? nodeIndex +
                            1 -
                            canvasObjectColors.length *
                                Math.floor(nodeIndex / canvasObjectColors.length)
                        : nodeIndex + 1];
                canvasCtx.lineWidth = 7;
                canvasCtx.stroke();
                canvasCtx.fill();
                canvasCtx.closePath();
                var nodeRootValue = linearStructure
                    ? linearStructure.obtener(0).valor.toString()
                    : '';
                if (linearStructure) {
                    canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc';
                    canvasCtx.font = "bold " + (20 - nodeRootValue.length * 0.5) + "px Montserrat";
                    canvasCtx.textAlign = 'center';
                    canvasCtx.fillText(nodeRootValue, nodeRootX + addedX, -50);
                }
                canvasCtx.restore();
            }
            if ((nodeIndex > 0 && !isSimple) ||
                (isCircular && nodeIndex === 0 && !isSimple)) {
                if (!isSimple || isCircular) {
                    canvasCtx.save();
                    if (isCircular && nodeIndex === 0) {
                        canvasCtx.globalAlpha = 0.5;
                        if (!isSimple) {
                            canvasCtx.translate(0, 0);
                        }
                    }
                }
                canvasCtx.beginPath();
                canvasCtx.fillStyle = isDarkMode ? 'white' : '#bbb';
                canvasCtx.arrow(nodeX + 5 - 105 + addedX, -1, 95, 4, true, true);
                canvasCtx.closePath();
                if (!isSimple || isCircular)
                    canvasCtx.restore();
            }
        }
    }
};
var changeInsertMode = function (ev) {
    var target = ev.target;
    insertMode = target.value;
};
var addNode = function (withAnimation) {
    if (withAnimation === void 0) { withAnimation = true; }
    if (linearStructure && newNodeValue.length > 0) {
        var nodeOnStructure = linearStructure.buscar(newNodeValue);
        if (repeatValues || (!repeatValues && nodeOnStructure === null)) {
            scaleCounter = 0;
            nodeScaleIndex = -1;
            var addOnStructure = function () {
                if (linearStructure) {
                    if (insertMode === 'start') {
                        if ('push' in linearStructure)
                            linearStructure.push(newNodeValue);
                        if (isPriority)
                            linearStructure.insertar(newNodeValue, lastPriority);
                    }
                    else if (insertMode === 'end')
                        linearStructure.insertar(newNodeValue, isPriority ? lastPriority : undefined);
                    linearStructureLength = linearStructure.getTamaño();
                    setElementsLength(linearStructureLength);
                }
            };
            if (withAnimation)
                findNodeAnimation(insertMode === 'start' ? 0 : linearStructureLength - 1, addOnStructure, false);
            else
                addOnStructure();
            addTestCode(insertMode === 'start'
                ? 'push'
                : insertMode === 'end'
                    ? 'insertar'
                    : 'insertar', isPriority ? newNodeValue + "," + 0 : newNodeValue);
            hideNavMenu(1);
            removeBanner();
        }
    }
};
var removeNode = function () {
    if (linearStructure && oldNodeValue.length > 0) {
        var nodeOnStructure = linearStructure.buscar(oldNodeValue);
        if (nodeOnStructure !== null) {
            var nodeIndex_1 = linearStructure.obtenerIndice(oldNodeValue);
            findNodeAnimation(nodeIndex_1, function () {
                opacityEndCallback = function () {
                    if (linearStructure) {
                        linearStructure.eliminar(oldNodeValue);
                        linearStructureLength = linearStructure.getTamaño();
                        setElementsLength(linearStructureLength);
                    }
                };
                deleteIndex = nodeIndex_1;
                opacityCounter = 0;
            });
            addTestCode('eliminar', oldNodeValue);
            hideNavMenu(1);
            removeBanner();
        }
    }
};
var findNodeAnimation = function (selectedIndex, callback, withScale) {
    if (withScale === void 0) { withScale = true; }
    if (linearStructure) {
        var index_1 = selectedIndex || linearStructure.obtenerIndice(oldNodeValue);
        var fase = isLikeStack ? 1.72 : 2.4;
        var middle = isLikeStack ? 2 : 4;
        resetCanvas();
        translateCanvasTo(((index_1 <= middle ? middle + 1 : index_1 * 2) - index_1) *
            (index_1 <= middle ? -50 : 50) *
            fase +
            (index_1 <= middle
                ? isLikeStack
                    ? -150
                    : 136
                : isLikeStack
                    ? -440
                    : -465), 0, function () {
            if (withScale) {
                nodeScaleCounter = 0;
                nodeScaleIndex = index_1;
            }
            if (callback)
                callback();
        });
    }
};
var findNode = function () {
    if (linearStructure && oldNodeValue.length > 0) {
        var nodeOnStructure = linearStructure.buscar(oldNodeValue);
        if (nodeOnStructure !== null) {
            findNodeAnimation(undefined, function () { });
            addTestCode('buscar', oldNodeValue);
            hideNavMenu(1);
            removeBanner();
        }
    }
};
var updateNode = function () {
    if (linearStructure && newNodeValue.length > 0 && oldNodeValue.length > 0) {
        var nodeOnStructure = linearStructure.buscar(oldNodeValue);
        var newNodeOnStructure = linearStructure.buscar(newNodeValue);
        if (nodeOnStructure !== null &&
            (repeatValues || (newNodeOnStructure === null && !repeatValues))) {
            var nodeIndex = linearStructure.obtenerIndice(oldNodeValue);
            findNodeAnimation(nodeIndex, function () {
                if (linearStructure)
                    linearStructure.actualizar(oldNodeValue, newNodeValue);
            });
            addTestCode('actualizar', oldNodeValue + "," + newNodeValue);
            hideNavMenu(1);
            removeBanner();
        }
    }
};
