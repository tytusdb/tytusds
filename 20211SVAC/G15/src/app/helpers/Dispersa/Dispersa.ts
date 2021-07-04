import { ListaCabecera } from "./ListaCabecera";
import { NodoCabecera } from "./NodoCabecera";
import { Nodo } from "./Nodo";
export enum Tipo {
    SIMPLE,
    DOBLE
}

export enum Apuntador {
    COLUMNA,
    FILA
}
export class Dispersa {
    private columnas: ListaCabecera
    private filas: ListaCabecera
    private tipo: Tipo;
    private id: number

    constructor(tipo: Tipo) {
        this.columnas = new ListaCabecera()
        this.filas = new ListaCabecera()
        this.tipo = tipo;
        this.id = 0
    }

    public async add(x: number | string, y: number | string, value: number | string) {
        let resultX = this.addColumna(x)
        let resultY = this.addFila(y)
        let nuevo = new Nodo(x + "x" + y + "y" + this.id, value,resultY.index,{x:x,y:y})
        this.id++
        this.columnas.addValor(nuevo, resultX.index, resultY.index, Apuntador.COLUMNA, this.tipo)
        this.filas.addValor(nuevo, resultX.index, resultY.index, Apuntador.FILA, this.tipo)

        //this.filas.mostrarCabecera(Apuntador.FILA)
        return nuevo


    }

    private addColumna(x: number | string) {
        let temp = this.buscarColumna(x)
        if (temp !== null) return temp
        return this.columnas.addCabecera(x, this.tipo)
    }

    private addFila(y: number | string) {
        let temp = this.buscarFila(y)
        if (temp !== null) return temp
        return this.filas.addCabecera(y, this.tipo)
    }

    private buscarColumna(x: number | string) {
        return this.columnas.buscarCabecera(x)
    }

    private buscarFila(y: number | string) {
        return this.filas.buscarCabecera(y)
    }

    public buscarValor(value:number|string){
        return this.columnas.buscarValor(value)
    }

    public graficar(){
        let data = this.columnas.mostrarCabecera(Apuntador.COLUMNA,this.tipo)
        let data2 = this.filas.mostrarCabecera(Apuntador.FILA,this.tipo)
        let data3 = this.columnas.getNodosHijos(Apuntador.COLUMNA,this.tipo)
        let data4 = this.filas.getNodosHijos(Apuntador.FILA,this.tipo)
        data.nodes = data.nodes.concat(data2.nodes)
        data.edges = data.edges.concat(data2.edges)
        //data.nodes = data.nodes.concat(data3.nodes)
        data.nodes = data.nodes.concat(data4.nodes)
        data.edges = data.edges.concat(data3.edges)
        data.edges = data.edges.concat(data4.edges)
        //console.log(data3.nodes,data4.edges,data3.edges)
        return data
    }

    public getJSON(duracion){
        let data = {
            categoria: "Estructura Compuesta",
            nombre: "Matriz Dispersa",
            animacion: duracion ,
            valores: this.columnas.getJson(Apuntador.COLUMNA)
        }

        return JSON.stringify(data)
    }
}