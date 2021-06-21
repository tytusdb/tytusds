class Nodo{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
    }
}

class Pila{
    constructor(){
        this.primero = null;
        this.size = 0;
    }

    insertar_push(dato){
        let nuevo = new Nodo(dato);

        nuevo.siguiente = this.primero;
        this.primero = nuevo;
        this.size++;
    }

    print_pila(){
        let actual = this.primero;
        if(this.primero != null){
            while(actual != null){
                console.log("Dato: ", actual.dato);
                actual = actual.siguiente;
            }
            console.log("El tamaño de la Pila es: ", this.size);
        }else{
            console.log("La pila se encuentra vacia");
        }
    }

    buscar_pila(dato){
        let actual = this.primero;
        let encontrado = false;
        if(this.primero != null){
            while(actual != null && encontrado != true){
                if(actual.dato == dato){
                    console.log("Si se encontro el dato: ", dato);
                    encontrado = true;
                }
                actual = actual.siguiente;
            }
            if(!encontrado){
                console.log("Dato no encontrado");
            }
        }else{
            console.log("La pila se encuentra vacia");
        }
    }

    actualizar_pila(dato_viejo, dato_nuevo){
        let actual = this.primero;
        let encontrado = false;
        if(this.primero != null){
            while(actual != null && encontrado != true){
                if(actual.dato == dato_viejo){
                    console.log("Si se encontro el dato: ", dato_viejo);
                    actual.dato = dato_nuevo;
                    encontrado = true;
                    console.log("Se actualizo el dato con exito");
                }
                actual = actual.siguiente;
            }
            if(!encontrado){
                console.log("Dato no encontrado");
            }
        }else{
            console.log("La pila se encuentra vacia");
        }    
    }

    eliminar_pop(){
        let actual = this.primero;
        if(this.primero != null){
            if(actual == this.primero){
                this.primero = this.primero.siguiente
                this.size--;
            }
        }else{
            console.log("La pila se encuentra vacia");
        }   
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

let pila = new Pila();

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
    for (let i = to; i >= from; i--) {
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
            pila.insertar_push(dato);
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
            img.src = "img/flechaIzquierda.png";
        
            pointer.appendChild(img);
    
            if(indice === 0){
                list.prepend(node);
                list.prepend(pointer);
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
                list.prepend(node);
                list.prepend(pointer);
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
            img.src = "img/flechaIzquierda.png";
        
            pointer.appendChild(img);
    
            if(indice === 0){
                pila.insertar_push(dato);
                list.prepend(node);
                list.prepend(pointer);
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
                    pila.insertar_push(dato);
                    await nodos_animados(0, nodes.length-1);
                    list.prepend(node);
                    list.prepend(pointer);
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
    pila.eliminar_pop();
    list.removeChild(nodes[0]);
    list.removeChild(pointers[0]);
}

async function actualizar_nodo(){
    var encontrado = false;
    var dato_viejo = document.getElementById('dato_viejo').value;
    var dato_nuevo = document.getElementById('dato_nuevo').value;
    pila.actualizar_pila(dato_viejo, dato_nuevo);

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
    pila.print_pila();

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
    pila.buscar_pila(buscar_dato);

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
            console.log(mydata.nombre);
            console.log(mydata.repeticion)
            categoria = mydata.categoria;
            tipo = mydata.nombre;
            repeticion = mydata.repeticion;
            animacion = mydata.animacion;
            for(var i=0; i<(mydata.valores).length; i++){
                if(mydata.repeticion == true){
                    console.log("esta en true");
                    valores = mydata.valores[i];
                    pila.insertar_push(valores);
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
                    img.src = "img/flechaIzquierda.png";
        
                    pointer.appendChild(img);
    
                    if(indice === 0){
                        list.prepend(node);
                        list.prepend(pointer);
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
                        list.prepend(node);
                        list.prepend(pointer);
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
                    img.src = "img/flechaIzquierda.png";
        
                    pointer.appendChild(img);
    
                    if(indice === 0){
                        pila.insertar_push(valores);
                        list.prepend(node);
                        list.prepend(pointer);
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
                            pila.insertar_push(valores);
                            await nodos_animados(0, nodes.length-1);
                            list.prepend(node);
                            list.prepend(pointer);
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
    var formato = "pila"+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

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

//module.exports = Pila;