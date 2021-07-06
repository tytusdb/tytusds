var checkBoxHashCerradaSimple = false;
var checkBoxHashCerradaLineal = false;
var checkBoxHashCerradaInt = false;
var checkBoxHashCerradaString = false;
var checkBoxCerradaDivision = false;
var checkBoxMultiplicacion = false;
var checkBoxCerradaCuadratica = false;
var checkBoxCerradaDobleHash = false;
var categoriaCerrada;
var nombreCerrada;
var tamanoCerrada;
var minimoCerrada;
var maxicoCerrada;
var funcionCerrada;
var pruebaCerrada;
var animacionCerrada;
var ListaFinal = [];
var ListaParaGuardar = [];
function checkCerradaSimple(){
    if(checkBoxHashCerradaSimple == true){
        checkBoxHashCerradaSimple = false;
        console.log("cambiando chek "+ checkBoxHashCerradaSimple);
    }else{
        checkBoxHashCerradaSimple = true;
        console.log("cambioando chek "+ checkBoxHashCerradaSimple);
    }  
}
function checkCerradaLineal(){
    if(checkBoxHashCerradaLineal == true){
        checkBoxHashCerradaLineal = false;
        console.log("cambiando chek "+ checkBoxHashCerradaLineal);
    }else{
        checkBoxHashCerradaLineal = true;
        console.log("cambioando chek "+ checkBoxHashCerradaLineal);
    }  
}
function checkCerradaInt(){
    if(checkBoxHashCerradaInt == true){
        checkBoxHashCerradaInt = false;
        console.log("cambiando chek "+ checkBoxHashCerradaInt);
    }else{
        checkBoxHashCerradaInt = true;
        console.log("cambioando chek "+ checkBoxHashCerradaInt);
    }  
}
function checkCerradaDivision(){
    if(checkBoxCerradaDivision == true){
        checkBoxCerradaDivision = false;
        console.log("cambiando chek "+ checkBoxCerradaDivision);
    }else{
        checkBoxCerradaDivision = true;
        console.log("cambioando chek "+ checkBoxCerradaDivision);
    }  
}
function checkCerradaCuadratica(){
    if(checkBoxCerradaCuadratica == true){
        checkBoxCerradaCuadratica = false;
        console.log("cambiando chek "+ checkBoxCerradaCuadratica);
    }else{
        checkBoxCerradaCuadratica = true;
        console.log("cambioando chek "+ checkBoxCerradaCuadratica);
    }  

}
function checkCerradaString(){
    if(checkBoxHashCerradaString == true){
        checkBoxHashCerradaString = false;
        console.log("cambiando chek "+ checkBoxHashCerradaString);
    }else{
        checkBoxHashCerradaString = true;
        console.log("cambioando chek "+ checkBoxHashCerradaString);
    }  
}
function checkCerradaDobleHash(){
    if(checkBoxCerradaDobleHash == true){
        checkBoxCerradaDobleHash = false;
        console.log("cambiando chek "+ checkBoxCerradaDobleHash);
    }else{
        checkBoxCerradaDobleHash = true;
        console.log("cambioando chek "+ checkBoxCerradaDobleHash);
    }  
}
function checkCerradaMultiplicacion(){
    if(checkBoxMultiplicacion === true){
        checkBoxMultiplicacion = false;
        console.log("cambiando chek "+ checkBoxMultiplicacion);
    }else{
        checkBoxMultiplicacion = true;
        console.log("cambioando chek! "+ checkBoxMultiplicacion);
    }  
}
class hash {
    //Animacion = new animate()
    hash(m, min,max) {
      this.m = m;
      this.min = min;
      this.max = max;
      this.areglo = []
      this.n = 0
      this.init()
    }

