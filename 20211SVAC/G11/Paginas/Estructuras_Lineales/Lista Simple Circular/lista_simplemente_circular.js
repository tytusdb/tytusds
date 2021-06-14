$(document).ready(main);

var contador = 1;


class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
       
    }
}

class Lista {
    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }

    add(dato) {
        let nuevo = new Nodo(dato)

        if (this.primero == null) {
            
        this.primero = nuevo;
        this.primero.siguiente = nuevo;
       
           
        }else if(this.primero.siguiente == this.primero){
            this.primero.siguiente = nuevo;
            nuevo.siguiente = this.primero;
        }
        else{
            
            let aux = this.primero.siguiente;
            while (aux != this.primero) {
                if (aux.siguiente == this.primero) {
                    nuevo.siguiente = this.primero;
                    aux.siguiente = nuevo;
                    return;
                    
                }
                aux = aux.siguiente;
            }
    
           
        }
        

    }
    find_dato(nodo){
        if (this.primero != null) {
            
        
           
            let aux = this.primero;
            if (this.primero.siguiente == nodo) {
                return this.primero;
            }
            aux = aux.siguiente;
            while (aux != this.primero) {
                if (aux.siguiente == nodo) {
                    return aux;
                }
                aux = aux.siguiente;
            }
    
            return valores;
        }
    }
    remove(dato) {
        if (this.primero != null) {
            
       
        let aux = this.primero
        if (this.primero.dato == dato) {
            if (this.primero.siguiente == this.primero) {
                this.primero = null;
            }else{
                let temp = this.find_dato(this.primero);
                this.primero = this.primero.siguiente;
                temp.siguiente = this.primero;
                
            }
            return;
        }
        aux = aux.siguiente;
        while(aux != this.primero){
            if(aux.dato == dato){
                let temp = this.find_dato(aux);
                temp.siguiente = aux.siguiente;
                return;
            }
            aux = aux.siguiente;
        }
        
    }
    return;
    }

    print() {
        if (this.primero != null) {
            
        
        var valores = []
        let aux = this.primero;
        valores.push(aux.dato);
            console.log("Dato:", aux.dato);
            aux = aux.siguiente;
        while (aux != this.primero) {
            valores.push(aux.dato);
            console.log("Dato:", aux.dato);
            aux = aux.siguiente;
        }

        return valores;
    }
    }

}
function main () {
    let nuevo = new Lista()
    
	$('.btn-Ingrese').click(function(){
        var porId=document.getElementById("valor").value;
        
	
        nuevo.add(porId)
        nuevo.print()
        alert(nuevo.print())
	});
    $('.btn-Elimina').click(function(){
        var porId=document.getElementById("valor").value;
        
	
        nuevo.remove(porId)
        nuevo.print()
        alert(nuevo.print())
	});
   
	// Mostramos y ocultamos submenus
	$('.submenu').click(function(){
		$(this).children('.children').slideToggle();
	});
}