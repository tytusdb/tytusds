export class Insertion {
    constructor() { }


    public ordenar(arreglo: any[], numero) {
        let temp = arreglo
        if (arreglo.length === 0) {
            temp.push(numero)
            return temp
        }
        if (numero <= arreglo[0]) {
            temp.unshift(numero)
            return temp
        }

        if (numero > arreglo[arreglo.length - 1]) {
            temp.push(numero)
            return temp
        }
        for (let i = 0; i < arreglo.length; i++) {
            if (i + 1 === arreglo.length) break;
            let actual = arreglo[i]
            let siguiente = arreglo[i + 1]

            if (numero >= actual && numero < siguiente) {
                temp.splice(i + 1, 0, numero)
                return temp
            }
        }

        temp.push(numero)
        return temp

    }



}