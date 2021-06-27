class NodoAVL{
    constructor(dato){
        this.valor = dato;
        this.derecha = null;
        this.izquierda = null;
        this.padre = null;
        this.factorB = 0
        this.altura = 0
    }
}

class AVL{
    constructor(){
        this.root = null;
        this.size = 0;
    }

    agregar(dato){
        dato = parseFloat(dato);
        if(dato != null){
            if(!this.buscar(dato)){
                this.root = this.insertar(dato,this.root)
                this.size++;
            }
        }else{
            console.log('No se recibio ningun dato en la entrada.')
        }
    }

    insertar(dato, nodo){
        if(nodo == null){
            return new NodoAVL(dato);
        }

        if(dato > nodo.valor){
            nodo.derecha = this.insertar(dato, nodo.derecha);
            nodo.derecha.padre = nodo;
        }else{
            nodo.izquierda = this.insertar(dato, nodo.izquierda);
            nodo.izquierda.padre = nodo;
        }

        this.actualiz(nodo);

        return this.balancear(nodo);
    }

    max(a,b){   //Devuelve el mayor de dos numeros.
        if(a > b){
            return a;
        }else{
            return b;
        }
    }

    actualiz(nodo){   //metodo que actualiza la altura y balance del nodo al agregarlo o rotarlo.
        let alturaL = (nodo.izquierda == null) ? -1 : nodo.izquierda.altura;
        let alturaR = (nodo.derecha == null) ? -1 : nodo.derecha.altura;

        nodo.altura = 1 + this.max(alturaR,alturaL);

        nodo.factorB = alturaR - alturaL;
    }

    balancear(nodo){    //revisa el factor de balance del nodo y hace la rotacion necesaria segun el caso.
        if(nodo.factorB == -2){
            if(nodo.izquierda.factorB <= 0){
                return this.rotacionR(nodo);
            }else{
                return this.lr(nodo);
            }
        }else if(nodo.factorB == 2){
            if(nodo.derecha.factorB >= 0){
                return this.rotacionL(nodo);
            }else{
                return this.rl(nodo);
            }
        }

        return nodo;
    }

    rotacionL(nodo){
        let nuevoP = nodo.derecha;

        nodo.derecha = nuevoP.izquierda;
        if(nodo.derecha != null){
            nodo.derecha.padre = nodo;
        }

        nuevoP.izquierda = nodo;
        if(nuevoP.izquierda != null){
            nuevoP.izquierda.padre = nuevoP;
        }

        this.actualiz(nodo);
        this.actualiz(nuevoP);
        return nuevoP;
    }

    rotacionR(nodo){
        let nuevoP = nodo.izquierda;

        nodo.izquierda = nuevoP.derecha;
        if(nodo.izquierda != null){
            nodo.izquierda.padre = nodo;
        }

        nuevoP.derecha = nodo;
        if(nuevoP.derecha != null){
            nuevoP.derecha.padre = nuevoP;
        }
        

        this.actualiz(nodo);
        this.actualiz(nuevoP);
        return nuevoP;
    }

    lr(nodo){   //rota a la izquierda y luego a la derecha.
        nodo.izquierda = this.rotacionL(nodo);
        return this.rotacionR(nodo);
    }

    rl(nodo){   //rota a la derecha y luego a la izquierda.
        nodo.derecha = this.rotacionR(nodo);
        return this.rotacionL(nodo);
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
        let nodo = this.nodo(dato);

        if(nodo != null){
            let padre = nodo.padre;

            let isDerecha = false;
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
            console.log('El dato ingresado no existe en el arbol.');
        }
    }

    buscar(dato, actual = this.root){
        if (this.size > 0){
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
        }else{
            return false;
        }
    }

    actualizar(existente, nuevo){
        existente = parseFloat(existente);
        nuevo = parseFloat(nuevo);
        if(this.buscar(existente)){
            this.eliminar(existente);
            this.agregar(nuevo);
        }else{
            console.log('el dato ingresado no está en el árbol.')
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
            lista = this.elementos(nodo.izquierda, lista);
            lista[lista.length] = nodo.valor;
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

const velocidad = document.getElementById("velocidad")
let num_velocidad = 3;

velocidad.oninput = () => {
    document.getElementById('numero').innerHTML = velocidad.value
    //num_velocidad = (velocidad.value * 1) / 5
    num_velocidad = velocidad.value
    
}

const arbolVL = new AVL();

const dato = document.getElementById('dato');

const agregar = document.getElementById('agregar');
const eliminar = document.getElementById('eliminar');
const actualizar = document.getElementById('actualizar');
const buscar = document.getElementById('buscar');

const guardar = document.getElementById('guardar');
const cargar = document.getElementById('cargar');
const lienzo = document.getElementById('lienzo');

agregar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        arbolVL.agregar(dato.value);

        console.log('Preorden');
        arbolVL.preorden();
        console.log('')
        console.log('Inorden');
        arbolVL.inorden();
        console.log('')
        console.log('Postorden');
        arbolVL.postorden();
        console.log('')
        graficaArbol(arbolVL);
    }
})

eliminar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        arbolVL.eliminar(dato.value);
        console.log('Recorridos:');
        console.log('Preorden:');
        arbolVL.preorden();
        console.log('');
        console.log('Inorden:');
        arbolVL.inorden();
        console.log('');
        console.log('Postorden:');
        arbolVL.postorden();
        console.log('');
        console.log('');
        graficaArbol(arbolVL);
    }
})

actualizar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        let lista = dato.value.split(',')
        arbolVL.actualizar(lista[0],lista[1]);
        graficaArbol(arbolVL);
    }
})

buscar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        if(arbolVL.buscar(dato.value)){
            console.log('El valor '+dato.value+' esta en el arbol.');
            console.log();
        }else{
            console.log('El dato no se encuentra en el arbol.');
            console.log();
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
        arbolVL.agregar(valores[i])
        graficaArbol(arbolVL);
    }
    document.getElementById('mensaje').innerText = ''
    archivo.setAttribute('disabled', '')
})

const salida ={
    operacion: 'AVL',
    valores: []
}

guardar.addEventListener("click", (e) => {
    e.preventDefault()
    salida.valores = arbolVL.elementos();
    let texto = JSON.stringify(salida);
    download('AVL.json', texto);
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