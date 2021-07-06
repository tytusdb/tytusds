"use strict";
var hashFunctions = ['simple', 'div', 'times'];
var hashCoalitions = ['lineal', 'quad', 'times'];
var hashInstance = null;
var hashCoalition = 'lineal';
var hashFunction = 'div';
var elementsCounter = 0;
var hashTableSize = 10;
var isOpenHash = true;
var hashMin = 20;
var hashMax = 20;
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
        : new TablaHashCerrada(hashTableSize, hashMin, hashMax, hashCoalitions.indexOf(hashCoalition), hashFunctions.indexOf(hashFunction));
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
    if (hashInstance) {
        var parsedValues = isOpenHash
            ? hashInstance.tabla.map(function (node) { return node.valores.map(function (node) { return node.valor; }); })
            :
                hashInstance.tabla.map(function (node) { return node.valor; });
        saveJSONFile(parsedValues);
    }
};
var onChangeHashTableInput = function (ev, callback) {
    var target = ev.target;
    var value = target.value;
    callback(value);
};
var onChangeHashFunc = function (ev) {
    return onChangeHashTableInput(ev, function (value) { return (hashFunction = value); });
};
var onChangeHashCoalition = function (ev) {
    return onChangeHashTableInput(ev, function (value) { return (hashCoalition = value); });
};
var onChangeHashSize = function (ev) {
    return onChangeHashTableInput(ev, function (value) { return (hashTableSize = +value); });
};
var onChangeHashMin = function (ev) {
    return onChangeHashTableInput(ev, function (value) { return (hashMin = +value); });
};
var onChangeHashMax = function (ev) {
    return onChangeHashTableInput(ev, function (value) { return (hashMax = +value); });
};
drawInCanvas = function () {
    var _a, _b;
    if (canvasCtx) {
        if (hashInstance) {
            for (var headIndex = 0; headIndex < (isOpenHash ? hashTableSize : hashInstance.tabla.length); headIndex++) {
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
                var enableScale = hashScalePosition[0] === headIndex;
                var addedScale = enableScale ? hashNodeScaleCounter : 0;
                canvasCtx.roundRect(headIndex * 70 - 620 - addedScale / 2, 150 - addedScale / 2, 50 + addedScale, 50 + addedScale, 10);
                canvasCtx.stroke();
                canvasCtx.fill();
                canvasCtx.closePath();
                canvasCtx.beginPath();
                canvasCtx.fillStyle = '#011f3bcc';
                canvasCtx.font = "bold " + (20 + addedScale * 0.8) + "px Montserrat";
                canvasCtx.textAlign = 'center';
                canvasCtx.textBaseline = 'middle';
                canvasCtx.fillText(isOpenHash
                    ? headIndex.toString()
                    :
                        (_a = hashInstance.tabla[headIndex]) === null || _a === void 0 ? void 0 : _a.valor, headIndex * 70 - 620 + 25, 175);
                canvasCtx.closePath();
                if (isOpenHash)
                    for (var nodeIndex = 0; nodeIndex < ((_b = hashInstance.tabla[headIndex]) === null || _b === void 0 ? void 0 : _b.valores.length) || 0; nodeIndex++) {
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
                        var enableScale_1 = hashScalePosition[0] === headIndex &&
                            (isOpenHash ? hashScalePosition[1] === nodeIndex : true);
                        var addedScale_1 = enableScale_1 ? hashNodeScaleCounter : 0;
                        canvasCtx.roundRect(headIndex * 70 - 620 - addedScale_1 / 2, 155 - (nodeIndex + 1) * 100 - addedScale_1 / 2, 50 + addedScale_1, 50 + addedScale_1, 10);
                        canvasCtx.stroke();
                        canvasCtx.fill();
                        canvasCtx.closePath();
                        canvasCtx.beginPath();
                        canvasCtx.fillStyle = '#011f3bcc';
                        canvasCtx.font = "bold " + (20 + addedScale_1 * 0.8) + "px Montserrat";
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
    validateOnHashTable(function () {
        if (hashInstance && oldNodeValue.length) {
            hashInstance.eliminar(oldNodeValue);
            setElementsLength(--elementsCounter);
            addTestCode('eliminar', oldNodeValue.toString());
        }
    });
};
var updateOnHashTable = function () {
    validateOnHashTable(function () {
        if (hashInstance && oldNodeValue.length && newNodeValue.length) {
            hashInstance.actualizar(oldNodeValue, newNodeValue);
            addTestCode('actualizar', oldNodeValue + "," + newNodeValue);
        }
    });
};
var validateOnHashTable = function (callback) {
    if (hashInstance && oldNodeValue.length) {
        var index = hashInstance.getIndex(oldNodeValue);
        if (index[0] >= 0) {
            hashNodeScaleCounter = 0;
            hashScalePosition = index;
            callback && callback();
        }
        else
            alert('Valor no encontrado');
    }
};
var searchOnHashTable = function () { return validateOnHashTable(); };
