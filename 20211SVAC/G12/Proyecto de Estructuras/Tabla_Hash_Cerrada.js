//Direccionamiento Abierto

let list = document.getElementById('lista_hash');
let nuevosdivs = document.getElementsByClassName('vector');
let nodes = document.getElementsByClassName('node');
let flechas = document.getElementsByClassName('flecha');
let division = false;
let multiplicacion = false;
let seleccion_lineal = false;
let seleccion_cuadratica = false;
let seleccion_hash = false;
var indice = 0;
let categoria = "";
let tipo = "";
let tamaño = 0;
let minimo = 0;
let maximo = 0
let funcion = "";
let prueba = "";
let animacion = 0;

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
        if(division == true){
            if(seleccion_lineal == true){
                let posicion = id % (this.size);
    
                while(this.vector[posicion] != null){
                    posicion++;
                    if(posicion > this.size){
                        posicion = posicion - this.size;
                    }
                }
                return posicion;
            }else if(seleccion_cuadratica == true){
                let contador = 0;
                let posicion = id % (this.size);
                let posicion_nueva = id % (this.size);
    
                while(this.vector[posicion] != null){
                    contador++;
                    posicion = posicion_nueva + (contador*contador);
                    if(posicion > this.size){
                        posicion = posicion - this.size;
                    }
                }
                return posicion;
            }else if(seleccion_hash == true){
                let contador = 0;
                let posicion = id % (this.size);
                let posicion_nueva = id % (this.size);
                let otra_posicion = id % (this.size);
            
                while(this.vector[posicion] != null){
                    contador++;
                    if(posicion == 0){
                        break;
                    }
                    posicion = posicion_nueva + (contador*otra_posicion);
                    if(posicion > this.size){
                        posicion = posicion - this.size;
                    }
                }
                return posicion;
            }
        }else if(multiplicacion == true){
            if(seleccion_lineal == true){
                let posicion = parseInt((this.size)*(id * 0.1625277911 % 1));
    
                while(this.vector[posicion] != null){
                    posicion++;
                    if(posicion > this.size){
                        posicion = posicion - this.size;
                    }
                }
                return posicion;
            }else if(seleccion_cuadratica == true){
                let contador = 0;
                let posicion = parseInt((this.size)*(id * 0.1625277911 % 1));
                let posicion_nueva = parseInt((this.size)*(id * 0.1625277911 % 1));
    
                while(this.vector[posicion] != null){
                    contador++;
                    posicion = posicion_nueva + (contador*contador);
                    if(posicion > this.size){
                        posicion = posicion - this.size;
                    }
                }
                return posicion;
            }else if(seleccion_hash == true){
                let contador = 0;
                let posicion = parseInt((this.size)*(id * 0.1625277911 % 1));
                let posicion_nueva = parseInt((this.size)*(id * 0.1625277911 % 1));
                let otra_posicion = parseInt((this.size)*(id * 0.1625277911 % 1));
            
                while(this.vector[posicion] != null){
                    contador++;
                    if(posicion == 0){
                        break;
                    }
                    posicion = posicion_nueva + (contador*otra_posicion);
                    if(posicion > this.size){
                        posicion = posicion - this.size;
                    }
                }
                return posicion;
            }
        }
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

    buscar(dato){
        let count = 0;
        let encontrado = false;
        for(var i=0; i<nodes.length; i++){
            count++;
            var muestra = nodes[i].firstChild.innerHTML;
            if(muestra == dato){
                encontrado=true;
                //await nodos_animados(0, tamaño-1);
                nodes[count-1].animate([{background: 'yellow', opacity: 1, offset: 0, delay: 100+"s"}],{duration:1000});
                console.log("encontrado");
                break;
            }   
        }
        if(!encontrado){
            console.log("No se encontro el dato");
            alert("El dato no se encontro");
        }
    }

    delete(dato){
        let count = 0;
        let encontrado = false;
        let satisfecho = false;
        for(var i=0; i<nodes.length; i++){
            count++;
            var muestra = nodes[i].firstChild.innerHTML;
            if(dato == muestra && satisfecho == false){
                encontrado = true;
                satisfecho = true;
                this.vector.splice(count-1, 1);
                this.vector.splice(count-1,0,null);
                document.getElementById("lista_hash").innerHTML="";
                this.graficar();
            }
        }
        if(encontrado==false){
            alert("no se encontro");
            console.log("no se encontro"); 
        }
    }

    actualizar(dato_viejo){
        let count = 0;
        let encontrado = false;
        let satisfecho = false;
        for(var i=0; i<nodes.length; i++){
            count++;
            var muestra = nodes[i].firstChild.innerHTML;
            if(dato_viejo == muestra && satisfecho == false){
                encontrado = true;
                satisfecho = true;
                this.vector.splice(count-1, 1);
                this.vector.splice(count-1,0,null);
                document.getElementById("lista_hash").innerHTML="";
                this.graficar();
            }
        }
        if(encontrado==false){
            alert("no se encontro");
            console.log("no se encontro"); 
        }
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
    seleccion_lineal = document.getElementById('lineal').checked;
    seleccion_cuadratica = document.getElementById('cuadratica').checked;
    seleccion_hash = document.getElementById('doble').checked;
    division = document.getElementById('division').checked;
    multiplicacion = document.getElementById('multiplicacion').checked;

    if(division == false && multiplicacion == false){
        alert("Por favor seleccione una funcion hash");
        return false;
    }else{
        if(seleccion_lineal == false && seleccion_cuadratica == false && seleccion_hash == false){
            alert("Por favor seleccione una opcion prueba");
            return false;
        }else{
            document.getElementById("lista_hash").innerHTML="";
            tabla.insertar(tabla.StringtoASCII(dato), dato, dato);
            tabla.graficar();
            tabla.print();
        }
    }
}

