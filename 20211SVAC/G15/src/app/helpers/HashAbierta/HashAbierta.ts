
import { listadelistas } from './listadelistas'
import { listaPrincipal } from './listaPrincipal'
export class HashAbierta{
    private slots: number;
    private lista= [];
    private constante: number
    private factorCarga;
    private cantidadInsertada;
    private minimo;
    private maximo;
    private datos=[]
    private vector=[]
     
    constructor(slots, minimo, maximo){
        this.slots= slots;
        this.lista=[];
        this.constante = 0.1625277911;
        this.factorCarga=0.0;
        this.cantidadInsertada=0;
        this.minimo=minimo;
        this.maximo=maximo;

        for (let index = 0; index < slots; index++) {
            this.lista.push(null);
            
        }
        
    }

    modificar(key,nuevo){
        for (let index = 0; index < this.lista.length; index++) {
            if (this.lista != null) {
                for (let index1 = 0; index1 < this.lista[index].listaprincipal.length; index1++) {
                    if (this.lista[index].listaprincipal[index1].key ==key) {
                        console.log(this.lista[index].listaprincipal)
                        console.log("correcto")
                        this.lista[index].listaprincipal[index1].key=nuevo
                        //this.lista.splice(posicion,index1)
                        console.log(this.lista[index].listaprincipal)
                        return null
                        
                    }
                
                }
            }
            
            
        }

    }
    eliminar(key,posicion){
       // let posicion = this.funcionDivision(this.metodoAscii(key)) 
        for (let index = 0; index < this.lista.length; index++) {
            if (this.lista != null) {
                for (let index1 = 0; index1 < this.lista[posicion].listaprincipal.length; index1++) {
                    if (this.lista[posicion].listaprincipal[index1].key ==key) {
                        console.log(this.lista[posicion].listaprincipal)
                        console.log("correcto")
                        this.lista[posicion].listaprincipal[index1].key=""
                        //this.lista.splice(posicion,index1)
                        console.log(this.lista[posicion].listaprincipal)
                        return null
                        
                    }
                
                }
            }
            
            
        }
     /*   this.lista.forEach (listaPrincipal =>{
            if (listaPrincipal != null) {               
                let datos=""
               // console.log("lista",this.lista[posicion].listaprincipal)
               listaPrincipal.listaprincipal.forEach(listadelistas => {
                    if(listadelistas.key==key){
                        console.log("Dato Eliminado", key)
                        listadelistas.key.splice(listadelistas.key)
                        
                        return null
                    }
               
                
            });
               

                console.log(this.lista[posicion].listaprincipal)
                
            }
        })*/
        
               

       
        
    }
    insertar(k,  key, posicion){
       // let posicion = this.funcionMultiplicacion(k);
        if(this.lista[posicion]!=null){ 
            let nuevoNodo = new listadelistas(key); //nueva llave
            this.lista[posicion].listaprincipal.push(nuevoNodo);// union en el nodo de la lista principal
           
        } else{
            let newNodo = new listaPrincipal(posicion);
            newNodo.listaprincipal.push(new  listadelistas(key));
            this.lista[posicion]=newNodo
            this.cantidadInsertada++;
            this.factorCarga= this.cantidadInsertada/this.slots
            
        }
        if (this.factorCarga> this.maximo) {
            this.rehashing(posicion);
            
        }
        return posicion;
    }
    rehashing(posicion){
        let aux = this.slots
        let factor
        while (factor <= this.minimo) {
            aux++;
            factor=this.cantidadInsertada/aux; 
            
        }

        let vectorTemporal = []
        this.cantidadInsertada=0

        for (let index = 0; index < aux; index++) {
            vectorTemporal.push(null)
            
        }

        let auxiliar = this.lista
        this.lista = vectorTemporal
        this.slots=aux

        auxiliar.forEach (listaPrincipal =>{
            if (listaPrincipal !=null) {
                listaPrincipal.forEach(listadelistas => {
                    this.insertar(this.metodoAscii(listadelistas.key),listadelistas.key,posicion)
                });
                
                
            }
            
        })

    }


    funcionSimple(key){
        
        let k
        
            let dato= Math.random() * ((key+2900) - key) + key;
            console.log("dato aleatorio",dato)
            k= key/dato
            console.log("k", k)
        
       
        let lugar =Math.round( k *(this.slots));
        console.log("posicion",lugar)
        if(lugar>this.slots){
            return lugar - this.slots;
        }
        return lugar;

    }
    funcionDivision(k){
       
        let lugar = k % (this.slots);
        if(lugar>this.slots){
            return lugar - this.slots;
        }
        return lugar;
    }

    funcionMultiplicacion(k){
        let lugar = Math.trunc(this.slots*((k*this.constante) - Math.trunc(k*this.constante) ));
        console.log("normal",(k*this.constante))
        console.log("Fraccionario",Math.trunc(k*this.constante))
        if(lugar>this.slots){
            return lugar - this.slots;
        }
        return lugar;
    }

    metodoAscii(dato){
        let convertir=0;
        for (let index = 0; index < dato.length; index++) {
            convertir += dato.charCodeAt(index);
            
        }
        return convertir;
    }

    imprimir(){
        let datos =""
        this.lista.forEach (listaPrincipal =>{
            if (listaPrincipal != null) {
                datos =""
                listaPrincipal.listaprincipal.forEach(listadelistas => {
                    
                    datos += " "+ listadelistas.key
                    this.datos.push(listadelistas.key)
                    
                });
                console.log("indice", listaPrincipal.indice, "Valores:", datos)
                //console.log("imprimo la lista", this.lista)
                this.vector=this.lista
            }
            else{
                console.log("indice", null)
            }
        })
       // for (let index = 0; index < vector.length; index++) {
           
           return this.vector  
    }

    enviarKey(){
        return this.datos

    }



    

}