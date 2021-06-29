//Direccionamiento Abierto

let list = document.getElementById('lista_hash');
let nodes = document.getElementsByClassName('node');
var indice = 0;

class Nodo{
    constructor(indice, clave, valor){
        this.indice = indice;
        this.clave = clave;
        this.valor = valor;
    }
}

class Hash{
    constructor(size, minimo, maximo){
        this.vector = [];
        this.elementos = 0;
        this.factorCarga = 0;
        this.size = size;
        this.minimo = minimo;
        this.maximo = maximo;

        for (var i = 0; i<size; i++){
            this.vector.push(null);
        }
    }

    insertar(id, clave, valor){
        let posicion = this.funcionHash(id);
        let nodo = new Nodo(posicion, clave, valor);
        this.vector[posicion] = nodo;
        this.elementos++;
        this.factorCarga = this.elementos/this.size;
        if (this.factorCarga > this.maximo){
            this.reHashing();
        }
    }

    reHashing(){
        let siguiente = this.size;
        let factor = 0;
        while(factor <= this.minimo){
            factor = this.elementos/siguiente;
            siguiente++;
        }
        let vectorTemp = [];

        for(var i = 0; i<siguiente; i++){
            vectorTemp.push(null);
        }

        let auxVector = this.vector;

        this.vector = vectorTemp;
        this.size = siguiente;

        auxVector.forEach(nodo =>{
            if(nodo != null){
                let posicion = this.funcionHash(this.StringtoASCII(nodo.clave));
                nodo.indice = posicion;
                vectorTemp[posicion] = nodo;
            }
        })

        this.vector = vectorTemp;
    }

    funcionHash(id){
        let posicion = id % (this.size -1);

        while(this.vector[posicion] != null){
            posicion++;
            if(posicion > this.size){
                posicion = posicion - this.size;
            }
        }
        return posicion;
    }

    StringtoASCII(cadena){
        let result = 0;
        for (var i = 0; i<cadena.length; i++){
            result += cadena.charCodeAt(i);
        }
        return result;
    }

    print(){
        let contador = 0;
        this.vector.forEach(nodo => {
            if(nodo != null){
                console.log("Indice:", contador, "Valor:", nodo.valor);
            }else{
                console.log("Indice:", contador, "Valor:", nodo)
            }
            contador++;
        })
    }

    graficar(){
        let count = 0;
        this.vector.forEach(nodo =>{
            if(nodo != null){
                let node = document.createElement('div');
                node.classList.add('node');
                node.id = indice+"lista"
    
                let number = document.createElement('p');
                number.classList.add('number');

                let text = document.createTextNode(nodo.valor);

                number.appendChild(text);
                node.appendChild(number);

                if(indice === 0){
                    list.appendChild(node);
                    indice++;
                }else{
                    list.appendChild(node);
                    indice++;
                }
                var nuevodiv = document.createElement("div");
                nuevodiv.classList.add('vector');
                var result = document.getElementById(node.id);
                
                let numero = document.createElement('p');
                numero.classList.add('number');
    
                let texto = document.createTextNode(count);
    
                numero.appendChild(texto);
                nuevodiv.appendChild(numero);
    
                result.appendChild(nuevodiv);
            }else{
                let node = document.createElement('div');
                node.classList.add('node');
                node.id = indice+"lista"
    
                let number = document.createElement('p');
                number.classList.add('number');

                let text = document.createTextNode(nodo);

                number.appendChild(text);
                node.appendChild(number);

                if(indice === 0){
                    list.appendChild(node);
                    indice++;
                }else{
                    list.appendChild(node);
                    indice++;
                }
                var nuevodiv = document.createElement("div");
                nuevodiv.classList.add('vector');
                var result = document.getElementById(node.id);
                
                let numero = document.createElement('p');
                numero.classList.add('number');
    
                let texto = document.createTextNode(count);
    
                numero.appendChild(texto);
                nuevodiv.appendChild(numero);
    
                result.appendChild(nuevodiv);
            }
            count++;
        })
    }
}

let tabla = new Hash(40, 0.3, 0.6);

tabla.print();

function configuracion(){
    tamaño = document.getElementById('tamaño').value;
    minimo = document.getElementById('minimo').value;
    maximo = document.getElementById('maximo').value;

    tabla = new Hash(tamaño, minimo, maximo);
}

function insertar_nodo(){
    var dato = document.getElementById('dato_pag').value;

    document.getElementById("lista_hash").innerHTML="";

    tabla.insertar(tabla.StringtoASCII(dato), dato, dato);
    tabla.graficar();
    tabla.print();
}