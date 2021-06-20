//Clase del nodo indiviual de la lista
class Nodo {
    constructor(data, next, prev) {
        this.data = data; //Guardando el dato del nodo
        this.next = next; //Guardando el dato del siguiente nodo
        this.prev = prev; //Guardando el dato del anterior nodo
    }

}

//Clase de la lista
class ListaCircularSimplementeEnlazada {
    constructor() {
        this.head = null; //Cabeza de la lista enlazada simple
        this.tail = null; //Cola de la lista enlazada simple
        this.size = 0; //Tamaño de la lista enalazada simple
    }

    //Metodo para agregar un nuevo nodo a la lista
    add(data){
        const newNodo = new Nodo(data, null);

        if (!this.head){
            this.head = newNodo;
            this.tail = newNodo;
        } else {
            this.tail.next = newNodo;
            newNodo.prev = this.tail;
            this.tail = newNodo;
        }

        this.tail.next = this.head;
        this.head.prev = this.tail;

        this.size++
    }

    //Metodo para agregar un nodo en cierta posicion de la lista
    insertAt(data, index){
        if(index <0 || index > this.size){
            return null;
        }

        const newNodo = new Nodo(data);

        if(index === 0){

            newNodo.next = this.head;
            if(this.head) {
                this.head.prev = newNodo;
            } else {
                this.tail = newNodo;
            }
            this.head = newNodo;


        } else if (index === this.getSize()) {
            this.tail.next = newNodo;
            newNodo.prev = this.tail;
            this.tail = newNodo;
        } else {
            let previous = this.head;
            for(let i = 0; i < index - 1; i++) {
                previous = previous.next;
            }
            newNodo.next = previous.next;
            previous.next.prev = newNodo;
            previous.next = newNodo;
            newNodo.prev = previous;
        }

        this.tail.next = this.head;
        this.head.prev = this.tail;

        this.size++

    }

    //Method para actualizar un nodo en cierta posicion de la lista
    updateAt(data, index){
        if(index <0 || index > this.getSize()){
            return null;
        }

        const newNodo = new Nodo(data);

        if(index === 0){

            if(this.head) {
                newNodo.next = this.head.next;
                newNodo.prev = this.head.prev;
            } else {
                this.tail = newNodo;
            }
            this.head = newNodo;


        } else if (index === this.getSize()-1) {
            newNodo.next = this.tail.next
            this.head.prev = newNodo;
            this.tail.prev.next = newNodo;
            newNodo.prev = this.tail.prev;
            newNodo.prev = this.tail;
            this.tail = newNodo;
        } else {
            let previous = this.head;
            for(let i = 0; i < index - 1; i++) {
                previous = previous.next;
            }
            newNodo.next = previous.next.next;
            previous.next.next.prev = newNodo;
            previous.next = newNodo;
            newNodo.prev = previous;
        }

        this.tail.next = this.head;
        this.head.prev = this.tail;

    }

    //Eliminar un nodo con cierto dato de la lista
    removeData(data){
        let current = this.head;
        let previous = null;

        while(current != null){
            if (current.data === data){
                if (!previous){
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                    this.head = current.next;
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
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

            if(current.next === this.head){
                break;
            }

        }
        return "El elemento no ha sido encontrado en la lista";

    }

    // Revisar el tamaño de la lista
    getSize(){
        return this.size
    }

    //Revisar si la lista esta vacia
    isEmpty(){
        if(this.getSize() === 0){
            return true;
        } else {
            return false;
        }
    }

    //Imprimir la lista
    print(){
        if(this.isEmpty()){
            return null;
        }

        let result = this.head.data;
        let current = this.head.next;

        while (current && current !== this.head){
            result += ' ⇨ ' + current.data;
            current = current.next;
        }

        result += '↺';

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

}

//Funciones para html

const lista = new ListaCircularSimplementeEnlazada();

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

