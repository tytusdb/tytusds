var nodos = new DataSet([
    { id: 1, label: "A" },
    { id: 2, label: "B" },
    { id: 3, label: "C" },
    { id: 4, label: "D" },
    { id: 5, label: "E" },
    { id: 1, label: "F" }
  ]);

  var arista = new DataSet([
    { from: 1, to: 3, label: "14" },
    { from: 2, to: 4, label: "15" },
    { from: 4, to: 3, label: "16" },
    { from: 1, to: 2, label: "17" },
    { from: 2, to: 4, label: "18" }
  ]);

  var conteiner = document.getElementById('mynetwork');

  var datos = {
    nodes: nodos,
    edges: arista
  };

  var opciones = {
    edges: {
      arrows: {
        to:{
          enabled:true
        }
      }
    }
  };

  var grafo = new Network(conteiner, datos, opciones);
