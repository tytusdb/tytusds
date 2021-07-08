class Nodo{
    constructor(data, next, id, x, y,disBtn,heightBtn){
        this.data = data;
        this.next = next;
        this.id = id
        this.x = x
        this.disBtn = disBtn
        this.y = y
        this.heightBtn = heightBtn
    }
}
class ListaSimple{
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

    const newNodo = new Nodo(data, null, (this.contId).toString(), null, null, objeto.offsetWidth, objeto.offsetHeight);
    if(this.head){        
        let current = this.head;
        while(current.next){
        current = current.next;
        }
        const divFlecha = document.createElement("div")//Creando el div donde se añaden los botones
        divInsert.appendChild(divFlecha)
        divFlecha.innerHTML='<img src="assets/img/flecha_izquierda.png" height="'+objeto.offsetHeight+ '" />'
        divFlecha.id="flecha"+(this.contId).toString()
        const selecFlecha = document.getElementById(divFlecha.id)
        newNodo.x= current.x + current.disBtn + (objeto.offsetHeight*0.93) + 20
        if(this.hMax<objeto.offsetHeight){ this.hMax=objeto.offsetHeight}//Validando la altura máxima de un botón, para guardarlo para la siguiente fila
        
        if(boton.offsetWidth-100>newNodo.x){//Validando que el ancho del área no se sobrepase, de lo contrario crea una nueva fila
            newNodo.y=current.y
        }//Definiendo el valor de y
        else{
            newNodo.y=current.y + this.hMax +20
            newNodo.x=this.head.x +45
            this.hMax=0
        }

        current.next = newNodo;

        posicion.style.left = (newNodo.x).toString()+"px" //El + 50 es para incluir a la misma flecha
        posicion.style.top =(newNodo.y).toString()+"px"

        selecFlecha.style.position="absolute"
        selecFlecha.classList='animate__animated animate__backInLeft animate__fast'
        selecFlecha.style.left = (newNodo.x-(objeto.offsetHeight*0.93)-10).toString()+"px"
        selecFlecha.style.top = (newNodo.y+5).toString()+"px"
        this.contId++
        //Al final ya que el contId debe ser el mismo para la caja de la flecha y el botón
    }else{
        this.head = newNodo
        this.head.x=10
        this.head.y=20
        posicion.style.left =(this.head.x).toString()+"px"
        posicion.style.top =(this.head.y).toString()+"px"
        this.contId++
        this.hMax=objeto.offsetHeight
    }
    this.size++
    }
delete(data){
    let aux = this.head
    let aux2
    //this.search(data)
    if(aux.data==data){
        const selecBtn = document.getElementById("btn"+aux.id)
        selecBtn.classList="animate__animated animate__hinge"
        const sClone = selecBtn.cloneNode(true)
        selecBtn.parentNode.replaceChild(sClone, selecBtn)

        const selecFlechaSiguiente = document.getElementById("flecha"+aux.next.id)
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
        this.head=aux.next
        this.head.x=10
        this.head.y=20
        //Iria el posicionamiento de la actual cabeza
        const selecBtnNuevo = document.getElementById("btn"+this.head.id)
        selecBtnNuevo.classList="animate__animated animate__slideInRight"
        const sClone3 = selecBtnNuevo.cloneNode(true)
        selecBtnNuevo.parentNode.replaceChild(sClone3, selecBtnNuevo)
        sClone3.style.left =(this.head.x).toString()+"px"
        sClone3.style.top =(this.head.y).toString()+"px"
        aux=this.head
        this.reOrdenar(aux)
        this.size--
        return}
    while(aux != null){
        aux2=aux.next;
        if(aux2.data==data){  
        //Elemento a eliminar de la lista aux 2
        const selecBtn = document.getElementById("btn"+aux2.id)
        selecBtn.classList="animate__animated animate__hinge"
        const sClone = selecBtn.cloneNode(true)
        selecBtn.parentNode.replaceChild(sClone, selecBtn)

        const selecFlechaSiguiente = document.getElementById("flecha"+aux2.id)
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
        if(aux2.next!=null){
        aux2.next.x=aux2.x
        aux2.next.y=aux2.y
        //Iria el posicionamiento de la actual cabeza
        const selecBtnNuevo = document.getElementById("btn"+aux2.next.id)
        selecBtnNuevo.classList="animate__animated animate__slideInRight"
        const sClone3 = selecBtnNuevo.cloneNode(true)
        selecBtnNuevo.parentNode.replaceChild(sClone3, selecBtnNuevo)
        sClone3.style.left =(aux2.next.x).toString()+"px"
        sClone3.style.top =(aux2.next.y).toString()+"px"
        }    
        aux2=aux2.next
        aux.next=aux2
        if(aux.next!=null){
        this.reOrdenar(aux)}
        this.size--
        break
    }   
    else{
        aux=aux.next
    }
    }
}
refresh(dataActual,dataFinal){
    let aux = this.head
    var f = setInterval(whiles,500)
    function whiles(){
        if (aux != null) {
            const selecBtn = document.getElementById("btn"+aux.id)
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
            aux=aux.next
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
            const selecBtn = document.getElementById("btn"+aux.id)
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
            aux=aux.next
            }
        }
        else{
            clearInterval(g)
        }
    }
    }

