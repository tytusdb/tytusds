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



}