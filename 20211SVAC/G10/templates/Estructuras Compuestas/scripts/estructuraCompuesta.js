class ListaArboles{
    constructor(){
        this.lista = [];
        this.idActual = 0;
    }

    agregar(principal, secundario){
        if(this.lista[principal] == null){
            this.lista[principal] = new SubArbolBinario();
            this.lista[principal].id = this.idActual;
            this.idActual++; 
        }
        this.lista[principal].agregar(secundario,this.idActual);
        this.idActual++;
    }

    eliminar(principal, secundario){
        if(this.lista[principal] != null){
            this.lista[principal].eliminar(secundario);
            return true;
        }else{
            return false;
        }
    }

    actualizar(principal, secundario, nuevo){
        if(this.lista[principal] != null){
            if(this.lista[principal].buscar(secundario)){
                this.lista[principal].eliminar(secundario);
                this.lista[principal].agregar(nuevo, this.idActual);
                this.idActual++;
                return true;
            }
            
        }
        return false;
    }

    buscar(principal,secundario){
        if(this.lista[principal] != null){
            return this.lista[principal].buscar(secundario);
        }
        return false;
    }

    devolverLNA(){
        let datos = new NodoArista()
        let j;
        let enlazado;
        for (let i = 0; i < this.lista.length; i++) {
            if(this.lista[i] != null){
                datos.nodos.push({id:this.lista[i].id, label:'Árbol '+i, color:{border:'#6B5127',background:'#EBB254'}, shape: 'box'})
                j = i+1;
                enlazado = false;
                while(j < this.lista.length && !enlazado){
                    if(this.lista[j] != null){
                        datos.aristas.push({from:this.lista[i].id, to:this.lista[j].id, arrows:'from,to'})
                        enlazado = true;
                    }
                    j++;
                }
            }
        }

        for (let k = 0; k < this.lista.length; k++) {
            if(this.lista[k] != null){
                datos = this.lista[k].devolverNA(datos)
            }
        }

        return datos;
    }

    devolverLNABuscar(principal, objetivo){
        let datos = new NodoArista()
        let j;
        let enlazado;
        for (let i = 0; i < this.lista.length; i++) {
            if(this.lista[i] != null){
                datos.nodos.push({id:this.lista[i].id, label:'Árbol '+i, color:{border:'#6B5127',background:'#EBB254'}, shape: 'box'})
                j = i+1;
                enlazado = false;
                while(j < this.lista.length && !enlazado){
                    if(this.lista[j] != null){
                        datos.aristas.push({from:this.lista[i].id, to:this.lista[j].id, arrows:'from,to'})
                        enlazado = true;
                    }
                    j++;
                }
            }
        }

        for (let k = 0; k < this.lista.length; k++) {
            if(this.lista[k] != null){
                if(k == principal){
                    console.log('buscando');
                    datos = this.lista[k].devolverNABuscar(datos, objetivo);
                }else{
                    console.log('no buscando');
                    console.log(k+'!='+principal);
                    console.log(objetivo);
                    console.log(principal);
                    console.log('');
                    datos = this.lista[k].devolverNA(datos)
                }
            }
        }

        return datos;
    }
}

class SubNodoBinario{
    constructor(dato, id){
        this.valor = dato;
        this.derecha = null;
        this.izquierda = null;
        this.padre = null;
        this.id = id;
    }
}

class SubArbolBinario{
    constructor(){
        this.root = null;
        this.size = 0;
        this.id = null;
    }