reOrdenar(aux){
    const boton=document.getElementById("b1")
    while(aux.next != null){
        aux.next.x= aux.x + aux.disBtn + (aux.heightBtn*0.93) +20
        if(this.hMax<aux.next.heightBtn){ this.hMax=aux.next.heightBtn}
        
        if(boton.offsetWidth-100>aux.next.x){
            aux.next.y=aux.y
        }//Definiendo el valor de y
        else{
            aux.next.y=aux.y + this.hMax +20
            aux.next.x=this.head.x +45
            this.hMax=0
        }
        
        const p = document.getElementById("btn"+(aux.next.id))
        const posicion = p.cloneNode(true)
        p.parentNode.replaceChild(posicion, p)
        posicion.style.left = (aux.next.x).toString()+"px" //El + 50 es para incluir a la misma flecha
        posicion.style.top =(aux.next.y).toString()+"px"
        posicion.classList="animate__animated animate__slideInRight"
        
        const sF = document.getElementById("flecha"+(aux.next.id))
        const selecFlecha = sF.cloneNode(true)
        sF.parentNode.replaceChild(selecFlecha, sF)
        selecFlecha.style.position="absolute"
        selecFlecha.classList="animate__animated animate__slideInRight"
        selecFlecha.style.left = (aux.next.x-(aux.next.heightBtn*0.93)-10).toString()+"px"
        selecFlecha.style.top = (aux.next.y+5).toString()+"px"
        aux=aux.next
    }
}

print(){
    var valores = []
        let aux = this.head;
        while (aux != null) {
            valores.push(aux.data);
            aux = aux.next;
        }
        return valores;
    }
}

const listSimple = new ListaSimple();
var categoria = "Estructura Lineal";
var nombre = 'Lista Simple';
var repeticion = "True";
var animacion = "0";

function lsimpleAdd(data){
listSimple.add(data);
return listSimple.print()
}

function lsimpleDelete(data){
listSimple.delete(data);
}
function lsimpleRefresh(data1,data2){
listSimple.refresh(data1,data2); 
}
function lsimpleSearch(data){
return listSimple.search(data); 
}
function lsimpleCargar(data){
listSimple.cargar(data);
}
function lsimpleGuardar(data){
listSimple.guardar();
}
function lsimplePrint(){return print()}

function convertToText(obj) {
    //create an array that will later be joined into a string.
    var string = [];

    //is object
    //    Both arrays and objects seem to return "object"
    //    when typeof(obj) is applied to them. So instead
    //    I am checking to see if they have the property
    //    join, which normal objects don't have but
    //    arrays do.
    if (typeof(obj) == "object" && (obj.join == undefined)) {
        string.push("{");
        for (prop in obj) {
            string.push(prop, ": ", convertToText(obj[prop]), ",");
        };
        string.push("}");

    //is array
    } else if (typeof(obj) == "object" && !(obj.join == undefined)) {
        string.push("[")
        for(prop in obj) {
            string.push(convertToText(obj[prop]), ",");
        }
        string.push("]")

    //is function
    } else if (typeof(obj) == "function") {
        string.push(obj.toString())

    //all other values can be done with JSON.stringify
    } else {
        string.push(JSON.stringify(obj))
    }

    return string.join("")
}
//abrir un documento
function onChange(event) {
    //console.log(event)
    var file = event.target.files[0];
    //console.log(file)
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
                listSimple.add(doc[key][k])
            }
        }
        //console.log(key)
     }
     

    };

    reader.readAsText(file);
}//guardar archivo
function download(filename, text) {
    
    lista = listSimple.print()
  
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
