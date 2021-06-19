const Nodo = require('./Nodo.js')
class ListaCircular{

    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }


    insertar(dato){
        let nodo_nuevo = new Nodo(dato);
        if (this.vacia() == true){
            this.set_primero(nodo_nuevo);
            this.set_ultimo(nodo_nuevo);
            this.get_primero().set_siguiente(this.get_ultimo());
            this.get_ultimo().set_siguiente(this.get_primero());
        }else{

            this.get_ultimo().set_siguiente(nodo_nuevo);
            nodo_nuevo.set_siguiente(this.get_primero());
            this.set_ultimo(nodo_nuevo);

        }
        this.size ++;

    }

    insertar_inicio(dato){
        let nodo_nuevo = new Nodo(dato)

        nodo_nuevo.set_siguiente(this.get_primero())
        this.get_ultimo().set_siguiente(nodo_nuevo)
        this.set_primero(nodo_nuevo)
        this.size ++;
    }

    insertar_ultimo(dato){
        let nodo_nuevo = new Nodo(dato)
        
        this.get_ultimo().set_siguiente(nodo_nuevo)
        nodo_nuevo.set_siguiente(this.get_primero())
        this.set_ultimo(nodo_nuevo)
        this.size++;
    }


    eliminar(dato){
        if(this.vacia() == false){

             if (this.get_primero().get_dato() == dato){ //Condicion cuando hay 2 nodos -> eliminando al primero

                if (this.get_primero().get_siguiente() != null){

                    let temp = this.get_primero().get_siguiente()
                    this.get_primero().set_siguiente(null)
                    this.get_ultimo().set_siguiente(temp)
                    this.set_primero(temp)
                    this.size --;
                    return console.log("Delete!");
                }else{
                    this.set_primero(null)
                    this.set_ultimo(null)
                    this.size --;
                }

            }else if (this.get_ultimo().get_dato() == dato){  //Condicion cuando hay 2 nodos -> eliminando al ultimo

                if (this.get_primero().get_siguiente()!= null){
                    let nodo_actual = this.get_primero().get_siguiente()
                    let anterior = this.get_primero()

                    let i = 0

                    while (i < this.size){
                        if(nodo_actual.get_dato()==dato){
                            break
                        }
                        nodo_actual = nodo_actual.get_siguiente()
                        anterior = anterior.get_siguiente()

                        i ++;
                    }

                    
                    this.get_ultimo().set_siguiente(null)
                    anterior.set_siguiente(this.get_primero())
                    this.set_ultimo(anterior)
                    this.size --;
                    return console.log("Delete!");
                }else{
                    this.set_primero(null)
                    this.set_ultimo(null)
                    this.size --;
                    return console.log("Delete!");
                }


            }else{ //Condicion cuando hay mas de 3 nodos -> eliminando al de en medio
                let nodo_actual = this.get_primero().get_siguiente();
                let anterior = this.get_primero();
                
                let i = 0;
                while (i<this.size){

                    if (nodo_actual.get_dato() == dato){
                        let temp = nodo_actual.get_siguiente()
                        nodo_actual.set_siguiente(null)
                        anterior.set_siguiente(temp)
                        this.size --;
                        return console.log("Delete!");
                     
                    }
                    nodo_actual = nodo_actual.get_siguiente();
                    anterior = anterior.get_siguiente();
                    i++;
                }
            }

        }else{ return console.log("Empty!"); }

        return console.log("Data not found!");


    }

    
    update(dato, cambio){
        let nodo_actual = this.get_primero();

        if (this.vacia() == false){

            let i = 0;
            while(i<this.size){
                
                if (nodo_actual.get_dato() == dato){
                    nodo_actual.set_dato(cambio);
                    return console.log("Data Update!");
                }
                nodo_actual = nodo_actual.get_siguiente()
                i++;
            }
        }
        return console.log("Data not found!");

    }

    search(dato){
        let nodo_actual = this.get_primero()

        if (this.vacia() == false){

            let i = 0;
            while(i<this.size){
                
                if (nodo_actual.get_dato() == dato){
                    console.log("Data found! " + nodo_actual.get_dato());
                    return true
                }
                nodo_actual = nodo_actual.get_siguiente();
                i++;
            }

        }else{ 
            console.log("Empty!"); 
            return false;
    
        }

        console.log("Data not found!");
        return false;
    }

    print(){
        
        var i = 0;
        let nodo_actual = this.get_primero();
        while(i<this.size){
            console.log(nodo_actual.get_dato());
            nodo_actual = nodo_actual.get_siguiente();
            i++;
        }

        console.log("Salio del While");
        console.log(nodo_actual.get_dato());
        console.log("Este es el Primero ->"+this.get_primero().get_dato())
        console.log(nodo_actual.get_siguiente().get_dato());
        console.log("ultimo");
        console.log(this.get_ultimo().get_dato());
        console.log(this.get_ultimo().get_siguiente().get_dato());
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

module.exports = ListaCircular;