//Clase Nodo Matriz
class NodoMatriz{
    //Constructor
    constructor(dato, i, j){
        this.dato = dato
        this.este = null
        this.sur = null
        this.norte = null
        this.oeste = null
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
        this.cabeza = null
        this.cola = null
    }

    //Ordenamiento de Cabeceras
    ordenar(nodo){
        let aux = this.cabeza
        while(aux != null){
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
        this.cola.siguiente = nodo
        nodo.anterior = this.cola
        this.cola = nodo
    }

    //Insercion en cabeceras
    insertar(dato){
        let nodo = new NodoMatriz(dato, null, null)
        if(this.cabeza == null){
            this.cabeza = this.cola = nodo
            return
        }
        this.ordenar(nodo)
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
                    console.log("Ya hay algo en este nodo")
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
}
