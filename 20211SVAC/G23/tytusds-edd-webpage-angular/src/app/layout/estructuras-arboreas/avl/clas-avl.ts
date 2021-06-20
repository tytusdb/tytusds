import { Nodo } from "./nodo-avl"
export class AVL{
    root: Nodo
    constructor(){
        this.root = null
    }

    MAXIMO(valor1,valor2){
        if(valor1 > valor2) return valor1 
        return valor2
    }

    altura(nodo){
        if(nodo == null) return -1
        return nodo.altura
    }
    
    insertar(valor){
        this.root = this.add(valor,this.root)

    }

    add(valor, nodo){
        if(nodo == null) return new Nodo(valor)
        else{
            if (valor < nodo.valor){
                nodo.izquierda = this.add(valor,nodo.izquierda)
                if(this.altura(nodo.derecha)-this.altura(nodo.izquierda) == -2){
                    if(valor < nodo.izquierda.valor){
                        nodo = this.RotacionIzquierda(nodo)
                    }else{
                        nodo = this.RotacionDobleIzquierda(nodo)
                    }
                }

            }else if (valor > nodo.valor){
                nodo.derecha = this.add(valor, nodo.derecha)
                if(this.altura(nodo.derecha) - this.altura(nodo.izquierda) == 2){
                    if(valor > nodo.derecha.valor){
                        nodo = this.RotacionDerecha(nodo)
                    }else{
                        nodo = this.RotacionDobleDerecha(nodo)
                    }
                }
            }else{
                nodo.valor = valor
            }
        }
        nodo.altura = this.MAXIMO( this.altura(nodo.izquierda), this.altura(nodo.derecha)) + 1
        return nodo
    }

    RotacionIzquierda(nodo){
        let aux = nodo.izquierda
        nodo.izquierda = aux.derecha
        aux.derecha = nodo
        nodo.altura = this.MAXIMO( this.altura(nodo.derecha), this.altura(nodo.izquierda)) + 1
        aux.altura = this.MAXIMO( this.altura(nodo.izquierda), nodo.altura) + 1
        return aux
    }

    RotacionDobleIzquierda(nodo){
        nodo.izquierda = this.RotacionDerecha(nodo.izquierda)
        return this.RotacionIzquierda(nodo)
    }

    RotacionDerecha(nodo){
        let aux = nodo.derecha
        nodo.derecha = aux.izquierda
        aux.izquierda = nodo
        nodo.altura = this.MAXIMO( this.altura(nodo.derecha), this.altura(nodo.izquierda)) + 1
        aux.altura = this.MAXIMO( this.altura(nodo.derecha), nodo.altura) + 1
        return aux
    }

    RotacionDobleDerecha(nodo){
        nodo.derecha = this.RotacionIzquierda(nodo.derecha)
        return this.RotacionDerecha(nodo)
    }

    inOrder(node, retorno){
        if(node !== null){
            retorno = this.inOrder(node.left,retorno)
            console.log(node.data)
            console.log("******")
            retorno += node.data.toString()  + " ----- "
            
            retorno = this.inOrder(node.right,retorno)
        }
        return retorno
    }
    
    eliminar(valor){
        this.root = this.eliminarN(this.root,valor)
        
    }

    eliminarN(nodo_aux,valor){
        console.log("ENTRO A ELIMINAR N")
        if(nodo_aux == null) return null
        else if(valor < nodo_aux.data){
            let iz = this.eliminarN(nodo_aux.left,valor)
            nodo_aux.left = iz
        }else if( valor > nodo_aux.data){
            let der = this.eliminarN(nodo_aux.right,valor)
            nodo_aux.right = der
        }else{
            let p = nodo_aux
            if(p.right == null){
                nodo_aux = p.left
            }else if(p.left == null){
                nodo_aux = p.right
            }else{
                p = this.cambiar(p)
            }
            p = null
        }
        return nodo_aux
    }

    cambiar(nodo_aux){
        let p = nodo_aux
        let a = nodo_aux.left
        while(a.right != null){
            p = a
            a = a.right
        }
        console.log("Nodo aux",nodo_aux.data)
        console.log("A",a.data)
        nodo_aux.data = a.data
        if(p == nodo_aux){
            p.left = a.left
        }else{
            p.right = a.left
        }return a
    }

}