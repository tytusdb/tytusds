class LZW{
    constructor(){
        this.diccionario=[]
    }
    cifradoLZW(texto){
        this.addLetrasDiccionario(texto)
        var w="",K, cont=0//, wK=""
        while (cont<texto.length) {
            K=texto[cont]
            if (this.buscarTextoinDiccionario(w+K)) {//Si encuentra en el diccionario el wK entonces iguala w
                w=w+K
            } else {//Si no lo encuentra lo añade al dic y sigue recorriendo
                console.log(this.imprimirW(w))
                this.diccionario.push({letra:w+K,valor:this.diccionario.length})
                w=K
            }
            cont++
        }
        console.log(this.imprimirW(w))
    }
    addLetrasDiccionario(cadena){
        var ind=1, newCad=""
        this.diccionario.push({letra:cadena[0],valor:this.diccionario.length})
        while (ind<cadena.length) {
            if(cadena[0]!=cadena[ind]){
                newCad+=cadena[ind]
            }ind++
        }
        if (newCad.length>0) {
            this.addLetrasDiccionario(newCad)
        }
    }
    buscarTextoinDiccionario(valor){
        var cont=0
        while (cont<this.diccionario.length) {
            if (valor==this.diccionario[cont].letra) {
                return true
            }
            cont++
        }
        return false
    }
    imprimirW(w){
        var cont=0
        while (cont<this.diccionario.length) {
            if (w==this.diccionario[cont].letra) {
                return this.diccionario[cont].valor
            }
            cont++
        }
        return null
    }        
}
var lz=new LZW()
lz.cifradoLZW("compadre no compro coco")