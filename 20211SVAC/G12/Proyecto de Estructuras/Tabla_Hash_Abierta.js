//Direccion Cerrado

let list = document.getElementById('lista_hash');
let nodes = document.getElementsByClassName('node');
let nuevosdivs = document.getElementsByClassName('vector');
let pointers = document.getElementsByClassName('pointer');
let flechas = document.getElementsByClassName('flecha');
let division = false;
let multiplicacion = false;
var indice = 0;
let result
let categoria = "";
let tipo = "";
let tamaño = 0;
let minimo = 0;
let maximo = 0
let funcion = "";
let prueba = "";
let animacion = 0;

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
        if (division == true){
            //let posicion = id % (this.size-1);//Este nos indica la posicion en donde estara posicionado en el array
            let posicion = id % (this.size);//Este nos indica la posicion en donde estara posicionado en el array
            if(posicion > this.size){
                return posicion - this.size;
            }
            return posicion;
        }else if(multiplicacion == true){
            let posicion = parseInt((this.size)*(id * 0.1625277911 % 1));
            if(posicion > this.size){
                return posicion - this.size;
            }
            return posicion;
        }
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
            siguiente++;
            factor = this.elementos/siguiente;
            //siguiente++;
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
        console.log(this.size);
    }

    buscar(dato){
        let count = 0
        let encontrado = false;
        this.vector.forEach(nodo =>{
            if(nodo != null){
                nodo.lista.forEach(llave =>{                    
                    if(dato == llave.clave){
                        console.log("Dato encontrado");
                        encontrado = true;
                        let aqui = "nodo"+count;
                        console.log(aqui);
                        nuevosdivs[count].animate([{background: 'yellow', opacity: 1, offset: 0, delay: 100+"s"}],{duration:1000});
                        return true;
                    }
                    count++;
                })
            }
        })
        if(!encontrado){
            console.log("No se encontro el dato");
            alert("El dato no se encontro");
        }
        console.log(count);
    }

    eliminar(dato){
        let count = 0;
        let encontrado = false;
        let satisfecho = false; 
        this.vector.forEach(nodo =>{
            if(nodo != null){
                count = 0
                nodo.lista.forEach(llave =>{                
                    if(dato == llave.clave && satisfecho == false){
                        encontrado = true;
                        let aqui = count;
                        console.log("este es el count: ", count);
                        nodo.lista.splice(aqui, 1);
                        satisfecho = true;
                        document.getElementById("lista_hash").innerHTML="";
                        this.graficar();
                        return true;
                    }                 
                    count++;
                    console.log("->", count);
                })
            }
        })
        if(!encontrado){
            console.log("No se encontro el dato");
            alert("El dato no se encontro");
        }
    }

    actualizar(dato_viejo){
        let count = 0;
        let encontrado = false;
        let satisfecho = false; 
        this.vector.forEach(nodo =>{
            if(nodo != null){
                count = 0
                nodo.lista.forEach(llave =>{                
                    if(dato_viejo == llave.clave && satisfecho == false){
                        encontrado = true;
                        let aqui = count;
                        console.log("este es el count: ", count);
                        nodo.lista.splice(aqui, 1);
                        satisfecho = true;
                        document.getElementById("lista_hash").innerHTML="";
                        this.graficar();
                        return true;
                    }                 
                    count++;
                    console.log("->", count);
                })
            }
        })
        if(!encontrado){
            console.log("No se encontro el dato");
            alert("El dato no se encontro");
        }
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
                    result = document.getElementById(node.id);
                    
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

//let tabla1 = new Hash(13, 30, 80);
let tabla1 = new Hash(5, 0.5, 0.8);
/*tabla1.insertar(tabla1.StringtoASCII("juan"), "juan", "1");
tabla1.insertar(tabla1.StringtoASCII("pedro"), "pedro", "2");
tabla1.insertar(tabla1.StringtoASCII("mario"), "mario", "3");
tabla1.print();
tabla1.eliminar("juan");
tabla1.eliminar("pedro");
tabla1.print();
tabla1.insertar(tabla1.StringtoASCII("juan"), "juan", "1");
tabla1.print();*/

function configuracion(){
    tamaño = document.getElementById('tamaño').value;
    minimo = document.getElementById('minimo').value;
    maximo = document.getElementById('maximo').value;

    tabla1 = new Hash(tamaño, minimo, maximo);
}

function insertar_nodo(){
    var dato = document.getElementById('dato_pag').value;
    division = document.getElementById('division').checked;
    multiplicacion = document.getElementById('multiplicacion').checked;

    if(division == false && multiplicacion == false){
        alert("Por favor seleccione una opcion");
        return false;
    }else{
        document.getElementById("lista_hash").innerHTML="";
        tabla1.insertar(tabla1.StringtoASCII(dato), dato, indice);
        tabla1.graficar();
        tabla1.print();
    }
}

function buscar_nodo(){
    var dato = document.getElementById('dato_pag').value;
    tabla1.buscar(dato);
}

async function eliminar_nodo(){
    var dato = document.getElementById('dato_pag').value;

    for(var i=0; i<nuevosdivs.length; i++){
        var muestra = nuevosdivs[i].firstChild.innerHTML;
        console.log(muestra);
        if(muestra == dato){
            encontrado=true;
            await animacion_nodo(i);
            break;
        }
    } 
    tabla1.eliminar(dato);
}

function Actualizar(){
    var dato_viejo = document.getElementById('Viejo').value;
    var dato_nuevo = document.getElementById('Nuevo').value;

    tabla1.actualizar(dato_viejo);
    tabla1.insertar(tabla1.StringtoASCII(dato_nuevo), dato_nuevo, indice);
    document.getElementById("lista_hash").innerHTML="";
    tabla1.graficar();
}

function animacion_nodo(i) {
    return new Promise(resolve => {
        console.log("se hizo algo");
        nuevosdivs[i].animate([{transform: 'scale(0.5)', background: 'yellow', opacity: 0.9, offset: 0},
        {transform: 'scale(1)',background: 'yellow', opacity: 0.9, offset: 0.2},
        {transform: 'scale(1.5)',background: 'yellow', opacity: 0.9, offset: 0.5}],
        {duration:500});
        setTimeout(()=> resolve(), 500);
    });
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
            tamaño = mydata.m;
            minimo = (mydata.minimo)/100;
            maximo = (mydata.maximo)/100;
            funcion = mydata.funcion;
            prueba = mydata.prueba;
            animacion = mydata.animacion;
            tabla1 = new Hash(tamaño, minimo, maximo);
            if(funcion == "Division"){
                division = true;
            }
            if(funcion == "Multiplicacion"){
                multiplicacion = true;
            }
            console.log(mydata);
            for(var i = 0; i<(mydata.valores).length; i++){
                valores = mydata.valores[i];
                console.log(valores)
                tabla1.insertar(tabla1.StringtoASCII(valores), valores, indice);
            }
            tabla1.graficar();
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
    var lista_nueva = [];

    for(var i = 0; i<nuevosdivs.length; i++){
        lista_nueva.push(nuevosdivs[i].firstChild.innerHTML)
    }

    var contenido = JSON.stringify({"categoria": categoria, "nombre": tipo, "m": tamaño, "minimo": minimo, "maximo": maximo, "funcion": funcion, "prueba": prueba, "animacion": animacion, "valores":lista_nueva});
    console.log(contenido);
    console.log(JSON.stringify(lista_nueva));

    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato = "Hash_Abierto"+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

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