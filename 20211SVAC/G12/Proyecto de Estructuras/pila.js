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
    
    pila.insertar_push(dato);

    if(dato === ''){
        alert("Por favor ingrese un dato");
        return false;
    }else{
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

        for(var i = 10; i >= 0; i--){
            console.log(i);
        }

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
            //console.log("->",nodes.length-1);
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

//module.exports = Pila;