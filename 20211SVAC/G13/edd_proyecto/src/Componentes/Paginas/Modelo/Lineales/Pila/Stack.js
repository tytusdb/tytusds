import Nodo from './Nodo.js'
// const Nodo = require('./Nodo.js')
class Stack{

    constructor(){
        this.primero = null
    }

    insertar = (dato) =>{ //Agrega un valor al final de la lista.
        let  nodo_nuevo = new Nodo(dato)
        if (this.empty() == false){
            nodo_nuevo.set_siguiente(this.get_primero())
            this.set_primero(nodo_nuevo)
        }else{
            this.set_primero(nodo_nuevo)
        }   

    }

    pop = () => { // Saca el primero de la pila.

        if(this.empty() == false){

            if (this.get_primero().get_siguiente() != null){
                
                let temp = this.get_primero().get_siguiente()
                this.get_primero().set_siguiente(null)
                this.set_primero(temp)
                
                return console.log("Delete!"); 
            }else {
                this.set_primero(null)
            }

        }else{ 
            console.log("Empty!"); 
            return false;
    
        }
        

    }


    
    update = (dato, cambio) => {
        let nodo_actual = this.get_primero();

        if (this.empty() == false){

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

    search = (dato) => {
        let nodo_actual = this.get_primero()

        if (this.empty() == false){
            let i = 0;
            do{
                if (nodo_actual.get_dato() == dato){
                    console.log("Data found! " + nodo_actual.get_dato());
                    return i;
                }
                nodo_actual = nodo_actual.get_siguiente();
                i ++;
            }while(nodo_actual != null);

        }else{ 
            console.log("Empty!"); 
            return false;
    
        }

        console.log("Data not found!");
        return false;
    }


    print = () => {

        if(this.empty() == false){
            let nodo_actual = this.get_primero()
            do {
                console.log(nodo_actual.get_dato())
                nodo_actual = nodo_actual.get_siguiente()
            } while (nodo_actual != null);

        }else{ 
            console.log("Empty!"); 
            return false;
    
        }

    }


    empty = () => {
        if (this.get_primero() == null){
            return true;
        }else{
            return false;
        }
    }

    
    setNodesDataSet = () => { // Esto Genera los nodos de Vis.

        let nodo_actual = this.get_primero();
        var dot = [];
        if (this.empty() == false){
            let i = 0
            do {
				dot.push({id:i, label: nodo_actual.get_dato()});	
                nodo_actual = nodo_actual.get_siguiente();
                i++;
            } while (nodo_actual != null);

        }
        return dot;

    } 

    setEdgesDataSet = () => {

        let nodo_actual = this.get_primero();
        var dot = [];
        if (this.empty() == false){
            let i = 0;
            do {
                if (nodo_actual.get_siguiente() != null){

                    let nodoUno = parseInt(i)
                    let nodoDos = parseInt(nodoUno) + parseInt(1)
                    if (i==0){
                        dot.push({from:0, to:1, arrows: "to"});
                    }
                    if ( nodoUno!= false && nodoDos != false){
                        dot.push({from:parseInt(nodoUno), to:parseInt(nodoDos), arrows: "to"});
                    }
                }
                nodo_actual = nodo_actual.get_siguiente();
                i ++;
            } while (nodo_actual != null);
        }

        return dot;

    }


    get_primero = () => { return this.primero; }
    set_primero = (primero) => { this.primero = primero; }

}

export default Stack;
//module.exports = Stack;