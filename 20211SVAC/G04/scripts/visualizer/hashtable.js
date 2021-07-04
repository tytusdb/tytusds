"use strict";
var hashFunctions = ['simple', 'div', 'times'];
var hashCoalitions = ['lineal', 'quad', 'times'];
var hashInstance = null;
var hashFunction = 'div';
var hashCoalition = 'lineal';
var hashMin = 20;
var hashMax = 20;
var hashTableSize = 10;
var elementsCounter = 0;
var isOpenHash = true;
var hashScalePosition = [-1, -1];
var hashNodeScaleCounter = 0;
var setHashTable = function (props) {
    if (props.openHash) {
        isOpenHash = true;
        hashInstance = props.openHash.hashInstance;
        hashTableSize = props.openHash.size;
        hashFunction = props.openHash.hashFunc;
    }
    else if (props.closedHash) {
        isOpenHash = false;
        hashInstance = props.closedHash.hashInstance;
        hashTableSize = props.closedHash.size;
        hashCoalition = props.closedHash.coalition;
        hashFunction = props.closedHash.hashFunc;
        hashMin = props.closedHash.min;
        hashMax = props.closedHash.max;
    }
};
fileUploadCallback = function () {
    hashInstance = isOpenHash
        ? new TablaHashAbierta(hashTableSize, hashFunctions.indexOf(hashFunction))
        : null;
    console.log(hashInstance);
    globalJSONInput === null || globalJSONInput === void 0 ? void 0 : globalJSONInput.valores.forEach(function (valor) {
        if (hashInstance) {
            newNodeValue = valor.toString();
            addOnHashTable();
        }
    });
    elementsCounter = (globalJSONInput === null || globalJSONInput === void 0 ? void 0 : globalJSONInput.valores.length) || 0;
    setElementsLength(elementsCounter);
};
var saveOpenHashTable = function () {
    var parsedValues = isOpenHash
        ? hashInstance
            ? hashInstance.tabla.map(function (node) { return "[" + node.valores.map(function (node) { return node.valor; }).join(',') + "]"; })
            : []
        : [];
    saveJSONFile(parsedValues);
};
var onChangeHashFunc = function (ev) {
    var target = ev.target;
    var func = target.value;
    hashFunction = func;
};
var onChangeHashSize = function (ev) {
    var target = ev.target;
    var size = +target.value;
    hashTableSize = size;
};
drawInCanvas = function () {
    var _a;
    if (canvasCtx) {
        if (isOpenHash && hashInstance) {
            for (var headIndex = 0; headIndex < hashTableSize; headIndex++) {
                canvasCtx.beginPath();
                canvasCtx.lineWidth = 7;
                canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)';
                canvasCtx.strokeStyle =
                    canvasObjectColors[headIndex > canvasObjectColors.length - 1
                        ? headIndex -
                            canvasObjectColors.length *
                                Math.floor(headIndex / canvasObjectColors.length)
                        : headIndex];
                canvasCtx.roundRect(headIndex * 70 - 620, 150, 50, 50, 10);
                canvasCtx.stroke();
                canvasCtx.fill();
                canvasCtx.closePath();
                canvasCtx.beginPath();
                canvasCtx.fillStyle = '#011f3bcc';
                canvasCtx.font = "bold 20px Montserrat";
                canvasCtx.textAlign = 'center';
                canvasCtx.textBaseline = 'middle';
                canvasCtx.fillText(headIndex.toString(), headIndex * 70 - 620 + 25, 175);
                canvasCtx.closePath();
                for (var nodeIndex = 0; nodeIndex < ((_a = hashInstance.tabla[headIndex]) === null || _a === void 0 ? void 0 : _a.valores.length) || 0; nodeIndex++) {
                    var nodeValue = hashInstance.tabla[headIndex].valores[nodeIndex];
                    canvasCtx.beginPath();
                    canvasCtx.lineWidth = 7;
                    canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)';
                    canvasCtx.strokeStyle =
                        canvasObjectColors[headIndex > canvasObjectColors.length - 1
                            ? headIndex -
                                canvasObjectColors.length *
                                    Math.floor(headIndex / canvasObjectColors.length)
                            : headIndex];
                    if (hashScalePosition[0] !== -1 && hashNodeScaleCounter < 10)
                        hashNodeScaleCounter += ANIMATION_VELOCITY * 0.05;
                    var enableScale = hashScalePosition[0] === headIndex &&
                        (isOpenHash ? hashScalePosition[1] === nodeIndex : true);
                    var addedScale = enableScale ? hashNodeScaleCounter : 0;
                    canvasCtx.roundRect(headIndex * 70 - 620 - addedScale / 2, 155 - (nodeIndex + 1) * 100 - addedScale / 2, 50 + addedScale, 50 + addedScale, 10);
                    canvasCtx.stroke();
                    canvasCtx.fill();
                    canvasCtx.closePath();
                    canvasCtx.beginPath();
                    canvasCtx.fillStyle = '#011f3bcc';
                    canvasCtx.font = "bold " + (20 + addedScale * 0.8) + "px Montserrat";
                    canvasCtx.textAlign = 'center';
                    canvasCtx.textBaseline = 'middle';
                    canvasCtx.fillText(nodeValue.valor.toString(), headIndex * 70 - 620 + 25, 155 - (nodeIndex + 1) * 100 + 25);
                    canvasCtx.closePath();
                    canvasCtx.beginPath();
                    canvasCtx.strokeStyle =
                        canvasObjectColors[headIndex > canvasObjectColors.length - 1
                            ? headIndex -
                                canvasObjectColors.length *
                                    Math.floor(headIndex / canvasObjectColors.length)
                            : headIndex];
                    canvasCtx.arrowTo(headIndex * 70 - 620 + 25, 180 - (nodeIndex + 1) * 100 + 70, headIndex * 70 - 620 + 25, 180 - (nodeIndex + 1) * 100 + 0, 30);
                    canvasCtx.stroke();
                    canvasCtx.closePath();
                }
            }
        }
    }
};
var addOnHashTable = function () {
    if (hashInstance && newNodeValue.length) {
        hashInstance.insertar(newNodeValue);
        setElementsLength(++elementsCounter);
        addTestCode('insertar', newNodeValue.toString());
    }
};
var removeOnHashTable = function () {
    if (hashInstance && oldNodeValue.length) {
        hashInstance.eliminar(oldNodeValue);
        setElementsLength(--elementsCounter);
        addTestCode('eliminar', oldNodeValue.toString());
    }
};
var updateOnHashTable = function () {
    if (hashInstance && oldNodeValue.length && newNodeValue.length) {
        hashInstance.actualizar(oldNodeValue, newNodeValue);
        addTestCode('actualizar', oldNodeValue + "," + newNodeValue);
    }
};
var searchOnHashTable = function () {
    if (hashInstance && oldNodeValue.length) {
        var index = hashInstance.getIndex(oldNodeValue);
        if (index[0] >= 0) {
            hashNodeScaleCounter = 0;
            hashScalePosition = index;
        }
        else
            alert('Valor no encontrado');
    }
};
