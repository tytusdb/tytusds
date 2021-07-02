class NodoGrafoD{
    constructor(label, id){
        this.label = label;
        this.id = id;
    }
}

class AristaGrafoD{
    constructor(nodoA,nodoB,distancia){
        this.idA = nodoA.id;
        this.idB = nodoB.id;
        this.distancia = distancia;
    }
}

class GrafoDirigido{
    constructor(){
        this.nodos = [];
        this.aristas = [];
        this.idActual = 0;
    }

    reset(){
        this.nodos = [];
        this.aristas = [];
        this.idActual = 0;
    }

    agregar(nombre){
        if(this.getNodo(nombre) == null){
            let nuevo = new NodoGrafoD(nombre, this.idActual);
            this.nodos.push(nuevo);
            this.idActual++;
            return true;
        }else{
            
            return false;
        }
    }

    agregarArista(nombreA, nombreB, lenArista = 1){
        this.agregar(nombreA);
        let nodoA = this.getNodo(nombreA);

        this.agregar(nombreB);
        let nodoB = this.getNodo(nombreB);

        if(this.getArista(nodoA.id,nodoB.id,lenArista) == null){
            let nueva = new AristaGrafoD(nodoA,nodoB,lenArista);
            this.aristas.push(nueva);
            return true;
        }else{
            return false;
        }
    }

    getNodo(nombre){
        for( let i = 0; i < this.nodos.length; i++){
            if(nombre == this.nodos[i].label){
                return this.nodos[i];
            }
        }

        return null;
    }

    getNodoID(id){
        for( let i = 0; i < this.nodos.length; i++){
            if(id == this.nodos[i].id){
                return this.nodos[i];
            }
        }

        return null;
    }

    getArista(idA,idB,dista){
        for(let i = 0; i < this.aristas.length;i++){
            if(idA == this.aristas[i].idA){
                if(idB == this.aristas[i].idB){
                    if(dista == this.aristas[i].distancia){
                        return aristas[i];
                    }
                }
            }
        }

        return null;
    }

    actualizar(existente, nuevo){
        let nodo = this.getNodo(existente);
        if(nodo != null){
            nodo.label = nuevo;
            return true;
        }else{
            return false;
        }
    }

    eliminar(nombre){
        let nodo = null;
        for(let i = 0; i < this.nodos.length; i++){
            if(this.nodos[i].label == nombre){
                nodo = this.nodos[i];
                this.nodos.splice(i,1);
            }
        }

        if(nodo != null){
            for(let i = 0; i < this.aristas.length; i++){
                if(this.aristas[i].idA == nodo.id || this.aristas[i].idB == nodo.id){
                    this.aristas.splice(i,1);
                }
            }
            return true;
        }else{
            console.log('El dato no se encuentra en el grafo.');
            return false;
        }
    }

    devolverNodosAristas(){
        let datos = new NodoArista();
        let nodo = null;
        let arista = null;
        for(let i = 0; i <= this.nodos.length; i++){
            nodo = this.nodos[i];
            if(nodo != null){
                datos.nodos.push({id:nodo.id,label:nodo.label.toString(), color:{border:'#44753D',background:'#4AF535'}});
            }
        }

        for(let i = 0; i <= this.aristas.length; i++){
            arista = this.aristas[i];
            if(arista != null){
                datos.aristas.push({from:arista.idA,to:arista.idB,arrows:'to',label:arista.distancia.toString()});
            }
        }

        return datos;
    }

    devolverNABuscar(nombre){
        let datos = new NodoArista();
        let nodo = null;
        let arista = null;
        for(let i = 0; i <= this.nodos.length; i++){
            nodo = this.nodos[i];
            if(nodo != null){
                if(nodo.label.toString() == nombre){
                    datos.nodos.push({id:nodo.id,label:nodo.label.toString(), color:{border:'#800F17',background:'#FF5854'}});
                }else{
                    datos.nodos.push({id:nodo.id,label:nodo.label.toString(), color:{border:'#44753D',background:'#4AF535'}});
                }
            }
        }

        for(let i = 0; i <= this.aristas.length; i++){
            arista = this.aristas[i];
            if(arista != null){
                datos.aristas.push({from:arista.idA,to:arista.idB,label:arista.distancia.toString()});
            }
        }

        return datos;
    }
}

class NodoArista{
    constructor(){
        this.nodos = []
        this.aristas = []
    }
}

const grafo = new GrafoDirigido();

const nodoUno = document.getElementById('nodo1');
const nodoDos = document.getElementById('nodo2');
const distancia = document.getElementById('distancia');

const agregar = document.getElementById('agregar');
const agregarArista = document.getElementById('agregararista');
const eliminar = document.getElementById('eliminar');
const actualizar = document.getElementById('actualizar');
const buscar = document.getElementById('buscar');
const limpiar = document.getElementById('limpiar');

const lienzo = document.getElementById('lienzo');
const reporte = document.getElementById('reporte');

const guardar = document.getElementById('guardar');
const cargar = document.getElementById('cargar');
const archivo = document.getElementById('file');
let entrada;

agregar.addEventListener("click", (e) =>{
    e.preventDefault
    if(nodoUno.value != ''){
        if(grafo.agregar(nodoUno.value)){
            reporte.innerHTML = 'Se añadió el nodo exitosamente.';
        }else{
            reporte.innerHTML = 'Ya existe un nodo con ese nombre en el grafo.';
        }
    }else if(nodoDos.value != ''){
        if(grafo.agregar(nodoDos.value)){
            reporte.innerHTML = 'Se añadió el nodo exitosamente.';
        }else{
            reporte.innerHTML = 'Ya existe un nodo con ese nombre en el grafo.';
        }
    }
    graficaGrafo(grafo);
})

