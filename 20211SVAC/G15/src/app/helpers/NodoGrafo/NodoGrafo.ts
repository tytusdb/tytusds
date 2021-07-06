export class NodoGrafo{
    
    id:any;
    altura:number
    distancia:number;
    hijos:NodoGrafo[];
    constructor(id,distancia,altura){
        this.id=id;
        this.distancia=distancia;
        this.hijos=[];
        this.altura=altura;
    }
    insertar(id,distancia, altura){
    let nodo=new NodoGrafo(id,distancia,altura);
    let bandera=true;
 
    this.hijos.forEach(hijo => {
        if(hijo.id===id){bandera=false;}
    });
    if(bandera){
        this.hijos.push(nodo);
        return nodo;
    }
    return null;
    }
    buscar(id){
        
        if(`${this.id}` ===`${id}`){
            return this;
        }else{
            for (let x = 0; x < this.hijos.length; x++) {
                const hijo =  this.hijos[x];
                let dato=hijo.buscar(id);
                if( dato!==null){
                    return dato;
                }
            }
            return null;
        }
    }
    eliminar(id){
            for (let x = 0; x < this.hijos.length; x++) {
                const hijo =  this.hijos[x];
               if(`${hijo.id}` ===`${id}`){
                   this.hijos[x]=this.hijos[this.hijos.length-1];
                   this.hijos.pop()
                   return;
               }
            }
            for (let x = 0; x < this.hijos.length; x++) {
                const hijo =  this.hijos[x];
                hijo.eliminar(id);
            }
         
        
    }


}