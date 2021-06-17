
        
class Nodo{
    constructor(valor){
        this.dato=valor;
        this.post=null;
    }
}

class Pila {
     constructor() {
      this.tamaño = 0;
      this.uno=null;
      
    }
  
    

    guardar(valor) {
        
        //var b=document.getElementById("Agregar");
      //var element=document.createElement("p");
      //var Agregar=document.getElementById("Agregar");
        var element=document.createElement("button");
        var myDiv=document.getElementById("myDiv1");
          var content=document.createTextNode(valor);
          element.appendChild(content);
          //myDiv.appendChild(element);
          element.style.backgroundColor='rgb(25, 25, 112)'; 
          element.style.color='rgb(255,255,255)';
          element.style.fontSize='60px'; 
          //myDiv.style.backgroundImage="url('http://pa1.narvii.com/6380/43a7f3d1b464182adc4de846f391d52803f1a583_00.gif')";
          //element.style.border="none";
          element.style.borderRadius="5px";
          element.style.boxShadow="0 9px black";

          myDiv.insertBefore(element, myDiv.firstElementChild);
          var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
        if (pos == 50) {
            clearInterval(id);
        } else {
            pos++;
            myDiv.style.top = pos + 'px';
            myDiv.style.left = pos + 'px';
        }
    }
          
         

        

    let nodo = new Nodo(valor)
    nodo.dato=valor;
    if (this.uno==null){
        this.uno=nodo;
    }
    else{
        nodo.post=this.uno;
        this.uno=nodo;
    }
    this.tamaño++;
    }
  
    desapila(){
        if (this.uno==null){
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
        }
    }

    buscar(valor){
    let aux = this.uno;
    var bandera=true;
    var contador=this.tamaño-1;
    if (this.uno!=null){

        do{
            if (valor==aux.dato){
                console.log("encontrado en posicion: "+contador);
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

  module.exports = Pila;
  

  