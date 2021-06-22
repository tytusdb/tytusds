class pila {
    constructor(){
        this.item = {};
        this.top = 0;
    }

    push(data){
        this.top++;
        this.item[this.top] = data;
    }

    pop(){
        let eliminado;

        if (this.top){
            eliminado = this.item[this.top];
            delete this.item[this.top];
            this.top--;
            return eliminado;
        }
    }

    print(){
        let result = '';
        for (let i = this.top; i > 0; i--){
            result += this.itemm[i] + ' '
        }
        return result
    }
}
export default pila;
