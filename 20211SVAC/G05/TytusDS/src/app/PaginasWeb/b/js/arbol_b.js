class lista{
    constructor(){
        this.uno=null;
        this.fin=null;
        
    }

    guardar(valor){
        let nodo = new nodolista(valor)
        let aux1;
        let aux2;

        if(this.uno==null){
           this.uno=nodo;
            nodo.post=null;
            this.fin=nodo;
        }else{ aux1=this.uno;
            while(aux1!=null){
                aux2=aux1.post;
                if(nodo.dato<aux1.dato){
                    nodo.post=this.uno;
                    this.uno=nodo;
                    this.fin=this.uno;
                    break;}
                else{
                    if(nodo.dato>=aux1.dato && aux2==null){
                        aux1.post=nodo;
                        nodo.post=null;
                        this.fin=nodo;
                        break;
                    }else{  if(aux1.dato<=nodo.dato && aux2.dato>nodo.dato){
                        aux1.post=nodo;
                        nodo.post=aux2;
                        break;
                        }else{aux1=aux1.post;}
                        }}
                    
                    }
    }
    
    }

}

class NodoARBOL{
    constructor(padre, id){
        this.hojitas = [];
        this.id = id;
        this.derecho = null;
        this.izquierdo = null;
        this.padre = padre;
        this.uno=null;
        this.claves = [];
        this.fin=null;
    }
        
    
    agregar(valor){
        this.claves.push(valor)
        if(this.claves.length > 1){

            var ele=this.claves;
            for (let i=1; i<ele.length; i++){
                let x=i-1;
                let y=i;
                let datos=ele[i];
                while(x>=0 && ele[x]>datos){
                    ele[y]=ele[x];
                    x--;
                    y--;}
                ele[y]=datos;
            }
            this.claves =ele;
        }
    }


}

var arbol=null;
class nodolista{
    constructor(valor){
        this.dato=valor;
        this.post=null;
        this.ant=null
    }
}

class ArbolB{
    constructor(grado,medio){
        this.nodos = [];
        this.punteros= [];
        this.derecho = null;
        this.izquierdo = null;
        this.repetidos = false;
        this.uno=null;
        this.fin=null;
        this.grado = grado;
        this.contador=1;
        this.subir=medio;

        this.anterior = null;
        this.raiz = new NodoARBOL(null, 0);
        this.siguiente = null;
        
    }

    agregar(valor){
        if (this.raiz==null){
            this.raiz = this.valueagregar(valor,this.raiz);
        }
        else{
            this.raiz = this.valueagregar(valor,this.raiz);
        }
        
    }
    leer(){
        let ldatos=[];
        let aux = this.uno;
        if (this.uno!=null){
            do{
                ldatos.push(aux.dato.toString());
                aux=aux.post;
                }while(aux!=null);}
        return ldatos;
      }

