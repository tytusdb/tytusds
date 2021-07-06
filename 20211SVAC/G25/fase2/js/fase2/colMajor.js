class matriz{
    constructor(tamaño){
        this.arreglo = null
        this.vector = null
        this.tamaño = tamaño
        this.iniciar()
    }


    iniciar(){
        let array = [this.tamaño[0]]

        for (let x = 0; x < this.tamaño[0]; x++) {
            array[x] = [this.tamaño[1]]
        }

         for (let i = 0; i < this.tamaño[0]; i++) {
            for (let j = 0; j < this.tamaño[1]; j++) {
                array [i][j] = 0;

            }

        }

        this.arreglo = array
    }

    imprimirMatriz(){

        for (let i = 0; i < this.tamaño[0]; i++) {
            for (let j = 0; j < this.tamaño[1]; j++) {
                console.log(this.arreglo[i][j])

            }

        }

    }

    graficarMatriz(){

        let arreglo = []
        for (let i = 0; i < this.tamaño[0]; i++) {
            for (let j = 0; j < this.tamaño[1]; j++) {
                let nodoArreglo = {
                    id: i.toString()+j.toString(),
                    type: 'default',
                    tposition: 'top',
                    sposition: 'bottom',
                    data: { label: (
                        <> <strong>{this.arreglo[i][j]}</strong>
                        </>
                     ) },
                    position: {  x: 100 + (j)*150, y: 25 + i*40  },
                    conector: false,
                }

                arreglo.push(nodoArreglo)
            }

        }

        return arreglo
    }

    eliminar(i,j,nombre){
        let busqueda;
        if(nombre == "Row Major"){
            busqueda = this.busquedaRowMajor( parseInt(i), parseInt(j))
        }else if(nombre == "Col Major"){
            busqueda = this.busquedaColMajor(parseInt(i), parseInt(j))
        }

        this.vector[busqueda] = 0
    }

        actualizar(i,j,nombre,dato){

        let busqueda;
        if(nombre == "Row Major"){
            busqueda = this.busquedaRowMajor( parseInt(i), parseInt(j))
        }else if(nombre == "Col Major"){
            busqueda = this.busquedaColMajor(parseInt(i), parseInt(j))
        }

        this.vector[busqueda] = dato
    }

    graficarVector(i,j, nombre){
        let busqueda;
            if(nombre == "Row Major"){
                busqueda = this.busquedaRowMajor( parseInt(i), parseInt(j))
            }else if(nombre == "Col Major"){
                busqueda = this.busquedaColMajor(parseInt(i), parseInt(j))
            }


        console.log(busqueda)

        let arreglo = []
        for (let x = 0; x < this.vector.length; x++) {
            let nodoArreglo = {
                id: x.toString(),
                type: 'default',
                tposition: 'top',
                sposition: 'bottom',
                data: { label: (
                    <> <strong>{this.vector[x]}</strong>
                    </>
                 ) },
                position: {  x: 100 + (x)*150, y:150 },
                conector: false,
            }

            if(busqueda == x){
                nodoArreglo = {
                    id: x.toString(),
                    type: 'special',
                    tposition: 'top',
                    sposition: 'bottom',
                    data: {text: "- - - - - -"+this.vector[x]+ "- - - - - -"
                      },
                    position: {  x: 100 + (x)*150, y:150 },
                    conector: false,
                }
            }

            arreglo.push(nodoArreglo)
        }
        return arreglo
    }

    cargar(arr){
        arr.map(e => {
            this.agregar(e)
        })
    }

    guardar(){
        let arregloguardar = []

        for (let i = 0; i < this.vector.length; i++) {
            if(this.vector[i] != 0){
                arregloguardar.push(this.vector[i])
            }
        }

        return arregloguardar
    }

    agregar(datos){
     this.arreglo[datos.indices[0]][datos.indices[1]] = datos.valor
    }

    rowMajor(){
        let vectorlinealizado = []
        for (let i = 0; i < this.tamaño[0]; i++) {
            for (let j = 0; j < this.tamaño[1]; j++) {
                vectorlinealizado.push(this.arreglo[i][j])
            }

        }
        this.vector = vectorlinealizado
        return vectorlinealizado
    }

    colMajor(){
        let vectorlinealizado = []
        for (let i = 0; i < this.tamaño[1]; i++) {
            for (let j = 0; j < this.tamaño[0]; j++) {
                vectorlinealizado.push(this.arreglo[j][i])
            }

        }
        this.vector = vectorlinealizado
        return vectorlinealizado
    }

    busquedaRowMajor(i,j){
        let posLinealizado = (i*this.tamaño[1])+j

        return posLinealizado

    }

    busquedaColMajor(i,j){
        let posLinealizado = (j*this.tamaño[0])+i
        return posLinealizado
    }
}
//
//let mat = new matriz([4,5])
//let vector = [
//
//  ]

export default matriz
