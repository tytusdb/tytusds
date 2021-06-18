class OQuickSort{
    constructor(lista) {
        this.lista=lista;
    }
    ordenar(){
        let lista=this.QuickSort(this.lista);
        return lista
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