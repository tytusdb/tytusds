class Feistel{
    constructor(ronda){
        this.ronda = ronda;
        this.key = [];
        this.arrayDerecha = [];
        this.arrayIzquierda = [];
        

        this.desKey = [];
        this.desArrayDerecha =[];
        this.desArrayIzquierda = [];

        this.resultadoFinal = "";
        this.llaveFinal = "";
    }

    ingresoTexto(texto, llave){

        let salidaB ="";
        let llaveB = "";
        let medio = 0;
        let auxSalida = [];
        let sizeDerecha = 0;
        let sizeKey =0;
        let sizeResult = 0;
        
        //conversión de llave
        for (let j = 0; j < llave.length; j++) {
            llaveB+= llave.charCodeAt(j).toString(2);
        }
        //conversion de texto
        for (let i = 0; i < texto.length; i++) {
           let auxSalida = texto.charCodeAt(i).toString(2);
            if(auxSalida.length<8){
                let it = 8-auxSalida.length;
                for (let k = 0; k < it; k++) {
                    auxSalida= "0"+auxSalida;
                }
            }
            salidaB+=auxSalida;
            
        }
        //se obtiene el key en un arreglo
        this.key = llaveB.split("");
        auxSalida = salidaB.split("");
        //medio del texto
        medio = salidaB.length/2;
        //for para izquierda
        for (let i = 0; i < medio; i++) {
           this.arrayIzquierda.push(auxSalida[i])
        }
       
        //for para derecha
        for (let j = medio; j < salidaB.length; j++) {
            this.arrayDerecha.push(auxSalida[j]);
        }

         // para completar key
        sizeDerecha = this.arrayDerecha.length;
        sizeKey = this.key.length;
        sizeResult = sizeDerecha-sizeKey;
        
        for (let k = 0; k < sizeResult; k++) {
           this.key.unshift("0");
        }

        for (let l = 0; l < this.ronda; l++) {
            let iteracion = l+1;
            this.cifrado(iteracion);
        }        
        console.log("Cifrado")
        console.log("Izquierda | Derecha")
        console.log(this.arrayIzquierda +" | "+this.arrayDerecha);
        console.log("Llave: "+this.key);
    }


    cifrado(iteracion){
        let resultF = [];
        let auxDerecha = [];
        
        if(iteracion >= 2){
            let aux = this.key.shift();
            this.key.push(aux);
        }
        // Derecha con Key XOR = F
        for (let i = 0; i < this.arrayDerecha.length; i++) {
            let aux = this.arrayDerecha[i] ^ this.key[i];
            resultF.push(aux);
        }

        //Copia derecha
        this.arrayDerecha.forEach(Element => auxDerecha.push(Element));

        //se vacia el arreglo derecha
        this.arrayDerecha = [];
        
        //F con Izquierda XOR = Derecha
        for (let j = 0; j < resultF.length; j++) {
             let aux = resultF[j] ^ this.arrayIzquierda[j];
             this.arrayDerecha.push(aux);
        }

        //se vacia el arreglo izquierda
        this.arrayIzquierda = [];

        //se pasa Derecha a Izquierda
        auxDerecha.forEach(element => this.arrayIzquierda.push(element));

    }

    ingresoDescifrado(texto,llave){
        let medio = texto.length/2;

        //para pasar el binario a un arreglo
        let auxSeparacion = texto.split("");
        
        //para convertir key a arreglo
        this.desKey = llave.split("");

        //para izquierda
        for (let i = 0; i < medio; i++) {
            this.desArrayIzquierda.push(auxSeparacion[i]);
        }

        //para derecha
        for (let j = medio; j < texto.length; j++) {
            this.desArrayDerecha.push(auxSeparacion[j]);
        }

       for (let k = this.ronda; k > 0; k--) {
           this.descifrado(k);
       }

        //para ver decifrar a nivel de caracter
        this.descifrarBinario();
       

        //para decifrar la llave
        let binKey = ""; 
        this.desKey.forEach(element => binKey+=element);
        let resultBinkey = parseInt(binKey,2);
        this.llaveFinal = String.fromCharCode(resultBinkey);

        //RESULTADO AL DESCIFRAR *****************************
        console.log("Descifrado")
        console.log("Texto: "+this.resultadoFinal);
        console.log("Llave: "+this.llaveFinal)
    }

    descifrarBinario(){
        let contador =0;
        let auxBin = "";
        let binario = this.desArrayIzquierda.concat(this.desArrayDerecha);
        binario.forEach(element =>{
            contador++;
            auxBin+= element;
            if(contador == 8){
                let res = parseInt(auxBin,2);
                let resulta = String.fromCharCode(res);
                this.resultadoFinal += resulta;
                contador=0;
                auxBin = "";
            }
        });
    }

    descifrado(iteracion){
        let resultF = [];
        let auxIzquierda = [];

        if(iteracion < this.ronda){
            let aux = this.desKey.pop();
            this.desKey.unshift(aux);
        }
        //Izquierda con K XOR = F
        for (let i = 0; i < this.desArrayIzquierda.length; i++) {
            let aux = this.desArrayIzquierda[i] ^ this.desKey[i];
            resultF.push(aux);
        }
        //copia izquierda
        this.desArrayIzquierda.forEach(element => auxIzquierda.push(element));

        //se limpia izquierda
        this.desArrayIzquierda = [];

        //resultaF con Derecha XOR = Izquierda
        for (let j = 0; j < resultF.length; j++) {
            let aux = resultF[j] ^ this.desArrayDerecha[j];
            this.desArrayIzquierda.push(aux);
        }

        //se limpia derecha
        this.desArrayDerecha = [];

        //se asigna izquierda en derecha
        auxIzquierda.forEach(element => this.desArrayDerecha.push(element));
    }
}

let f = new Feistel(4);
f.ingresoTexto("hola","5");
f.ingresoDescifrado("01101100110111110000010101000111","0000000110101000");

