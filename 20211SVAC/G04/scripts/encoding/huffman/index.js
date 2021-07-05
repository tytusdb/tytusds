"use strict";
var NodoHuffman = (function () {
    function NodoHuffman(valor, peso) {
        this.valor = valor;
        this.peso = peso;
        this.izquierdo = null;
        this.derecho = null;
    }
    NodoHuffman.prototype.actualizarPeso = function () {
        this.peso = this.pesoNodo(this.izquierdo) + this.pesoNodo(this.derecho);
        this.valor = this.izquierdo.valor + this.derecho.valor;
    };
    NodoHuffman.prototype.pesoNodo = function (nodo) {
        if (nodo == null) {
            return 0;
        }
        else {
            return nodo.peso;
        }
    };
    return NodoHuffman;
}());
var ParejaHuffman = (function () {
    function ParejaHuffman(valor, binario, peso) {
        this.valor = valor;
        this.binario = binario;
        this.peso = peso;
    }
    return ParejaHuffman;
}());
var Huffman = (function () {
    function Huffman() {
        this.pesos = [];
        this.raiz = null;
        this.codificacion = [];
    }
    Huffman.prototype.crearArbol = function (cadena) {
        this.contarCaracteres(cadena);
        while (this.pesos.length > 1) {
            var nuevo = new NodoHuffman('', 0);
            nuevo.izquierdo = this.pesos.shift();
            nuevo.derecho = this.pesos.shift();
            nuevo.actualizarPeso();
            this.pesos.push(nuevo);
            this.pesos = this.ordenar(this.pesos);
        }
        this.raiz = this.pesos[0];
    };
    Huffman.prototype.codificar = function (cadena) {
        this.crearArbol(cadena);
        this.buscar('', this.raiz, cadena);
        this.codificacion = this.ordenar(this.codificacion);
    };
    Huffman.prototype.buscar = function (binaria, raiz, cadena) {
        if (raiz != null) {
            this.buscar(binaria + '0', raiz.izquierdo, cadena);
            if (raiz.valor.length == 1) {
                this.codificacion.push(new ParejaHuffman(raiz.valor + ' - ' + raiz.peso + '/' + cadena.length, binaria, raiz.peso));
            }
            this.buscar(binaria + '1', raiz.derecho, cadena);
        }
    };
    Huffman.prototype.contarCaracteres = function (cadena) {
        for (var i = 0; i < cadena.length; i++) {
            this.contarCaracter(cadena.charAt(i));
        }
        this.pesos = this.ordenar(this.pesos);
    };
    Huffman.prototype.contarCaracter = function (char) {
        var pos = this.buscarCaracter(char);
        if (pos == -1) {
            this.pesos.push(new NodoHuffman(char, 1));
        }
        else {
            this.pesos[pos].peso++;
        }
    };
    Huffman.prototype.buscarCaracter = function (caracter) {
        for (var i = 0; i < this.pesos.length; i++) {
            if (this.pesos[i].valor == caracter) {
                return i;
            }
        }
        return -1;
    };
    Huffman.prototype.ordenar = function (arreglo) {
        for (var i = 1; i < arreglo.length; i++) {
            for (var j = 0; j < arreglo.length - i; j++) {
                if (arreglo[j].peso > arreglo[j + 1].peso) {
                    var aux = arreglo[j];
                    arreglo[j] = arreglo[j + 1];
                    arreglo[j + 1] = aux;
                }
            }
        }
        return arreglo;
    };
    Huffman.prototype.print = function () {
        for (var i = 0; i < this.codificacion.length; i++) {
            console.log('Valor: ' + this.codificacion[i].valor + ' - Codigo: ' + this.codificacion[i].binario);
        }
    };
    return Huffman;
}());
