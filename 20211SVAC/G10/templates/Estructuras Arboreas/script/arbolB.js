class NodoB{
    constructor(valor = null, padre = null){
        if(valor != null){
            this.primero = new Llave(valor, this);  //Al crear un nodo se crea una llave.
            this.size = 1;  //tamaño de uno por la llave
            this.padre = padre; //llave padre del nodo.
            this.tieneHijo = false;
        }else{
            this.primero = null;  //Al crear un nodo se crea una llave.
            this.size = 0;  //tamaño de uno por la llave
            this.padre = padre; //llave padre del nodo.
            this.tieneHijo = false;
        }
    }

    agregar(dato){  //metodo para agregar llave a un nodo
        let agregado = false;
        let actual = this.primero;
        dato = parseFloat(dato);

        if(this.primero == null){
            this.primero = new Llave(dato, this);
        }else{
            while(!agregado){
                if(actual.valor < dato){
                    if(actual.siguiente != null){ //dato es mayor y siguiente no es nulo
                        actual = actual.siguiente;
                    }else{  //dato nuevo es mayor al actual y sig es nulo
                        let nuevo = new Llave(dato, this);
                        actual.siguiente = nuevo;
                        nuevo.anterior = actual;
                        agregado = true;
                    }
                }else{  //dato nuevo es menor o igual
                    if(actual != this.primero){ //nodo actual no es el primero
                        let nuevo = new Llave(dato, this);
                        nuevo.anterior = actual.anterior;
                        actual.anterior = actual.anterior.siguiente = nuevo;
                        nuevo.siguiente = actual;
                        agregado = true;
                    }else{  //nodo actual es el primero
                        let nuevo = new Llave(dato, this);
                        actual.anterior = nuevo;
                        nuevo.siguiente = actual;
                        this.primero = nuevo;
                        agregado = true;
                    }
                }
            }
        }

        
        this.size++;
    }

    agregarLlave(llave){
        let agregado = false;
        let actual = this.primero;

        if(this.primero == null){
            this.primero = new Llave(llave.valor, this);
            this.primero.nodo = this;
            this.primero
        }else{
            while(!agregado){
                if(actual.valor < llave.valor){
                    if(actual.siguiente != null){ //dato es mayor y siguiente no es nulo
                        actual = actual.siguiente;
                    }else{  //dato nuevo es mayor al actual y sig es nulo
                        let nuevo = new Llave(llave.valor, this);
                        actual.siguiente = nuevo;
                        nuevo.anterior = actual;
                        agregado = true;
                    }
                }else{  //dato nuevo es menor o igual
                    if(actual != this.primero){ //nodo actual no es el primero
                        let nuevo = new Llave(llave.valor, this);
                        actual.anterior = actual.anterior.siguiente = nuevo;
                        nuevo.anterior = actual.anterior;
                        nuevo.siguiente = actual;
                        agregado = true;
                    }else{  //nodo actual es el primero
                        let nuevo = new Llave(llave.valor, this);
                        actual.anterior = nuevo;
                        nuevo.siguiente = actual;
                        this.primero = nuevo;
                        agregado = true;
                    }
                }
            }
        }

        
        this.size++;
    }

    llaveMid(pos){
        let i = 1;
        let actual = this.primero;

        while(i < pos){
            actual = actual.siguiente;
            i++;
        }
        return actual;
    }

    llave(valor){
        let actual = this.primero;
        let encontrado = false;

        while(actual != null && !encontrado){
            if(actual.valor == valor){
                encontrado = true;
            }else{
                actual = actual.siguiente;
            }
        }
        if(encontrado){
            return actual;
        }else{
            return null;
        }
    }
}

class Llave{
    constructor(dato, nodo){
        this.valor = dato;      //valor guardado
        this.derecha = null;    //nodo hijo R
        this.izquierda = null;  //nodo hijo L
        this.siguiente = null;  //llave sig
        this.anterior = null;   //llave ant
        this.nodo = nodo;       //nodo padre
    }
}

class ArbolB{
    constructor(orden){
        this.root = null;
        this.orden = orden;
        this.size = 0;
    }

    minHijos(){ //metodo para el num minimo de hijos en cada nodo, tambien para pos de llave media
        return Math.ceil(this.orden / 2);
    }

    minLlaves(){//min de llaves en un nodo
        return this.minHijos - 1;
    }

