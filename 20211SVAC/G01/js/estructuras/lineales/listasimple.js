class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

class Lista {
    constructor() {
        this.inicio = null;
        this.final = null;
    }

    agregarAlInicio(valor) {
        if (this.estaVacia()) {
            this.inicio = this.final = new Nodo(valor);
        } else {
            let nodo = new Nodo(valor);
            nodo.siguiente = this.inicio;
            this.inicio = nodo;
        }
    }

    agregarAlFinal(valor) {
        if (this.estaVacia()) {
            this.inicio = this.final = new Nodo(valor);
        } else {
            let nodo = new Nodo(valor);
            this.final.siguiente = nodo;
            this.final = nodo;
        }
    }

    agregarEnMedio(valor) {
        let temporal = this.inicio;
        while (temporal.siguiente.valor < valor) {
            temporal = temporal.siguiente;
        }
        let nuevo = new Nodo(valor);
        nuevo.siguiente = temporal.siguiente;
        temporal.siguiente = nuevo;
    }

    agregarOrdenado(valor) {
        if (this.estaVacia()) {
            this.inicio = this.final = new Nodo(valor);
        } else {
            if (valor <= this.inicio.valor) {
                this.agregarAlInicio(valor);
            } else if (valor > this.final.valor) {
                this.agregarAlFinal(valor);
            } else {
                this.agregarEnMedio(valor);
            }
        }
    }

    buscar(valor) {
        let encontrado = false;
        if (!this.estaVacia()) {
            let aux = this.inicio; 
            while (aux != null && !encontrado) {
                if (aux.valor == valor) {
                    encontrado = true;
                }
                aux = aux.siguiente;
            }
        }
        return encontrado;
    }

    eliminar(valor) {
        if (!this.estaVacia()) {
            let temporal = this.inicio;
            let anterior = null;
            let encontrado = false;
            while (temporal != null && !encontrado) {
                encontrado = (temporal.valor == valor);
                if (!encontrado) {
                    anterior = temporal;
                    temporal = temporal.siguiente;
                }
            }

            if (temporal != null) {
                if( temporal == this.inicio && this.inicio == this.final) {
                    this.inicio = this.final = null;
                } else if (temporal == this.inicio)  {
                    this.inicio = temporal.siguiente;
                } else if (temporal == this.final) {
                    anterior.siguiente = null;
                    this.final = anterior;
                } else {
                    anterior.siguiente = temporal.siguiente;
                }
            }
        }
    }

    actualizar(valor, nuevoValor) {
        if (!this.estaVacia()) {
            let temporal = this.inicio;
            let encontrado = false;
            while (temporal != null && !encontrado) {
                encontrado = valor == temporal.valor;
                if (encontrado) {
                    temporal.valor = nuevoValor;
                } else {
                    temporal = temporal.siguiente;
                }
            }
        }
    }
    
    estaVacia() {
        return this.inicio == null;
    }

    recorrer() {
        let datos = [];
        let i = 0;
        if(!this.estaVacia()) {
            let temporal = this.inicio;
            while (temporal != null) {
                datos.push({id: i, label: temporal.valor.toString()})
                temporal = temporal.siguiente;
                i++;
            }
        }
        return datos;
    }
}

let lista = new Lista();

// ---------------------- Creacion del grafo ----------------------------------


let contenedor, aristas, datos, opciones, grafo, nodos;

// Configuracion del stilo del grafo
opciones = {
    edges: {
        arrows: {
            to: {
                enabled: true
            }
        },
        color: {
            color: "#00cbb9"
        }
    },
    nodes: {
        shape: "box",
        shapeProperties: {
            borderRadius: 0
        },
        color: {
            border: "blue",
            background: "#42ff05",
        },
        shadow: {
            enabled: true
        },
        font: {
            color: "black",
            size: 14
        }
    },
    physics: {
        enabled: true
    },
    interaction: {
        dragNodes: false,
        dragView: true,
        zoomView: true
    },
    layout: {
        hierarchical: {
            direction: 'LR',
            levelSeparation: 75
        }
    },
    configure: {
        
        enabled: true,
        container: configuracion,
        showButton: true,
        filter: function (option, path) {
            if (path.indexOf("layout") !== -1) {
              return true;
            }
            return false;
          }
    }
};

