import NodoSimple from "./nodo-simple";
import ListaPadre from "./lista-padre";     
export default class ListaCircularSimple implements ListaPadre {
    inicio: NodoSimple;
    final:NodoSimple;
    longitud:number;
    constructor() {
        this.inicio = null;
        this.final=null;
        this.longitud=0;
      }
    estaVacia(): boolean {
        return this.longitud==0;
    }
    toArray(): any[] {
        const array = new Array(this.longitud);
        let aux = this.inicio;
                // Recorre la lista hasta lleger al nodo anterior al eliminar.
                for (let i = 0; i < this.longitud; i++) {
                    array[i] = aux.getData();
                    aux = aux.getNext();
                }
                return array;
    }
    size(): number {
        return this.longitud;
    }
    agregarAlInicio(data: any): void {
        if(data){
            let newNode = new NodoSimple(data)
            if (this.longitud == 0) {
                this.final = newNode
                this.inicio = newNode 
                this.final.setNext(this.inicio)
            }else {
                newNode.setNext ( this.inicio );
                this.inicio = newNode
                this.final.setNext(this.inicio)
            }
            this.longitud += 1
        }
    }
    agregarAlFinal(data: any): void {
        if(data){
            let newNode = new NodoSimple(data)
            if (this.longitud == 0) {
                this.final = newNode
                this.inicio = newNode 
            }else {
                this.final.setNext( newNode);
                this.final = newNode
                this.final.setNext(this.inicio)
            }
            this.longitud += 1
        }
    }
    borrarAlInicio() {
        this.removeAt(0);
    }
    borrarAlFinal() {
        this.removeAt(this.longitud);
    }
    push(data: any): void {
        throw new Error("Method not implemented.");
    }
    pop() {
        throw new Error("Method not implemented.");
    }
    actualizar(posicion, newData){
        // Verifica si la posición ingresada se encuentre en el rango
        // >= 0 y < que el numero de elementos del la lista.
        if(posicion>=0 && posicion<this.longitud){
            // Consulta si el nodo a eliminar es el primero.
            if(posicion == 0){
                // Alctualiza el valor delprimer nodo.
                this.inicio.setData(newData);
            }
            else{
                // En caso que el nodo a eliminar este por el medio 
                // o sea el ultimo
                let aux = this.inicio;
                // Recorre la lista hasta lleger al nodo anterior al eliminar.
                for (let i = 0; i < posicion; i++) {
                    aux = aux.getNext();
                }
                // Alctualiza el valor del nodo.
                aux.setData(newData);
            }
        }
    }
    removeAt( posicion ){
        if(posicion>=0 && posicion<this.longitud){
            // Consulta si el nodo a eliminar es el primero
            if(posicion == 0){
                // Elimina el primer nodo apuntando al siguinte.
                this.inicio = this.inicio.getNext();
                // Apuntamos con el ultimo nodo de la lista al inicio.
                this.final.setNext(this.inicio);
            }
            // En caso que el nodo a eliminar este por el medio 
            // o sea el ultimo
            else{
                // Crea una copia de la lista.
                let aux = this.inicio;
                // Recorre la lista hasta lleger al nodo anterior al eliminar.
                for (let i = 0; i < posicion-1; i++) {
                    aux = aux.getNext();
                }
                if (aux.getNext() == this.final) {
                    aux.setNext(this.inicio);
                    this.final = aux;
                } else {
                    // Guarda el nodo siguiente del nodo a eliminar.
                    let siguiente = aux.getNext();
                    // Enlaza el nodo anterior al de eliminar con el 
                    // sguiente despues de el.
                    aux.setNext(siguiente.getNext ());  
                    // Actualizamos el puntero del ultimo nodo
                }
            }
            // Disminuye el contador de tamaño de la lista.
            this.longitud--;
        }
      }
}