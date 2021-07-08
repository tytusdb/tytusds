var checkBoxAbiertaString =false;
var checkBoxAbiertaInt=false;
var checkBoxabiertaDivision=false;
var checkBoxAbiertaSimple=false;
var checkBoxAbiertaMultiplicacion=false;
var categoriaAbierta;
var nombreAbierta;
var tamanoAbierta;
var minimoAbierta;
var maxicoAbierta;
var funcionAbierta;
var pruebaAbierta;
var animacionAbierta;
var ListaFinalAbierta= [];

function checkAbiertaSimple(){
    if(checkBoxAbiertaSimple == true){
        checkBoxAbiertaSimple = false;
        console.log("cambiando chek "+ checkBoxAbiertaSimple);
    }else{
        checkBoxAbiertaSimple = true;
        console.log("cambioando chek "+ checkBoxAbiertaSimple);
    }  
}
function checkAbiertaDivision(){
    if(checkBoxabiertaDivision == true){
        checkBoxabiertaDivision = false;
        console.log("cambiando chek "+ checkBoxabiertaDivision);
    }else{
        checkBoxabiertaDivision = true;
        console.log("cambioando chek "+ checkBoxabiertaDivision);
    }  
}
function checkAbiertaMultiplicacion(){
    if(checkBoxAbiertaMultiplicacion == true){
        checkBoxAbiertaMultiplicacion = false;
        console.log("cambiando chek "+ checkBoxAbiertaMultiplicacion);
    }else{
        checkBoxAbiertaMultiplicacion = true;
        console.log("cambioando chek "+ checkBoxAbiertaMultiplicacion);
    }  
}
function checkAbiertaString(){
    if(checkBoxAbiertaString == true){
        checkBoxAbiertaString = false;
        console.log("cambiando chek "+ checkBoxAbiertaString);
    }else{
        checkBoxAbiertaString = true;
        console.log("cambioando chek "+ checkBoxAbiertaString);
    }  
}


function checkAbiertaInt(){
    if(checkBoxAbiertaInt == true){
        checkBoxAbiertaInt = false;
        console.log("cambiando chek "+ checkBoxAbiertaInt);
    }else{
        checkBoxAbiertaInt = true;
        console.log("cambioando chek "+ checkBoxAbiertaInt);
    }  
}


//esta clase es la uqe vamos a guardar en el array principal\
class NodoAbierta{
    constructor(indice) {
        this.indice = indice;
        this.lista = [];
    }
}
//esta guarda los valores las listas secundarias
class Llave{
    constructor(clave,valor){
        this.clave = clave;
        this.valor = valor;
    }
}

class Hash{
    constructor(size, minimo, maximo){
        this.vector = [];//array principal
        this.elementos = 0;//numero de elementos insertados en la tabla principal
        this.size = size; //tamanio de la tabla
        this.factorCarga = 0.0; // porcentaje de la tabla
        this.maximo = maximo;
        this.minimo = minimo;
        this.contador = 0;

        //llenado de tabla con valores nulos listos para llenarse
        for(let i = 0; i<size;i++){
            this.vector.push(null)
        }
    }

    insertar(id,clave,valor){
        let posicion = this.funcionHash(id);
        if(this.vector[posicion] != null){
            //let nodo = new Llave(clave, valor ); //Genera una nueva llave
            this.vector[posicion].lista.push(new Llave(clave,valor)); // inserta en la lista secundaria con la posicion en la lista principal
        }else{
            let nodo = new NodoAbierta(posicion); //Genera una nueva llave
            nodo.lista.push(new Llave(clave, valor));
            this.vector[posicion] = nodo;
            this.elementos++;
            this.factorCarga = parseFloat(this.elementos/this.size);

        }
        //console.log(this.factorCarga)
        //console.log(this.maximo)
        if(this.factorCarga > this.maximo/100){
            //console.log(this.factorCarga)
            //console.log(this.vector)
            this.reHashing();  
        }
        this.contador=0
    }

    funcionHash(id){ // con el metodo de division
        //console.log(id)
        if(checkBoxabiertaDivision ==true){
            let posicion = id % (this.size - 1) //posicion en donde estara posicionado en el array
            if(posicion > this.size){
                return posicion - this.size;
            }
            return posicion;
        }
        if(checkBoxAbiertaSimple ==true){
            while (id >= 1){
                id = id / 10
            }        
            console.log(id)    
            console.log(this.size - 1)
            let posicion = id * (this.size - 1) //posicion en donde estara posicionado en el array
            posicion = Math.trunc(posicion);
            console.log(posicion)
            if(posicion > this.size){
                return posicion - this.size;
            }
            console.log(posicion)
            return posicion;
        }
        if(checkBoxAbiertaMultiplicacion ==true){
            let A = id;
            this.contador++
            while (A >= 1){
                 A = A/ 10
            }    
    
            let posicion =  (this.size - 1)*((id*A)%this.contador);
            posicion = Math.trunc(posicion);
            if(posicion > this.size){
                return posicion - this.size;
            }
            console.log(posicion)
             return posicion;
        }
    }

