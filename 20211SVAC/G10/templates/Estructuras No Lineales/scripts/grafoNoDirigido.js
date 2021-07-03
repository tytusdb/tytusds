class NodoGrafo{
    constructor(label, id){
        this.label = label;
        this.id = id;
    }
}

class AristaGrafo{
    constructor(nodoA,nodoB,distancia){
        this.idA = nodoA.id;
        this.idB = nodoB.id;
        this.distancia = distancia;
    }
}

class Grafo{
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
            let nuevo = new NodoGrafo(nombre, this.idActual);
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
            let nueva = new AristaGrafo(nodoA,nodoB,lenArista);
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
                datos.nodos.push({id:nodo.id,label:nodo.label.toString()});
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
                    datos.nodos.push({id:nodo.id,label:nodo.label.toString()});
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

    recorridoPNA(nombre = null){
        let datos = new NodoArista();
        if(nombre == null){
            nombre = this.nodos[0].label;
        }

        if(this.getNodo(nombre) != null && this.nodos.length > 0){
            let nodo;
            for(let i = 0; i <= this.nodos.length; i++){
                nodo = this.nodos[i];
                if(nodo != null){
                    datos.nodos.push({id:nodo.id,label:nodo.label.toString()});
                }
            }

            let pila = [];
            let hallados = [];
            let actual = this.getNodo(nombre)
            pila.push(actual);
            hallados.push(actual.id);

            while(hallados.length < this.nodos.length && pila.length > 0){
                actual = pila.pop();
                for(let i = this.aristas.length -1; i >= 0; i--){
                    if(this.aristas[i].idA == actual.id){
                        if(!hallados.includes(this.aristas[i].idB)){
                            datos.aristas.push({from:this.aristas[i].idA     ,to:this.aristas[i].idB,     label:this.aristas[i].distancia.toString()});
                            hallados.push(this.aristas[i].idB)
                            pila.push(this.getNodoID(this.aristas[i].idB));
                        }
                    }else if(this.aristas[i].idB == actual.id){
                        if(!hallados.includes(this.aristas[i].idA)){
                            datos.aristas.push({from:this.aristas[i].idB     ,to:this.aristas[i].idA,     label:this.aristas[i].distancia.toString()});
                            hallados.push(this.aristas[i].idA)
                            pila.push(this.getNodoID(this.aristas[i].idA));
                        }
                    }
                }
            }


        }
        return datos;
    }

    recorridoANA(nombre = null){
        let datos = new NodoArista();
        if(nombre == null){
            nombre = this.nodos[0].label;
        }

        if(this.getNodo(nombre) != null && this.nodos.length > 0){
            let nodo;
            for(let i = 0; i <= this.nodos.length; i++){
                nodo = this.nodos[i];
                if(nodo != null){
                    datos.nodos.push({id:nodo.id,label:nodo.label.toString()});
                }
            }

            let cola = [];
            let hallados = [];
            let actual = this.getNodo(nombre)
            cola.push(actual);
            hallados.push(actual.id);

            while(hallados.length < this.nodos.length && cola.length > 0){
                actual = cola.pop();
                for(let i = 0; i < this.aristas.length -1; i++){
                    if(this.aristas[i].idA == actual.id){
                        if(!hallados.includes(this.aristas[i].idB)){
                            datos.aristas.push({from:this.aristas[i].idA     ,to:this.aristas[i].idB,     label:this.aristas[i].distancia.toString()});
                            hallados.push(this.aristas[i].idB)
                            cola.unshift(this.getNodoID(this.aristas[i].idB));
                        }
                    }else if(this.aristas[i].idB == actual.id){
                        if(!hallados.includes(this.aristas[i].idA)){
                            datos.aristas.push({from:this.aristas[i].idB     ,to:this.aristas[i].idA,     label:this.aristas[i].distancia.toString()});
                            hallados.push(this.aristas[i].idA)
                            cola.unshift(this.getNodoID(this.aristas[i].idA));
                        }
                    }
                }
            }


        }
        return datos;
    }

