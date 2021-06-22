class Nodo{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
        this.atras = null;
    }
}

class Lista_Circular_Doble{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }

    insertar(dato){
        let nuevo = new Nodo(dato);
        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
            this.primero.siguiente = this.primero;
            this.primero.atras = this.ultimo;
            this.size++;
        }else{
            this.ultimo.siguiente = nuevo;
            nuevo.atras = this.ultimo;
            nuevo.siguiente = this.primero;
            this.ultimo = nuevo;
            this.primero.atras = this.ultimo;
            this.size++;
        }
    }

    print(){
        let actual = this.primero;
        if(actual != null){
            do{
                console.log("Dato: ", actual.dato);
                actual = actual.siguiente;
            }while(actual != this.primero);
        }
        console.log("El tamaño de la Lista circular Doble es: ", this.size);
    }

    print_alreves(){
        let actual = this.ultimo;
        if(actual != null){
            do{
                console.log("Dato: ", actual.dato);
                actual = actual.atras;
            }while(actual != this.ultimo);
        }
        console.log("El tamaño de la Lista circular Doble es: ", this.size);
    }

    buscar(dato){
        let actual = this.primero;
        let encontrado = false;
        if(actual != null){
            do{
                if(actual.dato == dato){
                    console.log("Si se encontro el dato: ", dato);
                    encontrado = true;
                }
                actual = actual.siguiente;
            }while(actual != this.primero && encontrado != true);
            if(!encontrado){
                console.log("No se encontro el dato");
            }
        }
        else{
            console.log("La lista esta vacia");
        }
    }

    actualizar(dato_viejo, dato_nuevo){
        let actual = this.primero;
        let encontrado = false;
        if(actual != null){
            do{
                if(actual.dato == dato_viejo){
                    console.log("Si se encontro el dato: ", dato_viejo);
                    actual.dato = dato_nuevo;
                    encontrado = true;
                    console.log("Se actualizo el dato con exito");
                }
                actual = actual.siguiente;
            }while(actual != this.primero && encontrado != true);
            if(!encontrado){
                console.log("No se encontro el dato");
            }
        }
        else{
            console.log("La lista esta vacia");
        }
    }

    eliminar(dato){
        let actual = this.primero;
        let anterior = null;
        let encontrado = false;
        if(actual != null){
            do{
                if(actual.dato == dato){
                    if(actual == this.primero){
                        this.primero = this.primero.siguiente;
                        this.primero.atras = this.ultimo;
                        this.ultimo.siguiente = this.primero;
                    }else if(actual == this.ultimo){
                        this.ultimo = anterior;
                        this.ultimo.siguiente = this.primero;
                        this.primero.atras = this.ultimo;
                    }else{
                        anterior.siguiente = actual.siguiente;
                        actual.siguiente.atras = anterior;
                    }
                    console.log("Nodo Eliminado con exito");
                    this.size--;
                    encontrado = true;
                }
                anterior = actual;
                actual = actual.siguiente;
            }while(actual != this.primero && encontrado != true);
            if(!encontrado){
                console.log("No se encontro el dato");
            }
        }
        else{
            console.log("La lista esta vacia");
        }
    }
}

/* --------Implementacion---------------- */

let list = document.getElementById('lista_circular');
let nodes = document.getElementsByClassName('node');
let pointers = document.getElementsByClassName('pointer');
var indice = 0;
var velocidad = 500;
const style = document.documentElement.style;
var categoria = "";
var tipo = "";
var repeticion = "";
var animacion = "";   

let lista_circular_doble = new Lista_Circular_Doble();

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

