import ListaCabeceraFilas from './ListaCabeceraFilas.js';
// const ListaCabeceraFilas = require('./ListaCabeceraFilas.js')
import ListaCabeceraColumnas from './ListaCabeceraColumnas.js';
// const ListaCabeceraColumnas = require('./ListaCabeceraColumnas.js')
import NodoCabeceraFila from './NodoCabeceraFila.js';
// const NodoCabeceraFila = require('./NodoCabeceraFila.js')
import NodoCabeceraColumna from './NodoCabeceraColumna.js';
// const NodoCabeceraColumna = require('./NodoCabeceraColumna.js')
import NodoOrtogonal from './NodoOrtogonal.js';
// const NodoOrtogonal = require('./NodoOrtogonal.js')

class MatrizOrtogonal {

    constructor() {
        this.filas = new ListaCabeceraFilas();
        this.columnas = new ListaCabeceraColumnas();
        this.estado = false;
    }

    insertar = (x, y, dato) =>{
        
        var nodoNuevo = new NodoOrtogonal(x, y, dato);
        if(this.getColumna().busqueda(x) == null){ // VERIFICA QUE EXISTA LA CABECERA COLUMNAS.
            this.getColumna().insertar(new NodoCabeceraColumna(x));
        }
        if(this.getFila().busqueda(y) == null){ // VERIFICA QUE EXISTA LA CABECERA FILAS.
            this.getFila().insertar(new NodoCabeceraFila(y));
        }

        this.getColumna().busqueda(x).getColumna().insertar(nodoNuevo);
        this.getFila().busqueda(y).getFila().insertar(nodoNuevo);

    }

    print = () => {

        var nodo_cabecera = this.getFila().getPrimero();
        var nodo_actual = null;
        if(nodo_cabecera != null){
            do{
                console.log(nodo_cabecera.getY());
                nodo_actual = nodo_cabecera.getFila().getPrimero();
                if(nodo_actual != null){
                    do{
                        console.log("dato: " + nodo_actual.getDato() + " posicion (x,y): " + nodo_actual.getX()  +  "," + nodo_actual.getY());
                        nodo_actual = nodo_actual.getDerecha();
                    }while(nodo_actual != null);   
                }   
                nodo_cabecera = nodo_cabecera.getSiguiente();
            }while(nodo_cabecera != null);
        }
            

        console.log("-")
        nodo_cabecera = this.getColumna().getPrimero();
        nodo_actual = null;
        if(nodo_cabecera != null){
             do{
                console.log(nodo_cabecera.getX());
                let nodo_actual = nodo_cabecera.getColumna().getPrimero();
                if(nodo_actual != null){
                     do{
                        console.log("dato: " + nodo_actual.getDato() + " posicion (x,y): " + nodo_actual.getX()  +  "," + nodo_actual.getY());
                        nodo_actual = nodo_actual.getAbajo();
                    }while(nodo_actual != null);   
                }
                nodo_cabecera = nodo_cabecera.getSiguiente();
            }while(nodo_cabecera != null);
        }
           
    }

    search = (x, y, dato) => {

        var nodo_cabecera = this.getFila().getPrimero();
        var nodo_actual = null;
        if (nodo_cabecera != null){
            do{
               
                nodo_actual = nodo_cabecera.getFila().getPrimero();
                if (nodo_actual != null){
                    do{
                    if (nodo_actual.getDato() == dato && nodo_actual.getX() == x && nodo_actual.getY() == y){
                        console.log("dato: " + nodo_actual.getDato() + " posicion (x,y): " + nodo_actual.getX()  +  "," + nodo_actual.getY());
                        return nodo_actual    
                    }
                    nodo_actual = nodo_actual.getDerecha();
                }while(nodo_actual != null);   
                }
                
                
                nodo_cabecera = nodo_cabecera.getSiguiente();
                
            }while(nodo_cabecera != null);
        }
        console.log("Data not Found")
        return null
    }

