export class seleccion {

    private selectionSort: any

    swap(selectionSort, indexOne, indexTwo) {
        if (indexOne == indexTwo) {
            return selectionSort
        }
        var tmpVal = selectionSort[indexOne]
        selectionSort[indexOne] = selectionSort[indexTwo]
        selectionSort[indexTwo] = tmpVal
        return selectionSort
    }

    ordenamientoSeleccion(arregloEnviado) {

        this.selectionSort = arregloEnviado.slice();
        var size = this.selectionSort.length
        for (var slot = 0; slot < size - 1; slot++) {
            var smallest = slot;
            for (var check = slot + 1; check < size; check++) {
                if (this.selectionSort[check] < this.selectionSort[smallest]) {
                    smallest = check
                }

            }
            this.swap(this.selectionSort, smallest, slot)
           // clearInterval(this.interaccion)
        }
       // console.log(this.selectionSort)
       // this.imprimirArreglo()
        return this.selectionSort
    }

    generarJSON() {

        let data = {
            categoria: "Estructura Lineal",
            nombre: "Ordenamiento",
            valores: []
        }

        for (let index = 0; index < this.selectionSort.length; index++) {
            data.valores.push(this.selectionSort[index])

        }



        return JSON.stringify(data)
    }

   
}

