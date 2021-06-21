function ordBurburja(arreglo) {
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
        //console.log(array[k])
        let suma = 0;
        for (l in array[k]){
            
            //console.log(array[k][l])
            letra = array[k][l]
            //console.log(letra.charCodeAt(0))
            suma = suma + letra.charCodeAt(0)
            
        } 
        //console.log(suma)
        //listaString.push({'string':array[k],'suma1':suma})
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

function AbrirOrdenamientoBurbuja(event) {
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
            categoriaPrio = doc[key]
            console.log(categoria)
        }
        if(key=='nombre'){
            nombrePrio = doc[key]
            console.log(nombre)
        }
        if(key=='repeticion'){
            repeticionPrio = doc[key]
            console.log(repeticion)
        }
        if(key=='animacion'){
            animacionPrio = doc[key]
            console.log(animacion)
        }
        if(key=='valores'){
            //console.log(doc[key].length)
            for (var k in doc[key]){
                ListaAOrdenar.push(doc[key][k]);
                console.log(doc[key][k])
            } 
        }
     }
     
    };
    
}//guardar archivo
