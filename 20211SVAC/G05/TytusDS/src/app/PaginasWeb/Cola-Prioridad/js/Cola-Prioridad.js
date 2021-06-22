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
                    }}
                
                }
}


var element1=document.createElement("button");
    var myDiv1=document.getElementById("myDiv1");
    var content1=document.createTextNode(valor);
    element1.appendChild(content1);
    element1.style.backgroundColor='rgb(0,0,0)'; 
    element1.style.color='rgb(255,255,255)';
    element1.style.width="40px";
    element1.style.height="30px";
    myDiv1.appendChild(element1);
    //myDiv1.insertBefore(element1, myDiv1.firstElementChild);

    var element=document.createElement("button");
    var myDiv=document.getElementById("myDiv1");
    var content =document.createTextNode(valor1);
    element.appendChild(content);
    element.style.backgroundColor='rgb(25, 25, 112)'; 
    element.style.color='rgb(255,255,255)';
    element.style.fontSize='15px'; 
    element.style.borderRadius="5px";
    element.style.boxShadow="0 9px black";
    element.style.width="125px";
    //myDiv.insertBefore(element, myDiv.firstElementChild);
    myDiv.appendChild(element);
    window.scroll({
        top: 2000,
        left: 100,
        behavior: 'smooth'
      });



}

guardar2(valor,valor1){
        let nodo = new Nodo(valor,valor1)
        let aux1;
        let aux2;
        let aux=this.uno;
        var  bandera=true;
        do{if (valor==aux.dato){
            bandera=false;
            break;}
            aux=aux.post;
        }while(aux!=null);

        if (bandera==true){
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
     }
        }
        else{
            alert("dato no valido");
        }

}




