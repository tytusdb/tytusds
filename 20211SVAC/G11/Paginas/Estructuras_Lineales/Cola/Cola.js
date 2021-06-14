class Cola{
    constructor(){
        this.valor = {};
        this.inicio =0;
        this.fin=0;
    };

    encolar(dato){
        this.valor[this.fin]=dato;
        this.fin++;
    };

    sacar_cola(){
        //verificar si hay algun valor en la fila
        if(this.inicio == this.fin){
            return null;
        };
        if(this.inicio!=this.fin){
            const valor = this.valor[this.inicio];
            this.inicio++;
            return valor;
        };
        
    };
};

const cola = new Cola();
cola.encolar(1);
cola.encolar('Jhonathan');
cola.encolar('Juan')
//console.log(cola);
console.log(sacar_cola());
