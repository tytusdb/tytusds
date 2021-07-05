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


    public buscar(value: number | string, apuntador: Apuntador, x: number|string, y: number|string) {
        if (this.primero === null) return null
        let temp: Nodo = this.primero
        while (temp !== null) {
            //console.log(x,y,temp.getPos(),temp.getValue())
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


    public add(nuevo: Nodo, tipo: Tipo, apuntador: Apuntador, x: number|string, y: number|string) {

        console.log(nuevo.getValue(), x, y)
        if (this.primero === null) {
            this.primero = nuevo
            this.ultimo = nuevo
            return nuevo
        }

        // Insertar Columnas
        if(apuntador === Apuntador.COLUMNA){
            if(this.convertir(this.primero.getPos().y) >= this.convertir(y)){
                nuevo.setAbajo(this.primero)
                if(tipo === Tipo.DOBLE) this.primero.setArriba(nuevo)
                this.primero = nuevo 
                return nuevo
            }

            if(this.convertir(this.ultimo.getPos().y) <= this.convertir(y)){
                this.ultimo.setAbajo(nuevo)
                if(tipo === Tipo.DOBLE) nuevo.setArriba(this.ultimo)
                this.ultimo = nuevo 
                return nuevo
            }

            let temp = this.primero 
            while(temp !== null){
                let siguiente = temp.getAbajo() 
                if(this.convertir(temp.getPos().y) < this.convertir(y) && this.convertir(y) < this.convertir(siguiente.getPos().y)){
                    temp.setAbajo(nuevo)
                    nuevo.setAbajo(siguiente)
                    if(tipo === Tipo.DOBLE){
                        nuevo.setArriba(temp)
                        siguiente.setArriba(nuevo)
                        return nuevo
                    }
                }
                temp = temp.getAbajo()
            }
            return null
        }

        // Insertar Filas

        if(this.convertir(this.primero.getPos().x) >= this.convertir(x)){
            nuevo.setSiguiente(this.primero)
            if(tipo === Tipo.DOBLE) this.primero.setAnterior(nuevo)
            this.primero = nuevo 
            return nuevo
        }

        if(this.convertir(this.ultimo.getPos().x) <= this.convertir(x)){
            this.ultimo.setSiguiente(nuevo)
            if(tipo === Tipo.DOBLE) nuevo.setAnterior(this.ultimo)
            this.ultimo = nuevo 
            return nuevo
        }

        let temp = this.primero 
        while(temp !== null){
            let siguiente = temp.getSiguiente() 
            if(this.convertir(temp.getPos().x) < this.convertir(x) && this.convertir(x) < this.convertir(siguiente.getPos().x)){
                temp.setSiguiente(nuevo)
                nuevo.setSiguiente(siguiente)
                if(tipo === Tipo.DOBLE){
                    nuevo.setAnterior(temp)
                    siguiente.setAnterior(nuevo)
                    return nuevo
                }
            }
            temp = temp.getSiguiente()
        }
        return null

      

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