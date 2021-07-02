function ordBurburjaAnimate(arreglo) {
    let velocityAnimate=1000, tRetraso=1
    for (var i = (arreglo.length)-1; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if(parseInt(arreglo[j].dato)>parseInt(arreglo[j+1].dato)){
                var temp = arreglo[j].dato;
                arreglo[j].dato = arreglo[j+1].dato
                arreglo[j+1].dato = temp
                animar(arreglo[j].dato,arreglo[j].x,50,velocityAnimate*tRetraso)
                animar(arreglo[j+1].dato,arreglo[j+1].x,50,velocityAnimate*tRetraso)
                //tRetraso++       
            }
        }tRetraso++
    }
    return arreglo;
}
function ordBurburja(arreglo) {
    for (var i = (arreglo.length); i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if(arreglo[j]>arreglo[j+1]){
                var temp = arreglo[j];
                arreglo[j] = arreglo[j+1]
                arreglo[j+1] = temp;
            }
        }
    }
    return arreglo;
}
class Boton{
    constructor(dato, x, y, cadena){
        this.dato=dato
        this.x=x
        this.y=y
        this.cadena = cadena
    }
}

function ordBurburjaString(arreglo) {
    for (var i = (arreglo.length); i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if(arreglo[j]> arreglo[j+1]){
                var temp = arreglo[j];
                arreglo[j] = arreglo[j+1]
                arreglo[j+1] = temp;
            }
        }
    }
    return arreglo;
}

function seleccion(array){
    let pMax,aux
    for (let i = 0; i < array.length; i++) {
        pMax=i
        for (let j = i+1; j < array.length; j++) {
            if (array[pMax]>array[j]) {
                pMax=j
            }
        }
        aux=array[pMax]
        array[pMax]=array[i]
        array[i]=aux    
    }
    return array
}

function seleccionAnimate(array){
    let pMax,aux, vel=500, retraso=1, ejec=false
    for (let i = 0; i < array.length; i++) {
        pMax=i
        for (let j = i+1; j < array.length; j++) {
            if (array[pMax].dato>array[j].dato) {
                pMax=j
                ejec=true
            }
        }
        aux=array[pMax].dato
        array[pMax].dato=array[i].dato
        array[i].dato=aux
        if (ejec) {
            animar(array[i].dato,array[i].x,50,vel*retraso)    
            animar(array[pMax].dato,array[pMax].x,50,vel*retraso)    
            retraso++
            ejec=false            
        }
    }
    //return array
}

function insercion(array){
    let aux
    for (let x=0;x<array.length;x++){
        aux=array[x]
        for (let y=x; y>0; y--){
            if(array[y]<array[y-1]){
                aux=array[y]
                array[y]=array[y-1]
                array[y-1]= aux
            }
        }
    }
    return array
}

function insercionAnimate(array){
    let aux, vel=500, retraso=1
    for (let x=0;x<array.length;x++){
        aux=array[x].dato
        for (let y=x; y>0; y--){
            if(array[y].dato<array[y-1].dato){
                aux=array[y].dato
                array[y].dato=array[y-1].dato
                array[y-1].dato= aux
                animar(array[y].dato,array[y].x,50,vel*retraso)
                animar(array[y-1].dato,array[y-1].x,50,vel*retraso)
            }
        }retraso++
    }
    //return array
}
function quick(array,inicio,fin,retraso){
    let indice
    setInterval(() => {
        if(inicio<fin){
            indice=part(array,inicio,fin,retraso)
            retraso++
        }        
    }, 1000);
    setInterval(() => {
        quick(array,inicio,indice-1)
        retraso++    
    }, 1000);
    setInterval(() => {
        quick(array,indice+1,fin)
        retraso++    
    }, 1000);

    return array
}

function part(array,inicio,fin,retraso){
    let pivote=array[fin].dato, i=inicio,temp,indicePivote, vel=1000
    for(let j=inicio; j<fin;j++){
        if(array[j].dato<pivote){
            temp=array[i].dato
            array[i].dato=array[j].dato
            array[j].dato=temp

            animar(array[i].dato,array[i].x,50,vel*retraso)
            animar(array[j].dato,array[j].x,50,vel*retraso)

            i++
        }
    }
    indicePivote= i
    temp=array[indicePivote]
    array[indicePivote]=array[fin]
    array[fin]=temp
    return indicePivote
}

