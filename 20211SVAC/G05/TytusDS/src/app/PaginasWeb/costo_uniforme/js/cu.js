var nodos=[];
var punteros=[];
var nodos1=[];
var punteros1=[];
var matriz=[];
var arbol=[];
var texto="";
var cola="";
var cantidad=0;
var cadena="";
class Nodop{
    constructor(valor1,valor2,valor3,valor4){
        this.dato1=valor1;
        this.dato2=valor2;
        this.dato3=valor3;
        this.dato4=valor4;
        this.post=null;
        this.ant=null
    }
}

class cola_prioridad{
    constructor(){
        this.cuno=null;
        this.cfin=null;
        this.tamaño=0;
        this.av=true;}

        guardar(valor1,valor2,valor3,valor4){
            let nodo = new Nodop(valor1,valor2,valor3,valor4)
            let aux1;
            let aux2;
            if(this.cuno==null){
               this.cuno=nodo;
                nodo.post=null;
                this.cfin=nodo;
            }else{ aux1=this.cuno;
                while(aux1!=null){
                    aux2=aux1.post;
                    if(nodo.dato1<aux1.dato1){
                        nodo.post=this.cuno;
                        this.cuno=nodo;
                        this.cfin=this.cuno;
                        break;}
                    else{
                        if(nodo.dato1>=aux1.dato1 && aux2==null){
                            aux1.post=nodo;
                            nodo.post=null;
                            this.cfin=nodo;
                            break;
                        }else{  if(aux1.dato1<=nodo.dato1 && aux2.dato1>nodo.dato1){
                            aux1.post=nodo;
                            nodo.post=aux2;
                            break;
                            }else{aux1=aux1.post;}
                            }}
                        
                        }}
        }
        eliminar(){
            let actual = this.cuno;
            let anterior = null;
            if (this.cuno!=null){
                cola=this.cuno.dato3;
                cadena=this.cuno.dato4;
                cantidad=this.cuno.dato1;
                this.cuno= this.cuno.post;   
            return cola;}
             }



}



const c = new cola_prioridad();


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



class cu{
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

bus(valori,valorf){
var actual=valori;
var aux1=p.uno;
var aux2=p1.inicio;
var resultado
var bandera=true;
var print="";
cantidad=0;

do{
arbol.push(actual);
if (actual==valorf){
//break;
console.log("k");
}
var aux2=p1.inicio;
do{
    if(aux2.dato1==actual){
        for(var i=0; i<arbol.length; i++) { 
            if(arbol[i]==aux2.dato2){
                bandera=false;
            }}
            if (bandera==true){
                var n=parseInt(aux2.dato3)+parseInt(cantidad);
                var h=cadena+" "+aux2.dato1;
                c.guardar(n,aux2.dato1,aux2.dato2,h);
            } bandera=true; 
    }
aux2=aux2.sigui;
}while(aux2!=null);
if(c.cuno!=null){ actual=c.eliminar();  }
}while(actual!=valorf);
//console.log(actual+cantidad);
print=cadena+" "+actual;
console.log(print);



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
  
  module.exports = cu;