    reHashing(){
        let siguiente = this.size; //
        let factor = this.elementos/this.size; //despues del rehashing
        while(factor > this.minimo/100){
            siguiente = siguiente + 1;
            //console.log(siguiente)
            factor = this.elementos/siguiente;
        }
        let vectorTemp = [];
        this.elementos = 0;
        for(let i = 0;i < siguiente; i++){
            vectorTemp.push(null);
        }
        let auxVector = this.vector;
        this.vector = vectorTemp;
        this.size = siguiente;
        console.log(this.size)
        auxVector.forEach(nodo => {
            if(nodo != null){
                nodo.lista.forEach(llave =>{
                    if(checkBoxAbiertaString == true){
                        this.insertar(this.toASCII(llave.clave), llave.clave,llave.valor);
                    }
                    if(checkBoxAbiertaInt == true){
                        this.insertar(llave.clave,llave.clave,llave.valor);
                    }
                    
                });
            }
        });
       
       
    } 
    toASCII(cadena){
        //console.log(cadena)
        var contador = 0;
            for(var h in cadena){
            // console.log(data.charCodeAt(k));
                contador = contador + cadena.charCodeAt(h);
                //console.log(cadena.charCodeAt(h) )
            }
        //console.log(contador)
        return contador;
    }

    print(){
        let valores = "";
        this.vector.forEach(nodo => {
            if(nodo != null){
                valores = "";
                nodo.lista.forEach(llave =>{
                    valores += " | "+ llave.valor
                });
                console.log("indice: ",nodo.indice,"Valores:",valores);
            }else{
                console.log("indice:",null)
            }
        });
    }
    buscar(data,dato){
        if(checkBoxAbiertaMultiplicacion==true){
            this.contador = 0;
            console.log(data);
            //let posicion = this.funcionHash(data);
            //console.log(posicion);
            this.vector.forEach(nodo => {
                if(nodo != null){
                    //valores = "";
                    nodo.lista.forEach(llave =>{
                       // valores += " | "+ llave.valor
                       //console.log(llave.clave)
                        if(llave.clave==data){
                            console.log("Elemento enontrado:"+ data+" "+"En el indice: "+nodo.indice);
                        }
                    });
                    //console.log("indice: ",nodo.indice,"Valores:",valores);
                }else{
                    //console.log("indice:",null)
                }
            });
        }
        if(checkBoxAbiertaSimple == true){
            let posicion;
            if(checkBoxAbiertaInt==true){
                posicion = this.funcionHash(data);
            }
            if(checkBoxAbiertaString ==true){
                posicion = this.funcionHash(this.toASCII(data));
            }
            
            //console.log(data);
            console.log(posicion);
            console.log(this.vector[posicion].lista);
            let contador = 0;
            this.vector[posicion].lista.forEach(llave =>{
                if(dato == llave.valor){
                    //console.log("Elemento Encontrado Con Funcion Hash, Posicion: "+posicion);
                   // console.log("Posicion en La lista: "+contador);
                }
                contador++;
               // console.log(llave.valor);
            });

        }
        if(checkBoxabiertaDivision==true){
            let posicion;
            if(checkBoxAbiertaInt ==true){
                posicion = this.funcionHash(data);
            }
            if(checkBoxAbiertaString ==true){
                posicion = this.funcionHash(this.toASCII(data));
            }
        //console.log(data);
        //console.log(posicion);
        //console.log(this.vector[posicion].lista);
            let contador = 0;
            this.vector[posicion].lista.forEach(llave =>{
            if(dato == llave.valor){
                console.log("Elemento Encontrado Con Funcion Hash, Posicion: "+posicion);
                console.log("Posicion en La lista: "+contador);
            }
            contador++;
           // console.log(llave.valor);
        });
        }   
    }
    eliminar(data){
        this.vector.forEach(nodo => {
            let contadorBorrar = 0;
            if(nodo != null){
                nodo.lista.forEach(llave =>{
                    if(llave.valor==data){
                        let listaBorrar = [];
                        for(llave in nodo.lista){
                            if(nodo.lista[llave].valor != data){
                                listaBorrar.push(nodo.lista[llave]);
                            }else{
                                if(contadorBorrar==0){
                                    contadorBorrar++;
                                }else{
                                    listaBorrar.push(nodo.lista[llave]);
                                }
                            }
                        }
                        if(listaBorrar.length == 0){
                            this.vector[nodo.indice]=null;
                        }else{
                            nodo.lista = listaBorrar;
                        }                      
                    }
                });
                //console.log("indice: ",nodo.indice,"Valores:",valores);
            }else{
                //console.log("indice:",null)
            }
        });
        
    }
    llenarLista(){
        let valores = "";
        this.vector.forEach(nodo => {
            if(nodo != null){
                valores = "";
                nodo.lista.forEach(llave =>{
                    valores += " | "+ llave.valor;
                    ListaFinalAbierta.push(llave.valor);
                });
                //console.log("indice: ",nodo.indice,"Valores:",valores);
            }else{
               // console.log("indice:",null)
            }
        });
        return ListaFinalAbierta;
    
    }
}
 