agregarArista.addEventListener("click", (e) =>{
    e.preventDefault;
    let num = parseFloat(distancia.value);
    if(nodoUno.value != '' && nodoDos.value != '' && typeof num == "number"){
        if(grafo.agregarArista(nodoUno.value,nodoDos.value,num)){
            reporte.innerHTML = 'Se añadió la arista exitosamente.';
        }else{
            reporte.innerHTML = 'Ya existe una arista exactamente igual en el grafo.';
        }
        
    }
    graficaGrafo(grafo);
})

eliminar.addEventListener("click", (e) =>{
    e.preventDefault
    if(nodoUno.value != ''){
        if(grafo.eliminar(nodoUno.value)){
            reporte.innerHTML = 'Se eliminó a "'+nodoUno.value+'" y todas sus aristas exitosamente.';
        }else{
            reporte.innerHTML = 'No existe un nodo con ese nombre en el grafo.';
        }
        
    }else if(nodoDos.value != ''){
        if(grafo.eliminar(nodoDos.value)){
            reporte.innerHTML = 'Se eliminó a "'+nodoDos.value+'" y todas sus aristas exitosamente.';
        }else{
            reporte.innerHTML = 'No existe un nodo con ese nombre en el grafo.';
        }
    }
    graficaGrafo(grafo);
})

actualizar.addEventListener("click", (e) =>{
    e.preventDefault
    if(nodoUno.value != '' && nodoDos.value != ''){
        if(grafo.actualizar(nodoUno.value,nodoDos.value)){
            reporte.innerHTML = 'Se actualizó el nodo a "'+nodoDos.value+'" exitosamente.';
        }else{
            reporte.innerHTML = 'El nombre ingresado no está en el árbol.';
        }
        graficaGrafo(grafo);
    }
})

buscar.addEventListener("click", (e) =>{
    e.preventDefault
    if(nodoUno.value != ''){
        if(grafo.getNodo(nodoUno.value) != null){
            reporte.innerHTML = 'Se resaltó el nodo "'+nodoUno.value+'" en el grafo.'
            graficaBuscar(grafo, nodoUno.value);
        }else{
            reporte.innerHTML = 'El nodo "'+nodoUno.value+'" no existe en el grafo.'
        }
    }else if(nodoDos.value != ''){
        if(grafo.getNodo(nodoDos.value) != null){
            reporte.innerHTML = 'Se resaltó el nodo "'+nodoUno.value+'" en el grafo.'
            graficaBuscar(grafo, nodoDos.value);
        }else{
            reporte.innerHTML = 'El nodo no existe en el grafo.'
        }
    }
})

limpiar.addEventListener("click", (e) =>{
    e.preventDefault
    grafo.reset();
    graficaGrafo(grafo);
    reporte.innerHTML = 'Se reinició el grafo.'
})

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
    let listaA = null;
    for (let i = 0; i < valores.length; i++) {
        grafo.agregar(valores[i].vertice.toString());
        listaA = valores[i].aristas;
        for(let j = 0; j < listaA.length; j++){
            grafo.agregarArista(valores[i].vertice.toString(), listaA[j].arista.toString(), listaA[j].distancia.toString());
        }
    }
    graficaGrafo(grafo);
    reporte.innerHTML = 'Se leyó el json cargado.'
    archivo.setAttribute('enabled', '')
})

const salida ={
    categoria: 'Estructura No Lineal',
    nombre:'Grafo no Dirigido',
    almacenamiento:'Matriz/Lista',
    animacion:'10',
    valores: []
}

guardar.addEventListener("click", (e) => {
    e.preventDefault()
    let nodos = [];
    let nodoJ = null;
    let nodoB = null;
    let listaNodos = grafo.nodos;
    let listaAristas = grafo.aristas;
    for(let i = 0; i < listaNodos.length; i++){
        nodoJ = {vertice:listaNodos[i].label,aristas:[]};

        for(let j = 0; j < listaAristas.length; j++){
            if(listaAristas[j].idA == listaNodos[i].id){
                nodoB = grafo.getNodoID(listaAristas[j].idB);
                nodoB = {arista:nodoB.label,distancia:listaAristas[j].distancia};
                nodoJ.aristas.push(nodoB);
            }
        }
        nodos.push(nodoJ);
    }

    salida.valores = nodos;
    let texto = JSON.stringify(salida);
    download('grafoNoDirigido.json', texto);
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

function graficaGrafo(grafo){
    let lista = new NodoArista();

    lista = grafo.devolverNodosAristas();

    let nodos = new vis.DataSet(lista.nodos);
    let aristas = new vis.DataSet(lista.aristas);

    let datos = {
        nodes: nodos,
        edges: aristas
    };

    let opciones = {physics: false};

    let grafica = new vis.Network(lienzo, datos, opciones);
}

function graficaBuscar(grafo, label){
    let lista = new NodoArista();

    lista = grafo.devolverNABuscar(label);

    let nodos = new vis.DataSet(lista.nodos);
    let aristas = new vis.DataSet(lista.aristas);

    let datos = {
        nodes: nodos,
        edges: aristas
    };
    console.log(datos);

    let opciones = {physics: false};

    let grafica = new vis.Network(lienzo, datos, opciones);
}