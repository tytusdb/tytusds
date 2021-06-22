class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor(){
        this.top = null;
        this.bottom = null;
        this.length = 0;
    }

    peek(){
        return this.top;
    }

    push (value){
        const newNode = new Node(value);

        //validacion

        if (this.length === 0) {
            this.top = newNode;
            this.bottom = newNode;
        }else {
            const holdingPointer = this.top;
            this.top = newNode;
            this.top.next = holdingPointer;
        }

        this.length++;

        return this;
    }

    pop(){
        if (!this.length){
           
            return;
        }

        const topNode = this.top;

        if(this.length === 1){
            this.top = null;
            this.bottom = null;
        }else {
            this.top = this.top.next;
        }
        this.length--;
        return topNode;
    }

    get(index){
        let nodo = this.top

        for(let i =0; i<this.length; i++ ){
            if(i==index){
                break
            }
            nodo = nodo.next
        }
        return nodo
    }

    
}

export default Stack