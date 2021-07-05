var nodos=[];
var punteros=[];
var nodos1=[];
var punteros1=[];
var auxnodos=[];
var auxpunteros=[];
var listan=[];
var nodol=[];
var matriz=[];
var arbol=[];
var texto="";
var cola="";
var cantidad=0;
var cadena="";
let arr;
var co=0;
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
                        alert("vertice ya existe"); 
                        bandera=false;
                        break;
                    }aux=aux.post;} 
        if (bandera==true){this.guardar(vertice);}}
        else{
            console.log("tot");
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
            }
            else if(actual==this.fin){
                anterior.post=null;
              this.fin=anterior;
            }
            else{
              anterior.post=actual.post;
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
                        nodos.push({id: aux.dato, label: aux.dato })
                        console.log(aux.dato)
                    aux=aux.post;
                    }
                 }
            else{
                console.log("sin datos");
            }
            co=0;
        }
        
}

const p = new lista();
class nodolistaaux{
    constructor(verticeo,verticef,peso,h1,h2){
        this.dato1=verticeo;
        this.dato2=verticef;
        this.dato3=peso;
        this.dato4=h1;
        this.dato5=h2;
        this.sigui=null;
    }
}

class listaaux{
    constructor() {
     this.inicio=null;
     this.final=null;}
 
