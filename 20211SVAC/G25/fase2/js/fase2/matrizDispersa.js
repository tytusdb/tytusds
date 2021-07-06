class NodoMatriz{
    //Constructor
    constructor(dato, i, j){
        this.dato = dato
        this.derecha = null
        this.abajo = null
        this.arriba = null
        this.izquierda = null
        this.siguiente = null
        this.anterior = null
        this.i = i
        this.j = j
    }
}

//Lista Doble para Cabeceras
class ListaDoble{
    //Constructor
    constructor(){
        this.head = null
        this.tail = null
    }

    //Ordenamiento de Cabeceras
    ordenar(nodo){
        let aux = this.head
        while(aux != null){
            if(aux.dato < nodo.dato){
                aux = aux.siguiente
            } else{
                if(aux == this.head){
                    nodo.siguiente = aux
                    aux.anterior = nodo
                    this.head = nodo
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
        this.tail.siguiente = nodo
        nodo.anterior = this.tail
        this.tail = nodo
    }

    //Insercion en cabeceras
    insertar(dato){
        let nodo = new NodoMatriz(dato, null, null)
        if(this.head == null){
            this.head = this.tail = nodo
            return
        }
        this.ordenar(nodo)
    }

    //Eliminacion para la lista doble
    eliminar(dato){
        let aux = this.head
        while(aux != null){
            if(dato == aux.dato && aux == this.head){
                let tmp = this.head.siguiente
                tmp.anterior = null
                this.head.siguiente = null
                this.head = tmp
                return
            }else if(dato == aux.dato && aux.anterior != null && aux.siguiente != null){
                let tmp = aux.siguiente
                tmp.anterior = aux.anterior
                aux.anterior.siguiente = tmp
                aux.siguiente = null
                aux.anterior = null
                return
            }else if(dato == aux.dato && aux == this.tail){
                let tmp = this.tail.anterior
                tmp.siguiente = null
                this.tail.anterior = null
                this.tail = tmp
                return
            }else if(dato == aux.dato && this.tail == this.head){
                this.tail = null
                this.head = null
                return
            }
            aux = aux.siguiente
        }
    }

    //Busqueda en cabeceras
    busqueda(dato){
        let tmp = this.head
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
        this.hori = new ListaDoble()
        this.vert = new ListaDoble()
    }

    //Insercion en matriz
    insertar(dato, i, j){
        let Ni = this.hori.busqueda(i)
        let Nj = this.vert.busqueda(j)
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
        this.hori.insertar(i)
        this.vert.insertar(j)
        let Ni = this.hori.busqueda(i)
        let Nj = this.vert.busqueda(j)
        let n = new NodoMatriz(dato, i, j)
        Ni.abajo = n
        n.arriba = Ni
        Nj.derecha = n
        n.izquierda = Nj
    }

    //Segundo caso de insercion posible
    C2(dato, i, j){
        this.hori.insertar(i)
        let Ni = this.hori.busqueda(i)
        let Nj = this.vert.busqueda(j)
        let cAgrego = false
        let n = new NodoMatriz(dato, i, j)
        let aux = Nj.derecha
        let contadorC = 0
        while(aux != null){
            contadorC = aux.i
            if(contadorC<i){
                aux = aux.derecha
            } else {
                n.derecha = aux
                n.izquierda = aux.izquierda
                n.izquierda.derecha = n
                aux.izquierda = n
                cAgrego = true
                break
            }
        }
        if(cAgrego == false){
            aux = Nj.derecha
            while(aux.derecha!=null){
                aux = aux.derecha
            }
            n.izquierda = aux
            aux.derecha = n
        }
        Ni.abajo = n
        n.arriba = Ni
    }

    //Tercer caso de insercion posible
    C3(dato, i, j){
        this.vert.insertar(j)
        let Ni = this.hori.busqueda(i)
        let Nj = this.vert.busqueda(j)
        let cAgrego = false
        let n = new NodoMatriz(dato, i, j)
        let aux = Ni.abajo
        let contadorC = 0
        while(aux!=null && !cAgrego){
            contadorC = aux.j
            if(contadorC<j){
                aux = aux.abajo
            } else{
                n.abajo = aux
                n.arriba = aux.arriba
                aux.arriba.abajo = n
                aux.arriba = n
                cAgrego = true
            }
        }
        if(!cAgrego){
            aux = Ni.abajo
            while(aux.abajo!=null){
                aux = aux.abajo
            }
            aux.abajo = n
            n.arriba = aux
        }
        Nj.derecha = n
        n.izquierda = Nj
    }

    //Cuarto caso de insercion posible
    C4(dato, i, j){
        let Ni = this.hori.busqueda(i)
        let Nj = this.vert.busqueda(j)
        let cAgrego = false
        let n = new NodoMatriz(dato,i,j)
        let aux = Nj.derecha
        let contadorC = 0
        while(aux!=null){
            contadorC = aux.i
            if(contadorC < i){
                aux = aux.derecha
            }else if(contadorC == i){
                let contadorC2 = aux.j
                if(contadorC2 == j){
                    console.log("hay algo enel nodo")
                    return
                }
            }else{
                n.derecha = aux
                n.izquierda = aux.izquierda
                aux.izquierda.derecha= n
                aux.izquierda = n
                cAgrego = true
                break
            }
        }
        if(cAgrego == false){
            aux = Nj.derecha
            while(aux.derecha != null){
                aux = aux.derecha
            }
            n.izquierda = aux
            aux.derecha = n
        }
        cAgrego = false
        aux = Ni.abajo
        contadorC = 0
        while(aux!=null && !cAgrego){
            contadorC = aux.j
            if(contadorC<j){
                aux = aux.abajo
            } else{
                n.abajo = aux
                n.arriba = aux.arriba
                aux.arriba.abajo = n
                aux.arriba = n
                cAgrego = true
            }
        }
        if(!cAgrego){
            aux = Ni.abajo
            while(aux.abajo != null){
                aux = aux.abajo
            }
            aux.abajo = n
            n.arriba = aux
        }
    }

    //Impresion por head Vertical
    imprimirvert(){
        let cab = this.vert.head
        let aux
        while(cab != null){
            aux = cab.derecha
            while(aux!=null){
                console.log("Dato: "+ aux.dato + " I: "+aux.i + " J: " + aux.j)
                aux = aux.derecha
            }
            cab = cab.siguiente
        }
    }

    //Metodo busqueda
    buscar(dato){
        let cab = this.vert.head
        let aux
        while(cab != null){
            aux = cab.derecha
            while(aux!=null){
                if(aux.dato == dato){
                    console.log("El dato es: "+aux.dato+" en "+aux.i + " , "+aux.j)
                    return
                }
                aux = aux.derecha
            }
            cab = cab.siguiente
        }
    }

    //Metodo modificar
    modificar(datobus, datomod){
        let cab = this.vert.head
        let aux
        while(cab != null){
            aux = cab.derecha
            while(aux!=null){
                if(aux.dato == datobus){
                    aux.dato = datomod
                    console.log("El dato"+datobus+" cambio a: "+aux.dato+" en "+aux.i + " , "+aux.j)
                    return
                }
                aux = aux.derecha
            }
            cab = cab.siguiente
        }
    }

    //Metodo Eliminar
    eliminar(datoel){
        let cab = this.vert.head
        let aux
        while(cab != null){
            aux = cab.derecha
            while(aux!=null){
                if(aux.dato == datoel){
                    let arr = aux.arriba
                    let ab = aux.abajo
                    let iz = aux.izquierda
                    let der = aux.derecha
                    let Ni = this.hori.busqueda(aux.i)
                    let Nj = this.vert.busqueda(aux.j)
                    if(der == null && ab == null){
                        if(iz.i == null && arr.i == null){
                            this.hori.eliminar(Ni.dato)
                            this.vert.eliminar(Nj.dato)
                            return
                        }else if(iz.i == null && arr.i != null){
                            aux.arriba.abajo=null
                            aux.arriba = null
                            aux.izquierda = null
                            this.vert.eliminar(Nj.dato)
                            return
                        }else if(iz.i != null && arr.i == null){
                            aux.izquierda.derecha = null
                            aux.izquierda = null
                            aux.arriba = null
                            this.hori.eliminar(Ni.dato)
                            return
                        }else if(iz.i != null && arr.i != null){
                            aux.izquierda.derecha = null
                            aux.izquierda = null
                            aux.arriba.abajo = null
                            aux.arriba = null
                            return
                        }
                    }else if(der != null && ab == null ){
                        if(iz.i == null && arr.i == null){
                            der.izquierda = aux.izquierda
                            aux.izquierda.derecha = der
                            aux.izquierda = null
                            aux.derecha = null
                            this.hori.eliminar(Ni.dato)
                            return
                        }else if(iz.i == null && arr.i != null){
                            der.izquierda = aux.izquierda
                            aux.izquierda.derecha = der
                            aux.izquierda = null
                            aux.derecha = null
                            aux.arriba.abajo=null
                            aux.arriba = null
                            return
                        }else if(iz.i != null && arr.i == null){
                            der.izquierda = aux.izquierda
                            aux.izquierda.derecha = der
                            aux.izquierda = null
                            aux.derecha = null
                            aux.arriba = null
                            this.hori.eliminar(Ni.dato)
                            return
                        }else if(iz.i != null && arr.i != null){
                            aux.izquierda.derecha = der
                            der.izquierda = aux.izquierda
                            aux.izquierda = null
                            aux.derecha = null
                            aux.arriba.abajo = null
                            aux.arriba = null
                            return
                        }
                    }else if(der == null && ab != null ){
                        if(iz.i == null && arr.i == null){
                            ab.arriba = aux.arriba
                            aux.arriba.abajo = ab
                            aux.arriba = null
                            aux.abajo =  null
                            aux. izquierda = null
                            this.vert.eliminar(Nj.dato)
                            return
                        }else if(iz.i == null && arr.i != null){
                            ab.arriba = aux.arriba
                            arr.abajo = ab
                            aux.arriba = null
                            aux.abajo = null
                            aux.izquierda = null
                            this.vert.eliminar(Nj.dato)
                            return
                        }else if(iz.i != null && arr.i == null){
                            aux.izquierda.derecha = null
                            aux.izquierda = null
                            ab.arriba = aux.arriba
                            arr.abajo = aux.abajo
                            aux.arriba = null
                            aux.abajo = null
                            return
                        }else if(iz.i != null && arr.i != null){
                            aux.izquierda.derecha = null
                            aux.izquierda = null
                            ab.arriba = aux.arriba
                            arr.abajo = aux.abajo
                            aux.arriba = null
                            aux.abajo = null
                            return
                        }
                    }else if(der != null && ab != null ){
                        der.izquierda = aux.izquierda
                        iz.derecha = aux.derecha
                        arr.abajo = aux.abajo
                        ab.arriba = aux.arriba
                        aux.izquierda = null
                        aux.derecha = null
                        aux.abajo = null
                        aux.arriba = null
                        return
                    }
                }
                aux = aux.derecha
            }
            cab = cab.siguiente
        }
        console.log("No se encontro dato")
    }
}
