import { Tipo } from "./Dispersa";
import { NodoCabecera } from "./NodoCabecera";


export class ListaCabecera{
    private primero:NodoCabecera
    private ultimo: NodoCabecera
    private id:number
    
    constructor(){
        this.primero = null 
        this.ultimo = null
        this.id = 0
    }

    public buscarCabecera(value:number|string){
        if(this.primero === null) return null 
        let temp:NodoCabecera = this.primero 
        while(temp !== null){
            if(temp.getValue() === value) return temp
            temp = temp.getSiguiente();
        }
        return null
    }

    public addCabecera(value:number|string,tipo:Tipo){
        let nuevo:NodoCabecera = new NodoCabecera(this.id,value)
        this.id++
        if(this.primero === null){
            this.primero = nuevo 
            this.ultimo = nuevo 
            return nuevo
        }

        if(this.primero.getValue() >= nuevo.getValue()){
            nuevo.setSiguiente(this.primero)
            if(Tipo.DOBLE === tipo) this.primero.setAnterior(nuevo)
            this.primero = nuevo 
            return nuevo
        }

        if(this.ultimo.getValue() < nuevo.getValue()){
            this.ultimo.setSiguiente(nuevo)
            if(Tipo.DOBLE === tipo) nuevo.setAnterior(this.ultimo)
            this.ultimo = nuevo 
            return nuevo  
        }

        let temp = this.primero
        while(temp !== null){
            let siguiente = temp.getSiguiente()
            if(nuevo.getValue() >= temp.getValue() && nuevo.getValue() < siguiente.getValue()){
                nuevo.setSiguiente(siguiente)
                temp.setSiguiente(nuevo)
                if(Tipo.DOBLE === tipo){
                    siguiente.setAnterior(nuevo)
                    nuevo.setAnterior(temp)
                }
                return nuevo
            }
            temp = temp.getSiguiente()
        }
        return null
    }

    public mostrarCabecera(){
        let temp:NodoCabecera = this.primero 
        let res = ""
        while(temp !== null){
            res += "," + temp.getValue()
            temp = temp.getSiguiente()
        }
        console.log(res)
    }
}