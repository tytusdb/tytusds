class Nodo {
    constructor(valor,pos_x,pos_y){
        this.valor = valor;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.siguiente = null;
        this.anterior = null;
        this.arriba = null;
        this.abajo = null;
        this.izq = null;
        this.der = null;
    }
}

class Cabecera{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.tamano = 0;
    }

    ordenar(nodo){
        let temp = this.primero;
        this.ultimo.siguiente = nodo;
        nodo.anterior = this.ultimo;
        this.ultimo = nodo;

    }

    insertar(valor){
        let nodo = new Nodo(valor,null,null);
        if(this.primero == null){
            this.primero = nodo;
            this.ultimo = nodo;
            return;    
        }else{
            let temp = this.primero;
            while(temp != null){
                if(temp.valor < nodo.valor){
                    temp = temp.siguiente;
                }else{
                    if(temp==this.primero){
                        nodo.siguiente = temp;
                        temp.anterior = nodo;
                        this.primero = nodo;
                        return;
                    }else{
                        nodo.anterior = temp.anterior;
                        temp.anterior.siguiente = nodo;
                        nodo.siguiente = temp;
                        temp.anterior = nodo;
                        return;
                    }
                }
            }
            this.ultimo.siguiente = nodo;
            nodo.anterior = this.ultimo;
            this.ultimo = nodo;
        }
    }

    busqueda(valor){
        let temp = this.primero;
        while(temp != null){
            if(temp.valor == valor){
                return temp;
            }
            temp = temp.siguiente
        }
        return null;
    }

    updateValor(valor,pos_x,pos_y){
        let temp = this.primero;
        while(temp!=null){
            if(temp.pos_x == pos_x && temp.pos_y == pos_y){
                temp.valor = valor;
            }
            temp = temp.siguiente;
        }
        return null;
    }

    deleteValue(pos_x,pos_y){
        let temp = this.primero;
        while(temp!=null){
            if(temp.pos_x == pos_x && temp.pos_y == pos_y){
                temp.valor = -1;
            }
            temp = temp.siguiente;
        }
        return null;
    }



    display(){
        let temp = this.primero;
        var cad = "";
        while(temp.siguiente != null){
            cad += temp.valor + " -> " ;
            temp = temp.siguiente;
        }
        cad += temp.valor;
        console.log(cad);
    }
}

class matrizO{
    constructor(rows,columns){
        this.l_horizontal = new Cabecera();
        this.l_Vertical = new Cabecera();
        this.columns = columns;
        this.rows = rows;
    }

    crear(pos_x,pos_y){
        this.rows= pos_x;
        this.columns = pos_y;
        for (let i = 0; i < pos_x; i++) {
            for (let j = 0; j < pos_y; j++) {
                
                this.insertar(-1,i,j);
            }
            
        }
        
    }

    insertar(valor, pos_x,pos_y){
        let nodX = this.l_horizontal.busqueda(pos_x);
        let nodY = this.l_Vertical.busqueda(pos_y);
        //console.log(nodX);
        //console.log(nodY);
        if(nodX==null && nodY==null){
            //console.log("No_Existen");
            this.No_Existen(valor,pos_x,pos_y);
        }else if(nodX == null && nodY != null){
            //console.log("ExisteVertical");
            this.ExisteVertical(valor,pos_x,pos_y);
        }else if(nodX != null && nodY == null){
            //console.log("ExisteHorizontal");
            this.ExisteHorizontal(valor,pos_x,pos_y);
        }else if(nodX != null && nodY != null){
            //console.log("Existen");
            this.Existen(valor,pos_x,pos_y);
        }
    }

    actualizar(valor,pos_x,pos_y){
        var nodo_y = this.l_Vertical.primero;
        while(nodo_y != null){
            let temp = nodo_y.der;
            while(temp != null){
                if(temp.valor ==-1 && temp.pos_x == pos_x && temp.pos_y == pos_y){
                    temp.valor = valor; 
                }
                temp = temp.der;
            }
            nodo_y = nodo_y.siguiente;
        }
    }

