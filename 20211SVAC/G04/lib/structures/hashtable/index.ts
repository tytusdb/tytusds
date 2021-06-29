class Tupla{
    clave:number
    valor:any

    constructor(clave:number, valor:any){
        this.clave = clave
        this.valor = valor
    }

}

class FuncionHash{
    tipo:number//0:simple, 1:Division, 2:multiplicacion

    constructor(tipo:number){
        this.tipo = tipo
    }

    funcionHash(valor:any, tamaño:number){
        let clave = this.stringToAscii(valor)
        switch (this.tipo) {
            //Funcion Hash Simple
            case 0:
                return this.simple(clave, tamaño)
            //Funcion Hash por Division
            case 1:
                return this.division(clave, tamaño)
            //Funcion Hash por Multiplicacion
            case 2:
                return this.multiplicacion(clave, tamaño)
        }
        return -1
    }

    private simple(clave:number, tamaño:number){
        while(clave > 1){
            clave = clave / 10
        }
        return Math.round(clave*tamaño)
    }

    private division(clave:number, tamaño:number){
        return clave % tamaño
    }

    private multiplicacion(clave:number, tamaño:number){
        let A = (Math.sqrt(5)-1)/2
        return Math.round(tamaño * ((clave*A) % 1))
    }

    stringToAscii(valor:any): number{
        valor = valor.toString()
        let suma = 0
        for (let i = 0; i < valor.length; i++) {
            suma += valor.charCodeAt(i)  
        }
        return suma
    }

}

class NodoHashAbierto{
    clave:number
    valores:Tupla[]

    constructor(clave:number){
        this.clave = clave
        this.valores = []
    }

    eliminarTupla(valor:any){
        let tupla = this.buscarTupla(valor)
        if(tupla != null){
            this.valores = this.deleteFromArray(this.valores, tupla)
            return true
        }
        return false
    }

    private buscarTupla(valor:any){
        for(let i of this.valores){
            if(i.valor  == valor){
                return i
            }
        }
        return null
    }

    private deleteFromArray(arreglo:any, valor:any){
        return arreglo.filter( function( e:any ) {
            return e !== valor;
        } );
    }

}

class TablaHashAbierta{
    tamaño:number
    funcion:FuncionHash
    tabla:NodoHashAbierto[]

    constructor(tamaño:number, tipoFuncion:number){
        this.tamaño = tamaño
        this.funcion = new FuncionHash(tipoFuncion)
        this.tabla = []
        this.crearTabla()
    }

    crearTabla(){
        for (let i = 0; i < this.tamaño; i++) {
            this.tabla.push(new NodoHashAbierto(i))
        }
    }

    insertar(valor:any){
        //Obtiene la posicion del arreglo
        let clave = this.funcion.funcionHash(valor, this.tamaño)
        //Le da al arreglo un valor
        if(this.tabla[clave].clave == -1)
            this.tabla[clave].clave = clave
        //Ingresa el valor al arreglo
        this.tabla[clave].valores.unshift(new Tupla(this.funcion.stringToAscii(valor), valor))
    }

    eliminar(valor:any){
        let clave = this.funcion.funcionHash(valor, this.tamaño)
        this.tabla[clave].eliminarTupla(valor)
    }

    actualizar(valor:any){
        let clave = this.funcion.funcionHash(valor, this.tamaño)
        if(this.tabla[clave].eliminarTupla(valor)){
            this.insertar(valor)
        }
    }

    print(){
        for (let i = 0; i < this.tabla.length; i++) {
            console.log('Posicion: '+i + ' - Clave: '+this.tabla[i].clave)
            console.log(this.tabla[i].valores)
        }
    }


}

class TablaHashCerrada{
    //Entradas y Espacios
    numEntradas:number
    tamaño:number
    //Factor de Carga
    minimo:number
    maximo:number

    tipoColision:number // 0: Lineal, 1:Cuadratica, 2:Multiplicacion
    tabla:Tupla[]
    funcion:FuncionHash

    constructor(tamaño:number, minimo:number, maximo:number, tipoColision:number, tipoFuncion:number){
        //Configuracion Tabla
        this.numEntradas = 0
        this.tamaño = tamaño
        this.tipoColision = tipoColision
        //Factor de carga
        this.minimo = minimo
        this.maximo = maximo
        //Tabla Hash
        this.tabla = []
        this.tabla = this.crearTabla()
        //Funcion
        this.funcion = new FuncionHash(tipoFuncion)
    }

    factorCarga(){
        return Math.round((this.numEntradas/this.tamaño)*100)
    }

    crearTabla(){
        let tabla = []
        for (let i = 0; i < this.tamaño; i++){
            tabla.push(new Tupla(-1, null))
        }
        return tabla
    }


    //PRUEBAS DE COLISION ------------------------------------------------------------------------->
    pruebaLineal(valor:any, clave:number, tabla:Tupla[]){
        if(this.tabla[clave].clave == -1){
            //Si la posición no tiene ningun valor solo se agrega
            tabla[clave] = new Tupla(this.funcion.stringToAscii(valor),valor)
        }else{
            //Aplica la prueba de nuevo 
            this.pruebaLineal(valor, (clave+1)%this.tamaño, tabla)
        }
        return tabla
    }


    pruebaCuadratica(valor:any, clave:number, agregar:number, tabla:Tupla[]){
        //Cambiar valor de la clave
        let id = (clave + (agregar*agregar)) % this.tamaño
        //Verificar si la posicon no tiene valor
        if(this.tabla[id].clave == -1){
            //Posicion Vacia ingresar la tupla
            tabla[id] = new Tupla(this.funcion.stringToAscii(valor),valor)
        }else{
            //Posocion con elemento volver a aplicar la prueba
            this.pruebaCuadratica(valor, clave, agregar+1, tabla)
        }
        return tabla
    }

    dobleHash(valor:any, clave:number, agregar:number, tabla:Tupla[]){
        //Cambiar valor y hacer el segundo Hash
        let id = this.funcion.funcionHash(clave,this.tamaño)
        if(this.tabla[id].clave == -1){
            //Posicion Vacia ingresar la tupla
            tabla[id] = new Tupla(this.funcion.stringToAscii(valor),valor)
        }else{
            //Posocion con elemento volver a aplicar la prueba
            this.pruebaCuadratica(valor, clave, agregar+1, tabla)
        }
        return tabla
    }

    print(){
        console.log(this.tabla)
        console.log('Factor de Carga: '+this.factorCarga()+'%')
        console.log()
    }
}