    nodoBP(actual, objetivo, hallados, datos, encontrado){
        let parametros = {hallados:hallados, datos:datos, encontrado:encontrado};
        let candidato;
        console.log("Actual: "+actual.label)

        let i = 0;
        while(i < this.aristas.length && !parametros.encontrado){
            if(this.aristas[i].idA == actual.id){
                candidato = this.getNodoID(this.aristas[i].idB)

                if(!hallados.includes(this.aristas[i].idB)){
                    if(candidato.label == objetivo){
                        console.log(candidato.label);
                        datos.nodos.push({id:candidato.id,  label:candidato.label.toString(),   color:{border:'#800F17',background:'#FF5854'}});
                        datos.aristas.push({from:this.aristas[i].idA     ,to:this.aristas[i].idB,     label:this.aristas[i].distancia.toString()});
                        hallados.push(this.aristas[i].idB);
                        parametros.encontrado = true;
                        return parametros;
                    }else{
                        datos.nodos.push({id:candidato.id,  label:candidato.label.toString()});
                        datos.aristas.push({from:this.aristas[i].idA     ,to:this.aristas[i].idB,     label:this.aristas[i].distancia.toString()});
                        hallados.push(this.aristas[i].idB);

                        parametros = this.nodoBP(candidato, objetivo, hallados, datos, encontrado);
                    }
                }
            }else if(this.aristas[i].idB == actual.id){
                candidato = this.getNodoID(this.aristas[i].idA)

                if(!hallados.includes(this.aristas[i].idA)){
                    if(candidato.label == objetivo){
                        console.log(candidato.label);
                                
                        datos.nodos.push({id:candidato.id,  label:candidato.label.toString(),   color:{border:'#800F17',background:'#FF5854'}});
                        datos.aristas.push({from:this.aristas[i].idB     ,to:this.aristas[i].idA,     label:this.aristas[i].distancia.toString()});
                        hallados.push(this.aristas[i].idA);
                        parametros.encontrado = true;
                        return parametros;
                    }else{
                        datos.nodos.push({id:candidato.id,  label:candidato.label.toString()});
                        datos.aristas.push({from:this.aristas[i].idB     ,to:this.aristas[i].idA,     label:this.aristas[i].distancia.toString()});
                        hallados.push(this.aristas[i].idA);
                        
                        parametros = this.nodoBP(candidato, objetivo, hallados, datos, encontrado);
                    }
                }
            }
            i++;
        }

        return parametros;
    }

    busquedaPNA(objetivo, nombre = null){
        let datos = new NodoArista();

        if(nombre == null){
            nombre = this.nodos[0].label;
        }

        let primero = this.getNodo(nombre);
        let encontrado = false;
        let hallados = [];
        hallados.push(primero.id);
        datos.nodos.push({id:primero.id,label:primero.label, color:{border:'#6B5127',background:'#EBB254'}});

        datos = this.nodoBP(primero, objetivo, hallados, datos, encontrado).datos;
        return datos;
    }

    busquedaANA(objetivo, nombre = null){
        let datos = new NodoArista();
        if(nombre == null){
            nombre = this.nodos[0].label;
        }

        if(this.getNodo(nombre) != null && this.nodos.length > 0){
            let nodo;

            let cola = [];
            let hallados = [];
            let actual = this.getNodo(nombre);
            let encontrado = false;
            let candidato;
            let i;
            
            cola.push(actual);
            hallados.push(actual.id);
            datos.nodos.push({id:actual.id,label:actual.label.toString(), color:{border:'#6B5127',background:'#EBB254'}});
            

            while(hallados.length < this.nodos.length && !encontrado && cola.length > 0){
                actual = cola.pop();
                i = 0;
                while(i < this.aristas.length && !encontrado){
                    if(this.aristas[i].idA == actual.id){
                        if(!hallados.includes(this.aristas[i].idB)){
                            candidato = this.getNodoID(this.aristas[i].idB)
                            if(candidato.label == objetivo){
                                
                                datos.nodos.push({id:candidato.id,  label:candidato.label.toString(),   color:{border:'#800F17',background:'#FF5854'}});
                                datos.aristas.push({from:this.aristas[i].idA     ,to:this.aristas[i].idB,     label:this.aristas[i].distancia.toString()});
                                hallados.push(this.aristas[i].idB)
                                cola.unshift(candidato);
                                encontrado = true
                            }else{
                                datos.nodos.push({id:candidato.id,  label:candidato.label.toString()});
                                datos.aristas.push({from:this.aristas[i].idA     ,to:this.aristas[i].idB,     label:this.aristas[i].distancia.toString()});
                                hallados.push(this.aristas[i].idB)
                                cola.unshift(candidato);
                            }
                        }
                    }else if(this.aristas[i].idB == actual.id){
                        candidato = this.getNodoID(this.aristas[i].idA)
                        if(candidato.label == objetivo){
                            datos.nodos.push({id:candidato.id,  label:candidato.label.toString(),   color:{border:'#800F17',background:'#FF5854'}});
                            datos.aristas.push({from:this.aristas[i].idB     ,to:this.aristas[i].idA,     label:this.aristas[i].distancia.toString()});
                            hallados.push(this.aristas[i].idA)
                            cola.unshift(candidato);
                            encontrado = true
                        }
                        if(!hallados.includes(this.aristas[i].idA)){
                            datos.nodos.push({id:candidato.id,  label:candidato.label.toString()});
                            datos.aristas.push({from:this.aristas[i].idB     ,to:this.aristas[i].idA,     label:this.aristas[i].distancia.toString()});
                            hallados.push(this.aristas[i].idA)
                            cola.unshift(candidato);
                        }
                    }
                    i++;
                }
            }
        return datos;
    }
}}

