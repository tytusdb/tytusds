class Nodo{
    constructor(valor,valor1){
        this.dato=valor;
        this.dato1=valor1;
        this.post=null;
        this.ant=null
    }
}

class cola_prioridad{
    constructor(){
        this.uno=null;
        this.fin=null;
        this.tamaño=0;
    }








guardar(valor,valor1){
    let nodo = new Nodo(valor,valor1)
    let aux1;
    let aux2;
    if(this.uno==null){
       this.uno=nodo;
        nodo.post=null;
        this.fin=nodo;
    }else{ aux1=this.uno;
        while(aux1!=null){
            aux2=aux1.post;
            if(nodo.dato<aux1.dato){
                nodo.post=this.uno;
                this.uno=nodo;
                this.fin=this.uno;
                break;}
            else{
                if(nodo.dato>=aux1.dato && aux2==null){
                    aux1.post=nodo;
                    nodo.post=null;
                    this.fin=nodo;
                    break;
                }else{  if(aux1.dato<=nodo.dato && aux2.dato>nodo.dato){
                    aux1.post=nodo;
                    nodo.post=aux2;
                    break;
                    }else{aux1=aux1.post;}
                    }}}
    }}


eliminar(){
    let actual = this.uno;
    let anterior = null;
    if (this.uno!=null){
        this.uno=this.uno.post;
            
    }
    else{
        console.log("sin datos");
    }
     }

modificar(bus,valor,valor1){
    let aux = this.uno;
    var bandera=true;
    var contador=this.tamaño-1;
    let actual = this.uno;
    let anterior = null;
    let nodo = new Nodo(valor,valor1)
    let aux1;
    let aux2;
    if (this.uno!=null){
        do{
            if (bus==aux.dato1){
                console.log("mofificado: ");
                bandera=false;
        //elimina el nodo-------------------------
                while(actual!=null){
                    if(actual.dato1==bus){
                        if(actual==this.uno){  inicio=inicio.post;}
                        else{anterior.post=actual.post;}  }
                     anterior=actual;
                     actual=actual.post;
                    }  
        // guarda  nuevos valores-----------------
            if(this.uno==null){
                this.uno=nodo;
                nodo.post=null;
                this.fin=nodo;
            }else{ aux1=this.uno;
                while(aux1!=null){
                    aux2=aux1.post;
                    if(nodo.dato<aux1.dato){
                        nodo.post=this.uno;
                        this.uno=nodo;
                        this.fin=this.uno;
                        break;}
                    else{
                        if(nodo.dato>=aux1.dato && aux2==null){
                            aux1.post=nodo;
                            nodo.post=null;
                            this.fin=nodo;
                            break;
                        }else{  if(aux1.dato<=nodo.dato && aux2.dato>nodo.dato){
                            aux1.post=nodo;
                            nodo.post=aux2;
                            break;
                            }else{aux1=aux1.post;}
                            }}}}
        
                    break;}
        aux=aux.post;
        contador--;
        }while(aux!=null);
    }else{
        console.log("sin datos");
    }

    if (bandera==true){console.log("no encontrado");}

}

buscar(bus){
    let aux = this.uno;
    var bandera=true;
    if (this.uno!=null){
        do{
            if (bus==aux.dato1){
                bandera=false
                console.log("prioridad"+aux.dato);
                break;
            }
            aux=aux.post;
            }while(aux!=null);
    }
    else{
        console.log("sin datos");
    }
    if (bandera==true){console.log("no encontrado");}
}

imprimir(){
    let aux = this.uno;
    if (this.uno!=null){
        do{
            console.log(aux.dato+"  "+aux.dato1);
            aux=aux.post;
            }while(aux!=null);
    }
    else{
        console.log("sin datos");
    }
     }
    }



const stack = new cola_prioridad();
stack.guardar(5,"a");
stack.guardar(5,"b");
stack.guardar(2,"c");
stack.guardar(3,"c");
stack.guardar(3,"d");
stack.guardar(0,"x1");
stack.guardar(1,"f");
stack.guardar(0,"x2");
stack.guardar(2,"h");
stack.guardar(1,"i");
stack.guardar(0,"x3");
stack.guardar(0,"x4");
stack.guardar(4,"l");
stack.guardar(3,"m");
stack.guardar(1,"ñ");
stack.guardar(0,"x5");
stack.guardar(2,"o");
stack.guardar(5,"p");
stack.guardar(2,"q");
stack.guardar(1,"aaaa");
stack.modificar("x5",100,"john");
stack.modificar("john",-1,"john");
stack.eliminar();
stack.buscar("m");


  stack.imprimir();