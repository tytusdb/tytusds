//Clase de cola
class Cola {
    constructor() {
        this.items = {}; //Array donde se guardaran los items
        this.front = 0; //Inicio de la cola
        this.end = 0; //Final de la cola
    }

    //Agregar un elemento a la cola
    lista(data){
        this.items[this.end] = data;
        this.end++
    }

    //Eliminar un elemento de la cola
    dequeue(){
        if(this.isEmpty()){
            return null;
        }

        const data = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return data;
    }

    //Obtener el tamaño de la cola
    getSize(){
        return this.end - this.front;
    }

    //Revisar si la cola esta vacia
    isEmpty(){
        if(this.getSize() === 0){
            return true;
        } else {
            return false;
        }
    }

    //Obtener el siguiente dato que saldra
    peek(){
        if(this.isEmpty()){
            return null;
        }

        return this.items[this.front];
    }

    //Imprimir la cola
    print(){
        if(this.isEmpty()){
            return null;
        }

        let result = '';
        for(let i = this.front; i <= this.end; i++){
            if(i === this.front){
                result += 'Dequeue ↑' + '<br>'+ '-----------------' + '<br>' + this.items[i] + '<br>' + '-----------------' + '<br>';
            } else if (i===this.end){
                result += 'Enqueue ↑';
            } else {
                result += this.items[i] + '<br>' + '-----------------' + '<br>';
            }
        }
        return result;
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

const cola = new Cola();

function agregar(){
    let data = document.getElementById("valorAdd").value;
    cola.lista(data);
    print();
}

function print(){
    document.getElementById("cola").innerHTML = cola.print();
}

function eliminar(){
    cola.dequeue();
    print();
}
