class ListaVertical {
    
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

    insertar = (nodoNuevo) => {
        if(this.vacia()==true){
            this.setPrimero(nodoNuevo);
            this.setUltimo(nodoNuevo);

        }else{

            if(nodoNuevo.getY() < this.getPrimero().getY()){ // Agrega al Inicio
                this.insertarInicio(nodoNuevo);
            }else if (nodoNuevo.getY() > this.getUltimo().getY()){ // Agrega en Final
                this.insertarFinal(nodoNuevo);
            }else{  // Agrega en Medio
                this.insertarMedio(nodoNuevo);
            }
        }
    }

    
    insertarInicio = (nodoNuevo) => {
        this.getPrimero().setArriba(nodoNuevo)
        nodoNuevo.setAbajo(this.getPrimero());
        this.setPrimero(nodoNuevo)
    }

    insertarMedio = (nodoNuevo) => {

        let tmp1 = null;
        let tmp2 = null;
        tmp1 = this.getPrimero();
        while(tmp1.getY() < nodoNuevo.getY()){
            tmp1 = tmp1.getAbajo();
        }

        tmp2 = tmp1.getArriba();
        tmp2.setAbajo(nodoNuevo);
        nodoNuevo.setAbajo(tmp1);
        nodoNuevo.setArriba(tmp2);
        tmp1.setArriba(nodoNuevo);
    }

    insertarFinal = (nodoNuevo) => {

        this.getUltimo().setAbajo(nodoNuevo);
        nodoNuevo.setArriba(this.getUltimo());
        this.setUltimo(nodoNuevo);
    }



    delete = (y) => {

        if(this.vacia()==true){
            console.log("Empty!")
        }else{

            if(this.getPrimero().getY() == y){ // Eliminar al Inicio
                if(this.getPrimero().getAbajo() != null){

                    let temp = this.getPrimero().getAbajo();
                    this.getPrimero().setAbajo(null);
                    temp.setArriba(null);
                    this.setPrimero(temp);
                    return true;

                }else{

                    this.setPrimero(null);
                    this.setUltimo(null);
                    return true;
                }
            }else if (this.getUltimo().getY() == y){ // Eliminar en Final

                if(this.getUltimo().getArriba() != null){

                    let temp = this.getUltimo().getArriba();
                    this.getUltimo().setArriba(null);
                    temp.setAbajo(null);
                    this.setUltimo(temp);
                    return true;
                }else{

                    this.setPrimero(null);
                    this.setUltimo(null);
                    return true;
                }
                
            }else{  // Eliminar en Medio
                
                let nodo_actual = this.getPrimero().getAbajo();
                let anterior = this.getPrimero();
                do {
                    console.log(nodo_actual)
                    if (nodo_actual.getY() == y){
                        
                        let siguiente = nodo_actual.getAbajo();

                        nodo_actual.setAbajo(null)
                        nodo_actual.setArriba(null)
                        anterior.setAbajo(siguiente)
                        siguiente.setArriba(anterior)

                        console.log("Delete!");
                        return true;
                     
                    }
                    nodo_actual = nodo_actual.getAbajo();
                    anterior = anterior.getAbajo();

                } while (nodo_actual != null);

            }


        }

        return null

    }




    print = () => {
        if(this.vacia()==false) {
            let tmp = this.getPrimero();
            while (tmp != null) {
                console.log("dato: " + tmp.getDato() + " posicion (x,y): " + tmp.getX()  +  "," + tmp.getY());
                tmp = tmp.getAbajo();
            }
        }else{
            console.log("Empty");
        }
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


export default ListaVertical;
// module.exports = ListaVertical;