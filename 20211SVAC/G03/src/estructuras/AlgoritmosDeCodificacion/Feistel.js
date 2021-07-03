class Feistel{
    constructor(){
        this.entrada = null;
        this.salida = null;
        this.tablaIzquierda = []
        this.tablaDerecha = [];   
    }

    codificarBinario(datos, llave, numeroPasadas){
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

            this.tablaIzquierda.push(right) 
            this.tablaDerecha.push(llave);
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


}