class NodoArista{
    constructor(){
        this.nodos = []
        this.aristas = []
    }
}

const grafo = new Grafo();

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

const recorridoProfundidad = document.getElementById('recorridop');
const recorridoAnchura = document.getElementById('recorridoa');
const busquedaProfundidad = document.getElementById('busquedap');
const busquedaAnchura = document.getElementById('busquedaa');
const costoUniforme = document.getElementById('costouniforme');
const arbolMinimo = document.getElementById('arbolminimo');


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
            graficaGrafo(grafo,"buscar", nodoUno.value);
        }else{
            reporte.innerHTML = 'El nodo "'+nodoUno.value+'" no existe en el grafo.'
        }
    }else if(nodoDos.value != ''){
        if(grafo.getNodo(nodoDos.value) != null){
            reporte.innerHTML = 'Se resaltó el nodo "'+nodoUno.value+'" en el grafo.'
            graficaGrafo(grafo,"buscar", nodoDos.value);
        }else{
            reporte.innerHTML = 'El nodo no existe en el grafo.'
        }
    }else{
        reporte.innerHTML = 'Por favor escribe un nodo para buscar.';
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
    reporte.innerHTML = 'Se cargó el archivo con éxito'
})

recorridoProfundidad.addEventListener("click", (e) =>{
    e.preventDefault
    if(grafo.nodos.length > 0){
        if(nodoUno.value != ''){
            graficaGrafo(grafo, "recorridop", nodoUno.value);
            reporte.innerHTML = 'Mostrando el recorrido por profundidad desde el nodo "'+nodoUno.value+'".'
        }else if(nodoDos.value != ''){
            graficaGrafo(grafo, "recorridop", nodoDos.value);
            reporte.innerHTML = 'Mostrando el recorrido por profundidad desde el nodo "'+nodoDos.value+'".'
        }else{
            graficaGrafo(grafo, "recorridop");
            reporte.innerHTML = 'Mostrando el recorrido por profundidad desde el nodo "'+grafo.nodos[0].label+'".'
        }
        
    }else{
        reporte.innerHTML = 'El grafo no tiene nodos.'
    }
})

recorridoAnchura.addEventListener("click", (e) =>{
    e.preventDefault
    if(grafo.nodos.length > 0){
        if(nodoUno.value != ''){
            graficaGrafo(grafo, "recorridoa", nodoUno.value);
            reporte.innerHTML = 'Mostrando el recorrido por anchura desde el nodo "'+nodoUno.value+'".'
        }else if(nodoDos.value != ''){
            graficaGrafo(grafo, "recorridoa", nodoDos.value);
            reporte.innerHTML = 'Mostrando el recorrido por anchura desde el nodo "'+nodoDos.value+'".'
        }else{
            graficaGrafo(grafo, "recorridoa");
            reporte.innerHTML = 'Mostrando el recorrido por anchura desde el nodo "'+grafo.nodos[0].label+'".'
        }
        
    }else{
        reporte.innerHTML = 'El grafo no tiene nodos.';
    }
})

busquedaProfundidad.addEventListener("click", (e) =>{
    e.preventDefault
    if(grafo.nodos.length > 0){
        if(nodoUno.value != ''){
            if(nodoDos.value != ''){
                if(grafo.getNodo(nodoDos.value) != null && grafo.getNodo(nodoUno.value) != null){
                    graficaGrafo(grafo, "busquedap", nodoDos.value, nodoUno.value);
                    reporte.innerHTML = 'Mostrando búsqueda por profundidad de "'+nodoDos.value+'" desde "'+nodoUno.value+'".';
                }else{
                    reporte.innerHTML = 'Uno o dos nodos no están en el grafo.';
                }
            }else{
                if(grafo.getNodo(nodoUno.value) != null){
                    graficaGrafo(grafo, "busquedap", nodoUno.value);
                    reporte.innerHTML = 'Mostrando búsqueda por profundidad de "'+nodoUno.value+'" desde "'+grafo.nodos[0].label+'".';
                }else{
                    reporte.innerHTML = 'El nodo no está en el grafo.';
                }
            }
        }else if(nodoDos.value != ''){
            if(grafo.getNodo(nodoUno.value) != null){
                graficaGrafo(grafo, "busquedap", nodoDos.value);
                reporte.innerHTML = 'Mostrando búsqueda por profundidad de "'+nodoDos.value+'" desde "'+grafo.nodos[0].label+'".';
            }else{
                reporte.innerHTML = 'El nodo no está en el grafo.';
            }
        }else{
            reporte.innerHTML = 'Por favor escribe un nodo para buscar.';
        }
    }else{
        reporte.innerHTML = 'El grafo no tiene nodos.';
    }
})

