class Nodo{
    constructor(DatoNodo) {
        this.DatoNodo = DatoNodo;
    }
}

let GuardarNodos = [];
let GuardarVertices = [];
let NodoVisitado;
let NodoActual;
let Vertices = null;

class CrearVertice{
    constructor(IdVertice, NumeroVertice){
        this.IdVertice = IdVertice;
        this.NumeroVertice = NumeroVertice;
    }
}

class CrearGrafo{
    constructor(GrafoDirigido, PonderacionGrafo){
       this.GrafoDirigido = GrafoDirigido;
       this.PonderacionGrafo = PonderacionGrafo;
       let Vertices = [];
       let GuardarGrafo =[];
    }

    VerticeGrafo(nombreVertice){
        for(var i = 0; i < Vertices.length; i++){
            if(this.Vertices[i] == nombreVertice){
                return this.Vertices[i].NumeroVertice;
            }

        }
        return -1;
    }

    VerificarExisteVertice(nombreVertice){
        for(var i = 0; i < Vertices.length; i++){
            if(this.Vertices[i] == nombreVertice){
                return this.Vertices[i].NumeroVertice;

            }

        }
        return false;
    }

    CrearNuevoVertice(){
        if(!this.VerificarExisteVertice(nombreVertice)){
            this.Vertices.push(new CrearVertice(nombreVertice, this.Vertices.length));
            for(var i = 0; i < this.Vertices.length; i++){
                if(this.GuardarGrafo[i] == undefined){
                    this.GuardarGrafo[i] = [];
                }
                for(var j = 0; j < this.Vertices.length; j++){
                    if(this.GuardarGrafo[i][j] == undefined){
                        this.GuardarGrafo[i][j] = 0;
                    }
                }
            }
        }else{
            Console.log("El vertice ya se encuentra en el grafo");
        }
    }

    
}










