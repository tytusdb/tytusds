class NodoCola {
    constructor(dato, siguiente, anterior, animate) {
      this.dato = dato;
      this.siguiente = siguiente;
      this.anterior = anterior;
      this.animate = animate
    }
}
class AnimationCola{
  constructor(id, x, y,disBtn,heightBtn){
    this.id = id
    this.x = x
    this.y = y
    this.disBtn = disBtn
    this.heightBtn = heightBtn
  }
}
class Cola {
    constructor() {
      this.primero = null
      this.ultimo = null
      this.guardarCola = null
      this.contId = 0
      this.hMax = 0
    }

    //Ingresar datos a la cola
    enqueue(dato) {

      const divInsert=document.getElementById("divInsert1");
      const objeto=document.createElement("button"); //Creacion del botón
      const texto=document.createTextNode(dato);
      objeto.appendChild(texto);
      //Diseño del botón
      objeto.style.backgroundColor='rgb(30,144,255)'
      objeto.style.color='rgb(255,255,255)'
      objeto.style.fontSize='15px'
      objeto.style.borderRadius="5px"
      objeto.id="btn"+(this.contId).toString()
      objeto.classList='animate__animated animate__rubberBand animate__slow'
      divInsert.appendChild(objeto)//Insertando el div en el Div principal
      const posicion=document.getElementById(objeto.id)
      posicion.style.position="absolute"
      const boton=document.getElementById("b1")
  
      const animacion = new AnimationCola((this.contId).toString(), null, null, objeto.offsetWidth, objeto.offsetHeight)

      const nuevo = new NodoCola(dato, null, null, animacion);

      if (this.guardarCola) {

        /*const divFlecha = document.createElement("div")//Creando el div donde se añaden los botones
        divInsert.appendChild(divFlecha)
        divFlecha.innerHTML='<img src="assets/img/flecha_doble_enlazada.png" height="'+objeto.offsetHeight+ '" />'
        divFlecha.id="flecha"+(this.contId).toString()
        const selecFlecha = document.getElementById(divFlecha.id)*/
        nuevo.animate.x=10
        nuevo.animate.y=20
        posicion.style.left =(nuevo.animate.x).toString()+"px"
        posicion.style.top =(nuevo.animate.y).toString()+"px"        
        //nuevo.animate.x= current.animate.x + current.animate.disBtn + (objeto.offsetHeight*0.93) + 20
        

        nuevo.anterior=this.guardarCola
        this.guardarCola.siguiente = nuevo;

        posicion.style.left = (nuevo.animate.x).toString()+"px" //El + 50 es para incluir a la misma flecha
        posicion.style.top =(nuevo.animate.y).toString()+"px"
        this.reOrdenar()
        /*selecFlecha.style.position="absolute"
        selecFlecha.classList='animate__animated animate__backInLeft animate__fast'
        selecFlecha.style.left = (newNodo.animate.x-(objeto.offsetHeight*0.93)-10).toString()+"px"
        selecFlecha.style.top = (newNodo.animate.y+5).toString()+"px"*/
        this.contId++

      }
      this.guardarCola = nuevo
      //console.log("Eso es"+(!this.primero))
      if (!this.primero) {
        this.primero = this.guardarCola

        this.primero.animate.x=10
        this.primero.animate.y=20
        posicion.style.left =(this.primero.animate.x).toString()+"px"
        posicion.style.top =(this.primero.animate.y).toString()+"px"
        this.contId++
        this.hMax=objeto.offsetHeight
      }
    }

    reOrdenar(){
      let aux=this.primero
      while (aux.siguiente!=null) {
        aux = aux.siguiente
      }
      this.hMax=aux.animate.heightBtn
      const boton=document.getElementById("b1")
      while (aux.anterior!=null){
        
        if(this.hMax<aux.anterior.animate.heightBtn){ this.hMax=aux.anterior.animate.heightBtn}//Validando la altura máxima de un botón, para guardarlo para la siguiente fila

        aux.anterior.animate.x=aux.animate.x+aux.animate.disBtn
        if(boton.offsetWidth-100>aux.anterior.animate.x){//Validando que el ancho del área no se sobrepase, de lo contrario crea una nueva fila
            aux.anterior.animate.y=aux.animate.y
        }//Definiendo el valor de y
        else{
            aux.anterior.animate.y=aux.animate.y + this.hMax +20
            aux.anterior.animate.x=this.primero.animate.x
            this.hMax=0
        }
        const p = document.getElementById("btn"+(aux.anterior.animate.id))
        const posicion = p.cloneNode(true)
        p.parentNode.replaceChild(posicion, p)
        posicion.style.left = (aux.anterior.animate.x).toString()+"px" //El + 50 es para incluir a la misma flecha
        posicion.style.top =(aux.anterior.animate.y).toString()+"px"
        posicion.classList="animate__animated animate__slideInLeft"

        aux=aux.anterior
      }
    }
    //Sacar el primero de la cola
    dequeue() {
      if (!this.primero) {
        return null;
      }
      let aux=this.primero
      const selecBtn = document.getElementById("btn"+aux.animate.id)
      selecBtn.classList="animate__animated animate__hinge"
      const sClone = selecBtn.cloneNode(true)
      selecBtn.parentNode.replaceChild(sClone, selecBtn)

      const a1= setInterval(function(){
          //Eliminando el botón y Flecha siguiente
          const padre = sClone.parentNode
          padre.removeChild(sClone)
          clearInterval(a1)
      },2000)      
      const nodoPrimero = this.primero;
      if (this.primero.siguiente) {
        this.primero = this.primero.siguiente;
        this.primero.anterior=null
      } else {
        this.primero = null; 
        this.guardarCola = null; 
      }
      return nodoPrimero;
    }

