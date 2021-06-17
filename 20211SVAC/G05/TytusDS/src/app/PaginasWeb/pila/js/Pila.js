
        
class Nodo{
    constructor(valor){
        this.dato=valor;
        this.post=null;
    }
}

class Pila {
     constructor() {
      this.tamaño = 0;
      this.uno=null;}
  
    

    guardar(valor) {
    let nodo = new Nodo(valor)
    nodo.dato=valor;
    if (this.uno==null){
        this.uno=nodo;}
    else{nodo.post=this.uno;
        this.uno=nodo;}
    this.tamaño++; 

        var element=document.createElement("button");
        var myDiv=document.getElementById("myDiv1");
          var content=document.createTextNode(valor);
          element.appendChild(content);
          element.style.backgroundColor='rgb(25, 25, 112)'; 
          element.style.color='rgb(255,255,255)';
          element.style.fontSize='30px'; 
          element.style.borderRadius="5px";
          element.style.boxShadow="0 9px black";
          myDiv.insertBefore(element, myDiv.firstElementChild);
          var pos = 0;
          var id = setInterval(frame, 10);
    function frame() {
        if (pos == 50) { clearInterval(id);} 
        else {
            pos++;
            myDiv.style.top = pos + 'px';
            myDiv.style.left = pos + 'px';}
    } }
  

    
    desapila(){
        if (this.uno==null){
            alert("Sin datos");
            console.log("pila sin datos")
        }
        else{
           
            var puntero=document.getElementById("myDiv1");
            if (puntero.childNodes.length>0) {
                puntero.removeChild(puntero.childNodes[0]); 
            }

            //var puntero=document.getElementById("myDiv");
           // if (puntero.childNodes.length>0) 
             // puntero.removeChild(puntero.childNodes[puntero.childNodes.length-1]); 
            this.uno= this.uno.post;
            this.tamaño--;
            alert("pop");
        }
    }

    buscar(valor){
        var ele= document.getElementById("myDiv1");
    while (ele.firstChild) {
        ele.removeChild(ele.firstChild);}   
   var contador=0;
    let aux = this.uno;
    var bandera=true;
    var contador=this.tamaño-1;
    if (this.uno!=null){
        //while(aux!=null){
        
        var fun=function(){
                if (valor==aux.dato){
                    console.log("encontrado en posicion: "+contador);
                    bandera=false;
                    var element=document.createElement("button");
                    var myDiv=document.getElementById("myDiv1");
                    var content =document.createTextNode(aux.dato);
                    element.appendChild(content);
                    element.style.backgroundColor='rgb(255,255,255)'; 
                    element.style.color='rgb(0, 191, 255)';
                    element.style.fontSize='30px'; 
                    element.style.borderRadius="5px";
                    element.style.boxShadow="0 9px black";
                    myDiv.appendChild(element);
                }
                else{
                    var element=document.createElement("button");
                    var myDiv=document.getElementById("myDiv1");
                    var content =document.createTextNode(aux.dato);
                    element.appendChild(content);
                    element.style.backgroundColor='rgb(25, 25, 112)'; 
                    element.style.color='rgb(255,255,255)';
                    element.style.fontSize='30px'; 
                    element.style.borderRadius="5px";
                    element.style.boxShadow="0 9px black";
                    myDiv.appendChild(element);}
                    var pos = 0;
                    var id = setInterval(frame, 10);
    function frame() { if (pos == 50) { clearInterval(id);} 
        else { pos++; myDiv.style.top = pos + 'px'; myDiv.style.left = pos + 'px';}}
              aux=aux.post;
              contador--;
              if (aux==null){clearInterval(intervalo);}
            };
        
        var intervalo = setInterval(fun,1000);
    }

    if (bandera==true){
        console.log("no encontrado");
    }

    }

    modificar(bus,valor){
    var ele= document.getElementById("myDiv1");
    while (ele.firstChild) {ele.removeChild(ele.firstChild);}  
   
    let aux = this.uno;
    var bandera=true;
    var contador=this.tamaño-1;
    if (this.uno!=null){
        
          var a=function(){
            var element=document.createElement("button");
            var myDiv=document.getElementById("myDiv1");
            var content =document.createTextNode(aux.dato);
            element.appendChild(content);
            element.style.backgroundColor='rgb(25, 25, 112)'; 
            element.style.color='rgb(0, 191, 255)';
            element.style.fontSize='30px'; 
            element.style.borderRadius="5px";
            element.style.boxShadow="0 9px black";
            myDiv.appendChild(element);
            if (bus==aux.dato){
                console.log("mofificado: ");
                alert("modificado");
                aux.dato=valor;
                bandera=false;
            }
        aux=aux.post;
        contador--; if (aux==null){clearInterval(intervalo);} };
        var intervalo = setInterval(a,1000);
    }

    if (bandera==true){
        alert("no encontrado");
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

  module.exports = Pila;
  

  