function ordRapidoAnimate(array){
    let retraso=1
    return quick(array,0,array.length-1, retraso)
}


function quicksort(array,inicio,fin){
    let indice
    if(inicio<fin){
        indice=partir(array,inicio,fin)
        quicksort(array,inicio,indice-1)
        quicksort(array,indice+1,fin)
    }
    return array
}

function partir(array,inicio,fin){
    let pivote=array[fin], i=inicio,temp,indicePivote
    for(let j=inicio; j<fin;j++){
        if(array[j]<pivote){
            temp=array[i]
            array[i]=array[j]
            array[j]=temp
            i++
        }
    }
    indicePivote= i
    temp=array[indicePivote]
    array[indicePivote]=array[fin]
    array[fin]=temp
    return indicePivote
}

function ordRapido(array){
    return quicksort(array,0,array.length-1)
}
function ObtenerString(array){
    let listaString = []
    let listaSuma = []
    for (k in array){
        let suma = 0;
        for (l in array[k]){
            letra = array[k][l]
            suma = suma + letra.charCodeAt(0)
        }
        listaString.push(suma)
    }
    return listaString
}
function compararString(var1, var2){
    let contador = 1
    let popo = []
    for (k in var1){
        //console.log(var1[k])
        for (l in var2){
            //console.log(var2[l])
            let unicode = 0;
            for(u in var2[l]){
                unicode = unicode + var2[l][u].charCodeAt(0)
            }
            if(var1[k]==unicode){
                popo.push(var2[l])
                //console.log("el valor es: "+contador+" "+ unicode + " "+var2[l])
                contador=contador+1
            }
        }
    }
    return popo
}
//lista = ["juli","daniel","miguel","che",'la',"ferggie","o"];
//NombresAscci = ObtenerString(lista);
//NombresAscciOrdenados = ordBurburja(NombresAscci);
//accion = compararString(NombresAscciOrdenados,lista);
//console.log(accion)
/////////////////////ordenamiento burbuja
var categoriaBurbuja = "Ordenamientos";
var nombreBurbuja = 'Ordenamiento Burbuja';
var repeticionBurbuja = "True";
var animacionBurbuja = "0";
var ListaOrdenada = []
var ListaSinOrdenar = []
var chekString = false;
var NombresAscci;
var NombresAscciOrdenados;
var accion;
//variables seleccion
var categoriaSeleccion = "Ordenamientos";
var nombreBurbujaSeleccion = 'Ordenamiento por seleccion';
var repeticionBurbujaSeleccion = "True";
var animacionBurbujaSeleccion = "0";
var chekStringSeleccion = false;
var NombresAscciSeleccion;
var NombresAscciOrdenadosSeleccion;
var accionSeleccion;
var ListaSinOrdenarSeleccion= [];
var ListaOrdenadaSeleccion= [];//termina var seleccion

///variables insercion
var categoriaInsercion = "Ordenamientos";
var nombreInsercion = 'Ordenamiento por Insercion';
var repeticionInsercion = "True";
var animacionInsercion = "0";
var chekStringInsercion = false;
var NombresAscciInsercion;
var NombresAscciOrdenadosInsercion;
var accionInsercion;
var ListaSinOrdenarInsercion= [];
var ListaOrdenadaInsercion= []; //terminan insercion

///variables rapido
var categoriaRapido = "Ordenamientos";
var nombreRapido = 'Ordenamiento Rapido';
var repeticionRapido = "True";
var animacionRapido = "0";
var chekStringRapido = false;
var NombresAscciRapido;
var NombresAscciOrdenadosRapido;
var accionRapido;
var ListaSinOrdenarRapido= [];
var ListaOrdenadaRapido= []; //terminan rapido