eliminar(){
    let actual = this.uno;
    let anterior = null;
    if (this.uno!=null){
        this.uno= this.uno.post;
            
              var puntero=document.getElementById("myDiv1");
              if (puntero.childNodes.length>0) {
                  puntero.removeChild(puntero.childNodes[0]); 
                  puntero.removeChild(puntero.childNodes[0]); }
            
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

modificar(bus,valor){
    let aux = this.uno;
    var bandera=true;
    if (this.uno!=null){
        do{
        if (bus==aux.dato1){
            console.log("mofificado: ");
            alert("modificado");
            aux.dato1=valor;
            bandera=false;
            break;}
        aux=aux.post;
    }while(aux!=null);}
    if (bandera==true){alert("no encontrado"); console.log("no encontrado");}
}

modificar2(bus,valor){
    let aux = this.uno;
    var bandera=true;
    var bandera2=true;
    if (this.uno!=null){
        do{
            if (valor==aux.dato1){
                bandera2=false;
                console.log(valor);
                alert("dato ya existe");
                bandera=false;
                break;}
            aux=aux.post;
        }while(aux!=null);

        if (bandera2==true){
            aux = this.uno;
            do{ 
                if (bus==aux.dato1){
                alert("modificado");
                aux.dato1=valor;
                bandera=false;
            break;}
        aux=aux.post;}while(aux!=null);
    }
    }
    if (bandera==true){alert("no encontrado"); console.log("no encontrado");}}




buscar(valor){
    var ele= document.getElementById("myDiv1");
    while (ele.firstChild) {
        ele.removeChild(ele.firstChild);}   
   var contar=this.tamaño;
    let aux = this.uno;
    var bandera=true;
    var bandera1=true;
    if (this.uno!=null){
        //while(aux!=null){
        
        var fun=function(){
                bandera1=false;
                if (valor==aux.dato1){
                    bandera=false;
                    var element1=document.createElement("button");
                    var myDiv1=document.getElementById("myDiv1");
                    var content1=document.createTextNode("Prio: "+aux.dato);
                    element1.appendChild(content1);
                    element1.style.backgroundColor='rgb(0,0,0)'; 
                    element1.style.color='rgb(255,255,255)';
                    element1.style.width="40px";
                    myDiv1.appendChild(element1);
                    //myDiv1.insertBefore(element1, myDiv1.firstElementChild);

                    var element=document.createElement("button");
                    var myDiv=document.getElementById("myDiv1");
                    var content =document.createTextNode(aux.dato1);
                    element.appendChild(content);
                    element.style.backgroundColor='rgb(38,193,0)'; 
                    element.style.color='rgb(255,255,255)';
                    element.style.fontSize='15px'; 
                    element.style.borderRadius="5px";
                    element.style.boxShadow="0 9px black";
                    element.style.width="125px";
                    element.style.height="40px";
                    myDiv.appendChild(element);
                    window.scroll({
                        top: 2000,
                        left: 100,
                        behavior: 'smooth'
                      });
                    //myDiv.insertBefore(element, myDiv.firstElementChild);
                    
                }
                else{
                    var element1=document.createElement("button");
                    var myDiv1=document.getElementById("myDiv1");
                    var content1=document.createTextNode("Prio: "+aux.dato);
                    element1.appendChild(content1);
                    element1.style.backgroundColor='rgb(0,0,0)'; 
                    element1.style.color='rgb(255,255,255)';
                    element1.style.width="40px";
                    myDiv1.appendChild(element1);
                    //myDiv1.insertBefore(element1, myDiv1.firstElementChild);

                    var element=document.createElement("button");
                    var myDiv=document.getElementById("myDiv1");
                    var content =document.createTextNode(aux.dato1);
                    element.appendChild(content);
                    element.style.backgroundColor='rgb(25, 25, 112)'; 
                    element.style.color='rgb(255,255,255)';
                    element.style.fontSize='15px'; 
                    element.style.borderRadius="5px";
                    element.style.boxShadow="0 9px black";
                    element.style.width="125px";
                    element.style.height="40px";
                    myDiv.appendChild(element);
                    window.scroll({
                        top: 2000,
                        left: 100,
                        behavior: 'smooth'
                      });
                    //myDiv.insertBefore(element, myDiv.firstElementChild);
                   
                }
                aux=aux.post;
                    var pos = 0;
                    var id = setInterval(frame, 10);
    function frame() { if (pos == 50) { clearInterval(id);} 
        else { pos++; myDiv.style.top = pos + 'px'; myDiv.style.left = 55 + 'px';}}
              
              if (aux==null){  
                if(bandera1==false){ if (bandera==true){alert("dato no encontrado");}}
                  clearInterval(intervalo);}
            };
        
        var intervalo = setInterval(fun,1000);
    }
        else{
            alert("Pila vacia"); 
        }
}

buscarespecial(){
    var ele= document.getElementById("myDiv1");
    while (ele.firstChild) {
        ele.removeChild(ele.firstChild);}   
    let aux = this.uno;
    var bandera=true;
    var bandera1=true;
    if (this.uno!=null){
        //while(aux!=null){
        var fun=function(){
                bandera1=false;
                    var element1=document.createElement("button");
                    var myDiv1=document.getElementById("myDiv1");
                    var content1=document.createTextNode("Prio: "+aux.dato);
                    element1.appendChild(content1);
                    element1.style.backgroundColor='rgb(0,0,0)'; 
                    element1.style.color='rgb(255,255,255)';
                    element1.style.width="40px";
                    myDiv1.appendChild(element1);
                    //myDiv1.insertBefore(element1, myDiv1.firstElementChild);
                    var element=document.createElement("button");
                    var myDiv=document.getElementById("myDiv1");
                    var content =document.createTextNode(aux.dato1);
                    element.appendChild(content);
                    element.style.backgroundColor='rgb(25, 25, 112)'; 
                    element.style.color='rgb(255,255,255)';
                    element.style.fontSize='15px'; 
                    element.style.borderRadius="5px";
                    element.style.boxShadow="0 9px black";
                    element.style.width="125px";
                    element.style.height="40px";
                    myDiv.appendChild(element);
                    window.scroll({
                        top: 2000,
                        left: 100,
                        behavior: 'smooth'
                      });
                    //myDiv.insertBefore(element, myDiv.firstElementChild);
                
                aux=aux.post;
                    var pos = 0;
                    var id = setInterval(frame, 10);
    function frame() { if (pos == 50) { clearInterval(id);} 
        else { pos++; myDiv.style.top = pos + 'px'; myDiv.style.left = 55 + 'px';}}
              
              if (aux==null){  
                
                  clearInterval(intervalo);}
            };
        var intervalo = setInterval(fun,1000);
    }
    if (this.uno==null){alert("Cola De Prioridad Vacia");}
}

pintar(){
    var ele= document.getElementById("myDiv1");
    while (ele.firstChild) {ele.removeChild(ele.firstChild);}   
    let aux = this.uno;
if (this.uno!=null){ do{
    var element1=document.createElement("button");
    var myDiv1=document.getElementById("myDiv1");
    var content1=document.createTextNode("Prio: "+aux.dato);
    element1.appendChild(content1);
    element1.style.backgroundColor='rgb(0,0,0)'; 
    element1.style.color='rgb(255,255,255)';
    element1.style.width="40px";
    myDiv1.appendChild(element1);
    //myDiv1.insertBefore(element1, myDiv1.firstElementChild);

    var element=document.createElement("button");
    var myDiv=document.getElementById("myDiv1");
    var content =document.createTextNode(aux.dato1);
    element.appendChild(content);
    element.style.backgroundColor='rgb(25, 25, 112)'; 
    element.style.color='rgb(255,255,255)';
    element.style.fontSize='15px'; 
    element.style.borderRadius="5px";
    element.style.boxShadow="0 9px black";
    element.style.width="125px";
    //myDiv.insertBefore(element, myDiv.firstElementChild);
    myDiv.appendChild(element);
    window.scroll({
        top: 2000,
        left: 100,
        behavior: 'smooth'
      });

    
    aux=aux.post; }while(aux!=null);}
else{
    alert("Pila vacia"); 
}
   }

leer(){
    let ldatos=[];
    let aux = this.uno;
    if (this.uno!=null){
        do{
            var ob =new Object();
            
            ob.valor=aux.dato1.toString();
            ob.prioridad=aux.dato.toString();
            ldatos.push(ob);
            aux=aux.post;
            }while(aux!=null);}
    else{console.log("sin datos"); }
    return ldatos;
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



    module.exports = cola_prioridad;