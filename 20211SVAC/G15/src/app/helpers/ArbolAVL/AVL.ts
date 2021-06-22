import { nodo } from './nodo'

export class AVL{
    private root=nodo;

    constructor() {
		this.root = null
        
	}
    altura(aux) {
		if (aux == null) return -1
		return aux.height
	}

	max(dato1, dato2) {
		if (dato1 > dato2) return dato1
		return dato2
	}

	add(dato) {
		this.root = this.agregar(dato, this.root)
    }

    agregar(dato, aux) {
		if (aux == null) return new nodo(dato)//datoraix
		else if (dato < aux.dato) { //menorixquierda
			aux.left = this.agregar(dato, aux.right)
			if ((this.altura(aux.left)-this.altura(aux.right))==2) {
				if (dato < aux.left.dato) {
                    aux = this.rotarIzquierda(aux)}
				else {aux = this.rotaizquierdaizquierda(aux)}
			}
		} else if (dato > aux.dato) { //mayorderecha
			aux.right = this.agregar(dato, aux.right)
			if ((this.altura(aux.right)-this.altura(aux.left))==2) {
				if (dato > aux.right.dato) {
                    aux = this.rotarDerecha(aux)
                }
				else {
                    aux = this.rotarderechaderecha(aux)
                }
			} 
		}
		
		var derecha = this.altura(aux.right)
		var izquierda = this.altura(aux.left)		
		aux.altura= this.max(derecha, izquierda)+1
		
		return aux		
    }

    rotaizquierdaizquierda(aux){
        aux.left = this.rotarDerecha(aux.left) //intercambi
        return this.rotarIzquierda(aux)

    }

    rotarderechaderecha(aux){
        aux.right = this.rotarIzquierda(aux.right)
        return this.rotarDerecha(aux)
    }
	
    rotarIzquierda(nodoaux){
        var aux = nodoaux.left
        nodoaux.left = aux.right  
        aux.right = nodoaux 
        nodoaux.altura = this.max(this.altura(nodoaux.left), this.altura(nodoaux.right))+1
        aux.altura = this.max(this.altura(aux.left), nodoaux.altura) +1
        return aux
    }

    rotarDerecha(nodoaux){
        var aux = nodoaux.right
        nodoaux.right = aux.left  
        aux.left = nodoaux 
        nodoaux.altura = this.max(this.altura(nodoaux.left), this.altura(nodoaux.right))+1
        aux.altura = this.max(this.altura(aux.right), nodoaux.altura) +1
        return aux

    }


}