    getData = (x, y) => {

        var nodo_cabecera = this.getFila().getPrimero();
        var nodo_actual = null;
        if (nodo_cabecera != null){
            do{
               
                nodo_actual = nodo_cabecera.getFila().getPrimero();
                if (nodo_actual != null){
                    do{
                    if (nodo_actual.getX() == x && nodo_actual.getY() == y){
                        console.log("dato: " + nodo_actual.getDato() + " posicion (x,y): " + nodo_actual.getX()  +  "," + nodo_actual.getY());
                        return nodo_actual.getDato()    
                    }
                    nodo_actual = nodo_actual.getDerecha();
                }while(nodo_actual != null);   
                }
                
                
                nodo_cabecera = nodo_cabecera.getSiguiente();
                
            }while(nodo_cabecera != null);
        }
        console.log("Data not Found")
        return null
    }


    update = (x, y, dato, cambio) => {


        var nodo_cabecera = this.getFila().getPrimero();
        var nodo_actual = null;
        if(nodo_cabecera != null){
            do{
                nodo_actual = nodo_cabecera.getFila().getPrimero();
                if (nodo_actual != null){
                    do{
                        if (nodo_actual.getDato() == dato && nodo_actual.getX() == x && nodo_actual.getY() == y){
                            nodo_actual.setDato(cambio)
                            console.log("UPDATE -> dato: " + nodo_actual.getDato() + " posicion (x,y): " + nodo_actual.getX()  +  "," + nodo_actual.getY());
                            return nodo_actual    
                        }
                        nodo_actual = nodo_actual.getDerecha();
                    }while(nodo_actual != null);   
                }
                nodo_cabecera = nodo_cabecera.getSiguiente();
                
            }while(nodo_cabecera != null);
        }
        console.log("Data not Found")
        return null


    }

    delete = (x, y, dato) => {

        if(this.search(x, y, dato) != null){
            this.getColumna().busqueda(x).getColumna().delete(y)
            this.getFila().busqueda(y).getFila().delete(x);
        }
        if(this.getColumna().busqueda(x).getColumna().getPrimero() == null){ 
            this.getColumna().delete(x); 
        }
        if (this.getFila().busqueda(y).getFila().getPrimero()==null){ 
            this.getFila().delete(y); 
        }
    }

    setNodesDataSet = () => { // Esto Genera los nodos de Vis.

        var nodo_cabecera = this.getColumna().getPrimero();
        var nodo_actual = null;
        var dot = [];
        var contador = 1;

        if(nodo_cabecera != null){
            do{
                if(this.estado == true){
                    dot.push({id:parseInt(contador), label:"Fila: "+String(nodo_cabecera.getX()), x:0, y:nodo_cabecera.getX()});
                }
                contador++;
                let nodo_actual = nodo_cabecera.getColumna().getPrimero();
                if(nodo_actual != null){
                    do{
                        dot.push({id:parseInt(contador), label:"("+String(nodo_actual.getX())+","+String(nodo_actual.getY())+")"+String(nodo_actual.getDato()), x: parseInt(nodo_actual.getX()), y:parseInt(nodo_actual.getY())}); 
                        contador++;
                        nodo_actual = nodo_actual.getAbajo();
                    }while(nodo_actual != null);   
                }
                nodo_cabecera = nodo_cabecera.getSiguiente();
            }while(nodo_cabecera != null);
        }

        nodo_cabecera = this.getFila().getPrimero();
        nodo_actual = null;
        if(nodo_cabecera != null){
            
            do{
                if(this.estado==true){
                dot.push({id:parseInt(contador), label: "Columna: "+String(nodo_cabecera.getY()), x:nodo_cabecera.getY(), y:0});
                } 
                contador++;
                nodo_actual = nodo_cabecera.getFila().getPrimero();    
                if (nodo_actual != null){
                    do{
                        contador++;
                        nodo_actual = nodo_actual.getDerecha();
                    }while(nodo_actual != null);   
                }

                nodo_cabecera = nodo_cabecera.getSiguiente();
            }while(nodo_cabecera != null);
        }

        return dot;

    }

