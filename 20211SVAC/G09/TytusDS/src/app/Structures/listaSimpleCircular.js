class NodoListaSimpleCirular{
    constructor(data, sig, animate){
      this.data = data;
      this.sig = sig;
      this.animate= animate
    }
  }
class AnimationSCircular{
  constructor(id, x, y,disBtn,heightBtn){
    this.id = id
    this.x = x
    this.y = y
    this.disBtn = disBtn
    this.heightBtn = heightBtn
  }
}
  class ListaSimpleCirular{
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
    const animacion=new AnimationSCircular((this.contId).toString(), null, null, objeto.offsetWidth, objeto.offsetHeight)
    const newNodo = new NodoListaSimpleCirular(data, this.head, animacion);
    if(this.head){        
      let aux = this.head
      while(aux.sig != this.head){
        aux = aux.sig;
      }

      const divFlecha = document.createElement("div")//Creando el div donde se añaden los botones
      divInsert.appendChild(divFlecha)
      divFlecha.innerHTML='<img src="assets/img/flecha_izquierda.png" height="'+objeto.offsetHeight+ '" />'
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

      aux.sig = newNodo;

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
      this.head.sig=this.head
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
  delete(data){
    let aux = this.head
    let aux2
    if(data==aux.data){

      const selecBtn = document.getElementById("btn"+aux.animate.id)
      selecBtn.classList="animate__animated animate__hinge"
      const sClone = selecBtn.cloneNode(true)
      selecBtn.parentNode.replaceChild(sClone, selecBtn)

      const selecFlechaSiguiente = document.getElementById("flecha"+aux.sig.animate.id)
      selecFlechaSiguiente.classList="animate__animated animate__hinge"
      const sClone2 = selecFlechaSiguiente.cloneNode(true)
      selecFlechaSiguiente.parentNode.replaceChild(sClone2, selecFlechaSiguiente)

      const a1= setInterval(function(){
          //Eliminando el botón y Flecha siguiente
          const padre = sClone.parentNode
          padre.removeChild(sClone)
          const padre2 = sClone2.parentNode
          padre2.removeChild(sClone2)

          clearInterval(a1)
      },2000)
      let ejecutareOrdenar=true
      if(this.head.sig==this.head)
      {
        this.head=null
        ejecutareOrdenar=false
      }
      else{
      this.head=aux.sig
      aux=this.head //Reiniciando aux, para que recorra hasta el último valor y cambiarle su cabecera

      while (aux.sig.sig!=this.head) { //Se recorre el siguiente del siguienta para que valide la nueva cabecera
        aux=aux.sig
      }
      aux.sig=this.head}

      this.head.animate.x=this.head.animate.heightBtn +10
      this.head.animate.y=10
      //Iria el posicionamiento de la actual cabeza
      if (ejecutareOrdenar) {
      const selecBtnNuevo = document.getElementById("btn"+this.head.animate.id)
      selecBtnNuevo.classList="animate__animated animate__slideInRight"
      const sClone3 = selecBtnNuevo.cloneNode(true)
      selecBtnNuevo.parentNode.replaceChild(sClone3, selecBtnNuevo)
      sClone3.style.left =(this.head.animate.x).toString()+"px"
      sClone3.style.top =(this.head.animate.y).toString()+"px"
        this.reOrdenar(this.head) 
      }
      this.size--
      return
    }

    do{
      aux2=aux.sig;
      
      if(aux2.data==data){  

        const selecBtn = document.getElementById("btn"+aux.animate.id)
        selecBtn.classList="animate__animated animate__hinge"
        const sClone = selecBtn.cloneNode(true)
        selecBtn.parentNode.replaceChild(sClone, selecBtn)
  
        const selecFlechaSiguiente = document.getElementById("flecha"+aux.sig.animate.id)
        selecFlechaSiguiente.classList="animate__animated animate__hinge"
        const sClone2 = selecFlechaSiguiente.cloneNode(true)
        selecFlechaSiguiente.parentNode.replaceChild(sClone2, selecFlechaSiguiente)
  
        const a2= setInterval(function(){
            //Eliminando el botón y Flecha siguiente
            const padre = sClone.parentNode
            padre.removeChild(sClone)
            const padre2 = sClone2.parentNode
            padre2.removeChild(sClone2)
  
            clearInterval(a2)
        },2000)
        if(aux2.sig!=null){
          aux2.sig.x=aux2.x
          aux2.sig.y=aux2.y
          //Iria el posicionamiento de la actual cabeza
          const selecBtnNuevo = document.getElementById("btn"+aux2.sig.id)
          selecBtnNuevo.classList="animate__animated animate__slideInRight"
          const sClone3 = selecBtnNuevo.cloneNode(true)
          selecBtnNuevo.parentNode.replaceChild(sClone3, selecBtnNuevo)
          sClone3.style.left =(aux2.sig.x).toString()+"px"
          sClone3.style.top =(aux2.sig.y).toString()+"px"
          }

        aux2=aux2.sig
        aux.sig=aux2
          
        if(aux.sig!=this.head){
          this.reOrdenar(aux)}
          this.size--
          break
      }
    else{
      aux=aux.sig}
    }while(aux != this.head)
  }
reOrdenar(aux){
  const boton=document.getElementById("b1")
  do{
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
      //return
  }while(aux.sig != this.head)
//  aux=aux
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
    }
  }

  search(data){
    let aux = this.head
    if(this.head!=null){
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
    }
  }

  cargar(){}

  guardar(){}

  print(){
    var valores = []
    if(this.head!=null){
      let aux = this.head;
      do{
          valores.push(aux.data);
          aux = aux.sig;
      }while (aux != this.head);
      return valores;
  }
}
}
  