function buscar_nodo(){
    var dato = document.getElementById('dato_pag').value;
    tabla.buscar(dato);
}

async function eliminar_nodo(){
    var dato = document.getElementById('dato_pag').value;

    for(var i=0; i<nodes.length; i++){
        var muestra = nodes[i].firstChild.innerHTML;
        console.log(muestra);
        if(muestra == dato){
            encontrado=true;
            await animacion_nodo(i);
            break;
        }
    } 
    tabla.delete(dato);
}

function animacion_nodo(i) {
    return new Promise(resolve => {
        console.log("se hizo algo");
        nodes[i].animate([{transform: 'scale(0.5)', background: 'yellow', opacity: 0.9, offset: 0},
        {transform: 'scale(1)',background: 'yellow', opacity: 0.9, offset: 0.2},
        {transform: 'scale(1.5)',background: 'yellow', opacity: 0.9, offset: 0.5}],
        {duration:500});
        setTimeout(()=> resolve(), 500);
    });
}

function Actualizar(){
    var dato_viejo = document.getElementById('Viejo').value;
    var dato_nuevo = document.getElementById('Nuevo').value;

    tabla.actualizar(dato_viejo);
    tabla.insertar(tabla.StringtoASCII(dato_nuevo), dato_nuevo, dato_nuevo);
    document.getElementById("lista_hash").innerHTML="";
    tabla.graficar();
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
            tabla = new Hash(tamaño, minimo, maximo);
            console.log(mydata);
            if(funcion == "Division"){
                division = true;
                if(prueba == "Lineal"){
                    seleccion_lineal = true;
                }else if(prueba == "Cuadratica"){
                    seleccion_cuadratica = true;
                }else if(prueba == "Doble"){
                    seleccion_hash = true;
                }
            }else if(funcion == "Multiplicacion"){
                multiplicacion = true;
                if(prueba == "Lineal"){
                    seleccion_lineal = true;
                }else if(prueba == "Cuadratica"){
                    seleccion_cuadratica = true;
                }else if(prueba == "Doble"){
                    seleccion_hash = true;
                }
            }
            console.log("Division: ", division);
            console.log("Multiplicacion: ", multiplicacion);
            console.log("Lineal: ", seleccion_lineal);
            console.log("Cuadratica: ", seleccion_cuadratica);
            console.log("Doble: ", seleccion_hash);
            for(var i = 0; i<(mydata.valores).length; i++){
                valores = mydata.valores[i];
                console.log(valores)
                tabla.insertar(tabla.StringtoASCII(valores), valores, valores);
            }
            tabla.graficar();
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

    for(var i = 0; i<nodes.length; i++){
        lista_nueva.push(nodes[i].firstChild.innerHTML)
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
    var formato = "Hash_Cerrado"+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

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
