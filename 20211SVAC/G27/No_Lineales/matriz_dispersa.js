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

class MatrizD{
    constructor(){
        this.l_horizontal = new Cabecera();
        this.l_Vertical = new Cabecera();
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

/*
caso 1: No existen Cabeceras
 insertar los datos en las cabeceras
 obtener el nodo que acabamos de insertar
 creamos un nuevo nodo dispersa
 enlazar la cabeceras con el nuevo nodo dispersa
 */

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
                nodes.push({id: idO, label: temp.valor, x: x_pos, y: y_pos, color: "#9BE54D"});
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

    buscar(valor){
        var nodo_y = this.l_Vertical.primero;
        while(nodo_y != null){
            let temp = nodo_y.der;
            while(temp != null){
                if(temp.valor == valor){
                    return temp;
                }
                temp = temp.der;
            }
            nodo_y = nodo_y.siguiente;
        }
        return null;

    }

    getValores(){
        var valores = [];
        var nodo_y = this.l_Vertical.primero;
        while (nodo_y != null) {
            let posiciones = []
            let temp = nodo_y.der;
            while (temp!=null) {
                posiciones.push(parseInt(temp.pos_x),parseInt(temp.pos_y));
                const coordenada = {indices: posiciones, valor: temp.valor};
                valores.push(coordenada);
                posiciones = [];
                temp = temp.der;
            }
            nodo_y = nodo_y.siguiente;
        }
        return valores;
    }

    eliminar(valor,pos_x,pos_y){
        var nodo_y = this.l_Vertical.primero;
        let temp = null;
        while(nodo_y != null){
            let temp = nodo_y.der;
            
            while(temp != null){
                if(temp.valor == valor && temp.pos_x == pos_x && temp.pos_y == pos_y){
                    temp = temp;
                    if(temp.der == null && temp.izq != null){
                        temp.izq.der = null;
                        temp.izq = null;
                        console.log("Elimino enlace arriba");
                    }
                    if(temp.abajo == null && temp.arriba != null){
                        temp.arriba.abajo = null;
                        temp.arriba = null;
                        console.log("Elimino enlace izq");
                        
                    }
                    if(temp.der != null && temp.izq != null){
                        let izq = temp.izq;
                        let der = temp.der;
                        izq.der = der;
                        der.izq = izq;
                        temp.izq = null;
                        temp.der = null;
                        
                    }
                    if(temp.abajo != null && temp.arriba != null){
                        let arriba = temp.arriba;
                        let abajo = temp.abajo;
                        arriba.abajo = abajo;
                        abajo.arriba = arriba;
                        temp.arriba = null;
                        temp.abajo = null;
                        
                    }
                    alert("Elmiminado: " +valor);
                    break;
                }
                temp = temp.der;
            }
            nodo_y = nodo_y.siguiente;
        }
        this.eliminarDisplay(temp.pos_x +'_'+temp.pos_y+'O');
        updateStyle();
        console.log("Se elimino");
        
    }

    actualizar(valor,pos_x,pos_y){
        var nodo_y = this.l_Vertical.primero;
        while(nodo_y != null){
            let temp = nodo_y.der;
            while(temp != null){
                if(temp.pos_x == pos_x && temp.pos_y == pos_y){
                    alert("Actualizado : " + temp.valor +" a: " + valor);
                    temp.valor = valor;
                }
                temp = temp.der;
            }
            nodo_y = nodo_y.siguiente;
        }
    }

    displayNodos(){
        var cad = "";
        let nodo_y = this.l_Vertical.primero;
        console.log("-----------------------X-----------------------");
        while(nodo_y != null){
            cad += nodo_y.valor + ": ";
            let temp = nodo_y.der;
            while(temp != null){
                cad +=  " -> " + temp.valor +":"+temp.pos_x+","+temp.pos_y 
                temp = temp.der;
            }
            cad += '\n';
            console.log(cad);
            nodo_y = nodo_y.siguiente;
        }

        var cad2 = "";
        let nodo_x = this.l_horizontal.primero;
        console.log("-----------------------Y-----------------------");
        while(nodo_x != null){
            cad2 += nodo_x.valor + ": ";
            let temp = nodo_x.abajo;
            while(temp != null){
                cad2 +=  " -> " + temp.valor +":"+temp.pos_x+","+temp.pos_y 
                temp = temp.abajo;
            }
            cad2 += '\n';
            console.log(cad2);
            nodo_x = nodo_x.siguiente;
        }
    }

    eliminarDisplay(valor){
        var index = 0;
        nodes.find( nodo => {
            if(nodo.id === valor){
               nodes.splice(index,1);
            }
            index++;
        });
    }

}

 const myMatD = new MatrizD();
 var repetidos = false;


 function agregar(){

    var valor = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    var pos_x = document.getElementById("X").value;
    document.getElementById("X").value = "";
    var pos_y = document.getElementById("Y").value;
    document.getElementById("Y").value = "";
    if(!myMatD.buscar(valor) && repetidos == false){
        myMatD.insertar(valor,pos_x,pos_y);
        document.getElementById("newValue").focus();
    }else if(myMatD.buscar(valor) && repetidos == true){
        myMatD.actualizar(valor,pos_x,pos_y);
    }
    draw();
}


function eliminar(){
    var valor = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    var pos_x = document.getElementById("X").value;
    document.getElementById("X").value = "";
    var pos_y = document.getElementById("Y").value;
    document.getElementById("Y").value = "";
    if(myMatD.buscar(valor)){
        myMatD.eliminar(valor,pos_x,pos_y);
        document.getElementById("newValue").focus();
    }else{
        alert("Valor no existe");
    }
}
    //myMatD.displayNodos();

function encontrar(){
    var valor = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    const nodoEncontrado = myMatD.buscar(valor);
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

function update(){
    var valor = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    var pos_x = document.getElementById("X").value;
    document.getElementById("X").value = "";
    var pos_y = document.getElementById("Y").value;
    document.getElementById("Y").value = "";
    myMatD.actualizar(valor,pos_x,pos_y);
}





var contents;
var nodes = [];
var edges = [];

function draw() {
    nodes = [];
    edges = [];
    myMatD.displayY(nodes,edges); 
    myMatD.displayX(nodes,edges);    
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

  function AbrirArchivo(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(event){
      contents = event.target.result;
      var json = JSON.parse(contents);
      //console.log(json.m);
      var count = Object.keys(json.valores).length;
      for (let index = 0; index < count; index++) {
        myMatD.insertar(json.valores[index].valor,json.valores[index].indices[0],json.valores[index].indices[1]); 
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
    json.valores = myMatD.getValores();
    const myJSON = JSON.stringify(json);
    //console.log(json);
    //formato para guardar el archivo
    var nombre="matriz_dispersa.json";//nombre del archivo
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

