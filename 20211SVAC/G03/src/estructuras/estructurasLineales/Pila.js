class Nodo{
    constructor(valor){        
        this.valor = valor;
        this.siguiente = null;
        this.id = null;
    }
}

class Pila{
    constructor(){
        this.cabeza = cabeza;  
        this.contador = 0;   
        this.contadorPilas = 0;    
    }
    agregar(elemento){
        this.contador ++;
        let nodonuevo = new Nodo(elemento);
        nodonuevo.id = this.contador;
        if (this.cabeza == null){
            this.cabeza = nodonuevo;
            

        }else{
            nodonuevo.siguiente = this.cabeza;
            this.cabeza = nodonuevo
        }

    }


    eliminar(){
        inicio = this.cabeza;
        this.cabeza = this.cabeza.siguiente
        return inicio;
    }
   	
 }