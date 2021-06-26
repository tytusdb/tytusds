var nodos=[];
var punteros=[];
class nodolista{
    constructor(vertice){
        this.dato=vertice;
        this.post=null;
    }
}

class lista {
    constructor() {
     this.uno=null;
    this.tamaño=0;}
 
   guardar(vertice) {
    this.tamaño++;
   let nodo = new nodolista(vertice)
   nodo.dato=vertice;
   if (this.uno==null){
       this.uno=nodo;}
   else{nodo.post=this.uno;
       this.uno=nodo;}
    }

       buscar1(vertice){ 
        let aux = this.uno;
        var bandera=true;
        if (this.uno!=null){
            while(aux!=null){
                    if (vertice==aux.dato){
                        console.log("vertice ya existe");
                        bandera=false;
                    }aux=aux.post;} 
        if (bandera==true){this.guardar(vertice);}}
        else{
            this.guardar(vertice);
            }}

    eliminar(vertice){
    let actual = this.uno;
    let anterior = null;
    if (this.uno!=null){
        do{
            if(actual.dato==vertice){
                if(actual==this.uno){
                  this.uno=this.uno.post;
                  break;
            }else{
              anterior.post=actual.post;
              break;
              }} 
            anterior=actual;
            actual=actual.post;
            }while(actual!=null);
    }

    }

    modificar(vertice,nuevo){
        let aux = this.uno;
    if (this.uno!=null){
        do{
            if(aux.dato==vertice ){
                aux.dato=nuevo;
            }
            aux=aux.post;
            }while(aux!=null);}
    
        }


     imprimir(){ 
        let aux = this.uno;
        var bandera=true;
        if (this.uno!=null){
            while(aux!=null){
                        console.log(aux.dato);
                        nodos.push({id: aux.dato, label: aux.dato})
                    aux=aux.post;} }
            else{
                console.log("sin datos");
            }
        }
        
}


class nodolistaaux{
    constructor(verticeo,verticef,peso){
        this.dato1=verticeo;
        this.dato2=verticef;
        this.dato3=peso;
        this.sigui=null;
    }
}

class listaaux{
    constructor() {
     this.inicio=null;}
 
   guardar(verticeo,verticef,peso) {
   let nodo = new nodolistaaux(verticeo,verticef,peso)
   nodo.dato1=verticeo;
   nodo.dato2=verticef;
   nodo.dato3=peso;
   if (this.inicio==null){
       this.inicio=nodo;}
   else{
       nodo.sigui=this.inicio;
       this.inicio=nodo;}
    }

    eliminar(vertice){
        let actual = this.inicio;
        let anterior = null;
        if (this.inicio!=null){
            do{
                if(actual.dato1==vertice ||actual.dato2==vertice){
                    if(actual==this.inicio){
                      this.uno=this.inicio.sigui;
                      
                }else{
                  anterior.sigui=actual.sigui;
                  
                  }} 
                anterior=actual;
                actual=actual.sigui;
                }while(actual!=null);
        }
    
        }

        modificar(vertice,nuevo){
            let aux = this.inicio;
        if (this.inicio!=null){
            do{
                if(aux.dato1==vertice ){
                    aux.dato1=nuevo;
                }
                if(aux.dato2==vertice){
                    aux.dato2=nuevo;
                }
                aux=aux.sigui;
                }while(aux!=null);}
        
            }

       imprimir(){
        let aux = this.inicio;
        if (this.inicio!=null){
            do{
                punteros.push({from: aux.dato1, to: aux.dato2  ,label:aux.dato3});
                aux=aux.sigui;
                }while(aux!=null);
        }
        else{
            console.log("sin datos");
        }
            }


}

const p = new lista();
const p1 = new listaaux();
class Ganchura{
constructor(){
    this.vertice=0;
    this.aristas=0;
    this.inicio=null;
    this.fin=null;
    this.adyacensia=[];
    this.datos=[];
    this.vertices=[];
    this.punteros=[];
}

insertar_vertices(vertice1){
        p.buscar1(vertice1);
}

isertar_aristas(vertice1,vertice2,peso){
    p1.guardar(vertice1,vertice2,peso);
}
eliminar(vertice){
    p.eliminar(vertice);
    p1.eliminar(vertice);
}
modificar(vertice,nuevo){
    p.modificar(vertice,nuevo);
    p1.modificar(vertice,nuevo);
}

tamaño(){
    this.vertice=p.tamaño;
    p.imprimir();
    p1.imprimir();
}

as(){
    nodos=[];
    punteros=[];
    p.imprimir();
    p1.imprimir();
    let ldata=[];
    //this.nodos.push({id: aux.id, label: impre})
    //this.punteros.push({from: aux.id, to: aux.hojitas[i].id});
    ldata.push(nodos);
    ldata.push(punteros);
    console.log(ldata);
    return ldata;
    
}


}



//const stack = new Ganchura();
  //stack.insertar_vertices(1);
  
  module.exports = Ganchura;