busquedaAnchura.addEventListener("click", (e) =>{
    e.preventDefault
    if(grafo.nodos.length > 0){
        if(nodoUno.value != ''){
            if(nodoDos.value != ''){
                if(grafo.getNodo(nodoDos.value) != null && grafo.getNodo(nodoUno.value) != null){
                    graficaGrafo(grafo, "busquedaa", nodoDos.value, nodoUno.value);
                    reporte.innerHTML = 'Mostrando búsqueda por anchura de "'+nodoDos.value+'" desde "'+nodoUno.value+'".';
                }else{
                    reporte.innerHTML = 'Uno o dos nodos no están en el grafo.';
                }
            }else{
                if(grafo.getNodo(nodoUno.value) != null){
                    graficaGrafo(grafo, "busquedaa", nodoUno.value);
                    reporte.innerHTML = 'Mostrando búsqueda por anchura de "'+nodoUno.value+'" desde "'+grafo.nodos[0].label+'".';
                }else{
                    reporte.innerHTML = 'El nodo no está en el grafo.';
                }
            }
        }else if(nodoDos.value != ''){
            if(grafo.getNodo(nodoUno.value) != null){
                graficaGrafo(grafo, "busquedaa", nodoDos.value);
                reporte.innerHTML = 'Mostrando búsqueda por anchura de "'+nodoDos.value+'" desde "'+grafo.nodos[0].label+'".';
            }else{
                reporte.innerHTML = 'El nodo no está en el grafo.';
            }
        }else{
            reporte.innerHTML = 'Por favor escribe un nodo para buscar.';
        }
    }else{
        reporte.innerHTML = 'El grafo no tiene nodos.';
    }
})

costoUniforme.addEventListener("click", (e) =>{
    e.preventDefault
    if(grafo.nodos.length > 0){
        if(nodoUno.value != ''){
            graficaGrafo(grafo, "recorridop", nodoUno.value);
        }else if(nodoDos.value != ''){
            graficaGrafo(grafo, "recorridop", nodoDos.value);
        }else{
            graficaGrafo(grafo, "recorridop");
        }
    }else{
        reporte.innerHTML = 'El grafo no tiene nodos.';
    }
})

arbolMinimo.addEventListener("click", (e) =>{
    e.preventDefault
    if(grafo.nodos.length > 0){
        if(nodoUno.value != ''){
            graficaGrafo(grafo, "recorridop", nodoUno.value);
        }else if(nodoDos.value != ''){
            graficaGrafo(grafo, "recorridop", nodoDos.value);
        }else{
            graficaGrafo(grafo, "recorridop");
        }
    }else{
        reporte.innerHTML = 'El grafo no tiene nodos.';
    }
})

cargar.addEventListener("click", (e) => {
    e.preventDefault()
    let valores = entrada["valores"];
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

function graficaGrafo(grafo,tipo = null,label = null, labelB = null){
    let lista = null;

    switch(tipo){
        case "buscar":
            lista = grafo.devolverNABuscar(label);
            break;
        case "recorridop":
            lista = grafo.recorridoPNA(label);
            break;
        case "recorridoa":
            lista = grafo.recorridoANA(label);
            break;
        case "busquedap":
            lista = grafo.busquedaPNA(label, labelB);
            break;
        case "busquedaa":
            lista = grafo.busquedaANA(label, labelB);
            break;
        case "arbolminimo":
            lista = grafo.arbolMin(label);
            break;
        case "costouniforme":
            lista = grafo.costoUni(label,labelB);
            break;
        default:
            lista = grafo.devolverNodosAristas();
            break;
    }
    
    let nodos = new vis.DataSet(lista.nodos);
    let aristas = new vis.DataSet(lista.aristas);

    let datos = {
        nodes: nodos,
        edges: aristas
    };

    let opciones = {physics: false};

    let grafica = new vis.Network(lienzo, datos, opciones);
}