const lSCircular = new ListaSimpleCirular();
var categoriaCircular = "Estructura Lineal";
var nombreCircular = 'Lista Simple Circular';
var repeticionCircular = "True";
var animacionCircular = "0";

function lsimpleCircleAdd(date){
  lSCircular.add(date);
  console.log(lSCircular.print()) 
}

function lsimpleCircleDelete(date){
  lSCircular.delete(date);
  console.log(lSCircular.print()) 
}
function lsimpleCircleRefresh(date1,date2){
  lSCircular.refresh(date1,date2);
  console.log(lSCircular.print()) 
}
function lsimpleCircleSearch(date){
  console.log(lSCircular.search(date))
  return lSCircular.search(date); 
}
function lsimpleCrircleCargar(date){
  lSCircular.cargar();
}
function lsimpleCircleGuardar(date){
  lSCircular.guardar();
}
function lsimpleCriclePrint(){return print()}

function ArbrirArchivoListaSimpleCirular(event){
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
            categoriaCircular = doc[key]
            console.log(categoria)
        }
        if(key=='nombre'){
            nombreCircular = doc[key]
            console.log(nombre)
        }
        if(key=='repeticion'){
            repeticionCircular = doc[key]
            console.log(repeticion)
        }
        if(key=='animacion'){
            animacionCircular = doc[key]
            console.log(animacion)
        }
        if(key=='valores'){
            //console.log(doc[key].length)
            for (var k in doc[key]){
              lSCircular.add(doc[key][k])
            }
        }
     }
     console.log(lSCircular.print())

    };
    
    reader.readAsText(file);
}//guardar archivo
function downloadEnlazadaCircular(filename, text) {
    
  listaCir = lSCircular.print()

  var element = document.createElement('a');
  let doc = JSON.stringify({ "categoria": categoriaCircular, 'nombre': nombreCircular, 'repeticion':repeticionCircular, 'animacion':animacionCircular, 'valores': listaCir });
  
  //console.log(listSimple.print())
  element.setAttribute('href', 'data:json,' + doc);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


