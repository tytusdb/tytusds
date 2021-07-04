//Clase Nodo
class Nodo{
    //Constructor
    constructor(dato){
        this.dato = dato
        this.anterior = null
        this.siguiente = null
        this.izquierdo = null
        this.derecho = null
    }
}

//String para graficacion
var salida = ""
//Arreglo de uso unico
var arr = []
//VariableGlobal
var idRama = 0

//Clase Rama
class Rama{
    //Constructor
    constructor(){
        this.contador = 0
        this.hoja = true
        this.raiz = null
        this.id = 0
    }

    //Metodo Insertar en Rama
    insertar(nodo){
        //Insertar Primer Nodo
        if(this.raiz == null){
            this.raiz = nodo
            this.contador++
        }else{  //Insertar Nodo no Primero
            let tmp = this.raiz
            do{
                if(nodo.dato<=tmp.dato){    //Insercion de dato menor igual
                    this.contador++
                    //Insercion en nodo no vacio
                    if(tmp == this.raiz){
                        this.raiz.anterior = nodo
                        nodo.siguiente = this.raiz
                        this.raiz.izquierdo = nodo.derecho
                        this.raiz = nodo
                        break
                    }else{
                        //Insercion entre nodos
                        nodo.anterior = tmp.anterior
                        nodo.siguiente = tmp
                        tmp.anterior.siguiente = nodo
                        tmp.anterior.derecho = nodo.izquierdo
                        tmp.anterior= nodo
                        tmp.izquierdo = nodo.derecho
                        break
                    }
                //Insercion en nodos vacios
                }else if(tmp.siguiente == null){
                    this.contador++
                    tmp.siguiente = nodo
                    tmp.derecho =   nodo.izquierdo
                    nodo.anterior = tmp
                    nodo.siguiente = null
                    break
                }
                tmp = tmp.siguiente
            }while(tmp != null)
        }
    }

}

//Clase Arbol
class ArbolB{
    //Constructor
    constructor(orden){
        this.raiz = null
        this.orden = orden
    }

    //Metodo Insercion en arbol
    insertar(dato){
        let nodo = new Nodo(dato)
        //Insercion para arbol vacio
        if(this.raiz == null){
            this.raiz = new Rama()
            this.raiz.insertar(nodo)
            this.raiz.id = idRama
            idRama++
            return
        }else{
            //Insercion para arbol no vacio
            let tmp = this.add(nodo, this.raiz)
            if(tmp instanceof Nodo){
                this.raiz = new Rama()
                this.raiz.insertar(tmp)
                this.raiz.hoja = false
            }
        }
    }

    //Metodo para agregar y verificar estado de las ramas
    add(nodo, rama){
        //Si es un nodo hijo
        if(rama.hoja){
            rama.insertar(nodo)
            if(rama.contador == this.orden){
                //Division de rama
                return this.divRam(rama)
            }else{
                //Retornar rama no llena
                return rama
            }
        //Si no es un nodo hijo
        }else{
            let tmp = rama.raiz 
            do{
                if(nodo.dato == tmp.dato){
                    //No inserta duplicados
                    return rama
                }else if(nodo.dato < tmp.dato){ //Insercion de nodo menor
                    let aux = this.add(nodo, tmp.izquierdo)
                    if( aux instanceof Nodo){
                        rama.insertar(aux)
                        if(rama.contador == this.orden){
                            return this.divRam(rama)
                        }
                    }
                    return rama
                }else if(tmp.siguiente == null){    //Insercion para nodo con un solo valor
                    let aux = this.add(nodo, tmp.derecho)
                    if(aux instanceof Nodo){
                        rama.insertar(aux)
                        if(rama.contador == this.orden){
                            return this.divRam(rama)
                        }
                    }
                    return rama
                }
                tmp = tmp.siguiente
            }while(tmp != null)
        }
        return rama
    }

    //Metodo de division de rama
    divRam(rama){
        let der = new Rama()
        let izq = new Rama()
        let mitad = null
        let tmp = rama.raiz
        let inicio = 1
        let medio = parseInt(this.orden/2) + 1
        let final = this.orden
        for(let i = 1; i < this.orden + 1;i++, tmp = tmp.siguiente){
            let nodo = new Nodo(tmp.dato)
            nodo.izquierdo = tmp.izquierdo
            nodo.derecho = tmp.derecho
            if(nodo.derecho != null && nodo.izquierdo != null){
                izq.hoja = false
                der.hoja = false
            }
            if(i >= inicio && i < medio){
                izq.insertar(nodo)
            }else if(i == medio){
                mitad = nodo
            }else if(i <= final && i > medio){
                der.insertar(nodo)
            }
        }
        izq.id = idRama+1
        der.id = idRama+2
        mitad.id = idRama
        mitad.izquierdo = izq
        mitad.derecho = der
        idRama = idRama + 3
        return mitad
    }

