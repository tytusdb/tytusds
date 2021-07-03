class ListaHorizontal {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

    insertar = (nodoNuevo) => {
        if(this.vacia()==true){
            this.setPrimero(nodoNuevo);
            this.setUltimo(nodoNuevo);
        }else{
            if(nodoNuevo.getX() < this.getPrimero().getX()){ // Agregar inicio
                this.insertarInicio(nodoNuevo);
            }else if (nodoNuevo.getX() > this.getUltimo().getX()){ // Agregar final
                this.insertarFinal(nodoNuevo);
            }else{  // Agregar medio
                this.insertarMedio(nodoNuevo);
            }
        }
    }


    insertarInicio = (nodoNuevo) => {
        this.getPrimero().setIzquierda(nodoNuevo);
        nodoNuevo.setDerecha(this.getPrimero());
        this.setPrimero(nodoNuevo);
    }

    insertarMedio = (nodoNuevo) => {
        let tmp1 = null;
        let tmp2 = null;
        tmp1 = this.getPrimero();
        while(tmp1.getX() < nodoNuevo.getX()){
            tmp1 = tmp1.getDerecha();
        }

        tmp2 = tmp1.getIzquierda();
        tmp2.setDerecha(nodoNuevo);
        nodoNuevo.setDerecha(tmp1);
        nodoNuevo.setIzquierda(tmp2);
        tmp1.setIzquierda(nodoNuevo);
    }

    insertarFinal = (nodoNuevo) => {
        this.getUltimo().setDerecha(nodoNuevo);
        nodoNuevo.setIzquierda(this.getUltimo());
        this.setUltimo(nodoNuevo);
    }

    print = () => {         
        if(this.vacia()==false) {
            let tmp = this.getPrimero();
            while (tmp != null) {
                console.log("dato: " + tmp.getDato() + " posicion (x,y): " + tmp.getX()  +  "," + tmp.getY());
                tmp = tmp.getDerecha();
            }
        }else{
            console.log("Empty");
        }
    }



    delete = (x) => {

        if(this.vacia()==true){
            console.log("Empty!")

        }else{

            if(this.getPrimero().getX() == x){ // Eliminar al Inicio
                if(this.getPrimero().getDerecha() != null){

                    let temp = this.getPrimero().getDerecha();
                    this.getPrimero().setDerecha(null);
                    temp.setIzquierda(null);
                    this.setPrimero(temp);

                }else{

                    this.setPrimero(null);
                    this.setUltimo(null);
                }
            }else if (this.getUltimo().getX() == x){ // Eliminar en Final

                if(this.getUltimo().getIzquierda() != null){

                    let temp = this.getUltimo().getIzquierda();
                    this.getUltimo().setIzquierda(null);
                    temp.setDerecha(null);
                    this.setUltimo(temp);
                }else{

                    this.setPrimero(null);
                    this.setUltimo(null);
                }
                
            }else{  // Eliminar en Medio
                
                let nodo_actual = this.getPrimero().getDerecha();
                let anterior = this.getPrimero();
                do {

                    if (nodo_actual.getX() == x){
                        
                        let siguiente = nodo_actual.getDerecha();

                        nodo_actual.setDerecha(null)
                        nodo_actual.setIzquierda(null)
                        anterior.setDerecha(siguiente)
                        siguiente.setIzquierda(anterior)

                        return console.log("Delete!");
                     
                    }
                    nodo_actual = nodo_actual.getDerecha();
                    anterior = anterior.getDerecha();

                } while (nodo_actual != null);

            }
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

export default ListaHorizontal;
// module.exports = ListaHorizontal;
