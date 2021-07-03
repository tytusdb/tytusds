class hash{
    constructor(tamano){
        this.tamano = tamano;
        this.contador = 0;
        this.tabla = new Array(this.tamano);
        this.minValue = 0.30;
        this.maxValue = 0.85;
    }

    codigoHash(llave) {
        var hash = 0;
        var m = this.tamano;
        var numeric = false;
        var tipos = document.getElementsByName('typeValue');
        for (let index = 0; index < tipos.length; index++) {
            if(tipos[index].checked){
                if(tipos[index].value == 1){
                    numeric = true;
                } 
            }
        }
        if(numeric){
            return llave % m
        }else{
            for (let index = 0; index < llave.length; index++) {
                hash += llave.charCodeAt(index);
            }
            console.log(hash % this.tamano)
            return hash % m;
        }
    }

    linearProbing(llave){
        let llaveHash = this.codigoHash(llave);
        let obj = {llave:llave};
        if(this.contador >= this.minValue * this.tamano){
            this.reHash();
        }
        if(this.tabla[llaveHash]==undefined){
            this.tabla[llaveHash] = obj;
            this.contador++;
            //console.log("inserted");
        }else{
            //there is a colision at index position I don't increment te index value at this point to get the next value available
            var index = llaveHash;
            while(this.tabla[index]!=undefined){
                index++;
            }
            //
            this.tabla[index] = obj;
            this.contador++;
        }
    }

    cuadraticProbing(llave){
        let llaveHash = this.codigoHash(llave);
        let obj = {llave:llave};
        if(this.contador >= this.minValue * this.tamano){
            this.reHash();
        }
        if(this.tabla[llaveHash]==undefined){
            this.tabla[llaveHash] = obj;
            this.contador++;
            //console.log("inserted");
        }else{
            //there is a colision at index position I don't increment te index value at this point to get the next value available
            var i = 1;
            var index = llaveHash;//this is te initial position 
            while(this.tabla[index]!=undefined){
                index = (index + (i * i));
                i++;
            }
            //
            this.tabla[index] = obj;
            this.contador++;
        }
    }


    doubleProbing(llave){
        let llaveHash = this.codigoHash(llave);
        let obj = {llave:llave};
        if(this.contador >= this.minValue * this.tamano){
            this.reHash();
        }
        if(this.tabla[llaveHash]==undefined){
            this.tabla[llaveHash] = obj;
            this.contador++;
            //console.log("inserted");
        }else{
            //there is a colision at index position I don't increment te index value at this point to get the next value available
            var i = 1;
            var index = llaveHash;//this is te initial position 
            while(this.tabla[index]!=undefined){
                index = (index + (i * index));
                i++;
            }
            //
            this.tabla[index] = obj;
            this.contador++;
        }
    }

    getValores(){
        var valores = [];
        this.tabla.forEach(pos=> {
            if(pos!=undefined){
                valores.push(pos.llave);
                }
        });
        return valores
    }

    reHash(){
        console.log("Rehashing started....");
        console.log("previus size: " + this.tamano);
        this.tamano *= 2;
        console.log("seting a new size: " + this.tamano);
        this.contador = 0;
        let tablaTemp = this.tabla;
        this.tabla = new Array(this.tamano);
        tablaTemp.forEach(obj => {
            for(let llave in obj){
                //let llaveHash = this.codigoHash(llave);
                this.linearProbing(obj[llave]);
            }
        });
    }

    obtener(llave){
        let llaveHash = this.codigoHash(llave);
        if(this.tabla[llaveHash]!==undefined){
            if(this.tabla[llaveHash].llave ===llave){
                console.log("econtrado: " + llave);
                return "Llave: "+ this.tabla[llaveHash].llave + ", Posicion: "+ llaveHash; //Here I return the found value
            }else{
                var index = llaveHash;
                while(this.tabla[index]===undefined || this.tabla[index].llave !== llave){
                    index++;
                }
                if(this.tabla[index].llave === llave){
                    console.log("encontrado: " + llave +" ,Posicion: "+ index);
                    return "Llave: "+ this.tabla[index].llave + ", Posicion: "+ index; //Here I return the found value of the index with the while
                }
            }
        }
    }



    eliminar(llave){
        let llaveHash = this.codigoHash(llave);
        if(this.tabla[llaveHash]!==undefined){
            if(this.tabla[llaveHash].llave ===llave){
                this.tabla[llaveHash] = undefined; //Here I delete the value of the index
            }else{
                var index = ++ llaveHash;
                while(this.tabla[index]===undefined || this.tabla[index].llave !== llave){
                    index++;
                }
                if(this.tabla[index].llave === llave){
                    this.tabla[index] = undefined; //Here I delete the value of the index found before with the while
                }
            }
        }
    }

    getInsertMode(llave){
        var temp = llave;
        //console.log(temp);
        var radios = document.getElementsByName('typeHash');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                if (radios[i].value==0) {
                    console.log("Lineal probing");
                    this.linearProbing(temp);
                }else if(radios[i].value==1){
                    console.log("Cuadratic probing");
                    this.cuadraticProbing(temp);
                }else{
                    this.doubleProbing(temp);
                }
            }
        }
    }

    displayNodos(nodes){
        var x_pos = -150;
        var y_pos = 0;
        let temp = this.tabla;
        for (let index = 0; index < temp.length; index++) {
            if(temp[index]==undefined){
                nodes.push({id: index + 'C', label: index +": " + " ", x: x_pos, y: y_pos, color: "#9BE54D"});
            }else{
                
                nodes.push({id: index + 'C', label: index +": " + temp[index].llave, x: x_pos, y: y_pos, color: "#B29189"});
            }
            x_pos = x_pos + 130;
        }
        nodes.push({id: "Percent" + 'L', label: "Valor: " + ((this.contador*100) / this.tamano) + '%', x: x_pos, y: y_pos, color: "#32868C"});
    }
}

const myHash = new hash(10);


function agregar(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    myHash.getInsertMode(x);
    document.getElementById("newValue").focus();
    draw();
}

function encontrar(){
    var x = document.getElementById("newValue").value;
    var valor = myHash.obtener(x);
    alert(valor);
    document.getElementById("newValue").focus();
    
}

function eliminar(){
    var x = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    myHash.eliminar(x);
    document.getElementById("newValue").focus();
    draw();
}

function setSize(){
    var x = document.getElementById("size").value
    myHash.tabla.length = x;
    alert("Valor Cambiado: " + x);
    document.getElementById("size").value = "";
}

var contents;

function draw() {
    var nodes = [];
    var edges = [];
    myHash.displayNodos(nodes,edges);    
      // create a network
    var container = document.getElementById("miRed");
    var data = {
        nodes: nodes
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
      myHash.tabla.length = json.m;
      //console.log(json.m);
      myHash.minValue = json.minimo / 100;
      myHash.maxValue = json.maxValue /100;
      var count = Object.keys(json.valores).length;
      for (let index = 0; index < count; index++) {
        myHash.getInsertMode(json.valores[index]); 
      }
      draw();
    };
    reader.onerror = function(event) {
      console.error("File could not be read! Code " + event.target.error.code);
    };
    reader.readAsText(file);
}

function DescargarArchivo(){
    var json = JSON.parse(contents);
    json.valores = myHash.getValores();
    const myJSON = JSON.stringify(json);
    //console.log(json);
    //texto de vent actual
  
    //formato para guardar el archivo
    var nombre="Hash_Cerrado.json";//nombre del archivo
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