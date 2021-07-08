class Feistel{
    constructor(){
        this.table=[]
        this.table[0]=new Array()
        this.table[1]=new Array()
        this.cadenaConvertida=""
    }
    cifrarCadena(cadena, rondas, llave){
        var l="",r="",k,f, aux=""
        //Se declaran los l y r de la tabla
        l=cadena.substring(0,parseInt(cadena.length/2))
        r=cadena.substring(parseInt(cadena.length/2),cadena.length)
        k=llave

        f=this.xor(k,r)
        this.table[0][0]=l
        this.table[1][0]=r
        this.table[1][1]=k
        this.table[1][2]=f
        this.table[1][3]=l
        //Para el W1
        aux=r
        r=this.xor(f,l)
        l=aux
        aux=this.calcularCifrado(l,r,this.shiftCircular(k),4,rondas-1)
        this.table[0][aux[2]]=aux[0]
        this.table[1][aux[2]]=aux[1]
        this.cadenaConvertida=aux[0]+aux[1]
        console.log("La cadena cifrada es: "+this.cadenaConvertida)
    }
    xor(ri,ki){
        var cont=0, result=""
        while (cont<ri.length) {
            if (ri[cont]==ki[cont]) {
                result+=0
            } else {
                result+=1
            }
            cont++
        }
        return result
    }
    convertBinario(cadena, rondas, llave){
        //Se importa el la clase Hamming para usar su método de converión a binario
        const Hamming= require('./Hamming')
        var Hm= new Hamming()
        cadena=Hm.convertTextToBinary(cadena)
        this.cifrarCadena(cadena, rondas,Hm.convertTextToBinary(llave))
    }
    calcularCifrado(l,r,k,j,rondas){
        var aux, f
        f=this.xor(k,r)
        this.table[0][j]=l
        this.table[1][j]=r
        this.table[1][j+1]=k
        this.table[1][j+2]=f
        this.table[1][j+3]=l
        //Para el W1
        aux=r
        r=this.xor(f,l)
        l=aux
        return rondas==1 ? [l,r,j+4]: this.calcularCifrado(l,r,this.shiftCircular(k),j+4,rondas-1)//Función recursiva donde se llama a si misma hasta que termine de ejecutar las rondas
    }
    shiftCircular(llave){
        llave=llave.substring(1,llave.length)+llave[0]
        return llave
    }
    graficar(){
        const Animaciones= require('./Animaciones')
        let ani=new Animaciones()
        ani.animarTabla(this.table)
    }
    returnTable(){return this.table}
    returnCadena(){return this.cadenaConvertida}    
}

module.exports = Feistel