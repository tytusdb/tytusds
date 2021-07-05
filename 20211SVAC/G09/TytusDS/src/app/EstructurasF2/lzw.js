class LZW{
    constructor(){
        this.diccionario=[]
        this.Matriz=[]
        for (let i = 0; i < 5; i++) {
            this.Matriz[i]= new Array()
        }
        this.cadenaConvertida=""
    }
    cifradoLZW(texto){
        this.llenarMatriz()
        this.addLetrasDiccionario(texto)
        var w="",K, cont=0, textCifrado="", temp=""
        while (cont<texto.length) {
            K=texto[cont]

            this.Matriz[0][cont+1]=w
            this.Matriz[1][cont+1]=K
            this.Matriz[2][cont+1]=w+K

            temp=this.imprimirW(w)//Ya se va imprimir en ambos caso del else

            if (this.buscarTextoinDiccionario(w+K)) {//Si encuentra en el diccionario el wK entonces iguala w
                w=w+K
            } else {//Si no lo encuentra lo añade al dic y sigue recorriendo
                //console.log(temp)
                textCifrado+=temp
                this.diccionario.push({letra:w+K,valor:this.diccionario.length})
                this.Matriz[3][cont+1]=w+K
                this.Matriz[4][cont+1]=temp
                w=K
            }
            cont++
        }
        try {
            temp=this.imprimirW(w)
            this.Matriz[0][cont+1]=w
            this.Matriz[4][cont+1]=temp
            textCifrado+=temp
        } catch (error) {}//debugger
        console.log("El texto cifrado es: "+textCifrado)
        this.cadenaConvertida=textCifrado
        this.graficar()
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
    llenarMatriz(){
        this.Matriz[0][0]="w"
        this.Matriz[1][0]="K"
        this.Matriz[2][0]="wK"
        this.Matriz[3][0]="ADD diccionario"
        this.Matriz[4][0]="Salida"
    }
    graficar(){
        const Animaciones= require('./Animaciones')
        let ani=new Animaciones()
        //ani.graficarMatriz(this.Matriz)
        ani.animarTabla(this.Matriz)
    }
    returnCadena(){
        return this.cadenaConvertida
    }         
}

module.exports = LZW
//var lz=new LZW()

//algoritmoLZW("pablo papa de pablito")
//compadre no compro coco
//pablo papa de pablito