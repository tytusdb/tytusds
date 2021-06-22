document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    function obtener_datos(parentNode) {
        let inputs = parentNode.getElementsByTagName('input');
        let valores = {};
        if (inputs.length === 8) {
            if (inputs[0].placeholder === "Ingrese elemento" && inputs[1].placeholder === "Nodo numero"){
                valores.data = inputs[0].value;
                valores.index = inputs[1].value;
            }
            return valores;
        }
        return valores;
    }

    let tiempo_animacion = 1;
    valorvelocidad(tiempo_animacion);

    //----------------VELICIDAD----------------
    document.getElementById('velocidad').addEventListener('click', function() {
        let velocidad = document.getElementById("num_velocidad").value;
        valorvelocidad(velocidad);
        document.getElementById("num_velocidad").value = "";
    });

    //----------------AGREGAR----------------
    document.getElementById('agregar').addEventListener('click', function() {
        let valores = obtener_datos(this.parentNode);
        agregar(nodes.length, valores.data);
        document.getElementById("elemento").value = "";
        console.log(list);
    });

    //----------------ACTUALIZAR----------------
    document.getElementById('actualizar').addEventListener('click', function() {
        let valores = obtener_datos(this.parentNode);
        actualizar(valores.data,valores.index);
        document.getElementById("elemento").value = "";
        document.getElementById("nuevo_elemento").value = "";
        console.log(list);
    });


    //----------------ELIMINAR----------------
    document.getElementById('eliminar').addEventListener('click', function() {
        let valores = obtener_datos(this.parentNode);
        eliminar(valores.data);
        document.getElementById("elemento").value = "";
    });

    //----------------BUSCAR----------------
    document.getElementById('buscar').addEventListener('click', function() {
        let valores = obtener_datos(this.parentNode);
        buscar_dato(valores.data);
        document.getElementById("elemento").value = "";
    });
     
    //----------------LIMPIAR----------------
    document.getElementById('limpiar').addEventListener('click', function() {
        let tamano = 0;
        limpiar(tamano);
    });
});



//----------------VARIEBLES GLOBALES----------------

let list = document.getElementById('list');
let flechas = document.getElementById('flechas');
let nodes = document.getElementsByClassName('node');
let pointers = document.getElementsByClassName('pointer');
let error = document.getElementById('error');

//----------------TIEMPO ANIMACION----------------
let tiempo_animacion;

function valorvelocidad(tiempo){
    tiempo_animacion = tiempo;
}

let errorCircle = '<i class="fas fa-exclamation-circle"></i> ';

function nodo_animado(i) {
    return new Promise(resolve => {
        nodes[i].style.animation = "highlightNode " + tiempo_animacion + "s ease";
        setTimeout(() => {
            nodes[i].style.animation = null;
            resolve();
        }, tiempo_animacion);
    });
}

function flecha_animacion(i) {
    return new Promise(resolve => {
        pointers[i].style.animation = "highlightPointer " + tiempo_animacion + "s ease";
        setTimeout(() => {
            pointers[i].style.animation = null;
            resolve();
        }, tiempo_animacion);
    });
}

function borrar_nodos(i) {
    return new Promise(resolve => {
        nodes[i].style.animation = "deleteNode " + tiempo_animacion + "s ease";
		pointers[i].style.animation = "deletePointer " + tiempo_animacion + "s ease";
		setTimeout(() => {
			list.removeChild(nodes[i]);
            list.removeChild(pointers[i]);
            resolve();
		}, tiempo_animacion);
    });
}

async function animacion_nodos(from, to) {
    for (let i = from; i <= to; i++) {
        await nodo_animado(i);
        await flecha_animacion(i);
    }
}

function animacion_despues (from) {
    return new Promise(resolve => {
        for (let i = from; i < nodes.length; i++) {

            nodes[i].style.animation = "moveLeftNode " + tiempo_animacion + "s ease";

            pointers[i].style.animation = "moveLeftNode " + tiempo_animacion + "s ease";

            setTimeout(() => {
                nodes[i].style.animation = null;
                pointers[i].style.animation = null;
            }, tiempo_animacion)
        }

        setTimeout(() => resolve(), tiempo_animacion)
    })
}