   guardar(verticeo,verticef,peso,h1,h2) {
       
   let nodo = new nodolistaaux(verticeo,verticef,peso,h1,h2)
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
                        this.inicio=this.inicio.sigui;  
                        this.eliminar(vertice);
                        break;

                }
                else if(actual==this.final){
                    anterior.sigui=null;
                    this.final=anterior;
                    this.eliminar(vertice);
                    break;
                }
                else{
                  anterior.sigui=actual.sigui;
                  this.eliminar(vertice);
                  break;
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
                punteros.push({from: aux.dato1, to: aux.dato2 ,label:aux.dato3  });
                console.log(aux.dato1+" "+aux.dato2)
                aux=aux.sigui;
                }while(aux!=null);
        }
        else{
            console.log("sin datos");
        }
            }

            imprimir1(){
                let aux = this.inicio;
                if (this.inicio!=null){
                    do{
                        if (aux.dato4=="" ||aux.dato5==""){console.log( )}
                        else{punteros.push({from: aux.dato1, to: aux.dato2  ,label:aux.dato3});
                    console.log(aux.dato1+" "+aux.dato2)
                    }
                        aux=aux.sigui;
                        }while(aux!=null);
                }
                else{
                    console.log("sin datos");
                }
                    }

        

    imprimir2(){
    if(p.uno!=null){
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
    }
       
         }


         imprimir22(){
            if(p.uno!=null){
                
                var cadena="";
                let aux = p.uno;
                if (this.inicio!=null){
                    do{let aux1 = p.uno;
                        nodol.push({id: aux.dato, label: aux.dato,shape:'box' })
                        var bandera=true;
                        do{let temp = this.inicio;
                            
                            do{
                                if(aux.dato==temp.dato1  && aux1.dato==temp.dato2){
                                    bandera=false;
                                cadena+="| "+aux1.dato+" |"; }
                                temp=temp.sigui;
                                }while(temp!=null);
                           
                            
                            aux1=aux1.post;
                            }while(aux1!=null);
                    if (bandera==false){ 
                        nodol.push({id:cadena+aux.dato, label: cadena,shape:'box'});
                        listan.push({from: aux.dato, to: cadena+aux.dato , label: 5});
                        cadena=""; }
                        aux=aux.post;
                        }while(aux!=null);}
            }
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

isertar_aristas(vertice1,vertice2,peso,h1,h2){
    let aux = p1.inicio;
    var bandera=true;
        if (p1.inicio!=null){
            do{
                if(vertice1==aux.dato2  && vertice2==aux.dato1){
                    p1.guardar(vertice1,vertice2,peso,"","");
                    bandera=false;
                    break;
                }
                aux=aux.sigui;
                }while(aux!=null);
                if (bandera==true){
                    p1.guardar(vertice1,vertice2,peso,vertice1,vertice2);
                }
        }else{
            p1.guardar(vertice1,vertice2,peso,vertice1,vertice2);
        }
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
    var ele= document.getElementById("tabla");
    while (ele.firstChild) {ele.removeChild(ele.firstChild);}   
    matriz=[];
    p1.imprimir2();

}

li(){   
    listan=[];
    nodol=[];
    let ld=[];
    p1.imprimir22();
    ld.push(nodol);
    ld.push(listan);
    p.imprimir();
    console.log(listan);
    console.log(nodol);
    return ld;

}



identificar(){
    var bandera=false;
    var aux=p1.inicio;
    if (aux!=null){
        do{var aux2=p1.inicio;
            do{ 
                if(aux.dato1==aux2.dato2&&aux.dato2==aux2.dato1){
                    bandera=true;
                    break;
                }
        
            aux2=aux2.sigui;
            }while(aux2!=null);
        if (bandera==true){break;}
        aux=aux.sigui;
        }while(aux!=null)
    }

   return bandera;
}



bus(valori,valorf){
arr=[];
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
console.log();
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
arbol=[];
let str = print;
arr = str.split(' '); 
this.limpiarcola()
cadena=""

}



limpiarcola(){
    
        if(c.cuno!=null){ 
            do{
                c.eliminar();
            }
            while(c.cuno!=null);

        }

    console.log("limpio")  
}


animacionbus(){
    nodos=[];
    punteros=[];
    p1.imprimir();
    let ldata=[];
    var aux1=p.uno; 
    var bandera=true;
    var cad="";
    do{
        for(var i=0; i<arr.length; i++) { 
            if(arr[i]==aux1.dato){
                bandera=false;
                nodos.push({id: aux1.dato, label: aux1.dato , color:{
                    border:"white",background:"green"
                  }})
            }
        }
        if (bandera==true){nodos.push({id: aux1.dato, label: aux1.dato })}

        aux1=aux1.post;
        bandera=true;
    }while(aux1!=null);
   
    ldata.push(nodos);
    ldata.push(punteros);
    return ldata;
    
}

animacionbusno(){
    nodos=[];
    punteros=[];
    p1.imprimir1();
    let ldata=[];
    var aux1=p.uno; 
    var bandera=true;
    var cad="";
    do{
        for(var i=0; i<arr.length; i++) { 
            if(arr[i]==aux1.dato){
                bandera=false;
                nodos.push({id: aux1.dato, label: aux1.dato , color:{
                    border:"white",background:"green"
                  }})
            }
        }
        if (bandera==true){nodos.push({id: aux1.dato, label: aux1.dato })}

        aux1=aux1.post;
        bandera=true;
    }while(aux1!=null);
    ldata.push(nodos);
    ldata.push(punteros);
    return ldata;
    
}

bb(){
    return arr;
}


as1(){
    nodos=[];
    punteros=[];
    p.imprimir();
    p1.imprimir();
    let ldata=[];
    //this.nodos.push({id: aux.id, label: impre})
    //this.punteros.push({from: aux.id, to: aux.hojitas[i].id});
    console.log(nodos)
    console.log(punteros)
    ldata.push(nodos);
    ldata.push(punteros);
    return ldata;
}


as(){
    nodos=[];
    punteros=[];
    p.imprimir();
    p1.imprimir1();
    let ldata=[];
    ldata.push(nodos);
    ldata.push(punteros);
    console.log(nodos);
    console.log(punteros);
    return ldata;
    
}

leer(){
var aux1=p.uno;
let ldatos=[];
    if (p.uno!=null){
        do{ var aux2=p1.inicio;
            var padre =new Object();
            
            let hijo=[];
            padre.vertice=aux1.dato;
            do{var hi =new Object();
                if(aux1.dato==aux2.dato1){
                    hi.arista=aux2.dato2;
                    hi.distancia=aux2.dato3;
                    hijo.push(hi);
                }
            aux2=aux2.sigui;
            }while(aux2!=null);
            padre.aristas=hijo;
            ldatos.push(padre);
            aux1=aux1.post
        }while(aux1!=null);
    }
    else{console.log("sin datos"); }
    return ldatos;
  }


}


//const stack = new Ganchura();
  //stack.insertar_vertices(1);
  
  module.exports = cu;