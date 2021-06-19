const Nodo = require('./Nodo.js')
class ListaDoble{

    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertar(dato){

        let nodo_nuevo = new Nodo(dato);

        if (this.vacia() == true){
            this.set_primero(nodo_nuevo);
            this.set_ultimo(nodo_nuevo);
        }else{

            this.get_ultimo().set_siguiente(nodo_nuevo)
            nodo_nuevo.set_anterior(this.get_ultimo())
            this.set_ultimo(nodo_nuevo)

        }
    }

    insertar_inicio(dato){
        let nodo_nuevo = new Nodo(dato)

        nodo_nuevo.set_siguiente(this.get_primero())
        this.get_primero().set_anterior(nodo_nuevo)
        this.set_primero(nodo_nuevo)
    }

    insertar_ultimo(dato){
        let nodo_nuevo = new Nodo(dato)
        
        this.get_ultimo().set_siguiente(nodo_nuevo)
        nodo_nuevo.set_anterior(this.get_ultimo())
        this.set_ultimo(nodo_nuevo)

    }

    eliminar(dato){

        if (this.vacia() == false){
            

            if (this.get_primero().get_dato() == dato){ //Condicion cuando hay 2 nodos -> eliminando al primero

                if (this.get_primero().get_siguiente() != null){

                    let temp = this.get_primero().get_siguiente()
                    this.get_primero().get_siguiente().set_anterior(null)
                    this.get_primero().set_siguiente(null)
                    this.set_primero(temp);

                    return console.log("Delete!");
                }else{
                    this.set_primero(null)
                    this.set_ultimo(null)
                }

            }else if (this.get_ultimo().get_dato() == dato){  //Condicion cuando hay 2 nodos -> eliminando al ultimo

                if (this.get_ultimo().get_anterior() != null){

                    let temp = this.get_ultimo().get_anterior()
                    this.get_ultimo().get_anterior().set_siguiente(null)
                    this.get_ultimo().set_anterior(null)
                    this.set_ultimo(temp);

                    return console.log("Delete!");
                }else{
                    this.set_primero(null)
                    this.set_ultimo(null)
                    
                    return console.log("Delete!");
                }


            }else{ //Condicion cuando hay mas de 3 nodos -> eliminando al de en medio
                let nodo_actual = this.get_primero().get_siguiente();
                let anterior = this.get_primero();
                do {

                    if (nodo_actual.get_dato() == dato){
                        
                        let siguiente = nodo_actual.get_siguiente()

                        nodo_actual.set_siguiente(null)
                        nodo_actual.set_anterior(null)
                        anterior.set_siguiente(siguiente)
                        siguiente.set_anterior(anterior)

                        return console.log("Delete!");
                     
                    }
                    nodo_actual = nodo_actual.get_siguiente();
                    anterior = anterior.get_siguiente();

                } while (nodo_actual != null);
            }

        }else{ return console.log("Empty!"); }

        return console.log("Data not found!");
    }

    update(dato, cambio){
        let nodo_actual = this.get_primero();

        if (this.vacia() == false){

            do{
                if (nodo_actual.get_dato() == dato){
                    nodo_actual.set_dato(cambio);
                    return console.log("Data Update!");
                }
                nodo_actual = nodo_actual.get_siguiente()
            }while(nodo_actual != null);
        }
        return console.log("Data not found!");

    }

    search(dato){
        let nodo_actual = this.get_primero()

        if (this.vacia() == false){

            do{
                if (nodo_actual.get_dato() == dato){
                    console.log("Data found! " + nodo_actual.get_dato());
                    return true
                }
                nodo_actual = nodo_actual.get_siguiente();
            }while(nodo_actual != null);

        }else{ 
            console.log("Empty!"); 
            return false;
    
        }

        console.log("Data not found!");
        return false;
    }



    print(){
        console.log("-> ->")
        let nodo_actual = this.get_primero();
        if (this.vacia() == false){
            do{
                console.log(nodo_actual.get_dato())
                nodo_actual = nodo_actual.get_siguiente()
            }while(nodo_actual != null);

            console.log("<- <-")
            nodo_actual = this.get_ultimo();
            do{
                console.log(nodo_actual.get_dato())
                nodo_actual = nodo_actual.get_anterior()
            }while(nodo_actual != null);
        }else{
            console.log("Empty!"); 
            
        }
    }

    vacia(){
        if (this.get_primero() == null){ 
            return true;
        }else{
            return false;
        }
    }


    get_primero(){ return this.primero; }
    set_primero(primero){ this.primero = primero; }
    get_ultimo(){ return this.ultimo; }
    set_ultimo(ultimo){ this.ultimo = ultimo; }



}

module.exports = ListaDoble;