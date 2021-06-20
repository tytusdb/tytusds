class Ordenamiento{
    constructor(){
        this.arreglo = null;
        this.contadorArreglos = 0;
    }


    ordenar(datos){
        this.arreglo = datos;
        for (let i = 0; i< datos.length-1; i++){
            for(let j = 0; j< datos.length; j++ ){
                if(datos[j]> datos[j+1]){
                    let temporal = datos[j];
                    datos[j] = datos[j+1];
                    datos[j+1] = temporal;
                }
            }
        }
        this.arreglo = datos;
    }
}	