    maxLlaves(){//max llaves en un nodo
        return this.orden - 1;
    }

    maxHijos(){
        return this.orden;
    }

    agregar(dato){
        dato = parseFloat(dato);
        this.root = this.insertar(dato, this.root);
    }

    insertar(dato, nodo, isDerecha = null){
        if(nodo == null){   //Se cumple solo con el primer nodo raiz
            return new NodoB(dato);
        }else{
            if(nodo.tieneHijo){ //Arbol B siempre agrega en el ultimo nodo.
                let encontrado = false; //Si el nodo tiene hijo, busca donde agregarlo
                let actual = nodo.primero;
                while(!encontrado){
                    if(actual.valor < dato){
                        if(actual.siguiente != null){
                            actual = actual.siguiente;
                        }else{  //inserta un dato en el nodo hijo a la derecha
                            actual.derecha = this.insertar(dato, actual.derecha, true);
                            encontrado = true;
                        }
                    }else{  //cuando valor de actual es mayor al dato nuevo
                        if(actual != nodo.primero){ //insertando en el nodo hijo de un llave que no es primero
                            actual.izquierda = actual.anterior.derecha = this.insertar(dato, actual.izquierda, false);
                            encontrado = true;
                        }else{  //insertando a la izquierda de la primera llave
                            actual.izquierda = this.insertar(dato, actual.izquierda, false);
                            encontrado = true;
                        }
                    }
                }
            }else{  //si el nodo no tiene hijos, agrega una llave y aumenta el tamano
                nodo.agregar(dato);
                this.size++;
            }
        }
        if(isDerecha != null){
            nodo = this.update(nodo, isDerecha);    //actualiza el nodo
            
            
        }else{
            nodo = this.update(nodo);    //actualiza el nodo
        }
        return nodo;
    }

    update(nodo, isDerecha = null){
        console.log('update');
        if(nodo.size > this.maxLlaves()){
            let mid = nodo.llaveMid(this.minHijos());
            let llaveL = mid.anterior;
            let llaveR = mid.siguiente;
            let padre = null;
            let llaveP = null;
            if(nodo.padre == null){ //si no existe llave padre
                padre = new NodoB();
                padre.tieneHijo = true; 
                padre.agregarLlave(mid);
                llaveP = padre.primero;

                let nodoL = new NodoB(null,llaveP); //crea nuevo nodo hijo a la izquierda
                llaveP.izquierda = nodoL;
                
                let nueva = null;
                while(llaveL != null){  //agregando al nodo hijo L todas las llaves L
                    nodoL.agregarLlave(llaveL); //agrega nuevo valor

                    nueva = nodoL.llave(llaveL.valor);  //recibe la llave y le asigna los hijos de la anterior
                    nueva.izquierda = llaveL.izquierda;
                    nueva.derecha = llaveL.derecha;

                    llaveL = llaveL.anterior;   //sigue a la anterior llave
                }

                let nodoR = new NodoB(null,llaveP); //crea nuevo nodo hijo a la derecha
                llaveP.derecha = nodoR;

                while(llaveR != null){
                    console.log('aca');
                    nodoR.agregarLlave(llaveR);

                    nueva = nodoR.llave(llaveR.valor);
                    nueva.izquierda = llaveR.izquierda;
                    nueva.derecha = llaveR.derecha;

                    llaveR = llaveR.siguiente;
                }

                return padre;
            }else{  //si la llave padre existe
                padre = nodo.padre.nodo;
                padre.agregarLlave(mid);
                llaveP = padre.llave(mid.valor);

                let nodoL = new NodoB(null,llaveP); //crea nuevo nodo hijo a la izquierda
                llaveP.izquierda = nodoL;
                if(llaveP.anterior != null){    //asigna hijo a la llave adyacente si existe
                    llaveP.anterior.derecha = nodoL;
                }
                
                let nueva = null;
                while(llaveL != null){  //agregando al nodo hijo L todas las llaves L
                    console.log('otro');
                    nodoL.agregarLlave(llaveL); //agrega nuevo valor

                    nueva = nodoL.llave(llaveL.valor);  //recibe la llave y le asigna los hijos de la anterior
                    nueva.izquierda = llaveL.izquierda;
                    nueva.derecha = llaveL.derecha;

                    llaveL = llaveL.anterior;   //sigue a la anterior llave
                }

                let nodoR = new NodoB(null,llaveP); //crea nuevo nodo hijo a la derecha
                llaveP.derecha = nodoR;
                if(llaveP.siguiente != null){
                    llaveP.siguiente.izquierda = nodoR;
                }

                while(llaveR != null){  //lo mismo para llave derecha
                    console.log('ultimo');
                    nodoR.agregarLlave(llaveR);

                    nueva = nodoR.llave(llaveR.valor);
                    nueva.izquierda = llaveR.izquierda;
                    nueva.derecha = llaveR.derecha;

                    llaveR = llaveR.siguiente;
                }

                if(isDerecha){  //chequea si el padre que mando a llamar el metodo insertar tiene
                    return nodo.padre.derecha;  //a nodo como hijo derecha o izquierda y devuelve acorde.
                }else{
                    return nodo.padre.izquierda;
                }
            }

             
        }else{
            return nodo;
        }
    }

