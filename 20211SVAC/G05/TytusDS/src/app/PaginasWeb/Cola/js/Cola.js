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
    var element=document.createElement("button");
        var myDiv=document.getElementById("myDiv1");
          var content=document.createTextNode(valor);
          element.appendChild(content);
          element.style.backgroundColor='rgb(25, 25, 112)'; 
          element.style.color='rgb(255,255,255)';
          element.style.fontSize='15px'; 
          element.style.borderRadius="5px";
          element.style.boxShadow="0 9px black";
          element.style.width="125px";
          element.style.height="40px";
          myDiv.insertBefore(element, myDiv.firstElementChild);
          
          
          var pos = -30;
          var id = setInterval(frame, 4);
    function frame() {
        if (pos == 30) { clearInterval(id);} 
        else {
            pos++;
            myDiv.style.top = pos + 'px';
            myDiv.style.left =55 + 'px';
        }
    }
    var element1=document.createElement("button");
    var myDiv1=document.getElementById("myDiv1");
    var content1=document.createTextNode("Encolar");
    element1.appendChild(content1);
    element1.style.backgroundColor='rgb(53,204,0)'; 
    element1.style.color='rgb(255,255,255)';
    element1.style.width="120px";
    element1.style.height="30px";
    myDiv1.insertBefore(element1, myDiv1.firstElementChild);
    var eli=function(){
        var puntero=document.getElementById("myDiv1");
        puntero.removeChild(puntero.childNodes[0]); 
        };
        setTimeout(eli,600);




}

insertar2(valor){
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
            var puntero=document.getElementById("myDiv1");
        if (puntero.childNodes.length>0) 
            puntero.removeChild(puntero.childNodes[puntero.childNodes.length-1]);  
            var element1=document.createElement("button");
            var myDiv1=document.getElementById("myDiv1");
            var content1=document.createTextNode("Desencolar");
            element1.appendChild(content1);
            element1.style.backgroundColor='rgb(213,0,36)'; 
            element1.style.color='rgb(255,255,255)';
            element1.style.width="120px";
            element1.style.height="30px";
            myDiv1.insertBefore(element1, myDiv1.firstElementChild);
            var eli=function(){
                puntero.removeChild(puntero.childNodes[0]); 
             };
             setTimeout(eli,500);     
             


    }
    else{
        alert("Cola sin datos");
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

leer(){
    let ldatos=[];
    let aux = this.uno;
    if (this.uno!=null){
        do{
            ldatos.push(aux.dato);
            aux=aux.post;
            }while(aux!=null);}
    else{console.log("sin datos"); }
    
    return ldatos;
  }


  pintar(){
    var ele= document.getElementById("myDiv1");
    while (ele.firstChild) {ele.removeChild(ele.firstChild);}   
    let aux = this.uno;
if (this.uno!=null){ do{
    var element=document.createElement("button");
    var myDiv=document.getElementById("myDiv1");
    var content =document.createTextNode(aux.dato);
    element.appendChild(content);
    element.style.backgroundColor='rgb(25, 25, 112)'; 
    element.style.color='rgb(255,255,255)';
    element.style.fontSize='15px'; 
    element.style.borderRadius="5px";
    element.style.boxShadow="0 9px black";
    element.style.width="125px";
    element.style.height="40px";
    //myDiv.insertBefore(element, myDiv.firstElementChild);
    myDiv.appendChild(element);

    
    aux=aux.post; }while(aux!=null);}
else{
    alert("Pila vacia"); 
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

    module.exports = cola;