    actualizar2(valor,pos_x,pos_y){
        var nodo_y = this.l_Vertical.primero;
        while(nodo_y != null){
            let temp = nodo_y.der;
            while(temp != null){
                if(temp.valor !=-1 && temp.pos_x == pos_x && temp.pos_y == pos_y){
                    temp.valor = valor; 
                }
                temp = temp.der;
            }
            nodo_y = nodo_y.siguiente;
        }
    }

    deleteValue(valor,pos_x,pos_y){
        var nodo_y = this.l_Vertical.primero;
        while(nodo_y != null){
            let temp = nodo_y.der;
            while(temp != null){
                if(temp.pos_x== pos_x && temp.pos_y ==pos_y){
                    temp.valor = -1;
                    break; 
                }
                temp = temp.der;
            }
            nodo_y = nodo_y.siguiente;
        }
    }

    No_Existen(valor,pos_x,pos_y){
        this.l_horizontal.insertar(pos_x);
        this.l_Vertical.insertar(pos_y);
        let nodo_x = this.l_horizontal.busqueda(pos_x);
        let nodo_y = this.l_Vertical.busqueda(pos_y);
        let nodo_O = new Nodo(valor,pos_x,pos_y);
        //here I vinculate a new nodo_O with the l_horizontal / l_vertical nodo
        nodo_x.abajo = nodo_O;
        nodo_O.arriba = nodo_x;

        nodo_y.der = nodo_O;
        nodo_O.izq = nodo_y
        return;
    }

    ExisteVertical(valor,pos_x,pos_y){
        this.l_horizontal.insertar(pos_x);
        let nodo_x = this.l_horizontal.busqueda(pos_x);
        let nodo_y = this.l_Vertical.busqueda(pos_y);

        //here I decide if I will need a flag to know if the value will be inserted
        var inserted = false;

        let nodo_O = new Nodo(valor,pos_x,pos_y);
        
        let temp = nodo_y.der;

        var x = 0;

        while (temp != null) {
            x = temp.pos_x;
            if (x < pos_x) {
                //console.log("x es menor que la posicion entrante en ExisteVertical: " + x + " < " + pos_x);
                temp = temp.der;
            } else {
                //console.log("x es menor que la posicion entrante en ExisteVertical: " + x + " > " + pos_x);
                nodo_O.der = temp;
                nodo_O.izq = temp.izq;
                temp.izq.der = nodo_O;
                temp.izq = nodo_O;
                inserted = true;
                break;
            }
        }
        if (inserted == false) {
            temp = nodo_y.der;
            while(temp.der!=null){
                temp = temp.der;
            }
            nodo_O.izq = temp;
            temp.der = nodo_O
        }
        nodo_x.abajo = nodo_O;
        nodo_O.arriba = nodo_x;
    }


    ExisteHorizontal(valor,pos_x,pos_y){
        this.l_Vertical.insertar(pos_y);
        let nodo_x = this.l_horizontal.busqueda(pos_x);
        let nodo_y = this.l_Vertical.busqueda(pos_y);

        var inserted = false;

        let nodo_O = new Nodo(valor,pos_x,pos_y);
        let temp = nodo_x.abajo;
        var y = 0;
        while (temp!= null) {
            y = temp.pos_y;
            if (y < pos_y) {
                //console.log("y es menor que la posicion entrante en ExisteHorizontal: " + y + " < " + pos_y);
                temp = temp.abajo;
            } else {
                //console.log("y es mayor que la posicion entrante en ExisteHorizontal: " + y + " > " + pos_y);
                nodo_O.abajo = temp;
                nodo_O.arriba = temp.arriba;
                temp.arriba.abajo = nodo_O;
                temp.arriba = nodo_O
                inserted = true;
                //console.log("insertado: " + nodo_O.arriba.valor+" <-->"+nodo_O.valor +","+nodo_O.pos_x+","+nodo_O.pos_y);
                break;
            }
        }
        
        if(inserted ==false){
            temp = nodo_x.abajo;
            //console.log(temp);
            while(temp.abajo != null){
                temp = temp.abajo;
            }
            nodo_O.arriba = temp;
            temp.abajo = nodo_O;
        }

        nodo_y.der = nodo_O;
        nodo_O.izq = nodo_y;
    }

