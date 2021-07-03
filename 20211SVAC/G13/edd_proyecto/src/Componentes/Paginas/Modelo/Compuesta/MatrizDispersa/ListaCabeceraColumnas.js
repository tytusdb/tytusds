class ListaCabeceraColumnas{

    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

    insertar = (nodoNuevo) => {
        if(this.vacia() == true){
            this.setPrimero(nodoNuevo);
            this.setUltimo(nodoNuevo);
        }else{
            if(nodoNuevo.getX() < this.getPrimero().getX()){ // Agregar al inicio
                this.insertarInicio(nodoNuevo);
            }else if (nodoNuevo.getX() > this.getUltimo().getX()){ // Agregar al final
                this.insertarFinal(nodoNuevo);
            }else{ // agregar medio
                this.insertarMedio(nodoNuevo);
            }
        }
    }

    insertarInicio = (nodoNuevo) => {
        this.getPrimero().setAnterior(nodoNuevo);
        nodoNuevo.setSiguiente(this.getPrimero());
        this.setPrimero(nodoNuevo);
    }

    insertarMedio = (nodoNuevo) => {
        let tmp1 = null;
        let tmp2 = null;
        tmp1 = this.getPrimero();
        while(tmp1.getX() < nodoNuevo.getX()){
            tmp1 = tmp1.getSiguiente();
        }

        tmp2 = tmp1.getAnterior();
        tmp2.setSiguiente(nodoNuevo);
        nodoNuevo.setSiguiente(tmp1);
        nodoNuevo.setAnterior(tmp2);
        tmp1.setAnterior(nodoNuevo);
    }

    insertarFinal = (nodoNuevo) => {

        this.getUltimo().setSiguiente(nodoNuevo);
        nodoNuevo.setAnterior(this.getUltimo());
        this.setUltimo(nodoNuevo);
    }


    delete = (x) => {

        if(this.vacia()==true){
            console.log("Empty!")

        }else{

            if(this.getPrimero().getX() == x){ // Eliminar al Inicio
                if(this.getPrimero().getSiguiente() != null){

                    let temp = this.getPrimero().getSiguiente();
                    this.getPrimero().setSiguiente(null);
                    temp.setAnterior(null);
                    this.setPrimero(temp);

                }else{

                    this.setPrimero(null);
                    this.setUltimo(null);
                }
            }else if (this.getUltimo().getX() == x){ // Eliminar en Final

                if(this.getUltimo().getAnterior() != null){

                    let temp = this.getUltimo().getAnterior();
                    this.getUltimo().setAnterior(null);
                    temp.setSiguiente(null);
                    this.setUltimo(temp);
                }else{

                    this.setPrimero(null);
                    this.setUltimo(null);
                }
                
            }else{  // Eliminar en Medio
                
                let nodo_actual = this.getPrimero()
                do {
                    console.log(this.getPrimero().getX())
                    if (nodo_actual.getX() == x){
                        
                        let anterior = nodo_actual.getAnterior()
                        let siguiente = nodo_actual.getSiguiente()
                        
                        nodo_actual.setSiguiente(null)
                        nodo_actual.setAnterior(null)
                        anterior.setSiguiente(siguiente)
                        siguiente.setAnterior(anterior)

                        return console.log("Delete!");
                     
                    }
                    nodo_actual = nodo_actual.getSiguiente();

                } while (nodo_actual != null);

            }
        }

    }


    print = () => {
        if(this.vacia()==false) {
            let tmp = this.getPrimero();
            while (tmp != null) {
                console.log(" Cabecera x: " + tmp.getX());
                tmp = tmp.getSiguiente();
            }
        }else{
            console.log("Empty");
        }
    }

    busqueda = (x) => {
        if(this.vacia()==false){
            let tmp = this.getPrimero();
            while(tmp != null){
                if(tmp.getX() == x){
                    return tmp;
                }
                tmp = tmp.getSiguiente();
            }
        }
        return null;
    }


    vacia = () => {
        if (this.getPrimero() == null){
            return true;
        }else{
            return false;
        }
    }


    getPrimero = () => { return this.primero; }
    setPrimero = (primero) => { this.primero = primero; }
    getUltimo = () => { return this.ultimo; }
    setUltimo = (ultimo) => { this.ultimo = ultimo; }

}


export default ListaCabeceraColumnas;
// module.exports = ListaCabeceraColumnas;
