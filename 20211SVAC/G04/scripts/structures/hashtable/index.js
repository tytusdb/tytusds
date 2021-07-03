"use strict";
var Tupla = (function () {
    function Tupla(clave, valor) {
        this.clave = clave;
        this.valor = valor;
    }
    return Tupla;
}());
var FuncionHash = (function () {
    function FuncionHash(tipo) {
        this.tipo = tipo;
    }
    FuncionHash.prototype.funcionHash = function (valor, tamaño) {
        var clave = this.stringToAscii(valor);
        switch (this.tipo) {
            case 0:
                return this.simple(clave, tamaño);
            case 1:
                return this.division(clave, tamaño);
            case 2:
                return this.multiplicacion(clave, tamaño);
        }
        return -1;
    };
    FuncionHash.prototype.simple = function (clave, tamaño) {
        while (clave > 1) {
            clave = clave / 10;
        }
        return Math.round(clave * tamaño);
    };
    FuncionHash.prototype.division = function (clave, tamaño) {
        return clave % tamaño;
    };
    FuncionHash.prototype.multiplicacion = function (clave, tamaño) {
        var A = (Math.sqrt(5) - 1) / 2;
        return Math.round(tamaño * ((clave * A) % 1));
    };
    FuncionHash.prototype.stringToAscii = function (valor) {
        valor = valor.toString();
        var suma = 0;
        for (var i = 0; i < valor.length; i++) {
            suma += valor.charCodeAt(i);
        }
        return suma;
    };
    return FuncionHash;
}());
var NodoHashAbierto = (function () {
    function NodoHashAbierto(clave) {
        this.clave = clave;
        this.valores = [];
    }
    NodoHashAbierto.prototype.eliminarTupla = function (valor) {
        var tupla = this.buscarTupla(valor);
        if (tupla != null) {
            this.valores = this.deleteFromArray(this.valores, tupla);
            return true;
        }
        return false;
    };
    NodoHashAbierto.prototype.buscarTupla = function (valor) {
        for (var _i = 0, _a = this.valores; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.valor == valor) {
                return i;
            }
        }
        return null;
    };
    NodoHashAbierto.prototype.deleteFromArray = function (arreglo, valor) {
        return arreglo.filter(function (e) {
            return e !== valor;
        });
    };
    return NodoHashAbierto;
}());
var TablaHashAbierta = (function () {
    function TablaHashAbierta(tamaño, tipoFuncion) {
        this.tamaño = tamaño;
        this.funcion = new FuncionHash(tipoFuncion);
        this.tabla = [];
        this.crearTabla();
    }
    TablaHashAbierta.prototype.crearTabla = function () {
        for (var i = 0; i < this.tamaño; i++) {
            this.tabla.push(new NodoHashAbierto(i));
        }
    };
    TablaHashAbierta.prototype.insertar = function (valor) {
        var clave = this.funcion.funcionHash(valor, this.tamaño);
        if (this.tabla[clave].clave == -1)
            this.tabla[clave].clave = clave;
        this.tabla[clave].valores.unshift(new Tupla(this.funcion.stringToAscii(valor), valor));
    };
    TablaHashAbierta.prototype.eliminar = function (valor) {
        var clave = this.funcion.funcionHash(valor, this.tamaño);
        this.tabla[clave].eliminarTupla(valor);
    };
    TablaHashAbierta.prototype.actualizar = function (valor) {
        var clave = this.funcion.funcionHash(valor, this.tamaño);
        if (this.tabla[clave].eliminarTupla(valor)) {
            this.insertar(valor);
        }
    };
    TablaHashAbierta.prototype.print = function () {
        for (var i = 0; i < this.tabla.length; i++) {
            console.log('Posicion: ' + i + ' - Clave: ' + this.tabla[i].clave);
            console.log(this.tabla[i].valores);
        }
    };
    return TablaHashAbierta;
}());
var TablaHashCerrada = (function () {
    function TablaHashCerrada(tamaño, minimo, maximo, tipoColision, tipoFuncion) {
        this.numEntradas = 0;
        this.tamaño = tamaño;
        this.tipoColision = tipoColision;
        this.minimo = minimo;
        this.maximo = maximo;
        this.tabla = [];
        this.tabla = this.crearTabla();
        this.funcion = new FuncionHash(tipoFuncion);
    }
    TablaHashCerrada.prototype.factorCarga = function () {
        return Math.round((this.numEntradas / this.tamaño) * 100);
    };
    TablaHashCerrada.prototype.crearTabla = function () {
        var tabla = [];
        for (var i = 0; i < this.tamaño; i++) {
            tabla.push(new Tupla(-1, null));
        }
        return tabla;
    };
    TablaHashCerrada.prototype.insertar = function (valor) {
        var clave = this.funcion.funcionHash(valor, this.tamaño);
        if (this.tabla[clave].clave == -1) {
            this.tabla[clave] = new Tupla(this.funcion.stringToAscii(valor), valor);
        }
        else {
            switch (this.tipoColision) {
                case 0:
                    this.tabla = this.pruebaLineal(valor, (clave + 1) % this.tamaño, this.tabla);
                    break;
                case 1:
                    this.tabla = this.pruebaCuadratica(valor, clave, 1, this.tabla);
                    break;
                case 2:
                    this.tabla = this.dobleHash(valor, clave, this.tabla);
                    break;
            }
        }
        this.numEntradas++;
        if (this.factorCarga() >= this.maximo) {
            this.rehashing();
        }
    };
    TablaHashCerrada.prototype.rehashing = function () {
        while (this.factorCarga() > this.minimo) {
            this.tamaño++;
        }
        var copia = this.tabla;
        this.numEntradas = 0;
        this.tabla = this.crearTabla();
        for (var _i = 0, copia_1 = copia; _i < copia_1.length; _i++) {
            var n = copia_1[_i];
            if (n.clave != -1) {
                this.insertar(n.valor);
            }
        }
    };
    TablaHashCerrada.prototype.eliminar = function (valor) {
        var clave = this.funcion.funcionHash(valor, this.tamaño);
        if (this.tabla[clave].valor == valor) {
            this.tabla[clave] = new Tupla(-1, null);
            this.numEntradas--;
            return true;
        }
        switch (this.tipoColision) {
            case 0:
                clave = this.buscarLineal(valor, clave, clave + 1);
                break;
            case 1:
                clave = this.buscarCuadratica(valor, clave, 1);
                break;
            case 2:
                clave = this.busquedaDobleHash(valor, clave);
                break;
        }
        if (clave == -1) {
            return false;
        }
        this.tabla[clave] = new Tupla(-1, null);
        this.numEntradas--;
        return true;
    };
    TablaHashCerrada.prototype.actualizar = function (valor, nuevo) {
        if (this.eliminar(valor)) {
            this.insertar(nuevo);
        }
    };
    TablaHashCerrada.prototype.pruebaLineal = function (valor, clave, tabla) {
        if (this.tabla[clave].clave == -1) {
            tabla[clave] = new Tupla(this.funcion.stringToAscii(valor), valor);
        }
        else {
            this.pruebaLineal(valor, (clave + 1) % this.tamaño, tabla);
        }
        return tabla;
    };
    TablaHashCerrada.prototype.buscarLineal = function (valor, inicial, clave) {
        if (this.tabla[clave].valor == valor) {
            return clave;
        }
        else if (inicial == clave) {
            return -1;
        }
        else {
            return this.buscarLineal(valor, inicial, (clave + 1) % this.tamaño);
        }
    };
    TablaHashCerrada.prototype.pruebaCuadratica = function (valor, clave, agregar, tabla) {
        var id = (clave + (agregar * agregar)) % this.tamaño;
        if (this.tabla[id].clave == -1) {
            tabla[id] = new Tupla(this.funcion.stringToAscii(valor), valor);
        }
        else {
            this.pruebaCuadratica(valor, clave, agregar + 1, tabla);
        }
        return tabla;
    };
    TablaHashCerrada.prototype.buscarCuadratica = function (valor, clave, agregar) {
        var id = (clave + (agregar * agregar)) % this.tamaño;
        if (this.tabla[id].valor == valor) {
            return id;
        }
        else if (id == clave) {
            return -1;
        }
        else {
            return this.buscarCuadratica(valor, clave, agregar + 1);
        }
    };
    TablaHashCerrada.prototype.dobleHash = function (valor, clave, tabla) {
        var id = this.funcion.funcionHash(clave, this.tamaño);
        if (this.tabla[id].clave == -1) {
            tabla[id] = new Tupla(this.funcion.stringToAscii(valor), valor);
        }
        else {
            this.dobleHash(valor, clave, tabla);
        }
        return tabla;
    };
    TablaHashCerrada.prototype.busquedaDobleHash = function (valor, clave) {
        var id = this.funcion.funcionHash(clave, this.tamaño);
        if (this.tabla[id].valor == valor) {
            return id;
        }
        else if (id == clave) {
            return -1;
        }
        else {
            return this.busquedaDobleHash(valor, clave);
        }
    };
    TablaHashCerrada.prototype.print = function () {
        console.log(this.tabla);
        console.log('Factor de Carga: ' + this.factorCarga() + '%');
        console.log();
    };
    return TablaHashCerrada;
}());
