//Clase del nodo indiviual de la cola
class Nodo {
    constructor(data, prior)
    {
        this.data = data;
        this.priority = prior;
    }
}

//Clase de la cola
class ColaDePrioridad {

    constructor()
    {
        this.items = []; //Array de los items de la cola
    }

    //Metodo para agregar elementos a la cola
    enqueue(data, prior) {
        let nodo = new Nodo(data, prior);
        let cont = false;

        for (let i = 0; i < this.getSize(); i++) {
            if (this.items[i].priority > nodo.priority) {
                this.items.splice(i, 0, nodo);
                cont = true;
                break;
            }
        }

        if (!cont) {
            this.items.push(nodo);
        }
    }

    //Metodo para elminar elementos a la cola
    dequeue()
    {
        if (this.isEmpty()){
            return null;
        }
        return this.items.shift();
    }

    //Obtener el elemento de mas alta prioridad
    front()
    {
        if (this.isEmpty()){
            return null;
        }
        return this.items[0];
    }

    //Obtener el elmento de mas baja prioridad
    rear()
    {
        if (this.isEmpty()){
            return null;
        }
        return this.items[this.items.length - 1];
    }

    //Revisar si la cola esta vacia
    isEmpty()
    {
        if(this.getSize() === 0){
            return true;
        } else {
            return false;
        }
    }

    //Revisar el tamaño de la cola
    getSize(){
        return this.items.length;
    }

    //Imprimir la cola
    print()
    {
        let result = "";
        for (let i = 0; i <= this.getSize(); i++) {
            if(i === 0){
                result += 'Dequeue ↑' + '<br>'+ '-----------------' + '<br>' + this.items[i].data + '<br>' + '-----------------' + '<br>';
            } else if (i===this.getSize()){
                result += 'Enqueue ↑';
            } else {
                result += this.items[i].data + '<br>' + '-----------------' + '<br>';
            }
        }

        return result;

    }

    //Guardar la lista en un archivo JSON
    saveFile(){
        var fs = require('fs');
        const jsonContent = JSON.stringify(this);

        fs.writeFile("./LinkedList", jsonContent, 'utf8', function (err){
            if (err){
                return console.log(err);
            }

            console.log("The file was saved!");
        })
    }

    //Guardar la cola en un archivo JSON
    saveFile(){
        let fs = require('fs');
        const jsonContent = JSON.stringify(this);

        fs.writeFile("./LinkedList", jsonContent, 'utf8', function (err){
            if (err){
                return console.log(err);
            }

            console.log("The file was saved!");
        })
    }

}

//Funciones para html

const cola = new ColaDePrioridad();

function agregar(){
    let data = document.getElementById("valorAdd").value;
    let prior = parseInt(document.getElementById("valorPrior").value);
    cola.enqueue(data, prior);
    print();
}

function print(){
    document.getElementById("cola").innerHTML = cola.print();
}

function eliminar(){
    cola.dequeue();
    print();
}