    Existen(valor,pos_x,pos_y){
        let nodo_x = this.l_horizontal.busqueda(pos_x);
        let nodo_y = this.l_Vertical.busqueda(pos_y);
        //console.log(nodo_x);
        //console.log(nodo_y);
        
        let nodo_O = new Nodo(valor,pos_x,pos_y);
        var inserted = false;
        
        let temp = nodo_x.abajo;
        var y = temp.abajo;
        while (temp!= null) {
            y = temp.pos_y;
            if (y < pos_y) {
                temp = temp.abajo;
            } else {
                temp.arriba.abajo = nodo_O;
                nodo_O.arriba = temp.arriba;
                nodo_O.abajo = temp;
                temp.arriba = nodo_O
                inserted = true;
                //console.log("y es mayor que la posicion entrante en ExistenY: " + y + " > " + pos_y);
                //console.log("Se inserto en Y: " + nodo_O.valor + " en" + nodo_O.pos_y);
                //console.log("insertado: " + nodo_O.arriba.valor+" <-->"+nodo_O.valor +","+nodo_O.pos_x+","+nodo_O.pos_y);
                break;
            }
        }
        if (inserted == false) {
            temp = nodo_x.abajo;
            //console.log(temp);
            while (temp.abajo!=null) {
                temp = temp.abajo;
            }

            nodo_O.arriba = temp;
            temp.abajo = nodo_O;

            //console.log("Se inserto en Y..: " + nodo_O.valor + " en" + nodo_O.pos_y);
        }

        temp = nodo_y.der;
        var x = temp.pos_x;
        inserted = false;
        while (temp != null) {
            x = temp.pos_x;
            //console.log("condicion a evaluar: " + x);
            if (x  < pos_x) {
                //console.log( x + " es menor que la posicion entrante en ExistenX :"+ pos_x);
                temp = temp.der;
            } else {
                //console.log( x + " es mayor que la posicion entrante en ExistenX :"+ pos_x);
                temp.izq.der = nodo_O;
                nodo_O.izq = temp.izq;
                nodo_O.der = temp;
                temp.izq = nodo_O;
                inserted = true;
                //console.log("Se inserto en X: " + nodo_O.valor + " en" + nodo_O.pos_x);
                break;
            }
        }
        if (inserted == false) {
            //console.log("nodo no insertado");
            temp = nodo_y.der;
            while (temp.der != null) {
                console.log(temp.valor);
                temp = temp.der;
            }
            //console.log(temp.valor);
            nodo_O.izq = temp;
            temp.der = nodo_O;

            //console.log("Se inserto en X..: " + nodo_O.valor + " en " + nodo_O.pos_x);
        }

    }

    displayY(nodes,edges){
        var x_pos = -30;
        var y_pos = -150;
        let nodoY = this.l_Vertical.primero;
        while (nodoY!=null) {
            let temp = nodoY.der;
            var idY = nodoY.valor + 'Y'
            nodes.push({id: idY, label: nodoY.valor+ "Y", x: -150, y: y_pos, color: "#B29189"});
            //here I draw the arrow
            let temp1 = nodoY.der;
            edges.push({
                from: idY,
                to: temp1.pos_x +'_'+temp1.pos_y+'_O',
                arrows: "to",
                physics: false,
                smooth: {type: "cubicBezier"},
              });
              edges.push({
                from: temp1.pos_x +'_'+temp1.pos_y+'_O',
                to: idY,
                arrows: "to",
                physics: false,
                smooth: {type: "cubicBezier"},
              });

            while(temp!=null){
                //console.log(temp.pos_x +  " " + temp.valor);
                x_pos =(120*temp.pos_x)-30;
                var idO = temp.pos_x +'_'+temp.pos_y+'_O' ;
                nodes.push({id: idO, label: temp.valor.toString(), x: x_pos, y: y_pos, color: "#9BE54D"});
                edges.push({
                    from: temp.pos_x +'_'+temp.pos_y+'_O',
                    to: temp.izq.pos_x +'_'+temp.izq.pos_y+'_O' ,
                    arrows: "to",
                    physics: false,
                    smooth: {type: "cubicBezier"},
                  });
                if(temp.der !=null){
                    edges.push({
                        from: temp.pos_x +'_'+temp.pos_y+'_O',
                        to: temp.der.pos_x +'_'+temp.der.pos_y+'_O' ,
                        arrows: "to",
                        physics: false,
                        smooth: {type: "cubicBezier"},
                      });
                }
                temp = temp.der;
               
            }
            //x_pos   = -150;
            
            y_pos+= 100;
            nodoY = nodoY.siguiente;
        }
        //console.log(nodes);
    }

