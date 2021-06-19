class insercion{
    constructor(lista) {
        this.recorridos=[]
        this.ele=lista
    }

inser() {
    this.recorridos.push(this.ele.slice());
    for (let i=1; i<this.ele.length; i++){
        let x=i-1;
        let y=i;
        let datos=this.ele[i];
        while(x>=0 && this.ele[x]>datos){
            this.ele[y] = this.ele[x];
            x--;
            y--;
        }
        this.ele[y]=datos;
        this.recorridos.push(this.ele.slice());
    }
    this.recorridos.push(this.ele.slice());
        return this.recorridos;
}

}
module.exports = insercion