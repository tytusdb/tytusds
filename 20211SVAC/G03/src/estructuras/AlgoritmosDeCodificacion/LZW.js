class LZW {
    constructor() {
        this.contador = 0;
        this.diccionario = new Map();
        this.salida = [];
    }

    codificar(mensaje) {
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

}