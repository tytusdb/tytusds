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

    graficarMatriz(x,y){
        
        let arreglo = []
        for(let i = 0; i < this.tamaño[0]; i++){
            let nodoArreglo = {
                id: i.toString(),
                type: 'default',
                targetPosition: 'top',
                sourcePosition: 'bottom',
                data: { label: (
                    <> <strong>{i}</strong>
                    </>
                 ) },
                position: {  x: 100 , y: 25 + (i+1)*40  },
                connectable: false, 
            }

            arreglo.push(nodoArreglo)

        }

        for(let i = 0; i < this.tamaño[1]; i++){
            let nodoArreglo = {
                id: i.toString()+20,
                type: 'default',
                targetPosition: 'top',
                sourcePosition: 'bottom',
                data: { label: (
                    <> <strong>{i}</strong>
                    </>
                 ) },
                position: {  x: 100  + (i+1)*150, y: 25 },
                connectable: false, 
            }

            arreglo.push(nodoArreglo)

        }

        for (let i = 0; i < this.tamaño[0]; i++) {
            for (let j = 0; j < this.tamaño[1]; j++) {
                let nodoArreglo = {
                    id: i.toString()+j.toString(),
                    type: 'default',
                    targetPosition: 'top',
                    sourcePosition: 'bottom',
                    data: { label: (
                        <> <strong>{this.arreglo[i][j]}</strong>
                        </>
                     ) },
                    position: {  x: 100 + (j+1)*150, y: 25 + (i+1)*40  },
                    connectable: false, 
                }

                if(i == x && j == y){
                    nodoArreglo = {
                        id: i.toString()+j.toString(),
                        type: 'special',
                        targetPosition: 'top',
                        sourcePosition: 'bottom',
                        data: {text: "----------"+this.arreglo[i][j]+ "--------" 
                          },
                        position: {  x: 100 + (j+1)*150, y: 25 + (i+1)*40 },
                        connectable: false, 
                    }
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
        this.arreglo[i][j] = 0
    }

        actualizar(i,j,nombre,dato){
        
        let busqueda;
        if(nombre == "Row Major"){
            busqueda = this.busquedaRowMajor( parseInt(i), parseInt(j))
        }else if(nombre == "Col Major"){
            busqueda = this.busquedaColMajor(parseInt(i), parseInt(j))
        }
        
        this.vector[busqueda] = dato
        this.arreglo[i][j] = dato
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
                targetPosition: 'top',
                sourcePosition: 'bottom',
                data: { label: (
                    <> <strong>{this.vector[x]}</strong>
                    </>
                 ) },
                position: {  x: 100 + (x)*150, y:150 },
                connectable: false, 
            }

            if(busqueda == x){
                nodoArreglo = {
                    id: x.toString(),
                    type: 'special',
                    targetPosition: 'top',
                    sourcePosition: 'bottom',
                    data: {text: "----------"+this.vector[x]+ "--------" 
                      },
                    position: {  x: 100 + (x)*150, y:150 },
                    connectable: false, 
                }
            }

            arreglo.push(nodoArreglo)
        }
        return arreglo
    }

    cargar(arr,nombre){
        arr.map(e => {
            this.agregar(e)
        })

        /* if(nombre === "Row Major"){
            this.rowMajor();
        }else if(nombre === "Col Major"){
            this.colMajor();
        } */
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

let mat = new matriz([4,5])
let vector = [
    {
      "indices": [
        2,
        3
      ],
      "valor": "Martin"
    },
    {
      "indices": [
        2,
        0
      ],
      "valor": "Dawn"
    },
    {
      "indices": [
        1,
        0
      ],
      "valor": "David"
    },
    {
      "indices": [
        2,
        0
      ],
      "valor": "Michael"
    },
    {
      "indices": [
        1,
        4
      ],
      "valor": "Calvin"
    },
    {
      "indices": [
        2,
        4
      ],
      "valor": "Norma"
    },
    {
      "indices": [
        0,
        0
      ],
      "valor": "George"
    },
    {
      "indices": [
        2,
        2
      ],
      "valor": "Diane"
    },
    {
      "indices": [
        3,
        2
      ],
      "valor": "Francisco"
    }
  ]
/* mat.cargar(vector)
mat.imprimirMatriz()
console.log("linealizado col", mat.colMajor())
console.log("col", mat.busquedaColMajor(1,4)) */


export default matriz