/* ------Lista Simple------ */

class Nodo{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
    }
}

class Lista_Simple{
    constructor(){
        this.primero = null;
        this.size = 0;
    }

    insertar(dato){
        let nuevo = new Nodo(dato);
        if(this.primero == null){
            this.primero = nuevo;
        }else{
            let actual = this.primero;
            while(actual.siguiente){
                actual = actual.siguiente;
            }
            actual.siguiente = nuevo;
        }
        this.size++;
    }

    print(){
        let aux = this.primero;
        while(aux != null){
            console.log("Dato: ", aux.dato);
            aux = aux.siguiente;
        }
        console.log("El tamaño de la lista es de: ", this.size)
    }

    buscar(valor){
        let aux = this.primero;
        while(aux != null){
            if(aux.dato == valor){
                console.log("Si se encontro el dato: ", valor)
                return aux;
            }
            aux = aux.siguiente;
        }
        console.log("No se encontro el dato")
        return null;
    }

    actualizar(dato_viejo, dato_nuevo){
        let aux = this.primero;
        while(aux != null){
            if(aux.dato == dato_viejo){
                console.log("Si se encontro el dato: ", dato_viejo)
                aux.dato = dato_nuevo;
                console.log("Se actualizo el dato exitosamente");
                return aux;
            }
            aux = aux.siguiente;
        }
        console.log("No se encontro el dato")
        return null;
    }

    eliminar(dato){
        let actual = this.primero;
        let previo = null;

        while(actual != null){
            if(actual.dato == dato){
                if(!previo){
                    this.primero = actual.siguiente;
                }else{
                    previo.siguiente = actual.siguiente;
                }
                this.size--;
                return actual.dato;
            }
            previo = actual;
            actual = actual.siguiente;
        }
        console.log("No se encontro el dato")
        return null;
    }
}

/* --------Implementacion---------------- */

let list = document.getElementById('lista');
let nodes = document.getElementsByClassName('node');
let pointers = document.getElementsByClassName('pointer');
var indice = 0;
var velocidad = 500;
var categoria = "";
var tipo = "";
var repeticion = "";
var animacion = ""; 

let lista_simple = new Lista_Simple();

function animacion_nodo(i) {
    return new Promise(resolve => {
        console.log("se hizo algo");
        nodes[i].animate([{transform: 'scale(0.5)', background: '#f12711', 
        background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
        background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0},
        {transform: 'scale(1)',background: '#f12711', 
        background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
        background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.2},
        {transform: 'scale(1.5)',background: '#f12711', 
        background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
        background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.5}],
        {duration:velocidad});
        setTimeout(()=> resolve(), velocidad);
    });
}

async function nodos_animados(from, to) {
    for (let i = from; i <= to; i++) {
        await animacion_nodo(i);
    }
}

async function insertar_nodo(){
    var dato = document.getElementById('dato_pag').value;
    var checkbox = document.getElementById('checkbox').checked;
    var encontrado = false;

    if(dato === ''){
        alert("Por favor ingrese un dato");
        return false;
    }else{
        if(checkbox == true){
            lista_simple.insertar(dato);
            console.log("Activado");
            let node = document.createElement('div');
            node.classList.add('node');
    
            let number = document.createElement('p');
            number.classList.add('number');
    
            let text = document.createTextNode(dato);
    
            number.appendChild(text);
            node.appendChild(number);
    
            let pointer = document.createElement('div');
            pointer.classList.add('pointer');
    
            let img = document.createElement('img');
            img.src = "img/flecha6.png";
        
            pointer.appendChild(img);
    
            if(indice === 0){
                list.appendChild(node);
                list.appendChild(pointer);
                node.animate([{transform: 'scale(0.5)', background: '#f12711', 
                background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0},
                {transform: 'scale(1)',background: '#f12711', 
                background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.2},
                {transform: 'scale(1.5)',background: '#f12711', 
                background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.5}],
                {duration: velocidad});
                indice++;
            }else{
                await nodos_animados(0, nodes.length-1);
                list.appendChild(node);
                list.appendChild(pointer);
                node.animate([{transform: 'scale(0.5)', background: '#f12711', 
                background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0},
                {transform: 'scale(1)',background: '#f12711', 
                background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.2},
                {transform: 'scale(1.5)',background: '#f12711', 
                background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.5}],
                {duration:velocidad});
                indice++;
                console.log(nodes.length)
            }
        }else{
            console.log("Apagado");
            let node = document.createElement('div');
            node.classList.add('node');
    
            let number = document.createElement('p');
            number.classList.add('number');
    
            let text = document.createTextNode(dato);
    
            number.appendChild(text);
            node.appendChild(number);
    
            let pointer = document.createElement('div');
            pointer.classList.add('pointer');
    
            let img = document.createElement('img');
            img.src = "img/flecha6.png";
        
            pointer.appendChild(img);
    
            if(indice === 0){
                lista_simple.insertar(dato);
                list.appendChild(node);
                list.appendChild(pointer);
                node.animate([{transform: 'scale(0.5)', background: '#f12711', 
                background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0},
                {transform: 'scale(1)',background: '#f12711', 
                background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.2},
                {transform: 'scale(1.5)',background: '#f12711', 
                background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.5}],
                {duration: velocidad});
                indice++;
            }else{
                for(var i = 0; i<nodes.length; i++){
                    let comparacion = nodes[i].firstChild.innerHTML;
                    //console.log("->",comparacion);
                    if(dato == comparacion){
                        encontrado = true;
                        break;
                    }
                }
                if(encontrado == false){
                    lista_simple.insertar(dato);
                    await nodos_animados(0, nodes.length-1);
                    list.appendChild(node);
                    list.appendChild(pointer);
                    node.animate([{transform: 'scale(0.5)', background: '#f12711', 
                    background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                    background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0},
                    {transform: 'scale(1)',background: '#f12711', 
                    background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                    background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.2},
                    {transform: 'scale(1.5)',background: '#f12711', 
                    background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                    background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.5}],
                    {duration:velocidad});
                    indice++;
                    console.log(nodes.length)
                }
            }
        }
    }
}

