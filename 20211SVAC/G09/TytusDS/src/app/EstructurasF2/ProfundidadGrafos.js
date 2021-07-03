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
    constructor(IdVertice, NumeroVerticetice){
        this.IdVertice = IdVertice;
        this.NumeroVerticetice = NumeroVerticetice;
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
                return this.Vertices[i].NumeroVerticetice;
            }

        }
        return -1;
    }

    VerificarExisteVertice(nombreVertice){
        for(var i = 0; i < Vertices.length; i++){
            if(this.Vertices[i] == nombreVertice){
                return this.Vertices[i].NumeroVerticetice;

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

    CrearNuevoArco(NombreArco, NombreArco1, valor){
        var numero1 = this.VerticeGrafo(NombreArco);
        var numero2 = this.VerticeGrafo(NombreArco1);
        if(numero1 != -1 && numero2 != -1){
            if(this.GuardarGrafo[numero1][numero2] == 0){
                if(valor == undefined || valor == 0){
                    this.GuardarGrafo[numero1][numero2] = 1;
                }else{
                    this.GuardarGrafo[numero1][numero2] = valor;
                }
            }
        }else{
            if(numero1 == -1 && numero2 == -1){
                this.CrearNuevoVertice(NombreArco);
                this.CrearNuevoVertice(NombreArco1);
            }else if(numero1 == -1 && numero2 != -1){
                this.CrearNuevoVertice(NombreArco);
            }else{
                this.CrearNuevoVertice(NombreArco1);
            }
            this.CrearNuevoArco(NombreArco, NombreArco1, valor);
        }
    }

    ActualizarGrafo(NombreAnterior, NombreNuevo){
        var NumeroVertice = this.VerticeGrafo(NombreAnterior);
        if(NumeroVertice != -1){
            this.Vertices[NumeroVertice].NombreAnterior = NombreNuevo;
        }
    }

    EliminarVertice(NombreVertice){
        var NumeroVertice = this.VerticeGrafo(NombreVertice)
        var auxiliar = []
        var auxiliarGuardarGrafo = []
        if(NumeroVertice != -1){
            for(var i = 0; i<this.Vertices.length; i++){
                if(i != NumeroVertice){
                    this.vertices[i].NumeroVertice = auxiliar.length
                    auxiliar.push(this.Vertices[i])
                }
            }

            for(var i = 0; i < this.Vertices.length; i++){
                if( i != NumeroVertice){
                    if(auxiliarGuardarGrafo[i] == undefined){
                        auxiliarGuardarGrafo[i] = []
                    }
                    for(var j = 0; j < this.Vertices.length; j++){
                        if(j != NumeroVertice){
                            if(j< NumeroVertice){
                                auxiliarGuardarGrafo[i][j] = this.GuardarGrafo[i][j]
                            }else{
                                auxiliarGuardarGrafo[i][j-1] = this.GuardarGrafo[i][j]
                            }
                        }
                    }
                }
            }
            this.Vertices = auxiliar
            this.GuardarGrafo = auxiliarGuardarGrafo
        }
    }


}










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
    constructor(IdVertice, NumeroVerticetice){
        this.IdVertice = IdVertice;
        this.NumeroVerticetice = NumeroVerticetice;
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
                return this.Vertices[i].NumeroVerticetice;
            }

        }
        return -1;
    }

    VerificarExisteVertice(nombreVertice){
        for(var i = 0; i < Vertices.length; i++){
            if(this.Vertices[i] == nombreVertice){
                return this.Vertices[i].NumeroVerticetice;

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

    CrearNuevoArco(NombreArco, NombreArco1, valor){
        var numero1 = this.VerticeGrafo(NombreArco);
        var numero2 = this.VerticeGrafo(NombreArco1);
        if(numero1 != -1 && numero2 != -1){
            if(this.GuardarGrafo[numero1][numero2] == 0){
                if(valor == undefined || valor == 0){
                    this.GuardarGrafo[numero1][numero2] = 1;
                }else{
                    this.GuardarGrafo[numero1][numero2] = valor;
                }
            }
        }else{
            if(numero1 == -1 && numero2 == -1){
                this.CrearNuevoVertice(NombreArco);
                this.CrearNuevoVertice(NombreArco1);
            }else if(numero1 == -1 && numero2 != -1){
                this.CrearNuevoVertice(NombreArco);
            }else{
                this.CrearNuevoVertice(NombreArco1);
            }
            this.CrearNuevoArco(NombreArco, NombreArco1, valor);
        }
    }

    ActualizarGrafo(NombreAnterior, NombreNuevo){
        var NumeroVertice = this.VerticeGrafo(NombreAnterior);
        if(NumeroVertice != -1){
            this.Vertices[NumeroVertice].NombreAnterior = NombreNuevo;
        }
    }

    EliminarVertice(NombreVertice){
        var NumeroVertice = this.VerticeGrafo(NombreVertice);
        var auxiliar = [];
        var auxiliarGuardarGrafo = [];
        if(NumeroVertice != -1){
            for(var i = 0; i<this.Vertices.length; i++){
                if(i != NumeroVertice){
                    this.vertices[i].NumeroVertice = auxiliar.length;
                    auxiliar.push(this.Vertices[i]);
                }
            }

            for(var i = 0; i < this.Vertices.length; i++){
                if( i != NumeroVertice){
                    if(auxiliarGuardarGrafo[i] == undefined){
                        auxiliarGuardarGrafo[i] = [];
                    }
                    for(var j = 0; j < this.Vertices.length; j++){
                        if(j != NumeroVertice){
                            if(j< NumeroVertice){
                                auxiliarGuardarGrafo[i][j] = this.GuardarGrafo[i][j];
                            }else{
                                auxiliarGuardarGrafo[i][j-1] = this.GuardarGrafo[i][j];
                            }
                        }
                    }
                }
            }
            this.Vertices = auxiliar;
            this.GuardarGrafo = auxiliarGuardarGrafo;
        }
    }


}










