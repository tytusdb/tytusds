"use strict";
var NodoEncabezado = (function () {
    function NodoEncabezado(id, siguiente, anterior, nodoacceso) {
        this.id = id;
        this.siguiente = siguiente;
        this.anterior = anterior;
        this.nodoacceso = nodoacceso;
    }
    return NodoEncabezado;
}());
var NodoM = (function () {
    function NodoM(valor, fila, columna, derecha, izquierda, abajo, arriba) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.derecha = derecha;
        this.izquierda = izquierda;
        this.abajo = abajo;
        this.arriba = arriba;
    }
    return NodoM;
}());
var listaencabezado = (function () {
    function listaencabezado(primero) {
        this.primero = primero;
    }
    listaencabezado.prototype.setEncabezado = function (nuevo) {
        if (this.primero == null) {
            this.primero = nuevo;
        }
        else if (nuevo.id < this.primero.id) {
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
                    actual = nuevo;
                    break;
                }
                actual = actual.siguiente;
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
        this.eFilas = new listaencabezado(null);
        this.eColumnas = new listaencabezado(null);
    }
    matrizdispersa.prototype.insertar = function (valor, fila, columna) {
        var nuevo = new NodoM(valor, fila, columna, null, null, null, null);
        var efila = this.eFilas.getEncabezado(fila);
        if (efila == null) {
            efila = new NodoEncabezado(fila, null, null, null);
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
                var ecolumna = this.eColumnas.getEncabezado(columna);
                if (ecolumna == null) {
                    ecolumna = new NodoEncabezado(columna, null, null, null);
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
                        actual = ecolumna.nodoacceso;
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
        }
    };
    matrizdispersa.prototype.recorrerfilas = function () {
        var efila = this.eFilas.primero;
        while (efila != null) {
            var actual = efila.nodoacceso;
            while (actual != null) {
                console.log("Valor :  " + actual.valor + "       Fila:     " + actual.fila);
                if (efila.siguiente != null || actual.derecha != null) {
                    console.log("->");
                }
                actual = actual.derecha;
            }
            efila = efila.siguiente;
        }
        console.log("Finaliza el recorrido");
    };
    matrizdispersa.prototype.print = function () {
        var matz = new matrizdispersa();
        matz.insertar(1, 1, 'test');
        matz.insertar(1, 2, 'test3');
        matz.insertar(2, 4, 'test2');
        matz.recorrerfilas();
    };
    return matrizdispersa;
}());
