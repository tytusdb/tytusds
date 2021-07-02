export enum Funcion {
    SIMPLE,
    MULTIPLICACION,
    DIVISION
}

export enum Prueba {
    LINEAL,
    CUADRATICA,
    DOBLE
}

export class TablaHash {
    private values: any = []
    private size: number
    private funcion: Funcion
    private constante: number
    private prueba: Prueba
    private min: number
    private max: number
    private primos: any[]

    constructor(size: number, funcion: Funcion, prueba: Prueba, min: number, max: number) {
        this.size = size
        this.funcion = funcion
        this.prueba = prueba
        this.values = []
        this.constante = 0.6
        this.min = min
        this.max = max
        this.primos = []
        this.llenarMatriz()
        this.llenarPrimos()
    }

    public add(value) {
        let hash = 0
        if (this.funcion === Funcion.SIMPLE || this.funcion === Funcion.DIVISION) hash = this.funcionSimple(value)
        else if (this.funcion === Funcion.MULTIPLICACION) hash = this.funcionMultiplicacion(value)

        let dato = this.values[hash]
        if (dato.libre === true) {
            this.values[hash] = { value: value, libre: false }
            console.log("directo", this.values)
            return 1
        }

        let r = 0
        if (this.prueba === Prueba.LINEAL) r = this.pruebaLineal(value, hash)
        else if (this.prueba === Prueba.CUADRATICA) r = this.funcionCuadratica(value, hash)
        else r = this.funcionDobleHashing(value, hash)
        console.log(this.values)
        return r
    }


    private funcionSimple(value): number {
        return this.getValue(value) % this.size
    }

    private hashing2(value): number {
        return 1 + (this.getValue(value) % (this.size - 1))
    }

    private funcionCuadratica(value, hash): number {
        let i = 1
        while (true) {
            if (i + hash >= this.size) return -1
            let dato = this.values[(i * i) + hash]
            if (dato.libre || dato.libre === "borrado") {
                this.values[(i * i) + hash] = {
                    value: value,
                    libre: false
                }
                return 1
            }
            i++
        }
        return -1
    }

    private funcionDobleHashing(value, hash): number {
        let hash2 = this.hashing2(value)

        for (let i = 1; i < 5; i++) {
            let newHash = (hash + (i * hash2)) % this.size
            console.log("new Hash: ", newHash)
            let dato = this.values[newHash]
            if (dato.libre || dato.libre === "borrado") {
                this.values[newHash] = {
                    value: value,
                    libre: false
                }
                return 1
            }
        }

        return -1
    }

    private funcionMultiplicacion(value): number {
        let temp = this.getValue(value) * this.constante % 1
        return Math.floor((this.size * temp * 10) / 10)
    }

    private getValue(value): number {
        if (isNaN(value)) {
            let temp = 0
            for (let i = 0; i < value.toString().length; i++) temp += value.charCodeAt(i)

            return temp
        }
        return value
    }

    private pruebaLineal(value, index) {
        for (let i = index; i < this.size; i++) {
            let dato = this.values[i]
            if (dato.libre || dato.libre === "borrado") {
                this.values[i] = {
                    value: value,
                    libre: false
                }
                return 1
            }
        }
        return 0
    }

    private llenarMatriz() {
        for (let i = 0; i < this.size; i++) this.values.push({ value: 0, libre: true })
    }


    public obtenerOcupacion() {
        let temp = 0;
        for (let i = 0; i < this.size; i++) {
            if (this.values[i].libre === false) temp++
        }
        return (temp * 100) / this.size
    }


    private llenarPrimos() {
        for (let i = 0; i < 1000; i++) {

            if (this.primo(i)) {
                this.primos.push(i);
            }

        }
    }

    private primo(numero) {

        for (let i = 2; i < numero; i++) {

            if (numero % i === 0) {
                return false;
            }

        }

        return numero !== 1;
    }

    private obtenerPrimo(size):number{
        for(let i = 0; i < this.primos.length; i++){
            if(this.primos[i] >= size) return this.primos[i]
        }
        return 1000
    }

    public reHashing(){
        let newSize = this.size * 2
        newSize = this.obtenerPrimo(newSize)
        let clone = this.clone(this.values)
        this.size = newSize 
        this.values = []
        this.llenarMatriz()
        
        for(let i = 0; i < clone.length; i++){
            this.add(this.getValue(clone[i].value))
        }
        
        
    }

    private clone(arreglo){
        let arr = []
        for(let i = 0; i < arreglo.length; i++){
            arr.push(
                {
                    value : arreglo[i].value, 
                    libre: arreglo[i].libre
                }
            )
        }

        return arr
    }

}