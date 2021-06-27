import { Apuntador, Tipo } from "./Dispersa";
import { Nodo } from "./Nodo";

export class Lista {
    private primero: Nodo
    private ultimo: Nodo


    constructor() {
        this.primero = null
        this.ultimo = null
    }


    public buscar(value: number | string, apuntador: Apuntador) {
        if (this.primero === null) return null
        let temp: Nodo = this.primero
        while (temp !== null) {
            if (temp.getValue() === value) return temp
            if (apuntador === Apuntador.FILA) temp = temp.getSiguiente();
            else temp = temp.getAbajo()
        }
        return null
    }


    public add(nuevo: Nodo, tipo: Tipo, apuntador: Apuntador, posicion: number) {

        if (this.primero === null) {
            this.primero = nuevo
            this.ultimo = nuevo
            return nuevo
        }



        let temp = this.primero
        let index = 0

        while (temp !== null) {
            index++
            if (apuntador === Apuntador.FILA) {
                if (temp.getSiguiente() === null) break
                temp = temp.getSiguiente()

            }
            else {
                if (temp.getAbajo() === null) break
                temp = temp.getAbajo()
            }

        }

        if (index === posicion) {
            if (apuntador === Apuntador.FILA) {
                this.ultimo.setSiguiente(nuevo)
                if (tipo === Tipo.DOBLE) nuevo.setAnterior(this.ultimo)
                this.ultimo = nuevo
                return nuevo
            }

            this.ultimo.setAbajo(nuevo)
            if (tipo === Tipo.DOBLE) nuevo.setArriba(this.ultimo)
            this.ultimo = nuevo
            return nuevo
        }


        temp = this.primero
        index = 0
        while (temp != null) {
            if (index + 1 === posicion) {
                if (apuntador === Apuntador.FILA) {
                    
                    let siguiente = temp.getSiguiente()
                    nuevo.setSiguiente(siguiente)
                    temp.setSiguiente(nuevo)
                    if (Tipo.DOBLE === tipo && siguiente) {
                        siguiente.setAnterior(nuevo)
                        nuevo.setAnterior(temp)
                    }
                    return nuevo
                }
                
                let siguiente = temp.getAbajo()
                nuevo.setAbajo(siguiente)
                temp.setAbajo(nuevo)
                if (Tipo.DOBLE === tipo) {
                    siguiente.setArriba(nuevo)
                    nuevo.setArriba(temp)
                }
                
                return nuevo

            }
            if (apuntador === Apuntador.COLUMNA) {
                
                temp = temp.getAbajo()
            }
            else temp = temp.getSiguiente()
            index++
        }




    }


    public getLista(apuntador: Apuntador) {
        let data = []
        let temp = this.primero
        while (temp != null) {

            data.push(temp.getValue())

            if (apuntador === Apuntador.COLUMNA) temp = temp.getAbajo()
            else temp = temp.getSiguiente()

        }

        return data
    }
}