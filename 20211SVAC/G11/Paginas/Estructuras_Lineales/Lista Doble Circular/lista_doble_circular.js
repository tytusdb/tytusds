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
        this.primero.siguiente = nuevo;
        this.primero.anterior = nuevo;
           x|
        }else if(this.primero.siguiente == this.primero){
            this.primero.siguiente = nuevo;
            nuevo.anterior = this.primero;
            this.primero.anterior = nuevo;
            nuevo.siguiente = this.primero;
        }
        else{
            
            let aux = this.primero.siguiente;
            while (aux != this.primero) {
                if (aux.siguiente == this.primero) {
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    aux.siguiente = nuevo;
                    nuevo.anterior = aux;
                    return;
                    
                }
                aux = aux.siguiente;
            }
    
           
        }
        

    }
    remove(dato) {
        if (this.primero != null) {
            
       
        let aux = this.primero
        if (this.primero.dato == dato) {
            if (this.primero.siguiente == this.primero) {
                this.primero = null;
            }else{
                let temp = this.primero.anterior;
                this.primero = this.primero.siguiente;
                temp.siguiente = this.primero;
                this.primero.anterior = temp;
                
            }
            return;
        }
        aux = aux.siguiente;
        while(aux != this.primero){
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
    update(){
        
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
    
    $('.btn-Actualizar').click(function(){
        alert("Actualizar")
	});
   
    $('.btn-Buscar').click(function(){
        alert("Buscar")
	});

    $('.btn-Guardar').click(function(){
        alert("Guardar")
	});
   
	// Mostramos y ocultamos submenus
	$('.submenu').click(function(){
		$(this).children('.children').slideToggle();
	});
}