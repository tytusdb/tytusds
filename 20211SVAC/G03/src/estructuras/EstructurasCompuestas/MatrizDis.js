import { v4 as uuidv4 } from 'uuid';
//Clase Nodo Matriz
class NodoMatriz{
    //Constructor
    constructor(dato, i, j){
        this.dato = dato
        this.id = uuidv4()
        this.este = null
        this.sur = null
        this.norte = null
        this.oeste = null
        this.siguiente = null
        this.anterior = null
        this.i = i
        this.j = j
        this.identificador = 0
    }
}

//Contador cabeceras
var cabnodo = 0

//Lista Doble para Cabeceras
class ListaDoble{
    //Constructor
    constructor(){
        this.cabeza = null
        this.cola = null
    }

    //Ordenamiento de Cabeceras
    ordenar(nodo){
        let aux = this.cabeza
        while(aux != null){

            if(aux.dato.charCodeAt){
                if(this.obtenerASCCI(aux.dato) < this.obtenerASCCI(nodo.dato)){
                    aux = aux.siguiente
                } else{
                    if(aux == this.cabeza){
                        nodo.siguiente = aux
                        aux.anterior = nodo
                        this.cabeza = nodo
                        return
                    } else{
                        nodo.anterior = aux.anterior
                        aux.anterior.siguiente = nodo
                        nodo.siguiente = aux
                        aux.anterior = nodo
                        return
                    }
                }
            }else{
                if(aux.dato < nodo.dato){
                    aux = aux.siguiente
                } else{
                    if(aux == this.cabeza){
                        nodo.siguiente = aux
                        aux.anterior = nodo
                        this.cabeza = nodo
                        return
                    } else{
                        nodo.anterior = aux.anterior
                        aux.anterior.siguiente = nodo
                        nodo.siguiente = aux
                        aux.anterior = nodo
                        return
                    }
                }
            }
        }
        this.cola.siguiente = nodo
        nodo.anterior = this.cola
        this.cola = nodo
    }

    obtenerASCCI(s){
        let charCodeArr = 0;
        
        for(let i = 0; i < s.length; i++){
            let code = s.charCodeAt(i);
            charCodeArr += code
        }
        
        return charCodeArr;
      }

    //Insercion en cabeceras
    insertar(dato){
        cabnodo = 0
        let nodo = new NodoMatriz(dato, null, null)
        if(this.cabeza == null){
            this.cabeza = this.cola = nodo
            return
        }
        this.ordenar(nodo)
        if(this.cabeza !=null){
            let aux = this.cabeza
            while(aux!=null){
                aux.identificador = cabnodo
                cabnodo++
                aux = aux.siguiente
            }
        }
    }

    //Eliminacion para la lista doble
    eliminar(dato){
        let aux = this.cabeza
        while(aux != null){
            if(dato == aux.dato && aux == this.cabeza){
                let tmp = this.cabeza.siguiente
                tmp.anterior = null
                this.cabeza.siguiente = null
                this.cabeza = tmp          
                return
            }else if(dato == aux.dato && aux.anterior != null && aux.siguiente != null){
                let tmp = aux.siguiente
                tmp.anterior = aux.anterior
                aux.anterior.siguiente = tmp
                aux.siguiente = null
                aux.anterior = null
                return
            }else if(dato == aux.dato && aux == this.cola){
                let tmp = this.cola.anterior
                tmp.siguiente = null
                this.cola.anterior = null
                this.cola = tmp
                return
            }else if(dato == aux.dato && this.cola == this.cabeza){
                this.cola = null
                this.cabeza = null
                return
            }
            aux = aux.siguiente
        }
    }

    //Busqueda en cabeceras
    busqueda(dato){
        let tmp = this.cabeza
        while(tmp != null){
            if(tmp.dato == dato){
                return tmp
            }
            tmp = tmp.siguiente
        }
        return null
    }

}

//Clase Matriz Dispersa
class Matriz{
    //Constructor
    constructor(){
        this.CHorizontal = new ListaDoble()
        this.CVertical = new ListaDoble()
    }

    //Insercion en matriz
    insertar(dato, i, j){
        let Ni = this.CHorizontal.busqueda(i)
        let Nj = this.CVertical.busqueda(j)
        if(Ni == null && Nj == null){
            this.C1(dato, i, j)
        } else if(Ni == null && Nj != null){
            this.C2(dato, i, j)
        } else if(Ni != null && Nj == null){
            this.C3(dato, i, j)
        }else{
            this.C4(dato, i, j)
        }
    }

