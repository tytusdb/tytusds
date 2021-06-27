class NodoListaCircularDoble{
    constructor(data, sig, ant, animate){
      this.data = data
      this.sig = sig
      this.ant = ant
      this.animate = animate
    }
  }
  class AnimationDCircular{
    constructor(id, x, y,disBtn,heightBtn){
      this.id = id
      this.x = x
      this.y = y
      this.disBtn = disBtn
      this.heightBtn = heightBtn
    }
  }
  class ListaCircularDoblEnlazada{
    constructor(){
      this.head = null;
      this.size = 0;
      this.contId = 0
      this.hMax = 0
    }

  add(data){
    const divInsert=document.getElementById("divInsert1");
    const objeto=document.createElement("button"); //Creacion del botón
    const texto=document.createTextNode(data);
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

    const animacion=new AnimationDCircular((this.contId).toString(), null, null, objeto.offsetWidth, objeto.offsetHeight)

    const newNodo = new NodoListaCircularDoble(data, this.head, null , animacion)
    if(this.head){        
      let aux = this.head
      while(aux.sig != this.head){
        aux = aux.sig
      }

      const divFlecha = document.createElement("div")//Creando el div donde se añaden los botones
      divInsert.appendChild(divFlecha)
      divFlecha.innerHTML='<img src="assets/img/flecha_doble_enlazada.png" height="'+objeto.offsetHeight+ '" />'
      divFlecha.id="flecha"+(this.contId).toString()
      const selecFlecha = document.getElementById(divFlecha.id)
      newNodo.animate.x= aux.animate.x + aux.animate.disBtn + (objeto.offsetHeight*0.93) + 20
      if(this.hMax<objeto.offsetHeight){ this.hMax=objeto.offsetHeight}//Validando la altura máxima de un botón, para guardarlo para la siguiente fila
      
      if(boton.offsetWidth-100>newNodo.animate.x){//Validando que el ancho del área no se sobrepase, de lo contrario crea una nueva fila
          newNodo.animate.y=aux.animate.y
      }//Definiendo el valor de y
      else{
          newNodo.animate.y=aux.animate.y + this.hMax +20
          newNodo.animate.x=10 + 45
          this.hMax=0
      }

      newNodo.ant = aux
      aux.sig = newNodo
      this.head.ant = aux.sig

      posicion.style.left = (newNodo.animate.x).toString()+"px" //El + 50 es para incluir a la misma flecha
      posicion.style.top =(newNodo.animate.y).toString()+"px"

      selecFlecha.style.position="absolute"
      selecFlecha.classList='animate__animated animate__backInLeft animate__fast'
      selecFlecha.style.left = (newNodo.animate.x-(objeto.offsetHeight*0.93)-10).toString()+"px"
      selecFlecha.style.top = (newNodo.animate.y+5).toString()+"px"

      //Recolocando la el indexFinal
      const iF=document.getElementById("indexFinal");
      const indFinal = iF.cloneNode(true)
      iF.parentNode.replaceChild(indFinal, iF)
      indFinal.style.left=(newNodo.animate.x+newNodo.animate.disBtn).toString()+"px"
      indFinal.style.top=(newNodo.animate.y).toString()+"px"
      indFinal.classList='animate__animated animate__slideInRight'

      this.contId++
      //Al final ya que el contId debe ser el mismo para la caja de la flecha y el botón

    }else{
      this.head = newNodo
      this.head.sig = this.head
      this.head.ant=this.head

      //Posicionando indexs inicio
      const indInicio=document.getElementById("indexInicio");
      indInicio.innerHTML='<img src="assets/img/index1.png" height="'+objeto.offsetHeight+ '" />'
      indInicio.style.left="10px"
      indInicio.style.top="10px"
      indInicio.classList='animate__animated animate__slideInLeft'

      this.head.animate.x=10+objeto.offsetHeight
      this.head.animate.y=10

      //Posicionando indexs Final
      const indFinal=document.getElementById("indexFinal");
      indFinal.innerHTML='<img src="assets/img/index2.png" height="'+objeto.offsetHeight+ '" />'
      indFinal.style.left=(this.head.animate.x+this.head.animate.disBtn).toString()+"px"
      indFinal.style.top="10px"
      indFinal.classList='animate__animated animate__slideInRight'
      
      posicion.style.left =(this.head.animate.x).toString()+"px"
      posicion.style.top =(this.head.animate.y).toString()+"px"
      this.contId++
      this.hMax=objeto.offsetHeight

    }
    this.size++
    }

    selecObject(id, x, y){
      const p = document.getElementById(id)
      p.classList="animate__animated animate__zoomInDown"
      const sClone = p.cloneNode(true)
      p.parentNode.replaceChild(sClone, p) 
      sClone.style.posicion="absolute" 
      sClone.style.top=(y).toString()+"px"
      sClone.style.left=(x).toString()+"px"
  }

  delete(data){
    let aux = this.head
    let aux2 = this.head
    if(data==aux.data){//Comprobando si la cabeza es igual al data
      if(this.head.sig == this.head){
        this.head=null
        this.borrarObjeto("btn"+aux.animate.id)
        return
      }
      this.head=aux.sig
      this.borrarObjeto("btn"+aux.animate.id)
      this.borrarObjeto("flecha"+aux.sig.animate.id)//Eliminando la flecha del siguiente elemento

      while(aux.sig != aux2){
        aux = aux.sig
      }
      aux.sig = this.head
      this.head.ant=aux
      this.head.animate.x=this.head.animate.heightBtn +10
      this.head.animate.y=10
      console.log(this.head.data+"    "+this.head.sig.data)

      this.selecObject("btn"+this.head.animate.id,this.head.animate.x,this.head.animate.y)
      this.reOrdenar(this.head)
      return}
      
    do{
      if(aux.data==data){
        this.borrarObjeto("btn"+aux.animate.id)
        this.borrarObjeto("flecha"+aux.animate.id)
        if(aux.sig!=this.head){
          aux.sig.animate.x=aux.animate.x
          aux.sig.animate.y=aux.animate.y
          this.selecObject("btn"+aux.sig.animate.id,aux.animate.x,aux.animate.y)
          this.selecObject("flecha"+aux.sig.animate.id,aux.sig.animate.x-(aux.sig.animate.heightBtn*0.93)-10,aux.sig.animate.y+5)
        }
        aux.ant.sig =aux.sig
        aux.sig.ant=aux.ant
        this.size--
        this.reOrdenar(this.head)
        return
      }else{
      aux=aux.sig}
    }while(aux.sig != null)
  }
  borrarObjeto(id){
    const selecBtn = document.getElementById(id)
    selecBtn.classList="animate__animated animate__hinge"
    const sClone = selecBtn.cloneNode(true)
    selecBtn.parentNode.replaceChild(sClone, selecBtn)

    const a2= setInterval(function(){
        //Eliminando el botón y Flecha siguiente
        const padre = sClone.parentNode
        padre.removeChild(sClone)
        clearInterval(a2)
    },2000)    
  }
  reOrdenar(aux){
    const boton=document.getElementById("b1")
    while(aux.sig != this.head){
        aux.sig.animate.x= aux.animate.x + aux.animate.disBtn + (aux.animate.heightBtn*0.93) +20
        if(this.hMax<aux.sig.animate.heightBtn){ this.hMax=aux.sig.animate.heightBtn}
        
        if(boton.offsetWidth-100>aux.sig.animate.x){
            aux.sig.animate.y=aux.animate.y
        }//Definiendo el valor de y
        else{
            aux.sig.animate.y=aux.animate.y + this.hMax +20
            aux.sig.animate.x=this.head.animate.x +45
            this.hMax=0
        }
        
        const p = document.getElementById("btn"+(aux.sig.animate.id))
        const posicion = p.cloneNode(true)
        p.parentNode.replaceChild(posicion, p)
        posicion.style.left = (aux.sig.animate.x).toString()+"px" //El + 50 es para incluir a la misma flecha
        posicion.style.top =(aux.sig.animate.y).toString()+"px"
        posicion.classList="animate__animated animate__slideInRight"
        
        const sF = document.getElementById("flecha"+(aux.sig.animate.id))
        const selecFlecha = sF.cloneNode(true)
        sF.parentNode.replaceChild(selecFlecha, sF)
        selecFlecha.style.position="absolute"
        selecFlecha.classList="animate__animated animate__slideInRight"
        selecFlecha.style.left = (aux.sig.animate.x-(aux.sig.animate.heightBtn*0.93)-10).toString()+"px"
        selecFlecha.style.top = (aux.sig.animate.y+5).toString()+"px"
        aux=aux.sig
        //console.log(aux.data+" == "+this.head.data)
        //return
    }
    //aux=aux.sig
  
    const iF=document.getElementById("indexFinal")
    const indFinal = iF.cloneNode(true)
    iF.parentNode.replaceChild(indFinal, iF)
    indFinal.style.left=(aux.animate.x+aux.animate.disBtn).toString()+"px"
    indFinal.style.top=(aux.animate.y).toString()+"px"
    indFinal.classList='animate__animated animate__slideInRight'
  }
  refresh(dataActual,dataFinal){
    if(this.head!=null){
    let aux = this.head
    const selecBtn = document.getElementById("btn"+aux.animate.id)
    if (aux.data==dataActual) {
        aux.data=dataFinal
        selecBtn.innerText=dataFinal
        selecBtn.classList="animate__animated animate__rotateIn"
        const sClone = selecBtn.cloneNode(true)
        selecBtn.parentNode.replaceChild(sClone, selecBtn)
        return
        }
    else{
    selecBtn.classList="animate__animated animate__bounceIn"
    const sClone = selecBtn.cloneNode(true)
    selecBtn.parentNode.replaceChild(sClone, selecBtn)
    aux=aux.sig
    }
    var f = setInterval(whiles,500)
    function whiles(){
      if (aux != this.head) {
          const selecBtn1 = document.getElementById("btn"+aux.animate.id)
          //selecBtn.innerText="Espere"
          if (aux.data==dataActual) {
              aux.data=dataFinal
              selecBtn1.innerText=dataFinal
              selecBtn1.classList="animate__animated animate__rotateIn"
              const sClone = selecBtn1.cloneNode(true)
              selecBtn1.parentNode.replaceChild(sClone, selecBtn1)
              clearInterval(f)
              }
          else{
          selecBtn1.classList="animate__animated animate__bounceIn"
          const sClone = selecBtn1.cloneNode(true)
          selecBtn1.parentNode.replaceChild(sClone, selecBtn1)
          aux=aux.sig
          }
      }
      else{
          clearInterval(f)
      }
    }
    /*do {
      if (aux.data==dataActual) {
        aux.data=dataFinal
        return
      }
      aux=aux.sig
      }while (aux != this.head)*/
    }
    }

  search(data){
    let aux = this.head
    const selecBtn1 = document.getElementById("btn"+aux.animate.id)

    if (aux.data==data) {
      selecBtn1.classList="animate__animated animate__wobble animate__repeat-3"
      const sClone = selecBtn1.cloneNode(true)
      selecBtn1.parentNode.replaceChild(sClone, selecBtn1)
      return
      }
    else{
    selecBtn1.classList="animate__animated animate__bounceIn"
    const sClone = selecBtn1.cloneNode(true)
    selecBtn1.parentNode.replaceChild(sClone, selecBtn1)
    aux=aux.sig
    }
    var g = setInterval(searchAnimation,500)
    function searchAnimation(){
      if (aux != this.head) {
          const selecBtn = document.getElementById("btn"+aux.animate.id)
          //selecBtn.innerText="Espere"
          if (aux.data==data) {
              selecBtn.classList="animate__animated animate__wobble animate__repeat-3"
              const sClone = selecBtn.cloneNode(true)
              selecBtn.parentNode.replaceChild(sClone, selecBtn)
              clearInterval(g)
              return
              }
          else{
          selecBtn.classList="animate__animated animate__bounceIn"
          const sClone = selecBtn.cloneNode(true)
          selecBtn.parentNode.replaceChild(sClone, selecBtn)
          aux=aux.sig
          }
      }
      else{
          clearInterval(g)
      }
    }

    /*do {
      if (aux.data==data) {
        return true
      }
      aux=aux.sig
      }while (aux != this.head)
      return false*/
    }

  cargar(){}

  guardar(){}

  print(){
    var valores = []
      let aux = this.head;
      do {
          valores.push(aux.data);
          aux = aux.sig;
      }while (aux != this.head)
      return valores;
    }
}
  
