class Nodo{
    constructor(llave,valor){
        this.llave = llave;
        //this.valor = valor;
        this.siguiente = null;
    }
}

class lista_simple{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.tamano = 0;
    }

    insertar(llave,valor){
        let aux = new Nodo(llave);
        if(this.primero === null){
            this.primero = aux;
            this.ultimo = aux;
            this.tamano++;
        }else{
            this.ultimo.siguiente = aux;
            this.ultimo = aux;
            this.tamano++;
        }
        
    }

    encontrar_anterior(llave){
        const aux = this.primero
        while(!(aux.siguiente == null) && (aux.siguiente.llave != llave)){
            aux = aux.siguiente;
        }
        return aux;
    }

    obtener(llave){
        var contador = 1;
        var aux = this.primero;
        do{
            if(aux.llave == llave){
                return contador;
            }
            contador++;
            aux = aux.siguiente;
        }while(aux.llave != llave);
        return contador;
    }

    delete(llave){
        var posicion = this.obtener(llave);
        var aux = this.primero;
        for (let index = 1; index < posicion-1; index++) {
            aux = aux.siguiente;
        }
        if(posicion == 1){
            if(this.tamano == 1){
                this.primero = null;
                this.ultimo = null;
                aux = null;
                this.tamano--;
            }else{
                console.log("eliminando al inicio");
                var temp = aux.siguiente;
                this.primero = aux.siguiente;
                this.tamano--;
                temp = null;
            }
        }else if(posicion == this.tamano){
            console.log("eliminando al final");
            var temp = aux.siguiente;
            this.ultimo = aux;
            aux.siguiente =null;
            this.tamano--;
            temp = null;
        }else{
            console.log("eliminando al medio");
            var temp = aux.siguiente;
            aux.siguiente = aux.siguiente.siguiente;
            this.tamano--;
            temp = null;
        }
    }
    print(){
        if(this.tamano >= 1){
            var aux = this.primero;
            var cad = "";
            while(aux.siguiente != null){
                cad += aux.llave + '->'
                aux=aux.siguiente;
            }
            cad += aux.llave;
            return cad;
        }else{
            return null;
        }
    }
    
}

//var nodes = [];
//var edges = [];
//var count = 0;


class hash{
    constructor(tamano){
        this.table = new Array(tamano);
        this.size = 0;
    }

    llHashCode(llave) {
        var hash = 0;
        for (let index = 0; index < llave.length; index++) {
            hash += llave.charCodeAt(index);
        }
        //console.log(hash % this.table.length)
        var m = this.table.length;
        return hash % m;
    }

    simpleHash(llave){
        var hash = 0;
        var K = 0.618033
        for (let index = 0; index < llave.length; index++) {
            hash += llave.charCodeAt(index);
        }
        //console.logMath.round((m*(hash * A % 1)));
        return Math.round(m*K);
        
    }

    multiplicationMethod(llave){
        let hash = 0;
        let A = 0.618033
        let m = this.table.length-1;
        for (let index = 0; index < llave.length; index++) {
            hash += llave.charCodeAt(index);
        }
        //console.logMath.round((m*(hash * A % 1)));
        return Math.round(m*(hash * A % 1));
    }

