//Clase del nodo indiviual de la lista
class Nodo {
    constructor(data, next) {
        this.data = data; //Guardando el dato del nodo
        this.next = next; //Guardando el dato del siguiente nodo
    }

}

//Clase de la lista
class ListaEnlazada {
    constructor() {
        this.head = null; //Cabeza de la lista enlazada simple
        this.size = 0; //Tamaño de la lista enalazada simple
    }

    //Metodo para agregar un nuevo nodo a la lista
    add(data){
        const newNodo = new Nodo(data, null);

        if (!this.head){
            this.head = newNodo;
        } else {
            let current = this.head;
            while(current.next){
                current = current.next;
            }
            current.next = newNodo;
        }

        this.size++

    }

    //Metodo para agregar un nodo en cierta posicion de la lista
    insertAt(data, index){
        if(index <0 || index > this.size){
            return null;
        }

        const newNodo = new Nodo(data);
        let current = this.head;
        let previous;

        if(index === 0){
            newNodo.next = current;
            this.head    = newNodo;
        } else {
            for(let i = 0; i <index; i++){
                previous = current;
                current = current.next;
            }

            newNodo.next = current;
            previous.next = newNodo;
        }
        this.size++

    }

    //Metodo para actualizar un nodo en cierta posicion de la lista
    updateAt(data, index){
        if(index <0 || index > this.size){
            return null;
        }

        const newNodo = new Nodo(data);
        let current = this.head;
        let previous;

        if(index === 0){
            newNodo.next = current.next;
            this.head    = newNodo;
        } else {
            for(let i = 0; i <index; i++){
                previous = current;
                current = current.next;
            }

            newNodo.next = current.next;
            previous.next = newNodo;
        }
    }

    //Eliminar un nodo con cierto dato de la lista
    removeData(data){
        let current = this.head;
        let previous = null;

        while(current != null){
            if (current.data === data){
                if (!previous){
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }
                this.size--;
                return current.data;
            }
            previous = current;
            current = current.next;
        }
        return null;

    }

    //Encontrar un nodo con cierto dato en la lista
    findData(data){
        let current = this.head;
        let previous = null;

        while(current != null){
            if (current.data === data){
                return "El elemento se encuentra dentro de la lista";
            }
            previous = current;
            current = current.next;
        }
        return "El elemento no ha sido encontrado en la lista";

    }

    // Revisar el tamaño de la lista
    getSize(){
        return this.size
    }

    //Revisar si la lista esta vacia
    isEmpty(){
        return this.getSize() === 0;
    }

    //Imprimir la lista
    print(){
        if(this.isEmpty()){
            return null;
        }

        let current = this.head;
        let result = '';
        while(current){
            result += current.data + ' ⇨ ';
            current = current.next;
        }
        result += 'X'
        return result;

    }

    //Guardar la lista en un archivo JSON
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

const lista = new ListaEnlazada();

function agregar(){
    let data = document.getElementById("valorAdd").value;
    lista.add(data);
    print();
}

function agregarEn(){
    let data = document.getElementById("valorAdd").value;
    let index = parseInt(document.getElementById("valorAddIn").value);
    lista.insertAt(data, index);
    print();
}

function print(){
    document.getElementById("lista").innerHTML = lista.print();
}

function eliminar(){
    let data = document.getElementById("valorAdd").value;
    lista.removeData(data);
    print();
}

function update(){
    let data = document.getElementById("valorAdd").value;
    let index = parseInt(document.getElementById("valorAddIn").value);
    lista.updateAt(data, index);
    print();
}

function find(){
    let data = document.getElementById("valorAdd").value;

    document.getElementById("lista2").innerHTML = lista.findData(data);

    setTimeout(function(){
        document.getElementById("lista2").innerHTML = "";
    }, 5000);


}


