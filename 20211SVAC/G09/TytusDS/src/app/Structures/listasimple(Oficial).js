class Nodo{
    constructor(data, next, id, x, y,disBtn){
        this.data = data;
        this.next = next;
        this.id = id
        this.x = x
        this.disBtn = disBtn
        this.y = y
    }
}
/*class ItemList{
    constructor(data, id, x, y){
        this.data = data;
        this.id = id;
        this.x = x;
        this.y = y;
    }
}*/
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
        //Para reiniciar animación No borrar
        /*const b1=document.getElementById("b1");
        b1.classList='animated bounce'
        const b2 = b1.cloneNode(true)
        b1.parentNode.replaceChild(b2, b1)*/

        //Empieza diseño de Botón Juli
        objeto.style.backgroundColor='rgb(25, 25, 112)'
        objeto.style.color='rgb(255,255,255)'
        objeto.style.fontSize='15px'
        objeto.style.borderRadius="5px"
        //objeto.style.height="50px"
        objeto.style.textAlign="center"
        //Termina el área de diseño del botón
        objeto.id="btn"+(this.contId).toString()
        objeto.classList='animate__animated animate__rubberBand animate__slow'
        //divInsert.insertBefore(objeto, divInsert.firstElementChild)
        divInsert.appendChild(objeto)//Insertando el div en el Div principal
        const posicion=document.getElementById(objeto.id)
        posicion.style.position="absolute"
        const boton=document.getElementById("b1")
/*
        var pos = 0;
        var id = setInterval(frame, 10);
        function frame() {
            if (pos == 50) {
                clearInterval(id);
            } else {
                pos++;
                //objeto.style.top = pos + 'px';
                //divInsert.style.left = pos + 'px';
            }
        }*/
    const newNodo = new Nodo(data, null, objeto.id, null, null, objeto.offsetWidth);
    if(this.head){        
        let current = this.head;
        while(current.next){
        current = current.next;
        }
        const divFlecha = document.createElement("div")//Creando el div donde se añaden los botones
        divInsert.appendChild(divFlecha)
        divFlecha.innerHTML='<img src="assets/img/flecha_izquierda.png" height="'+objeto.offsetHeight+ '" />'
        divFlecha.id="flecha"+(this.contId).toString()
        const selecFlecha = document.getElementById(divFlecha.id);
        newNodo.x= current.x + current.disBtn + 60
        if(this.hMax<objeto.offsetHeight){ this.hMax=objeto.offsetHeight}
        console.log(this.hMax)
        if(boton.offsetWidth-100>newNodo.x){
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
        selecFlecha.style.left = (newNodo.x-45).toString()+"px"
        selecFlecha.style.top = (newNodo.y+5).toString()+"px"
        this.contId++//Al final ya que el contId debe ser el mismo para la caja de la flecha y el botón
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
    if(data==aux.data){this.head=aux.next 
        return}
    while(aux != null){
        aux2=aux.next;
        console.log(aux.data+"  "+aux2.data)
        if(aux2.data==data){  
        aux2=aux2.next
        aux.next=aux2
        this.size--
        break
    }   
    else{
        aux=aux.next}
    }
}
refresh(dataActual,dataFinal){
    let aux = this.head
    var f = setInterval(whiles,500)
    function whiles(){
        if (aux != null) {
            const selecBtn = document.getElementById(aux.id)
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
    /*while (aux.next != null) {
        if (aux.data==dataActual) {
        aux.data=dataFinal
        return
        }
        const selecBtn = document.getElementById(aux.id)
        setTimeout(function(){selecBtn.classList="animate__animated animate__bounceIn animate__delay-1s"
        load()
        selecBtn.innerText="Espere"
        console.log("Esperando")},3000)
        aux=aux.next
    }*/
    }

search(data){
    let aux = this.head
    while (aux.next != null) {
        if (aux.data==data) {
        return true
        }   
        aux=aux.next
    }return false
    }

cargar(data){/*
    fetch(data).then(resp => resp.json)
    .then(objetos =>{
        objetos.array.forEach(objeto => {
            //console.log(objeto) 
        });
    })*/
}

guardar(){}

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
var categoria;
var nombre;
var repeticion;
var animacion;

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
                listSimple.add(doc[key][k])
            }
        }
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
