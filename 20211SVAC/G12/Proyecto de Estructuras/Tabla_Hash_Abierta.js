//Direccion Cerrado

let list = document.getElementById('lista_hash');
let nodes = document.getElementsByClassName('node');
let pointers = document.getElementsByClassName('pointer');
var indice = 0;

//Esta clase es la que vamos a guardar en el array principal
class Nodo{
    constructor(indice){
        this.indice = indice;
        this.lista = []; //Esta es una lista de llaves
    }
}

//Esta clase va a ser el tipo que guarde la lista secundaria
class Llave{
    constructor(clave, valor){
        this.clave = clave;
        this.valor = valor;
    }
}

class Hash{
    constructor(size, minimo, maximo){
        this.vector = [];//Este es el Array principal
        this.elementos = 0;//Es el numero de elementos incertados en la tabla
        this.size = size;//El tamaño de la tabla(m)
        this.factorCarga = 0.0;//El porcentaje de utilizacion de la tabla
        this.minimo = minimo;
        this.maximo = maximo;

        //Llenado de tabla con valores nulos, listos para llenarse
        for(var i = 0; i<size; i++){
            this.vector.push(null);
        }
    }

    //Funcion hash con el metodo de division
    funcionHash(id){
        let posicion = id % (this.size-1);//Este nos indica la posicion en donde estara posicionado en el array
        if(posicion > this.size){
            return posicion - this.size;
        }
        return posicion;
    }

    insertar(id, clave, valor){
        let posicion = this.funcionHash(id);

        if(this.vector[posicion] != null){
            this.vector[posicion].lista.push(new Llave(clave, valor));//Lo inserta en la lista secundaria con la posicion en la lista principal
        }else{
            let nodo = new Nodo(posicion);
            nodo.lista.push(new Llave(clave, valor));
            this.vector[posicion] = nodo;
            this.elementos++;
            this.factorCarga = this.elementos/this.size;
        }
        if(this.factorCarga > this.maximo){
            this.reHashing();
        }
    }

    //Este metodo se hace cuando el porcentaje de utilizacion supera nuestro porcentaje aceptado
    reHashing(){
        let siguiente = this.size;
        let factor = 0.0//Es el factor que se obtiene al evaluar nuestros elementos con el siguiente size

        while(factor <= this.minimo){
            //siguiente++;
            factor = this.elementos/siguiente;
            siguiente++;
        }
        let vectorTemp = [];
        this.elementos = 0;

        for(let i = 0; i<siguiente; i++){
            vectorTemp.push(null);
        }

        let auxVector = this.vector;

        this.vector = vectorTemp;
        this.size = siguiente;

        auxVector.forEach(nodo =>{
            if(nodo != null){
                nodo.lista.forEach(llave =>{
                    this.insertar(this.StringtoASCII(llave.clave), llave.clave, llave.valor);
                })
            }
        })
    }

    //Convierte una string a suma de valores enteros
    StringtoASCII(cadena){
        let result = 0;
        for (var i = 0; i<cadena.length; i++){
            result += cadena.charCodeAt(i);
        }
        return result;
    }

    print(){
        let valores = "";
        this.vector.forEach(nodo =>{
            if(nodo != null){
                valores = "";
                nodo.lista.forEach(llave =>{
                    valores += "|" + llave.clave + "," + llave.valor;
                });
                console.log("Indice:", nodo.indice, "valores:", valores);
            }else{
                console.log("Indice:", null);
            }
        })
    }

    graficar(){
        let valores = "";
        this.vector.forEach(nodo =>{
            if(nodo != null){
                valores = "";
                let node = document.createElement('div');
                node.classList.add('node');
                node.id = indice+"lista"
    
                let number = document.createElement('p');
                number.classList.add('number');

                let text = document.createTextNode(nodo.indice);

                number.appendChild(text);
                node.appendChild(number);
                
                let pointer = document.createElement('div');
                pointer.classList.add('pointer');
    
                let img = document.createElement('img');
                img.src = "img/flecha6.png";
        
                pointer.appendChild(img);

                if(indice === 0){
                    list.appendChild(node);
                    list.appendChild(pointer);
                    indice++;
                }else{
                    list.appendChild(node);
                    list.appendChild(pointer);
                    indice++;
                }
                nodo.lista.forEach(llave =>{
                    var nuevodiv = document.createElement("div");
                    nuevodiv.classList.add('vector');
                    var result = document.getElementById(node.id);
                    
                    let numero = document.createElement('p');
                    numero.classList.add('number');

                    let texto = document.createTextNode(llave.clave);

                    numero.appendChild(texto);
                    nuevodiv.appendChild(numero);

                    let flechaA = document.createElement('div');
                    flechaA.classList.add('flecha');
        
                    let img = document.createElement('img');
                    img.src = "img/flechaAbajo2.png";
            
                    flechaA.appendChild(img);

                    result.appendChild(flechaA)
	                result.appendChild(nuevodiv);
                    valores += "|" + llave.clave + "," + llave.valor;
                });
                console.log("Indice:", nodo.indice, "valores:", valores);
            }else{
                console.log("Indice:", null);
                let node = document.createElement('div');
                node.classList.add('node');
                node.id = indice+"lista"
    
                let number = document.createElement('p');
                number.classList.add('number');

                let text = document.createTextNode("null");

                number.appendChild(text);
                node.appendChild(number);
                
                let pointer = document.createElement('div');
                pointer.classList.add('pointer');
    
                let img = document.createElement('img');
                img.src = "img/flecha6.png";
        
                pointer.appendChild(img);

                if(indice === 0){
                    list.appendChild(node);
                    list.appendChild(pointer);
                    indice++;
                }else{
                    list.appendChild(node);
                    list.appendChild(pointer);
                    indice++;
                }
            }
        })
    }
}

/*Implementacion */

let tabla1 = new Hash(13, 30, 80);

function configuracion(){
    tamaño = document.getElementById('tamaño').value;
    minimo = document.getElementById('minimo').value;
    maximo = document.getElementById('maximo').value;

    tabla1 = new Hash(tamaño, minimo, maximo);
}

function insertar_nodo(){
    var dato = document.getElementById('dato_pag').value;

    document.getElementById("lista_hash").innerHTML="";

    tabla1.insertar(tabla1.StringtoASCII(dato), dato, indice);
    tabla1.graficar();
    tabla1.print();
}

