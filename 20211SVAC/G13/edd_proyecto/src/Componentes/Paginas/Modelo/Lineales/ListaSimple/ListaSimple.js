import Nodo from './Nodo.js'
import fs from 'fs';
// const Nodo = require('./Nodo.js');

class ListaSimple{

    cabeza = null

    constructor(){
        this.cabeza = null;
        this.ultimo = null;
    }


    insertar = (dato) =>{
        let nodo_nuevo = new Nodo(dato);
        if (this.get_vacia() == true){
            this.set_cabeza(nodo_nuevo);
            this.set_ultimo(nodo_nuevo);
        }else{

            this.get_ultimo().set_siguiente(nodo_nuevo);
            this.set_ultimo(nodo_nuevo);

        }

    }
    
    insertar_inicio = (dato) =>{
        let nodo_nuevo = new Nodo(dato)

        nodo_nuevo.set_siguiente(this.get_cabeza())
        this.set_cabeza(nodo_nuevo)
    }

    insertar_ultimo = (dato) =>{
        let nodo_nuevo = new Nodo(dato)
        this.get_ultimo().set_siguiente(nodo_nuevo)
        this.set_ultimo(nodo_nuevo)

    }

    eliminar = (dato) =>{

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

    update = (dato, cambio) =>{
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

    search = (dato) =>{
        let nodo_actual = this.get_cabeza()
        
        if (this.get_vacia() == false){
            let i = 0;
            do{

                if (nodo_actual.get_dato() == dato){
                    console.log("Data found! " + nodo_actual.get_dato()+"-> Posicion"+i);
                    return i;
                }
                i ++;
                nodo_actual = nodo_actual.get_siguiente();

            }while(nodo_actual != null);

        }else{ 
            console.log("Empty!"); 
            return false;
    
        }

        console.log("Data not found!");
        return false;
    }

    mostrar = () => {
        let nodo_actual = this.get_cabeza();
        if (this.get_vacia() == false){

            do {
                console.log(nodo_actual.get_dato());
                nodo_actual = nodo_actual.get_siguiente();
            } while (nodo_actual != null);
        }
    }
    
    get_vacia = () => {
        if (this.get_cabeza() == null){
            return true;
        }else{
            return false;
        }  
    }

    setNodesDataSet = () => { // Esto Genera los nodos de Vis.

        let nodo_actual = this.get_cabeza();
        var dot = [];
        if (this.get_vacia() == false){
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

        let nodo_actual = this.get_cabeza();
        var dot = [];
        if (this.get_vacia() == false){
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

    generateJSON = () => {

        var dic = {};

        dic.categoria = "Estructura Lineal"
        dic.nombre = "Lista Simplemente/doblemente/circular simplemente/circular doblemente Enlazada"
        var dot = []
        if (this.get_vacia() == false){
            let nodo_actual = this.get_cabeza();
            do{
                if(typeof(parseInt(nodo_actual.get_dato())) == "number"  && 0 <= parseInt(nodo_actual.get_dato())){
                    
                    dot.push(parseInt(nodo_actual.get_dato()))
                     
                }else if (typeof(nodo_actual.get_dato()) == "string" ){

                    dot.push(nodo_actual.get_dato().toString())

                } 

                nodo_actual = nodo_actual.get_siguiente();
            }while(nodo_actual != null);
        }
        dic.valores = dot;
        console.log(dic)
        var dictstring = JSON.stringify(dic);
        console.log(dictstring)
        // var fs = require('fs')
        fs.writeFile("thing.json", dictstring, function(err, result) {
            if(err) console.log('error', err);
        });
    }



    get_cabeza = () =>{ return this.cabeza; }
    set_cabeza = (cabeza) =>{ this.cabeza = cabeza; }
    get_ultimo = () => { return this.ultimo; }
    set_ultimo = (ultimo) => { this.ultimo = ultimo; }
}

export default ListaSimple;
//module.exports = ListaSimple;

