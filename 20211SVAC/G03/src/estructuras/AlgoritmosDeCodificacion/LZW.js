class LZW {
    constructor() {
        this.contador = 0;
        this.diccionario = new Map();
        this.salida = [];
        
        this.dato = null;
        this.ecriptado = null;
    }

    cargar(mensaje) {
        this.contador = 0;
        this.dato = mensaje
        this.diccionario = new Map();
        this.salida = [];
        this.iniciarDiccionario(mensaje)
        // w vacia
        let w = "";
        /*cada caracter k en el mensaje se lee en el for y se compara 
        si existe el valor k en el diccionario*/
        for (let k of mensaje) {
            let enDiccionario = false;
            let wk = w + k;
            for (let letra of this.diccionario.keys()) {
                if (wk == letra) {
                    enDiccionario = true;
                    break;
                }                
            }
            if (enDiccionario == true) {
                w = wk;
            /*en caso de que no exista se agrega al diccionario ademas de
            colocar la llave del valor w en la salida*/
            } else {

                this.diccionario.set(wk, this.contador++)
                this.salida.push(this.diccionario.get(w))
                w = k;
            }

        }
        this.salida.push(this.diccionario.get(w));

        this.ecriptado = this.resultado();
    }


    resultado(){
        let result = ""

        for (let x = 0; x < this.salida.length; x++) {
            result += this.salida[x]
            
        }

        return result
    }


    guardar(){
        return this.ecriptado
    }


// inicializar el diccionario con los valores
    iniciarDiccionario(mensaje) {
        for (let i = 0; i < mensaje.length; i++) {
            let repetido = false;
            for (let letra of this.diccionario.keys()) {
                if (mensaje.charAt(i) == letra) {
                    repetido = true;
                }
            }
            if (repetido == false) {
                this.diccionario.set(mensaje.charAt(i), this.contador);
                this.contador++;
            }


        }

    }

    graficarencabezados(){
        let arregloencabeazados = []
        arregloencabeazados.push("Llave")
        arregloencabeazados.push("valor")
        return arregloencabeazados
    }
    graficardatos(){
        let arregloLlave = [];
        let arregloValor = [];

        let arreglogeneral = [];

        for(let llave of this.diccionario.keys()){
            arregloLlave.push(llave)
        }
        for(let valor of this.diccionario.values()){
            arregloValor.push(valor)
        }

        for (let x = 0; x < arregloLlave.length; x++) {
            let dato = []
            dato.push(arregloLlave[x])
            dato.push(arregloValor[x])

            arreglogeneral.push(dato)
        }

        return arreglogeneral
    }
}

export default  LZW;