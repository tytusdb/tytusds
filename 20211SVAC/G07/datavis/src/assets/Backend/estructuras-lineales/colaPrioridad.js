class Nodo {
    constructor(data,next){
        this.data = data;
        this.next = next;
    }


}

class colaPrioridad {
    constructor(){
        this.pqueue = [[],[]];
    }

    encolar(dato,grado){
        this.pqueue[grado].push(dato);
    }
    desencolar(){
        for(var i = 0; i<this.pqueue.length;i++){
            if(this.pqueue[i].length!=0) return this.pqueue[i].shift();
        }
        return -1;
    }
    peek(){
        for(var i = 0; i<this.pqueue.length;i++){
            if(this.pqueue[i].length!=0) return this.pqueue[i][0];
        }
        return -1;

    }

}

export default colaPrioridad;