    //mostrar datos de la cola
    print() {
      let list = []
      let mostrarNodo = this.primero;
      while (mostrarNodo) {
        list.push(mostrarNodo.dato)
        //console.log(mostrarNodo.dato);
        mostrarNodo = mostrarNodo.siguiente;
      }
      return list
    }

    //Metodo buscar
    buscar(dato){
      /*let mostrarNodo = this.primero;
      var encontrar = false;*/
      /*while (mostrarNodo) {
        if(mostrarNodo.dato === dato){
          encontrar = true;
          return encontrar;
        }
        mostrarNodo = mostrarNodo.siguiente;
      }*/
      //return encontrar
      let aux=this.primero
      while (aux.siguiente!=null) {
        aux = aux.siguiente
      }
      //let aux = this.primero
      var g = setInterval(searchAnimation,500)
      function searchAnimation(){
          if (aux != null) {
              const selecBtn = document.getElementById("btn"+aux.animate.id)
              if (aux.dato==dato) {
                  selecBtn.classList="animate__animated animate__wobble animate__repeat-3"
                  const sClone = selecBtn.cloneNode(true)
                  selecBtn.parentNode.replaceChild(sClone, selecBtn)
                  clearInterval(g)
                  }
              else{
              selecBtn.classList="animate__animated animate__bounceIn"
              const sClone = selecBtn.cloneNode(true)
              selecBtn.parentNode.replaceChild(sClone, selecBtn)
              aux=aux.anterior
              }
          }
          else{
              clearInterval(g)
          }
      }
    }

    //Metodo Actualizar
    ReemplazarDato(datoAnterior, datoNuevo){
      let datoActual = this.primero;
      while(datoActual){
        if(datoActual.dato === datoAnterior){
          datoActual.dato = datoNuevo;
          break;

        }
        datoActual = datoActual.siguiente;
      }
      
    }
    
    ActualizarCola(datoAnterior, datoNuevo){
      let actual = this.primero;
      let encontrado = false;

      let aux = this.primero;
      var f = setInterval(whiles,500)
      function whiles(){
          if (actual != null && encontrado != true) {
              const selecBtn = document.getElementById("btn"+aux.animate.id)
              //selecBtn.innerText="Espere"
              if (aux.dato == datoAnterior) {
                  aux.dato = datoNuevo;
                  encontrado = true;
                  selecBtn.innerText=datoNuevo
                  selecBtn.classList="animate__animated animate__rotateIn"
                  const sClone = selecBtn.cloneNode(true)
                  selecBtn.parentNode.replaceChild(sClone, selecBtn)
                  clearInterval(f)
                  }
              else{
              selecBtn.classList="animate__animated animate__bounceIn"
              const sClone = selecBtn.cloneNode(true)
              selecBtn.parentNode.replaceChild(sClone, selecBtn)
              aux=aux.siguiente
              }
          }
          else{
              clearInterval(f)
          }
      }      
/*
      if(this.primero != null){
          while(actual != null && encontrado != true){
              if(actual.dato == datoAnterior){
                  actual.dato = datoNuevo;
                  encontrado = true;

              }
              actual = actual.siguiente;
          }
          if(!encontrado){
              console.log("Dato no encontrado")
          }
      }else{
          console.log("La Cola se encuentra vacia");
      }
*/
    }

    
    
  }

const cola = new Cola();
var categoriaCola = "Estructura Lineal";
var nombreCola = 'Lista Simple';
var repeticionCola = "True";
var animacionCola = "0";
/*
cola.enqueue(1)
cola.enqueue(2)
cola.enqueue(3)
cola.enqueue(4)
*/
function adDCola(data){
  cola.enqueue(data)
  console.log("-------------------------------")
  console.log(cola.print())
}

function DeletCola(data){
  cola.dequeue(data)
  console.log("-------------------------------");
  console.log(cola.print());
}

function buscarCola(data){
  console.log(cola.buscar(data));
  console.log("-------------------------------");
 
}
function actualizarCOla(var1,var2){
  console.log("-------------------------------");
  cola.ActualizarCola(var1,var2);
  console.log(cola.print());

}
//abrir un documento
function AbrirArchivoCola(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    // El texto del archivo se mostrará por consola aquí
   // console.log(event.target.result)
    let doc = JSON.parse(event.target.result);
    //console.log(doc)

    for (var key in doc) {
      //console.log('name=' + key + ' value=' + doc[key]);
      if(key=='categoria'){
          categoriaCola = doc[key]
          console.log(categoria)
      }
      if(key=='nombre'){
          nombreCola = doc[key]
          console.log(nombre)
      }
      if(key=='repeticion'){
          repeticionCola = doc[key]
          console.log(repeticion)
      }
      if(key=='animacion'){
          animacionCola = doc[key]
          console.log(animacion)
      }
      if(key=='valores'){
          //console.log(doc[key].length)
          for (var k in doc[key]){
              cola.enqueue(doc[key][k])
          }
      }
   }
   console.log(cola.print())

  };

  reader.readAsText(file);
}//guardar archivo
function downloadCola(filename, text) {
  
  lista = listSimple.print()

  var element = document.createElement('a');
  let doc = JSON.stringify({ "categoria": categoriaCola, 'nombre': nombreCola, 'repeticion':repeticionCola, 'animacion':animacionCola, 'valores': lista });
  
  //console.log(listSimple.print())
  element.setAttribute('href', 'data:json,' + doc);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