    //Metodo de impresion de Arbol
    printArbol(){
        if (this.raiz == null){
            console.log("no existe arbol")
            return 
        }
        this.subprint(this.raiz) 
    }

    //Sub metodo de impresion de arbol
    subprint(rama){
        if (rama.raiz == null){
            console.log("no hay nodos")
            return 
        }
        let aux = rama.raiz
        if(aux.izquierdo != null){
            this.subprint(aux.izquierdo)
        }
        if(aux.derecho!=null){
            this.subprint(aux.derecho)
        }
        if(aux.anterior == null && aux.siguiente == null){
            console.log(aux.dato)
            return
        }
        while(aux!= null){
            console.log(aux.dato)
            aux = aux.siguiente
            if(aux != null && aux.derecho!=null){
                this.subprint(aux.derecho)
            }
        }
    }

    guardar(){
        let arreglo = []
        if (this.raiz == null){
            console.log("no existe arbol")
            return 
        }
       return this.recorrido(this.raiz,arreglo) 
    }

    //Sub metodo de impresion de arbol
    recorrido(rama,arreglo){
        if (rama.raiz == null){
            console.log("no hay nodos")
            return 
        }
        let aux = rama.raiz
        if(aux.izquierdo != null){
            this.recorrido(aux.izquierdo,arreglo)
        }
        if(aux.derecho!=null){
            this.recorrido(aux.derecho,arreglo)
        }
        if(aux.anterior == null && aux.siguiente == null){
            arreglo.push(aux.dato)
            return
        }
        while(aux!= null){
            arreglo.push(aux.dato)
            aux = aux.siguiente
            if(aux != null && aux.derecho!=null){
                this.recorrido(aux.derecho,arreglo)
            }
        }

        return arreglo
    }

    //Metodo de busqueda
    buscarArbol(dato){
        if (this.raiz == null){
            console.log("no existe arbol")
            return 
        }
        this.buscando(this.raiz, dato) 
    }

    //Sub metodo de busqueda
    buscando(rama, dato){
        if (rama.raiz == null){
            console.log("no hay nodos")
            return 
        }
        let aux = rama.raiz
        if(aux.izquierdo != null){
            this.buscando(aux.izquierdo, dato)
        }
        if(aux.derecho!=null){
            this.buscando(aux.derecho, dato)
        }
        if(aux.siguiente == null){
            if(aux.dato == dato){
                console.log("Dato encontrado" + dato)
                return
            }
        }
        while(aux!= null){
            if(aux.dato == dato){
                console.log("Dato encontrado" + dato)
                return
            }
            aux = aux.siguiente
            if(aux != null && aux.derecho!=null){
                this.buscando(aux.derecho, dato)
            }
        }
    }



    //Metodo eliminar
    eliminar(dato){
        if (this.raiz == null){
            console.log("no existe arbol")
            return 
        }
        let aux = this.raiz
        let aux2 = aux.raiz
        while (aux2 != null){
            if(aux2.dato == dato && aux2.izquierdo == null && aux2.derecho == null){
                if(aux2.anterior == null && aux2.siguiente != null){
                    let tmp = aux2.siguiente
                    aux.raiz = tmp
                    aux2.siguiente = null
                    tmp.anterior = null
                    console.log("Nodo Raiz eliminado")
                    return
                }else if(aux2.anterior != null && aux2.siguiente != null){
                    let tmp = aux2.siguiente
                    aux2.anterior.siguiente = tmp
                    tmp.anterior = aux2.anterior
                    aux2.anterior = null
                    aux2.siguiente = null
                    console.log("Nodo medio eliminado")
                    return
                }else if(aux2.anterior != null && aux2.siguiente == null){
                    let tmp = aux2.anterior
                    tmp.siguiente = null
                    aux2.anterior = null
                    console.log("Nodo eliminado al final")
                    return
                }else if(aux2.anterior == null && aux2.siguiente == null){
                    if(aux2.izquierdo == null && aux2.derecho == null){
                        this.raiz = null
                        idRama = 0
                        console.log("eliminado unico nodo")
                    }
                }
            }
            aux2 = aux2.siguiente
        }
        this.eliminando(this.raiz, dato) 
    }

    //Sub metodo eliminar
    eliminando(rama, dato){
        if (rama.raiz == null){
            console.log("no hay nodos")
            return 
        }
        let aux = rama.raiz
        if(aux.izquierdo != null){
            this.eliminando(aux.izquierdo, dato)
        }
        if(aux.derecho!=null){
            this.eliminando(aux.derecho, dato)
        }
        if(aux.siguiente == null && aux.anterior == null){
            if(aux.dato == dato){
                console.log("Dato identificado" + dato)
                aux.dato = "papa"
                this.elimin(this.raiz)
                this.creando()
                return
            }
        }
        while(aux!= null){
            if(aux.anterior != null && aux.derecho != null){
                this.eliminando(aux.derecho, dato)
            }
            if(aux.dato == dato){
                console.log("Dato identificado" + dato)
                aux.dato = "papa"
                this.elimin(this.raiz)
                this.creando()
                return
            }
            aux = aux.siguiente
        }
    }

