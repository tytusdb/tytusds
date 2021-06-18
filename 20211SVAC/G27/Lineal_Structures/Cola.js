class Queue{
    constructor(){
        this.items = {};
        this.front = 0;
        this.end = 0;

    };
    
    enqueue(data){
        this.items[this.end] = data;
        this.end++;

    };

    dequeue(){
        if(this.front === this.end){
            return null;

        };
        const data = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return data;
    };
    
    getSize(){
        return this.end - this.front;
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
        return this.items[this.front];
    };

    print(){
        if(this.getSize() === 0){
            return null;

        };
        let result = '';
        for (let i = this.front; i < this.end; i++){
            result += this.items[i] + '\n'; 
        };
        return result;
    };
};

const queue = new Queue();

queue.enqueue(3);
queue.enqueue(2);
queue.enqueue(4);
queue.dequeue();
console.log(queue.print());