    getNodesDataSet = (x,y,dato) =>{
        var nodo_cabecera = this.getColumna().getPrimero();
        var nodo_actual = null;
        var contador = 1;

        if(nodo_cabecera != null){
            do{
                contador++;
                let nodo_actual = nodo_cabecera.getColumna().getPrimero();
                if(nodo_actual != null){
                    do{ 
                        if (nodo_actual.getX()==x && nodo_actual.getY()==y && nodo_actual.getDato()==dato){
                            // console.log(nodo_actual.getX()+","+nodo_actual.getY()+"->("+contador+")"+nodo_actual.getDato())
                            return contador
                        }
                        contador++;
                        nodo_actual = nodo_actual.getAbajo();
                    }while(nodo_actual != null);   
                }
                nodo_cabecera = nodo_cabecera.getSiguiente();
            }while(nodo_cabecera != null);
        }

        return null
    }

    setEdgesDataSet = () => {

        var nodo_cabecera = this.getColumna().getPrimero();
        var nodo_actual = null;
        var dot = [];
        var contador = 1;
        var tempContador = 1;

        if(nodo_cabecera != null){
            do{
                tempContador = contador
                contador++;
                let nodo_actual = nodo_cabecera.getColumna().getPrimero();
                if(nodo_actual != null){
                    let aux = this.getNodesDataSet(nodo_actual.getX(), nodo_actual.getY(), nodo_actual.getDato())
                    if(aux!=null){
                        dot.push({from:parseInt(tempContador), to:aux, arrows: "to"});
                    }
                    do{

                        if(nodo_actual.getAbajo()!=null){
                            dot.push({from:parseInt(contador), to:parseInt(contador+1), arrows: "to"});
                            dot.push({from:parseInt(contador+1), to:parseInt(contador), arrows: "to"});
                        } 
                        contador++;
                        nodo_actual = nodo_actual.getAbajo();
                    }while(nodo_actual != null);   
                }

                if (nodo_cabecera.getSiguiente() != null){
                        dot.push({from:parseInt(tempContador), to:parseInt(contador), arrows: "to"});
                }
                nodo_cabecera = nodo_cabecera.getSiguiente();
            }while(nodo_cabecera != null);
        }

        nodo_cabecera = this.getFila().getPrimero();
        nodo_actual = null;
        if(nodo_cabecera != null){
            
            do{

                tempContador = contador;
                contador++;
                nodo_actual = nodo_cabecera.getFila().getPrimero();    
                if (nodo_actual != null){
                    let aux = this.getNodesDataSet(nodo_actual.getX(), nodo_actual.getY(), nodo_actual.getDato())
                    if(aux!=null){
                        dot.push({from:parseInt(tempContador), to:aux, arrows: "to"});
                    }
                    do{
                        if(nodo_actual.getDerecha()!=null){
                            console.log("prro")
                            let auxNodoUno = this.getNodesDataSet(nodo_actual.getX(), nodo_actual.getY(), nodo_actual.getDato())
                            let auxNodoDos = this.getNodesDataSet(nodo_actual.getDerecha().getX(), nodo_actual.getDerecha().getY(), nodo_actual.getDerecha().getDato())
                            console.log(nodo_actual.getDato() +" "+auxNodoDos+"-> " + nodo_actual.getDerecha().getDato()+ " "+auxNodoUno)
                            dot.push({from:parseInt(auxNodoDos), to:parseInt(auxNodoUno), arrows: "to"});
                            dot.push({from:parseInt(auxNodoUno), to:parseInt(auxNodoDos), arrows: "to"});
                        }
                        contador++;
                        nodo_actual = nodo_actual.getDerecha();
                    }while(nodo_actual != null);   
                }
                if (nodo_cabecera.getSiguiente() != null){
                        dot.push({from:parseInt(tempContador), to:parseInt(contador), arrows: "to"});
                }

                nodo_cabecera = nodo_cabecera.getSiguiente();
            }while(nodo_cabecera != null);
        }

        return dot;
    }

    desactivarEncabezado = (state) => {
        if(state=="True"){
            this.estado = true;
        }else if(state=="False"){
            this.estado = false;
        }
    }

    getColumna = () =>{ return this.columnas; }
    setColumna = (columna) => { this.columnas = columna; }
    getFila = () =>{ return this.filas; }
    setFila = (fila) => { this.filas = fila; }

}

export default MatrizOrtogonal;
// module.exports = MatrizOrtogonal;
