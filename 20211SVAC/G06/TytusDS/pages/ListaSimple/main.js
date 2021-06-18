// create an array with nodes
var nodes = new vis.DataSet([

]);

// create an array with edges
var edges = new vis.DataSet([

]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {};

// initialize your network!
var network = new vis.Network(container, data, options);

var cont = 1

let listita = new ListaSimple()

/*EVENTOS*/
$('#add').on('click', () => agregar())
$('#search').on('click', () => search())
$('#delete').on('click', () => prueba())

function prueba(){
  console.log(listita.print())
}

function agregar(){
  // create an array with nodes
  let inputValue = document.getElementById("valor").value; 
  var updatedIds = nodes.add([{
    id: cont,
    label:listita.add(inputValue),
  }]);
  updatedIds = edges.add([
  {from: (cont-1), to: cont, arrows:'to'}
  ])
    updatedIds = edges.add([
  {from: (cont), to: cont-1, arrows:'to'}
  ])
  cont++
  network.selectNodes([updatedIds[0]]);
  network.editNode();
}

var cont2 = 1

function search(){
  cont2 = 1
  view()
}

async function view(){
  var animation = {
    scale: 4,
    animation: {
      duration:500,
      easingFunction: "linear"
    }
  }
  network.selectNodes([cont2])
  network.focus(cont2, animation)
  //await new Promise(resolve => setTimeout(resolve, 1100)); // 3 sec
  cont2++
}

network.on("animationFinished", function (ctx)
{
  if(cont2 >= cont){
    network.fit()
  } else {
    view()
  }
});