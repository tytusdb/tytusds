class Feistel{
    constructor(){
        this.entrada = null;
        this.salida = null;
        this.tablaIzquierda = [];
        this.tablaDerecha = [];   

        this.dato = null;
        this.ecriptado = null;
    }

    cargar(datos, llave, numeroPasadas){
        this.tablaIzquierda = [];
        this.tablaDerecha = [];  
        this.dato = datos
        let left = "";
        let right = "";
        for(let i = 0; i < datos.length; i++){
            if(i< (datos.length/2)){
                left += datos.charAt(i)                
            }else if(i>= (datos.length/2)){
                right += datos.charAt(i)
            }
        } 
        this.tablaIzquierda.push(left);
        this.tablaDerecha.push(right); 
        this.ciclosCodificar(left, right,llave, numeroPasadas);
        this.imprimirTablas();
        this.ecriptado = this.tablaIzquierda[this.tablaIzquierda.length-1] + this.tablaDerecha[this.tablaDerecha.length-1]

    }

    ciclosCodificar(left, right, llave, ciclos){
        if(llave.length != left.length){
            let aux = "";
            
            let diff = (left.length - llave.length);
            for(let i =0; i< diff; i++){
                aux += "0";
            }
            llave = aux + llave;
        }
        for(let i = 0; i < ciclos; i++){
            let xor_uno = "";
            let xor_dos = ""; 
            
            for(let j = 0; j< left.length; j++){  
                             
                if(right.charAt(j) != llave.charAt(j)){
                    xor_uno += "1"
                }else{
                    xor_uno += "0"
                }
            }

            for(let j = 0; j< left.length; j++){                
                if(xor_uno.charAt(j) != left.charAt(j)){
                    xor_dos += "1"
                }else{
                    xor_dos += "0"
                }
            }    

           /*  this.tablaIzquierda.push(right) 
            */ this.tablaDerecha.push(llave);
            this.tablaDerecha.push(xor_uno);  
            this.tablaDerecha.push(left);   

            let auxkey = "";
            let auxder = right;
            

            let auxChar = llave.charAt(0);
            llave = llave.slice(1,llave.length);
            llave = llave += auxChar; 

            left = right;
            right = xor_dos;
            this.tablaIzquierda.push(left);
            this.tablaDerecha.push(right);
            }        
    }

    imprimirTablas(){
        for(let dato of this.tablaDerecha){
            console.log("                "+ dato);
            
        }
        for(let dato of this.tablaIzquierda){
            console.log(dato);
        }
    }

    graficarencabezados(){
        let arregloencabeazados = []
        arregloencabeazados.push("Izquierda")
        arregloencabeazados.push("Derecha")
        return arregloencabeazados
    }

    graficardatos(){
        let arreglo = []
        let contador = 0;
        let contadorTabla = 0;
        for (let x = 0; x < this.tablaDerecha.length; x++) {
            let dato = []
            if(contador == 0){
                dato.push(this.tablaIzquierda[contadorTabla])
                contadorTabla++;
            }else{
                dato.push("")
            }
            dato.push(this.tablaDerecha[x])
            arreglo.push(dato)
            contador++;
            if(contador === 4){
                contador = 0;
            }

        }
        console.log(this.tablaIzquierda)
        console.log(arreglo)
        return arreglo
    }

    guardar(){
        return this.ecriptado;
    }

}

export default Feistel;