function crearColocar(array,valMax){
    const divInsert=document.getElementById("divInsert1");
    for (var i = 0; i < (array.length); i++) {
        const objeto=document.createElement("button"); //Creacion del botón
        const texto=document.createTextNode(array[i]);
        objeto.appendChild(texto);
        //Diseño del botón
        objeto.style.backgroundColor='rgb(30,144,255)'
        objeto.style.color='rgb(255,255,255)'
        objeto.style.fontSize='15px'
        objeto.style.color="black"
        objeto.style.borderRadius="5px"
        objeto.style.width="40px"
        objeto.style.height=((array[i]/valMax)*1000).toString()+"px"
        objeto.id="btn"+(array[i]).toString()
        objeto.classList='animate__animated animate__rubberBand animate__slow'
        divInsert.appendChild(objeto)//Insertando el div en el Div principal
        const posicion=document.getElementById(objeto.id)
        posicion.style.position="absolute"
        posicion.style.left=(40*(i)).toString()+"px"
        posicion.style.top="50px"
        const boton= new Boton(array[i],(40*(i)),50)
        //console.log(array[i])
        array[i]=boton
        //console.log(array[i])
    }
    return array
}
/*function crearColocarString(array,valMax){
    const divInsert=document.getElementById("divInsert1");
    for (var i = 0; i < (array.length); i++) {
        const objeto=document.createElement("button"); //Creacion del botón
        const texto=document.createTextNode(array[i]);
        objeto.appendChild(texto);

        objeto.style.backgroundColor='rgb(30,144,255)'
        objeto.style.color='rgb(255,255,255)'
        objeto.style.fontSize='15px'
        objeto.style.color="black"
        objeto.style.borderRadius="5px"
        objeto.style.width="40px"
        objeto.style.height=((array[i]/valMax)*1000).toString()+"px"
        objeto.id="btn"+(array[i]).toString()
        objeto.classList='animate__animated animate__rubberBand animate__slow'
        divInsert.appendChild(objeto)//Insertando el div en el Div principal
        const posicion=document.getElementById(objeto.id)
        posicion.style.position="absolute"
        posicion.style.left=(40*(i)).toString()+"px"
        posicion.style.top="50px"
        const boton= new Boton(array[i],(40*(i)),50)
        array[i]=boton
    }
    return array
}*/

function animar(id, x, y, tiempoEspera){
    const  t= setInterval(whiles,tiempoEspera)
    function whiles(){
        const selecBtn = document.getElementById("btn"+id.toString())
        selecBtn.classList="animate__animated animate__fadeIn animate__faster"
        const sClone = selecBtn.cloneNode(true)
        selecBtn.parentNode.replaceChild(sClone, selecBtn)
        sClone.style.posicion="absolute"
        sClone.style.left=x+"px"        
        sClone.style.top=y+"px"
        clearInterval(t)
    }
}
function valMax(array){
    let valMax=array[0]
    for (let index = 1; index < array.length; index++) {
        if (valMax<array[index]) {
            valMax=array[index]
        }
    }
    return valMax
}

