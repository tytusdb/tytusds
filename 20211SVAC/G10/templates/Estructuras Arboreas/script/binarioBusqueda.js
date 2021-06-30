class NodoBinario{
    constructor(dato){
        this.valor = dato;
        this.derecha = null;
        this.izquierda = null;
        this.padre = null;
    }
}

class ArbolBinario{
    constructor(){
        this.root = null;
        this.size = 0;
    }

    agregar(dato, actual = this.root){
        dato = parseFloat(dato);
        if (this.size > 0){
            if(dato > actual.valor){
                if ( actual.derecha != null){ //si el nodo a la derecha no esta vacio, continua buscando.
                    this.agregar(dato, actual.derecha);
                }else{
                    let nuevo = new NodoBinario(dato);
                    actual.derecha = nuevo;
                    actual.derecha.padre = actual;
                    this.size++;
                }
            }else{
                if (actual.izquierda != null){  //si el nodo a la izquierda no esta vacio, continua buscando.
                    this.agregar(dato, actual.izquierda);
                }else{
                    let nuevo = new NodoBinario(dato);
                    actual.izquierda = nuevo;
                    actual.izquierda.padre = actual;
                    this.size++;
                }
            }
        }else{
            let nuevo = new NodoBinario(dato);
            this.root = nuevo;
            this.size++;
        }
        console.log('agregado: ',dato);
    }

    nodo(dato, actual = this.root){ //funcion que devuelve nodo, se usa en eliminar()
        if (dato > actual.valor){
            if(actual.derecha != null){
                return this.nodo(dato, actual.derecha);
            }else{
                return null;
            }
        }else if (dato < actual.valor){
            if(actual.izquierda != null){
                return this.nodo(dato, actual.izquierda);
            }else{
                return null;
            }
        }else{
            return actual;
        }
    }

    hallarMinR(nodo){ //metodo para hallar el nodo de valor minimo a la izquierda del original al eliminar
        nodo = nodo.derecha;
        let noHijosL = false; //variable para chequear cuando el nodo ya no tenga hijos en izquierda
        while(!noHijosL){
            if(nodo.izquierda == null){
                noHijosL = true;
            }else{
                nodo = nodo.izquierda;
            }
        }

        return nodo
    }

    eliminar(dato){
        let nodo = this.nodo(dato); //busca el nodo en el arbol

        if(nodo != null){   //la funcion nodo() retorna null si no lo encuentra
            let padre = nodo.padre;

            let isDerecha = false;  //revisa si el nodo es un hijo derecho o izquierdo
            if (nodo != this.root){
                if(padre.derecha == nodo){
                    isDerecha = true;
                }
            }

            if(nodo.izquierda == null && nodo.derecha == null){ //caso sin hijos
                if(nodo != this.root){
                    if(isDerecha){
                        padre.derecha = null;
                    }else{
                        padre.izquierda = null;
                    }

                    this.size--;
                }else{
                    this.root = null;
                    this.size--;
                }
            }else if((nodo.derecha == null && nodo.izquierda != null)){ //caso un hijo L
                if(nodo != this.root){
                    if(isDerecha){
                        padre.derecha = nodo.izquierda;
                    }else{
                        padre.izquierda = nodo.izquierda;
                    }
                }else{
                    this.root = this.root.izquierda;
                }
            }
            else if((nodo.derecha != null && nodo.izquierda == null)){ //caso un hijo R
                if(nodo != this.root){
                    if(isDerecha){
                        padre.derecha = nodo.derecha;
                    }else{
                        padre.izquierda = nodo.derecha;
                    }
                }else{
                    this.root = this.root.derecha;
                }

            }else if(nodo.derecha != null && nodo.izquierda != null){ //caso dos hijos
                let minR = this.hallarMinR(nodo); //Se busca el valor minimo mayor al nodo
                this.eliminar(minR.valor);  //Se elimina el valor del nodo encontrado
                nodo.valor = minR.valor;    //Se reemplaza el valor del nodo por el minimo encontrado
            }
        }else{
            console.log('El dato ingresado no existe en el arbol.')
        }
    }