let tabla1 = new Hash(4,30,70);
//tabla1.insertar("0","0","0" );
//tabla1.insertar("1","1","1");
//tabla1.insertar("2","2","2");
//console.log("*****************")
//tabla1.print();

function insertarAbierta(data){
    if(checkBoxAbiertaString == true){
        tabla1.insertar(tabla1.toASCII(data),data,data);
        console.log("*****************")
        console.log(tabla1.print());
    }
    if(checkBoxAbiertaInt == true){
        console.log("*****************")
        tabla1.insertar(data,data,data);
        console.log(tabla1.print());
    }
    
}
function buscarAbierta(data){
    console.log("buscando");
    tabla1.buscar(data,data)
}
function eliminarAbierta(data){
    tabla1.eliminar(data)
    tabla1.print();
}
function actualizaAbierta(data1,data2){
    tabla1.eliminar(data1);
    console.log("el dato nuevo es:" +data2)
    insertarAbierta(data2);
    //tabla1.print();
}


function guardarAbierta(event) {
    //console.log(event)
    var file = event.target.files[0];
    //console.log(file)
    var reader = new FileReader();
    reader.onload = function(event) {
      // El texto del archivo se mostrará por consola aquí
     // console.log(event.target.result)
      let doc = JSON.parse(event.target.result);
      //console.log(doc)

      for (var key in doc) {
        //console.log('name=' + key + ' value=' + doc[key]);
        if(key=='categoria'){
            categoriaAbierta = doc[key]
            console.log(categoriaAbierta)
        }
        if(key=='m'){
            tamanoAbierta = doc[key];
            console.log(tamanoAbierta);
        }
        if(key=='nombre'){
            nombreAbierta = doc[key]
            console.log(nombreAbierta)
        }
        if(key=='minimo'){
            minimoAbierta = doc[key]
            console.log(this.minimo)
        }
        if(key=='maximo'){
            maxicoAbierta = doc[key]
            console.log(this.maximo)
        }
        if(key=='funcion'){
            funcionAbierta = doc[key]
            if(funcionAbierta == 'Multiplicacion'){
                checkBoxAbiertaMultiplicacion = true;
            }
            if(funcionAbierta == 'Division'){
                checkBoxabiertaDivision = true;
            }
            if(funcionAbierta= 'Simple')
                checkBoxAbiertaSimple = true;
            console.log(funcionAbierta)
        }
        if(key=='animacion'){
            animacionAbierta = doc[key]
            console.log(animacionCerrada)
            tabla1 = new Hash(tamanoAbierta,minimoAbierta,maxicoAbierta);
        }
        if(key=='valores'){
            //console.log(doc[key].length)
            for (var k in doc[key]){
                console.log(doc[key][k]);
                insertarAbierta(doc[key][k]);
            }
        }
        //console.log(key)
     }
     

    };
    console.log(tabla1.print());
    reader.readAsText(file);
}//guardar archivo
function downloadAbierta(filename, text) {
    //console.log("LISTA PARA GUARDAR: "+quitarUno())
 
  
    var element = document.createElement('a');
    let doc = JSON.stringify({ "categoria": categoriaAbierta, 'nombre': nombreAbierta, 'tamaño':tamanoAbierta, 'minimo':minimoAbierta, 'maximo': maxicoAbierta, 'funcion': funcionAbierta
    ,'prueba': pruebaAbierta, 'animacion': animacionAbierta, 'valores': tabla1.llenarLista() });
    
    //console.log(listSimple.print())
    element.setAttribute('href', 'data:json,' + doc);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