function AbrirOrdenamientoBurbuja(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(event) {
      let doc = JSON.parse(event.target.result); //convierto en Json el archivo
     

      for (var key in doc) { // con este FOR recorro los valores que trae el JSON que abri en el archivo
        if(key=='categoria'){
            categoria = doc[key] //lleno la variable categoria
            console.log(categoria)
        }
        if(key=='nombre'){
            nombre = doc[key] //lleno la variable nombre
            console.log(nombre)
        }
        if(key=='repeticion'){
            repeticion = doc[key] //lleno la variable repeticion
            console.log(repeticion)
        }
        if(key=='animacion'){ //lleno la variable animacion
            animacion = doc[key]
            console.log(animacion)
        }
        if(key=='valores'){ // leno la variable valores
            ListaSinOrdenar = [];
            ListaOrdenada = [];
           if(chekString == false){ //si el check de String esta desactivado hace esto 
                for (var k in doc[key]){
                    ListaSinOrdenar.push(doc[key][k]) //recorro todos los *valores de el archivo* y los meto en una lista ListaSinOrdenar
                }

                var ListBoton = crearColocar(ListaSinOrdenar,valMax(ListaSinOrdenar))
                //var Ls = ordBurburja(ListBoton)
                var a = setInterval(function(){
                //ListaOrdenada = ordBurburja(ListaSinOrdenar)
                console.log("Es la lista ordenada", ordBurburjaAnimate(ListBoton))
                //console.log(ListaOrdenada);
                 // La lista SIn ordenar la envio a el ordenamiento correspondiente//
                clearInterval(a)
            },2000)
                //crearColocar(ListaSinOrdenar,9515)
                //crearColocar(ListaSinOrdenar,ListaOrdenada[ListaOrdenada.length-1])

            }
            if(chekString == true){ //si el check de String esta *activado** hace esto
                console.log("check es true")
                for (var k in doc[key]){ 
                    // console.log(doc[key][k])
                    ListaSinOrdenar.push(doc[key][k]) //recorro todos los *valores de el archivo* y los meto en una lista ListaSinOrdenar
                }
                //1ro  obtengo ascci desordenado osea los codigos de los nombres
                NombresAscci = ObtenerString(ListaSinOrdenar);//1er paso// 
                //2do ordeno Ascci --- ordeno los codigos con el el ordenamiento correspondiente //
                let lassci=NombresAscci.slice()
                NombresAscciOrdenados = ordBurburja(NombresAscci);//2do paso// 
                //3ro  ordeno las 2 listas
                accion = compararString(NombresAscciOrdenados,ListaSinOrdenar); //con este metodo enlazo el codigo ASSCI 
                                                                            //ya ordenado y lo enlazo con su nombre
                console.log(accion) //imprimo la lista ya ordenada y enlazada                
                var lsin = crearColocar(lassci,valMax(lassci))
                var aa= setInterval(() => {
                    ordBurburjaAnimate(lsin)
                    clearInterval(aa)
                }, 1000);
            
                NombresAscciOrdenados = ordBurburja(NombresAscci);//2do paso// 
                //3ro  ordeno las 2 listas
                accion = compararString(NombresAscciOrdenados,ListaSinOrdenar); //con este metodo enlazo el codigo ASSCI 
                                                                            //ya ordenado y lo enlazo con su nombre
                console.log(accion) //imprimo la lista ya ordenada y enlazada
            }
        }
     } 
     

    };

    reader.readAsText(file);
}//guardar archivo

