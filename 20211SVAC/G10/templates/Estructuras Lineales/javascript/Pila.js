class NodoPila{
    constructor(dato){
        this.valor = dato;
        this.arriba = null;
        this.abajo = null
    }
}

class Pila{
    constructor(){
        this.top = null
        this.bottom = null
        this.length = 0

    }

    push(dato){
        let nuevo = new NodoPila(dato);
        if (this.length > 0){
            this.top.arriba = nuevo;
            nuevo.abajo = this.top;
            this.top = nuevo;
            this.length++;
        }else{
            this.bottom = nuevo;
            this.top = nuevo;
            this.length++;
        }
    }

    pop(){
        if (this.length > 0){
            let nodo = this.top;
            this.top = nodo.abajo;
            this.length--;
            return nodo.valor;
        }else if(this.length == 1){
            let nodo = this.top;
            this.top = null;
            this.bottom = null;
            this.length--;
            return nodo.valor;
        }else{
            return null;
        }
    }

    actualizar(existente, nuevo){
        let nodo = this.bottom;
        let encontrado = false;
        let i = 0;

        while (encontrado == false && i < this.length){
            if (nodo.valor == existente){
                nodo.valor = nuevo;
                encontrado = true
            }else{
                nodo = nodo.arriba;
                i++;
            }
        }
        if (encontrado){
            console.log('Se actualizo el valor.');
        }else{
            console.log('No se encontró el dato.');
        }
    }

    buscar(dato){
        let nodo = this.bottom;
        let i = 0;

        while (i < this.length){
            if (nodo.valor == dato){
                return true;
            }else{
                nodo = nodo.arriba;
                i++;
            }
        }

        return false;
    }

    cargar(){
        console.log('leyendo json.');
    }

    guardar(){
        console.log('guardando en json.')
    }

    mostrar(){
        let actual = this.top;
        while(actual != null){
            console.log(actual.valor);
            actual = actual.abajo;
        }
    }

    devolverNodosAristas(nodoarista, nodo = this.top, numnodo = 0){
        if(nodo != null){
            nodoarista.nodos.push({id:numnodo,label:nodo.valor.toString()});
            nodoarista.aristas.push({from:numnodo,to:numnodo+1});
            if(nodo.abajo != null){
                nodoarista = this.devolverNodosAristas(nodoarista,nodo.abajo,numnodo+1);
            }
        }
        return nodoarista
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

const pila = new Pila();

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
        pila.push(dato.value);
        graficaPila(pila);
    }
})

eliminar.addEventListener("click", (e) =>{
    e.preventDefault
    pila.pop();
    graficaPila(pila);
    
})

actualizar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        
    }
})

buscar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        if(pila.buscar(dato.value)){
            console.log('El nodo existe en la pila.');
            console.log('');
        }else{
            console.log('El nodo no existe en la pila.');
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
        pila.push(valores[i])
        graficaPila(pila);
    }
    document.getElementById('mensaje').innerText = ''
    archivo.setAttribute('disabled', '')
})

function graficaPila(pila){
    let lista = new NodoArista();

    lista = pila.devolverNodosAristas(lista);

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