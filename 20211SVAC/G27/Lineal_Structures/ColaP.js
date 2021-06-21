//Cola de prioridad del paquete
    function PriorityQueue(){

        // Para guardar los datos, encapsule una clase, la clase interna
        function QueueElement(element, priority){
            this,element = element;
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
    pq.enqueue('abc',1);
    pq.enqueue('kjh',998);
    pq.enqueue('hig',100);
    pq.enqueue('def',10);
    pq.enqueue('kjn',1000);
    console.log(pq);

    // 2. Eliminar elementos
    pq.dequeue();