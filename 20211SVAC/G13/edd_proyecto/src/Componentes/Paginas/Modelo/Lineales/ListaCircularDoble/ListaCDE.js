import Nodo from './Nodo.js'
// const Nodo = require('./Nodo.js');

class ListaCircularDE{
	primero=null;
	ultimo=null;

	constructor(){
		this.primero = null;
        this.ultimo = null;
        this.size = 0;
	}

    set_primero=(primero)=>{this.primero=primero;}
    get_primero=()=>{ return this.primero;}
    set_ultimo=(ultimo)=>{this.ultimo=ultimo;}
    get_ultimo=()=>{ return this.ultimo;}
    vacia = () => {
        if (this.get_primero() == null){
            return true;
        }else{
            return false;
        }
    }

	insertar = (valor) =>{
		let nodo_nuevo = new Nodo(valor);
        if (this.vacia() == true){
		    this.set_primero(nodo_nuevo);
            this.set_ultimo(nodo_nuevo);
            this.get_primero().set_siguiente(this.get_ultimo());
            this.get_ultimo().set_siguiente(this.get_primero());
        }else{
            this.get_ultimo().set_siguiente(nodo_nuevo);
            nodo_nuevo.set_anterior(this.get_ultimo());
            nodo_nuevo.set_siguiente(this.get_primero());
            this.set_ultimo(nodo_nuevo);
        }
        this.size ++;
	}
	insertar_ultimo = (valor) => {
		let nodo_nuevo = new Nodo(valor);
        if (this.vacia() == true){
		    this.set_primero(nodo_nuevo);
            this.set_ultimo(nodo_nuevo);
            this.get_primero().set_siguiente(this.get_ultimo());
            this.get_ultimo().set_siguiente(this.get_primero());
        }else{
            this.get_ultimo().set_siguiente(nodo_nuevo);
            nodo_nuevo.set_anterior(this.get_ultimo());
            nodo_nuevo.set_siguiente(this.get_primero());
            this.set_ultimo(nodo_nuevo);
        }
        this.size ++;
	}
	insertar_inicio = (valor) => {
		let nodo_nuevo = new Nodo(valor);
        if (this.vacia() == true){
		    this.set_primero(nodo_nuevo);
            this.set_ultimo(nodo_nuevo);
            this.get_primero().set_siguiente(this.get_ultimo());
            this.get_ultimo().set_siguiente(this.get_primero());
        }else{
        	nodo_nuevo.set_siguiente(this.get_primero());
        	nodo_nuevo.set_anterior(this.get_ultimo());
        	this.get_ultimo().set_siguiente(nodo_nuevo)
        	this.get_primero().set_anterior(nodo_nuevo)
        	this.set_primero(nodo_nuevo)
        }
        this.size ++;
	}
	eliminar = (dato) =>{
		if (this.vacia() == false){
            if (this.get_primero().get_dato() == dato){ //Eliminando al primero
                if (this.get_primero().get_siguiente() != this.get_primero()){                   
                    let aux = this.get_primero().get_siguiente()
                    this.get_primero().get_siguiente().set_anterior(this.get_ultimo())
                    this.get_ultimo().set_siguiente(aux)
                    this.get_primero().set_siguiente(null)
                    this.get_primero().set_anterior(null)
                    this.set_primero(aux)
                    this.size --;
                }else{
                    this.set_primero(null)
                    this.set_ultimo(null)
                    this.size --;
                }

            }else if (this.get_ultimo().get_dato() == dato){  //Eliminando al ultimo

                if (this.get_ultimo().get_anterior() != this.get_ultimo()){

                    let aux = this.get_ultimo().get_anterior()
                    this.get_ultimo().get_anterior().set_siguiente(this.get_primero())
                    this.get_primero().set_anterior(aux)
                    this.get_ultimo().set_anterior(null)
                    this.get_ultimo().set_siguiente(null)
                    this.set_ultimo(aux);
                    this.size --;
                }else{
                    this.set_primero(null)
                    this.set_ultimo(null)
                    
                    this.size --;
                }


            }else{ //Eliminando En Medio
                let nodo_actual = this.get_primero().get_siguiente();
                let anterior = this.get_primero();
                do {

                    if (nodo_actual.get_dato() == dato){
                        
                        let siguiente = nodo_actual.get_siguiente()

                        nodo_actual.set_siguiente(null)
                        nodo_actual.set_anterior(null)
                        anterior.set_siguiente(siguiente)
                        siguiente.set_anterior(anterior)
                        this.size --;
                     
                    }
                    nodo_actual = nodo_actual.get_siguiente();
                    anterior = anterior.get_siguiente();

                } while (nodo_actual != null);
            }

        }
	}
    Imprimir=()=>{
        var i = 0;
        let nodo_actual = this.get_primero();
        while(i<this.size){
            console.log(nodo_actual.get_dato());
            nodo_actual = nodo_actual.get_siguiente();
            i++;
        }
    }
    update = (dato, cambio) => {
        let nodo_actual = this.get_primero();
        if (this.vacia() == false){
            let i = 0;
            while(i<this.size){
                if (nodo_actual.get_dato() == dato){
                    nodo_actual.set_dato(cambio);
                }
                nodo_actual = nodo_actual.get_siguiente()
                i++;
            }
        }
    }
    search=(dato)=>{
        let nodo_actual = this.get_primero()
        if (this.vacia() == false){
            let i = 0;
            while(i<this.size){
                if (nodo_actual.get_dato() == dato){
                    console.log("Data found! " + nodo_actual.get_dato());
                    console.log(i);
                    return i
                }
                nodo_actual = nodo_actual.get_siguiente();
                i++;
            }
        }else{ 
            return false;
        }
        return false;
    }
    setNodesDataSet = () => {
        let nodo_actual = this.get_primero();
        var dot = [];
        if (this.vacia() == false){
            let i = 0
            while(i<this.size){
                if(i==0){
                    let etiqueta=nodo_actual.get_dato()+"\n Inicio"
                    dot.push({id:i, label: etiqueta});
                }else if(i+1==this.size){
                    let etiqueta=nodo_actual.get_dato()+"\n Final"
                    dot.push({id:i, label: etiqueta});
                }else{
                    dot.push({id:i, label: nodo_actual.get_dato()});  
                }
                nodo_actual = nodo_actual.get_siguiente();
                i++;
            } 
        }
        return dot;
    } 
    setEdgesDataSet = () => {
        let nodo_actual = this.get_primero();
        var dot = [];
        let idinicio=this.size+1;
        let idfinal=this.size+2;
        if (this.vacia() == false){
            let i = 0;
            while(i<this.size){
                let nodoUno = parseInt(i)
                let nodoDos = parseInt(nodoUno) + parseInt(1)
                if (i==0){
                    dot.push({from:0, to:1, arrows: "to"});
                    dot.push({from:1, to:0, arrows: "to"});
                }
                if ( nodoUno!= false && nodoDos != false){
                    dot.push({from:parseInt(nodoUno), to:parseInt(nodoDos), arrows: "to"});
                    dot.push({from:parseInt(nodoDos), to:parseInt(nodoUno), arrows: "to"});
                }
                if ((i+1)==this.size){
                    dot.push({from:i, to:0, arrows: "to"});
                    dot.push({from:0, to:i, arrows: "to"});
                }
                nodo_actual = nodo_actual.get_siguiente();
                i ++;
            }
        }
        return dot;
    }
}

export default ListaCircularDE;
//module.exports = ListaCircularDE;