    buscar(dato, actual = this.root){
        if (dato > actual.valor){
            if(actual.derecha != null){
                return this.buscar(dato, actual.derecha);
            }else{
                return false;
            }
        }else if (dato < actual.valor){
            if(actual.izquierda != null){
                return this.buscar(dato, actual.izquierda);
            }else{
                return false;
            }
        }else{
            return true;
        }
    }

    actualizar(existente, nuevo){
        if(this.buscar(existente)){
            this.eliminar(existente);
            this.agregar(nuevo);
        }
    }

    preorden(nodo = this.root){
        if (nodo != null){
            console.log('Valor: ',nodo.valor);
            this.preorden(nodo.izquierda);
            this.preorden(nodo.derecha);
        }
    }

    inorden(nodo = this.root){
        if (nodo != null){
            this.inorden(nodo.izquierda);
            console.log('Valor: ',nodo.valor);
            this.inorden(nodo.derecha);
        }
    }

    postorden(nodo = this.root){
        if (nodo != null){
            this.postorden(nodo.izquierda);
            this.postorden(nodo.derecha);
            console.log('Valor: ',nodo.valor);
        }
    }

    elementos(nodo = this.root, lista = []){
        if(nodo != null){
            lista[lista.length] = nodo.valor;
            lista = this.elementos(nodo.izquierda, lista);
            lista = this.elementos(nodo.derecha, lista);
        }
        return lista;
    }

    devolverNodosAristas(nodoarista, nodo = this.root, numnodo = 0){

        nodoarista.nodos.push({id:numnodo,label:nodo.valor.toString()})

        if(nodo.izquierda != null){
            nodoarista.aristas.push({from:numnodo, to:numnodo*100+1})
            nodoarista =  this.devolverNodosAristas(nodoarista, nodo.izquierda, numnodo*100+1);
        }

        if(nodo.derecha != null){
            nodoarista.aristas.push({from:numnodo, to:numnodo*100+2})
            nodoarista = this.devolverNodosAristas(nodoarista, nodo.derecha, numnodo*100+2);
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

const velocidad = document.getElementById("velocidad");
let num_velocidad = 3;

velocidad.oninput = () => {
    document.getElementById('numero').innerHTML = velocidad.value;
    //num_velocidad = (velocidad.value * 1) / 5
    num_velocidad = velocidad.value;
    
}

const arbol = new ArbolBinario();

const dato = document.getElementById('dato');

const agregar = document.getElementById('agregar');
const eliminar = document.getElementById('eliminar');
const actualizar = document.getElementById('actualizar');
const buscar = document.getElementById('buscar');

const guardar = document.getElementById('guardar');
const cargar = document.getElementById('cargar');
const mostrar = document.getElementById('mostrar');
const lienzo = document.getElementById('lienzo');

agregar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        arbol.agregar(dato.value);
        console.log('Preorden');
        arbol.preorden();
        console.log('')
        console.log('Inorden');
        arbol.inorden();
        console.log('')
        console.log('Postorden');
        arbol.postorden();
        console.log('')
        graficaArbol(arbol);
    }
})

eliminar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        arbol.eliminar(dato.value);
        graficaArbol(arbol);
    }
})

actualizar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        let lista = dato.value.split(',')
        arbol.actualizar(lista[0],lista[1]);
        graficaArbol(arbol);
    }
})

buscar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        if(arbol.buscar(dato.value)){
            console.log('El nodo existe en el arbol.');
            console.log('');
        }else{
            console.log('El nodo no existe en el arbol.');
            console.log('');
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
    for (let i = 0; i < valores.length; i++) {
        arbol.agregar(valores[i])
        graficaArbol(arbol);
    }
    document.getElementById('mensaje').innerText = ''
    archivo.setAttribute('disabled', '')
})

const salida ={
    operacion: 'Arbol Binario',
    valores: []
}

guardar.addEventListener("click", (e) => {
    e.preventDefault()
    salida.valores = arbol.elementos();
    let texto = JSON.stringify(salida);
    download('BST.json', texto);
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

function graficaArbol(binario){
    let lista = new NodoArista();

    lista = binario.devolverNodosAristas(lista);

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