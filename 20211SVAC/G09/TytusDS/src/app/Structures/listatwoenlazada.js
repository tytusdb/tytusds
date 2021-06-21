class NodoListaTwoEnlazada{
    constructor(data, sig, ant, animate){
      this.data = data
      this.sig = sig
      this.ant = ant
      this.animate = animate
    }
  }
class Animation{
  constructor(id, x, y,disBtn,heightBtn){
    this.id = id
    this.x = x
    this.y = y
    this.disBtn = disBtn
    this.heightBtn = heightBtn
  }
}
  class ListaDobleEnlazada{
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

    const animacion = new Animation((this.contId).toString(), null, null, objeto.offsetWidth, objeto.offsetHeight)

    const newNodo = new NodoListaTwoEnlazada(data, null, null, animacion)
    if(this.head){        
      let current = this.head
      while(current.sig){
        current = current.sig
      }

      const divFlecha = document.createElement("div")//Creando el div donde se añaden los botones
      divInsert.appendChild(divFlecha)
      divFlecha.innerHTML='<img src="assets/img/flecha_doble_enlazada.png" height="'+objeto.offsetHeight+ '" />'
      divFlecha.id="flecha"+(this.contId).toString()
      const selecFlecha = document.getElementById(divFlecha.id)
      newNodo.animate.x= current.animate.x + current.animate.disBtn + (objeto.offsetHeight*0.93) + 20
      if(this.hMax<objeto.offsetHeight){ this.hMax=objeto.offsetHeight}//Validando la altura máxima de un botón, para guardarlo para la siguiente fila
      
      if(boton.offsetWidth-100>newNodo.animate.x){//Validando que el ancho del área no se sobrepase, de lo contrario crea una nueva fila
          newNodo.animate.y=current.animate.y
      }//Definiendo el valor de y
      else{
          newNodo.animate.y=current.animate.y + this.hMax +20
          newNodo.animate.x=this.head.animate.x +45
          this.hMax=0
      }

      newNodo.ant = current
      current.sig = newNodo
      posicion.style.left = (newNodo.animate.x).toString()+"px" //El + 50 es para incluir a la misma flecha
      posicion.style.top =(newNodo.animate.y).toString()+"px"

      selecFlecha.style.position="absolute"
      selecFlecha.classList='animate__animated animate__backInLeft animate__fast'
      selecFlecha.style.left = (newNodo.animate.x-(objeto.offsetHeight*0.93)-10).toString()+"px"
      selecFlecha.style.top = (newNodo.animate.y+5).toString()+"px"
      this.contId++

    }else{
      this.head = newNodo

      this.head.animate.x=10
      this.head.animate.y=20
      posicion.style.left =(this.head.animate.x).toString()+"px"
      posicion.style.top =(this.head.animate.y).toString()+"px"
      this.contId++
      this.hMax=objeto.offsetHeight

    }
    this.size++
    
    }
  delete(data){
    let aux = this.head
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
      //Eliminando la Flecha del Siguiente elemento
      this.head=aux.sig 
      this.head.animate.x=10
      this.head.animate.y=20

      //Iria el posicionamiento de la actual cabeza
      const selecBtnNuevo = document.getElementById("btn"+this.head.animate.id)
      selecBtnNuevo.classList="animate__animated animate__slideInRight"
      const sClone3 = selecBtnNuevo.cloneNode(true)
      selecBtnNuevo.parentNode.replaceChild(sClone3, selecBtnNuevo)
      sClone3.style.left =(this.head.animate.x).toString()+"px"
      sClone3.style.top =(this.head.animate.y).toString()+"px"
      aux=this.head
      this.reOrdenar(aux)
      this.size--

      return}
    while(aux != null){
      if(aux.data==data){

        const selecBtn = document.getElementById("btn"+aux.animate.id)
        selecBtn.classList="animate__animated animate__hinge"
        const sClone = selecBtn.cloneNode(true)
        selecBtn.parentNode.replaceChild(sClone, selecBtn)

        const selecFlechaSiguiente = document.getElementById("flecha"+aux.animate.id)
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
        if(aux.sig!=null){
        aux.sig.animate.x=aux.animate.x
        aux.sig.animate.y=aux.animate.y
        //Iria el posicionamiento de la actual cabeza
        const selecBtnNuevo = document.getElementById("btn"+aux.sig.animate.id)
        selecBtnNuevo.classList="animate__animated animate__slideInRight"
        const sClone3 = selecBtnNuevo.cloneNode(true)
        selecBtnNuevo.parentNode.replaceChild(sClone3, selecBtnNuevo)
        sClone3.style.left =(aux.sig.animate.x).toString()+"px"
        sClone3.style.top =(aux.sig.animate.y).toString()+"px"
        }

        aux.ant.sig =aux.sig
        //aux.sig.ant=aux.ant
        if(aux.sig!=null){
          aux.sig.ant=aux.ant
          this.reOrdenar(aux.ant)}
        this.size--
        return
      }
    else{
      aux=aux.sig}
    }
  }
  refresh(dataActual,dataFinal){
    let aux = this.head
    var f = setInterval(whiles,500)
    function whiles(){
        if (aux != null) {
            const selecBtn = document.getElementById("btn"+aux.animate.id)
            //selecBtn.innerText="Espere"
            if (aux.data==dataActual) {
                aux.data=dataFinal
                selecBtn.innerText=dataFinal
                selecBtn.classList="animate__animated animate__rotateIn"
                const sClone = selecBtn.cloneNode(true)
                selecBtn.parentNode.replaceChild(sClone, selecBtn)
                clearInterval(f)
                }
            else{
            selecBtn.classList="animate__animated animate__bounceIn"
            const sClone = selecBtn.cloneNode(true)
            selecBtn.parentNode.replaceChild(sClone, selecBtn)
            aux=aux.sig
            }
        }
        else{
            clearInterval(f)
        }
    }
    }

  search(data){
    let aux = this.head
    var g = setInterval(searchAnimation,500)
    function searchAnimation(){
        if (aux != null) {
            const selecBtn = document.getElementById("btn"+aux.animate.id)
            //selecBtn.innerText="Espere"
            if (aux.data==data) {
                selecBtn.classList="animate__animated animate__wobble animate__repeat-3"
                const sClone = selecBtn.cloneNode(true)
                selecBtn.parentNode.replaceChild(sClone, selecBtn)
                clearInterval(g)
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
reOrdenar(aux){
    const boton=document.getElementById("b1")
    while(aux.sig != null){
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
    }
}

  print(){
    var valores = []
      let aux = this.head;
      while (aux != null) {
          valores.push(aux.data);
          aux = aux.sig;
      }
      return valores;
    }
}
  
const lDEnlazada = new ListaDobleEnlazada();
var categoriaSCi;
var nombreSCi;
var repeticionSCi;
var animacionSCi;

function ldobleAdd(date){
  lDEnlazada.add(date);
  console.log(lDEnlazada.print())
}

function ldobleDelete(date){
  lDEnlazada.delete(date) 
  console.log(lDEnlazada.print())
}
function ldobleRefresh(date1,date2){
  lDEnlazada.refresh(date1,date2)
  console.log(lDEnlazada.print())
}
function ldobleSearch(date){
  console.log(lDEnlazada.search(date)) 
  return lDEnlazada.search(date)
  
}
function ldobleCargar(date){
  lDEnlazada.cargar()
}
function ldobleGuardar(date){
  lDEnlazada.guardar()
}
function ldoblePrint(){return print()}

//FUncion Guardar Archivo
function AbrirArchivoListaDobleEnlazada(event) {
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
          categoriaDoble = doc[key]
          console.log(categoria)
      }
      if(key=='nombre'){
          nombreDoble = doc[key]
          console.log(nombre)
      }
      if(key=='repeticion'){
          repeticionDoble = doc[key]
          console.log(repeticion)
      }
      if(key=='animacion'){
          animacionDoble = doc[key]
          console.log(animacion)
      }
      if(key=='valores'){
          //console.log(doc[key].length)
          for (var k in doc[key]){
            lDEnlazada.add(doc[key][k])
            
          }
      }
    
   }
   console.log(lDEnlazada.print())

  };

  reader.readAsText(file);
  
}/////////////////////

function downloadListaDobleEnlazada(filename, text) {
    
  lista = lDEnlazada.print()

  var element = document.createElement('a');
  let doc = JSON.stringify({ "categoria": categoriaDoble, 'nombre': nombreDoble, 'repeticion':repeticionDoble, 'animacion':animacionDoble, 'valores': lista });
  
  //console.log(listSimple.print())
  element.setAttribute('href', 'data:json,' + doc);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