    //Metodo de reestructuracion de arbol
    creando(){
        this.raiz = null
        idRama = 0
        for(let i = 0; i<arr.length;i++){
            let dat = arr[i]
            this.insertar(dat)
        }
        console.log("Arbol Creado")
        arr = []
    }
    
    //Metodo para manejo de array de uso unico
    elimin(rama){
        if (rama.raiz == null){
            console.log("no hay nodos")
            return 
        }
        let aux = rama.raiz
        if(aux.izquierdo != null){
            this.elimin(aux.izquierdo)
        }
        if(aux.derecho!=null){
            this.elimin(aux.derecho)
        }
        if(aux.siguiente == null && aux.anterior == null){
            if(aux.dato != "papa"){
                arr.push(aux.dato)
                return
            }
        }
        while(aux!= null){
            if(aux.anterior != null && aux.derecho != null){
                this.elimin(aux.derecho)
            }
            if(aux.dato != "papa"){
                arr.push(aux.dato)
            }
            aux = aux.siguiente
        }
    }

    //Metodo modificar
    modificar(datelim, datins){
        this.eliminar(datelim)
        this.insertar(datins)
    }

    //Metodo Cargar
    cargar(arreglo) {
        arreglo.map(elemento => {
            this.insertar(elemento);
        })
    }

    //Metodo Graficar
      //Metodo Graficar
      graficar(datoBuscar){
          
        salida = ""
        if(this.raiz == null){
            console.log("No hay nada aun")
            return
        }
        let rama = this.raiz
        salida+= "digraph G{\nnode[shape=record]\nedge[color=\"green\"]\n"
        this.graficando(rama,datoBuscar)
        salida+= "}"
        console.log(salida)

        return salida
    }

    //SubMetodo Graficar
    graficando(rama,datoBuscar){
        if (rama.raiz == null){
            console.log("no hay nodos")
            return 
        }
        let aux = rama.raiz
        if(aux.izquierdo != null){
            this.graficando(aux.izquierdo,datoBuscar)
        }
        if(aux.derecho!=null){
            this.graficando(aux.derecho,datoBuscar)
        }
        if(aux.siguiente == null){
            if(datoBuscar == aux.dato){
                salida += "node"+rama.id+" [color=\"green\" label = \" iz| "+aux.dato+" |de \"]; \n"
            }else{
                salida += "node"+rama.id+" [label = \" iz| "+aux.dato+" |de \"]; \n"
            }
            if(aux.derecho != null){
                salida+= "node"+rama.id + " -> node" + aux.derecho.id + "\n"
            }
            if(aux.izquierdo != null){
                salida+= "node"+rama.id + " -> node" + aux.izquierdo.id + "\n"
            }
        }
        if(aux.siguiente != null){
            if(aux.izquierdo==null && aux.derecho == null){
                salida += "node"+rama.id+" [label = \" iz| "
                let encuentra = false
                while(aux!=null){
                    if(datoBuscar == aux.dato){
                        encuentra = true
                    }
                    salida += aux.dato+ " | "
                    aux = aux.siguiente
                }
                if(encuentra== true){
                    salida += "de \"color = \"green\"] ; \n"
                }else{
                    salida += "de \"]; \n"
                }
            }else if(aux.izquierdo!=null && aux.derecho != null){
                salida += "node"+rama.id+" [label = \" iz| "
                let encuentra = false
                while(aux!=null){
                    if(datoBuscar == aux.dato){
                        encuentra = true
                    }
                    salida += aux.dato+ " | "
                    aux = aux.siguiente
                }
                if(encuentra== true){
                    salida += "de \"color = \"green\"] ; \n"
                }else{
                    salida += "de \"]; \n"
                }
                aux = rama.raiz
                if(aux.derecho != null){
                    salida+= "node"+rama.id + " -> node" + rama.raiz.derecho.id + "\n"
                }
                if(aux.izquierdo != null){
                    salida+= "node"+rama.id + " -> node" + rama.raiz.izquierdo.id + "\n"
                }
                aux = rama.raiz
                aux = aux.siguiente
                while(aux!=null){
                    salida += "node"+rama.id + " -> node" + aux.derecho.id + "\n"
                    aux = aux.siguiente
                }
            }
            aux = rama.raiz
            aux = aux.siguiente
            while(aux !=null){
                if(aux != null && aux.derecho!=null){
                    this.graficando(aux.derecho,datoBuscar)
                }
                aux = aux.siguiente
            }
        }    
    }

 

    
}

export default ArbolB;