    //Primer Caso posible de insercion
    C1(dato,i,j){
        this.CHorizontal.insertar(i)
        this.CVertical.insertar(j)
        let Ni = this.CHorizontal.busqueda(i)
        let Nj = this.CVertical.busqueda(j)
        let n = new NodoMatriz(dato, i, j)
        Ni.sur = n
        n.norte = Ni
        Nj.este = n
        n.oeste = Nj
    }

    //Segundo caso de insercion posible
    C2(dato, i, j){
        this.CHorizontal.insertar(i)
        let Ni = this.CHorizontal.busqueda(i)
        let Nj = this.CVertical.busqueda(j)
        let cAgrego = false
        let n = new NodoMatriz(dato, i, j)
        let aux = Nj.este
        let contadorC = 0
        while(aux != null){
            contadorC = aux.i
            if(contadorC<i){
                aux = aux.este
            } else {
                n.este = aux
                n.oeste = aux.oeste
                n.oeste.este = n
                aux.oeste = n
                cAgrego = true
                break
            }
        }
        if(cAgrego == false){
            aux = Nj.este
            while(aux.este!=null){
                aux = aux.este
            }
            n.oeste = aux
            aux.este = n
        }
        Ni.sur = n
        n.norte = Ni
    }

    //Tercer caso de insercion posible
    C3(dato, i, j){
        this.CVertical.insertar(j)
        let Ni = this.CHorizontal.busqueda(i)
        let Nj = this.CVertical.busqueda(j)
        let cAgrego = false
        let n = new NodoMatriz(dato, i, j)
        let aux = Ni.sur
        let contadorC = 0
        while(aux!=null && !cAgrego){
            contadorC = aux.j
            if(contadorC<j){
                aux = aux.sur
            } else{
                n.sur = aux
                n.norte = aux.norte
                aux.norte.sur = n
                aux.norte = n
                cAgrego = true
            }
        }
        if(!cAgrego){
            aux = Ni.sur
            while(aux.sur!=null){
                aux = aux.sur
            }
            aux.sur = n
            n.norte = aux
        }
        Nj.este = n
        n.oeste = Nj
    }

    //Cuarto caso de insercion posible
    C4(dato, i, j){
        let Ni = this.CHorizontal.busqueda(i)
        let Nj = this.CVertical.busqueda(j)
        let cAgrego = false
        let n = new NodoMatriz(dato,i,j)
        let aux = Nj.este
        let contadorC = 0
        while(aux!=null){
            contadorC = aux.i
            if(contadorC < i){
                aux = aux.este
            }else if(contadorC == i){
                let contadorC2 = aux.j
                if(contadorC2 == j){
                    alert("Ya existe valor en el Nodo"+"("+ aux.i+","+aux.j+")")
                    return
                }
            }else{
                n.este = aux
                n.oeste = aux.oeste
                aux.oeste.este = n
                aux.oeste = n
                cAgrego = true
                break
            }
        }
        if(cAgrego == false){
            aux = Nj.este
            while(aux.este != null){
                aux = aux.este
            }
            n.oeste = aux
            aux.este = n
        }
        cAgrego = false
        aux = Ni.sur
        contadorC = 0
        while(aux!=null && !cAgrego){
            contadorC = aux.j
            if(contadorC<j){
                aux = aux.sur
            } else{
                n.sur = aux
                n.norte = aux.norte
                aux.norte.sur = n
                aux.norte = n
                cAgrego = true
            }
        }
        if(!cAgrego){
            aux = Ni.sur
            while(aux.sur != null){
                aux = aux.sur
            }
            aux.sur = n
            n.norte = aux
        }
    }

    //Impresion por cabeza Vertical
    imprimirCVertical(){
        let cab = this.CVertical.cabeza
        let aux
        while(cab != null){
            aux = cab.este
            while(aux!=null){
                console.log("Dato: "+ aux.dato + " I: "+aux.i + " J: " + aux.j)
                aux = aux.este
            }
            cab = cab.siguiente
        }
    }


    cargar(arreglo){
        arreglo.map(e => {
            this.insertar(e.valor,e.indices[0],e.indices[1])
        })
    }
    //Metodo busqueda
    buscar(dato){
        let cab = this.CVertical.cabeza
        let aux
        while(cab != null){
            aux = cab.este
            while(aux!=null){
                if(aux.dato == dato){
                    console.log("El dato es: "+aux.dato+" en "+aux.i + " , "+aux.j)
                    return
                }
                aux = aux.este
            }
            cab = cab.siguiente
        }
    }

