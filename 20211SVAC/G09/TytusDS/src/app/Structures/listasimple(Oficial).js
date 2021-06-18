class Nodo{
    constructor(data, next, id, x,disBtn){
        this.data = data;
        this.next = next;
        this.id = id
        this.x = x
        this.disBtn = disBtn
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
    }
    
    add(data){
        const caja = document.createElement("div")//Creando el div donde se añaden los botones
        caja.id="div"+(this.contId).toString()
        this.contId++
        const divInsert=document.getElementById("divInsert1");
        divInsert.appendChild(caja)//Insertando el div en el Div principal
        const objeto=document.createElement("button"); //Creacion del botón
        //Añadir la imagen al div
        /*const img=document.createElement("img");
        //img.src="img/flecha_izquierda.png"
        //img.src="img/Foto-Tipo-DPI.jpeg"
        img.src="src/app/Structures/img/Foto-Tipo-DPI.jpeg"*/

        const texto=document.createTextNode(data);
        objeto.appendChild(texto);
        
        //Empieza diseño de Botón Juli
        objeto.style.backgroundColor='rgb(25, 25, 112)'
        objeto.style.color='rgb(255,255,255)'
        objeto.style.fontSize='60px'
        objeto.style.borderRadius="5px"
        //Termina el área de diseño del botón

        objeto.classList='animated bounce'

        //divInsert.insertBefore(objeto, divInsert.firstElementChild)

        const posicion=document.getElementById(caja.id)
        posicion.style.position="absolute"
        posicion.appendChild(objeto)
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
        //objeto.id="btn1"
    const newNodo = new Nodo(data, null, caja.id, null, objeto.offsetWidth);
    if(this.head){        
        let current = this.head;
        while(current.next){
        current = current.next;
        }
        this.contId++
        newNodo.x= current.x + 10 + current.disBtn
        current.next = newNodo;
        console.log(current.x)
        posicion.style.left = (newNodo.x).toString()+"px"
        posicion.style.top ="20px"
    }else{
        this.head = newNodo
        this.contId++
        this.head.x=10
        posicion.style.left =(this.head.x).toString()+"px"
        posicion.style.top ="20px"
        console.log(posicion.style.left)
        console.log(this.head.x)
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
    while (aux.next != null) {
        if (aux.data==dataActual) {
        aux.data=dataFinal
        return
        }
        aux=aux.next
    }
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
    var element = document.createElement('a');
    let doc = JSON.stringify({ x: 5, y: 6 });
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(doc));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
document.getElementById("dwn-btn").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    var text = document.getElementById("text-val").value;
    var filename = "hello.txt";
    
    download(filename, text);
}, false);