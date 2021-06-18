class OBurbuja{
    constructor(lista) {
        this.recorridos=[]
        this.lista=lista
    }
    Ordenar(){
      ///CONVERTIR A STRING EL NODO PIVOTE Y EL NODO SELECCIONADO
      //NODO PIVOTE SERA NUMERO MAS P nodo sleccionado sera nodo mas S
        this.recorridos.push(this.lista.slice());
        for(let i=0; i<this.lista.length-1; i++){
            for (let j=i+1; j<this.lista.length;j++){
                if(this.lista[i]>this.lista[j]){
                    let temp=this.lista[i];
                    this.lista[i]=this.lista[j];
                    this.lista[j]=temp;
                    this.recorridos.push(this.lista.slice());
                }
            }
        }
        this.recorridos.push(this.lista.slice());
        return this.recorridos;
    }

}

module.exports = OBurbuja
