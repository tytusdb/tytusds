var lista_ordenada = [];

class Nodo{
    constructor(valor) {
    this.valor = valor;
    this.izquierdo=null;
    this.derecho=null;
    this.altura = 0;
    this.x = 0;
    this.y = 0;
    }
}

class Arbol_Binario{
    constructor() {
        this.raiz = null;
        this.valores = 0;
    }

    MAXIMO(valor1, valor2) {
        if (valor1 > valor2) return valor1;
        return valor2;
    }

    altura(nodo) {
        if (nodo == null) return -1;
        return nodo.altura;
    }

    insertar(valor, repetido){
        if(repetido == true){
            this.raiz = this.add(valor, this.raiz);
            this.valores++;
        }else{
            this.raiz = this.addr(valor, this.raiz);
            this.valores++;
        }
    }

    add(valor, nodo){
        if (nodo == null){
            return new Nodo(valor);
        }else{
            if ( valor > nodo.valor){
                nodo.derecho = this.add(valor, nodo.derecho);
            }else {
                nodo.izquierdo = this.add(valor, nodo.izquierdo);
            }
        }
        nodo.altura = this.MAXIMO(this.altura(nodo.izquierdo), this.altura(nodo.derecho)) + 1
        return nodo;
    }

    addr(valor, nodo){
        if (nodo == null){
            return new Nodo(valor);
        }else{
            if ( valor > nodo.valor){
                nodo.derecho = this.addr(valor, nodo.derecho);
            }else if(valor < nodo.valor){
                nodo.izquierdo = this.addr(valor, nodo.izquierdo);
            } else if(valor == nodo.valor){
                console.log("este dato esta repetido")
            }
        }
        nodo.altura = this.MAXIMO(this.altura(nodo.izquierdo), this.altura(nodo.derecho)) + 1
        return nodo;
    }

    preOrden(){
        this.pre_orden(this.raiz);
    }

    pre_orden(nodo){
        if(nodo!=null){
            console.log("Valor:",nodo.valor);
            this.pre_orden(nodo.izquierdo);
            this.pre_orden(nodo.derecho);
        }
    }

    inOrden(){
        this.in_orden(this.raiz);
    }

    in_orden(nodo){
        if(nodo!=null){
            lista_ordenada.push(nodo.valor);
            this.in_orden(nodo.izquierdo);
            console.log("Valor:",nodo.valor);
            this.in_orden(nodo.derecho);
        }
    }

    postOrden(){
        this.post_orden(this.raiz);
    }
    post_orden(nodo){
        if(nodo!=null){
            this.post_orden(nodo.izquierdo);
            this.post_orden(nodo.derecho);
            console.log("Valor:",nodo.valor);
        }
    }

    graficar(){
        let tx=(150*this.valores)/2
        let ty=3
        let temp=[this.raiz.altura]
        console.log(temp)
        this.graficarNodo(this.raiz,tx,ty,150*(this.raiz.altura+1))
    }
    
    graficarNodo(nodo,x,y,d){
        if (nodo!=null){
            console.log(nodo.valor)
            console.log(nodo.altura)
            nodo.x=x
            nodo.y=(y)*75
    
            document.getElementById("result").innerHTML+=
                `<div class="circle" style="top: ${nodo.y+"px"};left: ${nodo.x + 'px'}" id=${"a" + nodo.valor}>${nodo.valor}</div><br />`;
           if (nodo.izquierdo!==null){
               document.getElementById("result").innerHTML+=
                   `<div class="long-arrow-left" style="top: ${(nodo.y+75)+"px"};left: ${(nodo.x-45) + 'px'}" id=${"a" + nodo.valor+"L"}></div><br />`;
           }
            if (nodo.derecho!==null){
                document.getElementById("result").innerHTML+=
                    `<div class="long-arrow-right" style="top: ${(nodo.y+75)+"px"};left: ${(nodo.x+105) + 'px'}" id=${"a" + nodo.valor+"R"}></div><br />`;
            }
            this.graficarNodo(nodo.izquierdo,(x-parseInt(d)/2),y+2,d/2)
            this.graficarNodo(nodo.derecho,(x+parseInt(d)/2),y+2,d/2) 
        }
    }

