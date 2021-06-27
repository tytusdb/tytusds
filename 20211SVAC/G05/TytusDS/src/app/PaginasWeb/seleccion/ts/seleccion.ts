export class OrdenamientoSeleccion {
    
    constructor() {}

    public ordenar(arreglo: any, cuenta: number): any[] {
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

    _ordenar(arreglo: any): any {
        let iteraciones: any = [];
        iteraciones.push(arreglo.toString());
        for (let x = 0; x < arreglo.length - 1; x++) {
            let menor = x;
            for(let j = x + 1; j < arreglo.length; j++) {
                if (arreglo[menor] > arreglo[j]) menor = j;
            }
            let temp = arreglo[menor];
            arreglo[menor] = arreglo[x];
            arreglo[x] = temp;
            iteraciones.push(arreglo.toString());
        }
        return iteraciones;
    }

    ordenarLista(arreglo: any[]): any {
        for (let x = 0; x < arreglo.length - 1; x++) {
            let menor = x;
            for(let j = x + 1; j < arreglo.length; j++) {
                if (arreglo[menor] > arreglo[j]) menor = j;
            }
            let aux = arreglo[menor];
            arreglo[menor] = arreglo[x];
            arreglo[x] = aux;
        }
        return arreglo;
    }

}