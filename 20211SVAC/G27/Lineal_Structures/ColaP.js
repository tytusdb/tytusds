//Cola de prioridad del paquete
    function PriorityQueue(){

        // Para guardar los datos, encapsule una clase, la clase interna
        function QueueElement(element, priority){
            this.element = element;
            this.priority = priority;
        }

    // Atributos del paquete
    this.items = [];

    // 1. Implementar el método de inserción
    PriorityQueue.prototype.enqueue = function(element, priority){
        // 1. Crear objeto QueueElement
        let queueElement = new QueueElement(element, priority);

        // 2. Determinar si la cola actual está vacía
        if(this.items.length == 0){
            this.items.push(queueElement);
        } else{
            let flag = false;
            for(let i =0 ; i< this.items.length; i++){
                if(queueElement.priority < this.items[i].priority){
                    this.items.splice(i,0,queueElement);
                    flag = true;
                    break;
                }
            }
            if(!flag){
                this.items.push(queueElement);
            }
        }
    }
        // 2. Eliminar elementos de front-end de la cola
        PriorityQueue.prototype.dequeue = function(){
            return this.items.shift()
        }
        // 3. Ver los elementos de la interfaz
        PriorityQueue.prototype.front = function(){
            return this.items[0];
        }
        // 4. Comprueba si la cola está vacía
        PriorityQueue.prototype.isEmpty = function(){
            return this.items.length == 0;
        }
        // 5. Ver el número de elementos en la cola
        PriorityQueue.prototype.size = function(){
            return this.items.length;
        }
        //6.toString método
        PriorityQueue.prototype.toString = function(){
            let resultString = '';
            for(let i = 0; i < this.items.length; i++){
                resultString += this.items[i] + ',';
            }
            return resultString;
    }
    }
    let pq = new PriorityQueue();
    // 1. Insertar elemento
    /*pq.enqueue('abc',1);
    pq.enqueue('kjh',998);
    pq.enqueue('hig',100);
    pq.enqueue('def',10);
    pq.enqueue('kjn',1000);
    console.log(pq);
*/
    // 2. Eliminar elementos
    //pq.dequeue();

    function agregarValor(){
        var x = document.getElementById("newValue").value;
        var p = document.getElementById("Prioridad").value;
        document.getElementById("newValue").value = "";
        document.getElementById("Prioridad").value = "";
        pq.enqueue(x,p);
        document.getElementById("newValue").focus();
        graficar();
    }
    
    function eliminarValor(){
        document.getElementById("newValue").value = pq.front().element;
        document.getElementById("Prioridad").value = pq.front().priority;
        pq.dequeue();
        graficar();
    }

    function AbrirArchivo(files){
        var file = files[0];
        var reader = new FileReader();
        reader.onload = function(event){
          var contents = event.target.result;
          var json = JSON.parse(contents);
          var count = Object.keys(json.valores).length;
          for (let index = 0; index < count; index++) {
            //console.log("valor: " + json.valores[index].valor +","+ "prioridad: " + json.valores[index].prioridad);
            pq.enqueue(json.valores[index].valor,json.valores[index].prioridad); 
          }
          graficar();
        };
        reader.onerror = function(event) {
          console.error("File could not be read! Code " + event.target.error.code);
      };
        reader.readAsText(file);
      }

      function graficar(){
        var x_pos = -150;
        var y_pos = 0;
        var nodes = [];
        var edges = [];
        var contador = 0;   
        // creating an array with nodes
        //var aux2 = queue.cabeza;
    
        nodes.push({id: "Cabeza", label: "Cabeza", x: -150, y: -100});
    
        for (let index = 0; index < pq.size(); index++) {
            console.log();
            nodes.push({id: contador, label: "Valor: " + pq.items[index].element+ "," + "Prioridad: " + pq.items[index].priority, x: x_pos, y: y_pos});
            //aux2 = aux2.anterior;
            x_pos = x_pos + 110;
            contador++;
        }
        // create an array with edges
    
        if(pq.size()!=0){
            edges.push({
                from: "Cabeza",
                to: 0,
                arrows: "to",
                physics: false,
                smooth: {type: "cubicBezier"},
              });
        }
        
        
        
    
        // create a network
        var container = document.getElementById("miRed");
        var data = {
          nodes: nodes,
          edges: edges,
        };
    
        const options = {
            nodes: {
                shape: "box",
                widthConstraint: 90,
                color: "#cccccc",
                margin: 10,
                font: {
                  size: 12,
                },
              },
            physics: {
                enabled: false,
            },
            interaction: {
                hover: true,
              },
        };
    
        var network = new vis.Network(container, data, options);
      
    }
    
    