    getHash(llave){
        var temp = llave;
        //console.log(temp);
        var radios = document.getElementsByName('typeHash');
        var tipos = document.getElementsByName('typeValue');
        for (let index = 0; index < tipos.length; index++) {
            if(tipos[index].checked){
                if(tipos[index].value == 1){
                    return llave % (this.table.length);
                } 
            }
        }
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
              // do whatever you want with the checked radio
                if (radios[i].value==0) {
                    console.log("es simple hash");
                    return this.simpleHash(temp);
                }else if(radios[i].value==1){
                    console.log("es llhashcode");
                    return this.llHashCode(temp);
                }else{
                    return this.multiplicationMethod(llave);
                }
            }
        }
    }


    insert(llave){
        var position = this.getHash(llave);
        console.log(position);
        if(this.table[position]===undefined){
            this.table[position] = new lista_simple;
        }
        this.table[position].insertar(llave);
        this.size++;    
    }

    obtener(llave){
        var posicion = this.getHash(llave);
        var contador = 0;
        if(this.table[posicion] != undefined){
            var aux = this.table[posicion].primero;
            while(aux.siguiente){
                if(aux.llave == llave){
                    return {llave: aux.llave, Posicion1: posicion, Posicion2: contador};
                }
                contador++;
                aux = aux.siguiente;
            }
            if(aux.llave == llave){
                return {llave: aux.llave, Posicion1: posicion, Posicion2: contador};
            }
        }
        throw 'Valor no encontrado: ' + llave;
    }

    getValores(){
        var valores = []
        this.table.forEach(lista => {
            if(lista!=undefined){
                if(lista.tamano>=1){
                    var aux = lista.primero
                    while(aux.siguiente != null){
                        valores.push(aux.llave);
                        aux = aux.siguiente;
                    }
                    valores.push(aux.llave);
                }
            }
        });
        return valores
    }

    eliminar(llave){
        var posicion = this.getHash(llave);
        this.table[posicion].delete(llave);
        let myList = this.table[posicion];
        if(myList.primero == null && myList.tamano == 0){
            //console.log("lista vacia");
            this.table[posicion] = undefined;
        }
    }
    
    displayNodos(nodes,edges){
        var x_pos = -150;
        var y_pos = 0;
        var conC= 0;
        var conL= 0; 
        this.table.forEach(lista => {
            if(lista != undefined){
                y_pos = 0;
                var posicion = this.getHash(lista.primero.llave);
                console.log(posicion);
                nodes.push({id: conC + 'C', label: "Posicion: " + posicion, x: x_pos, y: y_pos, color: "#B29189"});
                if(lista.tamano >= 1){
                    var aux = lista.primero;
                    y_pos += 100;
                    edges.push({
                        from: conC + 'C',
                        to: conL + 'L',
                        arrows: "to",
                        physics: false,
                        smooth: {type: "cubicBezier"},
                      });
                    while(aux.siguiente != null){
                        nodes.push({id: conL + 'L', label: "Llave: " + aux.llave, x: x_pos, y: y_pos});
                        y_pos += 58;
                        aux=aux.siguiente;
                        conL++;
                    }
                    nodes.push({id: conL + 'L', label: "Llave: " + aux.llave, x: x_pos, y: y_pos});
                    conL++;
                }else{
                    throw 'Error: no hay nodos suficientes aca';
                }
                x_pos = x_pos + 120;
                conC++;
                //console.log(posicion +': '+ lista.print());
            }
        });
    }
}

function agregar(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    myHash.insert(x);
    document.getElementById("newValue").focus();
    draw();
}

function eliminar(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    myHash.eliminar(x);
    document.getElementById("newValue").focus();
    draw();
}

const myHash = new hash(13);
var contents;

function setSize(){
    var x = document.getElementById("size").value
    myHash.table.length = x;
    alert("Valor Cambiado: " + x);
    document.getElementById("size").value = "";
}

function draw() {
    var nodes = [];
    var edges = [];
    myHash.displayNodos(nodes,edges);    
      // create a network
    var container = document.getElementById("miRed");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    
    const options = {
        nodes: {
            shape: "box",
            widthConstraint: 85,
            heightConstraint: 35,
            margin: 10,
            font: {
              size: 16,
            },
          },
        physics: {
            enabled: false,
        },
        interaction: {
            hover: true,
          },
    };
      var network = new vis.Network(container, data, options);
  }


//here I load a JSON Files
function AbrirArchivo(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(event){
      contents = event.target.result;
      var json = JSON.parse(contents);
      myHash.table.length = json.m;
      var count = Object.keys(json.valores).length;
      for (let index = 0; index < count; index++) {
        myHash.insert(json.valores[index]); 
      }
      draw();
    };
    reader.onerror = function(event) {
      console.error("File could not be read! Code " + event.target.error.code);
    };
    reader.readAsText(file);
}

function encontrar(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    let val = myHash.obtener(x);
    alert("Llave: "+ val.llave + ", Posicion en Tabla: " + val.Posicion1 + ", Posicion en Lista: " + val.Posicion2);
    document.getElementById("newValue").focus();
}

function DescargarArchivo(){
    var json = JSON.parse(contents);
    json.valores = myHash.getValores();
    const myJSON = JSON.stringify(json);
    //console.log(json);
    //texto de vent actual
  
    //formato para guardar el archivo
    var nombre="Hash_Abierto.json";//nombre del archivo
    var file=new Blob([myJSON], {type: 'text/plain'});
  
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

