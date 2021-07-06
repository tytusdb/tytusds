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
    private values: any[]
    private size: number
    private funcion: Funcion
    private constante: number
    private prueba: Prueba
    private min: number
    private max: number
    private primos: any[]

    constructor(size: number, funcion: Funcion, prueba: Prueba, min: number, max: number, values: any[]) {
        this.size = size
        this.funcion = funcion
        this.prueba = prueba
        this.values = values
        this.constante = 0.6
        this.min = min
        this.max = max
        this.primos = []
        this.llenarMatriz()
        this.llenarPrimos()
    }

    public async add(value, duracion) {
        let hash = 0
        if (this.funcion === Funcion.SIMPLE || this.funcion === Funcion.DIVISION) hash = this.funcionSimple(value)
        else if (this.funcion === Funcion.MULTIPLICACION) hash = this.funcionMultiplicacion(value)


        let dato = this.values[hash]
        if (dato.libre === true || dato.libre === "borrado") {
            await this.sleep(duracion * 1000)
            this.values[hash] = { value: value, libre: false }
            document.getElementById('consola').innerHTML += `<br />Valor ${value} insertado en posicion: ${hash}`
            //console.log("directo", this.values)
            return 1
        }

        let r = 0
        await this.sleep(duracion * 1000)
        if (this.prueba === Prueba.LINEAL) r = this.pruebaLineal(value, hash)
        else if (this.prueba === Prueba.CUADRATICA) r = this.funcionCuadratica(value, hash)
        else r = this.funcionDobleHashing(value, hash)
        //console.log(this.values)
        return r
    }

    public async search(value, duracion) {
        let hash = 0
        if (this.funcion === Funcion.SIMPLE || this.funcion === Funcion.DIVISION) hash = this.funcionSimple(value)
        else if (this.funcion === Funcion.MULTIPLICACION) hash = this.funcionMultiplicacion(value)

        if (this.getValue(this.values[hash].value) === this.getValue(value)) {
            await this.sleep(duracion * 1000)
            return { index: hash, value: value }
        }
        await this.sleep(duracion * 1000)
        if (this.values[hash].libre === true) return null
        if (this.prueba === Prueba.LINEAL) return this.busquedaLineal(value, hash)
        else if (this.prueba === Prueba.CUADRATICA) return this.busquedaCuadratica(value, hash)
        else return this.busquedaDobleHashing(value, hash)

    }

    public async edit(antiguo,nuevo,duracion){
        let resultado = await this.delete(antiguo,duracion)
        if(resultado === null) return null 
        return this.add(nuevo,duracion)
    }


    public async delete(value,duracion){
        let resultado = await this.search(value,duracion)
        if(resultado === null) return null 
        document.getElementById('consola').innerHTML += `<br />Se elimino el valor ${value} antigua Posicion: ${resultado.index}`
        this.values[resultado.index] = {value:0,libre:"borrado"}
        return resultado
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
                document.getElementById('consola').innerHTML += `<br />Valor ${value} insertado en posicion: ${i + hash}`
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
            let dato = this.values[newHash]
            if (dato.libre || dato.libre === "borrado") {
                document.getElementById('consola').innerHTML += `<br />Valor ${value} insertado en posicion: ${i}`
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
                document.getElementById('consola').innerHTML += `<br />Valor ${value} insertado en posicion: ${i}`
                this.values[i] = {
                    value: value,
                    libre: false
                }
                return 1
            }
        }
        return 0
    }

    private busquedaLineal(value, hash) {
        for (let i = hash; i < this.size; i++) {
            if (this.getValue(this.values[i].value) === this.getValue(value)) return { index: i, value: value }
        }

        return null
    }

    private busquedaCuadratica(value, hash) {
        let i = 1
        while (true) {
            if (i + hash >= this.size) return null
            let dato = this.values[(i * i) + hash]
            if (this.getValue(dato.value) === this.getValue(value)) return { index: i + hash, value: value }
            i++
        }
        return null
    }


    private busquedaDobleHashing(value, hash) {
        let hash2 = this.hashing2(value)

        for (let i = 1; i < 5; i++) {
            let newHash = (hash + (i * hash2)) % this.size
            let dato = this.values[newHash]
            if(this.getValue(dato.value) === this.getValue(value)) return {index:newHash,value:value}
        }

        return null
    }


    private llenarMatriz() {
        for (let i = 0; i < this.size; i++) {
            if (this.values[i]) this.values[i] = { value: 0, libre: true }
            else this.values.push({ value: 0, libre: true })
        }
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

    private obtenerPrimo(size): number {
        for (let i = 0; i < this.primos.length; i++) {
            if (this.primos[i] >= size) return this.primos[i]
        }
        return 1000
    }

    public async reHashing(duracion) {
        //console.log(this.values)
        let newSize = this.size * 2
        newSize = this.obtenerPrimo(newSize)
        document.getElementById('consola').innerHTML += `<br />Nuevo Tamaño: ${newSize}`
        let clone = this.clone(this.values)
        this.size = newSize
        this.llenarMatriz()
        document.getElementById('consola').innerHTML += `<br />Insertando Valores Nuevamente`
        for (let i = 0; i < clone.length; i++) {
            if (!(clone[i].libre === true)) await this.add(clone[i].value, duracion)
        }
        document.getElementById('consola').innerHTML += `<br />----------------Fin ReHashing---------------`


    }

    private clone(arreglo) {
        let arr = []
        for (let i = 0; i < arreglo.length; i++) {
            arr.push(
                {
                    value: arreglo[i].value,
                    libre: arreglo[i].libre
                }
            )
        }

        return arr
    }

    public getJson(duracion){
        let data = {
            categoria: "Estructura No Lineal",
            nombre : "Tabla Hash Cerrada",
            m : this.size,
            minimo: this.min,
            maximo: this.max,
            funcion: this.getFuncion(),
            prueba: this.getPrueba,
            animacion: duracion,
            valores : []
        }

        for(let i = 0; i < this.size; i++){
            if(this.values[i].libre === false) data.valores.push(this.values[i].value)
        }

        return JSON.stringify(data)
    }


    private getFuncion(){
        if(this.funcion === Funcion.SIMPLE) return "simple"
        else if(this.funcion === Funcion.DIVISION) return "divison"
        else return "multiplicacion"
    }

    private getPrueba(){
        if(this.prueba === Prueba.LINEAL) return "Lineal"
        else if(this.prueba === Prueba.DOBLE) return "Doble"
        else return "Cuadratica"
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}