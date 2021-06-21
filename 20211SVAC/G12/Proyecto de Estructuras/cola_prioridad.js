class Nodo{
    constructor(dato, prioridad){
        this.dato = dato
        this.prioridad = prioridad
        this.siguiente = null
    }
}

class Cola_Prioridad{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }
    insertar(dato, prioridad){
        let nuevo = new Nodo(dato, prioridad);

        if(this.primero == null){
            this.primero = nuevo;
            this.primero.siguiente = null;
            this.ultimo = nuevo;
        }else{
            nuevo.siguiente = this.primero
            this.primero = nuevo;
            var actual = this.primero;
            var next = actual.siguiente;
            while(actual.siguiente != null){
                if(actual.prioridad > next.prioridad){
                    var aux = actual.dato;
                    var auxiliar = actual.prioridad;
                    actual.dato = next.dato;
                    actual.prioridad = next.prioridad;
                    next.dato = aux;
                    next.dprioridad = auxiliar;
                    actual = actual.siguiente;
                    next = next.siguiente;
                }else{
                    actual = actual.siguiente;
                    next = next.siguiente;
                }
            }
        }
        this.size++;
    }

    print_cola(){
        let actual = this.primero;
        if(this.primero != null){
            while(actual != null){
                console.log("Dato: ", actual.dato);
                actual = actual.siguiente;
            }
        }else{
            console.log("La Cola se encuentra vacia");
        }
    }

    buscar_cola(dato){
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
                console.log("Dato no encontrado")
            }
        }else{
            console.log("La Cola se encuentra vacia");
        }
    }

    eliminar_remove(){
        let actual = this.primero;
        if(this.primero != null){
            if(actual == this.primero){
                this.primero = this.primero.siguiente
                this.size--;
            }
        }else{
            console.log("La cola se encuentra vacia");
        }   
    }

    actualizar_cola(dato_viejo, dato_nuevo){
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
                console.log("Dato no encontrado")
            }
        }else{
            console.log("La Cola se encuentra vacia");
        }
    }
}

/*cola_prioridad.insertar(2,6);
cola_prioridad.insertar(9,3);
cola_prioridad.insertar(5,5);
cola_prioridad.insertar(10,0);
cola_prioridad.eliminar_remove();
cola_prioridad.actualizar_cola(9,1);
cola_prioridad.buscar_cola(5);
cola_prioridad.print_cola();*/

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

