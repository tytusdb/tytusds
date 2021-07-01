var nodos=[];
var punteros=[];
var nodos1=[];
var punteros1=[];
var matriz=[];
var texto="";

class Nodocola{
    constructor(valor){
        this.dato=valor;
        this.posterior=null;
        this.ant=null
    }
}


class cola{
    constructor(){
        this.cuno=null;
        this.cfin=null;
        this.ctamaño=0;
    }
    insertar(valor){
        let nodo = new Nodocola(valor)
        nodo.dato=valor;
        if(this.cuno==null){
            this.cuno=nodo;
            this.cfin=nodo
            }else{
            nodo.posterior=this.cuno;
            this.cuno=nodo;}
            this.ctamaño++
    }

    eliminar(){
        var copia="";
        let actual = this.cuno;
        let anterior = null;

        if (this.cuno!=null){
            do{
                if(actual==this.cfin){
                    if(actual==this.cuno){
                      this.cuno=this.cuno.posterior;
                }else{
                  anterior.posterior=null;
                  this.cfin=anterior;
                  } copia=actual.dato;
                } 
                anterior=actual;
                actual=actual.posterior;
                }while(actual!=null);
                this.ctamaño--
                return copia;
                }
                
        
         }


}

const c = new cola();



class nodolista{
    constructor(vertice){
        this.dato=vertice;
        this.post=null;
    }
}

class lista {
    constructor() {
     this.uno=null
     this.fin=null;
    this.tamaño=0;}
 
   guardar(vertice) {
    this.tamaño++;
   let nodo = new nodolista(vertice)
   nodo.dato=vertice;
   if (this.uno==null){
       this.uno=nodo;
    this.fin=this.uno;}
   else{
    this.fin.post=nodo;
    this.fin=this.fin.post;
       //nodo.post=this.uno;
       //this.uno=nodo;
    }
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

const p = new lista();
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
     this.inicio=null;
     this.final=null;}
 
   guardar(verticeo,verticef,peso) {
   let nodo = new nodolistaaux(verticeo,verticef,peso)
   nodo.dato1=verticeo;
   nodo.dato2=verticef;
   nodo.dato3=peso;
   if (this.inicio==null){
       this.inicio=nodo;
    this.final=this.inicio;}
   else{
       this.final.sigui=nodo;
       this.final=this.final.sigui;
       //nodo.sigui=this.inicio;
       //this.inicio=nodo;
    }
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
    imprimir2(){
        let au = p.uno;
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.innerHTML =" ";
        tr.appendChild(th);
        do{
            var th = document.createElement("th");
            th.innerHTML =au.dato;
            tr.appendChild(th);
            th.style.textAlign="center";
            th.style.border="5px solid";
            au=au.post;
        }while(au!=null);

        document.getElementById("tabla").appendChild(tr);



        var cadena="";
        let aux = p.uno;
        if (this.inicio!=null){
            //var tabla = document.createElement("table");
            
            
            
            do{let aux1 = p.uno;
                var tr = document.createElement("tr");
                var th = document.createElement("th");
                th.innerHTML =aux.dato;
                tr.appendChild(th);
                th.style.textAlign="center";
                th.style.border="5px solid";
                do{let temp = this.inicio;
                    var bandera=true;
                    
                    do{var th = document.createElement("th");
                        if(aux.dato==temp.dato1  &&aux1.dato==temp.dato2){
                            bandera=false;
                            th.innerHTML =temp.dato3;
		                    tr.appendChild(th);
                            th.style.textAlign="center";
                        th.style.border="1px solid";
                            cadena+=temp.dato3+"|";
                        }
                        temp=temp.sigui;
                        }while(temp!=null);
                        if (bandera==true){cadena+="0|";  th.innerHTML ="0"; tr.appendChild(th);
                        th.style.textAlign="center";
                        th.style.border="1px solid";
                    }
                    aux1=aux1.post;
                    
                    }while(aux1!=null);
                document.getElementById("tabla").appendChild(tr);
                var elem=document.getElementById("tabla");
                elem.style.background = 'white';
                elem.style.borderCollapse="collapse";
                elem.style.width="70%";
                elem.style.backgroundColor="#ffffff";
                elem.style.color="black";
                elem.style.margin="0px auto";
                elem.style.textAlign="center";
                elem.style.border="1px solid";
                //tabla.appendChild(tr)
                aux=aux.post;
                console.log(cadena);
                cadena="";
                }while(aux!=null);}
                
                //document.getElementById("tabla").appendChild(tabla)
         }
}


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
matriz(){  
    matriz=[];
    p1.imprimir2();

}

bus(valor){
nodos1.push({id: valor, label: valor})
//punteros.push({from: aux.dato1, to: aux.dato2  ,label:aux.dato3});
texto+=valor+"->";
var aux1=p.uno;
var aux2=p1.inicio;
var aux3=c.cuno;
var actual=valor;
matriz=[];
matriz.push(actual);
do{
    if (actual==aux2.dato1){
        matriz.push(aux2.dato2);
        c.insertar(aux2.dato2)
        punteros1.push({from: aux2.dato1, to: aux2.dato2  ,label:aux2.dato3});
}aux2=aux2.sigui;
}while(aux2!=null)

if (c.cuno!=null){
    this.bus1();}
else{
console.log(texto);
texto="";
}
}


bus1(){
    var aux1=p.uno;
    var aux3=c.cuno;
    var actual;
    var aux2=p1.inicio;
    var bandera=true;
    do{
        if (c.ctamaño>0){
        actual=c.eliminar();
        matriz.push(actual)
        texto+=actual+"->";
        nodos1.push({id: actual, label: actual});
    }
    
            do{
            if (actual==aux2.dato1){
                for (var i=0; i<matriz.length; i++) { 
                    if(matriz[i]==aux2.dato2){
                        bandera=false;
                    }}
                if (bandera==true){
                c.insertar(aux2.dato2)
                matriz.push(aux2.dato2);
                bandera=true;
                punteros1.push({from: aux2.dato1, to: aux2.dato2  ,label:aux2.dato3});
                } bandera=true;
                }
            aux2=aux2.sigui;
            }while(aux2!=null)
            aux2=p1.inicio;
        
        if(c.ctamaño==0){
            break;
        }
   
    }while(c.ctamaño>0);
    console.log(texto);
    texto="";
    }


as1(){
    let ldata=[];
    ldata.push(nodos1);
    ldata.push(punteros1);
    nodos1=[];
    punteros1=[];
    return ldata;
    
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