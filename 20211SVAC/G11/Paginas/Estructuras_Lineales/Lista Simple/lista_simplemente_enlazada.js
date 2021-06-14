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
            this.ultimo = this.primero;
            this.size++;
        } else {
            this.ultimo.siguiente = nuevo;
            this.ultimo = nuevo;
            this.size++;
        }

    }
    find_nodo(node){
        let aux = this.primero
        while (aux != null) {
           if (aux.siguiente != null) {
               if (aux.siguiente == node) {
                   return aux;
               }
           }
            aux = aux.siguiente;
        }
        return null
    }
    remove(dato) {
        let aux = this.primero;
       
        while(aux != null){
            if(aux.dato == dato){
                if (aux == this.primero) {
                    if (this.primero.siguiente != null) {
                        this.primero = this.primero.siguiente;
                    }else{
                        this.primero = null;
                    }
                }else{
                    let nuevo = this
                    if (aux.siguiente == null) {
                       let temp =nuevo.find_nodo(aux);
                        temp.siguiente = null;
                    }else{
                        let temp = nuevo.find_nodo(aux);
                        temp.siguiente = aux.siguiente; 
                    }
                }
                return;
            }
            aux = aux.siguiente;
        }
        

    }

    print() {
        var valores = []
        let aux = this.primero;
        while (aux != null) {
            valores.push(aux.dato);
            console.log("Dato:", aux.dato);
            aux = aux.siguiente;
        }

        return valores;
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