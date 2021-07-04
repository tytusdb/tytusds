import { listaSimple } from '../SimpleEnlazada/listaSimple'
import { BinaryTree } from '../BinaryTree/BinaryTree'
export enum Estructura {
    SIMPLE_ENLAZADA,
    ABB
}


export class Compuestas {
    private padre: Estructura
    private hijo: Estructura

    private estructura: any



    constructor(padre: Estructura, hijo: Estructura) {
        this.padre = padre
        this.hijo = hijo

        if (this.padre === Estructura.SIMPLE_ENLAZADA) this.estructura = new listaSimple();
        else if (this.padre === Estructura.ABB) this.estructura = new BinaryTree()
    }


    public async add(index, value) {
        if (this.padre === Estructura.SIMPLE_ENLAZADA) {
            let existe = this.estructura.search(index)
            if (existe === null) {
                existe = await this.estructura.InsertarFinal(index, null, null, 0, false)
                if (this.hijo === Estructura.ABB) existe.setEstructura(new BinaryTree())
            }
            if (this.hijo === Estructura.ABB) existe.getEstructura().addNode(this.convertir(value), 0, false)
            console.log(existe)
        }

    }

    private convertir(value) {
        if (isNaN(value)) return value
        return +value
    }


    public graficar() {
        let data = this.estructura.getViz(0)
        return data
    }
}