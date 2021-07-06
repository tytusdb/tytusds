"use strict";
var FilaFeistel = (function () {
    function FilaFeistel(bits, longitud) {
        this.bits = [];
        this.bits = bits;
        this.longitud = longitud;
    }
    FilaFeistel.prototype.toString = function () {
        var string = '';
        for (var i = 0; i < this.bits.length; i++) {
            string = string + this.bits[i];
        }
        return string;
    };
    FilaFeistel.prototype.stringFila = function () {
        var string = '';
        for (var i = this.bits.length; i < this.longitud; i++) {
            string = string + '\t';
        }
        for (var i = 0; i < this.bits.length; i++) {
            string = string + this.bits[i] + '\t';
        }
        return string;
    };
    return FilaFeistel;
}());
var Feistel = (function () {
    function Feistel(key, iteraciones) {
        this.iteraciones = iteraciones;
        this.key = key.split('');
        this.tabla = [];
    }
    Feistel.prototype.codificacionFeistel = function (cadena) {
        if (this.esBinario(cadena)) {
            this.mitad(cadena);
        }
    };
    Feistel.prototype.codificar = function (L, R, iteracion) {
        var l = L.length + R.length;
        this.tabla.push(new FilaFeistel(L.concat(R), l));
        if (iteracion < this.iteraciones) {
            var Fn = [];
            var Rn = [];
            for (var i = 0; i < R.length; i++) {
                Fn.push(this.xor(R[i], this.key[i]));
            }
            for (var i = 0; i < L.length; i++) {
                Rn.push(this.xor(L[i], Fn[i]));
            }
            this.tabla.push(new FilaFeistel(this.key, l));
            this.tabla.push(new FilaFeistel(Fn, l));
            this.tabla.push(new FilaFeistel(L, l));
            this.moverAIzq();
            this.codificar(R, Rn, iteracion + 1);
        }
    };
    Feistel.prototype.mitad = function (cadena) {
        var L = [];
        var R = [];
        for (var i = 0; i < cadena.length; i++) {
            if (i < cadena.length / 2) {
                L.push(cadena.charAt(i));
            }
            else {
                R.push(cadena.charAt(i));
            }
        }
        if (L.length > R.length) {
            L.unshift('0');
            R.unshift(L.pop());
        }
        while (this.key.length < R.length) {
            this.key.unshift('0');
        }
        this.codificar(L, R, 0);
    };
    Feistel.prototype.moverAIzq = function () {
        this.key.push(this.key[0].toString());
        this.key.shift();
    };
    Feistel.prototype.xor = function (a, b) {
        if (a == b)
            return '0';
        return '1';
    };
    Feistel.prototype.esBinario = function (cadena) {
        for (var i = 0; i < cadena.length; i++) {
            if (!(cadena.charAt(i) == '1' || cadena.charAt(i) == '0')) {
                return false;
            }
        }
        return true;
    };
    Feistel.prototype.getResultado = function () {
        var i = this.tabla.length - 1;
        return this.tabla[i].toString();
    };
    Feistel.prototype.print = function () {
        for (var _i = 0, _a = this.tabla; _i < _a.length; _i++) {
            var n = _a[_i];
            console.log(n.stringFila());
        }
        console.log();
        console.log('Resultado: ' + this.getResultado());
    };
    return Feistel;
}());
var f = new Feistel('00110001', 4);
f.codificacionFeistel('0100001101000110');
f.print();
