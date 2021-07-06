"use strict";
var NodoMerkle = (function () {
    function NodoMerkle(hash, altura) {
        this.hash = hash;
        this.valor = null;
        this.izquierdo = null;
        this.derecho = null;
        this.tieneValor = false;
        this.altura = altura;
    }
    return NodoMerkle;
}());
var ArbolMerkle = (function () {
    function ArbolMerkle() {
        this.raiz = null;
        this.maxValores = 0;
        this.valores = 0;
        this.agregado = false;
    }
    ArbolMerkle.prototype.factor = function () {
        return this.maxValores - this.valores;
    };
    ArbolMerkle.prototype.hash = function (valor) {
        valor = valor.toString();
        var H = 64;
        var total = 1;
        for (var i = 0; i < valor.length; i++) {
            total += ((H * total) << 1) + valor.charCodeAt(i);
        }
        return total;
    };
    ArbolMerkle.prototype.obtener = function (valor) {
        var _a;
        var searchNode = null;
        if (this.raiz !== null) {
            var stack = [this.raiz];
            while (stack.length > 0) {
                var node = stack.shift();
                if (((_a = node.valor) === null || _a === void 0 ? void 0 : _a.toString()) === valor) {
                    searchNode = node;
                }
                else {
                    if (node.izquierdo)
                        stack.push(node.izquierdo);
                    if (node.derecho)
                        stack.push(node.derecho);
                }
            }
        }
        return searchNode;
    };
    ArbolMerkle.prototype.toArray = function () {
        if (this.raiz !== null) {
            var stack = [this.raiz];
            var stackCopy = [this.raiz.valor];
            while (stack.length > 0) {
                var node = stack.shift();
                if (node.izquierdo) {
                    stackCopy.push(node.izquierdo.valor);
                    stack.push(node.izquierdo);
                }
                if (node.derecho) {
                    stackCopy.push(node.derecho.valor);
                    stack.push(node.derecho);
                }
            }
            return stackCopy;
        }
        else
            return [];
    };
    ArbolMerkle.prototype.insertar = function (valor) {
        var _a;
        this.agregado = false;
        if (this.factor() <= 0) {
            var padre = new NodoMerkle(-1, 2);
            padre.izquierdo = this.raiz;
            if (this.raiz != null) {
                padre.altura = this.raiz.altura + 1;
            }
            else {
                padre.izquierdo = new NodoMerkle(-1, 1);
                this.maxValores = 1;
            }
            padre.derecho = this.crecer(padre.derecho, padre.altura - 1);
            this.maxValores = this.maxValores * 2;
            this.raiz = padre;
        }
        this.raiz = this.add(valor, this.raiz, (_a = this.raiz) === null || _a === void 0 ? void 0 : _a.altura);
        this.raiz = this.actualizarPadre(this.raiz);
    };
    ArbolMerkle.prototype.add = function (valor, raiz, altura) {
        if (altura > 1) {
            raiz.izquierdo = this.add(valor, raiz.izquierdo, altura - 1);
            raiz.derecho = this.add(valor, raiz.derecho, altura - 1);
        }
        else {
            if (raiz) {
                if (!this.agregado && !(raiz === null || raiz === void 0 ? void 0 : raiz.tieneValor)) {
                    this.agregado = true;
                    raiz.valor = valor;
                    raiz.hash = this.hash(valor);
                    raiz.tieneValor = true;
                    this.valores++;
                }
            }
        }
        return raiz;
    };
    ArbolMerkle.prototype.eliminar = function (valor) {
        this.raiz = this.delete(valor, this.raiz, this.raiz.altura);
        this.raiz = this.actualizarPadre(this.raiz);
    };
    ArbolMerkle.prototype.delete = function (valor, raiz, altura) {
        if (altura > 1) {
            raiz.izquierdo = this.delete(valor, raiz.izquierdo, altura - 1);
            raiz.derecho = this.delete(valor, raiz.derecho, altura - 1);
        }
        else {
            if (raiz.valor == valor) {
                raiz.valor = null;
                raiz.hash = -1;
                raiz.tieneValor = false;
                this.valores--;
            }
        }
        return raiz;
    };
    ArbolMerkle.prototype.actualizar = function (valor, nuevo) {
        this.raiz = this.actualiza(valor, nuevo, this.raiz, this.raiz.altura);
        this.raiz = this.actualizarPadre(this.raiz);
    };
    ArbolMerkle.prototype.actualiza = function (valor, nuevo, raiz, altura) {
        if (altura > 1) {
            raiz.izquierdo = this.actualiza(valor, nuevo, raiz.izquierdo, altura - 1);
            raiz.derecho = this.actualiza(valor, nuevo, raiz.derecho, altura - 1);
        }
        else {
            if (raiz.valor == valor) {
                raiz.valor = nuevo;
                raiz.hash = this.hash(nuevo);
            }
        }
        return raiz;
    };
    ArbolMerkle.prototype.crecer = function (raiz, altura) {
        if (altura > 0) {
            raiz = new NodoMerkle(-1, altura);
            raiz.izquierdo = this.crecer(raiz.izquierdo, altura - 1);
            raiz.derecho = this.crecer(raiz.derecho, altura - 1);
        }
        return raiz;
    };
    ArbolMerkle.prototype.actualizarPadre = function (raiz) {
        if (raiz != null) {
            raiz.izquierdo = this.actualizarPadre(raiz.izquierdo);
            raiz.derecho = this.actualizarPadre(raiz.derecho);
            if (raiz.altura > 1) {
                raiz.hash = raiz.izquierdo.hash + raiz.derecho.hash;
                raiz.tieneValor = true;
            }
        }
        return raiz;
    };
    ArbolMerkle.prototype.print = function () {
        console.log('PRE ORDEN --------------------');
        this.preOrden(this.raiz);
    };
    ArbolMerkle.prototype.preOrden = function (raiz) {
        if (raiz != null) {
            console.log('Raiz: ' + raiz.valor + '  - Altura:' + raiz.altura);
            this.preOrden(raiz.izquierdo);
            this.preOrden(raiz.derecho);
        }
    };
    return ArbolMerkle;
}());
