//Clase del nodo indiviual de la lista
class Nodo {
    constructor(data, next, prev) {
        this.data = data; //Guardando el dato del nodo
        this.next = next; //Guardando el dato del siguiente nodo
        this.prev = prev; //Guardando eld ato del anterior nodo
    }

}

//Clase de la lista
class ListaDEnlazada {
    constructor() {
        this.head = null; //Cabeza de la lista
        this.tail = null; //Cola de la lista
        this.size = 0; //Tamaño de la lista
    }

    //Metodo para agergar un nuevo nodo en la cabeza de la lista
    addToHead(data){
        const newNodo = new Nodo(data, this.head, null);

        if(this.head){
            newNodo.next = this.head;
            this.head. prev = newNodo;
            this.head = newNodo;
        } else {
            this.head = newNodo;
            this.tail = newNodo;
        }
        this.size++;
    }

    //Metodo para agergar un nuevo nodo en el final de la lista
    addToTail(data){
        const newNodo = new Nodo(data, null, this.tail);

        if(this.tail){
            newNodo.prev = this.tail
            this.tail.next = newNodo;
            this.tail = newNodo;
        } else {
            this.tail = newNodo;
            this.head = newNodo;
        }
        this.size++;
    }

    //Metodo para agregar un nodo en cierta posicion de la lista
    insertAt(data, index) {
        if (index < 0 || index > this.size) {
            return null
        }

        const newNodo = new Nodo(data, null, null);
        let current = this.head;
        let previous;

        if (index === 0) {
            newNodo.next = current;
            current.prev = newNodo;
            this.head = newNodo;
        } else {
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.next;
            }

            newNodo.next =current;
            newNodo.prev = previous;
            current.prev = newNodo;
            previous.next = newNodo;
        }
    }

    //Eliminar un nodo al principio de la lista
    removeFromHead() {
        if (this.isEmpty()) {
            return null
        }

        const valueToReturn = this.head.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        this.size--;
        return valueToReturn;
    }

    //Eliminar un nodo al final de la lista
    removeFromTail() {
        if (this.isEmpty()) {
            return null
        }

        const valueToReturn = this.tail.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this.size--;
        return valueToReturn;
    }

    //Eliminar un nodo con cierto dato de la lista
    removeData(data){
        let current = this.head;
        let previous = null;

        while(current !== null) {
            if (current.data === data) {
                if (!previous) {
                    this.removeFromHead();
                } else if (!current.next) {
                    this.removeFromTail();
                } else {
                    previous.next = current.next;
                    current.next.prev = previous;
                }
                this.size--;
                return current.data;
            }
            previous = current;
            current = current.next;
        }
        return null;
    }

    //Metodo para actualizar un nodo en cierta posicion de la lista
    updateAt(data, index){
        if (index < 0 || index > this.size) {
            return null
        }

        const newNodo = new Nodo(data, null, null);
        let current = this.head;
        let previous;

        if (index === 0) {
            newNodo.next = this.head.next;
            newNodo.prev = this.head.prev;
            this.head = newNodo;
        } else {
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.next;
            }

            newNodo.next = current.next;
            newNodo.prev = previous;
            previous.next = newNodo;
            current.next.prev = newNodo;
        }
    }

    //Encontrar un nodo con cierto dato en la lista
    findData(data){
        let current = this.head;
        let previous = null;

        while(current !== null) {
            if (current.data === data) {
                return "El elemento se encuentra dentro de la lista";
            }
            previous = current;
            current = current.next;
        }
        return "El elemento no ha sido encontrado en la lista";
    }

    //Imprimir la lista
    print() {
        let current = this.head;
        let result = '';
        while(current) {
            result += current.data + ' ⇦⇨ ';
            current = current.next;
        };

        return result += 'X ';
    };

    // Revisar el tamaño de la lista
    getSize(){
        return this.size;
    }

    //Revisar si la lista esta vacia
    isEmpty(){
        if(this.getSize() === 0){
            return true;
        } else {
            return false;
        }
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

const lista = new ListaDEnlazada();

function agregarHead(){
    let data = document.getElementById("valorAdd").value;
    lista.addToHead(data);
    print();
}

function agregarTail(){
    let data = document.getElementById("valorAdd").value;
    lista.addToTail(data);
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


