$(document).ready(main);

var contador = 1;


class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
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
            nuevo.anterior = this.ultimo;
            this.ultimo = nuevo;
            this.size++;
        }

    }
    remove(dato) {
        let aux = this.primero
        alert("remoce")
        while(aux != null){
            if(aux.dato == dato){
                let temp = aux.anterior;
                if (temp == null) {
                    if (aux.siguiente == null) {
                        this.primero = null;
                        
                    }else{
                        this.primero = aux.siguiente;
                        this.primero.anterior = null;
                    }
                    this.primero = aux.siguiente;
                }else{
                    if (aux.siguiente == null) {
                        temp.siguiente = null;
                    }else{
                        temp.siguiente = aux.siguiente;
                        aux.siguiente.anterior = temp;
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