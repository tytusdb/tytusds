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


/*EVENTOS*/
$('#add').on('click', () => agregar())
$('#search').on('click', () => search())

function agregar(){
  // create an array with nodes
  var updatedIds = nodes.add([{
    id: cont,
    label:'new',
  }]);
  updatedIds = edges.add([
  {from: (cont-1), to: cont, arrows:'to'}
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
  network.focus(cont2, animation)
  //await new Promise(resolve => setTimeout(resolve, 150)); // 3 sec
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