    //Metodo modificar
    modificar(datobus, datomod){
        let cab = this.CVertical.cabeza
        let aux
        while(cab != null){
            aux = cab.este
            while(aux!=null){
                if(aux.dato == datobus){
                    aux.dato = datomod
                    console.log("El dato"+datobus+" cambio a: "+aux.dato+" en "+aux.i + " , "+aux.j)
                    return
                }
                aux = aux.este
            }
            cab = cab.siguiente
        }
    }

    //Metodo Eliminar
    eliminar(datoel){
        let cab = this.CVertical.cabeza
        let aux
        while(cab != null){
            aux = cab.este
            while(aux!=null){
                if(aux.dato == datoel){
                    let arr = aux.norte
                    let ab = aux.sur
                    let iz = aux.oeste
                    let der = aux.este
                    let Ni = this.CHorizontal.busqueda(aux.i)
                    let Nj = this.CVertical.busqueda(aux.j)
                    if(der == null && ab == null){
                        if(iz.i == null && arr.i == null){
                            this.CHorizontal.eliminar(Ni.dato)
                            this.CVertical.eliminar(Nj.dato)
                            return
                        }else if(iz.i == null && arr.i != null){
                            aux.norte.sur=null
                            aux.norte = null
                            aux.oeste = null
                            this.CVertical.eliminar(Nj.dato)
                            return
                        }else if(iz.i != null && arr.i == null){
                            aux.oeste.este = null
                            aux.oeste = null
                            aux.norte = null
                            this.CHorizontal.eliminar(Ni.dato)
                            return
                        }else if(iz.i != null && arr.i != null){
                            aux.oeste.este = null
                            aux.oeste = null
                            aux.norte.sur = null
                            aux.norte = null
                            return
                        }
                    }else if(der != null && ab == null ){
                        if(iz.i == null && arr.i == null){
                            der.oeste = aux.oeste
                            aux.oeste.este = der
                            aux.oeste = null
                            aux.este = null
                            this.CHorizontal.eliminar(Ni.dato)
                            return
                        }else if(iz.i == null && arr.i != null){
                            der.oeste = aux.oeste
                            aux.oeste.este = der
                            aux.oeste = null
                            aux.este = null
                            aux.norte.sur=null
                            aux.norte = null
                            return
                        }else if(iz.i != null && arr.i == null){
                            der.oeste = aux.oeste
                            aux.oeste.este = der
                            aux.oeste = null
                            aux.este = null
                            aux.norte = null
                            this.CHorizontal.eliminar(Ni.dato)
                            return
                        }else if(iz.i != null && arr.i != null){
                            aux.oeste.este = der
                            der.oeste = aux.oeste
                            aux.oeste = null
                            aux.este = null
                            aux.norte.sur = null
                            aux.norte = null
                            return
                        }
                    }else if(der == null && ab != null ){
                        if(iz.i == null && arr.i == null){
                            ab.norte = aux.norte
                            aux.norte.sur = ab
                            aux.norte = null
                            aux.sur =  null
                            aux. oeste = null
                            this.CVertical.eliminar(Nj.dato)
                            return
                        }else if(iz.i == null && arr.i != null){
                            ab.norte = aux.norte
                            arr.sur = ab
                            aux.norte = null
                            aux.sur = null
                            aux.oeste = null
                            this.CVertical.eliminar(Nj.dato)
                            return
                        }else if(iz.i != null && arr.i == null){
                            aux.oeste.este = null
                            aux.oeste = null
                            ab.norte = aux.norte
                            arr.sur = aux.sur
                            aux.norte = null
                            aux.sur = null
                            return
                        }else if(iz.i != null && arr.i != null){
                            aux.oeste.este = null
                            aux.oeste = null
                            ab.norte = aux.norte
                            arr.sur = aux.sur
                            aux.norte = null
                            aux.sur = null
                            return
                        }
                    }else if(der != null && ab != null ){
                        der.oeste = aux.oeste
                        iz.este = aux.este
                        arr.sur = aux.sur
                        ab.norte = aux.norte
                        aux.oeste = null
                        aux.este = null
                        aux.sur = null
                        aux.norte = null
                        return
                    }                                       
                }
                aux = aux.este
            }
            cab = cab.siguiente
        }
        console.log("Al parecer no encontro un dato")
    }

    graficar(valorBusqueda){
        let arreglo = []

        arreglo = arreglo.concat(this.graficarCabeceraHorizontal())
        arreglo = arreglo.concat(this.graficarCabeceraVertical(valorBusqueda))

        return arreglo
    }

