export class OrdenamientoSeleccion {
    
    constructor() {}

    public ordenar(arreglo: number[], cuenta: number): number[] {
        let iteraciones: any = [];
        iteraciones.push(arreglo.toString());
        for (let i = 0; i < cuenta - 1; i++) {
            let primero = i;
            for (let j = i + 1; j < cuenta; j++) {
                if (arreglo[primero] > arreglo[j]) {
                    primero = j;
                }
            }
            let aux = arreglo[i];
            arreglo[i] = arreglo[primero];
            arreglo[primero] = aux;
            iteraciones.push(arreglo.toString());
        }
        return iteraciones;
    }
    
}