const Nodo = require('./Nodo.js');
class ListaSimple{

    cabeza = null

    constructor(){
        this.cabeza = null;
        this.ultimo = null;
    }


    insertar(dato){
        let nodo_nuevo = new Nodo(dato);
        if (this.get_vacia() == true){
            this.set_cabeza(nodo_nuevo);
            this.set_ultimo(nodo_nuevo);
        }else{

            this.get_ultimo().set_siguiente(nodo_nuevo);
            this.set_ultimo(nodo_nuevo);

        }

    }
    
    insertar_inicio(dato){
        let nodo_nuevo = new Nodo(dato)

        nodo_nuevo.set_siguiente(this.get_cabeza())
        this.set_cabeza(nodo_nuevo)
    }

    insertar_ultimo(dato){
        let nodo_nuevo = new Nodo(dato)
        this.get_ultimo().set_siguiente(nodo_nuevo)
        this.set_ultimo(nodo_nuevo)

    }

    eliminar(dato){

        if (this.get_vacia() == false){
            
            let nodo_actual = this.get_cabeza().get_siguiente();
            let anterior = this.get_cabeza();
            if (this.get_cabeza().get_dato() == dato){
                this.set_cabeza(this.get_cabeza().get_siguiente());
                return console.log("Delete!");
            }else{
                do {
                    if (nodo_actual.get_dato() == dato){
                        if (nodo_actual.get_dato() == this.get_ultimo().get_dato()){
                            anterior.set_siguiente(null);
                            this.set_ultimo(anterior);
                            return console.log("Delete!");
                        }else {
                            anterior.set_siguiente(nodo_actual.get_siguiente());
                            return console.log("Delete!");
                        }
                    }
                    nodo_actual = nodo_actual.get_siguiente();
                    anterior = anterior.get_siguiente();

                } while (nodo_actual != null);
            }

        }else{ return console.log("Empty!"); }

        return console.log("Data not found!");
    }

    update(dato, cambio){
        let nodo_actual = this.get_cabeza();

        if (this.get_vacia() == false){

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
        let nodo_actual = this.get_cabeza()

        if (this.get_vacia() == false){

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

    mostrar(){
        let nodo_actual = this.get_cabeza();
        if (this.get_vacia() == false){

            do {
                console.log(nodo_actual.get_dato());
                nodo_actual = nodo_actual.get_siguiente();
            } while (nodo_actual != null);
        }
    }
    
    get_vacia(){
        if (this.get_cabeza() == null){
            return true;
        }else{
            return false;
        }  
    }

    get_cabeza(){ return this.cabeza; }
    set_cabeza(cabeza){ this.cabeza = cabeza; }
    get_ultimo(){ return this.ultimo; }
    set_ultimo(ultimo){ this.ultimo = ultimo; }
}

module.exports = ListaSimple;