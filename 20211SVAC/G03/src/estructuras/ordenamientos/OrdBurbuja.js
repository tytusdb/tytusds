var fs = require('fs')
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
        return datos
    }

    cargar(archivo){
        let datos = JSON.parse[datos];
        let arreglo = datos["valores"];
        this.ordenar(arreglo)

    }

    guardar(){
        let contadorListas
        contadorListas ++;
        let archivojs;
        archivojs["Datos"] = this.arreglo;        
       
        let json = JSON.stringify(archivojs)
        let nombre = "Ordenamiento" + contadorListas;
        fs.writeFile(nombre, json)

    }
}

export default Ordenamiento;