    displayX(nodes,edges){
        var x_pos = -30;
        var y_pos = -250;
        let nodoX = this.l_horizontal.primero;
        while (nodoX!=null) {
            let temp = nodoX.abajo;
            x_pos =(120*nodoX.valor)-30;
            nodes.push({id: nodoX.valor + 'X', label: nodoX.valor+ "X", x: x_pos, y: -250, color: "#B29189"});
            edges.push({
                from: nodoX.valor +'X',
                to: nodoX.abajo.pos_x +'_'+nodoX.abajo.pos_y+'_O' ,
                arrows: "to",
                physics: false,
                smooth: {type: "cubicBezier"},
              });
            while(temp!=null){
                edges.push({
                    from: temp.pos_x +'_'+temp.pos_y+'_O',
                    to: temp.arriba.pos_x +'_'+temp.arriba.pos_y+'_O' ,
                    arrows: "to",
                    physics: false,
                    smooth: {type: "cubicBezier"},
                  });
                if(temp.abajo !=null){
                    edges.push({
                        from: temp.pos_x +'_'+temp.pos_y+'_O',
                        to: temp.abajo.pos_x +'_'+temp.abajo.pos_y+'_O' ,
                        arrows: "to",
                        physics: false,
                        smooth: {type: "cubicBezier"},
                      });
                }
                //temp = temp.der;
                temp = temp.abajo;
            }
            //x_pos += 120;
            nodoX = nodoX.siguiente;
        }
    }

    displayNodos(){
        RowMajor = [];
        ColMajor = [];
        var cad = "";
        let nodo_y = this.l_Vertical.primero;
        console.log("/----------------------this is X----------------------/");
        while(nodo_y != null){
            let temp = nodo_y.der;
            while(temp != null){
                if(temp.valor!=-1){
                    cad +=  " -> " + temp.valor +":"+temp.pos_x+","+temp.pos_y 
                }
                RowMajor.push(temp.valor);
                temp = temp.der;
            }
            nodo_y = nodo_y.siguiente;
        }

        console.log(cad);

        var cad2 = "";
        let nodo_x = this.l_horizontal.primero;
        console.log("/----------------------this is Y----------------------/");
        while(nodo_x != null){
            let temp = nodo_x.abajo;
            while(temp != null){
                if(temp.valor!=-1){
                    cad2 +=  " -> " + temp.valor +":"+temp.pos_x+","+temp.pos_y 
                }
                ColMajor.push(temp.valor);
                temp = temp.abajo;
            }
            nodo_x = nodo_x.siguiente;
        }
        console.log(cad2);
    }

    displayMatriz(nodes){
        var pos_x = -150;
        var pos_y = -150;
        for (let i = 0; i < nodes.length; i++) {
            nodes2.push({id: nodes[i] + i, label: nodes[i].toString(), x: pos_x, y: pos_y, color: "#B29189"});
            pos_x += 120;
        }
        console.log(nodes2);
    }

    searchRowMajor(pos_x,pos_y){
        var rows = this.rows;
        var j = parseInt(pos_x);
        var i = parseInt(pos_y);
        var pos = i * rows + j;
        var cont = "";
        cont = "RowMajor["+i+","+j+"]: "+i+"*"+rows+"+"+j+"="+pos + '\n';
        cont += "RowMajor[" + pos+ "]: "+RowMajor[pos] + '\n';
        nodes2[pos].color = "#EAD414";
        document.getElementById("myArea").value += cont;
        updateStyle();
    }
    searchColMajor(pos_x,pos_y){
        var columns = this.columns;
        var j = parseInt(pos_x);
        var i = parseInt(pos_y);
        var pos = i * columns + j;
        var cont = "";
        cont = "ColMajor["+i+","+j+"]: "+i+"*"+columns+"+"+j+"="+pos + '\n';
        cont += "ColMajor[" + pos+ "]: "+ColMajor[pos] + '\n';
        nodes2[pos].color = "#EAD414";
        document.getElementById("myArea").value += cont;
        updateStyle();
    }