let cola_prioridad = new Cola_Prioridad();

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
    var prioridad = document.getElementById('prioridad').value;
    var checkbox = document.getElementById('checkbox').checked;
    var encontrado = false;

    if(dato === '' || prioridad === ''){
        alert("Por favor ingrese un dato");
        return false;
    }else{
        if(checkbox == true){
            cola_prioridad.insertar(dato, prioridad);
            console.log("Activado");
            let node = document.createElement('div');
            node.classList.add('node');
    
            let number = document.createElement('p');
            number.classList.add('number');

            let set = document.createElement('p');
            set.classList.add('set');

            let text = document.createTextNode(dato);
            let priori = document.createTextNode(prioridad);    
            number.appendChild(text);
            set.appendChild(priori);
            node.appendChild(number);
            node.appendChild(set);
    
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
                for(var i = 0; i<nodes.length; i++){
                    var prueba = nodes[i].lastElementChild.textContent;
                    console.log("-->",prueba);
                    if(prioridad < prueba){
                        console.log("es menor");
                        console.log(i);
                        list.insertBefore(pointer, nodes[i])
                        list.insertBefore(node, pointers[i])
                        break;
                    }else if(prioridad == prueba){
                        list.appendChild(node);
                        list.appendChild(pointer);
                    }else{
                        list.appendChild(node);
                        list.appendChild(pointer);
                    }
                }       
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

            let set = document.createElement('p');
            set.classList.add('set');
    
            let text = document.createTextNode(dato);
            let priori = document.createTextNode(prioridad);    
            number.appendChild(text);
            set.appendChild(priori);
            node.appendChild(number);
            node.appendChild(set);
    
            let pointer = document.createElement('div');
            pointer.classList.add('pointer');
    
            let img = document.createElement('img');
            img.src = "img/flecha6.png";
        
            pointer.appendChild(img);
    
            if(indice === 0){
                cola_prioridad.insertar(dato, prioridad);
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
                    for(var j = 0; j<nodes.length; j++){
                        var prueba = nodes[j].lastElementChild.textContent;
                        console.log("-->",prueba);
                        if(prioridad < prueba){
                            console.log("es menor");
                            console.log(j);
                            cola_prioridad.insertar(dato, prioridad);
                            list.insertBefore(pointer, nodes[j])
                            list.insertBefore(node, pointers[j])
                            break;
                        }else if(prioridad == prueba){
                            cola_prioridad.insertar(dato, prioridad);
                            list.appendChild(node);
                            list.appendChild(pointer);
                        }else{
                            cola_prioridad.insertar(dato, prioridad);
                            list.appendChild(node);
                            list.appendChild(pointer);
                        }
                    }
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
    cola_prioridad.eliminar_remove();
    list.removeChild(nodes[0]);
    list.removeChild(pointers[0]);
}

async function actualizar_nodo(){
    var encontrado = false;
    var dato_viejo = document.getElementById('dato_viejo').value;
    var dato_nuevo = document.getElementById('dato_nuevo').value;
    cola_prioridad.actualizar_cola(dato_viejo, dato_nuevo);

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
    cola_prioridad.print_cola();

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
    cola_prioridad.buscar_cola(buscar_dato);

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
            //console.log(mydata.valores[0].valor, mydata.valores[0].prioridad)
            for(var i=0; i<(mydata.valores).length; i++){
                //console.log(valor_json);
                //console.log(prioridad_json);
                if(mydata.repeticion == true){
                    console.log("esta en true");
                    var valor_json = mydata.valores[i].valor;
                    var prioridad_json = mydata.valores[i].prioridad;
                    //valores = mydata.valores[i];
                    cola_prioridad.insertar(valor_json, prioridad_json);
                    let node = document.createElement('div');
                    node.classList.add('node');
    
                    let number = document.createElement('p');
                    number.classList.add('number');

                    let set = document.createElement('p');
                    set.classList.add('set');
        
                    let text = document.createTextNode(valor_json);
                    let priori = document.createTextNode(prioridad_json);    
                    number.appendChild(text);
                    set.appendChild(priori);
                    node.appendChild(number);
                    node.appendChild(set);
    
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
                        for(var j = 0; j<nodes.length; j++){
                            var prueba = nodes[j].lastElementChild.textContent;
                            console.log("-->",prueba);
                            if(prioridad_json < prueba){
                                console.log("es menor");
                                console.log(j);
                                list.insertBefore(pointer, nodes[j])
                                list.insertBefore(node, pointers[j])
                                break;
                            }else if(prioridad_json == prueba){
                                list.appendChild(node);
                                list.appendChild(pointer);
                            }else{
                                list.appendChild(node);
                                list.appendChild(pointer);
                            }
                        }
                        await nodos_animados(0, nodes.length-1);
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
                    var valor_json = mydata.valores[i].valor;
                    var prioridad_json = mydata.valores[i].prioridad;
                    //valores = mydata.valores[i];
                    let node = document.createElement('div');
                    node.classList.add('node');
    
                    let number = document.createElement('p');
                    number.classList.add('number');
    
                    let set = document.createElement('p');
                    set.classList.add('set');
        
                    let text = document.createTextNode(valor_json);
                    let priori = document.createTextNode(prioridad_json);    
                    number.appendChild(text);
                    set.appendChild(priori);
                    node.appendChild(number);
                    node.appendChild(set);
    
                    let pointer = document.createElement('div');
                    pointer.classList.add('pointer');
    
                    let img = document.createElement('img');
                    img.src = "img/flecha6.png";
        
                    pointer.appendChild(img);
    
                    if(indice === 0){
                        cola_prioridad.insertar(valor_json, prioridad_json);
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
                            //console.log(valores);
                            if(valor_json == muestra){
                                console.log("este se repitio")
                                search = true;
                                break;
                            }
                        }
                        if(search == false){
                            for(var j = 0; j<nodes.length; j++){
                                var prueba = nodes[j].lastElementChild.textContent;
                                console.log("-->",prueba);
                                if(prioridad_json < prueba){
                                    console.log("es menor");
                                    console.log(j);
                                    cola_prioridad.insertar(valor_json, prioridad_json);
                                    list.insertBefore(pointer, nodes[j]);
                                    list.insertBefore(node, pointers[j]);
                                    break;
                                }else if(prioridad_json == prueba){
                                    cola_prioridad.insertar(valor_json, prioridad_json);
                                    list.appendChild(node);
                                    list.appendChild(pointer);
                                }else{
                                    cola_prioridad.insertar(valor_json, prioridad_json)
                                    list.appendChild(node);
                                    list.appendChild(pointer);
                                }
                            }
                            await nodos_animados(0, nodes.length-1);
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
    var list = ""

    for(var i = 0; i<nodes.length; i++){
        list += JSON.stringify({"valor": nodes[i].firstChild.innerHTML, "prioridad": nodes[i].lastElementChild.textContent})
    }

    var contenido = JSON.stringify({"categoria": categoria, "nombre": tipo, "repeticion": repeticion, "animacion": animacion, "valores":[list]});
    console.log(contenido);

    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato = "cola_prioridad"+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

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
