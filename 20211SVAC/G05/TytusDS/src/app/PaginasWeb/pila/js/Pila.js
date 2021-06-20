
class Nodo{
    constructor(valor){
        this.dato=valor;
        this.post=null;
    }
}

class pila {
     constructor() {
      this.tamaño = 0;
      this.uno=null;
    }
  
    guardar(valor) {
    let nodo = new Nodo(valor)
    nodo.dato=valor;
    if (this.uno==null){
        this.uno=nodo;
    }
    else{
        nodo.post=this.uno;
        this.uno=nodo;
    }
    this.tamaño++;
    }
  
    desapila(){
        if (this.uno==null){
            console.log("pila sin datos")
        }
        else{
            this.uno= this.uno.post;
            this.tamaño--;
        }
    }

    buscar(valor){
    let aux = this.uno;
    var bandera=true;
    var contador=this.tamaño-1;
    if (this.uno!=null){

        do{
            if (valor==aux.dato){
                console.log("encontrado en posicion: "+contador);
                bandera=false;
            }
        aux=aux.post;
        contador--;
        }while(aux!=null);
    }

    if (bandera==true){
        console.log("no encontrado");
    }

    }

    modificar(bus,valor){
    let aux = this.uno;
    var bandera=true;
    var contador=this.tamaño-1;
    if (this.uno!=null){
        do{
            if (bus==aux.dato){
                console.log("mofificado: ");
                aux.dato=valor;
                bandera=false;
            }
        aux=aux.post;
        contador--;
        }while(aux!=null);
    }

    if (bandera==true){
        console.log("no encontrado");
    }

    }


    imprimir(){
let aux = this.uno;
if (this.uno!=null){
    do{
        console.log(aux.dato);
        aux=aux.post;
        }while(aux!=null);

}
else{
    console.log("sin datos");
}


    }

  }

  module.exports = pila;
  


  