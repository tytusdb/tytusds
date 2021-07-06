"use strict";
var NodoEncabezado = (function () {
    function NodoEncabezado(id) {
        this.id = id;
        this.siguiente = null;
        this.anterior = null;
        this.nodoacceso = null;
    }
    return NodoEncabezado;
}());
var NodoM = (function () {
    function NodoM(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.derecha = null;
        this.izquierda = null;
        this.abajo = null;
        this.arriba = null;
    }
    return NodoM;
}());
var listaencabezado = (function () {
    function listaencabezado() {
        this.primero = null;
    }
    listaencabezado.prototype.setEncabezado = function (nuevo) {
        if (this.primero == null) {
            this.primero = nuevo;
        }
        else {
            if (nuevo.id < this.primero.id) {
                nuevo.siguiente = this.primero;
                this.primero.anterior = nuevo;
                this.primero = nuevo;
            }
            else {
                var actual = this.primero;
                while (actual.siguiente != null) {
                    if (nuevo.id < actual.siguiente.id) {
                        nuevo.siguiente = actual.siguiente;
                        actual.siguiente.anterior = nuevo;
                        nuevo.anterior = actual;
                        actual.siguiente = nuevo;
                        break;
                    }
                    actual = actual.siguiente;
                }
                if (actual.siguiente == null) {
                    actual.siguiente = nuevo;
                    nuevo.anterior = actual;
                }
            }
        }
    };
    listaencabezado.prototype.getEncabezado = function (id) {
        var actual = this.primero;
        while (actual != null) {
            if (actual.id == id) {
                return actual;
            }
            actual = actual.siguiente;
        }
        return null;
    };
    return listaencabezado;
}());
var matrizdispersa = (function () {
    function matrizdispersa() {
        this.eFilas = new listaencabezado();
        this.eColumnas = new listaencabezado();
    }
    matrizdispersa.prototype.insertar = function (valor, fila, columna) {
        var nuevo = new NodoM(valor, fila, columna);
        var efila = this.eFilas.getEncabezado(fila);
        if (efila == null) {
            efila = new NodoEncabezado(fila);
            efila.nodoacceso = nuevo;
            this.eFilas.setEncabezado(efila);
        }
        else {
            if (nuevo.columna < efila.nodoacceso.columna) {
                nuevo.derecha = efila.nodoacceso;
                efila.nodoacceso.izquierda = nuevo;
                efila.nodoacceso = nuevo;
            }
            else {
                var actual = efila.nodoacceso;
                while (actual.derecha != null) {
                    if (nuevo.columna < actual.derecha.columna) {
                        nuevo.derecha = actual.derecha;
                        actual.derecha.izquierda = nuevo;
                        nuevo.izquierda = actual;
                        actual.derecha = nuevo;
                        break;
                    }
                    actual = actual.derecha;
                }
                if (actual.derecha == null) {
                    actual.derecha = nuevo;
                    nuevo.izquierda = actual;
                }
            }
            var ecolumna = this.eColumnas.getEncabezado(columna);
            if (ecolumna == null) {
                ecolumna = new NodoEncabezado(columna);
                ecolumna.nodoacceso = nuevo;
                this.eColumnas.setEncabezado(ecolumna);
            }
            else {
                if (nuevo.fila < ecolumna.nodoacceso.fila) {
                    nuevo.abajo = ecolumna.nodoacceso;
                    ecolumna.nodoacceso.arriba = nuevo;
                    ecolumna.nodoacceso = nuevo;
                }
                else {
                    var actual = ecolumna.nodoacceso;
                    while (actual.abajo != null) {
                        if (nuevo.fila < actual.abajo.fila) {
                            nuevo.abajo = actual.abajo;
                            actual.abajo.arriba = nuevo;
                            nuevo.arriba = actual;
                            actual.abajo = nuevo;
                            break;
                        }
                        actual = actual.abajo;
                    }
                    if (actual.abajo == null) {
                        actual.abajo = nuevo;
                        nuevo.arriba = actual;
                    }
                }
            }
        }
    };
    matrizdispersa.prototype.recorrerfilas = function () {
        var efila = this.eFilas.primero;
        while (efila != null) {
            var actual = efila.nodoacceso;
            while (actual != null) {
                console.log("Valor :  " + actual.valor + "       Fila:     " + actual.fila + "Columna:   " + actual.columna);
                if (efila.siguiente != null || actual.derecha != null) {
                    console.log("->");
                }
                actual = actual.derecha;
            }
            efila = efila.siguiente;
        }
        console.log("Finaliza el recorrido");
    };
    matrizdispersa.prototype.recorrercolumna = function () {
        var ecolumna = this.eColumnas.primero;
        while (ecolumna != null) {
            var actual = ecolumna.nodoacceso;
            while (actual != null) {
                console.log("Valor :  " + actual.valor + "       Fila:     " + actual.fila + "Columna:   " + actual.columna);
                if (ecolumna.siguiente != null || actual.abajo != null) {
                    console.log("->");
                }
                actual = actual.abajo;
            }
            ecolumna = ecolumna.siguiente;
        }
        console.log("Finaliza el recorrido");
    };
    return matrizdispersa;
}());
