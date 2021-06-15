class Nodo{
    constructor(valor){
        this.dato=valor;
        this.post=null;
        this.ant=null
    }

}

class cola{
    constructor(){
        this.uno=null;
        this.fin=null;
        this.tamaño=0;
    }
insertar(valor){
    let nodo = new Nodo(valor)
    nodo.dato=valor;
    if(this.uno==null){
        this.uno=nodo;
        this.fin=nodo
        }else{
            nodo.post=this.uno;
        this.uno=nodo;
        
        }
    this.tamaño++;
}

eliminar(){
    let actual = this.uno;
    let anterior = null;
    if (this.uno!=null){
        do{
            if(actual==this.fin){
                if(actual==this.uno){
                  this.uno=this.uno.post;
            }else{
              anterior.post=null;
              this.fin=anterior;
              }} 
            anterior=actual;
            actual=actual.post;
            }while(actual!=null);
    }
    else{
        console.log("sin datos");
    }
     }


buscar(valor){
    let aux = this.uno;
    var contador=this.tamaño-1;
    bandera=true
    if (this.uno!=null){
        do{
            if (valor==aux){
                console.log("esta en: "+contador);
                bandera=false
            }
            aux=aux.post;
            }while(aux!=null);
    }
    else{
        console.log("sin datos");
    }
    if (bandera==true){console.log("no encontrado");}
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



const stack = new cola();
  stack.insertar("john");
  stack.insertar("john1");
  stack.insertar("john2");
  stack.insertar("jo1");
  stack.insertar("jo2");
  stack.insertar("jo3");
  stack.insertar("jo4");
  stack.eliminar();

  stack.imprimir();
 