    eliminarNodo(valor){
        this.raiz=this.eliminar(this.raiz,valor)
     }
     eliminar(nodo,valor){
         if (nodo!==null){
            if (valor<nodo.valor){
                nodo.izquierdo=this.eliminar(nodo.izquierdo,valor)
            }else if (valor>nodo.valor){
                nodo.derecho=this.eliminar(nodo.derecho,valor)
            }else {
                if (nodo.izquierdo !== null&& nodo.derecho !==null){
                    let temp=nodo.izquierdo
                    while (temp.derecho!==null){
                        temp=temp.derecho
                    }
                    nodo.valor=temp.valor
                    nodo.izquierdo=this.eliminarder(nodo.izquierdo)
                }else if(nodo.izquierdo!==null){
                    let temp=nodo.izquierdo
                    while (temp.derecho!==null){
                        temp=temp.derecho
                    }
                    nodo.valor=temp.valor
                    nodo.izquierdo=this.eliminarder(nodo.izquierdo)
                }else if(nodo.derecho!==null){
                    let temp=nodo.derecho
                    while (temp.izquierdo!==null){
                        temp=temp.izquierdo
                    }
                    nodo.valor=temp.valor;
                    nodo.derecho=this.eliminarizq(nodo.derecho)
                }else{
                    nodo=null
                }
            }
         }
         return nodo
     }
     eliminarizq(nodo){
         if (nodo.izquierdo==null){
             nodo=null
         }else if (nodo.izquierdo!==null){
             nodo.izquierdo=this.eliminarizq(nodo.izquierdo)
         }
        return nodo
     }
     eliminarder(nodo){
         if (nodo.derecho==null){
             nodo=null
         }else if (nodo.derecho!==null){
             nodo.derecho=this.eliminarder(nodo.derecho)
         }
         return nodo
     }
 
}

/* Implementacion */

let abb = new Arbol_Binario();
var categoria = "";
var tipo = "";
var repeticion = "";
var animacion = ""; 

function insertar_nodo(){
    var dato = document.getElementById('dato_pag').value;
    var checkbox = document.getElementById('checkbox').checked;
    var dato = parseInt(dato);

    document.getElementById("result").innerHTML="";

    if(dato === ''){
        alert("Por favor ingrese un dato");
        return false;
    }else{
        if(checkbox == true){
            console.log("esta en true");
            console.log(checkbox);
            abb.insertar(dato, checkbox);
            abb.graficar();
        }else{
            console.log("esta en falso");
            console.log(checkbox);
            abb.insertar(dato, checkbox);
            abb.graficar();
        }
    }
}

async function abrirArchivo(evento){
    let archivo = evento.target.files[0];

    if(archivo){
        let reader = new FileReader();
        reader.onload = async function(e){
            let contenido = e.target.result;
            var mydata = JSON.parse(contenido);
            //console.log(mydata.repeticion)
            categoria = mydata.categoria;
            tipo = mydata.nombre;
            repeticion = mydata.repeticion;
            animacion = mydata.animacion;
            for(var i=0; i<(mydata.valores).length; i++){
                if(mydata.repeticion == true){
                    abb.insertar(mydata.valores[i], mydata.repeticion);
                }else{
                    abb.insertar(mydata.valores[i], mydata.repeticion);
                }
            }
            abb.graficar();
            console.log(mydata)
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
    abb.inOrden();

    console.log(lista_ordenada);

    var contenido = JSON.stringify({"categoria": categoria, "nombre": tipo, "repeticion": repeticion, "animacion": animacion, "valores":lista_ordenada});
    console.log(contenido);
    console.log(JSON.stringify(lista_ordenada));

    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato = "Arbol_Binario"+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

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


function eliminar_nodo(){
    var dato = document.getElementById('dato_pag').value;

    document.getElementById("result").innerHTML="";

    abb.eliminarNodo(dato);
    abb.graficar();
}