  init(){
      this.areglo = [this.m] //tendria que declarar INT
      //console.log("en init");
      for(var i=0; i<this.m; i++){
          this.areglo[i] = -1;
          //console.log(this.areglo[i])
      }
   }
   insertar(k){
    let i = this.funcionHash(k)
    //let i = this.division(k);
    console.log("funcion has"+i);
    let contador = 0;
    while(this.areglo[i] != -1){
        if(contador>this.areglo.length){
            i=0
            while(this.areglo[i] != -1){
                i++
            }
        }
        contador++
        i = this.pruebaHash(i,contador);
        console.log("prueba hash"+i)
    }
    //console.log(i)
    this.areglo[i] = k
    //Animacion.animateADD(this.n,k)
    //console.log(this.areglo[i])
    console.log(this.areglo)
    this.n++; //numero de valores de la tabla hash hasta el momento
    //console.log(this.n)
    this.rehashing()
   
    
  }
    rehashing(){
        console.log("entrando a rehashinkg")
        console.log(this.areglo+"  "+ this.n/this.m)
        ListaFinal = this.areglo;
        if((this.n*100/this.m)>=this.max){  
         console.log(this.n*100/this.m)
         var temp = this.areglo
         console.log(temp)
         var mprev = this.m
         //console.log(this.n)
         //console.log(this.min)
         this.m = this.n*100/this.min
         this.m = Math.trunc(this.m)
         this.init()
         this.n = 0
         console.log(mprev)
         for(var i=0; i<mprev; i++){
             if(temp[i]!=-1){
                 this.insertar(temp[i])
             }
        }
        }
 
    } 
    insertarString(y){
        let i = this.funcionHashString(y); 
        console.log(i)
        //let i = this.divisionString(y);
        console.log(i)
        let contador = 0;
        while(this.areglo[i] != -1){
            if(contador>this.areglo.length){
                i=0
                while(this.areglo[i] != -1){
                    i++
                }
            }
            contador++
            i = this.pruebaHash(i,contador);
            console.log(i)
        }
        this.areglo[i] = y
        //Animacion.animateADD(this.n,y)
        console.log(this.areglo)
        this.n++
        this.rehashingString()
       }
    
   rehashingString(){
       console.log(this.areglo+"  "+ this.n/this.m)
       ListaFinal = this.areglo;
       if((this.n*100/this.m)>=this.max){  
        console.log(this.n*100/this.m)
        var temp = this.areglo
        console.log(temp)
        var mprev = this.m
        console.log(this.n)
        console.log(this.min)
        this.m = this.n*100/this.min
        this.m = Math.trunc(this.m)
        this.init()
        this.n = 0
        console.log(mprev)
        for(var i=0; i<mprev; i++){
            if(temp[i]!=-1){
                this.insertarString(temp[i])
            }
       }
       }

    }     
    funcionHash(k){
        if(checkBoxCerradaDivision==true){
            return (k%(this.m))
        }
       
        if(checkBoxMultiplicacion==true){
            let p = k;
            while(p>1){
                p = p/10
            }
            let h = this.m;
            let y = h*(k*p%1);
            let q = Math.trunc(y)
            console.log(q)
            return q
        }
        if(checkBoxHashCerradaSimple==true){
            let p = k;
            while(p>1){
                p = p/10
            }
            let q = Math.trunc(p)
            return q*this.m
        }
        
       
    }
    funcionHashString(y){
        if(checkBoxCerradaDivision==true){
            var contador = 0;
            console.log("dato de dibision: "+y)
            for(var h in y){
            // console.log(data.charCodeAt(k));
                contador = contador + y.charCodeAt(h);
                console.log("el assci de division es "+ y.charCodeAt(h) )
            }

            console.log("Contador division "+contador)
            console.log("tamano division "+this.m)
            console.log("division "+contador%this.m)
            return contador%this.m
        }
        if(checkBoxMultiplicacion==true){
            var contador = 0;
            for(var j in y){
            // console.log(data.charCodeAt(k));
                contador = contador + y.charCodeAt(j);
            }
            let p = contador;
            while(p>1){
                p = p/10
            }
            console.log("esto es p"+p)
            let x = this.m*(contador*p%1);
            let q = Math.trunc(x)
            console.log("esto es q"+q)
            return q
        }
        if(checkBoxHashCerradaSimple==true){
            var contador = 0;
            for(var w in y){
            // console.log(data.charCodeAt(k));
                contador = contador + y.charCodeAt(w);
            }
            let p = contador;
            while(p>1){
                p = p/10
            }
            let q = Math.trunc(p)
            return q*this.m
        }
        
        
    }
    pruebaHash(k,c){
        if(checkBoxHashCerradaLineal===true){
            return ((k+1)%this.m)
        }
        if(checkBoxCerradaCuadratica===true){
            let o = k+c*c
            return ((o)%this.m)
        }
        if(checkBoxCerradaDobleHash===true){
            let w
            let primer = primerhash(k,this.m)
            let segundo = segundohas(k,this.m)
            let dobleHash = (primer)%this.m
            return dobleHash
        }
        function primerhash(k,m){
            let o = k+c*c
            return ((o)%m)
        }
        function segundohas(k,m){
            return ((k+1)%m)
        }
       
    }

}