    elementos(nodo = this.root){
        let a = [];
        let llave = nodo.primero;
        if(nodo.tieneHijo){
            a = a.concat(this.elementos(llave.izquierda));
            while(llave != null){
                a[a.length] = llave.valor;
                a = a.concat(this.elementos(llave.derecha));
                llave = llave.siguiente;
            }
        }else{
            while(llave != null){
                a[a.length] = llave.valor;
                llave = llave.siguiente;
            }
        }
        return a;
    }


    eliminar(dato){
        if(this.buscar(dato)){
            let elementos = this.elementos();
            this.root = null;
            let borrado = false;
            for(let i = 0; i < elementos.length; i++){
                if(!borrado){
                    if(elementos[i] != dato){
                        this.agregar(elementos[i]);
                    }else{
                        borrado = true;
                    }
                }else{
                    this.agregar(elementos[i]);
                }
            }
            this.size--;
        }else{
            console.log('Este dato no existe el dato en el arbol.')
        }
    }

    buscar(dato){
        let actual = this.root;
        let llave = actual.primero;
        let ultimo = false;
        let siguiente = false;

        while(!ultimo){ //ciclo buscando en nodos
            llave = actual.primero;
            siguiente = false;

            while(!siguiente){  //ciclo buscando en llaves

                if(llave.valor < dato){ //valor de la llave es menor
                    if(llave.siguiente != null){    //siguiente nodo no es nulo
                        llave = llave.siguiente;    //pasa a llave siguiente
                    }else{  //siguiente nodo es nulo
                        if(actual.tieneHijo){   //llave tiene hijo
                            actual = llave.derecha; //pasa a nodo hijo derecha
                            siguiente = true;
                        }else{  //llave no tiene hijo
                            ultimo = true;
                            siguiente = true;   //sale del ciclo
                        }
                    }

                }else if(llave.valor > dato){   //valor de la llave es mayor
                    if(actual.tieneHijo){   //llave tiene nodo hijo
                        actual = llave.izquierda;   //pasa a nodo hijo izquierda
                        siguiente = true;
                    }else{  //llave no tiene hijo
                        ultimo = true;
                        siguiente = true;   //sale del ciclo
                    }
                    
                }else{  //valor de la llave no es mayor ni menor, es igual
                    return true;
                }
            }
        }
        return false;   //si se sale del ciclo quiere decir que llego al final sin encontrar dato
    }

    llave(dato){
        let actual = this.root;
        let llave = actual.primero;
        let ultimo = false;
        let siguiente = false;

        while(!ultimo){ //ciclo buscando en nodos
            llave = actual.primero;
            siguiente = false;

            while(!siguiente){  //ciclo buscando en llaves

                if(llave.valor < dato){ //valor de la llave es menor
                    if(llave.siguiente != null){    //siguiente nodo no es nulo
                        llave = llave.siguiente;    //pasa a llave siguiente
                    }else{  //siguiente nodo es nulo
                        if(actual.tieneHijo){   //llave tiene hijo
                            actual = llave.derecha; //pasa a nodo hijo derecha
                            siguiente = true;
                        }else{  //llave no tiene hijo
                            ultimo = true;
                            siguiente = true;   //sale del ciclo
                        }
                    }

                }else if(llave.valor > dato){   //valor de la llave es mayor
                    if(actual.tieneHijo){   //llave tiene nodo hijo
                        actual = llave.izquierda;   //pasa a nodo hijo izquierda
                        siguiente = true;
                    }else{  //llave no tiene hijo
                        ultimo = true;
                        siguiente = true;   //sale del ciclo
                    }
                    
                }else{  //valor de la llave no es mayor ni menor, es igual
                    return llave;
                }
            }
        }
        return null;   //si se sale del ciclo quiere decir que llego al final sin encontrar dato
    }