    graficarCabeceraHorizontal(){
        let arreglo = []
        let aux;
        let tmp = this.CHorizontal.cabeza
        let x = 1;
        while(tmp != null){
            let nodoArreglo = {
                id: tmp.id,
                type: 'default',
                targetPosition: 'left',
                sourcePosition: 'right',
                data: { label: (
                    <> <strong>{tmp.dato}</strong>
                    </>
                 ) },
                position: {  x: 100 + (x)*200, y:25 },
                connectable: false, 
            }

            aux = tmp.sur
            let y = 1;
            while(aux!=null){
                  /* 
                if(aux.dato){
                    let nodoInterior = {
                        id: aux.id,
                        type: 'default',
                        targetPosition: 'left',
                        sourcePosition: 'right',
                        data: { label: aux.dato },
                        position: {  x: 100+ (x)*200, y:25+ (aux.j+1)*75 },
                        connectable: false, 
                    }
                    
                    arreglo.push(nodoInterior)
                } */
                y++;
                if(aux.sur != null){
                    let nodoedge = {id: aux.id+'-'+aux.sur.id, source: aux.id, target: aux.sur.id, style: { stroke: 'red' },
                    type: 'step'  }
                    arreglo.push(nodoedge)
                }
                aux = aux.sur
            }
            let nodoedgePI = {id: tmp.id+'-'+tmp.sur.id, source: tmp.id, target: tmp.sur.id ,style: { stroke: 'red' },
            type: 'step' }
            arreglo.push(nodoedgePI)

            x++;
            arreglo.push(nodoArreglo)

            if(tmp.siguiente != null){
                let nodoedge = {id: tmp.id+'-'+tmp.siguiente.id, source: tmp.id, target: tmp.siguiente.id  }
                arreglo.push(nodoedge)
            }
            tmp = tmp.siguiente
        }

        return arreglo
    }

    graficarCabeceraVertical(valorBusqueda){
        let arreglo = []

        let tmp = this.CVertical.cabeza
        let aux ;
        let x = 1;
        while(tmp != null){
            let nodoArreglo = {
                id: tmp.id,
                type: 'default',
                targetPosition: 'top',
                sourcePosition: 'bottom',
                data: { label: (
                    <> <strong>{tmp.dato}</strong>
                    </>
                 ) },
                position: {  x: 100, y:25+ x*75 },
                connectable: false, 
            }

            aux = tmp.este
            let y = 1;
            while(aux!=null){
                  
                    let nodoInterior = {
                        id: aux.id,
                        type: 'default',
                        targetPosition: 'left',
                        sourcePosition: 'right',
                        data: { label: aux.dato },
                        position: {  x: 100+ (this.CHorizontal.busqueda(aux.i).identificador+1)*200, y:25+ x*75 },
                        connectable: false, 
                    }

                    if(valorBusqueda == aux.dato){
                        nodoInterior = {
                            id: aux.id,
                            type: 'special',
                            targetPosition: 'left',
                            sourcePosition: 'right',
                            data: { text: "----------"+aux.dato+ "--------" },
                            position: {  x: 100+ (this.CHorizontal.busqueda(aux.i).identificador+1)*200, y:25+ x*75 },
                            connectable: false, 
                        }
                    }
                    
                    arreglo.push(nodoInterior)
                
                y++;
                if(aux.este != null){
                    let nodoedge = {id: aux.id+'-'+aux.este.id, source: aux.id, target: aux.este.id ,style: { stroke: 'red' } }
                    arreglo.push(nodoedge)
                }
                aux = aux.este
            }
            let nodoedgePI = {id: tmp.id+'-'+tmp.este.id, source: tmp.id, target: tmp.este.id  ,style: { stroke: 'red' }}
            arreglo.push(nodoedgePI)
            x++;
            arreglo.push(nodoArreglo)
            if(tmp.siguiente != null){
                let nodoedge = {id: tmp.id+'-'+tmp.siguiente.id, source: tmp.id, target: tmp.siguiente.id  }
                arreglo.push(nodoedge)
            }
            tmp = tmp.siguiente
        }


        return arreglo
    }

    guardar(){
        let arregloGuardar = []

        let tempo = this.CVertical.cabeza
        let aux ;

        while(tempo != null){
            aux = tempo.este
            while(aux!=null){
                    let indices = []
                    indices.push(aux.i)
                    indices.push(aux.j)

                    let valorGuardar = {indices: indices, valor: aux.dato}
                    
                    arregloGuardar.push(valorGuardar)
                    aux = aux.este
            }
            tempo = tempo.siguiente
        }


        return arregloGuardar

    }
}

export default Matriz;