function iniciarGrafo() {
 
    let _datos = lista.recorrer();
    nodos = new vis.DataSet(_datos);

    // recorrido de los datos
    let _aristas = []
    for (let i = 0; i < _datos.length - 1; i++) {
        _aristas.push({ from: _datos[i].id, to: _datos[i + 1].id });
    }

    aristas = new vis.DataSet(_aristas);


    datos = {
        nodes: nodos,
        edges: aristas
    }

    contenedor = document.getElementById("grafo");

    grafo = new vis.Network(contenedor, datos, opciones);
    
}

let archivo_de_entrada;

function leerDatosArchivo() {
    if (archivo_de_entrada) {
        let valores = archivo_de_entrada.valores;
        for (let i = 0; i < valores.length; i++) {
            if (parseInt(valores[i])) {
                valores[i] = parseInt(valores[i]);
            }
            _agregarDato(valores[i]);
            // lista.agregarOrdenado(valores[i]);
        }
    }
    archivo_de_entrada = null;
    actualizarGrafo();
}

function obtenerTipoDeIngreso() {
    let forma_ingreso = document.getElementById("tipo_de_ingreso").value;
    return forma_ingreso;
}

function _agregarDato(dato) {
    if (obtenerTipoDeIngreso() == "1") {   // Agregar al inicio
        lista.agregarAlInicio(dato);
    } else if (obtenerTipoDeIngreso() == "2") { // Agregar Al Final
        lista.agregarAlFinal(dato);
    } else if (obtenerTipoDeIngreso() == "3") { // Agregar de forma Ordenada
        lista.agregarOrdenado(dato);
    }
}

// agrega un nuevo dato al grafo
function agregarDato() {
    let dato = document.getElementById("agregar").value;
    if (dato != "") {
        if (parseInt(dato)) {
            dato = parseInt(dato);
        }
        _agregarDato(dato);
         
        actualizarGrafo();
    }
}

// actualiza un dato del grafo
function actualizarDato() {
    let dato = document.getElementById("anterior").value;
    let nuevo = document.getElementById("nuevo").value;
    if (dato != "" && nuevo != "") {
        if (parseInt(dato)) {
            dato = parseInt(dato);
        }
        if (parseInt(nuevo)) {
            nuevo = parseInt(nuevo);
        }
        lista.actualizar(dato, nuevo);
        actualizarGrafo();
    }
}

// Buscar un dato del grafo
function buscarDato() {
    let dato = document.getElementById("buscar").value;
    if (dato != "") {
        if (parseInt(dato)) {
            dato = parseInt(dato);
        }
        if (lista.buscar(dato)) {
            document.getElementById("encontrado").innerHTML = "Valor encontrado";
        } else {
            document.getElementById("encontrado").innerHTML = "Valor no encontrado";
        }
    }
}

// elimina un dato del grafo
function eliminarDato() {
    let dato = document.getElementById("eliminar").value;
    if (dato != "") {
        if (parseInt(dato)) {
            dato = parseInt(dato);
        }
        lista.eliminar(dato);
        // Actualizando el grafo
        actualizarGrafo();
    }
}

// Actualiza el grafo
function actualizarGrafo() {
    // --------------- Actualizando el grafo -------------------
        
    let _datos = lista.recorrer();
    nodos = new vis.DataSet(_datos);

    // recorrido de los datos
    let _aristas = []
    for (let i = 0; i < _datos.length - 1; i++) {
        _aristas.push({ from: _datos[i].id, to: _datos[i + 1].id });
    }

    aristas = new vis.DataSet(_aristas);
    grafo.setData({nodes: nodos, edges: aristas});
}

// Guarda la informacion del archivo en archivo_de_entrada
function processFiles(files) {
    let file = files[0];

    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e) {
        archivo_de_entrada = JSON.parse(e.target.result);

    };
}

iniciarGrafo();