    agregar(dato, id, actual = this.root){
        dato = parseFloat(dato);
        if (this.size > 0){
            if(dato > actual.valor){
                if ( actual.derecha != null){ //si el nodo a la derecha no esta vacio, continua buscando.
                    this.agregar(dato, id, actual.derecha);
                }else{
                    let nuevo = new SubNodoBinario(dato, id);
                    actual.derecha = nuevo;
                    actual.derecha.padre = actual;
                    this.size++;
                }
            }else{
                if (actual.izquierda != null){  //si el nodo a la izquierda no esta vacio, continua buscando.
                    this.agregar(dato, id,actual.izquierda);
                }else{
                    let nuevo = new SubNodoBinario(dato, id);
                    actual.izquierda = nuevo;
                    actual.izquierda.padre = actual;
                    this.size++;
                }
            }
        }else{
            let nuevo = new SubNodoBinario(dato, id);
            this.root = nuevo;
            this.size++;
        }
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
        }else if(dato == actual.valor){
            return true;
        }else{
            return false;
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

    devolverNA(nodoarista, nodo = this.root, numnodo = 0){

        nodoarista.nodos.push({id:nodo.id,  label:nodo.valor.toString()})

        if(nodo == this.root){
            nodoarista.aristas.push({from:this.id, to:nodo.id, arrows:'to'})
        }

        if(nodo.izquierda != null){
            nodoarista.aristas.push({from:nodo.id, to:nodo.izquierda.id, arrows:'to'})
            nodoarista =  this.devolverNA(nodoarista, nodo.izquierda, 0);
        }

        if(nodo.derecha != null){
            nodoarista.aristas.push({from:nodo.id, to:nodo.derecha.id, arrows:'to'})
            nodoarista = this.devolverNA(nodoarista, nodo.derecha, 0);
        }

        return nodoarista;
    }

    devolverNABuscar(nodoarista, objetivo, nodo = this.root, numnodo = 0){

        if(nodo.valor == objetivo){
            nodoarista.nodos.push({id:nodo.id,  label:nodo.valor.toString(),color:{border:'#477031',background:'#9AF26B'}})
        }else{
            nodoarista.nodos.push({id:nodo.id,  label:nodo.valor.toString()})
            console.log(nodo.valor+' != '+objetivo);
        }

        if(nodo == this.root){
            nodoarista.aristas.push({from:this.id, to:nodo.id, arrows:'to'})
        }

        if(nodo.izquierda != null){
            nodoarista.aristas.push({from:nodo.id, to:nodo.izquierda.id, arrows:'to'})
            nodoarista =  this.devolverNABuscar(nodoarista, objetivo, nodo.izquierda);
        }

        if(nodo.derecha != null){
            nodoarista.aristas.push({from:nodo.id, to:nodo.derecha.id, arrows:'to'})
            nodoarista = this.devolverNABuscar(nodoarista, objetivo, nodo.derecha);
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

const listaArbol = new ListaArboles();

const datoPrin = document.getElementById('dato_principal');
const datoSec = document.getElementById('dato_secundario');
const datoAc = document.getElementById('dato_actualizar');

const agregar = document.getElementById('agregar');
const buscar = document.getElementById('buscar');
const actualizar = document.getElementById('actualizar');
const eliminar = document.getElementById('eliminar');

const lienzo = document.getElementById('lienzo');
const reporte = document.getElementById('reporte');

const guardar = document.getElementById('guardar');
const cargar = document.getElementById('cargar');

let archivo = document.getElementById('file')
let entrada;

agregar.addEventListener("click", (e) =>{
    e.preventDefault
    if(datoPrin.value != '' && datoSec.value != ''){
        console.log(parseFloat(datoSec.value));
        listaArbol.agregar(parseInt(datoPrin.value), parseFloat(datoSec.value));
        reporte.innerHTML = 'Se agregó el dato.';
    }else{
        reporte.innerHTML = 'Por favor escribe datos para agregar.';
    }
    graficaListaArbol(listaArbol);
})

eliminar.addEventListener("click", (e) =>{
    e.preventDefault
    if(datoPrin.value != '' && datoSec.value != ''){
        if(listaArbol.eliminar(parseInt(datoPrin.value), parseFloat(datoSec.value))){
            reporte.innerHTML = 'Se eliminó el dato del árbol.';
        }else{
            reporte.innerHTML = 'El dato no existe en el árbol indicado.';
        }
    }else{
        reporte.innerHTML = 'Por favor escribe un dato para eliminar.';
    }
    graficaListaArbol(listaArbol);
})

buscar.addEventListener("click", (e) =>{
    e.preventDefault
    if(datoPrin.value != '' && datoSec.value != ''){
        if(listaArbol.buscar(parseInt(datoPrin.value), parseFloat(datoSec.value))){
            reporte.innerHTML = 'Se encontró el dato en la lista de árboles.';
            console.log(parseFloat(datoSec.value));
            graficaLABuscar(listaArbol, parseInt(datoPrin.value), parseFloat(datoSec.value))
        }else{
            reporte.innerHTML = 'El dato no se encuentra en la lista de árboles.';
            graficaListaArbol(listaArbol);
        }
        
    }else{
        reporte.innerHTML = 'Por favor escribe datos para buscar';
        graficaListaArbol(listaArbol);
    }
})

actualizar.addEventListener("click", (e) =>{
    e.preventDefault
    if(datoPrin.value != '' && datoSec.value != '' && datoAc.value != ''){
        if(listaArbol.actualizar(parseInt(datoPrin.value), parseFloat(datoSec.value),parseFloat(datoAc.value))){
            reporte.innerHTML = 'Se actualizó el dato exitosamente.';
            graficaLABuscar(listaArbol, parseInt(datoPrin.value), parseFloat(datoAc.value))
        }else{
            reporte.innerHTML = 'No se actualizó el nodo.';
            graficaListaArbol(listaArbol);
        }
        
    }else{
        reporte.innerHTML = 'Por favor escribe datos para actualizar.';
        graficaListaArbol(listaArbol);
    }
})

archivo.addEventListener('change', () => {
    let leer = new FileReader()
    leer.readAsText(archivo.files[0])
    leer.onload = function() {
    entrada = JSON.parse(leer.result)
    }
    reporte.innerText = 'Se cargó el archivo con exito';
})

cargar.addEventListener("click", (e) => {
    e.preventDefault()
    
    let valores = entrada['valores']

    let principal, secundario;

    for(let i = 0; i < valores.length; i++) {
        principal = valores[i]['principal']
        secundario = valores[i]['secundario']

        listaArbol.agregar(parseInt(principal), parseFloat(secundario));
    }

    reporte.innerText = 'Se leyó el json cargado.'
    archivo.setAttribute('disabled', '')
    graficaListaArbol(listaArbol);
})

const salida ={
    categoria: 'Estructura Compuesta',
    nombre:'Lista de árboles',
    almacenamiento:'Compuesto',
    animacion:'10',
    valores: []
}

guardar.addEventListener("click", (e) => {
    e.preventDefault()

    let datos = [];
    let arbol, dato;
    for(let j = 0; j < listaArbol.lista.length; j++){
        if(listaArbol.lista[j] != null){
            arbol = listaArbol.lista[j]
            arbol = arbol.elementos();
            console.log(arbol);
            for (let i = 0; i < arbol.length; i++) {
                dato = {principal:j,secundario:arbol[i]}
                datos.push(dato);
            }
        }
    }

    salida.valores = datos;
    let texto = JSON.stringify(salida);
    download('EstructuraCompuesta.json', texto)
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

function graficaListaArbol(listaA){
    let lista = new NodoArista();

    lista = listaA.devolverLNA(lista);

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

function graficaLABuscar(listaA, principal, objetivo){
    console.log(principal);
    let lista = new NodoArista();

    lista = listaA.devolverLNABuscar(principal, objetivo);

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