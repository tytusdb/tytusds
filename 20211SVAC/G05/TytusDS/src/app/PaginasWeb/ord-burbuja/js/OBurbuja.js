class OBurbuja{
    constructor(lista) {
        this.lista=lista
    }
    Ordenar(){
        for(let i=0; i<this.lista.length-1; i++){
            for (let j=i+1; j<this.lista.length;j++){
                if(this.lista[i]>this.lista[j]){
                    let temp=this.lista[i];
                    this.lista[i]=this.lista[j];
                    this.lista[j]=temp;
                }
            }
        }
        return this.lista;
    }
}

module.exports = OBurbuja
