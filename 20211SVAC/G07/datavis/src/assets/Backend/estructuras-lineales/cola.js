class cola {
    constructor(){
        this.queue = [];
        this.indice = 0;
    }

    encolar(data){
        this.queue[this.indice]=data;
        this.indice++;
    }

    desencolar(){
        return this.queue.shift();
    }

    peek(){
        return this.queue[0];
    }

    empty(){
        return this.indice===0;
    }



}

export default cola;
