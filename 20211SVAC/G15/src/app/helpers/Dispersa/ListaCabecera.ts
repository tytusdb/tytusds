import { Apuntador, Tipo } from "./Dispersa";
import { NodoCabecera } from "./NodoCabecera";
import { Nodo } from "./Nodo"

export class ListaCabecera {
    private primero: NodoCabecera
    private ultimo: NodoCabecera
    private id: number

    constructor() {
        this.primero = null
        this.ultimo = null
        this.id = 0
    }

    public buscarCabecera(value: number | string) {
        let index = 0
        if (this.primero === null) return null
        let temp: NodoCabecera = this.primero
        while (temp !== null) {
            if (temp.getValue() === value) {
                return {
                    nodo: temp,
                    index: index
                }
            }
            temp = temp.getSiguiente()
            index++
        }
        return null
    }

    public addCabecera(value: number | string, tipo: Tipo) {
        let index = 0

        let nuevo: NodoCabecera = new NodoCabecera(this.id, value)
        this.id++
        if (this.primero === null) {
            this.primero = nuevo
            this.ultimo = nuevo
            return {
                nodo: nuevo,
                index: index
            }
        }

        if (this.primero.getValue() >= nuevo.getValue()) {
            nuevo.setSiguiente(this.primero)
            if (Tipo.DOBLE === tipo) this.primero.setAnterior(nuevo)
            this.primero = nuevo
            return {
                nodo: nuevo,
                index: index
            }
        }

        if (this.ultimo.getValue() < nuevo.getValue()) {
            let temp = this.primero
            while (temp != null) {
                index++
                temp = temp.getSiguiente()
            }
            this.ultimo.setSiguiente(nuevo)
            if (Tipo.DOBLE === tipo) nuevo.setAnterior(this.ultimo)
            this.ultimo = nuevo
            return {
                nodo: nuevo,
                index: index
            }
        }

        let temp = this.primero
        while (temp !== null) {
            index++
            let siguiente = temp.getSiguiente()
            if (nuevo.getValue() >= temp.getValue() && nuevo.getValue() < siguiente.getValue()) {
                nuevo.setSiguiente(siguiente)
                temp.setSiguiente(nuevo)
                if (Tipo.DOBLE === tipo) {
                    siguiente.setAnterior(nuevo)
                    nuevo.setAnterior(temp)
                }
                return {
                    nodo: nuevo,
                    index: index
                }
            }

            temp = temp.getSiguiente()
        }
        return null
    }

    public mostrarCabecera(apuntador: Apuntador) {
        let temp: NodoCabecera = this.primero
        let res = []
        while (temp !== null) {

            let data = temp.getLista().getLista(apuntador)
            res.push({
                index: temp.getValue(),
                valores: data
            })     
            temp = temp.getSiguiente()
        }
        console.log(res)
    }


    public async addValor(nuevo: Nodo, x: number, y: number, apuntador: Apuntador, tipo: Tipo) {
        let index = 0
        let temp = this.primero
        while (temp !== null) {
            if (apuntador === Apuntador.FILA) {
                if (index === y) break
            }
            else if (apuntador === Apuntador.COLUMNA) {
                if (index === x) break
            }
            index++
            temp = temp.getSiguiente()
        }
        let resultado = temp.getLista().buscar(nuevo.getValue(), apuntador)
        if (resultado !== null) return resultado
        return await temp.getLista().add(nuevo, tipo, apuntador, (apuntador === Apuntador.FILA) ? x : y)


    }
}