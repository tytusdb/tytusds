//Clase de la pila
class Stack{
    constructor() {
        this.items = {}; //Iniciar el array donde se agregaran los items
        this.top = 0; //El comienzo de la pila
    }

    //Agregar un dato a la pila
    push(data){
        this.top++;

        this.items[this.top] = data;
    }

    //Eliminar un dato de la pila
    pop(){
        let deletedData;

        if(this.top){
            deletedData = this.items[this.top];
            delete this.items[this.top];
            this.top--;
            return deletedData;
        }
    }

    //Obtener el tamaño de la pila
    getSize(){
        return this.top;
    }

    //Revisar si la pila esta vacia
    isEmpty(){
        if(!this.getSize()){
            return null;
        } else {
            return false
        }
    }

    //Revisar el siguiente item a ser eliminado
    peek(){
        if(this.isEmpty()){
            return null;
        }

        return this.items[this.top];
    }

    //Imprimir la pila
    print(){
        let result = '';
        for(let i = this.top; i > 0; i--){
            if(i === this.top){
                result += 'Push ↓ Pop ↑' + '<br>'+ '-----------------' + '<br>' + this.items[i] + '<br>' + '-----------------' + '<br>';
            } else {
                result += this.items[i] + '<br>' + '-----------------' + '<br>';
            }
        }
        return result;
    }

    //Guardar la pila en un archivo JSON
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

const cola = new Stack();

function agregar(){
    let data = document.getElementById("valorAdd").value;
    cola.push(data);
    print();
}

function print(){
    document.getElementById("pila").innerHTML = cola.print();
}

function eliminar(){
    cola.pop();
    print();
}


