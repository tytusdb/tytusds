"use strict";
var PalabraLZW = (function () {
    function PalabraLZW(clave, valor) {
        this.clave = clave;
        this.valor = valor;
    }
    return PalabraLZW;
}());
var LZW = (function () {
    function LZW() {
        this.diccionario = [];
        this.W = [];
        this.K = [];
        this.WK = [];
        this.Salida = [];
        this.Agregar = [];
    }
    LZW.prototype.comprimir = function (cadena) {
        var w = '';
        var k = '';
        for (var i = 0; i < cadena.length; i++) {
            k = cadena.charAt(i);
            this.W.push(w);
            this.K.push(k);
            this.WK.push(w + k);
            if (this.enDiccionario(w + k) != -1) {
                w = w + k;
                this.Agregar.push('');
                this.Salida.push(' ');
            }
            else {
                this.diccionario.push(w + k);
                var s = this.enDiccionario(w);
                this.Agregar.push(w + k + ' ' + s);
                this.Salida.push(s.toString());
                w = k;
            }
        }
        this.W.push(w);
        this.K.push('');
        this.WK.push('');
        this.Agregar.push('');
        this.Salida.push(this.enDiccionario(w).toString());
    };
    LZW.prototype.ingresarCaracteres = function (cadena) {
        for (var i = 0; i < cadena.length; i++) {
            if (this.enDiccionario(cadena.charAt(i)) == -1)
                this.diccionario.push(cadena.charAt(i));
        }
    };
    LZW.prototype.enDiccionario = function (char) {
        for (var i = 0; i < this.diccionario.length; i++) {
            if (char == this.diccionario[i]) {
                return i;
            }
        }
        return -1;
    };
    LZW.prototype.print = function () {
        console.log('COMPRESIÓN LZW');
        console.log('------------------------------------------------');
        console.log('W\tK\tWK\tAgregar\t\tSalida');
        console.log('------------------------------------------------');
        for (var i = 0; i < this.W.length; i++) {
            console.log(this.W[i] + '\t' + this.K[i] + '\t' + this.WK[i] + '\t' + this.Agregar[i] + '\t\t' + this.Salida[i]);
        }
    };
    return LZW;
}());
