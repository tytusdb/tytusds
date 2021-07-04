class NodoGrafo {
    constructor(valor, visitado) {
        this.valor = valor;
        this.visitado = visitado;
        this.enlace = [];
    }

    insertar(vertice){
        let nuevoNodo = new NodoGrafo(vertice, false)
        
    }

}

class Enlace {
    constructor(peso, nEnlace) {
        this.peso = peso;
        this.nodografo = new NodoGrafo(nEnlace, null);
    }
}


class GrafoNoDirigido {
    constructor() {
      this.cabeza = null;
    }

    

    

}


let nodito = new NodoGrafo(1, false);
for (let i = 0; i < 5; i++) {
    nodito.enlace[i] = new Enlace(3, 2);
}

function leerJson(){
    const reader = new FileReader()
    const text = reader.result
    const json = JSON.parse(text)
    console.log(json);
}

leerJson()




