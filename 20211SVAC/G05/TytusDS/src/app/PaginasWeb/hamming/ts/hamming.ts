export class CodigoHamming{

    calcularBitsRedundantes(size: number): number {
        for(let i = 0; i < size; i++) {
            if (Math.pow(2, i) >= size + i + 1){
                return i;
            }
        }
        return -1;
    }

    determinarPosiciones(cadena: string, bits: number): string {
        let aux = 0;
        let aux2 = 1;
        let size = cadena.length;
        let resultado = '';

        for (let i = 1; i < size + bits + 1; i++) {
            if (i === Math.pow(2, aux)) {
                resultado = resultado + 0;
                aux++;
            } else {
                resultado = resultado + cadena.charAt(size - aux2);
                aux2++;
            }
        }
        return resultado;
    }

    rellenarPosiciones(cadena: string, bits: number): string {
        let len = cadena.length + bits;
        let arr: any = [];
        let cad = cadena.split("");
        let aux = 0;
        for (let x = 0; x < len; x++) {
            arr.push("");
        }
        for (let x = 0; x < bits; x++) {
            let posicion = Math.pow(2, x) - 1;
            arr[posicion] = "0";
        }
        for (let x = 0; x < len; x++) {
            if (arr[x] === "") {
                arr[x] = cad[aux];
                aux++;
            }
        }
        return arr.join("");
    }

    calcularParidades(cadena: string, bits: number): any {
        let arr = cadena.split("");
        let paridades: any = [];
        for (let i = 0; i < bits; i++) {
            let paridad: any = [];
            let patron = Math.pow(2, i);
            let aux = patron - 1;
            let esperar = false;        
            for (let x = patron - 1; x < arr.length; x++) {
                if (x === aux) {
                    paridad.push(arr[x]);
                    esperar = false;
                }
                if (((x + 2) % patron) === 0) {
                    if (!esperar){
                        aux+= patron + 1;
                        esperar = true;
                    }
                }else {
                    if (!esperar){
                        aux++;
                    }
                }
            }
            paridades.push(paridad);
        }
        return paridades;
    }

    calcularFinal(cadena: string, paridades: string[][]): string {
        paridades.forEach( paridad => {
            let cantiUnos = 0;
            paridad.forEach( elemento => {
                if (elemento == "1") {
                    cantiUnos++;
                }
            });
            if (cantiUnos % 2 !== 0) {
                paridad[0] = "1";
            }
        });

        let arr = cadena.split("");
        
        for (let x = 0; x < paridades.length; x++) {
            let posicion = Math.pow(2, x) - 1;
            arr[posicion] = paridades[x][0];
        }

        return arr.join("");
    }

}