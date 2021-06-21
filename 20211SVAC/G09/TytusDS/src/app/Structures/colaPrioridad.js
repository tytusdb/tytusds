class ColaPrioridad{
	constructor(element, priority)
	{
		this.element = element;
		this.priority = priority;
	}
}

//controlador de la cola
class PriorityQueue {
	constructor()
	{
		this.items = [];
	}

// agrega un elemento y lo ordena por prioridad
        enqueue(element, priority)
        {
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
