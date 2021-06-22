class ColaPrioridad{
	constructor(element, priority)
	{
		this.element = element;
		this.priority = priority;
	}
}
//import {colocarObject, createObject,Animation} from "../Structures/Animation"
//controlador de la cola
class PriorityQueue {
	constructor()
	{
		this.items = [];
	}

// agrega un elemento y lo ordena por prioridad
        enqueue(element, priority)
        {
            const divInsert=document.getElementById("divInsert1");
            const objeto=document.createElement("button"); //Creacion del botón
            const texto=document.createTextNode(element);
            objeto.appendChild(texto);
            //Diseño del botón
            objeto.style.backgroundColor='rgb(30,144,255)'
            objeto.style.color='rgb(255,255,255)'
            objeto.style.fontSize='15px'
            objeto.style.borderRadius="5px"
            objeto.id=priority+"_"+element
            objeto.classList='animate__animated animate__rubberBand animate__slow'
            divInsert.appendChild(objeto)//Insertando el div en el Div principal

            if(!this.buscarPrioridad(priority)){
                const bpriori=document.createElement("button"); //Creacion del botón
                const text=document.createTextNode(priority);
                bpriori.appendChild(text);
                //Diseño del botón
                bpriori.style.backgroundColor='rgb(30,144,255)'
                bpriori.style.color='rgb(45,255,255)'
                bpriori.style.fontSize='15px'
                bpriori.style.borderRadius="5px"
                bpriori.id=priority//+"_"+element
                bpriori.classList='animate__animated animate__rubberBand animate__slow'
                bpriori.style.position="absolute"
                divInsert.appendChild(bpriori)//Insertando el div en el Div principal
                console.log("La prioridad no existe")
                //const posPriori=document.getElementById(bpriori.id)
                              
                /*posPriori.style.top="20px"
                posPriori.style.left="10px"*/
            }
            const posicion=document.getElementById(objeto.id)
            posicion.style.position="absolute"            
            /*posicion.style.top="20px"
            posicion.style.left="80px"*/
            // crea el nuevo elemento
            var ColaElemento= new ColaPrioridad(element, priority);
            var contain = false;

            // recorrer todo el arreglo
            for (var i = 0; i < this.items.length; i++) {
                //encontrar el espacio de prioridad
                if (this.items[i].priority < ColaElemento.priority) {
                    // al encotrar el espacio
                    // agregar
                    this.items.splice(i, 0, ColaElemento);
                    contain = true;
                    break;
                }
            }

            // si no encontro su prioridad en el arreglo, agreguelo de ultimo
            if (!contain) {
                this.items.push(ColaElemento);
            }
            this.reOrdenarTodo()
        }

        //remover el dato de tipo FIFO
        dequeue()
        {
        //mientras no este vacío
            if (this.isEmpty())
                return "borrado";
            return this.items.shift();
        }

        // retorna la mayor prioridad dada
        front()
        {
           //mientras no este vacío
            if (this.isEmpty())
                return "No elements in Queue";
            return this.items[0];
        }

        // retorna la menor prioridad dada
        rear()
        {
             //mientras no este vacío
            if (this.isEmpty())
                return "No elements in Queue";
            return this.items[this.items.length - 1];
        }

        // retorna si esta vacío o no
        isEmpty()
        {
            // return true if the queue is empty.
            return this.items.length == 0;
        }

        // retorna todo el contenido del arreglo
        printPQueue()
        {
            var str = "";
            for (var i = 0; i < this.items.length; i++)
                str += this.items[i].element + " -> Prioridad: " + this.items[i].priority+ "\n" ;
            return str;
        }

        buscarPrioridad(element){
            for (var j = 0; j < this.items.length; j++){
                if(this.items[j].priority==element){
                    return true
                }
            }
            return false
        }
        reOrdenarTodo(){
            let altPriori=1 , xElement=1,x,y, x2
            for (var i = 0; i < this.items.length; i++){
                if(i>0){
                    if(this.items[i].priority!=this.items[i-1].priority)
                    {
                        xElement=1
                        altPriori++
                        x=10
                        y=35*altPriori
                        x2=40*xElement
                    }else{
                        xElement++
                        x=10
                        y=35*altPriori
                        x2=40*xElement}
                }
                else{
                    x=10
                    y=35*altPriori
                    x2=40*xElement
                    console.log("Es falso i>1")
                }
                console.log("id= ",this.items[i].priority+" x= "+x+" y= "+y)

                /*var Animation= require('../Structures/Animation')
                let ani = new Animation()*/
                //colocarObject(this.items[i].priority, x, y)
                //colocarObject(this.items[i].priority, x, y)

                this.selecObject(this.items[i].priority, x, y)
                console.log("id= ",this.items[i].priority+"_"+this.items[i].element+" x= "+x2+" y= "+y)
                this.selecObject(this.items[i].priority+"_"+this.items[i].element, x2, y)
            }
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
}



var priorityQueue = new PriorityQueue();
var categoriaPrio = "Estructura Lineal";
var nombrePrio = 'Cola Prioridad';
var repeticionPrio = "True";
var animacionPrio = "0";

function insertarPrioridad(var1,var2){
    priorityQueue.enqueue(var1,var2)
    console.log(priorityQueue.printPQueue());
}

//priorityQueue.enqueue("5", 1);
//priorityQueue.enqueue("2", 5);
//priorityQueue.enqueue("3", 1);
//priorityQueue.enqueue("6", 2);
//priorityQueue.enqueue("4", 6);
//priorityQueue.enqueue("1", 2);

//console.log(priorityQueue.printPQueue());

//console.log("Eliminar elemento con mayor prioridad");
//priorityQueue.dequeue();
//console.log(priorityQueue.printPQueue());
function AbrirPrioridad(event) {
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
            categoriaPrio = doc[key]
            console.log(categoria)
        }
        if(key=='nombre'){
            nombrePrio = doc[key]
            console.log(nombre)
        }
        if(key=='repeticion'){
            repeticionPrio = doc[key]
            console.log(repeticion)
        }
        if(key=='animacion'){
            animacionPrio = doc[key]
            console.log(animacion)
        }
        if(key=='valores'){
            //console.log(doc[key].length)
            for (var k in doc[key]){
                priorityQueue.enqueue(doc[key][k]['valor'],doc[key][k]['prioridad'])
            }
        }
     }console.log(priorityQueue.printPQueue())
     

    };

    reader.readAsText(file);
}//guardar archivo
function downloadPrioridad(filename, text) {
    
    lista = listSimple.print()
  
    var element = document.createElement('a');
    let doc = JSON.stringify({ "categoria": categoriaPrio, 'nombre': nombrePrio, 'repeticion':repeticionPrio, 'animacion':animacionPrio, 'valores': lista });
    
    //console.log(listSimple.print())
    element.setAttribute('href', 'data:json,' + doc);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
