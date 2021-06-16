function Cola(name,code){
    this.name = name;
         this.code = code; // El número entero indica la prioridad o gravedad de la condición del paciente
}
function Queue(){
    this.data = [];
         /*Entrada*/
    this.enqueue = function(element){
        this.data.push(element);
    };
         // Dequeue: Elimina el elemento con mayor prioridad en la cola. El elemento con el código de menor prioridad tiene la mayor prioridad. * /
    this.dequeue = function(){
        var priority = this.data[0].code;
                 // Utilice el método de búsqueda secuencial para encontrar el elemento con la mayor prioridad, cuanto menor es el código de prioridad, mayor es la prioridad
        for(var i=0; i<this.data.length; ++i){
            if(this.data[i].code < priority){
                priority = i;
            }
        }
        return this.data.splice(priority,1);

    };
    this.toString = function(){
        var retstr = '';
        for(var i=0; i<this.data.length; ++i){
            retstr +=  this.data[i].name + " code: " + this.data[i].code + "\n";
        }
        return retstr;
    }
}

/*test*/
var queue = new Queue();
var p = new Cola(1,5);
queue.enqueue(p);
p = new Cola(2,4);
queue.enqueue(p);
p = new Cola(3,6);
queue.enqueue(p);
p = new Cola(4,2);
queue.enqueue(p);
p = new Cola(5,1);
queue.enqueue(p);
console.log(queue.toString());
 
var seen = queue.dequeue();
console.log(queue.toString());
