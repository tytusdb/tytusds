import { Apuntador, Tipo } from "./Dispersa";
import { Nodo } from "./Nodo";

export class Lista {
    private primero: Nodo

    public getPrimero(): Nodo {
        return this.primero;
    }

    public setPrimero(primero: Nodo): void {
        this.primero = primero;
    }

    private ultimo: Nodo


    constructor() {
        this.primero = null
        this.ultimo = null
    }


    public buscar(value: number | string, apuntador: Apuntador, x: number, y: number) {
        if (this.primero === null) return null
        let temp: Nodo = this.primero
        while (temp !== null) {
            if (this.convertir(temp.getPos().x) === this.convertir(x) && this.convertir(temp.getPos().y) === this.convertir(y)) return temp
            if (apuntador === Apuntador.FILA) temp = temp.getSiguiente();
            else temp = temp.getAbajo()
        }
        return null
    }


    public buscarValue(value: number | string, apuntador: Apuntador) {
        if (this.primero === null) return null
        let temp: Nodo = this.primero
        while (temp !== null) {
            if (temp.getValue() === value) return temp
            if (apuntador === Apuntador.FILA) temp = temp.getSiguiente();
            else temp = temp.getAbajo()
        }
        return null
    }


    public add(nuevo: Nodo, tipo: Tipo, apuntador: Apuntador, x: number, y: number) {

        console.log(nuevo.getValue(), x, y, apuntador)
        if (this.primero === null) {
            this.primero = nuevo
            this.ultimo = nuevo
            return nuevo
        }


        let posicion = (apuntador === Apuntador.FILA) ? x : y
        let index = 0
        let temp = this.primero
        while (index <= posicion) {
            if (index === posicion) break;
            if (temp === null) break;
            if (apuntador === Apuntador.FILA) temp = temp.getSiguiente()
            else temp = temp.getAbajo()
            index++
        }
        if (temp === this.primero) {
            if (apuntador === Apuntador.FILA) {
                let siguiente = temp.getSiguiente()
                nuevo.setSiguiente(temp)
                if (Tipo.DOBLE === tipo && siguiente) temp.setAnterior(nuevo)
                this.primero = nuevo
                return nuevo
            }

            let siguiente = temp.getAbajo()
            nuevo.setAbajo(temp)
            if (Tipo.DOBLE === tipo && siguiente) temp.setArriba(nuevo)
            this.primero = nuevo
            return nuevo
        }
        else if (temp === this.ultimo) {
            let anterior = this.obtenerAnterior(temp, apuntador);
            if (apuntador === Apuntador.FILA) {
                anterior.setSiguiente(nuevo)
                nuevo.setSiguiente(this.ultimo)
                if (Tipo.DOBLE === tipo) {
                    nuevo.setAnterior(anterior)
                    this.ultimo.setAnterior(nuevo)
                }
                return nuevo
            }
            nuevo.setAbajo(this.ultimo)
            anterior.setAbajo(nuevo)
            if (Tipo.DOBLE === tipo) {
                nuevo.setArriba(anterior)
                this.ultimo.setArriba(nuevo)
            }
            return nuevo
        }
        else if (temp === null) {
            if (apuntador === Apuntador.FILA) {
                this.ultimo.setSiguiente(nuevo)
                if (Tipo.DOBLE === tipo) nuevo.setAnterior(this.ultimo)
                this.ultimo = nuevo
                return nuevo
            }
            this.ultimo.setAbajo(nuevo)
            if (Tipo.DOBLE === tipo) nuevo.setArriba(this.ultimo)
            this.ultimo = nuevo
            return nuevo
        }
        else {
            let anterior = this.obtenerAnterior(temp, apuntador);
            if (apuntador === Apuntador.FILA) {
                anterior.setSiguiente(nuevo)
                nuevo.setSiguiente(temp)
                if (Tipo.DOBLE === tipo) {
                    nuevo.setAnterior(anterior)
                    temp.setAnterior(nuevo)
                }
                return nuevo
            }

            anterior.setAbajo(nuevo)
            nuevo.setAbajo(temp)
            if (Tipo.DOBLE === tipo) {
                nuevo.setArriba(anterior)
                temp.setArriba(nuevo)
            }

            return nuevo
        }

    }


    public getLista(apuntador: Apuntador, tipo: Tipo, pos:number) {
        let data = {
            nodes: [],
            edges: []
        }
        let temp = this.primero
        let index = 1
        while (temp != null) {

            let id = 'xy' + temp.getId()
            data.nodes.push({

                id: id,
                label: '' + temp.getValue(),
                level: pos

            })
            index++
            if (apuntador === Apuntador.COLUMNA) temp = temp.getAbajo()
            else temp = temp.getSiguiente()

            if (temp !== null) {

                let id2 = 'xy' + temp.getId()

                data.edges.push({
                    from: id,
                    to: id2
                })

                if (tipo === Tipo.DOBLE) {
                    data.edges.push({
                        from: id2,
                        to: id
                    })
                }

            }

        }

        return data
    }


    
    public getListaJSON(apuntador: Apuntador) {
        let valores = []
        let temp = this.primero
        while (temp != null) {

            valores.push({
                indices: [this.convertir(temp.getPos().x),this.convertir(temp.getPos().y)],
                valor: this.convertir(temp.getValue())
            })
            
            if (apuntador === Apuntador.COLUMNA) temp = temp.getAbajo()
            else temp = temp.getSiguiente()

            

        }

        return valores
    }


    private obtenerAnterior(nodo: Nodo, apuntador: Apuntador): Nodo {
        let temp = this.primero
        while (temp !== null) {

            if (temp.getSiguiente() === nodo) return temp
            if (apuntador === Apuntador.COLUMNA) temp = temp.getAbajo()
            else temp.getSiguiente();
        }

        return null
    }


    private convertir(value) {
        if (isNaN(value)) return value
        return +value
    }
}