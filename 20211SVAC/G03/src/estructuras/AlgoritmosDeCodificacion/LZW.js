class LZW {
    constructor() {
        this.contador = 0;
        this.diccionario = new Map();
        this.salida = [];
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