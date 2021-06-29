function Hamming(cadena) {
    var Matriz=[]
    var nMax=calcBitsParidad(cadena)
    for (let i = 0; i < (cadena.length+nMax+1); i++) {
        Matriz[i] = new Array(nMax+4)
    }
    llenarMatriz(Matriz,nMax)//Llena la matríz con todos los encabezados de fila y de columna
    addPalabra(Matriz,cadena)//Añade la palabra a la matriz
    var contP=1
    while (contP<=nMax) {
        calcParidad(Matriz,contP)//Va estableciendo la paridad
        contP++
    }
    let a=palabraParidad(Matriz,nMax)//añade la palabra resultante a la matriz y retorna la palabra
    console.log(a)
}
function calcBitsParidad(cadena) {
    for (let i = 0; i < cadena.length; i++) {
        if(2**i >= cadena.length + i + 1)
        {return i}
    }
}
function llenarMatriz(array,nMax) {
    array[0][1]="Posición"
    array[0][2]="Palabra Original"
    var nParidad=[]
    for (let i = 0  ; i <= nMax; i++) {
        nParidad.push(Math.pow(2,i))
    }
    var contNparidad=1, contDato=1
    for (let i = 1; i < array.length; i++) {
        array[i][1]=i.toString(2)
        if (nParidad.includes(i)) {
            array[i][0]="P"+contNparidad
            contNparidad++
        }else{
            array[i][0]="D"+contDato
            contDato++
        }
    }
    contNparidad=1
    for (let j = 3; j < array[0].length-1; j++) {
        array[0][j]="P"+contNparidad
        contNparidad++
    }
    array[0][array[0].length-1]="Palabra con Paridad"
}
function addPalabra(array,cadena) {
    var cont=0
    for (let i = 3; i < array.length; i++) {
        if (array[i][0].includes("D")) {
            array[i][2]=cadena[cont]
            cont++
        }
    } 
}
function calcParidad(array,p) {
    var contParidad=0
    for (let i = 3; i < array.length; i++) {
        if (array[i][0].includes("D")) {
            try {
                if ((array[i][1])[array[i][1].length-p]=="1") {
                    array[i][2+p]=array[i][2]
                    if (array[i][2+p]=="1") {
                        contParidad++
                    }
                }                   
            } catch (error) {}
        }
    }
    if (contParidad%2==0) {
        array[Math.pow(2,p-1)][2+p]="0"
    }
    else{array[Math.pow(2,p-1)][2+p]="1"}
}
function palabraParidad(array,nMax) {
    var cadena=""
    for (let i = 1; i < array.length; i++) {
        let cont=2+nMax
        while (array[i][cont]==null) {
            cont--
        }
        array[i][3+nMax]=array[i][cont]
        cadena+=array[i][3+nMax]
    }
    return cadena
}

function convertTextToBinary(s){
    s = unescape( encodeURIComponent( s ) );
    var chr, i = 0, l = s.length, out = '';
    for( ; i < l; i ++ ){
        chr = s.charCodeAt( i ).toString( 2 );
        while( chr.length % 8 != 0 ){ chr = '0' + chr; }
        out += chr;
    }
    return out;
}
function HammingCadena(cadena) {
    console.log(convertTextToBinary(cadena))
    Hamming(convertTextToBinary(cadena))
}
HammingCadena("se lo dije")
//Hamming("0110101")