
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
       this.uno=nodo;}}
    

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


     imprimir(){ 
        let aux = this.uno;
        var bandera=true;
        if (this.uno!=null){
            while(aux!=null){
                        console.log(aux.dato);
                    aux=aux.post;} }
            else{
                console.log("sin datos");
            }
        }
        
}




class nodolistaaux{
    constructor(verticeo,verticef){
        this.dato1=verticeo;
        this.dato2=verticef;
        this.sigui=null;
    }
}

class listaaux{
    constructor() {
     this.inicio=null;}
 
   guardar(verticeo,verticef) {
   let nodo = new nodolistaaux(verticeo,verticef)
   nodo.dato1=verticeo;
   nodo.dato2=verticef;
   if (this.inicio==null){
       this.inicio=nodo;}
   else{
       nodo.sigui=this.inicio;
       this.inicio=nodo;}}

       imprimir(){
        let aux = this.inicio;
        if (this.inicio!=null){
            do{
                console.log(aux.dato1+" "+aux.dato2);
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

guardar_vertices(vertice1,vertice2){
    p1.guardar(vertice1,vertice2);
}

tamaño(){
    this.vertice=p.tamaño;
    console.log("tamaño"+this.vertice);
    p.imprimir();
    console.log("punteros");
    p1.imprimir();
}





}



const stack = new Ganchura();
  stack.insertar_vertices(1);
  stack.insertar_vertices(2);
  stack.insertar_vertices(3);
  stack.insertar_vertices(4);
  stack.insertar_vertices(4);
  stack.insertar_vertices(2);
  stack.guardar_vertices(2,1);
  stack.guardar_vertices(1,1);
  stack.guardar_vertices(4,3);
  stack.tamaño();
