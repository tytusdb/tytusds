"use strict";
var openHashInstance = null;
var hashInstance = null;
var openHashFunc = 'div';
var openHashSize = 13;
var elementsCounter = 0;
var isOpenHash = true;
var setHashTable = function (props) {
    if (props.openHash) {
        hashInstance = props.openHash.hashInstance;
        isOpenHash = true;
        openHashInstance = props.openHash.hashInstance;
        openHashSize = props.openHash.size;
        openHashFunc = props.openHash.hashFunc;
        openHashInstance.insertar(1);
        openHashInstance.insertar(2);
        openHashInstance.insertar(3);
        openHashInstance.insertar(4);
        openHashInstance.insertar(5);
        openHashInstance.insertar(6);
        openHashInstance.insertar(7);
        openHashInstance.insertar(8);
        openHashInstance.print();
    }
};
drawInCanvas = function () {
    if (canvasCtx) {
        if (isOpenHash && openHashInstance) {
            for (var headIndex = 0; headIndex < openHashSize; headIndex++) {
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
                for (var nodeIndex = 0; nodeIndex < openHashInstance.tabla[headIndex].valores.length; nodeIndex++) {
                    var nodeValue = openHashInstance.tabla[headIndex].valores[nodeIndex];
                    canvasCtx.beginPath();
                    canvasCtx.lineWidth = 7;
                    canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)';
                    canvasCtx.strokeStyle =
                        canvasObjectColors[headIndex > canvasObjectColors.length - 1
                            ? headIndex -
                                canvasObjectColors.length *
                                    Math.floor(headIndex / canvasObjectColors.length)
                            : headIndex];
                    canvasCtx.roundRect(headIndex * 70 - 620, 155 - (nodeIndex + 1) * 100, 50, 50, 10);
                    canvasCtx.stroke();
                    canvasCtx.fill();
                    canvasCtx.closePath();
                    canvasCtx.beginPath();
                    canvasCtx.fillStyle = '#011f3bcc';
                    canvasCtx.font = "bold 20px Montserrat";
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
