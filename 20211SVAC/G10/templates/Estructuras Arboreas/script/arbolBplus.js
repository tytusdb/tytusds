class NodoBPlus{
    constructor(valor = null, padre = null){
        if(valor != null){
            this.primero = new Llave(valor, this);  //Al crear un nodo se crea una llave.
            this.size = 1;  //tamaño de uno por la llave
            this.padre = padre; //llave padre del nodo.
            this.tieneHijo = false;
            this.siguienteNodo = null;
        }else{
            this.primero = null;  //Al crear un nodo se crea una llave.
            this.size = 0;  //tamaño de uno por la llave
            this.padre = padre; //llave padre del nodo.
            this.tieneHijo = false;
            this.siguienteNodo = null;
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

class ArbolBPlus{
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
        this.root = this.insertar(dato);
    }

    insertar(dato, nodo = this.root, isDerecha = null){
        if(nodo == null){
            this.size++;
            return new NodoBPlus(dato);
        }else{
            if(nodo.tieneHijo){//si nodo tiene hijo, busca hasta encontrar un nodo hijo
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
            }else{
                nodo.agregar(dato); //si el nodo no tiene hijos, agrega dato al nodo.
                this.size++;
            }
        }
        if(isDerecha != null){
            nodo = this.update(nodo,isDerecha);
        }else{
            nodo = this.update(nodo);
        }
        return nodo;
    }

    update(nodo, isDerecha = null){
        if(nodo.size > this.maxLlaves()){ //solo se actualiza si el tamaño es mayor al max
            let mid = nodo.llaveMid(this.minHijos()+1);
            let premid = mid.anterior;
            let padre = null;
            let llaveP = null;
            let nodoL = null;
            let nodoR = null;
            let nueva = null;
            if(nodo.tieneHijo){//nodo no es hoja
                let postmid = mid.siguiente;
                if(nodo.padre == null){ //nodo no es hoja y no tiene padre
                    padre = new NodoBPlus();
                    padre.tieneHijo = true;

                    padre.agregarLlave(mid);
                    llaveP = padre.llave(mid.valor);

                    nodoL = new NodoBPlus(null,llaveP);
                    llaveP.izquierda = nodoL;

                    nodoR = new NodoBPlus(null, llaveP);
                    llaveP.derecha = nodoR;

                    llaveP.izquierda = nodoL;
                    llaveP.derecha = nodoR;

                    while(premid != null){
                        nodoL.agregarLlave(premid);
                        nueva = nodoL.llave(premid.valor);

                        nueva.izquierda = premid.izquierda;
                        nueva.derecha = premid.derecha;

                        premid = premid.anterior;
                    }

                    while(postmid != null){
                        nodoR.agregarLlave(postmid);
                        nueva = nodoR.llave(postmid.valor);

                        nueva.izquierda = postmid.izquierda;
                        nueva.derecha = postmid.derecha;

                        postmid = postmid.siguiente;
                    }

                    return padre;
                }else{  //nodo no es hoja y tiene un padre
                    padre = nodo.padre.nodo;
                    padre.agregarLlave(mid);
                    llaveP = padre.llave(mid.valor);

                    nodoL = new NodoBPlus(null,llaveP);
                    llaveP.izquierda = nodoL;
                    if(llaveP.anterior != null){
                        llaveP.anterior.derecha = nodoL;
                    }

                    nodoR = new NodoBPlus(null, llaveP);
                    llaveP.derecha = nodoR;
                    if(llaveP.siguiente != null){
                        llaveP.siguiente.izquierda = nodoR;
                    }

                    while(premid != null){
                        nodoL.agregarLlave(premid);
                        nueva = nodoL.llave(premid.valor);

                        nueva.izquierda = premid.izquierda;
                        nueva.derecha = premid.derecha;

                        premid = premid.anterior;
                    }

                    while(postmid != null){
                        nodoR.agregarLlave(postmid);
                        nueva = nodoR.llave(postmid.valor);

                        nueva.izquierda = postmid.izquierda;
                        nueva.derecha = postmid.derecha;

                        postmid = postmid.siguiente;
                    }

                    if(isDerecha){  //chequea si el padre que mando a llamar el metodo insertar tiene
                        return nodo.padre.derecha;  //a nodo como hijo derecha o izquierda y devuelve acorde.
                    }else{
                        return nodo.padre.izquierda;
                    }
                }
            }else{//nodo es hoja
                if(nodo.padre == null){ //nodo es hoja sin padre
                    console.log('hoja sin p')
                    padre = new NodoBPlus();
                    padre.tieneHijo = true;

                    padre.agregarLlave(mid);
                    llaveP = padre.llave(mid.valor);

                    nodoL = new NodoBPlus(null,llaveP);
                    llaveP.izquierda = nodoL;

                    nodoR = new NodoBPlus(null, llaveP);
                    llaveP.derecha = nodoR;

                    llaveP.izquierda = nodoL;
                    llaveP.derecha = nodoR;

                    nodoL.siguienteNodo = nodoR;

                    while(premid != null){
                        nodoL.agregarLlave(premid);
                        nueva = nodoL.llave(premid.valor);

                        premid = premid.anterior;
                    }

                    while(mid != null){
                        nodoR.agregarLlave(mid);
                        nueva = nodoR.llave(mid.valor);

                        mid = mid.siguiente;
                    }

                    return padre;
                }else{  //nodo hoja con padre
                    padre = nodo.padre.nodo;
                    padre.agregarLlave(mid);
                    llaveP = padre.llave(mid.valor);

                    nodoL = new NodoBPlus(null,llaveP);
                    llaveP.izquierda = nodoL;

                    nodoR = new NodoBPlus(null, llaveP);
                    llaveP.derecha = nodoR;

                    while(premid != null){
                        nodoL.agregarLlave(premid);
                        nueva = nodoL.llave(premid.valor);

                        premid = premid.anterior;
                    }

                    while(mid != null){
                        nodoR.agregarLlave(mid);
                        nueva = nodoR.llave(mid.valor);

                        mid = mid.siguiente;
                    }

                    if(llaveP.anterior != null){
                        llaveP.anterior.izquierda.siguienteNodo = nodoL
                        llaveP.anterior.derecha = nodoL;
                    }

                    if(llaveP.siguiente != null){
                        nodoR.siguienteNodo = llaveP.siguiente.derecha;
                        llaveP.siguiente.izquierda = nodoR;
                    }else{  //si el nodo siguiente es nulo, revisa si hay un nodo siguiente
                        let llaveR = nodoR.padre;    //Busca el nodo a la derecha con la posicion mas cercana a nodoR
                        let nodoAux = nodoR;
                        let encontrado = false;
                        while(!encontrado){
                            if(llaveR.derecha != nodoAux){  //revisa si el nodo derecho es nuevo
                                if(llaveR.siguiente != null){   //revisa si la llave siguiente existe
                                    if(llaveR.nodo.padre != null){  //revisa si no hay mas nodos padre
                                        llaveR = llaveR.nodo.padre;
                                        nodoAux = nodoAux.padre.nodo;
                                    }else{
                                        encontrado = true;
                                    }
                                }else{
                                    encontrado = true;
                                }
                            }else{
                                encontrado = true;
                            }
                        }
                        let nodoH = null

                        if(llaveR.derecha == nodoAux){ //al encontrar una llave que posee un nodo siguiente
                            if(llaveR.siguiente != null){   //si la llave siguiente no es nula, busca nodo mas izquierdo
                                nodoH = llaveR.siguiente.derecha;   //de lo contrario, no hay nodo siguiente
                                while(nodoH.primero.izquierda != null){
                                    nodoH = nodoH.primero.izquierda;
                                }
                            }
                        }else{  //si el nodo a la derecha es nuevo, busca el nodo mas a la izquierda de ese nodo
                            nodoH = llaveR.derecha;
                            while(nodoH.primero.izquierda != null){
                                nodoH = nodoH.primero.izquierda;
                            }
                        }
                        
                        nodoR.siguienteNodo = nodoH;    //finalmente asigna siguiente nodo a nodoR
                    }

                    nodoL.siguienteNodo = nodoR; //asignacion de nodos en la lista

                    if(isDerecha){  //chequea si el padre que mando a llamar el metodo insertar tiene
                        return nodo.padre.derecha;  //a nodo como hijo derecha o izquierda y devuelve acorde.
                    }else{
                        return nodo.padre.izquierda;
                    }
                }
            }
        }else{
            console.log('nada')
            return nodo;
        }
        
    }

    elementos(nodo = this.root){
        if(nodo == this.root){
            while(nodo.tieneHijo){
                nodo = nodo.primero.izquierda;
            }
            let a = []
            let llave = nodo.primero
            while(llave != null){
                a[a.length] = llave.valor;
                llave = llave.siguiente;
            }
            
            if(nodo.siguienteNodo != null){
                a = a.concat(this.elementos(nodo.siguienteNodo));
            }
            console.log(a);
            return a;
        }else{
            let llave = nodo.primero;
            let a = []
            while(llave != null){
                a[a.length] = llave.valor;
                llave = llave.siguiente;
            }
            
            if(nodo.siguienteNodo != null){
                a = a.concat(this.elementos(nodo.siguienteNodo));
            }
            return a;
        }
    }

    eliminar(dato){
        dato = parseFloat(dato);
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
            console.log('El dato ingresado no existe en el arbol.')
        }
    }

    buscar(dato){
        let nodo = this.root;
        let llave = nodo.primero;
        let ultimo = false;
        let siguiente = false;

        while(!ultimo){
            llave = nodo.primero;
            siguiente = false;

            while(!siguiente){
                if(nodo.tieneHijo){//el valor no puede estar en un nodo interno
                    if(llave.valor < dato){
                        if(llave.siguiente != null){//pasa a siguiente llave
                            llave = llave.siguiente;
                        }else{//pasa a nodo hijo derecho
                            nodo = llave.derecha;
                            siguiente = true;
                        }
                    }else{  //llave es mayor a dato, pasa a nodo hijo
                        nodo = llave.izquierda;
                    }
                }else{  //el nodo debe estar en el nodo hoja alcanzado
                    if(llave.valor < dato){
                        if(llave.siguiente != null){
                            llave = llave.siguiente;
                        }else{  //alcanzo la ultima llave del nodo hoja, no existe
                            ultimo = true;
                            siguiente = true;
                        }
                    }else if(llave.valor > dato){   //alcanzo un llave mayor, por lo que el dato no existe en el arbol
                        ultimo = true;
                        siguiente = true;
                    }else{
                        return true;
                    }
                }
            }

            return false;
        }
    }

    actualizar(existente, nuevo){
        if(this.buscar(existente)){
            this.eliminar(existente);
            this.agregar(nuevo);
        }else{
            console.log('El dato ingresado no existe en el arbol.')
        }
    }

    cargar(){
        console.log('Leyendo json.')
    }

    guardar(){
        console.log('Guardando en json.')
    }

    devolverNodosAristas(nodoarista, nodo = this.root, numnodo = 0){
        if(nodo != null){
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

const arbolBP = new ArbolBPlus(4);

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
        arbolBP.agregar(dato.value);
        graficaArbol(arbolBP);
        console.log("elementos:")
        console.log(arbolBP.elementos());
    }
})

eliminar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        arbolBP.eliminar(dato.value);
        graficaArbol(arbolBP);
    }
})

actualizar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        let lista = dato.value.split(',')
        arbolBP.actualizar(lista[0],lista[1]);
        graficaArbol(arbolBP);
    }
})

buscar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        if(arbolBP.buscar(dato.value)){
            console.log('El dato '+dato.value+'se encuentra en el arbol.');
        }else{
            console.log('El dato no se encuentra en el nodo.');
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
        arbolBP.agregar(valores[i])
    }
    graficaArbol(arbolBP);
    document.getElementById('mensaje').innerText = ''
    archivo.setAttribute('disabled', '')
})

const salida ={
    operacion: 'Arbol B',
    valores: []
}

guardar.addEventListener("click", (e) => {
    e.preventDefault()
    salida.valores = arbolBP.elementos();
    let texto = JSON.stringify(salida);
    download('ArbolBPlus.json', texto);
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

function graficaArbol(arbolBP){
    let lista = new NodoArista();

    lista = arbolBP.devolverNodosAristas(lista);

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