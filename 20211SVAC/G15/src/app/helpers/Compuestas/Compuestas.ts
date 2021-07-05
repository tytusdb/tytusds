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
                existe.setEstructura(new BinaryTree())
            }
            await existe.getEstructura().addNode(this.convertir(value), 0, false)
            return existe
        }

        let existe = await this.estructura.searchWithOutAnimation(this.convertir(index))
        if (existe === null) {
            existe = await this.estructura.addNode(this.convertir(index), null, 0, false)
            existe.setEstructura(new listaSimple())
        }
        await existe.getEstructura().InsertarFinal(value, null, null, 0, false)
        return existe

    }

    private convertir(value) {
        if (isNaN(value)) return value
        return +value
    }


    public graficar() {
        if (this.padre === Estructura.SIMPLE_ENLAZADA) return this.estructura.getViz(0)
        return this.estructura.getVizPadre(0)
    }

    public async buscar(index, value) {
        if (this.padre === Estructura.SIMPLE_ENLAZADA) {
            let result = this.estructura.search(this.convertir(index))
            if (result === null) return null
            result = result.getEstructura().searchWithOutAnimation(this.convertir(value))
            return result
        }

        let result = this.estructura.searchWithOutAnimation(this.convertir(index))
        if (result === null) return null
        result = result.getEstructura().search(this.convertir(value))
        return result
    }


    public async editar(index, viejo, nuevo) {
        if (this.padre === Estructura.SIMPLE_ENLAZADA) {
            let result = this.estructura.search(this.convertir(index))
            if (result === null) return null
            result = result.getEstructura().update(this.convertir(viejo), this.convertir(nuevo), 0, false)
            return result
        }

        let result = this.estructura.searchWithOutAnimation(this.convertir(index))
        if (result === null) return null
        result = result.getEstructura().search(this.convertir(viejo))
        if (result === null) return null
        result.setDato(this.convertir(nuevo))
        return result
    }

    public async eliminar(index, value) {
        if (this.padre === Estructura.SIMPLE_ENLAZADA) {
            let result = this.estructura.search(this.convertir(index))
            if (result === null) return null
            result = await result.getEstructura().delete(this.convertir(value), 0, false)
            return result
        }

        let result = this.estructura.searchWithOutAnimation(this.convertir(index))
        if (result === null) return null
        result = await result.getEstructura().Delete(this.convertir(value), 0, null, false)
        return (result === -1) ? null : true
    }
}