    actualizar(existente, nuevo){
        if(this.buscar(existente)){
            this.eliminar(existente);
            this.agregar(nuevo);
        }else{
            console.log('El dato no existe en el arbol.')
        }
    }

    devolverNodosAristas(nodoarista, nodo = this.root, numnodo = 0){
        
        let llave = nodo.primero;
        let etiqueta = llave.valor.toString();
        llave = llave.siguiente;
        while(llave != null){
            etiqueta += " | "+llave.valor.toString();
            llave = llave.siguiente;
            console.log('a')
        }
        console.log(etiqueta)
        nodoarista.nodos.push({id:numnodo,label:etiqueta})

        llave = nodo.primero;
        let num = 1

        if(llave.izquierda != null){
            nodoarista.aristas.push({from:numnodo, to:numnodo*100+num})
            nodoarista =  this.devolverNodosAristas(nodoarista, llave.izquierda, numnodo*100+num);
        }
        num++;

        while(llave != null){
            if(llave.derecha != null){
                nodoarista.aristas.push({from:numnodo, to:numnodo*100+num})
                nodoarista = this.devolverNodosAristas(nodoarista, llave.derecha, numnodo*100+num);
                num++;
            }
            llave = llave.siguiente;
            console.log(llave);
        }

        return nodoarista;
    }
}

class NodoArista{
    constructor(){
        this.nodos = []
        this.aristas = []
    }
}

const velocidad = document.getElementById("velocidad")
let num_velocidad = 3;

velocidad.oninput = () => {
    document.getElementById('numero').innerHTML = velocidad.value
    //num_velocidad = (velocidad.value * 1) / 5
    num_velocidad = velocidad.value
    
}

const arbolBB = new ArbolB(4);

const dato = document.getElementById('dato')

const agregar = document.getElementById('agregar')
const eliminar = document.getElementById('eliminar')
const actualizar = document.getElementById('actualizar')
const buscar = document.getElementById('buscar')

const guardar = document.getElementById('guardar')
const cargar = document.getElementById('cargar')

agregar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        arbolBB.agregar(dato.value);
        graficaArbol(arbolBB);
        console.log();
    }
})

eliminar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        arbolBB.eliminar(dato.value);
        graficaArbol(arbolBB);
        console.log();
    }
})

actualizar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        let lista = dato.value.split(',')
        arbolBB.actualizar(lista[0],lista[1]);
        graficaArbol(arbolBB);
    }
})

buscar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        if(arbol.buscar(dato.value)){
            console.log('El dato '+dato.value+' esta en el arbol.');
        }else{
            console.log('El dato no esta en el arbol.');
        }
    }
})

let archivo = document.getElementById('file')
let entrada;

archivo.addEventListener('change', () => {
    let leer = new FileReader()
    leer.readAsText(archivo.files[0])
    leer.onload = function() {
    entrada = JSON.parse(leer.result)
    }
    document.getElementById('mensaje').innerText = 'Se cargo el archivo con exito'
})

cargar.addEventListener("click", (e) => {
    e.preventDefault()
    let valores = entrada["valores"]
    salida.lista = valores
    for (let i = 0; i < valores.length; i++) {
        arbolBB.agregar(valores[i])
    }
    graficaArbol(arbolBB);
    document.getElementById('mensaje').innerText = ''
    archivo.setAttribute('disabled', '')
})

const salida ={
    operacion: 'Arbol B',
    valores: []
}

guardar.addEventListener("click", (e) => {
    e.preventDefault()
    salida.valores = arbolBB.elementos();
    let texto = JSON.stringify(salida);
    download('ArbolB.json', texto);
})

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function graficaArbol(arbolB){
    let lista = new NodoArista();

    lista = arbolB.devolverNodosAristas(lista);

    let nodos = new vis.DataSet(lista.nodos);
    let aristas = new vis.DataSet(lista.aristas);

    let datos = {
        nodes: nodos,
        edges: aristas
    }

    let opciones = {layout:{
        hierarchical:{
            enabled:true,
            sortMethod:'directed'
        }
    }};

    let grafo = new vis.Network(lienzo,datos, opciones);
}