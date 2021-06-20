class Node{
    constructor(data, prev, next){
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
    getData(){
        return this.data;
    }
};


class Queue{
    constructor(){
       // this.items = {};
        this.head = null;
        this.tail = null;
        this.size = 0; 

    };
    
    enqueue(element){
        if(this.head == null){
            this.head = new Node(element);
            this.tail = this.head;
        }else{
            var newNode = new Node(element);
            newNode.next = this.tail;
            this.tail.prev = newNode;
            this.tail = newNode; 
        }
        this.size++;
        //this.items[this.end] = data;
        //this.end++;
    };

    dequeue(){
        var p = this.head
        if(this.head === this.tail){
            return null;

        };
        if(p == null){
            return null;
        };
        this.head = this.head.prev;
        p.next = null;
        p.prev = null;
        this.size--;
        return p;
        /*const data = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return data;*/
    };
    
    getSize(){
        return this.size;
    };

    isEmpty(){
        if (this.getSize() === 0){
            return true;
        }else{ 
            return false;
        };
    };

    peek(){
        if(this.getSize() === 0){
            return null;
        };
        return this.head;
    };


};

const queue = new Queue();

queue.enqueue(3);
queue.enqueue(2);
queue.enqueue(4);
queue.dequeue();
console.log(queue)