function downloadBurbuja(filename, text) {
    let ListaBurbuja;
    if(chekString == true){
        ListaBurbuja = accion;
    }
    if(chekString == false){
        ListaOrdenada = ordBurburja(ListaSinOrdenar)
        ListaBurbuja = ListaOrdenada;
    }
    
    var element = document.createElement('a');
    let doc = JSON.stringify({ "categoria": categoriaBurbuja, 'nombre': nombreBurbuja, 'repeticion':repeticionBurbuja, 'animacion':animacionBurbuja, 'valores': ListaBurbuja });
    
    //console.log(listSimple.print())
    element.setAttribute('href', 'data:json,' + doc);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
function checkBox(){
    if(chekString == true){
        chekString = false;
        console.log("cambiando chek "+ chekString);
    }else{
        chekString = true;
        console.log("cambioando chek "+ chekString);
    }  
}
function checkBoxSeleccion(){
    if(chekStringSeleccion == true){
        chekStringSeleccion = false;
        console.log("cambiando chek "+ chekStringSeleccion);
    }else{
        chekStringSeleccion = true;
        console.log("cambioando chek "+ chekStringSeleccion);
    }  
}
function checkBoxInsercion(){
    if(chekStringInsercion == true){
        chekStringInsercion = false;
        console.log("cambiando chek "+ chekStringInsercion);
    }else{
        chekStringInsercion = true;
        console.log("cambioando chek "+ chekStringInsercion);
    }  
}
function checkBoxRapido(){
    if(chekStringRapido == true){
        chekStringRapido = false;
        console.log("cambiando chek "+ chekStringRapido);
    }else{
        chekStringRapido = true;
        console.log("cambioando chek "+ chekStringRapido);
    }  
}
function AbrirSeleccion(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(event) {
      // El texto del archivo se mostrará por consola aquí
     // console.log(event.target.result)
      let doc = JSON.parse(event.target.result);
      //console.log(doc)

      for (var key in doc) {
        //console.log('name=' + key + ' value=' + doc[key]);
        if(key=='categoria'){
            categoria = doc[key]
            console.log(categoria)
        }
        if(key=='nombre'){
            nombre = doc[key]
            console.log(nombre)
        }
        if(key=='repeticion'){
            repeticion = doc[key]
            console.log(repeticion)
        }
        if(key=='animacion'){
            animacion = doc[key]
            console.log(animacion)
        }
        if(key=='valores'){
            ListaSinOrdenarSeleccion = [];
            ListaOrdenadaSeleccion =[];
           if(chekStringSeleccion == false){
                for (var k in doc[key]){
                    // console.log(doc[key][k])
                    ListaSinOrdenarSeleccion.push(doc[key][k])
                }

                let ls=ListaSinOrdenarSeleccion.slice()
                crearColocar(ls,valMax(ls))
                setInterval(() => {
                    seleccionAnimate(ls)
                }, 1000);

                ListaOrdenadaSeleccion = seleccion(ListaSinOrdenarSeleccion);
                console.log(ListaOrdenadaSeleccion);
            }
            if(chekStringSeleccion == true){
                console.log("check es true")
                for (var k in doc[key]){
                        // console.log(doc[key][k])
                        ListaSinOrdenarSeleccion.push(doc[key][k]);
                        
                    }
                    //1ro  obtengo ascci desordenado 
                    NombresAscciSeleccion = ObtenerString(ListaSinOrdenarSeleccion);

                    let ls=NombresAscciSeleccion.slice()
                    crearColocar(ls,valMax(ls))
                    setInterval(() => {
                        seleccionAnimate(ls)
                    }, 1000);

                    //2do ordeno Ascci
                    NombresAscciOrdenadosSeleccion = seleccion(NombresAscciSeleccion);
                    //console.log(NombresAscciOrdenadosSeleccion)
                    //3ro  ordeno las 2 listas
                    accionSeleccion = compararString(NombresAscciOrdenadosSeleccion,ListaSinOrdenarSeleccion);
                    console.log(accionSeleccion)
                }
            }  
        }
      
     

    };

    reader.readAsText(file);
}//guardar archivo
function downloadSeleccion(filename, text) {
    let ListaSeleccion;
    if(chekString == true){
        ListaSeleccion = accionSeleccion;
    }
    if(chekString == false){
        ListaOrdenadaSeleccion = seleccion(ListaSinOrdenarSeleccion)
        ListaSeleccion = ListaOrdenadaSeleccion;
    }
    
    var element = document.createElement('a');
    let doc = JSON.stringify({ "categoria": categoriaSeleccion, 'nombre': nombreBurbujaSeleccion, 'repeticion':repeticionBurbujaSeleccion, 'animacion':animacionBurbujaSeleccion, 'valores': ListaSeleccion });
    
    //console.log(listSimple.print())
    element.setAttribute('href', 'data:json,' + doc);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function AbrirInsercion(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(event) {
      // El texto del archivo se mostrará por consola aquí
     // console.log(event.target.result)
      let doc = JSON.parse(event.target.result);
      //console.log(doc)

      for (var key in doc) {
        //console.log('name=' + key + ' value=' + doc[key]);
        if(key=='categoria'){
            categoria = doc[key]
            console.log(categoria)
        }
        if(key=='nombre'){
            nombre = doc[key]
            console.log(nombre)
        }
        if(key=='repeticion'){
            repeticion = doc[key]
            console.log(repeticion)
        }
        if(key=='animacion'){
            animacion = doc[key]
            console.log(animacion)
        }
        if(key=='valores'){
            ListaSinOrdenarInsercion = [];
            ListaOrdenadaInsercion = [];
           if(chekStringInsercion == false){
                for (var k in doc[key]){
                    // console.log(doc[key][k])
                    ListaSinOrdenarInsercion.push(doc[key][k])
                }
                let ls=ListaSinOrdenarInsercion.slice()

                ListaOrdenadaInsercion = insercion(ListaSinOrdenarInsercion);

                crearColocar(ls,valMax(ls))
                setInterval(() => {
                    insercionAnimate(ls)
                }, 1000);

                console.log(ListaOrdenadaInsercion);
            }
            if(chekStringInsercion == true){
                console.log("check es true")
                for (var k in doc[key]){
                    // console.log(doc[key][k])
                    ListaSinOrdenarInsercion.push(doc[key][k])
                }
                //1ro  obtengo ascci desordenado 
                NombresAscciInsercion = ObtenerString(ListaSinOrdenarInsercion);

                let ls=NombresAscciInsercion.slice()
                crearColocar(ls,valMax(ls))
                setInterval(() => {
                    insercionAnimate(ls)
                }, 1000);
                
                //2do ordeno Ascci
                NombresAscciOrdenadosInsercion = insercion(NombresAscciInsercion);
                //3ro  ordeno las 2 listas
                accionInsercion = compararString(NombresAscciOrdenadosInsercion,ListaSinOrdenarInsercion);
                console.log(accionInsercion)
            }
        }
     } 
     

    };

    reader.readAsText(file);
}//guardar archivo
function downloadInsercion(filename, text) {
    let ListaBurbujaInsercion;
    if(chekStringInsercion == true){
        ListaBurbujaInsercion = accionInsercion;
    }
    if(chekStringInsercion == false){
        ListaOrdenadaInsercion = insercion(ListaSinOrdenarInsercion)
        ListaBurbujaInsercion = ListaOrdenadaInsercion;
    }
    
    var element = document.createElement('a');
    let doc = JSON.stringify({ "categoria": categoriaInsercion, 'nombre': nombreInsercion ,'repeticion':repeticionInsercion, 'animacion':animacionInsercion, 'valores': ListaBurbujaInsercion });
    
    //console.log(listSimple.print())
    element.setAttribute('href', 'data:json,' + doc);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
function AbrirOrdenamientoRapido(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(event) {
      // El texto del archivo se mostrará por consola aquí
     // console.log(event.target.result)
      let doc = JSON.parse(event.target.result);
      //console.log(doc)

      for (var key in doc) {
        //console.log('name=' + key + ' value=' + doc[key]);
        if(key=='categoria'){
            categoria = doc[key]
            console.log(categoria)
        }
        if(key=='nombre'){
            nombre = doc[key]
            console.log(nombre)
        }
        if(key=='repeticion'){
            repeticion = doc[key]
            console.log(repeticion)
        }
        if(key=='animacion'){
            animacion = doc[key]
            console.log(animacion)
        }
        if(key=='valores'){
            ListaSinOrdenarRapido = [];
            ListaOrdenadaRapido = [];
            console.log("el chek es"+chekStringRapido)
           if(chekStringRapido== false){
                for (var k in doc[key]){
                    // console.log(doc[key][k])
                    ListaSinOrdenarRapido.push(doc[key][k])
                }

                let ls=ListaSinOrdenarRapido.slice()

                crearColocar(ls,valMax(ls))
                setInterval(() => {
                    ordRapidoAnimate(ls)
                }, 1000);

                ListaOrdenadaRapido = ordRapido(ListaSinOrdenarRapido);
                console.log(ListaOrdenadaRapido);
            }
            if(chekStringRapido == true){
                console.log("check es true")
                for (var k in doc[key]){
                    // console.log(doc[key][k])
                    ListaSinOrdenarRapido.push(doc[key][k])
                }
                //1ro  obtengo ascci desordenado 
                NombresAscciRapido = ObtenerString(ListaSinOrdenarRapido);

                let ls=NombresAscciRapido.slice()
                crearColocar(ls,valMax(ls))
                setInterval(() => {
                    ordRapidoAnimate(ls)
                }, 1000);
                
                //console.log(NombresAscciRapido)
                //2do ordeno Ascci
                NombresAscciOrdenadosRapido = ordRapido(NombresAscciRapido);
                //3ro  ordeno las 2 listas
                accionRapido = compararString(NombresAscciOrdenadosRapido,ListaSinOrdenarRapido);
                console.log(accionRapido)
            }
        }
     } 

    };

    reader.readAsText(file);
}//guardar archivo
function downloadRapido(filename, text) {
    let ListaBurbujarRapida;
    if(chekStringRapido == true){
        ListaBurbujarRapida = accionRapido;
    }
    if(chekStringRapido == false){
        ListaOrdenadaRapido = insercion(ListaSinOrdenarRapido)
        ListaBurbujarRapida = ListaOrdenadaRapido;
    }
    
    var element = document.createElement('a');
    let doc = JSON.stringify({ "categoria": categoriaRapido, 'nombre': nombreRapido,'repeticion':repeticionRapido, 'animacion':animacionRapido, 'valores': ListaBurbujarRapida });
    
    //console.log(listSimple.print())
    element.setAttribute('href', 'data:json,' + doc);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

//lista = [10,9,8,7,6,5,4,3,2,11,12,1];
//console.log(ordRapido(lista))