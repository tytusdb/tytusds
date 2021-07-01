class NodoMatriz{
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

class ListaDoble{
    constructor(){
        this.cabeza = null
        this.cola = null
    }

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

class Matriz{
    constructor(){
        this.CHorizontal = new ListaDoble()
        this.CVertical = new ListaDoble()
    }

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
}