async function eliminar_nodo(){
    var eliminar_dato = document.getElementById('dato_pag').value;
    var tamaño = 0
    var encontrado = false;
    lista_simple.eliminar(eliminar_dato);
    if(eliminar_dato === ''){
        alert("Por favor ingrese un dato");
        return false;
    }else{
        for(var i = 0; i<nodes.length; i++){
            var muestra = nodes[i].firstChild.innerHTML;
            console.log(muestra);
            tamaño++;
            if(muestra == eliminar_dato){
                encontrado = true;
                await nodos_animados(0, tamaño-1);
                nodes[tamaño-1].animate([{background: 'lime', opacity: 1, offset: 0}],{duration:velocidad});
                console.log("encontrado");
                setTimeout(()=>{
                    list.removeChild(nodes[i]);
                    list.removeChild(pointers[i]);
                },velocidad-500)
                indice--;
                break;
            }      
        }
        if(encontrado==false){
            alert("no se encontro");
            console.log("no se encontro"); 
        }
    }
    console.log("->",tamaño);
}

async function actualizar_nodo(){
    var encontrado = false;
    var dato_viejo = document.getElementById('dato_viejo').value;
    var dato_nuevo = document.getElementById('dato_nuevo').value;
    lista_simple.actualizar(dato_viejo, dato_nuevo);

    let node_nuevo = document.createElement('div');
    node_nuevo.classList.add('node');

    let number = document.createElement('p');
    number.classList.add('number');

    let text = document.createTextNode(dato_nuevo);

    number.appendChild(text);
    node_nuevo.appendChild(number);

    var tamaño = 0

    if(dato_viejo === '' || dato_nuevo === ''){
        alert("Se necesita llenar los dos parametros");
        return false;
    }else{
        for(var i = 0; i<nodes.length; i++){
            var muestra = nodes[i].firstChild.innerHTML;
            console.log(muestra);
            tamaño++;
            if(muestra == dato_viejo){
                encontrado=true;
                await nodos_animados(0, tamaño-1);
                nodes[tamaño-1].animate([{background: 'blue', opacity: 1, offset: 0}],{duration:velocidad});
                console.log("encontrado");
                setTimeout(()=>{
                    list.replaceChild(node_nuevo, nodes[i]);
                },velocidad-500)
                break;
            }       
        }
        if(encontrado==false){
            alert("no se encontro");
            console.log("no se encontro"); 
        }
    }
}

function velocidad_max(){
    var nueva_velocidad = document.getElementById('velocidad').value;
    lista_simple.print();

    if(nueva_velocidad === ''){
        alert("Por favor ingrese un dato");
        return false;
    }else{
    console.log(velocidad);
    velocidad = nueva_velocidad * 1000;
    console.log(velocidad);
    }
}

async function buscar(){
    var buscar_dato = document.getElementById('dato_pag').value;
    var encontrado = false;
    var tamaño = 0;
    lista_simple.buscar(buscar_dato);

    if(buscar_dato === ''){
        alert("Por favor ingrese un dato");
        return false;
    }else{
        for(var i = 0; i<nodes.length; i++){
            var muestra = nodes[i].firstChild.innerHTML;
            console.log(muestra);
            tamaño++;
            if(muestra == buscar_dato){
                encontrado=true;
                await nodos_animados(0, tamaño-1);
                nodes[tamaño-1].animate([{background: 'yellow', opacity: 1, offset: 0}],{duration:velocidad});
                console.log("encontrado");
                break;
            }       
        }
        if(encontrado==false){
            alert("no se encontro");
            console.log("no se encontro"); 
        }
    }
}