function animacion_antes_de_colocar (from, to) {
    return new Promise(resolve => {
        for (let i = from; i < to; i++) {
            console.log('length3', nodes.length)

            nodes[i].style.animation = "moveRightNode " + tiempo_animacion + "s ease";

            pointers[i].style.animation = "moveRightNode " + tiempo_animacion + "s ease";

            setTimeout(() => {
                nodes[i].style.animation = null;
                pointers[i].style.animation = null;
            }, tiempo_animacion)
        }

        setTimeout(() => resolve(), tiempo_animacion)
    })
}

//----------------AGREGAR----------------
async function agregar(i, data) {

    let node = document.createElement('div');
    node.classList.add('node');

    let number = document.createElement('p');
    number.classList.add('number');

    let text = document.createTextNode(data);

    number.appendChild(text);
    node.appendChild(number);

    let pointer = document.createElement('div');
    pointer.classList.add('pointer');
    pointer.style.opacity = "0";

    let img = document.createElement('img');
    img.src = "../../img/flecha_doble.png";
    pointer.appendChild(img);

    let agrandar = document.getElementById('semi');
    if(agrandar && agrandar.style) {
        let largo = agrandar.style.width;
        let ancho = agrandar.style.height;
        console.log(largo);
        console.log(ancho);
        agrandar.style.width = largo * 50;
        agrandar.style.height = ancho * 30;
    }
    
    
    if (i === nodes.length) {
        await animacion_nodos(0, nodes.length - 1);
        list.appendChild(node);
        list.appendChild(pointer);
        
    }
    else {
        await animacion_nodos(0, i - 1);
        await animacion_antes_de_colocar(i, nodes.length)
        list.insertBefore(pointer, nodes[i]);
        list.insertBefore(node, pointer);
    }

    node.style.animation = "grow " + tiempo_animacion + "s ease";

    setTimeout(() => {
        pointer.style.opacity = 1;
        pointer.style.animation = "slide " + tiempo_animacion + "s ease";
    }, tiempo_animacion);

    console.log(list);
}

//----------------ACTUALIZAR----------------
async function actualizar(data, i) {

    let tiempo_animacion = 1;

    await animacion_nodos(0, i - 1);

    nodes[i].firstChild.style.animation = "fadeNumberOut " + tiempo_animacion + "s ease";

    setTimeout(() => {
        nodes[i].firstChild.innerHTML = data;
        nodes[i].firstChild.style.animation = "fadeNumberIn " + tiempo_animacion + "s ease";
    }, tiempo_animacion);

    setTimeout(() => {
        nodes[i].firstChild.style.animation = null;
    }, tiempo_animacion * 2);
}


//----------------ELIMINAR----------------
function eliminar(data) {
    quitar(0, data);
}

async function quitar(i, data) {
    if (i >= nodes.length) {
        return;
    }
    else if (nodes[i].firstChild.innerHTML == data) {
        await borrar_nodos(i);
        await animacion_despues(i)
        quitar(i, data);
    }
    else {
        await nodo_animado(i);
		await flecha_animacion(i);
		quitar(i + 1, data);
    }
}

//----------------BUSCAR----------------
function buscar_dato(data) {
    encontrar(0, data);
}

async function encontrar(i, data) {

    if (i >= nodes.length) {
        return;
    }
    else if (nodes[i].firstChild.innerHTML == data) {
        let inputError = false;
        error.innerHTML =  errorCircle + "El dato " + data + " esta en el nodo numero " + i;
        inputError = true;
    }
    else {
        await nodo_animado(i);
		await flecha_animacion(i);
		encontrar(i + 1, data);
    }
}

//----------------LIMPIAR----------------
async function limpiar(tam) {
    for (let i = tam;i <= nodes.length; i++) {
        await borrar_nodos(i);
        await animacion_despues(i)
        limpiar(i);
    }
}