    getValores(){
        var valores = [];
        var nodo_y = this.l_Vertical.primero;
        while (nodo_y != null) {
            let posiciones = []
            let temp = nodo_y.der;
            while (temp!=null) {
                if(temp.valor != -1){
                    posiciones.push(parseInt(temp.pos_x),parseInt(temp.pos_y));
                    const coordenada = {indices: posiciones, valor: temp.valor};
                    valores.push(coordenada);
                }
                posiciones = [];
                temp = temp.der;
            }
            nodo_y = nodo_y.siguiente;
        }
        return valores;
    }
}

const myMatO = new matrizO(3,3);
var contents;
var nodes = [];
var nodes2 = [];
var edges = [];
var RowMajor = [];
var ColMajor = [];
var rMajor = false;
var cMajor = false;

function update(){
    var valor = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    var pos_x = document.getElementById("X").value;
    document.getElementById("X").value = "";
    var pos_y = document.getElementById("Y").value;
    document.getElementById("Y").value = "";
    myMatO.actualizar(valor,pos_x,pos_y);
    draw();
    myMatO.displayNodos();
}

function update2(){
    var valor = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    var pos_x = document.getElementById("X").value;
    document.getElementById("X").value = "";
    var pos_y = document.getElementById("Y").value;
    document.getElementById("Y").value = "";
    myMatO.actualizar2(valor,pos_x,pos_y);
    draw();
    myMatO.displayNodos();
}

function eliminar(){
    var valor = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    var pos_x = document.getElementById("X").value;
    document.getElementById("X").value = "";
    var pos_y = document.getElementById("Y").value;
    document.getElementById("Y").value = "";
    myMatO.deleteValue(valor,pos_x,pos_y);
    draw();
    myMatO.displayNodos();
}
function encontrar(){
    var valor = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    const nodoEncontrado = myMatO.buscar(valor);
    nodes.find( nodo => {
        if(nodo.label === valor){
           nodo.color =  "#EAD414";
        }
    });
    updateStyle();
    //console.log(nodes);
    //console.log(resultado);
    alert(nodoEncontrado.valor + " ,pos x: " + nodoEncontrado.pos_x + " ,pos y: " + nodoEncontrado.pos_y);
    document.getElementById("newValue").focus();
    myMatD.displayNodos();
}

function search(){
    var pos_x = document.getElementById("2X").value;
    document.getElementById("2X").value = "";
    var pos_y = document.getElementById("2Y").value;
    document.getElementById("2Y").value = "";
    if(rMajor == true){  
        myMatO.searchRowMajor(pos_x,pos_y);
    }else if(cMajor == true){
        myMatO.searchColMajor(pos_x,pos_y);
    }
}
function RowMajorDisplay(){
    document.getElementById("tilteMR").innerHTML = "Row Major"
    myMatO.displayNodos();
    draw2(RowMajor);
    rMajor = true;
    cMajor = false;
}
function ColMajorDisplay(){
    document.getElementById("tilteMR").innerHTML = "Col Major"
    myMatO.displayNodos();
    draw2(ColMajor);   
    rMajor = false;
    cMajor = true;
}

function draw2(input) {
    nodes2 =[];
    myMatO.displayMatriz(input);
    //console.log(RowMajor);
    var container = document.getElementById("miRed2");
    var data = {
        nodes: nodes2
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

function draw() {
    nodes = [];
    edges = [];
    myMatO.displayY(nodes,edges); 
    myMatO.displayX(nodes,edges);    
      // create a network
    var container = document.getElementById("miRed");
    var data = {
        nodes: nodes,
        edges: edges
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

  function updateStyle(){
    var container = document.getElementById("miRed2");
    var data = {
        nodes: nodes2
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

  function AbrirArchivo(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(event){
      contents = event.target.result;
      var json = JSON.parse(contents);
      myMatO.crear(json.m[0],json.m[1]);
      var count = Object.keys(json.valores).length;
      for (let index = 0; index < count; index++) {
        myMatO.actualizar(json.valores[index].valor,json.valores[index].indices[0],json.valores[index].indices[1]); 
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
    json.valores = myMatO.getValores();
    const myJSON = JSON.stringify(json);
    //console.log(json);
    //formato para guardar el archivo
    var nombre="row_col_major.json";//nombre del archivo
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