let p = new hash();
p.hash(20,20,80);
/*const ani= require('./Animaciones')
var Ani= new ani()*/
//p.insertar(5);
//p.insertar(5);
//p.insertar(5);




function insertarHashCerrada(data){
    if(checkBoxHashCerradaInt==true){
        p.insertar(data)
        //Ani.animateAdd(0,data)
    }
    if(checkBoxHashCerradaString==true){
       p.insertarString(data)
    }
}


function guardarCerrada(event) {
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
            categoriaCerrada = doc[key]
            console.log(categoria)
        }
        if(key=='m'){
            tamanoCerrada = doc[key];
            console.log(tamanoCerrada);
        }
        if(key=='nombre'){
            nombreCerrada = doc[key]
            console.log(nombre)
        }
        if(key=='minimo'){
            minimoCerrada = doc[key]
            console.log(minimoCerrada)
        }
        if(key=='maximo'){
            maxicoCerrada = doc[key]
            console.log(maxicoCerrada)
        }
        if(key=='funcion'){
            funcionCerrada = doc[key]
            if(funcionCerrada == 'Multiplicacion'){
                checkBoxMultiplicacion = true;
            }
            if(funcionCerrada == 'Division'){
                checkBoxCerradaDivision = true;
            }
            if(funcionCerrada== 'Simple')
                checkBoxHashCerradaSimple = true;
            console.log(funcionCerrada)
        }
        if(key=='prueba'){
            pruebaCerrada = doc[key]
            if(pruebaCerrada=='Doble'){
                checkBoxCerradaDobleHash=true;
            }
            if(pruebaCerrada=='Lineal'){
                checkBoxHashCerradaLineal=true;
            }
            if(pruebaCerrada=='Cuadratica'){
                checkBoxCerradaCuadratica=true;
            }
            console.log(pruebaCerrada)
            console.log("check Simple"+checkBoxHashCerradaSimple)
            console.log("check Multiplicacion"+checkBoxMultiplicacion)
            console.log("check Division "+checkBoxCerradaDivision)
            console.log("check Lineal"+checkBoxHashCerradaLineal)
            console.log("check doble"+checkBoxCerradaDobleHash)
            console.log("check Cuadratica"+checkBoxCerradaCuadratica)
            console.log(tamanoCerrada)
            console.log(minimoCerrada)
            console.log(maxicoCerrada)
            p.hash(tamanoCerrada,minimoCerrada,maxicoCerrada)
        }
        if(key=='animacion'){
            animacionCerrada = doc[key];
            console.log(animacionCerrada);
        
        }
        if(key=='valores'){
            //console.log(doc[key].length)
            for (var k in doc[key]){
                console.log(doc[key][k]);
                insertarHashCerrada(doc[key][k]);
            }
        }
        //console.log(key)
     }
     

    };
    
    reader.readAsText(file);
}//guardar archivo
function quitarUno(){
    
    for(w in ListaFinal){
        if(ListaFinal[w] != -1 || ListaFinal[w] != '-1'){
            ListaParaGuardar.push(ListaFinal[w])
        }
    }
    return ListaParaGuardar
}
function eliminarHash(k){
   
        for(w in ListaFinal){
            if(ListaFinal[w] == k){
                ListaFinal[w] = -1;
                break;
            }
        }
   
    console.log("Objeto Eliminado "+ListaFinal)
}

function BuscarHash(k){
    
        for(w in ListaFinal){
            if(ListaFinal[w] == k){
                console.log("El Elemento "+ListaFinal[w]+ " Encontrado en la posicion: "+ w);
                break;
            }
        
    }
}

function ReemplazarHash(k,data){
    
    for(w in ListaFinal){
        if(ListaFinal[w] == k){
            console.log("El Elemento "+ListaFinal[w]+ " Se reemplazo con: "+ data);
            ListaFinal[w] = data;
            break;
        }
        
    }   
    console.log("lista: "+ListaFinal)
}

function downloadCerrada(filename, text) {
    console.log("LISTA PARA GUARDAR: "+quitarUno())
  
    var element = document.createElement('a');
    let doc = JSON.stringify({ "categoria": categoriaCerrada, 'nombre': nombreCerrada, 'tamaño':tamanoCerrada, 'minimo':minimoCerrada, 'maximo': maxicoCerrada, 'funcion': funcionCerrada
    ,'prueba': pruebaCerrada, 'animacion': animacionCerrada, 'valores': quitarUno() });
    
    //console.log(listSimple.print())
    element.setAttribute('href', 'data:json,' + doc);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
