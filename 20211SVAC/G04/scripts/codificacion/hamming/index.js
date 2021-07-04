"use strict";
var FilaHamming = (function () {
    function FilaHamming(longitud) {
        this.valores = [];
        for (var i = 0; i < longitud; i++) {
            this.valores.push(' ');
        }
    }
    return FilaHamming;
}());
var Hamming = (function () {
    function Hamming() {
        this.numParidad = this.numBits = 0;
        this.tabla = [];
    }
    Hamming.prototype.codificar = function (cadena) {
        if (this.esBinario(cadena)) {
            this.construirTabla(cadena);
            return this.tabla;
        }
        return null;
    };
    Hamming.prototype.construirTabla = function (cadena) {
        this.numBits = this.cantidadBits(cadena);
        this.numParidad = this.cantidadParidad(this.numBits, cadena.length);
        for (var i = 0; i < this.numParidad + 1; i++) {
            this.tabla.push(new FilaHamming(this.numBits));
        }
        for (var i = 0; i < this.numParidad; i++) {
            this.tabla[0].valores[this.potencia(2, i) - 1] = 'p';
        }
        var nbit = 0;
        for (var i = 0; i < this.numBits; i++) {
            if (this.tabla[0].valores[i] != 'p') {
                this.tabla[0].valores[i] = cadena.charAt(nbit);
                nbit++;
            }
            else {
                this.tabla[0].valores[i] = ' ';
            }
        }
        for (var i = 0; i < this.numParidad; i++) {
            this.construirParidad(i);
        }
    };
    Hamming.prototype.construirParidad = function (numParidad) {
        var n = this.potencia(2, numParidad);
        var contador = 0;
        for (var i = n; i < this.numBits + 1; i += n * 2) {
            for (var j = 0; j < n; j++) {
                if (i + j - 1 > this.numBits - 1)
                    break;
                if (this.tabla[0].valores[i + j - 1] == '1') {
                    contador++;
                }
                this.tabla[numParidad + 1].valores[i + j - 1] = this.tabla[0].valores[i + j - 1];
            }
        }
        this.tabla[numParidad + 1].valores[n - 1] = (contador % 2).toString();
    };
    Hamming.prototype.cantidadBits = function (cadena) {
        var cantidad = cadena.length;
        var numParidad = 1;
        while (numParidad <= cantidad) {
            cantidad++;
            numParidad = numParidad * 2;
        }
        return cantidad;
    };
    Hamming.prototype.cantidadParidad = function (total, cantidad) {
        return total - cantidad;
    };
    Hamming.prototype.potencia = function (base, exponente) {
        if (exponente == 0) {
            return 1;
        }
        return base * this.potencia(base, exponente - 1);
    };
    Hamming.prototype.esBinario = function (cadena) {
        for (var i = 0; i < cadena.length; i++) {
            if (!(cadena.charAt(i) == '1' || cadena.charAt(i) == '0')) {
                return false;
            }
        }
        return true;
    };
    return Hamming;
}());