function recorrido(){
    for(var i = 0; i<nodes.length; i++){
        if(nodes.length <= 6){
            nodes[i].style.setProperty("transform", "rotate("+ (360/nodes.length)*i +"deg) translate(7em) rotate(-" + (360/nodes.length)*i + "deg)")
            pointers[i].style.setProperty("transform", "rotate("+ (360/nodes.length)*i +"deg) translate(12em) rotate(" + (360/nodes.length)*i + "deg)")
        }else if(nodes.length > 6 && nodes.length <= 12){
            style.setProperty('--tamaño','450px');
            nodes[i].style.setProperty("transform", "rotate("+ (360/nodes.length)*i +"deg) translate(12em) rotate(-" + (360/nodes.length)*i + "deg)")
            pointers[i].style.setProperty("transform", "rotate("+ (360/nodes.length)*i +"deg) translate(17em) rotate(" + (360/nodes.length)*i + "deg)")
        }else if(nodes.length > 12 && nodes.length <= 18){
            style.setProperty('--tamaño','550px');
            nodes[i].style.setProperty("transform", "rotate("+ (360/nodes.length)*i +"deg) translate(17em) rotate(-" + (360/nodes.length)*i + "deg)")
            pointers[i].style.setProperty("transform", "rotate("+ (360/nodes.length)*i +"deg) translate(22em) rotate(" + (360/nodes.length)*i + "deg)")
        }else if(nodes.length > 18 && nodes.length <= 24){
            style.setProperty('--tamaño','650px');
            nodes[i].style.setProperty("transform", "rotate("+ (360/nodes.length)*i +"deg) translate(22em) rotate(-" + (360/nodes.length)*i + "deg)")
            pointers[i].style.setProperty("transform", "rotate("+ (360/nodes.length)*i +"deg) translate(27em) rotate(" + (360/nodes.length)*i + "deg)")
        }else if(nodes.length > 24 && nodes.length <= 30){
            style.setProperty('--tamaño','750px');
            nodes[i].style.setProperty("transform", "rotate("+ (360/nodes.length)*i +"deg) translate(27em) rotate(-" + (360/nodes.length)*i + "deg)")
            pointers[i].style.setProperty("transform", "rotate("+ (360/nodes.length)*i +"deg) translate(32em) rotate(" + (360/nodes.length)*i + "deg)")
        }else if(nodes.length > 30 && nodes.length <= 36){
            style.setProperty('--tamaño','850px');
            style.setProperty('--posicion','55%');
            nodes[i].style.setProperty("transform", "rotate("+ (360/nodes.length)*i +"deg) translate(32em) rotate(-" + (360/nodes.length)*i + "deg)")
            pointers[i].style.setProperty("transform", "rotate("+ (360/nodes.length)*i +"deg) translate(37em) rotate(" + (360/nodes.length)*i + "deg)")
        }else{
            style.setProperty('--tamaño','950px');
            style.setProperty('--posicion','58%');
            nodes[i].style.setProperty("transform", "rotate("+ (360/nodes.length)*i +"deg) translate(37em) rotate(-" + (360/nodes.length)*i + "deg)")
            pointers[i].style.setProperty("transform", "rotate("+ (360/nodes.length)*i +"deg) translate(42em) rotate(" + (360/nodes.length)*i + "deg)")
        }
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
            lista_circular_doble.insertar(dato);
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
            img.src = "img/flechaDoble.png";
        
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
            recorrido();
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
            img.src = "img/flechaDoble.png";
        
            pointer.appendChild(img);
    
            if(indice === 0){
                lista_circular_doble.insertar(dato);
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
                    lista_circular_doble.insertar(dato);
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
        recorrido();
    }
}

async function eliminar_nodo(){
    var eliminar_dato = document.getElementById('dato_pag').value;
    var tamaño = 0
    var encontrado = false;
    lista_circular_doble.eliminar(eliminar_dato);
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
                    recorrido();
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
    lista_circular_doble.actualizar(dato_viejo, dato_nuevo);

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
                    recorrido();
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
    lista_circular_doble.print();

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
    lista_circular_doble.buscar(buscar_dato);

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
            categoria = mydata.categoria;
            tipo = mydata.nombre;
            repeticion = mydata.repeticion;
            animacion = mydata.animacion;
            console.log(mydata.repeticion)
            for(var i=0; i<(mydata.valores).length; i++){
                if(mydata.repeticion == true){
                    console.log("esta en true");
                    valores = mydata.valores[i];
                    lista_circular_doble.insertar(valores);
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
                    img.src = "img/flechaDoble.png";
        
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
                    recorrido();
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
                    img.src = "img/flechaDoble.png";
        
                    pointer.appendChild(img);
    
                    if(indice === 0){
                        lista_circular_doble.insertar(valores);
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
                            lista_circular_doble.insertar(valores);
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
                        recorrido();
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
    var formato = "lista_circular_doble"+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

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

//module.exports = Lista_Circular_Doble;