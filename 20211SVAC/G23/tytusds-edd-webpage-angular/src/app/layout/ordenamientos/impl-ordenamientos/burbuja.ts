export default class BurbujaImpl{
    datosIniciales:any[];
    datosOrdenados:any[];
    constructor(datos: any[]) {
        this.datosIniciales=datos;
        this.ordenarDatosBurbuja();
    }
    getDatosOrdenados(){
        return this.datosOrdenados;
    }
    ordenarDatosBurbuja(){
        var n, i, k, aux;
        n = this.datosIniciales.length;
        this.datosOrdenados = this.datosIniciales;
        // Algoritmo de burbuja
        for (k = 1; k < n; k++) {
            for (i = 0; i < (n - k); i++) {
                if (this.datosOrdenados[i] > this.datosOrdenados[i + 1]) {
                    aux = this.datosOrdenados[i];
                    this.datosOrdenados[i] = this.datosOrdenados[i + 1];
                    this.datosOrdenados[i + 1] = aux;
                }
            }
        }
    }
}