async function abrirArchivo(evento){
    let archivo = evento.target.files[0];

    if(archivo){
        let reader = new FileReader();
        reader.onload = async function(e){
            let contenido = e.target.result;
            var mydata = JSON.parse(contenido);
            console.log(mydata.repeticion)
            categoria = mydata.categoria;
            tipo = mydata.nombre;
            repeticion = mydata.repeticion;
            animacion = mydata.animacion;
            for(var i=0; i<(mydata.valores).length; i++){
                if(mydata.repeticion == true){
                    console.log("esta en true");
                    valores = mydata.valores[i];
                    lista_simple.insertar(valores);
                    let node = document.createElement('div');
                    node.classList.add('node');
    
                    let number = document.createElement('p');
                    number.classList.add('number');
    
                    let text = document.createTextNode(valores);
    
                    number.appendChild(text);
                    node.appendChild(number);
    
                    let pointer = document.createElement('div');
                    pointer.classList.add('pointer');
    
                    let img = document.createElement('img');
                    img.src = "img/flecha6.png";
        
                    pointer.appendChild(img);
    
                    if(indice === 0){
                        list.appendChild(node);
                        list.appendChild(pointer);
                        node.animate([{transform: 'scale(0.5)', background: '#f12711', 
                        background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                        background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0},
                        {transform: 'scale(1)',background: '#f12711', 
                        background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                        background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.2},
                        {transform: 'scale(1.5)',background: '#f12711', 
                        background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                        background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.5}],
                        {duration: velocidad});
                        indice++;
                    }else{
                        await nodos_animados(0, nodes.length-1);
                        list.appendChild(node);
                        list.appendChild(pointer);
                        node.animate([{transform: 'scale(0.5)', background: '#f12711', 
                        background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                        background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0},
                        {transform: 'scale(1)',background: '#f12711', 
                        background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                        background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.2},
                        {transform: 'scale(1.5)',background: '#f12711', 
                        background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                        background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.5}],
                        {duration:velocidad});
                        indice++;
                        console.log(nodes.length)
                    }
                }else{
                    console.log("esta en false");
                    valores = mydata.valores[i];
                    let node = document.createElement('div');
                    node.classList.add('node');
    
                    let number = document.createElement('p');
                    number.classList.add('number');
    
                    let text = document.createTextNode(valores);
    
                    number.appendChild(text);
                    node.appendChild(number);
    
                    let pointer = document.createElement('div');
                    pointer.classList.add('pointer');
    
                    let img = document.createElement('img');
                    img.src = "img/flecha6.png";
        
                    pointer.appendChild(img);
    
                    if(indice === 0){
                        lista_simple.insertar(valores);
                        list.appendChild(node);
                        list.appendChild(pointer);
                        node.animate([{transform: 'scale(0.5)', background: '#f12711', 
                        background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                        background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0},
                        {transform: 'scale(1)',background: '#f12711', 
                        background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                        background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.2},
                        {transform: 'scale(1.5)',background: '#f12711', 
                        background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                        background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.5}],
                        {duration: velocidad});
                        indice++;
                    }else{
                        var search = false;
                        console.log(i);
                        for(var j = 0; j<nodes.length; j++){
                            var muestra = nodes[j].firstChild.innerHTML;
                            console.log(muestra);
                            console.log(valores);
                            if(valores == muestra){
                                console.log("este se repitio")
                                search = true;
                                break;
                            }
                        }
                        if(search == false){
                            lista_simple.insertar(valores);
                            await nodos_animados(0, nodes.length-1);
                            list.appendChild(node);
                            list.appendChild(pointer);
                            node.animate([{transform: 'scale(0.5)', background: '#f12711', 
                            background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                            background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0},
                            {transform: 'scale(1)',background: '#f12711', 
                            background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                            background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.2},
                            {transform: 'scale(1.5)',background: '#f12711', 
                            background: '-webkit-linear-gradient(to right, #f5af19, #f12711)',  
                            background: 'linear-gradient(to right, #f5af19, #f12711)', opacity: 0.9, offset: 0.5}],
                            {duration:velocidad});
                            indice++;
                            console.log(nodes.length)
                        }
                        //encontrado = false;
                    }
                    //console.log("-->", encontrado)
                }
                //console.log(valores)
            }
            console.log(mydata)
        };
        reader.readAsText(archivo);
    }else{
        alert("No se selecciono ningun archivo");
    }
}

window.addEventListener('load', ()=>{
    document.getElementById('Archivo').addEventListener('change', abrirArchivo);
});

function DescargarArchivo(){
    var lista = [];

    for(var i = 0; i<nodes.length; i++){
        lista.push(nodes[i].firstChild.innerHTML)
    }

    var contenido = JSON.stringify({"categoria": categoria, "nombre": tipo, "repeticion": repeticion, "animacion": animacion, "valores":lista});
    console.log(contenido);
    console.log(JSON.stringify(lista));

    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato = "lista_simple"+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

    var nombre= formato+".json";//nombre del archivo
    var file=new Blob([contenido], {type: 'text/plain'});

    if(window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, nombre);
    }else{
        var a=document.createElement("a"),url=URL.createObjectURL(file);
        a.href=url;
        a.download=nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        },0); 
    }
}

//module.exports = Lista_Simple;