    valueagregar(valor,aux){
        var poss;
        var hHijos = false;
        var bandera3=true;
        if(aux.hojitas.length == 0){aux.agregar(valor);}else{
            var bandera = false;
            for(var i = 0; i<aux.claves.length; i++){
                if(valor < aux.claves[i]){
                    if (bandera3==false){
                        raiz.anterior = temp.anterior;
                        raiz.siguiente = temp;
                        aux.anterior.siguiente = raiz;
                        aux.anterior.derecho = raiz.izquierdo;
                        }
                   bandera = true;
                   let al=this.valueagregar(valor, aux.hojitas[i]);
                    aux.hojitas[i] = al;
                    break;}}
            if(!bandera){
                aux.hojitas[aux.claves.length] = this.valueagregar(valor, aux.hojitas[aux.claves.length]);}
            
        }
        if(aux.claves.length==this.grado){
            if(aux.padre == null){
                this.contador++;
                var append = aux;
                aux = new NodoARBOL(null, this.contador);
                if (bandera3==false){
                    raiz.anterior = temp.anterior;
                    raiz.siguiente = temp;
                    aux.anterior.siguiente = raiz;
                    aux.anterior.derecho = raiz.izquierdo;
                    }
                aux.agregar(append.claves[this.subir]);
                this.contador++
                let nodo=new NodoARBOL(aux, this.contador);
                aux.hojitas.push(nodo);
                this.contador++
                let nodo1=new NodoARBOL(aux, this.contador);
                aux.hojitas.push(nodo1);
                for(var i = 0; i<this.subir; i++){
                    aux.hojitas[0].agregar(append.claves[i]);
                    aux.hojitas[1].agregar(append.claves[i+this.subir+1]);}
                if(append.hojitas.length > 0){
                    for(var i=0;i<this.subir+1;i++){
                        aux.hojitas[0].hojitas[i] = append.hojitas[i];
                        aux.hojitas[0].hojitas[i].padre = aux.hojitas[0];
                        if (bandera3==false){
                        raiz.anterior = temp.anterior;
                        raiz.siguiente = temp;
                        aux.anterior.siguiente = raiz;
                        aux.anterior.derecho = raiz.izquierdo;
                        }
                        aux.hojitas[1].hojitas[i] = append.hojitas[i+this.subir+1];
                        aux.hojitas[1].hojitas[i].padre = aux.hojitas[1];}}}
                        else{
                
                var medio = aux.claves[this.subir];
                aux.padre.agregar(medio);
                if(aux.hojitas.length > 0){
                    hHijos = true;}
                for(poss = 0; poss < aux.padre.claves.length; poss++){
                    if(aux.padre.claves[poss] == medio){
                        break
                    }
                }

                for(var i = aux.padre.claves.length; i>poss+1; i--){
                    aux.padre.hojitas[i] = aux.padre.hojitas[i-1];
                }

                var aux1 = aux;
                
                this.contador++;
                let nodo2=new NodoARBOL(aux.padre, this.contador)
                aux.padre.hojitas[poss] = nodo2;
                if (bandera3==false){
                    raiz.anterior = temp.anterior;
                    raiz.siguiente = temp;
                    aux.anterior.siguiente = raiz;
                    aux.anterior.derecho = raiz.izquierdo;
                    }
                this.contador ++;
                let nodo3=new NodoARBOL(aux.padre,this.contador);
                aux.padre.hojitas[poss+1] = nodo3;
                for(var i = 0; i<this.subir; i++){
                    aux.padre.hojitas[poss].agregar(aux1.claves[i]);
                    if (bandera3==false){
                        raiz.anterior = temp.anterior;
                        raiz.siguiente = temp;
                        aux.anterior.siguiente = raiz;
                        aux.anterior.derecho = raiz.izquierdo;
                        }
                    aux.padre.hojitas[poss+1].agregar(aux1.claves[i+this.subir+1]); }
                aux = aux.padre.hojitas[poss];

            
                if(hHijos==true){
                    for(var i = 0; i<this.subir+1; i++){
                        aux.padre.hojitas[poss].hojitas[i] = aux1.hojitas[i];
                        
                        aux.padre.hojitas[poss].hojitas[i].padre = aux.padre.hojitas[poss];
                        if (bandera3==false){
                            raiz.anterior = temp.anterior;
                            raiz.siguiente = temp;
                            aux.anterior.siguiente = raiz;
                            aux.anterior.derecho = raiz.izquierdo;
                            }
                    }
                    for(var i = this.subir+1; i<this.grado+1; i++){
                        aux.padre.hojitas[poss+1].hojitas[i-this.subir-1] = aux1.hojitas[i];
                        
                        aux.padre.hojitas[poss+1].hojitas[i-this.subir-1].padre = aux.padre.hojitas[poss+1];
                        if (bandera3==false){
                            raiz.anterior = temp.anterior;
                            raiz.siguiente = temp;
                            aux.anterior.siguiente = raiz;
                            aux.anterior.derecho = raiz.izquierdo;
                            }
                    }
                    
                }
            }}
        return aux;
    }

    guardar(valor){
        let nodo = new nodolista(valor)
        let aux1;
        let aux2;

        if(this.uno==null){
           this.uno=nodo;
            nodo.post=null;
            this.fin=nodo;
        }else{ aux1=this.uno;
            while(aux1!=null){
                aux2=aux1.post;
                if(nodo.dato<aux1.dato){
                    nodo.post=this.uno;
                    this.uno=nodo;
                    this.fin=this.uno;
                    break;}
                else{
                    if(nodo.dato>=aux1.dato && aux2==null){
                        aux1.post=nodo;
                        nodo.post=null;
                        this.fin=nodo;
                        break;
                    }else{  if(aux1.dato<=nodo.dato && aux2.dato>nodo.dato){
                        aux1.post=nodo;
                        nodo.post=aux2;
                        break;
                        }else{aux1=aux1.post;}
                        }}
                    
                    }
    }
    
    }
    
    insertarNodo(valor,grado){
        this.guardar(valor)
        var medio;
        if(arbol == null){
            if (grado%2==0) {medio = grado/2}
            else{medio = (grado-1)/2}
            arbol = new ArbolB(grado,medio)
        }
        arbol.agregar(valor)
    }

    as(){
        this.nodos = []
        this.punteros = []  
        let ldata=[];
        let aux=arbol.raiz;
        if(aux != null){
            var impre="";
            for(var i = 0; i<aux.claves.length; i++){
                if(i == aux.claves.length-1){
                    impre=(impre + aux.claves[i].toString());
                }else{impre=(impre + aux.claves[i].toString() + "|");}}
           
                this.nodos.push({id: aux.id, label: impre})
            impre = ""
            for(var i = 0; i<aux.hojitas.length; i++){this.punteros.push({from: aux.id, to: aux.hojitas[i].id});
            this.a(aux.hojitas[i]);}
        }


        ldata.push(this.nodos);
        ldata.push(this.punteros);
        return ldata;
        
    }

    a(aux){
        if(aux != null){
            var impre="";
            for(var i = 0; i<aux.claves.length; i++){
                if(i == aux.claves.length-1){
                    impre=(impre + aux.claves[i].toString());
                }else{impre=(impre + aux.claves[i].toString() + "|");}}
           
                this.nodos.push({id: aux.id, label: impre})
            impre = ""
            for(var i = 0; i<aux.hojitas.length; i++){this.punteros.push({from: aux.id, to: aux.hojitas[i].id});
            this.a(aux.hojitas[i]);}
        }
    }

    

 

}







module.exports = ArbolB;

