class OQuickSort{
    constructor(lista) {
        this.lista=lista;
        this.recorridos=Array();
    }
    Ordenar(){
        this.recorridos.push(this.lista.slice());
        let lista=this.QuickSort(this.lista);
        this.recorridos.push(lista.slice());
        return this.recorridos;
    }
    QuickSort(lista){
        if (lista.length<1){
            return []
        }
        let izq=[];
        let der=[];
        let pivote=lista[0];
        for (let i=1; i<lista.length; i++){
            if(lista[i]<pivote){
                izq.push(lista[i]);
            }else{
                der.push(lista[i]);
            }
        }
        return [].concat(this.QuickSort(izq),pivote,this.QuickSort(der))
    }


}

module.exports = OQuickSort;
