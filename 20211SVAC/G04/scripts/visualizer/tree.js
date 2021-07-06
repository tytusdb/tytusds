"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var treeStructure = null;
var treeElementsLength = 7;
var maxTreeHeight = 0;
var treeClassName = '';
var bTreeGrade = 0;
var bTreeStructure = null;
var isBTree = false;
var isBPlusTree = false;
var isMerkleTree = false;
var inputGrade = document.getElementById('grade-input');
canvasBannerDif = 140;
var setTreeStructure = function (treeInstance, instanceClassName, bTreeInstance, isBPlusTreeInstance, isMerkleTreeInstance) {
    if (isBPlusTreeInstance === void 0) { isBPlusTreeInstance = false; }
    if (isMerkleTreeInstance === void 0) { isMerkleTreeInstance = false; }
    treeStructure = treeInstance;
    treeClassName = instanceClassName;
    isMerkleTree = isMerkleTreeInstance;
    if (treeStructure) {
        if (isMerkleTree) {
            treeStructure.insertar(1);
            treeStructure.insertar(2);
            treeStructure.insertar(3);
            treeStructure.insertar(4);
        }
        else {
            treeStructure.insertar(4);
            treeStructure.insertar(8);
            treeStructure.insertar(2);
            treeStructure.insertar(1);
            treeStructure.insertar(3);
            treeStructure.insertar(9);
            treeStructure.insertar(7);
        }
        maxTreeHeight = treeStructure.raiz.altura;
    }
    if (bTreeInstance) {
        isBTree = true;
        isBPlusTree = isBPlusTreeInstance;
        bTreeGrade = (globalJSONInput === null || globalJSONInput === void 0 ? void 0 : globalJSONInput.grado) || 3;
        bTreeStructure = isBPlusTree
            ? new ArbolBplus(bTreeGrade)
            : new ArbolB(bTreeGrade);
        bTreeStructure.insertar(1);
        bTreeStructure.insertar(2);
        bTreeStructure.insertar(3);
        bTreeStructure.insertar(4);
        bTreeStructure.insertar(5);
        bTreeStructure.insertar(6);
        bTreeStructure.insertar(7);
    }
};
var saveJSONTreeFile = function () {
    var _a;
    if (treeStructure || bTreeStructure) {
        var valores = (_a = (isBTree ? bTreeStructure : treeStructure)) === null || _a === void 0 ? void 0 : _a.toArray();
        saveJSONFile(valores);
    }
};
fileUploadCallback = function (json) {
    var valores = json.valores;
    if (treeStructure)
        treeStructure.raiz = null;
    treeElementsLength = 0;
    if (editor)
        editor.innerHTML = "<strong style=\"color:var(--monoConstIce)\">const</strong> data <i style='color:var(--graySoda)'>=</i> <strong style='color:var(--keywordSoda)'>new</strong> <strong style=\"color:var(--monoClassIce)\">" + treeClassName + "</strong><strong style=\"color:var(--gray)\">&#x3c;</strong><strong style=\"color:var(--monoNumberIce)\">number</strong><strong style=\"color:var(--gray)\">&#x3e;</strong>()\n";
    if (isBTree) {
        if (globalJSONInput && globalJSONInput.grado)
            bTreeGrade = globalJSONInput.grado;
        bTreeStructure = isBPlusTree
            ? new ArbolBplus(bTreeGrade)
            : new ArbolB(bTreeGrade);
    }
    valores.forEach(function (valor) {
        newNodeValue = valor.toString();
        addNodeOnTree();
    });
    treeElementsLength = valores.length;
    setElementsLength(valores.length);
};
drawInCanvas = function () {
    var _a, _b;
    if (canvasCtx) {
        canvasCtx.save();
        canvasCtx.restore();
        canvasCtx.translate(-Math.pow(2, maxTreeHeight) * 50 - (isBTree ? 455 : 640), maxTreeHeight * -41 - (isBTree ? 130 : 0));
        if (treeStructure) {
            var queue = treeStructure
                ? [treeStructure.raiz]
                : [];
            var levelCounter = 0;
            for (var treeHeightIndex = maxTreeHeight; treeHeightIndex > 0; treeHeightIndex--) {
                for (var treeXIndex = 0; treeXIndex < Math.pow(2, maxTreeHeight - treeHeightIndex); treeXIndex++) {
                    var node = queue.shift() || null;
                    queue.push((node === null || node === void 0 ? void 0 : node.izquierdo) || null);
                    queue.push((node === null || node === void 0 ? void 0 : node.derecho) || null);
                    var isRight = treeXIndex % 2 === 1;
                    if (treeHeightIndex !== levelCounter) {
                        canvasCtx.restore();
                        canvasCtx.translate(Math.pow(2, treeHeightIndex) * 25, 0);
                        canvasCtx.save();
                        levelCounter = treeHeightIndex;
                    }
                    canvasCtx.strokeStyle =
                        canvasObjectColors[maxTreeHeight - treeHeightIndex];
                    canvasCtx.translate(Math.pow(2, treeHeightIndex) * 50, 0);
                    if (node) {
                        canvasCtx.beginPath();
                        canvasCtx.lineWidth = 5;
                        if (isRight) {
                            canvasCtx.moveTo(0, (maxTreeHeight - treeHeightIndex) * 100);
                            canvasCtx.lineTo(Math.pow(2, treeHeightIndex) * -25 + 10, (maxTreeHeight - treeHeightIndex) * 100 - 75);
                        }
                        else if (treeHeightIndex !== maxTreeHeight) {
                            canvasCtx.moveTo(0, (maxTreeHeight - treeHeightIndex) * 100);
                            canvasCtx.lineTo(Math.pow(2, treeHeightIndex) * 25 - 10, (maxTreeHeight - treeHeightIndex) * 100 - 75);
                        }
                        canvasCtx.stroke();
                        canvasCtx.closePath();
                        canvasCtx.beginPath();
                        canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)';
                        canvasCtx.lineWidth = 7;
                        if (isMerkleTree)
                            canvasCtx.roundRect(-20, (maxTreeHeight - treeHeightIndex) * 100 - 15, 40, 40, 10);
                        else
                            canvasCtx.arc(0, (maxTreeHeight - treeHeightIndex) * 100, 25, 0, 2 * Math.PI);
                        canvasCtx.stroke();
                        canvasCtx.fill();
                        canvasCtx.closePath();
                        canvasCtx.beginPath();
                        canvasCtx.textAlign = 'center';
                        canvasCtx.textBaseline = 'middle';
                        canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc';
                        canvasCtx.font = "bold " + (20 - ((_a = node.valor) === null || _a === void 0 ? void 0 : _a.toString().length) * 2.5) + "px Montserrat";
                        canvasCtx.fillText(node.valor, treeHeightIndex > 1 ? 50 * (isRight ? 1 : -1) : 0, (maxTreeHeight - treeHeightIndex) * 100 +
                            (treeHeightIndex > 1 ? 0 : 50));
                        if (isMerkleTree)
                            canvasCtx.fillText("#" + node.hash, treeHeightIndex > 1 ? 50 * (isRight ? 1 : -1) : 0, (maxTreeHeight - treeHeightIndex) * 100 +
                                (treeHeightIndex > 1 ? 0 : isMerkleTree ? 60 : 50) +
                                (isMerkleTree ? 15 : 0));
                        canvasCtx.closePath();
                    }
                }
            }
        }
        if (isBTree && bTreeStructure) {
            var tempTreeLevelCounter_1 = -1;
            var bQueue = bTreeStructure
                ? [
                    {
                        values: [bTreeStructure.raiz],
                        level: 0,
                    },
                ]
                : [];
            while (bQueue.length > 0) {
                var treeNode = bQueue.shift();
                if (treeNode && treeNode.values.length) {
                    var level = treeNode === null || treeNode === void 0 ? void 0 : treeNode.level;
                    var treeNodeLength = ((_b = treeNode.values) === null || _b === void 0 ? void 0 : _b.length) || 0;
                    for (var nodeValuesIndex = 0; nodeValuesIndex < treeNodeLength; nodeValuesIndex++) {
                        var node = treeNode.values[nodeValuesIndex];
                        if (node.hijos.length)
                            bQueue.push({
                                values: node.hijos,
                                level: treeNode.level + 1,
                            });
                        var nodeContentLength = node.valores.length || 0;
                        var translateMargin = Math.pow(nodeContentLength, level) * (80 / (level + 1));
                        if (tempTreeLevelCounter_1 !== level) {
                            canvasCtx.restore();
                            canvasCtx.save();
                            var nextNodeValues = __spreadArray([treeNode], bQueue).map(function (bTreeData) {
                                if (bTreeData.level === tempTreeLevelCounter_1 + 1)
                                    return [
                                        bTreeData.values
                                            .map(function (value) { return value.valores.length; })
                                            .reduce(function (a, b) { return a + b; }),
                                        bTreeData.values.length,
                                    ];
                                else
                                    return false;
                            })
                                .filter(Boolean);
                            var treeNodesPerLevel = nextNodeValues.reduce(function (a, b) { return a + b[0]; }, 0);
                            var treeNodeTotalLength = nextNodeValues.reduce(function (a, b) { return a + b[1]; }, 0);
                            tempTreeLevelCounter_1 = level;
                            canvasCtx.translate((translateMargin * (treeNodeTotalLength - 1) +
                                70 * treeNodesPerLevel) /
                                -2, 0);
                        }
                        for (var nodeContentIndex = 0; nodeContentIndex < nodeContentLength; nodeContentIndex++) {
                            var nodeContent = node.valores[nodeContentIndex];
                            canvasCtx.strokeStyle = canvasObjectColors[level];
                            if (node && nodeContent.toString().length) {
                                canvasCtx.translate(70, 0);
                                canvasCtx.beginPath();
                                canvasCtx.fillStyle = isDarkMode
                                    ? 'hsl(0deg 0% 57%)'
                                    : 'hsl(0deg 0% 87%)';
                                if (nodeContentLength > 1 && nodeContentIndex === 0)
                                    canvasCtx.fillRect(0, level * 100, 50 * nodeContentLength, 50);
                                canvasCtx.fill();
                                canvasCtx.closePath();
                                canvasCtx.beginPath();
                                canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)';
                                canvasCtx.lineWidth = 7;
                                canvasCtx.roundRect(0, level * 100, 50, 50, 10);
                                canvasCtx.stroke();
                                canvasCtx.fill();
                                canvasCtx.closePath();
                                canvasCtx.beginPath();
                                canvasCtx.textAlign = 'center';
                                canvasCtx.textBaseline = 'middle';
                                canvasCtx.fillStyle = '#011f3bcc';
                                canvasCtx.font = "bold " + (20 - nodeContent.toString().length * 2.5) + "px Montserrat";
                                canvasCtx.fillText(nodeContent.toString(), 25, level * 100 + 25);
                                canvasCtx.closePath();
                            }
                        }
                        canvasCtx.translate(translateMargin, 0);
                    }
                }
            }
        }
    }
};
var addNodeOnTree = function () {
    var _a;
    if (newNodeValue.length > 0) {
        if (treeStructure || isBTree) {
            var finalStructure = isBTree ? bTreeStructure : treeStructure;
            var searchedNode = finalStructure === null || finalStructure === void 0 ? void 0 : finalStructure.obtener(newNodeValue);
            if (repeatValues || (!repeatValues && searchedNode === null)) {
                finalStructure === null || finalStructure === void 0 ? void 0 : finalStructure.insertar(newNodeValue);
                if (!isBTree && treeStructure)
                    maxTreeHeight = ((_a = treeStructure.raiz) === null || _a === void 0 ? void 0 : _a.altura) || 0;
                setElementsLength(treeElementsLength + 1);
                addTestCode('insertar', newNodeValue);
                hideNavMenu(1);
                removeBanner();
            }
        }
    }
};
var removeNodeOnTree = function () {
    if (oldNodeValue.length > 0) {
        if (isBTree && bTreeStructure)
            bTreeStructure.eliminar(oldNodeValue);
        else if (treeStructure) {
            treeStructure.eliminar(oldNodeValue);
            maxTreeHeight = treeStructure.raiz.altura;
        }
        setElementsLength(treeElementsLength - 1);
        addTestCode('eliminar', oldNodeValue);
        hideNavMenu(1);
        removeBanner();
    }
};
var updateNodeOnTree = function () {
    if (oldNodeValue.length > 0 && newNodeValue.length > 0) {
        if (isBTree && bTreeStructure)
            bTreeStructure.actualizar(oldNodeValue, newNodeValue);
        else if (treeStructure) {
            treeStructure.actualizar(oldNodeValue, newNodeValue);
            maxTreeHeight = treeStructure.raiz.altura;
        }
        addTestCode('actualizar', oldNodeValue + "," + newNodeValue);
        hideNavMenu(1);
        removeBanner();
    }
};
var findNodeOnTree = function () {
    var _a, _b;
    if (oldNodeValue.length > 0) {
        if (treeStructure || isBTree) {
            var searchedNode = isBTree
                ? bTreeStructure === null || bTreeStructure === void 0 ? void 0 : bTreeStructure.obtener(oldNodeValue)
                : treeStructure === null || treeStructure === void 0 ? void 0 : treeStructure.obtener(oldNodeValue.toString());
            if (searchedNode) {
                addTestCode('obtener', "" + oldNodeValue);
                hideNavMenu(1);
                removeBanner();
                alert("Nodo encontrado:\nValor: " + (isBTree ? searchedNode.valores.join(',') : oldNodeValue) + "\n" + (isBTree ? 'Grado' : 'Altura') + ": " + (isBTree ? searchedNode.grado : searchedNode.altura) + "\n" + (isBTree
                    ? ''
                    : "Izquierdo: " + (((_a = searchedNode.izquierdo) === null || _a === void 0 ? void 0 : _a.valor) || null) + "\nDerecho: " + (((_b = searchedNode.derecho) === null || _b === void 0 ? void 0 : _b.valor) || null)));
            }
            else
                alert('Nodo no encontrado');
        }
    }
};
var onChangeInputGrade = function (ev) {
    var target = ev.target;
    bTreeGrade = +target.value;
};
