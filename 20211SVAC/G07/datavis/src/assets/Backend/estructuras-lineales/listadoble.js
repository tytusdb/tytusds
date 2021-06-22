class Node {
    constructor (data, next, prev){
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

class ListaDoble {
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    addhead(data){
        const newNode = new Node(data, this.head, null);
        if (this.head){
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        else {
            this.head = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    addtail(data){
        const newNode = new Node(data, null, this.tail);
        if (this.tail){
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        else {
            this.tail = newNode;
            this.head = newNode;
        }
        this.size++;
    }

    deletehead(){
        if (!this.head){
            return null;
        }
        const valoret = this.head.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        this.size--;
        return valoret;
    }

    deletetail(){
        if (!this.tail){
            return null;
        }
        const valoret = this.tail.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this.size--;
        return valoret;
    }

    delete(data){
        let actual = this.head;
        let anterior = null;

        while (actual != null){
            if (actual.data === data){
                if (!anterior){
                    return this.deletehead();
                }else if(!actual.next){
                    return this.deletetail();
                }
                else {
                    anterior.next = actual.next;
                    actual.next.prev = anterior;
                }
                this.size--;
                return actual.data;
            }
            anterior = actual;
            actual = actual.next;
        }
        return null
    }

    print(){
        let actual = this.head;
        let result = '';
        while (actual){
            result += actual.data + '<-->';
            actual = actual.next;
        }
        return result += 'X';
    }

}

const lista = new ListaDoble();

export function AgregarNuevoDoble(valor){
  console.log(lista)
  if(valor != null && valor != ''){
    lista.addhead(valor);
    lista.print();
  }else{
    lista.print();
  }
}
