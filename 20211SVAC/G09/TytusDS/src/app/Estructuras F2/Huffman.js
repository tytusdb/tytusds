class Dato{
    constructor(letra, repeticiones){
    this.letra=letra
    this.repeticiones=repeticiones
    this.izq=null
    this.der=null
    }
}
class Huffman{
    constructor(){
        this.raiz=null
        this.diccionario=[]
    }
    tableFrecuencias(cadena) {
        var letras= []
        this.contLetras(letras,cadena)
        this.ordenarLetras(letras)
    
        var repComparar=[]
        var nodo = new Dato((letras[0].letra+letras[1].letra),(letras[0].repeticiones+letras[1].repeticiones))
        nodo.izq=letras[0]
        nodo.der=letras[1]
        repComparar.push(nodo)
    
        for (let i = 2; i < letras.length; i++) {
            repComparar.push(letras[i])
        }
        this.ordenarLetras(repComparar)
        var a = this.arbolBinario(repComparar)
        this.raiz=a
        console.log(a)
        var cadena=""
        var aa=this.recorrerArbol(a,1,"d",cadena)
        //Recorriendo el árbol y estableciendo los 0s y 1s
    
        return letras
    }
    recorrerArbol(nodo, valor, letra, cadenaCodificada, ) {
        if (nodo == null) {
            return false
        }
        if (nodo.repeticiones == valor) {
            if(nodo.letra==letra){ 
                this.diccionario.push({letra: letra, cadenaCodificada:cadenaCodificada})
                return true
            }
            return false
        }
        let cadena=cadenaCodificada+"1"
        if (this.recorrerArbol(nodo.der,valor,letra,cadena)) {
            return true
        }
        cadena=cadenaCodificada+"0"
        if (this.recorrerArbol(nodo.izq,valor,letra,cadena)) {
            return true
        }
    }
    ordenarLetras(arreglo) {
        for (var i = (arreglo.length-1); i > 0; i--) {
            for (var j = 0; j < i; j++) {
                if(arreglo[j].repeticiones>arreglo[j+1].repeticiones){
                    var temp = arreglo[j];
                    arreglo[j] = arreglo[j+1]
                    arreglo[j+1] = temp;
                }
            }
        }
    }
    contLetras(letras,cadena){
        var ind=1, newCad=""
        letras.push(new Dato(cadena[0],1))
        while (ind<cadena.length) {
            if(cadena[0]==cadena[ind]){
                letras[letras.length-1].repeticiones=letras[letras.length-1].repeticiones+1
            }
            else{
                newCad+=cadena[ind]
            }
            ind++
        }
        if (newCad.length>0) {
            this.contLetras(letras,newCad)
        }
    }
    arbolBinario(letras) {
        var temp=[]
        var nodo = new Dato((letras[0].letra+letras[1].letra),(letras[0].repeticiones+letras[1].repeticiones))
        nodo.izq=letras[0]
        nodo.der=letras[1]
        temp.push(nodo)
        for (let i = 2; i < letras.length; i++) {
            temp.push(letras[i])
        }
        /*if(temp.length>1){
        }
        else{return "temp[0]"}*/
        this.ordenarLetras(temp)
        return temp.length>1 ? this.arbolBinario(temp):temp[0]
    }    
}
var a=new Huffman()
a.tableFrecuencias("daaaatoooo")