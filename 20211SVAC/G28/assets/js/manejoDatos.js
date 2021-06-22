const datos = require('./Estructuras/ListasSimples/datos');
const ListaSimple = require("./Estructuras/ListasSimples/ListaSimple").default.default;
const arbol = null;

function inicializar(){
    console.log("Entre")
    arbol = new ListaSimple();
  console.log("sali")
}

function Execute(){
    new_node = document.getElementById("add-node");
    var d1 = new datos(new_node,null);
    arbol.agregar(d1);
    arbol.imprimir();
}