const lCircularDEnlazada = new ListaCircularDoblEnlazada();
var categoriaCircular = "Estructura Lineal";
var nombreCircular = 'Lista doble Circular';
var repeticionCircular = "True";
var animacionCircular = "0";

function ldobleCircleAdd(date){
  lCircularDEnlazada.add(date);
  console.log(lCircularDEnlazada.print()) 
}

function ldobleCircleDelete(date){
  lCircularDEnlazada.delete(date);
  console.log(lCircularDEnlazada.print()) 
}
function ldobleCircleRefresh(date1,date2){
  lCircularDEnlazada.refresh(date1,date2);
  console.log(lCircularDEnlazada.print()) 
}
function ldobleCircleSearch(date){
  console.log(lCircularDEnlazada.search(date))
  return lCircularDEnlazada.search(date); 
}
function ldobleCircleCargar(date){
  lCircularDEnlazada.cargar();
}
function ldobleCircleGuardar(date){
  lCircularDEnlazada.guardar();
}
function ldobleCirclePrint(){return print()}

function AbrirListaDobleCircular(event) {
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
          categoria = doc[key]
          console.log(categoria)
      }
      if(key=='nombre'){
          nombre = doc[key]
          console.log(nombre)
      }
      if(key=='repeticion'){
          repeticion = doc[key]
          console.log(repeticion)
      }
      if(key=='animacion'){
          animacion = doc[key]
          console.log(animacion)
      }
      if(key=='valores'){
          //console.log(doc[key].length)
          for (var k in doc[key]){
            lCircularDEnlazada.add(doc[key][k])
          }
      }
   }
   console.log(lCircularDEnlazada.print())

  };
  
  reader.readAsText(file);
  
}//guardar archivo
function downloadListaDobleCircular(filename, text) {
    
  lista = lCircularDEnlazada.print()

  var element = document.createElement('a');
  let doc = JSON.stringify({ "categoria": categoria, 'nombre': nombre, 'repeticion':repeticion, 'animacion':animacion, 'valores': lista });
  
  //console.log(listSimple.print())
  element.setAttribute('href', 'data:json,' + doc);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
