class Feistel{
    constructor(){
        this.table=[]
        this.table[0]=new Array()
        this.table[1]=new Array()
    }
    cifrarCadena(text, rondas){
        var l="",r="",k, cadena="",f, aux=""
        //Se importa el la clase Hamming para usar su método de converión a binario
        const Hamming= require('./Hamming')
        var Hm= new Hamming()
        cadena=Hm.convertTextToBinary(text)
        //Se declaran los l y r de la tabla
        l=cadena.substring(0,parseInt(cadena.length/2))
        r=cadena.substring(parseInt(cadena.length/2),cadena.length)
        k="00110001"

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
        return aux[0]+aux[1]
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
    convertBinario(s){
        s = unescape( encodeURIComponent( s ) );
        var chr, i = 0, l = s.length, out = '';
        for( ; i < l; i ++ ){
            chr = s.charCodeAt( i ).toString( 2 );
            while( chr.length % 8 != 0 ){ chr = '0' + chr; }
            out += chr;
        }
        return out;        
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
}
var f= new Feistel()

cifradoFeistel("CF",4)

function cifradoFeistel(text, rondas) {
    var result
    result=f.cifrarCadena(text,rondas)
    console.log("El texto convertido es: "+result)
    return result
}